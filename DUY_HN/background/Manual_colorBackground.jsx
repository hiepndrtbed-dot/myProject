//By academy Pixel - Duc Hiep: hiepcdit@gmail.com 
//version 1.0
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = app.activeDocument

ColorBackground(1)
function ColorBackground(vr, color) {
    //Class Groups
    grResources = new Groups(["Resources"])
    grVariant = new Groups(["Variant " + vr])
    grColor = new Groups(["Variant " + vr, "Color " + vr])
    grItem = new Groups(["Variant " + vr, "Item " + vr])
    grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
    grBg = new Groups(["Variant " + vr, "Background " + vr])

    lengthVariant = doc.layerSets.length - 2
    for (var i = 1; i <= lengthVariant; i++) {
        doc.activeLayer = doc.layerSets["Variant " + i]
        nameVariant = doc.activeLayer.name
        if (nameVariant == "Variant " + vr) {
            doc.activeLayer.visible = true
        } else {
            doc.activeLayer.visible = false
        }
    }
    grVariant.selectGroup()
    doc.activeLayer.visible = true
    grResources.selectGroup()
    doc.activeLayer.visible = false

    //class layer
    layer = new Layer("abc")
    doc.colorSamplers.removeAll()
    if (grItem.selectLayer("Stencil") == true) {
        doc.activeLayer.visible = false
        bounds = doc.activeLayer.bounds
        crop(bounds[1], bounds[0], bounds[3], bounds[2])
    }
    //Search area light.
    top()
    try { replaceColorBackgroundPointWhite("Pr_WarBG", "BG_Wall_Curves", "BG_Wall_Desat_100", "BG_Wall_Blend_ece8e0", 246, 246, 244) } catch (error) { }
    try { doc.channels.getByName("Temp_SubtractSelection").remove(); } catch (err) { }
    try { doc.channels.getByName("Pr_WarBG").remove(); } catch (err) { }
    try {
        grColor.selectLayer("Layer_tem")
        doc.activeLayer.remove()
    } catch (err) { }

    grResources.selectGroup()
    doc.activeLayer.visible = true
    purgeAll()
    // doc.revealAll()
}//End #ColorBackground

function top() {
    //grItem.selectGroup()
    doc.activeLayer = doc.layerSets["Variant 1"].layerSets["Item 1"]
    lengthItem = doc.activeLayer.layers.length
    for (var i = 0; i < lengthItem; i++) {
        if (doc.activeLayer.layers[i].name.search("Product") == 0) {
            doc.activeLayer = doc.activeLayer.artLayers[i]
            if (hasMask()) { 
                loadSelectionMask()
                doc.selection.invert()
                doc.selection.contract(1)
                saveSelection("Pr_WarBG")
                selectRGB()
                doc.selection.selectAll()
                doc.selection.copy()
                grColor.selectGroup()
                pasteFolder()
                doc.selection.load(doc.channels.getByName("Pr_WarBG"))
                doc.selection.contract(100)
                doc.selection.invert()
                doc.selection.makeWorkPath(1)
                doc.pathItems.getByName("Work Path").makeSelection()
                doc.pathItems.getByName("Work Path").remove()
                saveSelection("Temp_SubtractSelection")
                fillColor(0, 0, 0)
                doc.activeLayer.name = "Layer_tem"
                doc.selection.deselect()
                makeThreshold("light", 255)
                break
            }
        }
    }//End search Product
}

