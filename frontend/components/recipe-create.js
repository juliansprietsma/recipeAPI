import RecipeFinder from "./recipefinder.js"

export default class RecipeCreator extends HTMLElement {
    /** @type {HTMLInputElement} */ #name;
    /** @type {HTMLInputElement} */ #url;
    /** @type {HTMLInputElement} */ #ingredientInput;
    /** @type {HTMLInputElement} */ #cookTime;
    /** @type {HTMLInputElement} */ #prepTime;
    /** @type {HTMLInputElement} */ #stepInput;

    /** @type {HTMLButtonElement} */ #searchButton;
    /** @type {HTMLButtonElement} */ #createButton;
    /** @type {HTMLButtonElement} */ #ingredientAdd;
    /** @type {HTMLButtonElement} */ #stepAdd;

    /** @type {HTMLDivElement} */ #ingredientList;
    /** @type {HTMLDivElement} */ #stepList;
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
        this.#stepInput = this.shadowRoot.getElementById("stepInput");

        this.#searchButton = this.shadowRoot.getElementById("search-button");
        this.#createButton = this.shadowRoot.getElementById("create-button");
        this.#ingredientAdd = this.shadowRoot.getElementById("ingredientAdd");
        this.#stepAdd = this.shadowRoot.getElementById("stepAdd");

        this.#ingredientList = this.shadowRoot.getElementById("ingredientList");
        this.#stepList = this.shadowRoot.getElementById("stepList");

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

        this.#stepAdd.addEventListener("click", async() => {
            await this.addStep();
        });

        this.#stepInput.addEventListener("keydown", async(e) => {
            if (e.key === "Enter") {
                await this.addStep();
            }
        })

        this.#createButton.addEventListener("click", () => {
            this.countSteps = 1;
            this.#ingredientList.innerHTML = "";
            this.#stepList.innerHTML = "";
            
            this.#name.value = "";
            this.#url.value = "";
            this.#cookTime.value = "";
            this.#prepTime.value = "";
            this.#ingredientInput.value = "";
            this.#stepInput.value = "";
        });
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

    async addStep() {
        const text = this.#stepInput.value.trim();
        if (!text) return;

        const span = document.createElement("span");
        span.textContent = this.countSteps + ". " + text;
        span.classList.add("tag", "is-info", "hoverClass");
        
        this.countSteps += 1;

        span.addEventListener("click", () => {
            span.remove();
            this.countSteps -= 1;
        });

        this.#stepList.appendChild(span);
        this.#stepInput.value = "";
        this.#stepInput.focus();
    }

    async showSearch() {
        this.#recipeFinder.style.display = "";
        this.#recipeCreator.style.display = "none";
    }
}

window.customElements.define('recipe-create', RecipeCreator);