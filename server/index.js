const express = require('express');
const app = express();
const session = require('express-session');
// const massive = require('massive');
require('dotenv').config();

// CONTROLLERS
const cc = require('./controllers/characterController.js');

const {SERVER_PORT,
        // CONNECTION_STRING,
        SESSION_SECRET} = process.env

app.use(express.json())
// app.use(express.static(`${__dirname}/../build`))
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7
    }
}))

// DATABASE
// massive(CONNECTION_STRING)
// .then(db =>{
//     console.log('Database connection successful!')
//     app.set('db', db)
// })
// .catch(()=>{console.log('Database connection failed...')})

// ENDPOINTS
app.get('/api/characters', cc.getAll)
app.post('/api/party', cc.getParty)

app.listen(SERVER_PORT, ()=> {
    console.log(`Listening on port ${SERVER_PORT}.`)
})