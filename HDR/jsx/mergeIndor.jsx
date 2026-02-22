
var curentLayer = doc.layers[0];
var newLayer = doc.artLayers.add();
newLayer.name = "MERGE 1";
newLayer.move(curentLayer, ElementPlacement.PLACEBEFORE);
mergeVisible();
try {
    deleteSnapShot("History");
} catch (error) {
} finally {
    makeHistory("History");
}
focusHistorySnapshot("History");
showCurves();
selecTool("historyBrushTool");
function cameraRawIndor(temp, withDialog) {
    var a = new ActionDescriptor();
    a.putInteger(charIDToTypeID('PrVN'), 6);// Process Version
    a.putEnumerated(charIDToTypeID('WBal'), charIDToTypeID('WBal'), charIDToTypeID('Cst ')); // White Balance: Custom
    a.putInteger(charIDToTypeID('Temp'), temp);//temp
    a.putInteger(charIDToTypeID('Cr12'), 9);//contract
    a.putInteger(charIDToTypeID('Hi12'), -4);//highlight
    a.putInteger(charIDToTypeID('Sh12'), 5);//shadow
    a.putInteger(charIDToTypeID('CrTx'), 15);//texture
    a.putInteger(charIDToTypeID('Cl12'), 7);//Clarity
    a.putInteger(charIDToTypeID('Dhze'), 7);//Dehaze
    a.putInteger(charIDToTypeID('Shrp'), 50);//Sharpening
    a.putDouble(charIDToTypeID('ShpR'), 1);//Radius
    a.putInteger(charIDToTypeID('ShpD'), 25);//Detail
    a.putInteger(charIDToTypeID('ShpM'), 7);//Masking
    a.putInteger(charIDToTypeID('LNR '), 24);//Noise Reduction
    a.putInteger(charIDToTypeID('LNRD'), 50);//Detail
    a.putInteger(charIDToTypeID('LNRC'), 8);//Contract
    a.putInteger(charIDToTypeID('DfPA'), 0);//Purple Amount
    a.putInteger(charIDToTypeID('DPHL'), 30);//Purple Hue (in)
    a.putInteger(charIDToTypeID('DPHH'), 70);//Purple Hue (out)
    a.putInteger(charIDToTypeID('DfGA'), 0);//Green Amount
    a.putInteger(charIDToTypeID('DPGL'), 40);//Green Hue (in)
    a.putInteger(charIDToTypeID('DPGH'), 60);//Green Hue (out)
    executeAction(stringIDToTypeID('Adobe Camera Raw Filter'), a, withDialog ? DialogModes.ALL : DialogModes.NO);
}

function showCurves() { executeAction(charIDToTypeID("Crvs"), undefined, DialogModes.ALL); }
function mergeVisible() {
    var idMrgV = charIDToTypeID("MrgV");
    var desc25388 = new ActionDescriptor();
    var idDplc = charIDToTypeID("Dplc");
    desc25388.putBoolean(idDplc, true);
    executeAction(idMrgV, desc25388, DialogModes.NO);
}

function focusHistory() {
    var idsetd = charIDToTypeID("setd");
    var desc239 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref1 = new ActionReference();
    var idHstS = charIDToTypeID("HstS");
    var idHstB = charIDToTypeID("HstB");
    ref1.putProperty(idHstS, idHstB);
    desc239.putReference(idnull, ref1);
    var idT = charIDToTypeID("T   ");
    var ref2 = new ActionReference();
    var idHstS = charIDToTypeID("HstS");
    var idCrnH = charIDToTypeID("CrnH");
    ref2.putProperty(idHstS, idCrnH);
    desc239.putReference(idT, ref2);
    executeAction(idsetd, desc239, DialogModes.NO);
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


function focusHistorySnapshot(nameHistory) {
    // Set
    cTID = function (s) { return app.charIDToTypeID(s); };
    sTID = function (s) { return app.stringIDToTypeID(s); };
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('HstS'), cTID('HstB'));
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putName(cTID('SnpS'), nameHistory);
    desc1.putReference(cTID('T   '), ref2);
    executeAction(cTID('setd'), desc1, DialogModes.ALL);
};

function deleteSnapShot(name) {
    var desc381 = new ActionDescriptor();
    var ref21 = new ActionReference();
    ref21.putName(charIDToTypeID("SnpS"), name);
    desc381.putReference(charIDToTypeID("null"), ref21);
    executeAction(charIDToTypeID("Dlt "), desc381, DialogModes.NO);
};