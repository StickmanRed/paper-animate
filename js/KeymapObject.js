// *sarcastically* Thanks, Javascript.
// Okay, I guess this is how "this" is supposed to work, but it would be really nice to have some sort of auto-generating function function generator.
function keyHandlerGenerator(thisValue) {
    return function(event) {
        // @StickmanRed (note to self), check for Mac keyboards sometime
        let keySequence = (event.ctrlKey ? "Control+" : "") 
                        + (event.altKey ? "Alt+" : "")
                        + (event.shiftKey ? "Shift+" : "")
                        + String.fromCharCode(event.which);

        if (Object.hasOwn(thisValue.keymap, keySequence)) {
            window.globalProject.stackAdd(thisValue.keymap[keySequence], true);
        }
    }
}

export class KeymapObject {
    constructor() {
        /* Key combinations are notated by keys separated by plus signs: "Shift+e"
         * I don't think anyone will need shortcuts like "q+a"?
         */
        this.keymap = {};
        this.keyHandler = keyHandlerGenerator(this);
        this.$attached = null; // Meaning attached element
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