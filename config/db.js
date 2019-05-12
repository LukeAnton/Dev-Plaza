//require mongoose
const mongoose = require('mongoose');
// grabbing the config package so we can access mongoURI
const config = require('config');
//grabbing the mongoURI URL
const db = config.get('mongoURI');
//connection asyc await with a try catch block
const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true
      }
    );

    console.log('MongoDB Connected.....');
  } catch (e) {
    console.log(e.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
