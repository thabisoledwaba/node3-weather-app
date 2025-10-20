import express from "express";
//import path from "node:path";
import hbs from "hbs";
import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";

const app = express();

//Define paths for Express configuration
const publicDirectoryPath = "../public";      //path.join( __dirname,"../public");
const templatesDirectory = "../templates/views";
const partialsPath = "../templates/partials";

// setup handlebars engine and views location
app.set("view engine","hbs");
app.set("views",templatesDirectory);
hbs.registerPartials(partialsPath);

//Set static directory to serve
app.use( express.static(publicDirectoryPath) );

app.get("",( req, res ) => {
    res.render("index", {
        title:"Weather",
        author:"thabiso"
    });
});


app.get("/about",( req, res ) => {
    res.render("about", {
        title:"About",
        author:"thabiso"
    });
});


app.get("/help", (req, res ) => {
    res.render("help", {
        title:"Help",
        message:"ikdkdk kddkjdfkjd kdkdkdlslsl ieakjljdaoja;",
        author:"thabiso"
    })
});


app.get("/weather",(req,res) => {
    const address = req.query.address;
    if( !address ){
        return res.send({
            Error:"Please provide address query string",
        });
    }

    geocode(address,(error, geographicInfo = {} ) => {
        if(error){
            return res.send({
                Error: error
            });
        };

        forecast(geographicInfo.latitude, geographicInfo.longitude, ( error,weatherInfo = {} ) => {
            if(error){
                return res.send( { Error: error } );
            };

            res.send( {
                current: weatherInfo.current,
                temperature: weatherInfo.temperature,
                minimumTemperature: weatherInfo.minimumTemperature,
                location: geographicInfo.location,
                province: geographicInfo.province,
                country: geographicInfo.country
            } );
        });
    });
  
});


//Set up 404 pages
app.get("/help/{*unknown}" , (req, res) => {
    res.render("page404", {
        title:"Help 404",
        message: "Help article not found" ,
        author:"Thabiso Ledwaba"
    });
});

app.get("{*unknown}" , (req, res) => {
    res.render("page404", {
        title:"404",
        message: "Requested Page not found",
        author:"Thabiso Ledwaba"
    });
});


app.listen(3000,() => {
    console.log("Server listening on port : 3000");
});