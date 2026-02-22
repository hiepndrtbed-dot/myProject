const doc = activeDocument
// var length = doc.layers.length
//  activeDocument.activeLayer = activeDocument.layers[length - 1];
alert(checkUnlink())
// main()
function main() {
    var length = doc.layers.length
    for (var i = length - 1; i > 0; i--) {
        doc.activeLayers = doc.layers[length - 1]
        unlink();
        // checkUnlink()
    }
}

function checkUnlink() {
    var result = false;
    try {
        var idunlinkSelectedLayers = stringIDToTypeID("unlinkSelectedLayers");
        var desc5424 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref869 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref869.putEnumerated(idLyr, idOrdn, idTrgt);
        desc5424.putReference(idnull, ref869);
        executeAction(idunlinkSelectedLayers, desc5424, DialogModes.NO);
        result = true;
    } catch (error) {
        result = false;
    }
    return result;
}