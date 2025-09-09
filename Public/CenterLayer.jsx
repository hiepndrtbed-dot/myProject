
var bounds = activeDocument.activeLayer.bounds;
var layerWidth = bounds[2].as('px') - bounds[0].as('px');
var layerHeight = bounds[3].as('px') - bounds[1].as('px');

ax = activeDocument.width / 2
bx = layerWidth / 2
ay = activeDocument.height / 2
by = layerHeight / 2
var X = ax - bx;
var Y = ay - by;
try {
    var doc = app.activeDocument;
    app.displayDialogs = DialogModes.NO;
    var strtRulerUnits = app.preferences.rulerUnits;
    var strtTypeUnits = app.preferences.typeUnits;
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;
    var LB = activeDocument.activeLayer.bounds;
    activeDocument.activeLayer.translate(X - LB[0].value, Y - LB[1].value);
} catch (e) { alert(e + "\nLine number = " + e.line); }
finally {
    app.preferences.rulerUnits = strtRulerUnits;
    app.preferences.typeUnits = strtTypeUnits;
}