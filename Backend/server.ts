import fs from 'fs';
import crypto from 'crypto';
import mysql from 'mysql2';
import express from 'express';
import bodyParser from 'body-parser';
import { DBQuery } from './src/db';
import { createHash } from 'crypto';

const PORT = process.env.PORT || 5001;
const app = express();

// @todo: Code duplication, move to the shared lib between backend and frontend
const complexityMap = {
    'лёгкий': 1,
    'средний': 2,
    'сложный': 3
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5002');
    next();
});
app.use(
    bodyParser.json({
        limit: '5mb'
    })
);
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

/**
 * Signs up a user using email, login, password, role
 */
app.post('/api/user/register', async (req, res) => {
    console.log('API request on: /api/user/register');
    const { login, password, role, email } = req.body;
    const encryptStr = `${email};${password};${"register_secret"}`;
    const accessToken = createHash('sha256')
        .update(encryptStr)
        .digest('hex');
    const encryptedPswd = createHash('sha256').update(password).digest('hex');
    const dateNow = new Date();
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2); // give 2 extra hours for expiration for access_tokens
    const userExists = await new DBQuery(mysql).singleExists({
        clmn: 'email',
        table: role,
        condition: `email='${email}'`
    });
    if (Object.values(userExists[0])[0] === 1) {
        res.statusCode = 409; // @todo: check data first
        res.send({ ok: false, body: 'The specified email is already registered'});
        return;
    }
    new DBQuery(mysql).insert(role, { login, email, password: encryptedPswd, created_at: dateNow});
    new DBQuery(mysql).insert('users', { login, email, password: encryptedPswd, role });
    new DBQuery(mysql).insert('access_tokens', { access_token: accessToken, login, email, expiration_date: expirationDate });
    res.statusCode = 200; // @todo: check data first
    res.send({
        ok: true,
        body: { accessToken, dateNow }
    });
    return;
});

app.get('/api/user/get-personal-data', async (req, res) => {
    try {
        const { role, login } = req.query;
        const data = await new DBQuery(mysql).call(`SELECT first_name, second_name, birth_date FROM ${role} WHERE login='${login}'`);
        res.status(200).send({ ok: true, data });
    } catch (error) {
        res.status(500).send({ server_message: 'Error editing the users personal data in the DB', error });
    }
});

app.post('/api/user/change-personal-data', async (req, res) => {
    try {
        const { first_name, second_name, birth_date, role } = req.body;
        new DBQuery(mysql).replace(role,{
            first_name,
            second_name,
            birth_date
        });
        res.status(200).send({ ok: true });
    } catch (error) {
        res.status(500).send({ server_message: 'Error editing the users personal data in the DB', error });
    }
});

/**
* @todo: Expiration date both on the frontend and in DB record (created_at) must be synchronized
* insert into access_tokens (expiration_date)
* VALUES (DATE_ADD(NOW(), INTERVAL 2 HOUR));
* 
* SELECT UNIX_TIMESTAMP(expiration_date) FROM access_tokens;
*/
app.post('/api/auth', async (req, res) => {
    const XAuthToken = req.headers['x-auth-token'];
    console.log('\n', XAuthToken, 'TOKEN', '\n');
    const { email, password } = req.body;
    // Authorizing by login & password
    if (!XAuthToken || XAuthToken === 'empty') {
        const encryptStr = `${email};${password};${"register_secret"}`;
        const accessToken = createHash('sha256')
            .update(encryptStr)
            .digest('hex');
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 2); // give 2 extra hours for expiration for access_tokens
        const encryptedPswd = createHash('sha256').update(password).digest('hex');
        const userExists = await new DBQuery(mysql).singleExists({
            clmn: 'password',
            table: 'users',
            condition: `password='${encryptedPswd}' and email='${email}'`
        });
        const tokenExists = await new DBQuery(mysql).singleExists({
            clmn: 'access_token',
            table: 'access_tokens',
            condition: `email='${email}'`
        });
        if (Object.values(userExists[0])[0] === 1) {
            Object.values(tokenExists[0])[0] === 0 &&
                new DBQuery(mysql).insert('access_tokens', { access_token: accessToken, email, expiration_date: expirationDate });
            const dbUser = await new DBQuery(mysql).call(`SELECT * FROM users WHERE email='${email}' AND password='${encryptedPswd}'`);
            const { role, login } = dbUser[0];
            
            res.statusCode = 200; // @todo: check data first
            res.send({
                ok: true,
                body: { accessToken, role, login, email }
            });
        } else {
           res.statusCode = 500; // @todo: check data first
           res.send({ ok: false, body: 'No user was found in the database' });
        }
        return
    };
    if (XAuthToken.length > 0 && XAuthToken !== 'empty') {
        const tokenExists = await new DBQuery(mysql).singleExists({
            clmn: 'access_token',
            table: 'access_tokens',
            condition: `access_token='${XAuthToken}'`
        });
        if (Object.values(tokenExists[0])[0] === 1) {
            // const { role, login } = await new DBQuery(mysql).call(`SELECT * FROM users WHERE email=${email} AND password=${encryptedPswd}`);
            res.statusCode = 200; // @todo: check data first
            res.send({
                ok: true,
                body: true });
        } else {
            res.statusCode = 500; // @todo: check data first
            res.send({ ok: false, body: 'No access token was found in the database' });
        }
        return
    };
    return
});

