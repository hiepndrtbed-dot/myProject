//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS;

var nameLayer = "BLACK && WHITE";
var feather = 1;
var hueValue = 100;
var middleLevelsValue = 1.2;
var nameChannel = "Tran_ChiPhao";
var nameTxt = "/Blending.txt";
var destWhiteMin = 180;

var txtFile = new File(scriptFolder.fsName + "/Data" + nameTxt);
if (txtFile.exists) {
    txtFile.encoding = "UTF8"; // hoặc "ASCII" nếu file không có dấu tiếng Việt
    txtFile.open("r"); // "r" = read
    var contentFile = txtFile.read();
    txtFile.close();
    destWhiteMin = contentFile;
} else {
    // Tạo file TXT cùng thư mục
    // Tạo một cửa sổ dialog
    var dialog = new Window("dialog", "Change Blending ...");
    dialog.alignChildren = "left";
    dialog.orientation = "column";

    //Custom name
    var customName = dialog.add("group");
    customName.add("statictext", undefined, "Add Blending: ");
    var inputCustomName = customName.add("edittext", undefined, "", { multiline: false });
    inputCustomName.preferredSize.width = 100;
    inputCustomName.text = destWhiteMin;

    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = "right";
    var cancelButton = buttonGroup.add("button", undefined, "Cancel");

    cancelButton.onClick = function () {
        dialog.close();
    };

    var saveButton = buttonGroup.add("button", undefined, "Process");

    saveButton.onClick = function () {
        dialog.close();
        var nameCustom = inputCustomName.text;
        destWhiteMin = nameCustom;
        var txtFile = new File(scriptFolder.fsName + "/Data" + nameTxt);
        txtFile.encoding = "UTF8";
        txtFile.open("w");
        txtFile.write(decodeURI(nameCustom));
        txtFile.close();
    }
    dialog.show();
}

if (!hasSelection()) {
    alert("Chua co vung chon!");
} else {
    try {
        doc.activeLayer = doc.artLayers["MERGE 1"];
    } catch (error) {
        doc.activeLayer = doc.backgroundLayer;
    } finally {
        // cach moi giu mask cho may khoe
        if (!checkSelectionName(nameChannel)) {
            saveAlphaChnl(nameChannel);
            makeLevelsAdjustment(middleLevelsValue); setFeatherMask(feather);
            doc.activeLayer.move(doc.artLayers[0], ElementPlacement.PLACEBEFORE);
            doc.activeLayer.name = nameLayer;
            setColorLayer("Rd  ");
            blendingOptions(0, 0, 255, 255, 0, 0, destWhiteMin, 255);// blendingOptions(0, 47, 189, 255, 0, 36, 233, 255);
            doc.activeLayer.opacity = hueValue;
            makeSolidColor(255, 255, 255);
            doc.activeLayer.blendMode = BlendMode.COLORBLEND;
            doc.activeLayer.grouped = true;
            /////
        } else {
            addSelectionToChannelName(nameChannel);
            doc.activeLayer = doc.artLayers[nameLayer];
            selectMask();
            fillColor(228, 228, 228);
            doc.selection.deselect();
        }
    }

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

function makeLevelsAdjustment(middle) {
    var idMk = charIDToTypeID("Mk  ");
    var desc1 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref1 = new ActionReference();
    var idAdjL = charIDToTypeID("AdjL");
    ref1.putClass(idAdjL);
    desc1.putReference(idnull, ref1);

    var idUsng = charIDToTypeID("Usng");
    var desc2 = new ActionDescriptor();

    var idType = charIDToTypeID("Type");
    var desc3 = new ActionDescriptor();

    // Tạo cấu hình Levels
    var idAdjs = charIDToTypeID("Adjs");
    var list1 = new ActionList();
    var desc4 = new ActionDescriptor();

    // Channel RGB
    var idChnl = charIDToTypeID("Chnl");
    var ref2 = new ActionReference();
    var idChnlRGB = charIDToTypeID("Chnl");
    var idRGB = charIDToTypeID("RGB ");
    ref2.putEnumerated(idChnlRGB, idChnlRGB, idRGB);
    desc4.putReference(idChnl, ref2);

    // Input levels: black, white
    var idInpt = charIDToTypeID("Inpt");
    var list2 = new ActionList();
    list2.putInteger(0);    // black input
    list2.putInteger(255);  // white input
    desc4.putList(idInpt, list2);

    // Gamma (midtone)
    var idGmm = charIDToTypeID("Gmm ");
    desc4.putDouble(idGmm, middle); // midtone = 1.2

    // Output levels: black, white
    var idOtpt = charIDToTypeID("Otpt");
    var list3 = new ActionList();
    list3.putInteger(0);    // black output
    list3.putInteger(255);  // white output
    desc4.putList(idOtpt, list3);

    list1.putObject(charIDToTypeID("LvlA"), desc4);
    desc3.putList(idAdjs, list1);

    desc2.putObject(idType, charIDToTypeID("Lvls"), desc3);
    desc1.putObject(idUsng, idAdjL, desc2);

    executeAction(idMk, desc1, DialogModes.NO);
}

function fillColor(red, green, blue) {
    var myColor = new SolidColor()
    myColor.rgb.red = red // 0 - 255
    myColor.rgb.green = green
    myColor.rgb.blue = blue
    activeDocument.selection.fill(myColor)
}
function fillWilte() {
    var idFl = charIDToTypeID("Fl  ");
    var desc195460 = new ActionDescriptor();
    var idUsng = charIDToTypeID("Usng");
    var idFlCn = charIDToTypeID("FlCn");
    var idWht = charIDToTypeID("Wht ");
    desc195460.putEnumerated(idUsng, idFlCn, idWht);
    var idOpct = charIDToTypeID("Opct");
    var idPrc = charIDToTypeID("#Prc");
    desc195460.putUnitDouble(idOpct, idPrc, 100.000000);
    var idMd = charIDToTypeID("Md  ");
    var idBlnM = charIDToTypeID("BlnM");
    var idNrml = charIDToTypeID("Nrml");
    desc195460.putEnumerated(idMd, idBlnM, idNrml);
    executeAction(idFl, desc195460, DialogModes.NO);
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
