const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name: {
      type: String,  
      required: true,
      unique: true,
    },
    rating: { type: Number, default: 0 },
    price: {
      type: Number,
      required: [true, 'a tour must have a price'],
    },
  });
  
  const Tour = mongoose.model('Tour',tourSchema)
  
  module.exports=Tour