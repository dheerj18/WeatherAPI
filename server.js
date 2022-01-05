const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
//
app.use(bodyParser.urlencoded({ extended: true }));
//
app.listen(3000, function () {
  console.log("server started");
});
//
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  //   res.send("started");
});
//
app.post("/", function (req, res) {
  const country = req.body.cityName;
  const apiKey = "44dd6e04d33fd98fb906705f01c202ed";
  const units = "metric";
  https.get(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      country +
      "&appid=" +
      apiKey +
      "&units=" +
      units +
      "",
    function (response) {
      console.log(response.statusCode);
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescrip = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write(
          "<h1>The temperature in " +
            country +
            " is " +
            temp +
            " degree Celcius</h1>"
        );
        res.write("<p>The weather is currently " + weatherDescrip + "</p>");
        res.write("<img src=" + imageUrl + ">");
        res.send();
      });
    }
  );
});
