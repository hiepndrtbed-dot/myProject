(function () {
    var progressWindow = new Window("window", "Progress"); // Tạo cửa sổ tiến trình
    var progressText = progressWindow.add("statictext", undefined, "Processing: "); // Thêm văn bản tiến trình
    progressText.preferredSize.width = 300; // Đặt kích thước thanh tiến trình

    // Tạo một cửa sổ dialog
    var dialog = new Window("dialog", "Auto Arrange Iamges");
    dialog.alignChildren = "left";

    var labelSize = [80, 20]; // Kích thước chung cho các tiêu đề

    // Thêm các ô nhập thông tin

    //Folder input
    var inputFolderGroup = dialog.add("group");
    inputFolderGroup.add("statictext", undefined, "Folder Input(*):").size = labelSize;
    var inputFolderText = inputFolderGroup.add("edittext", undefined, "", { multiline: false });
    inputFolderText.preferredSize.width = 200;
    var inputFolderButton = inputFolderGroup.add("button", undefined, "Select");
    //Folder output
    var outputFolderGroup = dialog.add("group");
    outputFolderGroup.add("statictext", undefined, "Folder Ouput(*)").size = labelSize;
    var outputFolderText = outputFolderGroup.add("edittext", undefined, "", { multiline: false });
    outputFolderText.preferredSize.width = 200;
    var outputFolderButton = outputFolderGroup.add("button", undefined, "Select");

    //Cols/Row
    var inputColsRow = dialog.add("group")
    inputColsRow.add("statictext", undefined, "Input Cols/Row:").size = labelSize;
    var inputColsRowText = inputColsRow.add("edittext", undefined, 4, { multiline: false });
    inputColsRowText.preferredSize.width = 70;

    //Save Format
    var formatGroup = dialog.add("group");
    formatGroup.add("statictext", undefined, "Save format:").size = labelSize;
    var formatDropdown = formatGroup.add("dropdownlist");
    formatDropdown.preferredSize.width = 70;
    formatDropdown.add("item", "JPEG");
    formatDropdown.add("item", "PNG");
    formatDropdown.add("item", "PDF");
    formatDropdown.selection = 1;

    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = "right";
    var cancelButton = buttonGroup.add("button", undefined, "Cancel");

    cancelButton.onClick = function () {
        dialog.close();
    };

    var saveButton = buttonGroup.add("button", undefined, "Save");
    saveButton.onClick = function () {
        var inputFolder = new Folder(inputFolderText.text);
        var outputFolder = new Folder(outputFolderText.text);
        var colsRow = parseInt(inputColsRowText.text);
        var formatIndex = formatDropdown.selection;

        if (!outputFolder.exists) {
            alert("Please chol!");
            return;
        }

        dialog.close();
        processImages(inputFolder, outputFolder, colsRow, formatIndex);
        progressWindow.close();
    };

    inputFolderButton.onClick = function () {
        var folder = Folder.selectDialog("Select folder input!");
        if (folder != null) {
            inputFolderText.text = folder.fsName;
        }
    };

    outputFolderButton.onClick = function () {
        var folder = Folder.selectDialog("Select folder output!");
        if (folder != null) {
            outputFolderText.text = folder.fsName;
        }
    };

    dialog.show();

    function processImages(inputFolder, outputFolder, maxSize, formatIndex, dpi) {
        progressWindow.show(); // Hiển thị cửa sổ tiến trình

        if (!inputFolder.exists) {
            // Lưu file đang làm việc hiện tại
            var doc = app.activeDocument;
            if (doc === null) {
                alert("Không có gì để luu!");
                return;
            }

            saveImage(doc, outputFolder, maxSize, formatIndex, dpi);
        } else {
            // Lưu tất cả các file ảnh trong thư mục đầu vào
            saveImagesInFolder(inputFolder, outputFolder, maxSize, formatIndex, dpi);
        }

        alert("Hoàn thành lưu ảnh!");
    }

    function saveImagesInFolder(inputFolder, outputFolder, maxSize, formatIndex, dpi) {
        var files = inputFolder.getFiles();

        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            if (file instanceof Folder) {
                // Nếu là thư mục, tạo thư mục tương ứng trong thư mục đầu ra
                var folderName = file.name;
                var outputSubFolder = new Folder(outputFolder + "/" + folderName);
                outputSubFolder.create();

                // Tiếp tục xử lý trong thư mục con
                saveImagesInFolder(file, outputSubFolder, maxSize, formatIndex, dpi);
            } else {
                // Kiểm tra phần mở rộng của tệp tin
                var extension = file.name.split('.').pop().toLowerCase();
                var fileSize = file.length / 1024; // Dung lượng tệp tin (KB)

                if (extension === 'jpg' || extension === 'jpeg') {
                    {
                        var doc = open(file);
                        saveImage(doc, outputFolder, maxSize, formatIndex, dpi);
                        doc.close(SaveOptions.DONOTSAVECHANGES);
                    }
                }
            }
        }
    }

})();

function typeSave(pathName, typeSaveAs, randomSave) {
    // JPG Options;
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.embedColorProfile = true;
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgSaveOptions.matte = MatteType.NONE;
    jpgSaveOptions.quality = 10;


    //PDF Options
    pdfOptions = new PDFSaveOptions();
    pdfOptions.compatibility = PDFCompatibility.PDF15;
    pdfOptions.generateThumbnails = true;
    pdfOptions.preserveEditability = false;
    pdfOptions.preset = "[High File Size]";
    pdfOptions.layers = false;


    //PNG Options
    pngOptions = new PNGSaveOptions();
    pngOptions.compression = 8;
    pngOptions.interlaced = false;

    switch (typeSaveAs) {
        case "PNG":
            doc.saveAs((new File(pathName + "_" + randomSave + ".png")), pngOptions, true, Extension.LOWERCASE);
            break;

        case "PDF":
            doc.saveAs((new File(pathName + "_" + randomSave + ".pdf")), pdfOptions, true, Extension.LOWERCASE);
            break;

        default:
            doc.saveAs((new File(pathName + "_" + randomSave + ".jpg")), jpgSaveOptions, true, Extension.LOWERCASE);
            break;
    }
}
