const fs = require('fs');
const express = require('express');
const { log } = require('console');
const app = express();
const PORT = 3000;
const morgan = require('morgan');
const { memoryUsage } = require('process');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.use(express.json());
app.use(morgan('dev'));

const getAllTours = (req, res) => {
  res.json({
    status: 'success',
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  let id = req.params.id * 1; //converts the string to number
  if (id > tours.length) {
    return res.status(404).json({ status: 'error', data: 'no tour found' });
  }

  console.log(req.params);
  //req.params has all the dynamic route variables
  //optional params can be defined like this '/api/v1/tours/:id/:optional?'

  const tour = tours.find((Element) => Element.id === id);

  res.json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  let newTour = req.body;

  res.json({
    status: 'success',
    data: {
      req: req.body,
    },
  });
};

const updateTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: 'your updated data here',
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};


const toursRouter = express.Router() // creating a router instead of ( const app = express() )
// const userRouter  = express.Router()
app.use('/api/v1/tours',toursRouter); // routers are used as middleware for the followinig route


toursRouter
.route('/')
.get(getAllTours)
.post(createTour);

toursRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(PORT, () => {
  console.log(`server is up on ${PORT}`);
});
