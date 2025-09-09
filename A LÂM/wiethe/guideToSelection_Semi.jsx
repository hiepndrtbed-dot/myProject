// alert(activeDocument.pathItems.length);
// activeDocument.selection.load(activeDocument.pathItems.getByName('Work Path'));
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument
var guide = doc.guides
    // var g1 = doc.guides[0].coordinate
    // var g2 = doc.guides[1].coordinate 
    // var direct = doc.guides[1].direction
    ; (function () {
        insert3D("1")
    })()

function insert3D(vr) {

    var coordGuide = checkGuides()
    var widthDoc = doc.width
    grResource = doc.layerSets["Resources"]
    grVariant = doc.layerSets["Variant " + vr]
    grColor = grVariant.layerSets["Color " + vr]
    grItem = grVariant.layerSets["Item " + vr]
    grShadow = grVariant.layerSets["Shadow " + vr]
    grBg = grVariant.layerSets["Background " + vr]
    // / / / leftTop, leftBottom, rightBottom rightTop
    if (coordGuide != null) {
        var shapeRef = [[0, 0], [0, coordGuide], [widthDoc, coordGuide], [widthDoc, 0]];
        doc.selection.select(shapeRef)
        doc.activeLayer = grItem.artLayers["#SEMI"]
        // selectMask()
        fillColor(0, 0, 0)
    } else {
        // alert("khong co guide")
    }


}

function checkGuides() {
    var lengthGuide = guide.length
    for (var i = 0; i < lengthGuide; i++) {
        if (guide[i].direction == "Direction.HORIZONTAL") {
            var coordGuide = guide[i].coordinate
            break
        }else{
            coordGuide = null
        }
    }
    return coordGuide
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

function fillColor(red, green, blue) {
    var myColor = new SolidColor()
    myColor.rgb.red = red // 0 - 255
    myColor.rgb.green = green
    myColor.rgb.blue = blue
    activeDocument.selection.fill(myColor)
}