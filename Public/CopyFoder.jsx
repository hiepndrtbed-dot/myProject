
app.preferences.rulerUnits = Units.PIXELS;
var doc = app.activeDocument;

(function () {
    logAction("Log_UpdateVer")
    switch (checkInput()) {
        case 0:
            copyFoderItem("Variant 1", "Item 1");
            setSelectedLayer("Item 1");
            if (checkAlllockLayer() == false) {
                copyFoderItem("Variant 1", "Color 1");
            }
            visibleGroup();
            break;
        case 1:
            copyLayerRetouch();
            if (checkAlllockLayer() == false) {
                copyFoderItem("Variant 1", "Color 1");
            }
            visibleGroup();
            break;
        case 2:
            copyFoderItem("Variant 1", "Color 1");
            visibleGroup();
            break;
        case 3:
            copyVariant();
            break;
        case 4:
            doc.activeLayer = doc.activeLayer.artLayers[0]
            alert(1)
            copyShadow()
            break;
        default:
            alert('Cấu trúc Không phù hợp. Copy bằng tay nhé.');
            break;
    }
})()

function layerLocker(layer1, layer2, layer3) {
    var lLock = false;
    if (checkLayerName(layer1, layer2, layer3) == true) {
        if (doc.activeLayer.allLocked) {
            lLock = true;
        }
    }
    return lLock;
}
//function copy variant
function copyVariant() {
    setSelectedLayer('Retouch #1');
    copyFoder("Retouch #1");
    setSelectedLayer("Retouch #2");
    var nameLayer = String(doc.activeLayer.name);
    deleteFoder();
    pasteFoder();
    re_name(nameLayer);
}

//Function copy foder Item
function copyFoderItem(foder1, foderCopy) {

    switch (foderCopy) {
        case "Item 1":
            if (doc.layers.length > 2) {
                var i = 1;
                for (i; i < doc.layers.length - 2; i++) {
                    var nameGroup = String(doc.layers[i].name);
                    selectFoder(nameGroup, null, null);
                    if (!doc.activeLayer.allLocked) {
                        var foderChange = doc.activeLayer.layers[1].name;
                        if (checkAlllockLayer() == false) {
                            copyFoder(foder1, foderCopy, null);
                            selectFoder(nameGroup, foderChange, null);
                            deleteFoder();
                            pasteFoder();
                            re_name(foderChange);
                        }

                    }
                }
            }//End if coy Item
            break;
        case "Color 1":
            if (doc.layers.length > 2) {
                var i = 1;
                for (i; i < doc.layers.length - 2; i++) {
                    var nameGroup = String(doc.layers[i].name);
                    selectFoder(nameGroup, null, null);
                    if (!doc.activeLayer.allLocked) {
                        var foderChange = doc.activeLayer.layers[0].name;
                        copyFoder(foder1, foderCopy, null);
                        selectFoder(nameGroup, foderChange, null);
                        if (!doc.activeLayer.allLocked) {
                            deleteFoder();
                            pasteFoder();
                            re_name(foderChange);
                        }
                    }
                }
            }//End if copy Color
            break;
        default:
            break;
    }//switch
}
function copyLayerRetouch() {
    copyFoder("Variant 1", "Item 1", 0);
    if (doc.layers.length > 2) {
        var i = 1;
        for (i; i < doc.layers.length - 2; i++) {
            var nameGroup = String(doc.layers[i].name);
            selectFoder(nameGroup, null, null);
            if (!doc.activeLayer.allLocked) {
                doc.activeLayer = doc.activeLayer.layers[1];
                var lengthItem = doc.activeLayer.artLayers.length;
                if (lengthItem > 0) {
                    doc.activeLayer = doc.activeLayer.layers[0];
                    var nameLayer = String(doc.activeLayer.name);
                    //kiểm tra layer có clipping mask khong.
                    if (checkClippingMask() == true) {
                        deleteFoder();
                        pasteFoder();
                        clippingMask()
                        re_name(nameLayer);
                    } else {
                        deleteFoder();
                        pasteFoder();
                        re_name(nameLayer);
                    }
                } else {
                    pasteFoder();
                }
            }
        }
    }//End if coy Item
}

