export class Window {
    /* Static variables */
    static HEADER_HEIGHT = 15;
    static HEADER_WIDTH = 60;
    static WINDOW_ID = 0;

    /* Private variables */
    #width; #height;

    constructor(name) {
        this.title = name ?? "i don't know";

        this.$element = $(`<div class="window" id="Window${++Window.WINDOW_ID}"></div>`).css({
            "position": "absolute",
            "display": "flex",
            "flex-direction": "column"
        });
        this.$header = this.createHeader().appendTo(this.$element);
        this.$content = $(`<div class="window-content"></div>`).css("flex", "1 1 100%").appendTo(this.$element);

        this.$windowSpace = $("#window-container");

        this.container = null;
        this.classContainer = null; // I don't want to import much
        /* this.minimized = false; */

        // set: should be a percentage when inside container, pixels otherwise
        // get: always in pixels
        this.width = 162;
        this.height = 100;

        this.minWidth = 50;
        this.minHeight = 50;

        // Works only with one-direction containers
        this.direction = null;
    }

    createHeader() {
        const header = $(`<div class="windowHeader"></div>`).css("flex", `0 0 ${Window.HEADER_HEIGHT}px`);
        return header;
    }

    addContent($contentElement) {
        $contentElement.appendTo(this.$content);
    }

    get width() {
        return this.$element.width();
    }
    set width(val) {
        this.#width = val;
        if (this.container) {
            if (this.direction === "v") {
                this.$element.css("flex-basis", `${val}%`);
            }
        }
        else {
            this.$element.width(val);
        }
    }
    get height() {
        return this.$element.height();
    }
    set height(val) {
        this.#height = val;
        if (this.container) {
            if (this.direction === "h") {
                this.$element.css("flex-basis", `${val}%`);
            }
        }
        else {
            this.$element.height(val);
        }
    }

    attach(container, newSize) {
        /* Gets "Container" class without importing. */
        if (!this.classContainer) {
            this.classContainer = Object.getPrototypeOf(container);
        }

        /* "newSize" must be supplied by the container */

        this.container = container;
        this.direction = container.direction
        this.$element.appendTo(container.$element);

        // Change width/height to flex-basis
        this.$element.css({
            "flex-basis": `${newSize}%`,
            "width": "",
            "height": ""
        });
    }
    detach(container) {
        this.container = null;
        this.direction = null;
        this.$element.appendTo(this.$windowSpace);

        this.$element.css({
            "width": `${this.width}px`,
            "height": `${this.height}px`,
            "flex-basis": ""
        });
    }

    name(title) {
        this.title = title;
    }

    /* minimize(state) {
        // If state isn't specified, this.minimized toggles. Otherwise, it's set to the state.
        this.minimized = !!(state ?? !this.minimized);
    } */

    /* resize(newSize) {
        this.width = Math.max(newSize[0], this.minWidth);
        this.height = Math.max(newSize[1], this.minHeight);
    }
    resizeMin(newMin) {
        this.minWidth = Math.max(newMin[0], Window.HEADER_WIDTH);
        this.minHeight = Math.max(newMin[1], Window.HEADER_HEIGHT);

        if ((this.width < this.minWidth) || (this.height < this.minHeight)) {
            this.resize([this.width, this.height]);
        }
    } */
}