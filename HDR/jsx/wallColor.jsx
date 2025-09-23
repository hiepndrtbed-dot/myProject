//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
const versionTo = " By Acad -- Version 1.5 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;

const nameLayer = "WALL ";
const feather = 1;
const expandSelection = 1;
const middleLevelsValue = 1.2;
const destWhiteMin = 230;
const nameChannel = "Wall ";

(function Main() {
    if (!hasSelection()) {
        alert("Chua co vung chon!");
    } else {
        try {
            doc.activeLayer = doc.artLayers["MERGE 1"];
        } catch (error) {
            doc.activeLayer = doc.backgroundLayer;
        }
        var nameRandum = randomOneToTen();
        saveAlphaChnl(nameChannel + nameRandum);
        prepareSelection(expandSelection, feather);
        layerViaCopy(nameLayer + nameRandum);
        activeDocument.activeLayer.adjustLevels(0, 255, middleLevelsValue, 0, 255);
        blendingOptions(0, 0, 255, 255, 0, 0, destWhiteMin, 255);// blendingOptions(0, 47, 189, 255, 0, 36, 233, 255);
        setColorLayer("Grn ");
        createSolidWithColorPicker("My Solid Color")
        app.activeDocument.activeLayer.grouped = true;
        doc.activeLayer.blendMode = BlendMode.COLORBLEND;
    }
})();

function randomOneToTen() {
    return Math.floor(Math.random() * 100) + 1;
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

function prepareSelection(expand, featherVal) {
    doc.selection.expand(expand);
    doc.selection.feather(featherVal);
}

function setLevels(middle) {
    cTID = function (s) { return app.charIDToTypeID(s); };
    sTID = function (s) { return app.stringIDToTypeID(s); };
    var enabled;
    var withDialog;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putEnumerated(sTID("presetKind"), sTID("presetKindType"), sTID("presetKindCustom"));
    var list1 = new ActionList();
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Cmps'));
    desc2.putReference(cTID('Chnl'), ref1);
    desc2.putDouble(cTID('Gmm '), middle);
    list1.putObject(cTID('LvlA'), desc2);
    desc1.putList(cTID('Adjs'), list1);
    executeAction(cTID('Lvls'), desc1, dialogMode);
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

function layerViaCopyMove(nameLayer, targetLayer) {
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
function addSelectionToChannelName(channelName) {
    var ch = doc.channels.getByName(channelName);
    doc.selection.store(ch, SelectionType.EXTEND);
}


function createSolidWithColorPicker(layerName) {

    // Hiện Color Picker
    if (!app.showColorPicker()) return; // Cancel thì thoát
    var fg = app.foregroundColor; // màu đã chọn

    // ActionDescriptor để tạo Solid Fill
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass(stringIDToTypeID("contentLayer"));
    desc.putReference(stringIDToTypeID("null"), ref);

    var solidDesc = new ActionDescriptor();
    var colorDesc = new ActionDescriptor();
    var rgbDesc = new ActionDescriptor();
    rgbDesc.putDouble(stringIDToTypeID("red"), fg.rgb.red);
    rgbDesc.putDouble(stringIDToTypeID("green"), fg.rgb.green);
    rgbDesc.putDouble(stringIDToTypeID("blue"), fg.rgb.blue);
    colorDesc.putObject(stringIDToTypeID("color"), stringIDToTypeID("RGBColor"), rgbDesc);

    solidDesc.putObject(stringIDToTypeID("type"), stringIDToTypeID("solidColorLayer"), colorDesc);
    desc.putObject(stringIDToTypeID("using"), stringIDToTypeID("contentLayer"), solidDesc);

    executeAction(stringIDToTypeID("make"), desc, DialogModes.NO);

    if (layerName) app.activeDocument.activeLayer.name = layerName;
}

function createSolicolor(name) {
    var idMk = charIDToTypeID("Mk  ");
    var desc1514 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref72 = new ActionReference();
    var idcontentLayer = stringIDToTypeID("contentLayer");
    ref72.putClass(idcontentLayer);
    desc1514.putReference(idnull, ref72);
    var idUsng = charIDToTypeID("Usng");
    var desc1515 = new ActionDescriptor();
    var idNm = charIDToTypeID("Nm  ");
    desc1515.putString(idNm, name);
    var idMd = charIDToTypeID("Md  ");
    var idBlnM = charIDToTypeID("BlnM");
    var idClr = charIDToTypeID("Clr ");
    desc1515.putEnumerated(idMd, idBlnM, idClr);
    var idGrup = charIDToTypeID("Grup");
    desc1515.putBoolean(idGrup, true);
    var idType = charIDToTypeID("Type");
    var desc1516 = new ActionDescriptor();
    var idClr = charIDToTypeID("Clr ");
    var desc1517 = new ActionDescriptor();
    var idRd = charIDToTypeID("Rd  ");
    desc1517.putDouble(idRd, 0.000000);
    var idGrn = charIDToTypeID("Grn ");
    desc1517.putDouble(idGrn, 0.000000);
    var idBl = charIDToTypeID("Bl  ");
    desc1517.putDouble(idBl, 0.000000);
    var idRGBC = charIDToTypeID("RGBC");
    desc1516.putObject(idClr, idRGBC, desc1517);
    var idsolidColorLayer = stringIDToTypeID("solidColorLayer");
    desc1515.putObject(idType, idsolidColorLayer, desc1516);
    var idcontentLayer = stringIDToTypeID("contentLayer");
    desc1514.putObject(idUsng, idcontentLayer, desc1515);
    executeAction(idMk, desc1514, DialogModes.ALL);
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