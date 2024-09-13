/* shared - An object that contains any variables shared across tools.
 * 
 */

const tools = {};
const toolKeymap = {
    "1": "line",
    "2": "string"
};

tools.line = 
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
    }`;

tools.string = 
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
    }`;

export {tools, toolKeymap};