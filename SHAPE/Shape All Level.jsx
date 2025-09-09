// const fs = require('fs')
// const path = require('path')
// const dirPath = path.join(__dirname)
// alert(dirPath)

var doc = activeDocument;
// var thePathActions = "//appdn/Academy/Automation by Academy/Actions";
// var thePathActions = "E:/Automation by Academy/Actions";
//HN
// var thePathActions = "//172.16.0.13/Academy/Automation_by_Academy/Actions/Retouch_Shape_3D";
//DN
var thePathActions = "//172.16.2.2/Academy/Automation_by_Academy/Actions/Retouch_Shape_3D";
main();
function main() {
    // logAction("Log_All_Shape_Lever")
    if (hasSelection()) {
        loadAction("SHAPE Flip Product", "Retouch Shape 3D Academy.atn");
    } else if (verifyPathNameExists("Work Path")) {
        loadAction("SHAPE Silhouette Style", "Retouch Shape 3D Academy.atn");
    } else {
        copySill()
    }
}
///
function copySill() {
    var curentNameDocument = doc.name;
    selectLayer("Product")
    //Search document copy
    var lengthDoc = documents.length;
    var copySill = searchStructCopySill(lengthDoc);

    //quay lai document Curent
    for (var index = 0; index < lengthDoc; index++) {
        if (documents[index].name == curentNameDocument) {
            var docCurent = index;
        } else {
            var otherIndex = index
            var nameOtherIndex = documents[index].name
        }
    }
    if (copySill == true) {
        deselectPath();
        // doc.pathItems.getByName('Acad_Shape_Sil').makeSelection()// ở đây dòng này ko hiểu
        makeSelectionPath("Acad_Shape_Sil")
        selectLayer("Product")
        makeLayer()
        // doc.artLayers.add().name = "TempSill" //Ở đây dòng này ko hiểu
        action("Invs")
        // doc.selection.invert()//
        fillColor(44, 172, 5)
        deselectSelection()
        // doc.selection.deselect()//Ở đây dòng này ko hiểu vì chuyển sang documetn khác.
        // alert(2)
        dulicateLayerToDoc(curentNameDocument)
        deleteLayer()
        activeDocument = documents[docCurent];
        // selectLayer("Acad Shape Silhouette Style Ver1")
        // pasteFolder()
        doc.activeLayer.name = "Acad Shape Silhouette Style Ver1"
        // doc.activeLayer.transparentPixelsLocked = true
        selectionLayer()
        doc.selection.contract(6)
        doc.selection.invert()
        Intr()
        fillColor(252, 2, 2)
        doc.selection.deselect()
        doc.activeLayer.opacity = "50"
        // doc.activeLayer.invert()
        try { InteractiveTransform(); } catch (error) { }
        selectLayer("Product");
        try { warp(); } catch (error) { }
        selectLayer("Acad Shape Silhouette Style Ver1")
        doc.activeLayer.opacity = "100"
        selectLayer("Product")
        liquify();
        selectLayer("Acad Shape Silhouette Style Ver1")
        selectionLayer()
        doc.selection.feather(.5)
        doc.activeLayer.visible = false
        selectLayer("Product")
        resetBrush()
    } else {
        activeDocument = documents[otherIndex]
        selectLayer("Product")
        actionMergeAll()
        deselectPath()
        dulicateLayerToDoc(curentNameDocument)
        activeDocument = documents[docCurent];
        doc.activeLayer.name = "Acad Shape Silhouette Style Ver1"
        doc.activeLayer.opacity = "50"
        doc.activeLayer.invert()
        try { InteractiveTransform(); } catch (error) { }
        selectLayer("Product");
        try { warp(); } catch (error) { }
        selectLayer("Acad Shape Silhouette Style Ver1")
        doc.activeLayer.opacity = "100"
        doc.activeLayer.visible = false
        selectLayer("Product")
        liquify();
    }
    // Trnf
}

