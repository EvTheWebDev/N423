import * as MODEL from "../model/model.js";
function initListeners() {
  $(`#random-meal-btn`).on("click", function () {
    MODEL.getRandomMeal();
  });
  $(`#search`).on("click", function () {
    // console.log("Search button clicked");
    let category = $("#cat").val();
    if (category != "") {
        console.log("Selected category:", category);
    } else {
        alert("Please select a category");
    }
    MODEL.getMealsByCategory(category);
  });
}

function initCats() {
  MODEL.getCategories();
}

$(document).ready(function () {
  initCats();
  initListeners();
});
