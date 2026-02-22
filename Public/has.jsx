
has();

function has() {
	selectLayer("Product");
	activeDocument.activeLayer.duplicate();
	selectLayer("Product copy");
	activeDocument.activeLayer.name = "test";
	activeDocument.activeLayer.opacity = 50;
	activeDocument.activeLayer.invert();
	flip();
}


function flip() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putEnumerated( s2t( "layer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	descriptor.putEnumerated( s2t( "axis" ), s2t( "orientation" ), s2t( "horizontal" ));
	executeAction( s2t( "flip" ), descriptor, DialogModes.NO );
}



function selectLayer(nameLayer) {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putName(s2t("layer"), nameLayer);
	descriptor.putReference(c2t("null"), reference);
	executeAction(s2t("select"), descriptor, DialogModes.NO);
}



function set(opacity) {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var descriptor2 = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
	descriptor2.putReference(c2t("null"), reference);
	descriptor.putUnitDouble(s2t("opacity"), s2t("percentUnit"), opacity);
	descriptor2.putObject(s2t("to"), s2t("layer"), descriptor);
	executeAction(s2t("set"), descriptor2, DialogModes.NO);
}
