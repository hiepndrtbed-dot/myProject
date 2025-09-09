var doc = app.activeDocument;
var MedWidth = UnitValue(1152, "px");
var MedHeight = UnitValue(1536, "px");
var radioWidth = doc.width / MedWidth
var radioHeight = doc.height / MedHeight

//Kiem tra ty le

if (radioWidth < radioHeight) {
    doc.resizeImage(MedWidth, null, 72, ResampleMethod.BICUBIC)
    doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
} else {
    doc.resizeImage(null, MedHeight, 72, ResampleMethod.BICUBIC)
    doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
}
// doc.resizeImage(null, 1536, 72, ResampleMethod.BICUBIC)
// doc.resizeCanvas(1152, 1536, AnchorPosition.MIDDLECENTER)


// alert(doc.layers.length)
// // doc.activeLayer = doc.artLayers[doc.layers.length];