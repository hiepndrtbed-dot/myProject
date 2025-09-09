setSelectedLayer("Item 1");
for (var a=0; a<activeDocument.activeLayer.layers.length ; a++) {
	if(activeDocument.activeLayer.layers[a].name != "Stencil"){
		addSelectedLayer(activeDocument.activeLayer.layers[a].name);
	}
}
DeselectLayer("Item 1");
function DeselectLayer(LayerName){
var idslct = charIDToTypeID( "slct" );
    var desc5 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref4 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref4.putName( idLyr, LayerName );
    desc5.putReference( idnull, ref4 );
    var idselectionModifier = stringIDToTypeID( "selectionModifier" );
    var idselectionModifierType = stringIDToTypeID( "selectionModifierType" );
    var idremoveFromSelection = stringIDToTypeID( "removeFromSelection" );
    desc5.putEnumerated( idselectionModifier, idselectionModifierType, idremoveFromSelection );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc5.putBoolean( idMkVs, false );
    var idLyrI = charIDToTypeID( "LyrI" );
        var list4 = new ActionList();
        list4.putInteger( 31 );
        list4.putInteger( 32 );
        list4.putInteger( 52 );
    desc5.putList( idLyrI, list4 );
executeAction( idslct, desc5, DialogModes.NO );
}

function setSelectedLayer(LayerName) {
	try {
		var id239 = charIDToTypeID( "slct" );
		var desc45 = new ActionDescriptor();
		var id240 = charIDToTypeID( "null" );
		var ref43 = new ActionReference();
		var id241 = charIDToTypeID( "Lyr " );
		if ( typeof LayerName == "number" ) ref43.putIndex( id241, LayerName );
		else ref43.putName( id241, LayerName );
		desc45.putReference( id240, ref43 );
		var id242 = charIDToTypeID( "MkVs" );
		desc45.putBoolean( id242, false );
		executeAction( id239, desc45, DialogModes.NO );
	}
	catch(e) {}
}

function addSelectedLayer( layerIndexOrName ) {
	try {
		var id243 = charIDToTypeID( "slct" );
		var desc46 = new ActionDescriptor();
		var id244 = charIDToTypeID( "null" );
		var ref44 = new ActionReference();
		var id245 = charIDToTypeID( "Lyr " );
		if ( typeof layerIndexOrName == "number" ) {
			ref44.putIndex( id245, layerIndexOrName );
		} else {
			ref44.putName( id245, layerIndexOrName );
		}
		desc46.putReference( id244, ref44 );
		var id246 = stringIDToTypeID( "selectionModifier" );
		var id247 = stringIDToTypeID( "selectionModifierType" );
		var id248 = stringIDToTypeID( "addToSelection" );
		desc46.putEnumerated( id246, id247, id248 );
		var id249 = charIDToTypeID( "MkVs" );
		desc46.putBoolean( id249, false );
		executeAction( id243, desc46, DialogModes.NO );
	}catch(e) {
		; // do nothing
	}
}