function flipProduct() {
    doc.activeLayer = doc.layerSets['Item 1'].artLayers['Product']
    doc.activeLayer.duplicate().name = "Acad Shape Silhouette Style Ver1"
    addMask()
    selectRGB()
    doc.activeLayer.invert()
    doc.activeLayer.opacity = 50
    transFormLayers()
}

//tim color/Doc can copy.
function searchStructCopySill(lengthDoc) {
    var result = false
    for (var index = 0; index < lengthDoc; index++) {
        activeDocument = documents[index]
        try {
            selectHistory("abc")
            doc.activeLayer = doc.layerSets["Academy_Selection"]
        } catch (error) {
            // alert("dàdasdf")
        }

        //check path
        var checkNamePath = verifyPathNameExists("Acad_Shape_Sil")
        if (checkNamePath == true) {
            result = true
            break
        } else {
            result = false
        }
    }
    return result;
}

//function length group Color
function lengthGroupColor(group) {
    setSelectedLayer(group)
    var lengthColor = doc.activeLayer.layers.length
    return lengthColor
}

function action(action) {
    var idCpTL = charIDToTypeID(action)
    executeAction(idCpTL, undefined, DialogModes.NO)
}

function actionMergeAll() {
    var idMrgV = charIDToTypeID("MrgV");
    var desc23352 = new ActionDescriptor();
    var idDplc = charIDToTypeID("Dplc");
    desc23352.putBoolean(idDplc, true);
    executeAction(idMrgV, desc23352, DialogModes.NO);
}

function liquify(params) {
    try {
        var idLqFy = charIDToTypeID("LqFy");
        executeAction(idLqFy, undefined, DialogModes.ALL);
    } catch (error) { }
}

//free transform
function InteractiveTransform() {
    // Menu Edit>Free transform
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), cTID('FrTr'));
        desc1.putReference(cTID('null'), ref1);
        executeAction(cTID('slct'), desc1, DialogModes.NO);
    } catch (error) {

    }
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

