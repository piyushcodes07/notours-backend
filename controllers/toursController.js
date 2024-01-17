
const Tour = require('.././models/tourModel')

exports.getAllTours = async(req, res) => {


    //BASIC FILTERING
    const excludes = ["page","sort","limit","fields"]
    let query = {...req.query}
    console.log(query);
     excludes.map(el=>{
        delete query[el] 
    })
    console.log(query)
     
    //ADVANCED FILTERING

    const stringQuery = JSON.stringify(query).replace(/\b(gte|lte|gt|lt)\b/g, match=>`$${match}`);
    query = JSON.parse(stringQuery)
    console.log(query)
    

   
  try {

    //INITIALIZED QUERY
    let allTours =  Tour.find(query)

    
    //FIELD LIMITING 
    if(req.query.fields){
      //CHAINING SELECT METHOD TO QUERY OBJ
      allTours.select(req.query.fields.split(',').join(" "));
    }

    //PAGINATION

    if(req.query.page || req.query.limit){

      const page = req.query.page * 1 || 1
      const limit = req.query.limit * 1 || 15
      const skip  = (page-1) * limit

      const totalTours = await Tour.countDocuments()

      //CHECKING IF PAGE IN AVAILABE 
      if(skip >= totalTours){
        throw new Error("page not available")
      }
      allTours.skip(skip).limit(limit);


    }


    const final = await allTours; //EXECUTE QUERY

    res.status(200).json({
      message:"sucess", 
      data:final
    })  
  } catch (error) {
    res.status(404).json({
      status:"error",
      message:error
    })
  }
  
  };

exports.getTour = async (req, res) => {
    try {
      let id = req.params.id ;

      const tour = await Tour.findById(id)
      res.status(200).json({
        status:"sucess",
        data:tour
      })
    
    } catch (error) {
      res.status(404).json({
        status:"fail",
        data:error
      })
    }
  }


  
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
  
  exports.updateTour =  async (req, res) => {
    try {
      const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
        new:true, // returns the newly created object
        runValidators:true // runs the validator defined in Schema
      })  
      res.status(201).json({
        status: 'success',
        data: tour,
      });
    } catch (error) {
      res.status(200).json({
        status: 'error',
        message: error,
      });
    }
    
  };
  
  exports.deleteTour = async (req, res) => {
    try {
      await Tour.findByIdAndDelete(req.params.id)
      res.status(202).json({
        status:"success",
        message:""
      })
    } catch (error) {
      res.json({
        status:"fail",
        message:error
      })
    }
  };
  