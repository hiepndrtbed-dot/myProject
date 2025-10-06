//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS

var targetDoc = app.activeDocument;
var targetName = targetDoc.name;
var layerCount = 1;
var copiedLayers = [];
var lengthDoc = app.documents.length;

// Copy và đổi tên các layer từ các document khác
for (var i = 0; i < lengthDoc; i++) {
    var sourceDoc = app.documents[i];
    if (sourceDoc.name !== targetName) {
        app.activeDocument = sourceDoc;
        var layer = sourceDoc.activeLayer;
        // Copy sang document đích
        if (app.activeDocument.name != "Untitled-1") {
            var copiedLayer = layer.duplicate(targetDoc, ElementPlacement.PLACEATEND);
            sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
            lengthDoc--;
            i--;
            copiedLayers.push(copiedLayer);
            layerCount++;
        }
    }
}

// Hàm đo độ sáng tại tâm layer (chỉ khi layer đó hiển thị)
function getPointBrightnessExclusive(layer) {
    var doc = app.activeDocument;

    // Lưu trạng thái hiển thị ban đầu
    var originalVisibility = [];
    for (var i = 0; i < doc.layers.length; i++) {
        originalVisibility.push(doc.layers[i].visible);
        doc.layers[i].visible = false;
    }

    // Hiển thị layer cần đo
    layer.visible = true;
    doc.activeLayer = layer;

    // Lấy tâm layer
    var center = [doc.height / 2, doc.width / 2];

    // Đo độ sáng tại điểm
    doc.colorSamplers.removeAll();
    var sampler = doc.colorSamplers.add(center);
    var rgb = sampler.color.rgb;
    var brightness = (rgb.red + rgb.green + rgb.blue) / 3;
    sampler.remove();

    // Khôi phục trạng thái hiển thị
    for (var i = 0; i < doc.layers.length; i++) {
        doc.layers[i].visible = originalVisibility[i];
    }

    return brightness;
}

// Đo độ sáng cho từng layer
var brightnessValues = [];
for (var i = 0; i < copiedLayers.length; i++) {
    var b = getPointBrightnessExclusive(copiedLayers[i]);
    brightnessValues.push({ layer: copiedLayers[i], brightness: b });
}

// Sắp xếp layer: layer tối hơn nằm trên
brightnessValues.sort(function (a, b) {
    return a.brightness - b.brightness; // Tối hơn → nhỏ hơn → lên trên
});

// Di chuyển layer theo thứ tự đã sắp xếp
for (var i = brightnessValues.length - 1; i >= 0; i--) {
    brightnessValues[i].layer.move(targetDoc, ElementPlacement.PLACEATBEGINNING);
}

// Tạo hàm bật/tắt layer theo tên
function showOnly(layerName) {
    for (var i = 0; i < targetDoc.layers.length; i++) {
        var layer = targetDoc.layers[i];
        layer.visible = (layer.name === layerName);
    }
}

// Ví dụ: bật Option 1
// showOnly("Option 1");
// dialog1
var dialog1 = new Window("dialog")
dialog1.text = "ACTION"
dialog1.orientation = "column";
dialog1.alignChildren = ["center", "top"];
dialog1.spacing = 10
dialog1.margins = 10

// dialog1.active = true;
// GROUP1
// ======
var group1 = dialog1.add("group", undefined, { name: "group1" });
group1.orientation = "column";
group1.alignment = ["left", "center"];
group1.spacing = 3;
group1.margins = 0;

//Merge Exposure
var buttonMergeExposure = group1.add("button", undefined, undefined, { name: "Merge Exposure" });
buttonMergeExposure.text = "Merge Exposure (2)";
buttonMergeExposure.alignment = ["left", "center"];
buttonMergeExposure.preferredSize.width = 170;
// buttonMergeExposure.tabStop = false; // <- không cho focus
buttonMergeExposure.active = true



//Align and merge Exposure
var buttonAlign = group1.add("button", undefined, undefined, { name: "Align and merge Exposure" });
buttonAlign.text = "ALign and Merge Exposure (A)";
buttonAlign.alignment = ["left", "center"];
buttonAlign.preferredSize.width = 170;
// buttonAlign.tabStop = false; // <- không cho focus


//Close Frame.
var buttonClose = group1.add("button", undefined, undefined, { name: "Cancel" });
buttonClose.text = "Cancel";
buttonClose.preferredSize.width = 170;
// buttonClose.active = true

//MERGE EXPOSURE
buttonMergeExposure.addEventListener("click", function () {
    dialog1.close()
    var targetScript = File(currentFolder + "/mergeImage2.jsx");
    if (targetScript.exists) {
        $.evalFile(targetScript);
    } else {
        alert("❌ Không tìm thấy file: " + targetScript.fsName);
    }
})

//ALIGN AND MERGE EXPOSURE
buttonAlign.addEventListener("click", function () {
    dialog1.close()
    loadAction("ALign", "DataAction(HDR).atn")
    var targetScript = File(currentFolder + "/MergeImage.jsx");
    if (targetScript.exists) {
        $.evalFile(targetScript);
    } else {
        alert("❌ Không tìm thấy file: " + targetScript.fsName);
    }
})

//Đóng form
buttonClose.addEventListener("click", function () {
    dialog1.close()
})

//Xử lý xự kiện bằng bàng phím
dialog1.addEventListener("keydown", triggerBtnRun);
function triggerBtnRun(e) {
    // alert(e.keyName)
    if (e.keyName == "1") {
        buttonMergeExposure.dispatchEvent(new Event("click"))
    }
    else if (e.keyName == "2") {
        buttonAlign.dispatchEvent(new Event("click"))
    }
    else {
        alert("Input fail!!!!")
    }
}
dialog1.show();

