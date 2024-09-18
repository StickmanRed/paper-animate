import { Project } from "./Project.js"; // Be careful with paper.js conflicts. Actually I don't think this will cause problems
import { initKeymaps } from "./keymap_init.js";

jQuery(function($) {
    /* Initialize canvas, paper.js */
    // resize='true'
    const $canvas = $("<canvas id='mainCanvas'></canvas>");
    $("#canvas-container").append($canvas);
    paper.setup($canvas.get(0)); // Add the 0. Tricky

    /* Initialize globalProject */
    const project = new Project();
    project.attach();

    /* Initialize keybinds */
    initKeymaps();

    /* Test scripts */
    paper.execute(
        `path = new Path();
        path.strokeColor = "red";
        path.add([0,0], [100, 100]);`
    );
});
