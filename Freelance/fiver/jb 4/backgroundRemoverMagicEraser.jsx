#target photoshop

function main() {
    // Ensure there's an open document (the template)
    if (app.documents.length === 0) {
        alert("Please open the template document.");
        return;
    }

    var originalRulerUnits = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;
    var docName = app.activeDocument.name;

    var selectedFolder = null;
    var heightThreshold = 60;
    var magicWandTolerance = 32;
    var magicWandEnabled = true;
    var removeBackgroundEnabled = false;

    var dlg = new Window('dialog', 'Photoshop Script', undefined, { closeButton: true });
    dlg.orientation = 'column';
    dlg.alignChildren = 'left';

    // Set background color to black
    dlg.graphics.backgroundColor = dlg.graphics.newBrush(dlg.graphics.BrushType.SOLID_COLOR, [0, 0, 0, 1]);

    // Set text color to white
    var whiteText = dlg.graphics.newPen(dlg.graphics.PenType.SOLID_COLOR, [1, 1, 1, 1], 1);
    var purpleBrush = dlg.graphics.newBrush(dlg.graphics.BrushType.SOLID_COLOR, [0.5, 0, 0.5, 1]);

    // Title Section
    var titleGroup = dlg.add('group');
    titleGroup.orientation = 'row';
    titleGroup.graphics.backgroundColor = purpleBrush;
    titleGroup.alignment = 'fill';
    var titleText = titleGroup.add('statictext', undefined, 'Script 2 - Magic Wand 🪄');
    titleText.graphics.foregroundColor = whiteText;
    titleText.alignment = 'center';

    // Source Folder Selection
    var sourceText = dlg.add('statictext', undefined, 'Select Source Folder:');
    sourceText.graphics.foregroundColor = whiteText;
    var folderGroup = dlg.add('group');
    folderGroup.orientation = 'row';
    var folderText = folderGroup.add('edittext', undefined, '', {readonly: true});
    folderText.preferredSize.width = 300;
    var browseButton = folderGroup.add('button', undefined, 'Browse');

    // Height Threshold Slider
    var heightTextLabel = dlg.add('statictext', undefined, 'Height Threshold (0-100):');
    heightTextLabel.graphics.foregroundColor = whiteText;
    var heightGroup = dlg.add('group');
    heightGroup.orientation = 'row';
    var heightSlider = heightGroup.add('slider', undefined, heightThreshold, 0, 100);
    var heightText = heightGroup.add('edittext', undefined, heightThreshold.toString());
    heightText.preferredSize.width = 50;

    // Magic Wand Checkbox and Tolerance Slider
    var magicWandGroup = dlg.add('group');
    magicWandGroup.orientation = 'row';
    var magicWandCheckbox = magicWandGroup.add('checkbox', undefined, 'Magic Wand');
    magicWandCheckbox.value = magicWandEnabled;
    magicWandCheckbox.graphics.foregroundColor = whiteText;
    var toleranceLabel = magicWandGroup.add('statictext', undefined, 'Tolerance (0-100):');
    toleranceLabel.graphics.foregroundColor = whiteText;
    var toleranceSlider = magicWandGroup.add('slider', undefined, magicWandTolerance, 0, 100);
    var toleranceText = magicWandGroup.add('edittext', undefined, magicWandTolerance.toString());
    toleranceText.preferredSize.width = 50;

    // Remove Background Checkbox
    var removeBackgroundCheckbox = dlg.add('checkbox', undefined, 'Remove Background');
    removeBackgroundCheckbox.value = removeBackgroundEnabled;
    removeBackgroundCheckbox.graphics.foregroundColor = whiteText;

    // OK and Cancel Buttons
    var buttonPanel = dlg.add('panel');
    buttonPanel.orientation = 'row';
    buttonPanel.alignment = 'right';
    buttonPanel.graphics.backgroundColor = purpleBrush;

    var okButton = buttonPanel.add('button', undefined, 'OK');
    var cancelButton = buttonPanel.add('button', undefined, 'Cancel');

    // Set button text color to white
    okButton.graphics.foregroundColor = whiteText;
    cancelButton.graphics.foregroundColor = whiteText;

    // Browse Button Event
    browseButton.onClick = function() {
        var folder = Folder.selectDialog("Select the folder containing images");
        if (folder) {
            selectedFolder = folder;
            folderText.text = selectedFolder.fsName;
        }
    };

    // Height Slider Event
    heightSlider.onChanging = function() {
        heightText.text = Math.round(heightSlider.value).toString();
    };
    heightText.onChanging = function() {
        var value = parseInt(heightText.text);
        if (!isNaN(value) && value >= 0 && value <= 100) {
            heightSlider.value = value;
        }
    };

    // Tolerance Slider Event
    toleranceSlider.onChanging = function() {
        toleranceText.text = Math.round(toleranceSlider.value).toString();
    };
    toleranceText.onChanging = function() {
        var value = parseInt(toleranceText.text);
        if (!isNaN(value) && value >= 0 && value <= 100) {
            toleranceSlider.value = value;
        }
    };

    // OK Button Event
    okButton.onClick = function() {
        heightThreshold = heightSlider.value;
        magicWandEnabled = magicWandCheckbox.value;
        magicWandTolerance = toleranceSlider.value;
        removeBackgroundEnabled = removeBackgroundCheckbox.value;
        dlg.close();
    };

    // Cancel Button Event
    cancelButton.onClick = function() {
        dlg.close();
    };

    dlg.show();



    if (!selectedFolder) {
        alert("No folder selected.");
        return;
    }

    var outputFolder = new Folder(selectedFolder + "/output");
    if (!outputFolder.exists) {
        outputFolder.create();
    }

    var imageFiles = selectedFolder.getFiles(function (file) {
        return file instanceof File && file.name.match(/\.(jpg|jpeg|png|tif|tiff)$/i) && file.absoluteURI.indexOf(outputFolder.absoluteURI) === -1;
    });

    if (imageFiles.length === 0) {
        alert("No image files found in the selected folder.");
        return;
    }

    for (var i = 0; i < imageFiles.length; i++) {
        var imageFile = imageFiles[i];
        $.writeln("Processing file: " + imageFile.name);
        processImage(imageFile, outputFolder, docName, heightThreshold / 100, magicWandEnabled, magicWandTolerance, removeBackgroundEnabled);
    }

    alert("All images processed successfully!");
    app.preferences.rulerUnits = originalRulerUnits;
}

