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
        progressWindow.show(); // Hiển thị cửa sổ tiến trình
        //Processing CSV
        var dataFiles = [];
        if (xlsx.exists) {
            xlsx.open('r');
            var lineXLSX = xlsx.readln()
            do {
                lineXLSX = xlsx.readln().split(",")
                dataFiles.push(lineXLSX)
            } while (lineXLSX != "");
        }
        // alert(dataFiles)
        //Open template

        //Processing data from CSV
        valueProcessing = 100 / dataFiles.length
        for (var i = 0; i < dataFiles.length - 1; i++) {
            app.open(template)
            var doc = activeDocument;
            // 0     ,   1 ,                              6
            // type  ,Image,type 1,type 2,type 3,type 4,text1,text 2,text 3,text 4,image save name
            // type 1,1.png,yes   ,      ,yes   ,      ,mr   ,india is my country ,all indians are my brothers and sister,good ,type 1.png
            // type 2,2.png,      ,yes   ,yes   ,      ,mrs  ,bangladesh,bangladesh people are very good people,bad,type 2.png
            // type 3,3.png,yes   ,yes   ,yes   ,yes   ,howru,australia,Australia people play good cricket ,ugly,type 3.png
            // type 4,5.png,      ,      ,yes   ,      ,Goodmorning,uk,england people are very discipline,super,type 4.png      
            // alert(dataFiles[i][2].toString().replace(/^\s+|\s+$/gm,'').toLowerCase())

            //load Images
            doc.activeLayer = doc.artLayers[0]
            replaceContents(images + "/" + dataFiles[i][1].toString().replace(/^\s+|\s+$/gm, ''));
            doc.artLayers[1].visible = false;
            var left = doc.artLayers[1].bounds[0];
            var right = doc.artLayers[1].bounds[2];
            var top = doc.artLayers[1].bounds[1];
            var bottom = doc.artLayers[1].bounds[3];
            shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
            doc.selection.select(shapeRef);
            Algn("ADSCentersH");//"ADSCentersV"
            Algn("ADSCentersV");//"ADSCentersV" 
            doc.selection.deselect();

            //Type 1 True
            if (dataFiles[i][2].toString().replace(/^\s+|\s+$/gm, '').toLowerCase() == "yes") {
                doc.activeLayer = doc.artLayers["text1"]
                var textItem = doc.activeLayer.textItem
                textItem.kind = TextType.PARAGRAPHTEXT
                textItem.contents = dataFiles[i][6].toString().replace(/^\s+|\s+$/gm, '')
                textItem.height = 80
                textItem.width = 430
                textItem.size = 35;
                doc.activeLayer.translate(-235, 0)
                doc.activeLayer.translate(0, -10)
            } else {
                doc.artLayers["type1"].visible = false
                doc.artLayers["text1"].visible = false

            }

            //Type 2 True
            if (dataFiles[i][3].toString().replace(/^\s+|\s+$/gm, '').toLowerCase() == "yes") {
                doc.activeLayer = doc.artLayers["text2"]
                var textItem = doc.activeLayer.textItem
                textItem.kind = TextType.PARAGRAPHTEXT
                textItem.contents = dataFiles[i][7].toString().replace(/^\s+|\s+$/gm, '')
                textItem.height = 80
                textItem.width = 430
                textItem.size = 35;
                doc.activeLayer.translate(-235, 0)
                doc.activeLayer.translate(0, -10)
            } else {
                doc.artLayers["type2"].visible = false
                doc.artLayers["text2"].visible = false
            }

            //Type 3 True
            if (dataFiles[i][4].toString().replace(/^\s+|\s+$/gm, '').toLowerCase() == "yes") {
                doc.activeLayer = doc.artLayers["text3"]
                var textItem = doc.activeLayer.textItem
                textItem.kind = TextType.PARAGRAPHTEXT
                textItem.contents = dataFiles[i][8].toString().replace(/^\s+|\s+$/gm, '')
                textItem.height = 80
                textItem.width = 430
                textItem.size = 35;
                doc.activeLayer.translate(-235, 0)
                doc.activeLayer.translate(0, 0)
            } else {
                doc.artLayers["type3"].visible = false
                doc.artLayers["text3"].visible = false

            }

            //Type 4 True
            if (dataFiles[i][5].toString().replace(/^\s+|\s+$/gm, '').toLowerCase() == "yes") {
                doc.activeLayer = doc.artLayers["text4"]
                var textItem = doc.activeLayer.textItem
                textItem.kind = TextType.PARAGRAPHTEXT
                textItem.contents = dataFiles[i][9].toString().replace(/^\s+|\s+$/gm, '')
                textItem.height = 80
                textItem.width = 430
                textItem.size = 35;
                doc.activeLayer.translate(-235, 0)
                doc.activeLayer.translate(0, 0)
            } else {
                doc.artLayers["type4"].visible = false
                doc.artLayers["text4"].visible = false
            }
            // break;
            progressbar1.value = valueProcessing;
            saveImage(output, formatIndex, dataFiles[i][0])
            doc.close(SaveOptions.DONOTSAVECHANGES);
            valueProcessing = valueProcessing + 100 / dataFiles.length;
        }

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
