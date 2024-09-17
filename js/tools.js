/* Tools - figure out how to make them
 * paper.Tool has event handlers, a limited amount of them. You have the events, so make the properties already.
 */

const tools = {};
const toolKeymap = {
    "1": "line",
    "2": "string"
};

// Normally, these functions would be Javascript.
tools.line = () => {
    paper.execute(
        `// We start by defining an empty variable that is visible by both
        // mouse handlers.
        var myPath;

        function onMouseDown(event) {
            // The mouse was clicked, so let's put a newly created Path into
            // myPath, give it the color black and add the location as the
            // path's first segment.
            myPath = new Path();
            myPath.strokeColor = 'black';
            myPath.add(event.point);
        }

        function onMouseUp(event) {
            // The mouse was released, so we add the new location as the end
            // segment of the line.
            myPath.add(event.point);
        }`
    );
    return paper.tools[paper.tools.length - 1];
};

tools.string = () => {
    paper.execute(
        `var myPath;

        function onMouseDown(event) {
            myPath = new Path();
            myPath.strokeColor = 'black';
        }
    
        function onMouseDrag(event) {
            myPath.add(event.point);
        }
    
        function onMouseUp(event) {
            var myCircle = new Path.Circle({
                center: event.point,
                radius: 10
            });
            myCircle.strokeColor = 'black';
            myCircle.fillColor = 'white';
        }`
    );
    return paper.tools[paper.tools.length - 1];
};

/* A class, ToolWrapper, that contains a reference to the tool and other data
 */

class ToolWrapper {
    tCounter = 0;
    #eventIDs = ["onMouseDown", "onMouseDrag", "onMouseMove", "onMouseUp", "onKeyDown", "onKeyUp"];
    constructor(name, initiator) {
        /* name: Tool name, used somewhere idk
         * initiator: Function that initiates the tool. Should return a Tool object.
         */
        "blah";
        this.name = name ?? `Tool${++tCounter}`;
        this.tool = initiator(); // I give up trying to make this easier. You do all the work.
    }

    get toolIndex() {
        return paper.tools.indexOf(this.tool);
    }


    /* constructor(name, events) {
        /* name: Tool name, used somewhere idk
         * events: Tool events and their callbacks. @StickmanRed (note to self), make them arrays sometime
         *
         * Callbacks should be function objects written in Javascript. I won't try to coerce Paperscript anymore.
         *\/
        "blah";
        this.name = name ?? `Tool${++tCounter}`;
        this.tool = new paper.Tool();
        this.#eventIDs.forEach((eventName) => {
            if (Object.hasOwn(events, eventName)) {
                this.tool[eventName] = [events[eventName]];
            }
        }, this);

        this.data = {};
    }
    get toolIndex() {
        return paper.tools.indexOf(this.tool);
    }

    /* Handles event setting.
     * @StickmanRed (note to self), make this "addEvent" and "removeEvent" sometime
    *\/
    setEvent(eventName, callback) {
        if (this.#eventIDs.includes(eventName)) {
            this.tool[eventName] = [callback];
        }
    }

    remove() {
        /* Deletes the tool.
         * There's no way to add tools back, so why bother keeping any of the info here?
         *\/
        this.tool.remove();
        this = null; // Leave this to the elusive JS garbage collector
    }*/
    
}

export {ToolWrapper, tools, toolKeymap};