function checkInput() {
    var result = 0;
    doc.activeLayer = doc.layerSets["Variant 1"].layerSets["Shadow 1"]
    if (!doc.activeLayer.allLocked && doc.activeLayer.artLayers.length == 1) {
        alert(1)
        result = 4;
    } else if (setSelectedLayer('Item 1') == true) {
        if (checkAlllockLayer() == false) {
            var countLayer = doc.activeLayer.artLayers.length;
            doc.activeLayer = doc.activeLayer.artLayers[countLayer - 1]
            if (checkAlllockLayer() == true) {
                doc.activeLayer = doc.layerSets["Variant 2"].layerSets["Item 2"]
                var countLayerItem2 = doc.activeLayer.artLayers.length
                if (countLayerItem2 <= 1 && checkAlllockLayer() == false) {
                    result = 0
                } else {
                    result = 1
                }
            }
        } else {
            return result = 2
        }
    } else if (setSelectedLayer("Variant #2")) {
        result = 3
    } else {
        result = -2
    }
    return result;
}


function checkAlllockLayer() {
    var result = false;
    try {
        if (doc.activeLayer.allLocked ||
            doc.activeLayer.pixelsLocked ||
            doc.activeLayer.positionLocked ||
            doc.activeLayer.transparentPixelsLocked) {
            result = true;
        }
    } catch (error) { }
    return result;
}
// Funtion lelect Layer / Group
function selectFoder(group1, group2, group3) {
    var result = false;
    if (group1 != null && group2 != null && group3 != null) {
        try {
            doc.activeLayer = doc.layers[group1].layers[group2].layers[group3]
            if (group3 == String(app.doc.activeLayer.name)) {
                result = true;
            }
        } catch (e) { }
    } else if (group1 != null && group2 != null && group3 == null) {
        try {
            doc.activeLayer = doc.layers[group1].layers[group2]
            if (group2 == String(app.doc.activeLayer.name)) {
                result = true;
            }

        } catch (e) { }
    } else if (group1 != null && group2 == null && group3 == null) {
        try {
            doc.activeLayer = doc.layers[group1]
            if (group1 == String(app.doc.activeLayer.name)) {
                result = true;
            }
        } catch (e) { }
    }
    return result;
}

function copyFoder(group1, group2, group3) {
    if (group1 != null && group2 != null && group3 != null) {
        try {
            doc.activeLayer = doc.layers[group1].layers[group2].layers[group3]
            if (checkClippingMask() == true) {
                // alert(2)
                unClippingMask()
                doc.selection.copy();
                clippingMask()
            } else {
                doc.selection.copy();
            }
        } catch (e) { }
    } else if (group1 != null && group2 != null && group3 == null) {

        try {
            doc.activeLayer = doc.layers[group1].layers[group2]
            doc.selection.copy();
        } catch (e) { }
    } else if (group1 != null && group2 == null && group3 == null) {
        try {
            doc.activeLayer = doc.layers[group1]
            doc.selection.copy();
        } catch (e) { }
    }
}


//unClipping Mask
function unClippingMask() {
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
    executeAction(s2t("ungroup"), descriptor, DialogModes.NO);
}


//function clipingmask
function clippingMask() {
    var idGrpL = charIDToTypeID("GrpL");
    var desc362 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref188 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref188.putEnumerated(idLyr, idOrdn, idTrgt);
    desc362.putReference(idnull, ref188);
    executeAction(idGrpL, desc362, DialogModes.NO);

}

function logAction(params) {
    var logNameAct = new File("//172.16.2.2/Public Data/Academy/LogAction/" + params + ".log");
    if (logNameAct.exists) {
        logNameAct.open("r")
        logText = logNameAct.read()
        const y = Number(logText)
        var addText = y + 1
        logNameAct.close()
        logNameAct.remove()
        logNameAct.open("w")
        logNameAct.write(addText)
        logNameAct.close()
    } else {
        logNameAct.open("w")
        logNameAct.write(1)
        logNameAct.close()
    }
}
function deleteFoder() {
    try {
        doc.activeLayer.remove();
    } catch (e) { }
}

function re_name(n_name) {
    try {
        doc.activeLayer.name = n_name;
    } catch (error) {

    }
}