function InteractiveTransform() {
    app.runMenuItem(charIDToTypeID("FrTr"));
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

//select layer
function selectLayer(nameLayer) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putName(s2t("layer"), nameLayer);
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

//kiem tra ton tai selection với tên .....
function checkSelectionName(nameChannel) {
    var result = false;
    try {
        var channelRef = doc.channels.getByName(nameChannel);
        if (channelRef) {
            result = true;
        }
    } catch (error) { }
    return result;
}

function fillColor(red, green, blue) {
    var myColor = new SolidColor()
    myColor.rgb.red = red // 0 - 255
    myColor.rgb.green = green
    myColor.rgb.blue = blue
    activeDocument.selection.fill(myColor)
}

function makeLayer() {
    var idMk = charIDToTypeID("Mk  ");
    var desc4837 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref677 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref677.putClass(idLyr);
    desc4837.putReference(idnull, ref677);
    var idLyrI = charIDToTypeID("LyrI");
    desc4837.putInteger(idLyrI, 95);
    executeAction(idMk, desc4837, DialogModes.NO);

}

function makeSelectionPath(namePath) {

    var idsetd = charIDToTypeID("setd");
    var desc6221 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref766 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref766.putProperty(idChnl, idfsel);
    desc6221.putReference(idnull, ref766);
    var idT = charIDToTypeID("T   ");
    var ref767 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    ref767.putName(idPath, namePath);
    desc6221.putReference(idT, ref767);
    var idVrsn = charIDToTypeID("Vrsn");
    desc6221.putInteger(idVrsn, 1);
    var idvectorMaskParams = stringIDToTypeID("vectorMaskParams");
    desc6221.putBoolean(idvectorMaskParams, true);
    executeAction(idsetd, desc6221, DialogModes.NO);



}

function deselectSelection() {
    var idsetd = charIDToTypeID("setd");
    var desc6237 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref770 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref770.putProperty(idChnl, idfsel);
    desc6237.putReference(idnull, ref770);
    var idT = charIDToTypeID("T   ");
    var idOrdn = charIDToTypeID("Ordn");
    var idNone = charIDToTypeID("None");
    desc6237.putEnumerated(idT, idOrdn, idNone);
    executeAction(idsetd, desc6237, DialogModes.NO);
}

function warp() {
    var idslct = charIDToTypeID("slct");
    var desc20 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref8 = new ActionReference();
    var idMn = charIDToTypeID("Mn  ");
    var idMnIt = charIDToTypeID("MnIt");
    var idwarp = stringIDToTypeID("warp");
    ref8.putEnumerated(idMn, idMnIt, idwarp);
    desc20.putReference(idnull, ref8);
    executeAction(idslct, desc20, DialogModes.NO);
}

function selectAll() {
    var idsetd = charIDToTypeID("setd");
    var desc6249 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref774 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref774.putProperty(idChnl, idfsel);
    desc6249.putReference(idnull, ref774);
    var idT = charIDToTypeID("T   ");
    var idOrdn = charIDToTypeID("Ordn");
    var idAl = charIDToTypeID("Al  ");
    desc6249.putEnumerated(idT, idOrdn, idAl);
    executeAction(idsetd, desc6249, DialogModes.NO);
}

function dulicateLayerToDoc(name) {
    var idDplc = charIDToTypeID("Dplc");
    var desc6260 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref776 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref776.putEnumerated(idLyr, idOrdn, idTrgt);
    desc6260.putReference(idnull, ref776);
    var idT = charIDToTypeID("T   ");
    var ref777 = new ActionReference();
    var idDcmn = charIDToTypeID("Dcmn");
    ref777.putName(idDcmn, name);
    desc6260.putReference(idT, ref777);
    var idVrsn = charIDToTypeID("Vrsn");
    desc6260.putInteger(idVrsn, 5);
    var idIdnt = charIDToTypeID("Idnt");
    var list366 = new ActionList();
    list366.putInteger(33);
    desc6260.putList(idIdnt, list366);
    executeAction(idDplc, desc6260, DialogModes.NO);
}

function deleteLayer() {
    var idDlt = charIDToTypeID("Dlt ");
    var desc6340 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref820 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref820.putEnumerated(idLyr, idOrdn, idTrgt);
    desc6340.putReference(idnull, ref820);
    var idLyrI = charIDToTypeID("LyrI");
    var list389 = new ActionList();
    list389.putInteger(108);
    desc6340.putList(idLyrI, list389);
    executeAction(idDlt, desc6340, DialogModes.NO);

}
function selectionLayer() {
    var idsetd = charIDToTypeID("setd");
    var desc13442 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref498 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref498.putProperty(idChnl, idfsel);
    desc13442.putReference(idnull, ref498);
    var idT = charIDToTypeID("T   ");
    var ref499 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idTrsp = charIDToTypeID("Trsp");
    ref499.putEnumerated(idChnl, idChnl, idTrsp);
    desc13442.putReference(idT, ref499);
    executeAction(idsetd, desc13442, DialogModes.NO);

}

function Intr() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("transparencyEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(s2t("with"), reference2);
    executeAction(c2t("Intr"), descriptor, DialogModes.NO);
}

function resetBrush() {
    var idslct = charIDToTypeID("slct");
    var desc441 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref245 = new ActionReference();
    var idPbTl = charIDToTypeID("PbTl");
    ref245.putClass(idPbTl);
    desc441.putReference(idnull, ref245);
    executeAction(idslct, desc441, DialogModes.NO);
    // =======================================================
    var idRset = charIDToTypeID("Rset");
    var desc442 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref246 = new ActionReference();
    var idClr = charIDToTypeID("Clr ");
    var idClrs = charIDToTypeID("Clrs");
    ref246.putProperty(idClr, idClrs);
    desc442.putReference(idnull, ref246);
    executeAction(idRset, desc442, DialogModes.NO);

    var idExch = charIDToTypeID("Exch");
    var desc13811 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref637 = new ActionReference();
    var idClr = charIDToTypeID("Clr ");
    var idClrs = charIDToTypeID("Clrs");
    ref637.putProperty(idClr, idClrs);
    desc13811.putReference(idnull, ref637);
    executeAction(idExch, desc13811, DialogModes.NO);

}
function newGuideLayout(replace, colCount, colWidth, Cntr, rowCount) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();

    descriptor.putBoolean(s2t("replace"), replace);
    descriptor.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    descriptor2.putInteger(s2t("colCount"), colCount);
    descriptor2.putUnitDouble(s2t("colWidth"), s2t("percentUnit"), colWidth);
    descriptor2.putBoolean(c2t("Cntr"), Cntr);
    descriptor2.putInteger(s2t("rowCount"), rowCount);
    descriptor.putObject(s2t("guideLayout"), s2t("guideLayout"), descriptor2);
    descriptor.putEnumerated(s2t("guideTarget"), s2t("guideTarget"), s2t("guideTargetCanvas"));
    executeAction(s2t("newGuideLayout"), descriptor, DialogModes.NO);
}

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

