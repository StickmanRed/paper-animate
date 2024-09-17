export class KeymapObject {
    constructor() {
        /* Key combinations are notated by keys separated by plus signs: "Shift+e"
         * I don't think anyone will need shortcuts like "q+a"?
         */
        this.keymap = {};
        this.$attached = null; // Meaning attached element
    }
    keyHandler(event) {
        /* @StickmanRed (note to self), check for Mac keyboards sometime
         */
        let keySequence = (event.ctrlKey ? "Control+" : "") 
                        + (event.altKey ? "Alt+" : "")
                        + (event.shiftKey ? "Shift+" : "")
                        + String.fromCharCode(event.which);

        if (Object.hasOwn(this.keymap, keySequence)) {
            window.globalProject.stackAdd(this.keymap[keySequence]);
        }
    }
    assign(keys) {
        Object.assign(this.keymap, keys);
    }
    attach($element) {
        if (this.$attached) {
            this.detach();
        }
        $element.on("keydown", this.keyHandler);
    }
    detach() {
        this.$attached.off("keydown", this.keyHandler);
        this.$attached = null;
    }
}