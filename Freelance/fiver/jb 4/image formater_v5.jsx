// Check if there is an open document
if (app.documents.length > 0) {
    // Ask the user to select an input image folder
    var inputFolder = Folder.selectDialog("Select the input image folder");

    if (inputFolder != null) {
        // Get all PNG and JPG files in the input folder
        var inputFiles = inputFolder.getFiles(/\.(png|jpg)$/i);

        if (inputFiles.length > 0) {
            // Create a new folder for output
            var outputFolder = new Folder(inputFolder + "/output");
            if (!outputFolder.exists) {
                outputFolder.create();
            }

            // Open the input file
            var doc = activeDocument;
            var horG = [];
            var varG = [];
            // Get horizontal guides
            var guides = doc.guides;
            for (var g = 0; g < guides.length; g++) {
                if (guides[g].direction.toString() == 'Direction.HORIZONTAL') {
                    horG.push(parseInt(guides[g].coordinate.value));
                } else {
                    varG.push(parseInt(guides[g].coordinate.value));
                }
            }
            var left = varG[0];
            var right = varG[1];
            var btom = horG[0];
            var top = 0;

            // Loop through all input files
            for (var i = 0; i < inputFiles.length; i++) {
                var inputFile = inputFiles[i];
                if (!(inputFile instanceof File)) {
                    continue;
                }
                earrisBg(inputFile);
                if (decodeURI(inputFile.name).indexOf('.png') != -1) {
                    if (checkImage()) {
                        makeSelection(top, left, btom, right);
                        ftof();
                        bea();
                        doc.selection.deselect();
                    }
                } else {
                    if (checkImage()) {
                        removeWhite();
                        var thisLayer = activeDocument.activeLayer;
                        makeSelection(top, left, btom, right);
                        ftof();
                        bea();
                        doc.selection.deselect();
                    }
                }
                // Save the modified image as a JPEG using the Save For Web system
                var outputFilename = outputFolder + "/" + inputFile.name.replace(/\.(png|jpg)$/i, ".jpg");
                var save = new ExportOptionsSaveForWeb();
                save.format = SaveDocumentType.JPEG;
                save.includeProfile = false;
                save.interlaced = false;
                save.optimized = true;
                save.quality = 100;
                doc.exportDocument(new File(outputFilename), ExportType.SAVEFORWEB, save);
                activeDocument.activeLayer.remove();
            }
            alert("Work Complete")
        } else {
            alert("No PNG or JPG files found in the input folder.");
        }
    }
} else {
    alert("There is no open document.");
}

function makeSelection(top, left, btom, right) {
    // Set
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(charIDToTypeID('Top '), charIDToTypeID('#Pxl'), top);
    desc2.putUnitDouble(charIDToTypeID('Left'), charIDToTypeID('#Pxl'), left);
    desc2.putUnitDouble(charIDToTypeID('Btom'), charIDToTypeID('#Pxl'), btom);
    desc2.putUnitDouble(charIDToTypeID('Rght'), charIDToTypeID('#Pxl'), right);
    desc1.putObject(charIDToTypeID('T   '), charIDToTypeID('Rctn'), desc2);
    executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
};

function earrisBg(placeFilePath) {
    // Place

    var desc1 = new ActionDescriptor();
    desc1.putInteger(charIDToTypeID('Idnt'), 13953);
    desc1.putPath(charIDToTypeID('null'), new File(placeFilePath));
    desc1.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), stringIDToTypeID("QCSAverage"));
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
    desc2.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
    desc1.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc2);
    var desc3 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putIdentifier(charIDToTypeID('Lyr '), 13944);
    desc3.putReference(charIDToTypeID('From'), ref1);
    var ref2 = new ActionReference();
    ref2.putIdentifier(charIDToTypeID('Lyr '), 13953);
    desc3.putReference(charIDToTypeID('T   '), ref2);
    desc1.putObject(stringIDToTypeID("replaceLayer"), charIDToTypeID('Plc '), desc3);
    executeAction(charIDToTypeID('Plc '), desc1, DialogModes.NO);
    rasterizeLayer();
};



function rasterizeLayer() {
    var idrasterizeLayer = stringIDToTypeID("rasterizeLayer");
    var desc = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref.putEnumerated(idLyr, idOrdn, idTrgt);
    desc.putReference(idnull, ref);
    executeAction(idrasterizeLayer, desc, DialogModes.NO);
}

function ftof() {
    var oldPref = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;
    var doc = activeDocument;
    var iLayer = doc.activeLayer;
    var mLayerB = app.activeDocument.selection.bounds
    // doc.activeLayer = iLayer;
    var scale = Math.min((mLayerB[2] - mLayerB[0]) / (iLayer.bounds[2] - iLayer.bounds[0]), (mLayerB[3] - mLayerB[1]) / (iLayer.bounds[3] - iLayer.bounds[1]));
    iLayer.resize(scale * 100, scale * 100);
    iLayer.translate(((mLayerB[0] + mLayerB[2]) / 2) - ((iLayer.bounds[0] + iLayer.bounds[2]) / 2), ((mLayerB[1] + mLayerB[3]) / 2) - ((iLayer.bounds[1] + iLayer.bounds[3]) / 2));

};

function bea() {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    desc1.putEnumerated(charIDToTypeID('Usng'), charIDToTypeID('ADSt'), stringIDToTypeID("ADSBottoms"));
    desc1.putBoolean(stringIDToTypeID("alignToCanvas"), false);
    executeAction(charIDToTypeID('Algn'), desc1, DialogModes.NO);
};

