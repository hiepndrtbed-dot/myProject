// #target photoshop;
app.preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS

var csv = File.openDialog("Please select Template", "Choose File:*.psd;*.csv")
app.open(csv)
var doc = app.activeDocument;
var theName = doc.name.match(/(.*)\.[^\.]+$/)[1];
var thePath = doc.path;
var theLayer = doc.activeLayer;
var theLayers = doc.layers;

const widthTemplate = doc.width
const heightTemplate = doc.height
const totalRow = 7
const totalCols = 5

const widthImageFile = (widthTemplate - 40) / totalRow
const heightImageFile = (heightTemplate - 40) / totalCols

var folderImages = new Folder(thePath + "/images");
var folderDone = new Folder(thePath + "/done");

//Form start
var topSelection = 0
var bottomSelection = 0
var leftSelection = 0
var rightSelection = 0
var flag = 0
// Get all files in the current folder
if (folderImages.exists) {
    files = folderImages.getFiles();
    for (var i in files) {
        replaceContents(unescape(thePath + "/images/" + files[i].name))
        resizeLayer(widthImageFile, heightImageFile)
        if (i == 0) {
            topSelection = 20
            bottomSelection = 20 + heightImageFile
            leftSelection = 20
            rightSelection = 20 + widthImageFile
            flag = flag + 1
            makeSelection(leftSelection, rightSelection, topSelection, bottomSelection)
            Algn("ADSCentersH") // "ADSCentersV" Doc
            Algn("ADSCentersV") // "ADSCentersV" Ngang
            doc.selection.deselect()
        } else {
            //
            if (flag / totalRow < 1) {
                topSelection = topSelection
                bottomSelection = bottomSelection
                leftSelection = leftSelection + widthImageFile
                rightSelection = rightSelection + widthImageFile
                flag = flag + 1
                makeSelection(leftSelection, rightSelection, topSelection, bottomSelection)
                Algn("ADSCentersH") // "ADSCentersV" Doc
                Algn("ADSCentersV") // "ADSCentersV" Ngang
                doc.selection.deselect()
            }
            //
            // if (flag / totalRow < 2) {  
            //     topSelection = topSelection
            //     bottomSelection = bottomSelection + a
            //     leftSelection = leftSelection
            //     rightSelection = rightSelection
            //     flag = flag + 1
            // }
            //




        }
    }
} else {
    alert("Not exits Folder images!")
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
    cTID = function (s) { return app.charIDToTypeID(s); };
    sTID = function (s) { return app.stringIDToTypeID(s); };
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
        shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
        doc.selection.select(shapeRef)
    } catch (error) {
    }
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