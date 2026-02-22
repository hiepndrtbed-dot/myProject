
// =======================================================


makeGuide(1,5);
makeGuide(1,10);

function makeGuide(position, guideUserValue) {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var descriptor2 = new ActionDescriptor();
	var reference = new ActionReference();
	var reference2 = new ActionReference();

	descriptor2.putUnitDouble(s2t("position"), s2t("percentUnit"), position);  // % percentUnit 
	descriptor2.putEnumerated(s2t("orientation"), s2t("orientation"), s2t("horizontal"));  // Doc =  vertical
	descriptor2.putEnumerated(s2t("kind"), s2t("kind"), s2t("document"));
	reference.putIdentifier(s2t("document"), 268);
	reference.putIndex(c2t("Gd  "), 27);
	descriptor2.putReference(c2t("null"), reference);
	descriptor.putObject(s2t("new"), c2t("Gd  "), descriptor2);
	reference2.putClass(c2t("Gd  "));
	descriptor.putReference(c2t("null"), reference2);
	descriptor.putEnumerated(s2t("guideTarget"), s2t("guideTarget"), s2t("guideTargetCanvas"));
	descriptor.putUnitDouble(s2t("guideUserValue"), s2t("percentUnit"), guideUserValue); // % percentUnit 
	executeAction(s2t("make"), descriptor, DialogModes.NO);
}

