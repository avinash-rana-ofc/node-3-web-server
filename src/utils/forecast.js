const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=19595b915fb84dfa1a83137c6b5f4ba0&query='+latitude+','+longitude;
    //console.log(foreCastUrl)
    request({url, json : true}, (error, {body}) => {
        if(error)
        {
        callback("Unable to connect to Weather Stack!!")
        }
        else if(body.error){
        callback("Unable to find location! Try another search.")
        }
        else{
            callback(undefined,
            {
                Weather_descriptions : body.current.weather_descriptions[0],
                Temperature : body.current.temperature,
                feelLike : body.current.feelslike,
                humidity : body.current.humidity

            }
            )
        }
    })
    }

    module.exports = forecast;