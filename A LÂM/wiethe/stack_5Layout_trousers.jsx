 //By ACademy DN version: 1.0
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument
myPaths = app.activeDocument.pathItems
//width - height layout
const widthLayout = 1320
const heightLayout = 1080
const margin = 28
const paddingH = 125
const paddingV = 77;

(function () {
    //width body product
    const widthPr = widthLayout - (margin * 2 + paddingV * 4)
    const heightPr = heightLayout - (margin * 2 + paddingH * 4)
    var grVariant = doc.layerSets[0]
    var lengthVr = grVariant.artLayers.length

    //Đưa về kich thước yêu cầu
    crop(0, 0, heightLayout, widthLayout)

    //Resize kích thước stack
    for (var i = 0; i < lengthVr; i++) {
        doc.activeLayer = grVariant.artLayers[i]
        resizeImage(widthPr, heightPr)
        doc.selection.selectAll()
        Algn("ADSBottoms") //"ADSCentersV" Doc ADSLefts
        Algn("ADSRights") //"ADSCentersV" Ngang
        doc.selection.deselect()

        //Sắp xếp layer
        if (i == 0) {
            //Translate layer đầu
            doc.activeLayer.translate(0, 0)
        } else {
            doc.activeLayer.translate(-paddingV * i, -paddingH * i)
        }
    }

    //Canh giưa layout
    doc.activeLayer = grVariant
    doc.selection.selectAll()
    Algn("ADSCentersH") //"ADSCentersV" Doc
    Algn("ADSCentersV") //"ADSCentersV" Ngang
    doc.selection.deselect()
})()

function resizeImage(width, height) {
    WIDTH = width;
    HEIGHT = height;
    bounds = activeDocument.activeLayer.bounds;
    layerWidth = bounds[2].as('px') - bounds[0].as('px');
    layerHeight = bounds[3].as('px') - bounds[1].as('px');
    layerRatio = layerWidth / layerHeight;
    newWidth = WIDTH;
    newHeight = ((1.0 * WIDTH) / layerRatio);
    if (newHeight >= HEIGHT) {
        newWidth = layerRatio * HEIGHT;
        newHeight = HEIGHT;
    }
    resizePercent = newWidth / layerWidth * 100;
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);
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