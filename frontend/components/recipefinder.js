import recipes from "../api/recipes.js";
import ApiRecipeSummary from "../models/recipe-summary.js"
import RecipeSummary from "./recipe-summary.js";


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
    /** @type {HTMLDivElement} */ #results;


    /** @type {boolean} */ #hasResults = false;


    constructor() {
        super();

        const template = document.getElementById("recipe-finder");
        const templateContent = template.content;

        this.attachShadow({ mode: open });
        this.shadowRoot.appendChild(templateContent.cloneNode(true));

        this.#nameSearch = this.shadowRoot.getElementById("name");
        this.#cookTimeSearch = this.shadowRoot.getElementById("cookTime");
        this.#search = this.shadowRoot.getElementById("search");
        this.#results = this.shadowRoot.getElementById("recipes");


        this.#search.addEventListener("click", async () => {
            await this.search();
        });
    }

    async search() {
        let name = this.#nameSearch.value;
        let cookTime = this.#cookTimeSearch.value;


        /** @type {ApiRecipeSummary[]} */
        let recipeResult;
        try {
            recipeResult = await recipes.get_recipes(name=name, cookTime=cookTime, ingredients=[]);
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