//kiem tra ton tai  ten path
function verifyPathNameExists(pathname) {
    var result = false;
    for (var a = 0; a < activeDocument.pathItems.length; a++) {
        if (String(activeDocument.pathItems[a].name) == pathname) {
            result = true;
            break;
        }
    }
    return result;
}

function checkAlllockLayer() {
    var result = false;
    try {
        if (activeDocument.activeLayer.allLocked ||
            activeDocument.activeLayer.pixelsLocked ||
            activeDocument.activeLayer.positionLocked ||
            activeDocument.activeLayer.transparentPixelsLocked) {
            activeDocument.activeLayer.allLocked = false;
            activeDocument.activeLayer.pixelsLocked = false;
            activeDocument.activeLayer.positionLocked = false;
            activeDocument.activeLayer.transparentPixelsLocked = false;
            result = true;
        }
    } catch (error) { }
    return result;
}

function loadAction(actionName, action) {
    //--------------------------------------------------------------------------------------------------------
    try {
        //code tim thu muc, khong can quan tam.
        if (typeof jamActions !== 'object') { var jamActions = {}; (function () { jamActions.isActionsFile = function (file) { return (file.type === '8BAC') || file.name.match(/\.atn$/i); }; jamActions.isActionsPalette = function (file) { return ((file.type === '8BPF') && file.name.match(/^Actions Palette$/i)) || file.name.match(/^Actions Palette.psp$/i); }; function readBEInt(file, byteCount) { var bytes = file.read(byteCount); var intValue = 0; for (var index = 0; index < byteCount; index++) { intValue = (intValue << 8) + bytes.charCodeAt(index); } return intValue; } function readBytes(file, byteCount) { return file.read(byteCount); } function readByteString(file) { var stringLength = readBEInt(file, 4); return readBytes(file, stringLength); } function readUnicodeString(file) { var unicodeString = ""; var unicodeLength = readBEInt(file, 4); for (var index = 0; index < unicodeLength; index++) { var unicodeChar = readBEInt(file, 2); if (unicodeChar !== 0) { unicodeString += String.fromCharCode(unicodeChar); } } return unicodeString; } function readEventId(file) { var eventId = 0; var eventType = readBytes(file, 4); switch (eventType) { case 'TEXT': eventId = app.stringIDToTypeID(readByteString(file)); break; case 'long': eventId = app.charIDToTypeID(readBytes(file, 4)); break; default: throw new Error("[jamActions readEventId] Unrecognized event type: '" + eventType + "'"); break; } return eventId; } function skipDouble(file) { file.seek(8, 1); } function skipDoubles(file, doubleCount) { file.seek(doubleCount * 8, 1); } function skipInt8(file) { file.seek(1, 1); } function skipInt16(file) { file.seek(2, 1); } function skipInt32(file) { file.seek(4, 1); } function skipInt64(file) { file.seek(8, 1); } function skipBytes(file, byteCount) { file.seek(byteCount, 1); } function skipByteString(file) { var stringLength = readBEInt(file, 4); skipBytes(file, stringLength); } function skipUnicodeString(file) { var unicodeLength = readBEInt(file, 4); skipBytes(file, unicodeLength * 2); } function skipId(file) { var idLength = readBEInt(file, 4); if (idLength) { skipBytes(file, idLength); } else { skipBytes(file, 4); } } function skipClass(file) { skipUnicodeString(file); skipId(file); } function skipObject(file) { skipClass(file); var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { skipId(file); skipItem(file); } } function skipList(file) { var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { skipItem(file); } } function skipItem(file) { var typeId = readBytes(file, 4); switch (typeId) { case 'obj ': skipReference(file); break; case 'Objc': case 'GlbO': skipObject(file); break; case 'type': case 'GlbC': skipClass(file); break; case 'VlLs': skipList(file); break; case 'doub': skipDouble(file); break; case 'UntF': skipBytes(file, 4); skipDouble(file); break; case 'TEXT': skipUnicodeString(file); break; case 'enum': skipId(file); skipId(file); break; case 'long': skipInt32(file); break; case 'comp': skipInt64(file); break; case 'bool': skipInt8(file); break; case 'alis': skipByteString(file); break; case 'Pth ': skipByteString(file); break; case 'tdta': skipByteString(file); break; case 'ObAr': var objCount = readBEInt(file, 4); skipClass(file); var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { skipId(file); skipInt32(file); skipInt32(file); var doublesCount = readBEInt(file, 4); skipDoubles(file, doublesCount); } break; default: throw new Error("[jamActions skipItem] Unrecognized item type: '" + typeId + "'"); break; } } function skipReference(file) { var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { var formId = readBytes(file, 4); skipClass(file); switch (formId) { case 'Clss': break; case 'prop': skipId(file); break; case 'Enmr': skipId(file); skipId(file); break; case 'rele': skipInt32(file); break; case 'Idnt': skipInt32(file); break; case 'indx': skipInt32(file); break; case 'name': skipUnicodeString(file); break; default: throw new Error("[jamActions skipReference] Unrecognized item form: '" + formId + "'"); break; } } } jamActions.readActionDescriptor = function (file, insertVersionPrefix) { var versionPrefix = "\x00\x00\x00\x10"; var start = file.tell(); if (!insertVersionPrefix) { if (file.read(4) === versionPrefix) { versionPrefix = ""; } else { throw new Error('[jamActions.readActionDescriptor] Unrecognized version prefix'); } } skipObject(file); var end = file.tell(); file.seek(start, 0); var stream = versionPrefix + file.read(end - start); var actionDescriptor = new ActionDescriptor(); actionDescriptor.fromStream(stream); return actionDescriptor; }; jamActions.dataFromActionsFile = function (actionsFile, isPalette) { var that = this; function parseActionSet(file) { var actionSet = {}; actionSet.name = localize(readUnicodeString(file)); actionSet.expanded = (readBEInt(file, 1) !== 0); var actionCount = readBEInt(file, 4); actionSet.actions = []; for (var actionIndex = 0; actionIndex < actionCount; actionIndex++) { var action = {}; action.functionKey = readBEInt(file, 2); action.shiftKey = (readBEInt(file, 1) !== 0); action.commandKey = (readBEInt(file, 1) !== 0); action.colorIndex = readBEInt(file, 2); action.name = localize(readUnicodeString(file)); action.expanded = (readBEInt(file, 1) !== 0); var commandCount = readBEInt(file, 4); action.commands = []; for (var commandIndex = 0; commandIndex < commandCount; commandIndex++) { var command = {}; command.expanded = (readBEInt(file, 1) !== 0); command.enabled = (readBEInt(file, 1) !== 0); command.withDialog = (readBEInt(file, 1) !== 0); command.dialogOptions = readBEInt(file, 1); command.eventId = readEventId(file); command.dictionaryName = readByteString(file); if (readBEInt(file, 4) !== 0) { command.actionDescriptor = that.readActionDescriptor(file, true); } action.commands.push(command); } actionSet.actions.push(action); } return actionSet; } var file; if (typeof actionsFile === 'string') { file = new File(actionsFile); } else if (actionsFile instanceof File) { file = actionsFile; } else { throw new Error('[jamActions.dataFromActionsFile] Invalid argument'); } var fileData; if (file.open("r")) { try { file.encoding = 'BINARY'; var fileVersion = readBEInt(file, 4); if (fileVersion === 16) { fileData = {}; fileData.version = fileVersion; if (isPalette) { fileData.actionSets = []; var actionSetCount = readBEInt(file, 4); for (var actionSetIndex = 0; actionSetIndex < actionSetCount; actionSetIndex++) { fileData.actionSets.push(parseActionSet(file)); } } else { fileData.actionSet = parseActionSet(file); } } else { fileData = "Unsupported actions file version: " + fileVersion; } } catch (e) { fileData = e.message; } finally { file.close(); } } else { fileData = "Cannot open file"; } return fileData; }; jamActions.isLocalPlayCommand = function (command, actionSetName) { var localPlayCommand = null; if (command.eventId === app.stringIDToTypeID("play")) { var targetId = app.stringIDToTypeID("target"); if (command.actionDescriptor.hasKey(targetId)) { var localReference = command.actionDescriptor.getReference(targetId); do { try { var desiredClassId = localReference.getDesiredClass(); } catch (e) { break; } switch (desiredClassId) { case app.stringIDToTypeID("command"): var localCommandIndex = localReference.getIndex() - 1; break; case app.stringIDToTypeID("action"): var localActionName = localReference.getName(); break; case app.stringIDToTypeID("actionSet"): var localActionSetName = localReference.getName(); break; } localReference = localReference.getContainer(); } while (localReference); } var continueId = app.stringIDToTypeID("continue"); if (command.actionDescriptor.hasKey(continueId)) { var localContinue = command.actionDescriptor.getBoolean(continueId); } if ((typeof localActionSetName !== 'undefined') && (localActionSetName === actionSetName)) { localPlayCommand = [localActionName, localCommandIndex, localContinue]; } } return localPlayCommand; }; jamActions.determineDialogMode = function (command) { var dialogMode; switch (command.dialogOptions) { case 0: dialogMode = command.withDialog ? DialogModes.ALL : DialogModes.NO; break; case 2: dialogMode = DialogModes.NO; break; case 1: case 3: dialogMode = DialogModes.ALL; break; } return dialogMode; }; var globalCommandHandler = null; jamActions.setCommandHandler = function (commandHandler) { globalCommandHandler = commandHandler; }; jamActions.traverseAction = function (actionSet, actionLocator, fromCommandIndex, continuePlay) { function handleCommands(commands) { var commandMax = (continuePlay) ? commands.length : fromCommandIndex + 1; for (var commandIndex = fromCommandIndex; commandIndex < commandMax; commandIndex++) { if (globalCommandHandler !== null) { globalCommandHandler(commands[commandIndex]); } } } if (typeof fromCommandIndex === 'undefined') { fromCommandIndex = 0; continuePlay = true; } var actions = actionSet.actions; if (typeof actionLocator === 'string') { var actionName = actionLocator; for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) { var action = actions[actionIndex]; if (action.name === actionName) { handleCommands(action.commands); break; } } } else if (typeof actionLocator === 'number') { var actionIndex = actionLocator; if ((actionIndex >= 0) && (actionIndex < actions.length)) { handleCommands(actions[actionIndex].commands); } } }; }()); }
        //quan tam doan nay, giup loa action
        if (documents.length) {
            Folder.current = new Folder(thePathActions);
            var actionsFilePath = action;
            var ActionName = actionName;

            var fileData = jamActions.dataFromActionsFile(actionsFilePath);
            function executeCommand(command, ActionName) {
                if (command.enabled) {
                    var dialogMode = jamActions.determineDialogMode(command);
                    app.executeAction(command.eventId, command.actionDescriptor, dialogMode);
                }
            }
            jamActions.setCommandHandler(executeCommand);
            jamActions.traverseAction(fileData.actionSet, ActionName);
        };
    }
    catch (e) { }
}
