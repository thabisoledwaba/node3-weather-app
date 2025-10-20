import request from "postman-request";

const forecast = (lat,long,callback) => {
      const baseUrl = "http://api.openweathermap.org";
      const currWeather_Key = "acfa86e90706b2f0d8c316a46c5054ae";
      const currentWeatherApi = baseUrl+"/data/2.5/weather?units=metric&lat="+lat+"&lon="+long+"&appid=" + currWeather_Key;
  
      request({url:currentWeatherApi,json:true}, (error,response,body) => {
          if(error){
            callback("Unable to connect to location services!",undefined);
          }else if(body){              
              const data = body;   //JSON.parse(body);
              const { temp:temperature, temp_min:minimumTemperature } = data.main;

              const weatherForecast = {
                current: data.weather[0].description,
                temperature,
                minimumTemperature
              }              
              callback(undefined,weatherForecast);
          }
  
      });

}

export default forecast;