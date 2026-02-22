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

    //Teplate
    var GroupTemlate = dialog.add("group");
    GroupTemlate.add("statictext", undefined, "Select Header:").size = labelSize

    var inputTemlate = GroupTemlate.add("button", undefined, "Choose ....", { name: "template" });
    inputTemlate.preferredSize.width = 100;

    //Folder Logo
    var GroupLogo = dialog.add("group");
    GroupLogo.add("statictext", undefined, "Folder Logos:").size = labelSize
    var folderLogoText = GroupLogo.add("button", undefined, "Choose....", { name: "Logo" })
    folderLogoText.preferredSize.width = 100;

    //Folder output
    var outputFolderGroup = dialog.add("group");
    outputFolderGroup.add("statictext", undefined, "Folder Output").size = labelSize;
    var outputFolderText = outputFolderGroup.add("edittext", undefined, "", { multiline: false });
    outputFolderText.preferredSize.width = 160;
    var outputFolderButton = outputFolderGroup.add("button", undefined, "Select");

    //Group Size and margin
    var GroupSizeAndMargin = dialog.add("group")
    GroupSizeAndMargin.orientation = "row"

    var GroupSize = GroupSizeAndMargin.add("group")
    GroupSize.orientation = "column";

    //input width
    var inputWidth = GroupSize.add("group")
    inputWidth.add("statictext", undefined, "Input Width:").size = labelSize
    var inputWidthText = inputWidth.add("edittext", undefined, 864, { multiline: false })
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


    //Group background and save
    var GroupBackgroundAndSave = dialog.add("group");
    GroupBackgroundAndSave.orientation = "row";

    //Background
    var GroupBackground = GroupBackgroundAndSave.add("group");
    GroupBackground.add("statictext", undefined, "Input colorBG:").size = labelSize
    var inputBackground = GroupBackground.add("edittext", undefined, "FFFFFF", { multiline: false })
    inputBackground.preferredSize.width = 70

    //Save Format
    var formatGroup = GroupBackgroundAndSave.add("group");
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


    var linkInputFile
    inputTemlate.addEventListener("click", function () {
        var inputFiles = File.openDialog("Please select Template", "Choose File:*.psd;*.csv;*.png;*.tif;*.jpg")
        linkInputFile = inputFiles.fsName
    })
    var linkFolderLogo
    folderLogoText.addEventListener("click", function () {
        var inputFolderLogo = Folder.selectDialog("Select folder Logo!")
        linkFolderLogo = inputFolderLogo.fsName
    })

    outputFolderButton.onClick = function () {
        var folder = Folder.selectDialog("Select folder output!");
        if (folder != null) {
            outputFolderText.text = folder.fsName;
        }
    };

    saveButton.onClick = function () {
        var inputFileTemlate = new Folder(linkInputFile);
        var inputFolderLogo = new Folder(linkFolderLogo);
        var outputFolder = new Folder(outputFolderText.text);
        var widthImages = parseInt(inputWidthText.text);
        var heightImages = parseInt(inputHeightText.text);
        var marginTopBottomImage = parseInt(inputMarginTopBottomText.text);
        var marginLeftRightImage = parseInt(inputMarginLeftRightText.text);
        var colorBackground = inputBackground.text
        var formatIndex = formatDropdown.selection;

        if (!inputFileTemlate.exists) {
            alert("Please select File Header!");
            return;
        }

        if (!inputFolderLogo.exists) {
            alert("Please select folder Logo!");
            return;
        }

        if (!outputFolder.exists) {
            alert("Please select folder Output!");
            return;
        }

        dialog.close();
        processImages(inputFileTemlate, inputFolderLogo, outputFolder, widthImages, heightImages, marginTopBottomImage, marginLeftRightImage, formatIndex, colorBackground);
        progressWindow.close();
    };





    function processImages(inputFileTemlate, inputFolderLogo, outputFolder, widthImages, heightImages, marginTopBottomImage, marginLeftRightImage, formatIndex, colorBackground) {
        progressWindow.show(); // Hiển thị cửa sổ tiến trình

        //Processing
        var files = inputFolderLogo.getFiles();
        valueProcessing =  100/files.length
        for (var i in files) {
            try {
                doc = open(files[i]);
                resizeImage(inputFileTemlate, widthImages, heightImages, marginTopBottomImage, marginLeftRightImage, colorBackground)
                progressbar1.value = valueProcessing;
                saveImage(outputFolder, formatIndex, "Images_" + i)
                doc.close(SaveOptions.DONOTSAVECHANGES);
                valueProcessing = valueProcessing + 100/files.length;
                // break;
            } catch (error) { }

        }
        alert("Done!");
    }

    function resizeImage(inputFileTemlate, widthImages, heightImages, marginTopBottomImage, marginLeftRightImage, colorBackground) {
        var MedWidth = UnitValue(widthImages, "px");
        var MedHeight = UnitValue(heightImages, "px");

        var doc = app.activeDocument;
        doc.activeLayer.isBackgroundLayer = false;
        var radioWidth = doc.width / MedWidth
        var radioHeight = doc.height / MedHeight
        //Kiem tra ty le
        if (radioWidth > radioHeight) {
            doc.resizeImage(MedWidth - 2 * (marginLeftRightImage + 65), null, 72, ResampleMethod.BICUBIC)
            doc.resizeCanvas(null, MedHeight - (2 * marginTopBottomImage + 116), AnchorPosition.MIDDLECENTER)
            doc.resizeCanvas(null, doc.height + marginTopBottomImage, AnchorPosition.TOPCENTER)
            doc.resizeCanvas(MedWidth, doc.height + marginTopBottomImage + 116, AnchorPosition.BOTTOMCENTER)
            var colorRGB = hexToRgb('#' + colorBackground);
            makeSolidColor(colorRGB[0], colorRGB[1], colorRGB[2])
            moveDown()
            replaceContents(inputFileTemlate)
            // moveDown()
            resizeLayer(doc.width - 2 * marginLeftRightImage, 154)
            var left = marginLeftRightImage
            var right = doc.width - marginLeftRightImage
            var top = marginTopBottomImage / 3
            var bottom = marginTopBottomImage + 120
            shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
            doc.selection.select(shapeRef)
            Algn("ADSCentersH") //"ADSCentersV" Doc
            Algn("ADSCentersV") //"ADSCentersV" Ngang
            doc.selection.deselect()
        } else {
            doc.resizeImage(null, MedHeight - (2 * marginTopBottomImage + 116), 72, ResampleMethod.BICUBIC)
            doc.resizeCanvas(null, MedHeight - (2 * marginTopBottomImage + 116), AnchorPosition.MIDDLECENTER)
            doc.resizeCanvas(null, doc.height + marginTopBottomImage, AnchorPosition.TOPCENTER)
            doc.resizeCanvas(MedWidth, doc.height + marginTopBottomImage + 116, AnchorPosition.BOTTOMCENTER)
            var colorRGB = hexToRgb('#' + colorBackground);
            makeSolidColor(colorRGB[0], colorRGB[1], colorRGB[2])
            moveDown()
            replaceContents(inputFileTemlate)
            // moveDown()
            resizeLayer(doc.width - 2 * marginLeftRightImage, 154)
            var left = marginLeftRightImage
            var right = doc.width - marginLeftRightImage
            var top = marginTopBottomImage / 3
            var bottom = marginTopBottomImage + 120
            shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
            doc.selection.select(shapeRef)
            Algn("ADSCentersH") //"ADSCentersV" Doc
            Algn("ADSCentersV") //"ADSCentersV" Ngang
            doc.selection.deselect()
        }
    }
    dialog.show();
})();

