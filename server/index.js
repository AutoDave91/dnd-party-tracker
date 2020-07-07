const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();

// CONTROLLERS
const ac = require('./controllers/authController')
const cc = require('./controllers/characterController.js');
const ic = require('./controllers/initController');

const {SERVER_PORT,
        CONNECTION_STRING,
        SESSION_SECRET} = process.env

app.use(express.json())
app.use(express.static(`${__dirname}/../build`))
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7
    }
}))

// DATABASE
massive(CONNECTION_STRING)
.then(db =>{
    console.log('Database connection successful!')
    app.set('db', db)
})
.catch(()=>{console.log('Database connection failed...')})

// ENDPOINTS
// login
app.get('/auth/user', ac.getUser)
app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.get('/auth/logout', ac.logout)
// party fetch and character manipulation
app.get('/api/party', cc.getParty)
app.put('/api/party', cc.longRest)
app.put('/api/character', cc.combatCharacter)
app.get('/api/characters', cc.userCharacters)
app.put('/api/character/edit', cc.editCharacter)
// initiative tracker
app.get('/api/initiative', ic.getInit)
app.post('/api/initiative', ic.rolledInit)
app.delete('/api/initiative', ic.resetInit)

app.listen(SERVER_PORT, ()=> {
    console.log(`Listening on port ${SERVER_PORT}.`)
})