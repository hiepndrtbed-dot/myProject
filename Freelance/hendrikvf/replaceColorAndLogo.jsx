var UrlFolderTemplate = "D:/freelance/FIVER/Job 7/template"
var UrlFolderLogo = "D:/freelance/FIVER/Job 7/logo"
var color = "aa0e0e";
var UrlFolderOutput = "D:/freelance/FIVER/Job 7/output"


var template = new Folder(UrlFolderTemplate);
var logo = new Folder(UrlFolderLogo);
var output = new Folder(UrlFolderOutput);
// var template = new File(Url);


var fileTemplate = template.getFiles()
var fileLogo = logo.getFiles()

for (var i in fileTemplate) {
    // alert(flag)

    // Get the file extension
    var fileExtension = fileTemplate[i].name.split('.').pop().toLowerCase();

    // Only process PNG and JPG files
    if (fileExtension === 'psd') {
        app.open(fileTemplate[i])

        // Reset unit to Pixels
        preferences.rulerUnits = Units.PIXELS;
        app.preferences.typeunits = TypeUnits.PIXELS;
        var doc = activeDocument;
        for (var y in fileLogo) {
            // Kiểm tra phần mở rộng của tệp tin
            var extensionLogo = fileLogo[y].name.split('.').pop().toLowerCase();
            if (extensionLogo === 'png'|| extensionLogo === 'jpg' ||  extensionLogo === 'jpeg') {
                {
                    doc.activeLayer = doc.layerSets["Mockup Setting"].layerSets["Editable Part"].artLayers["Logo"];
                    placedLayerReplaceContents(logo + "/" + fileLogo[y].name);
                    doc.activeLayer = doc.layerSets["Mockup Setting"].layerSets["Editable Part"].artLayers["Color"];
                    var colorRGB = hexToRgb('#' + color);
                    setColorFill(colorRGB[0], colorRGB[1], colorRGB[2])
                    saveImage(output, "PNG", fileTemplate[i].name.split('.')[0] + "_" + fileLogo[y].name.split('.')[0]);
                }
            }
        }
        doc.close(SaveOptions.DONOTSAVECHANGES);
        // break
    }
}

function saveImage(pathName, typeSaveAs, randomSave) {
    //PNG Options
    pngOptions = new PNGSaveOptions();
    pngOptions.compression = 8;
    pngOptions.interlaced = false;

    // Set the options for Save for Web
    var saveForWebOptions = new ExportOptionsSaveForWeb();
    saveForWebOptions.format = SaveDocumentType.JPEG;
    saveForWebOptions.quality = 55; // Adjust the quality as needed

    switch (typeSaveAs.toString()) {
        case "PNG":
            doc.saveAs((new File(pathName + "/" + randomSave + ".png")), pngOptions, true, Extension.LOWERCASE);
            break;
        default:
            doc.saveAs((new File(pathName + "/" + randomSave + ".jpg")), jpgSaveOptions, true, Extension.LOWERCASE);
            break;
    }
}

function setColorFill(red, Grn, blue) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("contentLayer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor3.putDouble(s2t("red"), red);
    descriptor3.putDouble(c2t("Grn "), Grn);
    descriptor3.putDouble(s2t("blue"), blue);
    descriptor2.putObject(s2t("color"), s2t("RGBColor"), descriptor3);
    descriptor.putObject(s2t("to"), s2t("solidColorLayer"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

function placedLayerReplaceContents(file) {
    var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");
    var desc365 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc365.putPath(idnull, new File(file));
    // alert(file)
    // alert(new File("D:\\freelance\\FIVER\\Job 7\\logo\\Design ohne Titel (86).png"))
    executeAction(idplacedLayerReplaceContents, desc365, DialogModes.NO);
}

// Convert hex to rgb
function hexToRgb(hex) {
    return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}
