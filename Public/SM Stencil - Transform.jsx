var bounds = app.activeDocument.activeLayer.bounds;
var width = bounds[2].as('px')-bounds[0].as('px');
var height = bounds[3].as('px')-bounds[1].as('px');  
SelectForward();
var bounds = app.activeDocument.activeLayer.bounds;
var layerWidth = bounds[2].as('px')-bounds[0].as('px');
var layerHeight = bounds[3].as('px')-bounds[1].as('px');      
var layerRatio = layerWidth / layerHeight;
var newHeight = height;
var newWidth = ((1.0 * height) / layerRatio);
var resizePercent = newHeight/layerHeight*106.5;
app.activeDocument.activeLayer.resize(resizePercent,resizePercent);

function SelectForward(){
	var idslct = charIDToTypeID( "slct" );
	var desc104 = new ActionDescriptor();
	var idnull = charIDToTypeID( "null" );
	var ref32 = new ActionReference();
	var idLyr = charIDToTypeID( "Lyr " );
	var idOrdn = charIDToTypeID( "Ordn" );
	var idFrwr = charIDToTypeID( "Frwr" );
	ref32.putEnumerated( idLyr, idOrdn, idFrwr );
	desc104.putReference( idnull, ref32 );
	var idMkVs = charIDToTypeID( "MkVs" );
	desc104.putBoolean( idMkVs, false );
	var idLyrI = charIDToTypeID( "LyrI" );
	var list8 = new ActionList();
	list8.putInteger( 6 );
	desc104.putList( idLyrI, list8 );
	executeAction( idslct, desc104, DialogModes.NO );
}