//By --Duc Hiep-- Academy Pixelz Da Nang City 
// #target photoshop;
app.preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = app.activeDocument;
//MAIN
(function () {
    if (mergeLayer3D(1) == true) {
        copyFolder(1)
    }
})()

function copyFolder(vr) {
    doc.selection.copy()
    lengthVariant = doc.layerSets.length - 2
    for (var i = 1; i <= lengthVariant; i++) {
        if (doc.layerSets["Variant " + i].name != "Variant " + vr) {
            doc.activeLayer = doc.layerSets["Variant " + i].layerSets["Item " + i]
            doc.activeLayer.remove()
            pasteFolder()
            doc.activeLayer.name = "Item " + i
        }
    }
}
function mergeLayer3D(vr) {
    //Class Groups
    grResources = new Groups(["Resources"])
    grVariant = new Groups(["Variant " + vr])
    grColor = new Groups(["Variant " + vr, "Color " + vr])
    grItem = new Groups(["Variant " + vr, "Item " + vr])
    grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
    grBg = new Groups(["Variant " + vr, "Background " + vr])

    grItem.selectGroup()
    result = false
    lengthItem = doc.activeLayer.layers.length
    nameLayerEndItem = doc.activeLayer.layers[lengthItem - 1].name
    const nameLayerClip = []
    for (var i = 0; i < lengthItem; i++) {
        if (doc.activeLayer.layers[i].name.indexOf("(merged)") < 0) {
            if (doc.activeLayer.layers[i].name.search("Product") == 0 && i != lengthItem - 1) {
                namePr = doc.activeLayer.layers[i].name
                doc.activeLayer = doc.activeLayer.layers[i]
                selectGroupLayer(nameLayerEndItem)
                actionMerge2()
                doc.activeLayer = doc.activeLayer.parent
                //visible ege.
                for (var j = i + 1; j < lengthItem + 1; j++) {
                    doc.activeLayer = doc.activeLayer.layers[j]
                    doc.activeLayer.visible = false
                    doc.activeLayer = doc.activeLayer.parent
                }
                result = true
                break
            } else {
                //Remove Clipping mask
                doc.activeLayer = doc.activeLayer.layers[i]
                if (checkClippingMask() == true) {
                    nameLayerClip.push(doc.activeLayer.name)
                    unClippingMask()
                }
                doc.activeLayer = doc.activeLayer.parent
            }//end search Product
        } else {
            break
        }
    }
    //Clipping Mask
    if (nameLayerClip.length != 0) {
        doc.activeLayer = doc.activeLayer.artLayers[nameLayerClip[0]]
        selectGroupLayer(nameLayerClip[nameLayerClip.length - 1])
        clippingMask()
        doc.activeLayer = doc.activeLayer.parent
    }
    return result
}

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

function clippingMask() {
    var idGrpL = charIDToTypeID("GrpL");
    var desc536 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref218 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref218.putEnumerated(idLyr, idOrdn, idTrgt);
    desc536.putReference(idnull, ref218);
    executeAction(idGrpL, desc536, DialogModes.NO);

}
function selectGroupLayer(after) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var list = new ActionList();
    var reference = new ActionReference();

    reference.putName(s2t("layer"), after);
    descriptor.putReference(c2t("null"), reference);
    descriptor.putEnumerated(s2t("selectionModifier"), s2t("selectionModifierType"), s2t("addToSelectionContinuous"));
    descriptor.putBoolean(s2t("makeVisible"), false);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

function actionMerge2() {
    var idMrgtwo = charIDToTypeID("Mrg2");
    var desc31 = new ActionDescriptor();
    var idDplc = charIDToTypeID("Dplc");
    desc31.putBoolean(idDplc, true);
    executeAction(idMrgtwo, desc31, DialogModes.NO);
}

