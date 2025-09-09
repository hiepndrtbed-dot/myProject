
var doc = activeDocument

grVarian = doc.layerSets["Variant 1"]
doc.activeLayer = grVarian
var lengthLayers = doc.activeLayer.layers.length

for (var i = 1; i < lengthLayers; i++) {
    // alert(lengthLayers)
    doc.activeLayer = doc.activeLayer.layers[i]
    makeGroup("BUST");
    doc.activeLayer.name = "BUST"
    doc.activeLayer = doc.activeLayer.layers[0]
    doc.activeLayer.name = "Ret"
    // action("CpTL")
    // doc.activeLayer.name = "Swatch"
    // clippingMask()
    doc.activeLayer = doc.activeLayer.parent.parent;

}
ungroupLayersEvent()
makeSolidColor(230, 230, 230)
doc.activeLayer.name = "Farbfüllung 1"
moveEndGroup()
deleteMask()



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

//clipping mask layer
function clippingMask(params) {
     var idGrp = stringIDToTypeID("groupEvent");
    executeAction(idGrp, undefined, DialogModes.NO);
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

function action(action) {
    var idCpTL = charIDToTypeID(action);
    executeAction(idCpTL, undefined, DialogModes.NO);
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