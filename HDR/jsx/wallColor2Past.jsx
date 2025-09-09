// By Duc Hiep - Acad DN Version 1.5 -- OPTIMIZED
preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
var doc = app.activeDocument;

const nameLayer = "WALL2";
const feather = 1;
const expandSelection = 1;
const middleLevelsValue = 1.1;
const destWhiteMin = 180;
const nameChannel = "Wall2";

// Helpers
function cTID(s) { return app.charIDToTypeID(s); }
function sTID(s) { return app.stringIDToTypeID(s); }

function hasSelection() {
    var ref = new ActionReference();
    ref.putProperty(sTID("property"), sTID("selection"));
    ref.putEnumerated(sTID("document"), sTID("ordinal"), sTID("targetEnum"));
    var desc = executeActionGet(ref);
    return desc.count > 0;
}

function hasChannel(name) {
    return app.activeDocument.channels.some(function (ch) { return ch.name === name; });
}

function prepareSelection(expand, featherVal) {
    doc.selection.expand(expand);
    doc.selection.feather(featherVal);
}

function saveAlphaChnl(name) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putProperty(cTID("Chnl"), cTID("fsel"));
    desc.putReference(cTID("null"), ref);
    desc.putString(cTID("Nm  "), name);
    executeAction(cTID("Dplc"), desc, DialogModes.NO);
    return activeDocument.channels.getByName(name);
}

function addSelectionToChannelName(channelName) {
    var ch = doc.channels.getByName(channelName);
    doc.selection.store(ch, SelectionType.EXTEND);
}

function layerViaCopy(nameLayer) {
    executeAction(cTID("CpTL"), undefined, DialogModes.NO);
    activeDocument.activeLayer.name = nameLayer;
}

function blendingOptions(srcBlackMin, srcBlackMax, srcWhiteMin, srcWhiteMax,
    destBlackMin, destBlackMax, destWhiteMin, Dstt) {

    var d = new ActionDescriptor();
    var d2 = new ActionDescriptor();
    var d3 = new ActionDescriptor();
    var list = new ActionList();
    var ref = new ActionReference();
    var ref2 = new ActionReference();

    ref.putEnumerated(sTID("layer"), sTID("ordinal"), sTID("targetEnum"));
    d.putReference(cTID("null"), ref);

    ref2.putEnumerated(sTID("channel"), sTID("channel"), sTID("gray"));
    d3.putReference(sTID("channel"), ref2);

    d3.putInteger(sTID("srcBlackMin"), srcBlackMin);
    d3.putInteger(sTID("srcBlackMax"), srcBlackMax);
    d3.putInteger(sTID("srcWhiteMin"), srcWhiteMin);
    d3.putInteger(sTID("srcWhiteMax"), srcWhiteMax);
    d3.putInteger(sTID("destBlackMin"), destBlackMin);
    d3.putInteger(sTID("destBlackMax"), destBlackMax);
    d3.putInteger(sTID("destWhiteMin"), destWhiteMin);
    d3.putInteger(cTID("Dstt"), Dstt);

    list.putObject(sTID("blendRange"), d3);
    d2.putList(sTID("blendRange"), list);
    d.putObject(sTID("to"), sTID("layer"), d2);

    executeAction(sTID("set"), d, DialogModes.NO);
}

function setColorLayer(color) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
    desc.putReference(cTID("null"), ref);

    var descClr = new ActionDescriptor();
    descClr.putEnumerated(cTID("Clr "), cTID("Clr "), cTID(color));
    desc.putObject(cTID("T   "), cTID("Lyr "), descClr);

    executeAction(cTID("setd"), desc, DialogModes.NO);
}

function createSolidWithColorPicker(layerName) {
    if (!app.showColorPicker()) return;
    var fg = app.foregroundColor;

    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass(sTID("contentLayer"));
    desc.putReference(sTID("null"), ref);

    var solidDesc = new ActionDescriptor();
    var colorDesc = new ActionDescriptor();
    colorDesc.putDouble(sTID("red"), fg.rgb.red);
    colorDesc.putDouble(sTID("green"), fg.rgb.green);
    colorDesc.putDouble(sTID("blue"), fg.rgb.blue);

    solidDesc.putObject(sTID("type"), sTID("solidColorLayer"), colorDesc);
    desc.putObject(sTID("using"), sTID("contentLayer"), solidDesc);

    executeAction(sTID("make"), desc, DialogModes.NO);
    if (layerName) doc.activeLayer.name = layerName;
}

// ========== MAIN ==========

if (!hasSelection()) {
    alert("Chua co vung chon!");
} else {
    doc.activeLayer = doc.backgroundLayer;
    prepareSelection(expandSelection, feather);

    if (!hasChannel(nameChannel)) {
        saveAlphaChnl(nameChannel);
        layerViaCopy(nameLayer);
        doc.activeLayer.adjustLevels(0, 255, middleLevelsValue, 0, 255);
        blendingOptions(0, 0, 255, 255, 0, 0, destWhiteMin, 255);
        setColorLayer("Grn ");
        createSolidWithColorPicker("My Solid Color");
        doc.activeLayer.blendMode = BlendMode.COLORBLEND;
        doc.activeLayer.grouped = true;
    } else {
        addSelectionToChannelName(nameChannel);
        layerViaCopy(nameLayer);
        doc.activeLayer.adjustLevels(0, 255, middleLevelsValue, 0, 255);

        var solidLayer = doc.layers.getByName("My Solid Color");
        solidLayer.grouped = false;
        doc.activeLayer.move(doc.layers.getByName(nameLayer), ElementPlacement.PLACEBEFORE);
        doc.activeLayer.merge();
        solidLayer.grouped = true;
    }
}
