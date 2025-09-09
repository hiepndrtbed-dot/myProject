
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument


//version 1
try { reNamePath(1, "Path 1", "__V1__Path 1") } catch (error) { }

function reNamePath(vr, curentPath, nameNewPath) {
    
    deselectLayer()
    lengthPath = doc.pathItems.length
    for (i = 0; i < lengthPath; i++) {
        if (doc.pathItems[i].name == curentPath) {
            doc.pathItems[curentPath].select()
            reNamePathCurent(nameNewPath)
            break
        }
    }
}

function reNamePathCurent(name) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("path"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putString(s2t("to"), name);
    executeAction(s2t("rename"), descriptor, DialogModes.NO);
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

function deselectLayer() {
    var idselectNoLayers = stringIDToTypeID("selectNoLayers");
    var desc493 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref77 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref77.putEnumerated(idLyr, idOrdn, idTrgt);
    desc493.putReference(idnull, ref77);
    executeAction(idselectNoLayers, desc493, DialogModes.NO);
}

function setVectorMask(vectorMaskEnabled) {
    var idsetd = charIDToTypeID("setd");
    var desc18 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref9 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref9.putEnumerated(idLyr, idOrdn, idTrgt);
    desc18.putReference(idnull, ref9);
    var idT = charIDToTypeID("T   ");
    var desc19 = new ActionDescriptor();
    var idvectorMaskEnabled = stringIDToTypeID("vectorMaskEnabled");
    desc19.putBoolean(idvectorMaskEnabled, vectorMaskEnabled);
    var idLyr = charIDToTypeID("Lyr ");
    desc18.putObject(idT, idLyr, desc19);
    executeAction(idsetd, desc18, DialogModes.NO);
}