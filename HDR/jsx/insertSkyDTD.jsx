//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
const versionTo = " By Duc Hiep -- Version 1.0.1 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;


(function () {
    var nameTxt = "/file_infoSkyDTD.txt"
    var path = "/Library PE/Library/Sky/Twilight/"

    doc.activeLayer = doc.layers[0];
    //Tao layer cuvels tang chut Red
    var diemDau = [0, 0];       // Điểm đầu: [x, y]
    var diemCuoi = [249, 255];  // Điểm cuối: [x, y]
    createRedCurveLayer(diemDau, diemCuoi);

    try {
        doc.activeLayer = doc.artLayers.getByName("Sky");
        loadSelectionMask();
    } catch (error) {
        slectionSky();
    }
    doc.artLayers.add().name = "SkyDTD";
    doc.activeLayer.move(doc.layerSets.getByName("DTD"), ElementPlacement.INSIDE);
    addMask();
    // // var file = new File("/d/1freelance/HDR/Data/shutterstock_2482507883.jpg");
    // if (file.exists) {
    //     app.open(file);
    // }

    //Lay thu muc hien tao
    var folderImage = scriptFolder.fsName + path;

    var txtFile = new File(scriptFolder.fsName + "/Data" + nameTxt);

    if (txtFile.exists) {
        txtFile.encoding = "UTF8"; // hoặc "ASCII" nếu file không có dấu tiếng Việt
        txtFile.open("r"); // "r" = read
        var fileName = txtFile.read();
        txtFile.close();
        var file = new File(fileName);
        //Name file can mo
        // app.open(file);
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
        resizeImage(doc.width, doc.height);
        doc.activeLayer.merge();
        setMaskLink(false);
        doc.selection.selectAll();
        Algn("ADSCentersH");//"ADSCentersV" Doc;
        Algn("ADSTops");//"ADSCentersV" Ngang;
        doc.selection.deselect();
        actionMenu("freeTransform");
        selectMaskLayerName("Color Fill 1");
        selectMask();
    } catch (error) {

    }

})();

function selectMaskLayerName(nameLayer) {
    var idslct = charIDToTypeID("slct");
    var desc1737 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref454 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref454.putName(idLyr, nameLayer);
    desc1737.putReference(idnull, ref454);
    var idMkVs = charIDToTypeID("MkVs");
    desc1737.putBoolean(idMkVs, false);
    executeAction(idslct, desc1737, DialogModes.NO);
}

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


