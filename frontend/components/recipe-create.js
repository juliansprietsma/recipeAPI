import recipes from "../api/recipes.js";
import Recipe from "../models/recipe.js";
import RecipeFinder from "./recipefinder.js"

export default class RecipeCreator extends HTMLElement {
    /** @type {HTMLInputElement} */ #name;
    /** @type {HTMLInputElement} */ #url;
    /** @type {HTMLInputElement} */ #cookTime;
    /** @type {HTMLInputElement} */ #prepTime;
    /** @type {HTMLInputElement} */ #stepText;
    /** @type {HTMLInputElement} */ #imageInput;
 
    /** @type {HTMLInputElement} */ #ingredientInput;
    /** @type {HTMLInputElement} */ #ingredientAmountInput;
    /** @type {HTMLInputElement} */ #ingredientUnitInput;

    /** @type {HTMLButtonElement} */ #searchButton;
    /** @type {HTMLButtonElement} */ #createButton;
    /** @type {HTMLButtonElement} */ #ingredientAdd;

    /** @type {HTMLDivElement} */ #ingredientList;
    /** @type {RecipeCreator} */ #recipeCreator;
    /** @type {RecipeFinder} */ #recipeFinder;

    constructor() {
        super();

        const template = document.getElementById("recipe-create");
        const templateContent = template.content;

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(templateContent.cloneNode(true));

        this.#name = this.shadowRoot.getElementById("name");
        this.#url = this.shadowRoot.getElementById("url");
        this.#cookTime = this.shadowRoot.getElementById("cookTime");
        this.#prepTime = this.shadowRoot.getElementById("prepTime");
        this.#stepText = this.shadowRoot.getElementById("stepText");
        this.#imageInput = this.shadowRoot.getElementById("imageInput");

        this.#ingredientInput = this.shadowRoot.getElementById("ingredientInput");
        this.#ingredientAmountInput = this.shadowRoot.getElementById("ingredientAmount");
        this.#ingredientUnitInput = this.shadowRoot.getElementById("ingredientUnit");

        this.#searchButton = this.shadowRoot.getElementById("search-button");
        this.#createButton = this.shadowRoot.getElementById("create-button");
        this.#ingredientAdd = this.shadowRoot.getElementById("ingredientAdd");

        this.#ingredientList = this.shadowRoot.getElementById("ingredientList");

        this.#recipeCreator = document.getElementById("creator");
        this.#recipeFinder = document.getElementById("finder");

        this.countSteps = 1;
        this.ingredients = [];


        this.#searchButton.addEventListener("click", async() => {
            await this.showSearch();
        });

        this.#ingredientAdd.addEventListener("click", async() => {
            await this.addIngredient();
        });

        this.#ingredientInput.addEventListener("keydown", async(e) => {
            if (e.key === "Enter") {
                await this.addIngredient();
            }
        })

        this.#ingredientAmountInput.addEventListener("keydown", async(e) => {
            if (e.key === "Enter") {
                await this.addIngredient();
            }
        })

        this.#ingredientUnitInput.addEventListener("keydown", async(e) => {
            if (e.key === "Enter") {
                await this.addIngredient();
            }
        })

        this.#createButton.addEventListener("click", async() => {
            await this.create_recipe();
        });
    }

    async create_recipe() {

        if (this.#name.value == "" ||
            this.#stepText.value.split("\n") == "" ||
            this.ingredients.length == 0
        ) {
            alert("Fill in all necessary fields (Name, cook time, prep time, ingredients and steps)");
        } else {
            const stepsText = this.#stepText.value.split("\n");
            for (let i = 0; i <= stepsText.length; i++) {
                if (stepsText[i] == "") {
                    stepsText.splice(i, 1);
                    i--;
                }
            }

            let steps = [];
            for (let i = 0; i < stepsText.length; i++) {
                steps.push({
                    "stepNr": i + 1,
                    "step": stepsText[i]
                });
            }


            let newRecipe = new Recipe();
            newRecipe.name = this.#name.value;
            newRecipe.url = this.#url.value;
            newRecipe.cookTime = this.#cookTime.value;
            newRecipe.prepTime = this.#prepTime.value;
            newRecipe.steps = steps;
            newRecipe.ingredients = this.ingredients;
            newRecipe.image = "";


            try {
                let recipeCreate = await recipes.create_recipe(newRecipe);

                if (!this.#imageInput.files || this.#imageInput.files.length == 0) {
                    let response = await fetch("https://i.postimg.cc/DzXb2pCX/food-placeholder.png");
                    const blob = await response.blob();
                    const defaultFile = new File([blob], "default.png", {type: blob.type || "image/png"});

                    recipes.upload_image(recipeCreate, defaultFile);
                } else {
                    recipes.upload_image(recipeCreate, this.#imageInput.files[0]);
                }

                alert("Recipe created with ID: " + recipeCreate);
                


                this.countSteps = 1;
                this.#ingredientList.innerHTML = "";
                    
                this.#name.value = "";
                this.#url.value = "";
                this.#cookTime.value = "";
                this.#prepTime.value = "";
                this.#ingredientInput.value = "";

                this.#ingredientInput.value = "";
                this.ingredients = [];
                
                return recipeCreate;
            } catch(e) {
                alert(e);
                return;
            }



        }
    }

    async addIngredient() {
        const text = this.#ingredientUnitInput.value != "" ? 
                     this.#ingredientAmountInput.value.trim() + this.#ingredientUnitInput.value.trim() + " " + this.#ingredientInput.value.trim() :
                     this.#ingredientAmountInput.value.trim() + " " + this.#ingredientInput.value.trim();
        if (!text) return;

        this.ingredients.push({name: this.#ingredientInput.value.trim(),
            amount: this.#ingredientAmountInput.value.trim(),
            unit: this.#ingredientUnitInput.value.trim()});

        const span = document.createElement("span");
        span.textContent = text;
        span.id = this.#ingredientInput.value.trim();
        span.classList.add("tag", "is-info", "hoverClass");

        span.addEventListener("click", () => {
            for (let i = 0; i < this.ingredients.length; i++) {
                if (this.ingredients[i]["name"] == span.id) {
                    this.ingredients.splice(i, 1);
                }
            }

            span.remove();
        });

        this.#ingredientList.appendChild(span);
        this.#ingredientInput.value = "";
        this.#ingredientAmountInput.value = "";
        this.#ingredientUnitInput.value = "";
        this.#ingredientInput.focus();
    }

    async showSearch() {
        this.#recipeFinder.style.display = "";
        this.#recipeCreator.style.display = "none";
    }
}

window.customElements.define('recipe-create', RecipeCreator);