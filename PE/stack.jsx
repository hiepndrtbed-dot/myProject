var length = activeDocument.layerSets[0].artLayers.length;
activeDocument.guides.removeAll()
var layers = activeDocument.layerSets[0].artLayers
var magrin = 50
var id = (length == 6) ? 3 : 2;
createLayout(length);
if (length == 3 || length == 2) {
    var columnCount = (length === 2) ? 2 : 3;
    var columnGutter
    if (layers.length == 2) {
        columnGutter = 110
    } else if (layers.length == 3) {
        columnGutter = 80;
    } else {
        columnGutter = 50
    }
    var margin = 50; // Lề trên, dưới, trái, và phải
    var canvasWidth = activeDocument.width;
    var columnWidth = (canvasWidth - (columnCount - 1) * columnGutter - 2 * margin) / columnCount;

    for (var i = 0; i < layers.length; i++) {
        var currentLayer = layers[i];
        var layerName = currentLayer.name;
        var layerNum = parseInt(layerName.slice(-1));
        if (!isNaN(layerNum) && layerNum > 0 && layerNum <= columnCount) {
            var columnIndex = layerNum - 1;
            var newLayerX = columnIndex * (columnWidth + columnGutter) + margin;
            var newLayerY = margin;
            var targetWidth = columnWidth;
            var widthRatio = targetWidth / (currentLayer.bounds[2] - currentLayer.bounds[0]);
            currentLayer.resize(widthRatio * 100, widthRatio * 100);
            currentLayer.translate(newLayerX - currentLayer.bounds[0], newLayerY - currentLayer.bounds[1]);
        }

    }
    for (var i = 0; i < length; i++) {
        select_layer(layers[i].id, true);
    }
    Merge(true);
    var linklayer = activeDocument.activeLayer;
    var length = layers.length;
    for (var i = 0; i < length; i++) {
       layers[i].link(linklayer);
    };
    fitToCanvas(true);
    activeDocument.activeLayer.remove()
    var length = layers.length;

    for (var i = 0; i < length; i++) {
        if (layers[i].linkedLayers.length > 0) {
            layers[i].unlink()
        }
    }
} else {
    for (var i = 0; i < length; i++) {
        if (i < id) {
            setSelectionforGuide(0, 1, 0, 1)
        } else {
            setSelectionforGuide(0, 1, 2, 3)
        }
        tranform(i);
    }
    //==================================================\\
    var magrinstack = layers[0].bounds[0];
    for (var i = 1; i < length; i++) {
        var currentLayer = layers[i];
        var previousLayer = layers[i - 1];
        var le = (previousLayer.bounds[2] - magrinstack) + magrin;
        currentLayer.translate(le, 0);
    }
    //==================================================\\
    deselectLayers()
    for (var i = 0; i < length; i++) {
        var layerzz = layers[i];
        if (i < id) {
            select_layer(layerzz.id, true)
        }
    }
    Merge(true)
    activeDocument.activeLayer.name = "TOPCANVAS";
    var layerlink = activeDocument.activeLayer;
    var length = layers.length
    for (var i = 0; i < length; i++) {
        var layerzz = layers[i];
        if ((i <= id) && layerzz.name != layerlink.name) {
            layerzz.link(layerlink)
        }
    }
    fitToCanvas()
    activeDocument.activeLayer.remove();
    //==================================================\\
    deselectLayers()
    var length = layers.length
    for (var i = 0; i < length; i++) {
        var layerzz = layers[i];
        if (i >= id) {
            select_layer(layerzz.id, true)
        }
    }
    Merge(true)
    activeDocument.activeLayer.name = "BOTCANVAS";
    var layerlink = activeDocument.activeLayer;
    var length = layers.length
    for (var i = 0; i < length; i++) {
        var layerzz = layers[i];
        if ((i >= id) && layerzz.name != layerlink.name) {
            layerzz.link(layerlink)
        }
    }
    fitToCanvas()
    //==================================================\\
    activeDocument.activeLayer.remove();
    var length = layers.length
    for (var i = 0; i < length; i++) {
        if (layers[i].linkedLayers.length > 0) {
            layers[i].unlink()
        }
    }
    activeDocument.guides.removeAll();
}

