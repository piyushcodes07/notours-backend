const fs = require('fs');


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );


exports.getAllTours = (req, res) => {
    res.json({
      status: 'success',
      data: {
        tours: tours,
      },
    });
  };

exports.getTour = (req, res) => {
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
  
  exports.createTour = (req, res) => {
    let newTour = req.body;
  
    res.json({
      status: 'success',
      data: {
        req: req.body,
      },
    });
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
  