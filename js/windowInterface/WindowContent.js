export class WindowContent {
    constructor() {
        this.$element = $(`<div class="window-windowContent"></div>`);
    }

    appendButton(inSpec) {
        const spec = Object.assign({
            description: null,
            icon: null,
            text: null
        }, inSpec);

        const $button = $(`<button class="windowContent-button"></button>`).appendTo(this.$element);
        if (spec.description) {
            $button.attr("title", spec.description);
        }

        if (spec.icon) {
            $button.append($(`<img class="windowContent-button-image" src="${spec.icon}">`));
        }
        if (spec.text) {
            $button.append($(`<span class="windowContent-button-text">${spec.text}</span>`));
        }
    }
}