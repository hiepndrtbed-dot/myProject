xxx(false);
function xxx(makeVisible) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var bounds = activeDocument.activeLayer.bounds[2];
    var desc = executeActionGet(reference2);
    var descriptor = new ActionDescriptor();
    var lLock = false;
    var reference2 = new ActionReference();
    var reference2 = new ActionReference();
    var result = false;

    main();
    function main() {
        if (setSelectedLayer('Item 2') == false) {
            if (layerLocker("BACKGROUND") == true) {
                setSelectedLayer('Item 1');
                if (setSelectedLayer('Stencil') == true) {
                    activeDocument.activeLayer.visible = false;
                    setSelectedLayer('Item 1');
                    activeDocument.activeLayer = activeDocument.activeLayer.artLayers[1];
                    if ('Retouch BG' == String(app.activeDocument.activeLayer.name)) {
                        setSelectedLayer('Product');
                        if (hasLayerMask()) {
                            setSelectedLayer("Background 1");
                            if (activeDocument.activeLayer.layers.length == 0) {
                                loadAction("BG retouch mask", "RETOUCH BG.atn");
                            }
                        } else {
                            setSelectedLayer('Retouch BG');
                        }
                    } else {
                        if (bounds == 0) {
                            loadAction("RT Dust is lock To", "PUBLIC.atn");
                        }
                    }
                } else {
                    activeDocument.activeLayer = activeDocument.activeLayer.artLayers[0];
                    if ('Retouch BG' == String(app.activeDocument.activeLayer.name)) {
                        setSelectedLayer('Product');
                        if (hasLayerMask()) {
                            setSelectedLayer("Background 1");
                            if (activeDocument.activeLayer.layers.length == 0) {
                                loadAction("BG retouch mask", "RETOUCH BG.atn");
                            }
                        } else {
                            setSelectedLayer('Retouch BG');
                        }
                    } else {
                        if (bounds == 0) {
                            loadAction("RT Dust is lock To", "PUBLIC.atn");
                        }
                    }
                }
            } else if (setSelectedLayer('Color #1') || setSelectedLayer('Color #1#2') || setSelectedLayer('Color #1#2#3') || setSelectedLayer('Color #1#2#3#4')) {
                activeDocument.activeLayer = activeDocument.layers[1];
                if (bounds == 0) {
                    loadAction("RT Dust is not lock to", "PUBLIC.atn");
                }
            } else if (setSelectedLayer('clone') == true) {
                if (setSelectedLayer('white colorfill normal') == true) {
                    if (bounds == 0) {
                        activeDocument.quickMaskMode = true;
                    }
                    activeDocument.selection.load(activeDocument.channels.getByName("crop"));
                    app.activeDocument.guides.removeAll();
                } else if (setSelectedLayer('clone') == true) {
                    activeDocument.selection.load(activeDocument.channels.getByName("crop"));
                    app.activeDocument.guides.removeAll();
                }
            }
        } else {
            // visibleGroup();
            setSelectedLayer("Item 1");
            if (setSelectedLayer("Stencil") == true) {
                activeDocument.activeLayer.visible = false;
                setSelectedLayer('Item 1');
                activeDocument.activeLayer = activeDocument.activeLayer.artLayers[1];
                if ('Retouch BG' != String(app.activeDocument.activeLayer.name)) {
                    if (bounds == 0) {
                        loadAction("RT Dust is lock To", "PUBLIC.atn");
                    }
                }
            } else {
                activeDocument.activeLayer = activeDocument.activeLayer.artLayers[0];
                if (bounds == 0) {
                    loadAction("RT Dust is lock To", "PUBLIC.atn");
                }
            }
        }
    }
    function hasLayerMask() {
        reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
        return desc.getBoolean(s2t("hasUserMask"));
    }
    function visibleGroup(group1, group2, group3) {
        if (group1 == null && group2 == null && group3 == null) {
            if (setSelectedLayer('Variant 2') == true) {
                activeDocument.activeLayer.visible = false;
            }
            if (setSelectedLayer('Variant 3') == true) {
                activeDocument.activeLayer.visible = false;
            }
            if (setSelectedLayer('Variant 4') == true) {
                activeDocument.activeLayer.visible = false;
            }
            if (setSelectedLayer('Variant 5') == true) {
                activeDocument.activeLayer.visible = false;
            }
        } else {
            if (checkLayerName(group1, group2, group3) == true) {
                activeDocument.activeLayer.visible = false;
            }
        }
    }
    function layerLocker(layer1) {
        if (setSelectedLayer(layer1) == true) {
            if (activeDocument.activeLayer.allLocked) {
                lLock = true;
            }
        }
        return lLock;
    }
    function setSelectedLayer(layerIndexOrName) {
        try {
            if (typeof layerIndexOrName == "number") {
                reference2.putIndex(s2t("layer"), layerIndexOrName);
            } else {
                reference2.putName(s2t("layer"), layerIndexOrName);
            }
            descriptor.putReference(c2t("null"), reference2);
            descriptor.putBoolean(s2t("makeVisible"), makeVisible);
            executeAction(s2t("select"), descriptor, DialogModes.NO);
            result = true
        } catch (e) {
            ;
            // do nothing
        }
        return result;
    }
}

