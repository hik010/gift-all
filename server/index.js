const express = require('express');
const app = express();
const path = require('path');

app.use(require('morgan')('dev'));

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

// any requests go to index.html
app.use('*', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);


// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

const PORT = process.env.PORT || 8090

const init = async() => {
  app.listen(PORT, ()=>{
    console.log(`Serving locally on port ${PORT}`)
  })
}

init()

module.exports = app
