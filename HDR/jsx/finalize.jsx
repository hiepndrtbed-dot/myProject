var nameTxt = "/Preset.txt";
var temp = 1;
var withDialog = false;
(function main() {
    var txtFile = new File(scriptFolder.fsName + "/Data" + nameTxt);
    if (txtFile.exists) {
        txtFile.encoding = "UTF8"; // hoặc "ASCII" nếu file không có dấu tiếng Việt
        txtFile.open("r"); // "r" = read
        var contentFile = txtFile.read();
        txtFile.close();
        temp = contentFile;
    } else {
        // Tạo file TXT cùng thư mục
        // Tạo một cửa sổ dialog
        var dialog = new Window("dialog", "Chose Preset...");
        dialog.alignChildren = "left";
        dialog.orientation = "column";

        // Panel chứa radio button
        var radioGroup = dialog.add("panel", undefined, "Chọn Preset");
        radioGroup.orientation = "column";
        radioGroup.alignChildren = "left";

        // Mảng các lựa chọn
        var presets = [
            "Preset Indoor",
            "Preset Indoor Trắng xám",
            "Preset Indoor BWPD",
            "Preset Outdoor",
            "Preset Outdoor BWPD",
        ];

        // Sinh radio button từ mảng
        var radios = [];
        for (var i = 0; i < presets.length; i++) {
            radios[i] = radioGroup.add("radiobutton", undefined, presets[i]);
        }

        // Đặt mặc định chọn radio đầu tiên
        radios[0].value = true;

        // Nhóm nút OK/Cancel
        var buttonGroup = dialog.add("group");
        buttonGroup.alignment = "right";
        var saveButton = buttonGroup.add("button", undefined, "OK");
        var cancelButton = buttonGroup.add("button", undefined, "Cancel");

        // Xử lý khi nhấn OK
        saveButton.onClick = function () {
            dialog.close();
            var chosenPreset = "";
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].value) {
                    chosenPreset = i;
                    break;
                }
            }
            // Lưu lựa chọn vào file TXT
            temp = chosenPreset;
            var txtFile = new File(scriptFolder.fsName + "/Data" + nameTxt);
            txtFile.encoding = "UTF8";
            txtFile.open("w");
            txtFile.write(decodeURI(chosenPreset));
            txtFile.close();
        }
        dialog.show();
    }

    //process

    doc.activeLayer = doc.layers[0];
    doc.artLayers.add();
    try {
        doc.layers.getByName("Sky").visible = false;
        mergeVisible();
        doc.activeLayer.move(doc.layers.getByName("Sky"), ElementPlacement.PLACEAFTER);
        doc.layers.getByName("Sky").visible = true;
        doc.activeLayer.name = "CHECK";
        showCurves();
        processPreset(temp, withDialog);
        doc.activeLayer = doc.layers[0];
        mergeVisible();
        doc.activeLayer.name = "FINALIZE";
        alert("Check VERTICAL && CAMERA!!");
        cameraRawFilterALL(0, 0, 0, 0, 4, true);
        doc.artLayers.getByName("CHECK").remove();
    } catch (error) {
        mergeVisible();
        doc.activeLayer.name = "FINALIZE";
        showCurves();
        processPreset(temp, withDialog);
        alert("Check VERTICAL && CAMERA!!");
        // cameraRawIndor(2, true);
        cameraRawFilterALL(0, 0, 0, 0, 4, true);
    }
})();


function mergeVisible() {
    var idMrgV = charIDToTypeID("MrgV");
    var desc25388 = new ActionDescriptor();
    var idDplc = charIDToTypeID("Dplc");
    desc25388.putBoolean(idDplc, true);
    executeAction(idMrgV, desc25388, DialogModes.NO);
}

function showCurves() { executeAction(charIDToTypeID("Crvs"), undefined, DialogModes.ALL); }

function processPreset(valuePreset, withDialog) {
    switch (parseInt(valuePreset)) {
        case 0:
            // alert("Preset Indoor");
            cameraRawIndor(withDialog);
            break;
        case 1:
            // alert("Preset Indoor Trắng xám");
            cameraRawIndorWhiteGray(withDialog);
            break;
        case 2:
            // alert("Preset Indoor BWPD");
            cameraRawIndorBWPD(withDialog);
            break;
        case 3:
            // alert("Preset Outdoor");
            cameraRawOutdoor(withDialog);
            break;
        case 4:
            // alert("Preset Outdoor BWPD");
            cameraRawOutdoorBWPD(withDialog);
            break;
        default:
            break;
    }
}

