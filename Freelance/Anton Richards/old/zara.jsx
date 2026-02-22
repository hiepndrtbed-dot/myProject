const versionTo = " By Acad -- Version: 1.01 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument;

var widthSize = 2048;
var heightSize = 3072;

(function () {
    // ======
    var dialog = new Window("dialog");
    dialog.text = "Freelancer Academy";
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10;
    dialog.margins = 16;
    // dialog.active = true;

    // GROUP1
    // ======
    var group1 = dialog.add("group", undefined, { name: "group1" });
    group1.orientation = "column";
    group1.alignment = ["left", "center"];
    group1.spacing = 10;
    group1.margins = 0;

    var button1 = group1.add("button", undefined, undefined, { name: "OK" });
    button1.text = "** Đồ Thường Ngày ** (Space)|(1)";
    button1.alignment = ["left", "center"];
    button1.preferredSize.width = 170;
    button1.active = true;


    var button2 = group1.add("button", undefined, undefined, { name: "OK" });
    button2.text = "Áo dài, Váy dài (2)";
    button2.alignment = ["left", "center"];
    button2.preferredSize.width = 170;

    var button3 = group1.add("button", undefined, undefined, { name: "Ok" });
    button3.text = "Quần Ngắn_Chân Váy (3)";
    button3.preferredSize.width = 170;


    var button6 = group1.add("button", undefined, undefined, { name: "Cancel" });
    button6.text = "Cancel";
    button6.preferredSize.width = 170;

    var Vesion = group1.add("group", undefined, { name: "Version" })
    Vesion.orientation = "column"
    Vesion.alignChildren = ["left", "bottom"]
    Vesion.spacing = 10
    Vesion.margins = 0
    Vesion.alignment = ["left", "bottom"]

    var version = Vesion.add("statictext", undefined, undefined, { name: "version" })
    version.text = versionTo
    version.alignment = ["left", "bottom"]


    button1.addEventListener("click", function () {
        dialog.close()
        DoThuongNgay()
    })

    button2.addEventListener("click", function () {
        dialog.close()
        aoDai_VayDai()
    })

    button3.addEventListener("click", function () {
        dialog.close()
        quanNgan_chanVay()
    })


    button6.addEventListener("click", function () {
        dialog.close()
    })


    //handle list
    dialog.addEventListener("keydown", triggerBtnRun)
    function triggerBtnRun(e) {
        //alert(e.keyName)
        if (e.keyName == "1" || e.keyName == "Space" || e.keyName == "Enter") {
            button1.dispatchEvent(new Event("click"))
        }
        else if (e.keyName == "2") {
            button2.dispatchEvent(new Event("click"))
        }
        else if (e.keyName == "3") {
            button3.dispatchEvent(new Event("click"))
        }

        else if (e.keyName == "Escape") {
            button6.dispatchEvent(new Event("click"))
        }
        else if (e.keyName == "E") {
            trim_Shadow.value = false;
            trimShadow = false
        }
        else {
            alert("Input Fail!!")
        }
    }
    purgeAll()
    dialog.show();
})();


function DoThuongNgay() {
    var marginLeftRight = 245;
    var marginTopBottom = 485;
    autoCutout(true);
    var top = doc.selection.bounds[1];
    var left = doc.selection.bounds[0];
    var bottom = doc.selection.bounds[3];
    var right = doc.selection.bounds[2];
    crop(top, left, bottom, right);
    resizeImages(widthSize - 2 * marginLeftRight, heightSize - 2 * marginTopBottom);
    doc.resizeCanvas(widthSize, heightSize, AnchorPosition.MIDDLECENTER);

    //add guide
    doc.guides.add(Direction.HORIZONTAL, marginTopBottom);
    doc.guides.add(Direction.VERTICAL, marginLeftRight);
    doc.guides.add(Direction.HORIZONTAL, doc.height - marginTopBottom);
    doc.guides.add(Direction.VERTICAL, doc.width - marginLeftRight);

}


