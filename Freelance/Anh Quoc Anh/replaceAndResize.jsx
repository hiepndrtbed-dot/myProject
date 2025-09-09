const versionTo = " By DucHiep .. hiepcdit@gmail.com"
preferences.rulerUnits = Units.PIXELS;
app.preferences.typeunits = TypeUnits.PIXELS;
// DIALOG
// ======
var dialog = new Window("dialog");
dialog.text = "Dialog";
dialog.orientation = "column";
dialog.alignChildren = ["center", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// TPANEL1
// =======
var tpanel1 = dialog.add("tabbedpanel", undefined, undefined, { name: "tpanel1" });
tpanel1.alignChildren = "fill";
tpanel1.preferredSize.width = 119.531;
tpanel1.margins = 0;

// TAB1
// ====
var tab1 = tpanel1.add("tab", undefined, undefined, { name: "Resize images" });
tab1.text = "Resize images";
tab1.orientation = "column";
tab1.alignChildren = ["left", "top"];
tab1.spacing = 10;
tab1.margins = 10;

var progressWindow = new Window("window", "Progress"); // Tạo cửa sổ tiến trình
var progressText = progressWindow.add("statictext", undefined, "Processing: "); // Thêm văn bản tiến trình
progressText.preferredSize.width = 300; // Đặt kích thước thanh tiến trình


var progressbar1 = progressWindow.add("progressbar", undefined, undefined, { name: "progressbar1" });
progressbar1.maxvalue = 100;
progressbar1.value = 0;
progressbar1.preferredSize.width = 160;
progressbar1.preferredSize.height = 10;

// // Tạo một cửa sổ dialog
// var dialog = new Window("dialog", "Auto Arrange Iamges");
// dialog.alignChildren = "left";
// dialog.orientation = "column";


var labelSize = [80, 20]; // Kích thước chung cho các tiêu đề

// Thêm các ô nhập thông tin
//Folder input
var inputFolderGroup = tab1.add("group");
inputFolderGroup.add("statictext", undefined, "Folder Input(*):").size = labelSize;
var tab1InputFolderText = inputFolderGroup.add("edittext", undefined, "", { multiline: false });
tab1InputFolderText.preferredSize.width = 300;
var inputFolderButton = inputFolderGroup.add("button", undefined, "Select");
//Folder output
var outputFolderGroup = tab1.add("group");
outputFolderGroup.add("statictext", undefined, "Folder Ouput(*)").size = labelSize;
var tab1OutputFolderText = outputFolderGroup.add("edittext", undefined, "", { multiline: false });
tab1OutputFolderText.preferredSize.width = 300;
var outputFolderButton = outputFolderGroup.add("button", undefined, "Select");

//Group Size and margin
var GroupSizeAndMargin = tab1.add("group")
GroupSizeAndMargin.orientation = "row"

var GroupSize = GroupSizeAndMargin.add("group")
GroupSize.orientation = "column";

//input width
var inputWidth = GroupSize.add("group")
inputWidth.add("statictext", undefined, "Input Width:").size = labelSize
var inputWidthText = inputWidth.add("edittext", undefined, 1152, { multiline: false })
inputWidthText.preferredSize.width = 70

//input Height
var inputHeight = GroupSize.add("group")
inputHeight.add("statictext", undefined, "Input Height:").size = labelSize
var inputHeightText = inputHeight.add("edittext", undefined, 1536, { multiline: false })
inputHeightText.preferredSize.width = 70

//Save Format
var formatGroup = tab1.add("group");
formatGroup.add("statictext", undefined, "Save format:").size = labelSize;
var formatDropdown = formatGroup.add("dropdownlist");
formatDropdown.preferredSize.width = 70;
formatDropdown.add("item", "PNGWEB");
formatDropdown.add("item", "PNG");
formatDropdown.add("item", "JPEG");
formatDropdown.add("item", "PDF");
formatDropdown.selection = 0;

var buttonGroup = tab1.add("group");
buttonGroup.alignment = "right";
var cancelButton = buttonGroup.add("button", undefined, "Cancel");

cancelButton.onClick = function () {
    dialog.close();
};

var processButton = buttonGroup.add("button", undefined, "Process");

processButton.onClick = function () {
    var inputFolder = new Folder(tab1InputFolderText.text);
    var outputFolder = new Folder(tab1OutputFolderText.text);
    var widthImages = parseInt(inputWidthText.text);
    var heightImages = parseInt(inputHeightText.text);
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
    processImages1(inputFolder, outputFolder, widthImages, heightImages, formatIndex);
    progressWindow.close();
};

inputFolderButton.onClick = function () {
    var folder = Folder.selectDialog("Select folder input!");
    if (folder != null) {
        tab1InputFolderText.text = folder.fsName;
    }
};

outputFolderButton.onClick = function () {
    var folder = Folder.selectDialog("Select folder output!");
    if (folder != null) {
        tab1OutputFolderText.text = folder.fsName;
    }
};
// dialog.show();

function processImages1(inputFolder, outputFolder, widthImages, heightImages, formatIndex) {
    progressWindow.show(); // Hiển thị cửa sổ tiến trình

    //Processing
    var files = inputFolder.getFiles();
    valueProcessing = 100 / files.length
    for (var i in files) {
        try {
            doc = open(files[i]);
            resizeImage(widthImages, heightImages)
            saveImage(outputFolder, formatIndex, "Pic_" + i, 24)
            resizeImage(300, 400)
            saveImage(outputFolder, formatIndex, "Pic_" + i + "m", 16)
            doc.close(SaveOptions.DONOTSAVECHANGES);
            progressbar1.value = valueProcessing;
            valueProcessing = valueProcessing + 100 / files.length;
        } catch (error) {
            alert(error)
        }

    }
    alert("Done!");
}

// TAB2
// ====
var tab2 = tpanel1.add("tab", undefined, undefined, { name: "Resize" });
tab2.text = "Size Images";
tab2.orientation = "column";
tab2.alignChildren = ["left", "top"];
tab2.spacing = 10;
tab2.margins = 10;


var tap2ProgressWindow = new Window("window", "Progress2"); // Tạo cửa sổ tiến trình
var tap2ProgressText = tap2ProgressWindow.add("statictext", undefined, "Processing2: "); // Thêm văn bản tiến trình
tap2ProgressText.preferredSize.width = 300; // Đặt kích thước thanh tiến trình

// // Tạo một cửa sổ dialog
// var dialog = new Window("dialog", "Lưu ảnh với giới hạn kích thước file");
// dialog.alignChildren = "left";

var labelSize = [160, 20]; // Kích thước chung cho các tiêu đề

// Thêm các ô nhập thông tin
var inputFolderGroup = tab2.add("group");
inputFolderGroup.add("statictext", undefined, "Thư mục đầu vào(*):").size = labelSize;
var inputFolderText = inputFolderGroup.add("edittext", undefined, "", { multiline: false });
inputFolderText.preferredSize.width = 200;
var tab2inputFolderButton = inputFolderGroup.add("button", undefined, "Chọn");

var outputFolderGroup = tab2.add("group");
outputFolderGroup.add("statictext", undefined, "Thư mục đầu ra:").size = labelSize;
var outputFolderText = outputFolderGroup.add("edittext", undefined, "", { multiline: false });
outputFolderText.preferredSize.width = 200;
var outputFolderButton = outputFolderGroup.add("button", undefined, "Chọn");

var maxSizeGroup = tab2.add("group");
maxSizeGroup.add("statictext", undefined, "Kích thước tệp tối đa (KB):").size = labelSize;
var maxSizeText = maxSizeGroup.add("edittext", undefined, "500", { multiline: false });
maxSizeText.preferredSize.width = 100;

var formatGroup = tab2.add("group");
formatGroup.add("statictext", undefined, "Định dạng lưu:").size = labelSize;
var tap2formatDropdown = formatGroup.add("dropdownlist");
tap2formatDropdown.add("item", "JPEG");
tap2formatDropdown.add("item", "PNG");
tap2formatDropdown.selection = 0;

var dpiGroup = tab2.add("group");
dpiGroup.add("statictext", undefined, "Mật độ điểm ảnh (DPI):").size = labelSize;
var dpiText = dpiGroup.add("edittext", undefined, "72", { multiline: false });
dpiText.preferredSize.width = 100;

// // Thêm dòng lưu ý
// var noteText = tab2.add("statictext", undefined, "(*): Để trống nếu muốn lưu file đang làm việc.");
// noteText.size = [300, 30];
// noteText.graphics.foregroundColor = noteText.graphics.newPen(noteText.graphics.PenType.SOLID_COLOR, [1, 0, 0], 1);

var buttonGroup = tab2.add("group");
buttonGroup.alignment = "right";
var cancelButton = buttonGroup.add("button", undefined, "Cancel");

cancelButton.onClick = function () {
    dialog.close();
};

var saveButton = buttonGroup.add("button", undefined, "Save");
saveButton.onClick = function () {
    var inputFolder = new Folder(inputFolderText.text);
    var outputFolder = new Folder(outputFolderText.text);
    var maxSize = parseInt(maxSizeText.text);
    var formatIndex = tap2formatDropdown.selection.index;
    var dpi = parseInt(dpiText.text);

    if (!outputFolder.exists) {
        alert("Vui lòng chọn thư mục thư mục đầu ra hợp lệ!");
        return;
    }

    dialog.close();
    processImages(inputFolder, outputFolder, maxSize, formatIndex, dpi);
    progressWindow.close();
};

tab2inputFolderButton.onClick = function () {
    var folder = Folder.selectDialog("Chọn thư mục đầu vào");
    if (folder != null) {
        inputFolderText.text = folder.fsName;
    }
};

outputFolderButton.onClick = function () {
    var folder = Folder.selectDialog("Chọn thư mục đầu ra");
    if (folder != null) {
        outputFolderText.text = folder.fsName;
    }
};


function processImages(inputFolder, outputFolder, maxSize, formatIndex, dpi) {
    progressWindow.show(); // Hiển thị cửa sổ tiến trình

    if (!inputFolder.exists) {
        // Lưu file đang làm việc hiện tại
        var doc = app.activeDocument;
        if (doc === null) {
            alert("Không có gì để luu!");
            return;
        }

        saveImage2(doc, outputFolder, maxSize, formatIndex, dpi);
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

        // if (file instanceof Folder) {
        //     // // Nếu là thư mục, tạo thư mục tương ứng trong thư mục đầu ra
        //     // var folderName = file.name;
        //     // var outputSubFolder = new Folder(outputFolder + "/" + folderName);
        //     // outputSubFolder.create();

        //     // // Tiếp tục xử lý trong thư mục con
        //     // saveImagesInFolder(file, outputSubFolder, maxSize, formatIndex, dpi);
        // } else {
        // Kiểm tra phần mở rộng của tệp tin
        var extension = file.name.split('.').pop().toLowerCase();
        var fileSize = file.length / 1024; // Dung lượng tệp tin (KB)

        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
            {
                var doc = open(file);
                resizeImage(1080, 1920)
                saveImage2(doc, outputFolder, maxSize, formatIndex, dpi);
                doc.close(SaveOptions.DONOTSAVECHANGES);
            }
        }
        // }
    }
}
function saveImage2(doc, outputFolder, maxSize, formatIndex, dpi) {
    var docName = doc.name.substring(0, doc.name.lastIndexOf("."));
    var width = doc.width;
    var height = doc.height;

    var targetSize = maxSize; // Kích thước tệp tin tối đa
    var minQuality = 0;
    var maxQuality = 12;

    var currentQuality;

    while (minQuality <= maxQuality) {
        currentQuality = Math.floor((minQuality + maxQuality) / 2);
        var saveOptions = getSaveOptions(formatIndex);
        saveOptions.quality = currentQuality;

        var tempFileName = generateRandomString(10) + ".jpg";
        var tempFile = new File(Folder.temp + "/" + tempFileName);
        // doc.exportDocument(tempFile, SaveType.JPEG, saveOptions);
        doc.saveAs(tempFile, saveOptions, true);


        progressText.text = "Ðang luu: " + doc.name.substring(0, 25) + "... (" + currentQuality + ")";
        progressWindow.update();


        while (!tempFile.exists) {
            $.writeln("Saving...");
        }

        var currentSize = tempFile.length / 1024; // Kích thước tệp tin đã lưu (KB)
        tempFile.remove();

        if (currentSize < targetSize) {
            minQuality = currentQuality + 1;
        } else {
            maxQuality = currentQuality - 1;
        }
    }

    if (currentSize > targetSize && currentQuality > 0) { saveOptions.quality = saveOptions.quality - 1; }

    $.writeln("Done: " + doc.name);

    doc.resizeImage(undefined, undefined, dpi, ResampleMethod.NONE);
    //doc.exportDocument(new File(outputFolder + "/" + docName + ".jpg"), SaveType.JPEG, saveOptions);
    var outputFile = new File(outputFolder + "/" + docName + ".jpg");
    doc.saveAs(outputFile, saveOptions, true);
}


