
const express = require('express')
const router = express.Router()// creating a router instead of ( const app = express() )

const toursController = require('../controllers/toursController')

router 
.route('/')
.get(toursController.getAllTours)
.post(toursController.checkPostCreateTour,toursController.createTour);//chaining middleware

router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

  module.exports = router