const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//-----------------added-------------------
const bodyParser = require('body-parser');
const path = require('path')
require('./database');
//-----------------added-------------------

require('dotenv').config();
const app = express();

//-----------------added-------------------
app.use(bodyParser.json());
//-----------------added-------------------
app.use(cors());
// app.use(express.json());
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const playlistRouter = require('./routes/playlist');
const trackRouter = require('./routes/track');
const storyRouter = require('./routes/story');
const usertestRouter = require('./routes/usertest');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/playlist', playlistRouter);
app.use('/track', trackRouter);
app.use('/story', storyRouter);
app.use('/usertest', usertestRouter);

//-----------------added-------------------
// app.use(express.static(path.join(__dirname, '../build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build'))
// })
//-----------------added-------------------

const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});