// import { FunctionWrapper } from "./FunctionWrapper.js";

/* Windows */
// import { initTest } from "./windowInterface/windows-Test.js";

export class Project {
    constructor() {
        this.name = "Untitled";
      
        // WindowID:WindowInitialization pairs
        this.windows = {};
    }

    attach() {
        window.globalProject = this;
    }
}