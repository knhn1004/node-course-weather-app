const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/8429555f261277b886a440112f1286f1/${latitude},${longitude}`;
  request({url, json: true}, (err, {body}) => {
      if (err) {
	callback('Unable to connect to forecast service', undefined);
      } else if (body.error) {
	callback('Coordinate Error: location not found!', undefined);
      } else {
	callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
      }
    })
}


module.exports = forecast;
