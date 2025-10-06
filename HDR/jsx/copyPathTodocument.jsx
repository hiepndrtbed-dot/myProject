//list pathitems
//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS

var fileToDelete = new File(doc.fullName);
var curentNameDocument = doc.name;
var lengthPath = activeDocument.pathItems.length;
for (var i = 0; i < lengthPath; i++) {
    selectPath(activeDocument.pathItems[i].name);
    copy();
    activeDocument = documents[documents.length - 2];
    Paste();
    deselectPath();
    activeDocument = documents[documents.length - 1];
}
doc.close(SaveOptions.DONOTSAVECHANGES);
var deleted = fileToDelete.remove();

function copy(enabled, withDialog) {
    cTID = function (s) { return app.charIDToTypeID(s); };
    sTID = function (s) { return app.stringIDToTypeID(s); };
    if (enabled != undefined && !enabled)
        return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putString(sTID("copyHint"), "path");
    executeAction(cTID('copy'), desc1, dialogMode);
};


function Paste(enabled, withDialog) {
    cTID = function (s) { return app.charIDToTypeID(s); };
    sTID = function (s) { return app.stringIDToTypeID(s); };

    if (enabled != undefined && !enabled)
        return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    executeAction(cTID('past'), undefined, dialogMode);
};

function deselectPath() {
    var idDslc = charIDToTypeID("Dslc");
    var desc2657 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref325 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref325.putEnumerated(idPath, idOrdn, idTrgt);
    desc2657.putReference(idnull, ref325);
    executeAction(idDslc, desc2657, DialogModes.NO);
}

function selectPath(namePath) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putName(s2t("path"), namePath);
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

