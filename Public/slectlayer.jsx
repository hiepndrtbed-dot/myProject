alert(selectLayer("Layer 1"));
// function select(makeVisible, nameLayer) {
//     var c2t = function (s) {
//         return app.charIDToTypeID(s);
//     };
//     var s2t = function (s) {
//         return app.stringIDToTypeID(s);
//     };

//     var descriptor = new ActionDescriptor();
//     var list = new ActionList();
//     var reference = new ActionReference();

//     reference.putName(s2t("layer"), nameLayer);
//     descriptor.putReference(c2t("null"), reference);
//     descriptor.putBoolean(s2t("makeVisible"), makeVisible);
//     list.putInteger(10);
//     descriptor.putList(s2t("layerID"), list);
//     executeAction(s2t("select"), descriptor, DialogModes.NO);
// }

function selectLayer(layerName) {
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
        result = false;
    }

    return result;
}
