
shape3D();

function shape3D() {
    selectLayer('Item 1')
    var bounds = activeDocument.activeLayer.layers.length;
    activeDocument.activeLayer = activeDocument.activeLayer.artLayers[bounds - 1];
    var nameLayer = activeDocument.activeLayer.name;
    var searchProductName = nameLayer.search("Product");
    if (searchProductName == 0) {
        activeDocument.activeLayer.duplicate();
        prevLayer(false);
        activeDocument.activeLayer.name = "Sil_Shoulder silhouette";
        activeDocument.activeLayer.opacity = 50;
        activeDocument.activeLayer.invert();
        flip();
        try {
            InteractiveTransform();
        } catch (e) { //alert("Image Transform Canceled");
        }
        activeDocument.activeLayer.visible = false;
        selectLayer("Product");
        liquify();
        deleteLayer("Sil_Shoulder silhouette");
    } else {
        loadAction("S - 3D", "3D - shape.atn");

    }
    //liquify
    function liquify(params) {
        try {
            var idLqFy = charIDToTypeID("LqFy");
            executeAction(idLqFy, undefined, DialogModes.ALL);
        } catch (error) { }
    }

    //xoa layer
    function deleteLayer(layer) {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var list = new ActionList();
        var reference = new ActionReference();

        reference.putName(s2t("layer"), layer);
        descriptor.putReference(c2t("null"), reference);
        list.putInteger(90);
        descriptor.putList(s2t("layerID"), list);
        executeAction(s2t("delete"), descriptor, DialogModes.NO);
    }
    //len layer tren
    function prevLayer(makeVisible) {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var list = new ActionList();
        var reference = new ActionReference();

        reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("forwardEnum"));
        descriptor.putReference(c2t("null"), reference);
        descriptor.putBoolean(s2t("makeVisible"), makeVisible);
        list.putInteger(19);
        descriptor.putList(s2t("layerID"), list);
        executeAction(s2t("select"), descriptor, DialogModes.NO);
    }
    // if (activeDocument.activeLayer.layers.length >= 2) {
    //     selectLayer("Product");
    //     setSelectonLayer("Product");
    //     activeDocument.selection.feather(150);
    //     makeLayer(false);
    //     makeAdjusmentLayer();
    //     levelsLayer(15, 1.5, 245);

    //     //loadAction("S - 3D", "3D - shape.atn");
    // } else {
    //     selectLayer("Product");
    //     activeDocument.activeLayer.duplicate();
    //     selectLayer("Product copy");
    //     activeDocument.activeLayer.name = "Sil_Shoulder silhouette";
    //     activeDocument.activeLayer.opacity = 50;
    //     activeDocument.activeLayer.invert();
    //     flip();
    //     try {
    //         InteractiveTransform();
    //     } catch (e) { alert("Image Transform Canceled"); }
    //     activeDocument.activeLayer.visible = false;
    //     selectLayer("Product");
    //     loadAction("Has", "3D - shape.atn");
    // }

    function makeAdjusmentLayer() {
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
        descriptor.putReference(c2t("null"), reference);
        descriptor2.putEnumerated(s2t("color"), s2t("color"), c2t("Grn "));
        descriptor3.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
        descriptor2.putObject(s2t("type"), s2t("levels"), descriptor3);
        descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
        executeAction(s2t("make"), descriptor, DialogModes.NO);
    }
}


