//--By Duc Hiep Academy--
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument

// deselectLayer()
// try { doc.pathItems.getByName("Work Path").remove() } catch (error) { }
saveMaskToChannel(1)
function saveMaskToChannel(vr, nameMask) {
    grVariant = doc.layerSets["Variant " + vr]
    grColor = grVariant.layerSets["Color " + vr]
    grItem = grVariant.layerSets["Item " + vr]
    grShadow = grVariant.layerSets["Shadow " + vr]
    grBg = grVariant.layerSets["Background " + vr]

    doc.revealAll()
    doc.activeLayer = grItem
    length = doc.activeLayer.layers.length
    for (var i = 0; i < length; i++) {
        nameLayer = doc.activeLayer.layers[i].name
        if ((nameLayer.search("#") == 0)) {
            doc.activeLayer = doc.activeLayer.artLayers[i]
            if (hasMask()) {
                loadSelectionMask()
                saveSelection()
                doc.selection.deselect()
                doc.activeLayer.remove()
                length--
                i--
                doc.activeLayer = doc.activeLayer.parent

            } else {
                doc.activeLayer.remove()
                length--
                i--
                doc.activeLayer = doc.activeLayer.parent
            }
        }
    }
}
//check Mask
function hasMask() {
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desGet = executeActionGet(ref);
    return desGet.getBoolean(stringIDToTypeID("hasUserMask"));
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
        descriptor.putString(s2t("name"), name2);
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