// Preset Indoor
function cameraRawIndor(withDialog) {
    var a = new ActionDescriptor();
    a.putInteger(charIDToTypeID('PrVN'), 6);// Process Version
    a.putEnumerated(charIDToTypeID('WBal'), charIDToTypeID('WBal'), charIDToTypeID('Cst ')); // White Balance: Custom
    a.putInteger(charIDToTypeID('Temp'), 0);//temp
    a.putInteger(charIDToTypeID('Cr12'), 9);//contract
    a.putInteger(charIDToTypeID('Hi12'), -4);//highlight
    a.putInteger(charIDToTypeID('Sh12'), 5);//shadow
    a.putInteger(charIDToTypeID('CrTx'), 15);//texture
    a.putInteger(charIDToTypeID('Cl12'), 7);//Clarity
    a.putInteger(charIDToTypeID('Dhze'), 7);//Dehaze
    a.putInteger(charIDToTypeID('Shrp'), 50);//Sharpening
    a.putDouble(charIDToTypeID('ShpR'), 1);//Radius
    a.putInteger(charIDToTypeID('ShpD'), 25);//Detail
    a.putInteger(charIDToTypeID('ShpM'), 7);//Masking
    a.putInteger(charIDToTypeID('LNR '), 24);//Noise Reduction
    a.putInteger(charIDToTypeID('LNRD'), 50);//Detail
    a.putInteger(charIDToTypeID('LNRC'), 8);//Contract
    a.putInteger(charIDToTypeID('DfPA'), 0);//Purple Amount
    a.putInteger(charIDToTypeID('DPHL'), 30);//Purple Hue (in)
    a.putInteger(charIDToTypeID('DPHH'), 70);//Purple Hue (out)
    a.putInteger(charIDToTypeID('DfGA'), 0);//Green Amount
    a.putInteger(charIDToTypeID('DPGL'), 40);//Green Hue (in)
    a.putInteger(charIDToTypeID('DPGH'), 60);//Green Hue (out)
    executeAction(stringIDToTypeID('Adobe Camera Raw Filter'), a, withDialog ? DialogModes.ALL : DialogModes.NO);
}

// Preset Indoor trắng xám
function cameraRawIndorWhiteGray(withDialog) {
    var a = new ActionDescriptor();
    a.putInteger(charIDToTypeID('PrVN'), 6);// Process Version
    a.putEnumerated(charIDToTypeID('WBal'), charIDToTypeID('WBal'), charIDToTypeID('Cst ')); // White Balance: Custom
    a.putInteger(charIDToTypeID('Temp'), 2);//temp
    a.putInteger(charIDToTypeID('Cr12'), 9);//contract
    a.putInteger(charIDToTypeID('Hi12'), -4);//highlight
    a.putInteger(charIDToTypeID('Sh12'), 5);//shadow
    a.putInteger(charIDToTypeID('CrTx'), 15);//texture
    a.putInteger(charIDToTypeID('Cl12'), 7);//Clarity
    a.putInteger(charIDToTypeID('Dhze'), 7);//Dehaze
    a.putInteger(charIDToTypeID('Shrp'), 50);//Sharpening
    a.putDouble(charIDToTypeID('ShpR'), 1);//Radius
    a.putInteger(charIDToTypeID('ShpD'), 25);//Detail
    a.putInteger(charIDToTypeID('ShpM'), 7);//Masking
    a.putInteger(charIDToTypeID('LNR '), 24);//Noise Reduction
    a.putInteger(charIDToTypeID('LNRD'), 50);//Detail
    a.putInteger(charIDToTypeID('LNRC'), 8);//Contract
    a.putInteger(charIDToTypeID('DfPA'), 0);//Purple Amount
    a.putInteger(charIDToTypeID('DPHL'), 30);//Purple Hue (in)
    a.putInteger(charIDToTypeID('DPHH'), 70);//Purple Hue (out)
    a.putInteger(charIDToTypeID('DfGA'), 0);//Green Amount
    a.putInteger(charIDToTypeID('DPGL'), 40);//Green Hue (in)
    a.putInteger(charIDToTypeID('DPGH'), 60);//Green Hue (out)
    executeAction(stringIDToTypeID('Adobe Camera Raw Filter'), a, withDialog ? DialogModes.ALL : DialogModes.NO);
}

