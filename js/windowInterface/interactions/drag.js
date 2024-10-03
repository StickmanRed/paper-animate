function blah(input, drag) {
    const $element = $(input);
    const $drag = $(drag);
    console.log("This works!");

    $drag.on("mousedown", function(event) {
        console.log("Start move");
        const start = [event.pageX, event.pageY];
        const startElement = [$element.css("left"), $element.css("top")];

        function onDrag(event) {
            console.log("Moving");
            $element.css({
                left: startElement[0] + (event.pageX - start[0]),
                top: startElement[1] + (event.pageY - start[1])
            });
        }

        $(document).on("mousemove.drag", onDrag);
        $(document).one("mouseup", function() {
            $(document).off("mousemove.drag", onDrag);
            console.log("Completed.");
        });
    });
}

export {blah};