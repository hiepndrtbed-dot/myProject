// alert(activeDocument.pathItems.length);
// activeDocument.selection.load(activeDocument.pathItems.getByName('Work Path'));
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument
const versionTo = " By Acad -- Version: 1.0 -- ";
var flagLogin = new File("//172.16.2.2/Academy/Hiep/logNew.txt")
var date = new Date()
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
if (year <= 2024 && month < 9 && flagLogin.exists) {
    main()
}

// (function () {
//     var logKeyAccount = new File("//172.16.2.2/Public Data/Academy/LogAction/account.csv")
//     //var logKeyAccount = new File("D:/ACA/Js/Public/account.csv")
//     var logUser = new File("~/AppData/Roaming/Adobe/Adobe Photoshop CC 2019/Adobe Photoshop CC 2019 Settings/LogUs.csv")
//     if (logKeyAccount.exists) {
//         logKeyAccount.open("r")
//         logText = logKeyAccount.readln()
//         if (logUser.exists) {
//             logUser.open("r")
//             user = logUser.readln()
//             if (user != "") {
//                 var flag = false
//                 //So sanh điều kiện người dùng
//                 while (logText != "") {
//                     logText = logKeyAccount.readln()
//                     if (user == logText.split(",")[2]) {
//                         // alert("cho phep dung!")
//                         flag = true
//                         break
//                     }
//                 }
//                 //Check Flag nếu true thì cho phép sử dụng.
//                 if (flag == true) {
//                     main()
//                 } else {
//                     alert("Liên hệ người cấp user!")
//                 }
//             } else {
//                 frame()
//             }

//         } else {//Yeu cau nhap key va tao file user ban dau
//             frame()
//         }
//         logUser.close()
//         logKeyAccount.close()
//     }

//     function frame() {
//         // DIALOG
//         // ======
//         var dialog = new Window("dialog");
//         dialog.text = "Input Key";
//         dialog.orientation = "column";
//         dialog.alignChildren = ["center", "top"];
//         dialog.spacing = 5;
//         dialog.margins = 10;

//         // VALIDATE
//         // ========
//         var validate = dialog.add("group", undefined, { name: "validate" });
//         validate.orientation = "row";
//         validate.alignChildren = ["left", "center"];
//         validate.spacing = 10;
//         validate.margins = 0;

//         var validateText = validate.add("statictext", undefined, undefined, { name: "validateText" });
//         validateText.preferredSize.width = 150;
//         validateText.justify = "center";
//         validateText.text = "Nhập Key để mở khóa!";

//         // BODY
//         // ====
//         var body = dialog.add("group", undefined, { name: "body" });
//         body.orientation = "row";
//         body.alignChildren = ["left", "center"];
//         body.spacing = 10;
//         body.margins = 0;

//         var edittext1 = body.add('edittext {justify: "center", properties: {name: "edittext1", enterKeySignalsOnChange: true}}');
//         edittext1.preferredSize.width = 150;
//         edittext1.preferredSize.height = 0;
//         edittext1.active = true

//         // GROUP1
//         // ======
//         var group1 = dialog.add("group", undefined, { name: "group1" });
//         group1.orientation = "row";
//         group1.alignChildren = ["left", "center"];
//         group1.spacing = 10;
//         group1.margins = 0;

//         var button1 = group1.add("button", undefined, undefined, { name: "Nhap_Key" });
//         button1.text = "Nhập Key";

//         var button2 = group1.add("button", undefined, undefined, { name: "Cancel" });
//         button2.text = "Hủy";

//         // BY

//         var by = dialog.add("statictext", undefined, undefined, { name: "by" });
//         by.preferredSize.width = 150;
//         by.preferredSize.height = 10
//         by.spacing = 15;
//         by.justify = "bottom";
//         by.text = "Aca - 1.01 -";


//         //Kiểm tra điều kiện Key được cung cấp.
//         button1.addEventListener("click", function () {
//             if (logKeyAccount.exists) {
//                 logKeyAccount.open("r")
//                 logText = logKeyAccount.read()
//                 logKeyAccount.close()
//                 logKeyAccount.open("r")
//                 logTextLine = logKeyAccount.readln()
//                 while (logTextLine != "") {
//                     logTextLine = logKeyAccount.readln()
//                     if (edittext1.text == logTextLine.split(",")[2]) {
//                         if (logTextLine.split(",")[3] == "1") {//Neu da duoc dang ky
//                             validateText.text = "Key đã được sử dụng!"
//                             break
//                         } else {
//                             logUser.open("w")
//                             status = logUser.writeln(edittext1.text)
//                             if (status == false) {
//                                 alert("Kích hoạt chưa thành công!")
//                             } else {
//                                 logKeyAccount.close()
//                                 logKeyAccount.open("w")
//                                 changeString = logText.replace(logTextLine.split(",")[2] + ",", logTextLine.split(",")[2] + ",1")
//                                 logKeyAccount.writeln(changeString)
//                                 dialog.close()
//                                 alert("Kích hoạt thành công!")
//                                 break
//                             }
//                         }
//                     } else {
//                         validateText.text = "Không đúng key!"
//                     }
//                 }
//                 edittext1.text = ""
//                 logUser.close()
//                 logKeyAccount.close()
//             }
//         })
//         edittext1.addEventListener("click", function () {
//         })

