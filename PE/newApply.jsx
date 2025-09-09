const versionTo = " By Acad -- Version: 1.02 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument;

(function () {
    //========================= Link Check login =====================

    //========================= Location Ha Noi ======================

    // var flagLogin = new File("//172.16.0.13/Academy/Hiep/log.txt")
    // var logKeyAccount = new File("//172.16.0.13/apps/Log/accountGM.csv")
    // var logUser = new File("~/AppData/Roaming/Adobe/Adobe Photoshop CC 2019/Adobe Photoshop CC 2019 Settings/LogUsGM.csv")

    //========================= Location Da Nang ====================

    // var flagLogin = new File("//172.16.2.2/Academy/Hiep/log.txt")
    // var logKeyAccount = new File("//172.16.2.2/Public Data/Academy/LogAction/accountGM.csv")
    // var logUser = new File("~/AppData/Roaming/Adobe/Adobe Photoshop CC 2019/Adobe Photoshop CC 2019 Settings/LogUsGM.csv")

    //========================= Disk ===============================
    var logKeyAccount = new File("E:/ACA/Js/Public/accountGM.csv")
    var logUser = new File("E:/ACA/Js/Public/LogUsGM.csv")

    //==============================================================

    if (logKeyAccount.exists /*&& flagLogin.exists*/) {
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
                    logAction("Log_ApplyImage")
                    main()
                    purgeAll()
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
                    //Validate input.
                    if (edittext1.text == logTextLine.split(",")[2] && edittext1.text != "") {
                        logTextLine.split(",")[2]
                        if (logTextLine.split(",")[3] == "1") {//Neu da duoc dang ky
                            validateText.graphics.foregroundColor = validateText.graphics.newPen(validateText.graphics.PenType.SOLID_COLOR, [1, 0, 0], 1);
                            validateText.text = "Key đã được sử dụng!"
                            edittext1.active = true
                            break
                        } else {
                            logUser.open("w")
                            status = logUser.writeln(edittext1.text)
                            if (status == false) {
                                validateText.graphics.foregroundColor = validateText.graphics.newPen(validateText.graphics.PenType.SOLID_COLOR, [1, 0, 0], 1);
                                validateText.text = "Kích hoạt chưa thành công!"
                                edittext1.active = true
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
                        edittext1.active = true
                        validateText.graphics.foregroundColor = validateText.graphics.newPen(validateText.graphics.PenType.SOLID_COLOR, [1, 0, 0], 1);
                        validateText.text = "Không đúng key!"
                    }
                }
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
})();

function main() {
    const nameMedian = "Median " + Math.random();
    const nameBlur = "Blue";
    const nameBlueLow = "BlueLow";
    const nameBlurHigh = "BlueHigh";
    const nameDetail = "Detail " + Math.random();
    const nameDetailEdit = "Edit Detail " + Math.random();
    const nameMediumDetailEdit = "Edit Median Detail " + Math.random();
    const nameSelectionObject = "Acad_Selection_Object ";
    var nameGroupRetouch = "Apply Image Academy";

    //Processing

    //Check tôn tai Group Image
    if (setSelectedLayer(nameGroupRetouch) == true) {
        action("Mrg2")
        doc.activeLayer.name = "Retouch"
        doc.activeLayer.blendMode = BlendMode.DIFFERENCE;
        colorRange(0, 1)
        doc.selection.invert()
        doc.selection.expand(2)
        addMask(); applyMask()
        doc.activeLayer.blendMode = BlendMode.NORMAL;
    } else if (hasSelection()) {//Kiểm tra tồn tại vùng chọn 
        saveSelection(nameSelectionObject);
        var smallSize = bigSizeSelection()
        doc.selection.deselect();
        var curentPosition = doc.activeLayer;
        var groupContainer = doc.layerSets.add();
        groupContainer.name = "Apply Image Academy";
        groupContainer.moveBefore(curentPosition);
        createNewLayer(nameMedian);
        mergeLayer();
        doc.activeLayer.move(groupContainer, ElementPlacement.INSIDE)
        doc.activeLayer.duplicate().name = nameDetail;
        doc.activeLayer.parent.artLayers[nameDetail].visible = false;

        doc.selection.load(doc.channels.getByName(nameSelectionObject));
        doc.selection.copy();

        //Layer Blur
        doc.paste(false);
        doc.activeLayer.name = nameBlur;

        //Layer blur/median
        doc.selection.load(doc.channels.getByName(nameSelectionObject));
        doc.paste(false);
        doc.activeLayer.name = nameBlurHigh;
        action("GrpL");
        doc.activeLayer.applyGaussianBlur(smallSize / 30);
        doc.activeLayer.applyGaussianBlur(smallSize / 30);

        //Layer blur fix
        doc.selection.load(doc.channels.getByName(nameSelectionObject));
        doc.paste(false);
        doc.activeLayer.name = nameBlueLow
        action("GrpL")
        doc.activeLayer.applyGaussianBlur(smallSize / 30);
        doc.selection.load(doc.channels.getByName(nameSelectionObject));
        try {
            doc.selection.contract(smallSize / 10);
            doc.selection.feather(smallSize / 60);
        } catch (error) {

        }
        doc.selection.clear()
        doc.selection.deselect()

        //Merge layer Blur
        doc.activeLayer.merge()
        doc.activeLayer.merge()
        doc.activeLayer.merge()
        doc.activeLayer = doc.activeLayer.parent.artLayers[nameDetail]
        applyImage(nameMedian)
        doc.activeLayer.blendMode = BlendMode.LINEARLIGHT;

        //Median
        doc.activeLayer.duplicate().name = nameMediumDetailEdit
        doc.activeLayer = doc.activeLayer.parent.artLayers[nameMediumDetailEdit]
        doc.activeLayer.applyHighPass(15.3)
        doc.activeLayer.applyHighPass(8.4);
        doc.activeLayer.blendMode = BlendMode.NORMAL;
        action("GrpL")

        //High
        doc.activeLayer.applyHighPass(4)
        saveHistory()
        selectHistory(-1)
        addMaskBlack()

        doc.selection.load(doc.channels.getByName(nameSelectionObject));
        doc.activeLayer = doc.activeLayer.parent.artLayers[nameMedian]
        addMask()

        doc.selection.load(doc.channels.getByName(nameSelectionObject));
        doc.activeLayer = doc.activeLayer.parent.artLayers[nameDetail]
        addMask()

        doc.activeLayer = doc.activeLayer.parent.artLayers[nameMediumDetailEdit]
        createNewLayer("Retouch")
        doc.activeLayer = doc.activeLayer.parent.artLayers[nameMediumDetailEdit]
        selectMask()

        //Reset foregroundColor
        var color = app.foregroundColor;
        color.rgb.red = 255;
        color.rgb.green = 255;
        color.rgb.blue = 255;
        app.foregroundColor = color;
        selecTool("paintbrushTool")

        try { doc.channels.getByName(nameSelectionObject).remove(); } catch (err) { }
    } else {//Neu khong ton tai vung chon (selection)
        var curentPosition = doc.activeLayer;
        var groupContainer = doc.layerSets.add();
        groupContainer.name = nameGroupRetouch;
        groupContainer.moveBefore(curentPosition);
        createNewLayer(nameMedian);
        mergeLayer();
        doc.activeLayer.move(groupContainer, ElementPlacement.INSIDE)
        doc.activeLayer.duplicate().name = nameDetail;
        doc.activeLayer.parent.artLayers[nameDetail].visible = false;

        //Blur
        doc.activeLayer = doc.activeLayer.parent.artLayers[nameMedian]
        autoCutout(true)
        var smallSize = bigSizeSelection()
        doc.activeLayer.applyMedianNoise(smallSize / 40)
        cameraRaw(-100, 100, 20) 
        // sufeBlur(70, 25)
        doc.selection.deselect()

        //Apply
        doc.activeLayer = doc.activeLayer.parent.artLayers[nameDetail]
        applyImage(nameMedian)
        doc.activeLayer.blendMode = BlendMode.LINEARLIGHT;

        //Median
        doc.activeLayer.duplicate().name = nameMediumDetailEdit
        doc.activeLayer = doc.activeLayer.parent.artLayers[nameMediumDetailEdit]
        doc.activeLayer.applyHighPass(15.3)
        doc.activeLayer.applyHighPass(8.4);
        doc.activeLayer.blendMode = BlendMode.NORMAL;
        action("GrpL")

        //High
        doc.activeLayer.applyHighPass(4)
        saveHistory()
        selectHistory(-1)
        addMaskBlack()

        createNewLayer("Retouch")
        doc.activeLayer = doc.activeLayer.parent.artLayers[nameMediumDetailEdit]
        selectMask()

        //Reset foregroundColor
        var color = app.foregroundColor;
        color.rgb.red = 255;
        color.rgb.green = 255;
        color.rgb.blue = 255;
        app.foregroundColor = color;
        selecTool("paintbrushTool")
    }
}

//Selection color range
function colorRange(shadowsFuzziness, shadowsUpperLimit) {
    cTID = function (s) { return app.charIDToTypeID(s); };
    sTID = function (s) { return app.stringIDToTypeID(s); };

    var desc1 = new ActionDescriptor();
    desc1.putEnumerated(cTID('Clrs'), cTID('Clrs'), cTID('Shdw'));
    desc1.putInteger(sTID("shadowsFuzziness"), shadowsFuzziness);
    desc1.putInteger(sTID("shadowsUpperLimit"), shadowsUpperLimit);
    desc1.putInteger(sTID("colorModel"), 0);
    executeAction(sTID('colorRange'), desc1, DialogModes.NO);
}

//Kiem tra vung chon
function bigSizeSelection() {
    var result;
    var heightSelection = doc.selection.bounds[3] - doc.selection.bounds[1]
    var widthSelection = doc.selection.bounds[2] - doc.selection.bounds[0]
    heightSelection > widthSelection ? result = widthSelection : result = heightSelection;
    return result;
}


//Kiem tra do rong image
function bigSizeLayer() {
    var result;
    doc.width > doc.height ? result = doc.height : result = doc.width;
    return result;
}


//Check vung chon/
function hasSelection() {
    var hasSelection = false;
    var ref = new ActionReference();
    ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("selection"));
    ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    var desc = executeActionGet(ref);
    if (desc.count) hasSelection = true;
    return hasSelection;
}

//save vung chon
function saveSelection(name2) {
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
}

//Color range shadow
function colorRangeShadow(shadowsFuzziness, shadowsUpperLimit) {
    cTID = function (s) { return app.charIDToTypeID(s); };
    sTID = function (s) { return app.stringIDToTypeID(s); };

    var desc1 = new ActionDescriptor();
    desc1.putEnumerated(cTID('Clrs'), cTID('Clrs'), cTID('Shdw'));
    desc1.putInteger(sTID("shadowsFuzziness"), shadowsFuzziness);
    desc1.putInteger(sTID("shadowsUpperLimit"), shadowsUpperLimit);
    desc1.putInteger(sTID("colorModel"), 0);
    executeAction(sTID('colorRange'), desc1, DialogModes.NO);
}
//Create new layer
function createNewLayer(layername) {
    if (layername == undefined) layername = "Layer";

    // create new layer at top of layers
    var originalLayer = app.activeDocument.activeLayer;
    var layerRef = app.activeDocument.artLayers.add();

    // name it & set blend mode to normal
    layerRef.name = layername;
    layerRef.blendMode = BlendMode.NORMAL;

    // Move the layer belowm
    // layerRef.moveAfter(originalLayer);

    // Move the layer above if you desire
    layerRef.moveBefore(originalLayer);
}

//MergeAll layer
function mergeLayer() {
    var idMrgV = charIDToTypeID("MrgV");
    var desc2921 = new ActionDescriptor();
    var idDplc = charIDToTypeID("Dplc");
    desc2921.putBoolean(idDplc, true);
    executeAction(idMrgV, desc2921, DialogModes.NO);
}

function action(action) {
    //GrpL: Clipingmask
    //Mrg2: merge clipingmask
    //MrgV: merge Layer
    var idCpTL = charIDToTypeID(action)
    executeAction(idCpTL, undefined, DialogModes.NO)
}

function applyImage(layer, enabled, withDialog) {
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

//Add Mask black
function addMaskBlack() {
    var idMk = charIDToTypeID("Mk  ");
    var desc30550 = new ActionDescriptor();
    var idNw = charIDToTypeID("Nw  ");
    var idChnl = charIDToTypeID("Chnl");
    desc30550.putClass(idNw, idChnl);
    var idAt = charIDToTypeID("At  ");
    var ref4785 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref4785.putEnumerated(idChnl, idChnl, idMsk);
    desc30550.putReference(idAt, ref4785);
    var idUsng = charIDToTypeID("Usng");
    var idUsrM = charIDToTypeID("UsrM");
    var idHdAl = charIDToTypeID("HdAl");
    desc30550.putEnumerated(idUsng, idUsrM, idHdAl);
    executeAction(idMk, desc30550, DialogModes.NO);

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

//Apply LayerMask
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
//Filter sufeBlur
function sufeBlur(radius, threshold) {
    var idsurfaceBlur = stringIDToTypeID("surfaceBlur");
    var desc6713 = new ActionDescriptor();
    var idRds = charIDToTypeID("Rds ");
    var idPxl = charIDToTypeID("#Pxl");
    desc6713.putUnitDouble(idRds, idPxl, radius);
    var idThsh = charIDToTypeID("Thsh");
    desc6713.putInteger(idThsh, threshold);
    executeAction(idsurfaceBlur, desc6713, DialogModes.NO);
}

//Select subject 
function autoCutout(sampleAllLayers) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    descriptor.putBoolean(s2t("sampleAllLayers"), sampleAllLayers);
    executeAction(s2t("autoCutout"), descriptor, DialogModes.NO);
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

function cameraRaw(texture, luminance, luminanceDetail) {
    var idAdobeCameraRawFilter = stringIDToTypeID("Adobe Camera Raw Filter");
    var desc10629 = new ActionDescriptor();
    var idCMod = charIDToTypeID("CMod");
    desc10629.putString(idCMod, """Filter""");
    var idSett = charIDToTypeID("Sett");
    var idSett = charIDToTypeID("Sett");
    var idCst = charIDToTypeID("Cst ");
    desc10629.putEnumerated(idSett, idSett, idCst);
    var idWBal = charIDToTypeID("WBal");
    var idWBal = charIDToTypeID("WBal");
    var idAsSh = charIDToTypeID("AsSh");
    desc10629.putEnumerated(idWBal, idWBal, idAsSh);
    var idTemp = charIDToTypeID("Temp");
    desc10629.putInteger(idTemp, 0);
    var idTint = charIDToTypeID("Tint");
    desc10629.putInteger(idTint, 0);
    var idCtoG = charIDToTypeID("CtoG");
    desc10629.putBoolean(idCtoG, false);
    var idStrt = charIDToTypeID("Strt");
    desc10629.putInteger(idStrt, 0);
    var idShrp = charIDToTypeID("Shrp");
    desc10629.putInteger(idShrp, 0);
    var idLNR = charIDToTypeID("LNR ");
    desc10629.putInteger(idLNR, 100);
    var idCNR = charIDToTypeID("CNR ");
    desc10629.putInteger(idCNR, 0);
    var idVigA = charIDToTypeID("VigA");
    desc10629.putInteger(idVigA, 0);
    var idBlkB = charIDToTypeID("BlkB");
    desc10629.putInteger(idBlkB, 0);
    var idRHue = charIDToTypeID("RHue");
    desc10629.putInteger(idRHue, 0);
    var idRSat = charIDToTypeID("RSat");
    desc10629.putInteger(idRSat, 0);
    var idGHue = charIDToTypeID("GHue");
    desc10629.putInteger(idGHue, 0);
    var idGSat = charIDToTypeID("GSat");
    desc10629.putInteger(idGSat, 0);
    var idBHue = charIDToTypeID("BHue");
    desc10629.putInteger(idBHue, 0);
    var idBSat = charIDToTypeID("BSat");
    desc10629.putInteger(idBSat, 0);
    var idVibr = charIDToTypeID("Vibr");
    desc10629.putInteger(idVibr, 0);
    var idHA_R = charIDToTypeID("HA_R");
    desc10629.putInteger(idHA_R, 0);
    var idHA_O = charIDToTypeID("HA_O");
    desc10629.putInteger(idHA_O, 0);
    var idHA_Y = charIDToTypeID("HA_Y");
    desc10629.putInteger(idHA_Y, 0);
    var idHA_G = charIDToTypeID("HA_G");
    desc10629.putInteger(idHA_G, 0);
    var idHA_A = charIDToTypeID("HA_A");
    desc10629.putInteger(idHA_A, 0);
    var idHA_B = charIDToTypeID("HA_B");
    desc10629.putInteger(idHA_B, 0);
    var idHA_P = charIDToTypeID("HA_P");
    desc10629.putInteger(idHA_P, 0);
    var idHA_M = charIDToTypeID("HA_M");
    desc10629.putInteger(idHA_M, 0);
    var idSA_R = charIDToTypeID("SA_R");
    desc10629.putInteger(idSA_R, 0);
    var idSA_O = charIDToTypeID("SA_O");
    desc10629.putInteger(idSA_O, 0);
    var idSA_Y = charIDToTypeID("SA_Y");
    desc10629.putInteger(idSA_Y, 0);
    var idSA_G = charIDToTypeID("SA_G");
    desc10629.putInteger(idSA_G, 0);
    var idSA_A = charIDToTypeID("SA_A");
    desc10629.putInteger(idSA_A, 0);
    var idSA_B = charIDToTypeID("SA_B");
    desc10629.putInteger(idSA_B, 0);
    var idSA_P = charIDToTypeID("SA_P");
    desc10629.putInteger(idSA_P, 0);
    var idSA_M = charIDToTypeID("SA_M");
    desc10629.putInteger(idSA_M, 0);
    var idLA_R = charIDToTypeID("LA_R");
    desc10629.putInteger(idLA_R, 0);
    var idLA_O = charIDToTypeID("LA_O");
    desc10629.putInteger(idLA_O, 0);
    var idLA_Y = charIDToTypeID("LA_Y");
    desc10629.putInteger(idLA_Y, 0);
    var idLA_G = charIDToTypeID("LA_G");
    desc10629.putInteger(idLA_G, 0);
    var idLA_A = charIDToTypeID("LA_A");
    desc10629.putInteger(idLA_A, 0);
    var idLA_B = charIDToTypeID("LA_B");
    desc10629.putInteger(idLA_B, 0);
    var idLA_P = charIDToTypeID("LA_P");
    desc10629.putInteger(idLA_P, 0);
    var idLA_M = charIDToTypeID("LA_M");
    desc10629.putInteger(idLA_M, 0);
    var idSTSH = charIDToTypeID("STSH");
    desc10629.putInteger(idSTSH, 0);
    var idSTSS = charIDToTypeID("STSS");
    desc10629.putInteger(idSTSS, 0);
    var idSTHH = charIDToTypeID("STHH");
    desc10629.putInteger(idSTHH, 0);
    var idSTHS = charIDToTypeID("STHS");
    desc10629.putInteger(idSTHS, 0);
    var idSTB = charIDToTypeID("STB ");
    desc10629.putInteger(idSTB, 0);
    var idPC_S = charIDToTypeID("PC_S");
    desc10629.putInteger(idPC_S, 0);
    var idPC_D = charIDToTypeID("PC_D");
    desc10629.putInteger(idPC_D, 0);
    var idPC_L = charIDToTypeID("PC_L");
    desc10629.putInteger(idPC_L, 0);
    var idPC_H = charIDToTypeID("PC_H");
    desc10629.putInteger(idPC_H, 0);
    var idPC_one = charIDToTypeID("PC_1");
    desc10629.putInteger(idPC_one, 25);
    var idPC_two = charIDToTypeID("PC_2");
    desc10629.putInteger(idPC_two, 50);
    var idPC_three = charIDToTypeID("PC_3");
    desc10629.putInteger(idPC_three, 75);
    var idShpR = charIDToTypeID("ShpR");
    desc10629.putDouble(idShpR, 1.000000);
    var idShpD = charIDToTypeID("ShpD");
    desc10629.putInteger(idShpD, 25);
    var idShpM = charIDToTypeID("ShpM");
    desc10629.putInteger(idShpM, 0);
    var idPCVA = charIDToTypeID("PCVA");
    desc10629.putInteger(idPCVA, 0);
    var idGRNA = charIDToTypeID("GRNA");
    desc10629.putInteger(idGRNA, 0);
    var idLNRD = charIDToTypeID("LNRD");
    desc10629.putInteger(idLNRD, luminanceDetail);
    var idLNRC = charIDToTypeID("LNRC");
    desc10629.putInteger(idLNRC, 0);
    var idLPEn = charIDToTypeID("LPEn");
    desc10629.putInteger(idLPEn, 0);
    var idMDis = charIDToTypeID("MDis");
    desc10629.putInteger(idMDis, 0);
    var idPerV = charIDToTypeID("PerV");
    desc10629.putInteger(idPerV, 0);
    var idPerH = charIDToTypeID("PerH");
    desc10629.putInteger(idPerH, 0);
    var idPerR = charIDToTypeID("PerR");
    desc10629.putDouble(idPerR, 0.000000);
    var idPerS = charIDToTypeID("PerS");
    desc10629.putInteger(idPerS, luminance);
    var idPerA = charIDToTypeID("PerA");
    desc10629.putInteger(idPerA, 0);
    var idPerU = charIDToTypeID("PerU");
    desc10629.putInteger(idPerU, 0);
    var idPerX = charIDToTypeID("PerX");
    desc10629.putDouble(idPerX, 0.000000);
    var idPerY = charIDToTypeID("PerY");
    desc10629.putDouble(idPerY, 0.000000);
    var idAuCA = charIDToTypeID("AuCA");
    desc10629.putInteger(idAuCA, 0);
    var idExonetwo = charIDToTypeID("Ex12");
    desc10629.putDouble(idExonetwo, 0.000000);
    var idCronetwo = charIDToTypeID("Cr12");
    desc10629.putInteger(idCronetwo, 0);
    var idHionetwo = charIDToTypeID("Hi12");
    desc10629.putInteger(idHionetwo, 0);
    var idShonetwo = charIDToTypeID("Sh12");
    desc10629.putInteger(idShonetwo, 0);
    var idWhonetwo = charIDToTypeID("Wh12");
    desc10629.putInteger(idWhonetwo, 0);
    var idBkonetwo = charIDToTypeID("Bk12");
    desc10629.putInteger(idBkonetwo, 0);
    var idClonetwo = charIDToTypeID("Cl12");
    desc10629.putInteger(idClonetwo, 0);
    var idDfPA = charIDToTypeID("DfPA");
    desc10629.putInteger(idDfPA, 0);
    var idDPHL = charIDToTypeID("DPHL");
    desc10629.putInteger(idDPHL, 30);
    var idDPHH = charIDToTypeID("DPHH");
    desc10629.putInteger(idDPHH, 70);
    var idDfGA = charIDToTypeID("DfGA");
    desc10629.putInteger(idDfGA, 0);
    var idDPGL = charIDToTypeID("DPGL");
    desc10629.putInteger(idDPGL, 40);
    var idDPGH = charIDToTypeID("DPGH");
    desc10629.putInteger(idDPGH, 60);
    var idDhze = charIDToTypeID("Dhze");
    desc10629.putInteger(idDhze, 0);
    var idCrTx = charIDToTypeID("CrTx");
    desc10629.putInteger(idCrTx, texture);
    var idTMMs = charIDToTypeID("TMMs");
    desc10629.putInteger(idTMMs, 0);
    var idCrv = charIDToTypeID("Crv ");
    var list556 = new ActionList();
    list556.putInteger(0);
    list556.putInteger(0);
    list556.putInteger(255);
    list556.putInteger(255);
    desc10629.putList(idCrv, list556);
    var idCrvR = charIDToTypeID("CrvR");
    var list557 = new ActionList();
    list557.putInteger(0);
    list557.putInteger(0);
    list557.putInteger(255);
    list557.putInteger(255);
    desc10629.putList(idCrvR, list557);
    var idCrvG = charIDToTypeID("CrvG");
    var list558 = new ActionList();
    list558.putInteger(0);
    list558.putInteger(0);
    list558.putInteger(255);
    list558.putInteger(255);
    desc10629.putList(idCrvG, list558);
    var idCrvB = charIDToTypeID("CrvB");
    var list559 = new ActionList();
    list559.putInteger(0);
    list559.putInteger(0);
    list559.putInteger(255);
    list559.putInteger(255);
    desc10629.putList(idCrvB, list559);
    var idCamP = charIDToTypeID("CamP");
    desc10629.putString(idCamP, """Embedded""");
    var idCP_D = charIDToTypeID("CP_D");
    desc10629.putString(idCP_D, """54650A341B5B5CCAE8442D0B43A92BCE""");
    var idPrVe = charIDToTypeID("PrVe");
    desc10629.putInteger(idPrVe, 184549376);
    var idRtch = charIDToTypeID("Rtch");
    desc10629.putString(idRtch, """""");
    var idREye = charIDToTypeID("REye");
    desc10629.putString(idREye, """""");
    var idLCs = charIDToTypeID("LCs ");
    desc10629.putString(idLCs, """""");
    var idUpri = charIDToTypeID("Upri");
    desc10629.putString(idUpri, """<x:xmpmeta xmlns:x="adobe: ns: meta / " x:xmptk="Adobe XMP Core 5.6 - c140 79.160451, 2017 /05 /06-01:08: 21        ">
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
    desc10629.putString(idGuUr, """<x:xmpmeta xmlns:x="adobe: ns: meta / " x:xmptk="Adobe XMP Core 5.6 - c140 79.160451, 2017 /05 /06-01:08: 21        ">
        < rdf: RDF xmlns: rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#" >
        <rdf: Description rdf: about=""
            xmlns: crs="http://ns.adobe.com/camera-raw-settings/1.0/"
            crs: UprightFourSegmentsCount="0" />
 </rdf: RDF >
</x: xmpmeta >
    """ );
    var idLook = charIDToTypeID("Look");
    desc10629.putString(idLook, """""");
    var idPset = charIDToTypeID("Pset");
    desc10629.putString(idPset, """""");
    executeAction(idAdobeCameraRawFilter, desc10629, DialogModes.NO);
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

function selecTool(tool) {
    var desc9 = new ActionDescriptor();
    var ref7 = new ActionReference();
    ref7.putClass(app.stringIDToTypeID(tool));
    desc9.putReference(app.charIDToTypeID('null'), ref7);
    executeAction(app.charIDToTypeID('slct'), desc9, DialogModes.NO);

    // Tool names (use quoted strings, e.g. 'moveTool')
    // moveTool
    // marqueeRectTool
    // marqueeEllipTool
    // marqueeSingleRowTool
    // marqueeSingleColumnTool
    // lassoTool
    // polySelTool
    // magneticLassoTool
    // quickSelectTool
    // magicWandTool
    // cropTool
    // sliceTool
    // sliceSelectTool
    // spotHealingBrushTool
    // magicStampTool
    // patchSelection
    // redEyeTool
    // paintbrushTool
    // pencilTool
    // colorReplacementBrushTool
    // cloneStampTool
    // patternStampTool
    // historyBrushTool
    // artBrushTool
    // eraserTool
    // backgroundEraserTool
    // magicEraserTool
    // gradientTool
    // bucketTool
    // blurTool
    // sharpenTool
    // smudgeTool
    // dodgeTool
    // burnInTool
    // saturationTool
    // penTool
    // freeformPenTool
    // addKnotTool
    // deleteKnotTool
    // convertKnotTool
    // typeCreateOrEditTool
    // typeVerticalCreateOrEditTool
    // typeCreateMaskTool
    // typeVerticalCreateMaskTool
    // pathComponentSelectTool
    // directSelectTool
    // rectangleTool
    // roundedRectangleTool
    // ellipseTool
    // polygonTool
    // lineTool
    // customShapeTool
    // textAnnotTool
    // soundAnnotTool
    // eyedropperTool
    // colorSamplerTool
    // rulerTool
    // handTool
    // zoomTool
}