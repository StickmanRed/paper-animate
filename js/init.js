import { Project } from "./Project"; // Be careful with paper.js conflicts. Actually I don't think this will cause problems
import { initKeymaps } from "./keymap_init";

jQuery(function($) {
    /* Initialize canvas, paper.js */
    const $canvas = $("<canvas id='mainCanvas' resize='true'></canvas>");
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
