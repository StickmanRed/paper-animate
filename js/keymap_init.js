import { KeymapObject } from "./KeymapObject";

import { toolInitKeymap } from "./tools";

export function initKeymaps() {
    const keymaps = new KeymapObject();
    window.globalProject.keymapsAdd("default", keymaps);
    
    keymaps.attach($(document));
    keymaps.assign(toolInitKeymap);
}