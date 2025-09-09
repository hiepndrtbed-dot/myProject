var bounds = activeDocument.activeLayer.layers.length;
if (bounds < 1) {
    make("temp");
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