var nameTxt = "/Blending.txt";
var destWhiteMin = 180;
(function () {
    // Đường dẫn đến thư mục chứa file TXT
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

    //process
    // alert(doc.layers.length);
    // alert(doc.layers[0].id);

    for (var index = 0; index < activeDocument.artLayers.length; index++) {
        if (hasLayerStyle(activeDocument.artLayers[index])) {
            activeDocument.activeLayer = activeDocument.artLayers[index];
            blendingOptions(0, 0, 255, 255, 0, 0, destWhiteMin, 255);
        }else{
            // alert("Layer " + activeDocument.artLayers[index].name + " chưa có Blending Options");
        }
    }
})();

function hasLayerStyle(layer) {
    // alert(layer)
    var ref = new ActionReference();
    ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("layerEffects"));
    ref.putIdentifier(stringIDToTypeID("layer"), layer.id);
    try {
        var desc = executeActionGet(ref);
        return desc.hasKey(stringIDToTypeID("layerEffects"));
    } catch (e) {
        return false;
    }
}