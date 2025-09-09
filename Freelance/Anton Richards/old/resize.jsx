#target photoshop;
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS;
(function () {
    var progressWindow = new Window("window", "Progress"); // Tạo cửa sổ tiến trình
    var progressText = progressWindow.add("statictext", undefined, "Processing: "); // Thêm văn bản tiến trình
    progressText.preferredSize.width = 300; // Đặt kích thước thanh tiến trình


    var progressbar1 = progressWindow.add("progressbar", undefined, undefined, { name: "progressbar1" });
    progressbar1.maxvalue = 100;
    progressbar1.value = 0;
    progressbar1.preferredSize.width = 160;
    progressbar1.preferredSize.height = 10;

    // Tạo một cửa sổ dialog
    var dialog = new Window("dialog", "Auto resize images");
    dialog.alignChildren = "left";
    dialog.orientation = "column";


    var labelSize = [80, 20]; // Kích thước chung cho các tiêu đề

    // Thêm các ô nhập thông tin
    //Folder input
    var inputFolderGroup = dialog.add("group");
    inputFolderGroup.add("statictext", undefined, "Folder Input(*):").size = labelSize;
    var inputFolderText = inputFolderGroup.add("edittext", undefined, "", { multiline: false });
    inputFolderText.preferredSize.width = 160;
    var inputFolderButton = inputFolderGroup.add("button", undefined, "Select");
    //Folder output
    var outputFolderGroup = dialog.add("group");
    outputFolderGroup.add("statictext", undefined, "Folder Ouput(*)").size = labelSize;
    var outputFolderText = outputFolderGroup.add("edittext", undefined, "", { multiline: false });
    outputFolderText.preferredSize.width = 160;
    var outputFolderButton = outputFolderGroup.add("button", undefined, "Select");

    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = "right";
    var cancelButton = buttonGroup.add("button", undefined, "Cancel");

    cancelButton.onClick = function () {
        dialog.close();
    };

    var saveButton = buttonGroup.add("button", undefined, "Process");

    saveButton.onClick = function () {
        var inputFolder = new Folder(inputFolderText.text);
        var outputFolder = new Folder(outputFolderText.text);
        var widthImages = parseInt("2500");
        var heightImages = parseInt("2500");
        var formatIndex = "ForWeb";
        if (!inputFolder.exists) {
            alert("Please select folder Input!");
            return;
        }

        if (!outputFolder.exists) {
            alert("Please select folder Output!");
            return;
        }

        dialog.close();
        processImages(inputFolder, outputFolder, widthImages, heightImages, formatIndex);
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

    function processImages(inputFolder, outputFolder, widthImages, heightImages, formatIndex) {
        progressWindow.show(); // Hiển thị cửa sổ tiến trình
        const d = new Date();
        var time = d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();

        //Processing
        var files = inputFolder.getFiles();
        valueProcessing = 100 / files.length

        for (var i in files) {
            try {
                doc = open(files[i]);
                var docName = doc.name.substring(0, doc.name.lastIndexOf("."));
                resizeImage(widthImages, heightImages)
                progressbar1.value = valueProcessing;
                saveImage(outputFolder, formatIndex, widthImages + "X" + heightImages + "_" + time + "_" + docName)
                doc.close(SaveOptions.DONOTSAVECHANGES);
                valueProcessing = valueProcessing + 100 / files.length;
            } catch (error) { }
        }
        alert("Done!");
    }

    function resizeImage(widthImages, heightImages, size) {
        var MedWidth = UnitValue(widthImages, "px");
        var MedHeight = UnitValue(heightImages, "px");

        var doc = app.activeDocument;
        var radioWidth = doc.width / MedWidth
        var radioHeight = doc.height / MedHeight

        //Kiem tra ty le
        if (radioWidth > radioHeight) {
            doc.resizeImage(MedWidth, null, 72, ResampleMethod.BICUBIC)
            // doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
        } else {
            doc.resizeImage(null, MedHeight, 72, ResampleMethod.BICUBIC)
            // doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
        }

    }
})();

function saveImage(pathName, typeSaveAs, randomSave) {
    // JPG Options;
    var doc = activeDocument;
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

    // Set the options for Save for Web
    var saveForWebOptions = new ExportOptionsSaveForWeb();
    saveForWebOptions.format = SaveDocumentType.JPEG;
    saveForWebOptions.quality = 55; // Adjust the quality as needed

    switch (typeSaveAs.toString()) {
        case "PNG":
            doc.saveAs((new File(pathName + "/" + randomSave + ".png")), pngOptions, true, Extension.LOWERCASE);
            break;
        case "PDF":
            doc.saveAs((new File(pathName + "/" + randomSave + ".pdf")), pdfOptions, true, Extension.LOWERCASE);
            break;
        case "ForWeb":
            doc.exportDocument(new File(pathName + "/" + randomSave + ".jpg"), ExportType.SAVEFORWEB, saveForWebOptions);
            break;
        default:
            doc.saveAs((new File(pathName + "/" + randomSave + ".jpg")), jpgSaveOptions, true, Extension.LOWERCASE);
            break;
    }
}