function aoDai_VayDai() {
    var marginLeftRight = 245;
    var marginTopBottom = 360;
    autoCutout(true);
    var top = doc.selection.bounds[1];
    var left = doc.selection.bounds[0];
    var bottom = doc.selection.bounds[3];
    var right = doc.selection.bounds[2];
    crop(top, left, bottom, right);
    resizeImages(widthSize - 2 * marginLeftRight, heightSize - 2 * marginTopBottom);
    doc.resizeCanvas(widthSize, heightSize, AnchorPosition.MIDDLECENTER);

    //add guide
    doc.guides.add(Direction.HORIZONTAL, marginTopBottom);
    doc.guides.add(Direction.VERTICAL, marginLeftRight);
    doc.guides.add(Direction.HORIZONTAL, doc.height - marginTopBottom);
    doc.guides.add(Direction.VERTICAL, doc.width - marginLeftRight);
}

function quanNgan_chanVay() {
    var marginLeftRight = 675;
    var marginTopBottom = 0;
    autoCutout(true);
    saveSelection("Product")
    var top = doc.selection.bounds[1];
    var left = doc.selection.bounds[0];
    var bottom = doc.selection.bounds[3];
    var right = doc.selection.bounds[2];
    crop(top, left, bottom, right);
    //leftTop, leftBottom, rightBottom rightTop
    makeSelection(0, doc.width, 50, doc.height)
    saveSelection("SelectionSubtract")
    doc.selection.load(doc.channels.getByName("Product"))
    subtractSelection("SelectionSubtract")
    crop(0, doc.selection.bounds[0], doc.height, doc.selection.bounds[2]);
    // alert(doc.width)
    // alert(widthSize - 2 * marginLeftRight)
    // alert((widthSize - 2 * marginLeftRight) / doc.width)
    doc.resizeImage(widthSize - 2 * marginLeftRight, doc.height * ((widthSize - 2 * marginLeftRight) / doc.width));
    doc.resizeCanvas(widthSize, heightSize, AnchorPosition.MIDDLECENTER);

    //add guide
    // doc.guides.add(Direction.HORIZONTAL, marginTopBottom);
    doc.guides.add(Direction.VERTICAL, marginLeftRight);
    // doc.guides.add(Direction.HORIZONTAL, doc.height - marginTopBottom);
    doc.guides.add(Direction.VERTICAL, doc.width - marginLeftRight);
}





////////////////////////////////////////

//Select subject 
function autoCutout(sampleAllLayers) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    descriptor.putBoolean(s2t("sampleAllLayers"), sampleAllLayers);
    executeAction(s2t("autoCutout"), descriptor, DialogModes.NO);
}


//trừ vung chon
function subtractSelection(selection) {
    var idSbtr = charIDToTypeID("Sbtr");
    var desc1271 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref423 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    ref423.putName(idChnl, selection);
    desc1271.putReference(idnull, ref423);
    var idFrom = charIDToTypeID("From");
    var ref424 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref424.putProperty(idChnl, idfsel);
    desc1271.putReference(idFrom, ref424);
    executeAction(idSbtr, desc1271, DialogModes.NO);
}


//save vung chon
function saveSelection(name2) {
    if (name2 != null) {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();

        reference.putProperty(s2t("channel"), s2t("selection"));
        descriptor.putReference(c2t("null"), reference);
        descriptor.putString(s2t("name"), name2);
        executeAction(s2t("duplicate"), descriptor, DialogModes.NO);
    } else {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();

        reference.putProperty(s2t("channel"), s2t("selection"));
        descriptor.putReference(c2t("null"), reference);
        executeAction(s2t("duplicate"), descriptor, DialogModes.NO);
    }
}


