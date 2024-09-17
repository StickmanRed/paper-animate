class Project {
    constructor() {
        this.name = "Untitled";
        this.undoStack = [];
        this.redoStack = [];
        this.keymaps = {};
    }

    attach() {
        window.globalProject = this;
    }

    stackAdd(funcWrapper) {
        this.undoStack.push(funcWrapper);
        this.redoStack = [];
        return funcWrapper.action();
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

export {Project};