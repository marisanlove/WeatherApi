const config = require('./config.json')
const express = require('express');
const app = express();
const ejs = require('ejs')
const bodyParser = require('body-parser');
const axios = require('axios');

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', async function(req, res) {
  let weather_data;
  const options = { method: 'GET', url: 'https://api.open-meteo.com/v1/forecast?latitude=40.49&longitude=-112.00&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver'};
  await axios.request(options).then(function(response) {
    weather_data = JSON.parse(JSON.stringify(response.data))
  }).catch(function(error) {
    console.error(error);
  });
  console.log(weather_data)
  res.render('index', {
    config: config,
    weather_data: weather_data
  })
});

const port = config.port || 3000;
app.listen(port, function() {
  console.log(`Express App Started - Port: ${port}`);
});
  