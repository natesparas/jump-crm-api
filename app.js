const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const { jwtValidation } = require('./src/middlewares/jwtValidation')

// database connection

const app = express()

// logging
// morgan.token('reqBody', (req, res) => JSON.stringify(req.body));
// morgan.token('resBody', (req, res) => res._responseBody)

// // Create a custom format that logs request and response
// const logFormat = ':method :url :status :response-time ms - Request Body: :reqBody - Response Body: :resBody';
// app.use(morgan(logFormat))
// // app.use(morgan('dev'))
// app.use((req, res, next) => {
//     const oldSend = res.send;

//     res.send = function (body) {
//         res._responseBody = body;
//         oldSend.apply(res, arguments);
//     };

//     next();
// });

// middleware
app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

// app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/api/auth', require('./src/routes/auth.routes'))
// app.use('/', jwtValidation, require('./src/routes/customer'))
app.use('/api/user', jwtValidation, require('./src/routes/user.routes'))
app.use('/api/dashboard', jwtValidation, require('./src/routes/dashboard.routes'))
app.use('/api/crm', jwtValidation, require('./src/routes/crm.routes'))

module.exports = app