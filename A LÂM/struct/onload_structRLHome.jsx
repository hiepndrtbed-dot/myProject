//Số variant
const countVariant = "2"
//Thông số layer : backgroundSwatch 
const colorLayer_backgroundSwatch = "e5e1da" //Mã màu
const widthHeightMask_backgroundSwatch = [2000, 2000] //Chiều rộng và chiều cao Mask

//Thông số layer: Hue
const colorLayer_Hue = "f0ece6" //Mã màu
const inputOptionBlendingIf_Hue = [] //Thông số Blend If

//Thông số layer: Color
const colorLayer_Color = "f0ebe4" //Mã màu
const inputOptionBlendingIf_Color = [0, 0, 255, 255, 100, 200, 255, 255] //Thông số Blend if

//Thông số layer: background_darkening, nếu trường hợp không có layer này thì Nhập "None" sau dấu =
const outputPointWhiteLine_backgroundDarkening = [0, 0, 255, 238]
const inputOptionBlendingIf = [160, 226, 255, 255, 193, 245, 255, 255]

//Thông số layer: background_curve, nếu trường hợp không có layer này thì nhập "None" sau dấu =
const inputBackgroundCurve = []

//Thông số màu layer shadow trường hợp 
const colorShadowV1 = "2d1f07" //Mã màu Variant 1
const colorShadowV2 = "000000" //Mã màu Variant 2


