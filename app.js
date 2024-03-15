const express = require('express');
const app = express();
const morgan = require('morgan');


// REQUIRING CONTROLLER
const toursRouter = require('./routes/tourRoute')

//MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

//MOUNTING THE ROUTE
app.use('/api/v1/tours',toursRouter); // routers are used as middleware for the followinig route


module.exports = app
