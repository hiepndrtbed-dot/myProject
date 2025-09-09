
// Kich thuoc muon chuyen
var WIDTH = activeDocument.width;
var HEIGHT = activeDocument.height;

// Layer can chuyen
var bounds = activeDocument.activeLayer.bounds;
var layerWidth = bounds[2].as('px') - bounds[0].as('px');
var layerHeight = bounds[3].as('px') - bounds[1].as('px');

// 
var layerRatio = layerWidth / layerHeight;
var newWidth = WIDTH;
var newHeight = ((1.0 * WIDTH) / layerRatio);
if (newHeight >= HEIGHT) {
	newWidth = layerRatio * HEIGHT;
	newHeight = HEIGHT;
}

// 
var resizePercent = newWidth / layerWidth * 100;
app.activeDocument.activeLayer.resize(resizePercent, resizePercent);