function copyShadow() {
    app.preferences.rulerUnits = Units.PIXELS;
    var mydoc = app.activeDocument;
    var totalVar = mydoc.layers.length - 2;
    // find parent Variant
    var variantActive = mydoc.activeLayer;
    if (variantActive.name.search("Variant") == (- 1)) {
        if (variantActive.parent.name.search("Variant") == (- 1)) {
            variantActive = variantActive.parent.parent;
        }
        else {
            variantActive = variantActive.parent;
        }
    }
    variantActive.visible = false;
    variantActive.layerSets[1].artLayers.getByName("Stencil").visible = false;

    for (var i = 0; i < totalVar; i++) {
        mainDuplicateShadow(mydoc, variantActive, i + 1);
        //mydoc.layers.getByName("Variant " + (i + 2)).visible = false;
    }

    mydoc.activeLayer = mydoc.layerSets["Variant 1"]
    mydoc.activeLayer.visible = true

    ///-------------------------------------------------
    function mainDuplicateShadow(mydoc, variantActive, index) {
        var layerPro = variantActive.layerSets[1];
        var layerShadow = variantActive.layerSets[2];
        var layerVar = mydoc.layers.getByName("Variant " + index);
        var grItemDes = mydoc.layers.getByName("Variant " + index).layerSets.getByName("Item " + index);
        var layerDes = mydoc.layers.getByName("Variant " + index).layerSets.getByName("Shadow " + index);
        if (layerVar.allLocked || layerVar == variantActive) { return; }
        //-----
        var arrLayer = duplicateLayers([layerShadow, layerPro], layerDes);
        arrLayer[0].link(arrLayer[1]);

        var layerProDes = null;
        for (var i = 0; i < grItemDes.artLayers.length; i++) {
            //alert(grItemDes.artLayers[i].name.search("Product"));
            if (grItemDes.artLayers[i].name.search("Product") != (- 1) && hasMask(grItemDes.artLayers[i])) {
                layerProDes = grItemDes.artLayers[i];
                break;
            }
        }
        transFormLayers(arrLayer[1], layerProDes);
        arrLayer[1].remove();
    }
    //------transform layer
    function transFormLayers(layerOrg, layerDes) {
        app.preferences.rulerUnits = Units.PIXELS;
        var doc = app.doc;
        //------get bounds layer des
        var boundsDes = layerDes.bounds;
        var widthDes = boundsDes[2] - boundsDes[0];
        var heightDes = boundsDes[3] - boundsDes[1];
        //------get bounds ORG
        var boundsOrg = layerOrg.bounds;
        var widthOrgAfter = (widthDes / (boundsOrg[2] - boundsOrg[0])) * 100;
        var heightOrgAfter = (heightDes / (boundsOrg[3] - boundsOrg[1])) * 100;
        layerOrg.resize(widthOrgAfter, heightOrgAfter);
        var moveX = boundsDes[0] - layerOrg.bounds[0];
        var moveY = boundsDes[1] - layerOrg.bounds[1];
        layerOrg.translate(moveX, moveY);
    }
    function duplicateLayers(arrLayersOrg, layerDes) {
        var mydoc = app.doc;
        var positionDes = (layerDes.typename == "ArtLayer") ? ElementPlacement.PLACEBEFORE : ElementPlacement.INSIDE;
        if (layerDes.typename == "ArtLayer") {
        }
        var arrLayerRes = [];
        for (var i = 0; i < arrLayersOrg.length; i++) {
            var orgCopy = arrLayersOrg[i].duplicate();
            if (orgCopy.typename == "LayerSet") { orgCopy = orgCopy.merge(); }
            orgCopy.allLocked = false;
            arrLayerRes.push(orgCopy);
            orgCopy.name = "Copy " + i;
            orgCopy.move(layerDes, positionDes);
        }

        return arrLayerRes;
    };

    // ------ check has mask
    function hasMask(layer) {
        app.doc.activeLayer = layer;
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var des = executeActionGet(ref);
        return des.getBoolean(stringIDToTypeID("hasUserMask"));
    }
}

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

//AN di All layer ko xu ly, hooac layer can an.
function visibleGroup(group1, group2, group3) {
    if (group1 == null && group2 == null && group3 == null) {
        if (setSelectedLayer('Variant 2') == true) {
            doc.activeLayer.visible = false;
        }
        if (setSelectedLayer('Variant 3') == true) {
            doc.activeLayer.visible = false;
        }
        if (setSelectedLayer('Variant 4') == true) {
            doc.activeLayer.visible = false;
        }
        if (setSelectedLayer('Variant 5') == true) {
            doc.activeLayer.visible = false;
        }
    } else {
        if (checkLayerName(group1, group2, group3) == true) {
            doc.activeLayer.visible = false;
        }
    }
}
// abc = new colort
function checkClippingMask() {

    result = false
    ///////////
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desc = executeActionGet(ref);
    if (desc.hasKey(charIDToTypeID('Grup')) && desc.getBoolean(charIDToTypeID('Grup'))) {
        result = true
    }
    ///////////
    return result
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