function replaceColorBackgroundPointWhite(channelSelection, nameCurves, nameHueColor, nameSolidColor, red, green, blue) {
    searchPointLightDark()
    doc.selection.deselect()

    //create layer color adjustment
    makeCurves(nameCurves)
    doc.selection.load(doc.channels.getByName(channelSelection))
    doc.selection.invert()
    selectMask()
    fillColor(0, 0, 0)
    doc.selection.deselect()

    // create Hue color adjustment
    makeHueColor(nameHueColor)
    setHue(false, 0, -70, 0)
    doc.selection.load(doc.channels.getByName(channelSelection))
    doc.selection.invert()
    selectMask()
    fillColor(0, 0, 0)
    doc.selection.deselect()

    //Make solid Color 
    makeSolidColor(red, green, blue, nameSolidColor)
    doc.activeLayer.blendMode = BlendMode.COLORBLEND
    doc.selection.load(doc.channels.getByName(channelSelection))
    doc.selection.invert()
    selectMask()
    doc.activeLayer.invert()
    doc.selection.deselect()
    selectRGB()

    horizontalDark = 0
    verticalDark = 0
    horizontalLight = 255
    verticalLight = 255
    inputPoint = 97
    pointLight = doc.colorSamplers[0]
    //Auto layer BG_Wall_Curves
    var rgbLight = {
        hue: Math.floor(pointLight.color.hsb.hue),
        brightness: pointLight.color.hsb.brightness,
        saturation: Math.floor(pointLight.color.hsb.saturation)
    }


    j = 0
    //Nếu phần sáng lớn hơn mẫu
    if (rgbLight.brightness > inputPoint) {
        while (rgbLight.brightness > inputPoint) {
            grColor.selectLayer(nameCurves)
            selectRGB()
            setCurverHightLight(horizontalDark, verticalDark, horizontalLight, verticalLight - j)
            grColor.selectLayer(nameSolidColor)
            selectRGB()
            rgbLight.brightness = pointLight.color.hsb.brightness
            j = j + 1
        }
    } else {
        //Nếu phần sáng bé hơn mẫu
        while (rgbLight.brightness < inputPoint) {
            grColor.selectLayer(nameCurves)
            selectRGB()
            setCurverHightLight(horizontalDark, verticalDark, horizontalLight - j, verticalLight)
            grColor.selectLayer(nameSolidColor)
            selectRGB()
            rgbLight.brightness = pointLight.color.hsb.brightness
            j = j + 1
        }

    }
    doc.colorSamplers.removeAll()
}



function searchPointLightDark() {
    checkSelection = hasSelection()
    if (checkSelection == false) {
        for (var i = 0; i < 128; i = i + 1) {
            level = 250 - i
            setThreshold(level)
            selectRGB()
            colorRange(0, 255, 0, "highlights")
            hasSelection() ? doc.selection.smooth(15) : ""
            hasSelection() ? doc.selection.smooth(15) : ""
            checkSelection = hasSelection()
            if (checkSelection == true) {
                maxNumberLight = 0
                //Kiem tra mau dung chua.
                maxLight = 0
                x = 0

                while (level > maxNumberLight - 2 && maxNumberLight == 0) {
                    maxLight = x
                    //Point light
                    try { pointLight.remove() } catch (error) { }
                    bounds = doc.selection.bounds;
                    x_light = bounds[0] + Math.floor(Math.random() * (bounds[2] - bounds[0]))
                    y_ligth = bounds[1] + Math.floor(Math.random() * (bounds[3] - bounds[1]))
                    x_light < 4 ? x_light = x_light + 5 : ""
                    y_ligth < 4 ? y_ligth = y_ligth + 5 : ""
                    x_light > doc.width - 4 ? x_light = doc.width - 5 : ""
                    y_ligth > doc.heigth - 4 ? y_ligth = doc.heigth - 5 : ""

                    var pointLight = doc.colorSamplers.add([Math.floor(x_light), Math.floor(y_ligth)])

                    // Obtain array of RGB values.
                    var rgbLight = [
                        pointLight.color.rgb.red,
                        pointLight.color.rgb.green,
                        pointLight.color.rgb.blue
                    ]

                    //Tìm số lớn nhất R - G - B
                    for (var i = 0; i < rgbLight.length; i++) {
                        if (maxNumberLight < rgbLight[i]) {
                            maxNumberLight = rgbLight[i]
                        }
                    }
                    if (maxLight == 15) {
                        pointLight.remove()
                        var pointLight = doc.colorSamplers.add([bounds[2] - 15, Math.floor(bounds[1] + 15)])
                        break
                    }

                    x = x + 1

                }//end while
                doc.activeLayer.remove()
                break
            }
        }
    }
    //End search diem sang
}


