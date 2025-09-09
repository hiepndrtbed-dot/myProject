// Replace SmartObject’s Content and Save as JPG
//By Xuan Nhan
//The Newmoon Team

#target photoshop
if (app.documents.length > 0) {
    var myDocument = app.activeDocument;
    var theName = myDocument.name.match(/(.*)\.[^\.]+$/)[1];
    var thePath = myDocument.path;
    var theLayer = myDocument.activeLayer;
    var theLayers = myDocument.layers;



    // JPG Options;
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.embedColorProfile = true;
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgSaveOptions.matte = MatteType.NONE;
    jpgSaveOptions.quality = 8;


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


    var csv = File.openDialog("Please select TXT or CSV file.", "Choose File:*.txt;*.csv")
    var data = [];

    csv.open('r');

    while (!csv.eof) {
        var InputLine = csv.read();
        data.push(InputLine);
    }

    // alert(InputLine)
    csv.close();
    //var thePath = csv.path;
    //alert(thePath)
    var typeSaveAs = "";

    // Dialog choose type save
    var dlg = new Window('dialog', 'Choose format save as ', [100, 100, 480, 245]);
    dlg.alertBtnsPnl = dlg.add('panel', [45, 15, 335, 95], 'Format');
    dlg.alertBtnsPnl.jpg = dlg.alertBtnsPnl.add('radiobutton', [15, 15, 95, 35], 'JPG');
    dlg.alertBtnsPnl.png = dlg.alertBtnsPnl.add('radiobutton', [105, 15, 185, 35], 'PNG');
    dlg.alertBtnsPnl.pdf = dlg.alertBtnsPnl.add('radiobutton', [195, 15, 275, 35], 'PDF');
    dlg.alertBtnsPnl.jpg.value = true;

    dlg.btn_ok = dlg.add('button', [120, 110, 260, 50], 'OK');

    dlg.btn_ok.onClick = function () {
        if (dlg.alertBtnsPnl.jpg.value) {
            typeSaveAs = "JPG";

        }
        if (dlg.alertBtnsPnl.png.value) {
            typeSaveAs = "PNG";

        }
        if (dlg.alertBtnsPnl.pdf.value) {
            typeSaveAs = "PDF";

        }
        dlg.close();
    }
    dlg.center();
    dlg.show();

    // alert(typeSaveAs)

    var delimiter = ",";
    const headers = InputLine.slice(0, InputLine.indexOf("\n")).split(delimiter);

    const rows = InputLine.slice(InputLine.indexOf("\n") + 1).split("\n");

    for (var f in rows) {
        // break;
        data_rows = rows[f].split(",");
        if (data_rows[1]) {
            if (app.documents.length > 0) {

                var title1 = data_rows[3];
                var title2 = data_rows[4];
                var style_title = data_rows[2];
                var path_image = data_rows[1];
                var path_folder_covert = data_rows[0];
                var name_image_convert = data_rows[1];

                //var newFolder = thePath.fsName + "/" + path_folder_covert;
                if (path_folder_covert != '') {
                    var newFolder = thePath.fsName + "\\DONE" + "\\" + path_image;
                } else {
                    var newFolder = thePath.fsName + "\\DONE";
                }
                var f = new Folder(newFolder)
                if (!f.exists) {
                    f.create();
                }
                // break;
                // alert(title +"-"+style_title+"-"+path_image+"-"+num_collection)

                // Enable style_title
                myDocument.layers.getByName(style_title).visible = true;



                // Read file in folder
                var newpath = thePath.fsName + "/" + path_image + "/";
                var folder = new Folder(newpath);


                // Get all files in the current folder
                var files = folder.getFiles();

                //alert(files.length);
                var z = 0
                if (files.length >= 6) {
                    for (var i in files) {
                        if (!files[i].name.indexOf('CV')) {
                            z = z + 1;
                            var layerImage
                            _arrayRandom = arrayRandomInt(files.length, 6);

                            // Set image main

                            layerImage = myDocument.layers.getByName(style_title).layers.getByName("change_cv");
                            theLayer = replaceContents(files[i], layerImage);
                            theLayer.name = theLayer.name.replace(theLayer.name, "change_cv");
                            //

                            var arrResult = AVERAGE();
                            setSelectedLayer("change_color_bcv");
                            changeColor(1, arrResult[0], arrResult[1], arrResult[2]);
                            //alert(arrResult);
                            // Set image client
                            layerImage = myDocument.layers.getByName("back cv").layers.getByName("change_image_bcv_1");
                            theLayer = replaceContents(files[_arrayRandom[0]], layerImage);
                            theLayer.name = theLayer.name.replace(theLayer.name, "change_image_bcv_1");
                            var arrResult1 = AVERAGE();
                            // Change color canlender
                            setSelectedLayer("change_color_1");
                            changeColor(1, arrResult1[0], arrResult1[1], arrResult1[2]);

                            layerImage = myDocument.layers.getByName("back cv").layers.getByName("change_image_bcv_2");
                            theLayer = replaceContents(files[_arrayRandom[1]], layerImage);
                            theLayer.name = theLayer.name.replace(theLayer.name, "change_image_bcv_2");

                            layerImage = myDocument.layers.getByName("back cv").layers.getByName("change_image_bcv_3");
                            theLayer = replaceContents(files[_arrayRandom[2]], layerImage);
                            theLayer.name = theLayer.name.replace(theLayer.name, "change_image_bcv_3");

                            layerImage = myDocument.layers.getByName("back cv").layers.getByName("change_image_bcv_4");
                            theLayer = replaceContents(files[_arrayRandom[3]], layerImage);
                            theLayer.name = theLayer.name.replace(theLayer.name, "change_image_bcv_4");

                            layerImage = myDocument.layers.getByName("back cv").layers.getByName("change_image_bcv_5");
                            theLayer = replaceContents(files[_arrayRandom[4]], layerImage);
                            theLayer.name = theLayer.name.replace(theLayer.name, "change_image_bcv_5");

                            layerImage = myDocument.layers.getByName("back cv").layers.getByName("change_image_bcv_6");
                            theLayer = replaceContents(files[_arrayRandom[5]], layerImage);
                            theLayer.name = theLayer.name.replace(theLayer.name, "change_image_bcv_6");
                            // Change color canlender
                            var arrResult2 = AVERAGE();
                            setSelectedLayer("change_color_2");
                            changeColor(1, arrResult2[0], arrResult2[1], arrResult2[2]); //




                            // Change colors
                            // color main
                            /*    
                                var color = myDocument.layers.getByName("change_color_bcv");
                                var colorHeximage = files[i].name.split('.');
                                colorHex = colorHeximage[colorHeximage.length-2];
                                var colorRGB = hexToRgb('#'+colorHex);                     
                                theLayer = changeColor(color , Number(colorRGB[0]),Number(colorRGB[1]),Number(colorRGB[2]));
                                // color canlender
                                var color = myDocument.layers.getByName("back cv").layers.getByName("change_color_1");
                                var colorHeximage = files[_arrayRandom[0]].name.split('.');
                                colorHex = colorHeximage[colorHeximage.length-2];
                                var colorRGB = hexToRgb('#'+colorHex);
                                theLayer = changeColor(color , Number(colorRGB[0]),Number(colorRGB[1]),Number(colorRGB[2]));
                                // color canlender
                                var color = myDocument.layers.getByName("back cv").layers.getByName("change_color_2");
                                var colorHeximage = files[_arrayRandom[5]].name.split('.');
                                colorHex = colorHeximage[colorHeximage.length-2];
                                var colorRGB = hexToRgb('#'+colorHex);
                                theLayer = changeColor(color , Number(colorRGB[0]),Number(colorRGB[1]),Number(colorRGB[2]));
                         */

                            // Change title
                            myDocument.layers.getByName(style_title).layers.getByName("change_title_1").textItem.contents = title1;
                            // Change title
                            myDocument.layers.getByName(style_title).layers.getByName("change_title_2").textItem.contents = title2;

                            // Save Image converted
                            if (typeSaveAs == "JPG") {
                                myDocument.saveAs((new File(newFolder + "\\" + name_image_convert + "_" + z + ".jpg")), jpgSaveOptions, true, Extension.LOWERCASE);
                            }
                            else
                                if (typeSaveAs == "PNG") {
                                    myDocument.saveAs((new File(newFolder + "\\" + name_image_convert + "_convert_" + z + ".png")), pngOptions, true, Extension.LOWERCASE);
                                }
                                else
                                    myDocument.saveAs((new File(newFolder + "\\" + name_image_convert + "_convert_" + z + ".pdf")), pdfOptions, true, Extension.LOWERCASE);

                            // myDocument.saveAs((new File(thePath+ "/" + path_image +"_convert" + "/" + theName +"_convert_" + i + ".jpg")), jpgSaveOptions, true,Extension.LOWERCASE);

                        }
                    }
                    //Deable visible style_front cv
                    myDocument.layers.getByName(style_title).visible = false
                }
            }


        }
    }
    alert("Finish !!!");
};

