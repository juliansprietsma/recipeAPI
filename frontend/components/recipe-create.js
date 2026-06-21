import RecipeFinder from "./recipefinder.js"

export default class RecipeCreator extends HTMLElement {
    /** @type {HTMLInputElement} */ #name;
    /** @type {HTMLInputElement} */ #url;

    /** @type {HTMLButtonElement} */ #searchButton;
    /** @type {HTMLButtonElement} */ #createButton;

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
        this.#searchButton = this.shadowRoot.getElementById("search-button");
        this.#createButton = this.shadowRoot.getElementById("create-button");

        this.#recipeCreator = document.getElementById("creator");
        this.#recipeFinder = document.getElementById("finder");


        this.#searchButton.addEventListener("click", async() => {
            await this.showSearch();
        });
    }


    async showSearch() {
        this.#recipeFinder.style.display = "";
        this.#recipeCreator.style.display = "none";
    }
}

window.customElements.define('recipe-create', RecipeCreator);