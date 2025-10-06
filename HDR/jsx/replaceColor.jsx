//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS

(function main() {
    try {
        doc.activeLayer = doc.artLayers["MERGE 1"];
    } catch (error) {
        doc.activeLayer = doc.backgroundLayer;
    }
    if (activeDocument.quickMaskMode == true) { activeDocument.quickMaskMode = false; }
    if (!hasSelection()) { alert("Chua co vung chon!"); return; }
    if (selectLayer("replaceColor")) {
        mergeVisible();
        action("replaceColor");
        addMask();
        doc.activeLayer.merge();
    } else {
        layerViaCopy("replaceColor");
        action("replaceColor");
    }
})();
function layerViaCopy(nameLayer) {
    var idCpTL = charIDToTypeID("CpTL");
    executeAction(idCpTL, undefined, DialogModes.NO);
    activeDocument.activeLayer.name = nameLayer;
}
function action(action) {
    var idReplaceColor = stringIDToTypeID(action);
    executeAction(idReplaceColor, undefined, DialogModes.ALL);
}

function mergeVisible(params) {
    var idMrgV = charIDToTypeID("MrgV");
    var desc25388 = new ActionDescriptor();
    var idDplc = charIDToTypeID("Dplc");
    desc25388.putBoolean(idDplc, true);
    executeAction(idMrgV, desc25388, DialogModes.NO);
}

function selectLayer(layerName) {
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
        result = false;
    }

    return result;
}

//add mask
function addMask() {
    var idMk = charIDToTypeID("Mk  ");
    var desc358 = new ActionDescriptor();
    var idNw = charIDToTypeID("Nw  ");
    var idChnl = charIDToTypeID("Chnl");
    desc358.putClass(idNw, idChnl);
    var idAt = charIDToTypeID("At  ");
    var ref208 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref208.putEnumerated(idChnl, idChnl, idMsk);
    desc358.putReference(idAt, ref208);
    var idUsng = charIDToTypeID("Usng");
    var idUsrM = charIDToTypeID("UsrM");
    var idRvlS = charIDToTypeID("RvlS");
    desc358.putEnumerated(idUsng, idUsrM, idRvlS);
    executeAction(idMk, desc358, DialogModes.NO);
}

function hasSelection() {
    var hasSelection = false;
    var ref = new ActionReference();
    ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("selection"));
    ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    var desc = executeActionGet(ref);
    if (desc.count) hasSelection = true;
    return hasSelection;
}