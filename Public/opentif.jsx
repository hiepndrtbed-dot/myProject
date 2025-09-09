try {

    // alert(activeDocument.pathItems.length);
    // activeDocument.selection.load(activeDocument.pathItems.getByName('Work Path'));
    var thePathActions = "Z:/Automation by Academy/Actions";
    var doc = activeDocument
    try { doc.pathItems.getByName("Work Path").remove() } catch (error) { }
    try {
        grVariantRetouch = doc.layerSets["Variant 1"];
        grColorRetouch = grVariantRetouch.layerSets["Color 1"];
        grItemRetouch = grVariantRetouch.layerSets["Item 1"];
        grShadow = grVariantRetouch.layerSets["Shadow 1"];
        grBgRetouch = grVariantRetouch.layerSets["Background 1"];
    } catch (error) {
    }
    var totalVar = 0;
    try {
        totalVar = activeDocument.layers.length - 2;
    } catch (error) { }
    main();
    function main() {
        visibleGroup("Resources")
        totalVar > 1 ? visibleGroup() : "";
        if (setSelectedLayer('Item 2') == false) {
            if (layerLocker("BACKGROUND") == true && layerLocker("Shadow 1") == true) {
                setSelectedLayer('Item 1');
                if (setSelectedLayer('Stencil') == true) {
                    removePath("Work Path");
                    activeDocument.activeLayer.visible = false;
                    setSelectedLayer('Item 1');
                    activeDocument.activeLayer = activeDocument.activeLayer.artLayers[1];
                    if ('Retouch BG' == String(app.activeDocument.activeLayer.name)) {
                        setSelectedLayer('Product');
                        if (hasLayerMask()) {
                            setSelectedLayer("Background 1");
                            if (activeDocument.activeLayer.layers.length == 0) {
                                // loadAction("BG retouch mask", "RETOUCH BG.atn");
                            }
                        } else {
                            setSelectedLayer('Retouch BG');
                        }
                    } else {
                        var bounds = doc.activeLayer.bounds[2];
                        if (bounds == 0) {
                            //loadAction("RT Dust is lock To", "PUBLIC.atn");
                        }
                    }
                } else {
                    doc.activeLayer = doc.activeLayer.artLayers[0];
                    if ('Retouch BG' == String(doc.activeLayer.name)) {
                        setSelectedLayer('Product');
                        if (hasLayerMask()) {
                            setSelectedLayer("Background 1");
                            if (activeDocument.activeLayer.layers.length == 0) {
                                // loadAction("BG retouch mask", "RETOUCH BG.atn");
                            }
                        } else {
                            setSelectedLayer('Retouch BG');
                        }
                    } else {
                        var bounds = doc.activeLayer.bounds[2];
                        if (bounds == 0) {
                            //loadAction("RT Dust is lock To", "PUBLIC.atn");
                        } else {
                            removePath("Work Path");
                        }
                    }
                }
            } else if (setSelectedLayer('Retouch #1') || setSelectedLayer('Retouch #1#2') || setSelectedLayer('Retouch #1#2#3') || setSelectedLayer('Retouch #1#2#3#4')) {
                var bounds = doc.activeLayer.bounds[2];
                if (bounds == 0) {
                    doc.guides.removeAll()
                    loadAction("RT Dust is not lock to", "PUBLIC.atn");
                }
            } else if (setSelectedLayer('Variant #1') || setSelectedLayer('Variant #1#2') || setSelectedLayer('Variant #1#2#3') || setSelectedLayer('Variant #1#2#3#4')) {
                doc.guides.removeAll()
            } else if (setSelectedLayer('clone') == true) {
                var bounds = doc.activeLayer.bounds[2];
                if (setSelectedLayer('white colorfill normal') == true) {
                    if (bounds == 0) {
                        doc.quickMaskMode = true;
                    }
                    doc.selection.load(doc.channels.getByName("crop"));
                    doc.guides.removeAll()
                } else if (setSelectedLayer('clone') == true) {
                    doc.selection.load(doc.channels.getByName("crop"));
                    doc.guides.removeAll()
                }
            } else if (setSelectedLayer('Retouching')) {
            } else if (layerLocker("Item 1") == true && layerLocker("Shadow 1") == false) {
                lengthGrShadow = doc.activeLayer.layers.length
                if (lengthGrShadow > 0) {
                    try {
                        nameLayer = doc.activeLayer.artLayers[0].name
                        if (nameLayer == "Check Shadow - Black"
                            || nameLayer == "2. MEDIUM") {
                            for (i = 0; i < lengthGrShadow; i++) {
                                doc.activeLayer = doc.activeLayer.layers[0]
                                doc.activeLayer.remove()
                                doc.activeLayer = doc.activeLayer.parent
                            }
                            checkShadow()
                        }
                    } catch (error) {
                        doc.activeLayer = doc.activeLayer.layers[0]
                    }
                    doc.activeLayer = doc.activeLayer.layers[0]
                } else {
                    checkShadow()
                }
            }
            else if (setSelectedLayer('Retouch Model')) {

            }

            else if (setSelectedLayer('Retouch')) {

            }

            else {
                setSelectedLayer("Product");
            }
        } else {
            setSelectedLayer("Item 1");
            removePath("Work Path");
            // var lgth = activeDocument.activeLayer.layers.length;
            activeDocument.activeLayer = activeDocument.activeLayer.layers[0];
        }

    }
    function hasLayerMask() {
        var reference = new ActionReference();
        reference.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
        var desc = executeActionGet(reference);
        return desc.getBoolean(stringIDToTypeID("hasUserMask"));
    }

    function removePath(name) {
        if (verifyPathNameExists(name)) {
            // // activeDocument.pathitem.getByName(name).remove();
            // selectPath(name);
            // activeDocument.pathItems.removeAll();
            deletePath(name);
        }
    }

    //select path
    function selectPath(namePath) {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();

        reference.putName(s2t("path"), namePath);
        descriptor.putReference(c2t("null"), reference);
        executeAction(s2t("select"), descriptor, DialogModes.NO);
    }

    function deletePath() {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();

        reference.putProperty(s2t("path"), s2t("workPath"));
        descriptor.putReference(c2t("null"), reference);
        executeAction(s2t("delete"), descriptor, DialogModes.NO);
    }


    function verifyPathNameExists(pathname) {
        var result = false;
        for (var a = 0; a < activeDocument.pathItems.length; a++) {
            if (String(activeDocument.pathItems[a].name) == pathname) {
                result = true;
                break;
            }
        }
        return result;
    }

    function visibleGroup(Group) {
        if (!Group) {
            for (var i = 1; i < totalVar; i++) {
                setSelectedLayer("Variant " + String(i + 1)) == true ? doc.activeLayer.visible = false : 1;
            }
        } else {
            if (setSelectedLayer(Group)) {
                activeDocument.activeLayer.visible = false;
            }
        }
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
    //loadaction trong photoshop

    // function loadAction(actionName, action) {
    //     try {
    //         app.doAction(actionName, action);
    //     } catch (error) {

    //     }
    // }
    function checkShadow() {
        var arrVer = countVariant()
        for (var i = 1; i <= arrVer; i++) {
            doc.activeLayer = doc.layerSets["Variant " + i]
            if (checkAlllockLayer() == false) {
                if (i >= 2) {
                    doc.activeLayer = doc.layerSets["Variant 1"]
                    doc.activeLayer.visible = false
                    try {
                        doc.layerSets["Variant " + i].visible = true
                    } catch (error) {

                    }
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
                saveSelection("Pr")
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
        doc.activeLayer = grShadow.artLayers[0]
        doc.quickMaskMode = true
        selectBrushTool()
    }


    //Check so luong variant.
    function countVariant() {
        length = doc.layerSets.length - 2
        return length
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
    function newGuidesFromLayer() {
        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };
        executeAction(s2t("newGuidesFromTarget"), undefined, DialogModes.NO);
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



    }
    //load selection mask
    function loadSelectionMask() {
        idsetd = charIDToTypeID("setd");
        desc32 = new ActionDescriptor();
        idnull = charIDToTypeID("null");
        ref14 = new ActionReference();
        idChnl = charIDToTypeID("Chnl");
        idfsel = charIDToTypeID("fsel");
        ref14.putProperty(idChnl, idfsel);
        desc32.putReference(idnull, ref14);
        idT = charIDToTypeID("T   ");
        ref15 = new ActionReference();
        idChnl = charIDToTypeID("Chnl");
        idChnl = charIDToTypeID("Chnl");
        idMsk = charIDToTypeID("Msk ");
        ref15.putEnumerated(idChnl, idChnl, idMsk);
        desc32.putReference(idT, ref15);
        executeAction(idsetd, desc32, DialogModes.NO);
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


} catch (error) {

}

// load action tren cung thu muc, khong can load action vao pts

function loadAction(actionName, action) {
    //--------------------------------------------------------------------------------------------------------
    var thePathActions = "Z:/Automation by Academy/Actions";
    try {
        //code tim thu muc, khong can quan tam.
        if (typeof jamActions !== 'object') { var jamActions = {}; (function () { jamActions.isActionsFile = function (file) { return (file.type === '8BAC') || file.name.match(/\.atn$/i); }; jamActions.isActionsPalette = function (file) { return ((file.type === '8BPF') && file.name.match(/^Actions Palette$/i)) || file.name.match(/^Actions Palette.psp$/i); }; function readBEInt(file, byteCount) { var bytes = file.read(byteCount); var intValue = 0; for (var index = 0; index < byteCount; index++) { intValue = (intValue << 8) + bytes.charCodeAt(index); } return intValue; } function readBytes(file, byteCount) { return file.read(byteCount); } function readByteString(file) { var stringLength = readBEInt(file, 4); return readBytes(file, stringLength); } function readUnicodeString(file) { var unicodeString = ""; var unicodeLength = readBEInt(file, 4); for (var index = 0; index < unicodeLength; index++) { var unicodeChar = readBEInt(file, 2); if (unicodeChar !== 0) { unicodeString += String.fromCharCode(unicodeChar); } } return unicodeString; } function readEventId(file) { var eventId = 0; var eventType = readBytes(file, 4); switch (eventType) { case 'TEXT': eventId = app.stringIDToTypeID(readByteString(file)); break; case 'long': eventId = app.charIDToTypeID(readBytes(file, 4)); break; default: throw new Error("[jamActions readEventId] Unrecognized event type: '" + eventType + "'"); break; } return eventId; } function skipDouble(file) { file.seek(8, 1); } function skipDoubles(file, doubleCount) { file.seek(doubleCount * 8, 1); } function skipInt8(file) { file.seek(1, 1); } function skipInt16(file) { file.seek(2, 1); } function skipInt32(file) { file.seek(4, 1); } function skipInt64(file) { file.seek(8, 1); } function skipBytes(file, byteCount) { file.seek(byteCount, 1); } function skipByteString(file) { var stringLength = readBEInt(file, 4); skipBytes(file, stringLength); } function skipUnicodeString(file) { var unicodeLength = readBEInt(file, 4); skipBytes(file, unicodeLength * 2); } function skipId(file) { var idLength = readBEInt(file, 4); if (idLength) { skipBytes(file, idLength); } else { skipBytes(file, 4); } } function skipClass(file) { skipUnicodeString(file); skipId(file); } function skipObject(file) { skipClass(file); var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { skipId(file); skipItem(file); } } function skipList(file) { var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { skipItem(file); } } function skipItem(file) { var typeId = readBytes(file, 4); switch (typeId) { case 'obj ': skipReference(file); break; case 'Objc': case 'GlbO': skipObject(file); break; case 'type': case 'GlbC': skipClass(file); break; case 'VlLs': skipList(file); break; case 'doub': skipDouble(file); break; case 'UntF': skipBytes(file, 4); skipDouble(file); break; case 'TEXT': skipUnicodeString(file); break; case 'enum': skipId(file); skipId(file); break; case 'long': skipInt32(file); break; case 'comp': skipInt64(file); break; case 'bool': skipInt8(file); break; case 'alis': skipByteString(file); break; case 'Pth ': skipByteString(file); break; case 'tdta': skipByteString(file); break; case 'ObAr': var objCount = readBEInt(file, 4); skipClass(file); var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { skipId(file); skipInt32(file); skipInt32(file); var doublesCount = readBEInt(file, 4); skipDoubles(file, doublesCount); } break; default: throw new Error("[jamActions skipItem] Unrecognized item type: '" + typeId + "'"); break; } } function skipReference(file) { var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { var formId = readBytes(file, 4); skipClass(file); switch (formId) { case 'Clss': break; case 'prop': skipId(file); break; case 'Enmr': skipId(file); skipId(file); break; case 'rele': skipInt32(file); break; case 'Idnt': skipInt32(file); break; case 'indx': skipInt32(file); break; case 'name': skipUnicodeString(file); break; default: throw new Error("[jamActions skipReference] Unrecognized item form: '" + formId + "'"); break; } } } jamActions.readActionDescriptor = function (file, insertVersionPrefix) { var versionPrefix = "\x00\x00\x00\x10"; var start = file.tell(); if (!insertVersionPrefix) { if (file.read(4) === versionPrefix) { versionPrefix = ""; } else { throw new Error('[jamActions.readActionDescriptor] Unrecognized version prefix'); } } skipObject(file); var end = file.tell(); file.seek(start, 0); var stream = versionPrefix + file.read(end - start); var actionDescriptor = new ActionDescriptor(); actionDescriptor.fromStream(stream); return actionDescriptor; }; jamActions.dataFromActionsFile = function (actionsFile, isPalette) { var that = this; function parseActionSet(file) { var actionSet = {}; actionSet.name = localize(readUnicodeString(file)); actionSet.expanded = (readBEInt(file, 1) !== 0); var actionCount = readBEInt(file, 4); actionSet.actions = []; for (var actionIndex = 0; actionIndex < actionCount; actionIndex++) { var action = {}; action.functionKey = readBEInt(file, 2); action.shiftKey = (readBEInt(file, 1) !== 0); action.commandKey = (readBEInt(file, 1) !== 0); action.colorIndex = readBEInt(file, 2); action.name = localize(readUnicodeString(file)); action.expanded = (readBEInt(file, 1) !== 0); var commandCount = readBEInt(file, 4); action.commands = []; for (var commandIndex = 0; commandIndex < commandCount; commandIndex++) { var command = {}; command.expanded = (readBEInt(file, 1) !== 0); command.enabled = (readBEInt(file, 1) !== 0); command.withDialog = (readBEInt(file, 1) !== 0); command.dialogOptions = readBEInt(file, 1); command.eventId = readEventId(file); command.dictionaryName = readByteString(file); if (readBEInt(file, 4) !== 0) { command.actionDescriptor = that.readActionDescriptor(file, true); } action.commands.push(command); } actionSet.actions.push(action); } return actionSet; } var file; if (typeof actionsFile === 'string') { file = new File(actionsFile); } else if (actionsFile instanceof File) { file = actionsFile; } else { throw new Error('[jamActions.dataFromActionsFile] Invalid argument'); } var fileData; if (file.open("r")) { try { file.encoding = 'BINARY'; var fileVersion = readBEInt(file, 4); if (fileVersion === 16) { fileData = {}; fileData.version = fileVersion; if (isPalette) { fileData.actionSets = []; var actionSetCount = readBEInt(file, 4); for (var actionSetIndex = 0; actionSetIndex < actionSetCount; actionSetIndex++) { fileData.actionSets.push(parseActionSet(file)); } } else { fileData.actionSet = parseActionSet(file); } } else { fileData = "Unsupported actions file version: " + fileVersion; } } catch (e) { fileData = e.message; } finally { file.close(); } } else { fileData = "Cannot open file"; } return fileData; }; jamActions.isLocalPlayCommand = function (command, actionSetName) { var localPlayCommand = null; if (command.eventId === app.stringIDToTypeID("play")) { var targetId = app.stringIDToTypeID("target"); if (command.actionDescriptor.hasKey(targetId)) { var localReference = command.actionDescriptor.getReference(targetId); do { try { var desiredClassId = localReference.getDesiredClass(); } catch (e) { break; } switch (desiredClassId) { case app.stringIDToTypeID("command"): var localCommandIndex = localReference.getIndex() - 1; break; case app.stringIDToTypeID("action"): var localActionName = localReference.getName(); break; case app.stringIDToTypeID("actionSet"): var localActionSetName = localReference.getName(); break; } localReference = localReference.getContainer(); } while (localReference); } var continueId = app.stringIDToTypeID("continue"); if (command.actionDescriptor.hasKey(continueId)) { var localContinue = command.actionDescriptor.getBoolean(continueId); } if ((typeof localActionSetName !== 'undefined') && (localActionSetName === actionSetName)) { localPlayCommand = [localActionName, localCommandIndex, localContinue]; } } return localPlayCommand; }; jamActions.determineDialogMode = function (command) { var dialogMode; switch (command.dialogOptions) { case 0: dialogMode = command.withDialog ? DialogModes.ALL : DialogModes.NO; break; case 2: dialogMode = DialogModes.NO; break; case 1: case 3: dialogMode = DialogModes.ALL; break; } return dialogMode; }; var globalCommandHandler = null; jamActions.setCommandHandler = function (commandHandler) { globalCommandHandler = commandHandler; }; jamActions.traverseAction = function (actionSet, actionLocator, fromCommandIndex, continuePlay) { function handleCommands(commands) { var commandMax = (continuePlay) ? commands.length : fromCommandIndex + 1; for (var commandIndex = fromCommandIndex; commandIndex < commandMax; commandIndex++) { if (globalCommandHandler !== null) { globalCommandHandler(commands[commandIndex]); } } } if (typeof fromCommandIndex === 'undefined') { fromCommandIndex = 0; continuePlay = true; } var actions = actionSet.actions; if (typeof actionLocator === 'string') { var actionName = actionLocator; for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) { var action = actions[actionIndex]; if (action.name === actionName) { handleCommands(action.commands); break; } } } else if (typeof actionLocator === 'number') { var actionIndex = actionLocator; if ((actionIndex >= 0) && (actionIndex < actions.length)) { handleCommands(actions[actionIndex].commands); } } }; }()); }
        //quan tam doan nay, giup loa action
        if (documents.length) {
            Folder.current = new Folder(thePathActions);
            var actionsFilePath = action;
            var ActionName = actionName;

            var fileData = jamActions.dataFromActionsFile(actionsFilePath);
            function executeCommand(command, ActionName) {
                if (command.enabled) {
                    var dialogMode = jamActions.determineDialogMode(command);
                    app.executeAction(command.eventId, command.actionDescriptor, dialogMode);
                }
            }
            jamActions.setCommandHandler(executeCommand);
            jamActions.traverseAction(fileData.actionSet, ActionName);
        };
    }
    catch (e) { }
}
