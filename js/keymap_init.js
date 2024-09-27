import { KeymapObject } from "./KeymapObject.js";

import { toolInitKeymap } from "./tools.js";

export function initKeymaps() {
    const keymaps = new KeymapObject();
    window.globalProject.keymapsAdd("default", keymaps);
    
    keymaps.attach($(document));
    keymaps.assign(toolInitKeymap);
}