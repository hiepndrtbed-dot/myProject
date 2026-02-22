
var doc = activeDocument;
///document current.

var curentNameDocument = doc.name;

//Search document copy
var lengthDoc = documents.length;
var copySill = searchStructCopySill(lengthDoc);
if (copySill == true) {
    deselectPath();
    doc.activeLayer.visible = true
    doc.selection.copy();
} else {
    selectLayer("Product");
    deselectPath();
    doc.selection.copy();
}
//quay lai document Curent
for (var index = 0; index < lengthDoc; index++) {
    if (documents[index].name == curentNameDocument) {
        var docCurent = index;
    }
}
// Trnf

activeDocument = documents[docCurent];
selectLayer("Product");
pasteFolder();
doc.activeLayer.name = "Acad Shape Silhouette Style Ver1";
doc.activeLayer.opacity = "50";
doc.activeLayer.invert()
try { InteractiveTransform(); } catch (error) { }
selectLayer("Product");
try { InteractiveTransform(); } catch (error) { }
liquify();

//tim color/Doc can copy.
function searchStructCopySill(lengthDoc) {
    var result = false;
    for (var index = 0; index < lengthDoc - 1; index++) {
        activeDocument = documents[index];
        if (setSelectedLayer("Acad Shape Silhouette Style Ver1") == true) {
            result = true;
            break;
        } else {
            result = false;
        }
    }
    return result;
}

//function length group Color
function lengthGroupColor(group) {
    setSelectedLayer(group);
    var lengthColor = activeDocument.activeLayer.layers.length;
    return lengthColor;
}
function action(action) {
    var idCpTL = charIDToTypeID(action);
    executeAction(idCpTL, undefined, DialogModes.NO);
}

function liquify(params) {
    try {
        var idLqFy = charIDToTypeID("LqFy");
        executeAction(idLqFy, undefined, DialogModes.ALL);
    } catch (error) { }
}

//free transform
function InteractiveTransform() {
    // Menu Edit>Free transform
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), cTID('FrTr'));
        desc1.putReference(cTID('null'), ref1);
        executeAction(cTID('slct'), desc1, DialogModes.NO);
    } catch (error) {

    }
}
function InteractiveTransform() {
    app.runMenuItem(charIDToTypeID("FrTr"));
}

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
//Paste
function pasteFolder() {
    try {
        var idpast = charIDToTypeID("past");
        var desc262 = new ActionDescriptor();
        var idinPlace = stringIDToTypeID("inPlace");
        desc262.putBoolean(idinPlace, true);
        var idAntA = charIDToTypeID("AntA");
        var idAnnt = charIDToTypeID("Annt");
        var idAnno = charIDToTypeID("Anno");
        desc262.putEnumerated(idAntA, idAnnt, idAnno);
        var idAs = charIDToTypeID("As  ");
        var idPxel = charIDToTypeID("Pxel");
        desc262.putClass(idAs, idPxel);
        executeAction(idpast, desc262, DialogModes.NO);

    } catch (e) {
        //alert("err");
    }
}
//select layer
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

//select layer
function selectLayer(nameLayer) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putName(s2t("layer"), nameLayer);
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}
