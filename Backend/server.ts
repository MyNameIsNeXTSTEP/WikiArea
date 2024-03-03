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
 * Authorization (path: /auth) + auth middleware (req.header: X-Auth-Token)
 * Profile CRUD managing (path: /profile/{operation})
 * Projetcs studying (path: /projects/?{operation})
 * Getting analytics (path: /analytics)
 */

/**
 * Signs up a user using email, login, password, role
 */
app.post('/api/user/register', async (req, res) => {
    const { login, password, role, email } = req.body;
    const encryptStr = `${login};${password};${"register_secret"}`;
    const accessToken = createHash('sha256')
        .update(encryptStr)
        .digest('hex');
    const encryptedPswd = createHash('sha256').update(password).digest('hex');
    const dateNow = new Date();
    new DBQuery(mysql).insert(role, { login, email, password: encryptedPswd, created_at: dateNow});
    res.statusCode = 200; // @todo: check data first
    res.send({ ok: true, body: { accessToken, dateNow }});
});

/**
* insert into access_tokens (expiration_date)
* VALUES (DATE_ADD(NOW(), INTERVAL 2 HOUR));
* 
* SELECT UNIX_TIMESTAMP(expiration_date) FROM access_tokens;
*/

// @todo: Expiration date both on the frontend and in DB record (created_at) must be synchronized
app.post('/api/auth', async (req, res) => {
    const XAuthToken = req.headers['x-auth-token'];
    // const encryptStr = `${login};${password};${"register_secret"}`;
    // const token = createHash('sha256')
    //     .update(encryptStr)
    //     .digest('hex');
    // const encryptedPswd = createHash('sha256').update(String(password));
    const existsCheckResp = await new DBQuery(mysql).exists('access_token', 'access_tokens', `access_token='${XAuthToken}'`);
    if (Object.values(existsCheckResp[0])[0] === 1) {
       res.statusCode = 200; // @todo: check data first
       res.send({ ok: true, body: true });
    } else {
       res.statusCode = 500; // @todo: check data first
       res.send({ ok: false, body: 'An error occured while trying to find the access_token in database' });
    }
});

app.post('/api/test', (req, res) => {
    // const base64Data = body.image.imgBuffToSave.replace(/^data:image\/jpeg;base64,/, "");
    // const imgBuffer = Buffer.from(base64Data, 'base64');
    // fs.writeFile(
    //     `./media/${body.image.imgName}.${body.image.type}`,
    //     imgBuffer,
    //     err => {
    //         err && console.log(err, '__IMAGE_SAVING_ERROR__');
    //     }
    // );
    // new DBQuery(mysql).insert<ITask>('tasks', { ...body, image: body.image.imgName });
    res.statusCode = 200; // @todo: check data first
    res.send({ ok: true });
});

app.get('/api/get-all-tasks', async (req, res) => {
    res.send({
        ok: true,
        message: 'ok',
    });
});

app.get('/api', (req, res) => {
    res.json({ message: 'Backend API is up and accessable' });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});