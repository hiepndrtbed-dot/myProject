//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
const versionTo = " By Acad -- Version 1.5 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;

doc.activeLayer = doc.backgroundLayer;
try {
    saveAlphaChnl();
    if (doc.layers[doc.layers.length - 2].name == "replaceColor") {
        layerViaCopy("temp");
        doc.activeLayer.move(doc.artLayers.getByName("replaceColor"), ElementPlacement.PLACEBEFORE);
        action("replaceColor");
        doc.activeLayer.merge();
    } else {
        layerViaCopy("replaceColor");
        action("replaceColor");
    }
} catch (error) {
    alert("Chua co vung chon!");
}

function layerViaCopy(nameLayer) {
    var idCpTL = charIDToTypeID("CpTL");
    executeAction(idCpTL, undefined, DialogModes.NO);
    activeDocument.activeLayer.name = nameLayer;
}
function action(action) {
    var idReplaceColor = stringIDToTypeID(action);
    executeAction(idReplaceColor, undefined, DialogModes.ALL);
}

function saveAlphaChnl() {
    var idDplc = charIDToTypeID("Dplc");
    var desc376 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref2 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref2.putProperty(idChnl, idfsel);
    desc376.putReference(idnull, ref2);
    executeAction(idDplc, desc376, DialogModes.NO);
}
