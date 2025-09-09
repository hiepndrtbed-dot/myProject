(function () {
    var progressWindow = new Window("window", "Progress"); // Tạo cửa sổ tiến trình
    var progressText = progressWindow.add("statictext", undefined, "Processing: "); // Thêm văn bản tiến trình
    // progressText.preferredSize.width = 500; // Đặt kích thước thanh tiến trình
    var progressbar1 = progressWindow.add("progressbar", undefined, undefined, { name: "progressbar1" });
    progressbar1.maxvalue = 100;
    progressbar1.value = 0;
    progressbar1.preferredSize.width = 160;
    progressbar1.preferredSize.height = 10;
    // Tạo một cửa sổ dialog
    var dialog = new Window("dialog", "Auto Cutout - reside - change color");
    dialog.alignChildren = "left";
    dialog.orientation = "column";
    var labelSize = [80, 30]; // Kích thước chung cho các tiêu đề
    var inputSize = 90

    // Thêm các ô nhập thông tin

    //Select model or product
    var GroupSelectModelOrProduct = dialog.add("group")
    GroupSelectModelOrProduct.orientation = "row"

    var radioModel = GroupSelectModelOrProduct.add("radiobutton", undefined, undefined, { name: "model" });
    radioModel.text = "Model";
    radioModel.value = true;

    var radioProduct = GroupSelectModelOrProduct.add("radiobutton", undefined, undefined, { name: "Product" });
    radioProduct.text = "Product";

    //Folder input
    var inputFolderGroup = dialog.add("group");
    inputFolderGroup.add("statictext", undefined, "Folder Input(*):").size = labelSize;
    var inputFolderText = inputFolderGroup.add("edittext", undefined, "", { multiline: false });
    inputFolderText.preferredSize.width = 160;
    var inputFolderButton = inputFolderGroup.add("button", undefined, "Select");

    //Group Size and margin
    var GroupSize = dialog.add("group")
    GroupSize.orientation = "row"
    var GroupSize = GroupSize.add("group")
    GroupSize.orientation = "column";
    //input width
    var inputWidth = GroupSize.add("group")
    inputWidth.add("statictext", undefined, "Input Width:").size = labelSize
    var inputWidthText = inputWidth.add("edittext", undefined, 768, { multiline: false })
    inputWidthText.preferredSize.width = inputSize
    //input Height
    var inputHeight = GroupSize.add("group")
    inputHeight.add("statictext", undefined, "Input Height:").size = labelSize
    var inputHeightText = inputHeight.add("edittext", undefined, 768, { multiline: false })
    inputHeightText.preferredSize.width = inputSize
    //Group margin
    var GroupMargin = dialog.add("group")
    GroupMargin.orientation = "row";
    GroupMargin.add("statictext", undefined, "Margin Top/Bottom:").size = labelSize
    var inputMarginTopBottomText = GroupMargin.add("edittext", undefined, 233, { multiline: false })
    inputMarginTopBottomText.preferredSize.width = inputSize

    //Left|Right margin
    // var marginLeftRight = GroupMargin.add("group")
    // GroupMargin.add("statictext", undefined, "Margin Left|Right:").size = labelSize
    // var inputMarginLeftRightText = GroupMargin.add("edittext", undefined, 117, { multiline: false })
    // inputMarginLeftRightText.preferredSize.width = inputSize

    //Left|Right margin
    var marginLeftRight = dialog.add("group");
    marginLeftRight.add("statictext", undefined, "Margin Left|Right:").size = labelSize;
    var inputMarginLeftRightText = marginLeftRight.add("dropdownlist");
    inputMarginLeftRightText.preferredSize.width = inputSize;
    inputMarginLeftRightText.add("item", "75");
    inputMarginLeftRightText.add("item", "116");
    inputMarginLeftRightText.add("item", "180");
    inputMarginLeftRightText.add("item", "214");
    inputMarginLeftRightText.selection = 0;

    //Group Align
    var GroupAlign = dialog.add("group")
    GroupAlign.orientation = "row"
    GroupAlign.add("statictext", undefined, "Align").size = labelSize;
    var formatAlignList = GroupAlign.add("dropdownlist");
    formatAlignList.preferredSize.width = inputSize;
    formatAlignList.add("item", "Center");
    formatAlignList.add("item", "Top");
    formatAlignList.add("item", "Right");
    formatAlignList.add("item", "Left");
    formatAlignList.add("item", "Bottom");
    formatAlignList.selection = 4;

    //Group color background
    var GroupColorBg = dialog.add("group")
    GroupColorBg.orientation = "row"
    GroupColorBg.add("statictext", undefined, "Background color").size = labelSize;
    var inputColorBg = GroupColorBg.add("edittext", undefined, "FFFFFF", { multiline: false });
    inputColorBg.preferredSize.width = 90;

    //Save Format
    var formatGroup = dialog.add("group");
    formatGroup.add("statictext", undefined, "Save format:").size = labelSize;
    var formatDropdown = formatGroup.add("dropdownlist");
    formatDropdown.preferredSize.width = inputSize;
    formatDropdown.add("item", "JPEG");
    formatDropdown.add("item", "PNG");
    formatDropdown.add("item", "PDF");
    formatDropdown.selection = 0;

    //save PSD
    var SavePSD = formatGroup.add("checkbox", undefined, undefined, { name: "Save PSD" })
    SavePSD.text = "Save PSD";
    SavePSD.value = true;
    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = "right";
    var cancelButton = buttonGroup.add("button", undefined, "Cancel");
    cancelButton.onClick = function () {
        dialog.close();
    };
    var saveButton = buttonGroup.add("button", undefined, "Process");

    inputFolderButton.onClick = function () {
        var folder = Folder.selectDialog("Select folder input!");
        if (folder != null) {
            selectedFolder = folder;
            inputFolderText.text = folder.fsName;
        }
    };

    saveButton.onClick = function () {
        var inputFolder = new Folder(inputFolderText.text);
        var widthImages = parseInt(inputWidthText.text);
        var heightImages = parseInt(inputHeightText.text);
        var marginTopBottomImage = parseInt(inputMarginTopBottomText.text);
        var marginLeftRightImage = parseInt(inputMarginLeftRightText.selection.toString());
        var formatIndexAlign = formatAlignList.selection.toString();
        var colorBg = inputColorBg.text;
        var formatIndexSave = formatDropdown.selection.toString();
        var formatSavePSD = SavePSD.value
        var model = radioModel.value
        var product = radioProduct.value

        if (!inputFolder.exists) {
            alert("Please select folder Input!");
            return;
        }
        //Create folder output.
        var outputFolder = new Folder(selectedFolder + "/output");
        if (!outputFolder.exists) {
            outputFolder.create();
        }

        dialog.close();
        processImages(model, product, inputFolder, outputFolder, widthImages, heightImages, marginTopBottomImage, marginLeftRightImage, formatIndexAlign, colorBg, formatIndexSave, formatSavePSD);
        progressWindow.close();
    };

    dialog.show();

    function processImages(model, product, inputFolder, outputFolder, widthImages, heightImages, marginTopBottomImage, marginLeftRightImage, formatIndexAlign, colorBg, formatIndexSave, formatSavePSD) {

        progressWindow.show(); // Hiển thị cửa sổ tiến trình
        //Processing
        var files = inputFolder.getFiles();
        valueProcessing = 100 / files.length
        var flag = heightImages;
        for (var i in files) {
            // alert(flag)
            try {
                doc = open(files[i]);
                //Reset unit
                preferences.rulerUnits = Units.PIXELS
                app.preferences.typeunits = TypeUnits.PIXELS
                //Processing
                flag = resizeImage(model, product, widthImages, heightImages, marginTopBottomImage, marginLeftRightImage, formatIndexAlign, colorBg, flag)
                progressbar1.value = valueProcessing;
                saveImage(outputFolder, formatIndexSave, formatSavePSD, doc.name.split(".")[0])
                valueProcessing = valueProcessing + 100 / files.length;
                doc.close(SaveOptions.DONOTSAVECHANGES);
                // break
            } catch (error) { }
        }
        alert("Done!");
    }
    function resizeImage(model, product, widthImages, heightImages, marginTopBottomImage, marginLeftRightImage, formatIndexAlign, colorBg, flag) {

        if (product == true) {
            // alert(typeof formatIndexAlign)
            var MedWidth = UnitValue(widthImages, "px");
            var MedHeight = UnitValue(heightImages, "px");
            var doc = app.activeDocument;
            action("CpTL");
            doc.activeLayer.name = "Shadow";
            action("CpTL");
            doc.activeLayer.name = "Product";
            action("CpTL");
            doc.activeLayer.name = "Check";
            levelsAll(50, 0.81, 245);
            autoCutout(true);
            doc.activeLayer.remove()
            smartBrushWorkspace(0, 20, 1, 40, 10, false, false, false, false, false, 100);
            addMask();
            action("CpTL");
            doc.activeLayer.name = "Reside";
            selectMask();
            applyMask();
            doc.activeLayer.link(doc.artLayers["Shadow"])
            doc.activeLayer.link(doc.artLayers["Product"])
            colorRange(83, 103, 0);
            doc.activeLayer = doc.artLayers["Shadow"]
            addMask();
            selectMask()
            levels(0.45);
            levels(0.45);
            doc.activeLayer = doc.artLayers[doc.layers.length - 1];
            var rgb = hexToRgb("#" + colorBg);
            makeSolidColor(rgb.r, rgb.r, rgb.b)
            doc.activeLayer.name = "BackgroundColor"

            //CHECK LAYER
            doc.activeLayer = doc.artLayers["Reside"];
            var bounds = doc.activeLayer.bounds
            var widthI = UnitValue(doc.width, "px");
            var heightI = UnitValue(doc.height, "px")
            var radioWidth = doc.width / MedWidth
            var radioHeight = doc.height / MedHeight

            //Kiem tra ty le
            if (radioWidth == radioHeight) {
                doc.resizeImage(MedWidth, MedHeight, 72, ResampleMethod.BICUBIC)
                if (bounds[0] != 0 && bounds[1] != 0 && bounds[2] != widthI && bounds[3] != heightI) {
                    doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                    if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                        tranS()
                    }
                } else if (bounds[0] == 0 && bounds[1] != 0 && bounds[2] != widthI && bounds[3] != heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[0] > 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLELEFT)
                    }
                } else if (bounds[0] == 0 && bounds[1] == 0 && bounds[2] != widthI && bounds[3] != heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[0] == 0 && doc.selection.bounds[1] == 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.TOPLEFT)
                    } else if (doc.selection.bounds[0] == 0 && doc.selection.bounds[1] != 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLELEFT)
                    } else if (doc.selection.bounds[0] != 0 && doc.selection.bounds[1] == 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.TOPCENTER)
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }
                } else if (bounds[0] == 0 && bounds[1] != 0 && bounds[2] != widthI && bounds[3] == heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[0] == 0 && doc.selection.bounds[3] == heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.BOTTOMLEFT)
                    } else if (doc.selection.bounds[0] == 0 && doc.selection.bounds[3] != heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLELEFT)
                    } else if (doc.selection.bounds[0] != 0 && doc.selection.bounds[3] == heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.BOTTOMCENTER)
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }

                } else if (bounds[0] != 0 && bounds[1] != 0 && bounds[2] == widthI && bounds[3] != heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[0] < widthI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLERIGHT)
                    }
                } else if (bounds[0] != 0 && bounds[1] == 0 && bounds[2] == widthI && bounds[3] != heightI) {

                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[1] == 0 && doc.selection.bounds[2] == widthI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.TOPRIGHT)
                    } else if (doc.selection.bounds[1] == 0 && doc.selection.bounds[2] != widthI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.TOPCENTER)
                    } else if (doc.selection.bounds[1] != 0 && doc.selection.bounds[2] == widthI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLERIGHT)
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }
                } else if (bounds[0] != 0 && bounds[1] != 0 && bounds[2] == widthI && bounds[3] == heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[2] == widthI && doc.selection.bounds[3] == heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.BOTTOMRIGHT)
                    } else if (doc.selection.bounds[2] == widthI && doc.selection.bounds[3] != heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLERIGHT)
                    } else if (doc.selection.bounds[2] != widthI && doc.selection.bounds[3] == heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.BOTTOMCENTER)
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }

                } else if (bounds[0] != 0 && bounds[1] == 0 && bounds[2] != widthI && bounds[3] != heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[1] > 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }

                }
            } else if (radioWidth > radioHeight) {
                doc.resizeImage(MedWidth, null, 72, ResampleMethod.BICUBIC)
                if (bounds[0] != 0 && bounds[1] != 0 && bounds[2] != widthI && bounds[3] != heightI) {
                    doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                    if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                        tranS()
                    }
                } else if (bounds[0] == 0 && bounds[1] != 0 && bounds[2] != widthI && bounds[3] != heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[0] > 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLELEFT)
                    }
                } else if (bounds[0] == 0 && bounds[1] == 0 && bounds[2] != widthI && bounds[3] != heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[0] == 0 && doc.selection.bounds[1] == 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.TOPLEFT)
                    } else if (doc.selection.bounds[0] == 0 && doc.selection.bounds[1] != 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLELEFT)
                    } else if (doc.selection.bounds[0] != 0 && doc.selection.bounds[1] == 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.TOPCENTER)
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }
                } else if (bounds[0] == 0 && bounds[1] != 0 && bounds[2] != widthI && bounds[3] == heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[0] == 0 && doc.selection.bounds[3] == heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.BOTTOMLEFT)
                    } else if (doc.selection.bounds[0] == 0 && doc.selection.bounds[3] != heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLELEFT)
                    } else if (doc.selection.bounds[0] != 0 && doc.selection.bounds[3] == heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.BOTTOMCENTER)
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }

                } else if (bounds[0] != 0 && bounds[1] != 0 && bounds[2] == widthI && bounds[3] != heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[0] < widthI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLERIGHT)
                    }
                } else if (bounds[0] != 0 && bounds[1] == 0 && bounds[2] == widthI && bounds[3] != heightI) {

                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[1] == 0 && doc.selection.bounds[2] == widthI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.TOPRIGHT)
                    } else if (doc.selection.bounds[1] == 0 && doc.selection.bounds[2] != widthI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.TOPCENTER)
                    } else if (doc.selection.bounds[1] != 0 && doc.selection.bounds[2] == widthI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLERIGHT)
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }
                } else if (bounds[0] != 0 && bounds[1] != 0 && bounds[2] == widthI && bounds[3] == heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[2] == widthI && doc.selection.bounds[3] == heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.BOTTOMRIGHT)
                    } else if (doc.selection.bounds[2] == widthI && doc.selection.bounds[3] != heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLERIGHT)
                    } else if (doc.selection.bounds[2] != widthI && doc.selection.bounds[3] == heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.BOTTOMCENTER)
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }

                } else if (bounds[0] != 0 && bounds[1] == 0 && bounds[2] != widthI && bounds[3] != heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[1] > 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }

                }
            } else {
                doc.resizeImage(null, MedHeight, 72, ResampleMethod.BICUBIC)
                if (bounds[0] != 0 && bounds[1] != 0 && bounds[2] != widthI && bounds[3] != heightI) {
                    doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                    if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                        tranS()
                    }
                } else if (bounds[0] == 0 && bounds[1] != 0 && bounds[2] != widthI && bounds[3] != heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[0] > 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLELEFT)
                    }
                } else if (bounds[0] == 0 && bounds[1] == 0 && bounds[2] != widthI && bounds[3] != heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[0] == 0 && doc.selection.bounds[1] == 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.TOPLEFT)
                    } else if (doc.selection.bounds[0] == 0 && doc.selection.bounds[1] != 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLELEFT)
                    } else if (doc.selection.bounds[0] != 0 && doc.selection.bounds[1] == 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.TOPCENTER)
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }
                } else if (bounds[0] == 0 && bounds[1] != 0 && bounds[2] != widthI && bounds[3] == heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[0] == 0 && doc.selection.bounds[3] == heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.BOTTOMLEFT)
                    } else if (doc.selection.bounds[0] == 0 && doc.selection.bounds[3] != heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLELEFT)
                    } else if (doc.selection.bounds[0] != 0 && doc.selection.bounds[3] == heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.BOTTOMCENTER)
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }

                } else if (bounds[0] != 0 && bounds[1] != 0 && bounds[2] == widthI && bounds[3] != heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[0] < widthI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLERIGHT)
                    }
                } else if (bounds[0] != 0 && bounds[1] == 0 && bounds[2] == widthI && bounds[3] != heightI) {

                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[1] == 0 && doc.selection.bounds[2] == widthI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.TOPRIGHT)
                    } else if (doc.selection.bounds[1] == 0 && doc.selection.bounds[2] != widthI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.TOPCENTER)
                    } else if (doc.selection.bounds[1] != 0 && doc.selection.bounds[2] == widthI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLERIGHT)
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }
                } else if (bounds[0] != 0 && bounds[1] != 0 && bounds[2] == widthI && bounds[3] == heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[2] == widthI && doc.selection.bounds[3] == heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.BOTTOMRIGHT)
                    } else if (doc.selection.bounds[2] == widthI && doc.selection.bounds[3] != heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLERIGHT)
                    } else if (doc.selection.bounds[2] != widthI && doc.selection.bounds[3] == heightI) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.BOTTOMCENTER)
                    } else {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }

                } else if (bounds[0] != 0 && bounds[1] == 0 && bounds[2] != widthI && bounds[3] != heightI) {
                    loadSelectionCurentLayer()
                    doc.selection.contract(10)
                    if (doc.selection.bounds[1] > 0) {
                        doc.selection.deselect();
                        doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                        if ((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] > doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1] - 30 && formatIndexAlign == "Bottom") || doc.activeLayer.bounds[1] > 120) {
                            tranS()
                        }
                    }

                }
            }
            doc.guides.add(Direction.HORIZONTAL, heightImages - marginTopBottomImage)
            doc.guides.add(Direction.VERTICAL, marginLeftRightImage)
            doc.guides.add(Direction.VERTICAL, widthImages - marginLeftRightImage)
            return flag;

            function tranS() {
                if (((doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0] - 60) < doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1]) && (doc.activeLayer.bounds[1] > 120)) {
                    // alert(typeof heightImages);
                    // alert(Number(flag));
                    // alert(heightImages - marginTopBottomImage - Number(flag));
                    resizeImageLayer(widthImages - 2 * marginLeftRightImage, heightImages - marginTopBottomImage - Number(flag));
                    var l = doc.activeLayer.bounds[0]
                    var r = doc.width - doc.activeLayer.bounds[2]
                    if (l > r) {
                        doc.activeLayer.translate(-(l - r) / 2, 0)
                    }
                    else {
                        doc.activeLayer.translate(-(l - r) / 2, 0)
                    }

                    if (doc.activeLayer.bounds[3] > doc.height - marginTopBottomImage) {
                        doc.activeLayer.translate(0, -((doc.activeLayer.bounds[3] - (doc.height - marginTopBottomImage)) - 3))
                    } else {
                        doc.activeLayer.translate(0, ((doc.height - marginTopBottomImage) - doc.activeLayer.bounds[3] + 3))
                    }
                } else {
                    resizeImageLayer(widthImages - 2 * marginLeftRightImage, heightImages - marginTopBottomImage);
                    var l = doc.activeLayer.bounds[0]
                    // alert(widthImages)
                    // alert(doc.activeLayer.bounds[2])
                    var r = doc.width - doc.activeLayer.bounds[2]
                    if (l > r) {
                        doc.activeLayer.translate(-(l - r) / 2, 0)
                    }
                    else {
                        doc.activeLayer.translate(-(l - r) / 2, 0)
                    }

                    if (doc.activeLayer.bounds[3] > doc.height - marginTopBottomImage) {
                        doc.activeLayer.translate(0, -((doc.activeLayer.bounds[3] - (doc.height - marginTopBottomImage)) - 3))
                    } else {
                        doc.activeLayer.translate(0, ((doc.height - marginTopBottomImage) - doc.activeLayer.bounds[3] + 3))
                    }
                    if (flag > doc.activeLayer.bounds[1]) {
                        flag = doc.activeLayer.bounds[1];
                    } else {
                        flag = flag
                    }
                }
            }
        } else if (model == true) {
            var MedWidth = UnitValue(widthImages, "px");
            var MedHeight = UnitValue(heightImages, "px");
            var doc = app.activeDocument;
            action("CpTL");
            doc.activeLayer.name = "Product";
            autoCutout(true);
            var boundsSelection = doc.selection.bounds;
            if (boundsSelection[1] > (15 / 100) * Number(doc.height) || boundsSelection[3] < (85 / 100) * Number(doc.height) || (boundsSelection[0] == 0 && boundsSelection[2] != 0 && boundsSelection[1] != 0) || (boundsSelection[0] != 0 && boundsSelection[2] == 0 && boundsSelection[1] != 0)) {
                doc.selection.selectAll()
            } else {
                smartBrushWorkspace(0, 20, 1, 40, 10, false, false, false, false, false, 100);
                smartBrushWorkspace(0, 0, 0, 0, 0, false, false, false, true, false, 100);
            }
            addMask();
            action("CpTL");
            doc.activeLayer.name = "Reside";
            selectMask();
            applyMask();
            doc.activeLayer.link(doc.artLayers["Product"])

            doc.activeLayer = doc.backgroundLayer
            var rgb = hexToRgb("#" + colorBg);
            makeSolidColor(rgb.r, rgb.r, rgb.b)
            doc.activeLayer.name = "BackgroundColor"

            //CHECK LAYER
            doc.activeLayer = doc.artLayers["Reside"];
            var bounds = doc.activeLayer.bounds
            var widthI = doc.width
            var heightI = doc.height
            var radioWidth = doc.width / MedWidth
            var radioHeight = doc.height / MedHeight

            if ((bounds[0] == 0 && bounds[1] == 0 && bounds[2] == widthI && bounds[3] == heightI)) {
                //Kiem tra ty le
                if (radioWidth == radioHeight) {
                    doc.resizeImage(MedWidth, MedHeight, 72, ResampleMethod.BICUBIC)
                } else if (radioWidth > radioHeight) {
                    doc.resizeImage(null, MedHeight, 72, ResampleMethod.BICUBIC)
                    doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                } else {
                    doc.resizeImage(MedWidth, null, 72, ResampleMethod.BICUBIC)
                    doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                }
            } else {
                //Kiem tra ty le
                if (radioWidth == radioHeight) {
                    doc.resizeImage(MedWidth, MedHeight, 72, ResampleMethod.BICUBIC)
                } else if (radioWidth > radioHeight) {
                    doc.resizeImage(MedWidth, null, 72, ResampleMethod.BICUBIC)
                    doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                } else {
                    doc.resizeImage(null, MedHeight, 72, ResampleMethod.BICUBIC)
                    doc.resizeCanvas(MedWidth, MedHeight, AnchorPosition.MIDDLECENTER)
                }
            }

        }//End select Product
    }
})();

