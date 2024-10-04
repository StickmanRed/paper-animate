function draggable(input, drag) {
    const $element = $(input);
    const $drag = $(drag);

    function onHover() {
        $("body").css("cursor", "grab");
    }
    function offHover() {
        $("body").css("cursor", "auto");
    }
    $drag.on("mouseenter", onHover);
    $drag.on("mouseleave", offHover);

    $drag.on("mousedown", function(event) {
        const start = [event.pageX, event.pageY];
        const startElement = [$element.offset().left, $element.offset().top];

        function onDrag(event) {
            $element.offset({
                left: startElement[0] + (event.pageX - start[0]),
                top: startElement[1] + (event.pageY - start[1])
            });
        }

        $(document).on("mousemove.drag", onDrag);
        $(document).one("mouseup", function() {
            $(document).off("mousemove.drag", onDrag);
        });
    });
}

export {draggable};