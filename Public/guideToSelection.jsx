// #target Photoshop
main();
function main() {
    alert(1);

    if (!documents.length) return;
    var startRulerUnits = preferences.rulerUnits;
    try {
        preferences.rulerUnits = Units.PIXELS
        var SB = activeDocument.selection.bounds;
    } catch (e) { return; }
    guideLine(SB[1].value, "Hrzn");
    guideLine(SB[3].value, "Hrzn");
    guideLine(SB[0].value, "Vrtc");
    guideLine(SB[2].value, "Vrtc");
    preferences.rulerUnits = startRulerUnits;
}
function guideLine(position, type) {
    var desc = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(app.charIDToTypeID('Pstn'), app.charIDToTypeID('#Pxl'), position);
    desc2.putEnumerated(app.charIDToTypeID('Ornt'), app.charIDToTypeID('Ornt'), app.charIDToTypeID(type));
    desc.putObject(app.charIDToTypeID('Nw '), app.charIDToTypeID('Gd '), desc2);
    executeAction(app.charIDToTypeID('Mk '), desc, DialogModes.NO);
};
