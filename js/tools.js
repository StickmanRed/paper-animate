/* Tools - figure out how to make them
 *
 * I know I'll need this somewhere:
 * ["onMouseDown", "onMouseDrag", "onMouseMove", "onMouseUp", "onKeyDown", "onKeyUp"]
 */

import { FunctionWrapper } from "./FunctionWrapper.js";
import { ToolWrapper } from "./ToolWrapper.js";

const tools = {};

// Normally, these functions would be Javascript.
// Note: Paperscript does not support arrow functions.
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

            // We add this to make line-drawing undoable.
            window.globalProject.stackAdd(new window.globalProject.classes.FunctionWrapper( // That's a mouthful
                function(data) {
                    data.path.remove();
                },
                function(data) {
                    data.path.addTo(parent);
                },
                { parent: myPath.parent, path: myPath }
                )
            );
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