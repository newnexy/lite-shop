const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const account = require('./routes/account')



const app = express()

const port = 3000;

// Upload limit
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


// User login session check etc
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)


// to work with api (authorization social, etc.)
app.use(cors())

// for working with forms
app.use(bodyParser.json())

// main static folder for image files, etc.
app.use(express.static(path.join(__dirname, 'public')))






app.use('/account', account)


app.get('/', (req, res) => {
    res.send('главная страница')
})

app.listen(port, () => {
    console.log("server start " + port)
})