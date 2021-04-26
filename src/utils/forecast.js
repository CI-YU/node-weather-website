const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e7021976345d10048072da73e4e7847d&query=" +
    latitude +
    "," +
    longitude +
    "";
  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        "This is currently " +
          body.current.temperature +
          " degress out, There is a " +
          body.current.feelslike +
          " chance"
      );
    }
  });
};

module.exports = forecast;

//get weather
// const url =
//   "http://api.weatherstack.com/current?access_key=e7021976345d10048072da73e4e7847d&query=taipei";

// request({ url: url, json: true }, (err, res) => {
//   if (err) {
//     console.log("Unable to connect to weather service!");
//   } else if (res.body.error) {
//     console.log("Unable to find location!");
//   } else {
//     console.log(res.body.current.temperature);
//     console.log(res.body.current.feelslike);
//   }
// });
