
//By ACademy DN version: 1.0
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument
myPaths = app.activeDocument.pathItems
//width - height layout
const widthLayout = 2250
const heightLayout = 3000
//padding - margin product
const margin = 150

main()
function main() {
    grVarian = doc.layerSets["Variant 1"]
    doc.activeLayer = grVarian
    //Remove path()
    if (checkLengthGroup() <= 13) {
        try {
            selectNoLayers()
            myPaths.removeAll()
        } catch (error) { }
        //Reset Struct
        doc.activeLayer = grVarian
        doc.activeLayer = grVarian.artLayers["Layout"]
        moveLayerUp()
        doc.activeLayer.allLocked = true
        makeSolidColor(230, 230, 230)
        doc.activeLayer.name = "Farbfüllung 1"
        moveEndGroup()
        deleteMask()
        moveDown()
        doc.activeLayer = grVarian
        doc.activeLayer.name = "BUST"
        tranS()
    } else {
        alert("Kich thuoc khong con phu hop!")
    }
}
// tranS()
function tranS() {
    ///transform 
    //width - height product

    // 7 Ret
    if (checkLengthGroup() == 7) {
        n = 7
        width = 1194
        height = 1364
        padding = 177
        transform(width, height, n, padding)
    }

    // 8 Ret
    else if (checkLengthGroup() == 8) {
        n = 8
        width = 1194
        height = 1367
        padding = 172
        transform(width, height, n, padding)
    }

    // 9 Ret
    else if (checkLengthGroup() == 9) {
        n = 9
        width = 1090
        height = 1280
        padding = 160
        transform(width, height, n, padding)
    }

    // 10 Ret
    else if (checkLengthGroup() == 10) {
        n = 10
        width = 1094
        height = 1155
        padding = 160
        transform(width, height, n, padding)
    }

    // 11 Ret
    else if (checkLengthGroup() == 11) {
        n = 11
        width = 942
        height = 1150
        padding = 160
        transform(width, height, n, padding)
    }

    // 12 Ret
    else if (checkLengthGroup() == 12) {
        n = 12
        width = 942
        height = 1000
        padding = 160
        transform(width, height, n, padding)
    }

    // Transform to layouts
    function transform(width, height, n, padding) {
        selectLayer("Layout");
        doc.activeLayer.visible = false
        bounds = doc.activeLayer.bounds;
        crop(bounds[1], bounds[0], bounds[3], bounds[2])
        doc.activeLayer = doc.layerSets["BUST"]
        for (i = 0; i < n; i++) {
            //Kiểm tra số layer Ret
            checkCountLyr = n % 2
            if (checkCountLyr == 0) {
                countGr1 = n / 2
                countGr2 = n / 2
            } else {
                countGr1 = (n + 1) / 2
                countGr2 = (n - 1) / 2
            }
            doc.activeLayer = doc.activeLayer.artLayers[i]
            makeGroup("BUST")
            doc.activeLayer = doc.activeLayer.artLayers[0]
            doc.activeLayer.name = "Ret"
            resizeImage(width, height)
            loadSelectionMask()
            doc.activeLayer.visible = false
            action("CpTL")
            doc.activeLayer.name = "temp"
            doc.activeLayer = doc.activeLayer.parent
            if (i < countGr1) {
                left = margin + padding * (countGr1 - 1)
                top = heightLayout - margin - height
                right = margin + width + padding * (countGr1 - 1)
                bottom = heightLayout - margin

                makeSelection(left, right, top, bottom)
                //translate Group 1
                Algn("ADSCentersH") //"ADSCentersV" Doc
                Algn("ADSCentersV") //"ADSCentersV" Ngang
                doc.activeLayer.translate(-padding * i, -padding * i)
                ungroupLayersEvent()
                doc.activeLayer = doc.activeLayer.parent
                doc.activeLayer = doc.activeLayer.artLayers["temp"]
                doc.activeLayer.remove()
                doc.activeLayer.visible = true
                doc.selection.deselect()
            } else {
                left = widthLayout - (padding * (countGr2 - 1) + width + margin)
                top = margin
                right = widthLayout - margin - padding * (countGr2 - 1)
                bottom = margin + height
                makeSelection(left, right, top, bottom)
                //translate Group 2
                Algn("ADSCentersH") //"ADSCentersV" Doc
                Algn("ADSCentersV") //"ADSCentersV" Ngang
                doc.activeLayer.translate(padding * (n - 1 - i), padding * (n - 1 - i))
                ungroupLayersEvent()
                doc.activeLayer = doc.activeLayer.parent
                doc.activeLayer = doc.activeLayer.artLayers["temp"]
                doc.activeLayer.remove()
                doc.activeLayer.visible = true
                doc.selection.deselect()
            }

            //Make mask and path
            if (i == 0) {
                loadSelectionMask()
                saveChannel("selection")
                selectVectormask()
                savePathOfVectorpath("Path 1")
                deletePathItem()
            } else {
                loadSelectionMask()
                addSelectionChannel('selection')
                doc.selection.deselect()
                selectVectormask()
                savePathOfVectorpath("path_Temp" + i)
                deletePathItem()
            }
            doc.activeLayer = doc.activeLayer.parent
        }//End for
        doc.selection.load(doc.channels.getByName("selection"))
        makeLayerMask()
        try { doc.channels.getByName("selection").remove() } catch (err) { }
        mergePathItems()
    }
    
}//End main
function sizeLayout(padding, n, margin) {

    result = { width: null, height: null }

    result.width = widthLayout - ((padding * (n - 1)) + (margin * 2))
    result.height = heigthLayout - ((padding * (n - 1)) + (margin * 2))
    alert(result.width)
    alert(result.height)

    return result;
}
function checkLengthGroup() {
    length = doc.activeLayer.layers.length;
    return length;
}

