
//By ACademy DN version: 1.0
preferences.rulerUnits = Units.PIXELS;
app.preferences.typeunits = TypeUnits.PIXELS;
const doc = activeDocument;
// main();
const widthLayout = 2250;
const heigthLayout = 3000;

function main() {
    switch (checkLengthGroup()) {
        case 2:
            //2 stack
            transform(1720, 2470, checkLengthGroup());
            break;
        case 3:
            //3 stack
            transform(1510, 2262, checkLengthGroup());
            break;
        case 4:
            var size = sizeLayout(225, 4, 145);
            transform(size.width, size.height, checkLengthGroup());
            break;
        case 5:
            var size = sizeLayout(225, 5, 145);
            transform(size.width, size.height, checkLengthGroup());
            break;
        case 6:
            var size = sizeLayout(225, 6, 145);
            transform(size.width, size.height, checkLengthGroup());
            break;
        default:
            alert("Chưa tồn tại!")
            break;
    }
}

function sizeLayout(padding, n, margin) {

    var result = { width: null, height: null };

    result.width = widthLayout - ((padding * (n - 1)) + (margin * 2));
    result.height = heigthLayout - ((padding * (n - 1)) + (margin * 2));

    return result;
}

function checkLengthGroup() {
    doc.activeLayer = doc.layerSets["Variant 1"];
    var length = doc.layerSets["Variant 1"].layerSets.length;
    return length;
}

function transform(width, height, n) {
    var grVar = doc.layerSets['Variant 1'];
    doc.activeLayer = grVar.artLayers['Layout'];
    var bounds = doc.activeLayer.bounds;
    doc.activeLayer = doc.activeLayer.parent;
    crop(bounds[1], bounds[0], bounds[3], bounds[2]);
    for (var i = 0; i < n; i++) {
        doc.activeLayer = grVar.layerSets[i].artLayers["Ret"];
        resizeImage(width, height);
        loadSelectionMask();
        doc.activeLayer.visible = false;
        action("CpTL");
        doc.activeLayer.name = "temp";
        doc.activeLayer = doc.activeLayer.parent;
        doc.selection.selectAll();
        Algn("ADSCentersH"); //"ADSCentersV" Doc
        Algn("ADSCentersV"); //"ADSCentersV" Ngang
        doc.activeLayer = grVar.layerSets[i].artLayers['temp'];
        setSwatch(1289, 713, 1320, 744);
        action("CpTL");
        doc.activeLayer.name = "Swatch";
        doc.activeLayer = grVar.layerSets[i].artLayers['temp'];
        doc.activeLayer.remove();
        doc.activeLayer.visible = true;
        doc.activeLayer = grVar.layerSets[i].artLayers['Swatch'];
        clippingMask();
        doc.selection.deselect();
        doc.activeLayer = doc.activeLayer.parent;

        //Kiem tra dau vao bao nhiêu Bust
        //Truong hop 5 stack 
        if (n == 6) {
            switch (i) {
                case 0:
                    doc.activeLayer.translate(562.5, 562.5);
                    break;
                case 1:
                    doc.activeLayer.translate(337.5, 337.5);
                    break;
                case 2:
                    doc.activeLayer.translate(112.5, 112.5);
                    break;
                case 3:
                    doc.activeLayer.translate(-112.5, -112.5);
                    break;
                case 4:
                    doc.activeLayer.translate(-337.5, -337.5);
                    break;
                case 5:
                    doc.activeLayer.translate(-562.5, -562.5);
                    break;
                default:
                    break;
            }
        }
        //Truong hop 5 stack 
        if (n == 5) {
            switch (i) {
                case 0:
                    doc.activeLayer.translate(450, 450);
                    break;
                case 1:
                    doc.activeLayer.translate(225, 225);
                    break;
                case 3:
                    doc.activeLayer.translate(-225, -225);
                    break;
                case 1:
                    doc.activeLayer.translate(-450, -450);
                    break;
                default:
                    break;
            }
        }
        //Truong hop 3 stack 
        else if (n == 3) {
            switch (i) {
                case 0:
                    doc.activeLayer.translate(225, 225);
                    break;
                case 2:
                    doc.activeLayer.translate(-225, -225);
                    break;
                default:
                    break;
            }
        }

        //Truong hop 2 stack 
        else if (n == 2) {
            switch (i) {
                case 0:
                    doc.activeLayer.translate(125, 125);
                    break;
                case 1:
                    doc.activeLayer.translate(-125, -125);
                    break;
                default:
                    break;
            }
        }
    }
}
// Swatch

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