function saveImage(pathName, typeSaveAs, formatSavePSD, randomSave) {
    // alert(pathName)
    // alert(typeSaveAs)
    // alert(formatSavePSD)
    // alert(randomSave)

    // JPG Options;
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.embedColorProfile = true;
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgSaveOptions.matte = MatteType.NONE;
    jpgSaveOptions.quality = 10;


    //PDF Options
    pdfOptions = new PDFSaveOptions();
    pdfOptions.compatibility = PDFCompatibility.PDF17;
    pdfOptions.generateThumbnails = true;
    pdfOptions.preserveEditability = false;
    pdfOptions.preset = "[High File Size]";
    pdfOptions.layers = false;

    //PNG Options
    pngOptions = new PNGSaveOptions();
    pngOptions.compression = 8;
    pngOptions.interlaced = false;

    // Set up the save options for a PSD file
    var psdSaveOptions = new PhotoshopSaveOptions();
    psdSaveOptions.layers = true;  // Keep layers in the saved file
    psdSaveOptions.embedColorProfile = true;  // Embed the color profile
    psdSaveOptions.maximizeCompatibility = true;  // Enable maximize compatibility

    switch (typeSaveAs) {
        case "PNG":
            doc.saveAs((new File(pathName + "/" + randomSave + ".png")), pngOptions, true, Extension.LOWERCASE);
            break;

        case "PDF":
            doc.saveAs((new File(pathName + "/" + randomSave + ".pdf")), pdfOptions, true, Extension.LOWERCASE);
            break;

        default:
            try {
                doc.saveAs((new File(pathName + "/" + randomSave + ".jpg")), jpgSaveOptions, true, Extension.LOWERCASE);

            } catch (error) {
                alert(error)
            }
            break;
    }

    if (formatSavePSD == true) {
        // Save the document
        doc.saveAs((new File(pathName + "/" + randomSave + ".psd")), psdSaveOptions, true, Extension.LOWERCASE);
    }
}


function action(action) {
    var idCpTL = charIDToTypeID(action);
    executeAction(idCpTL, undefined, DialogModes.NO);
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

function resizeImage2(width, height) {
    WIDTH = width;
    HEIGHT = height;
    bounds = activeDocument.activeLayer.bounds;
    layerWidth = bounds[2].as('px') - bounds[0].as('px');
    layerHeight = bounds[3].as('px') - bounds[1].as('px');
    layerRatio = layerWidth / layerHeight;
    newWidth = WIDTH;
    newHeight = ((1.0 * WIDTH) / layerRatio);
    if (newHeight <= HEIGHT) {
        newWidth = layerRatio * HEIGHT;
        newHeight = HEIGHT;
    }
    resizePercent = newWidth / layerWidth * 100;
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);

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

function autoCutout(sampleAllLayers) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    }

    var descriptor = new ActionDescriptor();

    descriptor.putBoolean(s2t("sampleAllLayers"), sampleAllLayers);
    executeAction(s2t("autoCutout"), descriptor, DialogModes.NO);
}

function smartBrushWorkspace(smartBrushRadius, smartBrushSmooth, smartBrushFeather, smartBrushContrast, smartBrushShiftEdge, sampleAllLayers, smartBrushUseSmartRadius, smartBrushUseDeepMatte, autoTrimap, smartBrushDecontaminate, smartBrushDeconAmount) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    descriptor.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    descriptor.putInteger(s2t("smartBrushRadius"), smartBrushRadius);
    descriptor.putInteger(s2t("smartBrushSmooth"), smartBrushSmooth);
    descriptor.putUnitDouble(s2t("smartBrushFeather"), s2t("pixelsUnit"), smartBrushFeather);
    descriptor.putUnitDouble(s2t("smartBrushContrast"), s2t("percentUnit"), smartBrushContrast);
    descriptor.putUnitDouble(s2t("smartBrushShiftEdge"), s2t("percentUnit"), smartBrushShiftEdge);
    descriptor.putBoolean(s2t("sampleAllLayers"), sampleAllLayers);
    descriptor.putBoolean(s2t("smartBrushUseSmartRadius"), smartBrushUseSmartRadius);
    descriptor.putBoolean(s2t("smartBrushUseDeepMatte"), smartBrushUseDeepMatte);
    descriptor.putBoolean(s2t("autoTrimap"), autoTrimap);
    descriptor.putBoolean(s2t("smartBrushDecontaminate"), smartBrushDecontaminate);
    descriptor.putUnitDouble(s2t("smartBrushDeconAmount"), s2t("percentUnit"), smartBrushDeconAmount);
    descriptor.putEnumerated(s2t("refineEdgeOutput"), s2t("refineEdgeOutput"), s2t("selectionOutputToSelection"));
    executeAction(s2t("smartBrushWorkspace"), descriptor, DialogModes.NO);
}
//add mask
function addMask() {
    var idMk = charIDToTypeID("Mk  ");
    var desc358 = new ActionDescriptor();
    var idNw = charIDToTypeID("Nw  ");
    var idChnl = charIDToTypeID("Chnl");
    desc358.putClass(idNw, idChnl);
    var idAt = charIDToTypeID("At  ");
    var ref208 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref208.putEnumerated(idChnl, idChnl, idMsk);
    desc358.putReference(idAt, ref208);
    var idUsng = charIDToTypeID("Usng");
    var idUsrM = charIDToTypeID("UsrM");
    var idRvlS = charIDToTypeID("RvlS");
    desc358.putEnumerated(idUsng, idUsrM, idRvlS);
    executeAction(idMk, desc358, DialogModes.NO);
}

