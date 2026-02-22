(function () {
    // Kiểm tra xem có tài liệu đang mở không
    if (app.documents.length > 0) {
        //Channels to path
        // alert("Kiem tra thong tin truoc khi Save!")
        doc.activeLayer = doc.layers["MERGE 1"];
        cameraRawFilterALL(0, 0, 10, 10, 5, false);
        // Lấy tên file không có phần mở rộng
        var fileName = doc.name.replace(/\.[^\.]+$/, '');

        // lay duoi mo rong.
        var partsEnd = doc.name.split('.').pop().toLowerCase();

        // Lấy đường dẫn thư mục chứa file gốc
        var originalPath = doc.path;

        if (partsEnd == "tif" || partsEnd == "psd" || partsEnd == "psb") {
            var folderTif = new Folder(originalPath.parent + "/Tif");
            var folderJpg = new Folder(originalPath.parent + "/DoneJPG")
        } else {
            var folderTif = new Folder(originalPath + "/Tif");
            var folderJpg = new Folder(originalPath + "/DoneJPG")
        }

        // Kiểm tra và tạo thư mục 'done' nếu chưa có
        if (!folderTif.exists) {
            folderTif.create();
        }

        if (!folderJpg.exists) {
            folderJpg.create();
        }

        // Tạo đường dẫn lưu TIFF và JPEG
        var tifFile = new File(folderTif + "/" + fileName + ".tif");
        var jpgFile = new File(folderJpg + "/" + fileName + ".jpg");
        var jpgFileDTD = new File(folderJpg + "/" + fileName + "_addon_dtd.jpg");

        // Lưu JPEG
        var jpgOptions = new JPEGSaveOptions();
        jpgOptions.embedColorProfile = true;                        // Nhúng profile màu (giữ màu chính xác)
        jpgOptions.formatOptions = FormatOptions.STANDARDBASELINE;  // Đảm bảo tương thích cao nhất
        jpgOptions.matte = MatteType.NONE;                          // Không áp nền (tránh dính màu nền)
        jpgOptions.quality = 12;

        var layerDTD = doc.layerSets.getByName("DTD");
        layerDTD.visible = false;
        doc.saveAs(jpgFile, jpgOptions, true);

        // Lưu JPEG DTD
        layerDTD.visible = true;
        doc.saveAs(jpgFileDTD, jpgOptions, true);

        // Lưu TIFF
        var tifOptions = new TiffSaveOptions();
        tifOptions.imageCompression = TIFFEncoding.NONE;
        tifOptions.layers = true;
        doc.saveAs(tifFile, tifOptions, true);
        doc.close(SaveOptions.DONOTSAVECHANGES);


        // // Đóng tất cả tài liệu mà không lưu
        // while (app.documents.length > 0) {
        //     app.documents[0].close(SaveOptions.DONOTSAVECHANGES);
        // }

        // Mở Adobe Bridge bằng BridgeTalk
        if (app.documents.length > 0) { return; } //Thoat lenh neu document nhieu hon 1.
        BridgeTalk.launch("bridge");
        var bt = new BridgeTalk();
        bt.target = "bridge";
        bt.body = "app.bringToFront();";
        bt.send();
    } else {
        alert("Không có tài liệu nào đang mở.");
    }
})();
