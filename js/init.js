import {tools, toolKeymap} from "./tools.js";

jQuery(function($) {
    const $canvas = $("<canvas id='mainCanvas'></canvas>");
    $("body").append($canvas);

    paper.setup($canvas.get(0)); // Add the 0. Tricky
    paper.execute(
        `path = new Path();
        path.strokeColor = "red";
        path.add([0,0], [150, 100]);`
    );

    const toolIndices = {}
    // const toolOptions = {};
    const shared = {};
    Object.getOwnPropertyNames(tools).forEach((name) => {
        paper.execute(tools[name]);
        toolIndices[name] = paper.tools.length - 1;
    });
    $("document").on("keydown", (e) => {
        if (Object.hasOwn(toolKeymap, e.key)) {
            paper.tools[toolIndices[toolKeymap[e.key]]].activate();
        }
    });
});
