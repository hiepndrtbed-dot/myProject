selectLayer("Color 1");
//selectForwardLayer(false);
// var doc = activeDocument;
// doc.layers.name = 'rename layer-';
// alert(activeDocument.name);

main();

function main() {

    var lengthChannels = activeDocument.channels.length;
    if (lengthChannels >= 3 && checkSelectionName("Temp Color") == false) {
        activeDocument.channels.removeAll();
        if (hasSelection()) {
            saveSelection("Temp Color");
            saveSelection("Alpha 1");
            activeDocument.selection.deselect();
            createLayerColor("Alpha 1");
        } else {
            activeDocument.selection.selectAll();
            saveSelection("Temp Color");
            activeDocument.selection.deselect();
            alert("Chưa có vùng chọn!");
        }
    } else {
        createChannels();
    }
    //Save channel
}


function createChannels() {
    // if (checkSelectionName("Alpha 1") == false) {
    //     if (hasSelection()) {
    //         saveSelection("Alpha 1");
    //         activeDocument.selection.deselect();
    //         createLayerColor("Alpha 1");
    //     } else {
    //         alert("Chưa có vùng chọn!");
    //     }
    // } else {
    if (hasSelection()) {
        saveSelection(null);
        var lengthChannels = activeDocument.channels.length;
        var nameChannel = activeDocument.channels[lengthChannels - 1].name;
        createLayerColor(nameChannel);
        selectLayer("Product");
    } else {
        alert("Chưa có vùng chọn!")

    }

    // }
}

function createLayerColor(endName) {
    //Gry "Vlt "Bl  "Grn "Ylw "Orng" 
    var arrColor = ["Vlt ", "Bl  ", "Grn ", "Ylw ", "Orng"]
    var randumArr = endName.substr(-1, 1) - 1
    var colorLayerRandum = arrColor[randumArr]

    // Tao layer Level 
    activeDocument.selection.load(activeDocument.channels.getByName(endName));
    makeLevels()
    activeDocument.activeLayer.name = "Acad - Levels........ - " + endName;
    setColorLayer(colorLayerRandum);

    //Tao layer Hue từ vùng chọn
    activeDocument.selection.load(activeDocument.channels.getByName(endName));
    makeHueColor();
    activeDocument.activeLayer.name = "Acad - Hue/Saturation - " + endName;
    setColorLayer(colorLayerRandum);

    //Tạo layer SelectiveColor từ vùng chọn
    activeDocument.selection.load(activeDocument.channels.getByName(endName));
    makeSelectiveColor();
    activeDocument.activeLayer.name = "Acad - Selective Color - " + endName;
    setColorLayer(colorLayerRandum);

}

//Gry "Vlt "Bl  "Grn "Ylw "Orng" 
function setColorLayer(color) {
    var idsetd = charIDToTypeID("setd");
    var desc18 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref8 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref8.putEnumerated(idLyr, idOrdn, idTrgt);
    desc18.putReference(idnull, ref8);
    var idT = charIDToTypeID("T   ");
    var desc19 = new ActionDescriptor();
    var idClr = charIDToTypeID("Clr ");
    var idClr = charIDToTypeID("Clr ");
    var idBl = charIDToTypeID(color);
    desc19.putEnumerated(idClr, idClr, idBl);
    var idLyr = charIDToTypeID("Lyr ");
    desc18.putObject(idT, idLyr, desc19);
    executeAction(idsetd, desc18, DialogModes.NO);
}


//Kiem tra ton tai selection với tên .....
function checkSelectionName(nameChannel) {
    var result = false;
    try {
        var channelRef = app.activeDocument.channels.getByName(nameChannel);
        if (channelRef) {
            result = true;
        }
    } catch (error) { }
    return result;
}

//NẾU TỒN TẠI SELECTION
function hasSelection() {
    var hasSelection = false;
    try {
        var ref = new ActionReference();
        ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("selection"));
        ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
        var desc = executeActionGet(ref);
        if (desc.count) {
            hasSelection = true;
        }
    } catch (e) { }
    return hasSelection;
}

