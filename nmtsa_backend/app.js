require('dotenv').config();
const express = require('express')
const app = express()
const port = 8080

const { StreamClient } = require('@stream-io/node-sdk');

const apiKey = process.env.API_KEY
const apiSecret = process.env.API_SECRET

const db = require('./db');

app.use(express.json());

app.post('/login', async (req, res) => {
    
    const { user, passwd } = req.body;
    const query = `
        SELECT user_nm FROM users 
        WHERE (user_nm = $1 OR email = LOWER($1))
          AND passwd = MD5($2);
    `;

    try {
        console.log(query,[user, passwd])
        const result = await db.query(query, [user, passwd]);

        if (result.rows.length > 0) {
            res.status(200).json({
                message: 'Login successful',
                user: result.rows[0],
            });
        } else {
            res.status(401).json({ message: 'Invalid username/email or password' });
        }
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/signup', async (req, res) => {
    const data = req.body
    const query = `
        INSERT INTO users (
            first_nm, last_nm, email, passwd, usr_type
        )
        VALUES ($1, $2, LOWER($3), $4, $5);
    `;

    console.log(`Payload: ${data}`)
    try {
        await db.query(query,Object.values(data))
        res.status(200).json({message: 'Success 200',data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/api_key', (req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    res.status(200).json({ message: 'Request Received', apiKey });
})

app.get('/token', async (req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    const client = new StreamClient(apiKey, apiSecret, { timeout: 3000 });

    const userId = "cnawale418"
    const validity = 60 * 60
    const newUser = {
        id: userId,
        role: 'user',
        name: 'cnawale418'
    }
    await client.upsertUsers([newUser])

    const token = client.generateUserToken({ user_id: userId, validity_in_seconds: validity })
    if (token) res.send(token)
})

app.listen(port, (err) => {
    if (err) console.log(err)
    console.log(`Listening Requsts on port ${port}`)
})