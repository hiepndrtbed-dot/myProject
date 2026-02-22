function subtract(selection) {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();
	var reference2 = new ActionReference();

	reference.putName( s2t( "channel" ), selection );
	descriptor.putReference( c2t( "null" ), reference );
	reference2.putProperty( s2t( "channel" ), s2t( "selection" ));
	descriptor.putReference( s2t( "from" ), reference2 );
	executeAction( s2t( "subtract" ), descriptor, DialogModes.NO );
}