preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument

const namPath = "__V1__cutout"
const nameChannel = "alpha cutout"

//version 1
savePathMask(1, namPath)

function savePathMask(vr, namePath) {

    deselectLayer()
    doc.pathItems.removeAll()
    doc.channels.removeAll()

    grVariant = doc.layerSets["Variant " + vr]
    grColor = grVariant.layerSets["Color " + vr]
    grItem = grVariant.layerSets["Item " + vr]
    grShadow = grVariant.layerSets["Shadow " + vr]
    grBg = grVariant.layerSets["Background " + vr]

    //Chọn Item thuộc variant
    doc.activeLayer = grItem
    //Gán cờ kiểm tra đã lưu path và mask từ layer trước chưa
    var FlagPath = false
    for (var i = 0; i < doc.activeLayer.layers.length; i++) {
        nameLayer = grItem.artLayers[i].name
        if (nameLayer.search("Product") == 0) {
            doc.activeLayer = grItem.artLayers[i]
            if (hasVectorMask() || hasMask()) {

                //Save path tu vector mask
                //Kiểm tra tồn tại vectorMask và Flag == false khi chưa chưa lưu path
                if (hasVectorMask() && FlagPath == false) {
                    selectVectormask()
                    selectVectormask()
                    try { enableVectorMask() } catch (error) { }
                    savePathOfVectorpath(namePath)
                    deletePathItem()
                    FlagPath = true
                }
            }
            //Quay về group cha.
            doc.activeLayer = doc.activeLayer.parent
        }
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

    //check Mask
    function hasMask() {
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var desGet = executeActionGet(ref);
        return desGet.getBoolean(stringIDToTypeID("hasUserMask"));
    }

    //Kiem tra vector mask co enable không
    function checkVectorMask() {
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var desGet = executeActionGet(ref);
        return desGet.getBoolean(stringIDToTypeID("vectorMaskEnabled"));
    }
    //kiem tra ton tai vector mask

    function hasVectorMask() {
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var desget = executeActionGet(ref);
        return desget.getBoolean(stringIDToTypeID("hasVectorMask"));
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

    //save selection to channel
    function saveSelection(params) {
        if (params) {
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
            descriptor.putString(s2t("name"), params);
            executeAction(s2t("duplicate"), descriptor, DialogModes.NO);

        } else {
            var idDplc = charIDToTypeID("Dplc");
            var desc376 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref2 = new ActionReference();
            var idChnl = charIDToTypeID("Chnl");
            var idfsel = charIDToTypeID("fsel");
            ref2.putProperty(idChnl, idfsel);
            desc376.putReference(idnull, ref2);
            executeAction(idDplc, desc376, DialogModes.NO);
        }
    }

    function enableVectorMask() {
        var idsetd = charIDToTypeID("setd");
        var desc6 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref3 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref3.putEnumerated(idLyr, idOrdn, idTrgt);
        desc6.putReference(idnull, ref3);
        var idT = charIDToTypeID("T   ");
        var desc7 = new ActionDescriptor();
        var idvectorMaskEnabled = stringIDToTypeID("vectorMaskEnabled");
        desc7.putBoolean(idvectorMaskEnabled, true);
        var idLyr = charIDToTypeID("Lyr ");
        desc6.putObject(idT, idLyr, desc7);
        executeAction(idsetd, desc6, DialogModes.NO);
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