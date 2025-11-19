console.log("Nothing has broken yet....");

// Naviagtion Menu
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

// For Add Recipe Page
// Ingredients
const addIngredientBtn = document.getElementById("add-ingredient-btn");
const ingredientsContainer = document.getElementById("ingredients-container");

addIngredientBtn.addEventListener("click", () => {
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.name = "ingredients[]";
  newInput.className = "input-box";
  newInput.required = true;
  ingredientsContainer.appendChild(newInput);
});

// Instructions
const addInstructionBtn = document.getElementById("add-instruction-btn");
const instructionsContainer = document.getElementById("instructions-container");

addInstructionBtn.addEventListener("click", () => {
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.name = "instructions[]";
  newInput.className = "input-box";
  newInput.required = true;
  instructionsContainer.appendChild(newInput);
});
