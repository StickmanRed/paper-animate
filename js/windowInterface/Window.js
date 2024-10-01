export class Window {
    /* Static variables */
    static HEADER_HEIGHT = 15;
    static HEADER_WIDTH = 60;
    static WINDOW_ID = 0;

    constructor(name) {
        const thisValue = this;
        this.title = name ?? "i don't know";

        this.$element = $(`<div class="window window-detached" id="Window${++Window.WINDOW_ID}"></div>`).appendTo($("#window-container"));
        this.$header = $(`<div class="window-header" id="Window-Header${Window.WINDOW_ID}"></div>`).css({
            flex: `0 0 ${Window.HEADER_HEIGHT}px`
        }).appendTo(this.$element);
        let startPos, deltaPos;
        this.interactHeader = interact(`#Window-Header${Window.WINDOW_ID}`).draggable({
            listeners: {
                start(event) {
                    startPos = [thisValue.$element.position().left, thisValue.$element.position().top];
                    deltaPos = [0, 0];
                    console.log(event);
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