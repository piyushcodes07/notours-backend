
const Tour = require('.././models/tourModel')

exports.getAllTours = (req, res) => {
    res.json({
      status: 'success',
      data: {
        // tours: tours,
      },
    });
  };

exports.getTour = (req, res) => {
    // let id = req.params.id * 1; //converts the string to number
    // if (id > tours.length) {
    //   return res.status(404).json({ status: 'error', data: 'no tour found' });
    // }
  
    // console.log(req.params);
    //req.params has all the dynamic route variables
    //optional params can be defined like this '/api/v1/tours/:id/:optional?'
  
    // const tour = tours.find((Element) => Element.id === id);
  
    res.json({
      status: 'success',
      data: {
        // tour,
      },
    });
  };


  
  exports.createTour = async (req, res) => {
    try {
      const newTour = await Tour.create(req.body)
      res.status(201).json({
        status:"success",
        message:newTour
      })
      
    } catch (error) {
      res.status(400).json({
        status:"fail",
        message:error
      })
    }
  };
  
  exports.updateTour = (req, res) => {
    res.status(201).json({
      status: 'success',
      data: 'your updated data here',
    });
  };
  
  exports.deleteTour = (req, res) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  };
  