//By ACademy DN version: 1.0
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument
myPaths = app.activeDocument.pathItems

const withLayout = 2544 //Chiều rộng layout
const heightLayout = 1696 //Chiều cao layout
const marginLayout = 50 //Khoảng cách lề
const nameLayerGroup = "Variant 1";
(function () {
    this.numberH = 0
    this.paddingH = 120
    this.numberV = 0
    this.paddingV = 0
    this.widthProduct = 0
    this.heightProduct = 0
    this.widthLayout = 2544
    this.heightLayout = 1696

    resizeImages(this.widthLayout,this.heightLayout,this.widthLayout)

    //Check số lượng layer
    this.lengthLayer = function () {
        try {
            var lengthLayer = doc.layerSets[nameLayerGroup].artLayers.length
            return lengthLayer
        } catch (error) {
            alert("Sai cấu trúc!")
        }
    }
    //Check input.
    if (!!this.lengthLayer()) {
        //2 Stack
        if (this.lengthLayer() == 1) {
            this.numberH = 1
            this.paddingH = 0
            this.numberV = 1
            this.paddingV = 0
        }
        //2 Stack
        else if (this.lengthLayer() == 2) {
            this.numberH = 1
            this.paddingH = 0
            this.numberV = 2
            this.paddingV = 110
        }
        //3 Stack
        else if (this.lengthLayer() == 3) {
            this.numberH = 1
            this.paddingH = 0
            this.numberV = 3
            this.paddingV = 80
        }
        //4 Stack
        else if (this.lengthLayer() == 4) {
            this.numberH = 2
            this.paddingH = this.paddingH
            this.numberV = 2
            this.paddingV = 50
        }
        //5 Stack
        else if (this.lengthLayer() == 5) {
            this.numberH = 2
            this.paddingH = this.paddingH
            this.numberV = 3
            this.paddingV = 50.
        }
        //6 Stack
        else if (this.lengthLayer() == 6) {
            this.numberH = 2
            this.paddingH = this.paddingH
            this.numberV = 3
            this.paddingV = 50
        }

        //Tính kính thước Product từng stack theo yêu cầu.
        //Width
        this.widthProduct = function () {
            return (withLayout - (marginLayout * 2 + (this.paddingV * (this.numberV - 1)))) / this.numberV
        }

        //Height
        this.heightProduct = function () {
            return (heightLayout - (marginLayout * 2 + (this.paddingH * (this.numberH - 1)))) / this.numberH
        }

        //Resize Stack
        var withTemp = 0
        checkCountLyr = this.lengthLayer() % 2
        // Check count Stack
        if (checkCountLyr == 0) {
            countGr1 = this.lengthLayer() / 2
        } else {
            countGr1 = (this.lengthLayer() + 1) / 2
        }

        //Kiểm tra chiều rộng Stack.
        for (var i = 0; i < this.lengthLayer(); i++) {
            // Resize layer
            doc.activeLayer = doc.layerSets[nameLayerGroup].artLayers[i]
            doc.selection.selectAll()
            Algn("ADSLefts") //"ADSCentersV" Doc
            Algn("ADSBottoms") //"ADSCentersV" Ngang
            doc.selection.deselect()
            resizeLayer(this.widthProduct(), this.heightProduct())
            //Sắp xếp cấu trúc layout.
            //Tính chiều rộng và chiều cao của Product.
            var widthStack = doc.activeLayer.bounds[2] - doc.activeLayer.bounds[0]
            var heightStack = doc.activeLayer.bounds[3] - doc.activeLayer.bounds[1]
            if (i != 0) {
                // Stack < 3
                if (this.lengthLayer() <= 3) {
                    doc.activeLayer.translate(withTemp, 0)
                    withTemp = withTemp + widthStack + this.paddingV
                }

                // Stack > 3
                else if (this.lengthLayer() > 3) {
                    if (i < countGr1) {
                        doc.activeLayer.translate(withTemp, heightStack + this.paddingH)
                        if (i == countGr1 - 1) {// Kiem tra kết thúc Dòng 1 chưa thì reset lại withTemp
                            withTemp = 0
                        } else { // Chưa thì tiep tuc chay
                            withTemp = withTemp + widthStack + this.paddingV
                        }
                    } else { // Bắt đầu dòng 2
                        if (i == countGr1) {
                            doc.activeLayer.translate(0, 0)
                            withTemp = widthStack + this.paddingV
                        } else {
                            doc.activeLayer.translate(withTemp, 0)
                            withTemp = withTemp + widthStack + this.paddingV
                        }
                    }
                }
            } else {
                // Stack < 3
                if (this.lengthLayer() <= 3) {
                    withTemp = widthStack + this.paddingV
                }
                
                // Stack > 3
                else if (this.lengthLayer() > 3) {
                    withTemp = widthStack + this.paddingV
                    doc.activeLayer.translate(0, heightStack + this.paddingH)
                }
            }
        }//end FOR

        // Align
        doc.activeLayer = doc.layerSets[nameLayerGroup]
        doc.selection.selectAll()
        Algn("ADSCentersH") // "ADSCentersV" Doc
        Algn("ADSCentersV") // "ADSCentersV" Ngang
        if (this.lengthLayer() > 3) {
            doc.activeLayer = doc.layerSets[nameLayerGroup].artLayers[countGr1]
            selectGroupLayer(doc.layerSets[nameLayerGroup].artLayers[this.lengthLayer() - 1].name)
            makeGroup("Temp")
            Algn("ADSCentersH") // "ADSCentersV" Doc
            unGroup()
            doc.activeLayer = doc.layerSets[nameLayerGroup].artLayers[0]
            selectGroupLayer(doc.layerSets[nameLayerGroup].artLayers[countGr1 - 1].name)
            makeGroup("Temp")
            Algn("ADSCentersH") // "ADSCentersV" Doc
            unGroup()
        }
        doc.selection.deselect()
    }//End check Struct
    // purgeAll()
})()


