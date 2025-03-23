let ingredientsArray = JSON.parse(localStorage.getItem("ingredientsList")) || [];

function renderIngredients() {
  let ingredientsList = document.getElementById("ingredients");
  ingredientsList.innerHTML = "";

  ingredientsArray.forEach((ingredient) => {
    let listItem = document.createElement("li");
    listItem.classList.add("newItem");
    listItem.textContent = ingredient;
    listItem.addEventListener("click", removeIngredient);
    ingredientsList.appendChild(listItem);
  });
}

document.getElementById("add").addEventListener("click", function () {
  let ingredients = document.getElementById("text").value.trim();

  if (ingredients === "" || !isNaN(ingredients)) {
    alert("Enter a valid ingredient");
    return;
  }

  ingredientsArray.push(ingredients);
  localStorage.setItem("ingredientsList", JSON.stringify(ingredientsArray));

  renderIngredients();
  document.getElementById("text").value = "";
});

function removeIngredient(event) {
  let ingredientToRemove = event.target.textContent;
  ingredientsArray = ingredientsArray.filter((item) => item !== ingredientToRemove);
  localStorage.setItem("ingredientsList", JSON.stringify(ingredientsArray));
  renderIngredients();
}

function searchRecipe() {
  ingredientsArray = [];

  document.querySelectorAll(".newItem").forEach((response) => {
    ingredientsArray.push(response.textContent);
  });

  if (ingredientsArray.length === 0) {
    alert("Please enter at least 1 ingredient");
    return;
  }

  if (ingredientsArray.length > 5) {
    alert("Please enter less than 5 ingredients");
    ingredientsArray.pop();
    document.getElementById("ingredients").lastChild.remove();
  }

  console.log(ingredientsArray);

  document.querySelector("#outputs").style.display = "block";

  let recipeUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsArray.join(",")}\&apiKey=ee14a65b7da84a87b757731bbb59ffa2\&number=1\&ranking=2`;

  fetch(recipeUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        alert("No recipes found for these ingredients.");
        return;
      }

      let recipe = data[0];
      localStorage.setItem("recipeDetails", JSON.stringify(recipe));

      document.getElementById("image").src = recipe.image;
      document.getElementById("title").textContent = recipe.title;
      document.getElementById("content").textContent = `Missing Ingredients: ${recipe.missedIngredientCount}`;
      document.getElementById("content1").textContent = `Unused Ingredients: ${recipe.unusedIngredients.length + 1}`;
      document.getElementById("content2").textContent = `Used Ingredients: ${recipe.usedIngredientCount}`;

      let recipeInstructionUrl = `https://api.spoonacular.com/recipes/${recipe.id}/analyzedInstructions?apiKey=ee14a65b7da84a87b757731bbb59ffa2`;

      return fetch(recipeInstructionUrl);
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        localStorage.setItem("recipeInstructions", JSON.stringify([]));
      } else {
        localStorage.setItem("recipeInstructions", JSON.stringify(data[0].steps));
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

document.addEventListener("DOMContentLoaded", renderIngredients);

document.getElementById("search").addEventListener("click", searchRecipe);
document.getElementById("ingredients").addEventListener("click", removeIngredient);

function goBack() {
  if (document.referrer) {
    window.history.back();
  } else {
    window.location.href = "index.html";
  }
}
