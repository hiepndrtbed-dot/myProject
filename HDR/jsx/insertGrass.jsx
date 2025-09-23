//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
const versionTo = " By Duc Hiep -- Version 1.0.1 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;

var nameTxt = "/file_infoGrass.txt"
var path = "/Library PE/Library/Grass/";

(function main() {
    if (!hasSelection()) { alert("Chua co vung chon TV!"); return; }

    doc.artLayers.add().name = "Grass";
    var width = doc.selection.bounds[2] - doc.selection.bounds[0];
    var hight = doc.selection.bounds[3] - doc.selection.bounds[1]
    addMask();
    //Lay thu muc hien tai
    var folderImage = scriptFolder.fsName + path;

    var txtFile = new File(scriptFolder.fsName + "/Data" + nameTxt);

    if (txtFile.exists) {
        txtFile.encoding = "UTF8"; // hoặc "ASCII" nếu file không có dấu tiếng Việt
        txtFile.open("r"); // "r" = read
        var fileName = txtFile.read();
        txtFile.close();
        var file = new File(fileName);
        replaceContents(file);
    } else {
        var folder = new Folder(folderImage);
        var selectFile = folder.openDlg("Khong tim thay file, vui long chon file!");
        if (selectFile.exists) {
            // app.open(selectFile);
            replaceContents(selectFile);
            // Tạo file TXT cùng thư mục
            var txtFile = new File(scriptFolder.fsName + "/Data" + nameTxt);
            txtFile.encoding = "UTF8";
            txtFile.open("w");
            txtFile.write(decodeURI(selectFile));
            txtFile.close();
        } else {
            alert("Khong co file nao duoc chon!");
        }
    }
    try {
        resizeImage(width, hight);
        doc.activeLayer.merge();
        setMaskLink(false);
        loadSelectionMask();
        Algn("ADSCentersH") //"ADSCentersV" Doc
        Algn("ADSCentersV") //"ADSCentersV" Ngang
        doc.selection.deselect();
        actionMenu("freeTransform");
        doc.activeLayer.opacity = 85;
        setLevels(0.8);
        setFeatherMask(1);
        setHue(-15);
        selectMask();
        resetBackground()
    } catch (error) { }
})();

