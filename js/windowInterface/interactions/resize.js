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
    return (point[0] >= tlc[0]) && (point[0] <= brc[0])
           && (point[1] >= brc[1]) && (point[1] <= tlc[1]);
}

function buh(input, container, inputSpec) {
    console.log("The function has been run. Initiate the tests! - Golf Ball");
    const $input = $(input);
    const $container = $(container);
    const spec = Object.assign({type: "outer-edge", resizeDistance: 10}, inputSpec);
    console.log("The specifications are the following:", spec);

    $container.on("mousedown", function(event) {
        console.log("Mousedown works!");
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
            console.log(condition);
        }

        const start = [event.pageX, event.pageY];
        const type = condition(start);

        if (type) {
            const startPos = [$element.offset().left, $element.offset().top];
            const startDim = [$element.width(), $element.height()];

            const delta = [event.pageX - start[0], event.pageY - start[1]];
    
            let onResize;
            /* Finally, I get to use the switch statement. I feel like a professional B)
                * Also, Shift+Alt+A has become my favorite coding shortcut!
                */
            switch (type.v) {
                case "t":
                    onResize = function(event) {
                        $input.offset({top: startPos[1] + delta[1]});
                        $input.height(startDim[1] - delta[1]);
                    }
                    break;
                case "b":
                    onResize = function(event) {
                        $input.height(startDim[1] + delta[1]);
                    }
                    break;
            }
            switch (type.h) {
                case "l":
                    onResize = function(event) {
                        $input.offset({left: startPos[0] + delta[0]});
                        $input.width(startDim[0] - delta[0]);
                    }
                    break;
                case "r":
                    onResize = function(event) {
                        $input.width(startDim[0] - delta[0]);
                    }
                    break;
            }
    
            $(document).on("mousemove.resize", onResize);
            $(document).one("mouseup", function() {
                $(document).off("mousemove.resize", onResize);
            });
        }
    });
}

export {buh};