
doc = activeDocument
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS

//DN
// var thePathActions = "//172.16.2.2/Academy/Automation_by_Academy/Actions/Advance_Mask";
//HN
var thePathActions = "//172.16.0.13/Academy/Automation_by_Academy/Actions/Advance_Mask";

logAction("Log_AdvanceMask");
var flagLogin = new File("//172.16.2.2/Academy/Hiep/logNew.txt")
var date = new Date()
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
if (year <= 2024 && month < 9 && flagLogin.exists) {
    main()
}

function main() {
    (function () {
        if (checkSelectionName("mask main") == true
            && checkSelection() == true
            || (checkSelectionName("mask main") == true
                && checkSelection()
                && checkWorkPath("Work Path"))) {

            loadAction("aphal mask main", "Academy_Advance_Mask.atn")
        }
        else if (checkSelection() == true || (checkSelection() == true && checkWorkPath("Work Path"))) {

            loadAction("selection", "Academy_Advance_Mask.atn")
        }
        else if (checkSelectionName("mask main") == true && checkWorkPath("Work Path") || checkWorkPath("Work Path") && doc.quickMaskMode == true) {
            loadAction("work path & selection", "Academy_Advance_Mask.atn")
        }
        else if (checkLayer(1, "ACAD_CHECK_MASK ") == true && doc.quickMaskMode == true) {
            doc.quickMaskMode = false
            if (!hasLayerMask() && doc.activeLayer.name != "Item 1") {
                addMask()
            } else {
                doc.selection.deselect()
            }
            try { doc.channels.getByName("mask main").remove(); } catch (err) { }
        }
        else if (checkWorkPath("Work Path")) {
            loadAction("work path", "Academy_Advance_Mask.atn")
        }
    })()
}


function checkLayer(vr, name) {
    result = false
    try {
        doc.layerSets["Variant " + vr].artLayers[name].remove()
        result = true
    } catch (error) {
        result = false
    }
    return result
}

function frame() {
    var dlg = new Window("dialog", "Select Layer");
    btnPnl = dlg.add("panel", undefined, "");
    buildListLayer = btnPnl.add("dropdownlist", undefined, listGroup());
    buildListLayer.selection = 0;
    //lua chon theo list layer
    buildListLayer.onChange = function () {
        var selectListLayer = buildListLayer.selection;
        selectLayer(selectListLayer);
        dlg.close();
        try {
            var lengthlayer = activeDocument.activeLayer.layers.length
            if (lengthlayer > 0) {
                laodFrame();
            }
        } catch (error) {

        }
    }
    cancelBtn = btnPnl.add("button", undefined, "OK", { name: "OK" });
    myReturn = dlg.show();
    if (myReturn == 1) {
        var selectListLayer = buildListLayer.selection;
        selectLayer(selectListLayer);
    }
}

function laodFrame() {
    var dlg = new Window("dialog", "Select Layer");
    btnPnl = dlg.add("panel", undefined, "");
    buildListLayer = btnPnl.add("dropdownlist", undefined, listLayer());
    buildListLayer.selection = 0;
    //lua chon theo list layer
    buildListLayer.onChange = function () {
        var selectListLayer = buildListLayer.selection;
        selectLayer(selectListLayer);
        dlg.close();
    }
    cancelBtn = btnPnl.add("button", undefined, "OK", { name: "OK" });
    myReturn = dlg.show();
    if (myReturn == 1) {
        var selectListLayer = buildListLayer.selection;
        selectLayer(selectListLayer);
    }
}

//them cáu truc vào list
function listGroup() {
    var listlayer;
    if (selectLayer("Item 1") == true) {
        listlayer = listLayer("Item 1");
    } else if (selectLayer("cc") == true) {
        listlayer = listLayer("cc");
    }
    return listlayer;
}

//list layer
function listLayer(layer) {
    var listlayer = new Array();
    if (selectLayer(layer) == true) {
        var lengthlayer = activeDocument.activeLayer.layers.length;
        var curentPr = 0;
        for (var i = 0; i < lengthlayer; i++) {
            var searchProductName = activeDocument.activeLayer.layers[i].name.search("Product")
            if (searchProductName == 0) {
                curentPr = i;
            }
        }
        for (var index = curentPr + 1; index < lengthlayer; index++) {
            var nameLayer = activeDocument.activeLayer.layers[index].name;
            selectLayer(nameLayer);
            if (!hasLayerMask(nameLayer)) {
                listlayer.push(nameLayer);
            }
            activeDocument.activeLayer = activeDocument.activeLayer.parent;
        }
    } else {
        var lengthlayer = activeDocument.activeLayer.layers.length;
        for (var index = 0; index < lengthlayer; index++) {
            var nameLayer = activeDocument.activeLayer.layers[index].name;
            selectLayer(nameLayer);
            if (!hasLayerMask(nameLayer)) {
                listlayer.push(nameLayer);
            }
            activeDocument.activeLayer = activeDocument.activeLayer.parent;
        }
    }
    return listlayer;
}

//Kiem tran ton tai mask khong
function setSelectionMaskLayer(LayerName) {
    var result = false;
    try {
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
        reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("mask"));
        reference2.putName(s2t("layer"), LayerName);
        descriptor.putReference(s2t("to"), reference2);
        executeAction(s2t("set"), descriptor, DialogModes.NO);
        result = true;
    } catch (error) {
        result = false;
    }
    return result;
}

//kiem tra layer co ton tai mask khong
function hasLayerMask() {
    var reference = new ActionReference();
    reference.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    var desc = executeActionGet(reference);
    return desc.getBoolean(stringIDToTypeID("hasUserMask"));
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

//Kiem tra path co null khong
function setSelectionPath(namePath) {
    var result = false;
    try {
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
        reference2.putName(s2t("path"), namePath);
        descriptor.putReference(s2t("to"), reference2);
        descriptor.putInteger(s2t("version"), 1);
        descriptor.putBoolean(s2t("vectorMaskParams"), true);
        executeAction(s2t("set"), descriptor, DialogModes.NO);
        result = true;
    } catch (error) {
        result = false;
    }
    return result;
}

//select layer
function selectLayer(nameLayer) {
    var result = false;
    try {
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
        result = true;
    } catch (error) {
        result = false;
    }
    return result;
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

function checkSelection() {
    result = false
    try {
        bounds = doc.selection.bounds
        result = true

    } catch (error) {
        result = false
    }
    return result

}

//Check work path
function checkWorkPath(name) {
    var result = false;
    lengthPath = doc.pathItems.length
    try {
        if (String(activeDocument.pathItems[lengthPath - 1].name) == name) {
            result = true;
        }
    } catch (error) {
        result = false;
    }
    return result;
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
//Check Alpha channel
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

// load action tren cung thu muc, khong can load action vao pts
function loadAction(actionName, action) {
    //--------------------------------------------------------------------------------------------------------
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