app.post('/api/upload-test-file', async (req, res) => {
    console.log(req.body.file);
    const body = req.body;
    // const projectId = body.projectId;
    
    let base64Data = body.file.buffToSave.replace(/^data:text\/plain;base64,/, "");
    base64Data = body.file.buffToSave.replace(/^data:application\/pdf;base64,/, "");
    base64Data = body.file.buffToSave.replace(/^data:application\/vnd.openxmlformats-officedocument.wordprocessingml\/document;base64,/, "");
    const fileBuffer = Buffer.from(base64Data, 'base64');
    const fileType = (function () {
        const type = body.file.type;
        if (type === 'plain') return 'text';
        if (type.includes('pdf')) return 'pdf';
        if (type.includes('document')) return 'doc';
    })();
    const name = body.file.name.split('.')[0];
    fs.writeFile(
        `./uploaded-files/${name}_${body.file.user || 'no-user'}_${new Date()}.${fileType}`,
        fileBuffer,
        'utf-8',
        err => {
            err && console.log(err, '__File_SAVING_ERROR__');
        }
    );
    // new DBQuery(mysql).insert('module_files', { name, module_task_id: body.moduleTaskId  });
    res.statusCode = 200; // @todo: check data first
    res.send({ ok: true });
});

app.post('/api/upload-module-file', async (req, res) => {
    console.log(req.body.file);
    const body = req.body;
    const projectId = body.projectId;
    if (!body.file.buffToSave) {
        res.status(400).send({ error: 'No file buffer data to save, please check the request payload' });
    }
    let base64Data = body.file.buffToSave.replace(/^data:text\/plain;base64,/, "");
    base64Data = body.file.buffToSave.replace(/^data:application\/pdf;base64,/, "");
    base64Data = body.file.buffToSave.replace(/^data:application\/vnd.openxmlformats-officedocument.wordprocessingml\/document;base64,/, "");
    try {
        const fileBuffer = Buffer.from(base64Data, 'base64');
        const fileType = (function () {
        const type = body.file.type;
        if (type === 'plain') return 'text';
        if (type.includes('pdf')) return 'pdf';
        if (type.includes('document')) return 'doc';
    })();
    const name = body.file.name.split('.')[0];
    fs.writeFile(
        `./uploaded-files/module-task-files/${name}_${projectId}_${new Date()}.${fileType}`,
        fileBuffer,
        'utf-8',
        err => {
            err && console.log(err, '__File_SAVING_ERROR__');
        }
        );
        new DBQuery(mysql).insert('module_files', { name, module_task_id: body.moduleTaskId  });
        res.status(200).send({ ok: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

app.post('/api/messages', (req, res) => {
    const { role, text, user_login } = req.body;
    // const date = new Date().toISOString();
    const message_id = crypto.randomBytes(6).toString('hex');
    try {
        new DBQuery(mysql).insert('messages', { user_login, text, role, message_id });  
    } catch (error) {
        res.status(500).send({ message: 'Error saving the message', error });
    };
    res.status(200).send({ id: message_id});
});

app.get('/api/messages', async (req, res) => {
    try {
        const messages = await new DBQuery(mysql).call('SELECT * FROM messages')
        res.status(200).send(JSON.stringify(messages));
    } catch (error) {
        res.status(500).send({ server_message: 'Error reading messages', error });
    }
});

app.post('/api/projects/add-new-project', async (req, res) => {
    const {
        projectTitle,
        projectTopic,
        projectDeadlines,
        projectComplexity,
        projectDescription,
        author,
    } = req.body;
    try {
        const dateNow = new Date();
        new DBQuery(mysql).insert('projects', {
            author,
            name: projectTitle,
            description: projectDescription,
            topic: projectTopic,
            deadline: projectDeadlines,
            complexity: complexityMap[projectComplexity.toLowerCase()],
            created_at: dateNow,
            is_moderated: 0,
        });
        res.status(200).send({ ok: true });
    } catch (error) {
        res.status(500).send({ server_message: 'Error writing new projects to the DB', error });
    }
});

app.get('/api/projects/get-all', async (req, res) => {
    try {
        const { email } = req.query;
        const projects = await new DBQuery(mysql).call('SELECT * FROM projects');
        const modules = await new DBQuery(mysql).call('SELECT * FROM project_modules');
        const subscribedProjectIds = await new DBQuery(mysql).call(
            `select s.project_id from student_projects s where s.student_id = (select id from students st where st.email = '${email}')`
        ).then(res => res.map(el => el.project_id));
        res.status(200).send({ projects, subscribedProjectIds, modules });
    } catch (error) {
        res.status(500).send({ server_message: 'Error reading projects from the DB', error });
    }
});

app.get('/api/projects/get-deleted', async (req, res) => {
    try {
        const deletedProjects = await new DBQuery(mysql).call('SELECT * FROM deleted_projects');
        res.status(200).send(deletedProjects);
    } catch (error) {
        res.status(500).send({ server_message: 'Error reading projects from the DB', error });
    }
});

app.post('/api/projects/delete', async (req, res) => {
    try {
        const projectId = req.body.id;
        const deletedProject = await new DBQuery(mysql).call(`SELECT * FROM projects WHERE id=${projectId}`);
        await new DBQuery(mysql).call(`DELETE FROM projects WHERE id=${projectId}`);
        new DBQuery(mysql).insert('deleted_projects', deletedProject[0]);
        const deletedProjectExists = await new DBQuery(mysql).singleExists({
            clmn: 'name',
            table: 'projects',
            condition: `id=${projectId}`
        });
        if (Object.values(deletedProjectExists[0])[0] === 1) {
            res.status(500).send({ ok: false, message: 'Project is not deleted from DB' });
        }
        res.status(200).send({ ok: true });
    } catch (error) {
        res.status(500).send({ server_message: 'Error reading projects from the DB', error });
    }
});

app.post('/api/projects/edit', async (req, res) => {
    try {
        const {id, name, description, deadline, projectComplexity } = req.body;
        new DBQuery(mysql).replace('projects',
            {
                id,
                name,
                description,
                deadline,
                complexity: complexityMap[projectComplexity.toLowerCase()],
                created_at: new Date(),
                is_moderated: 0, // set to 0 because admin should review an edited project
            });
        res.status(200).send({ ok: true });
    } catch (error) {
        res.status(500).send({ server_message: 'Error editing the project in the DB', error });
    }
});

app.get('/api/users/get-all', async (req, res) => {
    try {
        const users = await new DBQuery(mysql).call('SELECT * FROM users');
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ server_message: 'Error editing the project in the DB', error });
    }
});

app.put('/api/users/subscribe-to-project', async (req, res) => {
    try {
        const { email, projectId } = req.body;
        const sql = `INSERT INTO student_projects (student_id, project_id) VALUES (( select id from students WHERE email = '${email}'), ${projectId})`;
        await new DBQuery(mysql).call(sql);
        res.status(200).send({ ok: true });
    } catch (error) {
        res.status(500).send({ server_message: 'Error putting a subscription relation the student_projects table in the DB', error });
    }
});

app.post('/api/users/unsubscribe-from-project', async (req, res) => {
    try {
        const { email, projectId } = req.body;
        const sql = `DELETE from student_projects where student_id = (select id from students WHERE email = '${email}') AND project_id = ${projectId}`;
        const dbResp = await new DBQuery(mysql).call(sql);
        if (!dbResp) res.status(502).send({ message: 'Something went wrong with deletion from the DB, please contact your administarator' });
        res.status(200).send({ ok: true });
    } catch (error) {
        res.status(500).send({ server_message: 'Error deleting a subscription from the student_projects table in the DB', error });
    }
});


app.get('/api/users/student/get-project-analytics', async (req, res) => {
    try {
        const { email, projectId } = req.query;
        const sql = `
            SELECT s.id AS student_id, p.name AS project_name, m.title AS module_title, sc.task_point, sc.test_point
            FROM students s
            JOIN student_scores sc ON s.id = sc.student_id
            LEFT JOIN tasks t ON sc.task_id = t.id
            LEFT JOIN tests ts ON sc.test_id = ts.id
            JOIN project_modules m ON t.module_id = m.id OR ts.module_id = m.id
            JOIN projects p ON m.project_id = p.id
            WHERE p.id = ${projectId} AND s.id = (select id from students WHERE email = '${email}');
        `;
        const dbResp = await new DBQuery(mysql).call(sql);
        const analytics = dbResp.map(el => ({
            moduleTitle: el.module_title,
            testPoint: el.test_point,
            taskPoint: el.task_point,
        }));
        res.status(200).send(analytics);
    } catch (error) {
       console.log(error, 'Internal server error');
    }
});

app.get('/api', (req, res) => {
    res.json({ message: 'Backend API is up and accessable' });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});