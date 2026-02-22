// alert(activeDocument.pathItems.length);
// activeDocument.selection.load(activeDocument.pathItems.getByName('Work Path'));
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument
    ; (function () {
        var arrVer = countVariant()
        // shadow_desaturate(1)
        for (var i = 1; i <= arrVer; i++) {
            doc.activeLayer = doc.layerSets["Variant " + i]
            if (checkAlllockLayer() == false) {
                if (i >= 2) {
                    doc.activeLayer = doc.layerSets["Variant 1"]
                    doc.activeLayer.visible = false
                    doc.layerSets["Variant " + i].visible = true
                }
                if (doc.quickMaskMode == false && (checkSelectionName("Pr") == false)) {
                    // try { doc.channels.removeAll(); } catch (err) { }
                    try {
                        doc.pathItems.getByName("Work Path").remove()
                    } catch (err) { }
                    visibleGroup("Resources")
                    visibleGroup()
                    doc.layerSets["Variant " + i].visible = true
                    copy_shadow(i)
                    break
                }
                else {
                    logAction("Log_Shadow_Alpha")
                    Alpha_Deasturate(i)
                    //check_shadow(i)
                    break
                }
            }
        }
        function copy_shadow(vr) {
            grVariant = doc.layerSets["Variant " + vr]
            grColor = grVariant.layerSets["Color " + vr]
            grItem = grVariant.layerSets["Item " + vr]
            grShadow = grVariant.layerSets["Shadow " + vr]
            grBg = grVariant.layerSets["Background " + vr]

            /////////////////////////////
            try {
                grVariant = doc.layerSets["Variant " + vr].layerSets["Item " + vr].artLayers["Stencil"]
                doc.revealAll()
            } catch (error) {

            }
            doc.guides.removeAll()
            doc.activeLayer = grItem
            lengthItem = doc.activeLayer.layers.length
            for (var i = 0; i < lengthItem; i++) {
                //copy product
                doc.activeLayer = doc.activeLayer.layers[i]
                var searchProduct = doc.activeLayer.name.search("Product")
                if (searchProduct == 0) {
                    loadSelectionMask()
                    // doc.selection.feather(2)
                    try { saveSelection("Pr") } catch (error) { }
                    selectRGB()
                    doc.selection.selectAll()
                    doc.selection.copy()
                    doc.selection.deselect()
                    //paste
                    doc.activeLayer = grShadow
                    lengthShadow = doc.activeLayer.layers.length
                    if (lengthShadow == 0) {
                        pasteFoder()
                        doc.activeLayer.name = "temp_shadow"
                    } else {
                        for (var i = 0; i < lengthShadow; i++) {
                            doc.activeLayer = doc.activeLayer.layers[0]
                            doc.activeLayer.remove()
                            doc.activeLayer = doc.activeLayer.parent
                        }
                        doc.activeLayer = grShadow
                        pasteFoder()
                        doc.activeLayer.name = "temp_shadow"
                    }
                    break
                }
                doc.activeLayer = doc.activeLayer.parent
            }

            doc.activeLayer = grItem
            for (var i = 0; i < lengthItem; i++) {
                doc.activeLayer = grItem.artLayers[i]
                var nameLayer = doc.activeLayer.name
                var searchProduct = doc.activeLayer.name.search("Product")
                if (searchProduct == 0) {
                    doc.activeLayer = grShadow.artLayers["temp_shadow"]
                    break
                }
                else if (nameLayer != "Stencil") {
                    var bounds = activeDocument.activeLayer.bounds[2]
                    if (bounds != 0) {
                        copyMerge()
                    }
                    doc.activeLayer = grItem
                } else {
                    doc.activeLayer.visible = true
                    newGuidesFromLayer()
                    doc.activeLayer.visible = false
                }
            }

            function copyMerge() {
                try {
                    doc.selection.selectAll()
                    doc.selection.copy()
                    doc.selection.deselect()
                    doc.activeLayer = grShadow.artLayers["temp_shadow"]
                    pasteFoder()
                    doc.activeLayer.merge()
                } catch (error) {
                    doc.activeLayer = grShadow.artLayers["temp_shadow"]
                    doc.selection.deselect()
                }
            }

            doc.activeLayer = grShadow.artLayers["temp_shadow"]
            // doc.quickMaskMode = true
            doc.selection.load(doc.channels.getByName("Pr"))
            doc.selection.expand(1)
            doc.selection.feather(3)
            doc.selection.invert()
            clearShadow()
            doc.selection.contract(15)
            doc.selection.feather(5)
            dust(8, 5)
            doc.selection.deselect()
            doc.activeLayer.desaturate()
            actionFilter("Lvls")
            selectBrushTool()
        }//end copy_shadow
        //Giu bong goc
        function Alpha_Deasturate(vr) {
            grVariant = doc.layerSets["Variant " + vr]
            grColor = grVariant.layerSets["Color " + vr]
            grItem = grVariant.layerSets["Item " + vr]
            grShadow = grVariant.layerSets["Shadow " + vr]
            grBg = grVariant.layerSets["Background " + vr]

            doc.activeLayer = grShadow.artLayers["temp_shadow"]
            if (workPathExists()) {
                try { doc.quickMaskMode = false } catch (error) { }
                doc.pathItems.getByName("Work Path").deselect()
                doc.pathItems.getByName("Work Path").makeSelection()
                action("Fthr")
                saveSelection("selection")
                doc.selection.deselect()
                doc.selection.load(doc.channels.getByName("selection"))
                doc.activeLayer = grShadow.artLayers["temp_shadow"]
                makeLayerMask(); selectRGB()
                disableMask()
                doc.selection.deselect()
                doc.activeLayer.name = "Natural"
            } else {
                doc.quickMaskMode = false
                doc.selection.invert()
                saveSelection("selection")
                doc.selection.deselect()
                doc.activeLayer = grShadow.artLayers["temp_shadow"]
                showLayer("temp_shadow")
                loadSelectionChannel()
                showLayer("temp_shadow")
                doc.selection.invert()
                makeLayer("Alpha_dasaturate")
                fillColor(0, 0, 0)
                grShadow.artLayers['temp_shadow'].remove()
                doc.selection.load(doc.channels.getByName("selection"))
                addMask(); selectRGB()
                try { doc.channels.getByName("selection").remove(); } catch (err) { }
            }
            doc.activeLayer = grShadow.artLayers[0]
            check_canvas(vr)
            doc.activeLayer = grShadow.artLayers[1]
            check_shadow(vr)
            selectEraseTool()
        }

        //Kiem tra bong
        function check_shadow(vr) {
            grVariant = doc.layerSets["Variant " + vr]
            grColor = grVariant.layerSets["Color " + vr]
            grItem = grVariant.layerSets["Item " + vr]
            grShadow = grVariant.layerSets["Shadow " + vr]
            grBg = grVariant.layerSets["Background " + vr]

            var guideSelection = guidesToSelection()
            try {
                var bounds = doc.selection.bounds
                var widthStencil = bounds[2] - bounds[0]
                var heightStencil = bounds[3] - bounds[1]
                if (guideSelection == true && (parseInt(widthStencil) != parseInt(doc.width) || parseInt(heightStencil) != parseInt(doc.height))) {
                    doc.selection.load(doc.channels.getByName("Pr"))
                    var boundsProduct = doc.selection.bounds
                    doc.selection.deselect()
                    // alert(bounds[1])
                    // alert(boundsProduct[1])
                    if (parseInt(boundsProduct[0]) > parseInt(bounds[0]) &&
                        parseInt(boundsProduct[2]) < parseInt(bounds[2]) &&
                        parseInt(boundsProduct[1]) > parseInt(bounds[1]) &&
                        parseInt(boundsProduct[3]) < parseInt(bounds[3])) {
                        guidesToSelection()
                        doc.selection.contract(4)
                        doc.selection.invert()
                        doc.activeLayer = grShadow.artLayers["Alpha_dasaturate"]
                        selectMask()
                        fillColor(0, 0, 0, 0)
                        guidesToSelection()
                        doc.selection.contract(4)
                        doc.selection.invert()
                        doc.selection.feather(3)
                        selectMask()
                        fillColor(0, 0, 0, 0)
                        doc.selection.deselect()
                    }
                }
                // else if (parseInt(widthStencil) == parseInt(doc.width) || parseInt(heightStencil) == parseInt(doc.height)) {
                //     left = bounds[0] + 4
                //     right = bounds[2] - bounds[0] - 4
                //     top = bounds[1] + 4
                //     bottom = bounds[3] - bounds[1] - 4
                //     makeSelection(left, right, top, bottom)
                //     doc.activeLayer = grShadow.artLayers["Natural"]
                //         selectMask()
                //         doc.selection.invert()
                //         fillColor(0, 0, 0, 0)
                //         doc.selection.deselect()
                // } 
                else {
                    doc.selection.deselect()
                }
            } catch (error) {

            }
            try { doc.channels.getByName("Pr").remove(); } catch (err) { }
            selectMask()
            applyMask()
            makeSlice()

        }
        //kiem tra le shadow
        function check_canvas(vr) {
            makeLevels()
            doc.activeLayer.name = "Check_Shadow"
            doc.activeLayer.opacity = 50
            doc.activeLayer.visible = false
            setLevels()
            // doc.activeLayer.visible =false
        }

    })()

