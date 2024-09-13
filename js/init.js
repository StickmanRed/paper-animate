import tools from "./tools.js";

jQuery(function($) {
    const $canvas = $("<canvas id='mainCanvas'></canvas>");
    $("body").append($canvas);

    paper.setup($canvas.get(0)); // Add the 0. Tricky
    paper.execute(
        `path = new Path();
        path.strokeColor = "red";
        path.add([0,0], [150, 100]);`
    );

    tools.forEach((paperCallback) => {
        paper.execute(paperCallback);
    });
});
