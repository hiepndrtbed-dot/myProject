
//name document
//alert(activeDocument.name);

//select document 
//app.activeDocument = app.documents[1];


//removel all chnnel
app.activeDocument.channels.removeAll();


//merge layer
function merge() {
	var idMrgtwo = charIDToTypeID("Mrg2");
	var desc662 = new ActionDescriptor();
	executeAction(idMrgtwo, desc662, DialogModes.NO);
}


function showCurves() { executeAction(charIDToTypeID("Crvs"), undefined, DialogModes.ALL); }
function showLevels() { executeAction(charIDToTypeID("Lvls"), undefined, DialogModes.ALL); }
function showHueSat() { executeAction(charIDToTypeID("HStr"), undefined, DialogModes.ALL); }
function showColorBalance() { executeAction(charIDToTypeID("ClBl"), undefined, DialogModes.ALL); }
function showBrightness() { executeAction(charIDToTypeID("BrgC"), undefined, DialogModes.ALL); }
function showBW() { executeAction(stringIDToTypeID("blackAndWhite"), undefined, DialogModes.ALL); }
function showPhotoFilter() { executeAction(charIDToTypeID("PhFl"), undefined, DialogModes.ALL); }
function showSelectiveColor() { executeAction(charIDToTypeID("SlcC"), undefined, DialogModes.ALL); }
function showExposure() { executeAction(stringIDToTypeID("exposure"), undefined, DialogModes.ALL); }
function showVibrance() { executeAction(stringIDToTypeID("vibrance"), undefined, DialogModes.ALL); }
function showInvert() { executeAction(charIDToTypeID("Invr"), undefined, DialogModes.ALL); }