function loadAction(actionName, action) {
    //--------------------------------------------------------------------------------------------------------
    try {
        //code tim thu muc, khong can quan tam.
        if (typeof jamActions !== 'object') { var jamActions = {}; (function () { jamActions.isActionsFile = function (file) { return (file.type === '8BAC') || file.name.match(/\.atn$/i); }; jamActions.isActionsPalette = function (file) { return ((file.type === '8BPF') && file.name.match(/^Actions Palette$/i)) || file.name.match(/^Actions Palette.psp$/i); }; function readBEInt(file, byteCount) { var bytes = file.read(byteCount); var intValue = 0; for (var index = 0; index < byteCount; index++) { intValue = (intValue << 8) + bytes.charCodeAt(index); } return intValue; } function readBytes(file, byteCount) { return file.read(byteCount); } function readByteString(file) { var stringLength = readBEInt(file, 4); return readBytes(file, stringLength); } function readUnicodeString(file) { var unicodeString = ""; var unicodeLength = readBEInt(file, 4); for (var index = 0; index < unicodeLength; index++) { var unicodeChar = readBEInt(file, 2); if (unicodeChar !== 0) { unicodeString += String.fromCharCode(unicodeChar); } } return unicodeString; } function readEventId(file) { var eventId = 0; var eventType = readBytes(file, 4); switch (eventType) { case 'TEXT': eventId = app.stringIDToTypeID(readByteString(file)); break; case 'long': eventId = app.charIDToTypeID(readBytes(file, 4)); break; default: throw new Error("[jamActions readEventId] Unrecognized event type: '" + eventType + "'"); break; } return eventId; } function skipDouble(file) { file.seek(8, 1); } function skipDoubles(file, doubleCount) { file.seek(doubleCount * 8, 1); } function skipInt8(file) { file.seek(1, 1); } function skipInt16(file) { file.seek(2, 1); } function skipInt32(file) { file.seek(4, 1); } function skipInt64(file) { file.seek(8, 1); } function skipBytes(file, byteCount) { file.seek(byteCount, 1); } function skipByteString(file) { var stringLength = readBEInt(file, 4); skipBytes(file, stringLength); } function skipUnicodeString(file) { var unicodeLength = readBEInt(file, 4); skipBytes(file, unicodeLength * 2); } function skipId(file) { var idLength = readBEInt(file, 4); if (idLength) { skipBytes(file, idLength); } else { skipBytes(file, 4); } } function skipClass(file) { skipUnicodeString(file); skipId(file); } function skipObject(file) { skipClass(file); var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { skipId(file); skipItem(file); } } function skipList(file) { var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { skipItem(file); } } function skipItem(file) { var typeId = readBytes(file, 4); switch (typeId) { case 'obj ': skipReference(file); break; case 'Objc': case 'GlbO': skipObject(file); break; case 'type': case 'GlbC': skipClass(file); break; case 'VlLs': skipList(file); break; case 'doub': skipDouble(file); break; case 'UntF': skipBytes(file, 4); skipDouble(file); break; case 'TEXT': skipUnicodeString(file); break; case 'enum': skipId(file); skipId(file); break; case 'long': skipInt32(file); break; case 'comp': skipInt64(file); break; case 'bool': skipInt8(file); break; case 'alis': skipByteString(file); break; case 'Pth ': skipByteString(file); break; case 'tdta': skipByteString(file); break; case 'ObAr': var objCount = readBEInt(file, 4); skipClass(file); var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { skipId(file); skipInt32(file); skipInt32(file); var doublesCount = readBEInt(file, 4); skipDoubles(file, doublesCount); } break; default: throw new Error("[jamActions skipItem] Unrecognized item type: '" + typeId + "'"); break; } } function skipReference(file) { var itemCount = readBEInt(file, 4); for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) { var formId = readBytes(file, 4); skipClass(file); switch (formId) { case 'Clss': break; case 'prop': skipId(file); break; case 'Enmr': skipId(file); skipId(file); break; case 'rele': skipInt32(file); break; case 'Idnt': skipInt32(file); break; case 'indx': skipInt32(file); break; case 'name': skipUnicodeString(file); break; default: throw new Error("[jamActions skipReference] Unrecognized item form: '" + formId + "'"); break; } } } jamActions.readActionDescriptor = function (file, insertVersionPrefix) { var versionPrefix = "\x00\x00\x00\x10"; var start = file.tell(); if (!insertVersionPrefix) { if (file.read(4) === versionPrefix) { versionPrefix = ""; } else { throw new Error('[jamActions.readActionDescriptor] Unrecognized version prefix'); } } skipObject(file); var end = file.tell(); file.seek(start, 0); var stream = versionPrefix + file.read(end - start); var actionDescriptor = new ActionDescriptor(); actionDescriptor.fromStream(stream); return actionDescriptor; }; jamActions.dataFromActionsFile = function (actionsFile, isPalette) { var that = this; function parseActionSet(file) { var actionSet = {}; actionSet.name = localize(readUnicodeString(file)); actionSet.expanded = (readBEInt(file, 1) !== 0); var actionCount = readBEInt(file, 4); actionSet.actions = []; for (var actionIndex = 0; actionIndex < actionCount; actionIndex++) { var action = {}; action.functionKey = readBEInt(file, 2); action.shiftKey = (readBEInt(file, 1) !== 0); action.commandKey = (readBEInt(file, 1) !== 0); action.colorIndex = readBEInt(file, 2); action.name = localize(readUnicodeString(file)); action.expanded = (readBEInt(file, 1) !== 0); var commandCount = readBEInt(file, 4); action.commands = []; for (var commandIndex = 0; commandIndex < commandCount; commandIndex++) { var command = {}; command.expanded = (readBEInt(file, 1) !== 0); command.enabled = (readBEInt(file, 1) !== 0); command.withDialog = (readBEInt(file, 1) !== 0); command.dialogOptions = readBEInt(file, 1); command.eventId = readEventId(file); command.dictionaryName = readByteString(file); if (readBEInt(file, 4) !== 0) { command.actionDescriptor = that.readActionDescriptor(file, true); } action.commands.push(command); } actionSet.actions.push(action); } return actionSet; } var file; if (typeof actionsFile === 'string') { file = new File(actionsFile); } else if (actionsFile instanceof File) { file = actionsFile; } else { throw new Error('[jamActions.dataFromActionsFile] Invalid argument'); } var fileData; if (file.open("r")) { try { file.encoding = 'BINARY'; var fileVersion = readBEInt(file, 4); if (fileVersion === 16) { fileData = {}; fileData.version = fileVersion; if (isPalette) { fileData.actionSets = []; var actionSetCount = readBEInt(file, 4); for (var actionSetIndex = 0; actionSetIndex < actionSetCount; actionSetIndex++) { fileData.actionSets.push(parseActionSet(file)); } } else { fileData.actionSet = parseActionSet(file); } } else { fileData = "Unsupported actions file version: " + fileVersion; } } catch (e) { fileData = e.message; } finally { file.close(); } } else { fileData = "Cannot open file"; } return fileData; }; jamActions.isLocalPlayCommand = function (command, actionSetName) { var localPlayCommand = null; if (command.eventId === app.stringIDToTypeID("play")) { var targetId = app.stringIDToTypeID("target"); if (command.actionDescriptor.hasKey(targetId)) { var localReference = command.actionDescriptor.getReference(targetId); do { try { var desiredClassId = localReference.getDesiredClass(); } catch (e) { break; } switch (desiredClassId) { case app.stringIDToTypeID("command"): var localCommandIndex = localReference.getIndex() - 1; break; case app.stringIDToTypeID("action"): var localActionName = localReference.getName(); break; case app.stringIDToTypeID("actionSet"): var localActionSetName = localReference.getName(); break; } localReference = localReference.getContainer(); } while (localReference); } var continueId = app.stringIDToTypeID("continue"); if (command.actionDescriptor.hasKey(continueId)) { var localContinue = command.actionDescriptor.getBoolean(continueId); } if ((typeof localActionSetName !== 'undefined') && (localActionSetName === actionSetName)) { localPlayCommand = [localActionName, localCommandIndex, localContinue]; } } return localPlayCommand; }; jamActions.determineDialogMode = function (command) { var dialogMode; switch (command.dialogOptions) { case 0: dialogMode = command.withDialog ? DialogModes.ALL : DialogModes.NO; break; case 2: dialogMode = DialogModes.NO; break; case 1: case 3: dialogMode = DialogModes.ALL; break; } return dialogMode; }; var globalCommandHandler = null; jamActions.setCommandHandler = function (commandHandler) { globalCommandHandler = commandHandler; }; jamActions.traverseAction = function (actionSet, actionLocator, fromCommandIndex, continuePlay) { function handleCommands(commands) { var commandMax = (continuePlay) ? commands.length : fromCommandIndex + 1; for (var commandIndex = fromCommandIndex; commandIndex < commandMax; commandIndex++) { if (globalCommandHandler !== null) { globalCommandHandler(commands[commandIndex]); } } } if (typeof fromCommandIndex === 'undefined') { fromCommandIndex = 0; continuePlay = true; } var actions = actionSet.actions; if (typeof actionLocator === 'string') { var actionName = actionLocator; for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) { var action = actions[actionIndex]; if (action.name === actionName) { handleCommands(action.commands); break; } } } else if (typeof actionLocator === 'number') { var actionIndex = actionLocator; if ((actionIndex >= 0) && (actionIndex < actions.length)) { handleCommands(actions[actionIndex].commands); } } }; }()); }
        //quan tam doan nay, giup loa action
        if (documents.length) {
            Folder.current = new Folder("Z:/Production/HD_ATN/atn_(hiep)/Private"); //Location of  actionset folder.
            var actionsFilePath = action; //Name of atn file.
            var ActionName = actionName; //Name of the action within the action set.

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