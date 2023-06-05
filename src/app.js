const path = require('path');
const express = require('express');
const exp = require('constants');
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

//Define path for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')//accesing hbs and binding with express js for dynamic views
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Avinash'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Page',
        name : 'Avinash Rana'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help Page',
        name : 'Avinash',
        helpText : 'Its an Help Page'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address;

    if(!address){
        return res.send({
            error : "Please provide address for search"
        })
    }
    else
    {
        geoCode(address, (error, {latitude, longitude, location}= {}) => {
          if(error){
            return res.send({
                error
            })
          }
      
            forecast(latitude, longitude, (error, forecastData) => {
      
              if(error){
                return res.send({
                    error
                });
              }
              res.send({
                Weather_Description : forecastData.Weather_descriptions,
                Temperature : forecastData.Temperature,
                location,
                address
              })
              //console.log(location);
              //console.log(forecastData)
      
            })
      
        })
      }
      

    
    // res.send({weatherUpdates : {
    //     foreCast : "Hazy",
    //     location : "Kolkata",
    //     temperature : 39,
    //     address : req.query.address
    // }})
})


app.get('/products', (req, res) => {
    console.log(req.query.search)

    if(!req.query.search){
        return res.send({
            error : "You must provide a search term"
        })
    }

    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name : 'Avinash',
        errorMessage : 'Help Article Not Found.'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title : '404',
        name : 'Avinash',
        errorMessage : 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Node Js Application running on '+port);
})