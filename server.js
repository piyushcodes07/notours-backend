const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
const { string } = require('i/lib/util');
const PORT = 3000;

dotenv.config({ path: './config.env' });

try {
  mongoose
    .connect(
      'mongodb+srv://piyushcodes07:kappaoppa12@natours-mumbai-1.lwjddtu.mongodb.net/?retryWrites=true&w=majority',
      { useNewUrlParser: true },
    )
    .then((con) => {
      // console.log(con);
    });
} catch (error) {
  console.log(error);
}

const tourSchema =new mongoose.Schema({
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

const newTour = new Tour({
  name:"The Park Camper",
  rating:2.1,
  price:130
})

newTour.save().then(doc=>console.log(doc)).catch(err=>console.log(err))




app.listen(PORT, () => {
  console.log(`server is up on ${PORT}`);
});
