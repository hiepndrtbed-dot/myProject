//#target photoshop
//
// RemoveWhite.jsx
//

//
// Generated Wed Feb 22 2023 22:13:19 GMT+0530
//

cTID = function(s) {
    return app.charIDToTypeID(s);
};
sTID = function(s) {
    return app.stringIDToTypeID(s);
};


    // Ask the user to select an input image folder
 var inputFolder = Folder.selectDialog("Select the input image folder");
    if (inputFolder != null) {
        // Get all PNG and JPG files in the input folder
        var inputFiles = inputFolder.getFiles(/\.(png|jpg|tif)$/i);

        if (inputFiles.length > 0) {
            // Create a new folder for output
            var outputFolder = new Folder(inputFolder + "/output");
            if (!outputFolder.exists) {
                outputFolder.create();
            }

            // Loop through all input files
            for (var i = 0; i < inputFiles.length; i++) {
                var inputFile = inputFiles[i];
                if (!(inputFile instanceof File)) {
                    continue;
                }
                var doc=app.open(inputFile);
                var fileExtension = inputFile.name.split('.').pop().toLowerCase();
                if (fileExtension !== 'png' && fileExtension !== 'tif' && fileExtension !== 'tiff') {
                    if(checkImage())removeWhite();
                }
                doc.resizeImage(UnitValue(768,"px"),null,null);
                // Save the modified image as a JPEG using the Save For Web system
                var outputFilename = outputFolder + "/" + inputFile.name.replace(/\.(png|jpg|tif)$/i, ".jpg");
                var save = new ExportOptionsSaveForWeb();
                save.format = SaveDocumentType.JPEG;
                save.includeProfile = false;
                save.interlaced = false;
                save.optimized = true;
                save.quality = 100;
                activeDocument.exportDocument(new File(outputFilename), ExportType.SAVEFORWEB, save);
                activeDocument.close (SaveOptions.DONOTSAVECHANGES);
            }
            alert("Work Complete");
        } else {
            alert("No PNG or JPG files found in the input folder.");
        }
    }




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


//
//==================== RemoveWhite ==============
//
function removeWhite() {
  // Layer Via Copy
  function step1(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    executeAction(sTID('copyToLayer'), undefined, dialogMode);
  };

  // Filter Gallery
  function step2(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var list1 = new ActionList();
    var desc2 = new ActionDescriptor();
    desc2.putEnumerated(cTID('GEfk'), cTID('GEft'), cTID('Crsh'));
    desc2.putInteger(cTID('StrL'), 3);
    desc2.putInteger(cTID('Shrp'), 15);
    desc2.putInteger(sTID("strengthPlugin"), 1);
    list1.putObject(cTID('GEfc'), desc2);
    var desc3 = new ActionDescriptor();
    desc3.putEnumerated(cTID('GEfk'), cTID('GEft'), cTID('SprS'));
    desc3.putInteger(cTID('StrL'), 12);
    desc3.putInteger(cTID('SprR'), 7);
    desc3.putEnumerated(cTID('SDir'), cTID('StrD'), cTID('SDRD'));
    desc3.putInteger(cTID('FlRs'), 995368691);
    desc3.putBoolean(cTID('GELv'), false);
    list1.putObject(cTID('GEfc'), desc3);
    desc1.putList(cTID('GEfs'), list1);
    executeAction(1195730531, desc1, dialogMode);
  };

  // Brightness/Contrast
  function step3(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putInteger(cTID('Brgh'), 20);
    desc1.putInteger(cTID('Cntr'), -50);
    desc1.putBoolean(sTID("useLegacy"), false);
    executeAction(sTID('brightnessEvent'), desc1, dialogMode);
  };

  // Select Subject
  function step4(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putBoolean(sTID("sampleAllLayers"), false);
    executeAction(sTID('autoCutout'), desc1, dialogMode);
  };

  // Delete
  function step5(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var list1 = new ActionList();
    list1.putInteger(21);
    desc1.putList(cTID('LyrI'), list1);
    executeAction(cTID('Dlt '), desc1, dialogMode);
  };

  // Make
  function step6(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putClass(cTID('Nw  '), cTID('Chnl'));
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Msk '));
    desc1.putReference(cTID('At  '), ref1);
    desc1.putEnumerated(cTID('Usng'), cTID('UsrM'), cTID('RvlS'));
    executeAction(cTID('Mk  '), desc1, dialogMode);
  };

  step1();      // Layer Via Copy
  step2();      // Filter Gallery
  step3();      // Brightness/Contrast
  step4();      // Select Subject
  step5();      // Delete
  step6();      // Make
};