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

        const params = new URLSearchParams();

        params.append("name", name);
        params.append("cookTime", cookTime);

        ingredients.forEach(ingredient => {
            params.append("ingredients", ingredient);
        });

        const apiResponse = await apiCall("recipes", "GET", params);

        if (!apiResponse.ok) throw new Error(await apiResponse.text());

        return (await apiResponse.json()).map(RecipeSummary.fromJson);
    },

    /**
     * @param {number} id
     * @returns {Promise<Recipe>}
     */
    async get_recipe(id) {
        const apiResponse = await apiCall(`recipes/${id}`, "GET");
        if (!apiResponse.ok) throw new Error(await apiResponse.text());

        return Recipe.fromJson(await apiResponse.json());
    },


    /**
     * @param {Recipe} recipe
     * @returns {Number}
     */
    async create_recipe(recipe) {
        const apiResponse = await apiCall('recipes', "POST", recipe);
        if (!apiResponse.ok) throw new Error(await apiResponse.text());

        return await apiResponse.json();
    },


    /**
     * @param {Number} id
     * @param {File} file
     * @returns {Promise<Recipe>}
     */
    async upload_image(id, file) {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('file', file);

        const apiResponse = await apiCall(`recipes/${id}/image`, "PUT", formData);
        if (!apiResponse.ok) throw new Error(await apiResponse.text());

        return Recipe.fromJson(await apiResponse.json());
    },

    /**
     * @returns {Boolean}
     */
    async check_default_image(file) {
        const formData = new FormData();
        formData.append('file', file);

        const apiResponse = await apiCall('recipes/upload_default_image', "POST", formData);
        if (!apiResponse.ok) return true;

        return false;
    },

    /**
     * @param {Number} id
     * @param {string} filename
     */
    async set_image(id, filename) {
        const apiResponse = await apiCall('recipes/set_image', "PUT", {id:id, image:filename});
        if (!apiResponse.ok) throw new Error(await apiResponse.text());

    }

}