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
    GroupImages.add("statictext", undefined, "Folder Logo:").size = labelSize
    var folderImagesText = GroupImages.add("button", undefined, "Choose....", { name: "Logo" })
    folderImagesText.preferredSize.width = 100;

    //Folder output
    var outputFolderGroup = dialog.add("group");
    outputFolderGroup.add("statictext", undefined, "Folder Output").size = labelSize;
    var outputFolderText = outputFolderGroup.add("edittext", undefined, "", { multiline: false });
    outputFolderText.preferredSize.width = 160;
    var outputFolderButton = outputFolderGroup.add("button", undefined, "Select");


    //Group background and save
    var GroupBackgroundAndSave = dialog.add("group");
    GroupBackgroundAndSave.orientation = "row";

    //Save Format
    var formatGroup = GroupBackgroundAndSave.add("group");
    formatGroup.add("statictext", undefined, "Save format:").size = labelSize;
    var formatDropdown = formatGroup.add("dropdownlist");
    formatDropdown.preferredSize.width = 70;
    formatDropdown.add("item", "PSD");
    formatDropdown.add("item", "PNG");
    formatDropdown.add("item", "JPEG");
    formatDropdown.add("item", "PDF");
    formatDropdown.selection = 0;

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
        var inputFiles = Folder.selectDialog("Select folder Images!")
        linkInputFile = inputFiles.fsName;
    })

    //button select folder images
    var linkFolderImages;
    folderImagesText.addEventListener("click", function () {
        var inputFolderImages = File.openDialog("Please select Logo", "Choose File:*.png;*.jpg")
        linkFolderImages = inputFolderImages.fsName;
    })

    //Event button folder output
    outputFolderButton.onClick = function () {
        var folder = Folder.selectDialog("Select folder output!");
        if (folder != null) {
            outputFolderText.text = folder.fsName;
        }
    };
    //validate form
    saveButton.onClick = function () {
        var template = new Folder(linkInputFile);
        var images = new File(linkFolderImages)
        var output = new Folder(outputFolderText.text);
        var formatIndex = formatDropdown.selection;


        if (!template.exists) {
            alert("Please select template!");
            return;
        }

        if (!images.exists) {
            alert("Please select folder Input Images!");
            return;
        }

        if (!output.exists) {
            alert("Please select folder Output!");
            return;
        }

        dialog.close();
        processImages(template, images, output, formatIndex);
        progressWindow.close();
    };

    //Processing
    function processImages(template, images, output, formatIndex) {
        progressWindow.show(); // Hiển thị cửa sổ tiến trình
        //Processing
        var files = template.getFiles();
        valueProcessing = 100 / files.length
        for (var i in files) {
            try {
                doc = open(files[i]);
                // resizeImages(1179, 2080);
                var layers = doc.layers;

                for (var i = 0; i < layers.length; i++) {
                    var layerA = layers[i];
                    doc.activeLayer = layerA;
                    // Kiểm tra nếu layer là loại text
                    if (layerA.kind == LayerKind.TEXT) {
                        var textLayer = doc.activeLayer;
                        var fontName = textLayer.textItem.font;
                        var newFont = fontName;
                        break;
                    }
                }
                changeColorText();
                textLayer.textItem.font = newFont;
                activeDocument.selection.selectAll();
                Algn("ADSCentersH");//"ADSCentersV" 
                Algn("ADSCentersV");//"ADSCentersV" 
                activeDocument.selection.deselect();
                resizeImages(1179, 2080);
                resizeImageLayer(1050, 2080);
                activeDocument.activeLayer.translate(0, 100);
                set(416.666667, true, true, true, 0, 0, 0, 75, true, 90, 5, 20, 10, 0, false, "Linear", true, true, true, true, 255, 255, 255, 75, 0, 0, 0, 75, true, 90, 30, 10, 31, "Linear", false, 0, false, false);
                //chen logo
                replaceContents(images);
                resizeImageLayer(139, 191);
                activeDocument.selection.selectAll()
                Algn("ADSCentersH");//"ADSCentersV" 
                Algn("ADSTop");//"ADSCentersV" 
                activeDocument.selection.deselect();
                activeDocument.activeLayer.translate(0, 400)
                set(416.666667, true, true, true, 0, 0, 0, 75, true, 90, 5, 20, 10, 0, false, "Linear", true, true, true, true, 255, 255, 255, 75, 0, 0, 0, 75, true, 90, 30, 10, 31, "Linear", false, 0, false, false);
                makeSolidColor(19, 0, 51);
                doc.activeLayer.opacity = 45;
                moveBack(); moveBack();
                //check background
                activeDocument.activeLayer = layers[layers.length - 1];
                activeDocument.selection.selectAll()
                Algn("ADSCentersH");//"ADSCentersV" 
                Algn("ADSCentersV");//"ADSCentersV" 
                activeDocument.selection.deselect();
                resizeImageLayer2(1179, 2080);
                saveImage(output, formatIndex, activeDocument.name.split(".")[0]);
                doc.close(SaveOptions.DONOTSAVECHANGES);
                progressbar1.value = valueProcessing;
                valueProcessing = valueProcessing + 100 / files.length;
            } catch (error) {
                alert(error)
            }
        }
        alert("Done!");
    }
    dialog.show();
})();

