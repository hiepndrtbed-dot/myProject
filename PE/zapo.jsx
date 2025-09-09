var variant = activeDocument.layers["Variant #1"]
if (variant.artLayers.length == 2) {
    var khoangcach = 110;
} else if (variant.artLayers.length == 3) {
    var khoangcach = 80;
} else {}
transMagrin(variant, 110);
activeDocument.activeLayer = variant.layers[0]
for (i = 0; i < variant.layers.length; i++) {
    var layerN = variant.layers[i]
    if (layerN.typename == "ArtLayer") {
        select_layer(layerN.id, true)
    }
}
Merge(true)
var layerLink = activeDocument.activeLayer;
link(variant, layerLink)
fitToCanvas()
unlink(variant, layerLink)
activeDocument.activeLayer.remove();


function transMagrin(parent, mg) {
    var layers = parent.layers;
    var magrin = mg;
    var magrinstack = layers[0].bounds[0];
    for (var i = 1; i < layers.length; i++) {
        var currentLayer = layers[i];
        var previousLayer = layers[i - 1];
        var le = (previousLayer.bounds[2] - magrinstack) + magrin;
        currentLayer.translate(le, 0);
    }

}

function fitToCanvas() {
    var layerToResize = activeDocument.activeLayer
    var docWidth = app.activeDocument.width;
    var docHeight = app.activeDocument.height;
    var layerWidth = layerToResize.bounds[2] - layerToResize.bounds[0];
    var layerHeight = layerToResize.bounds[3] - layerToResize.bounds[1];
    var X = (docWidth - layerWidth) / 2;
    var Y = (docHeight - layerHeight) / 2;
    layerToResize.translate(X - layerToResize.bounds[0], Y - layerToResize.bounds[1]);
    var targetWidth = app.activeDocument.width - 100;
    var widthRatio = targetWidth / (layerToResize.bounds[2] - layerToResize.bounds[0]);
    layerToResize.resize(widthRatio * 100, widthRatio * 100);

}

function select_layer(layer, add) {
    try {
        var r = new ActionReference();
        if (typeof layer === 'number') {
            r.putIdentifier(stringIDToTypeID("layer"), layer);
        } else if (typeof layer === 'string') {
            r.putName(stringIDToTypeID("layer"), layer);
        } else {
            throw new Error("undefined");
        }
        var d = new ActionDescriptor();
        d.putReference(stringIDToTypeID("null"), r);
        if (add == true) {
            d.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("addToSelection"));
        }
        executeAction(stringIDToTypeID("select"), d, DialogModes.NO);
    } catch (e) {
        alert(e);
        throw e;
    }
}

function Merge(vv) {
    var desc1 = new ActionDescriptor();
    if (vv) {
        desc1.putBoolean(charIDToTypeID('Dplc'), true);
    }
    executeAction(stringIDToTypeID('mergeLayersNew'), desc1, DialogModes.NO);
}

function link(parent, layer) {
    for (i = 0; i < parent.layers.length; i++) {
        var layerN = parent.layers[i];
        if (layerN.typename == "ArtLayer") {
            layerN.link(layer)
        }
    }
};

function unlink(parent, layer) {
    for (i = 0; i < parent.layers.length; i++) {
        var layerN = parent.layers[i];
        if (layerN.typename == "ArtLayer") {
            layerN.unlink(layer)
        }
    }
}