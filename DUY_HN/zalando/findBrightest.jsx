

(function () {
	preferences.rulerUnits = Units.PIXELS
	app.preferences.typeunits = TypeUnits.PIXELS
	var doc = app.activeDocument
	doc.pathItems["Work Path"].deselect()
	if (setSelectedLayer("#Wall") == true) {
		if (hasMask() && loadSelectionMask() == true) {
			saveChannel("Selection_Wall")
			doc.selection.deselect()
			process("Selection_Wall")
		} else {
			//process()
		}
	}//End if #Wall
})()

function process(channelWall) {

	app.activeDocument.colorSamplers.removeAll();
	//app.activeDocument.info.caption = "freistellerOff";
	var docName = app.activeDocument.name.toLowerCase();

	//create solid color layer
	//var greyValue_DES = 210; 	//default is 240 for everything else
	var greyValue_STW = 240;	//that is how it will be finally
	var rot;
	var blau;
	var gruen;
	var BG_curvesAdjust = 210;	//was 240

	//Chuyển thông tin Author trong info thanh lowCase
	var tagString = app.activeDocument.info.author.toLowerCase();

	//ein array erstellen zum pruefen von mehreren werten (Streetwear;STW)
	var compareStr = ["Streetwear", "STW", "Designer", "DES"];

	//check if tag in description // Kiểm tra nếu có trong tồn tại trong description
	if (tagString == "" && app.activeDocument.info.caption != "") {
		//Nếu author rống thì tìm trong tagname trong description
		var descrStr = app.activeDocument.info.caption.toLowerCase();

		//Gán thông tin trong description vào Author
		if (descrStr == "streetwear" || descrStr == "designer") {
			tagString = descrStr;
			app.activeDocument.info.author = tagString;
		}
	}

	//Sau khi gán xong thì kiểm tra tên trong Author tương ứng với tagString.
	//Nếu tồn tại String:streetw hoặc stw thì gán giá trị cho các giá trị Red / Green / Blue
	if (tagString.indexOf('streetw') != -1 || tagString.indexOf('stw') != -1) {
		rot = greyValue_STW;
		gruen = greyValue_STW;
		blau = greyValue_STW;
		BG_curvesAdjust = greyValue_STW;
		//alert ("This is DESIGNER");
		BG_start();
	}

	////////////////////
	else if (tagString.indexOf('design') != -1 || tagString.indexOf('des') != -1) {
		rot = 210;
		gruen = 210;
		blau = 210;
		BG_curvesAdjust = 210;
		BG_start();
	}

	function BG_start() {
		if (channelWall != undefined) {
			activeDocument.selection.load(activeDocument.channels.getByName(channelWall))
		}
		//the solid color layer
		///////////////////////
		app.activeDocument.activeLayer = app.activeDocument.layerSets["Variant 1"].layerSets["Color 1"];
		var desc5 = new ActionDescriptor();
		var ref1 = new ActionReference();
		var idcontentLayer = stringIDToTypeID("contentLayer");
		ref1.putClass(idcontentLayer);
		desc5.putReference(charIDToTypeID("null"), ref1);
		var desc6 = new ActionDescriptor();
		var desc7 = new ActionDescriptor();
		var desc8 = new ActionDescriptor();
		desc8.putDouble(charIDToTypeID("Rd  "), rot);
		desc8.putDouble(charIDToTypeID("Grn "), gruen);
		desc8.putDouble(charIDToTypeID("Bl  "), blau);
		desc7.putObject(charIDToTypeID("Clr "), charIDToTypeID("RGBC"), desc8);
		desc6.putObject(charIDToTypeID("Type"), stringIDToTypeID("solidColorLayer"), desc7);
		desc5.putObject(charIDToTypeID("Usng"), idcontentLayer, desc6);
		executeAction(charIDToTypeID("Mk  "), desc5, DialogModes.NO);
		app.activeDocument.activeLayer.blendMode = BlendMode.COLORBLEND
		//select the correct layer
		app.activeDocument.activeLayer = app.activeDocument.layerSets["Variant 1"].layerSets["Background 1"].artLayers.getByName("Retouch BG");
		checkBrightest();
	}

	function checkBrightest() {

		///////////////////////////////////////
		////////checks if model is cropped/////
		var teilung = 4;
		var teilungV = 5;
		var padding = 100;
		var gridWidth = (app.activeDocument.width - 2 * padding) / teilung;
		var gridHeight = 200;
		var leftPos;
		var topPos;

		var tempSamplers = new Array();
		var colValues = new Array();

		var brightValue = new Array();
		var tempSpot;

		//first top
		for (var i = 0; i < teilung; i++) {
			for (var row = 0; row < teilungV; row++) {
				leftPos = gridWidth * i + padding;
				if (docName.indexOf('premium') != -1 && i > 0) {
					//alert ("ist premium");
					leftPos = leftPos + 200;
				}
				//rightPos = leftPos + 200;
				topPos = gridHeight * row + 2 * padding;
				//botPos = topPos + gridHeight;
				//alert (leftPos+"\n"+rightPos+"\n"+topPos+"\n"+botPos);
				if (i < 1 || i > 2) {
					tempSamplers = app.activeDocument.colorSamplers.add([new UnitValue(leftPos, 'px'), new UnitValue(topPos, 'px')]);
					//selectGrid (leftPos, rightPos, topPos, botPos);
				}
			}
		}

		//loop thru samplers temp add the one within certain brightness (210 < value < 240) & little sat
		//var count = 0; var noFloor = false;
		for (i = 0; i < app.activeDocument.colorSamplers.length; i++) {
			brightValue[i] = (app.activeDocument.colorSamplers[i].color.rgb.red + app.activeDocument.colorSamplers[i].color.rgb.green + app.activeDocument.colorSamplers[i].color.rgb.blue) / 3;
			if (app.activeDocument.colorSamplers[i].color.hsb.saturation > 0.0) {
				brightValue[i] -= 100;
				//sortValues (brightValue);
				//alert("this is on model: "+i);		
			}
			if (brightValue[i] > 238) {	//counting out too bright spots (maybe clothes)
				brightValue[i] -= 100;
				//alert ("sehr hellen spot gefunden");
			}

		}
		var newSampler;
		for (ii = 0; ii < brightValue.length; ii++) {
			for (i = 0; i < brightValue.length; i++) {
				if (brightValue[i] < brightValue[i + 1]) {
					temp = brightValue[i];
					brightValue[i] = brightValue[i + 1];
					newSampler = app.activeDocument.colorSamplers[i + 1];
					brightValue[i + 1] = temp;
				}
			}

		}
		app.activeDocument.activeLayer = app.activeDocument.layerSets["Variant 1"].layerSets["Background 1"].artLayers.getByName("Retouch BG")
		//kiểm tra co ton tai channel
		if (channelWall != undefined) {
			activeDocument.selection.load(activeDocument.channels.getByName(channelWall))
		}
		action("CpTL")
		app.activeDocument.activeLayer = app.activeDocument.layerSets["Variant 1"].layerSets["Background 1"].artLayers[0]
		var curvesArray = Array(Array(0, 0), Array(brightValue[0], BG_curvesAdjust), Array(255, 255)); [[a,b],[a,b],[a,b]]
		app.activeDocument.activeLayer.adjustCurves(curvesArray);
		app.activeDocument.activeLayer.adjustLevels(0, BG_curvesAdjust, 1.0, 0, BG_curvesAdjust);
		action("Mrg2")
		app.activeDocument.info.caption = "freistellerOff";

	}

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

//check Mask
function hasMask() {
	var ref = new ActionReference();
	ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
	var desGet = executeActionGet(ref);
	return desGet.getBoolean(stringIDToTypeID("hasUserMask"));
}


//load selection mask
function loadSelectionMask() {
	var result = false
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
	try {
		var bounds = activeDocument.selection.bounds
		result = true
	} catch (error) {
		result = false
	}
	return result
}

//save selection Channel
function saveChannel(name) {
	desc977 = new ActionDescriptor();
	ref38 = new ActionReference();
	ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
	desc977.putReference(charIDToTypeID("null"), ref38);
	desc977.putString(charIDToTypeID("Nm  "), name);
	executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO);
	return activeDocument.channels.getByName(name);
}
function action(action) {
	var idCpTL = charIDToTypeID(action)
	executeAction(idCpTL, undefined, DialogModes.NO)
}
