'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./db/mongoose');
const userRouter = require('./routers/user');
const noteRouter = require('./routers/note');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serveriseide configuration for  cross-origin HTTP request (CORS)
app.use((req, res, next) => {
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Allow the following HTTP methods
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH'
  );
  // Allow the following headers
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type',
    'Authorization'
  );
  // Allow credentials (if needed)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Continue with the request
  next();
});

app.use(
  cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      // 'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
    ],
  })
);

// const cors=require("cors");
// const corsOptions ={
//    origin:'*',
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

// app.use(cors(corsOptions))

// Register routers
app.use(userRouter);
app.use(noteRouter);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  const object = {
    name: 'Edwin',
  };
  //   res.send('Run the client side note app first');
  res.status(200).send(object);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
