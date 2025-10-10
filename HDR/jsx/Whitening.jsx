//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS;

var nameLayer = "BLACK && WHITE";
var feather = 1;
var hueValue = -90;
var middleLevelsValue = 1.2;
var destWhiteMin = 230;
var nameChannel = "Tran_ChiPhao";

if (!hasSelection()) {
    alert("Chua co vung chon!");
} else {
    try {
        doc.activeLayer = doc.artLayers["MERGE 1"];
    } catch (error) {
        doc.activeLayer = doc.backgroundLayer;
    }
    if (!checkSelectionName(nameChannel)) {
        saveAlphaChnl(nameChannel);
        doc.selection.feather(feather);
        layerViaCopy(nameLayer);
        applyHueSat(0, hueValue, 0);   // Hue=0, Saturation=-90, Lightness=0
        activeDocument.activeLayer.adjustLevels(0, 255, middleLevelsValue, 0, 255)
        blendingOptions(0, 0, 255, 255, 0, 0, destWhiteMin, 255);// blendingOptions(0, 47, 189, 255, 0, 36, 233, 255);
        setColorLayer("Bl  ");
        doc.activeLayer.move(doc.layers[0], ElementPlacement.PLACEBEFORE);
    } else {
        addSelectionToChannelName(nameChannel);
        doc.selection.feather(feather);
        layerViaCopy(nameLayer);
        applyHueSat(0, hueValue, 0);   // Hue=0, Saturation=-90, Lightness=0
        activeDocument.activeLayer.adjustLevels(0, 255, middleLevelsValue, 0, 255)
        doc.activeLayer.move(doc.layers.getByName(nameLayer), ElementPlacement.PLACEBEFORE);
        doc.activeLayer.merge();
    }
}