//save vung chon
function saveSelection(name2) {
    if (name2 != null) {
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
    } else {
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
        executeAction(s2t("duplicate"), descriptor, DialogModes.NO);
    }
}
function makeCurves() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("adjustmentLayer"));
    descriptor2.putReference(c2t("null"), reference);
    descriptor.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
    descriptor3.putObject(s2t("type"), s2t("curves"), descriptor);
    descriptor2.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor3);
    executeAction(s2t("make"), descriptor2, DialogModes.NO);
}


//makeHistory("aa");


//selectHistory();
function selectHistory(nameHistory) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putName(s2t("snapshotClass"), nameHistory);
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

function makeHistory(name2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putClass(s2t("snapshotClass"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putProperty(c2t("HstS"), s2t("currentHistoryState"));
    descriptor.putReference(s2t("from"), reference2);
    descriptor.putString(s2t("name"), name2);
    descriptor.putEnumerated(s2t("using"), c2t("HstS"), s2t("fullDocument"));
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}
//select Layer
function selectLayer(lyr) {
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
    descriptor.putBoolean(s2t("makeVisible"), false);
    descriptor.putList(s2t("layerID"), list);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

//Lùi về layer bên dưới.
function selectForwardLayer(makeVisible) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var list = new ActionList();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("backwardEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putBoolean(s2t("makeVisible"), makeVisible);
    descriptor.putList(s2t("layerID"), list);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

//Tạo layer selectiveColor
function makeSelectiveColor() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("adjustmentLayer"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putEnumerated(s2t("color"), s2t("color"), s2t("red"));
    descriptor3.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
    descriptor2.putObject(s2t("type"), s2t("selectiveColor"), descriptor3);
    descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}


//Tạo layer Hue
function makeHueColor() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("adjustmentLayer"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putEnumerated(s2t("color"), s2t("color"), s2t("red"));
    descriptor3.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
    descriptor3.putBoolean(s2t("colorize"), false);
    descriptor2.putObject(s2t("type"), s2t("hueSaturation"), descriptor3);
    descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

//Tạo layer Color Balance 1
function makeColorBalance() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

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

    reference.putClass(s2t("adjustmentLayer"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putEnumerated(s2t("color"), s2t("color"), s2t("red"));
    list.putInteger(0);
    list.putInteger(0);
    list.putInteger(0);
    descriptor3.putList(s2t("shadowLevels"), list);
    list2.putInteger(0);
    list2.putInteger(0);
    list2.putInteger(0);
    descriptor3.putList(s2t("midtoneLevels"), list2);
    list3.putInteger(0);
    list3.putInteger(0);
    list3.putInteger(0);
    descriptor3.putList(s2t("highlightLevels"), list3);
    descriptor3.putBoolean(s2t("preserveLuminosity"), true);
    descriptor2.putObject(s2t("type"), s2t("colorBalance"), descriptor3);
    descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

//Tao layer Brightness/Contrast 1
function makeBrightnessContrast() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("adjustmentLayer"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putEnumerated(s2t("color"), s2t("color"), s2t("red"));
    descriptor3.putBoolean(s2t("useLegacy"), false);
    descriptor2.putObject(s2t("type"), c2t("BrgC"), descriptor3);
    descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}
function makeLevels() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var descriptor2 = new ActionDescriptor();
	var descriptor3 = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putClass( s2t( "adjustmentLayer" ));
	descriptor3.putReference( c2t( "null" ), reference );
	descriptor2.putEnumerated( s2t( "presetKind" ), s2t( "presetKindType" ), s2t( "presetKindDefault" ));
	descriptor.putObject( s2t( "type" ), s2t( "levels" ), descriptor2 );
	descriptor3.putObject( s2t( "using" ), s2t( "adjustmentLayer" ), descriptor );
	executeAction( s2t( "make" ), descriptor3, DialogModes.NO );
}
//doi ten layer
function re_name_Layer(name2) {
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

function move(adjustment, version) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var list = new ActionList();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putIndex(s2t("layer"), 17);
    descriptor.putReference(s2t("to"), reference2);
    descriptor.putBoolean(s2t("adjustment"), adjustment);
    descriptor.putInteger(s2t("version"), version);
    list.putInteger(422);
    descriptor.putList(s2t("layerID"), list);
    executeAction(s2t("move"), descriptor, DialogModes.NO);
}