#target photoshop

if (getTool() == 'paintbrushTool') {
    setTool('eraserTool');
} else {
    setTool('paintbrushTool');
}

// https://forums.adobe.com/thread/579195
function getTool(){  
    var ref = new ActionReference();   
    ref.putEnumerated( charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );   
    var cTool = typeIDToStringID(executeActionGet(ref).getEnumerationType(stringIDToTypeID('tool')));  
    return cTool;  
}

// https://www.ps-scripts.com/viewtopic.php?f=68&t=11342&p=152772
function setTool(tool) {
    var desc9 = new ActionDescriptor();
    var ref7 = new ActionReference();
    ref7.putClass( app.stringIDToTypeID(tool) );
    desc9.putReference( app.charIDToTypeID('null'), ref7 );
    executeAction( app.charIDToTypeID('slct'), desc9, DialogModes.NO );
}
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