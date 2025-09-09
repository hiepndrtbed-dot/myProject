structV3();
function structV1() {
    showLayer("Stencil");
    setSelectedLayer("Variant 1");
    show(true, "Variant 1");
    checkStruct("BACKGROUND");
    deleteHidden();
    setSelectedLayer("Stencil");
    var bound = activeDocument.activeLayer.bounds;
    crop(bound[1], bound[0], bound[3], bound[2])
    activeDocument.activeLayer.remove();
    setSelectedLayer("Variant 1");
    ungroupLayersEvent();
    setSelectedLayer("Item 1");
    re_name("Item");
    checkItemFinalize();
    setSelectedLayer("Color 1");
    re_name("Color");
    setSelectedLayer("Shadow 1");
    re_name("Shadow");
    checkGroupFinalize();
    setSelectedLayer("Background 1");
    re_name("Background");
    checkGroupFinalize();
    setSelectionALL();
    saveSelection("Struct");
    activeDocument.selection.deselect();

}
function structV2() {
    revert();
    deleteLayer("Variant 1");
    showLayer("Stencil");
    setSelectedLayer("Variant 2");
    show(true, "Variant 2");
    checkStruct("BACKGROUND");
    deleteHidden();
    setSelectedLayer("Stencil");
    var bound = activeDocument.activeLayer.bounds;
    crop(bound[1], bound[0], bound[3], bound[2])
    activeDocument.activeLayer.remove();
    setSelectedLayer("Variant 2");
    ungroupLayersEvent();
    setSelectedLayer("Item 2");
    re_name("Item");
    checkItemFinalize();
    setSelectedLayer("Color 2");
    re_name("Color");
    setSelectedLayer("Shadow 2");
    re_name("Shadow");
    checkGroupFinalize();
    setSelectedLayer("Background 2");
    re_name("Background");
    checkGroupFinalize();
    setSelectionALL();
    saveSelection("Struct");
    activeDocument.selection.deselect();

}

function structV3() {
    revert();
    deleteLayer("Variant 1");
    deleteLayer("Variant 2");
    showLayer("Stencil");
    setSelectedLayer("Variant 3");
    show(true, "Variant 3");
    checkStruct("BACKGROUND");
    deleteHidden();
    setSelectedLayer("Stencil");
    var bound = activeDocument.activeLayer.bounds;
    crop(bound[1], bound[0], bound[3], bound[2])
    activeDocument.activeLayer.remove();
    setSelectedLayer("Variant 3");
    ungroupLayersEvent();
    setSelectedLayer("Item 3");
    re_name("Item");
    checkItemFinalize();
    setSelectedLayer("Color 3");
    re_name("Color");
    setSelectedLayer("Shadow 3");
    re_name("Shadow");
    checkGroupFinalize();
    setSelectedLayer("Background 3");
    re_name("Background");
    checkGroupFinalize();
    setSelectionALL();
    saveSelection("Struct");
    activeDocument.selection.deselect();

}

function clearSelection() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putProperty( s2t( "channel" ), s2t( "selection" ));
	descriptor.putReference( c2t( "null" ), reference );
	descriptor.putEnumerated( s2t( "to" ), s2t( "ordinal" ), s2t( "none" ));
	executeAction( s2t( "set" ), descriptor, DialogModes.NO );
}

//revert hinh
function revert(){
    if (activeDocument.activeHistoryState.snapshot) {
        var d = new ActionDescriptor();
        var r = new ActionReference();
        r.putEnumerated(stringIDToTypeID("historyState"), stringIDToTypeID("ordinal"), stringIDToTypeID("last"));
        d.putReference(stringIDToTypeID("null"), r);
        executeAction(stringIDToTypeID("select"), d, DialogModes.NO);
    }
    else {
        var d = new ActionDescriptor();
        var r = new ActionReference();
        r.putIndex(stringIDToTypeID("snapshotClass"), 1);
        d.putReference(stringIDToTypeID("null"), r);
        executeAction(stringIDToTypeID("select"), d, DialogModes.NO);
    }
}
//Bat mat ten layer
function showLayer(layer) {
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
    list.putReference(reference);
    descriptor.putList(c2t("null"), list);
    executeAction(s2t("show"), descriptor, DialogModes.NO);
}
function checkGroupFinalize() {
    var bounds = activeDocument.activeLayer.layers.length;
    if (bounds < 1) {
        make("temp");
    }
}
//Lay all vung chon
function setSelectionALL() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putEnumerated(s2t("to"), s2t("ordinal"), s2t("allEnum"));
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}
//save vung chon
function saveSelection(name2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putString(s2t("name"), name2);
    executeAction(s2t("duplicate"), descriptor, DialogModes.NO);
}

