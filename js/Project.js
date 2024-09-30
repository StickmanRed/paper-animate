import { FunctionWrapper } from "./FunctionWrapper.js";

export class Project {
    constructor() {
        this.name = "Untitled";
      
        // WindowName:Window pairs
        this.windows = {};
    }

    attach() {
        window.globalProject = this;
    }
}