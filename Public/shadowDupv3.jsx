app.preferences.rulerUnits = Units.PIXELS;
var mydoc = app.activeDocument;
var totalVar = mydoc.layers.length - 2;
// find parent Variant
var variantActive = mydoc.activeLayer;
if (variantActive.name.search("Variant") == (- 1)) {
    if (variantActive.parent.name.search("Variant") == (- 1)) {
        variantActive = variantActive.parent.parent;
    }
    else {
        variantActive = variantActive.parent;
    }
}
variantActive.visible = false;
variantActive.layerSets[1].artLayers.getByName("Stencil").visible = false;

for (var i = 0; i < totalVar; i++) {
    mainDuplicateShadow(mydoc, variantActive, i + 1);
    //mydoc.layers.getByName("Variant " + (i + 2)).visible = false;
}

mydoc.activeLayer = mydoc.layerSets["Variant 1"]
mydoc.activeLayer.visible = true

///-------------------------------------------------
function mainDuplicateShadow(mydoc, variantActive, index) {
    var layerPro = variantActive.layerSets[1];
    var layerShadow = variantActive.layerSets[2];
    var layerVar = mydoc.layers.getByName("Variant " + index);
    var grItemDes = mydoc.layers.getByName("Variant " + index).layerSets.getByName("Item " + index);
    var layerDes = mydoc.layers.getByName("Variant " + index).layerSets.getByName("Shadow " + index);
    if (layerVar.allLocked || layerVar == variantActive) { return; }
    //-----
    var arrLayer = duplicateLayers([layerShadow, layerPro], layerDes);
    arrLayer[0].link(arrLayer[1]);

    var layerProDes = null;
    for (var i = 0; i < grItemDes.artLayers.length; i++) {
        //alert(grItemDes.artLayers[i].name.search("Product"));
        if (grItemDes.artLayers[i].name.search("Product") != (- 1) && hasMask(grItemDes.artLayers[i])) {
            layerProDes = grItemDes.artLayers[i];
            break;
        }
    }
    transFormLayers(arrLayer[1], layerProDes);
    arrLayer[1].remove();
}
//------transform layer
function transFormLayers(layerOrg, layerDes) {
    app.preferences.rulerUnits = Units.PIXELS;
    var doc = app.activeDocument;
    //------get bounds layer des
    var boundsDes = layerDes.bounds;
    var widthDes = boundsDes[2] - boundsDes[0];
    var heightDes = boundsDes[3] - boundsDes[1];
    //------get bounds ORG
    var boundsOrg = layerOrg.bounds;
    var widthOrgAfter = (widthDes / (boundsOrg[2] - boundsOrg[0])) * 100;
    var heightOrgAfter = (heightDes / (boundsOrg[3] - boundsOrg[1])) * 100;
    layerOrg.resize(widthOrgAfter, heightOrgAfter);
    var moveX = boundsDes[0] - layerOrg.bounds[0];
    var moveY = boundsDes[1] - layerOrg.bounds[1];
    layerOrg.translate(moveX, moveY);
}
function duplicateLayers(arrLayersOrg, layerDes) {
    var mydoc = app.activeDocument;
    var positionDes = (layerDes.typename == "ArtLayer") ? ElementPlacement.PLACEBEFORE : ElementPlacement.INSIDE;
    if (layerDes.typename == "ArtLayer") {
    }
    var arrLayerRes = [];
    for (var i = 0; i < arrLayersOrg.length; i++) {
        var orgCopy = arrLayersOrg[i].duplicate();
        if (orgCopy.typename == "LayerSet") { orgCopy = orgCopy.merge(); }
        orgCopy.allLocked = false;
        arrLayerRes.push(orgCopy);
        orgCopy.name = "Copy " + i;
        orgCopy.move(layerDes, positionDes);
    }

    return arrLayerRes;
};



// ------ check has mask
function hasMask(layer) {
    app.activeDocument.activeLayer = layer;
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var des = executeActionGet(ref);
    return des.getBoolean(stringIDToTypeID("hasUserMask"));
}




