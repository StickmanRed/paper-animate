export class Container {
    /* Static variables */
    static MIN_LENGTH = 100;
    static RESIZE_LENGTH = 10;

    static DROP_DISTANCE = 10;

    // Adding padding adds to the container width, so this variable's name is just decorative.
    // It will be a margin instead.
    static CONTAINER_PADDING = 10;

    /* Private variables */
    // "direction" can be "v" or "h", "resizeDirection" can be "top", "bottom", "left", or "right"
    #direction; #resizeDirection;
    #hoverCallback;
    constructor($element, direction, resizeDirection) {
        // You had better define the element right now.
        this.$element = $element.addClass(`container container-${direction}`);
        this.$resize = $(`<div id="container-draggable"></div>`).css({
            "position": "relative",
            "width": "100%",
            "height": Container.RESIZE_LENGTH
        });
        switch (resizeDirection) {
            case "top":
                this.$resize.css("top", -Container.RESIZE_LENGTH);
                break;
            case "bottom":
                this.$resize.css("top", $element.height());
                break;
            case "left":
                this.$resize.css("left", -Container.RESIZE_LENGTH);
                break;
            case "right":
                this.$resize.css("left", $element.width());
                break;
        }
        this.direction = direction;
        this.resizeDirection = resizeDirection;

        // This will be a list. Pencil2D has fancy 2D containers... definitely not trying that.
        // Okay, maybe I have an idea of how this *could* work, but I'm probably doing that later. @StickmanRed (note to self)
        this.windows = [];
    }

    // work on this
    generateDrops() {
        for (let index = 1; index < this.windows.length; index++) {
            const window = this.windows[index];
            
        }
    }
    // work on this

    get direction() {
        return this.#direction;
    }
    set direction(val) {
        if (this.#direction !== val) {
            this.$element.removeClass(`container-${this.#direction}`).addClass(`container-${val}`);
            this.#direction = val;
        }
    }
    get resizeDirection() {
        return this.#resizeDirection;
    }
    set resizeDirection(val) {
        // Detach the previous resizing callback
        this.$resize.off("mousedown", this.#hoverCallback);

        this.#resizeDirection = val;
        const thisValue = this;
        this.#hoverCallback = function(event) {
            const initHeight = thisValue.$element.height();
            const initY = event.pageY;

            // Check here if there's resizing issues
            $(document).on("mousemove.container", event => {
                thisValue.$element.css("flex-basis", `${initHeight + (event.pageY - initY)}px`);
            });

            $(document).one("mouseup", () => {
                $(document).off("mousemove.container");
                thisValue.$resize.css("top", thisValue.$element.height());
            });
        }

        this.$resize.on("mousedown", this.#hoverCallback);
    }

    // "length" is measuring the resize direction
    get length() {
        return (this.direction === "h") ? this.$element.height() : this.$element.width();
    }
    // "width" is measuring the other direction
    get width() {
        return (this.direction === "h") ? this.$element.width() : this.$element.height();
    }

    attachWindow(window, index) {
        this.windows.splice(index, 0, window);
        window.attach(this);
    }
    detachWindow(window) {
        
    }
}