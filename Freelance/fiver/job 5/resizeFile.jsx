#target photoshop;

preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS;

(function () {
    var progressWindow = new Window("window", "Progress"); // Tạo cửa sổ tiến trình
    progressWindow.orientation = "row";

    var progressText = progressWindow.add("statictext", undefined, "Processing: "); // Thêm văn bản tiến trình
    // progressText.preferredSize.width = ; // Đặt kích thước thanh tiến trình

    var progressbar1 = progressWindow.add("progressbar", undefined, undefined, { name: "progressbar1" });
    progressbar1.maxvalue = 100;
    progressbar1.value = 0;
    progressbar1.preferredSize.width = 160;
    progressbar1.preferredSize.height = 10;

    // Tạo một cửa sổ dialog
    var dialog = new Window("dialog", "Auto Arrange Iamges");
    dialog.alignChildren = "left";
    dialog.orientation = "column";

    var labelSize = [80, 20]; // Kích thước chung cho các tiêu đề

    // Thêm các ô nhập thông tin

    //Template
    var GroupTemplate = dialog.add("group");
    GroupTemplate.add("statictext", undefined, "Select Template:").size = labelSize

    var inputTemplate = GroupTemplate.add("button", undefined, "Choose ....", { name: "template" });
    inputTemplate.preferredSize.width = 100;


    //Folder images
    var GroupImages = dialog.add("group");
    GroupImages.add("statictext", undefined, "Folder Images:").size = labelSize
    var folderImagesText = GroupImages.add("button", undefined, "Choose....", { name: "Images" })
    folderImagesText.preferredSize.width = 100;

    //Group background and save
    var GroupBackgroundAndSave = dialog.add("group");
    GroupBackgroundAndSave.orientation = "row";

    //Save Format
    var formatGroup = GroupBackgroundAndSave.add("group");
    formatGroup.add("statictext", undefined, "Save format:");
    var formatDropdown = formatGroup.add("dropdownlist");
    formatDropdown.preferredSize.width = 70;
    formatDropdown.add("item", "JPEG");
    formatDropdown.add("item", "PNG");
    formatDropdown.add("item", "PDF");
    formatDropdown.selection = 2;


    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = "right";
    //buttom cancel
    var cancelButton = buttonGroup.add("button", undefined, "Cancel");

    cancelButton.onClick = function () {
        dialog.close();
    };
    //button Process
    var saveButton = buttonGroup.add("button", undefined, "Process");

    //Processing event
    //Button template
    var linkInputFile;
    inputTemplate.addEventListener("click", function () {
        var inputFiles = File.openDialog("Please select Template", "Choose File:*.psd")
        linkInputFile = inputFiles.fsName;
    })

    //button select folder images
    var linkFolderImages;
    folderImagesText.addEventListener("click", function () {
        var inputFolderImages = Folder.selectDialog("Select folder Images!")
        linkFolderImages = inputFolderImages.fsName;
    })


    //validate form
    saveButton.onClick = function () {
        var template = new File(linkInputFile);
        var inputFolder = new Folder(linkFolderImages)
        var formatIndex = formatDropdown.selection;

        if (!template.exists) {
            alert("Please select template!");
            return;
        }

        if (!inputFolder.exists) {
            alert("Please select folder Input Images!");
            return;
        }

        //Create folder output.
        var outputFolder = new Folder(inputFolder + "/output");
        if (!outputFolder.exists) {
            outputFolder.create();
        }
        dialog.close();
        processImages(template, inputFolder, outputFolder, formatIndex);
        progressWindow.close();
    };

    //Processing
    function processImages(template, inputFolder, outputFolder, formatIndex) {
        progressWindow.show(); // Hiển thị cửa sổ tiến trình
        //Processing
        var files = inputFolder.getFiles();
        valueProcessing = 100 / files.length
        for (var i in files) {
            // alert(flag)

            // Get the file extension
            var fileExtension = files[i].name.split('.').pop().toLowerCase();

            // Only process PNG and JPG files
            if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
                app.open(template)

                // Reset unit to Pixels
                preferences.rulerUnits = Units.PIXELS;
                app.preferences.typeunits = TypeUnits.PIXELS;
                var doc = activeDocument;

                // Processing
                doc.artLayers["REMOVE"].visible = false;
                doc.artLayers["RED GRID"].visible = true;
                // alert(files[i].name.split(".")[0])
                // alert(files[i].name)

                doc.activeLayer = doc.artLayers["Background"]
                replaceContents(inputFolder + "/" + files[i].name);
                doc.selection.selectAll()
                Algn("ADSCentersH");//"ADSCentersV" 
                Algn("ADSCentersV");//"ADSCentersV" 
                doc.selection.deselect()
                resizeImageLayer(2270, 2270);
                doc.activeLayer.name = "Top";
                action("CpTL");
                doc.activeLayer.name = "Bottom";
                action("CpTL");
                doc.activeLayer.name = "Left";
                action("CpTL");
                doc.activeLayer.name = "Right";
                action("CpTL");
                doc.activeLayer.name = "Center";

                //Translate
                doc.activeLayer = doc.artLayers["Top"];
                doc.activeLayer.translate(0, -22)
                doc.activeLayer = doc.artLayers["Bottom"];
                doc.activeLayer.translate(0, 22)
                doc.activeLayer = doc.artLayers["Left"];
                doc.activeLayer.translate(-22, 0)
                doc.activeLayer = doc.artLayers["Right"];
                doc.activeLayer.translate(22, 0)

                progressbar1.value = valueProcessing;
                saveImage(outputFolder, formatIndex, files[i].name.split(".")[0]);
                valueProcessing = valueProcessing + 100 / files.length;
                doc.close(SaveOptions.DONOTSAVECHANGES);
                // break
            }
        }
        alert("Done!");

    }
    dialog.show();

})();