function pasteFolder() {
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


//Object Group in photoshops
function Groups(nameGroup) {
    if (typeof nameGroup === "string") {
        try {
            this.nameGroup = doc.layerSets[nameGroup]
            this.lengthGroup = this.nameGroup.layers.length
        } catch (error) {
            this.nameGroup = nameGroup
        }
    } else if (typeof nameGroup === "object") {
        lengthNameGroup = nameGroup.length
        switch (lengthNameGroup) {
            case 1:
                try {
                    this.nameGroup = doc.layerSets[nameGroup[0]]
                    this.lengthGroup = this.nameGroup.layers.length
                } catch (error) {
                    this.nameGroup = nameGroup[0]
                }
                break;
            case 2:
                try {
                    this.nameGroup = doc.layerSets[nameGroup[0]].layerSets[nameGroup[1]]
                    this.lengthGroup = this.nameGroup.layers.length
                } catch (error) {
                    this.nameGroup = nameGroup[1]

                }
                break;
            case 3:
                try {
                    this.nameGroup = doc.layerSets[nameGroup[0]].layerSets[nameGroup[1]].layerSets[nameGroup[2]]
                    this.lengthGroup = this.nameGroup.layers.length
                } catch (error) {
                    this.nameGroup = nameGroup[2]
                }
                break;
            default:
                break;
        }
    } else {
        alert("undefine")
    }

    //Ghi de nameGroup
    this.replaceNameGroup = function (replaceNameGroup) {
        if (typeof replaceNameGroup === "string") {
            try {
                this.nameGroup = doc.layerSets[replaceNameGroup]
                this.lengthGroup = this.nameGroup.layers.length
            } catch (error) {
                this.nameGroup = replaceNameGroup
            }
        } else if (typeof replaceNameGroup === "object") {
            lengthNameGroup = replaceNameGroup.length
            switch (lengthNameGroup) {
                case 1:
                    try {
                        this.nameGroup = doc.layerSets[replaceNameGroup[0]]
                        this.lengthGroup = this.nameGroup.layers.length
                    } catch (error) {
                        this.nameGroup = replaceNameGroup[0]
                    }
                    break;
                case 2:
                    try {
                        this.nameGroup = doc.layerSets[replaceNameGroup[0]].layerSets[replaceNameGroup[1]]
                        this.lengthGroup = this.nameGroup.layers.length
                    } catch (error) {
                        this.nameGroup = replaceNameGroup[1]

                    }
                    break;
                case 3:
                    try {
                        this.nameGroup = doc.layerSets[replaceNameGroup[0]].layerSets[replaceNameGroup[1]].layerSets[replaceNameGroup[2]]
                        this.lengthGroup = this.nameGroup.layers.length
                    } catch (error) {
                        this.nameGroup = replaceNameGroup[2]
                    }
                    break;
                default:
                    break;
            }
        } else {
            alert("undefine")
        }
    }

    //Select Group
    this.selectGroup = function () {
        if (this.nameGroup.visible == false) {
            try {
                doc.activeLayer = this.nameGroup
                this.nameGroup.visible = false
                return true
            } catch (error) {
                return false
            }
        } else {
            try {
                doc.activeLayer = this.nameGroup
                return true
            } catch (error) {
                return false
            }
        }

    }

    //Tắt mắt Group
    this.hideGroup = function () {
        this.nameGroup.visible = false
    }

    //Mở mắt group
    this.unHiddenGroup = function () {
        this.nameGroup.visible = true
    }

    //Xóa group
    this.deleteGroup = function () {
        this.nameGroup.remove()
    }

    //Tạo group
    this.createGroup = function () {
        doc.layerSets.add().name = nameGroup
    }

    //search Layer in group
    this.searchLayerInGroup = function name(nameLayer) {
        result = false
        this.selectGroup()
        lengthItem = doc.activeLayer.layers.length
        for (var i = 0; i < lengthItem; i++) {
            if (doc.activeLayer.layers[i].name.search(nameLayer) == 0) {
                locationLayer = i
                result = true
                break
            } else {
                locationLayer = ""
                result = false
            }
        }
        return [result, locationLayer]
    }
    //select layer in Group
    this.selectLayer = function (nameLayer) {
        this.selectGroup()
        locationLayer = this.searchLayerInGroup(nameLayer)
        try {
            nameLayer = doc.activeLayer.artLayers[locationLayer[1]]
        } catch (error) {
            return false
        }

        if (nameLayer.visible == false) {
            try {
                doc.activeLayer = nameLayer
                doc.activeLayer.visible = false
                return true
            } catch (error) {
                return false
            }
        } else {
            try {
                doc.activeLayer = nameLayer
                return true
            } catch (error) {
                return false
            }
        }
    }

    //xoa layer
    this.deleteLayer = function name(nameLayer) {
        this.selectGroup().artLayers[nameLayer].remove()
    }
}