function resizeImages(finalWidth, finalHeight) {
    var docRef = activeDocument
    //Resize image according to shape
    var actualWidth = docRef.width;
    var actualHeight = docRef.height;
    var imgHeight = finalHeight;
    var imgWidth = actualWidth * imgHeight / actualHeight;
    if (imgWidth > finalHeight) {
        imgWidth = finalHeight;
        imgHeight = actualHeight * imgWidth / actualWidth;
    }
    docRef.resizeImage(imgWidth, imgHeight);
    docRef.resizeCanvas(finalWidth, finalHeight, AnchorPosition.MIDDLECENTER);
}

function resizeImages2(finalWidth, finalHeight) {
    var docRef = activeDocument
    //Resize image according to shape
    var actualWidth = docRef.width;
    var actualHeight = docRef.height;
    var imgHeight = finalHeight;
    var imgWidth = actualWidth * imgHeight / actualHeight;
    if (imgWidth > finalHeight) {
        imgWidth = finalHeight;
        imgHeight = actualHeight * imgWidth / actualWidth;
    }
    docRef.resizeImage(imgWidth, imgHeight);
    // docRef.resizeCanvas(finalWidth, finalHeight, AnchorPosition.MIDDLECENTER);
}

function resizeImages(finalWidth, finalHeight) {
    var docRef = activeDocument
    //Resize image according to shape
    var actualWidth = docRef.width;
    var actualHeight = docRef.height;
    var imgHeight = finalHeight;
    var imgWidth = actualWidth * imgHeight / actualHeight;
    if (imgWidth > finalHeight) {
        imgWidth = finalHeight;
        imgHeight = actualHeight * imgWidth / actualWidth;
    }
    docRef.resizeImage(imgWidth, imgHeight);
    docRef.resizeCanvas(finalWidth, finalHeight, AnchorPosition.MIDDLECENTER);
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

function makeSelection(left, right, top, bottom) {
    try {
        //leftTop, leftBottom, rightBottom rightTop
        shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
        doc.selection.select(shapeRef)
    } catch (error) { }
}

function crop(top, left, bottom, right) {
    var idCrop = charIDToTypeID("Crop")
    var desc11 = new ActionDescriptor()
    var idT = charIDToTypeID("T   ")
    var desc12 = new ActionDescriptor()
    var idTop = charIDToTypeID("Top ")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idTop, idPxl, top)
    var idLeft = charIDToTypeID("Left")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idLeft, idPxl, left)
    var idBtom = charIDToTypeID("Btom")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idBtom, idPxl, bottom)
    var idRght = charIDToTypeID("Rght")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idRght, idPxl, right)
    var idRctn = charIDToTypeID("Rctn")
    desc11.putObject(idT, idRctn, desc12)
    var idAngl = charIDToTypeID("Angl")
    var idAng = charIDToTypeID("#Ang")
    desc11.putUnitDouble(idAngl, idAng, 0.000000)
    var idDlt = charIDToTypeID("Dlt ")
    desc11.putBoolean(idDlt, false)
    var idcropAspectRatioModeKey = stringIDToTypeID("cropAspectRatioModeKey")
    var idcropAspectRatioModeClass = stringIDToTypeID("cropAspectRatioModeClass")
    var idtargetSize = stringIDToTypeID("targetSize")
    desc11.putEnumerated(idcropAspectRatioModeKey, idcropAspectRatioModeClass, idtargetSize)
    executeAction(idCrop, desc11, DialogModes.NO)
}

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
        return app.charIDToTypeID(s)
    }

    var s2t = function (s) {
        return app.stringIDToTypeID(s)
    }

    var descriptor = new ActionDescriptor()
    var reference = new ActionReference()

    reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("mask"))
    descriptor.putReference(c2t("null"), reference)
    descriptor.putBoolean(s2t("apply"), true)
    executeAction(s2t("delete"), descriptor, DialogModes.NO)
}

function purgeAll() {
    var idPrge = charIDToTypeID("Prge");
    var desc7726 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var idPrgI = charIDToTypeID("PrgI");
    var idAl = charIDToTypeID("Al  ");
    desc7726.putEnumerated(idnull, idPrgI, idAl);
    executeAction(idPrge, desc7726, DialogModes.NO);
}