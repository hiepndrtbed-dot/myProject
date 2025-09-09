preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = app.activeDocument;
//Check login
(function () {
    var logKeyAccount = new File("//172.16.2.2/Public Data/Academy/LogAction/account.csv")
    //var logKeyAccount = new File("D:/ACA/Js/Public/account.csv")
    var logUser = new File("~/AppData/Roaming/Adobe/Adobe Photoshop CC 2019/Adobe Photoshop CC 2019 Settings/LogUs.csv")
    if (logKeyAccount.exists) {
        logKeyAccount.open("r")
        logText = logKeyAccount.readln()
        if (logUser.exists) {
            logUser.open("r")
            user = logUser.readln()
            if (user != "") {
                var flag = false
                //So sanh điều kiện người dùng
                while (logText != "") {
                    logText = logKeyAccount.readln()
                    if (user == logText.split(",")[2]) {
                        // alert("cho phep dung!")
                        flag = true
                        break
                    }
                }
                //Check Flag nếu true thì cho phép sử dụng.
                if (flag == true) {
                    body()
                } else {
                    alert("Liên hệ người cấp user!")
                }
            } else {
                frame()
            }

        } else {//Yeu cau nhap key va tao file user ban dau
            frame()
        }
        logUser.close()
        logKeyAccount.close()
    }

    function frame() {
        // DIALOG
        // ======
        var dialog = new Window("dialog");
        dialog.text = "Input Key";
        dialog.orientation = "column";
        dialog.alignChildren = ["center", "top"];
        dialog.spacing = 5;
        dialog.margins = 10;

        // VALIDATE
        // ========
        var validate = dialog.add("group", undefined, { name: "validate" });
        validate.orientation = "row";
        validate.alignChildren = ["left", "center"];
        validate.spacing = 10;
        validate.margins = 0;

        var validateText = validate.add("statictext", undefined, undefined, { name: "validateText" });
        validateText.preferredSize.width = 150;
        validateText.justify = "center";
        validateText.text = "Nhập Key để mở khóa!";

        // BODY
        // ====
        var body = dialog.add("group", undefined, { name: "body" });
        body.orientation = "row";
        body.alignChildren = ["left", "center"];
        body.spacing = 10;
        body.margins = 0;

        var edittext1 = body.add('edittext {justify: "center", properties: {name: "edittext1", enterKeySignalsOnChange: true}}');
        edittext1.preferredSize.width = 150;
        edittext1.preferredSize.height = 0;
        edittext1.active = true

        // GROUP1
        // ======
        var group1 = dialog.add("group", undefined, { name: "group1" });
        group1.orientation = "row";
        group1.alignChildren = ["left", "center"];
        group1.spacing = 10;
        group1.margins = 0;

        var button1 = group1.add("button", undefined, undefined, { name: "Nhap_Key" });
        button1.text = "Nhập Key";

        var button2 = group1.add("button", undefined, undefined, { name: "Cancel" });
        button2.text = "Hủy";

        // BY

        var by = dialog.add("statictext", undefined, undefined, { name: "by" });
        by.preferredSize.width = 150;
        by.preferredSize.height = 10
        by.spacing = 15;
        by.justify = "bottom";
        by.text = "Aca - 1.01 -";


        //Kiểm tra điều kiện Key được cung cấp.
        button1.addEventListener("click", function () {
            if (logKeyAccount.exists) {
                logKeyAccount.open("r")
                logText = logKeyAccount.read()
                logKeyAccount.close()
                logKeyAccount.open("r")
                logTextLine = logKeyAccount.readln()
                while (logTextLine != "") {
                    logTextLine = logKeyAccount.readln()
                    if (edittext1.text == logTextLine.split(",")[2]) {
                        if (logTextLine.split(",")[3] == "1") {//Neu da duoc dang ky
                            validateText.text = "Key đã được sử dụng!"
                            break
                        } else {
                            logUser.open("w")
                            status = logUser.writeln(edittext1.text)
                            if (status == false) {
                                alert("Kích hoạt chưa thành công!")
                            } else {
                                logKeyAccount.close()
                                logKeyAccount.open("w")
                                changeString = logText.replace(logTextLine.split(",")[2] + ",", logTextLine.split(",")[2] + ",1")
                                logKeyAccount.writeln(changeString)
                                dialog.close()
                                alert("Kích hoạt thành công!")
                                break
                            }
                        }
                    } else {
                        validateText.text = "Không đúng key!"
                    }
                }
                edittext1.text = ""
                logUser.close()
                logKeyAccount.close()
            }
        })
        edittext1.addEventListener("click", function () {
        })

        //Xử lý xự kiện bằng bàng phím
        dialog.addEventListener("keydown", triggerBtnRun);
        function triggerBtnRun(e) {
            // alert(e.keyName)
            if (e.keyName == "Enter" || e.keyName == "Space") {
                button1.dispatchEvent(new Event("click"))
            }
        }

        dialog.show();
    }
})()

