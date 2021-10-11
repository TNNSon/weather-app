const express = require("express");
const axios = require("axios");
const port = process.env.SERVER_PORT || 8080;
var cors = require("cors");
// Configure app to use bodyParser to parse json data
const app = express();
// Add headers before the routes are defined
app.use(cors());

const server = require("http").createServer(app);
require("dotenv").config();
const WEATHER_API = "https://www.metaweather.com/api/";

const HEADERS = {
  Accept: "application/json",
};
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
      <h1>Welcome to Weather React application's proxy server</h1>
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

// Start the server
server.listen(port);
console.log("Server is listening on port " + port);