//Save file
function saveImage(pathName, typeSaveAs, randomSave) {
    var doc = app.activeDocument;
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

    //PSD
    var psdOptions = new PhotoshopSaveOptions();
    psdOptions.layers = true;
    psdOptions.embedColorProfile = true;
    psdOptions.annotations = true;
    psdOptions.alphaChannels = true;

    switch (typeSaveAs.toString()) {
        case "PNG":
            doc.saveAs((new File(pathName + "/" + randomSave + ".png")), pngOptions, true, Extension.LOWERCASE);
            break;

        case "PDF":
            doc.saveAs((new File(pathName + "/" + randomSave + ".pdf")), pdfOptions, true, Extension.LOWERCASE);
            break;
        case "PSD":
            doc.saveAs((new File(pathName + "/" + randomSave + ".pdf")), psdOptions, true, Extension.LOWERCASE);
            break;
        default:
            doc.saveAs((new File(pathName + "/" + randomSave + ".jpg")), jpgSaveOptions, true, Extension.LOWERCASE);
            break;
    }
}


/// change text
function changeColorText() {
    var doc = app.activeDocument;
    var layer = doc.activeLayer;
    var textItem = layer.textItem;
    var content = textItem.contents;

    // Tách dòng
    var lines = content.split('\r');
    if (lines.length < 2) {
        alert("Not 2 Line.");
        return;
    }

    var startIndex = lines[0].length + 1;
    var endIndex = startIndex + lines[1].length;

    // Lấy style gốc đoạn text dòng 2 (để lấy size)
    var originalStyle = getTextStyleRange(layer, startIndex, endIndex);
    var originalSize = 12; // default size nếu không lấy được
    try {
        originalSize = originalStyle.getUnitDoubleValue(charIDToTypeID("Sz  "));
    } catch (e) {
        // fallback
        originalSize = textItem.size.as("pt");
    }

    var idsetd = charIDToTypeID("setd");
    var desc1 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref1 = new ActionReference();
    var idTxLr = charIDToTypeID("TxLr");
    ref1.putEnumerated(idTxLr, charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    desc1.putReference(idnull, ref1);

    var idT = charIDToTypeID("T   ");
    var desc2 = new ActionDescriptor();
    var idTxtt = charIDToTypeID("Txtt");
    var list1 = new ActionList();
    var desc3 = new ActionDescriptor();

    desc3.putInteger(charIDToTypeID("From"), startIndex);
    desc3.putInteger(charIDToTypeID("T   "), endIndex);

    var idTxtS = charIDToTypeID("TxtS");
    var desc4 = new ActionDescriptor();

    // Thiết lập màu mới (VD: xanh ngọc)
    var color = new ActionDescriptor();
    color.putDouble(charIDToTypeID("Rd  "), 0);
    color.putDouble(charIDToTypeID("Grn "), 214);
    color.putDouble(charIDToTypeID("Bl  "), 171);
    desc4.putObject(charIDToTypeID("Clr "), charIDToTypeID("RGBC"), color);

    // Giữ nguyên size font gốc
    desc4.putUnitDouble(charIDToTypeID("Sz  "), charIDToTypeID("#Pnt"), originalSize);

    desc3.putObject(idTxtS, idTxtS, desc4);
    list1.putObject(charIDToTypeID("Txtt"), desc3);
    desc2.putList(idTxtt, list1);

    desc1.putObject(idT, idTxLr, desc2);
    executeAction(idsetd, desc1, DialogModes.NO);

    // alert("Đã đổi màu dòng 2 và giữ nguyên size font!");

    // Hàm lấy style đoạn text từ vị trí start đến end
    function getTextStyleRange(layer, start, end) {
        var ref = new ActionReference();
        ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("textKey"));
        ref.putIdentifier(charIDToTypeID("Lyr "), layer.id);
        var desc = executeActionGet(ref);
        var textKey = desc.getObjectValue(stringIDToTypeID("textKey"));
        var styleList = textKey.getList(stringIDToTypeID("textStyleRange"));

        for (var i = 0; i < styleList.count; i++) {
            var styleRange = styleList.getObjectValue(i);
            var from = styleRange.getInteger(charIDToTypeID("From"));
            var to = styleRange.getInteger(charIDToTypeID("T   "));
            if (from <= start && to >= end) {
                return styleRange.getObjectValue(charIDToTypeID("TxtS"));
            }
        }
        return new ActionDescriptor();
    }
    var textLayer = doc.activeLayer;
    // Kích thước font mới (đơn vị: point)
    var newFontSize = 52.52;
    textLayer.textItem.size = newFontSize;
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

function resizeImages(finalWidth, finalHeight) {
    var docRef = activeDocument
    //Resize image according to shape
    var actualWidth = docRef.width;
    var actualHeight = docRef.height;
    var imgHeight = finalHeight;
    var imgWidth = actualWidth * imgHeight / actualHeight;
    if (imgWidth > finalHeight) {
        imgWidth = finalHeight;
        imgHeight = actualHeight * imgWidth / actualWidth;
    }
    docRef.resizeImage(imgWidth, imgHeight);
    docRef.resizeCanvas(finalWidth, finalHeight, AnchorPosition.MIDDLECENTER);
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

function moveBack() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("previous"));
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("move"), descriptor, DialogModes.NO);
}

