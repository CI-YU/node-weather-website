const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getcode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const port = process.env.PORT || 3000;

const app = express();

//express path
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Bill',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Bill',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Bill',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address term',
    });
  }

  getcode(
    req.query.address,
    (error, { latitude, longitude, location, attribution } = {}) => {
      if (error) {
        return res.send({ error }); //console.log("Error:", err);
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        console.log(location, forecastData);
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide search term' });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help page error',
    name: 'Bill',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'error title',
    name: 'Bill',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log('Server is up on port 3000');
});
