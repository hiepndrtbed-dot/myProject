var bounds = activeDocument.activeLayer.layers.length;
activeDocument.activeLayer = activeDocument.activeLayer.artLayers[bounds - 1];
var nameLayer = activeDocument.activeLayer.name;
var searchProductName = nameLayer.search("Product");
if (searchProductName == 0) {
    re_name("Product");
    if(!hasLayerMask()){
        makeMask() ;
    }
    //New layername == Retouch
    make("Retouch");
    //app.activeDocument.artLayers.add().name ="Retouch";
    setSelectedLayer("Item");
    //kiem tra so layer trong item
    var bound = activeDocument.activeLayer.layers.length;
    if (bound > 2) {
        for (bound; bound >= 3; bound--) {
            activeDocument.activeLayer = activeDocument.activeLayer.artLayers[0];
            activeDocument.activeLayer.merge();
            setSelectedLayer("Item");
        }
    }
}


function hasLayerMask() {
    var reference = new ActionReference();
    reference.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    var desc = executeActionGet(reference);
    return desc.getBoolean(stringIDToTypeID("hasUserMask"));
}


function makeMask() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();

	descriptor.putClass( s2t( "new" ), s2t( "channel" ));
	reference.putEnumerated( s2t( "channel" ), s2t( "channel" ), s2t( "mask" ));
	descriptor.putReference( s2t( "at" ), reference );
	descriptor.putEnumerated( s2t( "using" ), c2t( "UsrM" ), s2t( "revealAll" ));//revealAll - hideAll"
	executeAction( s2t( "make" ), descriptor, DialogModes.NO );
}


function re_name(name2) {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var descriptor2 = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putEnumerated( s2t( "layer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	descriptor2.putString( s2t( "name" ), name2 );
	descriptor.putObject( s2t( "to" ), s2t( "layer" ), descriptor2 );
	executeAction( s2t( "set" ), descriptor, DialogModes.NO );
}


function setSelectedLayer(layerName) {
    var result = false;
    try {
        var idslct = charIDToTypeID("slct");
        var desc19 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref1 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref1.putName(idLyr, layerName);
        desc19.putReference(idnull, ref1);
        var idMkVs = charIDToTypeID("MkVs");
        desc19.putBoolean(idMkVs, false);
        var idLyrI = charIDToTypeID("LyrI");
        var list2 = new ActionList();
        list2.putInteger(10);
        desc19.putList(idLyrI, list2);
        executeAction(idslct, desc19, DialogModes.NO);
        result = true;
    } catch (error) {
    }
    return result;
}

function make(name2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("layer"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putString(s2t("name"), name2);
    descriptor.putObject(s2t("using"), s2t("layer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}