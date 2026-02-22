(function () {
    saveChannel("Window");
    if (layerExists("WindowTemp")) {
        doc.activeLayer = doc.artLayers.getByName("WindowTemp");
    } else {
        doc.activeLayer = doc.layerSets[0].artLayers[0];
    }
    doc.selection.expand(20);
    doc.selection.copy();
    doc.activeLayer = doc.layers[0];
    doc.selection.load(doc.channels.getByName("Window"));
    doc.channels.getByName("Window").remove();
    var idpasteInto = stringIDToTypeID("pasteInto");
    executeAction(idpasteInto, undefined, DialogModes.NO);
    // pasteFolder();
    // doc.activeLayer.merge();
    // doc.selection.load(doc.channels.getByName("Window"));
    // doc.selection.expand(20);
    // doc.selection.invert();
    // doc.selection.clear();
    // doc.selection.deselect();
    doc.activeLayer.name = "Window";
    // setCurves(0, 0, 250, 255, 0, 0, 255, 250); 
    setFeatherMask(1);
    // actionCharID("Lvls");
    setLevels(10, 245, 10, 245);
    loadSelectionByMask(doc.activeLayer.id);
    selecTool("lassoTool");
})();

//save selection Channel
function saveChannel(name) {
    var desc977 = new ActionDescriptor();
    var ref38 = new ActionReference();
    ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
    desc977.putReference(charIDToTypeID("null"), ref38);
    desc977.putString(charIDToTypeID("Nm  "), name);
    executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO);
    return activeDocument.channels.getByName(name);
}

//Paste
function pasteFolder() {
    try {
        var idpast = charIDToTypeID("past");
        var desc262 = new ActionDescriptor();
        var idinPlace = stringIDToTypeID("inPlace");
        desc262.putBoolean(idinPlace, true);
        var idAntA = charIDToTypeID("AntA");
        var idAnnt = charIDToTypeID("Annt");
        var idAnno = charIDToTypeID("Anno");
        desc262.putEnumerated(idAntA, idAnnt, idAnno);
        var idAs = charIDToTypeID("As  ");
        var idPxel = charIDToTypeID("Pxel");
        desc262.putClass(idAs, idPxel);
        executeAction(idpast, desc262, DialogModes.NO);

    } catch (e) {
        //alert("err");
    }
}

//Group layer
function setFeatherMask(userMaskFeather) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putUnitDouble(s2t("userMaskFeather"), s2t("pixelsUnit"), userMaskFeather);
    descriptor.putObject(s2t("to"), s2t("layer"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}
//setLevels
function setLevels(inputRed1, inputRed2, inputBlue1, inputBlue2) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var list = new ActionList();
    var list2 = new ActionList();
    var list3 = new ActionList();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    descriptor.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("red"));
    descriptor2.putReference(s2t("channel"), reference);
    list2.putInteger(inputRed1);
    list2.putInteger(inputRed2);
    descriptor2.putList(s2t("input"), list2);
    list.putObject(s2t("levelsAdjustment"), descriptor2);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("blue"));
    descriptor3.putReference(s2t("channel"), reference2);
    list3.putInteger(inputBlue1);
    list3.putInteger(inputBlue2);
    descriptor3.putList(s2t("input"), list3);
    list.putObject(s2t("levelsAdjustment"), descriptor3);
    descriptor.putList(s2t("adjustment"), list);
    executeAction(s2t("levels"), descriptor, DialogModes.ALL);
}
// setCurves(0, 0, 240, 255, 0, 0, 255, 240);
function setCurves(horizontal, vertical, horizontal2, vertical2, horizontal3, vertical3, horizontal4, vertical4) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var descriptor4 = new ActionDescriptor();
    var descriptor5 = new ActionDescriptor();
    var descriptor6 = new ActionDescriptor();
    var descriptor7 = new ActionDescriptor();
    var list = new ActionList();
    var list2 = new ActionList();
    var list3 = new ActionList();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    descriptor.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("red"));
    descriptor2.putReference(s2t("channel"), reference);
    descriptor3.putDouble(s2t("horizontal"), horizontal);
    descriptor3.putDouble(s2t("vertical"), vertical);
    list2.putObject(c2t("Pnt "), descriptor3);
    descriptor4.putDouble(s2t("horizontal"), horizontal2);
    descriptor4.putDouble(s2t("vertical"), vertical2);
    list2.putObject(c2t("Pnt "), descriptor4);
    descriptor2.putList(s2t("curve"), list2);
    list.putObject(s2t("curvesAdjustment"), descriptor2);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("blue"));
    descriptor5.putReference(s2t("channel"), reference2);
    descriptor6.putDouble(s2t("horizontal"), horizontal3);
    descriptor6.putDouble(s2t("vertical"), vertical3);
    list3.putObject(c2t("Pnt "), descriptor6);
    descriptor7.putDouble(s2t("horizontal"), horizontal4);
    descriptor7.putDouble(s2t("vertical"), vertical4);
    list3.putObject(c2t("Pnt "), descriptor7);
    descriptor5.putList(s2t("curve"), list3);
    list.putObject(s2t("curvesAdjustment"), descriptor5);
    descriptor.putList(s2t("adjustment"), list);
    executeAction(s2t("curves"), descriptor, DialogModes.NO);
}


//Save History
function makeHistory(name2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s)
    }

    var s2t = function (s) {
        return app.stringIDToTypeID(s)
    }

    var descriptor = new ActionDescriptor()
    var reference = new ActionReference()
    var reference2 = new ActionReference()

    reference.putClass(s2t("snapshotClass"))
    descriptor.putReference(c2t("null"), reference)
    reference2.putProperty(c2t("HstS"), s2t("currentHistoryState"))
    descriptor.putReference(s2t("from"), reference2)
    descriptor.putString(s2t("name"), name2)
    descriptor.putEnumerated(s2t("using"), c2t("HstS"), s2t("fullDocument"))
    executeAction(s2t("make"), descriptor, DialogModes.NO)
}

//select history
function selectHistory(nameHistory) {
    var c2t = function (s) {
        return app.charIDToTypeID(s)
    }

    var s2t = function (s) {
        return app.stringIDToTypeID(s)
    }

    var descriptor = new ActionDescriptor()
    var reference = new ActionReference()

    reference.putName(s2t("snapshotClass"), nameHistory)
    descriptor.putReference(c2t("null"), reference)
    executeAction(s2t("select"), descriptor, DialogModes.NO)
}
function deleteSnapShot(name) {
    var desc381 = new ActionDescriptor();
    var ref21 = new ActionReference();
    ref21.putName(charIDToTypeID("SnpS"), name);
    desc381.putReference(charIDToTypeID("null"), ref21);
    executeAction(charIDToTypeID("Dlt "), desc381, DialogModes.NO);
};

function actionCharID(actionName) {
    var id = charIDToTypeID(actionName);
    executeAction(id, undefined, DialogModes.ALL);

}


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
