
//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
const versionTo = " By Acad -- Version 1.5 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;

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
        addMask(); applyMask();
        hueSaturation(0, -90, 0);
        cameraRawFilter(6, 2);
        doc.activeLayer.merge();
    } else {
        layerViaCopy("replaceColor");
        hueSaturation(0, -90, 0);
        cameraRawFilter(6, 2);
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

function hasSelection() {
    var hasSelection = false;
    var ref = new ActionReference();
    ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("selection"));
    ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    var desc = executeActionGet(ref);
    if (desc.count) hasSelection = true;
    return hasSelection;
}
function hueSaturation(hue, saturation, lightness) {
    var desc = new ActionDescriptor();
    var list = new ActionList();
    var desc2 = new ActionDescriptor();

    // Thiết lập thông số Hue/Saturation
    desc2.putInteger(charIDToTypeID("H   "), hue);       // Hue: 0
    desc2.putInteger(charIDToTypeID("Strt"), saturation);      // Saturation: +70
    desc2.putInteger(charIDToTypeID("Lght"), lightness);       // Lightness: 0

    list.putObject(charIDToTypeID("Hst2"), desc2);
    desc.putList(charIDToTypeID("Adjs"), list);

    // Không bật Colorize
    desc.putBoolean(charIDToTypeID("Clrz"), false);

    // Áp dụng trực tiếp lên layer pixel hiện tại
    executeAction(charIDToTypeID("HStr"), desc, DialogModes.NO);

}

function cameraRawFilter(temp, tint) {
    var idAdobeCameraRawFilter = stringIDToTypeID("Adobe Camera Raw Filter");
    var desc = new ActionDescriptor();

    // White Balance: Custom
    desc.putEnumerated(charIDToTypeID("WBal"), charIDToTypeID("WBal"), charIDToTypeID("Cst "));

    // Temperature và Tint
    desc.putInteger(charIDToTypeID("Temp"), temp);  // Temperature +3
    desc.putInteger(charIDToTypeID("Tint"), tint);  // Tint +1

    // Thực thi Camera Raw Filter
    executeAction(idAdobeCameraRawFilter, desc, DialogModes.NO);

}