//crop hinh
function crop(top, left, bottom, right) {
    var idCrop = charIDToTypeID("Crop");
    var desc11 = new ActionDescriptor();
    var idT = charIDToTypeID("T   ");
    var desc12 = new ActionDescriptor();
    var idTop = charIDToTypeID("Top ");
    var idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idTop, idPxl, top);
    var idLeft = charIDToTypeID("Left");
    var idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idLeft, idPxl, left);
    var idBtom = charIDToTypeID("Btom");
    var idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idBtom, idPxl, bottom);
    var idRght = charIDToTypeID("Rght");
    var idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idRght, idPxl, right);
    var idRctn = charIDToTypeID("Rctn");
    desc11.putObject(idT, idRctn, desc12);
    var idAngl = charIDToTypeID("Angl");
    var idAng = charIDToTypeID("#Ang");
    desc11.putUnitDouble(idAngl, idAng, 0.000000);
    var idDlt = charIDToTypeID("Dlt ");
    desc11.putBoolean(idDlt, false);
    var idcropAspectRatioModeKey = stringIDToTypeID("cropAspectRatioModeKey");
    var idcropAspectRatioModeClass = stringIDToTypeID("cropAspectRatioModeClass");
    var idtargetSize = stringIDToTypeID("targetSize");
    desc11.putEnumerated(idcropAspectRatioModeKey, idcropAspectRatioModeClass, idtargetSize);
    executeAction(idCrop, desc11, DialogModes.NO);
}


function resizeImage(width, height) {
    var WIDTH = width;
    var HEIGHT = height;
    var bounds = activeDocument.activeLayer.bounds;
    var layerWidth = bounds[2].as('px') - bounds[0].as('px');
    var layerHeight = bounds[3].as('px') - bounds[1].as('px');
    var layerRatio = layerWidth / layerHeight;
    var newWidth = WIDTH;
    var newHeight = ((1.0 * WIDTH) / layerRatio);
    if (newHeight >= HEIGHT) {
        newWidth = layerRatio * HEIGHT;
        newHeight = HEIGHT;
    }
    var resizePercent = newWidth / layerWidth * 100;
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);

}

//load selection mask
function loadSelectionMask() {
    var idsetd = charIDToTypeID("setd");
    var desc32 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref14 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref14.putProperty(idChnl, idfsel);
    desc32.putReference(idnull, ref14);
    var idT = charIDToTypeID("T   ");
    var ref15 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref15.putEnumerated(idChnl, idChnl, idMsk);
    desc32.putReference(idT, ref15);
    executeAction(idsetd, desc32, DialogModes.NO);
}

function action(action) {
    var idCpTL = charIDToTypeID(action);
    executeAction(idCpTL, undefined, DialogModes.NO);
}

// Algn("ADSCentersH"); //"ADSCentersV"
function Algn(algn) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putEnumerated(s2t("using"), s2t("alignDistributeSelector"), s2t(algn));
    descriptor.putBoolean(s2t("alignToCanvas"), false);
    executeAction(c2t("Algn"), descriptor, DialogModes.NO);
}

function setSwatch(top, left, bottom, right) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putUnitDouble(s2t("top"), s2t("pixelsUnit"), top);
    descriptor2.putUnitDouble(s2t("left"), s2t("pixelsUnit"), left);
    descriptor2.putUnitDouble(s2t("bottom"), s2t("pixelsUnit"), bottom);
    descriptor2.putUnitDouble(s2t("right"), s2t("pixelsUnit"), right);
    descriptor.putObject(s2t("to"), s2t("rectangle"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

//clipping mask layer
function clippingMask(params) {
    var idGrpL = charIDToTypeID("GrpL");
    var desc14721 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref4637 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref4637.putEnumerated(idLyr, idOrdn, idTrgt);
    desc14721.putReference(idnull, ref4637);
    executeAction(idGrpL, desc14721, DialogModes.NO);

}