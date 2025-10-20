import request from "postman-request";

const geocode = (address,callback)=>{
    const baseUrl = "http://api.openweathermap.org";    
    const default_Key = "070aa8853905b6460b5d0c1cf00c5c70";
    const geocodingApi = baseUrl+"/geo/1.0/direct?q=" + address + "&limit&appid=" + default_Key;
    //debugger;  
    request({url:geocodingApi, json:true}, function(error,response,body){
      
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.
      // console.log("Response: " + response);
      if(error){
        callback(error,undefined);
      }
      else if(body){
        const data = body; //JSON.parse(body);
        //const geoData = data[0];
        //console.log(response);
        if(data.length == 0){
          return callback("Unable to get geocode for a given address", undefined);
        }
        const {lat:latitude, lon:longitude, country, state:province ,name:location } = data[0];
        const geoInfo = {
            latitude,
            longitude,
            country,
            province,
            location                                 
        };
        callback(undefined,geoInfo);        
      }
    });

};

export default geocode;