function mergePathItems() {
    length = doc.pathItems.length
    namePathStart = doc.pathItems[0].name
    namePathEnt = doc.pathItems[length - 1].name
    for (i = 0; i < doc.pathItems.length - 1; i++) {
        doc.pathItems[i].select()
        makePathToSHape("000000")
        doc.activeLayer.name = doc.pathItems[i].name;
        doc.pathItems[i].remove()
        i--;
    }
    selectGroupLayer(namePathEnt, namePathStart)
    uniteShape()
    combinePathItem()
    savePathOfVectorpath("__V1__Path 1")
    doc.activeLayer.remove()
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

function combinePathItem() {
    idcombine = stringIDToTypeID("combine")
    desc47 = new ActionDescriptor()
    idnull = charIDToTypeID("null")
    ref27 = new ActionReference()
    idPath = charIDToTypeID("Path")
    idOrdn = charIDToTypeID("Ordn")
    idTrgt = charIDToTypeID("Trgt")
    ref27.putEnumerated(idPath, idOrdn, idTrgt)
    desc47.putReference(idnull, ref27)
    executeAction(idcombine, desc47, DialogModes.NO)
}

function makeSelection(left, right, top, bottom) {
    result = false
    try {
        //leftTop, leftBottom, rightBottom rightTop
        shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
        doc.selection.select(shapeRef)
        result = true
    } catch (error) {
    }
    return result
}

//save selection Channel
function saveChannel(name) {
    desc977 = new ActionDescriptor();
    ref38 = new ActionReference();
    ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
    desc977.putReference(charIDToTypeID("null"), ref38);
    desc977.putString(charIDToTypeID("Nm  "), name);
    executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO);
    return activeDocument.channels.getByName(name);
}

function action(action) {
    idCpTL = charIDToTypeID(action);
    executeAction(idCpTL, undefined, DialogModes.NO);
}

