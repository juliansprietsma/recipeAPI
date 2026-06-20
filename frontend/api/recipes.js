import RecipeSummary from "../models/recipe-summary.js";
import Recipe from "../models/recipe.js";
import apiCall from "./call.js";

export default {

    /**
     * @param {string} name
     * @param {string} cookTime
     * @param {string[]} ingredients
     * @returns {Promise<RecipeSummary[]>} 
     * 
     */
    async get_recipes(name = null, cookTime = null, ingredients = []) {
        const apiResponse = await apiCall("recipes", "GET", {
            name: name,
            cookTime: cookTime,
            ingredients: ingredients
        });

        if (!apiResponse.ok) throw new Error(await apiResponse.text());

        return (await apiResponse.json()).map(RecipeSummary.fromJson);
    },

    /**
     * @param {number} id
     * @returns {Promise<Recipe>}
     */
    async get_recipe(id) {
        const apiResponse = await apiCall("recipes/${id}", "GET");
        if (!apiResponse.ok) throw new Error(await apiResponse.text());

        return Recipe.fromJson(await apiResponse.json());
    }


}