#target photoshop
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;
var originalLayer = doc.artLayers["Original"];
//login Simple
// (function () {
//     var flagLogin = new File("//172.16.2.2/Academy/Hiep/log.txt")
//     if (flagLogin.exists) {
//         main()
//         // alert("2")
//     }
// })()
main()
function main() {
    var historyCurent = checkHistoryColor()
    //Save kich thước hiện tại.
    doc.artLayers.add().name = "tempCrop"
    doc.activeLayer = doc.artLayers["tempCrop"]
    fillColor(255, 255, 255)
    doc.activeLayer.visible = false

    doc.activeLayer = doc.layerSets["Variant 1"].layerSets["Item 1"].artLayers["Product"]
    //Copy kết quả layer xoay
    revealAll()
    doc.selection.selectAll()
    selectRGB()
    doc.selection.copy()
    doc.selection.deselect()
    doc.activeLayer = originalLayer
    pasteFoder()
    doc.activeLayer.name = "temp"

    try {
        deleteMask()
    } catch (error) { }

    var boundsLayer = doc.activeLayer.bounds
    crop(boundsLayer[1], boundsLayer[0], boundsLayer[3], boundsLayer[2])
    var width = doc.width
    var height = doc.height

    subtractFrom(99, 99, 1, true)
    // //Xử lý vùng chọn đúng hơn.
    // var boundsSelection = doc.selection.bounds
    // var cv1 = width - boundsSelection[0]
    // var cv2 = height - boundsSelection[1]
    // if (cv1 > cv2) {
    //     //=================leftTop, leftBottom, rightBottom rightTop
    //     var shapeRef = [[cv2 / 0.75, doc.height - cv2], [cv2 / 0.75, doc.height], [doc.width, doc.height], [doc.width, doc.height - cv2]]
    //     doc.selection.select(shapeRef)
    //     subtractLayer("temp")
    // } else {
    //     //=================leftTop, leftBottom, rightBottom rightTop
    //     var shapeRef = [[boundsSelection[0], cv1 / 0.75], [boundsSelection[0], doc.height], [doc.width, doc.height], [doc.width, cv1 / 0.75]]
    //     doc.selection.select(shapeRef)
    //     subtractLayer("temp")
    // }

    //Xử lý góc lệch
    var bounds = doc.selection.bounds
    var canhGocVuong1 = width - bounds[0]
    var canhGocVuong2 = height - bounds[1]
    if (canhGocVuong1 < width / 2 && canhGocVuong2 < height / 2) {
        selectHistory(historyCurent)
        loadSelectionLayer("Ret")
        doc.activeLayer = originalLayer
        Algn("ADSCentersH") //"ADSCentersV" Doc
        Algn("ADSCentersV") //"ADSCentersV" Ngang
        doc.selection.deselect()
        resizeImage(width, height)
    } else {
        if (canhGocVuong1 > canhGocVuong2) {
            var radian = - canhGocVuong2 / canhGocVuong1
        } else {
            var radian = canhGocVuong1 / canhGocVuong2
        }
        doc.selection.deselect()
        var value = Math.atan(radian) * 180 / Math.PI
        // alert(value)
        if (value <= 30 || value <= -30) {
            doc.activeLayer.rotate(-value, AnchorPosition.MIDDLECENTER)
            var bounds = doc.activeLayer.bounds
            crop(bounds[1], bounds[0], bounds[3], bounds[2])
            var width = doc.width
            var height = doc.height
            //selectHistory(historyCurent)
            doc.activeLayer = originalLayer
            resizeImage(width, height);
            action("RvlA")
            doc.activeLayer.rotate(value, AnchorPosition.MIDDLECENTER)
            doc.activeLayer = doc.layerSets["Variant 1"].layerSets["Item 1"].artLayers["Product"]
            loadSelectionLayer()
            doc.activeLayer = originalLayer
            Algn("ADSCentersH") //"ADSCentersV" Doc
            Algn("ADSCentersV") //"ADSCentersV" Ngang
            doc.activeLayer = doc.artLayers["tempCrop"]
            var bounds = doc.activeLayer.bounds
            crop(bounds[1], bounds[0], bounds[3], bounds[2])
            doc.artLayers['temp'].remove()
            doc.artLayers['tempCrop'].remove()
        } else {
            selectHistory(historyCurent)
        }
    }
}

function resizeImage(width, height) {
    var WIDTH = width
    var HEIGHT = height
    var bounds = activeDocument.activeLayer.bounds;
    var layerWidth = bounds[2].as('px') - bounds[0].as('px')
    var layerHeight = bounds[3].as('px') - bounds[1].as('px')
    var layerRatio = layerWidth / layerHeight
    var newWidth = WIDTH;
    var newHeight = ((1.0 * WIDTH) / layerRatio)
    if (newHeight >= HEIGHT) {
        newWidth = layerRatio * HEIGHT
        newHeight = HEIGHT
    }
    var resizePercent = newWidth / layerWidth * 100
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER)

}