function checkItemFinalize() {
    var bounds = activeDocument.activeLayer.layers.length;
    activeDocument.activeLayer = activeDocument.activeLayer.artLayers[bounds - 1];
    var nameLayer = activeDocument.activeLayer.name;
    var searchProductName = nameLayer.search("Product");
    if (searchProductName == 0) {
        re_name("Product");
        if (!hasLayerMask()) {
            makeMask();
        }
        //New layername == Retouch
        make("Retouch");
        //app.activeDocument.artLayers.add().name ="Retouch";
        setSelectedLayer("Item");
        //kiem tra so layer trong item
        var bound = activeDocument.activeLayer.layers.length;
        if (bound > 2) {
            for (bound; bound >= 3; bound--) {
                activeDocument.activeLayer = activeDocument.activeLayer.artLayers[0];
                activeDocument.activeLayer.merge();
                setSelectedLayer("Item");
            }
        }
    }
}

function hasLayerMask() {
    var reference = new ActionReference();
    reference.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    var desc = executeActionGet(reference);
    return desc.getBoolean(stringIDToTypeID("hasUserMask"));
}


function makeMask() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    descriptor.putClass(s2t("new"), s2t("channel"));
    reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("mask"));
    descriptor.putReference(s2t("at"), reference);
    descriptor.putEnumerated(s2t("using"), c2t("UsrM"), s2t("revealAll"));//revealAll - hideAll"
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

function make(name2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("layer"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putString(s2t("name"), name2);
    descriptor.putObject(s2t("using"), s2t("layer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

//doi ten layer
function re_name(name2) {
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
    descriptor2.putString(s2t("name"), name2);
    descriptor.putObject(s2t("to"), s2t("layer"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}


//ungroup
function ungroupLayersEvent() {
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
    executeAction(s2t("ungroupLayersEvent"), descriptor, DialogModes.NO);
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
    list.putInteger(90);
    descriptor.putList(s2t("layerID"), list);
    executeAction(s2t("delete"), descriptor, DialogModes.NO);
}





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
//lay vung chon tu layer
function setSelectonLayer(layer) {
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
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("transparencyEnum"));
    reference2.putName(s2t("layer"), layer);
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

//chec cau truc co ton tai layer cuoi cung voi ten ko
function checkStruct(layer) {
    try {
        var bounds = activeDocument.layers.length;
        activeDocument.activeLayer = activeDocument.layers[bounds - 1];
        activeDocument.activeLayer.visible = false;
        var nameLayer = activeDocument.activeLayer.name;
        var searchProductName = nameLayer.search(layer);
        if (searchProductName == -1) {
            activeDocument.activeLayer.visible = true;
        }
    } catch (error) {
        alert("Cau truc");
    }
}


//delete layer tat mat
function deleteHidden() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("hidden"));
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("delete"), descriptor, DialogModes.NO);
}

function show(TglO, layer) {
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
    list.putReference(reference);
    descriptor.putList(c2t("null"), list);
    descriptor.putBoolean(c2t("TglO"), TglO);
    executeAction(s2t("show"), descriptor, DialogModes.NO);
}

function setSelectedLayer(layerName) {
    var result = false;
    try {
        var idslct = charIDToTypeID("slct");
        var desc19 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref1 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref1.putName(idLyr, layerName);
        desc19.putReference(idnull, ref1);
        var idMkVs = charIDToTypeID("MkVs");
        desc19.putBoolean(idMkVs, false);
        var idLyrI = charIDToTypeID("LyrI");
        var list2 = new ActionList();
        list2.putInteger(10);
        desc19.putList(idLyrI, list2);
        executeAction(idslct, desc19, DialogModes.NO);
        result = true;
    } catch (error) {
    }
    return result;
}