//Resize layer
function resizeLayer(width, height) {
    WIDTH = width;
    HEIGHT = height;
    bounds = activeDocument.activeLayer.bounds;
    layerWidth = bounds[2].as('px') - bounds[0].as('px');
    layerHeight = bounds[3].as('px') - bounds[1].as('px');
    layerRatio = layerWidth / layerHeight;
    newWidth = WIDTH;
    newHeight = ((1.0 * WIDTH) / layerRatio);
    if (newHeight >= HEIGHT) {
        newWidth = layerRatio * HEIGHT;
        newHeight = HEIGHT;
    }
    resizePercent = newWidth / layerWidth * 100;
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.BOTTOMLEFT);
}

function resizeImages(finalWidth, finalHeight, heightImg) {
    var docRef = activeDocument
    //Resize image according to shape
    var actualWidth = docRef.width;
    var actualHeight = docRef.height;
    var imgHeight = heightImg;
    var imgWidth = actualWidth * imgHeight / actualHeight;
    if (imgWidth > heightImg) {
        imgWidth = heightImg;
        imgHeight = actualHeight * imgWidth / actualWidth;
    }
    docRef.resizeImage(imgWidth, imgHeight);
    docRef.resizeCanvas(finalWidth, finalHeight, AnchorPosition.MIDDLECENTER);
}

function Algn(algn) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putEnumerated(s2t("using"), s2t("alignDistributeSelector"), s2t(algn));
    descriptor.putBoolean(s2t("alignToCanvas"), false);
    executeAction(c2t("Algn"), descriptor, DialogModes.NO);
}

function selectGroupLayer(after) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var list = new ActionList();
    var reference = new ActionReference();

    reference.putName(s2t("layer"), after);
    descriptor.putReference(c2t("null"), reference);
    descriptor.putEnumerated(s2t("selectionModifier"), s2t("selectionModifierType"), s2t("addToSelectionContinuous"));
    descriptor.putBoolean(s2t("makeVisible"), false);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

function purgeAll() {
    var idPrge = charIDToTypeID("Prge");
    var desc7726 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var idPrgI = charIDToTypeID("PrgI");
    var idAl = charIDToTypeID("Al  ");
    desc7726.putEnumerated(idnull, idPrgI, idAl);
    executeAction(idPrge, desc7726, DialogModes.NO);
}

function makeGroup(nameGroup) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();
    reference.putClass(s2t("layerSection"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(s2t("from"), reference2);
    descriptor.putString(s2t("name"), nameGroup);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

function unGroup() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};
	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();
	reference.putEnumerated( s2t( "layer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	executeAction( s2t( "ungroupLayersEvent" ), descriptor, DialogModes.NO );
}


function name(withLayout, heightLayout, marginLayout, numberV, paddingV, numberH, paddingH) {

    //Công thức chung
    Width: (withLayout - (marginLayout * 2 + (paddingV * (numberV - 1)))) / numberV
    Height: (heightLayout - (marginLayout * 2 + (paddingH * (numberH - 1)))) / numberH

    //Trả về kích thước.
    return ["width", "height"]
}
/*
//các function
1. resizeImage()
2. moveLayer()
3. filterLayer()


1 Gr:
Margin: 50
PaddingV: 0
paddingH: 0
Width: widthImage - (margin * 2 + paddingV)
ex: 2544 - (50 * 2 + 0)
Height: heightImage - (margin * 2 + paddingV)

2 Gr:
Margin: 50
paddingV: 110
paddingH: 0
numberH: 1
numberV: 2
Width: (widthImage - (margin * 2 + (paddingV * (numberV - 1)))) / numberV
ex: (2544 - (50 * 2 + 110 * (2 - 1))) / 2
Height: (heightImage - (margin * 2 + (paddingH * (numberH - 1)))) / numberH
ex: (1696 - (50 * 2 + 0)) / 1

3 Gr:
Margin: 50
paddingV: 80
paddingH: 0
numberH: 1
numberV: 3
Width: (widthImage - (margin * 2 + (paddingV * (numberV - 1)))) / numberV
ex: (2544 - (50 * 2 + (80 * (3 - 1)))) / 3
Height: (heightImage - (margin * 2 + (paddingH * (numberH - 1)))) / numberH
ex: (1696 - (50 * 2 + (0 * (1 - 1)))) / 1

4 Gr:
Margin: 50
paddingV: 50
paddingH: 400
numberH: 2
numberV: 2
Width: (widthImage - (margin * 2 + (paddingV * (numberV - 1)))) / numberV
ex: (2544 - (50 * 2 + (50 * (2 - 1)))) / 2
Height: (heightImage - (margin * 2 + (paddingH * (numberH - 1)))) / numberH
Ex: (1696 - (50 * 2 + (400 * (2 - 1)))) / 2

5 Gr:
Margin: 50
paddingV: 50
paddingH: 400
numberH: 2
numberV: 3
Width: widthImage - (margin * 2 + paddingV * 2)
Height: heightImage / 2 - (paddingH / 2 + margin)

6 Gr:
Margin: 50
paddingV: 50
paddingH: 400
numberH: 2
numberV: 3
Width: widthImage - (margin * 2 + paddingV * 2)
Height: heightImage / 2 - (paddingH / 2 + margin)

*/




