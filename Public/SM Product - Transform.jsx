var bounds = activeDocument.activeLayer.bounds;
var temp2width = bounds[2].as('px')-bounds[0].as('px');
var temp2weight = bounds[3].as('px')-bounds[1].as('px');

FitStencil(temp2width,temp2weight);

function setSelectedLayer( layerIndexOrName ) {
	try {
		var id239 = charIDToTypeID( "slct" );
		var desc45 = new ActionDescriptor();
		var id240 = charIDToTypeID( "null" );
		var ref43 = new ActionReference();
		var id241 = charIDToTypeID( "Lyr " );
		if ( typeof layerIndexOrName == "number" ) {
			ref43.putIndex( id241, layerIndexOrName );
		} else {
			ref43.putName( id241, layerIndexOrName );
		}
		desc45.putReference( id240, ref43 );
		var id242 = charIDToTypeID( "MkVs" );
		desc45.putBoolean( id242, false );
		executeAction( id239, desc45, DialogModes.NO );
	}catch(e) {
		; // do nothing
	}
}

function FitStencil(WIDTH,HEIGHT){
	setSelectedLayer("temp");
	var bounds = activeDocument.activeLayer.bounds;
	var layerWidth = bounds[2].as('px')-bounds[0].as('px');
	var layerHeight = bounds[3].as('px')-bounds[1].as('px');
	var layerRatio = layerWidth / layerHeight;
	var newWidth = WIDTH;
	var newHeight = ((1.0 * WIDTH) / layerRatio);
	if (newHeight >= HEIGHT) {
		newWidth = layerRatio * HEIGHT;
		newHeight = HEIGHT;
	}
	var resizePercent = newWidth/layerWidth*100;
	app.activeDocument.activeLayer.resize(resizePercent,resizePercent);
}





