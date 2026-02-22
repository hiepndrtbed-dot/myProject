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
    doc.activeLayer = doc.artLayers.getByName("Background")
    doc.selection.selectAll()
    subtractFrom(99.9, 0.1, 10);
    subtractFrom(0.1, 99.9, 10);
    bounds = doc.selection.bounds
    makeSelection(bounds[0], bounds[2], bounds[1], bounds[3])
    doc.activeLayer.allLocked = false
    addMask(), applyMask()
    doc.activeLayer.allLocked = true
    background.unHiddenGroup()
} else {
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

//add mask
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
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("channel"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putBoolean(s2t("apply"), true);
    executeAction(s2t("delete"), descriptor, DialogModes.NO);
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

