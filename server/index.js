const express = require('express');
const app = express();
const path = require('path');
const redis = require('redis');
const socketio = require('socket.io');

const router = require('./api');
const redisClient = redis.createClient();

if (process.env.NODE_ENV !== 'production') require('../secrets');

app.use(require('morgan')('dev'));

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req,res,next) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

app.use('/api',require('./api'))

app.get('/maps-api-key', (req, res) => {
  res.send(process.env.MAPS_API_KEY);
});

// any requests go to index.html
app.use('*', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

const PORT = process.env.PORT || 8090;

const init = async () => {
  const server = app.listen(PORT, () => {
    console.log(`Serving locally on port ${PORT}`);
  });
  const io = socketio(server);
  require('./socket')(io); //server socket events
};

init();

module.exports = app;