//         //Xử lý xự kiện bằng bàng phím
//         dialog.addEventListener("keydown", triggerBtnRun);
//         function triggerBtnRun(e) {
//             // alert(e.keyName)
//             if (e.keyName == "Enter" || e.keyName == "Space") {
//                 button1.dispatchEvent(new Event("click"))
//             }
//         }
//         dialog.show();
//     }
// })()
// main()

function main() {
    shadow_wiethe()
    function shadow_wiethe() {
        var arrVer = countVariant()
        for (var i = 1; i <= arrVer; i++) {
            doc.activeLayer = doc.layerSets["Variant " + i]
            if (checkAlllockLayer() == false) {
                if (i >= 2) {
                    doc.activeLayer = doc.layerSets["Variant " + i]
                    doc.activeLayer.visible = false
                    doc.layerSets["Variant " + i].visible = true
                }
                try {
                    nameShadow = doc.layerSets["Variant " + i].layerSets["Shadow " + i].artLayers[0].name
                } catch (error) {
                    nameShadow = null
                }
                if (nameShadow == "Alpha_dasaturate") {
                    doc.activeLayer = doc.layerSets["Variant " + i].layerSets["Shadow " + i].artLayers[0]
                    try { selectMask(); applyMask() } catch (error) { }
                    break
                }
                else if ((checkSelectionName("Pr") == false)) {
                    try {
                        doc.pathItems.getByName("Work Path").remove()
                    } catch (err) { }
                    visibleGroup("Resources")
                    doc.layerSets["Variant " + i].visible = true
                    copy_shadow_wiethe(i)
                    break
                }

                else {
                    makeHistoryRandum()
                    shadow_natural_whiethe(i)
                    logAction("log_ShadowWiethe")
                    purgeAll()
                    break
                }
            }
        }
        function copy_shadow_wiethe(vr) {
            grVariant = doc.layerSets["Variant " + vr]
            grItem = grVariant.layerSets["Item " + vr]
            grShadow = grVariant.layerSets["Shadow " + vr]

            /////////////////////////////
            doc.guides.removeAll()
            doc.activeLayer = grItem
            lengthItem = doc.activeLayer.layers.length
            for (var i = 0; i < lengthItem; i++) {
                //copy product
                doc.activeLayer = doc.activeLayer.layers[i]
                var searchProduct = doc.activeLayer.name.search("Product")
                if (searchProduct == 0) {
                    loadSelectionMask()
                    // doc.selection.feather(2)
                    try { saveSelection("Pr") } catch (error) { }
                    selectRGB()
                    doc.selection.selectAll()
                    doc.selection.copy()
                    doc.selection.deselect()
                    //paste
                    doc.activeLayer = grShadow
                    lengthShadow = doc.activeLayer.layers.length
                    if (lengthShadow == 0) {
                        pasteFoder()
                        doc.activeLayer.name = "temp_shadow"
                    } else {
                        for (var i = 0; i < lengthShadow; i++) {
                            doc.activeLayer = doc.activeLayer.layers[0]
                            doc.activeLayer.remove()
                            doc.activeLayer = doc.activeLayer.parent
                        }
                        doc.activeLayer = grShadow
                        pasteFoder()
                        doc.activeLayer.name = "temp_shadow"
                    }
                    break
                }
                doc.activeLayer = doc.activeLayer.parent
            }

            //Thong tin Stencil
            doc.activeLayer = grItem
            try {
                doc.activeLayer = grItem.artLayers["Stencil"]
                grItem.layers["Stencil"].visible = true
                newGuidesFromLayer()
                doc.activeLayer.visible = false
            } catch (error) {
                doc.activeLayer = grItem.artLayers["Product"]
                newGuidesFromLayer()

            }

            // for (var i = 0; i < lengthItem; i++) {
            //     doc.activeLayer = grItem.artLayers[i]
            //     var nameLayer = doc.activeLayer.name
            //     if (nameLayer == "Stencil") {
            //         doc.activeLayer.visible = true
            //         newGuidesFromLayer()
            //         doc.activeLayer.visible = false
            //         break
            //     } else {

            //         break
            //     }
            // }//End Crop Stencil

            doc.activeLayer = grShadow.artLayers["temp_shadow"]
            // doc.activeLayer.desaturate()
            //Kiem tra co rong nen khong
            var gLeft = doc.guides[0].coordinate
            var gRight = doc.guides[1].coordinate
            var gBottom = doc.guides[3].coordinate
            var rightLayerSD = doc.activeLayer.bounds[2]
            if (rightLayerSD < gRight) {
                left = rightLayerSD - 100
                right = gRight
                top = gBottom / 2
                bottom = gBottom
                makeSelection(left, right, top, bottom)
                fillContentAware()
                doc.selection.deselect()
            }
            var leftLayerSD = doc.activeLayer.bounds[0]
            if (leftLayerSD > gLeft) {
                left = gLeft
                right = leftLayerSD + 100
                top = gBottom / 2
                bottom = gBottom
                makeSelection(left, right, top, bottom)
                fillContentAware()
                doc.selection.deselect()
            }

            doc.selection.load(doc.channels.getByName("Pr"))
            doc.selection.invert()
            doc.selection.contract(10)
            //Lay giao vung chon
            IntW(50, 0, 100, 100)
            saveHistory()
            dust(10, 4)
            doc.selection.deselect()
            selectHistoryBrushTool()
            // healingTool()
        }
        //Giu bong goc
        function shadow_natural_whiethe(vr) {
            grVariant = doc.layerSets["Variant " + vr]
            grColor = grVariant.layerSets["Color " + vr]
            grItem = grVariant.layerSets["Item " + vr]
            grShadow = grVariant.layerSets["Shadow " + vr]
            grBg = grVariant.layerSets["Background " + vr]
            try {
                doc.activeLayer = grShadow.artLayers["temp_shadow"]
            } catch (error) {
                copy_shadow(vr)
            }

            if (doc.quickMaskMode == true) {
                doc.quickMaskMode = false
                doc.selection.invert()
                saveSelection("selection")
                doc.selection.deselect()
                doc.activeLayer = grShadow.artLayers["temp_shadow"]
                Raw()
            }
            else if (workPathExists()) {
                doc.pathItems.getByName("Work Path").deselect()
                doc.pathItems.getByName("Work Path").makeSelection()
                // doc.selection.feather(30)
                action("Fthr")
                saveSelection("selection")
                doc.selection.deselect()
                doc.activeLayer = grShadow.artLayers["temp_shadow"]
                Raw()
            }
            else if (hasSelection()) {
                doc.selection.feather(30)
                saveSelection("selection")
                doc.selection.deselect()
                doc.activeLayer = grShadow.artLayers["temp_shadow"]
                Raw()
            }
            selectEraseTool()

        }

        //Check so luong variant.
        function countVariant() {
            length = doc.layerSets.length - 2
            return length
        }
        //raw shadow
        function Raw() {
            doc.activeLayer.name = "Natural"
            doc.colorSamplers.removeAll();
            var gRight = doc.guides[1].coordinate
            var gBottom = doc.guides[3].coordinate
            // Add a Color Sampler at a given x and y coordinate in the image.
            var pointTop = doc.colorSamplers.add([(gRight - 100), (gBottom - 100)]);

            // Obtain array of RGB values.
            var rgb1 = [
                pointTop.color.rgb.red,
                pointTop.color.rgb.green,
                pointTop.color.rgb.blue
            ];
            makeWhitePointTool()
            actionFilter("Lvls")
            var rgb2 = [
                pointTop.color.rgb.red,
                pointTop.color.rgb.green,
                pointTop.color.rgb.blue
            ];

            if (rgb2[0] != rgb1[0] || rgb2[1] != rgb1[1] || rgb2[2] != rgb1[2]) {
                try {
                    cameraRaw(30, 40)
                } catch (error) {
                }
                doc.activeLayer = grShadow.artLayers["Natural"]
                loadSelectionChannel()
                doc.selection.invert()
                makeLayer("Alpha_dasaturate")
                fillColor(10, 10, 10)
                grShadow.artLayers['Natural'].remove()
                doc.selection.load(doc.channels.getByName("selection"))
                makeLayerMask()
                try { doc.channels.getByName("Pr").remove(); } catch (err) { }
                try { doc.channels.getByName("selection").remove(); } catch (err) { }
                selectMask()
            } else {
                doc.activeLayer = grShadow.artLayers["Natural"]
                loadSelectionChannel()
                doc.selection.invert()
                makeLayer("Alpha_dasaturate")
                fillColor(0, 0, 0)
                addMask()
                doc.selection.load(doc.channels.getByName("selection"))
                doc.selection.invert()
                fillColor(0, 0, 0)
                doc.selection.deselect()
                action("CpTL")
                doc.activeLayer.opacity = 50
                selectMask()
                selectBrushTool()
                grShadow.artLayers['Natural'].remove()
                try { doc.channels.getByName("Pr").remove(); } catch (err) { }
                try { doc.channels.getByName("selection").remove(); } catch (err) { }
                actionMore("Mrg2", "Aply")
            }
            doc.colorSamplers.removeAll()
        }

        function makeSelection(left, right, top, bottom) {
            result = false
            try {
                //leftTop, leftBottom, rightBottom rightTop
                shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
                doc.selection.select(shapeRef)
                result = true
            } catch (error) {
            }
            return result
        }

        function IntW(top, left, bottom, right) {
            var c2t = function (s) {
                return app.charIDToTypeID(s);
            };

            var s2t = function (s) {
                return app.stringIDToTypeID(s);
            };

            var descriptor = new ActionDescriptor();
            var descriptor2 = new ActionDescriptor();
            var reference = new ActionReference();

            reference.putProperty(s2t("channel"), s2t("selection"));
            descriptor.putReference(c2t("null"), reference);
            descriptor2.putUnitDouble(s2t("top"), s2t("percentUnit"), top);
            descriptor2.putUnitDouble(s2t("left"), s2t("percentUnit"), left);
            descriptor2.putUnitDouble(s2t("bottom"), s2t("percentUnit"), bottom);
            descriptor2.putUnitDouble(s2t("right"), s2t("percentUnit"), right);
            descriptor.putObject(s2t("to"), s2t("rectangle"), descriptor2);
            executeAction(c2t("IntW"), descriptor, DialogModes.NO);
        }
        function selectHistoryBrushTool() {
            var idslct = charIDToTypeID("slct");
            var desc2364 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref494 = new ActionReference();
            var idHBTl = charIDToTypeID("HBTl");
            ref494.putClass(idHBTl);
            desc2364.putReference(idnull, ref494);
            executeAction(idslct, desc2364, DialogModes.NO);

        }
        function actionMore(action, style) {
            var idMrgtwo = charIDToTypeID(action);
            var desc1486 = new ActionDescriptor();
            var idAply = charIDToTypeID(style);
            desc1486.putBoolean(idAply, true);
            executeAction(idMrgtwo, desc1486, DialogModes.NO);
        }
    }//end Shadow wiethe

    //Kiem tra bong
    function check_shadow(vr) {
        grVariant = doc.layerSets["Variant " + vr]
        grColor = grVariant.layerSets["Color " + vr]
        grItem = grVariant.layerSets["Item " + vr]
        grShadow = grVariant.layerSets["Shadow " + vr]
        grBg = grVariant.layerSets["Background " + vr]

        var guideSelection = guidesToSelection()
        try {
            if (guideSelection == true) {
                //Selection Stencil
                bounds = doc.selection.bounds
                LeftStencil = bounds[0]
                topStencil = bounds[1]
                rightStencil = bounds[2]
                bottomStencil = bounds[3]
                //Selection Product
                doc.selection.load(doc.channels.getByName("Pr"))
                boundsPr = doc.selection.bounds
                LeftPr = boundsPr[0]
                topPr = boundsPr[1]
                rightPr = boundsPr[2]
                bottomPr = boundsPr[3]

                //Check selection Stencil width 
                LeftPr <= LeftStencil ? left = LeftPr : left = LeftStencil + 5
                topPr <= topStencil ? top = topPr : top = topStencil + 5
                rightPr >= rightStencil ? right = rightPr : right = rightStencil - 5
                bottomPr >= bottomStencil ? bottom = bottomPr : bottom = bottomStencil - 5

                //Trim shadow.
                makeSelection(left, right, top, bottom)
                doc.activeLayer = grShadow.artLayers["temp_shadow"]
                selectMask()
                doc.selection.invert()
                fillColor(0, 0, 0, 0)
                doc.selection.feather(3)
                fillColor(0, 0, 0, 0)
                doc.selection.deselect()
            }
        } catch (error) {
        }
    }

    //kiem tra le shadow
    function check_canvas(vr) {
        grVariant = doc.layerSets["Variant " + vr]
        grColor = grVariant.layerSets["Color " + vr]
        grItem = grVariant.layerSets["Item " + vr]
        grShadow = grVariant.layerSets["Shadow " + vr]
        grBg = grVariant.layerSets["Background " + vr]

        makeLevels()
        doc.activeLayer.name = "Check_Shadow"
        doc.activeLayer.opacity = 50
        // doc.activeLayer.visible = false
        deleteMask()
        setLevels()
        doc.activeLayer = grShadow.artLayers[1]
    }

}

