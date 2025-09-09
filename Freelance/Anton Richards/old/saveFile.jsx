// #target photoshop;
app.preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
//=========== Dialog ====================//
// DIALOG
// ======
var dialog = new Window("dialog");
dialog.text = "Arrange and resize Iamges.";
dialog.orientation = "column";
dialog.alignChildren = ["center", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// GROUP1
// ======
var group1 = dialog.add("group", undefined, { name: "group1" });
group1.orientation = "row";
group1.alignChildren = ["left", "center"];
group1.spacing = 10;
group1.margins = 0;

var statictext1 = group1.add("statictext", undefined, undefined, { name: "statictext1" });
statictext1.text = "Templates";
statictext1.preferredSize.width = 100;
statictext1.justify = "right";

var button1 = group1.add("button", undefined, undefined, { name: "button1" });
button1.text = "Choose ....";
button1.preferredSize.width = 100;

// GROUP2
// ======
var group2 = dialog.add("group", undefined, { name: "group2" });
group2.orientation = "row";
group2.alignChildren = ["left", "center"];
group2.spacing = 10;
group2.margins = 0;

// PANEL1
// ======
var panel1 = group2.add("panel", undefined, undefined, { name: "panel1" });
panel1.text = "Input Row/Cols";
panel1.preferredSize.width = 236;
panel1.orientation = "column";
panel1.alignChildren = ["left", "top"];
panel1.spacing = 10;
panel1.margins = 10;

// GROUP3
// ======
var group3 = panel1.add("group", undefined, { name: "group3" });
group3.orientation = "row";
group3.alignChildren = ["left", "center"];
group3.spacing = 10;
group3.margins = 0;

var row = group3.add("statictext", undefined, undefined, { name: "row" });
row.text = "Row";
row.preferredSize.width = 100;
row.justify = "right";

var inputRow = group3.add('edittext {properties: {name: "inputRow"}}');
inputRow.preferredSize.width = 100;

// GROUP4
// ======
var group4 = panel1.add("group", undefined, { name: "group4" });
group4.orientation = "row";
group4.alignChildren = ["left", "center"];
group4.spacing = 10;
group4.margins = 0;

var cols = group4.add("statictext", undefined, undefined, { name: "cols" });
cols.text = "Cols";
cols.preferredSize.width = 100;
cols.justify = "right";

var inputCols = group4.add('edittext {properties: {name: "inputCols"}}');
inputCols.preferredSize.width = 100;

// GROUP5
// ======
var group5 = dialog.add("group", undefined, { name: "group5" });
group5.orientation = "row";
group5.alignChildren = ["left", "center"];
group5.spacing = 10;
group5.margins = 0;

// PANEL2
// ======
var panel2 = group5.add("panel", undefined, undefined, { name: "panel2" });
panel2.text = "Save";
panel2.preferredSize.width = 236;
panel2.orientation = "column";
panel2.alignChildren = ["center", "top"];
panel2.spacing = 10;
panel2.margins = 10;

// GROUP6
// ======
var group6 = panel2.add("group", undefined, { name: "group6" });
group6.orientation = "row";
group6.alignChildren = ["left", "center"];
group6.spacing = 10;
group6.margins = 0;

var JPG = group6.add("radiobutton", undefined, undefined, { name: "JPG" });
JPG.text = "JPG";
JPG.value = true;

var PNG = group6.add("radiobutton", undefined, undefined, { name: "PNG" });
PNG.text = "PNG";

var PDF = group6.add("radiobutton", undefined, undefined, { name: "PDF" });
PDF.text = "PDF";

// GROUP7
// ======
var group7 = dialog.add("group", undefined, { name: "group7" });
group7.orientation = "row";
group7.alignChildren = ["left", "center"];
group7.spacing = 10;
group7.margins = 0;

var progressbar1 = group7.add("progressbar", undefined, undefined, { name: "progressbar1" });
progressbar1.maxvalue = 100;
progressbar1.value = 50;
progressbar1.preferredSize.width = 236;
progressbar1.preferredSize.height = 2;

// GROUP8
// ======
var group8 = dialog.add("group", undefined, { name: "group8" });
group8.orientation = "row";
group8.alignChildren = ["left", "center"];
group8.spacing = 10;
group8.margins = 0;

var button2 = group8.add("button", undefined, undefined, { name: "button2" });
button2.text = "Process";

var button3 = group8.add("button", undefined, undefined, { name: "button3" });
button3.text = "Cancel";

var csv = ""
var typeSaveAs = ""
var inputR = ""
var inputC = ""
var flag = 0
//event
button1.addEventListener("click", function () {
    csv = File.openDialog("Please select Template", "Choose File:*.psd;*.csv")
})

button2.addEventListener("click", function () {
    if (JPG.value == true)
        typeSaveAs = JPG.text
    else if (PNG.value == true)
        typeSaveAs = PNG.text
    else if (PDF.value == true)
        typeSaveAs = PDF.text

    inputR = inputRow.text
    inputC = inputCols.text

    if (csv == "" || csv == null)
        alert("Select Template!")
    else if (inputR == "")
        alert("Input Row")
    else if (inputC == "")
        alert("Input Cols")
    else
        flag = 1
        dialog.close()

})
dialog.show();
//=================
if (flag == 1) {
    app.open(csv)
    const doc = app.activeDocument;
    const theName = doc.name.match(/(.*)\.[^\.]+$/)[1];
    const thePath = doc.path;
    const widthTemplate = doc.width
    const heightTemplate = doc.height
    const totalCols = inputC
    const totalRow = inputC
    const margin = 10
    const widthImageFile = (widthTemplate - margin * 2) / totalCols
    const heightImageFile = (heightTemplate - margin * 2) / totalRow
    var folderImages = new Folder(thePath + "/images");
    var folderDone = new Folder(thePath + "/done");



    doc.activeLayer = doc.layers[doc.layers.length - 1]
    doc.resizeCanvas(widthTemplate - margin * 2, heightTemplate - margin * 2, AnchorPosition.MIDDLECENTER);
    makeHistory("HistoryTemp")

    //Form start
    var lineRow = 0
    var lineCols = 0
    var topSelection = 0
    var bottomSelection = 0
    var leftSelection = 0
    var rightSelection = 0
    var randomSave = 0

    // Get all files in the current folder

    if (folderImages.exists) {
        files = folderImages.getFiles();
        for (var i in files) {
            try {
                replaceContents(unescape(thePath + "/images/" + files[i].name))
                resizeLayer(widthImageFile, heightImageFile)
                //
                topSelection = heightImageFile * lineRow
                bottomSelection = heightImageFile * lineRow + heightImageFile
                leftSelection = widthImageFile * lineCols
                rightSelection = widthImageFile * lineCols + widthImageFile
                lineCols = lineCols + 1
                makeSelection(leftSelection, rightSelection, topSelection, bottomSelection)
                Algn("ADSCentersH") // "ADSCentersV" Doc
                Algn("ADSCentersV") // "ADSCentersV" Ngang
                doc.selection.deselect()
                if (rightSelection > widthTemplate - widthImageFile) {
                    lineCols = 0
                    lineRow = lineRow + 1
                    topSelection = 0
                    bottomSelection = 0
                    leftSelection = 0
                    rightSelection = 0
                }
                if (lineRow == totalRow) {
                    doc.resizeCanvas(widthTemplate, heightTemplate, AnchorPosition.MIDDLECENTER);
                    if (!folderDone.exists) {
                        folderDone.create();
                    }
                    var pathName = thePath + "/done/" + theName
                    typeSave(pathName, typeSaveAs, randomSave)
                    randomSave = randomSave + 1
                    //Reset value
                    var lineRow = 0
                    var lineCols = 0
                    var topSelection = 0
                    var bottomSelection = 0
                    var leftSelection = 0
                    var rightSelection = 0
                    selectHistory("HistoryTemp")
                }
            } catch (error) {
                alert(error)
            }
        }
        doc.resizeCanvas(widthTemplate, heightTemplate, AnchorPosition.MIDDLECENTER);
        var pathName = thePath + "/done/" + theName
        typeSave(pathName, typeSaveAs, randomSave)
        doc.close(SaveOptions.DONOTSAVECHANGES)
    } else {
        alert("Not exits Folder images!")
    }

}


function typeSave(pathName, typeSaveAs, randomSave) {
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

    switch (typeSaveAs) {
        case "PNG":
            doc.saveAs((new File(pathName + "_" + randomSave + ".png")), pngOptions, true, Extension.LOWERCASE);
            break;

        case "PDF":
            doc.saveAs((new File(pathName + "_" + randomSave + ".pdf")), pdfOptions, true, Extension.LOWERCASE);
            break;

        default:
            doc.saveAs((new File(pathName + "_" + randomSave + ".jpg")), jpgSaveOptions, true, Extension.LOWERCASE);
            break;
    }
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
//Resize layer
function resizeLayer(width, height) {
    WIDTH = width;
    HEIGHT = height;
    bounds = activeDocument.activeLayer.bounds;
    layerWidth = bounds[2].as('px') - bounds[0].as('px');
    layerHeight = bounds[3].as('px') - bounds[1].as('px');
    layerRatio = layerWidth / layerHeight;
    newWidth = WIDTH;
    newHeight = ((1.0 * WIDTH) / layerRatio);
    if (newHeight >= HEIGHT) {
        newWidth = layerRatio * HEIGHT;
        newHeight = HEIGHT;
    }
    resizePercent = newWidth / layerWidth * 100;
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.BOTTOMLEFT);
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

function makeSelection(left, right, top, bottom) {
    try {
        //leftTop, leftBottom, rightBottom rightTop
        shapeRef = [
            [left, top],
            [left, bottom],
            [right, bottom],
            [right, top]
        ];
        doc.selection.select(shapeRef)
    } catch (error) { }
}

function makeHistory(name2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putClass(s2t("snapshotClass"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putProperty(c2t("HstS"), s2t("currentHistoryState"));
    descriptor.putReference(s2t("from"), reference2);
    descriptor.putString(s2t("name"), name2);
    descriptor.putEnumerated(s2t("using"), c2t("HstS"), s2t("fullDocument"));
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

function selectHistory(nameHistory) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putName(s2t("snapshotClass"), nameHistory);
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

function deleteSnapShot(name) {
    var desc381 = new ActionDescriptor();
    var ref21 = new ActionReference();
    ref21.putName(charIDToTypeID("SnpS"), name);
    desc381.putReference(charIDToTypeID("null"), ref21);
    executeAction(charIDToTypeID("Dlt "), desc381, DialogModes.NO);
}
/* 
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

var newFolder = thePath.fsName + "\\hiep";
var f = new Folder(newFolder)
f.create()

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
csv.close();

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

// Save Image converted
if (typeSaveAs == "JPG") {
    myDocument.saveAs((new File(newFolder + "\\" + name_image_convert + "_" + z + ".jpg")), jpgSaveOptions, true, Extension.LOWERCASE);
}
else if (typeSaveAs == "PNG") {
    myDocument.saveAs((new File(newFolder + "\\" + name_image_convert + "_convert_" + z + ".png")), pngOptions, true, Extension.LOWERCASE);
}
else
    myDocument.saveAs((new File(newFolder + "\\" + name_image_convert + "_convert_" + z + ".pdf")), pdfOptions, true, Extension.LOWERCASE); */