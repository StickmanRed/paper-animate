/* Provides a undo/redo functionality to functions.
 */

class FunctionWrapper {
    constructor(action, inverse) {
        this.data = {};
        const dataObject = this.data;
        this.action = function() {return action(dataObject)};
        this.inverse = function() {return inverse(dataObject)};
    }
}

export {FunctionWrapper};