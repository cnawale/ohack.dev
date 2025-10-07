const express = require('express')
const app = express()
const port = 8080

const { StreamClient } = require('@stream-io/node-sdk');

const apiKey = "kv9p7epty92x"
const apiSecret = "3zuvgz5xcqwpxwmdn8avqaaae5xtjdw99x2crbhcj6ph7rygyrauwtg66bspg493"

app.use(express.json());

app.post('/signup', (req,res) => {
    const data = req.body
    console.log(data)
    res.status(200).json({ message: 'Signup received', data });
})

app.get('/api_key', (req, res) => {
    res.status(200).json({ message: 'Request Received', apiKey });
})

app.get('/token',async (req, res) => {
    const client = new StreamClient(apiKey, apiSecret, {timeout: 3000});

    const userId = "anonymous" 
    const validity = 60*60
    const newUser = {
        id: userId,
        role: 'user',
        name: 'anonymous'
    }
    await client.upsertUsers([newUser])

    const token = client.generateUserToken({ user_id: userId, validity_in_seconds: validity })
    if (token) res.send(token)
})

app.listen(port, (err) => {
  if (err) console.log(err)
  console.log(`Listening Requsts on port ${port}`)
})