/* I think it could be useful to have a sort of file directory showing all the imports:
 * (outdated)
 * 
 * init.js
 *   |
 * Project.js [class Project]
 *   |
 *   |
 *   |
 *   |
 * FunctionWrapper.js [class FunctionWrapper]
 */

import { Project } from "./Project.js"; // Be careful with paper.js conflicts. Actually I don't think this will cause problems

/* Test imports */
import { Window } from "./windowInterface/Window.js";

jQuery(function($) {
    /* Initialize canvas, paper.js */
    // resize='true'
    const $canvas = $("<canvas id='mainCanvas'></canvas>");
    $("#canvas-container").append($canvas);
    paper.setup($canvas.get(0)); // Add the 0. Tricky

    /* Initialize globalProject */
    const project = new Project();
    project.attach();

    /* Canvas resizing patch */
    // @StickmanRed (note to self), add option to let canvas fill the browser window sometime
    function resizeCanvas(entries) {
        // This currently does not account for text orientation.
        // If there's a problem with the canvas size, check here.
        let {inlineSize: width, blockSize: height} = entries[0].contentBoxSize[0];
        $canvas[0].width = width;
        $canvas[0].height = height;
        paper.view.setViewSize(width, height);
    }
    const canvasObserver = new ResizeObserver(resizeCanvas);
    canvasObserver.observe($canvas.parent()[0]);

    /* Test scripts */
    paper.execute(
        `path = new Path();
        path.strokeColor = "red";
        path.add([0,0], [100, 100]);`
    );

    var pleh = new Window("hiya");
    
});
