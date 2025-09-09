slectItemVariant();
function slectItemVariant() {
    try {
        activeDocument.activeLayer = activeDocument.activeLayer.parent;
    } catch (error) {
        if (activeDocument.activeLayer.name.search("Variant") == (-1)) {
            setSelectedLayer("Item 1");
        }
    }
    var foderChange = activeDocument.activeLayer.name;
    var endVar = foderChange.slice(foderChange.length - 1);
    setSelectedLayer("Item " + String(endVar));
}
function setSelectedLayer(layerIndexOrName) {
    var result = false;
    try {
        var id239 = charIDToTypeID("slct");
        var desc45 = new ActionDescriptor();
        var id240 = charIDToTypeID("null");
        var ref43 = new ActionReference();
        var id241 = charIDToTypeID("Lyr ");
        if (typeof layerIndexOrName == "number") {
            ref43.putIndex(id241, layerIndexOrName);
        } else {
            ref43.putName(id241, layerIndexOrName);
        }
        desc45.putReference(id240, ref43);
        var id242 = charIDToTypeID("MkVs");
        desc45.putBoolean(id242, false);
        executeAction(id239, desc45, DialogModes.NO);
        result = true
    } catch (e) {
        ; // do nothing
    }
    return result;
}
