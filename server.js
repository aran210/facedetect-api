const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
    client: 'pg',					
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      }
});

// const db = knex({
//     client: 'pg',					
//     connection: {
//         host: '127.0.0.1',
//         user: 'aran',
//         password: '',
//         database: 'facedetect-db'
//     }
// });

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => { res.send(process.env.DATABASE_URL) });

app.post('/signin', signin.handleSignIn(db, bcrypt) );

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res, db) });

const PORT = process.env.PORT;
// const PORT = 3000;

app.listen(PORT, () => {
    console.log(`running smoothly on port ${PORT}`);
});