// Get PSDs, TIFs and JPGs from files
function getFiles(theFile) {
    if (theFile.name.match(/\.(psd|tif|jpg)$/i) != null || theFile.constructor.name == "Folder") {
        return true
    }
};

// Replace SmartObject Contents
function replaceContents(newFile, theSO) {
    app.activeDocument.activeLayer = theSO;
    // =======================================================
    var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");
    var desc3 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc3.putPath(idnull, new File(newFile));
    var idPgNm = charIDToTypeID("PgNm");
    desc3.putInteger(idPgNm, 1);
    executeAction(idplacedLayerReplaceContents, desc3, DialogModes.NO);
    return app.activeDocument.activeLayer
};

// Change color Smart Object
function changeColor(theSO, red, green, blue) {
    //app.activeDocument.activeLayer = theSO;

    var d = new ActionDescriptor();
    var r = new ActionReference();
    r.putProperty(stringIDToTypeID("property"), stringIDToTypeID("layerEffects"));
    r.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    d.putReference(stringIDToTypeID("null"), r);
    var d1 = new ActionDescriptor();
    var d2 = new ActionDescriptor();
    var d3 = new ActionDescriptor();
    d3.putDouble(stringIDToTypeID("red"), red);
    d3.putDouble(stringIDToTypeID("green"), green);
    d3.putDouble(stringIDToTypeID("blue"), blue);
    d2.putObject(stringIDToTypeID("color"), stringIDToTypeID("RGBColor"), d3);
    d1.putObject(stringIDToTypeID("solidFill"), stringIDToTypeID("solidFill"), d2);
    d.putObject(stringIDToTypeID("to"), stringIDToTypeID("layerEffects"), d1);
    executeAction(stringIDToTypeID("set"), d, DialogModes.NO);

    return app.activeDocument.activeLayer
}

