export default class StepSummary {
    /** @type {int} */
    stepNr;

    /** @type {str} */
    step;
    
    /**
     * @param {Object}
     * @returns {StepSummary}
     */
    static fromJson(json) {
        let stepsummary = new StepSummary();
        stepsummary.stepNr = json.stepNr;
        stepsummary.step = json.step;        

        return stepsummary;
    }
}