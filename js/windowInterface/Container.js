export class Container {
    /* Static variables */
    static MIN_LENGTH = 100;
    static RESIZE_LENGTH = 10;

    static DROP_DISTANCE = 10;

    // Adding padding adds to the container width, so this variable's name is just decorative.
    // It will be a margin instead.
    static CONTAINER_PADDING = 10;

    /* Private variables */
    // resizeDirection: "top", "bottom", "left", or "right"
    #resizeDirection;
    constructor($element, resizeDirection) {
        const direction = (resizeDirection === "top" || resizeDirection === "bottom") ? "v" : "h";

        this.$element = $element.addClass(`container container-${direction}`);
        this.$windowContainer = $(`<div class="container-windows"></div>`).css({
            "width": `calc(100% - ${Container.CONTAINER_PADDING}px)`,
            "height": `calc(100% - ${Container.CONTAINER_PADDING}px)`,
            "margin": `${Container.CONTAINER_PADDING}px`,
        }).appendTo(this.$element);

        this.direction = direction;
        this.resizeDirection = resizeDirection;
    }

    get resizeDirection() {
        return this.#resizeDirection;
    }
    set resizeDirection(val) {
        this.#resizeDirection = val;
        this.direction = (val === "top" || val === "bottom") ? "v" : "h";
    }

    // "length" is measuring the resize direction
    get length() {
        return (this.direction === "v") ? this.$element.height() : this.$element.width();
    }
    // "width" is measuring the other direction
    get width() {
        return (this.direction === "v") ? this.$element.width() : this.$element.height();
    }
}