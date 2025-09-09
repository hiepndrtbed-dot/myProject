var doc = app.activeDocument;
doc.activeLayer = doc.layers[doc.layers.length - 1]

if (doc.activeLayer.isBackgroundLayer != true) {
    doc.activeLayer.isBackgroundLayer = true
}   
