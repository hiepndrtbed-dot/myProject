// Kiểm tra xem có tài liệu đang mở không
if (app.documents.length > 0) {
    var doc = app.activeDocument;

    // Lấy đường dẫn thư mục chứa file gốc
    var originalPath = doc.path;

    // Lấy tên file không có phần mở rộng
    var fileName = doc.name.replace(/\.[^\.]+$/, '');

    // Tạo đường dẫn lưu TIFF và JPEG
    var tifFile = new File(originalPath + "/" + fileName + ".tif");
    var jpgFile = new File(originalPath + "/" + fileName + ".jpg");
    var jpgFileDTD = new File(originalPath + "/" + fileName + "_dtd.jpg");

    // Lưu TIFF
    var tifOptions = new TiffSaveOptions();
    tifOptions.imageCompression = TIFFEncoding.NONE;
    tifOptions.layers = true;
    doc.saveAs(tifFile, tifOptions, true);

    // Lưu JPEG
    doc.layerSets.getByName("DTD").visible = false;
    var jpgOptions = new JPEGSaveOptions();
    jpgOptions.quality = 12;
    doc.saveAs(jpgFile, jpgOptions, true);

    // Lưu JPEG DTD
    doc.layerSets.getByName("DTD").visible = true;
    var jpgOptions = new JPEGSaveOptions();
    jpgOptions.quality = 12;
    doc.saveAs(jpgFileDTD, jpgOptions, true);
    doc.close(SaveOptions.DONOTSAVECHANGES);


    // // Đóng tất cả tài liệu mà không lưu
    // while (app.documents.length > 0) {
    //     app.documents[0].close(SaveOptions.DONOTSAVECHANGES);
    // }
    // Mở Adobe Bridge bằng BridgeTalk
    BridgeTalk.launch("bridge");
    var bt = new BridgeTalk();
    bt.target = "bridge";
    bt.body = "app.bringToFront();";
    bt.send();

} else {
    alert("Không có tài liệu nào đang mở.");
}