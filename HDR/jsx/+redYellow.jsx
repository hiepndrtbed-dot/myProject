var valueHue = -50; // Giá trị Hue
(function () {
    //check layer tren layer replaceColor
    // checkNameLayerToMger();
    // === Thông số chỉnh màu ===
    doc.artLayers.add().name = "Color";
    try {
        doc.activeLayer.move(doc.layers["WALL"], ElementPlacement.PLACEAFTER);
    } catch (error) {
        doc.activeLayer.move(doc.layers["MERGE 1"], ElementPlacement.PLACEBEFORE);
    } finally {
        doc.activeLayer.blendMode = BlendMode.COLORBLEND;
        makeHue(0, valueHue, 0)
        executeAction(charIDToTypeID("Invr"), undefined, DialogModes.NO);
        doc.activeLayer.name = "-Hue saturation";
        doc.activeLayer = doc.artLayers["Color"];
        selecTool("paintbrushTool");
    }

})();

