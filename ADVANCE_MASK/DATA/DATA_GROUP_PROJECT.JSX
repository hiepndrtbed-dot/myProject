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

groupResources = new Groups(["Resources"])
groupVariant = new Groups(["Variant"])
layer = new Layer("abc")

groupVariant.replaceNameGroup(["Variant 1", "Item 1"])
groupVariant.selectGroup()
layer.selectLayer("Product")
// layer.hideLayer()


function selectListLayer(before, after) {
    var idslct = charIDToTypeID("slct");
    var desc418 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref53 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref53.putName(idLyr, after);
    desc418.putReference(idnull, ref53);
    var idselectionModifier = stringIDToTypeID("selectionModifier");
    var idselectionModifierType = stringIDToTypeID("selectionModifierType");
    var idaddToSelectionContinuous = stringIDToTypeID("addToSelectionContinuous");
    desc418.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelectionContinuous);
    var idMkVs = charIDToTypeID("MkVs");
    desc418.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    executeAction(idslct, desc418, DialogModes.NO);
}