function selecTool(tool) {
    var desc9 = new ActionDescriptor();
    var ref7 = new ActionReference();
    ref7.putClass(app.stringIDToTypeID(tool));
    desc9.putReference(app.charIDToTypeID('null'), ref7);
    executeAction(app.charIDToTypeID('slct'), desc9, DialogModes.NO);

    // Tool names (use quoted strings, e.g. 'moveTool')
    // moveTool
    // marqueeRectTool
    // marqueeEllipTool
    // marqueeSingleRowTool
    // marqueeSingleColumnTool
    // lassoTool
    // polySelTool
    // magneticLassoTool
    // quickSelectTool
    // magicWandTool
    // cropTool
    // sliceTool
    // sliceSelectTool
    // spotHealingBrushTool
    // magicStampTool
    // patchSelection
    // redEyeTool
    // paintbrushTool
    // pencilTool
    // colorReplacementBrushTool
    // cloneStampTool
    // patternStampTool
    // historyBrushTool
    // artBrushTool
    // eraserTool
    // backgroundEraserTool
    // magicEraserTool
    // gradientTool
    // bucketTool
    // blurTool
    // sharpenTool
    // smudgeTool
    // dodgeTool
    // burnInTool
    // saturationTool
    // penTool
    // freeformPenTool
    // addKnotTool
    // deleteKnotTool
    // convertKnotTool
    // typeCreateOrEditTool
    // typeVerticalCreateOrEditTool
    // typeCreateMaskTool
    // typeVerticalCreateMaskTool
    // pathComponentSelectTool
    // directSelectTool
    // rectangleTool
    // roundedRectangleTool
    // ellipseTool
    // polygonTool
    // lineTool
    // customShapeTool
    // textAnnotTool
    // soundAnnotTool
    // eyedropperTool
    // colorSamplerTool
    // rulerTool
    // handTool
    // zoomTool
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


function slectionSky() {
    function cTID(s) { return app.charIDToTypeID(s); }
    function sTID(s) { return app.stringIDToTypeID(s); }
    // Nhân bản kênh màu xanh dương
    function duplicateBlueChannel() {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Bl  '));
        desc.putReference(cTID('null'), ref);
        executeAction(cTID('Dplc'), desc, DialogModes.NO);
    }
    // Điều chỉnh Levels
    function adjustLevels() {
        var desc = new ActionDescriptor();
        desc.putEnumerated(sTID("presetKind"), sTID("presetKindType"), sTID("presetKindCustom"));
        var adjList = new ActionList();
        var levelDesc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
        levelDesc.putReference(cTID('Chnl'), ref);
        var inputList = new ActionList();
        inputList.putInteger(179);
        inputList.putInteger(213);
        levelDesc.putList(cTID('Inpt'), inputList);
        adjList.putObject(cTID('LvlA'), levelDesc);
        desc.putList(cTID('Adjs'), adjList);
        executeAction(cTID('Lvls'), desc, DialogModes.ALL);
    }

    // Giao vùng chọn với kênh hiện tại
    function intersectSelection() {
        var desc = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
        desc.putReference(cTID('null'), ref1);
        var ref2 = new ActionReference();
        ref2.putProperty(cTID('Chnl'), sTID("selection"));
        desc.putReference(cTID('With'), ref2);
        executeAction(cTID('Intr'), desc, DialogModes.NO);
    }

    function setSelection() {
        var desc = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(cTID('Chnl'), sTID("selection"));
        desc.putReference(cTID('null'), ref1);
        var ref2 = new ActionReference();
        ref2.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
        desc.putReference(cTID('T   '), ref2);
        executeAction(cTID('setd'), desc, DialogModes.NO);
    }

    // Xóa kênh hiện tại
    function deleteChannel() {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
        desc.putReference(cTID('null'), ref);
        executeAction(cTID('Dlt '), desc, DialogModes.NO);
    }

    // Thực thi các bước
    duplicateBlueChannel();
    adjustLevels();
    try {
        intersectSelection();
    } catch (error) {
        setSelection()
    }
    deleteChannel();
}

function selectMashChannel() {
    // Chọn kênh mặt nạ (Mask Channel) và hiển thị nó

    function cTID(s) { return app.charIDToTypeID(s); }
    function sTID(s) { return app.stringIDToTypeID(s); }
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Msk '));
    desc.putReference(cTID('null'), ref);
    desc.putBoolean(cTID('MkVs'), true);
    executeAction(cTID('slct'), desc, DialogModes.NO);
}



// Hàm tạo lớp Curves với thông số tùy chỉnh cho kênh đỏ
function createRedCurveLayer(point1, point2) {
    function cTID(s) { return app.charIDToTypeID(s); }

    // Tạo lớp điều chỉnh Curves
    var makeDesc = new ActionDescriptor();
    var makeRef = new ActionReference();
    makeRef.putClass(cTID('AdjL'));
    makeDesc.putReference(cTID('null'), makeRef);

    var curvesDesc = new ActionDescriptor();
    var presetDesc = new ActionDescriptor();
    presetDesc.putEnumerated(app.stringIDToTypeID("presetKind"), app.stringIDToTypeID("presetKindType"), app.stringIDToTypeID("presetKindDefault"));
    curvesDesc.putObject(cTID('Type'), cTID('Crvs'), presetDesc);
    makeDesc.putObject(cTID('Usng'), cTID('AdjL'), curvesDesc);
    executeAction(cTID('Mk  '), makeDesc, DialogModes.NO);

    // Thiết lập đường cong cho kênh đỏ
    var setDesc = new ActionDescriptor();
    var setRef = new ActionReference();
    setRef.putEnumerated(cTID('AdjL'), cTID('Ordn'), cTID('Trgt'));
    setDesc.putReference(cTID('null'), setRef);

    var curveData = new ActionDescriptor();
    var adjList = new ActionList();
    var redCurve = new ActionDescriptor();
    var redRef = new ActionReference();
    redRef.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Rd  '));
    redCurve.putReference(cTID('Chnl'), redRef);

    var points = new ActionList();

    var pt1 = new ActionDescriptor();
    pt1.putDouble(cTID('Hrzn'), point1[0]); // Điểm đầu: [x1, y1]
    pt1.putDouble(cTID('Vrtc'), point1[1]);
    points.putObject(cTID('Pnt '), pt1);

    var pt2 = new ActionDescriptor();
    pt2.putDouble(cTID('Hrzn'), point2[0]); // Điểm cuối: [x2, y2]
    pt2.putDouble(cTID('Vrtc'), point2[1]);
    points.putObject(cTID('Pnt '), pt2);

    redCurve.putList(cTID('Crv '), points);
    adjList.putObject(cTID('CrvA'), redCurve);
    curveData.putList(cTID('Adjs'), adjList);
    setDesc.putObject(cTID('T   '), cTID('Crvs'), curveData);

    executeAction(cTID('setd'), setDesc, DialogModes.NO);
}
