import {tools, toolKeymap} from "./tools.js";

jQuery(function($) {
    const $canvas = $("<canvas id='mainCanvas' resize='true'></canvas>");
    $("#canvas-container").append($canvas);

    paper.setup($canvas.get(0)); // Add the 0. Tricky
    paper.execute(
        `path = new Path();
        path.strokeColor = "red";
        path.add([0,0], [150, 100]);`
    );

    // Quick keypress test. This is not final
    const toolIndices = {}
    // const toolOptions = {};
    Object.getOwnPropertyNames(tools).forEach((name) => {
        paper.execute(tools[name]);
        toolIndices[name] = paper.tools.length - 1;
    });
    $(document).on("keydown", e => {
        const key = String.fromCharCode(e.which);
        if (Object.hasOwn(toolKeymap, key)) {
            paper.tools[toolIndices[toolKeymap[key]]].activate();
        }
    });
});
