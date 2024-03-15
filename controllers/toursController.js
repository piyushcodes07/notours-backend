const Tour = require('.././models/tourModel');

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  fillter() {
    const excludes = ['page', 'sort', 'limit', 'fields'];
    let query = {...this.queryString};
    console.log(query, 'req.query original');
    console.log(JSON.stringify(query));

    excludes.map((el) => {
      delete query[el];
    });
    console.warn(query, 'filtered');

    //ADVANCED FILTERING

    const stringQuery = JSON.stringify(query).replace(
      /\b(gte|lte|gt|lt)\b/g,
      (match) => `$${match}`,
    );
    query = JSON.parse(stringQuery);

    this.query = this.query.find(query);
    return this;
    // console.error(query,"line 20")
  }

  sort() {
    if (this.queryString.sort) {
      const sortQuery = this.queryString.sort.split(',').join(' ');
      console.log(sortQuery);
      this.query = this.query.sort(sortQuery);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this
  }

  fieldLimitting(){
    if (this.queryString.fields) {
        //CHAINING SELECT METHOD TO QUERY OBJ
        this.query.select(this.queryString.fields.split(',').join(' '));
      }
      return this
  }
pagination(){
    if (this.queryString.page || this.queryString.limit) {
      
      const page = this.queryString.page* 1 || 1;
      const limit = this.queryString.limit * 1 || 15;
      const skip = (page - 1) * limit;
      this.query.skip(skip).limit(limit);
      return this
    }
   return this
  }
}

// MIDDLEWARE FOR top-5-cheap route (this middleware modifies the req.query to set some default query params)
exports.topFiveCheap = (req, res, next) => {
  req.query.sort = 'price ratingsAverage';
  req.query.limit = '5';
  next();
};

exports.getAllTours = async (req, res) => {

  try {


    const features = new  APIfeatures(Tour.find(), req.query).fillter().sort().fieldLimitting().pagination()
    const final = await await features.query; //EXECUTE QUERY

    res.status(200).json({
      message: 'sucess',
      dataLength: final.length,
      data: final,
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    let id = req.params.id;

    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'sucess',
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      data: error,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      message: newTour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // returns the newly created object
      runValidators: true, // runs the validator defined in Schema
    });
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
    await Tour.findByIdAndDelete(req.params.id);
    res.status(202).json({
      status: 'success',
      message: '',
    });
  } catch (error) {
    res.json({
      status: 'fail',
      message: error,
    });
  }
};
