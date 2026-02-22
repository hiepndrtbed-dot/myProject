
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument

deselectLayer()
doc.pathItems.removeAll()

//version 1
try {savePath(1, "__V1__Path 1", "Product")} catch (error) {}

//version 2
try {savePath(1, "__V1__Path 1", "Product (merged)")} catch (error) {}

function savePath(vr, namePath, nameLayer) {
    grVariant = doc.layerSets["Variant " + vr]
    grColor = grVariant.layerSets["Color " + vr]
    grItem = grVariant.layerSets["Item " + vr]
    grShadow = grVariant.layerSets["Shadow " + vr]
    grBg = grVariant.layerSets["Background " + vr]

    doc.activeLayer = grItem
    for (var i = 0; i < doc.activeLayer.layers.length; i++) {
        doc.activeLayer = grItem.artLayers[i]
        if (doc.activeLayer.name.search("Product") == 0) {
            try {
                selectVectormask()
                setVectorMask(true)
                savePathOfVectorpath(namePath)
                deletePathItem()
                doc.activeLayer.name = nameLayer
                break
            } catch (error) {

            }
        }
        doc.activeLayer = doc.activeLayer.parent
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