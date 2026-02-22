doc = app.activeDocument;
var lengthChannel = doc.channels.length;
for (var i = 3; i < lengthChannel; i++) {
    doc.selection.load(doc.channels[i]);
    makeWorkPath(0.5);
    setNamePath(doc.channels[i].name);
}


function setNamePath(name) {
    var idMk = charIDToTypeID("Mk  ");
    var desc1189 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref116 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    ref116.putClass(idPath);
    desc1189.putReference(idnull, ref116);
    var idFrom = charIDToTypeID("From");
    var ref117 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    var idWrPt = charIDToTypeID("WrPt");
    ref117.putProperty(idPath, idWrPt);
    desc1189.putReference(idFrom, ref117);
    var idNm = charIDToTypeID("Nm  ");
    desc1189.putString(idNm, name);
    executeAction(idMk, desc1189, DialogModes.NO);
}

function makeWorkPath(tolerance) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putClass(s2t("path"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putProperty(s2t("selectionClass"), s2t("selection"));
    descriptor.putReference(s2t("from"), reference2);
    descriptor.putUnitDouble(s2t("tolerance"), s2t("pixelsUnit"), tolerance);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}