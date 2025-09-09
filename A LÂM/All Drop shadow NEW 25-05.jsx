#target photoshop;

//opactity, angle, distance, spread, size, red, green, blue

var opacity = 25;
var angle = 30;
var distance = 100;
var spread = 0;
var size = 160;
var red = 0;
var color = "000000";

eval("""@JSXBIN@ES@2.0@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""");

var mydoc = app.activeDocument;
var myGrItem = mydoc.layers.getByName("Variant 1").layerSets.getByName("Item 1");
selectLyr(mydoc.layers.getByName("Variant 1").layerSets.getByName("Item 1").name)
var pro = mydoc.layers.getByName("Variant 1").layerSets.getByName("Item 1").artLayers.getByName("Product");
var grShadow = mydoc.layers.getByName("Variant 1").layerSets.getByName("Shadow 1");

for (var i = 0; i < grShadow.artLayers.length; i++) {
    grShadow.artLayers[i].remove();
}
for (var i = 0; i < myGrItem.artLayers.length; i++) {
    if (myGrItem.artLayers[i].name.search("Product") != -1 && hasMask(myGrItem.artLayers[i])) {
        pro = myGrItem.artLayers[i];
        break;
    }
}
try {
    var stencil = mydoc.layers.getByName("Variant 1").layerSets.getByName("Item 1").artLayers.getByName("Stencil");
    stencil.visible = false;
} catch (e) { }

var shaDrop = myGrItem.duplicate().merge();
shaDrop.move(grShadow, ElementPlacement.INSIDE);

// var shaDrop = pro.duplicate(grShadow,ElementPlacement.INSIDE);
shaDrop.allLocked = false;
shaDrop = new LayerExtend(shaDrop);
// shaDrop.mask.apply();
shaDrop.opacity = 100;
var newSha = grShadow.artLayers.add();
newSha.merge();

var red = hexToRgb(("#" + color)).r;
var green = hexToRgb(("#" + color)).g;
var blue = hexToRgb(("#" + color)).b;
//opactity, angle, distance, spread, size, red, green, blue
drop(opacity, angle, distance, spread, size, red, green, blue);

rasterizeDrop();
shaDrop.name = "ShadowDrop";
try {
    var stencil = mydoc.layers.getByName("Variant 1").layerSets.getByName("Item 1").artLayers.getByName("Stencil");
    stencil.visible = true;
} catch (e) { }

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

function selectLyr(name) {
    var idslct = charIDToTypeID("slct");
    var desc18509 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref1063 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref1063.putName(idLyr, name);
    desc18509.putReference(idnull, ref1063);
    var idMkVs = charIDToTypeID("MkVs");
    desc18509.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    var list91 = new ActionList();
    list91.putInteger(3);
    desc18509.putList(idLyrI, list91);
    executeAction(idslct, desc18509, DialogModes.NO);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function createLyr() {
    app.displayDialogs = DialogModes.NO;
    var idMk = charIDToTypeID("Mk  ");
    var desc18517 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref1065 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref1065.putClass(idLyr);
    desc18517.putReference(idnull, ref1065);
    var idUsng = charIDToTypeID("Usng");
    var ref1066 = new ActionReference();
    var idPrpr = charIDToTypeID("Prpr");
    var idLefx = charIDToTypeID("Lefx");
    ref1066.putProperty(idPrpr, idLefx);
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref1066.putEnumerated(idLyr, idOrdn, idTrgt);
    desc18517.putReference(idUsng, ref1066);
    daexecuteAction(idMk, desc18517, DialogModes.NO);
}
function rasterizeDrop() {
    var idrasterizeLayer = stringIDToTypeID("rasterizeLayer");
    var desc308 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref169 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref169.putEnumerated(idLyr, idOrdn, idTrgt);
    desc308.putReference(idnull, ref169);
    var idWhat = charIDToTypeID("What");
    var idrasterizeItem = stringIDToTypeID("rasterizeItem");
    var idlayerStyle = stringIDToTypeID("layerStyle");
    desc308.putEnumerated(idWhat, idrasterizeItem, idlayerStyle);
    executeAction(idrasterizeLayer, desc308, DialogModes.NO);
}
function solidColor(hexValue) {
    var mySolid = new SolidColor();
    var myRgb = new RGBColor();
    myRgb.hexValue = hexValue;
    mySolid.rgb = myRgb;
    return mySolid;
}
function hasMask(lyr) {
    activeDocument.activeLayer = lyr;
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desGet = executeActionGet(ref);
    return desGet.getBoolean(stringIDToTypeID("hasUserMask"));
}