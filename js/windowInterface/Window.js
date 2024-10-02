export class Window {
    /* Static variables */
    static HEADER_HEIGHT = 15;
    static HEADER_WIDTH = 60;
    static RESIZE_DISTANCE = 10;
    static WINDOW_ID = 0;

    static $root = $(":root").css("--resizeDistance", `${Window.RESIZE_DISTANCE}px`);

    constructor(name) {
        const thisValue = this;
        Window.WINDOW_ID++;

        this.title = name ?? "i don't know";

        this.$element = $(`<div class="window window-detached" id="Window${Window.WINDOW_ID}"></div>`).appendTo($("#window-container"))
        .css("box-sizing", "border-box")
        .css("touch-action", "none");

        this.$resizeContainer = $(`<div class="window-resizers" id="Window-Resizers${Window.WINDOW_ID}"></div>`).appendTo(this.$element);
        this.$resizers = $() /* That's a lot of elements for just one resizing mechanism. */
                         .add($(`<div class="window-resizeV window-resizeTop" id="Window-ResizeTop${Window.WINDOW_ID}"></div>`))
                         .add($(`<div class="window-resizeV window-resizeBottom" id="Window-ResizeBottom${Window.WINDOW_ID}"></div>`))
                         .add($(`<div class="window-resizeH window-resizeLeft" id="Window-ResizeLeft${Window.WINDOW_ID}"></div>`))
                         .add($(`<div class="window-resizeH window-resizeRight" id="Window-ResizeRight${Window.WINDOW_ID}"></div>`))
                         .add($(`<div class="window-resizeTop window-resizeLeft window-resizeCorner" id="Window-ResizeTLC${Window.WINDOW_ID}"></div>`)) /* tlc */
                         .add($(`<div class="window-resizeTop window-resizeRight window-resizeCorner" id="Window-ResizeTRC${Window.WINDOW_ID}"></div>`))
                         .add($(`<div class="window-resizeBottom window-resizeLeft window-resizeCorner" id="Window-ResizeBLC${Window.WINDOW_ID}"></div>`))
                         .add($(`<div class="window-resizeBottom window-resizeRight window-resizeCorner" id="Window-ResizeBRC${Window.WINDOW_ID}"></div>`)) /* brc */
                         .addClass("window-resize")
                         .appendTo(this.$resizeContainer);

        let startPosResize, deltaPosResize;
        this.interactElement = interact(`#Window${Window.WINDOW_ID}`).resizable({
            edges: {
                top: `#Window-Resizers${Window.WINDOW_ID}>.window-resizeTop`,
                left: `#Window-Resizers${Window.WINDOW_ID}>.window-resizeLeft`,
                bottom: `#Window-Resizers${Window.WINDOW_ID}>.window-resizeBottom`,
                right: `#Window-Resizers${Window.WINDOW_ID}>.window-resizeRight`
            },
            listeners: {
                start(event) {
                    startPosResize = [thisValue.$element.position().left, thisValue.$element.position().top];
                    deltaPosResize = [0, 0];
                },
                move(event) {
                    const {width, height} = event.rect;
                    deltaPosResize[0] += event.deltaRect.left;
                    deltaPosResize[1] += event.deltaRect.top;

                    thisValue.$element.css({
                        width: width,
                        height: height,
                        left: startPosResize[0] + deltaPosResize[0],
                        top: startPosResize[1] + deltaPosResize[1]
                    });
                }
            }
        });

        this.$move = $(`<div class="window-draggable" id="Window-Move${Window.WINDOW_ID}"></div>`).css({
            flex: `0 0 ${Window.HEADER_HEIGHT}px`
        }).appendTo(this.$element);

        // This should work however "Window-Move" is set up.
        let startPos, deltaPos;
        this.interactMove = interact(this.$move[0]).draggable({
            listeners: {
                start(event) {
                    startPos = [thisValue.$element.position().left, thisValue.$element.position().top];
                    deltaPos = [0, 0];
                },
                move(event) {
                    deltaPos[0] += event.dx;
                    deltaPos[1] += event.dy;

                    thisValue.$element.css({
                        left: startPos[0] + deltaPos[0],
                        top: startPos[1] + deltaPos[1]
                    });
                }
            }
        });

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