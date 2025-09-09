
app.preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS;
// (function () {
//     var flagLogin = new File("//172.16.2.2/Academy/Hiep/log.txt")
//     if (flagLogin.exists) {
//         main()
//     }
// })()

var flagLogin = new File("//172.16.2.2/Academy/Hiep/logNew.txt")
var date = new Date()
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
if (year <= 2024 && month < 9 && flagLogin.exists) {
    main()
}

function main() {
    //save document hien tai.
    var curentNameDocument = activeDocument.name;
    //
    var nameHistoryCurent = checkHistoryColor();
    var lengthColorCurent = checkLengColor();
    try {
        selectHistory("NEC:SN At Open");
    } catch (error) {
        selectHistory(curentNameDocument);
    }
    var lengColorDocument = checkLengColor();

    selectHistory(nameHistoryCurent);

    if (lengthColorCurent > lengColorDocument) {
        // alert("Copy layer color len các ver!")
        var i = 1;
        for (i; i < activeDocument.layers.length - 2; i++) {
            var nameGroup = String(activeDocument.layers[i].name);
            selectFoder(nameGroup, null, null);
            if (!activeDocument.activeLayer.allLocked) {
                var foderChange = activeDocument.activeLayer.layers[0].name;
                copyFoder("Variant 1", "Color 1", null);
                selectFoder(nameGroup, foderChange, null);
                if (!activeDocument.activeLayer.allLocked) {
                    deleteFoder();
                    pasteFoder();
                    activeDocument.activeLayer.name = foderChange;
                }
            }
        }//End if copy Color
    } else {
        if (checkSelectionName("Alpha 1") == false && hasSelection()) {
            //app.activeDocument.channels.removeAll();
            saveSelection("Alpha 1");
            activeDocument.selection.deselect();
        } else if (checkSelectionName("Alpha 1") == true && hasSelection()) {
            saveSelection(null);
            activeDocument.selection.deselect();
        } else {
            if (checkSelectionName("Alpha 1") == true || checkSelectionName("Alpha 2") == true || checkSelectionName("Alpha 3") == true || checkSelectionName("Alpha 4") == true || checkSelectionName("Alpha 5") == true) {
                body();
            } else {
                alert("Thiếu vùng chọn!")
            }
        }
    }
}

function body() {
    logAction("Log_ColorMatChing")
    //Save giá trị channel và tên channel vào mãng
    arrNameChannels = []
    lengthChannels = activeDocument.channels.length
    for (j = 3; j < lengthChannels; j++) {
        arrNameChannels.push(activeDocument.channels[j].name.slice(-1))
    }
    //Search document copy
    var lengthDoc = documents.length
    var indexDoc = searchStructCopyColor(lengthDoc);
    // alert(indexDoc)
    activeDocument = documents[indexDoc[0]];

    nameLayerAfter = activeDocument.activeLayer.artLayers[indexDoc[1] - 1].name
    nameLayerBefore = activeDocument.activeLayer.artLayers[0].name

    //Tìm tên layer cần copy và lưu tên vào mảng.
    selectGroupLayer(nameLayerBefore, nameLayerAfter)
    addGroup()
    arrSearchListLayer = []
    layerInGroup = activeDocument.activeLayer.artLayers

    for (index = arrNameChannels.length - 1; index >= 0; index--) {
        for (i = 0; i < indexDoc[1]; i++) {
            nameLayerCurent = layerInGroup[i].name
            if (nameLayerCurent.substr(nameLayerCurent.length - 1, nameLayerCurent.length) == arrNameChannels[index]) {
                arrSearchListLayer.push(nameLayerCurent)
            }
        }
    }

    selectGroupLayer(arrSearchListLayer[0], arrSearchListLayer[arrSearchListLayer.length - 1])
    deselectPath()
    try { activeDocument.selection.deselect() } catch (error) { }
    activeDocument.selection.copy()
    activeDocument.activeLayer = activeDocument.activeLayer.parent
    unGroup()
    //quay lai document Curent
    for (var index = 0; index < lengthDoc; index++) {
        if (documents[index].name == curentNameDocument) {
            var docCurent = index;
        }
    }
    activeDocument = documents[docCurent];
    //paste Group color 1
    pasteFolder();
    addGroup()
    re_name_Layer("tempColor");
    filterLayerColor();

    //copy Resources
    try { activeDocument = documents[docCurent - 1]; } catch (error) { }
    if (setSelectedLayer("Resources") == true && activeDocument.activeLayer.layers.length != 0) {
        deselectPath();
        activeDocument.selection.deselect();
        activeDocument.selection.copy();

    } else {
        activeDocument = documents[indexDoc[0]];
        setSelectedLayer("Resources");
        deselectPath();
        activeDocument.selection.deselect();
        activeDocument.selection.copy();
    }


    activeDocument = documents[docCurent];
    setSelectedLayer("Resources");
    activeDocument.activeLayer.visible = true;
    pasteFolder();
    move();
    ungroupLayersEvent();
    try {
        activeDocument.activeLayer = activeDocument.activeLayer.parent;
        var lengthResources = activeDocument.activeLayer.layers.length;
        // alert(lengthResources);
        activeDocument.activeLayer = activeDocument.activeLayer.layers[lengthResources - 1];
        // setSelectedLayer("Color 1");
    } catch (error) {

    }
}

