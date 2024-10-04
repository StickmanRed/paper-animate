/* This is not professional please change later.
 * 
 *
 * 
 * ?
 */
function rect(corner1, corner2) {
    return {tlc: corner1, brc: corner2}; /* The two favorites: TLC and BRC */
}
function rectIncludes(point, tlc, brc) {
    /* This confused me xD
     * I'm so used to the y-axis going upward, but here it's measured going downward
     */
    return (point[0] >= tlc[0]) && (point[0] <= brc[0])
           && (point[1] >= tlc[1]) && (point[1] <= brc[1]);
}

function buh(input, container, inputSpec) {
    const $input = $(input);
    const $container = $(container);
    const spec = Object.assign({type: "outer-edge", resizeDistance: 10}, inputSpec);

    $container.on("mousedown", function(event) {
        let condition;
        if (spec.type === "outer-edge") {
            const dist = spec.resizeDistance;
            const inputPosition = $input.position();
            const inputRect = rect([inputPosition.left, inputPosition.top],
                                   [inputPosition.left + $input.width(), inputPosition.top + $input.height()]);

            condition = function(coords) {
                /* This gives me a headache */
                const top = rectIncludes(coords, [inputRect.tlc[0] - dist, inputRect.tlc[1] - dist], [inputRect.brc[0] + dist, inputRect.tlc[1]]);
                const left = rectIncludes(coords, [inputRect.tlc[0] - dist, inputRect.tlc[1] - dist], [inputRect.tlc[0], inputRect.brc[1] + dist]);
                const right = rectIncludes(coords, [inputRect.brc[0], inputRect.tlc[1] - dist], [inputRect.brc[0] + dist, inputRect.brc[1] + dist]);
                const bottom = rectIncludes(coords, [inputRect.tlc[0] - dist, inputRect.brc[1]], [inputRect.brc[0] + dist, inputRect.brc[1] + dist]);

                const exit = {};
                exit.v = top ? "t" : (bottom ? "b" : false);
                exit.h = left ? "l" : (right ? "r" : false);

                return (exit.v || exit.h) ? exit : false;
            }
        }

        const start = [event.pageX, event.pageY];
        const type = condition(start);

        if (type) {
            console.log("So the type is correct.");
            const startPos = [$input.offset().left, $input.offset().top];
            const startDim = [$input.width(), $input.height()];
    
            let onResizeV, onResizeH;
            /* Finally, I get to use the switch statement. I feel like a professional B)
                * Also, Shift+Alt+A has become my favorite coding shortcut!
                */
            switch (type.v) {
                case "t":
                    onResizeV = function(delta) {
                        $input.offset({top: startPos[1] + delta[1]});
                        $input.height(startDim[1] - delta[1]);
                    }
                    break;
                case "b":
                    onResizeV = function(delta) {
                        $input.height(startDim[1] + delta[1]);
                    }
                    break;
            }
            switch (type.h) {
                case "l":
                    onResizeH = function(delta) {
                        $input.offset({left: startPos[0] + delta[0]});
                        $input.width(startDim[0] - delta[0]);
                    }
                    break;
                case "r":
                    onResizeH = function(delta) {
                        $input.width(startDim[0] - delta[0]);
                    }
                    break;
            }

            function onResize(event) {
                console.log("resizing!");
                const delta = [event.pageX - start[0], event.pageY - start[1]];
                onResizeV(delta);
                onResizeH(delta);
            }
            console.log("The function is created.", onResize);
    
            $(document).on("mousemove.resize", onResize);
            $(document).one("mouseup", function() {
                $(document).off("mousemove.resize", onResize);
            });
        }
    });
}

export {buh};