function body() {
    logAction("Log_AutoColor")
    const namePath = "Work Path"
    const nameSelectionProduct = "selectionProduct"
    const nameSelectionSample = "selectionSample"
    const nameSelectionTo = "selectionTo"
    const nameLayerTemp = "Acad_LayerTemp"
    const nameLayerHueAdjustments = "Acad_AutoColor"
    const nameLayerHueAdjustmentsDesaturate = "Acad_Desaturate"
    const nameLayerBrightnessContract = "Acad_Brightness/contract"
    const nameLayerColorBalance = "Acad_ColorBalance"
    const nameLayerLevels = "Acad_Levels"

    var hueCurent = 0
    var saturationCurent = 0
    var brightnessCurent = 0
    var midtoneLevels = 1

    main()
    function main() {
        if (doc.colorSamplers.length >= 2 && checkSelection()) {
            if (doc.colorSamplers.length > 2) {
                do {
                    doc.colorSamplers[0].remove()
                } while (doc.colorSamplers.length > 2)
                makeHistoryRandum()
                preStructChangeColor()
            } else {
                makeHistoryRandum()
                preStructChangeColor()
            }
        } else {
            alert("Thiếu vùng chọn! Lấy vùng chọn vùng cần chỉnh màu!")
        }

        //Preration Struct 
        function preStructChangeColor() {
            //Tìm cấu trúc layer hiện tại
            try { doc.pathItems[namePath].deselect() } catch (error) { }
            nameParent = doc.activeLayer.parent.name
            if (nameParent == doc.name || nameParent == "BACKGROUND" || nameParent == "Resources") {
                endNameLayer = Number(doc.activeLayer.name.slice(-1))
                typeof endNameLayer == Number ? vr = endNameLayer : vr = 1
            } else {
                vr = Number(doc.activeLayer.parent.name.slice(-1))
            }
            try { doc.channels[nameSelectionProduct].remove(); } catch (err) { }
            try { doc.channels[nameSelectionSample].remove(); } catch (err) { }
            try { doc.channels[nameSelectionTo].remove(); } catch (err) { }

            grResources = new Groups(["Resources"])
            grVariant = new Groups(["Variant " + vr])
            grColor = new Groups(["Variant " + vr, "Color " + vr])
            grItem = new Groups(["Variant " + vr, "Item " + vr])
            grShadow = new Groups(["Variant " + vr, "Shadow " + vr])
            grBg = new Groups(["Variant " + vr, "Background " + vr])

            //Lưu vùng chọn vùng cần chỉnh
            saveChannel(nameSelectionProduct)
            if (Number(doc.width) > 5000) {
                lengthSelection = 200
            }
            else if (Number(doc.width) > 4000) {
                lengthSelection = 150
            }
            else if (Number(doc.width) > 3000) {
                lengthSelection = 120
            }
            else if (Number(doc.width) > 2000) {
                lengthSelection = 80
            }
            else if (Number(doc.width) > 1000) {
                lengthSelection = 40
            }
            else if (Number(doc.width) > 0) {
                lengthSelection = 30
            }

            //Tao vung chon mau de lay gia tri trung binh vung mau (40 x 40 px)
            var pointFrom = doc.colorSamplers[0]
            left = pointFrom.position[0] - lengthSelection
            right = pointFrom.position[0] + lengthSelection
            top = pointFrom.position[1] - lengthSelection
            bottom = pointFrom.position[1] + lengthSelection
            makeSelection(left, right, top, bottom)
            saveChannel(nameSelectionSample)

            //Tao vung chon mau de lay gia tri trung binh vung can chinh mau (40 x 40 px)
            var pointTo = doc.colorSamplers[1]
            left = pointTo.position[0] - lengthSelection
            right = pointTo.position[0] + lengthSelection
            top = pointTo.position[1] - lengthSelection
            bottom = pointTo.position[1] + lengthSelection
            makeSelection(left, right, top, bottom)
            saveChannel(nameSelectionTo)
            doc.selection.deselect()

            //Bắt đầu xử lý color
            grColor.selectGroup()

            //Tạo giá trị trung bình
            actionMerge("MrgV")
            doc.activeLayer.name = nameLayerTemp
            moveBack()
            grResources.hideGroup()

            doc.selection.load(doc.channels.getByName(nameSelectionSample))
            doc.activeLayer.applyAverage()
            doc.selection.load(doc.channels.getByName(nameSelectionTo))
            doc.activeLayer.applyAverage()
            doc.selection.deselect()

            //Create layer Levels
            doc.selection.load(doc.channels.getByName(nameSelectionTo))
            getLevels()
            doc.activeLayer.name = nameLayerLevels
            doc.activeLayer.blendMode = BlendMode.LUMINOSITY

            //Crate layer color
            doc.selection.load(doc.channels.getByName(nameSelectionTo))
            getHueColor()
            doc.activeLayer.name = nameLayerHueAdjustments

            //Create layer Desaturate
            getHueColor()
            doc.activeLayer.name = nameLayerHueAdjustmentsDesaturate
            setHue(false, 0, -100, 0)

            //Điều Chỉnh giá Trị Brightness
            grColor.selectLayer(nameLayerTemp)
            processBrightness(pointTo.color.hsb.brightness, pointFrom.color.hsb.brightness, 0.05)
            // processColor("B", pointTo.color.hsb.brightness, pointFrom.color.hsb.brightness, 5)
            grColor.deleteLayer(nameLayerHueAdjustmentsDesaturate)

            //Giá trị trung bình màu vùng mẫu
            grColor.selectLayer(nameLayerTemp)
            var rgbFrom = {
                hue: Math.round(pointFrom.color.hsb.hue),
                brightness: Math.round(pointFrom.color.hsb.brightness),
                saturation: Math.round(pointFrom.color.hsb.saturation)
            }

            //giá trị trung bình màu vùng cần chỉnh
            var rgbTo = {
                hue: Math.round(pointTo.color.hsb.hue),
                brightness: Math.round(pointTo.color.hsb.brightness),
                saturation: Math.round(pointTo.color.hsb.saturation)
            }

            //Điều chỉnh giá trị màu
            processColor("H", rgbTo.hue, rgbFrom.hue, 4)
            processColor("S", rgbTo.saturation, rgbFrom.saturation, 5)
            // processBrightness(pointTo.color.hsb.brightness, pointFrom.color.hsb.brightness, 0.01)
            processColor("B", pointTo.color.hsb.brightness, pointFrom.color.hsb.brightness, 5)
            checkHue = processColor("H", rgbTo.hue, rgbFrom.hue, 4)
            if (checkHue == false) {
                hueCurent = -150
                grColor.selectLayer(nameLayerHueAdjustments)
                processColorHue("H", rgbTo.hue, rgbFrom.hue, 4)
            }
            processColor("S", rgbTo.saturation, rgbFrom.saturation, 2)

            //Add mask vùng cần chỉnh màu và Tạo thêm Layer điều chỉnh thêm độ tương phản hoặc chỉnh thêm.
            //add mask layer Hue
            grColor.selectLayer(nameLayerHueAdjustments)
            doc.selection.load(doc.channels.getByName(nameSelectionProduct))
            myColor = new SolidColor()
            myColor.rgb.red = 255
            myColor.rgb.green = 255
            myColor.rgb.blue = 255
            doc.selection.fill(myColor)

            //add mask layer Levels
            grColor.selectLayer(nameLayerLevels)
            doc.selection.fill(myColor)

            //Tạo thêm layer ColorBalance
            grColor.selectLayer(nameLayerHueAdjustments)
            makeColorBalance()
            doc.activeLayer.name = nameLayerColorBalance
            doc.activeLayer.blendMode = BlendMode.COLORBLEND

            //Xóa các layer thừa sau khi processing
            grColor.deleteLayer(nameLayerTemp)

            //Thay đổi ten các layer chỉnh màu theo các Alpha đã tạo -> kết hợp với action moveColor
            if (checkSelectionName("Alpha 1") == true) {
                saveSelection()
                nameEndLayer = doc.channels[doc.channels.length - 1].name
            } else {
                saveSelection()
                nameEndLayer = doc.channels[doc.channels.length - 1].name
            }

            grColor.selectLayer(nameLayerHueAdjustments) == true ? doc.activeLayer.name = nameLayerHueAdjustments + "_" + nameEndLayer : ""
            grColor.selectLayer(nameLayerLevels) == true ? doc.activeLayer.name = nameLayerLevels + "_" + nameEndLayer : ""
            grColor.selectLayer(nameLayerColorBalance) == true ? doc.activeLayer.name = nameLayerColorBalance + "_" + nameEndLayer : ""

            //Xóa các vùng chọn lưu trong channels
            doc.colorSamplers.removeAll()
            try { doc.channels[nameSelectionProduct].remove(); } catch (err) { }
            try { doc.channels[nameSelectionSample].remove(); } catch (err) { }
            try { doc.channels[nameSelectionTo].remove(); } catch (err) { }

            grResources.unHiddenGroup()
            // purgeAll()
            //Hàm change giá trị Hue, saturation, Brightness
            function processColor(HSB, colorTo, colorFrom, value) {
                //Điều chỉnh saturation
                colorToCurent = colorTo
                if (colorToCurent < colorFrom) {
                    while (colorToCurent < colorFrom) {
                        grColor.selectLayer(nameLayerHueAdjustments)
                        selectRGB()
                        if (HSB == "H") {
                            setHue(false, hueCurent + value, saturationCurent, brightnessCurent)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.hue)
                            hueCurent = hueCurent + value
                            //Kiểm tra nếu giá trị Hue Quá giá trị thì dừng
                            if (hueCurent <= -175 || hueCurent >= 175) {
                                return false
                            }
                        }
                        else if (HSB == "S") {
                            setHue(false, hueCurent, saturationCurent + value, brightnessCurent)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.saturation)
                            saturationCurent = saturationCurent + value
                            //Kiểm tra nếu giá trị Saturation Quá giá trị thì dừng
                            if (saturationCurent <= -20 || saturationCurent >= 75) {
                                break
                            }
                        }
                        else if (HSB == "B") {
                            setHue(false, hueCurent, saturationCurent, brightnessCurent + value)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.brightness)
                            brightnessCurent = brightnessCurent + value
                            if (brightnessCurent <= -75 || brightnessCurent >= 10) {
                                break
                            }
                        }
                    }

                    //tới ưu speed
                    while (colorToCurent > colorFrom) {
                        grColor.selectLayer(nameLayerHueAdjustments)
                        selectRGB()
                        if (HSB == "H") {
                            setHue(false, hueCurent - 1, saturationCurent, brightnessCurent)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.hue)
                            hueCurent = hueCurent - 1
                        }
                        else if (HSB == "S") {
                            setHue(false, hueCurent, saturationCurent - 1, brightnessCurent)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.saturation)
                            saturationCurent = saturationCurent - 1
                        }
                        else if (HSB == "B") {
                            setHue(false, hueCurent, saturationCurent, brightnessCurent - 1)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.brightness)
                            brightnessCurent = brightnessCurent - 1
                        }
                    }//end while
                } else {
                    while (colorToCurent > colorFrom) {
                        grColor.selectLayer(nameLayerHueAdjustments)
                        selectRGB()
                        if (HSB == "H") {
                            setHue(false, hueCurent - value, saturationCurent, brightnessCurent)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.hue)
                            hueCurent = hueCurent - value
                            if (hueCurent <= -175 || hueCurent >= 175) {
                                return false
                            }
                        }
                        else if (HSB == "S") {
                            setHue(false, hueCurent, saturationCurent - value, brightnessCurent)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.saturation)
                            saturationCurent = saturationCurent - value
                            //Kiểm tra nếu giá trị Saturation Quá giá trị thì dừng
                            if (saturationCurent <= -20 || saturationCurent >= 75) {
                                break
                            }
                        }
                        else if (HSB == "B") {
                            setHue(false, hueCurent, saturationCurent, brightnessCurent - value)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.brightness)
                            brightnessCurent = brightnessCurent - value
                            if (brightnessCurent <= -75 || brightnessCurent >= 10) {
                                break
                            }
                        }
                    }//end while
                    //Tôi ưu speed
                    while (colorToCurent < colorFrom) {
                        grColor.selectLayer(nameLayerHueAdjustments)
                        selectRGB()
                        if (HSB == "H") {
                            setHue(false, hueCurent + 1, saturationCurent, brightnessCurent)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.hue)
                            hueCurent = hueCurent + 1
                        }
                        else if (HSB == "S") {
                            setHue(false, hueCurent, saturationCurent + 1, brightnessCurent)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.saturation)
                            saturationCurent = saturationCurent + 1
                        }
                        else if (HSB == "B") {
                            setHue(false, hueCurent, saturationCurent, brightnessCurent + 1)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.brightness)
                            brightnessCurent = brightnessCurent + 1
                        }
                    }
                }//END IF
            }

            function processBrightness(colorTo, colorFrom, value) {
                //Điều chỉnh saturation
                colorToCurent = colorTo
                if (colorToCurent < colorFrom) {
                    while (colorToCurent < colorFrom) {
                        grColor.selectLayer(nameLayerLevels)
                        selectRGB()
                        setLevels(midtoneLevels + value)
                        grColor.selectLayer(nameLayerTemp)
                        colorToCurent = Math.round(pointTo.color.hsb.brightness)
                        midtoneLevels = midtoneLevels + value
                        //Kiểm tra nếu giá trị MidtoneLevels Quá giá trị thì dừng
                        // if (midtoneLevels <= 0.5 || midtoneLevels >= 2) {
                        //     return false
                        // }
                    }
                    //tới ưu speed
                    while (colorToCurent > colorFrom) {
                        grColor.selectLayer(nameLayerLevels)
                        selectRGB()
                        setLevels(midtoneLevels - 0.02)
                        grColor.selectLayer(nameLayerTemp)
                        colorToCurent = Math.round(pointTo.color.hsb.brightness)
                        midtoneLevels = midtoneLevels - 0.02

                    }//end while
                } else {
                    while (colorToCurent > colorFrom) {
                        grColor.selectLayer(nameLayerLevels)
                        selectRGB()
                        setLevels(midtoneLevels - value)
                        grColor.selectLayer(nameLayerTemp)
                        colorToCurent = Math.round(pointTo.color.hsb.brightness)
                        midtoneLevels = midtoneLevels - value
                        //Kiểm tra nếu giá trị MidtoneLevels Quá giá trị thì dừng
                        // if (midtoneLevels <= 0.5 || midtoneLevels >= 2) {
                        //     return false
                        // }

                    }//end while
                    //Tôi ưu speed
                    while (colorToCurent > colorFrom) {
                        grColor.selectLayer(nameLayerLevels)
                        selectRGB()
                        setLevels(midtoneLevels + 0.02)
                        grColor.selectLayer(nameLayerTemp)
                        colorToCurent = Math.round(pointTo.color.hsb.brightness)
                        midtoneLevels = midtoneLevels + 0.02
                    }
                }//END IF
            }
            //Xử lý lại Huê nếu processColor chưa xử lý được
            function processColorHue(HSB, colorTo, colorFrom, value) {
                //Điều chỉnh saturation
                colorToCurent = colorTo
                if (colorToCurent < colorFrom) {
                    while (colorToCurent < colorFrom) {
                        grColor.selectLayer(nameLayerHueAdjustments)
                        selectRGB()
                        if (HSB == "H") {
                            setHue(false, hueCurent + value, saturationCurent, brightnessCurent)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.hue)
                            hueCurent = hueCurent + value
                            //Kiểm tra nếu giá trị Hue Quá giá trị thì dừng
                            if (hueCurent <= -175 || hueCurent >= 175) {
                                return false
                            }
                        }
                    }
                    //tới ưu speed
                    while (colorToCurent > colorFrom) {
                        grColor.selectLayer(nameLayerHueAdjustments)
                        selectRGB()
                        if (HSB == "H") {
                            setHue(false, hueCurent - 1, saturationCurent, brightnessCurent)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.hue)
                            hueCurent = hueCurent - 1
                        }

                    }//end while
                } else {
                    while (colorToCurent > colorFrom) {
                        grColor.selectLayer(nameLayerHueAdjustments)
                        selectRGB()
                        if (HSB == "H") {
                            setHue(false, hueCurent - value, saturationCurent, brightnessCurent)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.hue)
                            hueCurent = hueCurent - value
                            if (hueCurent <= -175 || hueCurent >= 175) {
                                return false
                            }
                        }

                    }//end while
                    //Tôi ưu speed
                    while (colorToCurent > colorFrom) {
                        grColor.selectLayer(nameLayerHueAdjustments)
                        selectRGB()
                        if (HSB == "H") {
                            setHue(false, hueCurent + 1, saturationCurent, brightnessCurent)
                            grColor.selectLayer(nameLayerTemp)
                            colorToCurent = Math.round(pointTo.color.hsb.hue)
                            hueCurent = hueCurent + 1
                        }
                    }
                }//END IF
            }
        }
    }
    ////////////////////// ---------------END MAIN --------------//////////////////////////////////////
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

    //save selection Channel
    function saveChannel(name) {
        var desc977 = new ActionDescriptor();
        var ref38 = new ActionReference();
        ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
        desc977.putReference(charIDToTypeID("null"), ref38);
        desc977.putString(charIDToTypeID("Nm  "), name);
        executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO);
        return doc.channels.getByName(name);
    }

    function checkSelection() {
        result = false
        try {
            bounds = doc.selection.bounds
            result = true

        } catch (error) {
            result = false
        }
        return result

    }
    function actionMerge(params) {
        var idMrgtwo = charIDToTypeID(params);
        var desc31 = new ActionDescriptor();
        var idDplc = charIDToTypeID("Dplc");
        desc31.putBoolean(idDplc, true);
        executeAction(idMrgtwo, desc31, DialogModes.NO);
    }

    //Tạo layer Hue
    function getHueColor() {
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
    }

    function getLevels() {
        var idMk = charIDToTypeID("Mk  ");
        var desc1910 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref446 = new ActionReference();
        var idAdjL = charIDToTypeID("AdjL");
        ref446.putClass(idAdjL);
        desc1910.putReference(idnull, ref446);
        var idUsng = charIDToTypeID("Usng");
        var desc1911 = new ActionDescriptor();
        var idType = charIDToTypeID("Type");
        var desc1912 = new ActionDescriptor();
        var idpresetKind = stringIDToTypeID("presetKind");
        var idpresetKindType = stringIDToTypeID("presetKindType");
        var idpresetKindDefault = stringIDToTypeID("presetKindDefault");
        desc1912.putEnumerated(idpresetKind, idpresetKindType, idpresetKindDefault);
        var idLvls = charIDToTypeID("Lvls");
        desc1911.putObject(idType, idLvls, desc1912);
        var idAdjL = charIDToTypeID("AdjL");
        desc1910.putObject(idUsng, idAdjL, desc1911);
        executeAction(idMk, desc1910, DialogModes.NO);
    }

    function setLevels(gamma) {
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

        reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
        descriptor.putReference(c2t("null"), reference);
        reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
        descriptor3.putReference(s2t("channel"), reference2);
        descriptor3.putDouble(s2t("gamma"), gamma);
        list.putObject(s2t("levelsAdjustment"), descriptor3);
        descriptor2.putList(s2t("adjustment"), list);
        descriptor.putObject(s2t("to"), s2t("levels"), descriptor2);
        executeAction(s2t("set"), descriptor, DialogModes.NO);
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

    function getBrightnessContract() {
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
        descriptor2.putEnumerated(s2t("color"), s2t("color"), c2t("Grn "));
        descriptor3.putBoolean(s2t("useLegacy"), false);
        descriptor2.putObject(s2t("type"), c2t("BrgC"), descriptor3);
        descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
        executeAction(s2t("make"), descriptor, DialogModes.NO);
    }

    function setBrightnessContract(brightness, contract) {
        var idsetd = charIDToTypeID("setd");
        var desc6979 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref1000 = new ActionReference();
        var idAdjL = charIDToTypeID("AdjL");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref1000.putEnumerated(idAdjL, idOrdn, idTrgt);
        desc6979.putReference(idnull, ref1000);
        var idT = charIDToTypeID("T   ");
        var desc6980 = new ActionDescriptor();
        var idBrgh = charIDToTypeID("Brgh");
        desc6980.putInteger(idBrgh, brightness);
        var idCntr = charIDToTypeID("Cntr");
        desc6980.putInteger(idCntr, contract);
        var iduseLegacy = stringIDToTypeID("useLegacy");
        desc6980.putBoolean(iduseLegacy, false);
        var idBrgC = charIDToTypeID("BrgC");
        desc6979.putObject(idT, idBrgC, desc6980);
        executeAction(idsetd, desc6979, DialogModes.NO);
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
    //Kiem tra ton tai selection với tên .....
    function checkSelectionName(nameChannel) {
        var result = false;
        try {
            var channelRef = app.activeDocument.channels.getByName(nameChannel);
            if (channelRef) {
                result = true;
            }
        } catch (error) { }
        return result;
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

    function makeHistoryRandum() {
        var randumHistory = Math.random();
        makeHistory(randumHistory);
        return randumHistory;
    }


    //Tạo layer Color Balance 1
    function makeColorBalance() {
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

        reference.putClass(s2t("adjustmentLayer"));
        descriptor.putReference(c2t("null"), reference);
        descriptor2.putEnumerated(s2t("color"), s2t("color"), s2t("green"));
        list.putInteger(0);
        list.putInteger(0);
        list.putInteger(0);
        descriptor3.putList(s2t("shadowLevels"), list);
        list2.putInteger(0);
        list2.putInteger(0);
        list2.putInteger(0);
        descriptor3.putList(s2t("midtoneLevels"), list2);
        list3.putInteger(0);
        list3.putInteger(0);
        list3.putInteger(0);
        descriptor3.putList(s2t("highlightLevels"), list3);
        descriptor3.putBoolean(s2t("preserveLuminosity"), true);
        descriptor2.putObject(s2t("type"), s2t("colorBalance"), descriptor3);
        descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
        executeAction(s2t("make"), descriptor, DialogModes.NO);
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
            try {
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
            } catch (error) {
                var idMk = charIDToTypeID("Mk  ");
                var desc1248 = new ActionDescriptor();
                var idNw = charIDToTypeID("Nw  ");
                var desc1249 = new ActionDescriptor();
                var idClrI = charIDToTypeID("ClrI");
                var idMskI = charIDToTypeID("MskI");
                var idMskA = charIDToTypeID("MskA");
                desc1249.putEnumerated(idClrI, idMskI, idMskA);
                var idClr = charIDToTypeID("Clr ");
                var desc1250 = new ActionDescriptor();
                var idRd = charIDToTypeID("Rd  ");
                desc1250.putDouble(idRd, 255.000000);
                var idGrn = charIDToTypeID("Grn ");
                desc1250.putDouble(idGrn, 0.000000);
                var idBl = charIDToTypeID("Bl  ");
                desc1250.putDouble(idBl, 0.000000);
                var idRGBC = charIDToTypeID("RGBC");
                desc1249.putObject(idClr, idRGBC, desc1250);
                var idOpct = charIDToTypeID("Opct");
                desc1249.putInteger(idOpct, 50);
                var idChnl = charIDToTypeID("Chnl");
                desc1248.putObject(idNw, idChnl, desc1249);
                executeAction(idMk, desc1248, DialogModes.NO);
            }
        }
    }


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