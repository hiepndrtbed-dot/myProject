setSelectedLayer("Resources");
if (activeDocument.activeLayer.layers.length > 0) {
    var bouns = activeDocument.activeLayer.layers.length;
    for (var i = 0; i < bouns; i++) {
        setSelectedLayer("Resources");
        activeDocument.activeLayer = activeDocument.activeLayer.artLayers[i];
        activeDocument.activeLayer.visible = true;
    }
}
function setSelectedLayer(layerName) {
    var result = false;
    try {
        var idslct = charIDToTypeID("slct");
        var desc19 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref1 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref1.putName(idLyr, layerName);
        desc19.putReference(idnull, ref1);
        var idMkVs = charIDToTypeID("MkVs");
        desc19.putBoolean(idMkVs, false);
        var idLyrI = charIDToTypeID("LyrI");
        var list2 = new ActionList();
        list2.putInteger(10);
        desc19.putList(idLyrI, list2);
        executeAction(idslct, desc19, DialogModes.NO);
        result = true;
    } catch (error) {
    }
    return result;
}