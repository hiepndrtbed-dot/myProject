var valueHue = -50; // Giá trị Hue
(function () {
    //check layer tren layer replaceColor
    // checkNameLayerToMger();
    // === Thông số chỉnh màu ===
    if (!selectLayer("Not delete")) {
        var newLayer = doc.artLayers.add();
        newLayer.name = "Not delete";
        try {
            newLayer.move(doc.artLayers["MERGE 1"], ElementPlacement.PLACEBEFORE);
        } catch (error) {
            newLayer.move(doc.artLayers["Background"], ElementPlacement.PLACEBEFORE);
        } finally {
            doc.activeLayer.allLocked = true;
        }
    }
    if (activeDocument.quickMaskMode == true) { activeDocument.quickMaskMode = false; }
    var newLayer1 = doc.artLayers.add();
    newLayer1.name = "Color";
    newLayer1.move(doc.artLayers["Not delete"], ElementPlacement.PLACEBEFORE);

    //thay vao day
    doc.activeLayer.blendMode = BlendMode.COLORBLEND;
    makeHue(0, valueHue, 0)
    executeAction(charIDToTypeID("Invr"), undefined, DialogModes.NO);
    doc.activeLayer.name = "-Hue saturation";
    doc.activeLayer = doc.artLayers["Color"];
    selecTool("paintbrushTool");
})();

