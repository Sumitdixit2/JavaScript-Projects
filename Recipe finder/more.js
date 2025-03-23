document.addEventListener("DOMContentLoaded", function () {
    let recipe = JSON.parse(localStorage.getItem("recipeDetails"));
    let instructions = JSON.parse(localStorage.getItem("recipeInstructions"));
  
    if (!recipe || !instructions) {
      alert("No recipe data found! Please search for a recipe first.");
      window.location.href = "index.html";
      return;
    }
  

    document.getElementById("recipeImage").src = recipe.image;
    document.getElementById("recipeTitle").textContent = recipe.title;
  

    let instructionsList = document.getElementById("recipeInstructions");
    instructions.forEach((step, index) => {
      let li = document.createElement("li");
      li.textContent = `${index + 1}. ${step.step}`;
      instructionsList.appendChild(li);
    });
  });
  
  function goBack() {
    window.location.href = "index.html";
  }
  