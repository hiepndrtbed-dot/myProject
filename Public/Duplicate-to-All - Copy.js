var ref1 = new ActionReference();
ref1.putIndex( charIDToTypeID( "AdjL" ), 5 );
ref1.putIdentifier(stringIDToTypeID("adjustmentLayer"), activeDocument.artLayers[0].id);
var desc1 = new ActionDescriptor();
desc1.putReference(cTID('null'), ref1);

var desc2 = new ActionDescriptor();
desc2.putInteger(cTID('Rd '), 1);
desc2.putInteger(cTID('Yllw'), 2);
desc2.putInteger(cTID('Grn '), 3);
desc2.putInteger(cTID('Cyn '), 4);
desc2.putInteger(cTID('Bl '), 5);
desc2.putInteger(cTID('Mgnt'), 6);
desc2.putBoolean(sTID("useTint"), false);
desc1.putObject(cTID('T '), cTID('BanW'), desc2);
executeAction(cTID('setd'), desc1, DialogModes.NO);