app.activeDocument.guides.removeAll();
activeDocument.activeLayer = activeDocument.layerSets.getByName("Variant 1").layerSets.getByName("Item 1").artLayers["Stencil"];
selectionLayer();
saveChannel("crop");
activeDocument.selection.deselect();
activeDocument.activeLayer.remove();


function selectionLayer() {
	// body...
	var idsetd = charIDToTypeID( "setd" );
    var desc65 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref21 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idfsel = charIDToTypeID( "fsel" );
        ref21.putProperty( idChnl, idfsel );
    desc65.putReference( idnull, ref21 );
    var idT = charIDToTypeID( "T   " );
        var ref22 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idChnl = charIDToTypeID( "Chnl" );
        var idTrsp = charIDToTypeID( "Trsp" );
        ref22.putEnumerated( idChnl, idChnl, idTrsp );
    desc65.putReference( idT, ref22 );
	executeAction( idsetd, desc65, DialogModes.NO );
}

//save selection Channel
function saveChannel(name) {
	var desc977 = new ActionDescriptor();
	var ref38 = new ActionReference();
	ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
	desc977.putReference(charIDToTypeID("null"), ref38);
	desc977.putString(charIDToTypeID("Nm  "), name);
	executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO);
	return activeDocument.channels.getByName(name);
}