function generateRandomString(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Lấy các tùy chọn lưu ảnh dựa trên định dạng
function getSaveOptions(formatIndex) {
    var saveOptions;

    switch (formatIndex) {
        case 0:
            saveOptions = new JPEGSaveOptions();
            break;
        case 1:
            //PNG Options
            saveOptions = new PNGSaveOptions();
            saveOptions.compression = 8;
            saveOptions.interlaced = false;
            break;
        default:
            saveOptions = new JPEGSaveOptions();
            break;
    }

    return saveOptions;
}


// TPANEL1
// =======
tpanel1.selection = tab1;

dialog.show();


function resizeImage(widthImages, heightImages) {
    var MedWidth = UnitValue(widthImages, "px");
    var MedHeight = UnitValue(heightImages, "px");

    var doc = app.activeDocument;
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
}

function saveImage(pathName, typeSaveAs, randomSave, pointColor) {
    // JPG Options;
    // alert(typeof pathName)
    // alert( typeof typeSaveAs)
    // alert(typeof randomSave)

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

    // Save for Web Settings
    // var exportOptions = new ExportOptionsSaveForWeb();
    // exportOptions.format = SaveDocumentType.PNG;
    // exportOptions.PNG8 = false; // Set to false for PNG-24
    // exportOptions.transparency = true;
    // exportOptions.interlaced = false;
    // exportOptions.quality = 30;

    exportOptions = new ExportOptionsSaveForWeb();
    exportOptions.format = SaveDocumentType.PNG;
    exportOptions.PNG8 = true; // Use PNG-8
    exportOptions.transparency = true; // Preserve transparency
    exportOptions.interlaced = false; // No interlacing
    exportOptions.includeProfile = false; // Embed sRGB profile

    // Color Reduction and Dithering Options
    // exportOptions.colorReduction = ColorReductionType.PERCEPTUAL; // Other options: SELECTIVE, ADAPTIVE, etc.
    // exportOptions.dither = DitherType.DIFFUSION; // Other options: NONE, PATTERN, NOISE
    exportOptions.ditherAmount = 100; // Set dither intensity (0–100)
    exportOptions.colors = pointColor; // Number of colors (maximum 256 for PNG-8)

    switch (typeSaveAs.toString()) {
        case "PNG":
            doc.saveAs((new File(pathName + "/" + randomSave + ".png")), pngOptions, true, Extension.LOWERCASE);
            break;

        case "PDF":
            doc.saveAs((new File(pathName + "/" + randomSave + ".pdf")), pdfOptions, true, Extension.LOWERCASE);
            break;

        case "PNGWEB":
            doc.exportDocument((new File(pathName + "/" + randomSave + ".png")), ExportType.SAVEFORWEB, exportOptions);
            break;

        default:
            doc.saveAs((new File(pathName + "/" + randomSave + ".jpg")), jpgSaveOptions, true, Extension.LOWERCASE);
            break;
    }
}