function levelsLayer(x1, x2, x3) {
    var idChnl = charIDToTypeID("Chnl");
    var idLvls = charIDToTypeID("Lvls");
    var idpresetKind = stringIDToTypeID("presetKind");
    var idpresetKindType = stringIDToTypeID("presetKindType");
    var idAdjL = charIDToTypeID("AdjL");
    var idnull = charIDToTypeID("null");
    // =======================================================
    var idMk = charIDToTypeID("Mk  ");
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(idAdjL);
    desc2.putReference(idnull, ref1);
    var idUsng = charIDToTypeID("Usng");
    var desc3 = new ActionDescriptor();
    var idType = charIDToTypeID("Type");
    var desc4 = new ActionDescriptor();
    var idpresetKindDefault = stringIDToTypeID("presetKindDefault");
    desc4.putEnumerated(idpresetKind, idpresetKindType, idpresetKindDefault);
    desc3.putObject(idType, idLvls, desc4);
    desc2.putObject(idUsng, idAdjL, desc3);
    executeAction(idMk, desc2, DialogModes.NO);
    // =======================================================
    var idsetd = charIDToTypeID("setd");
    var desc5 = new ActionDescriptor();
    var ref2 = new ActionReference();
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref2.putEnumerated(idAdjL, idOrdn, idTrgt);
    desc5.putReference(idnull, ref2);
    var idT = charIDToTypeID("T   ");
    var desc6 = new ActionDescriptor();
    var idpresetKindCustom = stringIDToTypeID("presetKindCustom");
    desc6.putEnumerated(idpresetKind, idpresetKindType, idpresetKindCustom);
    var idAdjs = charIDToTypeID("Adjs");
    var list1 = new ActionList();
    var desc7 = new ActionDescriptor();
    var ref3 = new ActionReference();
    var idCmps = charIDToTypeID("Cmps");
    ref3.putEnumerated(idChnl, idChnl, idCmps);
    desc7.putReference(idChnl, ref3);
    var idInpt = charIDToTypeID("Inpt");
    var list2 = new ActionList();
    list2.putInteger(x1);
    list2.putInteger(x3);
    desc7.putDouble(charIDToTypeID("Gmm "), x2);
    desc7.putList(idInpt, list2);
    var idLvlA = charIDToTypeID("LvlA");
    list1.putObject(idLvlA, desc7);
    desc6.putList(idAdjs, list1);
    desc5.putObject(idT, idLvls, desc6);
    executeAction(idsetd, desc5, DialogModes.NO);
};

//Nhan layer
function makeLayer(makeVisible) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var list = new ActionList();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("backwardEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor.putBoolean(s2t("makeVisible"), makeVisible);
    list.putInteger(70);
    descriptor.putList(s2t("layerID"), list);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}
//lay vung chon tu layer
function setSelectonLayer(layer) {
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
    reference2.putName(s2t("layer"), layer);
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}


function flip() {
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
    descriptor.putEnumerated(s2t("axis"), s2t("orientation"), s2t("horizontal"));
    executeAction(s2t("flip"), descriptor, DialogModes.NO);
}

//free transform
function InteractiveTransform() {
    // Menu Edit>Free transform
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), cTID('FrTr'));
        desc1.putReference(cTID('null'), ref1);
        executeAction(cTID('slct'), desc1, DialogModes.NO);
    } catch (error) {

    }
};
function InteractiveTransform() { app.runMenuItem(charIDToTypeID("FrTr")); };




//select layer
function selectLayer(nameLayer) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putName(s2t("layer"), nameLayer);
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("select"), descriptor, DialogModes.NO);
}

//loadaction trong photoshop

// function loadAction(actionName, action) {
//     try {
//         app.doAction(actionName, action);
//     } catch (error) {