function processImage(imageFile, outputFolder, docName, heightThreshold, magicWandEnabled, magicWandTolerance, removeBackgroundEnabled) {
    if (imageFile instanceof File && imageFile.name.match(/\.(jpg|jpeg|png)$/i)) {
        var boxCoordinatesTopLine = {
            "Ladies-JNR-GS resize template.psd": { bottomLeftX: 113, bottomLeftY: 533, bottomRightX: 649, bottomRightY: 533, targetBottomY: 540 },
            "Men's resize template.psd": { bottomLeftX: 73, bottomLeftY: 533, bottomRightX: 695, bottomRightY: 533, targetBottomY: 540 },
            "PS resize template.psd": { bottomLeftX: 113, bottomLeftY: 533, bottomRightX: 649, bottomRightY: 533, targetBottomY: 540 },
            "TD resize template.psd": { bottomLeftX: 214, bottomLeftY: 557, bottomRightX: 570, bottomRightY: 557, targetBottomY: 560 }
        };

        var boxCoordinatesBottomLine = {
            "Ladies-JNR-GS resize template.psd": { bottomLeftX: 113, bottomLeftY: 678, bottomRightX: 649, bottomRightY: 678, targetBottomY: 685 },
            "Men's resize template.psd": { bottomLeftX: 73, bottomLeftY: 678, bottomRightX: 695, bottomRightY: 678, targetBottomY: 685 },
            "PS resize template.psd": { bottomLeftX: 113, bottomLeftY: 678, bottomRightX: 649, bottomRightY: 678, targetBottomY: 685 },
            "TD resize template.psd": { bottomLeftX: 214, bottomLeftY: 706, bottomRightX: 570, bottomRightY: 706, targetBottomY: 709 }
        };

        $.writeln("Template selected: " + docName);
        var boxTop = boxCoordinatesTopLine[docName];
        var boxBottom = boxCoordinatesBottomLine[docName];
        if (!boxTop || !boxBottom) {
            alert("The template name does not match any known templates.");
            return;
        }

        placeEmbedded(imageFile);

        var contains_x = app.activeDocument.activeLayer.name.indexOf("(x)") !== -1;

        if (!contains_x) {
            if (magicWandEnabled) {
                wandRemoveOnlyBackground(magicWandTolerance);
            }

            resizeLayer(boxTop, heightThreshold);
            moveLayerUp(boxTop, boxBottom, heightThreshold);

        }

        if (removeBackgroundEnabled && !contains_x) {
            removeBackgroundFunction();
        }

        saveAsJPG(outputFolder, imageFile.name);
        resetDoc(docName);
    } else {
        alert(imageFile.name + " is not a valid jpg or png file.");
    }
}

