// alert(activeDocument.pathItems.length);
// activeDocument.selection.load(activeDocument.pathItems.getByName('Work Path'));
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument
var guide = doc.guides;
// var g1 = doc.guides[0].coordinate
// var g2 = doc.guides[1].coordinate 
// var direct = doc.guides[1].direction
(function () {
    //DN
    var flagLogin = new File("//172.16.2.2/Academy/Hiep/log.txt")
    //HN
    // var flagLogin = new File("//172.16.0.13/Academy/Hiep/log.txt")
    if (flagLogin.exists) {
        main()
    }
})()
// main()
function main() {
    insert3D("1")
}

function insert3D(vr) {
    var widthDoc = doc.width
    var heightDoc = doc.height
    var acad_Select_3D = "Acad_Select_3D"
    var acad_shadow = "Acad_shadow"
    var select_WorkPath = "Select_WorkPath"
    var lengthPoint = doc.colorSamplers.length
    var lengGuide = guide.length
    grResource = doc.layerSets["Resources"]
    grVariant = doc.layerSets["Variant " + vr]
    grColor = grVariant.layerSets["Color " + vr]
    grItem = grVariant.layerSets["Item " + vr]
    grShadow = grVariant.layerSets["Shadow " + vr]
    grBg = grVariant.layerSets["Background " + vr]

    // try {
    //     doc.activeLayer = grItem.artLayers["Acad Shape Silhouette Style Ver1"]
    //     doc.activeLayer.remove()
    // } catch (error) { }
    if (checkSelectionName(acad_Select_3D) == true) {//Nếu tồn tại selection Acad_Select_3D

        //Nếu tồn tại điểm neo
        if (lengthPoint > 1) {
            // alert("Exist point")
            insertBackPoint()
        }
        //Nếu vùng chọn mặt Back là Selection
        else if (hasSelection() == true) {
            logAction("Log_Insert3D")
            doc.activeLayer = grItem.artLayers["Back"]
            doc.selection.copy()
            doc.activeLayer.remove()
            doc.activeLayer = grItem.artLayers["Product"]
            // doc.activeLayer.opacity = 80
            doc.paste()
            move("previous")
            doc.activeLayer.name = "Insert"
            //doc.activeLayer.move(grItem, ElementPlacement.PLACEATEND)
            //Transform mặt ghép
            doc.selection.load(doc.channels.getByName(acad_Select_3D))
            bound = doc.selection.bounds
            widthSelect_3D = bound[2] - bound[0]
            heightSelect_3D = bound[3] - bound[1]
            var lengGuide = guide.length
            var algn1 = "ADSCentersH"
            var algn2 = "ADSTops"

            //Nếu tồn tại 1 điểm point
            if (lengthPoint == 1) {
                widthPoint = doc.colorSamplers[0].position[0]
                if (widthPoint < widthDoc / 2) {
                    algn1 = "ADSCentersV"
                    algn2 = "ADSLefts"
                } else {
                    algn1 = "ADSCentersV"
                    algn2 = "ADSRights"
                }
                //Nếu tồn tại guide
            } else if (lengGuide != 0) {
                var coordGuide = guide[0].coordinate
                if (coordGuide > widthDoc / 2 && guide[0].direction == "Direction.HORIZONTAL") {
                    algn2 = "ADSBottoms"
                }
            }

            //Resize theo canh nhỏ
            resizeImage2(widthSelect_3D, heightSelect_3D)
            Algn(algn1) //"ADSCentersV" Doc
            Algn(algn2) //"ADSCentersV" Ngang
            boundLayerBack = doc.activeLayer.bounds
            // alert(bound[0])
            // alert(boundLayerBack[0])
            if ((bound[0] + 10 < boundLayerBack[0] || boundLayerBack[0] < 0 || boundLayerBack[2] > widthDoc) && bound[0] != boundLayerBack[0]) {
                resizeImage(widthSelect_3D, heightSelect_3D)
                doc.selection.load(doc.channels.getByName(acad_Select_3D))
                Algn(algn1) //"ADSCentersV" Doc
                Algn(algn2) //"ADSCentersV" Ngang
            }
            doc.selection.deselect()
            InteractiveTransform()
            shadow() //Shadow măt ghép
        } else {
            alert("Lấy vùng chọn mặt ghép!")
        }
    } else {//Chưa copy mặt ghep
        doc.activeLayer = grItem.artLayers["Product"]
        if (!hasSelection() && workPathExists()) {
            makeHistoryRandum("Workpath")
            // Lưu vùng chọn 
            doc.pathItems.getByName('Work Path').deselect()
            doc.pathItems.getByName('Work Path').makeSelection()
            action("Fthr")
            saveSelection(select_WorkPath)
            doc.selection.clear()
            copyBack()
        } else if (hasSelection() && !workPathExists()) {
            makeHistoryRandum("Selection")
            saveSelection(select_WorkPath)
            if (hasLayerMask()) {
                selectMask()
                fillColor(0, 0, 0)
            } else {
                doc.selection.invert()
                addMask()
                loadSelectionMask()
                doc.selection.invert()
            }
            copyBack()
        } else if (hasSelection() && workPathExists()) {
            alert("Chỉ giữ lại Path hoặc vùng chọn!")
        } else {
            alert("Lấy vùng chọn!")

        }
    }

    function insertBackPoint() {
        try {
            var widthPoint1 = doc.colorSamplers[0].position[0]
            var heightPoint1 = doc.colorSamplers[0].position[1]

            var widthPoint2 = doc.colorSamplers[1].position[0]
            var heightPoint2 = doc.colorSamplers[1].position[1]

            var widthPoint3 = doc.colorSamplers[2].position[0]
            var heightPoint3 = doc.colorSamplers[2].position[1]

            var widthPoint4 = doc.colorSamplers[3].position[0]
            var heightPoint4 = doc.colorSamplers[3].position[1]
        }
        catch (error) {
            alert(error)
        }
        finally {
            while (guide.length > 1) {
                guide[0].remove()
            }
        }
        //If check exist 4 point
        if (lengthPoint == 4) {
            if (1 === 1) {
                // Tính chiều dài cạnh góc vuông
                var cgvBelow1 = Math.abs(heightPoint3 - heightPoint4)
                var cgvBelow2 = Math.abs(widthPoint3 - widthPoint4)

                //Tính góc lệch mặt ghép
                if (cgvBelow1 < cgvBelow2) {
                    var radianBelow = cgvBelow1 / cgvBelow2
                } else {
                    var radianBelow = - cgvBelow2 / cgvBelow1
                }

                //Goc Lệch
                var valueAnglBelow = Math.atan(radianBelow) * 180 / Math.PI

                // Độ dài cạnh huyền mặt ghép
                var chBelow = Math.sqrt(Math.pow(cgvBelow1, 2) + Math.pow(cgvBelow2, 2))

                //Tính góc lệch điểm cần ghép
                var cgvFront1 = Math.abs(heightPoint1 - heightPoint2)
                var cgvFront2 = Math.abs(widthPoint1 - widthPoint2)

                //Tính góc lệch 
                if (cgvFront1 < cgvFront2) {
                    var radianFront = cgvFront1 / cgvFront2
                } else {
                    var radianFront = - cgvFront2 / cgvFront1
                }

                //Goc Lệch
                var valueAnglFront = Math.atan(radianFront) * 180 / Math.PI

                // Độ dài cạnh huyền mặt cần ghép
                var chFront = Math.sqrt(Math.pow(cgvFront1, 2) + Math.pow(cgvFront2, 2))

                // alert(valueAnglBelow)
                // alert(valueAnglFront)
                // alert(chBelow)
                // alert(chFront)

                //Check position point 3, point 4 && xoay mặt ghép
                if (heightPoint3 < heightPoint4) {//Point 3 Cao hơn
                    //Check position point 4
                    if (widthPoint3 > widthPoint4) { //Point 4 left
                        valueAnglBelow > 0 ? angl = valueAnglBelow : angl = 90 - Math.abs(valueAnglBelow)
                        transformLayer(widthPoint3, heightPoint3, angl)
                    } else {//Point 4 right
                        valueAnglBelow > 0 ? angl = valueAnglBelow : angl = 90 - Math.abs(valueAnglBelow)
                        transformLayer(widthPoint3, heightPoint3, -angl)
                    }
                } else {//Point 3 thấp hơn
                    if (widthPoint3 > widthPoint4) { //Point 4 left
                        valueAnglBelow > 0 ? angl = valueAnglBelow : angl = 90 - Math.abs(valueAnglBelow)
                        transformLayer(widthPoint3, heightPoint3, -angl)
                    } else {//Point 4 right
                        valueAnglBelow > 0 ? angl = valueAnglBelow : angl = 90 - Math.abs(valueAnglBelow)
                        transformLayer(widthPoint3, heightPoint3, angl)
                    }
                }

                //Move mặt cần ghép
                var pointH = widthPoint1 - widthPoint3
                var pointV = heightPoint1 - heightPoint3
                doc.activeLayer.translate(pointH, pointV)

                //selection vung ghep
                doc.selection.load(doc.channels.getByName(acad_Select_3D))
                var boundSelection = doc.selection.bounds
                //Resize mặt ghép.
                if (widthPoint1 < widthPoint2) {
                    var leftSelection = widthPoint1
                    var rightSelection = widthPoint1 + chBelow
                    var topSelection = heightPoint1
                    var bottomSelection = boundSelection[3] + 20
                    var position = AnchorPosition.TOPLEFT
                } else {
                    var leftSelection = widthPoint1 - chBelow
                    var rightSelection = widthPoint1
                    var topSelection = heightPoint1
                    var bottomSelection = boundSelection[3] + 20
                    var position = AnchorPosition.TOPRIGHT
                }

                move("previous")
                //------------leftTop -----leftBottom ---- rightBottom -----rightTop-----------//
                shapeRef = [[leftSelection, topSelection], [leftSelection, bottomSelection], [rightSelection, bottomSelection], [rightSelection, topSelection]];
                doc.selection.select(shapeRef)
                // action("CpTL");
                // doc.activeLayer.link(doc.activeLayer.parent.artLayers["Back"])
                addMask();
                applyMask();
                resizeImagePosition(chFront + 30, doc.height, position)
                // alert(chBelow)
                // action("Mrg2");
                //Xoay mặt Below theo Front
                if (widthPoint1 < widthPoint2) {
                    transformLayer(widthPoint1, heightPoint1, valueAnglFront)
                } else {
                    transformLayer(widthPoint1, heightPoint1, -valueAnglFront)
                }

                // doc.selection.load(doc.channels.getByName(acad_Select_3D))
                // doc.selection.expand(50); addMask(); applyMask()
            }

        }//End if check point
        //3 Điểm point
        else if (lengthPoint == 3) {
        }
        //2 Điểm point
        else if (lengthPoint == 2) {
        }
        try { shadow() } catch (error) { }
        //Translate layer back.
        function translateLayerBackToSelectionInsert(horizontal, vertical) {
            doc.selection.load(doc.channels.getByName("Acad_Select_3D"))
            var boundsSelectionInsert = doc.selection.bounds
            doc.selection.deselect()
            var pointH = boundsSelectionInsert[2] - doc.colorSamplers[0].position[0]
            var pointV = boundsSelectionInsert[1] - doc.colorSamplers[0].position[1]
            doc.activeLayer.translate(pointH, pointV)
        }
        // alert(value)
        // alert(CH)

    }


    function copyBack() {
        if (lengGuide != 0 || lengthPoint == 1) {
            //Save vung chon 1 diem point
            if (lengthPoint == 1) {
                var widthPoint = doc.colorSamplers[0].position[0]
                try {
                    if (widthPoint < widthDoc / 2.5) {
                        //leftTop, leftBottom, rightBottom, rightTop
                        var shapeRef = [[widthPoint, 0], [widthPoint, heightDoc], [widthDoc / 2, heightDoc], [widthDoc / 2, 0]]
                    } else {
                        var shapeRef = [[widthDoc / 2, 0], [widthDoc / 2, heightDoc], [widthPoint, heightDoc], [widthPoint, 0]]
                    }
                    doc.selection.select(shapeRef)
                    IntWChannels(select_WorkPath)
                } catch (error) { }
            }
            //Save vung chon tu guide dinh huong
            if (lengGuide != 0) {
                if (lengGuide != 0 && guide[lengGuide - 1].direction != "Direction.HORIZONTAL") {
                    guide[lengGuide - 1].remove()
                }
                while (guide.length > 1) {
                    guide[0].remove()
                }
                var coordGuide = guide[0].coordinate
                if ((coordGuide > doc.selection.bounds[1] && coordGuide < doc.selection.bounds[3] && coordGuide != null)) {
                    if (guide[0].direction == "Direction.HORIZONTAL") {
                        try {
                            if (coordGuide < heightDoc / 2) {
                                //leftTop, leftBottom, rightBottom, rightTop
                                var shapeRef = [[0, coordGuide], [0, heightDoc], [widthDoc, heightDoc], [widthDoc, coordGuide]]
                            } else {
                                var shapeRef = [[0, 0], [0, coordGuide], [widthDoc, coordGuide], [widthDoc, 0]]
                            }
                            doc.selection.select(shapeRef)
                            IntWChannels(select_WorkPath)
                        } catch (error) { }
                    }
                }
            }
        }
        saveSelection(acad_Select_3D)
        doc.selection.deselect()
        //check info group Resources
        var lengthResource = grResource.artLayers.length
        var flag
        if (lengthResource == 0) {
            alert("Không tồn tại mặt Back!")
        } else {//
            if (lengthResource > 1) {//Exist more layer face insert
                // Tạo một cửa sổ dialog
                var sizeInput = [80, 25]
                var sizeLabel = [70, 25]
                var dialog = new Window("dialog")
                dialog.text = "Chọn files mặt ghép!"
                dialog.orientation = "column";
                dialog.alignChildren = ["left", "top"]
                dialog.margins = [10, 10, 10, 10]
                dialog.spacing = 10

                var outputLayerInResources = dialog.add("group")
                outputLayerInResources.orientation = "row"
                outputLayerInResources.alignChildren = ["left", "center"]
                // outputLayerInResources.margins = [10, 10, 10, 10]
                outputLayerInResources.spacing = 0

                var textSelectLayer = outputLayerInResources.add("statictext")
                textSelectLayer.text = "Select Layer"
                textSelectLayer.preferredSize = sizeLabel
                textSelectLayer.justify = "right"

                //List layer in group
                var arrListLayer = new Array()
                var i = 0
                while (i < lengthResource) {
                    arrListLayer.push(grResource.artLayers[i].name)
                    i = i + 1
                }
                var outPut = outputLayerInResources.add("dropdownlist", undefined, "list artLayers", { items: arrListLayer })
                outPut.selection = 0
                outPut.preferredSize = sizeInput
                var Run = dialog.add("group")
                Run.orientation = "row"
                Run.alignChildren = ["left", "center"]
                Run.margins = [0, 0, 0, 0]
                Run.spacing = 0

                var buttonOk = Run.add("button", undefined, "Run", { name: "OK" })
                buttonOk.justify = "center"
                buttonOk.preferredSize.width = 80
                buttonOk.active = true

                var buttonCancel = Run.add("button", undefined, "Cancel", { name: "Cancel" })
                buttonCancel.justify = "center"
                buttonCancel.preferredSize.width = 80
                outPut.addEventListener("change", function () {
                    doc.activeLayer = grResource.artLayers[outPut.selection]
                    dialog.close(1)
                })

                buttonOk.addEventListener("click", function () {
                    doc.activeLayer = grResource.artLayers[outPut.selection]
                    dialog.close(1)
                })

                buttonCancel.addEventListener("click", function () {
                    dialog.close(0)
                })
                //handle list
                dialog.addEventListener("keydown", triggerBtnRun)
                function triggerBtnRun(e) {
                    // alert(e.keyName)
                    if (e.keyName == "Space" || e.keyName == "Enter" || e.keyName == "1") {
                        buttonOk.dispatchEvent(new Event("click"))
                    }
                    else if (e.keyName == "Escape") {
                        buttonCancel.dispatchEvent(new Event("click"))
                    }
                    for (var z = 1; z < lengthResource + 1; z++) {
                        if (e.keyName == z) {
                            outPut.selection = z - 1
                            buttonCancel.dispatchEvent(new Event("click"))
                        }
                    }
                }
                flag = dialog.show()
            } else {
                doc.activeLayer = grResource.artLayers[0]
                flag = 1
            }
            if (flag == 1) {
                //copy mặt back
                doc.activeLayer = activeDocument.activeLayer.duplicate(grItem, ElementPlacement.INSIDE)
                doc.activeLayer.name = "Back"
                grResource.visible = false
                //Transform mặt ghép
                doc.selection.selectAll()
                Algn("ADSTops") //"ADSCentersV" Doc
                Algn("ADSCentersH") //"ADSCentersV" Ngang
                if (doc.activeLayer.bounds[0] < 0 || doc.activeLayer.bounds[3] > heightDoc) {
                    resizeImage(widthDoc, heightDoc)
                    Algn("ADSTops") //"ADSCentersV" Doc
                }
                doc.selection.deselect()
                selectMarqueeRectTool()
                makeHistoryRandum("TrimBack")
                runMenuItem(app.charIDToTypeID("FtOn")); // FIT TO SCREEN
            }
        }
    }


    function shadow() {
        doc.colorSamplers.removeAll()
        doc.selection.load(doc.channels.getByName(select_WorkPath))
        var setFea = setFeather(doc.selection.bounds[2] - doc.selection.bounds[0], doc.selection.bounds[3] - doc.selection.bounds[1])
        try {
            doc.activeLayer = grItem.artLayers[acad_shadow]
            doc.selection.feather(setFea)
            selectMask()
            fillColor(0, 0, 0)
            doc.selection.deselect()
            selectLayer("forwardEnum")  // forwardEnum 
            move("previous")
            doc.activeLayer.merge()
        } catch (error) {
            doc.selection.invert()
            doc.selection.feather(setFea)
            makeLevels(130, 1, 255, 0, 190)
            doc.activeLayer.name = acad_shadow
        }

        try { doc.channels.getByName(acad_Select_3D).remove(); } catch (err) { }
        try { doc.channels.getByName(select_WorkPath).remove(); } catch (err) { }
        try { doc.pathItems.getByName('Work Path').remove() } catch (err) { }
        // doc.activeLayer = grItem.artLayers["Product"]
        // doc.activeLayer.opacity = 100
        doc.activeLayer = grItem.artLayers[acad_shadow]
        selectBrushTool()
    }


}//End insert 3D



