function layerExists(layerName) {
    var ref = new ActionReference();
    ref.putName(charIDToTypeID("Lyr "), layerName);
    try {
        var desc = executeActionGet(ref);
        return true; // Tìm thấy layer
    } catch (e) {
        return false; // Không có layer
    }
}

// Gọi hàm
if (layerExists("Layer 1")) {
    alert("Layer 'abc' tồn tại!");
} else {
    alert("Layer 'abc' không tồn tại!");
}