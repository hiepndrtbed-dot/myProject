//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
const versionTo = " By Acad -- Version 1.5 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;
try {
    makeHistory("Window");
} catch (error) {
}
// checkSnapshot()
try { doc.artLayers[doc.artLayers.length - 4].visible = false; } catch (error) { }
var layerDarken = doc.artLayers[doc.artLayers.length - 3]
doc.activeLayer = layerDarken;
loadSelectionChannel();
addMask()
// doc.selection.copy();
// addMaskWhite();
// selectMask();
// showLayerMaskView();
// doc.paste();
doc.activeLayer.applyGaussianBlur(50);
// doc.selection.deselect();
// doc.layerSets.add().name = "Darken";
makeGroup("Darken");
addMaskBlack();
// group.name = "Darken";
// doc.artLayers[doc.artLayers.length - 3].move(doc.layerSets.getByName("Darken"), ElementPlacement.INSIDE);
doc.activeLayer = doc.artLayers[doc.artLayers.length - 2];
loadSelectionChannel();
addMask();
doc.activeLayer.applyGaussianBlur(50);
selectMaskLayerName("Darken");
selecTool("paintbrushTool");
resetBackground();

function addMaskWhite() {
    var d = new ActionDescriptor();
    var r = new ActionReference();
    r.putEnumerated(charIDToTypeID("Chnl"), charIDToTypeID("Chnl"), charIDToTypeID("Msk "));
    d.putReference(charIDToTypeID("At  "), r);
    d.putClass(charIDToTypeID("Nw  "), charIDToTypeID("Chnl"));
    d.putEnumerated(charIDToTypeID("Usng"), charIDToTypeID("UsrM"), charIDToTypeID("RvlA")); // RvlA=Reveal All
    executeAction(charIDToTypeID("Mk  "), d, DialogModes.NO);

}

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

function deleteSnapShot(name) {
    var desc381 = new ActionDescriptor();
    var ref21 = new ActionReference();
    ref21.putName(charIDToTypeID("SnpS"), name);
    desc381.putReference(charIDToTypeID("null"), ref21);
    executeAction(charIDToTypeID("Dlt "), desc381, DialogModes.NO);
};

function loadSelectionChannel() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("RGB"));
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
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
function addMaskBlack() {
    var d = new ActionDescriptor();
    var r = new ActionReference();
    r.putEnumerated(charIDToTypeID("Chnl"), charIDToTypeID("Chnl"), charIDToTypeID("Msk "));
    d.putReference(charIDToTypeID("At  "), r);
    d.putClass(charIDToTypeID("Nw  "), charIDToTypeID("Chnl"));
    d.putEnumerated(charIDToTypeID("Usng"), charIDToTypeID("UsrM"), charIDToTypeID("HdAl")); // HdAl = Hide All (đen)
    executeAction(charIDToTypeID("Mk  "), d, DialogModes.NO);
}

function showLayerMaskView() {
    var cTID = function (s) { return app.charIDToTypeID(s); };
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    // Chọn channel hiện tại (mask nếu đang active)
    ref.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc.putReference(cTID('null'), ref);
    // Bật hiển thị channel (giống Alt + click)
    desc.putBoolean(cTID('MkVs'), true);
    // Thực thi lệnh chọn channel và hiển thị
    executeAction(cTID('slct'), desc, DialogModes.NO);
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

function makeGroup(name2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putClass(s2t("layerSection"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(s2t("from"), reference2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
    doc.activeLayer.name = name2
}

//Save History
function makeHistory(name2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s)
    }

    var s2t = function (s) {
        return app.stringIDToTypeID(s)
    }

    var descriptor = new ActionDescriptor()
    var reference = new ActionReference()
    var reference2 = new ActionReference()

    reference.putClass(s2t("snapshotClass"))
    descriptor.putReference(c2t("null"), reference)
    reference2.putProperty(c2t("HstS"), s2t("currentHistoryState"))
    descriptor.putReference(s2t("from"), reference2)
    descriptor.putString(s2t("name"), name2)
    descriptor.putEnumerated(s2t("using"), c2t("HstS"), s2t("fullDocument"))
    executeAction(s2t("make"), descriptor, DialogModes.NO)
}

//select history
function selectHistory(nameHistory) {
    var c2t = function (s) {
        return app.charIDToTypeID(s)
    }

    var s2t = function (s) {
        return app.stringIDToTypeID(s)
    }

    var descriptor = new ActionDescriptor()
    var reference = new ActionReference()

    reference.putName(s2t("snapshotClass"), nameHistory)
    descriptor.putReference(c2t("null"), reference)
    executeAction(s2t("select"), descriptor, DialogModes.NO)
}
function deleteSnapShot(name) {
    var desc381 = new ActionDescriptor();
    var ref21 = new ActionReference();
    ref21.putName(charIDToTypeID("SnpS"), name);
    desc381.putReference(charIDToTypeID("null"), ref21);
    executeAction(charIDToTypeID("Dlt "), desc381, DialogModes.NO);
};