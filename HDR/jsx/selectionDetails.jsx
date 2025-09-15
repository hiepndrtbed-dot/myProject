#target photoshop
//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
const versionTo = " By Acad -- Version 1.5 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;
maskall();
createAlphaChannelBlack("Details");
selectRGB();
var lengthGroup = doc.layerSets.length;
for (var i = 0; i < lengthGroup; i++) {
    loadSelectionByMask(doc.layerSets[i].id);
    addSelectionToChannelName("Details");
    doc.layerSets[i].remove();
    lengthGroup--;
    i--;
    doc.selection.deselect();
}
doc.selection.load(doc.channels.getByName("Details"));


if (activeDocument.quickMaskMode == false) { activeDocument.quickMaskMode = true; }

function maskall() {
    // Mask All Objects
    cTID = function (s) { return app.charIDToTypeID(s); };
    sTID = function (s) { return app.stringIDToTypeID(s); };
    function step1(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        desc1.putBoolean(sTID("sampleAllLayers"), false);
        desc1.putBoolean(sTID("hardEdge"), true);
        executeAction(sTID('autoMaskGenerate'), desc1, dialogMode);
    };

    step1();
};

function addSelectionToChannelName(channelName) {
    var ch = doc.channels.getByName(channelName);
    doc.selection.store(ch, SelectionType.EXTEND);
}

function selectRGB() {
    // activeDocument.activeLayer = lyr;
    var idslct = charIDToTypeID("slct");
    var desc219 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref138 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idRGB = charIDToTypeID("RGB ");
    ref138.putEnumerated(idChnl, idChnl, idRGB);
    desc219.putReference(idnull, ref138);
    var idMkVs = charIDToTypeID("MkVs");
    desc219.putBoolean(idMkVs, false);
    executeAction(idslct, desc219, DialogModes.NO);
}

function loadSelectionByMask(id) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk '));
    ref2.putIdentifier(charIDToTypeID('Lyr '), id);
    desc1.putReference(charIDToTypeID('T   '), ref2);
    executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
};

function createAlphaChannelBlack(name) {
    var idMk = charIDToTypeID("Mk  ");
    var desc44916 = new ActionDescriptor();
    var idNw = charIDToTypeID("Nw  ");
    var desc44917 = new ActionDescriptor();
    var idNm = charIDToTypeID("Nm  ");
    desc44917.putString(idNm, name);
    var idClrI = charIDToTypeID("ClrI");
    var idMskI = charIDToTypeID("MskI");
    var idMskA = charIDToTypeID("MskA");
    desc44917.putEnumerated(idClrI, idMskI, idMskA);
    var idClr = charIDToTypeID("Clr ");
    var desc44918 = new ActionDescriptor();
    var idRd = charIDToTypeID("Rd  ");
    desc44918.putDouble(idRd, 255.000000);
    var idGrn = charIDToTypeID("Grn ");
    desc44918.putDouble(idGrn, 0.000000);
    var idBl = charIDToTypeID("Bl  ");
    desc44918.putDouble(idBl, 0.000000);
    var idRGBC = charIDToTypeID("RGBC");
    desc44917.putObject(idClr, idRGBC, desc44918);
    var idOpct = charIDToTypeID("Opct");
    desc44917.putInteger(idOpct, 50);
    var idalphaChannelId = stringIDToTypeID("alphaChannelId");
    desc44917.putInteger(idalphaChannelId, 54);
    var idChnl = charIDToTypeID("Chnl");
    desc44916.putObject(idNw, idChnl, desc44917);
    executeAction(idMk, desc44916, DialogModes.NO);
}