import { draggable } from "./interactions/drag.js";
import { resizeable } from "./interactions/resize.js";

export class Window {
    /* Static variables */
    static HEADER_HEIGHT = 15;
    static HEADER_WIDTH = 60;
    static RESIZE_DISTANCE = 10;
    static WINDOW_ID = 0;

    /* static $root = $(":root").css("--resizeDistance", `${Window.RESIZE_DISTANCE}px`); */

    constructor(name) {
        const thisValue = this;
        Window.WINDOW_ID++;

        this.title = name ?? "i don't know";

        this.$element = $(`<div class="window window-detached" id="Window${Window.WINDOW_ID}"></div>`).appendTo($("#window-container"));

        // this.$resizeContainer = $(`<div class="window-resizers" id="Window-Resizers${Window.WINDOW_ID}"></div>`).appendTo(this.$element);

        this.$move = $(`<div class="window-draggable" id="Window-Move${Window.WINDOW_ID}"></div>`).css({
            flex: `0 0 ${Window.HEADER_HEIGHT}px`
        }).appendTo(this.$element);

        draggable(this.$element, this.$move);
        resizeable(this.$element, "#window-container" /* We can do this because of the jQuery function's overloaded awesomeness :D */, {resizeDistance: Window.RESIZE_DISTANCE});

        this.container = null;

        // I've decided that there's to be no more getter-setter nonsense! Makes things simpler for me.
        this.sizeWindow([162, 100]);
    }

    name(title) {
        this.title = title;
    }
    sizeWindow(size) {
        if (!this.container) {
            this.size = size;
            this.$element.width(size[0]).height(size[1]);
        }
    }
}