// Check layer smartoject array
function checkLayers(layers) {
    for (var m = 0; m < layers.length; m++) {
        var currentLayer = layers[m];
        if (currentLayer.kind != "LayerKind.SMARTOBJECT")
            return false;

    }
    return true;
}

// Random from min to max each number
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// Array random difference
function arrayRandomInt(total, numArray) {
    arrayTotal = []
    for (var i = 1; i < total; i++) {
        arrayTotal.push(i)
    }

    _numArray = []
    for (var i = 0; i < numArray; i++) {
        _index = Math.floor(Math.random() * arrayTotal.length);
        _numArray.push(arrayTotal[_index]);
        arrayTotal.splice(_index, 1);
    }
    return _numArray;
}

// Number total layer
function countLayerImage(layerImage) {
    _const = 0;
    for (var i = 0; i < layerImage.length; i++) {
        if (layerImage[i].name.indexOf("image") > -1) _const += 1;
    }
    return _const;
}

// Convert hex to rgb
function hexToRgb(hex) {
    return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}
// AVERAGE

function AVERAGE() {
    var layerName = "blurred";
    app.activeDocument.activeLayer.duplicate().name = layerName;
    setSelectedLayer("blurred");
    setSelectonLayer("blurred");
    app.activeDocument.activeLayer.rasterize(RasterizeType.ENTIRELAYER)
    app.activeDocument.activeLayer.applyAverage();
    setLightnessHue(10);
    //alert(1)
    setSelectonLayer("blurred");
    // remove any sample first
    app.activeDocument.colorSamplers.removeAll();
    var SB = app.activeDocument.selection.bounds;
    var s0 = SB[0].value;
    var s1 = SB[1].value;
    var s2 = SB[2].value;
    var s3 = SB[3].value;
    // Define the x and y coordinates for the pixel to sample.
    var x = (s2 - s0) / 2 + s0;
    var y = (s3 - s1) / 2 + s1;

    // Add a Color Sampler at a given x and y coordinate in the image.
    var pointTop = app.activeDocument.colorSamplers.add([(x), (y)]);

    // Obtain array of RGB values.
    var rgb = [
        pointTop.color.rgb.red,
        pointTop.color.rgb.green,
        pointTop.color.rgb.blue
    ];
    //alert('RGB: ' + rgb)
    //var r=pointTop.color.rgb.red;
    //var g=pointTop.color.rgb.green;
    //var b= pointTop.color.rgb.blue;
    pointTop.remove();
    app.activeDocument.selection.deselect();
    app.activeDocument.activeLayer.remove();

    return rgb
}
function setSelectedLayer(LayerName) {
    try {
        var id239 = charIDToTypeID("slct");
        var desc45 = new ActionDescriptor();
        var id240 = charIDToTypeID("null");
        var ref43 = new ActionReference();
        var id241 = charIDToTypeID("Lyr ");
        if (typeof LayerName == "number") ref43.putIndex(id241, LayerName);
        else ref43.putName(id241, LayerName);
        desc45.putReference(id240, ref43);
        var id242 = charIDToTypeID("MkVs");
        desc45.putBoolean(id242, false);
        executeAction(id239, desc45, DialogModes.NO);
    }
    catch (e) { }
}
function newColorLayer(red, green, blue) {

    //newLayer = app.activeDocument.artLayers.add();

    //newLayer.name = red + "," +green + "," + blue;
    //alert(red);
    newColor = new SolidColor;

    newColor.rgb.red = red;

    newColor.rgb.green = green;

    newColor.rgb.blue = blue;

    //app.activeDocument.selection.selectAll();

    app.activeDocument.selection.fill(newColor);
    changeColor(3,)


    app.activeDocument.selection.deselect();

};


