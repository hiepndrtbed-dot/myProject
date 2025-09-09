#target photoshop

function removeBackground() {
    // Use the already open PSD file
    var psdFile = app.activeDocument;

    // Get the selected images folder
    var imagesFolder = new Folder(imagesFolderPath.text);
    if (imagesFolder.exists) {
        var outputFolder = new Folder(imagesFolder + "/output");
        if (!outputFolder.exists) {
            outputFolder.create();
        }

        var imageFiles = imagesFolder.getFiles(function(file) {
            return file instanceof File && file.name.match(/\.(jpg|jpeg|png)$/i) && file.parent.name != "output";
        });

        for (var i = 0; i < imageFiles.length; i++) {
            var file = imageFiles[i];
            if (file instanceof File && file.name.match(/\.(jpg|jpeg|png)$/i)) {
                $.writeln("---> Processing image: " + file.name)
                // Place the image as a smart object in the current document
                placeEmbedded(file);

                var originalName = file.name.replace(/\.[^\.]+$/, "");
                var layerName = originalName.replace(/%20/g, "_");

                if (layerName.indexOf("(x)") === -1) {
                    // Select the subject
                    $.writeln("Selecting subject..")
                    selectSubject();

                    // Copy the selection
                    $.writeln("Copying selection..")
                    copy();

                    // Make a new empty layer
                    $.writeln("Making new layer..")
                    makeNewLayer();

                    // Paste the selection
                    $.writeln("Pasting selection..")
                    paste();

                    // Delete original layer (second layer in the stack)
                    $.writeln("Deleting original layer..")
                    app.activeDocument.layers[1].remove()
                }

                // Save the image as png in the output directory
                saveAsJPG(outputFolder, originalName);

                // Remove the placed smart object layer
                app.activeDocument.activeLayer.remove();
                
            } else {
                $.writeln(file.name + " is not a valid jpg or png file.");
            }
        }

        alert("Done processing images.");
    } else {
        alert("The selected images folder does not exist.");
    }

    // Close the PSD file without saving changes
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

var win = new Window("dialog", "PSD Processor");
win.orientation = "column";

// Images Folder Path section
var imagesPathGroup = win.add("group");
imagesPathGroup.orientation = "row";
imagesPathGroup.add("statictext", undefined, "Images Folder Path:");
var imagesFolderPath = imagesPathGroup.add("edittext", undefined, "", {readonly: true});
imagesFolderPath.characters = 40;
var imagesBrowseButton = imagesPathGroup.add("button", undefined, "Browse");

imagesBrowseButton.onClick = function() {
    var imagesFolder = Folder.selectDialog("Select an images folder");
    if (imagesFolder != null) {
        imagesFolderPath.text = imagesFolder.fsName;
    }
};

// OK and Cancel buttons
var buttonGroup = win.add("group");
buttonGroup.orientation = "row";
var okButton = buttonGroup.add("button", undefined, "OK");
var cancelButton = buttonGroup.add("button", undefined, "Cancel");

// OK button action to start processing the function removeBackground()
okButton.onClick = function() {
    var psdFile = app.activeDocument;
    if (psdFile != null) {
        removeBackground();
    } else {
        alert("No PSD file is open.");
    }
};

// Cancel button action to exit the script
cancelButton.onClick = function() {
    win.close();
};

win.show();

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

function selectSubject() {
    var idautoCutout = stringIDToTypeID("autoCutout");
    var desc1429 = new ActionDescriptor();
    var idsampleAllLayers = stringIDToTypeID("sampleAllLayers");
    desc1429.putBoolean(idsampleAllLayers, false);
    executeAction(idautoCutout, desc1429, DialogModes.NO);
}

function copy() {
    var idcopy = charIDToTypeID("copy");
    var desc1431 = new ActionDescriptor();
    var idcopyHint = stringIDToTypeID("copyHint");
    desc1431.putString(idcopyHint, "pixels");
    executeAction(idcopy, desc1431, DialogModes.NO);
}

function makeNewLayer() {
    var idMk = charIDToTypeID("Mk  ");
    var desc1436 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref10 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref10.putClass(idLyr);
    desc1436.putReference(idnull, ref10);
    var idLyrI = charIDToTypeID("LyrI");
    desc1436.putInteger(idLyrI, 16223);
    executeAction(idMk, desc1436, DialogModes.NO);
}

function paste() {
    var idpast = charIDToTypeID("past");
    var desc1439 = new ActionDescriptor();
    var idAntA = charIDToTypeID("AntA");
    var idAnnt = charIDToTypeID("Annt");
    var idAnno = charIDToTypeID("Anno");
    desc1439.putEnumerated(idAntA, idAnnt, idAnno);
    var idAs = charIDToTypeID("As  ");
    var idPxel = charIDToTypeID("Pxel");
    desc1439.putClass(idAs, idPxel);
    executeAction(idpast, desc1439, DialogModes.NO);
}

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
