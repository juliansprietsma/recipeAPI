import recipes from "../api/recipes.js";
import ApiRecipeSummary from "../models/recipe-summary.js"
import RecipeSummary from "./recipe-summary.js";
import RecipeCreator from "./recipe-create.js";

export class RecipeSelectedEvent extends Event {
    /** @type {number} */
    recipeId;

    /**
     * @param {number} recipeId
     */
    constructor(recipeId) {
        super("recipe-selected");

        this.recipeId = recipeId;
    }
}

export default class RecipeFinder extends HTMLElement {
    /** @type {HTMLInputElement} */ #nameSearch;
    /** @type {HTMLInputElement} */ #cookTimeSearch;
    /** @type {HTMLButtonElement} */ #search;
    /** @type {HTMLButtonElement} */ #options;
    /** @type {HTMLDivElement} */ #results;
    /** @type {HTMLInputElement} */ #ingredientInput;
    /** @type {HTMLDivElement} */ #ingredientList;
    /** @type {HTMLButtonElement} */ #ingredientAdd;
    /** @type {HTMLButtonElement} */ #createButton;
    /** @type {HTMLDivElement} */ #createElement;
    /** @type {RecipeFinder} */ #recipeFinder;
 

    /** @type {boolean} */ #hasResults = false;


    constructor() {
        super();

        const template = document.getElementById("recipe-finder");
        const templateContent = template.content;

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(templateContent.cloneNode(true));

        this.#nameSearch = this.shadowRoot.getElementById("name");
        this.#cookTimeSearch = this.shadowRoot.getElementById("cookTime");
        this.#search = this.shadowRoot.getElementById("search");
        this.#results = this.shadowRoot.getElementById("recipes");
        this.#ingredientInput = this.shadowRoot.getElementById("ingredientInput");
        this.#ingredientList = this.shadowRoot.getElementById("ingredientList");
        this.#options = this.shadowRoot.getElementById("options-button");
        this.#ingredientAdd = this.shadowRoot.getElementById("ingredientAdd");

        this.#createButton = this.shadowRoot.getElementById("create-button");
        this.#createElement = document.getElementById("creator");
        this.#recipeFinder = document.getElementById("finder");

        this.#createButton.addEventListener("click", async() => {
            await this.showCreate();
        });

        this.#ingredientAdd.addEventListener("click", async() => {
            await this.addItem();
        });

        this.#options.addEventListener("click", async () => {
            await this.showOptions();
        });

        this.#search.addEventListener("click", async () => {
            await this.search();
        });

        this.#ingredientInput.addEventListener("keydown", async (e) => {
            if (e.key === "Enter") {
                await this.addItem();
            }
        });

        this.#nameSearch.addEventListener("keydown", async (e) => {
            if (e.key === "Enter") {
                await this.search();
            }
        });

        this.#cookTimeSearch.addEventListener("keydown", async (e) => {
            if (e.key === "Enter") {
                await this.search();
            }
        });
    }

    async showCreate() {
        this.#createElement.style.display = "";
        this.#recipeFinder.style.display = "none";
    }

    async showOptions() {
        var opt = this.shadowRoot.getElementById("options");
        if (opt.style.display == "none") {
            opt.style.display = "";
        } else {
            opt.style.display = "none";
        }
    }

    async addItem() {
        const text = this.#ingredientInput.value.trim();
        if (!text) return;

        const span = document.createElement("span");
        span.textContent = text;
        span.classList.add("tag", "is-info");

        span.addEventListener("click", () => {
            span.remove();
        });

        this.#ingredientList.appendChild(span);
        this.#ingredientInput.value = "";
        this.#ingredientInput.focus();
    }

    async search() {
        let name = this.#nameSearch.value;
        let cookTime = this.#cookTimeSearch.value;
        let ingredients = [];
        var children = this.#ingredientList.children;
        for (var i = 0; i < children.length; i++) {
            ingredients.push(children[i].textContent);
        }

        /** @type {ApiRecipeSummary[]} */
        let recipeResult;
        try {
            recipeResult = await recipes.get_recipes(name=name, cookTime=cookTime, ingredients=ingredients);
        } catch(e) {
            alert(e);
            return;
        }

        this.#results.innerHTML = "";
        this.#hasResults = false;

        for (let recipe of recipeResult) {
            let recipeView = new RecipeSummary();
            recipeView.recipeId = recipe.id;

            let idSpan = document.createElement("span");
            idSpan.slot = "id";
            idSpan.innerText = recipe.id;

            let nameSpan = document.createElement("span");
            nameSpan.slot = "name";
            nameSpan.innerText = recipe.name;

            let urlSpan = document.createElement("span");
            urlSpan.slot = "url";
            urlSpan.innerText = recipe.url;


            recipeView.appendChild(idSpan);
            recipeView.appendChild(nameSpan);
            recipeView.appendChild(urlSpan);

            recipeView.addEventListener("click", () => {
                this.dispatchEvent(new RecipeSelectedEvent(recipeView.recipeId));
            });

            this.#results.appendChild(recipeView);
            this.#hasResults = true;
        }
    }
}

window.customElements.define("recipe-finder", RecipeFinder);