function removeBackgroundFunction() {
    var idremoveBackground = stringIDToTypeID("removeBackground");
    executeAction(idremoveBackground, undefined, DialogModes.NO);
}

function resetDoc(docName) {
    var idslct = charIDToTypeID("slct");
    var desc1170 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref24 = new ActionReference();
    var idSnpS = charIDToTypeID("SnpS");
    ref24.putName(idSnpS, docName);
    desc1170.putReference(idnull, ref24);
    executeAction(idslct, desc1170, DialogModes.NO);
}

function wandRemoveBackground(box, tolerance) {
    rasterizeLayer();
    var docWidth = app.activeDocument.width.as('px');
    var docHeight = app.activeDocument.height.as('px');
    magicWand(docWidth / 2, 1, tolerance);
    magicWand(box.bottomLeftX, box.bottomLeftY, tolerance);
    magicWand(box.bottomRightX, box.bottomRightY, tolerance);
    magicWand(docWidth / 2, box.bottomRightY, tolerance);
}

function wandRemoveOnlyBackground(tolerance) {
    rasterizeLayer();
    var docWidth = app.activeDocument.width.as('px');
    var docHeight = app.activeDocument.height.as('px');
    magicWand(10, 10, tolerance);
    magicWand(docWidth - 10, 10, tolerance);
    magicWand(10, docHeight - 10, tolerance);
    magicWand(docWidth - 10, docHeight - 10, tolerance);
}

function moveLayerUp(boxTop, boxBottom, heightThreshold) {

    var bounds = app.activeDocument.selection.bounds;
    var selection_height = bounds[3] - bounds[1];
    var selection_width = bounds[2] - bounds[0];

    var box = (selection_height >= app.activeDocument.height * heightThreshold) ? boxBottom : boxTop;

    var bottomY = bounds[3].value;
    var deltaY = box.targetBottomY - bottomY;
    app.activeDocument.selection.deselect();
    selectSubject();
    $.writeln("Moving layer by deltaX: 0, deltaY: " + deltaY);
    moveLayer(0, deltaY);
    $.writeln("Layer bounds after moving: " + app.activeDocument.activeLayer.bounds.toString());
    app.activeDocument.selection.deselect();
}

function resizeLayer(box, heightThreshold) {
    selectSubject();

    var bounds = app.activeDocument.selection.bounds;

    var selectionWidth = bounds[2].value - bounds[0].value;
    var selectionHeight = bounds[3].value - bounds[1].value;

    var targetWidth = box.bottomRightX - box.bottomLeftX;
    var targetHeight = box.bottomLeftY;
    var scaleFactor = Math.min(targetWidth / selectionWidth, targetHeight / selectionHeight);

    var layer = app.activeDocument.activeLayer;
    layer.resize(scaleFactor * 100, scaleFactor * 100, AnchorPosition.MIDDLECENTER);
}

function rasterizeLayer() {
    var idrasterizeLayer = stringIDToTypeID("rasterizeLayer");
    var desc285 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref11 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref11.putEnumerated(idLyr, idOrdn, idTrgt);
    desc285.putReference(idnull, ref11);
    executeAction(idrasterizeLayer, desc285, DialogModes.NO);
}

function moveLayer(deltaX, deltaY) {
    var idmove = charIDToTypeID("move");
    var desc613 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref38 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref38.putEnumerated(idLyr, idOrdn, idTrgt);
    desc613.putReference(idnull, ref38);
    var idT = charIDToTypeID("T   ");
    var desc614 = new ActionDescriptor();
    var idHrzn = charIDToTypeID("Hrzn");
    var idPxl = charIDToTypeID("#Pxl");
    desc614.putUnitDouble(idHrzn, idPxl, deltaX);
    var idVrtc = charIDToTypeID("Vrtc");
    desc614.putUnitDouble(idVrtc, idPxl, deltaY);   
    var idOfst = charIDToTypeID("Ofst");
    desc613.putObject(idT, idOfst, desc614);
    executeAction(idmove, desc613, DialogModes.NO);
}