//Check so luong variant.
function countVariant() {
    length = doc.layerSets.length - 2
    return length
}

function clearShadow() {
    try {
        // dust(8, 5)
        cameraRaw(100, 30)
    } catch (error) {
    }
}
function makeSelection(left, right, top, bottom) {
    result = false
    try {
        //leftTop, leftBottom, rightBottom rightTop
        shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
        doc.selection.select(shapeRef)
        result = true
    } catch (error) {
    }
    return result
}

function guidesToSelection() {
    var result = false
    try {
        var left = doc.guides[0].coordinate //left
        var right = doc.guides[1].coordinate //right
        var top = doc.guides[2].coordinate	//top
        var bottom = doc.guides[3].coordinate // bottom
        //eftTop, leftBottom, rightBottom rightTop
        var shapeRef = [[left, top], [left, bottom], [right, bottom], [right, top]];
        doc.selection.select(shapeRef)
        result = true
    } catch (error) {
    }
    return result
}
//kiem tra ton tai  ten path
function workPathExists() {
    var result = false;
    lengthPath = doc.pathItems.length
    try {
        if (String(activeDocument.pathItems[lengthPath - 1].name) == "Work Path") {
            result = true;
        }
    } catch (error) {
        result = false;
    }
    return result;
}

function action(action) {
    var idCpTL = charIDToTypeID(action);
    executeAction(idCpTL, undefined, DialogModes.NO);
}

