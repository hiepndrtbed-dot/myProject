main();
function main() {
	if (setSelectedLayer('Dark_1') == true) {
		activeDocument.activeLayer.remove();
		activeDocument.selection.deselect();
		if (setSelectedLayer("Stencil") == true) {
			activeDocument.activeLayer.visible = false;
		}
		//select layer neu ton tai
		if (setSelectedLayer('Natural') == true || setSelectedLayer('Channel') == true);
	} else if (setSelectedLayer('Dark') == true) {
		activeDocument.activeLayer.remove();
	} else if (setSelectedLayer('Darken Check') == true) {
		if (activeDocument.activeLayer.visible == true) {
			activeDocument.activeLayer.visible = false;
			setSelectedLayer('Retouch BG');
		} else {
			activeDocument.activeLayer.visible = true;
			setSelectedLayer('Retouch BG');
		}
	}
}
//select layerp
function setSelectedLayer(layerIndexOrName) {
	var result = false;
	try {
		var id239 = charIDToTypeID("slct");
		var desc45 = new ActionDescriptor();
		var id240 = charIDToTypeID("null");
		var ref43 = new ActionReference();
		var id241 = charIDToTypeID("Lyr ");
		if (typeof layerIndexOrName == "number") {
			ref43.putIndex(id241, layerIndexOrName);
		} else {
			ref43.putName(id241, layerIndexOrName);
		}
		desc45.putReference(id240, ref43);
		var id242 = charIDToTypeID("MkVs");
		desc45.putBoolean(id242, false);
		executeAction(id239, desc45, DialogModes.NO);
		result = true
	} catch (e) {
		; // do nothing
	}
	return result;
}
