//
// NLM_minus.jsx
// V1.0
//

var result = newLayerMask();
activeDocument.suspendHistory(result.toString(),'');

function newLayerMask() {
	
	if (hasActiveDocument()) {
		//
		activeDocument.suspendHistory("V V V   NLM_minus script START   V V V",'');
		
		// make sure previous "Temp Path" path don't exist (delete it if true)
		if (verifyPathNameExists("Temp Path")) deleteActivePath();
		//
		// check if it has active Path
		if (hasActivePath_onYes_selectIt()) {
			// select active Path
			selectActivePath();
			// rename selected Path
			renameActivePath();
			// set selection from Path, removing any active selection 1st
			activeDocument.selection.deselect();
			createSelectionFromPath();
			// delete renamed Path 
			if (verifyPathNameExists("Temp Path")) deleteActivePath();
			// if path produces no visible selection, stops script and warn
			if (hasSelection()) {
				// run dynamicFeather
				dynamicFeather_noUI();
			} else {
				alert("Your Path didn't create any visible selection!");
				return "FX NLM_minus (Err: Path didn't create any visible selection)";
			}
		} else {
			// check if it has only selection active
			if (hasSelection()) {
				// run dynamicFeather
				dynamicFeather_noUI();
			} else {
				alert("You need to have a Path or a Selection active to run this.");
				return "FX NLM_minus (Err: Path or selection not existing)";
			}
		}
	
		// verify if active layer has mask
		if (hasLayerMask()) {
			// select mask of the active layer
			selectMask_onActiveLayer();
			// fill with black
			fillBlack();  // ||||||||||  NLM_minus  = fill Black
			// remove selection
			activeDocument.selection.deselect();
			//
			return "FX NLM_minus";
		} else {
			// se for backgroundLayer, cria Layer N
			if (activeDocument.activeLayer.isBackgroundLayer ) activeDocument.activeLayer.isBackgroundLayer = false;
			// cria mask branca desde a selection activa
			makeNewMask_fromSelection();
			//
			return "FX NLM";
		}
		
	} else {
		alert("You must open image to run this.");
		//
		return "FX NLM (Err: No image exist to run this)";
	}
	
	///////////////////////////
	
	function hasActiveDocument() {
		var result = false;
		if (app.documents.length != 0) result = true;
		return result;
	}
	
	// works with "work path" or others. if more than 1 path selected, it reselect only 1 path (the most top one)
	function hasActivePath_onYes_selectIt() {
		try {
			var descriptor = new ActionDescriptor();
			var reference = new ActionReference();
			reference.putEnumerated( stringIDToTypeID( "path" ), stringIDToTypeID('ordinal'), stringIDToTypeID('targetEnum'));
			descriptor.putReference( charIDToTypeID( "null" ), reference );
			executeAction( stringIDToTypeID( "select" ), descriptor, DialogModes.NO );
			return true;
		} catch(e) {
			return false;
		}
	}

	// Ask the document if there is a selection
	// Only works on the active document
	function hasSelection() {
		var hasSelection = false;
		var ref = new ActionReference();
		ref.putProperty( stringIDToTypeID("property"), stringIDToTypeID("selection") );
		ref.putEnumerated( stringIDToTypeID( "document" ), stringIDToTypeID( "ordinal" ), stringIDToTypeID( "targetEnum" ) ); 
		var desc = executeActionGet( ref );
		if ( desc.count ) {
			hasSelection = true;
		}
		return hasSelection;
	}

	function hasLayerMask() {
		var reference = new ActionReference();
		reference.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
		var desc = executeActionGet(reference);
		return desc.getBoolean( stringIDToTypeID( "hasUserMask" ) );
	}

	function selectActivePath() {
		var descriptor = new ActionDescriptor();
		var reference = new ActionReference();
		reference.putEnumerated(stringIDToTypeID('path'), stringIDToTypeID('ordinal'), stringIDToTypeID('targetEnum'));
		descriptor.putReference(charIDToTypeID('null'), reference);
		executeAction(stringIDToTypeID('select'), descriptor, DialogModes.NO);
	}

	function renameActivePath() {
		var descriptor = new ActionDescriptor();
		var reference = new ActionReference();
		reference.putEnumerated(stringIDToTypeID('path'), stringIDToTypeID('ordinal'), stringIDToTypeID('targetEnum'));
		descriptor.putReference(charIDToTypeID('null'), reference);
		descriptor.putString(stringIDToTypeID('to'), "Temp Path");
		executeAction(stringIDToTypeID('rename'), descriptor, DialogModes.NO);
	}

	function createSelectionFromPath() {
		var descriptor = new ActionDescriptor();
		var reference = new ActionReference();
		var reference2 = new ActionReference();
		reference.putProperty( stringIDToTypeID( "channel" ), stringIDToTypeID( "selection" ));
		descriptor.putReference( charIDToTypeID( "null" ), reference );
		reference2.putName( stringIDToTypeID( "path" ), "Temp Path" );
		descriptor.putReference( stringIDToTypeID( "to" ), reference2 );
		descriptor.putInteger( stringIDToTypeID( "version" ), 1 );
		descriptor.putBoolean( stringIDToTypeID( "vectorMaskParams" ), true );
		try { // returns error if orphan pathPoints only exist
			executeAction( stringIDToTypeID( "set" ), descriptor, DialogModes.NO );
		} catch (e) {
			if (verifyPathNameExists("Temp Path")) deleteActivePath();
		}
	}

	////////////////////////////////// verifica se a layer existe
	function verifyPathNameExists(pathname) {
		var result = false;
		for (var a=0; a<activeDocument.pathItems.length ; a++) {
			if (String(activeDocument.pathItems[a].name) == pathname) {
				result = true;
				break;
			}
		}
		return result;
	}

	function deleteActivePath() {
		activeDocument.pathItems.getByName("Temp Path").remove();
	}

	function dynamicFeather_noUI() {
		var ww = activeDocument.width.as('px');
		var hh = activeDocument.height.as('px');
		var thisSize = Math.min(ww,hh);
		var thisRadius = setValue (thisSize);
		// write result on the history log of photoshop
		activeDocument.suspendHistory(String(feather(thisRadius)),'');
		//
		///////////////////////
		function setValue (n) {
			if (n<500) return 0.1;
			if (n<1000) return 0.2;
			if (n<1500) return 0.3;
			if (n<2000) return 0.4;
			if (n<2500) return 0.5;
			if (n<3000) return 0.6;
			if (n<3500) return 0.7;
			if (n<4000) return 0.8;
			if (n<4500) return 0.9;
			if (n<5000) return 1;
			if (n<5500) return 1.1;
			if (n<6000) return 1.2;
			if (n<6500) return 1.3;
			if (n<7000) return 1.4;
			if (n<7500) return 1.5;
			if (n<8000) return 1.6;
			if (n<8500) return 1.7;
			if (n<9000) return 1.8;
			if (n<9500) return 1.9;
			if (n<10000) return 2.0;
			if (n<10500) return 2.1;
			if (n>=10500) return 2.2;
		}
		///////////////////////
		function feather(radius) {
			var descriptor = new ActionDescriptor();
			descriptor.putUnitDouble( stringIDToTypeID("radius"), stringIDToTypeID( "pixelsUnit" ), Number(radius) );
			descriptor.putBoolean( stringIDToTypeID( "selectionModifyEffectAtCanvasBounds" ), false );
			try { // incase dialogs is ALL, and the user cancels, this returns no error
				executeAction( stringIDToTypeID( "feather" ), descriptor, DialogModes.NO ); 
				return "Dynamic Feather: " + String(radius.toFixed(1));
			} catch(e) {
				return "Dynamic Feather aborted by PE";
			}
		}
	}

	function makeNewMask_fromSelection() {
		var descriptor = new ActionDescriptor();
		var reference = new ActionReference();
		descriptor.putClass( stringIDToTypeID( "new" ), stringIDToTypeID( "channel" ));
		reference.putEnumerated( stringIDToTypeID( "channel" ), stringIDToTypeID( "channel" ), stringIDToTypeID( "mask" ));
		descriptor.putReference( stringIDToTypeID( "at" ), reference );
		descriptor.putEnumerated( stringIDToTypeID( "using" ), charIDToTypeID( "UsrM" ), stringIDToTypeID( "revealSelection" ));
		executeAction( stringIDToTypeID( "make" ), descriptor, DialogModes.NO );
	}


	function selectMask_onActiveLayer() {
		var descriptor = new ActionDescriptor();
		var reference = new ActionReference();
		reference.putEnumerated( stringIDToTypeID( "channel" ), stringIDToTypeID( "channel" ), stringIDToTypeID( "mask" ));
		descriptor.putReference( charIDToTypeID( "null" ), reference );
		descriptor.putBoolean( stringIDToTypeID( "makeVisible" ), false );
		executeAction( stringIDToTypeID( "select" ), descriptor, DialogModes.NO );
	}

	function fillBlack() {
		var descriptor = new ActionDescriptor();
		descriptor.putEnumerated( stringIDToTypeID( "using" ), stringIDToTypeID( "fillContents" ), stringIDToTypeID( "black" ));
		descriptor.putUnitDouble( stringIDToTypeID( "opacity" ), stringIDToTypeID( "percentUnit" ), 100.000000 );
		descriptor.putEnumerated( stringIDToTypeID( "mode" ), stringIDToTypeID( "blendMode" ), stringIDToTypeID( "normal" ));
		executeAction( stringIDToTypeID( "fill" ), descriptor, DialogModes.NO );
	}
}