function actionFilter(params) {
    try {
        var idLqFy = charIDToTypeID(params);
        executeAction(idLqFy, undefined, DialogModes.ALL);
    } catch (error) { }
}
function selectEraseTool() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putClass( s2t( "eraserTool" ));
	descriptor.putReference( c2t( "null" ), reference );
	executeAction( s2t( "select" ), descriptor, DialogModes.NO );
}
function fillColor(red, green, blue) {
    var myColor = new SolidColor();
    myColor.rgb.red = red; // 0 - 255
    myColor.rgb.green = green;
    myColor.rgb.blue = blue;
    activeDocument.selection.fill(myColor);
}

function makeLevels() {
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
    descriptor3.putReference(c2t("null"), reference);
    descriptor2.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
    descriptor.putObject(s2t("type"), s2t("levels"), descriptor2);
    descriptor3.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor);
    executeAction(s2t("make"), descriptor3, DialogModes.NO);
}

function setLevels() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var list = new ActionList();
    var list2 = new ActionList();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
    descriptor3.putReference(s2t("channel"), reference2);
    list2.putInteger(250);
    list2.putInteger(255);
    descriptor3.putList(s2t("input"), list2);
    list.putObject(s2t("levelsAdjustment"), descriptor3);
    descriptor2.putList(s2t("adjustment"), list);
    descriptor.putObject(s2t("to"), s2t("levels"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}
//save vung chon
function saveSelection(name2) {
    if (name2 != null) {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();

        reference.putProperty(s2t("channel"), s2t("selection"));
        descriptor.putReference(c2t("null"), reference);
        descriptor.putString(s2t("name"), name2);
        executeAction(s2t("duplicate"), descriptor, DialogModes.NO);
    } else {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();

        reference.putProperty(s2t("channel"), s2t("selection"));
        descriptor.putReference(c2t("null"), reference);
        executeAction(s2t("duplicate"), descriptor, DialogModes.NO);
    }
}
function makeSlice() {
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

    reference.putClass(s2t("slice"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putEnumerated(s2t("type"), s2t("sliceType"), s2t("layer"));
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor2.putReference(s2t("layer"), reference2);
    descriptor.putObject(s2t("using"), s2t("slice"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

function visibleGroup(Group) {
    if (!Group) {
        for (var i = 1; i < doc.layers.length - 2; i++) {
            setSelectedLayer("Variant " + String(i + 1)) == true ? doc.activeLayer.visible = false : "";
        }
    } else {
        setSelectedLayer(Group);
        doc.activeLayer.visible = false;
    }
}


//select layer
function setSelectedLayer(layerName) {
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
    }
    return result;
}
function layerLocker(layer1) {
    var lLock = false;
    if (setSelectedLayer(layer1) == true) {
        if (activeDocument.activeLayer.allLocked) {
            lLock = true;
        }
    }
    return lLock;
}

function checkAlllockLayer() {
    var result = false;
    try {
        if (doc.activeLayer.allLocked ||
            doc.activeLayer.pixelsLocked ||
            doc.activeLayer.positionLocked ||
            doc.activeLayer.transparentPixelsLocked) {
            result = true;
        }
    } catch (error) { }
    return result;
}
//kiem tra ton tai selection với tên .....
function checkSelectionName(nameChannel) {
    var result = false;
    try {
        var channelRef = doc.channels.getByName(nameChannel);
        if (channelRef) {
            // app.activeDocument.selection.load(channelRef);
            result = true;
        }
    } catch (error) { }
    return result;
}

function makeLayerMask() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    descriptor.putClass(s2t("new"), s2t("channel"));
    reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("mask"));
    descriptor.putReference(s2t("at"), reference);
    descriptor.putEnumerated(s2t("using"), c2t("UsrM"), s2t("revealSelection"));
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

function disableMask() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putBoolean(c2t("UsrM"), false);
    descriptor.putObject(s2t("to"), s2t("layer"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}
function selectRGB() {
    // activeDocument.activeLayer = lyr;
    var idslct = charIDToTypeID("slct");
    var desc219 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref138 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idRGB = charIDToTypeID("RGB ");
    ref138.putEnumerated(idChnl, idChnl, idRGB);
    desc219.putReference(idnull, ref138);
    var idMkVs = charIDToTypeID("MkVs");
    desc219.putBoolean(idMkVs, false);
    executeAction(idslct, desc219, DialogModes.NO);
}

function moveDown(params) {
    var idslct = charIDToTypeID("slct");
    var desc704 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref513 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idBckw = charIDToTypeID("Bckw");
    ref513.putEnumerated(idLyr, idOrdn, idBckw);
    desc704.putReference(idnull, ref513);
    var idMkVs = charIDToTypeID("MkVs");
    desc704.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    var list155 = new ActionList();
    list155.putInteger(114);
    desc704.putList(idLyrI, list155);
    executeAction(idslct, desc704, DialogModes.NO);
}

function moveBack() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("previous"));
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("move"), descriptor, DialogModes.NO);
}


function selectGroupLayer(before, after) {
    setSelectedLayer(before);
    var idslct = charIDToTypeID("slct");
    var desc360 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref187 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref187.putName(idLyr, after);
    desc360.putReference(idnull, ref187);
    var idselectionModifier = stringIDToTypeID("selectionModifier");
    var idselectionModifierType = stringIDToTypeID("selectionModifierType");
    var idaddToSelectionContinuous = stringIDToTypeID("addToSelectionContinuous");
    desc360.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelectionContinuous);
    var idMkVs = charIDToTypeID("MkVs");
    desc360.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    var list94 = new ActionList();
    desc360.putList(idLyrI, list94);
    executeAction(idslct, desc360, DialogModes.NO);
}
function deleteMask(params) {
    var idDlt = charIDToTypeID("Dlt ");
    var desc4950 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref1060 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref1060.putEnumerated(idChnl, idChnl, idMsk);
    desc4950.putReference(idnull, ref1060);
    executeAction(idDlt, desc4950, DialogModes.NO);
}

function makeLayer(name) {
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
    descriptor2.putString(s2t("name"), name);
    descriptor.putObject(s2t("using"), s2t("layer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

//ungroup 
function ungroupLayersEvent() {
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
    executeAction(s2t("ungroupLayersEvent"), descriptor, DialogModes.NO);
}

//Gry "Vlt "Bl  "Grn "Ylw "Orng" 
function setColorLayer(color) {
    var idsetd = charIDToTypeID("setd");
    var desc18 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref8 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref8.putEnumerated(idLyr, idOrdn, idTrgt);
    desc18.putReference(idnull, ref8);
    var idT = charIDToTypeID("T   ");
    var desc19 = new ActionDescriptor();
    var idClr = charIDToTypeID("Clr ");
    var idClr = charIDToTypeID("Clr ");
    var idBl = charIDToTypeID(color);
    desc19.putEnumerated(idClr, idClr, idBl);
    var idLyr = charIDToTypeID("Lyr ");
    desc18.putObject(idT, idLyr, desc19);
    executeAction(idsetd, desc18, DialogModes.NO);
}

function pasteFoder() {
    try {
        var idpast = charIDToTypeID("past");
        var desc262 = new ActionDescriptor();
        var idinPlace = stringIDToTypeID("inPlace");
        desc262.putBoolean(idinPlace, true);
        var idAntA = charIDToTypeID("AntA");
        var idAnnt = charIDToTypeID("Annt");
        var idAnno = charIDToTypeID("Anno");
        desc262.putEnumerated(idAntA, idAnnt, idAnno);
        var idAs = charIDToTypeID("As  ");
        var idPxel = charIDToTypeID("Pxel");
        desc262.putClass(idAs, idPxel);
        executeAction(idpast, desc262, DialogModes.NO);

    } catch (e) {
        //alert("err");
    }
}
//add mask
function addMask() {
    var idMk = charIDToTypeID("Mk  ");
    var desc358 = new ActionDescriptor();
    var idNw = charIDToTypeID("Nw  ");
    var idChnl = charIDToTypeID("Chnl");
    desc358.putClass(idNw, idChnl);
    var idAt = charIDToTypeID("At  ");
    var ref208 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref208.putEnumerated(idChnl, idChnl, idMsk);
    desc358.putReference(idAt, ref208);
    var idUsng = charIDToTypeID("Usng");
    var idUsrM = charIDToTypeID("UsrM");
    var idRvlS = charIDToTypeID("RvlS");
    desc358.putEnumerated(idUsng, idUsrM, idRvlS);
    executeAction(idMk, desc358, DialogModes.NO);
}

function loadSelectionVectorMask() {
    var idsetd = charIDToTypeID("setd");
    var desc48 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref27 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref27.putProperty(idChnl, idfsel);
    desc48.putReference(idnull, ref27);
    var idT = charIDToTypeID("T   ");
    var ref28 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    var idPath = charIDToTypeID("Path");
    var idvectorMask = stringIDToTypeID("vectorMask");
    ref28.putEnumerated(idPath, idPath, idvectorMask);
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref28.putEnumerated(idLyr, idOrdn, idTrgt);
    desc48.putReference(idT, ref28);
    var idVrsn = charIDToTypeID("Vrsn");
    desc48.putInteger(idVrsn, 1);
    var idvectorMaskParams = stringIDToTypeID("vectorMaskParams");
    desc48.putBoolean(idvectorMaskParams, true);
    executeAction(idsetd, desc48, DialogModes.NO);
}


//load selection mask
function loadSelectionMask() {
    var idsetd = charIDToTypeID("setd");
    var desc32 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref14 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref14.putProperty(idChnl, idfsel);
    desc32.putReference(idnull, ref14);
    var idT = charIDToTypeID("T   ");
    var ref15 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref15.putEnumerated(idChnl, idChnl, idMsk);
    desc32.putReference(idT, ref15);
    executeAction(idsetd, desc32, DialogModes.NO);
}

function subtract(selection) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putName(s2t("channel"), selection);
    descriptor.putReference(c2t("null"), reference);
    reference2.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(s2t("from"), reference2);
    executeAction(s2t("subtract"), descriptor, DialogModes.NO);
}

function Intr() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("transparencyEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(s2t("with"), reference2);
    executeAction(c2t("Intr"), descriptor, DialogModes.NO);
}

//function check History colorCopy
function makeHistoryRandum() {
    var randumHistory = Math.random();
    makeHistory(randumHistory);
    return randumHistory;
}

//Save History
function makeHistory(name2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putClass(s2t("snapshotClass"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putProperty(c2t("HstS"), s2t("currentHistoryState"));
    descriptor.putReference(s2t("from"), reference2);
    descriptor.putString(s2t("name"), name2);
    descriptor.putEnumerated(s2t("using"), c2t("HstS"), s2t("fullDocument"));
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

//save history
function saveHistory() {
    var idsetd = charIDToTypeID("setd");
    var desc976 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref407 = new ActionReference();
    var idHstS = charIDToTypeID("HstS");
    var idHstB = charIDToTypeID("HstB");
    ref407.putProperty(idHstS, idHstB);
    desc976.putReference(idnull, ref407);
    var idT = charIDToTypeID("T   ");
    var ref408 = new ActionReference();
    var idHstS = charIDToTypeID("HstS");
    var idCrnH = charIDToTypeID("CrnH");
    ref408.putProperty(idHstS, idCrnH);
    desc976.putReference(idT, ref408);
    executeAction(idsetd, desc976, DialogModes.NO);
}


function loadSelectionChannel() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("RGB"));
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}
function showCurentLayer() {
    var idShw = charIDToTypeID("Shw ");
    var desc294 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var list43 = new ActionList();
    var ref83 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref83.putEnumerated(idLyr, idOrdn, idTrgt);
    list43.putReference(ref83);
    desc294.putList(idnull, list43);
    var idTglO = charIDToTypeID("TglO");
    desc294.putBoolean(idTglO, true);
    executeAction(idShw, desc294, DialogModes.NO);

}

function showLayer(layer) {
    var c2t = function (s) {
        return app.charIDToTypeID(s)
    }

    var s2t = function (s) {
        return app.stringIDToTypeID(s)
    }

    var descriptor = new ActionDescriptor()
    var list = new ActionList()
    var reference = new ActionReference()

    reference.putName(s2t("layer"), layer)
    list.putReference(reference)
    descriptor.putList(c2t("null"), list)
    descriptor.putBoolean(c2t("TglO"), true)
    executeAction(s2t("show"), descriptor, DialogModes.NO)
}

function subtractFrom(horizontal, vertical) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putUnitDouble(s2t("horizontal"), s2t("percentUnit"), horizontal);
    descriptor2.putUnitDouble(s2t("vertical"), s2t("percentUnit"), vertical);
    descriptor.putObject(s2t("to"), c2t("Pnt "), descriptor2);
    descriptor.putInteger(s2t("tolerance"), 0);
    descriptor.putBoolean(s2t("merged"), true);
    descriptor.putBoolean(c2t("AntA"), true);
    descriptor.putBoolean(s2t("contiguous"), true);
    executeAction(s2t("subtractFrom"), descriptor, DialogModes.NO);
}

function selectMask() {
    var idslct = charIDToTypeID("slct");
    var desc444 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref248 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref248.putEnumerated(idChnl, idChnl, idMsk);
    desc444.putReference(idnull, ref248);
    var idMkVs = charIDToTypeID("MkVs");
    desc444.putBoolean(idMkVs, false);
    executeAction(idslct, desc444, DialogModes.NO);
}

function loadSelectionCurentLayer() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("transparencyEnum"));
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

function loadSelectionLayer(lyr) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putProperty(s2t("channel"), s2t("selection"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("transparencyEnum"));
    reference2.putName(s2t("layer"), lyr);
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

function applyMask() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("channel"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putBoolean(s2t("apply"), true);
    executeAction(s2t("delete"), descriptor, DialogModes.NO);
}

function hueSaturation(colorize, hue, Strt, lightness) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var list = new ActionList();

    descriptor.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    descriptor.putBoolean(s2t("colorize"), colorize);
    descriptor2.putInteger(s2t("hue"), hue);
    descriptor2.putInteger(c2t("Strt"), Strt);
    descriptor2.putInteger(s2t("lightness"), lightness);
    list.putObject(s2t("hueSatAdjustmentV2"), descriptor2);
    descriptor.putList(s2t("adjustment"), list);
    executeAction(s2t("hueSaturation"), descriptor, DialogModes.NO);
}

function canvasSize(width, height) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    descriptor.putBoolean(s2t("relative"), true);
    descriptor.putUnitDouble(s2t("width"), s2t("percentUnit"), width);
    descriptor.putUnitDouble(s2t("height"), s2t("percentUnit"), height);
    descriptor.putEnumerated(s2t("horizontal"), s2t("horizontalLocation"), c2t("Cntr"));
    descriptor.putEnumerated(s2t("vertical"), s2t("verticalLocation"), c2t("Cntr"));
    executeAction(s2t("canvasSize"), descriptor, DialogModes.NO);
}


function logAction(params) {
    var logNameAct = new File("//172.16.2.2/Public Data/Academy/LogAction/" + params + ".log");
    if (logNameAct.exists) {
        logNameAct.open("r")
        logText = logNameAct.read()
        const y = Number(logText)
        var addText = y + 1
        logNameAct.close()
        logNameAct.remove()
        logNameAct.open("w")
        logNameAct.write(addText)
        logNameAct.close()
    } else {
        logNameAct.open("w")
        logNameAct.write(1)
        logNameAct.close()
    }
}
function crop(top, left, bottom, right) {
    var idCrop = charIDToTypeID("Crop")
    var desc11 = new ActionDescriptor()
    var idT = charIDToTypeID("T   ")
    var desc12 = new ActionDescriptor()
    var idTop = charIDToTypeID("Top ")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idTop, idPxl, top)
    var idLeft = charIDToTypeID("Left")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idLeft, idPxl, left)
    var idBtom = charIDToTypeID("Btom")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idBtom, idPxl, bottom)
    var idRght = charIDToTypeID("Rght")
    var idPxl = charIDToTypeID("#Pxl")
    desc12.putUnitDouble(idRght, idPxl, right)
    var idRctn = charIDToTypeID("Rctn")
    desc11.putObject(idT, idRctn, desc12)
    var idAngl = charIDToTypeID("Angl")
    var idAng = charIDToTypeID("#Ang")
    desc11.putUnitDouble(idAngl, idAng, 0.000000)
    var idDlt = charIDToTypeID("Dlt ")
    desc11.putBoolean(idDlt, false)
    var idcropAspectRatioModeKey = stringIDToTypeID("cropAspectRatioModeKey")
    var idcropAspectRatioModeClass = stringIDToTypeID("cropAspectRatioModeClass")
    var idtargetSize = stringIDToTypeID("targetSize")
    desc11.putEnumerated(idcropAspectRatioModeKey, idcropAspectRatioModeClass, idtargetSize)
    executeAction(idCrop, desc11, DialogModes.NO)
}
function newGuidesFromLayer() {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };
    executeAction(s2t("newGuidesFromTarget"), undefined, DialogModes.NO);
}

