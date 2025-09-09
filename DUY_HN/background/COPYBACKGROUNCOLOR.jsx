//By --Duc Hiep-- Academy Pixelz Da Nang City 
// #target photoshop;
app.preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = app.activeDocument;
//MAIN
(function () {
    saveSelectionFloor(4)
    copyStrucColor(3)
    pasteStructLayerColor(4)
})()

function saveSelectionFloor(vr) {
    //Class Groups
    grResources = new Groups(["Resources"])
    grVariant = new Groups(["Variant " + vr])
    grColor = new Groups(["Variant " + vr, "Color " + vr])
    grItem = new Groups(["Variant " + vr, "Item " + vr])
    grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
    grBg = new Groups(["Variant " + vr, "Background " + vr])

    if (grItem.searchLayerInGroup("#Floor")[0] == true) {
        grItem.selectLayer("#Floor")
        if (hasMask() && loadSelectionMask() == true) {
            saveSelection("Floor_colorBG")
            grItem.selectGroup()
            lengthItem = doc.activeLayer.layers.length
            for (var i = 0; i < lengthItem; i++) {
                if (doc.activeLayer.layers[i].name.search("Product") == 0) {
                    doc.activeLayer = doc.activeLayer.artLayers[i]
                    if (hasMask()) {
                        loadSelectionMask()
                        doc.selection.invert()
                        doc.selection.contract(1)
                        subtractSelection("Floor_colorBG")
                        saveSelection("Pr_WarBG")
                        doc.selection.deselect()
                        break
                    } else {
                        alert("Không tồn tại mask!")
                    }
                }//end search Product
            }
        }
    }
}
function pasteStructLayerColor(vr) {
    //Class Groups
    grResources = new Groups(["Resources"])
    grVariant = new Groups(["Variant " + vr])
    grColor = new Groups(["Variant " + vr, "Color " + vr])
    grItem = new Groups(["Variant " + vr, "Item " + vr])
    grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
    grBg = new Groups(["Variant " + vr, "Background " + vr])

    doc.selection.copy()
    grColor.selectGroup()
    doc.activeLayer = doc.activeLayer.artLayers[0]
    pasteFolder()

    doc.activeLayer = doc.activeLayer.parent
    length = doc.activeLayer.artLayers.length

    //update mask
    for (var i = 0; i < length; i++) {
        nameLayer = doc.activeLayer.artLayers[i].name
        if (nameLayer.search("BG_Floor") == 0 || nameLayer.search("BG_Wall") == 0) {
            //Nếu là Nền
            if (nameLayer.search("BG_Floor") == 0) {
                doc.activeLayer = doc.activeLayer.artLayers[i]
                deleteMask()
                doc.selection.load(doc.channels.getByName("Floor_colorBG"))
                addMask()
                //Nếu là Tường
            } else {
                doc.activeLayer = doc.activeLayer.artLayers[i]
                deleteMask()
                doc.selection.load(doc.channels.getByName("Pr_WarBG"))
                addMask()
            }
            doc.activeLayer = doc.activeLayer.parent
        }
    }

    try { doc.channels.getByName("Pr_WarBG").remove(); } catch (err) { }
    try { doc.channels.getByName("Floor_colorBG").remove(); } catch (err) { }
}
function copyStrucColor(vr) {
    //Class Groups
    grResources = new Groups(["Resources"])
    grVariant = new Groups(["Variant " + vr])
    grColor = new Groups(["Variant " + vr, "Color " + vr])
    grItem = new Groups(["Variant " + vr, "Item " + vr])
    grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
    grBg = new Groups(["Variant " + vr, "Background " + vr])

    grColor.selectGroup()
    lengthItem = doc.activeLayer.layers.length
    nameLayerEndItem = doc.activeLayer.layers[lengthItem - 1].name
    for (var i = 0; i < lengthItem; i++) {
        if (doc.activeLayer.layers[i].name.search("BG_Floor_Blend_ece8e0") == 0 || doc.activeLayer.layers[i].name.search("BG_Wall_Blend_ece8e0") == 0) {
            namePr = doc.activeLayer.layers[i].name
            doc.activeLayer = doc.activeLayer.layers[i]
            selectGroupLayer("BG_Wall_Curves")
            break
        } //end search BG_Floor_Blend_ece8e0
    }
    //Clipping Mask
}

function checkClippingMask() {

    result = false
    ///////////
    var ref = new ActionReference();
    ref.
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desc = executeActionGet(ref);
    if (desc.hasKey(charIDToTypeID('Grup')) && desc.getBoolean(charIDToTypeID('Grup'))) {
        result = true
    }
    ///////////
    return result
}
//check Mask
function hasMask() {
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desGet = executeActionGet(ref);
    return desGet.getBoolean(stringIDToTypeID("hasUserMask"));
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

//load selection mask
function loadSelectionMask() {
    try {
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
    } catch (error) {
    }

    return hasSelection() ? true : false
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

//add mask
function addMask() {
    var idMk = charIDToTypeID("Mk  ");
    var desc358 = new ActionDescriptor();
    var idNw = charIDToTypeID("Nw  ");
    var idChnl = charIDToTypeID("Chnl");
    desc358.putClass(idNw, idChnl);
    var idAt = charIDToTypeID("At  ");
    var ref208 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref208.putEnumerated(idChnl, idChnl, idMsk);
    desc358.putReference(idAt, ref208);
    var idUsng = charIDToTypeID("Usng");
    var idUsrM = charIDToTypeID("UsrM");
    var idRvlS = charIDToTypeID("RvlS");
    desc358.putEnumerated(idUsng, idUsrM, idRvlS);
    executeAction(idMk, desc358, DialogModes.NO);
}
//NẾU TỒN TẠI SELECTION
function hasSelection() {
    var hasSelection = false;
    try {
        var ref = new ActionReference();
        ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("selection"));
        ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
        var desc = executeActionGet(ref);
        if (desc.count) {
            hasSelection = true;
        }
    } catch (e) { }
    return hasSelection;
}

//save vung chon
function saveSelection(name2) {
    if (name2 != null) {
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
        executeAction(s2t("duplicate"), descriptor, DialogModes.NO);
    }
}


//trừ vung chon
function subtractSelection(selection) {
    var idSbtr = charIDToTypeID("Sbtr");
    var desc1271 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref423 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    ref423.putName(idChnl, selection);
    desc1271.putReference(idnull, ref423);
    var idFrom = charIDToTypeID("From");
    var ref424 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref424.putProperty(idChnl, idfsel);
    desc1271.putReference(idFrom, ref424);
    executeAction(idSbtr, desc1271, DialogModes.NO);
}


function selectRGB() {
    var idslct = charIDToTypeID("slct");
    var desc452 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref98 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idRGB = charIDToTypeID("RGB ");
    ref98.putEnumerated(idChnl, idChnl, idRGB);
    desc452.putReference(idnull, ref98);
    var idMkVs = charIDToTypeID("MkVs");
    desc452.putBoolean(idMkVs, false);
    executeAction(idslct, desc452, DialogModes.NO);
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
}