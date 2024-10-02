export class Window {
    /* Static variables */
    static HEADER_HEIGHT = 15;
    static HEADER_WIDTH = 60;
    static RESIZE_DISTANCE = 10;
    static WINDOW_ID = 0;

    constructor(name) {
        const thisValue = this;
        Window.WINDOW_ID++;

        this.title = name ?? "i don't know";

        this.$element = $(`<div class="window window-detached" id="Window${Window.WINDOW_ID}"></div>`).appendTo($("#window-container"))
        .css("box-sizing", "border-box")
        .css("touch-action", "none");

        this.$resizeContainer = $(`<div class="window-resizers" id="Window-Resizers${Window.WINDOW_ID}"></div>`).appendTo(this.$element);
        this.$resizers = $()
                         .add($(`<div class="window-resizeTop" id="Window-ResizeTop${Window.WINDOW_ID}"></div>`).css("height", Window.RESIZE_DISTANCE))
                         .add($(`<div class="window-resizeBottom" id="Window-ResizeBottom${Window.WINDOW_ID}"></div>`).css("height", Window.RESIZE_DISTANCE))
                         .add($(`<div class="window-resizeLeft" id="Window-ResizeLeft${Window.WINDOW_ID}"></div>`).css("width", Window.RESIZE_DISTANCE))
                         .add($(`<div class="window-resizeRight" id="Window-ResizeRight${Window.WINDOW_ID}"></div>`).css("width", Window.RESIZE_DISTANCE))
                         .addClass("window-resize")
                         .appendTo(this.$resizeContainer);

        let startPosResize, deltaPosResize;
        // @StickmanRed (note to self): fix this mess of a CSS and allow resizing in both directions.
        this.interactElement = interact(`#Window${Window.WINDOW_ID}`).resizable({
            edges: {
                top: thisValue.$resizers.filter(".window-resizeTop")[0],
                left: thisValue.$resizers.filter(".window-resizeLeft")[0],
                bottom: thisValue.$resizers.filter(".window-resizeBottom")[0],
                right: thisValue.$resizers.filter(".window-resizeRight")[0]
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
        console.log(this.interactMove);

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