//save selection Channel
function saveChannel(name) {
    var desc977 = new ActionDescriptor()
    var ref38 = new ActionReference()
    ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"))
    desc977.putReference(charIDToTypeID("null"), ref38)
    desc977.putString(charIDToTypeID("Nm  "), name);
    executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO)
    return activeDocument.channels.getByName(name)
}


//function check History colorCopy
function checkHistoryColor() {
    var randumHistory = Math.random()
    makeHistory(randumHistory)
    // selectHistory(activeDocument.name);
    return randumHistory
}

//Save History
function makeHistory(name2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s)
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s)
    };

    var descriptor = new ActionDescriptor()
    var reference = new ActionReference()
    var reference2 = new ActionReference()

    reference.putClass(s2t("snapshotClass"))
    descriptor.putReference(c2t("null"), reference);
    reference2.putProperty(c2t("HstS"), s2t("currentHistoryState"))
    descriptor.putReference(s2t("from"), reference2)
    descriptor.putString(s2t("name"), name2)
    descriptor.putEnumerated(s2t("using"), c2t("HstS"), s2t("fullDocument"))
    executeAction(s2t("make"), descriptor, DialogModes.NO)
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


function subtractFrom(horizontal, vertical, tolerance) {
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
    descriptor2.putUnitDouble(s2t("horizontal"), s2t("percentUnit"), horizontal);
    descriptor2.putUnitDouble(s2t("vertical"), s2t("percentUnit"), vertical);
    descriptor.putObject(s2t("to"), c2t("Pnt "), descriptor2);
    descriptor.putInteger(s2t("tolerance"), tolerance);
    descriptor.putBoolean(c2t("AntA"), true);
    executeAction(s2t("subtractFrom"), descriptor, DialogModes.NO);
}


function fillColor(red, green, blue) {
    var myColor = new SolidColor()
    myColor.rgb.red = red // 0 - 255
    myColor.rgb.green = green
    myColor.rgb.blue = blue
    activeDocument.selection.fill(myColor)
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

function disableMask() {
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
    descriptor2.putBoolean(c2t("UsrM"), false);
    descriptor.putObject(s2t("to"), s2t("layer"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

function enableMask() {
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
    descriptor2.putBoolean(c2t("UsrM"), true);
    descriptor.putObject(s2t("to"), s2t("layer"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}
function deleteMask() {
    var idDlt = charIDToTypeID("Dlt ");
    var desc26 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref22 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref22.putEnumerated(idChnl, idChnl, idMsk);
    desc26.putReference(idnull, ref22);
    executeAction(idDlt, desc26, DialogModes.NO);
}

function action(params) {
    var idRvlA = charIDToTypeID(params);
    var desc31 = new ActionDescriptor();
    executeAction(idRvlA, desc31, DialogModes.NO);
}
function subtractLayer(nameLayer) {
    var idSbtr = charIDToTypeID("Sbtr");
    var desc5229 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref790 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idTrsp = charIDToTypeID("Trsp");
    ref790.putEnumerated(idChnl, idChnl, idTrsp);
    var idLyr = charIDToTypeID("Lyr ");
    ref790.putName(idLyr, nameLayer);
    desc5229.putReference(idnull, ref790);
    var idFrom = charIDToTypeID("From");
    var ref791 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref791.putProperty(idChnl, idfsel);
    desc5229.putReference(idFrom, ref791);
    executeAction(idSbtr, desc5229, DialogModes.NO);
}

function loadSelectionLayer(params) {
    var idsetd = charIDToTypeID("setd");
    var desc265 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref210 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref210.putProperty(idChnl, idfsel);
    desc265.putReference(idnull, ref210);
    var idT = charIDToTypeID("T   ");
    var ref211 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idTrsp = charIDToTypeID("Trsp");
    ref211.putEnumerated(idChnl, idChnl, idTrsp);
    var idLyr = charIDToTypeID("Lyr ");
    ref211.putName(idLyr, "Product");
    desc265.putReference(idT, ref211);
    executeAction(idsetd, desc265, DialogModes.NO);

}

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

//revealAll document
function revealAll() {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    executeAction(s2t("revealAll"), descriptor, DialogModes.NO);
}


function selectRGB() {
    // activeDocument.activeLayer = lyr;
    var idslct = charIDToTypeID("slct");
    var desc219 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref138 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idRGB = charIDToTypeID("RGB ");
    ref138.putEnumerated(idChnl, idChnl, idRGB);
    desc219.putReference(idnull, ref138);
    var idMkVs = charIDToTypeID("MkVs");
    desc219.putBoolean(idMkVs, false);
    executeAction(idslct, desc219, DialogModes.NO);
}

function purgeAll() {
    var idPrge = charIDToTypeID("Prge");
    var desc7726 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var idPrgI = charIDToTypeID("PrgI");
    var idAl = charIDToTypeID("Al  ");
    desc7726.putEnumerated(idnull, idPrgI, idAl);
    executeAction(idPrge, desc7726, DialogModes.NO);
}
