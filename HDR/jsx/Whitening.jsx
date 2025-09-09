//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
const versionTo = " By Acad -- Version 1.5 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;

var nameLayer = "BLACK && WHITE";
var feather = 1;
var hueValue = -90;
var middleLevelsValue = 1.2;
var destWhiteMin = 180;
var nameChannel = "Tran_ChiPhao";

if (!hasSelection()) {
    alert("Chua co vung chon!");
} else {
    doc.activeLayer = doc.backgroundLayer;
    if (!checkSelectionName(nameChannel)) {
        saveAlphaChnl(nameChannel);
        doc.selection.feather(feather);
        layerViaCopy(nameLayer);
        applyHueSat(0, hueValue, 0);   // Hue=0, Saturation=-90, Lightness=0
        activeDocument.activeLayer.adjustLevels(0, 255, middleLevelsValue, 0, 255)
        blendingOptions(0, 0, 255, 255, 0, 0, destWhiteMin, 255);// blendingOptions(0, 47, 189, 255, 0, 36, 233, 255);
        setColorLayer("Bl  ");
    } else {
        addSelectionToChannelName(nameChannel);
        doc.selection.feather(feather);
        layerViaCopy(nameLayer);
        applyHueSat(0, hueValue, 0);   // Hue=0, Saturation=-90, Lightness=0
        activeDocument.activeLayer.adjustLevels(0, 255, middleLevelsValue, 0, 255)
        doc.activeLayer.move(doc.layers.getByName(nameLayer), ElementPlacement.PLACEBEFORE);
        doc.activeLayer.merge();
    }
}

function saveAlphaChnl(name) {
    var desc977 = new ActionDescriptor();
    var ref38 = new ActionReference();
    ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
    desc977.putReference(charIDToTypeID("null"), ref38);
    desc977.putString(charIDToTypeID("Nm  "), name);
    executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO);
    return activeDocument.channels.getByName(name);
}

function applyHueSat(hue, sat, light) {
    var d = new ActionDescriptor();
    var d2 = new ActionDescriptor();

    // Master channel
    d2.putInteger(charIDToTypeID("H   "), hue);   // Hue: -180 .. +180
    d2.putInteger(charIDToTypeID("Strt"), sat);   // Saturation: -100 .. +100
    d2.putInteger(charIDToTypeID("Lght"), light); // Lightness: -100 .. +100

    d.putObject(charIDToTypeID("Adjs"), charIDToTypeID("Hst2"), d2);

    // gọi lệnh Hue/Saturation
    executeAction(charIDToTypeID("HStr"), d, DialogModes.NO);
}


// blendingOptions(0, 47, 189, 255, 0, 36, 233, 255);
function blendingOptions(srcBlackMin, srcBlackMax, srcWhiteMin, srcWhiteMax, destBlackMin, destBlackMax, destWhiteMin, Dstt) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var list = new ActionList();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("gray"));
    descriptor3.putReference(s2t("channel"), reference2);
    descriptor3.putInteger(s2t("srcBlackMin"), srcBlackMin);
    descriptor3.putInteger(s2t("srcBlackMax"), srcBlackMax);
    descriptor3.putInteger(s2t("srcWhiteMin"), srcWhiteMin);
    descriptor3.putInteger(s2t("srcWhiteMax"), srcWhiteMax);
    descriptor3.putInteger(s2t("destBlackMin"), destBlackMin);
    descriptor3.putInteger(s2t("destBlackMax"), destBlackMax);
    descriptor3.putInteger(s2t("destWhiteMin"), destWhiteMin);
    descriptor3.putInteger(c2t("Dstt"), Dstt);
    list.putObject(s2t("blendRange"), descriptor3);
    descriptor2.putList(s2t("blendRange"), list);
    descriptor.putObject(s2t("to"), s2t("layer"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

function layerViaCopy1(nameLayer, targetLayer) {
    var layerDuplicate = doc.activeLayer.duplicate(targetLayer, ElementPlacement.PLACEBEFORE);
    layerDuplicate.name = nameLayer;
    doc.activeLayer = layerDuplicate;
    addMask();
    applyMask();
}

function layerViaCopy(nameLayer) {
    var idCpTL = charIDToTypeID("CpTL");
    executeAction(idCpTL, undefined, DialogModes.NO);
    activeDocument.activeLayer.name = nameLayer;
}

//Kiem tra ton tai channel với tên .....
function checkSelectionName(nameChannel) {
    var result = false;
    try {
        var channelRef = app.activeDocument.channels.getByName(nameChannel);
        if (channelRef) {
            result = true;
        }
    } catch (error) { }
    return result;
}

//Kiem tra co ton tai vung chon
function hasSelection() {
    var hasSelection = false;
    var ref = new ActionReference();
    ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("selection"));
    ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    var desc = executeActionGet(ref);
    if (desc.count) hasSelection = true;
    return hasSelection;
}

//Add selection channel 
//Add selection channel 
function addSelectionToChannelName(channelName) {
    var ch = doc.channels.getByName(channelName);
    doc.selection.store(ch, SelectionType.EXTEND);
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

function applyMask() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("channel"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putBoolean(s2t("apply"), true);
    executeAction(s2t("delete"), descriptor, DialogModes.NO);
}
// --- Gọi thử ---

//Gry "Vlt "Bl  "Grn "Ylw "Orng" 
function setColorLayer(color) {
    var idsetd = charIDToTypeID("setd");
    var desc18 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref8 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref8.putEnumerated(idLyr, idOrdn, idTrgt);
    desc18.putReference(idnull, ref8);
    var idT = charIDToTypeID("T   ");
    var desc19 = new ActionDescriptor();
    var idClr = charIDToTypeID("Clr ");
    var idClr = charIDToTypeID("Clr ");
    var idBl = charIDToTypeID(color);
    desc19.putEnumerated(idClr, idClr, idBl);
    var idLyr = charIDToTypeID("Lyr ");
    desc18.putObject(idT, idLyr, desc19);
    executeAction(idsetd, desc18, DialogModes.NO);
}