function checkGuides() {
    coordGuide = null
    var lengthGuide = guide.length
    for (var i = lengthGuide - 1; i >= 0; i--) {
        if (guide[i].direction == "Direction.HORIZONTAL") {
            var coordGuide = guide[i].coordinate
            break
        }
    }
    return coordGuide
}
function setFeather(widthEar, heightEar) {
    return widthEar < heightEar ? widthEar / 7 : heightEar / 7
}

function action(action) {
    var idCpTL = charIDToTypeID(action)
    executeAction(idCpTL, undefined, DialogModes.NO)
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
//kiem tra ton tai selection với tên .....
function checkSelectionName(nameChannel) {
    var result = false;
    try {
        var channelRef = doc.channels.getByName(nameChannel);
        if (channelRef) {
            result = true;
        }
    } catch (error) { }
    return result;
}

function transformLayer(Hrzn, Vrtc, Angl) {
    // Transform
    cTID = function (s) { return app.charIDToTypeID(s); };
    sTID = function (s) { return app.stringIDToTypeID(s); };
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSIndependent"));
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), Hrzn); // vi tri neo H
    desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), Vrtc); // vi tri neo V
    desc1.putObject(cTID('Pstn'), cTID('Pnt '), desc2);
    var desc3 = new ActionDescriptor();
    desc3.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
    desc3.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 0);
    desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc3);
    desc1.putUnitDouble(cTID('Angl'), cTID('#Ang'), Angl);
    desc1.putEnumerated(cTID('Intr'), cTID('Intp'), cTID('Bcbc'));
    executeAction(cTID('Trnf'), desc1, DialogModes.NO);
}
//Lấy giao selection với path
function IntW(namePath) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putProperty(s2t("path"), s2t(namePath));
    descriptor.putReference(s2t("to"), reference2);
    descriptor.putInteger(s2t("version"), 1);
    descriptor.putBoolean(s2t("vectorMaskParams"), true);
    executeAction(c2t("IntW"), descriptor, DialogModes.NO);
}

