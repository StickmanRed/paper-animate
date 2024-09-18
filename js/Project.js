import { FunctionWrapper } from "./FunctionWrapper";

export class Project {
    constructor() {
        this.name = "Untitled";

        // @StickmanRed (note to self), what actions should be on the undo stack?
        this.undoStack = [];
        this.redoStack = [];

        this.keymaps = {};

        // Needed by tools to create FunctionWrappers
        this.classes = {
            FunctionWrapper: FunctionWrapper
        };
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
        const funcWrapper = this.undoStack.pop()
        this.redoStack.push(funcWrapper);
        return funcWrapper.inverse();
    }
    stackRedo() {
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