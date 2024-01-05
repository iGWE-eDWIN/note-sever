const mongoose = require('mongoose');
require('dotenv').config();

// Create a new database
const newDataBase = async () => {
  try {
    await mongoose.connect(process.env.mongoDB_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.error('Error connecting to MongoDB:', error.message);
  } catch (error) {}
};
newDataBase();
