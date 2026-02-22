
//by Duchiep_academy Pixelz Da Nang -- hiepcdit@gmail.com ...............................
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = app.activeDocument
main(1)
function main(vr) {
    grVariant = new Groups(["Variant " + vr])
    grColor = new Groups(["Variant " + vr, "Color " + vr])
    grItem = new Groups(["Variant " + vr, "Item " + vr])
    grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
    grBg = new Groups(["Variant " + vr, "Background " + vr])
    grResource = new Groups(["Resources"])
    grBACKGROUND = new Groups(['BACKGROUND'])

    grResource.selectGroup()
    grResource.deleteGroup()
    grBg.deleteGroup()
    grBACKGROUND.selectLayer("Black")
    doc.activeLayer.remove()
    grBACKGROUND.selectLayer("White")
    doc.activeLayer.name = "255"
    doc.activeLayer = doc.activeLayer.parent
    doc.activeLayer.name = "Background colors"

    //Check exits name Garment or Bottom or Top
    if (grItem.selectLayer("Garment") == true) {
        nameLayerProcess = doc.activeLayer.name.slice(1)
        loadSelectionMask()
        // saveChannel(nameLayerProcess)
        doc.activeLayer.remove()
        grColor.selectGroup()
        addMask()
        doc.activeLayer.name = nameLayerProcess
        addGroup()
        doc.activeLayer.name = "Product"
        doc.selection.selectAll()
        addMask()
    }

    if (grItem.selectLayer("Bottom") == true) {
        nameLayerProcess = doc.activeLayer.name.slice(1)
        loadSelectionMask()
        // saveChannel(nameLayerProcess)
        doc.activeLayer.remove()
        grColor.selectGroup()
        addMask()
        doc.activeLayer.name = nameLayerProcess
        addGroup()
        doc.activeLayer.name = "Product"
        doc.selection.selectAll()
        addMask()
    }

    if (grItem.selectLayer("Top") == true) {
        nameLayerProcess = doc.activeLayer.name.slice(1)
        loadSelectionMask()
        // saveChannel(nameLayerProcess)
        doc.activeLayer.remove()
        grColor.selectGroup()
        addMask()
        doc.activeLayer.name = nameLayerProcess
        addGroup()
        doc.activeLayer.name = "Product"
        doc.selection.selectAll()
        addMask()
    }

    if (grItem.selectLayer("Stencil") == true) {
        var bounds = doc.activeLayer.bounds
        crop(bounds[1], bounds[0], bounds[3], bounds[2])
        doc.activeLayer.remove()
    }

    if (grItem.selectLayer("Product") == true) {
        if (hasMask()) {
            loadSelectionMask()
            deleteMask()
            doc.activeLayer.name = "Model base"
            doc.activeLayer = doc.activeLayer.parent
            addMask()
        }
    }
    //Chạy sau khi kiểm tra.
    //shadow
    grShadow.selectGroup()
    lengthGrShadow = doc.activeLayer.layers.length
    if (lengthGrShadow > 0) {
        doc.activeLayer = doc.activeLayer.artLayers[0]
        doc.activeLayer.desaturate()
        if (hasMask()) {
            loadSelectionMask()
            deleteMask()
            doc.activeLayer.name = "Shadow"
            doc.activeLayer = doc.activeLayer.parent
            addMask()
            doc.activeLayer.name = "Shadow"
        }
    } else {
        doc.selection.selectAll()
        addMask()
        doc.activeLayer.name = "Shadow"
    }

    //Item
    //Đưa về Cáu trúc 2 layer trong group ITem
    grItem.selectGroup()
    lengGrItem = doc.activeLayer.layers.length
    if (lengGrItem > 2) {
        i = 0
        while (lengGrItem > 2) {
            doc.activeLayer = doc.activeLayer.artLayers[i]
            doc.activeLayer.merge()
            doc.activeLayer.name = "Clean up Model"
            lengGrItem = lengGrItem - 1
            doc.activeLayer = doc.activeLayer.parent
        }
    } else {
        doc.activeLayer.artLayers[0].name = "Clean up Model"
    }

    doc.activeLayer.name = "Model"

    //
    grVariant.selectGroup()
    unGroup()

}

function hasMask() {
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desGet = executeActionGet(ref);
    return desGet.getBoolean(stringIDToTypeID("hasUserMask"));
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

//crop hinh
function crop(top, left, bottom, right) {
    var idCrop = charIDToTypeID("Crop");
    var desc11 = new ActionDescriptor();
    var idT = charIDToTypeID("T   ");
    var desc12 = new ActionDescriptor();
    var idTop = charIDToTypeID("Top ");
    var idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idTop, idPxl, top);
    var idLeft = charIDToTypeID("Left");
    var idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idLeft, idPxl, left);
    var idBtom = charIDToTypeID("Btom");
    var idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idBtom, idPxl, bottom);
    var idRght = charIDToTypeID("Rght");
    var idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idRght, idPxl, right);
    var idRctn = charIDToTypeID("Rctn");
    desc11.putObject(idT, idRctn, desc12);
    var idAngl = charIDToTypeID("Angl");
    var idAng = charIDToTypeID("#Ang");
    desc11.putUnitDouble(idAngl, idAng, 0.000000);
    var idDlt = charIDToTypeID("Dlt ");
    desc11.putBoolean(idDlt, false);
    var idcropAspectRatioModeKey = stringIDToTypeID("cropAspectRatioModeKey");
    var idcropAspectRatioModeClass = stringIDToTypeID("cropAspectRatioModeClass");
    var idtargetSize = stringIDToTypeID("targetSize");
    desc11.putEnumerated(idcropAspectRatioModeKey, idcropAspectRatioModeClass, idtargetSize);
    executeAction(idCrop, desc11, DialogModes.NO);
}

function addGroup() {
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
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}


function unGroup() {
    var idungroupLayersEvent = stringIDToTypeID("ungroupLayersEvent");
    var desc855 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref532 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref532.putEnumerated(idLyr, idOrdn, idTrgt);
    desc855.putReference(idnull, ref532);
    executeAction(idungroupLayersEvent, desc855, DialogModes.NO);

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
//save selection Channel
function saveChannel(name) {
    var desc977 = new ActionDescriptor()
    var ref38 = new ActionReference()
    ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"))
    desc977.putReference(charIDToTypeID("null"), ref38)
    desc977.putString(charIDToTypeID("Nm  "), name);
    executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO)
    return activeDocument.channels.getByName(name)
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
