//By --Duc Hiep-- Academy Pixelz Da Nang City 
// #target photoshop;
var opacityShadow = 60
app.preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = app.activeDocument;
try {
    var grShadow1 = doc.layerSets["Variant 1"].layerSets["Shadow 1"]
    var grShadow2 = doc.layerSets["Variant 2"].layerSets["Shadow 2"]
} catch (error) { }

doc.activeLayer = grShadow1

if (doc.activeLayer.artLayers.length != 0) {
    doc.activeLayer = grShadow1.artLayers[0]
    doc.activeLayer.blendMode = BlendMode.MULTIPLY;
    doc.activeLayer.opacity = opacityShadow;
    var lengthSD2 = grShadow2.artLayers.length
    for (var i = 0; i < lengthSD2; i++) {
        grShadow2.artLayers[i].remove()
    }
    doc.activeLayer.duplicate(grShadow2, ElementPlacement.PLACEATEND)
}else{ 
}
