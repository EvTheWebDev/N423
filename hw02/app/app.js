import * as MODEL from "../model/model.js";
function initListeners() {
  $(`#random-meal-btn`).on("click", function () {
    MODEL.getRandomMeal();
  });
  $(`#search`).on("click", function () {
    // console.log("Search button clicked");
    let location = $("#location").val();
    if (location != "") {
        console.log("Selected location:", location);
    } else {
        alert("Please enter a location.");
    }
    MODEL.getWeather(location);
  });

  $(`#forecastSearch`).on("click", function () {
    // console.log("Forecast button clicked");
    let location = $("#forecastLocation").val();
    let days = $("#days").val();
    if (location != "") {
        console.log("Selected location:", location);
        console.log("Generating ", days , " day forecast for ", location , ".");
    } else {
        alert("Please enter a location.");
    }
    MODEL.getForecast(location, days);
  });
}


$(document).ready(function () {
  initListeners();
});
