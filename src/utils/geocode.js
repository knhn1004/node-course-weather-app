const request = require('request')


const geocode = (address, callback) => {
  const token = 'pk.eyJ1Ijoib2xpdmVyMTIzMTAiLCJhIjoiY2s0cXJxdWhuMHFvMDN0bXQ2eGM2OGFhdyJ9.P0Hoe6xDJhHwpIawCZRYeg'
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`

  request({ url, json: true }, (err, {body}) => {
    if (err) {
      callback('Unable to connect to location service', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined)
    } else {
      callback(undefined, {
	latitude: body.features[0].center[1],
	longitude: body.features[0].center[0],
	location: body.features[0].place_name,
      })
    }
  })
}

module.exports = geocode
