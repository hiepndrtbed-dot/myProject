// #target photoshop
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument
    ; (function () {
        var historyCurent = checkHistoryColor()

        doc.artLayers.add().name = "layout Temp";
        fillColor(0, 0, 0)
        doc.activeLayer.opacity = 50
        doc.activeLayer.visible = false
        // doc.selection.selectAll()
        // saveChannel("selection")
        doc.selection.deselect()
        doc.activeLayer = doc.layerSets["FULL"].artLayers["Ret"]
        doc.selection.copy()
        doc.activeLayer = doc.layers["Original"]
        pasteFoder()
        doc.activeLayer.name = "temp"
        deleteMask()
        var bounds = doc.activeLayer.bounds
        crop(bounds[1], bounds[0], bounds[3], bounds[2])
        var width = doc.width
        var height = doc.height

        subtractFrom(99, 99, 1, true)
        var bounds = doc.selection.bounds
        var canhGocVuong1 = width - bounds[0]
        var canhGocVuong2 = height - bounds[1]

        if (canhGocVuong1 < width / 2 && canhGocVuong2 < height / 2) {

            selectHistory(historyCurent)
            loadSelectionLayer("Ret")
            doc.activeLayer = doc.layers["Original"]
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

            if (value <= 30 || value <= -30) {
                doc.activeLayer.rotate(-value, AnchorPosition.MIDDLECENTER)

                var bounds = doc.activeLayer.bounds
                crop(bounds[1], bounds[0], bounds[3], bounds[2])
                var width = doc.width
                var height = doc.height
                // selectHistory(historyCurent)
                doc.activeLayer = doc.layers["Original"]
                resizeImage(width, height);
                action("RvlA")
                doc.activeLayer.rotate(value, AnchorPosition.MIDDLECENTER)
                doc.activeLayer = doc.layerSets["FULL"].artLayers["Ret"]
                loadSelectionLayer("Ret")
                doc.activeLayer = doc.layers["Original"]
                Algn("ADSCentersH") //"ADSCentersV" Doc
                Algn("ADSCentersV") //"ADSCentersV" Ngang
                // try { doc.selection.load(doc.channels.getByName("selection")); } catch (error) { }
                loadSelectionLayer("layout Temp")
                var bounds = doc.selection.bounds
                crop(bounds[1], bounds[0], bounds[3], bounds[2])
                // try { doc.channels.getByName("selection").remove(); } catch (err) { }
                doc.activeLayer = doc.layers["layout Temp"]
                doc.activeLayer.remove()
                doc.activeLayer = doc.layers["temp"]
                doc.activeLayer.remove()
            } else {
                selectHistory(historyCurent)
            }
        }
    })()

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
function fillColor(red, green, blue) {
    var myColor = new SolidColor()
    myColor.rgb.red = red // 0 - 255
    myColor.rgb.green = green
    myColor.rgb.blue = blue
    activeDocument.selection.fill(myColor)
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

function loadSelectionLayer(lyr) {
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
    reference2.putName(s2t("layer"), lyr);
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
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