function IntWChannels(channel) {
    var idIntr = charIDToTypeID("Intr");
    var desc1892 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref182 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    ref182.putName(idChnl, channel);
    desc1892.putReference(idnull, ref182);
    var idWith = charIDToTypeID("With");
    var ref183 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref183.putProperty(idChnl, idfsel);
    desc1892.putReference(idWith, ref183);
    executeAction(idIntr, desc1892, DialogModes.NO);
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

function resizeImage(width, height) {
    WIDTH = width;
    HEIGHT = height;
    bounds = activeDocument.activeLayer.bounds;
    layerWidth = bounds[2].as('px') - bounds[0].as('px');
    layerHeight = bounds[3].as('px') - bounds[1].as('px');
    layerRatio = layerWidth / layerHeight;
    newWidth = WIDTH;
    newHeight = ((1.0 * WIDTH) / layerRatio);
    if (newHeight >= HEIGHT) {
        newWidth = layerRatio * HEIGHT;
        newHeight = HEIGHT;
    }
    resizePercent = newWidth / layerWidth * 100;
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);

}

function resizeImagePosition(width, height, position) {
    WIDTH = width;
    HEIGHT = height;
    bounds = activeDocument.activeLayer.bounds;
    layerWidth = bounds[2].as('px') - bounds[0].as('px');
    layerHeight = bounds[3].as('px') - bounds[1].as('px');
    layerRatio = layerWidth / layerHeight;
    newWidth = WIDTH;
    newHeight = ((1.0 * WIDTH) / layerRatio);
    if (newHeight >= HEIGHT) {
        newWidth = layerRatio * HEIGHT;
        newHeight = HEIGHT;
    }
    resizePercent = newWidth / layerWidth * 100;
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, position);
}


