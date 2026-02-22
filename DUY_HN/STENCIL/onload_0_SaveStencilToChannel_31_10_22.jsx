//--By Duc Hiep Academy--
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument
bounds = doc.activeLayer.bounds
saveStencilToChannel(1, "crop")

function saveStencilToChannel(vr, nameChannel) {
    grVariant = doc.layerSets["Variant " + vr]
    grColor = grVariant.layerSets["Color " + vr]
    grItem = grVariant.layerSets["Item " + vr]
    grShadow = grVariant.layerSets["Shadow " + vr]
    grBg = grVariant.layerSets["Background " + vr]

    doc.activeLayer = grItem
    for (var i = 0; i < doc.activeLayer.layers.length; i++) {
        doc.activeLayer = doc.activeLayer.artLayers[i]
        if (doc.activeLayer.name.search("Stencil") == 0) {
            bounds = doc.activeLayer.bounds
            makeSelection(bounds[0], bounds[2], bounds[1], bounds[3])
            saveChannel(nameChannel)
            doc.selection.deselect()
            doc.activeLayer.remove()
            break
        }
        doc.activeLayer = doc.activeLayer.parent
    }
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

//save selection Channel
function saveChannel(name) {
    desc977 = new ActionDescriptor();
    ref38 = new ActionReference();
    ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
    desc977.putReference(charIDToTypeID("null"), ref38);
    desc977.putString(charIDToTypeID("Nm  "), name);
    executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO);
    return activeDocument.channels.getByName(name);
}