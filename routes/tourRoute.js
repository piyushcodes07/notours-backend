const express = require('express');
const router = express.Router(); // creating a router instead of ( const app = express() )

const toursController = require('../controllers/toursController');

router
  .route('/top-5-cheap')
  .get(toursController.topFiveCheap, toursController.getAllTours);

router
  .route('/')
  .get(toursController.getAllTours)
  .post(toursController.createTour); //chaining middleware

router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

module.exports = router;
