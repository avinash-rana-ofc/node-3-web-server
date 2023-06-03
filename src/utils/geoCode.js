const request = require('postman-request')


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXZpbmFzaHJhbmE1NSIsImEiOiJjbGhuYXF3ZG0wNnlwM3FwZWdsaWV4NG1qIn0.UvtoInqBZJWeLZUhMnEUyQ&limit=1';
   
    request({url, json : true}, (error, {body}) => {
       if(error){
           callback("Unable to connect weather stack!");
       }
       else if(body.features.length === 0){
           callback("Unable to find location. Try again with another search.");
       }
       else{
           callback(undefined, {
           latitude : body.features[0].center[1],
           longitude : body.features[0].center[0], 
           location : body.features[0].place_name
           }
           )
       }
    })
   }



module.exports = geoCode;
