export function getRandomMeal() {
  let randomMealUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;
  console.log("Fetching a random meal from TheMealDB");

  // because meals are an array, you need to get the first item in the array to access data.

  // Editing Reaction Img / Text w variables
  let reactionImg = document.getElementById("reactionImg");
  let reactionText = document.getElementById("reactionText");
  $.getJSON(randomMealUrl, (data) => {
    console.log(data);
    let meal = data.meals[0];
    let recipeString = `
    <h1 class="recipeName" >${meal.strMeal}</h1>
    <img class="recipeImg" src="${meal.strMealThumb}" alt="Image of ${meal.strMeal}">
    <h3> Ingredients: </h3>
    <ul class="ingredientsList">`;
    // Each meal has 20 ingredient slots, so we loop through them this way
    // We can't use a for each loop because they're all separately keyed
    let ingredientCount = 20;
    for (let i = ingredientCount; i > 0; i--) {
      // Define Ingredients and Measurements
      let ingredient = meal[`strIngredient${i}`];
      let measurement = meal[`strMeasure${i}`];

      //   Check for empty ingredients & measurements
      if (ingredient != "") {
        // console.log(ingredient);
        // if (measurement != " " || measurement != null) {
        //   measurement = "Measurement Missing";
          
        // }
        recipeString += `<li>${ingredient} - <span class="measurement">${measurement}</span></li>`;
      }
    }

    $(".recipeHolder").html(recipeString);
    reactionImg.classList.add("spin");
    reactionImg.src = "assets/img/cooking.jpg";
    reactionText.innerHTML = "Yum!";
  });
}

export function getCategories() {
  let catURL = `https://www.themealdb.com/api/json/v1/1/categories.php`;

  $.getJSON(catURL, (data) => {
    // console.log(data);
    $.each(data.categories, (idx, cat) => {
      $("#cat").append(
        `<option value="${cat.strCategory}">${cat.strCategory}</option>`
      );
    });
  }).fail((error) => {
    console.log("Error fetching categories:", error);
  });
}

export function getMealsByCategory(category) {
    let mealsByCatURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    $.getJSON(mealsByCatURL, (data) => {
        console.log(data);
    }).fail((error) => {
        console.log("Error fetching meals by category:", error);
    });
}