//select layer
function selectLayer(nameLayer) {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    reference = new ActionReference();

    reference.putName(s2t("layer"), nameLayer);
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}
function purge() {
    idPrge = charIDToTypeID("Prge");
    desc1578 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    idPrgI = charIDToTypeID("PrgI");
    idAl = charIDToTypeID("Al  ");
    desc1578.putEnumerated(idnull, idPrgI, idAl);
    executeAction(idPrge, desc1578, DialogModes.NO);
}
//crop hinh
function crop(top, left, bottom, right) {
    idCrop = charIDToTypeID("Crop");
    desc11 = new ActionDescriptor();
    idT = charIDToTypeID("T   ");
    desc12 = new ActionDescriptor();
    idTop = charIDToTypeID("Top ");
    idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idTop, idPxl, top);
    idLeft = charIDToTypeID("Left");
    idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idLeft, idPxl, left);
    idBtom = charIDToTypeID("Btom");
    idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idBtom, idPxl, bottom);
    idRght = charIDToTypeID("Rght");
    idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idRght, idPxl, right);
    idRctn = charIDToTypeID("Rctn");
    desc11.putObject(idT, idRctn, desc12);
    idAngl = charIDToTypeID("Angl");
    idAng = charIDToTypeID("#Ang");
    desc11.putUnitDouble(idAngl, idAng, 0.000000);
    idDlt = charIDToTypeID("Dlt ");
    desc11.putBoolean(idDlt, false);
    idcropAspectRatioModeKey = stringIDToTypeID("cropAspectRatioModeKey");
    idcropAspectRatioModeClass = stringIDToTypeID("cropAspectRatioModeClass");
    idtargetSize = stringIDToTypeID("targetSize");
    desc11.putEnumerated(idcropAspectRatioModeKey, idcropAspectRatioModeClass, idtargetSize);
    executeAction(idCrop, desc11, DialogModes.NO);
}


//load selection mask
function loadSelectionMask() {
    idsetd = charIDToTypeID("setd");
    desc32 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    ref14 = new ActionReference();
    idChnl = charIDToTypeID("Chnl");
    idfsel = charIDToTypeID("fsel");
    ref14.putProperty(idChnl, idfsel);
    desc32.putReference(idnull, ref14);
    idT = charIDToTypeID("T   ");
    ref15 = new ActionReference();
    idChnl = charIDToTypeID("Chnl");
    idChnl = charIDToTypeID("Chnl");
    idMsk = charIDToTypeID("Msk ");
    ref15.putEnumerated(idChnl, idChnl, idMsk);
    desc32.putReference(idT, ref15);
    executeAction(idsetd, desc32, DialogModes.NO);
}

// Algn("ADSCentersH"); //"ADSCentersV"

function Algn(algn) {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putEnumerated(s2t("using"), s2t("alignDistributeSelector"), s2t(algn));
    descriptor.putBoolean(s2t("alignToCanvas"), false);
    executeAction(c2t("Algn"), descriptor, DialogModes.NO);
}


