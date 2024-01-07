const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
const PORT = 3000;

dotenv.config({ path: './config.env' });

try {
  mongoose
    .connect(
      process.env.DATABASE_URL_ATLAS,
      { useNewUrlParser: true },
    )
    .then((con) => {
      console.log("DB connected!")
    });
} catch (error) {
  console.log(error);
}


 

// const newTour = new Tour({
//   name:"The Park Camper",
//   rating:2.1,
//   price:130
// })

// newTour.save().then(doc=>console.log(doc)).catch(err=>console.log(err))




app.listen(PORT, () => {
  console.log(`server is up on ${PORT}`);
});
