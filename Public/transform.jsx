
tranformStruct();

function tranformStruct() {
    setSelectedLayer("BUST");
    var newLayer = app.activeDocument.artLayers.add();
    newLayer.name = "temp1";
    fillColor(255, 255, 255);
    revealAll();
    show("Original");
    setSelectedLayer("Original");
    autoCutout(true);
    show("Original");
    copyToLayer();
    selectAddLayer("Original");
    linkSelectedLayers();
    setSelectedLayer("temp1");
    var bounds = activeDocument.activeLayer.bounds;
    crop(bounds[1], bounds[0], bounds[3], bounds[2]);
    newLayer.remove();
    setSelectedLayer("BUST");
    //set selection mask
    setSelection();
    var bound = activeDocument.selection.bounds;
    var temp2width = bound[2].as('px') - bound[0].as('px');
    var temp2weight = bound[3].as('px') - bound[1].as('px');
    activeDocument.selection.deselect();

    FitOriginal(temp2width, temp2weight);

    function FitOriginal(WIDTH, HEIGHT) {
        setSelectedLayer("Layer 1");
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
        app.activeDocument.activeLayer.resize(resizePercent, resizePercent);
    }
    deleteLayer("Layer 1");
}

//xoa layer
function deleteLayer(layer) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var list = new ActionList();
    var reference = new ActionReference();

    reference.putName(s2t("layer"), layer);
    descriptor.putReference(c2t("null"), reference);
    descriptor.putList(s2t("layerID"), list);
    executeAction(s2t("delete"), descriptor, DialogModes.NO);
}

//Set selection layer mask
function setSelection() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
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

//Select subject 
function autoCutout(sampleAllLayers) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    descriptor.putBoolean(s2t("sampleAllLayers"), sampleAllLayers);
    executeAction(s2t("autoCutout"), descriptor, DialogModes.NO);
}

function copyToLayer() {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };
    executeAction(s2t("copyToLayer"), undefined, DialogModes.NO);
}

// =======================================================

function selectAddLayer(lyr) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var list = new ActionList();
    var reference = new ActionReference();

    reference.putName(s2t("layer"), lyr);
    descriptor.putReference(c2t("null"), reference);
    descriptor.putEnumerated(s2t("selectionModifier"), s2t("selectionModifierType"), s2t("addToSelectionContinuous"));
    descriptor.putBoolean(s2t("makeVisible"), false);
    list.putInteger(75);
    list.putInteger(98);
    descriptor.putList(s2t("layerID"), list);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

// link layer
function linkSelectedLayers() {
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
    executeAction(s2t("linkSelectedLayers"), descriptor, DialogModes.NO);
}

//Fill colo layer.
function fillColor(red, green, blue) {
    var myColor = new SolidColor();
    myColor.rgb.red = red; // 0 - 255
    myColor.rgb.green = green;
    myColor.rgb.blue = blue;
    activeDocument.selection.fill(myColor);

}
//revealAll document
function revealAll() {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    executeAction(s2t("revealAll"), descriptor, DialogModes.NO);
}

function show(lyr) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var list = new ActionList();
    var reference = new ActionReference();

    reference.putName(s2t("layer"), lyr);
    list.putReference(reference);
    descriptor.putList(c2t("null"), list);
    descriptor.putBoolean(c2t("TglO"), true);
    executeAction(s2t("show"), descriptor, DialogModes.NO);
}



//activeDocument.activeLayer.fillOpacity = 0;
//activeDocument.activeLayer.blendMode = BlendMode.NORMAL

/*

*/
function setSelectedLayer(layerIndexOrName) {
    try {
        var id239 = charIDToTypeID("slct");
        var desc45 = new ActionDescriptor();
        var id240 = charIDToTypeID("null");
        var ref43 = new ActionReference();
        var id241 = charIDToTypeID("Lyr ");
        if (typeof layerIndexOrName == "number") {
            ref43.putIndex(id241, layerIndexOrName);
        } else {
            ref43.putName(id241, layerIndexOrName);
        }
        desc45.putReference(id240, ref43);
        var id242 = charIDToTypeID("MkVs");
        desc45.putBoolean(id242, false);
        executeAction(id239, desc45, DialogModes.NO);
    } catch (e) {
        ; // do nothing
    }
}




