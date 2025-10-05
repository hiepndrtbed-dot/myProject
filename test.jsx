function makeLevelsAdjustment() {
    var idMk = charIDToTypeID("Mk  ");
    var desc232 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref1 = new ActionReference();
    var idAdjL = charIDToTypeID("AdjL");
    ref1.putClass(idAdjL);
    desc232.putReference(idnull, ref1);
    var idUsng = charIDToTypeID("Usng");
    var desc233 = new ActionDescriptor();
    var idType = charIDToTypeID("Type");
    var desc234 = new ActionDescriptor();
    var idpresetKind = stringIDToTypeID("presetKind");
    var idpresetKindType = stringIDToTypeID("presetKindType");
    var idpresetKindDefault = stringIDToTypeID("presetKindDefault");
    desc234.putEnumerated(idpresetKind, idpresetKindType, idpresetKindDefault);
    var idLvls = charIDToTypeID("Lvls");
    desc233.putObject(idType, idLvls, desc234);
    var idAdjL = charIDToTypeID("AdjL");
    desc232.putObject(idUsng, idAdjL, desc233);
    executeAction(idMk, desc232, DialogModes.NO);
}

// 👉 Gọi hàm
makeLevelsAdjustment();
setLevels(1.2);


function setLevels(middle) {
    cTID = function (s) { return app.charIDToTypeID(s); };
    sTID = function (s) { return app.stringIDToTypeID(s); };
    var enabled;
    var withDialog;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putEnumerated(sTID("presetKind"), sTID("presetKindType"), sTID("presetKindCustom"));
    var list1 = new ActionList();
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Cmps'));
    desc2.putReference(cTID('Chnl'), ref1);
    desc2.putDouble(cTID('Gmm '), middle);
    list1.putObject(cTID('LvlA'), desc2);
    desc1.putList(cTID('Adjs'), list1);
    executeAction(cTID('Lvls'), desc1, dialogMode);
}