function selectMask() {
    var idslct = charIDToTypeID("slct");
    var desc444 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref248 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref248.putEnumerated(idChnl, idChnl, idMsk);
    desc444.putReference(idnull, ref248);
    var idMkVs = charIDToTypeID("MkVs");
    desc444.putBoolean(idMkVs, false);
    executeAction(idslct, desc444, DialogModes.NO);
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


function resetBackground() {
    var idRset = charIDToTypeID("Rset");
    var desc4793 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref1153 = new ActionReference();
    var idClr = charIDToTypeID("Clr ");
    var idClrs = charIDToTypeID("Clrs");
    ref1153.putProperty(idClr, idClrs);
    desc4793.putReference(idnull, ref1153);
    executeAction(idRset, desc4793, DialogModes.NO);
}

function actionMenu(action) {
    app.runMenuItem(stringIDToTypeID(action));
    /*Invert - "invert"  
    Free Transform - "freeTransform"  
    Flip Horizontal - "flipHorizontal"  
    Flip Vertical - "flipVertical"  
    Rotate 180° - "rotate180"  
    Rotate 90° CW - "rotate90CW"  
    Rotate 90° CCW - "rotate90CCW"  
    Merge Layers - "mergeLayers"  
    Merge Visible - "mergeVisible"  
    Flatten Image - "flattenImage"  
    Add Layer Mask - "addLayerMask"  
    Apply Layer Mask - "applyLayerMask"  
    Delete Layer Mask - "deleteLayerMask"  
    Enable Layer Mask - "enableLayerMask"  
    Disable Layer Mask - "disableLayerMask"  
    New Layer - "newLayer"  
    Duplicate Layer - "duplicateLayer"  
    Delete Layer - "deleteLayer"  
    Desaturate - "desaturate"  
    Auto Contrast - "autoContrast"  
    Auto Levels - "autoLevels"  
    Auto Color - "autoColor"  
    Gaussian Blur - "gaussianBlur"  
    Unsharp Mask - "unsharpMask"  
    Shadows/Highlights - "shadowHighlight"  
    Select All - "selectAll"  
    Deselect - "deselect"  
    Reselect - "reselect"  
    Inverse Selection - "inverse"  
    Feather - "feather"  
    Crop - "crop"  
    Content-Aware Fill - "contentAwareFill"  
    Open - "open"  
    Save - "save"  
    Save As - "saveAs"  
    Close - "close"  
    New Document - "newDocument"  
    Revert - "revert"*/
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

function resizeImage(width, height) {
    WIDTH = width;
    HEIGHT = height;
    bounds = activeDocument.activeLayer.bounds;
    layerWidth = bounds[2].as('px') - bounds[0].as('px');
    layerHeight = bounds[3].as('px') - bounds[1].as('px');
    layerRatio = layerWidth / layerHeight;
    newWidth = WIDTH;
    newHeight = ((1.0 * WIDTH) / layerRatio);
    if (newHeight >= HEIGHT) {
        newWidth = layerRatio * HEIGHT;
        newHeight = HEIGHT;
    }
    resizePercent = newWidth / layerWidth * 100;
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);

}


//Group layer
function setFeatherMask(userMaskFeather) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putUnitDouble(s2t("userMaskFeather"), s2t("pixelsUnit"), userMaskFeather);
    descriptor.putObject(s2t("to"), s2t("layer"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}


function setMaskLink(state) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    desc.putReference(charIDToTypeID("null"), ref);

    var layerDesc = new ActionDescriptor();
    layerDesc.putBoolean(stringIDToTypeID("userMaskLinked"), state); // false = unlink, true = link
    desc.putObject(charIDToTypeID("T   "), charIDToTypeID("Lyr "), layerDesc);

    executeAction(charIDToTypeID("setd"), desc, DialogModes.NO);
}

function Algn(algn) {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putEnumerated(s2t("using"), s2t("alignDistributeSelector"), s2t(algn));
    descriptor.putBoolean(s2t("alignToCanvas"), false);
    executeAction(c2t("Algn"), descriptor, DialogModes.NO);
}

function loadSelectionMask() {
    var idsetd = charIDToTypeID("setd");
    var desc32 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref14 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref14.putProperty(idChnl, idfsel);
    desc32.putReference(idnull, ref14);
    var idT = charIDToTypeID("T   ");
    var ref15 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref15.putEnumerated(idChnl, idChnl, idMsk);
    desc32.putReference(idT, ref15);
    executeAction(idsetd, desc32, DialogModes.NO);
}

// Place
function replaceContents(newFile) {
    cTID = function (s) {
        return app.charIDToTypeID(s);
    };
    sTID = function (s) {
        return app.stringIDToTypeID(s);
    };
    var desc1 = new ActionDescriptor();
    desc1.putInteger(cTID('Idnt'), 3);
    desc1.putPath(cTID('null'), new File(newFile));
    desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSAverage"));
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
    desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 0);
    desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
    executeAction(cTID('Plc '), desc1, DialogModes.NO);
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

function setHue(hue) {
    var idHStr = charIDToTypeID("HStr");
    var desc82863 = new ActionDescriptor();
    var idpresetKind = stringIDToTypeID("presetKind");
    var idpresetKindType = stringIDToTypeID("presetKindType");
    var idpresetKindCustom = stringIDToTypeID("presetKindCustom");
    desc82863.putEnumerated(idpresetKind, idpresetKindType, idpresetKindCustom);
    var idGeneratedPreset = stringIDToTypeID("GeneratedPreset");
    desc82863.putBoolean(idGeneratedPreset, false);
    var idClrz = charIDToTypeID("Clrz");
    desc82863.putBoolean(idClrz, false);
    var idOriginalColors = stringIDToTypeID("OriginalColors");
    var list1331 = new ActionList();
    var desc82864 = new ActionDescriptor();
    var idH = charIDToTypeID("H   ");
    desc82864.putInteger(idH, 0);
    var idStrt = charIDToTypeID("Strt");
    desc82864.putInteger(idStrt, 100);
    var idLght = charIDToTypeID("Lght");
    desc82864.putInteger(idLght, 50);
    var idOriginalColor = stringIDToTypeID("OriginalColor");
    list1331.putObject(idOriginalColor, desc82864);
    var desc82865 = new ActionDescriptor();
    var idH = charIDToTypeID("H   ");
    desc82865.putInteger(idH, 60);
    var idStrt = charIDToTypeID("Strt");
    desc82865.putInteger(idStrt, 100);
    var idLght = charIDToTypeID("Lght");
    desc82865.putInteger(idLght, 50);
    var idOriginalColor = stringIDToTypeID("OriginalColor");
    list1331.putObject(idOriginalColor, desc82865);
    var desc82866 = new ActionDescriptor();
    var idH = charIDToTypeID("H   ");
    desc82866.putInteger(idH, 120);
    var idStrt = charIDToTypeID("Strt");
    desc82866.putInteger(idStrt, 100);
    var idLght = charIDToTypeID("Lght");
    desc82866.putInteger(idLght, 50);
    var idOriginalColor = stringIDToTypeID("OriginalColor");
    list1331.putObject(idOriginalColor, desc82866);
    var desc82867 = new ActionDescriptor();
    var idH = charIDToTypeID("H   ");
    desc82867.putInteger(idH, 180);
    var idStrt = charIDToTypeID("Strt");
    desc82867.putInteger(idStrt, 100);
    var idLght = charIDToTypeID("Lght");
    desc82867.putInteger(idLght, 50);
    var idOriginalColor = stringIDToTypeID("OriginalColor");
    list1331.putObject(idOriginalColor, desc82867);
    var desc82868 = new ActionDescriptor();
    var idH = charIDToTypeID("H   ");
    desc82868.putInteger(idH, 240);
    var idStrt = charIDToTypeID("Strt");
    desc82868.putInteger(idStrt, 100);
    var idLght = charIDToTypeID("Lght");
    desc82868.putInteger(idLght, 50);
    var idOriginalColor = stringIDToTypeID("OriginalColor");
    list1331.putObject(idOriginalColor, desc82868);
    var desc82869 = new ActionDescriptor();
    var idH = charIDToTypeID("H   ");
    desc82869.putInteger(idH, 300);
    var idStrt = charIDToTypeID("Strt");
    desc82869.putInteger(idStrt, 100);
    var idLght = charIDToTypeID("Lght");
    desc82869.putInteger(idLght, 50);
    var idOriginalColor = stringIDToTypeID("OriginalColor");
    list1331.putObject(idOriginalColor, desc82869);
    desc82863.putList(idOriginalColors, list1331);
    var idAdjs = charIDToTypeID("Adjs");
    var list1332 = new ActionList();
    var desc82870 = new ActionDescriptor();
    var idH = charIDToTypeID("H   ");
    desc82870.putInteger(idH, 0);
    var idStrt = charIDToTypeID("Strt");
    desc82870.putInteger(idStrt, hue);
    var idLght = charIDToTypeID("Lght");
    desc82870.putInteger(idLght, 0);
    var idHsttwo = charIDToTypeID("Hst2");
    list1332.putObject(idHsttwo, desc82870);
    desc82863.putList(idAdjs, list1332);
    executeAction(idHStr, desc82863, DialogModes.NO);


}
