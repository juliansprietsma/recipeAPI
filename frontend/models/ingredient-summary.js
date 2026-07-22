export default class IngredientSummary {
    /** @type {string} */
    name; 

    /** @type {number} */
    amount;

    /** @type {string} */
    unit;

    /**
     * @param {Object}
     * @returns {IngredientSummary}
     */
    static fromJson(json) {
        let ingr = new IngredientSummary();
        ingr.name = json.name;
        ingr.amount = json.amount;
        ingr.unit = json.unit;

        return ingr;
    }
}