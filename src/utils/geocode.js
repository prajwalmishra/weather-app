
const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJhandhbG1pc2hyYSIsImEiOiJja3QwMWwxamEyeW1oMnV0Znc2bzNuNnE5In0.9-08kabyC3f0lPVxZFtu3A'
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('cannot connect to the weather service!', undefined)
        } else if (body.features.length===0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const data = {
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0],
                Location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode;