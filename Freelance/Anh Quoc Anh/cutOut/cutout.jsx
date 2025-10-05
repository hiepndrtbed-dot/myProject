
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
    var dialog = new Window("dialog", "Remove Background ...");
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

    //select subject processing
    var selectSubjectGroup = dialog.add("group");
    selectSubjectGroup.add("statictext", undefined, "Save format:").size = labelSize;
    var selectSubjectDropdown = selectSubjectGroup.add("dropdownlist");
    selectSubjectDropdown.preferredSize.width = 70;
    selectSubjectDropdown.add("item", "Not Model");
    selectSubjectDropdown.add("item", "Model");
    selectSubjectDropdown.selection = 0;

    ///value
    var groupSlider = dialog.add("group")
    groupSlider.add("statictext", undefined, "Value cutout:").size = labelSize;
    var slider1 = groupSlider.add("slider", undefined, undefined, undefined, undefined, { name: "slider1" });
    slider1.minvalue = 0;
    slider1.maxvalue = 100;
    slider1.value = 50;
    ///value 2
    var groupSlider2 = dialog.add("group")
    groupSlider2.add("statictext", undefined, "Value cutout 2:").size = labelSize;
    var slider2 = groupSlider2.add("slider", undefined, undefined, undefined, undefined, { name: "slider1" });
    slider2.minvalue = 0;
    slider2.maxvalue = 100;
    slider2.value = 50;

    //Save Format
    var formatGroup = dialog.add("group");
    formatGroup.add("statictext", undefined, "Save format:").size = labelSize;
    var formatDropdown = formatGroup.add("dropdownlist");
    formatDropdown.preferredSize.width = 70;
    formatDropdown.add("item", "PNG");
    formatDropdown.add("item", "JPEG");
    formatDropdown.add("item", "PDF");
    formatDropdown.selection = 0;

    //Custom name
    var customName = dialog.add("group");
    customName.add("statictext", undefined, "Add name: ").size = labelSize;
    var inputCustomName = customName.add("edittext", undefined, "", { multiline: false });
    inputCustomName.preferredSize.width = 100;

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
        var formatIndex = formatDropdown.selection;
        var valueSlider = slider1.value;
        var valueSlider2 = slider2.value;
        var selectSubject = selectSubjectDropdown.selection;
        var nameCustom = inputCustomName.text;
        // alert(nameCustom);
        if (!inputFolder.exists) {
            alert("Please select folder Input!");
            return;
        }

        if (!outputFolder.exists) {
            alert("Please select folder Output!");
            return;
        }

        dialog.close();
        processImages(inputFolder, outputFolder, selectSubject, valueSlider, valueSlider2, formatIndex, nameCustom);
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

    function processImages(inputFolder, outputFolder, selectSubject, valueSlider, valueSlider2, formatIndex, nameCustom) {
        // Reset unit to Pixels
        preferences.rulerUnits = Units.PIXELS;
        app.preferences.typeunits = TypeUnits.PIXELS;
        progressWindow.show(); // Hiển thị cửa sổ tiến trình
        var Fuzziness = valueSlider;
        var range = valueSlider2;
        //Processing
        var files = inputFolder.getFiles();
        valueProcessing = 100 / files.length
        // alert(typeof selectSubject);
        for (var i in files) {
            var extensionFile = files[i].name.split('.').pop().toLowerCase();
            if (extensionFile === 'png' || extensionFile === 'jpg' || extensionFile === 'jpeg') {
                try {
                    doc = open(files[i]);
                    //xu ly tai day
                    //kiem tra co phai la nguoi khong
                    if (selectSubject.toString() == "Model") {//neu la nguoi
                        try {
                            cutOut();
                            makeMask();
                        } catch (error) {
                            alert("Không phải model!");
                        }

                    } else {
                        //Neu khong phai la nguoi
                        doc.activeLayer = doc.artLayers[0].duplicate();
                        doc.activeLayer.desaturate();
                        doc.colorSamplers.add([0, 1]);
                        var point1 = doc.colorSamplers[0].color.rgb.blue;
                        //Check nen mau nen toi hay sang
                        if (point1 >= 128) {
                            //xu ly nen trang
                            doc.activeLayer.adjustLevels(0, point1, 0.5, 0, 255);
                            colorRange(Fuzziness, range, 0);
                            doc.activeLayer.remove();
                            makeMask();
                        } else {
                            //xu ly nen den
                            doc.activeLayer.adjustLevels(point1, 128, 2, 0, 255);
                            colorRange(Fuzziness, range, 0);
                            doc.selection.invert();
                            doc.activeLayer.remove();
                            makeMask();
                        }
                    }
                    //end xu ly
                    saveImage(outputFolder, formatIndex, nameCustom +"_" + i)
                    doc.close(SaveOptions.DONOTSAVECHANGES);
                    progressbar1.value = valueProcessing;
                    valueProcessing = valueProcessing + 100 / files.length;
                } catch (error) { alert(error) }
            }
        }
        alert("Done!");
    }

})();

function saveImage(pathName, typeSaveAs, randomSave) {
    // JPG Options;
    // alert(typeof pathName)
    // alert(typeSaveAs)
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





function colorRange(shadowsFuzziness, shadowsUpperLimit, colorModel) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    descriptor.putEnumerated(s2t("colors"), s2t("colors"), s2t("shadows"));
    descriptor.putInteger(s2t("shadowsFuzziness"), shadowsFuzziness);
    descriptor.putInteger(s2t("shadowsUpperLimit"), shadowsUpperLimit);
    descriptor.putInteger(s2t("colorModel"), colorModel);
    executeAction(s2t("colorRange"), descriptor, DialogModes.NO);
}

function makeMask() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    descriptor.putClass(s2t("new"), s2t("channel"));
    reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("mask"));
    descriptor.putReference(s2t("at"), reference);
    descriptor.putEnumerated(s2t("using"), c2t("UsrM"), s2t("revealSelection"));
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}
function cutOut() {
    var idautoCutout = stringIDToTypeID("autoCutout");
    var desc973 = new ActionDescriptor();
    var idsampleAllLayers = stringIDToTypeID("sampleAllLayers");
    desc973.putBoolean(idsampleAllLayers, true);
    executeAction(idautoCutout, desc973, DialogModes.NO);
}