//Check so luong variant.
function countVariant() {
    length = doc.layerSets.length - 2
    return length
}

function clearShadow() {
    try {
        // dust(8, 5)
        cameraRaw(80)
    } catch (error) {
    }
}
function makeSelection(left, right, top, bottom) {
    result = false
    try {
        //leftTop, leftBottom, rightBottom rightTop
        shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
        doc.selection.select(shapeRef)
        result = true
    } catch (error) {
    }
    return result
}

function guidesToSelection() {
    var result = false
    try {
        var left = doc.guides[0].coordinate //left
        var right = doc.guides[1].coordinate //right
        var top = doc.guides[2].coordinate	//top
        var bottom = doc.guides[3].coordinate // bottom
        //eftTop, leftBottom, rightBottom rightTop
        var shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
        doc.selection.select(shapeRef)
        result = true
    } catch (error) {
    }
    return result
}
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

function action(action) {
    var idCpTL = charIDToTypeID(action);
    executeAction(idCpTL, undefined, DialogModes.NO);
}

function actionFilter(params) {
    try {
        var idLqFy = charIDToTypeID(params);
        executeAction(idLqFy, undefined, DialogModes.ALL);
    } catch (error) { }
}

function fillColor(red, green, blue) {
    var myColor = new SolidColor();
    myColor.rgb.red = red; // 0 - 255
    myColor.rgb.green = green;
    myColor.rgb.blue = blue;
    activeDocument.selection.fill(myColor);
}

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