function searchPointDark() {
    checkSelection = hasSelection()
    if (checkSelection == false) {
        for (var i = 0; i < 255; i = i + 5) {
            level = 165 + i
            setThreshold(level)
            selectRGB()
            colorRange(100, 0, 0, "shadows")
            hasSelection() ? doc.selection.smooth(5) : ""
            hasSelection() ? doc.selection.smooth(5) : ""
            checkSelection = hasSelection()
            if (checkSelection == true) {
                maxNumber = 255
                //Kiem tra mau dung chua.
                while (maxNumber == 255) {
                    //Point light
                    try { pointDark.remove() } catch (error) { }
                    bounds = doc.selection.bounds;
                    x = bounds[0] + Math.floor(Math.random() * (bounds[2] - bounds[0]))
                    y = bounds[1] + Math.floor(Math.random() * (bounds[3] - bounds[1]))
                    x < 4 ? x = x + 5 : ""
                    y < 4 ? y = y + 5 : ""
                    x > doc.width - 4 ? x = doc.width - 5 : ""
                    y > doc.height - 4 ? y = doc.height - 5 : ""

                    var pointDark = doc.colorSamplers.add([Math.floor(x), Math.floor(y)])

                    // Obtain array of RGB values.
                    var rgb = [
                        pointDark.color.rgb.red,
                        pointDark.color.rgb.green,
                        pointDark.color.rgb.blue
                    ]

                    //Tìm số lớn nhất R - G - B
                    bigNumber = 0
                    for (var i = 0; i < rgb.length; i++) {
                        if (bigNumber < rgb[i]) {
                            bigNumber = rgb[i]
                        }
                    }
                    maxNumber = bigNumber
                }//end while
                pointDark.remove()
                doc.activeLayer.remove()
                doc.activeLayer.remove()
                break
            }
        }
    }
    return { "x": x, "y": y }
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

function moveDown() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("previous"));
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("move"), descriptor, DialogModes.NO);
}

//Make levels
function makeLevels(name) {
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
    descriptor3.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
    descriptor2.putObject(s2t("type"), s2t("levels"), descriptor3);
    descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
    name ? doc.activeLayer.name = name : ""

}