function selectSubject() {
    var idautoCutout = stringIDToTypeID("autoCutout");
    var desc1429 = new ActionDescriptor();
    var idsampleAllLayers = stringIDToTypeID("sampleAllLayers");
    desc1429.putBoolean(idsampleAllLayers, false);
    executeAction(idautoCutout, desc1429, DialogModes.NO);
}

function placeEmbedded(file) {
    var idPlc = charIDToTypeID("Plc ");
    var desc = new ActionDescriptor();
    desc.putPath(charIDToTypeID("null"), file);
    desc.putEnumerated(charIDToTypeID("FTcs"), charIDToTypeID("QCSt"), charIDToTypeID("Qcsa"));
    desc.putUnitDouble(charIDToTypeID("Wdth"), charIDToTypeID("#Prc"), 100);
    desc.putUnitDouble(charIDToTypeID("Hght"), charIDToTypeID("#Prc"), 100);
    desc.putUnitDouble(charIDToTypeID("Angl"), charIDToTypeID("#Ang"), 0);
    desc.putBoolean(charIDToTypeID("Lnkd"), true);
    executeAction(idPlc, desc, DialogModes.NO);
}

// function saveAsJPG(outputFolder, fileName, contains_x) {
//     if (contains_x) {
//         fileName = fileName.replace("(x)", "");
//     }
//     var jpgFile = new File(outputFolder + "/" + fileName.replace(/\.[^\.]+$/, ".jpg"));
//     var jpgSaveOptions = new JPEGSaveOptions();
//     jpgSaveOptions.quality = 0;

//     app.activeDocument.saveAs(jpgFile, jpgSaveOptions, true, Extension.LOWERCASE);
//     app.activeDocument.activeLayer.remove();
// }

function saveAsJPG(outputFolder, imageName) {
    if (outputFolder.exists) {
        var jpgFile = new File(outputFolder.fsName + "/" + imageName.replace(/\.[^\.]+$/, "") + ".jpg");
        var saveOptions = new ExportOptionsSaveForWeb();   
        saveOptions.format = SaveDocumentType.JPEG;   
        saveOptions.includeProfile = false;   
        saveOptions.interlaced = false;   
        saveOptions.optimized = true;   
        saveOptions.quality = 100;
        app.activeDocument.exportDocument(jpgFile, ExportType.SAVEFORWEB, saveOptions);

    } else {
        alert("The output folder does not exist.");
    }
}

function magicWand(pointX, pointY, tolerance) {
    var idFl = charIDToTypeID("Fl  ");
    var desc299 = new ActionDescriptor();
    var idFrom = charIDToTypeID("From");
    var desc300 = new ActionDescriptor();
    var idHrzn = charIDToTypeID("Hrzn");
    var idPxl = charIDToTypeID("#Pxl");
    desc300.putUnitDouble(idHrzn, idPxl, pointX);
    var idVrtc = charIDToTypeID("Vrtc");
    var idPxl = charIDToTypeID("#Pxl");
    desc300.putUnitDouble(idVrtc, idPxl, pointY);
    var idPnt = charIDToTypeID("Pnt ");
    desc299.putObject(idFrom, idPnt, desc300);
    var idTlrn = charIDToTypeID("Tlrn");
    desc299.putInteger(idTlrn, tolerance);
    var idAntA = charIDToTypeID("AntA");
    desc299.putBoolean(idAntA, true);
    var idUsng = charIDToTypeID("Usng");
    var idFlCn = charIDToTypeID("FlCn");
    var idBckC = charIDToTypeID("BckC");
    desc299.putEnumerated(idUsng, idFlCn, idBckC);
    var idMd = charIDToTypeID("Md  ");
    var idBlnM = charIDToTypeID("BlnM");
    var idClar = charIDToTypeID("Clar");
    desc299.putEnumerated(idMd, idBlnM, idClar);
    executeAction(idFl, desc299, DialogModes.NO);
}

main();
