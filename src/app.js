const path = require('path')
const express = require('express');
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

// Define paths for Express config
const app = express();
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

// Routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Oliver Chou'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Oliver Chou',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Oliver Chou'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, data) => {
      res.send({
	forecast: data,
	location: location,
      })
    })
  })
  // res.send({
    // forecast: 'Clear',
    // location: 'Taichung, Taiwan',
    // address: req.query.address
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  })
})

// dealing with 404
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Oliver Chou',
    errorMsg: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'page not found.',
    name: 'Oliver Chou',
  })
})

app.listen(3000, () => {
  console.log('Server running on port 3000.');
});
