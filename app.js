const express = require('express');
//executing the express package
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//to use it on everytime we hit a request we use middleware like this
// to be able to access it from different domain
app.use(cors());
//need a body parser every time to parse data to json or it will give undefined
app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routes/posts');
//Using Middleware to call posts.js
app.use('/posts', postsRoute);

//Middlewares example
//sample
// app.use('/posts', () => {
//     console.log('This is middleware running in posts');
// });

// Route
app.get('/', (req, res) => {
    res.send('we are on Home');
});

//Connecto to DB, taking url from .env file
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('Connected to DB !');
})

//How to start listening to the server
app.listen(3000);