main()
function main() {
    preferences.rulerUnits = Units.PIXELS
    app.preferences.typeunits = TypeUnits.PIXELS
    var doc = app.activeDocument
    const nameGrVariant = "Variant 1"
    const nameGrFileComp = "Customer's layers"
    const nameGrImage = "Image"
    const nameGrSubImage_Subject = "subject"
    const nameGrSubSubject_reColourCC = "re-colourCC"
    const nameGrSubImage_Background_Adjustments = "Background Adjustments"
    var flag_PLATE = false

    //Resize image doc
    resizeImage(4000, 4000, 4000)

    //Create Group Variant
    doc.layerSets.add().name = nameGrVariant

    var grVariant = doc.layerSets[nameGrVariant]

    //Create children of group Variant
    grVariant.layerSets.add().name = nameGrImage
    makeMask()
    var grImage = grVariant.layerSets[nameGrImage]

    grImage.layerSets.add().name = nameGrSubImage_Background_Adjustments

    var grBackgroundAdjustments = grImage.layerSets[nameGrSubImage_Background_Adjustments]
    grImage.layerSets.add().name = nameGrSubImage_Subject

    //Create group children of group Subject
    var grSubject = grImage.layerSets[nameGrSubImage_Subject]
    grSubject.artLayers.add().name = "retouch"
    makeMask()
    grSubject.layerSets.add().name = nameGrSubSubject_reColourCC
    var grReColourCC = grSubject.layerSets[nameGrSubSubject_reColourCC]

    //Make Hue
    makeCurves("curveCC", "none")
    makeHueColor("hueCC", "none")


    //Create group Comp in group variant
    grVariant.layerSets.add().name = nameGrFileComp
    var grCustomerLayer = grVariant.layerSets[nameGrFileComp]

    //Move layer comp and check layer PLATE
    var lengthLayers = doc.artLayers.length
    for (var i = 0; i < lengthLayers; i++) {
        if (doc.artLayers[i].name.search("PLATE") != 0) {
            doc.activeLayer = doc.artLayers[i]
            //Check is layer background
            if (doc.activeLayer.isBackgroundLayer == true) {
                doc.activeLayer.isBackgroundLayer = false
                doc.activeLayer.duplicate(grSubject, ElementPlacement.PLACEATEND).name = "subject_retouch"
                doc.activeLayer.move(grImage, ElementPlacement.PLACEATEND)
                doc.activeLayer.name = "original"
                doc.activeLayer.allLocked = true
                doc.activeLayer.visible = false
                i = i - 1
                lengthLayers = lengthLayers - 1
            } else {
                doc.activeLayer.move(grCustomerLayer, ElementPlacement.PLACEATEND)
                doc.activeLayer.visible = false
                i = i - 1
                lengthLayers = lengthLayers - 1
            }
        } else {
            //Kiem tra có tồn tại layer PLATE
            doc.activeLayer = doc.artLayers[i]
            doc.activeLayer.move(grBackgroundAdjustments, ElementPlacement.PLACEATEND)
            i = i - 1
            lengthLayers = lengthLayers - 1
            flag_PLATE = true
        }
    }
    //Xử lý theo temp
    if (flag_PLATE == false) {
        //Make background background_curve
        if (inputBackgroundCurve != "None") {
            if (inputBackgroundCurve != "") {
                doc.activeLayer = grBackgroundAdjustments
                makeCurves("background_curve", "none")
                setCurves(inputBackgroundCurve[0], inputBackgroundCurve[1], inputBackgroundCurve[2], inputBackgroundCurve[3])
            } else {
                doc.activeLayer = grBackgroundAdjustments
                makeCurves("background_curve", "none")
            }
        }
        //Make background background_darkening
        if (outputPointWhiteLine_backgroundDarkening != "None") {
            if (outputPointWhiteLine_backgroundDarkening != "") {
                doc.activeLayer = grBackgroundAdjustments
                makeCurves("background_darkening", "none")
                setCurves(outputPointWhiteLine_backgroundDarkening[0], outputPointWhiteLine_backgroundDarkening[1], outputPointWhiteLine_backgroundDarkening[2], outputPointWhiteLine_backgroundDarkening[3])
            } else {
                doc.activeLayer = grBackgroundAdjustments
                makeCurves("background_darkening", "none")
            }
        }
        //Config blending if background_darkening
        if (inputOptionBlendingIf != "None") {
            if (inputOptionBlendingIf != "") {
                blendingOptions(inputOptionBlendingIf[0], inputOptionBlendingIf[1], inputOptionBlendingIf[2], inputOptionBlendingIf[3], inputOptionBlendingIf[4], inputOptionBlendingIf[5], inputOptionBlendingIf[6], inputOptionBlendingIf[7])
            }
        }
        //Make solid color
        if (colorLayer_Color != "None") {
            if (colorLayer_Color != "") {
                doc.activeLayer = grBackgroundAdjustments
                var Red = hexToRgb("#" + colorLayer_Color)[0]
                var Green = hexToRgb("#" + colorLayer_Color)[1]
                var Blue = hexToRgb("#" + colorLayer_Color)[2]
                makeSolidColor(Red, Green, Blue)
                doc.activeLayer.blendMode = BlendMode.COLORBLEND
                doc.activeLayer.name = "Color"
            }
        }
        //Config blending if background_darkening
        if (inputOptionBlendingIf_Color != "None") {
            if (inputOptionBlendingIf_Color != "") {
                blendingOptions(inputOptionBlendingIf_Color[0], inputOptionBlendingIf_Color[1], inputOptionBlendingIf_Color[2], inputOptionBlendingIf_Color[3], inputOptionBlendingIf_Color[4], inputOptionBlendingIf_Color[5], inputOptionBlendingIf_Color[6], inputOptionBlendingIf_Color[7])
            }
        }
        //Make solid Hue
        if (colorLayer_Hue != "None") {
            if (colorLayer_Hue != "") {
                doc.activeLayer = grBackgroundAdjustments
                var Red = hexToRgb("#" + colorLayer_Hue)[0]
                var Green = hexToRgb("#" + colorLayer_Hue)[1]
                var Blue = hexToRgb("#" + colorLayer_Hue)[2]
                makeSolidColor(Red, Green, Blue)
                doc.activeLayer.blendMode = BlendMode.HUE
                doc.activeLayer.name = "Hue"
            }
        }
        //Config blending if background_darkening
        if (inputOptionBlendingIf_Hue != "None") {
            if (inputOptionBlendingIf_Hue != "") {
                blendingOptions(inputOptionBlendingIf_Hue[0], inputOptionBlendingIf_Hue[1], inputOptionBlendingIf_Hue[2], inputOptionBlendingIf_Hue[3], inputOptionBlendingIf_Hue[4], inputOptionBlendingIf_Hue[5], inputOptionBlendingIf_Hue[6], inputOptionBlendingIf_Hue[7])
            }
        }
        //Make solid background_swatch
        if (colorLayer_backgroundSwatch != "None") {
            if (colorLayer_backgroundSwatch != "") {
                doc.activeLayer = grBackgroundAdjustments
                var Red = hexToRgb("#" + colorLayer_backgroundSwatch)[0]
                var Green = hexToRgb("#" + colorLayer_backgroundSwatch)[1]
                var Blue = hexToRgb("#" + colorLayer_backgroundSwatch)[2]
                makeSolidColor(Red, Green, Blue)
                doc.activeLayer.name = "background_swatch"
            }
        }
        deleteMask()
        //set width and height mask background_swatch
        var widthImg = doc.width
        var heightImg = doc.height
        var leftSlection = parseInt(widthImg / 2 - widthHeightMask_backgroundSwatch[0] / 2)
        var rightSlection = parseInt(widthImg / 2 + widthHeightMask_backgroundSwatch[0] / 2)
        var topSlection = parseInt(heightImg / 2 - widthHeightMask_backgroundSwatch[1] / 2)
        var bottomSlection = parseInt(heightImg / 2 + widthHeightMask_backgroundSwatch[1] / 2)
        makeSelection(leftSlection, rightSlection, topSlection, bottomSlection)
        addMask()

        grImage.artLayers.add().name = "background_retouch"
        doc.activeLayer.move(grBackgroundAdjustments, ElementPlacement.PLACEAFTER)
        doc.activeLayer = grSubject.artLayers["subject_retouch"]
        makeMask()

        // Check count variant
        for (var i = 1; i < countVariant; i++) {
            doc.activeLayer = grVariant
            var numberVr = parseInt(countVariant) + 1 - i
            duplicateLayerNoneNameCopy()
            doc.activeLayer.name = "Variant " + numberVr
            if (numberVr == 2) {
                doc.layerSets["Variant " + numberVr].layerSets[nameGrImage].layerSets[nameGrSubImage_Background_Adjustments].remove()
                doc.layerSets["Variant " + numberVr].layerSets[nameGrImage].artLayers["background_retouch"].remove()
                var grImageV2 = doc.layerSets["Variant " + numberVr].layerSets[nameGrImage]
                doc.activeLayer = grImageV2
                var Red = hexToRgb("#" + colorShadowV2)[0]
                var Green = hexToRgb("#" + colorShadowV2)[1]
                var Blue = hexToRgb("#" + colorShadowV2)[2]
                makeSolidColor(Red, Green, Blue)
                doc.activeLayer.name = "Shadow"
                doc.activeLayer.move(doc.layerSets["Variant " + numberVr].layerSets[nameGrImage].layerSets[nameGrSubImage_Subject], ElementPlacement.PLACEAFTER)
            }
        }
    } else {//Tồn tại layer PLATE
        doc.activeLayer = grBackgroundAdjustments
        var Red = hexToRgb("#" + colorShadowV1)[0]
        var Green = hexToRgb("#" + colorShadowV1)[1]
        var Blue = hexToRgb("#" + colorShadowV1)[2]
        makeSolidColor(Red, Green, Blue)
        doc.activeLayer.name = "Shadow"

        // Check count variant
        for (var i = 1; i < countVariant; i++) {
            doc.activeLayer = grVariant
            var numberVr = i + 1
            duplicateLayerNoneNameCopy()
            doc.activeLayer.name = "Variant " + numberVr
            if (numberVr == 2) {
                doc.layerSets["Variant " + numberVr].layerSets[nameGrImage].layerSets[nameGrSubImage_Background_Adjustments].remove()
                var grImageV2 = doc.layerSets["Variant " + numberVr].layerSets[nameGrImage]
                doc.activeLayer = grImageV2
                var Red = hexToRgb("#" + colorShadowV2)[0]
                var Green = hexToRgb("#" + colorShadowV2)[1]
                var Blue = hexToRgb("#" + colorShadowV2)[2]
                makeSolidColor(Red, Green, Blue)
                doc.activeLayer.name = "Shadow"
                doc.activeLayer.move(doc.layerSets["Variant " + numberVr].layerSets[nameGrImage].layerSets[nameGrSubImage_Subject], ElementPlacement.PLACEAFTER)
            }
        }
    }//end flag_PLATE

}