function cameraRaw(lumi, lumiDetail) {
    var idAdobeCameraRawFilter = stringIDToTypeID("Adobe Camera Raw Filter");
    var desc501 = new ActionDescriptor();
    var idCMod = charIDToTypeID("CMod");
    desc501.putString(idCMod, """Filter""");
    var idSett = charIDToTypeID("Sett");
    var idSett = charIDToTypeID("Sett");
    var idCst = charIDToTypeID("Cst ");
    desc501.putEnumerated(idSett, idSett, idCst);
    var idWBal = charIDToTypeID("WBal");
    var idWBal = charIDToTypeID("WBal");
    var idAsSh = charIDToTypeID("AsSh");
    desc501.putEnumerated(idWBal, idWBal, idAsSh);
    var idTemp = charIDToTypeID("Temp");
    desc501.putInteger(idTemp, 0);
    var idTint = charIDToTypeID("Tint");
    desc501.putInteger(idTint, 0);
    var idCtoG = charIDToTypeID("CtoG");
    desc501.putBoolean(idCtoG, false);
    var idStrt = charIDToTypeID("Strt");
    desc501.putInteger(idStrt, 0);
    var idShrp = charIDToTypeID("Shrp");
    desc501.putInteger(idShrp, 0);
    var idLNR = charIDToTypeID("LNR ");
    desc501.putInteger(idLNR, lumi);
    var idCNR = charIDToTypeID("CNR ");
    desc501.putInteger(idCNR, 0);
    var idVigA = charIDToTypeID("VigA");
    desc501.putInteger(idVigA, 0);
    var idBlkB = charIDToTypeID("BlkB");
    desc501.putInteger(idBlkB, 0);
    var idRHue = charIDToTypeID("RHue");
    desc501.putInteger(idRHue, 0);
    var idRSat = charIDToTypeID("RSat");
    desc501.putInteger(idRSat, 0);
    var idGHue = charIDToTypeID("GHue");
    desc501.putInteger(idGHue, 0);
    var idGSat = charIDToTypeID("GSat");
    desc501.putInteger(idGSat, 0);
    var idBHue = charIDToTypeID("BHue");
    desc501.putInteger(idBHue, 0);
    var idBSat = charIDToTypeID("BSat");
    desc501.putInteger(idBSat, 0);
    var idVibr = charIDToTypeID("Vibr");
    desc501.putInteger(idVibr, 0);
    var idHA_R = charIDToTypeID("HA_R");
    desc501.putInteger(idHA_R, 0);
    var idHA_O = charIDToTypeID("HA_O");
    desc501.putInteger(idHA_O, 0);
    var idHA_Y = charIDToTypeID("HA_Y");
    desc501.putInteger(idHA_Y, 0);
    var idHA_G = charIDToTypeID("HA_G");
    desc501.putInteger(idHA_G, 0);
    var idHA_A = charIDToTypeID("HA_A");
    desc501.putInteger(idHA_A, 0);
    var idHA_B = charIDToTypeID("HA_B");
    desc501.putInteger(idHA_B, 0);
    var idHA_P = charIDToTypeID("HA_P");
    desc501.putInteger(idHA_P, 0);
    var idHA_M = charIDToTypeID("HA_M");
    desc501.putInteger(idHA_M, 0);
    var idSA_R = charIDToTypeID("SA_R");
    desc501.putInteger(idSA_R, 0);
    var idSA_O = charIDToTypeID("SA_O");
    desc501.putInteger(idSA_O, 0);
    var idSA_Y = charIDToTypeID("SA_Y");
    desc501.putInteger(idSA_Y, 0);
    var idSA_G = charIDToTypeID("SA_G");
    desc501.putInteger(idSA_G, 0);
    var idSA_A = charIDToTypeID("SA_A");
    desc501.putInteger(idSA_A, 0);
    var idSA_B = charIDToTypeID("SA_B");
    desc501.putInteger(idSA_B, 0);
    var idSA_P = charIDToTypeID("SA_P");
    desc501.putInteger(idSA_P, 0);
    var idSA_M = charIDToTypeID("SA_M");
    desc501.putInteger(idSA_M, 0);
    var idLA_R = charIDToTypeID("LA_R");
    desc501.putInteger(idLA_R, 0);
    var idLA_O = charIDToTypeID("LA_O");
    desc501.putInteger(idLA_O, 0);
    var idLA_Y = charIDToTypeID("LA_Y");
    desc501.putInteger(idLA_Y, 0);
    var idLA_G = charIDToTypeID("LA_G");
    desc501.putInteger(idLA_G, 0);
    var idLA_A = charIDToTypeID("LA_A");
    desc501.putInteger(idLA_A, 0);
    var idLA_B = charIDToTypeID("LA_B");
    desc501.putInteger(idLA_B, 0);
    var idLA_P = charIDToTypeID("LA_P");
    desc501.putInteger(idLA_P, 0);
    var idLA_M = charIDToTypeID("LA_M");
    desc501.putInteger(idLA_M, 0);
    var idSTSH = charIDToTypeID("STSH");
    desc501.putInteger(idSTSH, 0);
    var idSTSS = charIDToTypeID("STSS");
    desc501.putInteger(idSTSS, 0);
    var idSTHH = charIDToTypeID("STHH");
    desc501.putInteger(idSTHH, 0);
    var idSTHS = charIDToTypeID("STHS");
    desc501.putInteger(idSTHS, 0);
    var idSTB = charIDToTypeID("STB ");
    desc501.putInteger(idSTB, 0);
    var idPC_S = charIDToTypeID("PC_S");
    desc501.putInteger(idPC_S, 0);
    var idPC_D = charIDToTypeID("PC_D");
    desc501.putInteger(idPC_D, 0);
    var idPC_L = charIDToTypeID("PC_L");
    desc501.putInteger(idPC_L, 0);
    var idPC_H = charIDToTypeID("PC_H");
    desc501.putInteger(idPC_H, 0);
    var idPC_one = charIDToTypeID("PC_1");
    desc501.putInteger(idPC_one, 25);
    var idPC_two = charIDToTypeID("PC_2");
    desc501.putInteger(idPC_two, 50);
    var idPC_three = charIDToTypeID("PC_3");
    desc501.putInteger(idPC_three, 75);
    var idShpR = charIDToTypeID("ShpR");
    desc501.putDouble(idShpR, 1.000000);
    var idShpD = charIDToTypeID("ShpD");
    desc501.putInteger(idShpD, 25);
    var idShpM = charIDToTypeID("ShpM");
    desc501.putInteger(idShpM, 0);
    var idPCVA = charIDToTypeID("PCVA");
    desc501.putInteger(idPCVA, 0);
    var idGRNA = charIDToTypeID("GRNA");
    desc501.putInteger(idGRNA, 0);
    var idLNRD = charIDToTypeID("LNRD");
    desc501.putInteger(idLNRD, lumiDetail);
    var idLNRC = charIDToTypeID("LNRC");
    desc501.putInteger(idLNRC, 0);
    var idLPEn = charIDToTypeID("LPEn");
    desc501.putInteger(idLPEn, 0);
    var idMDis = charIDToTypeID("MDis");
    desc501.putInteger(idMDis, 0);
    var idPerV = charIDToTypeID("PerV");
    desc501.putInteger(idPerV, 0);
    var idPerH = charIDToTypeID("PerH");
    desc501.putInteger(idPerH, 0);
    var idPerR = charIDToTypeID("PerR");
    desc501.putDouble(idPerR, 0.000000);
    var idPerS = charIDToTypeID("PerS");
    desc501.putInteger(idPerS, 100);
    var idPerA = charIDToTypeID("PerA");
    desc501.putInteger(idPerA, 0);
    var idPerU = charIDToTypeID("PerU");
    desc501.putInteger(idPerU, 0);
    var idPerX = charIDToTypeID("PerX");
    desc501.putDouble(idPerX, 0.000000);
    var idPerY = charIDToTypeID("PerY");
    desc501.putDouble(idPerY, 0.000000);
    var idAuCA = charIDToTypeID("AuCA");
    desc501.putInteger(idAuCA, 0);
    var idExonetwo = charIDToTypeID("Ex12");
    desc501.putDouble(idExonetwo, 0.000000);
    var idCronetwo = charIDToTypeID("Cr12");
    desc501.putInteger(idCronetwo, 0);
    var idHionetwo = charIDToTypeID("Hi12");
    desc501.putInteger(idHionetwo, 0);
    var idShonetwo = charIDToTypeID("Sh12");
    desc501.putInteger(idShonetwo, 0);
    var idWhonetwo = charIDToTypeID("Wh12");
    desc501.putInteger(idWhonetwo, 0);
    var idBkonetwo = charIDToTypeID("Bk12");
    desc501.putInteger(idBkonetwo, 0);
    var idClonetwo = charIDToTypeID("Cl12");
    desc501.putInteger(idClonetwo, 0);
    var idDfPA = charIDToTypeID("DfPA");
    desc501.putInteger(idDfPA, 0);
    var idDPHL = charIDToTypeID("DPHL");
    desc501.putInteger(idDPHL, 30);
    var idDPHH = charIDToTypeID("DPHH");
    desc501.putInteger(idDPHH, 70);
    var idDfGA = charIDToTypeID("DfGA");
    desc501.putInteger(idDfGA, 0);
    var idDPGL = charIDToTypeID("DPGL");
    desc501.putInteger(idDPGL, 40);
    var idDPGH = charIDToTypeID("DPGH");
    desc501.putInteger(idDPGH, 60);
    var idDhze = charIDToTypeID("Dhze");
    desc501.putInteger(idDhze, 0);
    var idCrTx = charIDToTypeID("CrTx");
    desc501.putInteger(idCrTx, 5);
    var idTMMs = charIDToTypeID("TMMs");
    desc501.putInteger(idTMMs, 0);
    var idCrv = charIDToTypeID("Crv ");
    var list120 = new ActionList();
    list120.putInteger(0);
    list120.putInteger(0);
    list120.putInteger(255);
    list120.putInteger(255);
    desc501.putList(idCrv, list120);
    var idCrvR = charIDToTypeID("CrvR");
    var list121 = new ActionList();
    list121.putInteger(0);
    list121.putInteger(0);
    list121.putInteger(255);
    list121.putInteger(255);
    desc501.putList(idCrvR, list121);
    var idCrvG = charIDToTypeID("CrvG");
    var list122 = new ActionList();
    list122.putInteger(0);
    list122.putInteger(0);
    list122.putInteger(255);
    list122.putInteger(255);
    desc501.putList(idCrvG, list122);
    var idCrvB = charIDToTypeID("CrvB");
    var list123 = new ActionList();
    list123.putInteger(0);
    list123.putInteger(0);
    list123.putInteger(255);
    list123.putInteger(255);
    desc501.putList(idCrvB, list123);
    var idCamP = charIDToTypeID("CamP");
    desc501.putString(idCamP, """Embedded""");
    var idCP_D = charIDToTypeID("CP_D");
    desc501.putString(idCP_D, """54650A341B5B5CCAE8442D0B43A92BCE""");
    var idPrVe = charIDToTypeID("PrVe");
    desc501.putInteger(idPrVe, 184549376);
    var idRtch = charIDToTypeID("Rtch");
    desc501.putString(idRtch, """""");
    var idREye = charIDToTypeID("REye");
    desc501.putString(idREye, """""");
    var idLCs = charIDToTypeID("LCs ");
    desc501.putString(idLCs, """""");
    var idUpri = charIDToTypeID("Upri");
    desc501.putString(idUpri, """<x:xmpmeta xmlns:x="adobe: ns: meta / " x:xmptk="Adobe XMP Core 5.6 - c140 79.160451, 2017 / 05 / 06 - 01: 08: 21        ">
        < rdf: RDF xmlns: rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#" >
        <rdf:Description rdf:about=""
            xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"
            crs:UprightVersion="151388160"
            crs:UprightCenterMode="0"
            crs:UprightCenterNormX="0.5"
            crs:UprightCenterNormY="0.5"
            crs:UprightFocalMode="0"
            crs:UprightFocalLength35mm="35"
            crs:UprightPreview="False"
            crs:UprightTransformCount="6" />
 </rdf: RDF >
</x: xmpmeta >
    """ );
    var idGuUr = charIDToTypeID("GuUr");
    desc501.putString(idGuUr, """<x:xmpmeta xmlns:x="adobe: ns: meta / " x:xmptk="Adobe XMP Core 5.6 - c140 79.160451, 2017 / 05 / 06 - 01: 08: 21        ">
        < rdf: RDF xmlns: rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#" >
        <rdf:Description rdf:about=""
            xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"
            crs:UprightFourSegmentsCount="0" />
 </rdf: RDF >
</x: xmpmeta >
    """ );
    var idLook = charIDToTypeID("Look");
    desc501.putString(idLook, """""");
    var idPset = charIDToTypeID("Pset");
    desc501.putString(idPset, """""");
    executeAction(idAdobeCameraRawFilter, desc501, DialogModes.NO);

}

function selectBrushTool() {
    // =======================================================
    var idslct = charIDToTypeID("slct");
    var desc240 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref98 = new ActionReference();
    var idPbTl = charIDToTypeID("PbTl");
    ref98.putClass(idPbTl);
    desc240.putReference(idnull, ref98);
    executeAction(idslct, desc240, DialogModes.NO);

    // =======================================================
    var idRset = charIDToTypeID("Rset");
    var desc241 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref99 = new ActionReference();
    var idClr = charIDToTypeID("Clr ");
    var idClrs = charIDToTypeID("Clrs");
    ref99.putProperty(idClr, idClrs);
    desc241.putReference(idnull, ref99);
    executeAction(idRset, desc241, DialogModes.NO);

    // =======================================================
}
function move(location) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t(location));
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("move"), descriptor, DialogModes.NO);
}
function dust(radius, threshold) {
    // body...
    var idDstS = charIDToTypeID("DstS");
    var desc593 = new ActionDescriptor();
    var idRds = charIDToTypeID("Rds ");
    desc593.putInteger(idRds, radius);
    var idThsh = charIDToTypeID("Thsh");
    desc593.putInteger(idThsh, threshold);
    executeAction(idDstS, desc593, DialogModes.NO);

}
