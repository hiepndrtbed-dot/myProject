//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
const versionTo = " By Acad -- Version 1.5 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;

(function () {
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
        doc.activeLayer.move(doc.layers["+Red & Yellow"], ElementPlacement.PLACEBEFORE);
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
        doc.activeLayer.move(doc.layers["+Red & Yellow"], ElementPlacement.PLACEBEFORE);
        doc.activeLayer.blendMode = BlendMode.COLORBLEND;
        // doc.activeLayer = doc.artLayers.getByName("+Red & Yellow");
        // selectMask();
        selecTool("paintbrushTool");
    }
})();


//Invert
function invert() {
    executeAction(charIDToTypeID("Invr"), undefined, DialogModes.NO);
}

// === Tạo Adjustment Layer: Color Balance ===
function applyColorBalance(shadow, midtone, highlight) {
    var shadow = shadow;
    var midtone = midtone;
    var highlight = highlight;
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass(charIDToTypeID("AdjL"));
    desc.putReference(charIDToTypeID("null"), ref);

    var layerDesc = new ActionDescriptor();
    var colorDesc = new ActionDescriptor();

    function makeList(r, g, b) {
        var list = new ActionList();
        list.putInteger(r);
        list.putInteger(g);
        list.putInteger(b);
        return list;
    }

    colorDesc.putList(charIDToTypeID("ShdL"), makeList(shadow.r, shadow.g, shadow.b));
    colorDesc.putList(charIDToTypeID("MdtL"), makeList(midtone.r, midtone.g, midtone.b));
    colorDesc.putList(charIDToTypeID("HghL"), makeList(highlight.r, highlight.g, highlight.b));
    colorDesc.putBoolean(charIDToTypeID("PrsL"), true);

    layerDesc.putObject(charIDToTypeID("Type"), charIDToTypeID("ClrB"), colorDesc);
    desc.putObject(charIDToTypeID("Usng"), charIDToTypeID("AdjL"), layerDesc);

    executeAction(charIDToTypeID("Mk  "), desc, DialogModes.NO);
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
function selecTool(tool) {
    var desc9 = new ActionDescriptor();
    var ref7 = new ActionReference();
    ref7.putClass(app.stringIDToTypeID(tool));
    desc9.putReference(app.charIDToTypeID('null'), ref7);
    executeAction(app.charIDToTypeID('slct'), desc9, DialogModes.NO);

    // Tool names (use quoted strings, e.g. 'moveTool')
    // moveTool
    // marqueeRectTool
    // marqueeEllipTool
    // marqueeSingleRowTool
    // marqueeSingleColumnTool
    // lassoTool
    // polySelTool
    // magneticLassoTool
    // quickSelectTool
    // magicWandTool
    // cropTool
    // sliceTool
    // sliceSelectTool
    // spotHealingBrushTool
    // magicStampTool
    // patchSelection
    // redEyeTool
    // paintbrushTool
    // pencilTool
    // colorReplacementBrushTool
    // cloneStampTool
    // patternStampTool
    // historyBrushTool
    // artBrushTool
    // eraserTool
    // backgroundEraserTool
    // magicEraserTool
    // gradientTool
    // bucketTool
    // blurTool
    // sharpenTool
    // smudgeTool
    // dodgeTool
    // burnInTool
    // saturationTool
    // penTool
    // freeformPenTool
    // addKnotTool
    // deleteKnotTool
    // convertKnotTool
    // typeCreateOrEditTool
    // typeVerticalCreateOrEditTool
    // typeCreateMaskTool
    // typeVerticalCreateMaskTool
    // pathComponentSelectTool
    // directSelectTool
    // rectangleTool
    // roundedRectangleTool
    // ellipseTool
    // polygonTool
    // lineTool
    // customShapeTool
    // textAnnotTool
    // soundAnnotTool
    // eyedropperTool
    // colorSamplerTool
    // rulerTool
    // handTool
    // zoomTool
}