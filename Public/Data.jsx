
//name document
//alert(activeDocument.name);

//select document 
//app.activeDocument = app.documents[1];


//removel all chnnel
app.activeDocument.channels.removeAll();


//merge layer
function merge(){
	var idMrgtwo = charIDToTypeID( "Mrg2" );
	var desc662 = new ActionDescriptor();
	executeAction( idMrgtwo, desc662, DialogModes.NO );	
}
