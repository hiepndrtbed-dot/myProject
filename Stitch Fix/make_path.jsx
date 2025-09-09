preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;

doc.pathItems.removeAll()

var grRight = doc.layerSets["Right"].layerSets["Main"]
var grLeft = doc.layerSets["Left"].layerSets["Main"]
doc.activeLayer = grRight.artLayers["Product"]
loadSelectionMask()
doc.activeLayer = grLeft.artLayers["Product"]
addSelectionMask()
makeWorkPath(1)
doc.pathItems[0].name = "cutout"

function addSelectionMask() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();
	var reference2 = new ActionReference();

	reference.putEnumerated( s2t( "channel" ), s2t( "channel" ), s2t( "mask" ));
	descriptor.putReference( c2t( "null" ), reference );
	reference2.putProperty( s2t( "channel" ), s2t( "selection" ));
	descriptor.putReference( s2t( "to" ), reference2 );
	executeAction( s2t( "add" ), descriptor, DialogModes.NO );
}

//load selection mask
function loadSelectionMask() {
    var idsetd = charIDToTypeID("setd");
    var desc32 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref14 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref14.putProperty(idChnl, idfsel);
    desc32.putReference(idnull, ref14);
    var idT = charIDToTypeID("T   ");
    var ref15 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref15.putEnumerated(idChnl, idChnl, idMsk);
    desc32.putReference(idT, ref15);
    executeAction(idsetd, desc32, DialogModes.NO);
}


function makeWorkPath(tolerance) {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();
	var reference2 = new ActionReference();

	reference.putClass( s2t( "path" ));
	descriptor.putReference( c2t( "null" ), reference );
	reference2.putProperty( s2t( "selectionClass" ), s2t( "selection" ));
	descriptor.putReference( s2t( "from" ), reference2 );
	descriptor.putUnitDouble( s2t( "tolerance" ), s2t( "pixelsUnit" ), tolerance );
	executeAction( s2t( "make" ), descriptor, DialogModes.NO );
}