const versionTo = " By Acad -- Version: 1.02 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument;

(function () {
    var flagLogin = new File("//172.16.2.2/Academy/Hiep/log.txt")
    if (flagLogin.exists) {
        main()
        // alert("2")
    }
})()
// main()
function main() {
    var flag = 0

    if (hasSelection()) {
        flag = 1
    } else if (workPathExists()) {
        doc.pathItems.getByName("Work Path").deselect()
        doc.pathItems.getByName("Work Path").makeSelection()
        action("Fthr")
        flag = 1
        doc.pathItems.getByName("Work Path").remove()
    } else {
        alert("Thiếu vùng chọn!")
    }
    //Processing
    if (flag == 1) {
        create_new_layer("Fill");
        // action("Mrg2");
        mergeLayer()
        addMask()
        unlinkMask()
        selectRGB()
        InteractiveTransform()
        loadSelectionMask()
        toSelection(doc.selection.bounds[0],doc.selection.bounds[2],doc.selection.bounds[1],doc.selection.bounds[3])
        doc.selection.expand(20)
        InteractiveTransform()
        doc.selection.deselect()
        selectMask()
        selectBrushTool()
    }
}


// function CREATE NEW LAYER (layername)
// --------------------------------------------------------
function create_new_layer(layername) {
    if (layername == undefined) layername = "Layer";

    // create new layer at top of layers
    var originalLayer = app.activeDocument.activeLayer;
    var layerRef = app.activeDocument.artLayers.add();

    // name it & set blend mode to normal
    layerRef.name = layername;
    layerRef.blendMode = BlendMode.NORMAL;

    // Move the layer belowm
    // layerRef.moveAfter(originalLayer);

    // Move the layer above if you desire
    layerRef.moveBefore(originalLayer);
}

function action(action) {
    var idCpTL = charIDToTypeID(action)
    executeAction(idCpTL, undefined, DialogModes.NO)
}

//kiem tra ton tai  ten path
function workPathExists() {
    var result = false;
    lengthPath = doc.pathItems.length
    try {
        if (String(activeDocument.pathItems[lengthPath - 1].name) == "Work Path") {
            result = true;
        }
    } catch (error) {
        result = false;
    }
    return result;
}


function toSelection(left, right, top, bottom) {
    try {
        //eftTop, leftBottom, rightBottom rightTop
        var shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
        doc.selection.select(shapeRef)
    } catch (error) {
    }
}

function hasSelection() {
    var hasSelection = false;
    var ref = new ActionReference();
    ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("selection"));
    ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    var desc = executeActionGet(ref);
    if (desc.count) hasSelection = true;
    return hasSelection;
}

function selectBrushTool() {
    // =======================================================
    var idslct = charIDToTypeID("slct");
    var desc240 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref98 = new ActionReference();
    var idPbTl = charIDToTypeID("PbTl");
    ref98.putClass(idPbTl);
    desc240.putReference(idnull, ref98);
    executeAction(idslct, desc240, DialogModes.NO);

    // =======================================================
    var idRset = charIDToTypeID("Rset");
    var desc241 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref99 = new ActionReference();
    var idClr = charIDToTypeID("Clr ");
    var idClrs = charIDToTypeID("Clrs");
    ref99.putProperty(idClr, idClrs);
    desc241.putReference(idnull, ref99);
    executeAction(idRset, desc241, DialogModes.NO);
}

function mergeLayer() {
    var idMrgV = charIDToTypeID("MrgV");
    var desc2921 = new ActionDescriptor();
    var idDplc = charIDToTypeID("Dplc");
    desc2921.putBoolean(idDplc, true);
    executeAction(idMrgV, desc2921, DialogModes.NO);
}

function unlinkMask(enabled, withDialog) {
    // Generated Fri Sep 01 2023 11:52:41 GMT+0700
    //

    cTID = function (s) { return app.charIDToTypeID(s); };
    sTID = function (s) { return app.stringIDToTypeID(s); };
    if (enabled != undefined && !enabled)
        return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putBoolean(cTID('Usrs'), false);
    desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
    executeAction(cTID('setd'), desc1, dialogMode);
};

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

function InteractiveTransform() {
    try {
        app.runMenuItem(charIDToTypeID("FrTr"));
    } catch (error) { }
}

function selectRGB() {
    var idslct = charIDToTypeID("slct");
    var desc7 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref2 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idRGB = charIDToTypeID("RGB ");
    ref2.putEnumerated(idChnl, idChnl, idRGB);
    desc7.putReference(idnull, ref2);
    var idMkVs = charIDToTypeID("MkVs");
    desc7.putBoolean(idMkVs, false);
    executeAction(idslct, desc7, DialogModes.NO);
}


//load selection mask
function loadSelectionMask() {
    var idsetd = charIDToTypeID("setd");
    var desc32 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref14 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref14.putProperty(idChnl, idfsel);
    desc32.putReference(idnull, ref14);
    var idT = charIDToTypeID("T   ");
    var ref15 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref15.putEnumerated(idChnl, idChnl, idMsk);
    desc32.putReference(idT, ref15);
    executeAction(idsetd, desc32, DialogModes.NO);
}


function selectMask() {
    var idslct = charIDToTypeID("slct");
    var desc444 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref248 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref248.putEnumerated(idChnl, idChnl, idMsk);
    desc444.putReference(idnull, ref248);
    var idMkVs = charIDToTypeID("MkVs");
    desc444.putBoolean(idMkVs, false);
    executeAction(idslct, desc444, DialogModes.NO);
}