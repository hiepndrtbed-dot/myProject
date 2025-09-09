//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
const versionTo = " By Acad -- Version 1.5 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;

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
        var copiedLayer = layer.duplicate(targetDoc, ElementPlacement.PLACEATEND);
        sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
        lengthDoc--;
        i--;
        copiedLayers.push(copiedLayer);
        layerCount++;
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
