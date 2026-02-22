makeHistory();
selectHistory();
setHistory("hhhh");

function makeHistory() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();
	var reference2 = new ActionReference();

	reference.putClass( s2t( "snapshotClass" ));
	descriptor.putReference( c2t( "null" ), reference );
	reference2.putProperty( c2t( "HstS" ), s2t( "currentHistoryState" ));
	descriptor.putReference( s2t( "from" ), reference2 );
	executeAction( s2t( "make" ), descriptor, DialogModes.NO );
}


// =======================================================
var snapshot = "history";
function selectHistory(snapshot) {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putName( s2t( "snapshotClass" ), snapshot );
	descriptor.putReference( c2t( "null" ), reference );
	executeAction( s2t( "select" ), descriptor, DialogModes.NO );
}

// =======================================================
function setHistory(name2) {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var descriptor2 = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putProperty( c2t( "HstS" ), s2t( "currentHistoryState" ));
	descriptor.putReference( c2t( "null" ), reference );
	descriptor2.putString( s2t( "name" ), name2 );
	descriptor.putObject( s2t( "to" ), s2t( "snapshotClass" ), descriptor2 );
	executeAction( s2t( "set" ), descriptor, DialogModes.NO );
}
ClearHistory