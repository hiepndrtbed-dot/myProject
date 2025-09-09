
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument
for (var i = 0; i < doc.layerSets[0].artLayers.length; i++) {
    doc.activeLayer = doc.layerSets[0].artLayers[i]

    if (doc.activeLayer.name != "Layout") {
        //opactity, angle, distance, spread, size, red, green, blue
        drop(23, 45, 5, 10, 13, 121, 121, 121);
    }

}
var shadow1 = doc.layerSets["Variant 1"].layerSets["Item 1"].layerSets["Shadow 1"]

function drop(opactity, angle, distance, spread, size, red, green, blue) {
    var idsetd = charIDToTypeID("setd");
    var desc18278 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref1024 = new ActionReference();
    var idPrpr = charIDToTypeID("Prpr");
    var idLefx = charIDToTypeID("Lefx");
    ref1024.putProperty(idPrpr, idLefx);
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref1024.putEnumerated(idLyr, idOrdn, idTrgt);
    desc18278.putReference(idnull, ref1024);
    var idT = charIDToTypeID("T   ");
    var desc18279 = new ActionDescriptor();
    var idScl = charIDToTypeID("Scl ");
    var idPrc = charIDToTypeID("#Prc");
    desc18279.putUnitDouble(idScl, idPrc, 100.000000);
    var idDrSh = charIDToTypeID("DrSh");
    var desc18280 = new ActionDescriptor();
    var idenab = charIDToTypeID("enab");
    desc18280.putBoolean(idenab, true);
    var idpresent = stringIDToTypeID("present");
    desc18280.putBoolean(idpresent, true);
    var idshowInDialog = stringIDToTypeID("showInDialog");
    desc18280.putBoolean(idshowInDialog, true);
    var idMd = charIDToTypeID("Md  ");
    var idBlnM = charIDToTypeID("BlnM");
    var idMltp = charIDToTypeID("Mltp");
    desc18280.putEnumerated(idMd, idBlnM, idMltp);
    var idClr = charIDToTypeID("Clr ");
    var desc18281 = new ActionDescriptor();
    var idRd = charIDToTypeID("Rd  ");
    desc18281.putDouble(idRd, red);
    var idGrn = charIDToTypeID("Grn ");
    desc18281.putDouble(idGrn, green);
    var idBl = charIDToTypeID("Bl  ");
    desc18281.putDouble(idBl, blue);
    var idRGBC = charIDToTypeID("RGBC");
    desc18280.putObject(idClr, idRGBC, desc18281);
    var idOpct = charIDToTypeID("Opct");
    var idPrc = charIDToTypeID("#Prc");
    desc18280.putUnitDouble(idOpct, idPrc, opactity);
    var iduglg = charIDToTypeID("uglg");
    desc18280.putBoolean(iduglg, true);

    var idgagl = charIDToTypeID("gagl");
    var idAng = charIDToTypeID("#Ang");
    desc18279.putUnitDouble(idgagl, idAng, angle);

    var idDstn = charIDToTypeID("Dstn");
    var idPxl = charIDToTypeID("#Pxl");
    desc18280.putUnitDouble(idDstn, idPxl, distance);
    var idCkmt = charIDToTypeID("Ckmt");
    var idPxl = charIDToTypeID("#Pxl");
    desc18280.putUnitDouble(idCkmt, idPxl, spread);
    var idblur = charIDToTypeID("blur");
    var idPxl = charIDToTypeID("#Pxl");
    desc18280.putUnitDouble(idblur, idPxl, size);
    var idNose = charIDToTypeID("Nose");
    var idPrc = charIDToTypeID("#Prc");
    desc18280.putUnitDouble(idNose, idPrc, 0.000000);
    var idAntA = charIDToTypeID("AntA");
    desc18280.putBoolean(idAntA, false);
    var idTrnS = charIDToTypeID("TrnS");
    var desc18282 = new ActionDescriptor();
    var idNm = charIDToTypeID("Nm  ");
    desc18282.putString(idNm, """Linear""");
    var idShpC = charIDToTypeID("ShpC");
    desc18280.putObject(idTrnS, idShpC, desc18282);
    var idlayerConceals = stringIDToTypeID("layerConceals");
    desc18280.putBoolean(idlayerConceals, true);
    var idDrSh = charIDToTypeID("DrSh");
    desc18279.putObject(idDrSh, idDrSh, desc18280);
    var idLefx = charIDToTypeID("Lefx");
    desc18278.putObject(idT, idLefx, desc18279);
    executeAction(idsetd, desc18278, DialogModes.NO);
}