jQuery(function($) {
    const $canvas = $("<canvas id='mainCanvas'></canvas>");
    $("body").append($canvas);

    paper.setup($canvas.get());
    paper.execute(
        `path = new Path();
        path.strokeColor = "red";
        path.add([0,0], [150, 100]);`
    );
});
