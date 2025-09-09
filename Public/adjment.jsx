adjustmentLayer_Levels("dfasdfasf");


function adjustmentLayer_Levels(name) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };
    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var reference = new ActionReference();
    reference.putClass(s2t("adjustmentLayer"));
    descriptor.putReference(c2t("null"), reference);
    descriptor3.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
    descriptor2.putObject(s2t("type"), s2t("levels"), descriptor3);
    descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
    activeDocument.activeLayer.name = name;
}
