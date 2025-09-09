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
    GroupFileXLSX.add("statictext", undefined, "Select XLSX").size = labelSize

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
    formatGroup.add("statictext", undefined, "Save format:").size = labelSize;
    var formatDropdown = formatGroup.add("dropdownlist");
    formatDropdown.preferredSize.width = 70;
    formatDropdown.add("item", "JPEG");
    formatDropdown.add("item", "PNG");
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

        if (!xlsx.exists) {
            alert("Please select File xlsx!");
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
        processImages(xlsx, template, images, output, formatIndex);
        progressWindow.close();
    };

    //Processing
    function processImages(xlsx, template, images, output, formatIndex) {
        progressWindow.show(); //Show progress

        //Processing CSV
        var dataFiles = [];
        if (xlsx.exists) {
            xlsx.open('r');
            // var lineXLSX = xlsx.readln()
            do {
                lineXLSX = xlsx.readln().split(",")
                dataFiles.push(lineXLSX)
            } while (lineXLSX != "");
        }
        // alert(dataFiles.length)

        //Processing data from CSV
        valueProcessing = 100 / dataFiles.length
        for (var i = 0; i < dataFiles.length - 1; i++) {
            //Open template
            app.open(template)
            var doc = activeDocument;
            //  ,Salutation ,Name                       ,image 1        ,image 2        ,image 3
            // 1,Mr         ,Antdsfas sdfsaf asaf 1     ,3.png          ,7.png          ,1.png
            // 2,Mrs        ,Nalsdfsaf sa1              ,4.png          ,3.png          ,6.png
            // 3,Miss       ,Bala2                      ,2.png          ,4.png          ,7.png
            // 4,Mr         ,fsdfsdf4                   ,1.png          ,2.png          ,3.png

            //Check name layer with title csv
            if (i == 0) {
                //Check struck layer files PSD
                var saveKeyDataFile = new Array();
                for (var j = 0; j < dataFiles[i].length; j++) {
                    // alert(dataFiles[i][j])
                    for (var k = 0; k < doc.artLayers.length; k++) {
                        // alert(doc.artLayers[k].name)
                        //If name title csv same name layer
                        if (dataFiles[i][j].toString().replace(/^\s+|\s+$/gm, '') == doc.artLayers[k].name.toString().replace(/^\s+|\s+$/gm, '')) {
                            saveKeyDataFile.push(j + "," + doc.artLayers[k].name)
                        }
                    }
                }//End for check struck

                // doc.close(SaveOptions.DONOTSAVECHANGES);
            } else {
                // alert(saveKeyDataFile)
                for (var x = 0; x < saveKeyDataFile.length; x++) {
                    var nameLayerCurent = saveKeyDataFile[x].split(",")[1].toString()
                    var keyLineCSV = saveKeyDataFile[x].split(",")[0]
                    // alert(keyLineCSV)
                    doc.activeLayer = doc.artLayers[nameLayerCurent]
                    //Check kind layer
                    if (doc.activeLayer.kind == "LayerKind.SMARTOBJECT" && dataFiles[i][keyLineCSV] != "") {
                        try {
                            // alert(dataFiles[i][keyLineCSV].toString().replace(/^\s+|\s+$/gm, ''))
                            replaceContents(images + "/" + dataFiles[i][keyLineCSV].toString().replace(/^\s+|\s+$/gm, ''));
                            doc.activeLayer.name = "Temp"
                            doc.artLayers[nameLayerCurent].visible = false;
                            var left = doc.artLayers[nameLayerCurent].bounds[0];
                            var right = doc.artLayers[nameLayerCurent].bounds[2];
                            var top = doc.artLayers[nameLayerCurent].bounds[1];
                            var bottom = doc.artLayers[nameLayerCurent].bounds[3];
                            shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
                            resizeImage(right - left, bottom - top)
                            doc.selection.select(shapeRef);
                            Algn("ADSCentersH");//"ADSCentersV" 
                            Algn("ADSBottoms");//"ADSCentersV" 
                            doc.selection.deselect();
                            doc.artLayers[nameLayerCurent].remove()
                            doc.activeLayer = doc.artLayers["Temp"]
                            doc.activeLayer.name = nameLayerCurent
                        } catch (error) {
                            alert("It lacks input images!")
                        }

                    }
                    //If layer text
                    else if (doc.activeLayer.kind == "LayerKind.TEXT" && dataFiles[i][keyLineCSV] != "") {
                        var textItem = doc.activeLayer.textItem
                        textItem.kind = TextType.PARAGRAPHTEXT
                        textItem.contents = dataFiles[i][keyLineCSV].toString().replace(/^\s+|\s+$/gm, '')
                        doc.activeLayer.name = nameLayerCurent
                    }
                }
            }

            progressbar1.value = valueProcessing;
            i != 0 ? saveImage(output, formatIndex, doc.name.split(".")[0].toString() + "_" + dataFiles[i][0]) : "";
            selectHistory(doc.name)
            valueProcessing = valueProcessing + 100 / dataFiles.length;
        }//End for
        activeDocument.close(SaveOptions.DONOTSAVECHANGES);
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

