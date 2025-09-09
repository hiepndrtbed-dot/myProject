//By --Duc Hiep-- Academy Pixelz Da Nang City 
// #target photoshop;
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = app.activeDocument

//Group
function GroupLayer(nameGroup, tree) {
    switch (tree) {
        case 1:
            this.nameGroup = doc.layerSets[nameGroup]
            this.lengthGroup = this.nameGroup.layers.length
            break;
        case 2:
            // this.nameGroup = doc.layers.layerSets[nameGroup]
            // this.lengthGroup = this.nameGroup.layers.length
            break;
        default:
            break;
    }

    //Select Group
    this.selectGroup = function () {
        doc.activeLayer = this.nameGroup
    }

    //Tắt mắt Group
    this.hideGroup = function () {
        this.nameGroup.visible = false
    }

    //Mở mắt group
    this.unHiddenGroup = function () {
        this.nameGroup.visible = true
    }

    //Xóa group
    this.deleteGroup = function () {
        this.nameGroup.remove()
    }

    //Tạo group
    this.createGroup = function () {
        doc.layerSets.add().name = nameGroup
    }
}

function Layer(nameLayer) {
    this.nameLayer = nameLayer

    //Select Layer
    this.selectLayer = function () {
        doc.activeLayer = this.nameGroup
    }
}

background = new GroupLayer("background", 1)
background.hideGroup()

// Add a Color Sampler at a given x and y coordinate in the image.
var pointTop = doc.colorSamplers.add([(doc.width - 1), (doc.height - 1)]);

// Obtain array of RGB values.
var rgb = [
    pointTop.color.rgb.red,
    pointTop.color.rgb.green,
    pointTop.color.rgb.blue
]

if (rgb[0] == 255 && rgb[1] == 255 && rgb[2] == 255) {
    background.unHiddenGroup()
    doc.activeLayer = doc.artLayers.getByName("Background")
    doc.selection.selectAll()
    doc.selection.copy()
    doc.activeLayer = doc.layerSets["background"]
    pasteFoder()
    doc.activeLayer.name = "deleteBorderColorWhite"
    doc.selection.load(doc.channels.getByName("crop"))
    try { doc.channels.getByName("crop").remove() } catch (error) { }
    action("CpTL")
    doc.activeLayer.name = "tempCrop"
    doc.activeLayer = doc.layerSets["background"].artLayers["deleteBorderColorWhite"]
    doc.selection.selectAll()
    subtractFrom(99.9, 0.1, 10);
    subtractFrom(0.1, 99.9, 10);
    bounds = doc.selection.bounds
    crop(bounds[1], bounds[0], bounds[3], bounds[2])
    doc.selection.selectAll()
    doc.selection.copy()
    doc.activeLayer.remove()
    doc.activeLayer = doc.artLayers.getByName("Background")
    boundsLayer = doc.activeLayer.bounds
    crop(boundsLayer[1], boundsLayer[0], boundsLayer[3], boundsLayer[2])
    doc.activeLayer.allLocked = false
    doc.selection.selectAll()
    doc.activeLayer.clear()
    pasteFoder()
    doc.activeLayer.allLocked = true
    doc.activeLayer = doc.layerSets["background"].artLayers["tempCrop"]
    boundsLayerTemp = doc.activeLayer.bounds
    makeSelection(boundsLayerTemp[0], boundsLayerTemp[2], boundsLayerTemp[1], boundsLayerTemp[3])
    saveChannel("crop")
    doc.selection.deselect()
    doc.activeLayer.remove()
    doc.colorSamplers.removeAll()
} else {
    alert("Không cần làm!")
    background.unHiddenGroup()
    doc.colorSamplers.removeAll()
}


function makeSelection(left, right, top, bottom) {
    result = false
    try {
        //leftTop, leftBottom, rightBottom rightTop
        shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
        doc.selection.select(shapeRef)
        result = true
    } catch (error) {
    }
    return result
}

//save selection Channel
function saveChannel(name) {
    var desc977 = new ActionDescriptor();
    var ref38 = new ActionReference();
    ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
    desc977.putReference(charIDToTypeID("null"), ref38);
    desc977.putString(charIDToTypeID("Nm  "), name);
    executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO);
    return activeDocument.channels.getByName(name);
}


function pasteFoder() {
    try {
        var idpast = charIDToTypeID("past");
        var desc262 = new ActionDescriptor();
        var idinPlace = stringIDToTypeID("inPlace");
        desc262.putBoolean(idinPlace, true);
        var idAntA = charIDToTypeID("AntA");
        var idAnnt = charIDToTypeID("Annt");
        var idAnno = charIDToTypeID("Anno");
        desc262.putEnumerated(idAntA, idAnnt, idAnno);
        var idAs = charIDToTypeID("As  ");
        var idPxel = charIDToTypeID("Pxel");
        desc262.putClass(idAs, idPxel);
        executeAction(idpast, desc262, DialogModes.NO);

    } catch (e) {
        //alert("err");
    }
}

function action(action) {
    var idCpTL = charIDToTypeID(action)
    executeAction(idCpTL, undefined, DialogModes.NO)
}

function subtractFrom(horizontal, vertical, tolerance) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putUnitDouble(s2t("horizontal"), s2t("percentUnit"), horizontal);
    descriptor2.putUnitDouble(s2t("vertical"), s2t("percentUnit"), vertical);
    descriptor.putObject(s2t("to"), c2t("Pnt "), descriptor2);
    descriptor.putInteger(s2t("tolerance"), tolerance);
    descriptor.putBoolean(c2t("AntA"), true);
    executeAction(s2t("subtractFrom"), descriptor, DialogModes.NO);
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
// groupResources = new GroupLayer("Group 1 copy 2", 2)
// // doc.activeLayer = groupResources.nameGroup
// // groupResources.selectGroup()

// // groupResources.createGroup()
// alert(groupResources.lengthGroup)

// layer = new Layer("abc")


// class GroupResources {
//     constructor(nameLayer, countLayer) {
//         this.nameLayer = nameLayer
//         this.countLayer = countLayer
//     }
//     set setNameLayer(nameLayer) {
//         this.nameLayer = nameLayer
//     }
//     set setCountLayer(countLayer) {
//         this.countLayer = countLayer
//     }
//     get getNameLayer() {
//         return this.nameLayer
//     }
//     get getCountLayer() {
//         return this.countLayer
//     }
// }

// groupResources = new GroupResources("a", "b")

// alert(groupResources.getNameLayer)