//     }
// }
function loadAction(actionName, action) {
    //--------------------------------------------------------------------------------------------------------
    try {
        //code tim thu muc, khong can quan tam.
        if (typeof jamActions !== 'object') { var jamActions = {}; (function () { jamActions.isActionsFile = function (file) { return (file.type === '8BAC') || file.name.match(/\.atn$/i); }; jamActions.isActionsPalette = function (file) { return ((file.type === '8BPF') && file.name.match(/^Actions Palette$/i)) || file.name.match(/^Actions Palette.psp$/i); }; function readBEInt(file, byteCount) { var bytes = file.read(byteCount); var intValue = 0; for (var index = 0; index < byteCount; index++) { intValue = (intValue << 8) + bytes.charCodeAt(index); } return intValue; } function readBytes(file, byteCount) { return file.read(byteCount); } function readByteString(file) { var stringLength = readBEInt(file, 4); return readBytes(file, stringLength); } function readUnicodeString(file) { var unicodeString = ""; var unicodeLength = readBEInt(file, 4); for (var index = 0; index < unicodeLength; index++) { var unicodeChar = readBEInt(file, 2); if (unicodeChar !== 0) { unicodeString += String.fromCharCode(unicodeChar); } } return unicodeString; } function readEventId(file) { var eventId = 0; var eventType = readBytes(file, 4); switch (eventType) { case 'TEXT': eventId = app.stringIDToTypeID(readByteString(file)); break; case 'long': eventId = app.charIDToTypeID(readBytes(file, 4)); break; default: throw new Error("[jamActions readEventId] Unrecognized event type: '" + eventType + "'"); break; } return eventId; } function skipDouble(file) { file.seek(8, 1); } function skipDoubles(file, doubleCount) { file.seek(doubleCount * 8, 1); } function skipInt8(file) { file.seek(1, 1); } function skipInt16(file) { file.seek(2, 1); } function skipInt32(file) { file.seek(4, 1); } function skipInt64(file) { file.seek(8, 1); } function skipBytes(file, byteCount) { file.seek(byteCount, 1); } function skipByteString(file) { var stringLength = readBEInt(file, 4); skipBytes(file, stringLength); } function skipUnicodeString(file) { var unicodeLength = readBEInt(file, 4); skipBytes(file, unicodeLength * 2); } function skipId(file) { var idLength = readBEInt(file, 4); if (idLength) { skipBytes(file, idLength); } else { skipBytes(file, 4); } } function skipClass(file) { skipUnicodeString(file); skipId(file); } function skipObject(file) { skipClass(file); var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { skipId(file); skipItem(file); } } function skipList(file) { var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { skipItem(file); } } function skipItem(file) { var typeId = readBytes(file, 4); switch (typeId) { case 'obj ': skipReference(file); break; case 'Objc': case 'GlbO': skipObject(file); break; case 'type': case 'GlbC': skipClass(file); break; case 'VlLs': skipList(file); break; case 'doub': skipDouble(file); break; case 'UntF': skipBytes(file, 4); skipDouble(file); break; case 'TEXT': skipUnicodeString(file); break; case 'enum': skipId(file); skipId(file); break; case 'long': skipInt32(file); break; case 'comp': skipInt64(file); break; case 'bool': skipInt8(file); break; case 'alis': skipByteString(file); break; case 'Pth ': skipByteString(file); break; case 'tdta': skipByteString(file); break; case 'ObAr': var objCount = readBEInt(file, 4); skipClass(file); var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { skipId(file); skipInt32(file); skipInt32(file); var doublesCount = readBEInt(file, 4); skipDoubles(file, doublesCount); } break; default: throw new Error("[jamActions skipItem] Unrecognized item type: '" + typeId + "'"); break; } } function skipReference(file) { var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { var formId = readBytes(file, 4); skipClass(file); switch (formId) { case 'Clss': break; case 'prop': skipId(file); break; case 'Enmr': skipId(file); skipId(file); break; case 'rele': skipInt32(file); break; case 'Idnt': skipInt32(file); break; case 'indx': skipInt32(file); break; case 'name': skipUnicodeString(file); break; default: throw new Error("[jamActions skipReference] Unrecognized item form: '" + formId + "'"); break; } } } jamActions.readActionDescriptor = function (file, insertVersionPrefix) { var versionPrefix = "\x00\x00\x00\x10"; var start = file.tell(); if (!insertVersionPrefix) { if (file.read(4) === versionPrefix) { versionPrefix = ""; } else { throw new Error('[jamActions.readActionDescriptor] Unrecognized version prefix'); } } skipObject(file); var end = file.tell(); file.seek(start, 0); var stream = versionPrefix + file.read(end - start); var actionDescriptor = new ActionDescriptor(); actionDescriptor.fromStream(stream); return actionDescriptor; }; jamActions.dataFromActionsFile = function (actionsFile, isPalette) { var that = this; function parseActionSet(file) { var actionSet = {}; actionSet.name = localize(readUnicodeString(file)); actionSet.expanded = (readBEInt(file, 1) !== 0); var actionCount = readBEInt(file, 4); actionSet.actions = []; for (var actionIndex = 0; actionIndex < actionCount; actionIndex++) { var action = {}; action.functionKey = readBEInt(file, 2); action.shiftKey = (readBEInt(file, 1) !== 0); action.commandKey = (readBEInt(file, 1) !== 0); action.colorIndex = readBEInt(file, 2); action.name = localize(readUnicodeString(file)); action.expanded = (readBEInt(file, 1) !== 0); var commandCount = readBEInt(file, 4); action.commands = []; for (var commandIndex = 0; commandIndex < commandCount; commandIndex++) { var command = {}; command.expanded = (readBEInt(file, 1) !== 0); command.enabled = (readBEInt(file, 1) !== 0); command.withDialog = (readBEInt(file, 1) !== 0); command.dialogOptions = readBEInt(file, 1); command.eventId = readEventId(file); command.dictionaryName = readByteString(file); if (readBEInt(file, 4) !== 0) { command.actionDescriptor = that.readActionDescriptor(file, true); } action.commands.push(command); } actionSet.actions.push(action); } return actionSet; } var file; if (typeof actionsFile === 'string') { file = new File(actionsFile); } else if (actionsFile instanceof File) { file = actionsFile; } else { throw new Error('[jamActions.dataFromActionsFile] Invalid argument'); } var fileData; if (file.open("r")) { try { file.encoding = 'BINARY'; var fileVersion = readBEInt(file, 4); if (fileVersion === 16) { fileData = {}; fileData.version = fileVersion; if (isPalette) { fileData.actionSets = []; var actionSetCount = readBEInt(file, 4); for (var actionSetIndex = 0; actionSetIndex < actionSetCount; actionSetIndex++) { fileData.actionSets.push(parseActionSet(file)); } } else { fileData.actionSet = parseActionSet(file); } } else { fileData = "Unsupported actions file version: " + fileVersion; } } catch (e) { fileData = e.message; } finally { file.close(); } } else { fileData = "Cannot open file"; } return fileData; }; jamActions.isLocalPlayCommand = function (command, actionSetName) { var localPlayCommand = null; if (command.eventId === app.stringIDToTypeID("play")) { var targetId = app.stringIDToTypeID("target"); if (command.actionDescriptor.hasKey(targetId)) { var localReference = command.actionDescriptor.getReference(targetId); do { try { var desiredClassId = localReference.getDesiredClass(); } catch (e) { break; } switch (desiredClassId) { case app.stringIDToTypeID("command"): var localCommandIndex = localReference.getIndex() - 1; break; case app.stringIDToTypeID("action"): var localActionName = localReference.getName(); break; case app.stringIDToTypeID("actionSet"): var localActionSetName = localReference.getName(); break; } localReference = localReference.getContainer(); } while (localReference); } var continueId = app.stringIDToTypeID("continue"); if (command.actionDescriptor.hasKey(continueId)) { var localContinue = command.actionDescriptor.getBoolean(continueId); } if ((typeof localActionSetName !== 'undefined') && (localActionSetName === actionSetName)) { localPlayCommand = [localActionName, localCommandIndex, localContinue]; } } return localPlayCommand; }; jamActions.determineDialogMode = function (command) { var dialogMode; switch (command.dialogOptions) { case 0: dialogMode = command.withDialog ? DialogModes.ALL : DialogModes.NO; break; case 2: dialogMode = DialogModes.NO; break; case 1: case 3: dialogMode = DialogModes.ALL; break; } return dialogMode; }; var globalCommandHandler = null; jamActions.setCommandHandler = function (commandHandler) { globalCommandHandler = commandHandler; }; jamActions.traverseAction = function (actionSet, actionLocator, fromCommandIndex, continuePlay) { function handleCommands(commands) { var commandMax = (continuePlay) ? commands.length : fromCommandIndex + 1; for (var commandIndex = fromCommandIndex; commandIndex < commandMax; commandIndex++) { if (globalCommandHandler !== null) { globalCommandHandler(commands[commandIndex]); } } } if (typeof fromCommandIndex === 'undefined') { fromCommandIndex = 0; continuePlay = true; } var actions = actionSet.actions; if (typeof actionLocator === 'string') { var actionName = actionLocator; for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) { var action = actions[actionIndex]; if (action.name === actionName) { handleCommands(action.commands); break; } } } else if (typeof actionLocator === 'number') { var actionIndex = actionLocator; if ((actionIndex >= 0) && (actionIndex < actions.length)) { handleCommands(actions[actionIndex].commands); } } }; }()); }
        //quan tam doan nay, giup loa action
        if (documents.length) {
            Folder.current = new Folder("Z:/Production/HD_ATN/atn_(hiep)/Private");
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