function tranform(index) {
    var bounds = activeDocument.selection.bounds;
    var b0 = bounds[0];
    var b1 = bounds[1];
    var b2 = bounds[2];
    var b3 = bounds[3];
    activeDocument.selection.deselect()
    var layerToMove = layers[index];
    var newWidth = b2 - b0;
    var newHeight = b3 - b1;
    var widthRatio = newWidth / (layerToMove.bounds[2] - layerToMove.bounds[0]);
    var heightRatio = newHeight / (layerToMove.bounds[3] - layerToMove.bounds[1]);
    var ratio = Math.min(widthRatio, heightRatio);
    layerToMove.resize(ratio * 100, ratio * 100);
    var centerX = (b0 + b2) / 2;
    var centerY = (b1 + b3) / 2;
    var newLayerX = centerX - (layerToMove.bounds[2] - layerToMove.bounds[0]) / 2;
    var newLayerY = centerY - (layerToMove.bounds[3] - layerToMove.bounds[1]) / 2;
    layerToMove.translate(newLayerX - layerToMove.bounds[0], newLayerY - layerToMove.bounds[1]);
}

function createLayout(length) {
    var desc1 = new ActionDescriptor();
    desc1.putEnumerated(stringIDToTypeID("presetKind"), stringIDToTypeID("presetKindType"), stringIDToTypeID("presetKindCustom"));
    var desc2 = new ActionDescriptor();
    if (length > 3) {
        desc2.putInteger(stringIDToTypeID("rowCount"), 2);
        desc2.putUnitDouble(stringIDToTypeID("rowGutter"), charIDToTypeID('#Pxl'), 400);
    }
    desc2.putUnitDouble(stringIDToTypeID("marginTop"), charIDToTypeID('#Pxl'), 50);
    desc2.putUnitDouble(stringIDToTypeID("marginLeft"), charIDToTypeID('#Pxl'), 50);
    desc2.putUnitDouble(stringIDToTypeID("marginBottom"), charIDToTypeID('#Pxl'), 50);
    desc2.putUnitDouble(stringIDToTypeID("marginRight"), charIDToTypeID('#Pxl'), 50);
    desc1.putObject(stringIDToTypeID("guideLayout"), stringIDToTypeID("guideLayout"), desc2);
    desc1.putEnumerated(stringIDToTypeID("guideTarget"), stringIDToTypeID("guideTarget"), stringIDToTypeID("guideTargetCanvas"));
    executeAction(stringIDToTypeID('newGuideLayout'), desc1, DialogModes.NO);
    // if (length > 4) {
    //     var canvasWidth = activeDocument.width;
    //     var middleX = canvasWidth / 2;
    //     activeDocument.guides.add(Direction.VERTICAL, middleX);
    // }
}

function setSelectionforGuide(verNum1, verNum2, horNum1, horNum2) {
    var guides = activeDocument.guides;
    var horGuides = [];
    var verGuides = [];
    var selectionCoords = [];
    for (var i = 0; i < guides.length; i++) {
        if (guides[i].direction == Direction.HORIZONTAL) {
            horGuides.push(guides[i].coordinate.value);
        } else {
            verGuides.push(guides[i].coordinate.value);
        }
    }

    var x1 = verGuides[verNum1];
    var y1 = horGuides[horNum1];
    var x2 = verGuides[verNum2];
    var y2 = horGuides[horNum2];
    selectionCoords = [
        [x1, y1],
        [x2, y1],
        [x2, y2],
        [x1, y2]
    ];
    activeDocument.selection.select(selectionCoords);
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

function deselectLayers() {
    try {
        var idselectNoLayers = stringIDToTypeID("selectNoLayers");
        var desc201 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref131 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref131.putEnumerated(idLyr, idOrdn, idTrgt);
        desc201.putReference(idnull, ref131);
        executeAction(idselectNoLayers, desc201, DialogModes.NO);
    } catch (e) {
        alert(e);
        throw e;
    }
}

function fitToCanvas(ngang) {
    var currentLayer = activeDocument.activeLayer;
    var canvasWidth = activeDocument.width;
    var canvasHeight = activeDocument.height;
    var centerX = canvasWidth / 2;
    var centerY = canvasHeight / 2;
    var xOffset = centerX - (currentLayer.bounds[0] + currentLayer.bounds[2]) / 2;
    var yOffset = centerY - (currentLayer.bounds[1] + currentLayer.bounds[3]) / 2;
    if (ngang) {
        currentLayer.translate(0, yOffset);
    } else {
        currentLayer.translate(xOffset, 0);

    }
}