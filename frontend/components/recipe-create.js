import RecipeFinder from "./recipefinder.js"

export default class RecipeCreator extends HTMLElement {
    /** @type {HTMLInputElement} */ #name;
    /** @type {HTMLInputElement} */ #url;
    /** @type {HTMLInputElement} */ #ingredientInput;
    /** @type {HTMLInputElement} */ #cookTime;
    /** @type {HTMLInputElement} */ #prepTime;
    /** @type {HTMLInputElement} */ #stepText;

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
        this.#ingredientInput = this.shadowRoot.getElementById("ingredientInput");
        this.#cookTime = this.shadowRoot.getElementById("cookTime");
        this.#prepTime = this.shadowRoot.getElementById("prepTime");
        this.#stepText = this.shadowRoot.getElementById("stepText");

        this.#searchButton = this.shadowRoot.getElementById("search-button");
        this.#createButton = this.shadowRoot.getElementById("create-button");
        this.#ingredientAdd = this.shadowRoot.getElementById("ingredientAdd");

        this.#ingredientList = this.shadowRoot.getElementById("ingredientList");

        this.#recipeCreator = document.getElementById("creator");
        this.#recipeFinder = document.getElementById("finder");

        this.countSteps = 1;


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

        this.#createButton.addEventListener("click", () => {
            this.countSteps = 1;
            this.#ingredientList.innerHTML = "";
            
            this.#name.value = "";
            this.#url.value = "";
            this.#cookTime.value = "";
            this.#prepTime.value = "";
            this.#ingredientInput.value = "";

            alert(this.#stepText.value);
            const steps = this.#stepText.value.split("\n");
            for (let i = 0; i <= steps.length; i++) {
                if (steps[i] == "") {
                    steps.splice(i, 1);
                    i--;
                }
            }
            alert(steps);

        });
    }

    async create() {

        if (this.#name.value == "" ||
            this.#ingredientInput.value == "" ||
            this.#stepText.value.split("\n") == ""
        ) {
            alert("Fill in all necessary fields (Name, cook time, prep time, ingredients and steps)");
        } else {

            // Create list for ingredients
            
            // Create list for steps

            // Create new Recipe object

            // Call create_recipe function with new Recipe object

            // Return Transaction or throw errors (try except)

        }
    


        const steps = this.#stepText.value.split("\n");
        for (let i = 0; i <= steps.length; i++) {
            if (steps[i] == "") {
                steps.splice(i, 1);
                i--;
            }
        }

        steps = []

        this.#ingredientList.innerHTML = "";
            
        this.#name.value = "";
        this.#url.value = "";
        this.#cookTime.value = "";
        this.#prepTime.value = "";
        this.#ingredientInput.value = "";
    }

    async addIngredient() {
        const text = this.#ingredientInput.value.trim();
        if (!text) return;

        const span = document.createElement("span");
        span.textContent = text;
        span.classList.add("tag", "is-info", "hoverClass");

        span.addEventListener("click", () => {
            span.remove();
        });

        this.#ingredientList.appendChild(span);
        this.#ingredientInput.value = "";
        this.#ingredientInput.focus();
    }

    async showSearch() {
        this.#recipeFinder.style.display = "";
        this.#recipeCreator.style.display = "none";
    }
}

window.customElements.define('recipe-create', RecipeCreator);