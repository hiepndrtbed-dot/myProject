// make(91.833333, 6.930556);
// setCurves(0, 0, 230, 255);
// setThreshold(228);
const doc = activeDocument;
if (doc.quickMaskMode) {
    makeHistoryRandum();
    makePoint(10, 7);
    makePoint(10, 40);
    makePoint(10, 93);
    doc.quickMaskMode = false;
    doc.selection.invert();
    setSelectedLayer("Schatten");
    doc.activeLayer.duplicate().name = "Shadow";
    setSelectedLayer("Shadow");
    addMask();
    setSelectedLayer("Schatten");
    makeLayer("Fill 225");
    fillColor(225, 225, 225);
    doc.selection.selectAll();
    addMask();
    doc.activeLayer.invert();
    makeLayer("Fill 230");
    doc.selection.selectAll();
    fillColor(230, 230, 230);
    addMask();
    doc.activeLayer.invert();
    selectGroupLayer("Fill 225", "Schattenkurve");
    clippingMask();
    setSelectedLayer("Schatten");
    doc.activeLayer.blendMode = BlendMode.MULTIPLY;
    setSelectedLayer("230");
    setCurves(0, 0, 230, 255);
    setSelectedLayer("FULL");
    makeThreshold();
    setThreshold(228);
    setSelectedLayer("Fill 230");
    weathiBrush();
} else {
    //alert("No shadow");
    makeHistoryRandum();
    makePoint(10, 7);
    makePoint(10, 40);
    makePoint(10, 93);
    // doc.quickMaskMode = false;
    // doc.selection.invert();
    // setSelectedLayer("Schatten");
    // doc.activeLayer.duplicate().name = "Shadow";
    // setSelectedLayer("Shadow");
    // addMask();
    setSelectedLayer("Schatten");
    makeLayer("Fill 225");
    fillColor(225, 225, 225);
    doc.selection.selectAll();
    addMask();
    doc.activeLayer.invert();
    makeLayer("Fill 230");
    doc.selection.selectAll();
    fillColor(230, 230, 230);
    addMask();
    doc.activeLayer.invert();
    selectGroupLayer("Fill 225", "Schattenkurve");
    clippingMask();
    setSelectedLayer("Schatten");
    doc.activeLayer.blendMode = BlendMode.MULTIPLY;
    setSelectedLayer("230");
    setCurves(0, 0, 230, 255);
    setSelectedLayer("FULL");
    makeThreshold();
    setThreshold(228);
    setSelectedLayer("Fill 230");
    weathiBrush();
}


function fillColor(red, green, blue) {
    var myColor = new SolidColor();
    myColor.rgb.red = red; // 0 - 255
    myColor.rgb.green = green;
    myColor.rgb.blue = blue;
    activeDocument.selection.fill(myColor);

}

function makeThreshold() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("adjustmentLayer"));
    descriptor.putReference(c2t("null"), reference);
    descriptor3.putInteger(s2t("level"), 128);
    descriptor2.putObject(s2t("type"), s2t("thresholdClassEvent"), descriptor3);
    descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}


//function clipingmask
function clippingMask() {
    var idGrpL = charIDToTypeID("GrpL");
    var desc362 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref188 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref188.putEnumerated(idLyr, idOrdn, idTrgt);
    desc362.putReference(idnull, ref188);
    executeAction(idGrpL, desc362, DialogModes.NO);

}
//function selecGroup layer
function selectGroupLayer(before, after) {
    setSelectedLayer(before);
    var idslct = charIDToTypeID("slct");
    var desc360 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref187 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref187.putName(idLyr, after);
    desc360.putReference(idnull, ref187);
    var idselectionModifier = stringIDToTypeID("selectionModifier");
    var idselectionModifierType = stringIDToTypeID("selectionModifierType");
    var idaddToSelectionContinuous = stringIDToTypeID("addToSelectionContinuous");
    desc360.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelectionContinuous);
    var idMkVs = charIDToTypeID("MkVs");
    desc360.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    var list94 = new ActionList();
    desc360.putList(idLyrI, list94);
    executeAction(idslct, desc360, DialogModes.NO);
}


function makeLayer(name) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("layer"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putString(s2t("name"), name);
    descriptor.putObject(s2t("using"), s2t("layer"), descriptor2);
    descriptor.putInteger(s2t("layerID"), 208);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
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


function setSelectedLayer(layerName) {
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
    }
    return result;
}


//save selection Channel
function saveChannel(name) {
    var desc977 = new ActionDescriptor();
    var ref38 = new ActionReference();
    ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
    desc977.putReference(charIDToTypeID("null"), ref38);
    desc977.putString(charIDToTypeID("Nm  "), name);
    executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO);
    return activeDocument.channels.getByName(name);
}


//Function cham info
function makePoint(horizontal, vertical) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("colorSampler"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putUnitDouble(s2t("horizontal"), s2t("percentUnit"), horizontal);
    descriptor2.putUnitDouble(s2t("vertical"), s2t("percentUnit"), vertical);
    descriptor.putObject(s2t("position"), c2t("Pnt "), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}


//Function set curves
function setCurves(horizontal, vertical, horizontal2, vertical2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };
    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var descriptor4 = new ActionDescriptor();
    var descriptor5 = new ActionDescriptor();
    var list = new ActionList();
    var list2 = new ActionList();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
    descriptor3.putReference(s2t("channel"), reference2);
    descriptor4.putDouble(s2t("horizontal"), horizontal);
    descriptor4.putDouble(s2t("vertical"), vertical);
    list2.putObject(c2t("Pnt "), descriptor4);
    descriptor5.putDouble(s2t("horizontal"), horizontal2);
    descriptor5.putDouble(s2t("vertical"), vertical2);
    list2.putObject(c2t("Pnt "), descriptor5);
    descriptor3.putList(s2t("curve"), list2);
    list.putObject(s2t("curvesAdjustment"), descriptor3);
    descriptor2.putList(s2t("adjustment"), list);
    descriptor.putObject(s2t("to"), s2t("curves"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

function setThreshold(number) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putInteger(s2t("level"), number);
    descriptor.putObject(s2t("to"), s2t("thresholdClassEvent"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

////////////////////////////////////////////////////////////////
function weathiBrush() {
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
    // =======================================================

    var idslct = charIDToTypeID("slct");
    var desc441 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref245 = new ActionReference();
    var idPbTl = charIDToTypeID("PbTl");
    ref245.putClass(idPbTl);
    desc441.putReference(idnull, ref245);
    executeAction(idslct, desc441, DialogModes.NO);
    // =======================================================
    var idRset = charIDToTypeID("Rset");
    var desc442 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref246 = new ActionReference();
    var idClr = charIDToTypeID("Clr ");
    var idClrs = charIDToTypeID("Clrs");
    ref246.putProperty(idClr, idClrs);
    desc442.putReference(idnull, ref246);
    executeAction(idRset, desc442, DialogModes.NO);

}

//function check History colorCopy
function makeHistoryRandum() {
    var randumHistory = Math.random();
    makeHistory(randumHistory);
    return randumHistory;
}

//Save History
function makeHistory(name2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putClass(s2t("snapshotClass"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putProperty(c2t("HstS"), s2t("currentHistoryState"));
    descriptor.putReference(s2t("from"), reference2);
    descriptor.putString(s2t("name"), name2);
    descriptor.putEnumerated(s2t("using"), c2t("HstS"), s2t("fullDocument"));
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}
