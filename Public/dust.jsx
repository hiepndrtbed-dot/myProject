// =======================================================
deselect();
function deselect() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putEnumerated( s2t( "path" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	executeAction( s2t( "deselect" ), descriptor, DialogModes.NO );
}
// =======================================================
invokeCommand(1099);
function invokeCommand(commandID) {
	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();

	descriptor.putInteger( s2t( "commandID" ), commandID );
	descriptor.putBoolean( s2t( "kcanDispatchWhileModal" ), true );
	executeAction( s2t( "invokeCommand" ), descriptor, DialogModes.NO );
}
// =======================================================
modalStateChanged("New Layer");
function modalStateChanged(title) {
	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();

	descriptor.putInteger( s2t( "level" ), 1 );
	descriptor.putEnumerated( s2t( "state" ), s2t( "state" ), s2t( "enter" ));
	descriptor.putBoolean( s2t( "kcanDispatchWhileModal" ), true );
	descriptor.putString( s2t( "title" ), title );
	executeAction( s2t( "modalStateChanged" ), descriptor, DialogModes.NO );
}

// =======================================================
modalStateChanged("New Layer");
function modalStateChanged(title) {
	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();

	descriptor.putInteger( s2t( "level" ), 0 );
	descriptor.putEnumerated( s2t( "state" ), s2t( "state" ), s2t( "exit" ));
	descriptor.putBoolean( s2t( "kcanDispatchWhileModal" ), true );
	descriptor.putString( s2t( "title" ), title );
	executeAction( s2t( "modalStateChanged" ), descriptor, DialogModes.NO );
}

// =======================================================
make(111);
function make(layerID) {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putClass( s2t( "layer" ));
	descriptor.putReference( c2t( "null" ), reference );
	descriptor.putInteger( s2t( "layerID" ), layerID );
	executeAction( s2t( "make" ), descriptor, DialogModes.NO );
}
// =======================================================
invokeCommand(1139);
function invokeCommand(commandID) {
	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();

	descriptor.putInteger( s2t( "commandID" ), commandID );
	descriptor.putBoolean( s2t( "kcanDispatchWhileModal" ), true );
	executeAction( s2t( "invokeCommand" ), descriptor, DialogModes.NO );
}
// =======================================================
mergeVisible(true);
function mergeVisible(duplicate) {
	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();

	descriptor.putBoolean( s2t( "duplicate" ), duplicate );
	executeAction( s2t( "mergeVisible" ), descriptor, DialogModes.NO );
}
// =======================================================
invokeCommand(-443);
function invokeCommand(commandID) {
	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();

	descriptor.putInteger( s2t( "commandID" ), commandID );
	descriptor.putBoolean( s2t( "kcanDispatchWhileModal" ), true );
	executeAction( s2t( "invokeCommand" ), descriptor, DialogModes.NO );
}

// =======================================================
modalStateChanged("Dust & Scratches");
function modalStateChanged(title) {
	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();

	descriptor.putInteger( s2t( "level" ), 1 );
	descriptor.putEnumerated( s2t( "state" ), s2t( "state" ), s2t( "enter" ));
	descriptor.putBoolean( s2t( "kcanDispatchWhileModal" ), true );
	descriptor.putString( s2t( "title" ), title );
	executeAction( s2t( "modalStateChanged" ), descriptor, DialogModes.NO );
}
// =======================================================
modalStateChanged("Dust & Scratches");
function modalStateChanged(title) {
	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();

	descriptor.putInteger( s2t( "level" ), 0 );
	descriptor.putEnumerated( s2t( "state" ), s2t( "state" ), s2t( "exit" ));
	descriptor.putBoolean( s2t( "kcanDispatchWhileModal" ), true );
	descriptor.putString( s2t( "title" ), title );
	executeAction( s2t( "modalStateChanged" ), descriptor, DialogModes.NO );
}

// =======================================================
invokeCommand(1166);
function invokeCommand(commandID) {
	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();

	descriptor.putInteger( s2t( "commandID" ), commandID );
	descriptor.putBoolean( s2t( "kcanDispatchWhileModal" ), true );
	executeAction( s2t( "invokeCommand" ), descriptor, DialogModes.NO );
}

// =======================================================
mergeLayersNew();
function mergeLayersNew() {
	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();

	executeAction( s2t( "mergeLayersNew" ), descriptor, DialogModes.NO );
}

// =======================================================
set();
function set() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();
	var reference2 = new ActionReference();

	reference.putProperty( c2t( "HstS" ), s2t( "historyBrushSource" ));
	descriptor.putReference( c2t( "null" ), reference );
	reference2.putProperty( c2t( "HstS" ), s2t( "currentHistoryState" ));
	descriptor.putReference( s2t( "to" ), reference2 );
	executeAction( s2t( "set" ), descriptor, DialogModes.NO );
}
// =======================================================
// =======================================================
select();
function select() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putOffset( c2t( "HstS" ), -2 );
	descriptor.putReference( c2t( "null" ), reference );
	executeAction( s2t( "select" ), descriptor, DialogModes.NO );
}

// =======================================================
delete2();
function delete2() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var list = new ActionList();
	var reference = new ActionReference();

	reference.putEnumerated( s2t( "layer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	list.putInteger( 112 );
	descriptor.putList( s2t( "layerID" ), list );
	executeAction( s2t( "delete" ), descriptor, DialogModes.NO );
}

// =======================================================
select2();
function select2() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putClass( s2t( "historyBrushTool" ));
	descriptor.putReference( c2t( "null" ), reference );
	executeAction( s2t( "select" ), descriptor, DialogModes.NO );
}