function setSelectonLayer(layer) {
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
    reference2.putName(s2t("layer"), layer);
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}
function setSelectedLayer(LayerName) {
    try {
        var id239 = charIDToTypeID("slct");
        var desc45 = new ActionDescriptor();
        var id240 = charIDToTypeID("null");
        var ref43 = new ActionReference();
        var id241 = charIDToTypeID("Lyr ");
        if (typeof LayerName == "number") ref43.putIndex(id241, LayerName);
        else ref43.putName(id241, LayerName);
        desc45.putReference(id240, ref43);
        var id242 = charIDToTypeID("MkVs");
        desc45.putBoolean(id242, false);
        executeAction(id239, desc45, DialogModes.NO);
    }
    catch (e) { }
}

function setLightnessHue(number) {
    var idHStr = charIDToTypeID("HStr");
    var desc1669 = new ActionDescriptor();
    var idpresetKind = stringIDToTypeID("presetKind");
    var idpresetKindType = stringIDToTypeID("presetKindType");
    var idpresetKindCustom = stringIDToTypeID("presetKindCustom");
    desc1669.putEnumerated(idpresetKind, idpresetKindType, idpresetKindCustom);
    var idClrz = charIDToTypeID("Clrz");
    desc1669.putBoolean(idClrz, false);
    var idAdjs = charIDToTypeID("Adjs");
    var list479 = new ActionList();
    var desc1670 = new ActionDescriptor();
    var idH = charIDToTypeID("H   ");
    desc1670.putInteger(idH, 0);
    var idStrt = charIDToTypeID("Strt");
    desc1670.putInteger(idStrt, 0);
    var idLght = charIDToTypeID("Lght");
    desc1670.putInteger(idLght, number);
    var idHsttwo = charIDToTypeID("Hst2");
    list479.putObject(idHsttwo, desc1670);
    desc1669.putList(idAdjs, list479);
    executeAction(idHStr, desc1669, DialogModes.NO);
}