function makeLevels() {
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
}

function setLevels() {
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
    descriptor2.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
    descriptor3.putReference(s2t("channel"), reference2);
    list2.putInteger(250);
    list2.putInteger(255);
    descriptor3.putList(s2t("input"), list2);
    list.putObject(s2t("levelsAdjustment"), descriptor3);
    descriptor2.putList(s2t("adjustment"), list);
    descriptor.putObject(s2t("to"), s2t("levels"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
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


function visibleGroup(Group) {
    if (!Group) {
        for (var i = 1; i < doc.layers.length - 2; i++) {
            setSelectedLayer("Variant " + String(i + 1)) == true ? doc.activeLayer.visible = false : "";
        }
    } else {
        setSelectedLayer(Group);
        doc.activeLayer.visible = false;
    }
}


//select layer
function setSelectedLayer(layerName) {
    var result = false;
    try {
        var idslct = charIDToTypeID("slct");
        var desc19 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref1 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref1.putName(idLyr, layerName);
        desc19.putReference(idnull, ref1);
        var idMkVs = charIDToTypeID("MkVs");
        desc19.putBoolean(idMkVs, false);
        var idLyrI = charIDToTypeID("LyrI");
        var list2 = new ActionList();
        list2.putInteger(10);
        desc19.putList(idLyrI, list2);
        executeAction(idslct, desc19, DialogModes.NO);
        result = true;
    } catch (error) {
    }
    return result;
}
function layerLocker(layer1) {
    var lLock = false;
    if (setSelectedLayer(layer1) == true) {
        if (activeDocument.activeLayer.allLocked) {
            lLock = true;
        }
    }
    return lLock;
}

function checkAlllockLayer() {
    var result = false;
    try {
        if (doc.activeLayer.allLocked ||
            doc.activeLayer.pixelsLocked ||
            doc.activeLayer.positionLocked ||
            doc.activeLayer.transparentPixelsLocked) {
            result = true;
        }
    } catch (error) { }
    return result;
}
//kiem tra ton tai selection với tên .....
function checkSelectionName(nameChannel) {
    var result = false;
    try {
        var channelRef = doc.channels.getByName(nameChannel);
        if (channelRef) {
            // app.activeDocument.selection.load(channelRef);
            result = true;
        }
    } catch (error) { }
    return result;
}

function makeLayerMask() {
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
    descriptor.putEnumerated(s2t("using"), c2t("UsrM"), s2t("revealSelection"));
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

function disableMask() {
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
    descriptor2.putBoolean(c2t("UsrM"), false);
    descriptor.putObject(s2t("to"), s2t("layer"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
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

function moveDown(params) {
    var idslct = charIDToTypeID("slct");
    var desc704 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref513 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idBckw = charIDToTypeID("Bckw");
    ref513.putEnumerated(idLyr, idOrdn, idBckw);
    desc704.putReference(idnull, ref513);
    var idMkVs = charIDToTypeID("MkVs");
    desc704.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    var list155 = new ActionList();
    list155.putInteger(114);
    desc704.putList(idLyrI, list155);
    executeAction(idslct, desc704, DialogModes.NO);
}

function moveBack() {
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


function selectGroupLayer(after) {
    // setSelectedLayer(before);
    var idslct = charIDToTypeID("slct");
    var desc360 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref187 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref187.putName(idLyr, after);
    desc360.putReference(idnull, ref187);
    var idselectionModifier = stringIDToTypeID("selectionModifier");
    var idselectionModifierType = stringIDToTypeID("selectionModifierType");
    var idaddToSelectionContinuous = stringIDToTypeID("addToSelectionContinuous");
    desc360.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelectionContinuous);
    var idMkVs = charIDToTypeID("MkVs");
    desc360.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    var list94 = new ActionList();
    desc360.putList(idLyrI, list94);
    executeAction(idslct, desc360, DialogModes.NO);
}
function deleteMask(params) {
    var idDlt = charIDToTypeID("Dlt ");
    var desc4950 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref1060 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref1060.putEnumerated(idChnl, idChnl, idMsk);
    desc4950.putReference(idnull, ref1060);
    executeAction(idDlt, desc4950, DialogModes.NO);
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
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

//ungroup 
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

//Gry "Vlt "Bl  "Grn "Ylw "Orng" 
function setColorLayer(color) {
    var idsetd = charIDToTypeID("setd");
    var desc18 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref8 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref8.putEnumerated(idLyr, idOrdn, idTrgt);
    desc18.putReference(idnull, ref8);
    var idT = charIDToTypeID("T   ");
    var desc19 = new ActionDescriptor();
    var idClr = charIDToTypeID("Clr ");
    var idClr = charIDToTypeID("Clr ");
    var idBl = charIDToTypeID(color);
    desc19.putEnumerated(idClr, idClr, idBl);
    var idLyr = charIDToTypeID("Lyr ");
    desc18.putObject(idT, idLyr, desc19);
    executeAction(idsetd, desc18, DialogModes.NO);
}

function pasteFoder() {
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

function loadSelectionVectorMask() {
    var idsetd = charIDToTypeID("setd");
    var desc48 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref27 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref27.putProperty(idChnl, idfsel);
    desc48.putReference(idnull, ref27);
    var idT = charIDToTypeID("T   ");
    var ref28 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    var idPath = charIDToTypeID("Path");
    var idvectorMask = stringIDToTypeID("vectorMask");
    ref28.putEnumerated(idPath, idPath, idvectorMask);
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref28.putEnumerated(idLyr, idOrdn, idTrgt);
    desc48.putReference(idT, ref28);
    var idVrsn = charIDToTypeID("Vrsn");
    desc48.putInteger(idVrsn, 1);
    var idvectorMaskParams = stringIDToTypeID("vectorMaskParams");
    desc48.putBoolean(idvectorMaskParams, true);
    executeAction(idsetd, desc48, DialogModes.NO);
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

function subtract(selection) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putName(s2t("channel"), selection);
    descriptor.putReference(c2t("null"), reference);
    reference2.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(s2t("from"), reference2);
    executeAction(s2t("subtract"), descriptor, DialogModes.NO);
}

function IntrLayer(layer) {
    var idIntr = charIDToTypeID("Intr");
    var desc804 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref96 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idTrsp = charIDToTypeID("Trsp");
    ref96.putEnumerated(idChnl, idChnl, idTrsp);
    var idLyr = charIDToTypeID("Lyr ");
    ref96.putName(idLyr, layer);
    desc804.putReference(idnull, ref96);
    var idWith = charIDToTypeID("With");
    var ref97 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref97.putProperty(idChnl, idfsel);
    desc804.putReference(idWith, ref97);
    executeAction(idIntr, desc804, DialogModes.NO);

}
function Intr() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("transparencyEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(s2t("with"), reference2);
    executeAction(c2t("Intr"), descriptor, DialogModes.NO);
}

//function check History colorCopy
function makeHistoryRandum() {
    var randumHistory = Math.random();
    makeHistory(randumHistory);
    return randumHistory;
}

//Save History
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


function loadSelectionChannel() {
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
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("RGB"));
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}
function showCurentLayer() {
    var idShw = charIDToTypeID("Shw ");
    var desc294 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var list43 = new ActionList();
    var ref83 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref83.putEnumerated(idLyr, idOrdn, idTrgt);
    list43.putReference(ref83);
    desc294.putList(idnull, list43);
    var idTglO = charIDToTypeID("TglO");
    desc294.putBoolean(idTglO, true);
    executeAction(idShw, desc294, DialogModes.NO);

}

function showLayer(layer) {
    var c2t = function (s) {
        return app.charIDToTypeID(s)
    }

    var s2t = function (s) {
        return app.stringIDToTypeID(s)
    }

    var descriptor = new ActionDescriptor()
    var list = new ActionList()
    var reference = new ActionReference()

    reference.putName(s2t("layer"), layer)
    list.putReference(reference)
    descriptor.putList(c2t("null"), list)
    descriptor.putBoolean(c2t("TglO"), true)
    executeAction(s2t("show"), descriptor, DialogModes.NO)
}

function subtractFrom(horizontal, vertical) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putUnitDouble(s2t("horizontal"), s2t("percentUnit"), horizontal);
    descriptor2.putUnitDouble(s2t("vertical"), s2t("percentUnit"), vertical);
    descriptor.putObject(s2t("to"), c2t("Pnt "), descriptor2);
    descriptor.putInteger(s2t("tolerance"), 0);
    descriptor.putBoolean(s2t("merged"), true);
    descriptor.putBoolean(c2t("AntA"), true);
    descriptor.putBoolean(s2t("contiguous"), true);
    executeAction(s2t("subtractFrom"), descriptor, DialogModes.NO);
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

function loadSelectionCurentLayer() {
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
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("transparencyEnum"));
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

function loadSelectionLayer(lyr) {
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
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("transparencyEnum"));
    reference2.putName(s2t("layer"), lyr);
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
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

function hueSaturation(colorize, hue, Strt, lightness) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var list = new ActionList();

    descriptor.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    descriptor.putBoolean(s2t("colorize"), colorize);
    descriptor2.putInteger(s2t("hue"), hue);
    descriptor2.putInteger(c2t("Strt"), Strt);
    descriptor2.putInteger(s2t("lightness"), lightness);
    list.putObject(s2t("hueSatAdjustmentV2"), descriptor2);
    descriptor.putList(s2t("adjustment"), list);
    executeAction(s2t("hueSaturation"), descriptor, DialogModes.NO);
}

function canvasSize(width, height) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    descriptor.putBoolean(s2t("relative"), true);
    descriptor.putUnitDouble(s2t("width"), s2t("percentUnit"), width);
    descriptor.putUnitDouble(s2t("height"), s2t("percentUnit"), height);
    descriptor.putEnumerated(s2t("horizontal"), s2t("horizontalLocation"), c2t("Cntr"));
    descriptor.putEnumerated(s2t("vertical"), s2t("verticalLocation"), c2t("Cntr"));
    executeAction(s2t("canvasSize"), descriptor, DialogModes.NO);
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
function newGuidesFromLayer() {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };
    executeAction(s2t("newGuidesFromTarget"), undefined, DialogModes.NO);
}

function newGuideLayout(marginTop, marginLeft, marginBottom, marginRight) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();

    descriptor.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    descriptor2.putUnitDouble(s2t("marginTop"), s2t("pixelsUnit"), marginTop);
    descriptor2.putUnitDouble(s2t("marginLeft"), s2t("pixelsUnit"), marginLeft);
    descriptor2.putUnitDouble(s2t("marginBottom"), s2t("pixelsUnit"), marginBottom);
    descriptor2.putUnitDouble(s2t("marginRight"), s2t("pixelsUnit"), marginRight);
    descriptor2.putInteger(c2t("GdCA"), 0);
    descriptor2.putInteger(c2t("GdCR"), 255);
    descriptor2.putInteger(c2t("GdCG"), 255);
    descriptor2.putInteger(c2t("GdCB"), 255);
    descriptor.putObject(s2t("guideLayout"), s2t("guideLayout"), descriptor2);
    descriptor.putEnumerated(s2t("guideTarget"), s2t("guideTarget"), s2t("guideTargetCanvas"));
    executeAction(s2t("newGuideLayout"), descriptor, DialogModes.NO);
}

function cameraRaw(lumi) {
    var idAdobeCameraRawFilter = stringIDToTypeID("Adobe Camera Raw Filter");
    var desc605 = new ActionDescriptor();
    var idCrVe = charIDToTypeID("CrVe");
    desc605.putString(idCrVe, "15.0");
    var idPrVN = charIDToTypeID("PrVN");
    desc605.putInteger(idPrVN, 5);
    var idPrVe = charIDToTypeID("PrVe");
    desc605.putInteger(idPrVe, 184549376);
    var idLNR = charIDToTypeID("LNR ");
    desc605.putInteger(idLNR, lumi);
    var idLNRD = charIDToTypeID("LNRD");
    desc605.putInteger(idLNRD, 50);
    var idLNRC = charIDToTypeID("LNRC");
    desc605.putInteger(idLNRC, 0);
    executeAction(idAdobeCameraRawFilter, desc605, DialogModes.NO);
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

    // =======================================================
}
function dust(radius, threshold) {
    // body...
    var idDstS = charIDToTypeID("DstS");
    var desc593 = new ActionDescriptor();
    var idRds = charIDToTypeID("Rds ");
    desc593.putInteger(idRds, radius);
    var idThsh = charIDToTypeID("Thsh");
    desc593.putInteger(idThsh, threshold);
    executeAction(idDstS, desc593, DialogModes.NO);

}
function makeSlice() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putClass(s2t("slice"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putEnumerated(s2t("type"), s2t("sliceType"), s2t("layer"));
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor2.putReference(s2t("layer"), reference2);
    descriptor.putObject(s2t("using"), s2t("slice"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

function selectEraseTool() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("eraserTool"));
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

function setSelectedLayer(layerName) {
    var result = false;
    try {
        var idslct = charIDToTypeID("slct");
        var desc19 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref1 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref1.putName(idLyr, layerName);
        desc19.putReference(idnull, ref1);
        var idMkVs = charIDToTypeID("MkVs");
        desc19.putBoolean(idMkVs, false);
        var idLyrI = charIDToTypeID("LyrI");
        var list2 = new ActionList();
        list2.putInteger(10);
        desc19.putList(idLyrI, list2);
        executeAction(idslct, desc19, DialogModes.NO);
        result = true;
    } catch (error) {
    }
    return result;
}

function makeWhitePointTool() {
    try {
        var idslct = charIDToTypeID("slct");
        var desc2282 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref156 = new ActionReference();
        var idwhitePointTool = stringIDToTypeID("whitePointTool");
        ref156.putClass(idwhitePointTool);
        desc2282.putReference(idnull, ref156);
        var iddontRecord = stringIDToTypeID("dontRecord");
        desc2282.putBoolean(iddontRecord, true);
        var idforceNotify = stringIDToTypeID("forceNotify");
        desc2282.putBoolean(idforceNotify, true);
        executeAction(idslct, desc2282, DialogModes.NO);
    } catch (e) { }

    try {
        var idslct = charIDToTypeID("slct");
        var desc28 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref12 = new ActionReference();
        var idwhitePointTool = stringIDToTypeID("whitePointTool");
        ref12.putClass(idwhitePointTool);
        desc28.putReference(idnull, ref12);
        var iddontRecord = stringIDToTypeID("dontRecord");
        desc28.putBoolean(iddontRecord, true);
        var idforceNotify = stringIDToTypeID("forceNotify");
        desc28.putBoolean(idforceNotify, true);
        executeAction(idslct, desc28, DialogModes.NO);

    } catch (e) { }

    try {
        var idslct = charIDToTypeID("slct");
        var desc255 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref7 = new ActionReference();
        var idwhitePointTool = stringIDToTypeID("whitePointTool");
        ref7.putClass(idwhitePointTool);
        desc255.putReference(idnull, ref7);
        var iddontRecord = stringIDToTypeID("dontRecord");
        desc255.putBoolean(iddontRecord, true);
        var idforceNotify = stringIDToTypeID("forceNotify");
        desc255.putBoolean(idforceNotify, true);
        executeAction(idslct, desc255, DialogModes.NO);

    } catch (e) { }
}


function fillContentAware() {
    var idFl = charIDToTypeID("Fl  ");
    var desc130 = new ActionDescriptor();
    var idUsng = charIDToTypeID("Usng");
    var idFlCn = charIDToTypeID("FlCn");
    var idcontentAware = stringIDToTypeID("contentAware");
    desc130.putEnumerated(idUsng, idFlCn, idcontentAware);
    var idcontentAwareColorAdaptationFill = stringIDToTypeID("contentAwareColorAdaptationFill");
    desc130.putBoolean(idcontentAwareColorAdaptationFill, false);
    var idcontentAwareRotateFill = stringIDToTypeID("contentAwareRotateFill");
    desc130.putBoolean(idcontentAwareRotateFill, false);
    var idcontentAwareScaleFill = stringIDToTypeID("contentAwareScaleFill");
    desc130.putBoolean(idcontentAwareScaleFill, false);
    var idcontentAwareMirrorFill = stringIDToTypeID("contentAwareMirrorFill");
    desc130.putBoolean(idcontentAwareMirrorFill, false);
    var idOpct = charIDToTypeID("Opct");
    var idPrc = charIDToTypeID("#Prc");
    desc130.putUnitDouble(idOpct, idPrc, 100.000000);
    var idMd = charIDToTypeID("Md  ");
    var idBlnM = charIDToTypeID("BlnM");
    var idNrml = charIDToTypeID("Nrml");
    desc130.putEnumerated(idMd, idBlnM, idNrml);
    executeAction(idFl, desc130, DialogModes.NO);
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

