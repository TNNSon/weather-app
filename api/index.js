const express = require("express");
const axios = require("axios");
const port = process.env.PORT || 3001;
var cors = require("cors");
// Configure app to use bodyParser to parse json data
const app = express();
// Add headers before the routes are defined
app.use(cors());

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });
const server = require("http").createServer(app);
require("dotenv").config();
const WEATHER_API = "https://www.metaweather.com/api/";
// custom HTTP headers for authenticating requests sent to Algolia places server
// const HEADERS = {
//   "X-Algolia-Application-Id": process.env.ALGOLIA_PLACES_APP_ID || "",
//   "X-Algolia-API-Key": process.env.ALGOLIA_PLACES_API_KEY || "",
// };
const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
const HEADERS = {
  Accept: "application/json",
};
// Test server is working (GET http://localhost:3001/)
app.get("/", function (req, res) {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Weather React API</title>
    </head>
    <body>
      <h1>Welcome to <a href="https://iamsainikhil.github.io/weather-react" target="_blank" rel="noreferrer noopener">Weather React</a> application's proxy server</h1>
    </body>
    </html>
  `);
});

// Fetch address based on latlong
app.get("/search/query=:seachText", (req, res) => {
  const { seachText } = req.params;
  const url = `${WEATHER_API}location/search/?query=${seachText}`;
  axios
    .get(url, { headers: HEADERS })
    .then((response) => {
      const { data } = response;
      res.header("Access-Control-Allow-Origin", "*");
      res.status(200);
      res.json(data);
    })
    .catch((err) => {
      res.status(err.response ? err.response.status : 500);
      res.send(err.message || "Something went wrong! Please try again later.");
    });
});

// Fetch weather forecast based on latlong
app.get("/location/:id", (req, res) => {
  const { id } = req.params;
  const url = `${WEATHER_API}location/${id}`;
  axios
    .get(url)
    .then((response) => {
      const { data } = response;
      res.status(200);
      res.json(data);
    })
    .catch((err) => {
      res.status(err.response ? err.response.status : 500);
      res.send(err.message || "Something went wrong! Please try again later.");
    });
});

// Fetch address list based on query
app.get("/places/query/:city/:latlong", (req, res) => {
  const { city, latlong } = req.params;
  axios
    .request({
      url: "https://places-dsn.algolia.net/1/places/query",
      method: "post",
      data: {
        query: city,
        type: "city",
        aroundLatLng: latlong,
      },
      headers: HEADERS,
    })
    .then((response) => {
      const { data } = response;
      res.status(200);
      res.json(data);
    })
    .catch((err) => {
      res.status(err.response ? err.response.status : 500);
      res.send(err.message || "Something went wrong! Please try again later.");
    });
});

// Start the server
server.listen(port);
console.log("Server is listening on port " + port);