function setSwatch(top, left, bottom, right) {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    descriptor2 = new ActionDescriptor();
    reference = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putUnitDouble(s2t("top"), s2t("pixelsUnit"), top);
    descriptor2.putUnitDouble(s2t("left"), s2t("pixelsUnit"), left);
    descriptor2.putUnitDouble(s2t("bottom"), s2t("pixelsUnit"), bottom);
    descriptor2.putUnitDouble(s2t("right"), s2t("pixelsUnit"), right);
    descriptor.putObject(s2t("to"), s2t("rectangle"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}


function set(top, left, bottom, right) {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    descriptor2 = new ActionDescriptor();
    reference = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putUnitDouble(s2t("top"), s2t("percentUnit"), top);
    descriptor2.putUnitDouble(s2t("left"), s2t("percentUnit"), left);
    descriptor2.putUnitDouble(s2t("bottom"), s2t("percentUnit"), bottom);
    descriptor2.putUnitDouble(s2t("right"), s2t("percentUnit"), right);
    descriptor.putObject(s2t("to"), s2t("rectangle"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}
//clipping mask layer
function clippingMask(params) {
    idGrpL = charIDToTypeID("GrpL");
    desc14721 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    ref4637 = new ActionReference();
    idLyr = charIDToTypeID("Lyr ");
    idOrdn = charIDToTypeID("Ordn");
    idTrgt = charIDToTypeID("Trgt");
    ref4637.putEnumerated(idLyr, idOrdn, idTrgt);
    desc14721.putReference(idnull, ref4637);
    executeAction(idGrpL, desc14721, DialogModes.NO);

}

function addSelectionChannel(channel) {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    reference = new ActionReference();
    reference2 = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putName(s2t("channel"), channel);
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("add"), descriptor, DialogModes.NO);
}

// make("Group 3");
function makeGroup(name2) {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    reference = new ActionReference();
    reference2 = new ActionReference();

    reference.putClass(s2t("layerSection"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(s2t("from"), reference2);
    descriptor.putString(s2t("name"), name2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}


//ungroup 
function ungroupLayersEvent() {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("ungroupLayersEvent"), descriptor, DialogModes.NO);
}


function makeSolidColor(red, Grn, blue) {
    c2t = function (s) {
        return app.charIDToTypeID(s)
    }

    s2t = function (s) {
        return app.stringIDToTypeID(s)
    }

    descriptor = new ActionDescriptor()
    descriptor2 = new ActionDescriptor()
    descriptor3 = new ActionDescriptor()
    descriptor4 = new ActionDescriptor()
    reference = new ActionReference()

    reference.putClass(s2t("contentLayer"))
    descriptor.putReference(c2t("null"), reference)
    descriptor4.putDouble(s2t("red"), red)
    descriptor4.putDouble(c2t("Grn "), Grn)
    descriptor4.putDouble(s2t("blue"), blue)
    descriptor3.putObject(s2t("color"), s2t("RGBColor"), descriptor4)
    descriptor2.putObject(s2t("type"), s2t("solidColorLayer"), descriptor3)
    descriptor.putObject(s2t("using"), s2t("contentLayer"), descriptor2)
    executeAction(s2t("make"), descriptor, DialogModes.NO)
}


function moveEndGroup(params) {
    idmove = charIDToTypeID("move");
    desc4947 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    ref1057 = new ActionReference();
    idLyr = charIDToTypeID("Lyr ");
    idOrdn = charIDToTypeID("Ordn");
    idTrgt = charIDToTypeID("Trgt");
    ref1057.putEnumerated(idLyr, idOrdn, idTrgt);
    desc4947.putReference(idnull, ref1057);
    idT = charIDToTypeID("T   ");
    ref1058 = new ActionReference();
    idLyr = charIDToTypeID("Lyr ");
    idOrdn = charIDToTypeID("Ordn");
    idBack = charIDToTypeID("Back");
    ref1058.putEnumerated(idLyr, idOrdn, idBack);
    desc4947.putReference(idT, ref1058);
    executeAction(idmove, desc4947, DialogModes.NO);
}

//up Nxt 
function moveLayerUp(params) {
    idmove = charIDToTypeID("move");
    desc201 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    ref166 = new ActionReference();
    idLyr = charIDToTypeID("Lyr ");
    idOrdn = charIDToTypeID("Ordn");
    idTrgt = charIDToTypeID("Trgt");
    ref166.putEnumerated(idLyr, idOrdn, idTrgt);
    desc201.putReference(idnull, ref166);
    idT = charIDToTypeID("T   ");
    ref167 = new ActionReference();
    idLyr = charIDToTypeID("Lyr ");
    idOrdn = charIDToTypeID("Ordn");
    idNxt = charIDToTypeID("Nxt ");
    ref167.putEnumerated(idLyr, idOrdn, idNxt);
    desc201.putReference(idT, ref167);
    executeAction(idmove, desc201, DialogModes.NO);

}

function deleteMask(params) {
    idDlt = charIDToTypeID("Dlt ");
    desc4950 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    ref1060 = new ActionReference();
    idChnl = charIDToTypeID("Chnl");
    idChnl = charIDToTypeID("Chnl");
    idMsk = charIDToTypeID("Msk ");
    ref1060.putEnumerated(idChnl, idChnl, idMsk);
    desc4950.putReference(idnull, ref1060);
    executeAction(idDlt, desc4950, DialogModes.NO);
}


function moveUp() {
    idslct = charIDToTypeID("slct");
    desc1388 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    ref155 = new ActionReference();
    idLyr = charIDToTypeID("Lyr ");
    idOrdn = charIDToTypeID("Ordn");
    idFrwr = charIDToTypeID("Frwr");
    ref155.putEnumerated(idLyr, idOrdn, idFrwr);
    desc1388.putReference(idnull, ref155);
    idMkVs = charIDToTypeID("MkVs");
    desc1388.putBoolean(idMkVs, false);
    idLyrI = charIDToTypeID("LyrI");
    list18 = new ActionList();
    list18.putInteger(30);
    desc1388.putList(idLyrI, list18);
    executeAction(idslct, desc1388, DialogModes.NO);
}


function moveDown(params) {
    idslct = charIDToTypeID("slct");
    desc704 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    ref513 = new ActionReference();
    idLyr = charIDToTypeID("Lyr ");
    idOrdn = charIDToTypeID("Ordn");
    idBckw = charIDToTypeID("Bckw");
    ref513.putEnumerated(idLyr, idOrdn, idBckw);
    desc704.putReference(idnull, ref513);
    idMkVs = charIDToTypeID("MkVs");
    desc704.putBoolean(idMkVs, false);
    idLyrI = charIDToTypeID("LyrI");
    list155 = new ActionList();
    list155.putInteger(114);
    desc704.putList(idLyrI, list155);
    executeAction(idslct, desc704, DialogModes.NO);
}

function makeLayerMask() {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    reference = new ActionReference();

    descriptor.putClass(s2t("new"), s2t("channel"));
    reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("mask"));
    descriptor.putReference(s2t("at"), reference);
    descriptor.putEnumerated(s2t("using"), c2t("UsrM"), s2t("revealSelection"));
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}


//xu ly path
function selectVectormask() {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    reference = new ActionReference();

    reference.putEnumerated(s2t("path"), s2t("path"), s2t("vectorMask"));
    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}
//make path
function savePathOfVectorpath(name) {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    reference = new ActionReference();
    reference2 = new ActionReference();

    reference.putClass(s2t("path"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("path"), s2t("path"), s2t("vectorMask"));
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(s2t("from"), reference2);
    descriptor.putString(s2t("name"), name);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

function selectNoLayers() {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("selectNoLayers"), descriptor, DialogModes.NO);
}


//select path

function selectPath(namePath) {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    reference = new ActionReference();

    reference.putName(s2t("path"), namePath);
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

function selectPointPath() {


    idslct = charIDToTypeID("slct");
    desc852 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    ref280 = new ActionReference();
    idPath = charIDToTypeID("Path");
    ref280.putName(idPath, "Path 1");
    desc852.putReference(idnull, ref280);
    executeAction(idslct, desc852, DialogModes.NO);

}
function deletePathItem() {
    c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    descriptor = new ActionDescriptor();
    reference = new ActionReference();

    reference.putEnumerated(s2t("path"), s2t("path"), s2t("vectorMask"));
    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("delete"), descriptor, DialogModes.NO);
}



function makePathToSHape(hexValue) {
    color = new SolidColor();
    color.rgb.hexValue = hexValue != undefined ? hexValue : "000000";

    idMk = charIDToTypeID("Mk  ");
    desc51 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    ref35 = new ActionReference();
    idcontentLayer = stringIDToTypeID("contentLayer");
    ref35.putClass(idcontentLayer);
    desc51.putReference(idnull, ref35);
    idUsng = charIDToTypeID("Usng");
    desc52 = new ActionDescriptor();
    idType = charIDToTypeID("Type");
    desc53 = new ActionDescriptor();
    idClr = charIDToTypeID("Clr ");
    desc54 = new ActionDescriptor();
    idRd = charIDToTypeID("Rd  ");
    desc54.putDouble(idRd, color.rgb.red);
    idGrn = charIDToTypeID("Grn ");
    desc54.putDouble(idGrn, color.rgb.green);
    idBl = charIDToTypeID("Bl  ");
    desc54.putDouble(idBl, color.rgb.blue);
    idRGBC = charIDToTypeID("RGBC");
    desc53.putObject(idClr, idRGBC, desc54);
    idsolidColorLayer = stringIDToTypeID("solidColorLayer");
    desc52.putObject(idType, idsolidColorLayer, desc53);
    idcontentLayer = stringIDToTypeID("contentLayer");
    desc51.putObject(idUsng, idcontentLayer, desc52);
    executeAction(idMk, desc51, DialogModes.NO);
}


function uniteShape() {
    idMrgtwo = charIDToTypeID("Mrg2");
    desc3459 = new ActionDescriptor();
    idshapeOperation = stringIDToTypeID("shapeOperation");
    idshapeOperation = stringIDToTypeID("shapeOperation");
    idAdd = charIDToTypeID("Add ");
    desc3459.putEnumerated(idshapeOperation, idshapeOperation, idAdd);
    executeAction(idMrgtwo, desc3459, DialogModes.NO);

}

//function selecGroup layer
function selectGroupLayer(before, after) {
    selectLayer(before);
    idslct = charIDToTypeID("slct");
    desc360 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    ref187 = new ActionReference();
    idLyr = charIDToTypeID("Lyr ");
    ref187.putName(idLyr, after);
    desc360.putReference(idnull, ref187);
    idselectionModifier = stringIDToTypeID("selectionModifier");
    idselectionModifierType = stringIDToTypeID("selectionModifierType");
    idaddToSelectionContinuous = stringIDToTypeID("addToSelectionContinuous");
    desc360.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelectionContinuous);
    idMkVs = charIDToTypeID("MkVs");
    desc360.putBoolean(idMkVs, false);
    idLyrI = charIDToTypeID("LyrI");
    list94 = new ActionList();
    desc360.putList(idLyrI, list94);
    executeAction(idslct, desc360, DialogModes.NO);
}

function fillColor() {
    idFl = charIDToTypeID("Fl  ");
    desc196 = new ActionDescriptor();
    idUsng = charIDToTypeID("Usng");
    idFlCn = charIDToTypeID("FlCn");
    idFrgC = charIDToTypeID("FrgC");
    desc196.putEnumerated(idUsng, idFlCn, idFrgC);
    idOpct = charIDToTypeID("Opct");
    idPrc = charIDToTypeID("#Prc");
    desc196.putUnitDouble(idOpct, idPrc, 100.000000);
    idMd = charIDToTypeID("Md  ");
    idBlnM = charIDToTypeID("BlnM");
    idNrml = charIDToTypeID("Nrml");
    desc196.putEnumerated(idMd, idBlnM, idNrml);
    executeAction(idFl, desc196, DialogModes.NO);

}

function loadSelectionVectorMask() {
    idsetd = charIDToTypeID("setd");
    desc48 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    ref27 = new ActionReference();
    idChnl = charIDToTypeID("Chnl");
    idfsel = charIDToTypeID("fsel");
    ref27.putProperty(idChnl, idfsel);
    desc48.putReference(idnull, ref27);
    idT = charIDToTypeID("T   ");
    ref28 = new ActionReference();
    idPath = charIDToTypeID("Path");
    idPath = charIDToTypeID("Path");
    idvectorMask = stringIDToTypeID("vectorMask");
    ref28.putEnumerated(idPath, idPath, idvectorMask);
    idLyr = charIDToTypeID("Lyr ");
    idOrdn = charIDToTypeID("Ordn");
    idTrgt = charIDToTypeID("Trgt");
    ref28.putEnumerated(idLyr, idOrdn, idTrgt);
    desc48.putReference(idT, ref28);
    idVrsn = charIDToTypeID("Vrsn");
    desc48.putInteger(idVrsn, 1);
    idvectorMaskParams = stringIDToTypeID("vectorMaskParams");
    desc48.putBoolean(idvectorMaskParams, true);
    executeAction(idsetd, desc48, DialogModes.NO);
}


function newLayerEmpty(params) {
    idMk = charIDToTypeID("Mk  ");
    desc214 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    ref83 = new ActionReference();
    idLyr = charIDToTypeID("Lyr ");
    ref83.putClass(idLyr);
    desc214.putReference(idnull, ref83);
    idLyrI = charIDToTypeID("LyrI");
    desc214.putInteger(idLyrI, 986);
    executeAction(idMk, desc214, DialogModes.NO);
}

function loadSelectionLayer() {
    idsetd = charIDToTypeID("setd");
    desc237 = new ActionDescriptor();
    idnull = charIDToTypeID("null");
    ref103 = new ActionReference();
    idChnl = charIDToTypeID("Chnl");
    idfsel = charIDToTypeID("fsel");
    ref103.putProperty(idChnl, idfsel);
    desc237.putReference(idnull, ref103);
    idT = charIDToTypeID("T   ");
    ref104 = new ActionReference();
    idChnl = charIDToTypeID("Chnl");
    idChnl = charIDToTypeID("Chnl");
    idTrsp = charIDToTypeID("Trsp");
    ref104.putEnumerated(idChnl, idChnl, idTrsp);
    desc237.putReference(idT, ref104);
    executeAction(idsetd, desc237, DialogModes.NO);
}