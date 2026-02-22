// Create new empty layer
var newLayer = activeDocument.artLayers.add();
newLayer.name = "Black Rectangle";

// Create black rectangle
var width = activeDocument.width;
var height = activeDocument.height;

// Ở đây sai cú pháp anh.//
//[[left, top], [left, bottom], [right, bottom], [right, top]];

leftSelection = width * 0.05
topSelection = height * 0.05
rightSelection = width - width * 0.05
bottomSelection = height - height * 0.05

var rect = [[leftSelection, topSelection], [leftSelection, bottomSelection], [rightSelection, bottomSelection], [rightSelection, topSelection]];

activeDocument.selection.select(rect);

activeDocument.selection.fill(app.foregroundColor);

// Create new empty layer
var newLayer2 = activeDocument.artLayers.add();
newLayer2.name = "Red Layer";

// Fill new layer with red
var redColor = new SolidColor();
redColor.rgb.red = 255;
redColor.rgb.green = 0;
redColor.rgb.blue = 0;
activeDocument.selection.fill(redColor);

// newLayer2.applyColor(redColor);