function saveImage(pathName, typeSaveAs, randomSave) {
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

//Resize layer
function resizeLayer(width, height) {
    WIDTH = width;
    HEIGHT = height;
    bounds = activeDocument.activeLayer.bounds;
    layerWidth = bounds[2].as('px') - bounds[0].as('px');
    layerHeight = bounds[3].as('px') - bounds[1].as('px');
    layerRatio = layerWidth / layerHeight;
    newWidth = WIDTH;
    newHeight = ((1.0 * WIDTH) / layerRatio);
    if (newHeight >= HEIGHT) {
        newWidth = layerRatio * HEIGHT;
        newHeight = HEIGHT;
    }
    resizePercent = newWidth / layerWidth * 100;
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.BOTTOMLEFT);
}

function makeSelection(left, right, top, bottom) {
    result = false
    try {
        //leftTop, leftBottom, rightBottom rightTop
        shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
        doc.selection.select(shapeRef)
        result = true
    } catch (error) {
    }
    return result
}


// Place
function replaceContents(newFile) {
    cTID = function (s) {
        return app.charIDToTypeID(s);
    };
    sTID = function (s) {
        return app.stringIDToTypeID(s);
    };
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

function moveDown() {
    var c2t = function (s) {
        return app.charIDToTypeID(s)
    }

    var s2t = function (s) {
        return app.stringIDToTypeID(s)
    }

    var descriptor = new ActionDescriptor()
    var reference = new ActionReference()
    var reference2 = new ActionReference()

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"))
    descriptor.putReference(c2t("null"), reference)
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("previous"))
    descriptor.putReference(s2t("to"), reference2)
    executeAction(s2t("move"), descriptor, DialogModes.NO)
}

//Create new layer
function createNewLayer(layername) {
    if (layername == undefined) layername = "Layer";

    // create new layer at top of layers
    var originalLayer = app.activeDocument.activeLayer;
    var layerRef = app.activeDocument.artLayers.add();

    activeDocument.artLayers.add("abc").moveAfter(doc.activeLayer)
    // name it & set blend mode to normal
    layerRef.name = layername;
    layerRef.blendMode = BlendMode.NORMAL;

    // Move the layer belowm
    // layerRef.moveAfter(originalLayer);

    // Move the layer above if you desire
    layerRef.moveBefore(originalLayer);
}

function makeSolidColor(red, Grn, blue) {
    var c2t = function (s) {
        return app.charIDToTypeID(s)
    }

    var s2t = function (s) {
        return app.stringIDToTypeID(s)
    }

    var descriptor = new ActionDescriptor()
    var descriptor2 = new ActionDescriptor()
    var descriptor3 = new ActionDescriptor()
    var descriptor4 = new ActionDescriptor()
    var reference = new ActionReference()

    reference.putClass(s2t("contentLayer"))
    descriptor.putReference(c2t("null"), reference)
    descriptor4.putDouble(s2t("red"), red)
    descriptor4.putDouble(c2t("Grn "), Grn)
    descriptor4.putDouble(s2t("blue"), blue)
    descriptor3.putObject(s2t("color"), s2t("RGBColor"), descriptor4)
    descriptor2.putObject(s2t("type"), s2t("solidColorLayer"), descriptor3)
    descriptor.putObject(s2t("using"), s2t("contentLayer"), descriptor2)
    executeAction(s2t("make"), descriptor, DialogModes.NO)
}

// Convert hex to rgb
function hexToRgb(hex) {
    return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}
