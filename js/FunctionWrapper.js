/* Provides a undo/redo functionality to functions. */

export class FunctionWrapper {
    constructor(action, inverse, initialData) {
        this.data = initialData ?? {};
        const dataObject = this.data;
        this.action = function() {return action(dataObject)};
        this.inverse = function() {return inverse(dataObject)};
    }
}