//filter layer color copy
function filterLayerColor() {
    //Gry "Vlt "Bl  "Grn "Ylw "Orng" 
    var arrColor = ["Vlt ", "Bl  ", "Grn ", "Ylw ", "Orng"]

    // var layerDelete = new Array();
    var lengthTemColor = activeDocument.activeLayer.layers.length;
    var nameChannels = nameSelectChannels();
    for (var index = 0; index < lengthTemColor; index++) {
        var nameLayerCurent = String(activeDocument.activeLayer.layers[index].name);
        activeDocument.activeLayer = activeDocument.activeLayer.layers[index];
        // setSelectedLayer(nameLayerCurent);
        var endCurentLayer = String(nameLayerCurent.slice(nameLayerCurent.length - 7));
        // var lop = 0;
        // alert(nameChannels);

        //check layer set color
        var randumArr = nameLayerCurent.substr(-1, 1) - 1;
        try {
            var colorLayerRandum = arrColor[randumArr];
            setColorLayer(colorLayerRandum);
        } catch (error) { }

        //so sach nameChanel & nam curentLayer
        var stringNameChannels = nameChannels.toString();
        var searchExistName = stringNameChannels.indexOf(endCurentLayer);
        // alert(searchExistName);
        if (searchExistName == (-1)) {
            activeDocument.activeLayer.remove();
            // deleteLayer(nameLayerCurent);
            index--;
            lengthTemColor = lengthTemColor - 1;
        } else {
            fillColor(0, 0, 0);
            activeDocument.selection.load(activeDocument.channels.getByName(endCurentLayer));
            fillColor(255, 255, 255);
            activeDocument.selection.deselect();
        }
        setSelectedLayer("tempColor");
        // activeDocument.activeLayer = activeDocument.activeLayer.parent;
    }
    move();
    ungroupLayersEvent();
    // return layerDelete;
}

//tim color/Doc can copy.
function searchStructCopyColor(lengthDoc) {
    var lengColor = 0;
    var indexDoc;
    for (var index = 0; index < lengthDoc; index++) {
        activeDocument = documents[index];
        try {
            var lengColorDoc = lengthGroupColor("Color 1")
            if (lengColorDoc > lengColor) {
                lengColor = lengColorDoc;
                indexDoc = index;
            }
        } catch (error) { }
    }
    return [indexDoc, lengColor];
}

//function length group Color
function lengthGroupColor(group) {
    var curentNameDocumentColor = activeDocument.name;
    setSelectedLayer(group);

    lengthColorEnd = activeDocument.activeLayer.layers.length
    nameHistoryRandum = Math.random(1, 10)
    makeHistory(nameHistoryRandum)
    try {
        selectHistory("NEC:SN At Open");
    } catch (error) {
        selectHistory(curentNameDocumentColor)
    }
    setSelectedLayer(group)
    lengthColorStart = activeDocument.activeLayer.layers.length

    //Trả về tổng giá trị layer color sau khi chỉnh màu.
    var lengthColor = lengthColorEnd - lengthColorStart
    selectHistory(nameHistoryRandum)
    alert(lengthColor)
    return lengthColor
}

