export class Window {
    /* Static variables */
    static HEADER_HEIGHT = 15;
    static HEADER_WIDTH = 60;
    static WINDOW_ID = 0;

    constructor(name) {
        this.title = name ?? "i don't know";

        this.$element = $(`<div class="window window-detached" id="Window${++Window.WINDOW_ID}"></div>`).appendTo($("#window-container"));
        this.$header = $(`<div class="window-header" id="Window-header${Window.WINDOW_ID}"></div>`).css({
            flex: `0 0 ${HEADER_HEIGHT}px`
        }).appendTo(this.$element);

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