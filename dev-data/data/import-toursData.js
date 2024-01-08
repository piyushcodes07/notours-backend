const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
const fs = require('fs');
dotenv.config({ path: '../../config.env' });

try {
  mongoose
    .connect(process.env.DATABASE_URL_ATLAS, { useNewUrlParser: true })
    .then((con) => {
      console.log('DB connected!');
    });
} catch (error) {
  console.log(error);
}

const toursFromJson = JSON.parse(fs.readFileSync('tours-simple.json'));
// console.log(toursFromJson);

async function importAllTour() {
  try {
    await Tour.create(toursFromJson);
    console.log('tours inserted successfully!');
  } catch (error) {
    console.log(error);
  }
}

async function deleteAllTour() {
  try {
    await Tour.deleteMany();
    console.log('tours deleted successfully!');
  } catch (error) {
    console.log(error);
  }
}

if (process.argv[2] == '--save') {
  importAllTour();
  
}
if (process.argv[2] == '--delete') {
  deleteAllTour();
}
