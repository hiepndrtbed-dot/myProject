//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
const versionTo = " By Acad -- Version 1.5 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;

(function () {
    //check layer tren layer replaceColor
    checkNameLayerToMger();
    if (doc.layers[doc.layers.length - 2].name != "replaceColor") {
        try {
            doc.activeLayer = doc.artLayers["MERGE 1"];
        } catch (error) {
            doc.activeLayer = doc.backgroundLayer;
        }
        // === Thông số chỉnh màu ===
        var shadow = { r: 20, g: 0, b: -20 };
        var midtone = { r: 0, g: 0, b: -10 };
        var highlight = { r: 20, g: 0, b: -20 };
        applyColorBalance(shadow, midtone, highlight);
        executeAction(charIDToTypeID("Invr"), undefined, DialogModes.NO);
        doc.activeLayer.name = "+Red & Yellow";
        doc.artLayers.add().name = "Color";
        doc.activeLayer.move(doc.layers["+Red & Yellow"], ElementPlacement.PLACEAFTER);
        doc.activeLayer.blendMode = BlendMode.COLORBLEND;
        // doc.activeLayer = doc.artLayers.getByName("+Red & Yellow");
        // selectMask();
        selecTool("paintbrushTool");
    } else {
        doc.activeLayer = doc.artLayers.getByName("replaceColor");
        // === Thông số chỉnh màu ===
        var shadow = { r: 20, g: 0, b: -20 };
        var midtone = { r: 0, g: 0, b: -10 };
        var highlight = { r: 20, g: 0, b: -20 };
        applyColorBalance(shadow, midtone, highlight);
        executeAction(charIDToTypeID("Invr"), undefined, DialogModes.NO);
        doc.activeLayer.name = "+Red & Yellow";
        doc.artLayers.add().name = "Color";
        doc.activeLayer.move(doc.layers["+Red & Yellow"], ElementPlacement.PLACEAFTER);
        doc.activeLayer.blendMode = BlendMode.COLORBLEND;
        // doc.activeLayer = doc.artLayers.getByName("+Red & Yellow");
        // selectMask();
        selecTool("paintbrushTool");
    }
})();

