
var doc = activeDocument;
///document current.

//Academy Selection

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
    makeSelectionPath("Acad_Shape_Sil")
    makeLayer()
    action("Invs")
    fillColor(211, 83, 250)
    deselectSelection()
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
    fillColor(3, 253, 253)
    doc.selection.deselect()
    doc.activeLayer.opacity = "50"
    doc.activeLayer.invert()
    try { InteractiveTransform(); } catch (error) { }
    selectLayer("Product");
    try { InteractiveTransform(); } catch (error) { }
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
    deselectPath()
    dulicateLayerToDoc(curentNameDocument)
    activeDocument = documents[docCurent];
    doc.activeLayer.name = "Acad Shape Silhouette Style Ver1"
    doc.activeLayer.opacity = "50"
    doc.activeLayer.invert()
    try { InteractiveTransform(); } catch (error) { }
    selectLayer("Product");
    try { InteractiveTransform(); } catch (error) { }
    selectLayer("Acad Shape Silhouette Style Ver1")
    doc.activeLayer.opacity = "100"
    doc.activeLayer.visible = false
    selectLayer("Product")
    liquify();
}

// Trnf


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

        // check selection
        // var checkNameChannel = checkSelectionName("Academy_Selection")
        // alert(checkNameChannel)
        // if (checkNameChannel == true) {
        //     result = true
        //     break
        // } else {
        //     result = false
        // }

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

function action(action) {
    var idCpTL = charIDToTypeID(action)
    executeAction(idCpTL, undefined, DialogModes.NO)
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
    
    var idExch = charIDToTypeID( "Exch" );
    var desc13811 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref637 = new ActionReference();
    var idClr = charIDToTypeID( "Clr " );
    var idClrs = charIDToTypeID( "Clrs" );
    ref637.putProperty( idClr, idClrs );
    desc13811.putReference( idnull, ref637 );
    executeAction( idExch, desc13811, DialogModes.NO );

}