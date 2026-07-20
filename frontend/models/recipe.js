import StepSummary from "./step-summary.js"
import IngredientSummary from "./ingredient-summary.js"

export default class Recipe {

    /** @type {number} */
    id;

    /** @type {string} */
    name;

    /** @type {string?} */
    url;

    /** @type {string?} */
    cookTime;

    /** @type {string?} */
    prepTime;

    /** @type {StepSummary[]?} */
    steps = [];

    /** @type {IngredientSummary[]?} */
    ingredients = [];    

    /** @type {string?} */
    image;

    
    /**
     * @param {Object}
     * @returns {Recipe}
     */
    static fromJson(json) {
        let recipe = new Recipe();
        recipe.id = json.id;
        recipe.name = json.name;
        recipe.url = json.url;
        recipe.cookTime = json.cookTime;
        recipe.prepTime = json.prepTime;
        recipe.steps = json.steps.map(StepSummary.fromJson());
        recipe.ingredients = json.ingredients.map(IngredientSummary.fromJson());
        recipe.image = json.image;

        return recipe;
    }

}