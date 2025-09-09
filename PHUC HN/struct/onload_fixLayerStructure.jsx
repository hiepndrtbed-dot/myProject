
//by Duchiep_academy Pixelz Da Nang -- hiepcdit@gmail.com ...............................
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = app.activeDocument

main()
function main() {
    clearChannel()
    removePath()
    processingGroup("Grain")
    processingGroup("Color", "cc", "oa")
    //Layer R1
    doc.activeLayer = doc.artLayers["R1"]
    doc.activeLayer.opacity = 100
    try { clearStyle() } catch (error) { }
    purgeAll()
}

function processingGroup(groupParent, childGroup, child2Group) {
    grParent = new Groups([groupParent])
    GrChild = new Groups([groupParent, childGroup])
    GrChild2 = new Groups([groupParent, child2Group])

    grParent.selectGroup()
    //Group Grain
    if (groupParent == "Grain") {
        doc.activeLayer.visible = true 
        doc.activeLayer.opacity = 100
        ChildLayer = doc.activeLayer.artLayers[0]
        if (ChildLayer.name == "Grain - Grayscale") {
            doc.activeLayer = ChildLayer
            //Kiểm tra layer hiện tại phải SMART OBJECT
            if (ChildLayer.kind == "LayerKind.SMARTOBJECT") {
                doc.activeLayer.opacity = 70
                doc.activeLayer.blendMode = BlendMode.SOFTLIGHT
            } else {
                doc.activeLayer.opacity = 70
            }
        } else if ("Grain - Color") {
            doc.activeLayer = ChildLayer
            //Kiểm tra layer hiện tại phải SMART OBJECT
            if (ChildLayer.kind == "LayerKind.SMARTOBJECT") {
                doc.activeLayer.opacity = 25
                doc.activeLayer.blendMode = BlendMode.LINEARLIGHT
            } else {
                doc.activeLayer.opacity = 25
            }
        }
    }//End if check GroupParent

    //Group Color
    if (groupParent == "Color") {
        doc.activeLayer.visible = true
        doc.activeLayer.opacity = 100
        //Group cc
        if (childGroup == "cc") {
            if (GrChild.selectGroup() == true) {
                doc.activeLayer.visible = true
                doc.activeLayer.opacity = 100
                grChildGroupCC = doc.activeLayer.layerSets
                /* Xử lý các yêu cầu
                        1. Mở mắt layer
                        2. Opacity 100
                        3. BlendMode layer
                        4. Feather layer
                        5. Clear style
                        6. Ẩn layer bên trong Group CC
                        7. Xóa tất cả vùng chọn trong channel (Nếu có)
                        8. Xóa tất cả các path không phải tên Crop
                   */
                for (var j = 0; j < grChildGroupCC.length; j++) {
                    doc.activeLayer = grChildGroupCC[j]
                    //Nếu Group Tồn tại mask thì xử lý theo yêu cầu trên
                    if (hasMask()) {
                        ChildLayer = doc.activeLayer
                        ChildLayer.visible = true
                        ChildLayer.opacity = 100
                        ChildLayer.blendMode = BlendMode.PASSTHROUGH
                        setFeatherMask(1)
                        linkMask(true)
                        try { clearStyle() } catch (error) { }
                    }

                    //Kiểm tra bên trong có Group con hay không
                    ChildLayer = doc.activeLayer.layerSets
                    if (ChildLayer.length > 0) {
                        i = 0
                        while (i < ChildLayer.length) {
                            ChildLayer[i].visible = true
                            ChildLayer[i].opacity = 100
                            ChildLayer[i].blendMode = BlendMode.PASSTHROUGH
                            doc.activeLayer = ChildLayer[i]
                            setFeatherMask(1)
                            linkMask(true)
                            try { clearStyle() } catch (error) { }
                            i = i + 1
                        }
                        doc.activeLayer = doc.activeLayer.parent
                        nameCurentGroup = doc.activeLayer.name
                        ungroupLayersEvent()
                        makeGroup(nameCurentGroup)
                    }
                }
                //Quay ve group CC
                GrChild.selectGroup()
                ungroupLayersEvent()
                makeGroup(childGroup)
            }
        }
        //Group oa
        if (child2Group == "oa") {
            if (GrChild2.selectGroup() == true) {
                doc.activeLayer.visible = true
                doc.activeLayer.opacity = 100
                grChildGroupCC = doc.activeLayer.layerSets
                /* Xử lý các yêu cầu
                        1. Mở mắt layer
                        2. Opacity 100
                        3. BlendMode layer
                        4. Feather layer
                        5. Clear style
                        6. Ẩn layer bên trong Group CC
                        7. Xóa tất cả vùng chọn trong channel (Nếu có)
                        8. Xóa tất cả các path không phải tên Crop
                   */
                for (var j = 0; j < grChildGroupCC.length; j++) {
                    doc.activeLayer = grChildGroupCC[j]
                    //Nếu Group Tồn tại mask thì xử lý theo yêu cầu trên
                    if (hasMask()) {
                        ChildLayer = doc.activeLayer
                        ChildLayer.visible = true
                        ChildLayer.opacity = 100
                        ChildLayer.blendMode = BlendMode.PASSTHROUGH
                        setFeatherMask(1)
                        linkMask(true)
                        try { clearStyle() } catch (error) { }
                    }

                    //Kiểm tra bên trong có Group con hay không
                    ChildLayer = doc.activeLayer.layerSets
                    if (ChildLayer.length > 0) {
                        i = 0
                        while (i < ChildLayer.length) {
                            ChildLayer[i].visible = true
                            ChildLayer[i].opacity = 100
                            ChildLayer[i].blendMode = BlendMode.PASSTHROUGH
                            doc.activeLayer = ChildLayer[i]
                            setFeatherMask(1)
                            linkMask(true)
                            try { clearStyle() } catch (error) { }
                            i = i + 1
                        }
                        doc.activeLayer = doc.activeLayer.parent
                        nameCurentGroup = doc.activeLayer.name
                        ungroupLayersEvent()
                        makeGroup(nameCurentGroup)
                    }
                }
                //Quay ve group CC 
                GrChild2.selectGroup()
                makeGroup(child2Group)
                doc.activeLayer = doc.activeLayer.layers[child2Group]
                ungroupLayersEvent()
            }
        }
    }
}

//Ham clear channel
function clearChannel() {
    doc.channels.removeAll()
}

//Remove path
function removePath() {
    lengthPath = doc.pathItems.length
    for (i = 0; i < lengthPath; i++) {
        if (doc.pathItems[i].name != "Crop (Capture One)") {
            doc.pathItems[i].remove()
            i--
            lengthPath--
        }
    }
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
//Ham unlink layer mask
function linkMask(bol) {
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
    descriptor2.putBoolean(s2t("userMaskLinked"), bol);
    descriptor.putObject(s2t("to"), s2t("layer"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO)
}

//Ham ungroup layer
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
//Group layer
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
    executeAction(s2t("make"), descriptor, DialogModes.NO);
    doc.activeLayer.name = name2
}

//Ham clear list style
function clearStyle() {
    var iddisableLayerStyle = stringIDToTypeID("disableLayerStyle");
    var desc30 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref4 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref4.putEnumerated(idLyr, idOrdn, idTrgt);
    desc30.putReference(idnull, ref4);
    executeAction(iddisableLayerStyle, desc30, DialogModes.NO);
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

//check Mask
function hasMask() {
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desGet = executeActionGet(ref);
    return desGet.getBoolean(stringIDToTypeID("hasUserMask"));
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
        this.selectGroup()
        doc.activeLayer.artLayers[nameLayer].remove()
    }
}
