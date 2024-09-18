/* A class, ToolWrapper, that contains a reference to the tool and other data */
export class ToolWrapper {
    static toolWrappers = {};
    tCounter = 0;
    constructor(name, initiator) {
        /* name: Tool name, used somewhere idk
         * initiator: Function that initiates the tool. Should return a Tool object.
         */
        "blah";
        this.name = name ?? `Tool${++tCounter}`;
        this.tool = initiator(); // I give up trying to make this easier. You do all the work.

        ToolWrapper.toolWrappers[this.name] = this;
    }

    get toolIndex() {
        return paper.tools.indexOf(this.tool);
    }
}