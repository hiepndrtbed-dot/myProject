//By ACademy DN version: 1.0
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument
const widthImg = doc.width
const heightImg = doc.height

//////////////////////////

var grFull = doc.layerSets["FULL"]

doc.activeLayer = grFull.artLayers["Schatten"]
doc.selection.selectAll()
interSelection()
var bounds = doc.selection.bounds
if (bounds[2] == widthImg && bounds[3] == heightImg) {
    alert("BG Non fill!")
    doc.selection.deselect()
} else {
    doc.selection.invert()
    doc.selection.expand(10)
    fillContentAware()
    doc.selection.deselect()

}


function interSelection() {
    var idIntr = charIDToTypeID("Intr");
    var desc82 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref60 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idTrsp = charIDToTypeID("Trsp");
    ref60.putEnumerated(idChnl, idChnl, idTrsp);
    desc82.putReference(idnull, ref60);
    var idWith = charIDToTypeID("With");
    var ref61 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref61.putProperty(idChnl, idfsel);
    desc82.putReference(idWith, ref61);
    executeAction(idIntr, desc82, DialogModes.NO);

}

function fillContentAware() {
    var idFl = charIDToTypeID("Fl  ");
    var desc130 = new ActionDescriptor();
    var idUsng = charIDToTypeID("Usng");
    var idFlCn = charIDToTypeID("FlCn");
    var idcontentAware = stringIDToTypeID("contentAware");
    desc130.putEnumerated(idUsng, idFlCn, idcontentAware);
    var idcontentAwareColorAdaptationFill = stringIDToTypeID("contentAwareColorAdaptationFill");
    desc130.putBoolean(idcontentAwareColorAdaptationFill, false);
    var idcontentAwareRotateFill = stringIDToTypeID("contentAwareRotateFill");
    desc130.putBoolean(idcontentAwareRotateFill, false);
    var idcontentAwareScaleFill = stringIDToTypeID("contentAwareScaleFill");
    desc130.putBoolean(idcontentAwareScaleFill, false);
    var idcontentAwareMirrorFill = stringIDToTypeID("contentAwareMirrorFill");
    desc130.putBoolean(idcontentAwareMirrorFill, false);
    var idOpct = charIDToTypeID("Opct");
    var idPrc = charIDToTypeID("#Prc");
    desc130.putUnitDouble(idOpct, idPrc, 100.000000);
    var idMd = charIDToTypeID("Md  ");
    var idBlnM = charIDToTypeID("BlnM");
    var idNrml = charIDToTypeID("Nrml");
    desc130.putEnumerated(idMd, idBlnM, idNrml);
    executeAction(idFl, desc130, DialogModes.NO);
}

