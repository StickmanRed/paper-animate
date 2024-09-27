import { FunctionWrapper } from "./FunctionWrapper.js";

export class Project {
    constructor() {
        this.name = "Untitled";

        // @StickmanRed (note to self), what actions should be on the undo stack?
        // Also, should different containers have different undo stacks?
        // Containers are the "sidebars"; you're to be able to put components in them.
        this.undoStack = [];
        this.redoStack = [];

        // this.keymaps entries come in keymap name:KeymapObject pairs
        // Each container will have a keymapName to which it will reference
        this.keymaps = {};
        // this.mouseAction is an ID for the current mouse thingy being done
        // I think HTML is capable enough for mouseAction to not be verified?
        this.mouseAction = "";

        // Needed by tools to create FunctionWrappers
        this.classes = {
            FunctionWrapper: FunctionWrapper
        };

        // WindowName:Window pairs
        this.windows = {};
    }

    attach() {
        window.globalProject = this;
    }

    stackAdd(funcWrapper, runAction) {
        this.undoStack.push(funcWrapper);
        this.redoStack = [];
        return runAction ? funcWrapper.action() : null;
    }
    stackUndo() {
        if (this.undoStack.length === 0) {return null;}
        const funcWrapper = this.undoStack.pop()
        this.redoStack.push(funcWrapper);
        return funcWrapper.inverse();
    }
    stackRedo() {
        if (this.redoStack.length === 0) {return null;}
        const funcWrapper = this.redoStack.pop();
        this.undoStack.push(funcWrapper);
        return funcWrapper.action();
    }

    keymapsAdd(name, keymap) {
        this.keymaps[name] = keymap;
    }
    keymapsRemove(name) {
        delete this.keymaps[name];
    }
}