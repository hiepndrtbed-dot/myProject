// myscript.jsx
#target photoshop

alert("Xin chào Hiệp! Đây là script JSX đang chạy trong Photoshop.");

// ví dụ: tạo một layer mới
var doc = app.activeDocument;
var newLayer = doc.artLayers.add();
newLayer.name = "Layer Tạo Bởi Extension";
