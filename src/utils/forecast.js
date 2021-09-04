const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=93fa0495a26785289c8db0415bcfdd59&query=' + latitude + ',' + longitude
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('cannot connect to the weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + ', It is currently ' + body.current.temperature + ' °C out. ' + 'But it feels like ' + body.current.feelslike + ' °C.')
        }
    })
}



module.exports = forecast;  