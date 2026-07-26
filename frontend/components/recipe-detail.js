import recipes from "../api/recipes.js";
import Recipe from "../models/recipe.js";

export default class RecipeDetail extends HTMLElement {
    /** @type {HTMLTemplateElement} */ #template;

    /** @type {HTMLElement} */ #id;
    /** @type {HTMLElement} */ #name;
    /** @type {HTMLElement} */ #url;
    /** @type {HTMLElement} */ #cookTime;
    /** @type {HTMLElement} */ #prepTime;
    /** @type {HTMLElement} */ #steps;
    /** @type {HTMLElement} */ #ingredients;
    /** @type {HTMLElement} */ #image;


    get recipeId() {
        return this.getAttribute("recipe-id");
    }

    set recipeId(value) {
        if (value == null)
            this.removeAttribute("recipe-id");
        else
            this.setAttribute("recipe-id", value);
    
    }

    static get observedAttributes() {
        return ["recipe-id"];
    }

    constructor() {
        super();

        this.#template = document.getElementById("recipe-detail");
        this.attachShadow({ mode: "open" });

        this.initializeTemplate();
    }

    initializeTemplate() {
        this.shadowRoot.innerHTML = "";
        this.shadowRoot.appendChild(this.#template.content.cloneNode(true));

        //Add all variables:
        this.#id = this.shadowRoot.getElementById("id");

    }

    async attributeChangedCallback() {
        if (!this.recipeId) {
            this.shadowRoot.innerHTML = "";
            return;
        }

        /** @type {Recipe} */
        let recipe;
        try {
            recipe = await recipes.get_recipe(this.recipeId);
        } catch(e) {
            alert(e);
            return;
        }

        this.initializeTemplate();

        this.#id.innerText = recipe.id;
    }

};

window.customElements.define("recipe-detail", RecipeDetail);