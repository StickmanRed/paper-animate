/* Tools - figure out how to make them
 *
 * I know I'll need this somewhere:
 * ["onMouseDown", "onMouseDrag", "onMouseMove", "onMouseUp", "onKeyDown", "onKeyUp"]
 */

/* A class, ToolWrapper, that contains a reference to the tool and other data
 */

import { FunctionWrapper } from "./FunctionWrapper.js";

class ToolWrapper {
    toolWrappers = {};
    tCounter = 0;
    constructor(name, initiator) {
        /* name: Tool name, used somewhere idk
         * initiator: Function that initiates the tool. Should return a Tool object.
         */
        "blah";
        this.name = name ?? `Tool${++tCounter}`;
        this.tool = initiator(); // I give up trying to make this easier. You do all the work.

        toolWrappers[this.name] = this;
    }

    get toolIndex() {
        return paper.tools.indexOf(this.tool);
    }
}

const tools = {};

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

// Initiate the tools here.
Object.getOwnPropertyNames(tools).forEach((name) => {
    new ToolWrapper(name, tools[name]);
});

const toolInitKeymap = {
    "1": new FunctionWrapper(
        data => {
            data.lastTool = paper.tool;
            ToolWrapper.toolWrappers.line.tool.activate();
        },
        data => data.lastTool.activate()
    ),
    "2": new FunctionWrapper(
        data => {
            data.lastTool = paper.tool;
            ToolWrapper.toolWrappers.string.tool.activate();
        },
        data => data.lastTool.activate()
    )
};

export {toolInitKeymap};