function removeWhite() {
    // Layer Via Copy

    executeAction(stringIDToTypeID('copyToLayer'), undefined, DialogModes.NO);


    // Make

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(charIDToTypeID('AdjL'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var desc2 = new ActionDescriptor();
    var desc3 = new ActionDescriptor();
    desc3.putEnumerated(stringIDToTypeID("presetKind"), stringIDToTypeID("presetKindType"), stringIDToTypeID("presetKindDefault"));
    desc2.putObject(charIDToTypeID('Type'), charIDToTypeID('Lvls'), desc3);
    desc1.putObject(charIDToTypeID('Usng'), charIDToTypeID('AdjL'), desc2);
    executeAction(charIDToTypeID('Mk  '), desc1, DialogModes.NO);


    // Set

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('AdjL'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putEnumerated(stringIDToTypeID("presetKind"), stringIDToTypeID("presetKindType"), stringIDToTypeID("presetKindCustom"));
    var list1 = new ActionList();
    var desc3 = new ActionDescriptor();
    var ref2 = new ActionReference();
    ref2.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Cmps'));
    desc3.putReference(charIDToTypeID('Chnl'), ref2);
    var list2 = new ActionList();
    list2.putInteger(216);
    list2.putInteger(218);
    desc3.putList(charIDToTypeID('Inpt'), list2);
    list1.putObject(charIDToTypeID('LvlA'), desc3);
    desc2.putList(charIDToTypeID('Adjs'), list1);
    desc1.putObject(charIDToTypeID('T   '), charIDToTypeID('Lvls'), desc2);
    executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);


    // Select

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), stringIDToTypeID("RGB"));
    desc1.putReference(charIDToTypeID('null'), ref1);
    desc1.putBoolean(charIDToTypeID('MkVs'), false);
    executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);


    // Select

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Bckw'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    desc1.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("addToSelection"));
    desc1.putBoolean(charIDToTypeID('MkVs'), false);
    var list1 = new ActionList();
    list1.putInteger(31);
    list1.putInteger(32);
    desc1.putList(charIDToTypeID('LyrI'), list1);
    executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);


    // Merge Layers

    var desc1 = new ActionDescriptor();
    executeAction(stringIDToTypeID('mergeLayersNew'), desc1, DialogModes.NO);


    // Select Subject

    var desc1 = new ActionDescriptor();
    desc1.putBoolean(stringIDToTypeID("sampleAllLayers"), false);
    executeAction(stringIDToTypeID('autoCutout'), desc1, DialogModes.NO);


    // Smooth

    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(charIDToTypeID('Rds '), charIDToTypeID('#Pxl'), 6);
    desc1.putBoolean(stringIDToTypeID("selectionModifyEffectAtCanvasBounds"), false);
    executeAction(charIDToTypeID('Smth'), desc1, DialogModes.NO);


    // Delete

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var list1 = new ActionList();
    list1.putInteger(32);
    desc1.putList(charIDToTypeID('LyrI'), list1);
    executeAction(charIDToTypeID('Dlt '), desc1, DialogModes.NO);

    // Layer Via Copy
    executeAction(stringIDToTypeID('copyToLayer'), undefined, DialogModes.NO);


    // Select

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Bckw'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    desc1.putBoolean(charIDToTypeID('MkVs'), false);
    var list1 = new ActionList();
    list1.putInteger(12);
    desc1.putList(charIDToTypeID('LyrI'), list1);
    executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);


    // Select Subject

    var desc1 = new ActionDescriptor();
    desc1.putBoolean(stringIDToTypeID("sampleAllLayers"), false);
    executeAction(stringIDToTypeID('autoCutout'), desc1, DialogModes.NO);


    // Make

    var desc1 = new ActionDescriptor();
    desc1.putClass(charIDToTypeID('Nw  '), charIDToTypeID('Chnl'));
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk '));
    desc1.putReference(charIDToTypeID('At  '), ref1);
    desc1.putEnumerated(charIDToTypeID('Usng'), charIDToTypeID('UsrM'), charIDToTypeID('RvlS'));
    executeAction(charIDToTypeID('Mk  '), desc1, DialogModes.NO);

    // Select
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Frwr'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    desc1.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("addToSelection"));
    desc1.putBoolean(charIDToTypeID('MkVs'), false);
    var list1 = new ActionList();
    list1.putInteger(11);
    list1.putInteger(10);
    desc1.putList(charIDToTypeID('LyrI'), list1);
    executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);

    // Merge Layers

    var desc1 = new ActionDescriptor();
    executeAction(stringIDToTypeID('mergeLayersNew'), desc1, DialogModes.NO);

};

function checkImage() {
    var doc = activeDocument;
    var docW = doc.width.as('px');
    var docH = doc.height.as('px');
    var col1 = doc.colorSamplers.add([5, 5]);
    var col1Color = veryFyColor(col1.color.rgb);
    col1.remove();
    var col2 = doc.colorSamplers.add([5, docW - 5]);
    var col2Color = veryFyColor(col2.color.rgb);
    col2.remove();
    var col3 = doc.colorSamplers.add([docH - 1, 5]);
    var col3Color = veryFyColor(col3.color.rgb);
    col3.remove();
    var col4 = doc.colorSamplers.add([docH - 1, docW - 5]);
    var col4Color = veryFyColor(col4.color.rgb);
    col4.remove();

    return (col1Color && col2Color && col3Color && col4Color)

    function veryFyColor(col) {
        if (col.red > 200 && col.green > 200 && col.blue > 200) {
            return true
        } else {
            return false
        }
    }
}