function setLevels(outputBlack, outputWhite) {
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
    var list2 = new ActionList();
    var reference = new ActionReference();
    var reference2 = new ActionReference();
    reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
    descriptor3.putReference(s2t("channel"), reference2);
    list2.putInteger(outputBlack);
    list2.putInteger(outputWhite);
    descriptor3.putList(s2t("output"), list2);
    list.putObject(s2t("levelsAdjustment"), descriptor3);
    descriptor2.putList(s2t("adjustment"), list);
    descriptor.putObject(s2t("to"), s2t("levels"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

function makeLayer(name) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("layer"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putString(s2t("name"), name);
    descriptor.putObject(s2t("using"), s2t("layer"), descriptor2);
    descriptor.putInteger(s2t("layerID"), 208);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
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

function actionMergeAll() {
    var idMrgV = charIDToTypeID("MrgV");
    var desc23352 = new ActionDescriptor();
    var idDplc = charIDToTypeID("Dplc");
    desc23352.putBoolean(idDplc, true);
    executeAction(idMrgV, desc23352, DialogModes.NO);
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

//Tạo layer Hue
function makeHueColor(name) {
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
    name ? doc.activeLayer.name = name : ""
}

function setHue(colorize, hue, Strt, lightness) {
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

function makeCurves(name) {
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
    descriptor2.putEnumerated(s2t("color"), s2t("color"), s2t("green"));
    descriptor3.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
    descriptor2.putObject(s2t("type"), s2t("curves"), descriptor3);
    descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);

    name ? doc.activeLayer.name = name : ""
}


function setCurverHightLight(horizontal, vertical, horizontal2, vertical2) {
    selectRGB()
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var descriptor4 = new ActionDescriptor();
    var descriptor5 = new ActionDescriptor();
    var list = new ActionList();
    var list2 = new ActionList();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
    descriptor3.putReference(s2t("channel"), reference2);
    descriptor4.putDouble(s2t("horizontal"), horizontal);
    descriptor4.putDouble(s2t("vertical"), vertical);
    list2.putObject(c2t("Pnt "), descriptor4);
    descriptor5.putDouble(s2t("horizontal"), horizontal2);
    descriptor5.putDouble(s2t("vertical"), vertical2);
    list2.putObject(c2t("Pnt "), descriptor5);
    descriptor3.putList(s2t("curve"), list2);
    list.putObject(s2t("curvesAdjustment"), descriptor3);
    descriptor2.putList(s2t("adjustment"), list);
    descriptor.putObject(s2t("to"), s2t("curves"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}


function setCurvesMid(horizontal2, vertical2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var descriptor4 = new ActionDescriptor();
    var descriptor5 = new ActionDescriptor();
    var descriptor6 = new ActionDescriptor();
    var list = new ActionList();
    var list2 = new ActionList();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
    descriptor3.putReference(s2t("channel"), reference2);
    descriptor4.putDouble(s2t("horizontal"), 0);
    descriptor4.putDouble(s2t("vertical"), 0);
    list2.putObject(c2t("Pnt "), descriptor4);
    descriptor5.putDouble(s2t("horizontal"), horizontal2);
    descriptor5.putDouble(s2t("vertical"), vertical2);
    list2.putObject(c2t("Pnt "), descriptor5);
    descriptor6.putDouble(s2t("horizontal"), 255);
    descriptor6.putDouble(s2t("vertical"), 255);
    list2.putObject(c2t("Pnt "), descriptor6);
    descriptor3.putList(s2t("curve"), list2);
    list.putObject(s2t("curvesAdjustment"), descriptor3);
    descriptor2.putList(s2t("adjustment"), list);
    descriptor.putObject(s2t("to"), s2t("curves"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}


function makeSolidColor(red, Grn, blue, name) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var descriptor4 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("contentLayer"));
    descriptor.putReference(c2t("null"), reference);
    descriptor4.putDouble(s2t("red"), red);
    descriptor4.putDouble(c2t("Grn "), Grn);
    descriptor4.putDouble(s2t("blue"), blue);
    descriptor2.putEnumerated(s2t("color"), s2t("color"), s2t("red"));
    descriptor3.putObject(s2t("color"), s2t("RGBColor"), descriptor4);
    descriptor2.putObject(s2t("type"), s2t("solidColorLayer"), descriptor3);
    descriptor.putObject(s2t("using"), s2t("contentLayer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
    name ? doc.activeLayer.name = name : ""

}
//Kiểm tra tồn tại selection
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

function colorRange(highlightsFuzziness, highlightsLowerLimit, colorModel, selectColor) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    descriptor.putEnumerated(s2t("colors"), s2t("colors"), s2t(selectColor));
    descriptor.putInteger(s2t("highlightsFuzziness"), highlightsFuzziness);
    descriptor.putInteger(s2t("highlightsLowerLimit"), highlightsLowerLimit);
    descriptor.putInteger(s2t("colorModel"), colorModel);
    executeAction(s2t("colorRange"), descriptor, DialogModes.NO);
}

function makeThreshold(name, level) {
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
    descriptor3.putInteger(s2t("level"), level);
    descriptor2.putObject(s2t("type"), s2t("thresholdClassEvent"), descriptor3);
    descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);

    //Rename 
    doc.activeLayer.name = name
}

function setThreshold(level) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putInteger(s2t("level"), level);
    descriptor.putObject(s2t("to"), s2t("thresholdClassEvent"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

function fillColor(red, green, blue) {
    var myColor = new SolidColor()
    myColor.rgb.red = red // 0 - 255
    myColor.rgb.green = green
    myColor.rgb.blue = blue
    activeDocument.selection.fill(myColor)
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


function disableMask() {
    var idsetd = charIDToTypeID("setd");
    var desc112 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref63 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref63.putEnumerated(idLyr, idOrdn, idTrgt);
    desc112.putReference(idnull, ref63);
    var idT = charIDToTypeID("T   ");
    var desc113 = new ActionDescriptor();
    var idUsrM = charIDToTypeID("UsrM");
    desc113.putBoolean(idUsrM, false);
    var idLyr = charIDToTypeID("Lyr ");
    desc112.putObject(idT, idLyr, desc113);
    executeAction(idsetd, desc112, DialogModes.NO);
}


function enableMask() {
    var idsetd = charIDToTypeID("setd");
    var desc925 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref239 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref239.putEnumerated(idLyr, idOrdn, idTrgt);
    desc925.putReference(idnull, ref239);
    var idT = charIDToTypeID("T   ");
    var desc926 = new ActionDescriptor();
    var idUsrM = charIDToTypeID("UsrM");
    desc926.putBoolean(idUsrM, true);
    var idLyr = charIDToTypeID("Lyr ");
    desc925.putObject(idT, idLyr, desc926);
    executeAction(idsetd, desc925, DialogModes.NO);
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

function crop(top, left, bottom, right) {
    var idCrop = charIDToTypeID("Crop")
    var desc11 = new ActionDescriptor()
    var idT = charIDToTypeID("T   ")
    var desc12 = new ActionDescriptor()
    var idTop = charIDToTypeID("Top ")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idTop, idPxl, top)
    var idLeft = charIDToTypeID("Left")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idLeft, idPxl, left)
    var idBtom = charIDToTypeID("Btom")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idBtom, idPxl, bottom)
    var idRght = charIDToTypeID("Rght")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idRght, idPxl, right)
    var idRctn = charIDToTypeID("Rctn")
    desc11.putObject(idT, idRctn, desc12)
    var idAngl = charIDToTypeID("Angl")
    var idAng = charIDToTypeID("#Ang")
    desc11.putUnitDouble(idAngl, idAng, 0.000000)
    var idDlt = charIDToTypeID("Dlt ")
    desc11.putBoolean(idDlt, false)
    var idcropAspectRatioModeKey = stringIDToTypeID("cropAspectRatioModeKey")
    var idcropAspectRatioModeClass = stringIDToTypeID("cropAspectRatioModeClass")
    var idtargetSize = stringIDToTypeID("targetSize")
    desc11.putEnumerated(idcropAspectRatioModeKey, idcropAspectRatioModeClass, idtargetSize)
    executeAction(idCrop, desc11, DialogModes.NO)
}
//reset //exchange
function resetColorPicker() {
    var idRset = charIDToTypeID("Rset");
    var desc844 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref313 = new ActionReference();
    var idClr = charIDToTypeID("Clr ");
    var idClrs = charIDToTypeID("Clrs");
    ref313.putProperty(idClr, idClrs);
    desc844.putReference(idnull, ref313);
    executeAction(idRset, desc844, DialogModes.NO);

}

function exchangeColorPicker() {
    var idExch = charIDToTypeID("Exch");
    var desc843 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref312 = new ActionReference();
    var idClr = charIDToTypeID("Clr ");
    var idClrs = charIDToTypeID("Clrs");
    ref312.putProperty(idClr, idClrs);
    desc843.putReference(idnull, ref312);
    executeAction(idExch, desc843, DialogModes.NO);
}

function selectMask() {
    var idslct = charIDToTypeID("slct");
    var desc444 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref248 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref248.putEnumerated(idChnl, idChnl, idMsk);
    desc444.putReference(idnull, ref248);
    var idMkVs = charIDToTypeID("MkVs");
    desc444.putBoolean(idMkVs, false);
    executeAction(idslct, desc444, DialogModes.NO);
}