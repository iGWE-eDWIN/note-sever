const mongoose = require('mongoose');
require('dotenv').config();

// Create a new database
const newDataBase = async () => {
  await mongoose.connect(process.env.mongoDB_Url, {
    useNewUrlParser: true,
  });
};
newDataBase();
