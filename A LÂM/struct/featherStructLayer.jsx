//By --Duc Hiep-- Academy Pixelz Da Nang City 
// #target photoshop;
app.preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = app.activeDocument;
const featherMask = .5;
(function () {
    run("Masks")
    run("Working")
    purgeAll()
    // alert("Done!")
    function run(nameGroup) {
        grLayers = new Groups([nameGroup])
        grLayers.selectGroup()
        lengthGroup = doc.activeLayer.layers.length
        if (lengthGroup > 0) {
            processingFeatherLayers(lengthGroup)
        }
    }
})()

//Function call Back reset feather layerSet.
function processingFeatherLayers(lengthLayer) {
    //If exits mask
    if (hasMask()) {
        setFeatherMask(featherMask)
    }
    if (lengthLayer > 0) {
        for (var i = 0; i < lengthLayer; i++) {
            //Select layer/group
            if (doc.activeLayer.layers[i].visible == false) {
                //Check exits clipping mask
                if (doc.activeLayer.layers[i].grouped == true) {
                    var x = i
                    //If layer parent clipping mask hide ege
                    if (doc.activeLayer.layers[x + 1].visible == false) {
                        doc.activeLayer = doc.activeLayer.layers[i]
                        doc.activeLayer.visible = false
                        doc.activeLayer.parent.layers[x + 1].visible = false
                    } else {
                        doc.activeLayer = doc.activeLayer.layers[i]
                        doc.activeLayer.visible = false
                    }
                } else {//Not exits clipping mask
                    doc.activeLayer = doc.activeLayer.layers[i]
                    doc.activeLayer.visible = false
                }

            } else {
                //Check exits clipping mask
                if (doc.activeLayer.layers[i].grouped == true) {
                    var x = i
                    //If layer parent clipping mask hide ege
                    if (doc.activeLayer.layers[x + 1].visible == false) {
                        doc.activeLayer = doc.activeLayer.layers[i]
                        doc.activeLayer.parent.layers[x + 1].visible = false
                    } else {
                        doc.activeLayer = doc.activeLayer.layers[i]
                    }
                } else {//Not exits clipping mask
                    doc.activeLayer = doc.activeLayer.layers[i]
                }
            }

            //If exist mask on layer/group
            if (hasMask()) {
                //Reset value feather radius to const nomination
                setFeatherMask(featherMask)
                //Check if a LayerSet and length than 0
                if (doc.activeLayer.typename == "LayerSet" && doc.activeLayer.layers.length > 0) {
                    //Call back function recursive
                    processingFeatherLayers(doc.activeLayer.layers.length)
                } else {
                    //Go back layerSet parent.
                    goBackIfLayer()
                }
            } else {//if not exist on layer/Group
                //Check if a LayerSet and length than 0
                if (doc.activeLayer.typename == "LayerSet" && doc.activeLayer.layers.length > 0) {
                    processingFeatherLayers(doc.activeLayer.layers.length)
                } else {
                    //Go back layerSet parent.
                    goBackIfLayer()
                }
            }//End if HasMask

            //Go back layerSet end For.
            if (i == lengthLayer - 1) {
                try {
                    goBackIfLayer()
                } catch (error) {
                    break
                }
            }
            function goBackIfLayer(){
                 //Go back layerSet parent.
                 if (doc.activeLayer.parent.visible == false) {
                    doc.activeLayer = doc.activeLayer.parent
                    doc.activeLayer.visible = false
                } else {
                    doc.activeLayer = doc.activeLayer.parent
                }
            }
        }//End for
    }
}

///function
function hasMask() {
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desGet = executeActionGet(ref);
    return desGet.getBoolean(stringIDToTypeID("hasUserMask"));
}

//Group layer
function setFeatherMask(userMaskFeather) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putUnitDouble(s2t("userMaskFeather"), s2t("pixelsUnit"), userMaskFeather);
    descriptor.putObject(s2t("to"), s2t("layer"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}
function purgeAll() {
    var idPrge = charIDToTypeID("Prge");
    var desc7726 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var idPrgI = charIDToTypeID("PrgI");
    var idAl = charIDToTypeID("Al  ");
    desc7726.putEnumerated(idnull, idPrgI, idAl);
    executeAction(idPrge, desc7726, DialogModes.NO);
}

//Object Group in photoshops
function Groups(nameGroup) {
    var doc = app.activeDocument
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
    this.createGroup = function (nameGroup) {
        doc.layerSets.add().name = nameGroup
    }

    this.moveGroup = function () {
        doc.activeLayer.move()
        // app.activeDocument.activeLayer.move( currentLayer, ElementPlacement.PLACEATEND ); // move i
        // var currentLayer = app.activeDocument.activeLayer; // get just moved layer
        // app.activeDocument.activeLayer.move( currentLayer, ElementPlacement.PLACEATEND ); // move it

        // doc.activeLayer.move(doc.layerSets.getByname("Resources"), ElementPlacement.INSIDE);
    }

    //search Layer in group
    this.searchLayerInGroup = function name(nameLayer) {
        result = false
        this.selectGroup()
        lengthItem = doc.activeLayer.layers.length
        for (var i = 0; i < lengthItem; i++) {
            if (doc.activeLayer.layers[i].name.search(nameLayer) >= 0) {
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
        this.selectGroup()
        doc.activeLayer.artLayers[nameLayer].remove()
    }
}
