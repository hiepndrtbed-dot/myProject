var nameTxt = "/temp.txt";
var temp = 2;
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
        var dialog = new Window("dialog", "Change Temp ...");
        dialog.alignChildren = "left";
        dialog.orientation = "column";

        //Custom name
        var customName = dialog.add("group");
        customName.add("statictext", undefined, "Add Blending: ");
        var inputCustomName = customName.add("edittext", undefined, "", { multiline: false });
        inputCustomName.preferredSize.width = 100;
        inputCustomName.text = temp;

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
            temp = nameCustom;
            var txtFile = new File(scriptFolder.fsName + "/Data" + nameTxt);
            txtFile.encoding = "UTF8";
            txtFile.open("w");
            txtFile.write(decodeURI(nameCustom));
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
        // cameraRawFilterALL(0, 0, 0, 0, 5, false);
        showCurves();
        cameraRawIndor(temp, false);
        doc.activeLayer = doc.layers[0];
        mergeVisible();
        alert("Check VERTICAL && CAMERA!!");
        cameraRawFilterALL(0, 0, 0, 0, 4, true);
        doc.activeLayer.name = "FINALIZE";
        doc.artLayers.getByName("CHECK").remove();
    } catch (error) {
        mergeVisible();
        doc.activeLayer.name = "FINALIZE";
        showCurves();
        cameraRawIndor(temp, false);
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

function cameraRawIndor(temp, withDialog) {
    var a = new ActionDescriptor();
    a.putInteger(charIDToTypeID('PrVN'), 6);// Process Version
    a.putEnumerated(charIDToTypeID('WBal'), charIDToTypeID('WBal'), charIDToTypeID('Cst ')); // White Balance: Custom
    a.putInteger(charIDToTypeID('Temp'), temp);//temp
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