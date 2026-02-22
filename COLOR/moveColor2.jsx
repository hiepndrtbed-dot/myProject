
//save document hien tai.
var curentNameDocument = activeDocument.name;

if (checkSelectionName("Alpha 1") == false && hasSelection()) {
    //app.activeDocument.channels.removeAll();
    saveSelection("Alpha 1");
    activeDocument.selection.deselect();
} else if (checkSelectionName("Alpha 1") == true && hasSelection()) {
    saveSelection(null);
    activeDocument.selection.deselect();
} else {
    if (checkSelectionName("Alpha 1") == true || checkSelectionName("Alpha 2") == true || checkSelectionName("Alpha 3") == true || checkSelectionName("Alpha 4") == true || checkSelectionName("Alpha 5") == true) {
        main();
    } else {
        alert("Thiếu vùng chọn!")
    }
}

function main() {
    //Search document copy
    var lengthDoc = documents.length;
    var arrNameChannels = nameSelectChannels();
    var indexDoc = searchStructCopyColor(lengthDoc);
    activeDocument = documents[indexDoc];
    for (var i = 0; i < arrNameChannels.length; i++) {
        try {
            selectAdd("Acad - Hue/Saturation - " + arrNameChannels[i]);
            selectAdd("Acad - Curves........ - " + arrNameChannels[i]);
        } catch (error) { }
    }

    selectUnAdd("Color 1");
    //copy Group Color 1
    activeDocument.selection.copy();
    //quay lai document Curent
    for (var index = 0; index < lengthDoc; index++) {
        if (documents[index].name == curentNameDocument) {
            var docCurent = index;
        }
    }
    
    activeDocument = documents[docCurent];
    //paste Group color 1
    pasteFolder();
    addGroup();
    re_name_Layer("tempColor");
    filterLayerColor();
    //copy Resources
    activeDocument = documents[docCurent - 1];
    setSelectedLayer("Resources");
    if (activeDocument.activeLayer.layers.length != 0) {
        activeDocument.selection.deselect();
        activeDocument.selection.copy();
    } else {
        activeDocument = documents[indexDoc];
        setSelectedLayer("Resources");
        activeDocument.selection.deselect();
        activeDocument.pathItem.deselect();
        activeDocument.selection.copy();
    }
    activeDocument = documents[docCurent];
    setSelectedLayer("Resources");
    activeDocument.activeLayer.visible = true;
    pasteFolder();
    move();
    ungroupLayersEvent();
    activeDocument.activeLayer = activeDocument.activeLayer.parent;
    var lengthResources = activeDocument.activeLayer.layers.length;
    activeDocument.activeLayer = activeDocument.activeLayer.layers[lengthResources - 1];
}

//filter layer color copy
function filterLayerColor() {
    var lengthTemColor = activeDocument.activeLayer.layers.length;
    for (var index = 0; index < lengthTemColor; index++) {
        var nameLayerCurent = String(activeDocument.activeLayer.layers[index].name);
        activeDocument.activeLayer = activeDocument.activeLayer.layers[index];
        var endCurentLayer = String(nameLayerCurent.slice(nameLayerCurent.length - 7));
        fillColor(0, 0, 0);
        activeDocument.selection.load(activeDocument.channels.getByName(endCurentLayer));
        fillColor(255, 255, 255);
        activeDocument.selection.deselect();
        setSelectedLayer("tempColor");
    }
    move();
    ungroupLayersEvent();
    // return layerDelete;
}


function deselectPath() {
    var idDslc = charIDToTypeID("Dslc");
    var desc2657 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref325 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref325.putEnumerated(idPath, idOrdn, idTrgt);
    desc2657.putReference(idnull, ref325);
    executeAction(idDslc, desc2657, DialogModes.NO);
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


//Name selection Channel
function nameSelectChannels() {
    var channelsNames = new Array();
    var lengthChannels = activeDocument.channels.length;
    for (var index = 3; index < lengthChannels; index++) {
        var channelsName = activeDocument.channels[index].name;
        channelsNames.push(channelsName);
    }
    return channelsNames;
}



//tim color/Doc can copy.
function searchStructCopyColor(lengthDoc) {
    var lengColor = 0;
    var indexDoc;
    for (var index = 0; index < lengthDoc; index++) {
        activeDocument = documents[index];
        var lengColorDoc = lengthGroupColor("Color 1");
        if (lengColorDoc > lengColor) {
            lengColor = lengColorDoc;
            indexDoc = index;
        }
    }
    return indexDoc;
}

//function check History colorCopy
function checkHistoryColorCopy() {
    var randumHistory = Math.random();
    makeHistory(randumHistory);
    selectHistory(activeDocument.name);
    return randumHistory;
}


//Save History
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

//select history
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
//check layer can copy/
function checkLayerCopyColor() {
    var listArtLayer = new Array();
    setSelectedLayer("Color 1");
    var lengGroup = activeDocument.activeLayer.layers.length;
    if (lengGroup > 0) {
        for (var i = 0; i < lengGroup; i++) {
            var nameTem = String(activeDocument.activeLayer.layers[i].name);
            listArtLayer.push(nameTem);
        }
    }
    return listArtLayer;
}

//function length group Color
function lengthGroupColor(group) {
    setSelectedLayer(group);
    var lengthColor = activeDocument.activeLayer.layers.length;
    return lengthColor;
}

//re name Layer
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



//select layer
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
function deleteMask() {
    var idslct = charIDToTypeID("slct");
    var desc2135 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref918 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref918.putEnumerated(idChnl, idChnl, idMsk);
    desc2135.putReference(idnull, ref918);
    var idMkVs = charIDToTypeID("MkVs");
    desc2135.putBoolean(idMkVs, false);
    executeAction(idslct, desc2135, DialogModes.NO);
    var idDlt = charIDToTypeID("Dlt ");
    var desc2125 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref912 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref912.putEnumerated(idChnl, idOrdn, idTrgt);
    desc2125.putReference(idnull, ref912);
    executeAction(idDlt, desc2125, DialogModes.NO);
}

//Fill colo layer.
function fillColor(red, green, blue) {
    var idslct = charIDToTypeID("slct");
    var desc2135 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref918 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref918.putEnumerated(idChnl, idChnl, idMsk);
    desc2135.putReference(idnull, ref918);
    var idMkVs = charIDToTypeID("MkVs");
    desc2135.putBoolean(idMkVs, false);
    executeAction(idslct, desc2135, DialogModes.NO);

    var myColor = new SolidColor();
    myColor.rgb.red = red; // 0 - 255
    myColor.rgb.green = green;
    myColor.rgb.blue = blue;
    activeDocument.selection.fill(myColor);

}


//move 
function move() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("previous"));
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("move"), descriptor, DialogModes.NO);
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



function selectAdd(lyr) {
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
    descriptor.putEnumerated(s2t("selectionModifier"), s2t("selectionModifierType"), s2t("addToSelection"));
    descriptor.putBoolean(s2t("makeVisible"), false);
    descriptor.putList(s2t("layerID"), list);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

function selectUnAdd(lyr) {
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
    descriptor.putEnumerated(s2t("selectionModifier"), s2t("selectionModifierType"), s2t("removeFromSelection"));
    descriptor.putBoolean(s2t("makeVisible"), false);

    descriptor.putList(s2t("layerID"), list);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

function addGroup() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putClass(s2t("layerSection"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(s2t("from"), reference2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}