function applyMask() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("channel"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putBoolean(s2t("apply"), true);
    executeAction(s2t("delete"), descriptor, DialogModes.NO);
}

function selectMask() {
    var idslct = charIDToTypeID("slct");
    var desc444 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref248 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref248.putEnumerated(idChnl, idChnl, idMsk);
    desc444.putReference(idnull, ref248);
    var idMkVs = charIDToTypeID("MkVs");
    desc444.putBoolean(idMkVs, false);
    executeAction(idslct, desc444, DialogModes.NO);
}


function select(makeVisible) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putName(s2t("layer"), name);
    descriptor.putReference(c2t("null"), reference);
    descriptor.putEnumerated(s2t("selectionModifier"), s2t("selectionModifierType"), s2t("addToSelectionContinuous"));
    descriptor.putBoolean(s2t("makeVisible"), false);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
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

function levels(gamma) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var list = new ActionList();
    var reference = new ActionReference();

    descriptor.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    reference.putEnumerated(s2t("channel"), s2t("ordinal"), s2t("targetEnum"));
    descriptor2.putReference(s2t("channel"), reference);
    descriptor2.putDouble(s2t("gamma"), gamma);
    list.putObject(s2t("levelsAdjustment"), descriptor2);
    descriptor.putList(s2t("adjustment"), list);
    executeAction(s2t("levels"), descriptor, DialogModes.NO);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function loadSelectionCurentLayer() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("transparencyEnum"));
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

function levelsAll(black, middle, white) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var list = new ActionList();
    var list2 = new ActionList();
    var reference = new ActionReference();

    descriptor.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
    descriptor2.putReference(s2t("channel"), reference);
    list2.putInteger(black);
    list2.putInteger(white);
    descriptor2.putList(s2t("input"), list2);
    descriptor2.putDouble(s2t("gamma"), middle);
    list.putObject(s2t("levelsAdjustment"), descriptor2);
    descriptor.putList(s2t("adjustment"), list);
    executeAction(s2t("levels"), descriptor, DialogModes.NO);
}



