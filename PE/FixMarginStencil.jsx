preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument;
//Check Login
// (function () {
//     var logKeyAccount = new File("//172.16.2.2/Public Data/Academy/LogAction/account.csv")
//     var logKeyAccount = new File("D:/ACA/Js/Public/account.csv")
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
//                     diaglog()
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
//         by.text = byAcad;


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
diaglog()
// DIALOG
function diaglog() {
    logAction("Fix_MarginStencil")
    const byAcad = "By Acad version - 1.01 -";
    var grItem = new Groups(["Variant 1", "Item 1"])
    grItem.selectLayer("Stencil")
    var boundStencilv1 = doc.activeLayer.bounds
    var widthStencil1 = boundStencilv1[2] - boundStencilv1[0]
    var heightStencil1 = boundStencilv1[3] - boundStencilv1[1]

    // DIALOG
    // ======
    var dialog = new Window("dialog");
    dialog.text = "Fix Error Stencil theo kích thước";
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10;
    dialog.margins = 16;

    // GRVARIANT
    // =========
    var GrVariant = dialog.add("group", undefined, { name: "GrVariant" });
    GrVariant.orientation = "row";
    GrVariant.alignChildren = ["left", "center"];
    GrVariant.spacing = 10;
    GrVariant.margins = 0;
    GrVariant.alignment = ["left", "top"];

    // TITLEVARIANT
    // ============
    var titleVariant = GrVariant.add("group", undefined, { name: "titleVariant" });
    titleVariant.preferredSize.width = 40;
    titleVariant.orientation = "column";
    titleVariant.alignChildren = ["left", "center"];
    titleVariant.spacing = 10;
    titleVariant.margins = 0;

    var titleVr = titleVariant.add("statictext", undefined, undefined, { name: "titleVr" });
    titleVr.text = "Variant";

    // CONTENTVARIANT
    // ==============
    var contentVariant = GrVariant.add("group", undefined, { name: "contentVariant" });
    contentVariant.preferredSize.width = 70;
    contentVariant.orientation = "column";
    contentVariant.alignChildren = ["left", "center"];
    contentVariant.spacing = 10;
    contentVariant.margins = 0;

    var variant_array = []
    for (var i = 0; i < doc.layerSets.length - 2; i++) {
        variant_array[i] = parseInt(i + 1)
    }
    var textVariant = contentVariant.add("dropdownlist", undefined, undefined, { name: "arVariant", items: variant_array });
    textVariant.selection = 0;
    textVariant.preferredSize.width = 70;
    textVariant.alignChildren = ["center", "center"];

    //Typevalue
    // ============
    var TypeUnits = GrVariant.add("group", undefined, { name: "value" });
    TypeUnits.preferredSize.width = 40;
    TypeUnits.orientation = "column";
    TypeUnits.alignChildren = ["left", "center"];
    TypeUnits.spacing = 10;
    TypeUnits.margins = 0;

    var titleTypeUnits = TypeUnits.add("statictext", undefined, undefined, { name: "titleVr" });
    titleTypeUnits.text = "TypeUnit";

    // CONTENTypeValues
    // ==============
    var contentTypes = GrVariant.add("group", undefined, { name: "contentVariant" });
    contentTypes.orientation = "column";
    contentTypes.alignChildren = ["left", "center"];
    contentTypes.spacing = 10;
    contentTypes.margins = 0;

    var variant_array = ["Pixels", "Radio"]

    var textValue = contentTypes.add("dropdownlist", undefined, undefined, { name: "arVariant", items: variant_array });
    textValue.selection = 0;
    textValue.preferredSize.width = 70;
    textValue.alignChildren = ["center", "center"];

    // GRWIDTH
    // =======
    var GrWidth = dialog.add("group", undefined, { name: "GrWidth" });
    GrWidth.orientation = "row";
    GrWidth.alignChildren = ["left", "center"];
    GrWidth.spacing = 10;
    GrWidth.margins = 0;
    GrWidth.alignment = ["left", "top"];

    // WIDTH
    // =====
    var Width = GrWidth.add("group", undefined, { name: "Width" });
    Width.preferredSize.width = 40;
    Width.orientation = "column";
    Width.alignChildren = ["left", "center"];
    Width.spacing = 10;
    Width.margins = 0;

    var WidthText = Width.add("statictext", undefined, undefined, { name: "WidthText" });
    WidthText.text = "Width";
    WidthText.justify = "center";

    // INPUTWIDTH
    // ==========
    var InputWidth = GrWidth.add("group", undefined, { name: "InputWidth" });
    InputWidth.orientation = "column";
    InputWidth.alignChildren = ["left", "center"];
    InputWidth.spacing = 10;
    InputWidth.margins = 0;

    var TextWidth = InputWidth.add('edittext {justify: "center", properties: {name: "TextWidth", enterKeySignalsOnChange: true}}');
    TextWidth.text = parseInt(widthStencil1);
    TextWidth.preferredSize.width = 70;
    TextWidth.active = true

    // CHANGEWIDTH
    // ===========
    var ChangeWidth = GrWidth.add("group", undefined, { name: "ChangeWidth" });
    ChangeWidth.orientation = "row";
    ChangeWidth.alignChildren = ["left", "center"];
    ChangeWidth.spacing = 10;
    ChangeWidth.margins = 0;

    var addWidht = ChangeWidth.add("statictext", undefined, undefined, { name: "addWidht" });
    addWidht.text = "+";

    var subWidth = ChangeWidth.add("statictext", undefined, undefined, { name: "subWidth" });
    subWidth.text = "-";

    // GRHEIGHT
    // ========
    var GrHeight = dialog.add("group", undefined, { name: "GrHeight" });
    GrHeight.orientation = "row";
    GrHeight.alignChildren = ["left", "center"];
    GrHeight.spacing = 10;
    GrHeight.margins = 0;
    GrHeight.alignment = ["left", "center"];

    // HEIGHT
    // ======
    var Height = GrHeight.add("group", undefined, { name: "Height" });
    Height.preferredSize.width = 40;
    Height.orientation = "column";
    Height.alignChildren = ["left", "center"];
    Height.spacing = 10;
    Height.margins = 0;

    var HeightText = Height.add("statictext", undefined, undefined, { name: "HeightText" });
    HeightText.text = "Height";
    HeightText.justify = "center";

    // INPUTHEIGHT
    // ===========
    var InputHeight = GrHeight.add("group", undefined, { name: "InputHeight" });
    InputHeight.orientation = "column";
    InputHeight.alignChildren = ["left", "center"];
    InputHeight.spacing = 10;
    InputHeight.margins = 0;

    var TextHeight = InputHeight.add('edittext {justify: "center", properties: {name: "TextHeight", enterKeySignalsOnChange: true}}');
    TextHeight.text = parseInt(heightStencil1);
    TextHeight.preferredSize.width = 70;

    // CHANGEHEIGHT
    // ============
    var ChangeHeight = GrHeight.add("group", undefined, { name: "ChangeHeight" });
    ChangeHeight.orientation = "row";
    ChangeHeight.alignChildren = ["left", "center"];
    ChangeHeight.spacing = 10;
    ChangeHeight.margins = 0;

    var addHeight = ChangeHeight.add("statictext", undefined, undefined, { name: "addHeight" });
    addHeight.text = "+";

    var subHeight = ChangeHeight.add("statictext", undefined, undefined, { name: "subHeight" });
    subHeight.text = "-";

    // SUBMIT
    // ======
    var Submit = dialog.add("group", undefined, { name: "Submit" });
    Submit.orientation = "row";
    Submit.alignChildren = ["center", "center"];
    Submit.spacing = 10;
    Submit.margins = 0;
    Submit.alignment = ["center", "center"];

    var Run = Submit.add("button", undefined, undefined, { name: "Run" });
    Run.text = "Run";

    var Cancel = Submit.add("button", undefined, undefined, { name: "Cancel" });
    Cancel.text = "Cancel";

    // VERSION
    // =======
    var Version = dialog.add("group", undefined, { name: "Version" });
    Version.orientation = "row";
    Version.alignChildren = ["left", "center"];
    Version.spacing = 10;
    Version.margins = 0;
    Version.alignment = ["left", "top"];

    var By_version = Version.add("statictext", undefined, undefined, { name: "By_version" });
    By_version.enabled = false;
    By_version.text = byAcad;

    //Choose type values. Pixels / Radio
    textValue.addEventListener("change", function () {
        if (textValue.selection.toString() == "Radio") {
            TextWidth.text = 0
            TextHeight.text = 0
            TextWidth.active = true
        }
        else if (textValue.selection.toString() == "Pixels") {
            var vr = parseInt(textVariant.selection.toString().slice(-1))
            grResources = new Groups(["Resources"])
            grVariant = new Groups(["Variant " + vr])
            grColor = new Groups(["Variant " + vr, "Color " + vr])
            grItem = new Groups(["Variant " + vr, "Item " + vr])
            grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
            grBg = new Groups(["Variant " + vr, "Background " + vr])

            grItem.selectLayer("Stencil")
            var boundStencil = doc.activeLayer.bounds
            var widthStencil = boundStencil[2] - boundStencil[0]
            var heightStencil = boundStencil[3] - boundStencil[1]

            //Thay đổi gia trị width và height khi có thay đổi variant
            TextWidth.text = parseInt(widthStencil);
            TextHeight.text = parseInt(heightStencil);
        }
    })

    textVariant.addEventListener("change", function () {
        var vr = parseInt(textVariant.selection.toString().slice(-1))
        grResources = new Groups(["Resources"])
        grVariant = new Groups(["Variant " + vr])
        grColor = new Groups(["Variant " + vr, "Color " + vr])
        grItem = new Groups(["Variant " + vr, "Item " + vr])
        grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
        grBg = new Groups(["Variant " + vr, "Background " + vr])

        grItem.selectLayer("Stencil")
        var boundStencil = doc.activeLayer.bounds
        var widthStencil = boundStencil[2] - boundStencil[0]
        var heightStencil = boundStencil[3] - boundStencil[1]

        //Thay đổi gia trị width và height khi có thay đổi variant
        TextWidth.text = parseInt(widthStencil);
        TextHeight.text = parseInt(heightStencil);
    })

    //Cộng hoặc trừ giá trị vào width
    //+
    addWidht.addEventListener("click", function () {
        TextWidth.text = parseInt(TextWidth.text) + 1
    })
    // -
    subWidth.addEventListener("click", function () {
        TextWidth.text = parseInt(TextWidth.text) - 1
    })

    //Cộng hoặc trừ giá trị vào Height
    //+
    addHeight.addEventListener("click", function () {
        TextHeight.text = parseInt(TextHeight.text) + 1
    })
    // -
    subHeight.addEventListener("click", function () {
        TextHeight.text = parseInt(TextHeight.text) - 1
    })
    //Action
    Run.addEventListener("click", function () {
        dialog.close()
        if (textValue.selection.toString() == "Radio") {
            var boundStencil = doc.activeLayer.bounds

            var widthStencil = boundStencil[2] - boundStencil[0]
            var heightStencil = boundStencil[3] - boundStencil[1]

            var CommonNumerator = widthStencil * parseInt(TextHeight.text)
            var CommonDenominator = heightStencil * parseInt(TextWidth.text)

            var value = CommonNumerator - CommonDenominator
            //If value < 0 then Height big
            if (value < 0) {
                var heightStencilBig = -(value) / parseInt(TextWidth.text)
                var heightStencil = heightStencil - heightStencilBig
            }
            //if value > 0 then Width big
            else if (value > 0) {
                var widthStencilBig = (value) / parseInt(TextHeight.text)
                var widthStencil = widthStencil - widthStencilBig
            }
            else {
                alert("True!")
            }
            processing(parseInt(widthStencil), parseInt(heightStencil))
        }
        //
        else if (textValue.selection.toString() == "Pixels") {
            processing(parseInt(TextWidth.text), parseInt(TextHeight.text))
        }
    })
    Cancel.addEventListener("click", function () {
        dialog.close()
    })

    // Hàm xử ly margin theo yeu cầu
    function processing(inputWidth, inputHeight) {
        //Kích thước width/height stencil curent
        var boundsStencil = activeDocument.activeLayer.bounds;
        var layerWidth = boundsStencil[2].as('px') - boundsStencil[0].as('px')
        var layerHeight = boundsStencil[3].as('px') - boundsStencil[1].as('px')
        //Translate
        var changeWidth = inputWidth - parseInt(layerWidth)
        var changeHeight = inputHeight - parseInt(layerHeight)

        var radioWidth = parseFloat((changeWidth * 100) / layerWidth) + 100
        var radioHeight = parseFloat((changeHeight * 100) / layerHeight) + 100

        if (radioWidth != 0 && radioHeight != 0) {
            doc.activeLayer.resize(null, radioHeight, AnchorPosition.MIDDLECENTER);
            doc.activeLayer.resize(radioWidth, null, AnchorPosition.MIDDLECENTER);
        } else if (radioWidth != 0) {
            doc.activeLayer.resize(radioWidth, null, AnchorPosition.MIDDLECENTER);
        } else if (radioHeight != 0) {
            doc.activeLayer.resize(null, radioHeight, AnchorPosition.MIDDLECENTER);
        }
    }

     //handle list
     dialog.addEventListener("keydown", triggerBtnRun)
     function triggerBtnRun(e) {
         //alert(e.keyName)
         if (e.keyName == "Space" || e.keyName == "Enter") {
            Run.dispatchEvent(new Event("click"))
         }
     }


    dialog.show();
}//End Dialog

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
        this.selectGroup().artLayers[nameLayer].remove()
    }
}


///