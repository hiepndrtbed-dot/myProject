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


    //Select file XLSX
    var GroupFileXLSX = dialog.add("group");
    GroupFileXLSX.add("statictext", undefined, "Select CSV").size = labelSize

    var inputXLSX = GroupFileXLSX.add("button", undefined, "Choose ....", { name: "XLSX" });
    inputXLSX.preferredSize.width = 100;


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
    formatGroup.add("statictext", undefined, "Save format:");
    var formatDropdown = formatGroup.add("dropdownlist");
    formatDropdown.preferredSize.width = 70;
    formatDropdown.add("item", "JPEG");
    formatDropdown.add("item", "PNG");
    formatDropdown.add("item", "PDF");
    formatDropdown.selection = 0;

    //quality
    formatGroup.add("statictext", undefined, "Quality:")
    var inputQuality = formatGroup.add("edittext", undefined, 12, { multiline: false });

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
    //button read files xlsx
    var linkInputXLSX;
    inputXLSX.addEventListener("click", function () {
        var inputFilesXLSX = File.openDialog("Please select Template", "Choose File:*.csv")
        linkInputXLSX = inputFilesXLSX.fsName;
    })
    //button select folder images
    var linkFolderImages;
    folderImagesText.addEventListener("click", function () {
        var inputFolderImages = Folder.selectDialog("Select folder Images!")
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
        var xlsx = new File(linkInputXLSX);
        var template = new File(linkInputFile);
        var images = new Folder(linkFolderImages)
        var output = new Folder(outputFolderText.text);
        var formatIndex = formatDropdown.selection;
        var quality = inputQuality.text
        alert(template)
        if (!xlsx.exists) {
            alert("Please select File CSV!");
            return;
        }

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
        processImages(xlsx, template, images, output, formatIndex, quality);
        progressWindow.close();
    };

    //Processing
    function processImages(xlsx, template, images, output, formatIndex, quality) {
        progressWindow.show(); //Show progress

        //Processing CSV
        var dataFiles = [];
        if (xlsx.exists) {
            xlsx.open('r');
            var lineXLSX = xlsx.readln()
            do {
                lineXLSX = xlsx.readln();
                var fields = [];
                var field = '';
                var insideQuotes = false;
                // alert(lineXLSX.length)
                // Lặp qua từng ký tự trong dòng
                for (var i = 0; i < lineXLSX.length; i++) {
                    var charCSV = lineXLSX[i]; // Sửa ở đây
                    // Kiểm tra nếu ký tự là dấu ngoặc kép
                    if (charCSV === '"') {
                        // Đảo ngược trạng thái của insideQuotes
                        // alert("TrongNK")
                        insideQuotes = !insideQuotes;
                    } else if (charCSV === ',' && !insideQuotes) {
                        // Nếu gặp dấu phẩy và không ở trong ngoặc kép, đưa trường dữ liệu vào mảng fields
                        fields.push(field.toString().replace(/^\s+|\s+$/gm, ''));
                        field = ''; // Reset trường dữ liệu
                    }
                    else {
                        // Nếu không phải là dấu phẩy, thêm ký tự vào trường dữ liệu
                        field += charCSV;
                    }
                }
                ///Them mang cot cuoi cung
                fields.push(field.toString().replace(/^\s+|\s+$/gm, ''));
                dataFiles.push(fields)
            } while (lineXLSX != "");
        }
        // alert(dataFiles.length)

        //Processing data from CSV
        valueProcessing = 100 / dataFiles.length
        for (var i = 0; i < dataFiles.length; i++) {
            //Open template
            app.open(template)
            var doc = activeDocument;
            //Check name layer with title csv
            //Kiem tra thong tin dau vao
            var nameBackground = dataFiles[i][0]
            var curentLayer = nameBackground.split(",")[0]

            //with curent layer same: Black Gold
            doc.activeLayer = doc.artLayers["Background"]
            replaceContents(images + "/" + nameBackground);
            doc.selection.selectAll()
            Algn("ADSCentersH");//"ADSCentersV" 
            Algn("ADSBottoms");//"ADSCentersV" 
            doc.selection.deselect()
            // alert(dataFiles[i].length)
            //Position number and name
            if (curentLayer == "Black Gold") {
                var xName = 2
                var xNumber = 1
            }
            if (curentLayer == "Cream") {
                var xName = 4
                var xNumber = 3
            }
            if (curentLayer == "Red") {
                var xName = 6
                var xNumber = 5
            }

            if (curentLayer == "White") {
                var xName = 8
                var xNumber = 7
            }
            if (curentLayer == "White Gold") {
                var xName = 10
                var xNumber = 9
            }

            //Visible group other
            for (var j = 0; j < doc.layerSets["Name & Number"].layerSets.length; j++) {
                if (doc.layerSets["Name & Number"].layerSets[j].name.substr(7) != curentLayer) {
                    doc.layerSets["Name & Number"].layerSets[j].visible = false;
                }
            }
            //Processing
            //Add text name
            doc.layerSets["Name & Number"].layerSets["number " + curentLayer].layerSets[0].artLayers[0].visible = true;
            var addName = doc.layerSets["Name & Number"].layerSets["number " + curentLayer].layerSets[0].artLayers[0].textItem;
            addName.contents = dataFiles[i][xName];

            //Add text number
            doc.layerSets["Name & Number"].layerSets["number " + curentLayer].layerSets[0].artLayers[1].visible = true;
            var addNumber = doc.layerSets["Name & Number"].layerSets["number " + curentLayer].layerSets[0].artLayers[1].textItem;
            addNumber.contents = dataFiles[i][xNumber];

            progressbar1.value = valueProcessing;
            saveImage(output, formatIndex, nameBackground.split(".")[0], quality);
            selectHistory(doc.name)
            valueProcessing = valueProcessing + 100 / dataFiles.length;

        }//End for
        activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        alert("Done!")
    }

    dialog.show();
})();

//Save file
function saveImage(pathName, typeSaveAs, randomSave, quality) {
    var doc = app.activeDocument;
    // JPG Options;
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.embedColorProfile = true;
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgSaveOptions.matte = MatteType.NONE;
    jpgSaveOptions.quality = quality;
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

function selectHistory(params) {
    var idslct = charIDToTypeID("slct");
    var desc2745 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref662 = new ActionReference();
    var idSnpS = charIDToTypeID("SnpS");
    ref662.putName(idSnpS, params);
    desc2745.putReference(idnull, ref662);
    executeAction(idslct, desc2745, DialogModes.NO);
}

function resizeImage(width, height) {
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

