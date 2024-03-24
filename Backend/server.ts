import fs from 'fs';
import mysql from 'mysql2';
import express from 'express';
import bodyParser from 'body-parser';
import { DBQuery } from './src/db';
import { createHash } from 'crypto';

const PORT = process.env.PORT || 3001;
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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

/** NEED TO IMPLEMENT
 * Registration (path: /register-user) DONE
 * Authorization (path: /auth) + auth middleware (req.header: X-Auth-Token) DONE
 * Profile CRUD managing (path: /profile/{operation}) [teachers, students, admins]
 * Projetcs studying (path: /projects/?{operation})
 * Getting analytics (path: /analytics)
 */
// app.post('/api/user/register', async (req, res) => {

// })

/**
 * Signs up a user using email, login, password, role
 */
app.post('/api/user/register', async (req, res) => {
    const { login, password, role, email } = req.body;
    console.log(login, password, role, email);
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
    new DBQuery(mysql).insert('users', { login, email, password: encryptedPswd, created_at: dateNow});
    new DBQuery(mysql).insert('access_tokens', { access_token: accessToken, login, email, expiration_date: expirationDate });
    res.statusCode = 200; // @todo: check data first
    res.send({
        ok: true,
        body: { accessToken, dateNow }
    });
    return;
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
    const { email, password } = req.body;
    // Authorizing by login & password
    if (!XAuthToken || !(XAuthToken.length > 0)) {
        const encryptStr = `${email};${password};${"register_secret"}`;
        const accessToken = createHash('sha256')
            .update(encryptStr)
            .digest('hex');
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 2); // give 2 extra hours for expiration for access_tokens
        const encryptedPswd = createHash('sha256').update(password).digest('hex');
        const userExists = await new DBQuery(mysql).singleExists({
            clmn: 'password',
            table: 'students',
            condition: `password='${encryptedPswd}' and email='${email}'`
        });
        const tokenExists = await new DBQuery(mysql).singleExists({
            clmn: 'access_token',
            table: 'access_tokens',
            condition: `email='${email}'`
        });
        if (Object.values(userExists[0])[0] === 1) {
            // write a token if no is present yet
            Object.values(tokenExists[0])[0] === 0 && new DBQuery(mysql).insert('access_tokens', { access_token: accessToken, email, expiration_date: expirationDate });
            res.statusCode = 200; // @todo: check data first
            res.send({
                ok: true,
                body: { accessToken }
            });
        } else {
           res.statusCode = 500; // @todo: check data first
           res.send({ ok: false, body: 'No user was found in the database' });
        }
        return
    };
    if (XAuthToken) {
        const tokenExists = await new DBQuery(mysql).singleExists({
            clmn: 'access_token',
            table: 'access_tokens',
            condition: `access_token='${XAuthToken}'`
        });
        if (Object.values(tokenExists[0])[0] === 1) {
            res.statusCode = 200; // @todo: check data first
            res.send({ ok: true, body: true });
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
    // new DBQuery(mysql).insert<ITask>('tasks', { ...body, image: body.image.imgName });
    res.statusCode = 200; // @todo: check data first
    res.send({ ok: true });
});

app.get('/api', (req, res) => {
    res.json({ message: 'Backend API is up and accessable' });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});