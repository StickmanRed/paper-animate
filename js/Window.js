export class Window {
    /* Static variables */
    static HEADER_HEIGHT = 15;
    static HEADER_WIDTH = 60;
    static WINDOW_ID = 0;

    constructor(name) {
        this.title = name ?? "i don't know";

        this.$element = $(`<div class="window" id="Window${++Window.WINDOW_ID}"></div>`);

        this.container = null;

        // set: should be percentages when inside container, pixels otherwise
        // get: always in pixels
        this.size = [162, 100];
    }

    name(title) {
        this.title = title;
    }
}