// Convert hex to rgb
function hexToRgb(hex) {
    return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}

function resizeImage(finalWidth, finalHeight, heightImg) {
    var docRef = activeDocument
    //Resize image according to shape
    var actualWidth = docRef.width;
    var actualHeight = docRef.height;
    var imgHeight = heightImg;
    var imgWidth = actualWidth * imgHeight / actualHeight;
    if (imgWidth > heightImg) {
        imgWidth = heightImg;
        imgHeight = actualHeight * imgWidth / actualWidth;
    }
    docRef.resizeImage(imgWidth, imgHeight);
    docRef.resizeCanvas(finalWidth, finalHeight, AnchorPosition.MIDDLECENTER);
}

function makeSelection(left, right, top, bottom) {
    result = false
    try {
        //leftTop, leftBottom, rightBottom rightTop
        shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
        activeDocument.selection.select(shapeRef)
        result = true
    } catch (error) {
    }
    return result
}

// blendingOptions(0, 47, 189, 255, 0, 36, 233, 255);

function blendingOptions(srcBlackMin, srcBlackMax, srcWhiteMin, srcWhiteMax, destBlackMin, destBlackMax, destWhiteMin, Dstt) {
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
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("gray"));
    descriptor3.putReference(s2t("channel"), reference2);
    descriptor3.putInteger(s2t("srcBlackMin"), srcBlackMin);
    descriptor3.putInteger(s2t("srcBlackMax"), srcBlackMax);
    descriptor3.putInteger(s2t("srcWhiteMin"), srcWhiteMin);
    descriptor3.putInteger(s2t("srcWhiteMax"), srcWhiteMax);
    descriptor3.putInteger(s2t("destBlackMin"), destBlackMin);
    descriptor3.putInteger(s2t("destBlackMax"), destBlackMax);
    descriptor3.putInteger(s2t("destWhiteMin"), destWhiteMin);
    descriptor3.putInteger(c2t("Dstt"), Dstt);
    list.putObject(s2t("blendRange"), descriptor3);
    descriptor2.putList(s2t("blendRange"), list);
    descriptor.putObject(s2t("to"), s2t("layer"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}
function duplicateLayerNoneNameCopy() {
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
    descriptor.putInteger(s2t("version"), 5);
    executeAction(s2t("duplicate"), descriptor, DialogModes.NO);
}

//Make mask
function makeMask() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    descriptor.putClass(s2t("new"), s2t("channel"));
    reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("mask"));
    descriptor.putReference(s2t("at"), reference);
    descriptor.putEnumerated(s2t("using"), c2t("UsrM"), s2t("revealAll"));
    executeAction(s2t("make"), descriptor, DialogModes.NO);
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

function makeCurves(name, color) {
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
    descriptor2.putReference(c2t("null"), reference);
    descriptor3.putEnumerated(s2t("color"), s2t("color"), s2t(color));
    descriptor.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
    descriptor3.putObject(s2t("type"), s2t("curves"), descriptor);
    descriptor2.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor3);
    executeAction(s2t("make"), descriptor2, DialogModes.NO);
    activeDocument.activeLayer.name = name

}


//Function set curves
function setCurves(horizontal, vertical, horizontal2, vertical2) {
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

//Tạo layer Hue
function makeHueColor(name, color) {
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
    descriptor2.putEnumerated(s2t("color"), s2t("color"), s2t(color));
    descriptor3.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
    descriptor3.putBoolean(s2t("colorize"), false);
    descriptor2.putObject(s2t("type"), s2t("hueSaturation"), descriptor3);
    descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
    activeDocument.activeLayer.name = name
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
