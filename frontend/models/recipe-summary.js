export default class RecipeSummary {

    /** @type {number} */
    id;

    /** @type {string} */
    name;

    /** @type {string?} */
    url;

    /** @type {string} */
    cookTime;

    /** @type {string} */
    image;

    /**
     * @param {object}
     * @returns {RecipeSummary}
     */
    static fromJson(json) {
        return Object.assign(new RecipeSummary(), json);
    }
}