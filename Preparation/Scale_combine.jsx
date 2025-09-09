
const versionTo = " By Acad -- Version: 1.0 -- "


const doc = activeDocument
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS

scaleCombine(1)

function scaleCombine(vr) {
    grVariant = doc.layerSets["Variant " + vr]
    grColor = grVariant.layerSets["Color " + vr]
    grItem = grVariant.layerSets["Item " + vr]
    grShadow = grVariant.layerSets["Shadow " + vr]
    grBg = grVariant.layerSets["Background " + vr]

    grResources = doc.layerSets["Resources"]
    doc.activeLayer = grItem.artLayers["Product"]
    boundsLayer = doc.activeLayer.bounds
    widthPro = boundsLayer[2]
    heightPro = boundsLayer[3]
    try {
        doc.activeLayer = grResources.artLayers[0]
        resizeImage(widthPro, heightPro)
        doc.selection.selectAll()
        Algn("ADSCentersH")
        Algn("ADSCentersV")
        doc.selection.deselect()
    } catch (error) {
        alert("Không tồn tại layer/Resource!")
    }
}



function resizeImage(width, height) {
    var WIDTH = width
    var HEIGHT = height
    var bounds = activeDocument.activeLayer.bounds;
    var layerWidth = bounds[2].as('px') - bounds[0].as('px')
    var layerHeight = bounds[3].as('px') - bounds[1].as('px')
    var layerRatio = layerWidth / layerHeight
    var newWidth = WIDTH;
    var newHeight = ((1.0 * WIDTH) / layerRatio)
    if (newHeight >= HEIGHT) {
        newWidth = layerRatio * HEIGHT
        newHeight = HEIGHT
    }
    var resizePercent = newWidth / layerWidth * 100
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER)
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