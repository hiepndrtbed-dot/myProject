
(function () {
    var progressWindow = new Window("window", "Progress"); // Tạo cửa sổ tiến trình
    var progressText = progressWindow.add("statictext", undefined, "Processing: "); // Thêm văn bản tiến trình
    progressText.preferredSize.width = 300; // Đặt kích thước thanh tiến trình


    var progressbar1 = progressWindow.add("progressbar", undefined, undefined, { name: "progressbar1" });
    progressbar1.maxvalue = 100;
    progressbar1.value = 100;
    progressbar1.preferredSize.width = 160;
    progressbar1.preferredSize.height = 5;


    // Tạo một cửa sổ dialog
    var dialog = new Window("dialog", "Auto Arrange Iamges");
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

    // //Cols/Row
    // var inputColsRow = dialog.add("group")
    // inputColsRow.add("statictext", undefined, "Input Cols/Row:").size = labelSize;
    // var inputColsRowText = inputColsRow.add("edittext", undefined, 4, { multiline: false });
    // inputColsRowText.preferredSize.width = 70;


    //Group Size and margin
    var GroupSizeAndMargin = dialog.add("group")
    GroupSizeAndMargin.orientation = "row"

    var GroupSize = GroupSizeAndMargin.add("group")
    GroupSize.orientation = "column";

    //input width
    var inputWidth = GroupSize.add("group")
    inputWidth.add("statictext", undefined, "Input Width:").size = labelSize
    var inputWidthText = inputWidth.add("edittext", undefined, 846, { multiline: false })
    inputWidthText.preferredSize.width = 70

    //input Height
    var inputHeight = GroupSize.add("group")
    inputHeight.add("statictext", undefined, "Input Height:").size = labelSize
    var inputHeightText = inputHeight.add("edittext", undefined, 486, { multiline: false })
    inputHeightText.preferredSize.width = 70

    //Group margin
    var GroupMargin = GroupSizeAndMargin.add("group")
    GroupMargin.orientation = "column";
    //Input Margin
    //Top|Bottom Margin
    var marginTopBottom = GroupMargin.add("group")
    marginTopBottom.add("statictext", undefined, "Margin Top/Bottom:").size = labelSize
    var inputMarginTopBottomText = marginTopBottom.add("edittext", undefined, 43, { multiline: false })
    inputMarginTopBottomText.preferredSize.width = 70

    //Left|Right margin
    var marginLeftRight = GroupMargin.add("group")
    marginLeftRight.add("statictext", undefined, "Margin Left|Right:").size = labelSize
    var inputMarginLeftRightText = marginLeftRight.add("edittext", undefined, 65, { multiline: false })
    inputMarginLeftRightText.preferredSize.width = 70

    //Save Format
    var formatGroup = dialog.add("group");
    formatGroup.add("statictext", undefined, "Save format:").size = labelSize;
    var formatDropdown = formatGroup.add("dropdownlist");
    formatDropdown.preferredSize.width = 70;
    formatDropdown.add("item", "JPEG");
    formatDropdown.add("item", "PNG");
    formatDropdown.add("item", "PDF");
    formatDropdown.selection = 0;

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
        var widthImages = parseInt(inputWidthText.text);
        var heightImages = parseInt(inputHeightText.text);
        var marginTopBottomImage = parseInt(inputMarginTopBottomText.text);
        var marginLeftRightImage = parseInt(inputMarginLeftRightText.text);
        var formatIndex = formatDropdown.selection;
        if (!inputFolder.exists) {
            alert("Please select folder Input!");
            return;
        }

        if (!outputFolder.exists) {
            alert("Please select folder Output!");
            return;
        }

        dialog.close();
        processImages(inputFolder, outputFolder, widthImages, heightImages, marginTopBottomImage, marginLeftRightImage, formatIndex);
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

    function processImages(inputFolder, outputFolder, widthImages, heightImages, marginTopBottomImage, marginLeftRightImage, formatIndex) {
        progressWindow.show(); // Hiển thị cửa sổ tiến trình

        //Processing
        var files = inputFolder.getFiles();
        for (var i in files) {
            try {
                doc = open(files[i]);
                resizeImage(widthImages, heightImages, marginTopBottomImage, marginLeftRightImage)
                saveImage(outputFolder, formatIndex, "Images_" + i)
                doc.close(SaveOptions.DONOTSAVECHANGES);
            } catch (error) { }

        }
        alert("Done!");
    }

    function resizeImage(widthImages, heightImages, marginTopBottomImage, marginLeftRightImage) {
        var MedWidth = UnitValue(widthImages, "px");
        var MedHeight = UnitValue(heightImages, "px");

        var doc = app.activeDocument;
        var radioWidth = doc.width / MedWidth
        var radioHeight = doc.height / MedHeight

        //Kiem tra ty le
        if (radioWidth > radioHeight) {
            doc.resizeImage(MedWidth - 2 * marginLeftRightImage, null, 72, ResampleMethod.BICUBIC)
            doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
        } else {
            doc.resizeImage(null, MedHeight - 2 * marginTopBottomImage, 72, ResampleMethod.BICUBIC)
            doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
        }
    }
})();

function saveImage(pathName, typeSaveAs, randomSave) {
    // JPG Options;
    alert(typeof pathName)
    alert(typeof typeSaveAs)
    alert(typeof randomSave)

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
            doc.saveAs((new File(pathName + "/" + randomSave + ".png")), pngOptions, true, Extension.LOWERCASE);
            break;

        case "PDF":
            doc.saveAs((new File(pathName + "/" + randomSave + ".pdf")), pdfOptions, true, Extension.LOWERCASE);
            break;

        default:
            doc.saveAs((new File(pathName + "/" + randomSave + ".jpg")), jpgSaveOptions, true, Extension.LOWERCASE);
            break;
    }
}



