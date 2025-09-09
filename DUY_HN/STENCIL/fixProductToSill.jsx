
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument

    ; (function () {
        fixSill(1)
        function fixSill(vr) {
            grVariant = doc.layerSets["Variant " + vr]
            grColor = grVariant.layerSets["Color " + vr]
            grItem = grVariant.layerSets["Item " + vr]
            grShadow = grVariant.layerSets["Shadow " + vr]
            grBg = grVariant.layerSets["Background " + vr]

            doc.activeLayer = grItem.artLayers["Stencil"]
            bounds = doc.activeLayer.bounds
            widthStencil = bounds[2] - bounds[0]
            heightStencil = bounds[3] - bounds[1]
            selectionLayer()
            doc.activeLayer = grItem.artLayers["Product"]
            resizeImage(widthStencil, heightStencil)
            Algn("ADSCentersH") //"ADSCentersV" Doc
            Algn("ADSCentersV") //"ADSCentersV" Ngang
            doc.selection.deselect()
        }
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

function makeSelection(left, right, top, bottom) {
    result = false
    try {
        //leftTop, leftBottom, rightBottom rightTop
        shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
        doc.selection.select(shapeRef)
        result = true
    } catch (error) {
    }
    return result
}


function Algn(algn) {
    c2t = function (s) {
       return app.charIDToTypeID(s);
   };

    s2t = function (s) {
       return app.stringIDToTypeID(s);
   };

    descriptor = new ActionDescriptor();
    reference = new ActionReference();

   reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
   descriptor.putReference(c2t("null"), reference);
   descriptor.putEnumerated(s2t("using"), s2t("alignDistributeSelector"), s2t(algn));
   descriptor.putBoolean(s2t("alignToCanvas"), false);
   executeAction(c2t("Algn"), descriptor, DialogModes.NO);
}


function selectionLayer() {
    var idsetd = charIDToTypeID("setd");
    var desc13442 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref498 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref498.putProperty(idChnl, idfsel);
    desc13442.putReference(idnull, ref498);
    var idT = charIDToTypeID("T   ");
    var ref499 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idTrsp = charIDToTypeID("Trsp");
    ref499.putEnumerated(idChnl, idChnl, idTrsp);
    desc13442.putReference(idT, ref499);
    executeAction(idsetd, desc13442, DialogModes.NO);

}


function crop(top, left, bottom, right) {
    var idCrop = charIDToTypeID("Crop")
    var desc11 = new ActionDescriptor()
    var idT = charIDToTypeID("T   ")
    var desc12 = new ActionDescriptor()
    var idTop = charIDToTypeID("Top ")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idTop, idPxl, top)
    var idLeft = charIDToTypeID("Left")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idLeft, idPxl, left)
    var idBtom = charIDToTypeID("Btom")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idBtom, idPxl, bottom)
    var idRght = charIDToTypeID("Rght")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idRght, idPxl, right)
    var idRctn = charIDToTypeID("Rctn")
    desc11.putObject(idT, idRctn, desc12)
    var idAngl = charIDToTypeID("Angl")
    var idAng = charIDToTypeID("#Ang")
    desc11.putUnitDouble(idAngl, idAng, 0.000000)
    var idDlt = charIDToTypeID("Dlt ")
    desc11.putBoolean(idDlt, false)
    var idcropAspectRatioModeKey = stringIDToTypeID("cropAspectRatioModeKey")
    var idcropAspectRatioModeClass = stringIDToTypeID("cropAspectRatioModeClass")
    var idtargetSize = stringIDToTypeID("targetSize")
    desc11.putEnumerated(idcropAspectRatioModeKey, idcropAspectRatioModeClass, idtargetSize)
    executeAction(idCrop, desc11, DialogModes.NO)
}