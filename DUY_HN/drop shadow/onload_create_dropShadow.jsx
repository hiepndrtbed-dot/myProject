preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument;

var lengthGroup = doc.layerSets[0].artLayers.length
doc.activeLayer = doc.layerSets[0]

for (var i = 0; i < lengthGroup; i++) {
    doc.activeLayer = doc.layerSets[0].artLayers[i]
    dropShadow()
    // if (i == lengthGroup - 1) {
    //     doc.activeLayer = doc.activeLayer.parent
    //     unGroup()
    // }
}

// var newLayer = activeDocument.artLayers.add();
// newLayer.name = "Temp";
// resetBackground()
// setLayerBackground()

function unGroup() {
    var idungroupLayersEvent = stringIDToTypeID("ungroupLayersEvent");
    var desc855 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref532 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref532.putEnumerated(idLyr, idOrdn, idTrgt);
    desc855.putReference(idnull, ref532);
    executeAction(idungroupLayersEvent, desc855, DialogModes.NO);

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

function setLayerBackground() {
    var idMk = charIDToTypeID("Mk  ");
    var desc4778 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref1142 = new ActionReference();
    var idBckL = charIDToTypeID("BckL");
    ref1142.putClass(idBckL);
    desc4778.putReference(idnull, ref1142);
    var idUsng = charIDToTypeID("Usng");
    var ref1143 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref1143.putEnumerated(idLyr, idOrdn, idTrgt);
    desc4778.putReference(idUsng, ref1143);
    executeAction(idMk, desc4778, DialogModes.NO);

}
function dropShadow() {
    var idsetd = charIDToTypeID("setd");
    var desc62 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref43 = new ActionReference();
    var idPrpr = charIDToTypeID("Prpr");
    var idLefx = charIDToTypeID("Lefx");
    ref43.putProperty(idPrpr, idLefx);
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref43.putEnumerated(idLyr, idOrdn, idTrgt);
    desc62.putReference(idnull, ref43);
    var idT = charIDToTypeID("T   ");
    var desc63 = new ActionDescriptor();
    var idScl = charIDToTypeID("Scl ");
    var idPrc = charIDToTypeID("#Prc");
    desc63.putUnitDouble(idScl, idPrc, 416.666667);
    var idDrSh = charIDToTypeID("DrSh");
    var desc64 = new ActionDescriptor();
    var idenab = charIDToTypeID("enab");
    desc64.putBoolean(idenab, true);
    var idpresent = stringIDToTypeID("present");
    desc64.putBoolean(idpresent, true);
    var idshowInDialog = stringIDToTypeID("showInDialog");
    desc64.putBoolean(idshowInDialog, true);
    var idMd = charIDToTypeID("Md  ");
    var idBlnM = charIDToTypeID("BlnM");
    var idMltp = charIDToTypeID("Mltp");
    desc64.putEnumerated(idMd, idBlnM, idMltp);
    var idClr = charIDToTypeID("Clr ");
    var desc65 = new ActionDescriptor();
    var idRd = charIDToTypeID("Rd  ");
    desc65.putDouble(idRd, 0.000000);
    var idGrn = charIDToTypeID("Grn ");
    desc65.putDouble(idGrn, 0.000000);
    var idBl = charIDToTypeID("Bl  ");
    desc65.putDouble(idBl, 0.000000);
    var idRGBC = charIDToTypeID("RGBC");
    desc64.putObject(idClr, idRGBC, desc65);
    var idOpct = charIDToTypeID("Opct");
    var idPrc = charIDToTypeID("#Prc");
    desc64.putUnitDouble(idOpct, idPrc, 30.000000);
    var iduglg = charIDToTypeID("uglg");
    desc64.putBoolean(iduglg, true);
    var idlagl = charIDToTypeID("lagl");
    var idAng = charIDToTypeID("#Ang");
    desc64.putUnitDouble(idlagl, idAng, 90.000000);
    var idDstn = charIDToTypeID("Dstn");
    var idPxl = charIDToTypeID("#Pxl");
    desc64.putUnitDouble(idDstn, idPxl, 90.000000);
    var idCkmt = charIDToTypeID("Ckmt");
    var idPxl = charIDToTypeID("#Pxl");
    desc64.putUnitDouble(idCkmt, idPxl, 3.000000);
    var idblur = charIDToTypeID("blur");
    var idPxl = charIDToTypeID("#Pxl");
    desc64.putUnitDouble(idblur, idPxl, 130.000000);
    var idNose = charIDToTypeID("Nose");
    var idPrc = charIDToTypeID("#Prc");
    desc64.putUnitDouble(idNose, idPrc, 0.000000);
    var idAntA = charIDToTypeID("AntA");
    desc64.putBoolean(idAntA, false);
    var idTrnS = charIDToTypeID("TrnS");
    var desc66 = new ActionDescriptor();
    var idNm = charIDToTypeID("Nm  ");
    desc66.putString(idNm, """Linear""");
    var idShpC = charIDToTypeID("ShpC");
    desc64.putObject(idTrnS, idShpC, desc66);
    var idlayerConceals = stringIDToTypeID("layerConceals");
    desc64.putBoolean(idlayerConceals, true);
    var idDrSh = charIDToTypeID("DrSh");
    desc63.putObject(idDrSh, idDrSh, desc64);
    var idgagl = charIDToTypeID("gagl");
    var idAng = charIDToTypeID("#Ang");
    desc63.putUnitDouble(idgagl, idAng, 145.000000);
    var idLefx = charIDToTypeID("Lefx");
    desc62.putObject(idT, idLefx, desc63);
    executeAction(idsetd, desc62, DialogModes.NO);
}