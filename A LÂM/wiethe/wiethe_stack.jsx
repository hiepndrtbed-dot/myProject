
//By ACademy DN version: 1.0
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument
var myPaths = app.activeDocument.pathItems
//width - height layout
const widthLayout = 2250
const heigthLayout = 3000
//padding - margin product
const padding = 225
const margin = 150
main()
function main() {
    grVarian = doc.layerSets["Variant 1"]
    doc.activeLayer = grVarian
    //Remove path()
    if (checkLengthGroup() <= 11) {
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
function tranS() {
    ///transform 
    //width - height product
    var size = sizeLayout(padding, checkLengthGroup(), margin)
    
    //Transform to layout
    transform(size.width, size.height, checkLengthGroup(), padding)
    function transform(width, height, n, le) {
        selectLayer("Layout");
        var bounds = doc.activeLayer.bounds;
        crop(bounds[1], bounds[0], bounds[3], bounds[2]);
        doc.activeLayer = doc.layerSets["BUST"]
        for (var i = 0; i < n; i++) {
            doc.activeLayer = doc.activeLayer.artLayers[i]
            makeGroup("BUST")
            doc.activeLayer = doc.activeLayer.artLayers[0]
            doc.activeLayer.name = "Ret"
            if (n == 2) {
                resizeImage(1716, 2480);
            } else {
                resizeImage(width, height)
            }
            loadSelectionMask()
            doc.activeLayer.visible = false
            action("CpTL")
            doc.activeLayer.name = "temp"
            doc.activeLayer = doc.activeLayer.parent;
            doc.selection.selectAll();
            Algn("ADSCentersH") //"ADSCentersV" Doc
            Algn("ADSCentersV") //"ADSCentersV" Ngang
            ungroupLayersEvent()
            doc.activeLayer = doc.activeLayer.parent
            doc.activeLayer = doc.activeLayer.artLayers["temp"]
            doc.activeLayer.remove()
            doc.activeLayer.visible = true
            doc.selection.deselect()
            //Check amount BUST
            if (n > 2 && n < 7) {
                if (n % 2 == 0) {
                    // alert("chan");
                    var stepRun = n / 2;
                    var bustCurent = i;
                    if (bustCurent < stepRun) {
                        var margin = (stepRun - bustCurent) * le - (le / 2)
                        doc.activeLayer.translate(margin, margin);
                    }
                    if (bustCurent >= stepRun) {
                        var margin = (bustCurent - stepRun) * le + (le / 2)
                        doc.activeLayer.translate(-margin, -margin)
                    }
                } else {
                    // alert("le");
                    var stepRun = (n - 1) / 2;
                    var bustCurent = i;
                    if (bustCurent < stepRun) {
                        var margin = (stepRun - bustCurent) * le
                        doc.activeLayer.translate(margin, margin)
                    }
                    if (bustCurent > stepRun) {
                        var margin = (bustCurent - stepRun) * le
                        doc.activeLayer.translate(-margin, -margin)
                    }
                }
            }

            //7 Stack
            else if (n == 7) {
                if (i <= 3) {
                    // alert("chan");
                    var stepRun = n / 2;
                    var bustCurent = i;
                    if (bustCurent < stepRun) {
                        var margin = (stepRun - bustCurent) * le - (le / 2)
                        doc.activeLayer.translate(margin, margin);
                    }
                    if (bustCurent >= stepRun) {
                        var margin = (bustCurent - stepRun) * le + (le / 2)
                        doc.activeLayer.translate(-margin, -margin)
                    }
                } else {
                    // alert("le");
                    var stepRun = (n - 1) / 2;
                    var bustCurent = i;
                    if (bustCurent < stepRun) {
                        var margin = (stepRun - bustCurent) * le
                        doc.activeLayer.translate(margin, margin)
                    }
                    if (bustCurent > stepRun) {
                        var margin = (bustCurent - stepRun) * le
                        doc.activeLayer.translate(-margin, -margin)
                    }
                }
            }

            //10 Stack
            else if (n == 10) {

            }

            //2 stack 
            else if (n == 2) {
                switch (i) {
                    case 0:
                        doc.activeLayer.translate(125, 125)
                        break;
                    case 1:
                        doc.activeLayer.translate(-125, -125)
                        break;
                    default:
                        break;
                }
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
        // //Create Swatch
        // newLayerEmpty()
        // set(20.313542, 72.4, 21.180787, 73.555556)
        // fillColor()
        // moveDown()
        // loadSelectionMask()
        // moveUp()
        // Algn("ADSCentersH"); //"ADSCentersV" Doc
        // Algn("ADSCentersV"); //"ADSCentersV" Ngang
        // loadSelectionLayer()
        // moveDown()
        // action("CpTL")
        // doc.activeLayer.name = "Swatch"
        // clippingMask()
        // moveUp()
        // doc.activeLayer.remove()
    }
}//End main
function sizeLayout(padding, n, margin) {

    var result = { width: null, height: null }

    result.width = widthLayout - ((padding * (n - 1)) + (margin * 2))
    result.height = heigthLayout - ((padding * (n - 1)) + (margin * 2))
    alert(result.width)
    alert(result.height)
    
    return result;
}
function checkLengthGroup() {
    var length = doc.activeLayer.layers.length;
    alert(length)
    return length;
}

function mergePathItems() {
    var length = doc.pathItems.length
    var namePathStart = doc.pathItems[0].name
    var namePathEnt = doc.pathItems[length - 1].name
    for (var i = 0; i < doc.pathItems.length - 1; i++) {
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
    var WIDTH = width;
    var HEIGHT = height;
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
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);

}

function combinePathItem() {
    var idcombine = stringIDToTypeID("combine")
    var desc47 = new ActionDescriptor()
    var idnull = charIDToTypeID("null")
    var ref27 = new ActionReference()
    var idPath = charIDToTypeID("Path")
    var idOrdn = charIDToTypeID("Ordn")
    var idTrgt = charIDToTypeID("Trgt")
    ref27.putEnumerated(idPath, idOrdn, idTrgt)
    desc47.putReference(idnull, ref27)
    executeAction(idcombine, desc47, DialogModes.NO)
}

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

function action(action) {
    var idCpTL = charIDToTypeID(action);
    executeAction(idCpTL, undefined, DialogModes.NO);
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


//load selection mask
function loadSelectionMask() {
    var idsetd = charIDToTypeID("setd");
    var desc32 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref14 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref14.putProperty(idChnl, idfsel);
    desc32.putReference(idnull, ref14);
    var idT = charIDToTypeID("T   ");
    var ref15 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref15.putEnumerated(idChnl, idChnl, idMsk);
    desc32.putReference(idT, ref15);
    executeAction(idsetd, desc32, DialogModes.NO);
}

// Algn("ADSCentersH"); //"ADSCentersV"

function Algn(algn) {
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
    descriptor.putEnumerated(s2t("using"), s2t("alignDistributeSelector"), s2t(algn));
    descriptor.putBoolean(s2t("alignToCanvas"), false);
    executeAction(c2t("Algn"), descriptor, DialogModes.NO);
}


function setSwatch(top, left, bottom, right) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

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
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

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
    var idGrpL = charIDToTypeID("GrpL");
    var desc14721 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref4637 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref4637.putEnumerated(idLyr, idOrdn, idTrgt);
    desc14721.putReference(idnull, ref4637);
    executeAction(idGrpL, desc14721, DialogModes.NO);

}

function addSelectionChannel(channel) {
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
    reference2.putName(s2t("channel"), channel);
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("add"), descriptor, DialogModes.NO);
}

// make("Group 3");
function makeGroup(name2) {
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
    descriptor.putString(s2t("name"), name2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
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


function makeSolidColor(red, Grn, blue) {
    var c2t = function (s) {
        return app.charIDToTypeID(s)
    }

    var s2t = function (s) {
        return app.stringIDToTypeID(s)
    }

    var descriptor = new ActionDescriptor()
    var descriptor2 = new ActionDescriptor()
    var descriptor3 = new ActionDescriptor()
    var descriptor4 = new ActionDescriptor()
    var reference = new ActionReference()

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
    var idmove = charIDToTypeID("move");
    var desc4947 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref1057 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref1057.putEnumerated(idLyr, idOrdn, idTrgt);
    desc4947.putReference(idnull, ref1057);
    var idT = charIDToTypeID("T   ");
    var ref1058 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idBack = charIDToTypeID("Back");
    ref1058.putEnumerated(idLyr, idOrdn, idBack);
    desc4947.putReference(idT, ref1058);
    executeAction(idmove, desc4947, DialogModes.NO);
}

//up Nxt 
function moveLayerUp(params) {
    var idmove = charIDToTypeID("move");
    var desc201 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref166 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref166.putEnumerated(idLyr, idOrdn, idTrgt);
    desc201.putReference(idnull, ref166);
    var idT = charIDToTypeID("T   ");
    var ref167 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idNxt = charIDToTypeID("Nxt ");
    ref167.putEnumerated(idLyr, idOrdn, idNxt);
    desc201.putReference(idT, ref167);
    executeAction(idmove, desc201, DialogModes.NO);

}

function deleteMask(params) {
    var idDlt = charIDToTypeID("Dlt ");
    var desc4950 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref1060 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref1060.putEnumerated(idChnl, idChnl, idMsk);
    desc4950.putReference(idnull, ref1060);
    executeAction(idDlt, desc4950, DialogModes.NO);
}


function moveUp() {
    var idslct = charIDToTypeID("slct");
    var desc1388 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref155 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idFrwr = charIDToTypeID("Frwr");
    ref155.putEnumerated(idLyr, idOrdn, idFrwr);
    desc1388.putReference(idnull, ref155);
    var idMkVs = charIDToTypeID("MkVs");
    desc1388.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    var list18 = new ActionList();
    list18.putInteger(30);
    desc1388.putList(idLyrI, list18);
    executeAction(idslct, desc1388, DialogModes.NO);
}


function moveDown(params) {
    var idslct = charIDToTypeID("slct");
    var desc704 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref513 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idBckw = charIDToTypeID("Bckw");
    ref513.putEnumerated(idLyr, idOrdn, idBckw);
    desc704.putReference(idnull, ref513);
    var idMkVs = charIDToTypeID("MkVs");
    desc704.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    var list155 = new ActionList();
    list155.putInteger(114);
    desc704.putList(idLyrI, list155);
    executeAction(idslct, desc704, DialogModes.NO);
}

function makeLayerMask() {
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
    descriptor.putEnumerated(s2t("using"), c2t("UsrM"), s2t("revealSelection"));
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}


//xu ly path
function selectVectormask() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("path"), s2t("path"), s2t("vectorMask"));
    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}
//make path
function savePathOfVectorpath(name) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putClass(s2t("path"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("path"), s2t("path"), s2t("vectorMask"));
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(s2t("from"), reference2);
    descriptor.putString(s2t("name"), name);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

function selectNoLayers() {
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
    executeAction(s2t("selectNoLayers"), descriptor, DialogModes.NO);
}


//select path

function selectPath(namePath) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putName(s2t("path"), namePath);
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

function selectPointPath() {


    var idslct = charIDToTypeID("slct");
    var desc852 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref280 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    ref280.putName(idPath, "Path 1");
    desc852.putReference(idnull, ref280);
    executeAction(idslct, desc852, DialogModes.NO);

}
function deletePathItem() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("path"), s2t("path"), s2t("vectorMask"));
    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("delete"), descriptor, DialogModes.NO);
}



function makePathToSHape(hexValue) {
    var color = new SolidColor();
    color.rgb.hexValue = hexValue != undefined ? hexValue : "000000";

    var idMk = charIDToTypeID("Mk  ");
    var desc51 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref35 = new ActionReference();
    var idcontentLayer = stringIDToTypeID("contentLayer");
    ref35.putClass(idcontentLayer);
    desc51.putReference(idnull, ref35);
    var idUsng = charIDToTypeID("Usng");
    var desc52 = new ActionDescriptor();
    var idType = charIDToTypeID("Type");
    var desc53 = new ActionDescriptor();
    var idClr = charIDToTypeID("Clr ");
    var desc54 = new ActionDescriptor();
    var idRd = charIDToTypeID("Rd  ");
    desc54.putDouble(idRd, color.rgb.red);
    var idGrn = charIDToTypeID("Grn ");
    desc54.putDouble(idGrn, color.rgb.green);
    var idBl = charIDToTypeID("Bl  ");
    desc54.putDouble(idBl, color.rgb.blue);
    var idRGBC = charIDToTypeID("RGBC");
    desc53.putObject(idClr, idRGBC, desc54);
    var idsolidColorLayer = stringIDToTypeID("solidColorLayer");
    desc52.putObject(idType, idsolidColorLayer, desc53);
    var idcontentLayer = stringIDToTypeID("contentLayer");
    desc51.putObject(idUsng, idcontentLayer, desc52);
    executeAction(idMk, desc51, DialogModes.NO);
}


function uniteShape() {
    var idMrgtwo = charIDToTypeID("Mrg2");
    var desc3459 = new ActionDescriptor();
    var idshapeOperation = stringIDToTypeID("shapeOperation");
    var idshapeOperation = stringIDToTypeID("shapeOperation");
    var idAdd = charIDToTypeID("Add ");
    desc3459.putEnumerated(idshapeOperation, idshapeOperation, idAdd);
    executeAction(idMrgtwo, desc3459, DialogModes.NO);

}

//function selecGroup layer
function selectGroupLayer(before, after) {
    selectLayer(before);
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

function fillColor() {
    var idFl = charIDToTypeID("Fl  ");
    var desc196 = new ActionDescriptor();
    var idUsng = charIDToTypeID("Usng");
    var idFlCn = charIDToTypeID("FlCn");
    var idFrgC = charIDToTypeID("FrgC");
    desc196.putEnumerated(idUsng, idFlCn, idFrgC);
    var idOpct = charIDToTypeID("Opct");
    var idPrc = charIDToTypeID("#Prc");
    desc196.putUnitDouble(idOpct, idPrc, 100.000000);
    var idMd = charIDToTypeID("Md  ");
    var idBlnM = charIDToTypeID("BlnM");
    var idNrml = charIDToTypeID("Nrml");
    desc196.putEnumerated(idMd, idBlnM, idNrml);
    executeAction(idFl, desc196, DialogModes.NO);

}

function loadSelectionVectorMask() {
    var idsetd = charIDToTypeID("setd");
    var desc48 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref27 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref27.putProperty(idChnl, idfsel);
    desc48.putReference(idnull, ref27);
    var idT = charIDToTypeID("T   ");
    var ref28 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    var idPath = charIDToTypeID("Path");
    var idvectorMask = stringIDToTypeID("vectorMask");
    ref28.putEnumerated(idPath, idPath, idvectorMask);
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref28.putEnumerated(idLyr, idOrdn, idTrgt);
    desc48.putReference(idT, ref28);
    var idVrsn = charIDToTypeID("Vrsn");
    desc48.putInteger(idVrsn, 1);
    var idvectorMaskParams = stringIDToTypeID("vectorMaskParams");
    desc48.putBoolean(idvectorMaskParams, true);
    executeAction(idsetd, desc48, DialogModes.NO);
}


function newLayerEmpty(params) {
    var idMk = charIDToTypeID("Mk  ");
    var desc214 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref83 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref83.putClass(idLyr);
    desc214.putReference(idnull, ref83);
    var idLyrI = charIDToTypeID("LyrI");
    desc214.putInteger(idLyrI, 986);
    executeAction(idMk, desc214, DialogModes.NO);
}

function loadSelectionLayer() {
    var idsetd = charIDToTypeID("setd");
    var desc237 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref103 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref103.putProperty(idChnl, idfsel);
    desc237.putReference(idnull, ref103);
    var idT = charIDToTypeID("T   ");
    var ref104 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idTrsp = charIDToTypeID("Trsp");
    ref104.putEnumerated(idChnl, idChnl, idTrsp);
    desc237.putReference(idT, ref104);
    executeAction(idsetd, desc237, DialogModes.NO);
}