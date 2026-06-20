export default class RecipeSummary extends HTMLElement {

    get recipeId() {
        return this.getAttribute("recipe-id");
    }

    set recipeId(value) {
        if (value == null)
            this.removeAttribute("recipe-id");
        else
            this.setAttribute("recipe-id", value);
    }

    constructor() {
        super();

        const template = document.getElementById("recipe-summary");
        const templateContent = template.content;

        this.attachShadow({ mode: open });

        this.shadowRoot.appendChild(templateContent.cloneNode(true));
    }
};

window.customElements.define("recipe-summary", RecipeSummary);