function checkLengColor() {
    setSelectedLayer("Color 1")
    var lengGroup = activeDocument.activeLayer.layers.length;
    return lengGroup;
}
//function check History colorCopy
function checkHistoryColor() {
    var randumHistory = Math.random()
    makeHistory(randumHistory)
    // selectHistory(activeDocument.name);
    return randumHistory;
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


//fill color mask
function fillColorMask(Group) {
    setSelectedLayer(Group);
    var lengthTemColorTemp = activeDocument.activeLayer.layers.length;
    for (var index = 0; index < lengthTemColorTemp; index++) {
        var nameLayerCurent = String(activeDocument.activeLayer.layers[index].name);
        var endCurentLayer = String(nameLayerCurent.slice(nameLayerCurent.length - 1));
        setSelectedLayer(nameLayerCurent);
        // activeDocument.selection.selectAll();
        fillColor(0, 0, 0);
        activeDocument.selection.load(activeDocument.channels.getByName("Alpha " + endCurentLayer));
        fillColor(255, 255, 255);
        activeDocument.activeLayer = activeDocument.activeLayer.parent;
        activeDocument.selection.deselect();
    }
    //move vao Group Color/Ungroup
    move();
    ungroupLayersEvent();
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


//Kiem tra ton tai selection với tên .....
function checkSelectionName(nameChannel) {
    var result = false;
    try {
        var channelRef = activeDocument.channels[nameChannel];
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

function deleteSnapShot(name) {
    var desc381 = new ActionDescriptor();
    var ref21 = new ActionReference();
    ref21.putName(charIDToTypeID("SnpS"), name);
    desc381.putReference(charIDToTypeID("null"), ref21);
    executeAction(charIDToTypeID("Dlt "), desc381, DialogModes.NO);
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

//function selecGroup layer
function selectGroupLayer(before, after) {
    setSelectedLayer(before);
    var idslct = charIDToTypeID("slct");
    var desc360 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref187 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref187.putName(idLyr, after);
    desc360.putReference(idnull, ref187);
    var idselectionModifier = stringIDToTypeID("selectionModifier");
    var idselectionModifierType = stringIDToTypeID("selectionModifierType");
    var idaddToSelectionContinuous = stringIDToTypeID("addToSelectionContinuous");
    desc360.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelectionContinuous);
    var idMkVs = charIDToTypeID("MkVs");
    desc360.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    var list94 = new ActionList();
    desc360.putList(idLyrI, list94);
    executeAction(idslct, desc360, DialogModes.NO);
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

move()
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



function selectFoder(group1, group2, group3) {
    var result = false;
    if (group1 != null && group2 != null && group3 != null) {
        try {
            activeDocument.activeLayer = activeDocument.layers[group1];
            activeDocument.activeLayer = activeDocument.activeLayer.layers[group2];
            activeDocument.activeLayer = activeDocument.activeLayer.layers[group3];
            if (group3 == String(app.activeDocument.activeLayer.name)) {
                result = true;
            }
        } catch (e) { }
    } else if (group1 != null && group2 != null && group3 == null) {
        try {
            activeDocument.activeLayer = activeDocument.layers[group1];
            activeDocument.activeLayer = activeDocument.activeLayer.layers[group2];
            if (group2 == String(app.activeDocument.activeLayer.name)) {
                result = true;
            }

        } catch (e) { }
    } else if (group1 != null && group2 == null && group3 == null) {
        try {
            activeDocument.activeLayer = activeDocument.layers[group1];
            if (group1 == String(app.activeDocument.activeLayer.name)) {
                result = true;
            }
        } catch (e) { }
    }
    return result;
}

function copyFoder(group1, group2, group3) {
    if (group1 != null && group2 != null && group3 != null) {
        try {
            activeDocument.activeLayer = activeDocument.layers[group1];
            activeDocument.activeLayer = activeDocument.activeLayer.layers[group2];
            activeDocument.activeLayer = activeDocument.activeLayer.layers[group3];
            activeDocument.selection.copy();
        } catch (e) { }
    } else if (group1 != null && group2 != null && group3 == null) {

        try {
            activeDocument.activeLayer = activeDocument.layers[group1];
            activeDocument.activeLayer = activeDocument.activeLayer.layers[group2];
            activeDocument.selection.copy();
        } catch (e) { }
    } else if (group1 != null && group2 == null && group3 == null) {
        try {
            activeDocument.activeLayer = activeDocument.layers[group1];
            activeDocument.selection.copy();
        } catch (e) { }
    }
}

function deleteFoder() {
    try {
        activeDocument.activeLayer.remove();
    } catch (e) { }
}

function pasteFoder() {
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

function unGroup() {
    var idungroupLayersEvent = stringIDToTypeID("ungroupLayersEvent");
    var desc855 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref532 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref532.putEnumerated(idLyr, idOrdn, idTrgt);
    desc855.putReference(idnull, ref532);
    executeAction(idungroupLayersEvent, desc855, DialogModes.NO);

}

function logAction(params) {
    var logNameAct = new File("//172.16.2.2/Public Data/Academy/LogAction/" + params + ".log");
    if (logNameAct.exists) {
        logNameAct.open("r")
        logText = logNameAct.read()
        const y = Number(logText)
        var addText = y + 1
        logNameAct.close()
        logNameAct.remove()
        logNameAct.open("w")
        logNameAct.write(addText)
        logNameAct.close()
    } else {
        logNameAct.open("w")
        logNameAct.write(1)
        logNameAct.close()
    }
}