function resizeImageLayer2(width, height) {
    var WIDTH = width;
    var HEIGHT = height;
    var bounds = activeDocument.activeLayer.bounds;
    var layerWidth = bounds[2].as('px') - bounds[0].as('px');
    var layerHeight = bounds[3].as('px') - bounds[1].as('px');
    var layerRatio = layerWidth / layerHeight;
    var newWidth = WIDTH;
    var newHeight = ((1.0 * WIDTH) / layerRatio);
    if (newHeight <= HEIGHT) {
        newWidth = layerRatio * HEIGHT;
        newHeight = HEIGHT;
    }
    var resizePercent = newWidth / layerWidth * 100;
    app.activeDocument.activeLayer.resize(null, resizePercent, AnchorPosition.MIDDLECENTER);
}

function set(scale, enabled, present, showInDialog, red, Grn, blue, opacity, useGlobalAngle, localLightingAngle, distance, chokeMatte, blur, noise, AntA, name2, layerConceals, enabled2, present2, showInDialog2, red2, Grn2, blue2, highlightOpacity, red3, Grn3, blue3, shadowOpacity, useGlobalAngle2, localLightingAngle2, localLightingAltitude, strengthRatio, blur2, name3, antialiasGloss, softness, useShape, useTexture) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var descriptor4 = new ActionDescriptor();
    var descriptor5 = new ActionDescriptor();
    var descriptor6 = new ActionDescriptor();
    var descriptor7 = new ActionDescriptor();
    var descriptor8 = new ActionDescriptor();
    var descriptor9 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putProperty(s2t("property"), s2t("layerEffects"));
    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putUnitDouble(s2t("scale"), s2t("percentUnit"), scale);
    descriptor3.putBoolean(s2t("enabled"), enabled);
    descriptor3.putBoolean(s2t("present"), present);
    descriptor3.putBoolean(s2t("showInDialog"), showInDialog);
    descriptor3.putEnumerated(s2t("mode"), s2t("blendMode"), s2t("multiply"));
    descriptor4.putDouble(s2t("red"), red);
    descriptor4.putDouble(c2t("Grn "), Grn);
    descriptor4.putDouble(s2t("blue"), blue);
    descriptor3.putObject(s2t("color"), s2t("RGBColor"), descriptor4);
    descriptor3.putUnitDouble(s2t("opacity"), s2t("percentUnit"), opacity);
    descriptor3.putBoolean(s2t("useGlobalAngle"), useGlobalAngle);
    descriptor3.putUnitDouble(s2t("localLightingAngle"), s2t("angleUnit"), localLightingAngle);
    descriptor3.putUnitDouble(s2t("distance"), s2t("pixelsUnit"), distance);
    descriptor3.putUnitDouble(s2t("chokeMatte"), s2t("pixelsUnit"), chokeMatte);
    descriptor3.putUnitDouble(s2t("blur"), s2t("pixelsUnit"), blur);
    descriptor3.putUnitDouble(s2t("noise"), s2t("percentUnit"), noise);
    descriptor3.putBoolean(c2t("AntA"), AntA);
    descriptor5.putString(s2t("name"), name2);
    descriptor3.putObject(c2t("TrnS"), c2t("ShpC"), descriptor5);
    descriptor3.putBoolean(s2t("layerConceals"), layerConceals);
    descriptor2.putObject(s2t("dropShadow"), s2t("dropShadow"), descriptor3);
    descriptor6.putBoolean(s2t("enabled"), enabled2);
    descriptor6.putBoolean(s2t("present"), present2);
    descriptor6.putBoolean(s2t("showInDialog"), showInDialog2);
    descriptor6.putEnumerated(s2t("highlightMode"), s2t("blendMode"), s2t("overlay"));
    descriptor7.putDouble(s2t("red"), red2);
    descriptor7.putDouble(c2t("Grn "), Grn2);
    descriptor7.putDouble(s2t("blue"), blue2);
    descriptor6.putObject(s2t("highlightColor"), s2t("RGBColor"), descriptor7);
    descriptor6.putUnitDouble(s2t("highlightOpacity"), s2t("percentUnit"), highlightOpacity);
    descriptor6.putEnumerated(s2t("shadowMode"), s2t("blendMode"), s2t("normal"));
    descriptor8.putDouble(s2t("red"), red3);
    descriptor8.putDouble(c2t("Grn "), Grn3);
    descriptor8.putDouble(s2t("blue"), blue3);
    descriptor6.putObject(s2t("shadowColor"), s2t("RGBColor"), descriptor8);
    descriptor6.putUnitDouble(s2t("shadowOpacity"), s2t("percentUnit"), shadowOpacity);
    descriptor6.putEnumerated(s2t("bevelTechnique"), s2t("bevelTechnique"), s2t("softMatte"));
    descriptor6.putEnumerated(s2t("bevelStyle"), s2t("bevelEmbossStyle"), s2t("innerBevel"));
    descriptor6.putBoolean(s2t("useGlobalAngle"), useGlobalAngle2);
    descriptor6.putUnitDouble(s2t("localLightingAngle"), s2t("angleUnit"), localLightingAngle2);
    descriptor6.putUnitDouble(s2t("localLightingAltitude"), s2t("angleUnit"), localLightingAltitude);
    descriptor6.putUnitDouble(s2t("strengthRatio"), s2t("percentUnit"), strengthRatio);
    descriptor6.putUnitDouble(s2t("blur"), s2t("pixelsUnit"), blur2);
    descriptor6.putEnumerated(s2t("bevelDirection"), s2t("bevelEmbossStampStyle"), c2t("In  "));
    descriptor9.putString(s2t("name"), name3);
    descriptor6.putObject(c2t("TrnS"), c2t("ShpC"), descriptor9);
    descriptor6.putBoolean(s2t("antialiasGloss"), antialiasGloss);
    descriptor6.putUnitDouble(s2t("softness"), s2t("pixelsUnit"), softness);
    descriptor6.putBoolean(s2t("useShape"), useShape);
    descriptor6.putBoolean(s2t("useTexture"), useTexture);
    descriptor2.putObject(s2t("bevelEmboss"), s2t("bevelEmboss"), descriptor6);
    descriptor.putObject(s2t("to"), s2t("layerEffects"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}