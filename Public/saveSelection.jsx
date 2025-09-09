duplicate("Crop");
function duplicate(name2) {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putProperty( s2t( "channel" ), s2t( "selection" ));
	descriptor.putReference( c2t( "null" ), reference );
	descriptor.putString( s2t( "name" ), name2 );
	executeAction( s2t( "duplicate" ), descriptor, DialogModes.NO );
}