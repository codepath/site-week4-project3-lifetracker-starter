const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT } = require('./config');
const authRoutes = require('./routes/auth');
const nutritionRoutes = require('./routes/nutrition');
const security = require("./middleware/security");

const {BadRequestError, NotFoundError} = require('./utils/errors');

const app = express();

//enables cross origin resource sharing for all origins
app.use(cors());
//parse incoming request bodies w json payloads
app.use(express.json());
//log request info
app.use(morgan('tiny'));
//for each req, check if user exists or if toke exists in header, if it does, attach user to res.locals
app.use(security.extractUserFromJwt);

app.use('/auth', authRoutes);
app.use('/nutrition', nutritionRoutes);

app.get('/', function (request, response) {
    response.status(200).json({ping: "pong"});
})

app.use((req, res, next) => {
    return next(new NotFoundError())
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message

    return res.status(status).json({error: {message, status}});
})

module.exports = app;
