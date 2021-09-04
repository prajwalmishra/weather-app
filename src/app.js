const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('postman-request');

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const pathToIndex =  path.join(__dirname, '../public')
const pathToViews = path.join(__dirname, '../templates/views')
const pathToPartials = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', pathToViews)
hbs.registerPartials(pathToPartials)

// Setup static directory to serve
app.use(express.static(pathToIndex))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather', 
        name: 'prajwal mishra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page', 
        name: 'prajwal mishra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'If there is a problem please wait a moment',
        title: 'Help', 
        name: 'prajwal mishra'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    const address = req.query.address

    geocode(address, (error, { Latitude, Longitude, Location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(Latitude, Longitude,(error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                location: Location,
                address: address
            })    
        })
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: '404',
        name: 'prajwal mishra',
        errorMessage: 'Help article not found.'
    })
})


app.get('*', (req, res) =>{
    res.render('404',{
        title: '404',
        name: 'prajwal mishra',
        errorMessage: 'error Page not found!'
    })
})


app.listen(3000, () => {
    console.log('listening on port 3000')
})

