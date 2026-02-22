//by Duchiep_academy Pixelz Da Nang -- hiepcdit@gmail.com ...............................
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = app.activeDocument

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
}

//Object Layer in photoshops

function Layer(nameLayer) {

    try {
        this.nameLayer = doc.activeLayer.artLayers[nameLayer]
    } catch (error) {

    }

    //Select layer
    this.selectLayer = function (nameLayer) {
        try {
            this.nameLayer = doc.activeLayer.artLayers[nameLayer]
        } catch (error) {
            return false
        }
        if (this.nameLayer.visible == false) {
            try {
                doc.activeLayer = this.nameLayer
                doc.activeLayer.visible = false
                return true
            } catch (error) {
                return false
            }
        } else {
            try {
                doc.activeLayer = this.nameLayer
                return true
            } catch (error) {
                return false
            }
        }

    }

    //Hidden layer
    this.hideLayer = function () {
        doc.activeLayer.visible = false
    }

    //UnHidden layer
    this.unHiddenLayer = function () {
        doc.activeLayer.visible = true
    }

    //Delete layer
    this.deleteLayer = function () {
        doc.activeLayer.remove()
    }

    //Create layer
    this.createLayer = function (nameLayer) {
        doc.activeLayer.add().name = nameLayer
    }

    //Replace nameLayer
    this.replaceNameLayer = function (replaceNameLayer) {
        doc.activeLayer.name = replaceNameLayer
    }


}

saveMaskToChannel(1,"Desaturate_CubeObject")

function saveMaskToChannel(vr, nameMask) {

    grVariant = new Groups(["Variant " + vr])
    grColor = new Groups(["Variant " + vr, "Color " + vr])
    grItem = new Groups(["Variant " + vr, "Item " + vr])
    grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
    grBg = new Groups(["Variant " + vr, "Background " + vr])
    layer = new Layer("abc")


    grItem.selectGroup()
    length = doc.activeLayer.layers.length
    for (var i = 0; i < length; i++) {
        nameLayer = doc.activeLayer.layers[i].name
        if ((nameLayer.search("#Cube") == 0)) {
            doc.activeLayer = doc.activeLayer.artLayers[i]
            if (hasMask()) {
                loadSelectionMask()
                doc.activeLayer.remove()
                grColor.selectGroup()
                setHue(false, 0, -100, 0)
                doc.activeLayer.name = nameMask
                break
            } else {
                doc.activeLayer.remove()
                break
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


function setHue(colorize, hue, Strt, lightness) {
    makeHueColor();
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var list = new ActionList();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    descriptor2.putBoolean(s2t("colorize"), colorize);
    descriptor3.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
    descriptor3.putInteger(s2t("hue"), hue);
    descriptor3.putInteger(c2t("Strt"), Strt);
    descriptor3.putInteger(s2t("lightness"), lightness);
    list.putObject(s2t("hueSatAdjustmentV2"), descriptor3);
    descriptor2.putList(s2t("adjustment"), list);
    descriptor.putObject(s2t("to"), s2t("hueSaturation"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

//Tạo layer Hue
function makeHueColor() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("adjustmentLayer"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putEnumerated(s2t("color"), s2t("color"), s2t("red"));
    descriptor3.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
    descriptor3.putBoolean(s2t("colorize"), false);
    descriptor2.putObject(s2t("type"), s2t("hueSaturation"), descriptor3);
    descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}