function resizeImage2(width, height) {
    WIDTH = width;
    HEIGHT = height;
    bounds = activeDocument.activeLayer.bounds;
    layerWidth = bounds[2].as('px') - bounds[0].as('px');
    layerHeight = bounds[3].as('px') - bounds[1].as('px');
    layerRatio = layerWidth / layerHeight;
    newWidth = WIDTH;
    newHeight = ((1.0 * WIDTH) / layerRatio);
    if (newHeight <= HEIGHT) {
        newWidth = layerRatio * HEIGHT;
        newHeight = HEIGHT;
    }
    resizePercent = newWidth / layerWidth * 100;
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);

}

function applyMask() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("channel"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putBoolean(s2t("apply"), true);
    executeAction(s2t("delete"), descriptor, DialogModes.NO);
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

function hasLayerMask() {
    var reference = new ActionReference()
    reference.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"))
    var desc = executeActionGet(reference)
    return desc.getBoolean(stringIDToTypeID("hasUserMask"))
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
//kiem tra ton tai selection với tên .....
// alert(doc.guides.length)
// doc.guides.removeAll()
// var left = doc.guides[0].coordinate //left
// var right = doc.guides[1].coordinate //right
// var top = doc.guides[2].coordinate	//top
// var bottom = doc.guides[3].coordinate // bottom
// var shapeRef = [ [left,top], [left,bottom], [right,bottom], [right,top] ];
// doc.selection.select(shapeRef)


//kiem tra ton tai  ten path
function workPathExists() {
    var result = false;
    lengthPath = doc.pathItems.length
    try {
        if (String(activeDocument.pathItems[lengthPath - 1].name) == "Work Path") {
            result = true;
        }
    } catch (error) {
        result = false;
    }
    return result;
}


///////////////khong quan trong

function selectMarqueeRectTool() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("marqueeRectTool"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putBoolean(s2t("dontRecord"), true);
    descriptor.putBoolean(s2t("forceNotify"), true);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

// Algn("ADSCentersH"); //"ADSCentersV"

function Algn(algn) {
    try {
        c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        descriptor = new ActionDescriptor();
        reference = new ActionReference();

        reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
        descriptor.putReference(c2t("null"), reference);
        descriptor.putEnumerated(s2t("using"), s2t("alignDistributeSelector"), s2t(algn));
        descriptor.putBoolean(s2t("alignToCanvas"), false);
        executeAction(c2t("Algn"), descriptor, DialogModes.NO);
    } catch (error) {

    }

}

function InteractiveTransform() {
    try {
        app.runMenuItem(charIDToTypeID("FrTr"));
    } catch (error) { }
}

function warp() {
    var idslct = charIDToTypeID("slct");
    var desc20 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref8 = new ActionReference();
    var idMn = charIDToTypeID("Mn  ");
    var idMnIt = charIDToTypeID("MnIt");
    var idwarp = stringIDToTypeID("warp");
    ref8.putEnumerated(idMn, idMnIt, idwarp);
    desc20.putReference(idnull, ref8);
    executeAction(idslct, desc20, DialogModes.NO);
}

function makeLevels(blackPoint, midtone, whitePoint, outputBlack, outputWhite) {
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
    descriptor3.putReference(c2t("null"), reference);
    descriptor2.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
    descriptor.putObject(s2t("type"), s2t("levels"), descriptor2);
    descriptor3.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor);
    executeAction(s2t("make"), descriptor3, DialogModes.NO);

    //SET LEVELS
    var list = new ActionList();
    var list2 = new ActionList();
    var list3 = new ActionList();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
    descriptor3.putReference(s2t("channel"), reference2);
    list2.putInteger(blackPoint);
    list2.putInteger(whitePoint);
    descriptor3.putList(s2t("input"), list2);
    descriptor3.putDouble(s2t("gamma"), midtone);
    list3.putInteger(outputBlack);
    list3.putInteger(outputWhite);
    descriptor3.putList(s2t("output"), list3);
    list.putObject(s2t("levelsAdjustment"), descriptor3);
    descriptor2.putList(s2t("adjustment"), list);
    descriptor.putObject(s2t("to"), s2t("levels"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

function set(blackPoint, midtone, whitePoint, outputBlack, outputWhite) {
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
    var list3 = new ActionList();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
    descriptor3.putReference(s2t("channel"), reference2);
    list2.putInteger(blackPoint);
    list2.putInteger(whitePoint);
    descriptor3.putList(s2t("input"), list2);
    descriptor3.putDouble(s2t("gamma"), midtone);
    list3.putInteger(outputBlack);
    list3.putInteger(outputWhite);
    descriptor3.putList(s2t("output"), list3);
    list.putObject(s2t("levelsAdjustment"), descriptor3);
    descriptor2.putList(s2t("adjustment"), list);
    descriptor.putObject(s2t("to"), s2t("levels"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
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

function fillColor(red, green, blue) {
    var myColor = new SolidColor()
    myColor.rgb.red = red // 0 - 255
    myColor.rgb.green = green
    myColor.rgb.blue = blue
    activeDocument.selection.fill(myColor)
}

//save history
function saveHistory() {
    var idsetd = charIDToTypeID("setd");
    var desc976 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref407 = new ActionReference();
    var idHstS = charIDToTypeID("HstS");
    var idHstB = charIDToTypeID("HstB");
    ref407.putProperty(idHstS, idHstB);
    desc976.putReference(idnull, ref407);
    var idT = charIDToTypeID("T   ");
    var ref408 = new ActionReference();
    var idHstS = charIDToTypeID("HstS");
    var idCrnH = charIDToTypeID("CrnH");
    ref408.putProperty(idHstS, idCrnH);
    desc976.putReference(idT, ref408);
    executeAction(idsetd, desc976, DialogModes.NO);
}

//function check History colorCopy
function makeHistoryRandum(params) {
    var randumHistory = params + "_" + Math.random();
    makeHistory(randumHistory);
    return randumHistory;
}
//make History
function makeHistory(name2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putClass(s2t("snapshotClass"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putProperty(c2t("HstS"), s2t("currentHistoryState"));
    descriptor.putReference(s2t("from"), reference2);
    descriptor.putString(s2t("name"), name2);
    descriptor.putEnumerated(s2t("using"), c2t("HstS"), s2t("fullDocument"));
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

function selectSmudge() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("smudgeTool"));
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

function move(location) {
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
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t(location));
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("move"), descriptor, DialogModes.NO);
}
function selectLayer(location) { // forwardEnum 
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var list = new ActionList();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t(location));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putBoolean(s2t("makeVisible"), false);
    descriptor.putList(s2t("layerID"), list);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}


function selectRGB() {
    // activeDocument.activeLayer = lyr;
    var idslct = charIDToTypeID("slct");
    var desc219 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref138 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idRGB = charIDToTypeID("RGB ");
    ref138.putEnumerated(idChnl, idChnl, idRGB);
    desc219.putReference(idnull, ref138);
    var idMkVs = charIDToTypeID("MkVs");
    desc219.putBoolean(idMkVs, false);
    executeAction(idslct, desc219, DialogModes.NO);
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

function selectBrushTool() {
    // =======================================================
    var idslct = charIDToTypeID("slct");
    var desc240 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref98 = new ActionReference();
    var idPbTl = charIDToTypeID("PbTl");
    ref98.putClass(idPbTl);
    desc240.putReference(idnull, ref98);
    executeAction(idslct, desc240, DialogModes.NO);

    // =======================================================
    var idRset = charIDToTypeID("Rset");
    var desc241 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref99 = new ActionReference();
    var idClr = charIDToTypeID("Clr ");
    var idClrs = charIDToTypeID("Clrs");
    ref99.putProperty(idClr, idClrs);
    desc241.putReference(idnull, ref99);
    executeAction(idRset, desc241, DialogModes.NO);

    //chuyen black
    var idExch = charIDToTypeID("Exch");
    var desc1805 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref442 = new ActionReference();
    var idClr = charIDToTypeID("Clr ");
    var idClrs = charIDToTypeID("Clrs");
    ref442.putProperty(idClr, idClrs);
    desc1805.putReference(idnull, ref442);
    executeAction(idExch, desc1805, DialogModes.NO);


    // =======================================================
}