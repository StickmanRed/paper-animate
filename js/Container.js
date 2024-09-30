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
        this.$windowContainer = $(`<div class="container-windows"></div>`).css({
            "position": "relative",
            "width": `calc(100% - ${Container.CONTAINER_PADDING}px)`,
            "height": `calc(100% - ${Container.CONTAINER_PADDING}px)`,
            "margin": `${Container.CONTAINER_PADDING}px`,
            "float": "left", // This should fix any margin issues... but if there's something wrong, check here
            "display": "flex",
            "flex-flow": "row nowrap"
        }).appendTo(this.$element);
        this.$resize = $(`<div class="container-draggable"></div>`).css({
            "position": "relative",
            "width": "100%",
            "height": "100%"
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
        // this.direction I guess specifies the flex-flow?
        // No. I'm changing this
        // this.direction and this.resizeDirection now specify the same direction...
        // the resize direction.
        this.direction = direction;
        this.resizeDirection = resizeDirection;

        // This will be a list. Pencil2D has fancy 2D containers... definitely not trying that.
        // Okay, maybe I have an idea of how this *could* work, but I'm probably doing that later. @StickmanRed (note to self)
        this.windows = [];
    }

    // work on this
    generateDrops() {
        /* For each adjacent pair of windows, create a fixed-dimensions <div> with the length of the shared side
         * and width DROP_DISTANCE. Position these using `top` and `left` ready to be appended to the container's
         * relative-positioned drop detection layer.
         */
        const $elements = [];
        let topOffset = Container.CONTAINER_PADDING;
        let leftOffset = Container.CONTAINER_PADDING;

        const isDirVertical = this.direction === "v";

        for (let index = 0; index < this.windows.length - 1; index++) {
            const $window = this.windows[index];

            // I just realized that this would be better suited as an if/else block :P Oh well.
            isDirVertical ? (leftOffset += $window.width()) : (topOffset += $window.height());

            const $drop = $(`<div class="container-droppable"></div>`).css({
                "top": `${topOffset}`,
                "left": `${topOffset}`
            });
            if (isDirVertical) {
                $drop.css({
                    "width": `${2 * Container.DROP_DISTANCE}`,
                    "height": `${$window.height()}`
                });
            } else {
                $drop.css({
                    "width": `${$window.width()}`,
                    "height": `${2 * Container.DROP_DISTANCE}`
                });
            }
            
            $elements.push($drop);
        }

        return $elements;
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
        this.$resize.off("mousedown.container", this.#hoverCallback);

        /* This still needs to be adjusted for all the resize directions. @StickmanRed (note to self) */
        this.#resizeDirection = val;
        const thisValue = this;
        this.#hoverCallback = function(event) {
            const initLength = thisValue.$element.height();
            const initY = event.pageY;

            // Check here if there's resizing issues
            $(document).on("mousemove.container", event => {
                thisValue.$element.css("flex-basis", `${initLength + (event.pageY - initY)}px`);
            });

            $(document).one("mouseup", () => {
                $(document).off("mousemove.container");
                thisValue.$resize.css("top", thisValue.$element.height());
            });
        }

        this.$resize.on("mousedown.container", this.#hoverCallback);
    }

    // "length" is measuring the resize direction
    get length() {
        return (this.direction === "v") ? this.$element.height() : this.$element.width();
    }
    // "width" is measuring the other direction
    get width() {
        return (this.direction === "v") ? this.$element.width() : this.$element.height();
    }

    attachWindow(window, index) {
        this.windows.splice(index, 0, window);
        window.attach(this);
    }
    detachWindow(window) {
        
    }
}