//Save file
function saveImage(pathName, typeSaveAs, randomSave) {
    var dog = app.activeDocument;
    // JPG Options;
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.embedColorProfile = true;
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgSaveOptions.matte = MatteType.NONE;
    jpgSaveOptions.quality = 12;
    
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
    switch (typeSaveAs.toString()) {
        case "PNG":
            dog.saveAs((new File(pathName + "/" + randomSave + ".png")), pngOptions, true, Extension.LOWERCASE);
            break;

        case "PDF":
            dog.saveAs((new File(pathName + "/" + randomSave + ".pdf")), pdfOptions, true, Extension.LOWERCASE);
            break;
        default:
            dog.saveAs((new File(pathName + "/" + randomSave + ".jpg")), jpgSaveOptions, true, Extension.LOWERCASE);
            break;
    }
}


function action(action) {
    var idCpTL = charIDToTypeID(action);
    executeAction(idCpTL, undefined, DialogModes.NO);
}

// Place
function replaceContents(newFile) {
    cTID = function (s) { return app.charIDToTypeID(s); };
    sTID = function (s) { return app.stringIDToTypeID(s); };
    var desc1 = new ActionDescriptor();
    desc1.putInteger(cTID('Idnt'), 3);
    desc1.putPath(cTID('null'), new File(newFile));
    desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSAverage"));
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
    desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 0);
    desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
    executeAction(cTID('Plc '), desc1, DialogModes.NO);
}

// Algn("ADSCentersH"); //"ADSCentersV"
function Algn(algn) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putEnumerated(s2t("using"), s2t("alignDistributeSelector"), s2t(algn));
    descriptor.putBoolean(s2t("alignToCanvas"), false);
    executeAction(c2t("Algn"), descriptor, DialogModes.NO);
}

function resizeImageLayer(width, height) {
    var WIDTH = width;
    var HEIGHT = height;
    var bounds = activeDocument.activeLayer.bounds;
    var layerWidth = bounds[2].as('px') - bounds[0].as('px');
    var layerHeight = bounds[3].as('px') - bounds[1].as('px');
    var layerRatio = layerWidth / layerHeight;
    var newWidth = WIDTH;
    var newHeight = ((1.0 * WIDTH) / layerRatio);
    if (newHeight >= HEIGHT) {
        newWidth = layerRatio * HEIGHT;
        newHeight = HEIGHT;
    }
    var resizePercent = newWidth / layerWidth * 100;
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);
}
