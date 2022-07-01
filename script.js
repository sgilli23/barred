// Author: Samantha
// This is the script for my cocktail page.

"use strict";

// DROP DOWN LIST

// VARIABLES

// URLs
const ingredientsListURL =
  "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
const ingredientsURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=`;
const recipeURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;

// HTML elements
const ingredientsList = document.getElementById("ingredients-list");
const defaultOptionIngredient = document.createElement(`option`);
const defaultOptionCocktail = document.createElement(`option`);
const ingredient = document.createElement(`ingredient`);
const returnedIngredientsBox = document.getElementById(
  `returnedIngredientsBox`
);
const recipe = document.getElementById(`recipe`);
const cocktailText = document.querySelector(`.returnedPoison`);
const ingredientText = document.querySelector(`.pickPoison`);

// buttons
const submitIngredientBtn = document.getElementById("submitIngredient");
const submitCocktailBtn = document.getElementById("submitCocktail");
const cabBtn = document.getElementById("cab");
const homeBtn = document.getElementById("home");

// DEFAULT VALUES

// default text for ingredient list
defaultOptionIngredient.textContent = `Pick your Poison`;
ingredientsList.add(defaultOptionIngredient);
ingredientsList.selectedIndex = 0;

// default text for cocktail list
defaultOptionCocktail.textContent = `Care for a Concoction`;
returnedIngredientsBox.add(defaultOptionCocktail);
returnedIngredientsBox.selectedIndex = 0;

// FUNCTIONS

// goes to Uber
cabBtn.addEventListener(`click`, function (e) {
  e.preventDefault();
  window.location.href = "https://m.uber.com";
});

// refreshes page
homeBtn.addEventListener(`click`, function (e) {
  e.preventDefault();
  window.location.reload();
});

// retrieve list of all ingredients
let getIngredientsList = function () {
  return fetch(ingredientsListURL)
    .then((response) => response.json())
    .then((data) => {
      // extract drinks array
      let ingredients = data.drinks;
      // needed to use of loop not in
      for (const ingredient of ingredients) {
        // console.log(ingredient);
        let drinksObject = ingredient.strIngredient1;
        let option = createOption(drinksObject);
        ingredientsList.appendChild(option);
      }
    });
};

// retrieve json cocktail list
let getCocktailList = function () {
  let suffix = ingredientsList.options[ingredientsList.selectedIndex].value;
  return fetch(`${ingredientsURL}${suffix}`).then((response) =>
    response.json()
  );
};

// add cocktails to drop
let displayCocktailList = function () {
  getCocktailList().then((data) => {
    // display cocktail list
    let cocktails = data.drinks;
    for (const cocktail of cocktails) {
      let returnedIngredients = cocktail.strDrink;
      let returned = createOption(returnedIngredients);
      returnedIngredientsBox.appendChild(returned);
    }
  });
};

// execute search by ingredient and hide/show elements
submitIngredientBtn.addEventListener(`click`, function () {
  displayCocktailList();
  cocktailText.style.visibility === `hidden` &&
  ingredientText.style.visibility === `visible`
    ? ((cocktailText.style.visibility = `visible`),
      (ingredientText.style.visibility = `hidden`),
      (cocktailText.style.display = `flex`),
      (ingredientText.style.display = `contents`))
    : ((cocktailText.style.visibility = `hidden`),
      (ingredientText.style.visibility = `visible`));
});

// path to recipe
let selectedCocktail = function () {
  let suffix =
    returnedIngredientsBox.options[returnedIngredientsBox.selectedIndex].value;
  return fetch(`${recipeURL}${suffix}`).then((response) => response.json());
};

submitCocktailBtn.addEventListener(`click`, function () {
  selectedCocktail().then((data) => {
    let cocktails = data.drinks;
    for (const recipe of cocktails) {
      let recipeID = recipe.idDrink;
      window.location.href = `https://www.thecocktaildb.com/drink/${recipeID}`;
    }
  });
});

// add elements to drop down list
function createOption(text) {
  let option = document.createElement(`option`);
  option.textContent = text;
  return option;
}

// display ingredients list on load
ingredientsList.addEventListener(`load`, getIngredientsList());

// SEARCH BAR

// VARIABLES
const cocktailSearchURL = `https://www.thecocktaildb.com/browse.php?s=`;
const searchBtn = document.getElementById("searchCocktail");

// FUNCTIONS
searchBtn.addEventListener("click", function () {
  let inputSearch = document.getElementById("search").value;
  console.log(inputSearch);
  window.location.href = `${cocktailSearchURL}${inputSearch}`;
});
