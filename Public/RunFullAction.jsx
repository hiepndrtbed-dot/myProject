#target photoshop;
const versionTo = " By Acad Da Nang -- Version: 1.01 -- "
//Login

////////////////////////////////
app.preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS

const doc = app.activeDocument;

const selection = "Acad_Selection"
const namePath = "Work Path";

//login 
//Check Login
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
//         by.active = false


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
main()
function main() {
    // logAction("Run_Full_Action");
    // DIALOG
    const opacityShadow = ["Opacity", "90", "80", "70", "60", "50", "40", "30", "20", "10"]
    var opacitySh = 100
    var trimShadow = true
    // ======
    var dialog = new Window("dialog")
    dialog.text = "RUN ALL ACTION"
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10
    dialog.margins = 10
    // dialog.active = true;
    // GROUP1
    // ======
    var group1 = dialog.add("group", undefined, { name: "group1" });
    group1.orientation = "column";
    group1.alignment = ["left", "center"];
    group1.spacing = 3;
    group1.margins = 0;
    var button1 = group1.add("button", undefined, undefined, { name: "Camera Raw" });
    button1.text = "Camera Raw (0)";
    button1.alignment = ["left", "center"];
    button1.preferredSize.width = 170;
    //Dust & stratches ....
    var buttonDust = group1.add("button", undefined, undefined, { name: "Dust" });
    buttonDust.text = "Dust & Stratches.. (D)";
    buttonDust.alignment = ["left", "center"];
    buttonDust.preferredSize.width = 170;
    //apply ......
    var buttonApply = group1.add("button", undefined, undefined, { name: "Dust" });
    buttonApply.text = "Apply Image.. (A)";
    buttonApply.alignment = ["left", "center"];
    buttonApply.preferredSize.width = 170;

    //Empty layer
    var buttonEmptyLayer = group1.add("button", undefined, undefined, { name: "Empty Layer" });
    buttonEmptyLayer.text = "Empty Layer.. (E)"
    buttonEmptyLayer.alignment = ["left", "center"]
    buttonEmptyLayer.preferredSize.width = 170
    //Copy sill shape
    var button2 = group1.add("button", undefined, undefined, { name: "Copy Sill (2)" });
    button2.text = "Copy Sill (2)";
    button2.alignment = ["left", "center"];
    button2.preferredSize.width = 170;
    //Create guide shape
    var buttonGuide = group1.add("button", undefined, undefined, { name: "Create Guide" });
    buttonGuide.text = "Guide shape (G)";
    buttonGuide.alignment = ["left", "center"];
    buttonGuide.preferredSize.width = 170;
    //Lật product có độ tương phản thấp
    var button5 = group1.add("button", undefined, undefined, { name: "Flip_Canvas_Product_White" });
    button5.text = "Flip_Canvas_Product_White"
    button5.preferredSize.width = 170;
    //Xóa action 75% skill Background Retouch của hệ thống.
    var button3 = group1.add("button", undefined, undefined, { name: "deleteSetAction 75%" });
    button3.text = "deleteSetAction 75%";
    button3.preferredSize.width = 170;
    //Lam thẳng đường chân tường
    var button4 = group1.add("button", undefined, undefined, { name: "Line_War_Background (l)" });
    button4.text = "Line_Wall_Background (L)";
    button4.preferredSize.width = 170;
    //Update layer chỉnh màu từ ver 3 lên variant 4
    var button6 = group1.add("button", undefined, undefined, { name: "Orendt_Update" });
    button6.text = "Orendt_Update Ver 4"
    button6.preferredSize.width = 170;
    //Tóc bay
    var buttonHairFly = group1.add("button", undefined, undefined, { name: "Hair Fly" });
    buttonHairFly.text = "Hair Fly"
    buttonHairFly.preferredSize.width = 170;
    //Skin tone
    var buttonSkin = group1.add("button", undefined, undefined, { name: "Skin" });
    buttonSkin.text = "Skin Tone"
    buttonSkin.preferredSize.width = 170;

    //////////////////////////////
    //Đóng form
    var buttonClose = group1.add("button", undefined, undefined, { name: "Cancel" });
    buttonClose.text = "Cancel";
    buttonClose.preferredSize.width = 170;
    buttonClose.active = true

    // Xử lý sự kiện click
    //Làm đều nền
    button1.addEventListener("click", function () {
        dialog.close()
        cameraRaw(100, 0);
    })
    // Copy sill shape
    button2.addEventListener("click", function () {
        dialog.close()
        searchStructCopySill()
    })
    //Xóa action 75%
    button3.addEventListener("click", function () {
        dialog.close()
        deleteSetAction("Desaturate BG 75%")
    })
    // Làm thẳng chân tường
    button4.addEventListener("click", function () {
        dialog.close()
        lineBackground()
    })
    //Lật sản phẩm có tương phản thấp
    button5.addEventListener("click", function () {
        dialog.close()
        flipCanvasProductWhite()
    })
    //Update orendt
    button6.addEventListener("click", function () {
        dialog.close()
        updateOrendt()
    })

    //Dust & Stratches..
    buttonDust.addEventListener("click", function () {
        dialog.close()
        dustStracthes(1)
    })


    //Apply image
    buttonApply.addEventListener("click", function () {
        dialog.close()
        applyImage()
    })

    //Apply image
    buttonEmptyLayer.addEventListener("click", function () {
        dialog.close()
        emptyLayer()
    })

    //Tóc bay
    buttonHairFly.addEventListener("click", function () {
        dialog.close()
        hairFly()
    })

    //Skin
    buttonSkin.addEventListener("click", function () {
        dialog.close()
        skinTone()
    })


    //Create Guide shape
    buttonGuide.addEventListener("click", function () {
        dialog.close()
        createGuide()
    })

    //===============
    //Đóng form
    buttonClose.addEventListener("click", function () {
        dialog.close()
    })


    //Xử lý xự kiện bằng bàng phím
    dialog.addEventListener("keydown", triggerBtnRun);
    function triggerBtnRun(e) {
        // alert(e.keyName)
        if (e.keyName == "0") {
            button1.dispatchEvent(new Event("click"))
        }
        else if (e.keyName == "2") {
            button2.dispatchEvent(new Event("click"))
        }
        else if (e.keyName == "3") {
            button3.dispatchEvent(new Event("click"))
        }
        else if (e.keyName == "L") {
            button4.dispatchEvent(new Event("click"))
        }
        else if (e.keyName == "5") {
            button5.dispatchEvent(new Event("click"))
        }
        else if (e.keyName == "D") {
            buttonDust.dispatchEvent(new Event("click"))
        }
        else if (e.keyName == "A") {
            buttonApply.dispatchEvent(new Event("click"))
        }
        else if (e.keyName == "E") {
            buttonEmptyLayer.dispatchEvent(new Event("click"))
        }
        else if (e.keyName == "G") {
            buttonGuide.dispatchEvent(new Event("click"))
        }

        else if (e.keyName == "Escape") {
            buttonClose.dispatchEvent(new Event("click"))
        } else {
            alert("Input fail!!!!")
        }
    }

    //Group version
    var Vesion = group1.add("group", undefined, { name: "Version" })
    Vesion.orientation = "column"
    Vesion.alignChildren = ["left", "bottom"]
    Vesion.spacing = 10
    Vesion.margins = 0
    Vesion.alignment = ["left", "bottom"]

    var version = Vesion.add("statictext", undefined, undefined, { name: "version" })
    version.text = versionTo
    version.alignment = ["left", "bottom"]
    dialog.show();


    function skinTone() {
        alert("Chưa viết xong, chờ nhé :))!!!!")
    }

    function hairFly() {
        try { doc.pathItems[namePath].deselect() } catch (error) { }
        vr = doc.activeLayer.parent.name.slice(-1)

        grResources = new Groups(["Resources"])
        grVariant = new Groups(["Variant " + vr])
        grColor = new Groups(["Variant " + vr, "Color " + vr])
        grItem = new Groups(["Variant " + vr, "Item " + vr])
        grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
        grBg = new Groups(["Variant " + vr, "Background " + vr])

        grResources.hideGroup()
        doc.selection.selectAll()
        subtractFrom(98.869048, 2.662192, 10, true, true, false)
        doc.selection.invert()
        setTool("cloneStampTool")

    }

    function subtractFrom(horizontal, vertical, tolerance, merged, AntA, contiguous) {
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
        descriptor.putInteger(s2t("tolerance"), tolerance);
        descriptor.putBoolean(s2t("merged"), merged);
        descriptor.putBoolean(c2t("AntA"), AntA);
        descriptor.putBoolean(s2t("contiguous"), contiguous);
        executeAction(s2t("subtractFrom"), descriptor, DialogModes.NO);
    }

    function createGuide() {

        try { doc.pathItems[namePath].deselect() } catch (error) { }
        vr = doc.activeLayer.parent.name.slice(-1)

        grResources = new Groups(["Resources"])
        grVariant = new Groups(["Variant " + vr])
        grColor = new Groups(["Variant " + vr, "Color " + vr])
        grItem = new Groups(["Variant " + vr, "Item " + vr])
        grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
        grBg = new Groups(["Variant " + vr, "Background " + vr])

        grResources.hideGroup()
        grColor.hideGroup()
        grItem.selectGroup()

        try {
            //Cấu trúc saw
            lengthItem = doc.activeLayer.artLayers.length
        } catch (error) {
            //Cấu trúc ngoài saw
            lengthItem = doc.artLayers.length
        }
        if (lengthItem > 1) {
            do {
                try {
                    //Cấu trúc saw
                    doc.activeLayer = doc.activeLayer.artLayers[lengthItem - 2]
                } catch (error) {
                    //Cấu trúc ngoài saw
                    doc.activeLayer = doc.artLayers[lengthItem - 2]
                }
                if (doc.activeLayer.name != "Stencil") {
                    action("Mrg2")
                }

                try { doc.activeLayer = doc.activeLayer.parent } catch (error) { }
                lengthItem = lengthItem - 1
            } while (lengthItem > 1)
        }

        try {
            if (doc.activeLayer.artLayers[0].name == "Stencil") {
                doc.activeLayer.artLayers[0].visible = false
                doc.activeLayer = doc.activeLayer.artLayers[1]
            } else {
                doc.activeLayer = doc.activeLayer.artLayers[0]
            }
        } catch (error) {
        }
        newGuideLayout(true, 4, 15, true, 30);
        liquify()
        grColor.unHiddenGroup()

    }
    function applyImage() {
        try {
            deleteSnapShot("Temp")
        } catch (error) {

        } finally {
            vr = doc.activeLayer.parent.name.slice(-1)
            grResources = new Groups(["Resources"])
            grVariant = new Groups(["Variant " + vr])
            grColor = new Groups(["Variant " + vr, "Color " + vr])
            grItem = new Groups(["Variant " + vr, "Item " + vr])
            grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
            grBg = new Groups(["Variant " + vr, "Background " + vr])
            grResources.hideGroup()
            grColor.hideGroup()
            try { doc.pathItems[namePath].deselect() } catch (error) { }
            makeLayer("Blue_" + Math.random(1, 10))
            //merge layer
            var idMrgV = charIDToTypeID("MrgV");
            var desc5115 = new ActionDescriptor();
            var idDplc = charIDToTypeID("Dplc");
            desc5115.putBoolean(idDplc, true);
            executeAction(idMrgV, desc5115, DialogModes.NO);
            nameLayerBlurRandum = doc.activeLayer.name
            //end merge
            action("CpTL")
            doc.activeLayer.name = "Detail_" + Math.random(1, 10)
            nameLayerDetailRandum = doc.activeLayer.name
            doc.activeLayer.visible = false
            selectLayer(nameLayerBlurRandum)
            actionFilter("GsnB")
            selectLayer(nameLayerDetailRandum)
            doc.activeLayer.visible = true
            apply(nameLayerBlurRandum)
            doc.activeLayer.blendMode = BlendMode.LINEARLIGHT;
            grColor.unHiddenGroup()
            action("Mrg2")
            doc.activeLayer.name = "TempEmptyLayer"
            createSnapshot("Temp")
            selectHistory(-2)
        }
    }

    function emptyLayer() {

        vr = doc.activeLayer.parent.name.slice(-1)
        grResources = new Groups(["Resources"])
        grVariant = new Groups(["Variant " + vr])
        grColor = new Groups(["Variant " + vr, "Color " + vr])
        grItem = new Groups(["Variant " + vr, "Item " + vr])
        grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
        grBg = new Groups(["Variant " + vr, "Background " + vr])
        grResources.hideGroup()
        grColor.hideGroup()

        var idMrgV = charIDToTypeID("MrgV");
        var desc5115 = new ActionDescriptor();
        var idDplc = charIDToTypeID("Dplc");
        desc5115.putBoolean(idDplc, true);
        executeAction(idMrgV, desc5115, DialogModes.NO);
        doc.selection.selectAll()
        doc.selection.copy()
        try {
            selectSnapShot("Temp")
            doc.paste()
            doc.activeLayer.name = "EmptyLayer"
            /// Processing
            Empty()
            selectLayer("TempEmptyLayer")
            doc.activeLayer.remove()
            selectLayer("EmptyLayer")
            action("Mrg2")
            deleteSnapShot("Temp")
        } catch (error) {
            selectHistory(-3)
        }
    }

    function apply(layer, enabled, withDialog) {
        cTID = function (s) { return app.charIDToTypeID(s); };
        sTID = function (s) { return app.stringIDToTypeID(s); };
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var desc2 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
        ref1.putName(cTID('Lyr '), layer);
        desc2.putReference(cTID('T   '), ref1);
        desc2.putEnumerated(cTID('Clcl'), cTID('Clcn'), cTID('Sbtr'));
        desc2.putDouble(cTID('Scl '), 2);
        desc2.putInteger(cTID('Ofst'), 128);
        desc1.putObject(cTID('With'), cTID('Clcl'), desc2);
        executeAction(sTID('applyImageEvent'), desc1, dialogMode);
    }

    function dustStracthes() {
        // doc.guides.removeAll()
        vr = doc.activeLayer.parent.name.slice(-1)
        grResources = new Groups(["Resources"])
        grVariant = new Groups(["Variant " + vr])
        grColor = new Groups(["Variant " + vr, "Color " + vr])
        grItem = new Groups(["Variant " + vr, "Item " + vr])
        grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
        grBg = new Groups(["Variant " + vr, "Background " + vr])

        grResources.hideGroup()
        grColor.hideGroup()
        try { doc.pathItems[namePath].deselect() } catch (error) { }
        try { doc.layerSets["Variant " + vr].layerSets["Item " + vr].artLayers["Stencil"].visible = false } catch (error) { }
        makeLayer("temp")
        //merge layer
        var idMrgV = charIDToTypeID("MrgV");
        var desc5115 = new ActionDescriptor();
        var idDplc = charIDToTypeID("Dplc");
        desc5115.putBoolean(idDplc, true);
        executeAction(idMrgV, desc5115, DialogModes.NO);
        //end merge
        //Dust&stratch
        actionFilter("DstS")
        action("Mrg2")
        saveHistory()
        selectHistory(-3)
        doc.activeLayer.remove()
        setTool('historyBrushTool')

        grColor.unHiddenGroup()
    }

    function updateOrendt() {
        saveSelectionFloor(4)
        copyStrucColor(3)
        pasteStructLayerColor(4)
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

    function createSnapshot(name) {
        var desc8 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putClass(charIDToTypeID("SnpS"));
        desc8.putReference(charIDToTypeID("null"), ref1);
        var ref2 = new ActionReference();
        ref2.putProperty(charIDToTypeID("HstS"), charIDToTypeID("CrnH"));
        desc8.putReference(charIDToTypeID("From"), ref2);
        desc8.putString(charIDToTypeID("Nm  "), name);
        desc8.putEnumerated(charIDToTypeID("Usng"), charIDToTypeID("HstS"), charIDToTypeID("FllD"));
        executeAction(charIDToTypeID("Mk  "), desc8, DialogModes.NO);
    };
    function deleteSnapShot(name) {
        var desc381 = new ActionDescriptor();
        var ref21 = new ActionReference();
        ref21.putName(charIDToTypeID("SnpS"), name);
        desc381.putReference(charIDToTypeID("null"), ref21);
        executeAction(charIDToTypeID("Dlt "), desc381, DialogModes.NO);
    };

    function selectSnapShot(snapshot) {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();

        reference.putName(s2t("snapshotClass"), snapshot);
        descriptor.putReference(c2t("null"), reference);
        executeAction(s2t("select"), descriptor, DialogModes.NO);
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

    function selectHistory(number) {
        var idslct = charIDToTypeID("slct");
        var desc5208 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref853 = new ActionReference();
        var idHstS = charIDToTypeID("HstS");
        ref853.putOffset(idHstS, number);
        desc5208.putReference(idnull, ref853);
        executeAction(idslct, desc5208, DialogModes.NO);
    }
    function getTool() {
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var cTool = typeIDToStringID(executeActionGet(ref).getEnumerationType(stringIDToTypeID('tool')));
        return cTool;
    }

    function setTool(tool) {
        var desc9 = new ActionDescriptor();
        var ref7 = new ActionReference();
        ref7.putClass(app.stringIDToTypeID(tool));
        desc9.putReference(app.charIDToTypeID('null'), ref7);
        executeAction(app.charIDToTypeID('slct'), desc9, DialogModes.NO);
    }

    function flipCanvasProductWhite() {

        var idnewPlacedLayer = stringIDToTypeID("newPlacedLayer");
        executeAction(idnewPlacedLayer, undefined, DialogModes.NO);

        var idLvls = charIDToTypeID("Lvls");
        var desc30 = new ActionDescriptor();
        var idpresetKind = stringIDToTypeID("presetKind");
        var idpresetKindType = stringIDToTypeID("presetKindType");
        var idpresetKindCustom = stringIDToTypeID("presetKindCustom");
        desc30.putEnumerated(idpresetKind, idpresetKindType, idpresetKindCustom);
        var idAdjs = charIDToTypeID("Adjs");
        var list1 = new ActionList();
        var desc31 = new ActionDescriptor();
        var idChnl = charIDToTypeID("Chnl");
        var ref12 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idChnl = charIDToTypeID("Chnl");
        var idCmps = charIDToTypeID("Cmps");
        ref12.putEnumerated(idChnl, idChnl, idCmps);
        desc31.putReference(idChnl, ref12);
        var idInpt = charIDToTypeID("Inpt");
        var list2 = new ActionList();
        list2.putInteger(183);
        list2.putInteger(255);
        desc31.putList(idInpt, list2);
        var idGmm = charIDToTypeID("Gmm ");
        desc31.putDouble(idGmm, 0.630000);
        var idLvlA = charIDToTypeID("LvlA");
        list1.putObject(idLvlA, desc31);
        desc30.putList(idAdjs, list1);
        executeAction(idLvls, desc30, DialogModes.NO);
        liquify()
        // =======================================================
        var idHd = charIDToTypeID("Hd  ");
        var desc32 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref13 = new ActionReference();
        var idfilterFX = stringIDToTypeID("filterFX");
        ref13.putIndex(idfilterFX, 1);
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref13.putEnumerated(idLyr, idOrdn, idTrgt);
        desc32.putReference(idnull, ref13);
        executeAction(idHd, desc32, DialogModes.NO);


        var idrasterizeLayer = stringIDToTypeID("rasterizeLayer");
        var desc34 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref14 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref14.putEnumerated(idLyr, idOrdn, idTrgt);
        desc34.putReference(idnull, ref14);
        executeAction(idrasterizeLayer, desc34, DialogModes.NO);
    }


    //select layer
    function selectLayer(nameLayer) {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();

        reference.putName(s2t("layer"), nameLayer);
        descriptor.putReference(c2t("null"), reference);
        executeAction(s2t("select"), descriptor, DialogModes.NO);
    }

    function mergeLayer() {
        var idMrgV = charIDToTypeID("MrgV");
        var desc2921 = new ActionDescriptor();
        var idDplc = charIDToTypeID("Dplc");
        desc2921.putBoolean(idDplc, true);
        executeAction(idMrgV, desc2921, DialogModes.NO);
    }


    function deleteSetAction(nameAction) {
        do {
            try {
                var idDlt = charIDToTypeID("Dlt ");
                var desc81 = new ActionDescriptor();
                var idnull = charIDToTypeID("null");
                var ref4 = new ActionReference();
                var idASet = charIDToTypeID("ASet");
                ref4.putName(idASet, nameAction);
                desc81.putReference(idnull, ref4);
                executeAction(idDlt, desc81, DialogModes.NO);
                bol = true
            } catch (error) {
                bol = false
            }
        } while (bol == true);
    }

    function action(action) {
        var idCpTL = charIDToTypeID(action)
        executeAction(idCpTL, undefined, DialogModes.NO)
    }

    function liquify(params) {
        try {
            var idLqFy = charIDToTypeID("LqFy");
            executeAction(idLqFy, undefined, DialogModes.ALL);
        } catch (error) { }
    }

    function actionFilter(params) {
        try {
            var idLqFy = charIDToTypeID(params);
            executeAction(idLqFy, undefined, DialogModes.ALL);
        } catch (error) { }
    }

    function copySillShape() {
        ///document current.
        var curentNameDocument = doc.name;

        //Search document copy
        var lengthDoc = documents.length;
        var copySill = searchStructCopySill(lengthDoc);
        if (copySill == true) {
            deselectPath();
            activeDocument.selection.copy();
        } else {
            selectLayer("Product");
            deselectPath();
            activeDocument.selection.copy();
        }
        //quay lai document Curent
        for (var index = 0; index < lengthDoc; index++) {
            if (documents[index].name == curentNameDocument) {
                var docCurent = index;
            }
        }
        // Trnf

        activeDocument = documents[docCurent];
        selectLayer("Product");
        pasteFolder();
        doc.activeLayer.name = "Sil_Shoulder silhouette";
        doc.activeLayer.visible = true;
        try { InteractiveTransform(); } catch (error) { }
        doc.activeLayer.opacity = "50";
        selectLayer("Product");
        liquify();

        //tim color/Doc can copy.
        function searchStructCopySill(lengthDoc) {
            var result = false;
            for (var index = 0; index < lengthDoc; index++) {
                activeDocument = documents[index];
                if (setSelectedLayer("Sil_Shoulder silhouette") == true || setSelectedLayer("Sil_All style") == true) {
                    result = true;
                    break;
                } else {
                    result = false;
                }
            }
            return result;
        }

        //free transform
        function InteractiveTransform() {
            // Menu Edit>Free transform
            try {
                var desc1 = new ActionDescriptor();
                var ref1 = new ActionReference();
                ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), cTID('FrTr'));
                desc1.putReference(cTID('null'), ref1);
                executeAction(cTID('slct'), desc1, DialogModes.NO);
            } catch (error) {

            }
        };
        function InteractiveTransform() { app.runMenuItem(charIDToTypeID("FrTr")); };
    }

    function lineBackground() {
        try {
            doc.pathItems["Work Path"].deselect()
            selectRGB()
            if (hasMask()) {
                loadSelectionMask()
                doc.selection.invert()
                try { doc.channels.getByName("Selection").remove(); } catch (err) { }
                saveChannel("Selection")
                doc.pathItems["Work Path"].makeSelection(0.0)
                //Trừ vùng chọn.
                subtractSelection("Selection")
                //Layer via copy
                selectRGB()
                action("CpTL")
                action("CpTL")
                doc.selection.load(doc.channels.getByName("Selection"))
                doc.selection.expand(5)
                action("Dlt ")
                clippingMask()
                doc.activeLayer.translate(0, 20)
                action("Mrg2")
                setSelectionLayer()
                action("MrgL")
                try { doc.channels.getByName("Selection").remove(); } catch (err) { }
            } else {
                try {
                    doc.activeLayer = doc.activeLayer.parent
                    nameParentLayerBackground = doc.activeLayer.name.substr(-1)
                } catch (error) {
                    nameParentLayerBackground = doc.activeLayer.name.substr(-1)
                }
                if (nameParentLayerBackground == "s") {
                    nameParentLayerBackground = 1
                }

                existMaskProductVariantCurent(nameParentLayerBackground)
                doc.activeLayer = doc.layerSets["Variant " + nameParentLayerBackground].layerSets["Background " + nameParentLayerBackground].artLayers[0];
                //Bắt đàu xử lý đường chân tường
                doc.pathItems["Work Path"].makeSelection(0.0)
                //Trừ vùng chọn.
                subtractSelection("Selection")
                //Layer via copy
                selectRGB()
                action("CpTL")
                action("CpTL")
                doc.selection.load(doc.channels.getByName("Selection"))
                doc.selection.expand(5)
                action("Dlt ")
                clippingMask()
                doc.activeLayer.translate(0, 20)
                action("Mrg2")
                setSelectionLayer()
                action("MrgL")
                try { doc.channels.getByName("Selection").remove(); } catch (err) { }
            }

        } catch (error) {

        }
    }

    //kiem tra Product thuộc Variant hiện tại có tồn tại mask không.
    function existMaskProductVariantCurent(variant) {
        // body...
        doc.activeLayer = doc.layerSets["Variant " + variant].layerSets["Item " + variant];
        var lengthItemCurent = doc.activeLayer.layers.length;
        for (var i = 0; i < lengthItemCurent; i++) {
            if (doc.activeLayer.artLayers[i].name.search("Product") == 0) {
                doc.activeLayer = doc.activeLayer.artLayers[i];
                if (hasMask()) {
                    loadSelectionMask();
                    try { doc.channels.getByName("Selection").remove(); } catch (err) { }
                    doc.activeLayer = doc.layerSets["Variant " + variant].layerSets["Background " + variant].artLayers[0]
                    saveChannel("Selection");
                    break;
                } else if (hasVectorMask()) {
                    loadSelectionVectorMask();
                    try { doc.channels.getByName("Selection").remove(); } catch (err) { }
                    doc.activeLayer = doc.layerSets["Variant " + variant].layerSets["Background " + variant].artLayers[0];
                    saveChannel("Selection");
                    break;
                }
            }
        }
    }

    //Save selection to channels
    function saveChannel(nameSelection) {
        doc.channels.add()
        doc.selection.clear()
        doc.channels[doc.channels.length - 1].name = nameSelection
        doc.selection.deselect()
    }

    ////////////////// ACTION Listener
    //check mask Product vairant
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


    //Loa selection vectormask
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



    function selectRGB() {
        var idslct = charIDToTypeID("slct");
        var desc7 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref2 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idChnl = charIDToTypeID("Chnl");
        var idRGB = charIDToTypeID("RGB ");
        ref2.putEnumerated(idChnl, idChnl, idRGB);
        desc7.putReference(idnull, ref2);
        var idMkVs = charIDToTypeID("MkVs");
        desc7.putBoolean(idMkVs, false);
        executeAction(idslct, desc7, DialogModes.NO);
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

    //function clipingmask
    function clippingMask() {
        var idGrpL = charIDToTypeID("GrpL");
        var desc362 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref188 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref188.putEnumerated(idLyr, idOrdn, idTrgt);
        desc362.putReference(idnull, ref188);
        executeAction(idGrpL, desc362, DialogModes.NO);

    }

    //Check vectormask
    function hasVectorMask() {
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var desget = executeActionGet(ref);
        return desget.getBoolean(stringIDToTypeID("hasVectorMask"));
    }


    function setSelectionLayer() {
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
    function newGuideLayout(replace, colCount, colWidth, Cntr, rowCount) {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var descriptor2 = new ActionDescriptor();

        descriptor.putBoolean(s2t("replace"), replace);
        descriptor.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
        descriptor2.putInteger(s2t("colCount"), colCount);
        descriptor2.putUnitDouble(s2t("colWidth"), s2t("percentUnit"), colWidth);
        descriptor2.putBoolean(c2t("Cntr"), Cntr);
        descriptor2.putInteger(s2t("rowCount"), rowCount);
        descriptor.putObject(s2t("guideLayout"), s2t("guideLayout"), descriptor2);
        descriptor.putEnumerated(s2t("guideTarget"), s2t("guideTarget"), s2t("guideTargetCanvas"));
        executeAction(s2t("newGuideLayout"), descriptor, DialogModes.NO);
    }


    function cameraRaw(lumi, lumiDetail) {
        var idAdobeCameraRawFilter = stringIDToTypeID("Adobe Camera Raw Filter");
        var desc501 = new ActionDescriptor();
        var idCMod = charIDToTypeID("CMod");
        desc501.putString(idCMod, """Filter""");
        var idSett = charIDToTypeID("Sett");
        var idSett = charIDToTypeID("Sett");
        var idCst = charIDToTypeID("Cst ");
        desc501.putEnumerated(idSett, idSett, idCst);
        var idWBal = charIDToTypeID("WBal");
        var idWBal = charIDToTypeID("WBal");
        var idAsSh = charIDToTypeID("AsSh");
        desc501.putEnumerated(idWBal, idWBal, idAsSh);
        var idTemp = charIDToTypeID("Temp");
        desc501.putInteger(idTemp, 0);
        var idTint = charIDToTypeID("Tint");
        desc501.putInteger(idTint, 0);
        var idCtoG = charIDToTypeID("CtoG");
        desc501.putBoolean(idCtoG, false);
        var idStrt = charIDToTypeID("Strt");
        desc501.putInteger(idStrt, 0);
        var idShrp = charIDToTypeID("Shrp");
        desc501.putInteger(idShrp, 0);
        var idLNR = charIDToTypeID("LNR ");
        desc501.putInteger(idLNR, lumi);
        var idCNR = charIDToTypeID("CNR ");
        desc501.putInteger(idCNR, 0);
        var idVigA = charIDToTypeID("VigA");
        desc501.putInteger(idVigA, 0);
        var idBlkB = charIDToTypeID("BlkB");
        desc501.putInteger(idBlkB, 0);
        var idRHue = charIDToTypeID("RHue");
        desc501.putInteger(idRHue, 0);
        var idRSat = charIDToTypeID("RSat");
        desc501.putInteger(idRSat, 0);
        var idGHue = charIDToTypeID("GHue");
        desc501.putInteger(idGHue, 0);
        var idGSat = charIDToTypeID("GSat");
        desc501.putInteger(idGSat, 0);
        var idBHue = charIDToTypeID("BHue");
        desc501.putInteger(idBHue, 0);
        var idBSat = charIDToTypeID("BSat");
        desc501.putInteger(idBSat, 0);
        var idVibr = charIDToTypeID("Vibr");
        desc501.putInteger(idVibr, 0);
        var idHA_R = charIDToTypeID("HA_R");
        desc501.putInteger(idHA_R, 0);
        var idHA_O = charIDToTypeID("HA_O");
        desc501.putInteger(idHA_O, 0);
        var idHA_Y = charIDToTypeID("HA_Y");
        desc501.putInteger(idHA_Y, 0);
        var idHA_G = charIDToTypeID("HA_G");
        desc501.putInteger(idHA_G, 0);
        var idHA_A = charIDToTypeID("HA_A");
        desc501.putInteger(idHA_A, 0);
        var idHA_B = charIDToTypeID("HA_B");
        desc501.putInteger(idHA_B, 0);
        var idHA_P = charIDToTypeID("HA_P");
        desc501.putInteger(idHA_P, 0);
        var idHA_M = charIDToTypeID("HA_M");
        desc501.putInteger(idHA_M, 0);
        var idSA_R = charIDToTypeID("SA_R");
        desc501.putInteger(idSA_R, 0);
        var idSA_O = charIDToTypeID("SA_O");
        desc501.putInteger(idSA_O, 0);
        var idSA_Y = charIDToTypeID("SA_Y");
        desc501.putInteger(idSA_Y, 0);
        var idSA_G = charIDToTypeID("SA_G");
        desc501.putInteger(idSA_G, 0);
        var idSA_A = charIDToTypeID("SA_A");
        desc501.putInteger(idSA_A, 0);
        var idSA_B = charIDToTypeID("SA_B");
        desc501.putInteger(idSA_B, 0);
        var idSA_P = charIDToTypeID("SA_P");
        desc501.putInteger(idSA_P, 0);
        var idSA_M = charIDToTypeID("SA_M");
        desc501.putInteger(idSA_M, 0);
        var idLA_R = charIDToTypeID("LA_R");
        desc501.putInteger(idLA_R, 0);
        var idLA_O = charIDToTypeID("LA_O");
        desc501.putInteger(idLA_O, 0);
        var idLA_Y = charIDToTypeID("LA_Y");
        desc501.putInteger(idLA_Y, 0);
        var idLA_G = charIDToTypeID("LA_G");
        desc501.putInteger(idLA_G, 0);
        var idLA_A = charIDToTypeID("LA_A");
        desc501.putInteger(idLA_A, 0);
        var idLA_B = charIDToTypeID("LA_B");
        desc501.putInteger(idLA_B, 0);
        var idLA_P = charIDToTypeID("LA_P");
        desc501.putInteger(idLA_P, 0);
        var idLA_M = charIDToTypeID("LA_M");
        desc501.putInteger(idLA_M, 0);
        var idSTSH = charIDToTypeID("STSH");
        desc501.putInteger(idSTSH, 0);
        var idSTSS = charIDToTypeID("STSS");
        desc501.putInteger(idSTSS, 0);
        var idSTHH = charIDToTypeID("STHH");
        desc501.putInteger(idSTHH, 0);
        var idSTHS = charIDToTypeID("STHS");
        desc501.putInteger(idSTHS, 0);
        var idSTB = charIDToTypeID("STB ");
        desc501.putInteger(idSTB, 0);
        var idPC_S = charIDToTypeID("PC_S");
        desc501.putInteger(idPC_S, 0);
        var idPC_D = charIDToTypeID("PC_D");
        desc501.putInteger(idPC_D, 0);
        var idPC_L = charIDToTypeID("PC_L");
        desc501.putInteger(idPC_L, 0);
        var idPC_H = charIDToTypeID("PC_H");
        desc501.putInteger(idPC_H, 0);
        var idPC_one = charIDToTypeID("PC_1");
        desc501.putInteger(idPC_one, 25);
        var idPC_two = charIDToTypeID("PC_2");
        desc501.putInteger(idPC_two, 50);
        var idPC_three = charIDToTypeID("PC_3");
        desc501.putInteger(idPC_three, 75);
        var idShpR = charIDToTypeID("ShpR");
        desc501.putDouble(idShpR, 1.000000);
        var idShpD = charIDToTypeID("ShpD");
        desc501.putInteger(idShpD, 25);
        var idShpM = charIDToTypeID("ShpM");
        desc501.putInteger(idShpM, 0);
        var idPCVA = charIDToTypeID("PCVA");
        desc501.putInteger(idPCVA, 0);
        var idGRNA = charIDToTypeID("GRNA");
        desc501.putInteger(idGRNA, 0);
        var idLNRD = charIDToTypeID("LNRD");
        desc501.putInteger(idLNRD, lumiDetail);
        var idLNRC = charIDToTypeID("LNRC");
        desc501.putInteger(idLNRC, 0);
        var idLPEn = charIDToTypeID("LPEn");
        desc501.putInteger(idLPEn, 0);
        var idMDis = charIDToTypeID("MDis");
        desc501.putInteger(idMDis, 0);
        var idPerV = charIDToTypeID("PerV");
        desc501.putInteger(idPerV, 0);
        var idPerH = charIDToTypeID("PerH");
        desc501.putInteger(idPerH, 0);
        var idPerR = charIDToTypeID("PerR");
        desc501.putDouble(idPerR, 0.000000);
        var idPerS = charIDToTypeID("PerS");
        desc501.putInteger(idPerS, 100);
        var idPerA = charIDToTypeID("PerA");
        desc501.putInteger(idPerA, 0);
        var idPerU = charIDToTypeID("PerU");
        desc501.putInteger(idPerU, 0);
        var idPerX = charIDToTypeID("PerX");
        desc501.putDouble(idPerX, 0.000000);
        var idPerY = charIDToTypeID("PerY");
        desc501.putDouble(idPerY, 0.000000);
        var idAuCA = charIDToTypeID("AuCA");
        desc501.putInteger(idAuCA, 0);
        var idExonetwo = charIDToTypeID("Ex12");
        desc501.putDouble(idExonetwo, 0.000000);
        var idCronetwo = charIDToTypeID("Cr12");
        desc501.putInteger(idCronetwo, 0);
        var idHionetwo = charIDToTypeID("Hi12");
        desc501.putInteger(idHionetwo, 0);
        var idShonetwo = charIDToTypeID("Sh12");
        desc501.putInteger(idShonetwo, 0);
        var idWhonetwo = charIDToTypeID("Wh12");
        desc501.putInteger(idWhonetwo, 0);
        var idBkonetwo = charIDToTypeID("Bk12");
        desc501.putInteger(idBkonetwo, 0);
        var idClonetwo = charIDToTypeID("Cl12");
        desc501.putInteger(idClonetwo, 0);
        var idDfPA = charIDToTypeID("DfPA");
        desc501.putInteger(idDfPA, 0);
        var idDPHL = charIDToTypeID("DPHL");
        desc501.putInteger(idDPHL, 30);
        var idDPHH = charIDToTypeID("DPHH");
        desc501.putInteger(idDPHH, 70);
        var idDfGA = charIDToTypeID("DfGA");
        desc501.putInteger(idDfGA, 0);
        var idDPGL = charIDToTypeID("DPGL");
        desc501.putInteger(idDPGL, 40);
        var idDPGH = charIDToTypeID("DPGH");
        desc501.putInteger(idDPGH, 60);
        var idDhze = charIDToTypeID("Dhze");
        desc501.putInteger(idDhze, 0);
        var idCrTx = charIDToTypeID("CrTx");
        desc501.putInteger(idCrTx, 5);
        var idTMMs = charIDToTypeID("TMMs");
        desc501.putInteger(idTMMs, 0);
        var idCrv = charIDToTypeID("Crv ");
        var list120 = new ActionList();
        list120.putInteger(0);
        list120.putInteger(0);
        list120.putInteger(255);
        list120.putInteger(255);
        desc501.putList(idCrv, list120);
        var idCrvR = charIDToTypeID("CrvR");
        var list121 = new ActionList();
        list121.putInteger(0);
        list121.putInteger(0);
        list121.putInteger(255);
        list121.putInteger(255);
        desc501.putList(idCrvR, list121);
        var idCrvG = charIDToTypeID("CrvG");
        var list122 = new ActionList();
        list122.putInteger(0);
        list122.putInteger(0);
        list122.putInteger(255);
        list122.putInteger(255);
        desc501.putList(idCrvG, list122);
        var idCrvB = charIDToTypeID("CrvB");
        var list123 = new ActionList();
        list123.putInteger(0);
        list123.putInteger(0);
        list123.putInteger(255);
        list123.putInteger(255);
        desc501.putList(idCrvB, list123);
        var idCamP = charIDToTypeID("CamP");
        desc501.putString(idCamP, """Embedded""");
        var idCP_D = charIDToTypeID("CP_D");
        desc501.putString(idCP_D, """54650A341B5B5CCAE8442D0B43A92BCE""");
        var idPrVe = charIDToTypeID("PrVe");
        desc501.putInteger(idPrVe, 184549376);
        var idRtch = charIDToTypeID("Rtch");
        desc501.putString(idRtch, """""");
        var idREye = charIDToTypeID("REye");
        desc501.putString(idREye, """""");
        var idLCs = charIDToTypeID("LCs ");
        desc501.putString(idLCs, """""");
        var idUpri = charIDToTypeID("Upri");
        desc501.putString(idUpri, """<x:xmpmeta xmlns:x="adobe: ns: meta / " x:xmptk="Adobe XMP Core 5.6 - c140 79.160451, 2017 / 05 / 06 - 01: 08: 21        ">
            < rdf: RDF xmlns: rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#" >
            <rdf: Description rdf: about=""
                xmlns: crs="http://ns.adobe.com/camera-raw-settings/1.0/"
                crs: UprightVersion="151388160"
                crs: UprightCenterMode="0"
                crs: UprightCenterNormX="0.5"
                crs: UprightCenterNormY="0.5"
                crs: UprightFocalMode="0"
                crs: UprightFocalLength35mm="35"
                crs: UprightPreview="False"
                crs: UprightTransformCount="6" />
 </rdf: RDF >
</x: xmpmeta >
        """ );
    var idGuUr = charIDToTypeID("GuUr");
        desc501.putString(idGuUr, """<x:xmpmeta xmlns:x="adobe: ns: meta / " x:xmptk="Adobe XMP Core 5.6 - c140 79.160451, 2017 / 05 / 06 - 01: 08: 21        ">
            < rdf: RDF xmlns: rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#" >
            <rdf: Description rdf: about=""
                xmlns: crs="http://ns.adobe.com/camera-raw-settings/1.0/"
                crs: UprightFourSegmentsCount="0" />
 </rdf: RDF >
</x: xmpmeta >
        """ );
    var idLook = charIDToTypeID("Look");
        desc501.putString(idLook, """""");
        var idPset = charIDToTypeID("Pset");
        desc501.putString(idPset, """""");
        executeAction(idAdobeCameraRawFilter, desc501, DialogModes.NO);
    }


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


    // purgeAll()
}

function checkClippingMask() {

    result = false
    ////////
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

function purgeAll() {
    var idPrge = charIDToTypeID("Prge");
    var desc7726 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var idPrgI = charIDToTypeID("PrgI");
    var idAl = charIDToTypeID("Al  ");
    desc7726.putEnumerated(idnull, idPrgI, idAl);
    executeAction(idPrge, desc7726, DialogModes.NO);
}




function Empty() {

    cTID = function (s) { return app.charIDToTypeID(s); };
    sTID = function (s) { return app.stringIDToTypeID(s); };
    // Layer Via Copy
    function step1(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        executeAction(sTID('copyToLayer'), undefined, dialogMode);
    };

    // Set
    function step2(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
        desc1.putReference(cTID('null'), ref1);
        var desc2 = new ActionDescriptor();
        desc2.putString(cTID('Nm  '), "Tamp");
        desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
        executeAction(cTID('setd'), desc1, dialogMode);
    };

    // Select
    function step3(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Bckw'));
        desc1.putReference(cTID('null'), ref1);
        desc1.putBoolean(cTID('MkVs'), false);
        var list1 = new ActionList();
        list1.putInteger(66);
        desc1.putList(cTID('LyrI'), list1);
        executeAction(cTID('slct'), desc1, dialogMode);
    };

    // Set
    function step4(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(cTID('Chnl'), sTID("selection"));
        desc1.putReference(cTID('null'), ref1);
        var desc2 = new ActionDescriptor();
        var ref2 = new ActionReference();
        ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Gry '));
        desc2.putReference(cTID('T   '), ref2);
        desc2.putEnumerated(cTID('Clcl'), cTID('Clcn'), sTID("blendDivide"));
        var ref3 = new ActionReference();
        ref3.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Trsp'));
        ref3.putName(cTID('Lyr '), "TempEmptyLayer");
        desc2.putReference(cTID('UsMs'), ref3);
        var ref4 = new ActionReference();
        ref4.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Gry '));
        ref4.putName(cTID('Lyr '), "TempEmptyLayer");
        desc2.putReference(cTID('Src2'), ref4);
        desc1.putObject(cTID('T   '), cTID('Clcl'), desc2);
        executeAction(cTID('setd'), desc1, dialogMode);
    };

    // Make
    function step5(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        desc1.putClass(cTID('Nw  '), cTID('Chnl'));
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Msk '));
        desc1.putReference(cTID('At  '), ref1);
        desc1.putEnumerated(cTID('Usng'), cTID('UsrM'), cTID('RvlS'));
        executeAction(cTID('Mk  '), desc1, dialogMode);
    };

    // Select
    function step6(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
        desc1.putReference(cTID('null'), ref1);
        desc1.putBoolean(cTID('MkVs'), false);
        executeAction(cTID('slct'), desc1, dialogMode);
    };

    // Invert
    function step7(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        executeAction(cTID('Invr'), undefined, dialogMode);
    };

    // Select
    function step8(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(cTID('Lyr '), "Tamp");
        desc1.putReference(cTID('null'), ref1);
        desc1.putBoolean(cTID('MkVs'), false);
        var list1 = new ActionList();
        list1.putInteger(68);
        desc1.putList(cTID('LyrI'), list1);
        executeAction(cTID('slct'), desc1, dialogMode);
    };

    // Apply Image
    function step9(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var desc2 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
        ref1.putName(cTID('Lyr '), "TempEmptyLayer");
        desc2.putReference(cTID('T   '), ref1);
        desc2.putEnumerated(cTID('Clcl'), cTID('Clcn'), sTID("blendDivide"));
        desc2.putBoolean(cTID('PrsT'), true);
        desc1.putObject(cTID('With'), cTID('Clcl'), desc2);
        executeAction(sTID('applyImageEvent'), desc1, dialogMode);
    };

    // Set
    function step10(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(cTID('Chnl'), sTID("selection"));
        desc1.putReference(cTID('null'), ref1);
        var ref2 = new ActionReference();
        ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
        desc1.putReference(cTID('T   '), ref2);
        executeAction(cTID('setd'), desc1, dialogMode);
    };

    // Inverse
    function step11(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        executeAction(cTID('Invs'), undefined, dialogMode);
    };

    // Delete
    function step12(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
        desc1.putReference(cTID('null'), ref1);
        var list1 = new ActionList();
        list1.putInteger(68);
        desc1.putList(cTID('LyrI'), list1);
        executeAction(cTID('Dlt '), desc1, dialogMode);
    };

    // Select
    function step13(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Msk '));
        desc1.putReference(cTID('null'), ref1);
        desc1.putBoolean(cTID('MkVs'), false);
        executeAction(cTID('slct'), desc1, dialogMode);
    };

    // Reset
    function step14(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(cTID('Clr '), cTID('Clrs'));
        desc1.putReference(cTID('null'), ref1);
        executeAction(cTID('Rset'), desc1, dialogMode);
    };

    // Fill
    function step15(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('FrgC'));
        desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
        desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
        executeAction(cTID('Fl  '), desc1, dialogMode);
    };

    // Select
    function step16(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
        desc1.putReference(cTID('null'), ref1);
        desc1.putBoolean(cTID('MkVs'), true);
        executeAction(cTID('slct'), desc1, dialogMode);
    };

    // Set
    function step17(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(cTID('Chnl'), sTID("selection"));
        desc1.putReference(cTID('null'), ref1);
        desc1.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('None'));
        executeAction(cTID('setd'), desc1, dialogMode);
    };

    // Levels
    function step18(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        desc1.putEnumerated(sTID("presetKind"), sTID("presetKindType"), sTID("presetKindCustom"));
        var list1 = new ActionList();
        var desc2 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
        desc2.putReference(cTID('Chnl'), ref1);
        var list2 = new ActionList();
        list2.putInteger(0);
        list2.putInteger(2);
        desc2.putList(cTID('Inpt'), list2);
        list1.putObject(cTID('LvlA'), desc2);
        desc1.putList(cTID('Adjs'), list1);
        executeAction(cTID('Lvls'), desc1, dialogMode);
    };

    // Set
    function step19(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(cTID('Chnl'), sTID("selection"));
        desc1.putReference(cTID('null'), ref1);
        var ref2 = new ActionReference();
        ref2.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
        desc1.putReference(cTID('T   '), ref2);
        executeAction(cTID('setd'), desc1, dialogMode);
    };

    // Expand
    function step20(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        desc1.putUnitDouble(cTID('By  '), cTID('#Pxl'), 2);
        desc1.putBoolean(sTID("selectionModifyEffectAtCanvasBounds"), false);
        executeAction(cTID('Expn'), desc1, dialogMode);
    };

    // Select
    function step21(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
        desc1.putReference(cTID('null'), ref1);
        desc1.putBoolean(cTID('MkVs'), true);
        executeAction(cTID('slct'), desc1, dialogMode);
    };

    // Fill
    function step22(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('FrgC'));
        desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
        desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
        executeAction(cTID('Fl  '), desc1, dialogMode);
    };

    // Set
    function step23(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(cTID('Chnl'), sTID("selection"));
        desc1.putReference(cTID('null'), ref1);
        desc1.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('None'));
        executeAction(cTID('setd'), desc1, dialogMode);
    };

    // Delete
    function step24(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
        desc1.putReference(cTID('null'), ref1);
        desc1.putBoolean(cTID('Aply'), true);
        executeAction(cTID('Dlt '), desc1, dialogMode);
    };

    // Set
    function step25(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
        desc1.putReference(cTID('null'), ref1);
        var desc2 = new ActionDescriptor();
        desc2.putString(cTID('Nm  '), "EmptyLayer");
        desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
        executeAction(cTID('setd'), desc1, dialogMode);
    };

    step1();      // Layer Via Copy
    step2();      // Set
    step3();      // Select
    step4();      // Set
    step5();      // Make
    step6();      // Select
    step7();      // Invert
    step8();      // Select
    step9();      // Apply Image
    step10();      // Set
    step11();      // Inverse
    step12();      // Delete
    step13();      // Select
    step14();      // Reset
    step15();      // Fill
    step16();      // Select
    step17();      // Set
    step18();      // Levels
    step19();      // Set
    step20();      // Expand
    step21();      // Select
    step22();      // Fill
    step23();      // Set
    step24();      // Delete
    step25();      // Set
};
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