// Preset Indoor BWPD
function cameraRawIndorBWPD(withDialog) {
    var a = new ActionDescriptor();
    a.putInteger(charIDToTypeID('PrVN'), 6);// Process Version
    a.putEnumerated(charIDToTypeID('WBal'), charIDToTypeID('WBal'), charIDToTypeID('Cst ')); // White Balance: Custom
    a.putInteger(charIDToTypeID('Temp'), 0);//temp
    a.putInteger(charIDToTypeID('Cr12'), 9);//contract
    a.putInteger(charIDToTypeID('Hi12'), -14);//highlight
    a.putInteger(charIDToTypeID('Sh12'), -5);//shadow
    a.putInteger(charIDToTypeID('Wh12'), -3);//white 
    a.putInteger(charIDToTypeID('CrTx'), -10);//texture
    a.putInteger(charIDToTypeID('Cl12'), 2);//Clarity
    a.putInteger(charIDToTypeID('Dhze'), 2);//Dehaze
    a.putInteger(charIDToTypeID('LNR '), 24);//Noise Reduction
    a.putInteger(charIDToTypeID('LNRD'), 50);//Detail
    a.putInteger(charIDToTypeID('LNRC'), 8);//Contract
    a.putInteger(charIDToTypeID('DfPA'), 0);//Purple Amount
    a.putInteger(charIDToTypeID('DPHL'), 30);//Purple Hue (in)
    a.putInteger(charIDToTypeID('DPHH'), 70);//Purple Hue (out)
    a.putInteger(charIDToTypeID('DfGA'), 0);//Green Amount
    a.putInteger(charIDToTypeID('DPGL'), 40);//Green Hue (in)
    a.putInteger(charIDToTypeID('DPGH'), 60);//Green Hue (out)
    executeAction(stringIDToTypeID('Adobe Camera Raw Filter'), a, withDialog ? DialogModes.ALL : DialogModes.NO);
}

// Preset Outdoor BWPD
function cameraRawOutdoorBWPD(withDialog) {
    var a = new ActionDescriptor();
    a.putInteger(charIDToTypeID('PrVN'), 6);// Process Version
    a.putEnumerated(charIDToTypeID('WBal'), charIDToTypeID('WBal'), charIDToTypeID('Cst ')); // White Balance: Custom
    a.putInteger(charIDToTypeID('Temp'), 0);//temp
    a.putInteger(charIDToTypeID('tint'), -1);//tint
    a.putInteger(charIDToTypeID('Cr12'), 5);//contract
    a.putInteger(charIDToTypeID('Hi12'), -17);//highlight
    a.putInteger(charIDToTypeID('Sh12'), +15);//shadow
    a.putInteger(charIDToTypeID('CrTx'), -15);//texture
    a.putInteger(charIDToTypeID('Cl12'), 2);//Clarity
    a.putInteger(charIDToTypeID('Dhze'), 2);//Dehaze
    a.putInteger(charIDToTypeID('LNR '), 12);//Noise Reduction
    a.putInteger(charIDToTypeID('LNRD'), 50);//Detail
    a.putInteger(charIDToTypeID('LNRC'), 0);//Contract
    a.putInteger(charIDToTypeID('DfPA'), 0);//Purple Amount
    a.putInteger(charIDToTypeID('DPHL'), 30);//Purple Hue (in)
    a.putInteger(charIDToTypeID('DPHH'), 70);//Purple Hue (out)
    a.putInteger(charIDToTypeID('DfGA'), 0);//Green Amount
    a.putInteger(charIDToTypeID('DPGL'), 40);//Green Hue (in)
    a.putInteger(charIDToTypeID('DPGH'), 60);//Green Hue (out)
    executeAction(stringIDToTypeID('Adobe Camera Raw Filter'), a, withDialog ? DialogModes.ALL : DialogModes.NO);
}
// Preset Outdoor
function cameraRawOutdoor(withDialog) {
    var a = new ActionDescriptor();
    a.putInteger(charIDToTypeID('Cr12'), 5);//contract
    a.putInteger(charIDToTypeID('Hi12'), -15);//highlight
    a.putInteger(charIDToTypeID('Sh12'), 20);//shadow
    a.putInteger(charIDToTypeID('Temp'), 0);//temp
    a.putInteger(charIDToTypeID('Tint'), -1);
    a.putInteger(charIDToTypeID('Cl12'), 4);//Clarity
    a.putInteger(charIDToTypeID('Dhze'), 6);//Dehaze
    a.putInteger(charIDToTypeID('LNR '), 12);//Noise Reduction
    a.putInteger(charIDToTypeID('LNRD'), 50);//Detail Noise Reduction
    a.putInteger(charIDToTypeID('LNRC'), 0);//Contract Noise Reduction
    executeAction(stringIDToTypeID('Adobe Camera Raw Filter'), a, withDialog ? DialogModes.ALL : DialogModes.NO);
}