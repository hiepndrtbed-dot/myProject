//======================================================ALL IN ONE================================================================\\
var keys = ScriptUI.environment.keyboardState;
var Info = {
    name: "Ngô Ngọc Vinh",
    brithday: "25/12/1999",
    mail: "Vinhnn.rtbed@gmail.com",
    account: "vinhnn",
    account1: "vinhn"
};
//=======================================================================================================================================================================\\
function Notifi(nd) {
    alert(nd, "Switch");
    throw new Erorr("Error 2")
};

function ScriptsEvent(filename, account) {
    if (Getaccount() == account) {
        app.notifiers.removeAll();
        var autoSelect = new File("W:/Production/VinhN/Scripts/" + filename);
        app.notifiers.add('Opn ', autoSelect);
        app.notifiersEnabled = true;
    };
};

function removeScriptEvent(account) {
    if (Getaccount() == account) {
        for (var i = 0; i < app.notifiers.length; i++) {
            if (app.notifiers[i].event == "Opn ") {
                app.notifiers[i].remove();
                i--;
            };
        };
    };
};

//=======================================================================================================================================================================\\
//=======================================================================================================================================================================\\
function checkName(fullName) {
    var lastSpaceIndex = fullName.lastIndexOf(' ');
    var name = lastSpaceIndex !== -1 ? fullName.substring(lastSpaceIndex + 1) : fullName;
    var firstNameInitial = fullName.charAt(0);
    var shortenedUsername = name + firstNameInitial.toLowerCase();
    var searchingSpace = false;
    for (var i = 0; i < lastSpaceIndex; i++) {
        var charz = fullName.charAt(i);

        if (charz === ' ' && i < lastSpaceIndex - 1) {
            shortenedUsername += fullName.charAt(i + 1).toLowerCase();
        }
    }
    return shortenedUsername.toLowerCase();
};

function UserWr(Array, User) {
    for (var ia = Array.length - 1; ia >= 0; ia--) {
        if (Array[ia] === User) {
            Array.splice(ia, 1);
        }
    }
}

function check() {
    if (!checkTeam()) {
        if (!Code()) {
            try {
                checkcode();
            } catch (e) {
                throw new Error("!OK")
            }
        }
    }
};

function checkTeam() {
    var checkTeam = false;
    if ((Folder("/C/Users/vinhnn/Desktop").exists) || (Folder("/C/Users/vinhn/Desktop").exists)) {
        return true;
    }
    for (var idn = 0; idn < Oalolo.length; idn++) {
        var folderPath = "/C/Users/" + Oalolo[idn] + "/Downloads";
        if (Folder(folderPath).exists) {
            checkTeam = true;
            break;
        };
    };
    return checkTeam;
};

function Getlog(Log) {
    var FolderPath = Folder("C:\\Users");
    if (FolderPath.exists) {
        var getUsers = FolderPath.getFiles();
        for (var i = 0; i < getUsers.length; i++) {
            var item = getUsers[i];
            if (item instanceof Folder && item.displayName != "Default" && item.displayName != "Default User" && item.displayName != "Public" && item.displayName != "defaultuser100000") {
                var downloadsFolder = new Folder(item.fsName + "\\Downloads");
                if (downloadsFolder.exists) {
                    var folderName = item.displayName.toLowerCase()
                    if (folderName == "longnd2") {
                        folderName = "longnd"
                    }
                    WriteLog(folderName, Log);
                }
            }
        }
    } else {

    }
};

function Code() {
    var TrueCode = ["quenchana", "vinhnn.1999"];
    var Code = false;
    var file = new File("~/AppData/Roaming/Adobe/Adobe Photoshop CC 2019/Adobe Photoshop CC 2019 Settings/accountActive.log");
    if (file.exists) {
        file.open("r");
        var content = file.read();
        file.close();

        for (var i = 0; i < TrueCode.length; i++) {
            var searchString = TrueCode[i];
            if (content.indexOf(searchString) !== -1) {
                Code = true;
                break;
            }
        }
    }
    return Code
};

function checkcode() {
    try {
        for (var i = 3; i > 0; i--) {
            var checklan3 = new File("~/AppData/Roaming/Adobe/Adobe Photoshop CC 2019/Adobe Photoshop CC 2019 Settings/vinh.vin");
            if (checklan3.exists) {
                NoteError("User này đã bị khóa.")
                break;
            }
            PromptCode();
            if (RedememCode !== null) {
                var file = new File("~/AppData/Roaming/Adobe/Adobe Photoshop CC 2019/Adobe Photoshop CC 2019 Settings/accountActive.log");
                var Noidungfile = "";

                if (file.exists) {
                    file.open("r");
                    Noidungfile = file.read();
                    file.close();
                } else {
                    file.open("w");
                    Noidungfile = file.read();
                }

                var Noidung = Noidungfile + RedememCode + "\n";
                file.open("w");
                file.write(Noidung);
                file.close();
                if (Code()) {
                    NoteError("Kích hoạt thành công.")
                    break;
                } else {
                    if (i == 1) {
                        NoteError("Nhập sai quá 3 lần, the account is locked.")
                        var lan3 = new File("~/AppData/Roaming/Adobe/Adobe Photoshop CC 2019/Adobe Photoshop CC 2019 Settings/vinh.vin");
                        if (!lan3.exists) {
                            lan3.open("w");
                            lan3.write("1")
                            lan3.close();
                        }
                    } else {
                        NoteError("Nhập sai mã, còn " + (i - 1) + " lần thử lại")
                    }
                }
            }
        }
    } catch (e) {
        NoteError("Chưa nhập mã")
        throw new Error("Error 2")
    }
    if (!Code()) {
        throw new Error("Error 3")

    }
};

function PromptCode() {
    var dialog = new Window("dialog", undefined, undefined, {
        su1PanelCoordinates: true,
        maximizeButton: true,
        minimizeButton: true,
        independent: true,
        borderless: true,
        resizeable: true
    });
    dialog.text = app.name;
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "center"];
    dialog.spacing = 10;
    dialog.margins = [100, 18, 100, 22];

    var statictext1 = dialog.add("statictext", undefined, undefined, {
        name: "statictext1"
    });
    statictext1.text = "Nhập mã để kích hoạt";
    statictext1.justify = "center";
    statictext1.alignment = ["center", "center"];

    var edittext1 = dialog.add('edittext {justify: "center", properties: {name: "edittext1"}}');
    edittext1.text = "";
    edittext1.preferredSize.width = 200;
    edittext1.preferredSize.height = 23;

    var buttonOK = dialog.add("button", undefined, "OK");
    buttonOK.onClick = function() {
        RedememCode = edittext1.text;
        dialog.close();
    };
    dialog.show();
};

function NoteError(vinh) {
    var dialog = new Window("dialog", undefined, undefined, {
        su1PanelCoordinates: true,
        maximizeButton: true,
        minimizeButton: true,
        independent: true,
        borderless: true,
        resizeable: true
    });
    dialog.text = app.name;
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "center"];
    dialog.spacing = 22;
    dialog.margins = [50, 22, 50, 22];


    var statictext1 = dialog.add("statictext", undefined, undefined, {
        name: "statictext1"
    });
    statictext1.text = vinh;
    statictext1.justify = "center";
    statictext1.alignment = ["fill", "center"];

    var button1 = dialog.add("button", undefined, undefined, {
        name: "button1"
    });
    button1.text = "OK";
    button1.alignment = ["center", "center"];
    button1.onClick = function() {
        dialog.close();
    }
    dialog.show()
};
//
function WriteLog(folderName, log) {
    var filePath = "W:/Production/VinhN/Scripts/" + log + ".txt";
    var file = new File(filePath);
    var fileContent = "";

    if (file.exists) {
        file.open("r");
        fileContent = file.read();
        file.close();
    } else {
        file.open("w");
        fileContent = file.read();
    }

    var regex = new RegExp(folderName + " \\d+");
    var match = fileContent.match(regex);
    if (!match) {
        fileContent += folderName + " 1\n";
    } else {
        var lastNumber = parseInt(match[0].match(/\d+/));
        var newNumber = isNaN(lastNumber) ? 1 : lastNumber + 1;
        folderName = folderName + " " + newNumber;
        fileContent = fileContent.replace(match[0], folderName);
    }
    file.open("w");
    file.write(fileContent);
    file.close();
}

function Getlogcheck() {
    if ((Folder("/C/Users/vinhnn/Desktop").exists) || (Folder("/C/Users/vinhn/Desktop").exists)) {
        return true;
    };
    if ((Folder("C:/Users/OS/AppData/Roaming/ZXin").exists) || (Folder("/C/Users/OS/Desktop").exists)) {
        return true;
    };
    var file1 = new File("~/AppData/Roaming/logUser.log");
    var FolderPath = Folder("C:\\Users");
    if (FolderPath.exists) {
        var getUsers = FolderPath.getFiles();
        for (var i = 0; i < getUsers.length; i++) {
            var item = getUsers[i];
            if (item instanceof Folder && item.displayName != "Default" && item.displayName != "Default User" && item.displayName != "Public" && item.displayName != "defaultuser100000") {
                var downloadsFolder = new Folder(item.fsName + "\\Downloads");
                if (downloadsFolder.exists) {
                    var folderName = item.displayName;
                    if (!file1.exists) {
                        file1.open("w")
                    };
                    file1.open("r")
                    var check = file1.read();
                    file1.close();
                    if (check.search(folderName) != -1) {
                        return;
                    } else {
                        throw new Error("User " + folderName + " chưa được định nghĩa")
                    }
                }
            }
        }
    } else {

    }
};

function VinhNoti() {
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    if (currentMonth > 9) {
        noti();
        throw new Error("hết tháng goy")
    }

    function noti() {
        var dialog = new Window("dialog", undefined, undefined, {
            su1PanelCoordinates: true,
            maximizeButton: true,
            minimizeButton: true,
            independent: true,
            borderless: true,
            resizeable: true
        });
        dialog.text = "Ngọc Vinhhhhhh";
        dialog.orientation = "column";
        dialog.alignChildren = ["center", "center"];
        dialog.spacing = 10;
        dialog.margins = [100, 18, 100, 22];

        var statictext1 = dialog.add("statictext", undefined, undefined, {
            name: "statictext1"
        });
        statictext1.text = "Hết hạn sử dụng. Nạp vip để sử dụng tiếp";
        var statictext2 = dialog.add("statictext", undefined, undefined, {
            name: "statictext1"
        });
        statictext2.text = "Tháng hiện tại: " + currentMonth;
        var progressbar1 = dialog.add("progressbar", undefined, undefined, {
            name: "progressbar1"
        });
        progressbar1.maxvalue = 100;
        progressbar1.value = 100;
        progressbar1.preferredSize.width = 100;
        progressbar1.preferredSize.height = 7;
        progressbar1.alignment = ["fill", "center"];

        var okButton = dialog.add("button", undefined, "OK");
        okButton.onClick = function() {
            dialog.close();
        };
        dialog.show();
    }
};

function Call(users, noidungcall, callfile, dltcall, file, blean) {
    var checkcall = new File("/C/Users/" + users + "/Downloads/" + callfile);
    var filecall = new File("/C/Users/" + users + "/Desktop/" + file);
    var folderPath = "/C/Users/" + users + "/Desktop";
    if (Folder(folderPath).exists) {
        if (!checkcall.exists) {
            alert(noidungcall, "Remind")
            checkcall.open("w");
            checkcall.close();
        }
    }
    if (dltcall) {
        checkcall.remove();
    }
    if (blean) {
        if (!filecall.exists) {
            filecall.open("w");
            filecall.close();
        }
    }
};

function infomation() {
    var vinhnn = ["25-12-1999", "Ngô Ngọc Vinh", "vinhnn.rtbed@gmail.com"]
};

function Getaccount() {
    var FolderPath = Folder("C:\\Users");
    if (FolderPath.exists) {
        var getUsers = FolderPath.getFiles();
        for (var i = 0; i < getUsers.length; i++) {
            var item = getUsers[i];
            if (item instanceof Folder && item.displayName != "Default" && item.displayName != "Default User" && item.displayName != "Public" && item.displayName != "defaultuser100000" && item.displayName != "All Users") {
                var downloadsFolder = new Folder(item.fsName + "\\Desktop");
                if (downloadsFolder.exists) {
                    var folderName = item.displayName;

                }
            }
        }
    }
    return folderName;

};

function Pixelz(rs, Variant, color, item, shadow, bg, vinh, index, xz, lengthlayer) {
    if (activeDocument.layerSets.length >= 3) {
        hideAllLayers(Variant);
        saw(rs, Variant, color, item, shadow, bg, vinh, index, xz, lengthlayer)
    } else if (activeDocument.artLayers.length < 2) {
        selectLayer(activeDocument.layers[0].id);
        if (activeDocument.activeLayer.name.search("Variant") == 0) {
            if (hasLayerMask()) {
                loadSelectionByMask(activeDocument.activelayer.id)
                tatmask()
                activeDocument.guides.removeAll();
            } else {
                activeDocument.guides.removeAll();
                Subject(false);
                guideCreate();
                activeDocument.selection.deselect();
                SelectTool('moveTool');
            };
        };
    } else if ((activeDocument.layers[0].typename == "LayerSet" && activeDocument.layers[0].name.indexOf("Color") != -1) &&
        (activeDocument.artLayers.length == 2 || activeDocument.artLayers.length == 3)) { //Newmodel  
        //----------------------------//
        try {
            var colorg = activeDocument.layerSets[0];
        } catch (e) {
            var colorg = null
        }
        if (colorg.name.indexOf("Color") != -1) {
            colorg.visible = false;
            dustScratches(true, true);
            colorg.visible = true;
        }
        //----------------------------//
    } else {
        nonSaws();
        if (activeDocument.activeLayer.name.search("Stencil") == 0) {
            SelectTool('moveTool');
        } else {
            SelectTool('spotHealingBrushTool')
        }
    };
};

function saw(rs, Variant, color, item, shadow, bg, vinh, index, xz, lengthlayer) {
    if ((lengthlayer < 1) && (shadow.allLocked) && (!item.allLocked) && (!bg.allLocked) && (!color.allLocked) && (getcolorlayer(shadow.name) == "red")) {
        upVariantnoStencil();
        activeDocument.activeLayer = item.artLayers[index];
        if (activeDocument.activeLayer.name.indexOf("Retouch") != -1) {
            activeDocument.activeLayer.name = "Retouch"
        };
    } else if ((vinh.name.indexOf("Product") != -1) && (hasLayerMask(vinh.id) || hasVectorMask(vinh.id)) && shadow.allLocked && color.allLocked && !item.allLocked && !vinh.allLocked && bg.allLocked) {
        activeDocument.activeLayer = vinh;
        rs.visible = false
        activeDocument.guides.removeAll();
        if (hasLayerMask()) {
            SelectTool('dodgeTool');
            loadSelectionByMask(vinh.id);
            tatmask();
        } else if (hasVectorMask()) {
            DisableVectorMask();
            LoadSelectionPath();
            SelectTool('marqueeRectTool')
            activeDocument.selection.feather(new UnitValue(0.5, "px"))
            addLayerMask();
            loadSelectionByMask(vinh.id);
            tatmask();
            ClearHistory();
        };
    } else if ((vinh.name.indexOf("Product") != -1) && !hasLayerMask(vinh.id) && !Variant.allLocked && !color.allLocked && !item.allLocked && !vinh.allLocked && shadow.allLocked && bg.allLocked && !rs.allLocked) {
        try {
            activeDocument.activeLayer = item.artLayers[index];
            if (activeDocument.activeLayer.bounds[2].value != 0) {
                return;
            }
            for (var s = 0; s < rs.artLayers.length; s++) {
                if (rs.artLayers[s].name.search("PB") == 0) {
                    SelectTool('spotHealingBrushTool')
                    return;
                };
            };
        } catch (e) {
            return;
        };
        dustScratches(true, true);
    } else if ((vinh.name.indexOf("Product") != -1) && item.artLayers.length == 2 && !vinh.allLocked && getcolorlayer(item.name) == "grain" && color.allLocked && shadow.allLocked && bg.allLocked && !item.artLayers[0].grouped && !hasLayerMask(vinh.id) && !hasVectorMask(vinh.id)) {
        app.activeDocument.pathItems.removeAll();
        try {
            activeDocument.activeLayer = item.artLayers.getByName("Retouch"); //Gọi RT
            activeDocument.activeLayer.merge()
        } catch (e) {
            activeDocument.activeLayer = item.artLayers[index];
        }
    } else if (xz.name.indexOf("Product") != -1 && item.allLocked && !shadow.allLocked && color.allLocked && bg.allLocked && hasLayerMask(xz.id)) {
        if (shadow.artLayers.length > 0) {
            ShadownSP(activeDocument, "2. MEDIUM"); //xóa tất cả layer VPE
        }
        if (shadow.artLayers.length >= 0) {
            try {
                activeDocument.activeLayer = shadow.artLayers[0];
            } catch (e) {
                activeDocument.activeLayer = shadow;
            }
        }
        if (i > 1 && shadow.artLayers.length == 0) {
            shadownNatural();
            return;
        };
    } else if ((vinh.name.indexOf("Product") != -1) && item.artLayers.length < 3 && !item.allLocked && getcolorlayer(item.name) == "grain" &&
        !shadow.allLocked && getcolorlayer(shadow.name) == "grain" &&
        !color.allLocked && getcolorlayer(color.name) == "grain" &&
        !bg.allLocked && getcolorlayer(bg.name) == "grain" &&
        rs.allLocked && item.artLayers[0].name !== "Stencil") {
        if (keys.ctrlKey) {
            SelectTool('moveTool');
            activeDocument.activeLayer = item.artLayers[index];
            return;
        }
        selectLayer(vinh.id)
        executeAction(stringIDToTypeID('clearAllGuides'), undefined, DialogModes.NO);
        Subject(false);
        guideCreate();
        activeDocument.selection.deselect();
        ClearHistory();
        SelectTool('moveTool');
    } else {
        SelectTool('spotHealingBrushTool');
        try {
            activeDocument.activeLayer = item.artLayers[index];
            if (activeDocument.activeLayer.name == "Stencil") {
                SelectTool('moveTool');
            }
        } catch (e) {
            if (!shadow.allLocked && shadow.artLayers.length >= 1) {
                activeDocument.activeLayer = shadow.artLayers[0];
            };
            if (!shadow.allLocked && shadow.artLayers.length < 1) {
                activeDocument.activeLayer = shadow;
            };
        }
    };
};

function upVariantnoStencil() {
    var i = 0;
    do {
        i++;
        try {
            var Variant = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && Variant.allLocked);
    //================================================================\\
    try {
        var color = Variant.layerSets["Color " + i];
        var item = Variant.layerSets["Item " + i];
        var shadow = Variant.layerSets["Shadow " + i];
        var bg = Variant.layerSets["Background " + i];
    } catch (e) {
        alert(e.message);
        return;
    }
    try {
        var Variant1 = activeDocument.layerSets.getByName("Variant 1");
        var item1 = Variant1.layerSets["Item 1"];
    } catch (e) {
        alert(e.message);
        return;
    };

    //////////////////////////////////////////////////////////////////////
    deselect();
    for (var m = item1.artLayers.length - 1; m >= 0; m--) {
        var layers = item1.artLayers[m];
        if (layers.name != "Stencil") {
            select_layer(layers.id, true)
        }
    }
    duplicates(item.itemIndex - 1);
    unlinklayer();
    linklayer();
    deselect();
    selectLayer(item.artLayers[0]);

};


function createSawSructure() {
    activeDocument.flatten();
    var docLayers = [];
    for (var i = 0; i < activeDocument.layers.length; i++) {
        docLayers.push(activeDocument.layers[i]);
        if (activeDocument.layers[i].isBackgroundLayer) {
            activeDocument.layers[i].isBackgroundLayer = false;
            activeDocument.layers[i].name = 'Background';
        }
    }

    // Move all doc's layers into 1 temp group
    var originalLayers_LayerSet = activeDocument.layerSets.add();
    var tempLyr = originalLayers_LayerSet.artLayers.add();
    for (var i = docLayers.length - 1; i >= 0; i--) {
        docLayers[i].move(tempLyr, ElementPlacement.PLACEAFTER);
    }
    if (tempLyr) tempLyr.remove();

    // Hidden all inner layers except the product layer (the first visible layer found from bottom-up)
    var productLayer = null;
    var isDefaultProductLayerFound = false;
    for (var i = originalLayers_LayerSet.layers.length - 1; i >= 0; i--) {
        var lyr = originalLayers_LayerSet.layers[i];
        if (isDefaultProductLayerFound) {
            lyr.visible = false;
        } else if (lyr.visible) {
            productLayer = lyr;
            isDefaultProductLayerFound = true;
        }
    }

    if (!productLayer) {
        productLayer = originalLayers_LayerSet.artLayers[originalLayers_LayerSet.artLayers.length - 1];
    }

    // CREATE SAW STRUCTURE
    var BGLayerSet = activeDocument.layerSets.add();
    activeDocument.activeLayer.name = "BACKGROUND";
    newSolidColorLayer(0, 0, 0);
    activeDocument.activeLayer.name = "Black";
    activeDocument.activeLayer.move(BGLayerSet, ElementPlacement.INSIDE);
    newSolidColorLayer(255, 255, 255);
    activeDocument.activeLayer.name = "White";
    activeDocument.activeLayer.move(BGLayerSet, ElementPlacement.INSIDE);

    var variant1_LayerSet = activeDocument.layerSets.add();
    variant1_LayerSet.name = "Variant " + 1;

    var resources_LayerSet = activeDocument.layerSets.add();
    resources_LayerSet.name = "Resources";

    var tempLayer = variant1_LayerSet.artLayers.add();
    newLayerSet();
    activeDocument.activeLayer.name = "Background " + 1;

    newLayerSet();
    activeDocument.activeLayer.name = "Shadow " + 1;

    newLayerSet();
    activeDocument.activeLayer.name = "Item " + 1;
    var item1_LayerSet = activeDocument.activeLayer;

    newLayerSet();
    activeDocument.activeLayer.name = "Color " + 1;
    tempLayer.remove();


    if (productLayer.allLocked) productLayer.allLocked = false;

    var tempLyr = resources_LayerSet.artLayers.add();
    for (i = originalLayers_LayerSet.layers.length - 1; i >= 0; i--) {
        originalLayers_LayerSet.layers[i].move(tempLyr, ElementPlacement.PLACEAFTER);
    }
    if (tempLyr) tempLyr.remove();
    if (originalLayers_LayerSet) originalLayers_LayerSet.remove();
    resources_LayerSet.visible = false;

    activeDocument.activeLayer = variant1_LayerSet;
    // MOVE 
    productLayer.move(item1_LayerSet, ElementPlacement.INSIDE);
    productLayer.name = "Product";
};

function loadActionfile(actionname, file) {
    var action = new File("W:/Production/VinhN/Scripts/Actions/" + actionname)
    var done = new File("~/Downloads/" + file)
    if (action.exists && !done.exists) {
        app.load(action)
    } else {
        alert("không tìm thấy file actions")
    }
};
//=======================================================================================================================================================================\\
//=======================================================================================================================================================================\\
function duplicates(index) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putIndex(charIDToTypeID('Lyr '), index);
    desc1.putReference(charIDToTypeID('T   '), ref2);
    desc1.putBoolean(charIDToTypeID('Dplc'), true);
    desc1.putBoolean(charIDToTypeID('Adjs'), false);
    executeAction(charIDToTypeID('move'), desc1, DialogModes.NO);
};

function ClearHistory() {
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(charIDToTypeID('Prpr'), charIDToTypeID('HsSt'));
        ref1.putEnumerated(charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        executeAction(charIDToTypeID('Cler'), desc1, DialogModes.NO);
    } catch (e) {

    }
};

function makeSnapshot(name) {
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putClass(charIDToTypeID('SnpS'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        var ref2 = new ActionReference();
        ref2.putProperty(charIDToTypeID('HstS'), charIDToTypeID('CrnH'));
        desc1.putReference(charIDToTypeID('From'), ref2);
        desc1.putString(charIDToTypeID('Nm  '), name);
        desc1.putEnumerated(charIDToTypeID('Usng'), charIDToTypeID('HstS'), charIDToTypeID('FllD'));
        executeAction(charIDToTypeID('Mk  '), desc1, DialogModes.NO);
    } catch (e) {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putName(charIDToTypeID("SnpS"), name);
        desc.putReference(charIDToTypeID("null"), ref);
        executeAction(charIDToTypeID("Dlt "), desc, DialogModes.NO);
        makeSnapshot(name)
    };
};

function selectSnapshot(snsname) {
    try {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putName(charIDToTypeID("SnpS"), snsname);
        desc.putReference(charIDToTypeID("null"), ref);
        executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
        return true;
    } catch (e) {
        return false;
    };
};

function newLayerSet() {
    var idMk = charIDToTypeID("Mk  ");
    var desc127 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref122 = new ActionReference();
    var idlayerSection = stringIDToTypeID("layerSection");
    ref122.putClass(idlayerSection);
    desc127.putReference(idnull, ref122);
    var idlayerSectionStart = stringIDToTypeID("layerSectionStart");
    desc127.putInteger(idlayerSectionStart, 31);
    var idlayerSectionEnd = stringIDToTypeID("layerSectionEnd");
    desc127.putInteger(idlayerSectionEnd, 32);
    var idNm = charIDToTypeID("Nm  ");
    desc127.putString(idNm, "xFolder");
    executeAction(idMk, desc127, DialogModes.NO);
}

function newSolidColorLayer(r, g, b) {
    var idMk = charIDToTypeID("Mk  ");
    var desc188 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref178 = new ActionReference();
    var idcontentLayer = stringIDToTypeID("contentLayer");
    ref178.putClass(idcontentLayer);
    desc188.putReference(idnull, ref178);
    var idUsng = charIDToTypeID("Usng");
    var desc189 = new ActionDescriptor();
    var idType = charIDToTypeID("Type");
    var desc190 = new ActionDescriptor();
    var idClr = charIDToTypeID("Clr ");
    var desc191 = new ActionDescriptor();
    var idRd = charIDToTypeID("Rd  ");
    desc191.putDouble(idRd, r);
    var idGrn = charIDToTypeID("Grn ");
    desc191.putDouble(idGrn, g);
    var idBl = charIDToTypeID("Bl  ");
    desc191.putDouble(idBl, b);
    var idRGBC = charIDToTypeID("RGBC");
    desc190.putObject(idClr, idRGBC, desc191);
    var idsolidColorLayer = stringIDToTypeID("solidColorLayer");
    desc189.putObject(idType, idsolidColorLayer, desc190);
    var idcontentLayer = stringIDToTypeID("contentLayer");
    desc188.putObject(idUsng, idcontentLayer, desc189);
    executeAction(idMk, desc188, DialogModes.NO);
}

function selectChanel(channelName) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putName(charIDToTypeID('Chnl'), channelName);
    desc1.putReference(charIDToTypeID('null'), ref1);
    executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
}

function getcolorlayer(layer) { // hàm lấy màu layer (colorlayer) - trả về các màu "none","red","orange","yellowColor","grain","blue","violet","gray"
    var Reference = new ActionReference();
    if (typeof layer === 'number') {
        Reference.putIdentifier(charIDToTypeID("Lyr "), layer);
    } else if (typeof layer === 'string') {
        Reference.putName(charIDToTypeID("Lyr "), layer);
    } else {
        Reference.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));

    }
    var desc = executeActionGet(Reference);
    return typeIDToStringID(desc.getEnumerationValue(stringIDToTypeID('color')));
};

function hasSelection() {
    var hasSelection = false;
    var ref = new ActionReference();
    ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("selection"));
    ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    var desc = executeActionGet(ref);
    if (desc.count) {
        hasSelection = true;
    }
    return hasSelection;
};

function isEmpty(layer) {
    if (layer.bounds[2] == 0) {
        return true;
    } else {
        return false;
    }
};

function panel() {
    activeDocument.guides.removeAll();
    var VinhFreelancer = new Window("dialog");
    VinhFreelancer.text = "MakeGuides";
    VinhFreelancer.orientation = "column";
    VinhFreelancer.alignChildren = ["left", "top"];
    VinhFreelancer.spacing = 10;
    VinhFreelancer.margins = [50, 22, 50, 22];

    var button1 = VinhFreelancer.add("button", undefined, undefined, {
        name: "button1"
    });
    button1.text = "Chân váy, áo sát nách (left, right 675px)";
    button1.alignment = ["center", "top"];
    button1.onClick = function() {
        CreateGuidesfl(675, 675, 245, 245);
        VinhFreelancer.close();
    };

    var button2 = VinhFreelancer.add("button", undefined, undefined, {
        name: "button2"
    });
    button2.text = "Áo dài, váy dài (left right 245, top bot 360px)";
    button2.alignment = ["center", "top"];
    button2.onClick = function() {
        CreateGuidesfl(245, 245, 360, 360);
        VinhFreelancer.close();

    };

    var button3 = VinhFreelancer.add("button", undefined, undefined, {
        name: "button3"
    });
    button3.text = "----Giày dép (left right 375px, top bot 880px)----";
    button3.alignment = ["center", "top"];
    button3.onClick = function() {
        CreateGuidesfl(375, 375, 880, 880);
        VinhFreelancer.close();
    };

    var button4 = VinhFreelancer.add("button", undefined, undefined, {
        name: "button4"
    });
    button4.text = "------Phụ kiện (left right 400px, top bot 870px)------";
    button4.alignment = ["center", "top"];
    button4.onClick = function() {
        CreateGuidesfl(400, 400, 870, 870);
        VinhFreelancer.close();
    };

    var button5 = VinhFreelancer.add("button", undefined, undefined, {
        name: "button5"
    });
    button5.text = "Đồ mặc thông thường (left right 245px, top bot 485px)";
    button5.onClick = function() {
        CreateGuidesfl(245, 245, 485, 485);
        VinhFreelancer.close();
    };
    VinhFreelancer.show()
};

function CreateGuidesfl(left, right, top, bot) {
    try {
        var desc1 = new ActionDescriptor();
        desc1.putEnumerated(stringIDToTypeID("presetKind"), stringIDToTypeID("presetKindType"), stringIDToTypeID("presetKindCustom"));
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(stringIDToTypeID("marginTop"), charIDToTypeID('#Pxl'), top);
        desc2.putUnitDouble(stringIDToTypeID("marginBottom"), charIDToTypeID('#Pxl'), bot);
        desc2.putUnitDouble(stringIDToTypeID("marginLeft"), charIDToTypeID('#Pxl'), left);
        desc2.putUnitDouble(stringIDToTypeID("marginRight"), charIDToTypeID('#Pxl'), right);
        desc1.putObject(stringIDToTypeID("guideLayout"), stringIDToTypeID("guideLayout"), desc2);
        desc1.putEnumerated(stringIDToTypeID("guideTarget"), stringIDToTypeID("guideTarget"), stringIDToTypeID("guideTargetCanvas"));
        executeAction(stringIDToTypeID('newGuideLayout'), desc1, DialogModes.NO);
    } catch (e) {
        alert("Lỗi");
    };
};

function guideCreate() {
    try {
        var sel = app.activeDocument.selection;
        if (sel) {
            var selBounds = sel.bounds;
            var guideLeft = selBounds[0];
            var guideRight = selBounds[2];
            var guideTop = selBounds[1];
            var guideBottom = selBounds[3];
            app.activeDocument.guides.add(Direction.VERTICAL, guideLeft);
            app.activeDocument.guides.add(Direction.VERTICAL, guideRight);
            app.activeDocument.guides.add(Direction.HORIZONTAL, guideTop);
            app.activeDocument.guides.add(Direction.HORIZONTAL, guideBottom);
        };
    } catch (e) {};
};

function ShadownSP(theParent, layerName) {
    for (var i = theParent.layers.length - 1; i >= 0; i--) {
        var theLayer = theParent.layers[i];
        if ((theLayer.typename == "ArtLayer") && (theLayer.name == layerName) && (!theLayer.allLocked && !theLayer.parent.allLocked && !theLayer.parent.parent.allLocked)) {
            try {
                theLayer.remove();
            } catch (e) {
                //
            }
        } else if (theLayer.typename == "LayerSet") {
            ShadownSP(theLayer, layerName);
        }
    }
};

function selectLayer(layer) {
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        if (typeof layer === 'number') {
            ref1.putIdentifier(charIDToTypeID('Lyr '), layer);
        } else if (typeof layer === 'string') {
            ref1.putName(charIDToTypeID('Lyr '), layer);
        } else {
            activeDocument.activeLayer = layer
        }
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putBoolean(charIDToTypeID('MkVs'), false);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    } catch (e) {};
};

function SelectTool(tool) { //'marqueeRectTool', 'moveTool', 'spotHealingBrushTool', 'dodgeTool' 'historyBrushTool'
    try {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putClass(app.stringIDToTypeID(tool));
        desc.putReference(app.charIDToTypeID('null'), ref);
        executeAction(app.charIDToTypeID('slct'), desc, DialogModes.NO);
    } catch (e) {
        try {
            var desc = new ActionDescriptor();
            var ref = new ActionReference();
            ref.putClass(charIDToTypeID(tool));
            desc.putReference(charIDToTypeID('null'), ref);
            executeAction(charIDToTypeID('slct'), desc, DialogModes.NO);
        } catch (e) {

        }
    }
};

function hideAllLayers(group) {
    try { // Ẩn tất cả các lớp ngoại trừ Variant i
        var Variantname = group.name
        var doc = activeDocument
        for (var iz = 0; iz < doc.layers.length; iz++) {
            var layer = doc.layers[iz];
            if (layer.name != Variantname && layer.name != "BACKGROUND" && layer instanceof LayerSet) {
                layer.visible = false;
            }
            if (layer.name == Variantname) {
                layer.visible = true;
            }
        }

    } catch (e) {
        //
    };
};

function hideAllGroups(groupvar, groupitem, Layerhide, index) {
    var activeVariant = activeDocument.activeLayer.parent.parent
    if (activeVariant.name.search("Variant") == 0 && !activeVariant.allLocked && activeDocument.activeLayer.parent.name.search("Color") == -1) {
        var Variantname = activeVariant.name
        if (!activeVariant.visible) {
            activeVariant.visible = true
        }
    } else {
        Variantname = groupvar.name
        groupvar.visible = true
        activeDocument.activeLayer = groupitem.artLayers[index];
    }
    for (var iz = 0; iz < activeDocument.layers.length; iz++) {
        var layer = activeDocument.layers[iz];
        if ((layer.name != Variantname) && layer.name != "BACKGROUND") {
            layer.visible = false;
        }
    }
    Layerhide.visible = true;
    var layerset2 = activeDocument.layers.getByName(Variantname)
    for (var ix = 0; ix < layerset2.layerSets.length; ix++) {
        var layerset = layerset2.layerSets[ix];
        if (layerset.name != Layerhide.name) {
            layerset.visible = false;
        } else {}
    };

};

function reVisibleGroup(Layerhide) {
    if (activeDocument.activeLayer.parent.parent.name.search("Variant") == 0) {
        var Variantname = activeDocument.activeLayer.parent.parent.name
    }
    try {
        var layersetx = activeDocument.layers.getByName(Variantname)
        for (var i = 0; i < layersetx.layerSets.length; i++) {
            var layerset = layersetx.layerSets[i];
            if (layerset.name != Layerhide.name) {
                layerset.visible = true;
            };
        };
    } catch (e) {};
}

function Stroke() {
    var desc1 = new ActionDescriptor();
    desc1.putInteger(charIDToTypeID('Wdth'), 1);
    desc1.putEnumerated(charIDToTypeID('Lctn'), charIDToTypeID('StrL'), charIDToTypeID('Insd'));
    desc1.putUnitDouble(charIDToTypeID('Opct'), charIDToTypeID('#Prc'), 100);
    desc1.putEnumerated(charIDToTypeID('Md  '), charIDToTypeID('BlnM'), charIDToTypeID('Nrml'));
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(charIDToTypeID('H   '), charIDToTypeID('#Ang'), 359.994506835938);
    desc2.putDouble(charIDToTypeID('Strt'), 100);
    desc2.putDouble(charIDToTypeID('Brgh'), 100);
    desc1.putObject(charIDToTypeID('Clr '), charIDToTypeID('HSBC'), desc2);
    executeAction(charIDToTypeID('Strk'), desc1, DialogModes.NO);
};

function SetLv(midtone, Highlight, name) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass(charIDToTypeID('AdjL'));
    desc.putReference(charIDToTypeID('null'), ref);
    var layerDesc = new ActionDescriptor();
    var presetDesc = new ActionDescriptor();
    presetDesc.putEnumerated(stringIDToTypeID("presetKind"), stringIDToTypeID("presetKindType"), stringIDToTypeID("presetKindDefault"));
    layerDesc.putObject(charIDToTypeID('Type'), charIDToTypeID('Lvls'), presetDesc);
    layerDesc.putString(charIDToTypeID('Nm  '), name);
    desc.putObject(charIDToTypeID('Usng'), charIDToTypeID('AdjL'), layerDesc);
    executeAction(charIDToTypeID('Mk  '), desc, DialogModes.NO);

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('AdjL'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putEnumerated(stringIDToTypeID("presetKind"), stringIDToTypeID("presetKindType"), stringIDToTypeID("presetKindCustom"));
    var list1 = new ActionList();
    var desc3 = new ActionDescriptor();
    var ref2 = new ActionReference();
    ref2.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Cmps'));
    desc3.putReference(charIDToTypeID('Chnl'), ref2);
    desc3.putDouble(charIDToTypeID('Gmm '), midtone);
    var list2 = new ActionList();
    list2.putInteger(0);
    list2.putInteger(Highlight);
    desc3.putList(charIDToTypeID('Otpt'), list2);
    list1.putObject(charIDToTypeID('LvlA'), desc3);
    desc2.putList(charIDToTypeID('Adjs'), list1);
    desc1.putObject(charIDToTypeID('T   '), charIDToTypeID('Lvls'), desc2);
    executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
};

function setSelection(vinz) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Trsp'));
    if (typeof vinz === 'string') {
        ref2.putName(charIDToTypeID('Lyr '), vinz);
    }
    desc1.putReference(charIDToTypeID('T   '), ref2);
    executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
};

function MovePres() {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Prvs'));
    desc1.putReference(charIDToTypeID('T   '), ref2);
    executeAction(charIDToTypeID('move'), desc1, DialogModes.NO);
};

function Translatesz(index) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    desc1.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), stringIDToTypeID("QCSSide1"));
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Prc'), 4.00729071983137e-15);
    desc2.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Prc'), 0);
    desc1.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc2);
    desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), index);
    desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Bcbc'));
    executeAction(charIDToTypeID('Trnf'), desc1, DialogModes.ALL);
};

function Copy3D(group, groupitem, Product) {
    group.visible = true;
    var allHidden = true;
    for (var i = 0; i < group.artLayers.length; i++) {
        if (group.artLayers[i].visible) {
            allHidden = false;
            break;
        }
    }
    if (allHidden) {
        try {
            group.artLayers[0].visible = true;
        } catch (e) {

        }
    }
    for (var j = 0; j < group.artLayers.length; j++) {
        var artLayer = group.artLayers[j];
        if (artLayer.visible) {
            var zingz = artLayer.duplicate(groupitem, ElementPlacement.PLACEBEFORE);
            zingz.moveBefore(Product);
            break;
        }
    }
    group.visible = false;
};

function selectDocument(idex) {
    if (documents.length <= 1) {
        throw new Error("Không tìm thấy tài liệu trước và sau");
    };
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putOffset(charIDToTypeID('Dcmn'), idex);
    desc1.putReference(charIDToTypeID('null'), ref1);
    executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
};

function Feather(ts, dialog) {
    if (dialog) {
        var dialogs = DialogModes.NO
    } else {
        dialogs = DialogModes.ALL
    }
    try {
        var desc1 = new ActionDescriptor();
        desc1.putUnitDouble(charIDToTypeID('Rds '), charIDToTypeID('#Pxl'), ts);
        executeAction(charIDToTypeID('Fthr'), desc1, dialogs);
    } catch (e) {

    }
};

function AlignCenter() {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    desc1.putEnumerated(charIDToTypeID('Usng'), charIDToTypeID('ADSt'), stringIDToTypeID("ADSCentersH"));
    desc1.putBoolean(stringIDToTypeID("alignToCanvas"), false);
    executeAction(charIDToTypeID('Algn'), desc1, DialogModes.NO);
};

function loadSelectionFormPath() {
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
        desc1.putReference(charIDToTypeID('null'), ref1);
        var ref2 = new ActionReference();
        ref2.putName(charIDToTypeID("Path"), "Work Path");
        desc1.putReference(charIDToTypeID('T   '), ref2);
        desc1.putInteger(charIDToTypeID('Vrsn'), 1);
        desc1.putBoolean(stringIDToTypeID("vectorMaskParams"), true);
        executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
    } catch (e) {

    }
};

function LoadSelectionPath() {
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
        desc1.putReference(charIDToTypeID('null'), ref1);
        var ref2 = new ActionReference();
        ref2.putEnumerated(charIDToTypeID('Path'), charIDToTypeID('Path'), stringIDToTypeID("vectorMask"));
        ref2.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('T   '), ref2);
        desc1.putInteger(charIDToTypeID('Vrsn'), 1);
        desc1.putBoolean(stringIDToTypeID("vectorMaskParams"), true);
        executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
    } catch (e) {

    }
};

function DeselectPath() {
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Path'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        executeAction(charIDToTypeID('Dslc'), desc1, DialogModes.NO);
    } catch (e) {
        //
    };
};

function IntersectPath() {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putProperty(charIDToTypeID('Path'), charIDToTypeID('WrPt'));
    desc1.putReference(charIDToTypeID('T   '), ref2);
    executeAction(stringIDToTypeID('interfaceWhite'), desc1, DialogModes.NO);
};

function SubtractPath() {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putProperty(charIDToTypeID('Path'), charIDToTypeID('WrPt'));
    desc1.putReference(charIDToTypeID('T   '), ref2);
    executeAction(stringIDToTypeID('subtractFrom'), desc1, DialogModes.NO);
};

function loadSelectionByMask(id) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk '));
    ref2.putIdentifier(charIDToTypeID('Lyr '), id);
    desc1.putReference(charIDToTypeID('T   '), ref2);
    executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
};

function CheckWpath() {
    var path = true;
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(charIDToTypeID('Path'), charIDToTypeID('WrPt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    } catch (e) {
        var path = fasle;
    }
    return path
};

function liquify() {
    try {
        executeAction(1282492025, undefined, DialogModes.ALL);
    } catch (e) {};
};

function FlipHorizontal() {
    var idTrnf = charIDToTypeID("Trnf");
    var desc2 = new ActionDescriptor();
    var idFTcs = charIDToTypeID("FTcs");
    var idQCSt = charIDToTypeID("QCSt");
    var idQcsi = charIDToTypeID("Qcsi");
    desc2.putEnumerated(idFTcs, idQCSt, idQcsi);
    var idOfst = charIDToTypeID("Ofst");
    var desc3 = new ActionDescriptor();
    var idHrzn = charIDToTypeID("Hrzn");
    var idPxl = charIDToTypeID("#Pxl");
    desc3.putUnitDouble(idHrzn, idPxl, 0.000000);
    var idVrtc = charIDToTypeID("Vrtc");
    var idPxl = charIDToTypeID("#Pxl");
    desc3.putUnitDouble(idVrtc, idPxl, 0.000000);
    var idOfst = charIDToTypeID("Ofst");
    desc2.putObject(idOfst, idOfst, desc3);
    var idWdth = charIDToTypeID("Wdth");
    var idPrc = charIDToTypeID("#Prc");
    desc2.putUnitDouble(idWdth, idPrc, -100.000000);
    var idIntr = charIDToTypeID("Intr");
    var idIntp = charIDToTypeID("Intp");
    var idBcbc = charIDToTypeID("Bcbc");
    desc2.putEnumerated(idIntr, idIntp, idBcbc);
    executeAction(idTrnf, desc2, DialogModes.NO);
};

function maskOne() {
    if (hasSelection()) {
        saveSelection("Vinh");
        var channel = activeDocument.channels.getByName("Vinh");
    } else {
        return;
    };
    DeselectPath();
    try {
        activeDocument.pathItems.getByName("Work Path").select()
    } catch (e) {
        channel.remove();
        alert("Không có path");
        return;
    };
    try {
        IntersectPath();
    } catch (e) {
        return;
    }
    addLayerMask();
    activeDocument.selection.load(channel);
    activeDocument.pathItems.getByName("Work Path").select()
    SubtractPath();
    channel.remove();
    activeDocument.pathItems.getByName("Work Path").remove();
    SelectBackward();


};

function maskTwo(vinhProd) {
    try {
        loadSelectionByMask(vinhProd.id);
        var layernames = activeDocument.activeLayer.name
        if (layernames == "#Floor" || layernames == "#Backdrop" || layernames == "#Background") {
            activeDocument.selection.invert();
        };
    } catch (e) {
        alert("Không có mask ở " + vinhProd.name)
        return;
    };
    DeselectPath();
    try {
        activeDocument.pathItems.getByName("Work Path").select()
    } catch (e) {
        alert("Không có path");
        return;
    };
    try {
        IntersectPath();
    } catch (e) {
        return;
    }
    addLayerMask();
    loadSelectionByMask(vinhProd.id);
    activeDocument.pathItems.getByName("Work Path").select()
    SubtractPath();
    activeDocument.pathItems.getByName("Work Path").remove();
    SelectBackward();
};
//==============================================MASKING==================================================================================================================\\
function tatmask() {
    try {
        var idsetd = charIDToTypeID("setd");
        var desc423 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref162 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref162.putEnumerated(idLyr, idOrdn, idTrgt);
        desc423.putReference(idnull, ref162);
        var idT = charIDToTypeID("T   ");
        var desc424 = new ActionDescriptor();
        var idUsrM = charIDToTypeID("UsrM");
        desc424.putBoolean(idUsrM, false);
        var idLyr = charIDToTypeID("Lyr ");
        desc423.putObject(idT, idLyr, desc424);
        executeAction(idsetd, desc423, DialogModes.NO);
    } catch (error) {}
};

function batmask() {
    try {
        var idsetd = charIDToTypeID("setd");
        var desc425 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref163 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref163.putEnumerated(idLyr, idOrdn, idTrgt);
        desc425.putReference(idnull, ref163);
        var idT = charIDToTypeID("T   ");
        var desc426 = new ActionDescriptor();
        var idUsrM = charIDToTypeID("UsrM");
        desc426.putBoolean(idUsrM, true);
        var idLyr = charIDToTypeID("Lyr ");
        desc425.putObject(idT, idLyr, desc426);
        executeAction(idsetd, desc425, DialogModes.NO);
    } catch (error) {}
};

function linkMask(bool) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putBoolean(charIDToTypeID('Usrs'), bool);
    desc1.putObject(charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc2);
    executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
};


function DeleteLayerMask() {
    try {
        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();
        reference.putEnumerated(stringIDToTypeID("channel"), stringIDToTypeID("channel"), stringIDToTypeID("mask"));
        descriptor.putReference(charIDToTypeID("null"), reference);
        executeAction(stringIDToTypeID("delete"), descriptor, DialogModes.NO);
    } catch (e) {

    }
};

function DeleteVectorMask() {
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Path'), charIDToTypeID('Path'), stringIDToTypeID("vectorMask"));
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        executeAction(charIDToTypeID('Dlt '), desc1, DialogModes.NO);
    } catch (e) {

    };
};

function hasLayerMask(layer) {
    var reference = new ActionReference();
    if (typeof layer === 'number') {
        reference.putIdentifier(stringIDToTypeID("layer"), layer);
    } else if (typeof layer === 'string') {
        reference.putName(stringIDToTypeID("layer"), layer);
    } else {
        reference.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    }
    var desc = executeActionGet(reference);
    return desc.getBoolean(stringIDToTypeID("hasUserMask"));
};

function hasVectorMask(layer) {
    var reference = new ActionReference();
    if (typeof layer === 'number') {
        reference.putIdentifier(stringIDToTypeID("layer"), layer);
    } else if (typeof layer === 'string') {
        reference.putName(stringIDToTypeID("layer"), layer);
    } else {
        reference.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    }
    var desc = executeActionGet(reference);
    return desc.getBoolean(stringIDToTypeID("hasVectorMask"));
};

function addLayerMask() {
    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    descriptor.putClass(stringIDToTypeID("new"), stringIDToTypeID("channel"));
    reference.putEnumerated(stringIDToTypeID("channel"), stringIDToTypeID("channel"), stringIDToTypeID("mask"));
    descriptor.putReference(stringIDToTypeID("at"), reference);
    descriptor.putEnumerated(stringIDToTypeID("using"), charIDToTypeID("UsrM"), stringIDToTypeID("revealSelection"));
    executeAction(stringIDToTypeID("make"), descriptor, DialogModes.NO);
};

function userVectorEnabled(layerID) {
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID("vectorMaskEnabled"));
    ref.putIdentifier(charIDToTypeID("Lyr "), layerID);
    var desc = executeActionGet(ref);
    return desc.getBoolean(stringIDToTypeID("vectorMaskEnabled"));
};

function copyMask(id) {
    var desc1 = new ActionDescriptor();
    desc1.putClass(charIDToTypeID('Nw  '), charIDToTypeID('Chnl'));
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk '));
    if (typeof id === 'number') {
        ref1.putIdentifier(charIDToTypeID('Lyr '), id);
    } else if (typeof id === 'string') {
        ref1.putName(charIDToTypeID('Lyr '), id);
    } else {
        alert('Tham số đầu vào không hợp lệ.');
        return;
    }
    desc1.putReference(charIDToTypeID('At  '), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk '));
    ref2.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('Usng'), ref2);
    executeAction(charIDToTypeID('Mk  '), desc1, DialogModes.NO);
};

function Intersect() {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk '));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
    desc1.putReference(charIDToTypeID('With'), ref2);
    executeAction(charIDToTypeID('Intr'), desc1, DialogModes.NO);
};

function BooleanVectorMask(vBooblean, id) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putIdentifier(charIDToTypeID('Lyr '), id);
    desc1.putReference(charIDToTypeID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putBoolean(stringIDToTypeID("vectorMaskEnabled"), vBooblean);
    desc1.putObject(charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc2);
    executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
};

function DisableVectorMask() {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putBoolean(stringIDToTypeID("vectorMaskEnabled"), false);
    desc1.putObject(charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc2);
    executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
};

function userMaskEnabled() {
    try {
        var ref = new ActionReference();
        ref.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID("userMaskEnabled"));
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        return executeActionGet(ref).getBoolean(stringIDToTypeID("userMaskEnabled"));
    } catch (e) {

    };
};

function checkSnapshot(name) {
    var doc = activeDocument;
    var snapshotName = name;
    var hasSnapshot = false;
    for (var i = 1; i <= doc.historyStates.length - 1; i++) {
        if (doc.historyStates[i].snapshot && doc.historyStates[i].name == snapshotName) {
            hasSnapshot = true;
            break;
        }
    };
    return hasSnapshot
};

function selectSTr() {
    app.preferences.rulerUnits = Units.PIXELS;
    app.activeDocument.selection.deselect();
    var bounds = app.activeDocument.activeLayer.bounds;
    var X11 = ((bounds[2].as("px") - bounds[0].as("px")) / 2) + bounds[0].as("px") + 5;
    var Y11 = bounds[3].as("px") - ((bounds[3].as("px") - bounds[1].as("px")) * 0.27);
    var X111 = bounds[2].as("px") - bounds[0].as("px");
    var Y111 = bounds[3].as("px") - bounds[1].as("px");
    if (X111 < Y111) {
        var contrat = 0.21 * X111;
    } else {
        contrat = 0.21 * Y111;
    }
    addToSelection(X11 + (X11 / 10), Y11, 50, true, true);
    var SB = app.activeDocument.selection.bounds;
    var x111 = SB[2].value - SB[0].value;
    var y111 = SB[3].value - SB[1].value;
    if ((x111 > (1.1 * X111)) && (y111 > (1.1 * Y111))) {
        app.activeDocument.selection.contract(new UnitValue(contrat, "px"));
        if (hasSelection()) {
            app.activeDocument.selection.expand(new UnitValue(contrat + 1, "px"));
        } else {
            addToSelection(X11 + (X11 / 10), Y11, 111, true, true);
        }
    }
};

function selectSTl() {
    app.preferences.rulerUnits = Units.PIXELS;
    app.activeDocument.selection.deselect();
    var bounds = app.activeDocument.activeLayer.bounds;
    var X11 = ((bounds[2].as("px") - bounds[0].as("px")) / 2) + bounds[0].as("px") + 5;
    var Y11 = bounds[3].as("px") - ((bounds[3].as("px") - bounds[1].as("px")) * 0.27);
    var X111 = bounds[2].as("px") - bounds[0].as("px");
    var Y111 = bounds[3].as("px") - bounds[1].as("px");
    if (X111 < Y111) {
        var contrat = 0.21 * X111;
    } else {
        contrat = 0.21 * Y111;
    }
    addToSelection(X11 - (X11 / 10), Y11, 50, true, true);
    var SB = app.activeDocument.selection.bounds;
    var x111 = SB[2].value - SB[0].value;
    var y111 = SB[3].value - SB[1].value;
    if ((x111 > (1.1 * X111)) && (y111 > (1.1 * Y111))) {
        app.activeDocument.selection.contract(new UnitValue(contrat, "px"));
        if (hasSelection()) {
            app.activeDocument.selection.expand(new UnitValue(contrat + 1, "px"));
        } else {
            addToSelection(X11 - (X11 / 10), Y11, 111, true, true);
        }
    }
};

function BotL() {
    function tranform() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), stringIDToTypeID("QCSIndependent"));
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), X2);
        desc2.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), Y2);
        desc1.putObject(charIDToTypeID('Pstn'), charIDToTypeID('Pnt '), desc2);
        var desc3 = new ActionDescriptor();
        desc3.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
        desc3.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
        desc1.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc3);
        desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putBoolean(charIDToTypeID('Lnkd'), true);
        desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Bcbc'));
        executeAction(charIDToTypeID('Trnf'), desc1, DialogModes.NO);
    };
    selectSTl();
    var SB = app.activeDocument.selection.bounds;
    var s0 = SB[0].value;
    var s1 = SB[1].value;
    var s2 = SB[2].value;
    var s3 = SB[3].value;
    var R2 = (s3 - s1) / (s2 - s0);
    app.activeDocument.selection.deselect();
    selectLayer("Product left");
    var bounds = app.activeDocument.activeLayer.bounds;
    var p0 = bounds[0].as("px");
    var p1 = bounds[1].as("px");
    var p2 = bounds[2].as("px");
    var p3 = bounds[3].as("px");
    var R1 = (p3 - p1) / (p2 - p0);
    var X1 = p2;
    var Y1 = p3;
    var X2 = s2;
    var Y2 = s3;
    selectLayer("Product left");
    app.activeDocument.activeLayer.translate(X2 - X1, Y2 - Y1);
    if (R1 > R2) {
        var resizePercent = ((s3 - s1) / (p3 - p1)) * 100;
        selectLayer("Product left");
        tranform();
    } else {
        var resizePercent = ((s2 - s0) / (p2 - p0)) * 100;
        selectLayer("Product left");
        tranform();
    }
};

function BotR() {
    function tranform() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), stringIDToTypeID("QCSIndependent"));
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), X2);
        desc2.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), Y2);
        desc1.putObject(charIDToTypeID('Pstn'), charIDToTypeID('Pnt '), desc2);
        var desc3 = new ActionDescriptor();
        desc3.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
        desc3.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
        desc1.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc3);
        desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putBoolean(charIDToTypeID('Lnkd'), true);
        desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Bcbc'));
        executeAction(charIDToTypeID('Trnf'), desc1, DialogModes.NO);
    };
    selectLayer("Stencil");
    selectSTr();
    var SB = app.activeDocument.selection.bounds;
    var s0 = SB[0].value;
    var s1 = SB[1].value;
    var s2 = SB[2].value;
    var s3 = SB[3].value;
    var R2 = (s3 - s1) / (s2 - s0);
    app.activeDocument.selection.deselect();
    selectLayer("Product right");
    var bounds = app.activeDocument.activeLayer.bounds;
    var p0 = bounds[0].as("px");
    var p1 = bounds[1].as("px");
    var p2 = bounds[2].as("px");
    var p3 = bounds[3].as("px");
    var R1 = (p3 - p1) / (p2 - p0);
    var X1 = p0;
    var Y1 = p3;
    var X2 = s0;
    var Y2 = s3;
    selectLayer("Product right");
    app.activeDocument.activeLayer.translate(X2 - X1, Y2 - Y1);
    if (R1 > R2) {
        var resizePercent = ((s3 - s1) / (p3 - p1)) * 100;
        selectLayer("Product right");
        tranform();
    } else {
        var resizePercent = ((s2 - s0) / (p2 - p0)) * 100;
        selectLayer("Product right");
        tranform();
    }
};

function selectST(stencil, value) {
    app.preferences.rulerUnits = Units.PIXELS;
    app.activeDocument.selection.deselect();
    if (stencil == undefined) {
        try {
            activeDocument.activeLayer = vinhstc;
        } catch (e) {

        }
    } else {
        activeDocument.activeLayer = stencil;
    }

    var bounds = app.activeDocument.activeLayer.bounds;
    var X11 = ((bounds[2].as("px") - bounds[0].as("px")) / 2) + bounds[0].as("px") + 5;
    var X111 = bounds[2].as("px") - bounds[0].as("px");
    var Y111 = bounds[3].as("px") - bounds[1].as("px");
    var Y11 = bounds[3].as("px") - ((bounds[3].as("px") - bounds[1].as("px")) * value);
    if (X111 < Y111) {
        var contrat = 0.21 * X111;
    } else {
        contrat = 0.21 * Y111;
    }

    addToSelection(X11 + (X11 / 100), Y11, 50, true, true);
    var SB = app.activeDocument.selection.bounds;
    var x111 = SB[2].value - SB[0].value;
    var y111 = SB[3].value - SB[1].value;
    if ((x111 > (1.1 * X111)) && (y111 > (1.1 * Y111))) {
        app.activeDocument.selection.contract(new UnitValue(contrat, "px"));
        if (hasSelection()) {
            app.activeDocument.selection.expand(new UnitValue(contrat, "px"));
        } else {
            addToSelection(X11 + (X11 / 100), Y11, 111, true, true);
        }
    }
};

function addToSelection(horizontal, vertical, tolerance, AntA, contiguous) {
    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();
    reference.putProperty(stringIDToTypeID("channel"), stringIDToTypeID("selection"));
    descriptor.putReference(charIDToTypeID("null"), reference);
    descriptor2.putUnitDouble(stringIDToTypeID("horizontal"), stringIDToTypeID("pixelsUnit"), horizontal);
    descriptor2.putUnitDouble(stringIDToTypeID("vertical"), stringIDToTypeID("pixelsUnit"), vertical);
    descriptor.putObject(stringIDToTypeID("to"), charIDToTypeID("Pnt "), descriptor2);
    descriptor.putInteger(stringIDToTypeID("tolerance"), tolerance);
    descriptor.putBoolean(charIDToTypeID("AntA"), AntA);
    descriptor.putBoolean(stringIDToTypeID("contiguous"), contiguous);
    executeAction(stringIDToTypeID("addTo"), descriptor, DialogModes.NO);
};

function setSelectionToGuides() {
    if (app.activeDocument.guides.length == 4) {
        var guides = app.activeDocument.guides;
        var horGuides = [];
        var verGuides = [];
        var selectionCoords = [];

        // Tìm guide nằm ngang và nằm dọc
        for (var i = 0; i < guides.length; i++) {
            if (guides[i].direction == Direction.HORIZONTAL) {
                horGuides.push(guides[i].coordinate.value);
            } else {
                verGuides.push(guides[i].coordinate.value);
            }
        }

        // Tạo vùng chọn
        if (horGuides.length == 2 && verGuides.length == 2) {
            var x1 = verGuides[0];
            var y1 = horGuides[0];
            var x2 = verGuides[1];
            var y2 = horGuides[1];
            selectionCoords = [
                [x1, y1],
                [x2, y1],
                [x2, y2],
                [x1, y2]
            ];
            app.activeDocument.selection.select(selectionCoords);
        }
    } else {
        activeDocument.guides.removeAll();
    }

};

function invertvippro() {
    var idIntr = charIDToTypeID("Intr");
    var desc3759 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref504 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idTrsp = charIDToTypeID("Trsp");
    ref504.putEnumerated(idChnl, idChnl, idTrsp);
    desc3759.putReference(idnull, ref504);
    var idWith = charIDToTypeID("With");
    var ref505 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref505.putProperty(idChnl, idfsel);
    desc3759.putReference(idWith, ref505);
    executeAction(idIntr, desc3759, DialogModes.NO);
};

function checkGuidez() {
    try {
        if (hasSelection()) {
            activeDocument.guides.removeAll()
        } else if (app.activeDocument.guides.length == 2) {
            var guides = app.activeDocument.guides;
            var guideCoords = [];
            var guideCount = 0;

            for (var i = 0; i < guides.length; i++) {
                if (guides[i].direction == Direction.HORIZONTAL) {
                    guideCoords.push(guides[i].coordinate.value);
                    guideCount++;
                    if (guideCount == 2) {
                        break;
                    }
                }
            }

            if (guideCount == 2) {
                var x1 = 0;
                var y1 = guideCoords[0];
                var x2 = app.activeDocument.width.as("px");
                var y2 = guideCoords[1];
                var selectionCoords = [
                    [x1, y1],
                    [x1, y2],
                    [x2, y2],
                    [x2, y1]
                ];

                // Lựa chọn vùng chọn
                app.activeDocument.selection.select(selectionCoords);
                return "Vinh"
            }
        } else if (app.activeDocument.guides.length == 4) {
            setSelectionToGuides();
            return "Vờ ing"
        } else {
            activeDocument.guides.removeAll()
        }
    } catch (e) {

    }
};

function checkgui() {

    if (activeDocument.guides.length == 2) {
        return "Vinh"
    } else if (activeDocument.guides.length == 4) {
        return "Vinhz"
    } else if (activeDocument.guides.length == 1) {
        return "High"
    } else {
        return null;
    }
};

function checkStencilLayer(newStencil, groupitem) {
    if (newStencil) {
        if (activeDocument.activeLayer.parent.layers[0].name.search("Stencil") == -1) {
            throw new Error("Perform đi pa");
        }
    } else {
        if (groupitem.artLayers[0].name.search("Stencil") == -1) {
            throw new Error("Perform đi pa")
        }
    }
};

function unclipingall(artLayers) {
    for (var i = activeDocument.activeLayer.layers.length; i > 1; i--) {
        var temp = artLayers[i];
        selectLayer(temp);
        try {
            var idUngr = charIDToTypeID("Ungr");
            var desc1157 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref655 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref655.putEnumerated(idLyr, idOrdn, idTrgt);
            desc1157.putReference(idnull, ref655);
            executeAction(idUngr, desc1157, DialogModes.NO);
        } catch (e) {}
    }
};

function select_layer(layer, add) {
    try {
        var r = new ActionReference();
        if (typeof layer === 'number') {
            r.putIdentifier(stringIDToTypeID("layer"), layer);
        } else if (typeof layer === 'string') {
            r.putName(stringIDToTypeID("layer"), layer);
        } else {
            throw new Error('Invalid layerIdentifier type. Should be either a number (layer ID) or a string (layer name).');
        }
        var d = new ActionDescriptor();
        d.putReference(stringIDToTypeID("null"), r);
        if (add == true) {
            d.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("addToSelection"));
        }
        executeAction(stringIDToTypeID("select"), d, DialogModes.NO);
    } catch (e) {
        alert(e);
        throw e;
    }
};

function collectAllLayers(artLayers, allLayers, theParent, level) {
    for (var m = theParent.layers.length - 1; m >= 0; m--) {
        var theLayer = theParent.layers[m];
        if (theLayer.typename == "ArtLayer") {
            artLayers.push(theLayer.name);
        } else {
            allLayers.push(level + theLayer.name);
            collectAllLayers(artLayers, allLayers, theLayer, level + 1);
        }
    }
};

function Merged() {
    try {
        selectLayer("Product right")
        SelectForward();
        if (activeDocument.activeLayer.name == "Stencil") {
            SelectBackward();
            addLayer("Zing")
        }
    } catch (e) {

    }
    // Select
    function step1() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(charIDToTypeID('Lyr '), "Stencil");
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putBoolean(charIDToTypeID('MkVs'), false);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    };

    // Select
    function step2() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(charIDToTypeID('Lyr '), "Shadow 1");
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("addToSelectionContinuous"));
        desc1.putBoolean(charIDToTypeID('MkVs'), false);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    };

    // Select
    function step3() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(charIDToTypeID('Lyr '), "Shadow 1");
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("removeFromSelection"));
        desc1.putBoolean(charIDToTypeID('MkVs'), false);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    };

    // Select
    function step4() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(charIDToTypeID('Lyr '), "Product left");
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("removeFromSelection"));
        desc1.putBoolean(charIDToTypeID('MkVs'), false);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    };

    // Select
    function step5() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(charIDToTypeID('Lyr '), "Product right");
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("removeFromSelection"));
        desc1.putBoolean(charIDToTypeID('MkVs'), false);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    };

    // Select
    function step6() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(charIDToTypeID('Lyr '), "Stencil");
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("removeFromSelection"));
        desc1.putBoolean(charIDToTypeID('MkVs'), false);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    };

    // 
    function step7() {
        var desc1 = new ActionDescriptor();
        executeAction(stringIDToTypeID('mergeLayersNew'), desc1, DialogModes.NO);
    };

    // Set
    function step8() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        var desc2 = new ActionDescriptor();
        desc2.putString(charIDToTypeID('Nm  '), "Retouch");
        desc1.putObject(charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc2);
        executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
    };

    // Set
    function step9() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
        desc1.putReference(charIDToTypeID('null'), ref1);
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(charIDToTypeID('Top '), charIDToTypeID('#Prc'), 0);
        desc2.putUnitDouble(charIDToTypeID('Left'), charIDToTypeID('#Prc'), 0);
        desc2.putUnitDouble(charIDToTypeID('Btom'), charIDToTypeID('#Prc'), 100);
        desc2.putUnitDouble(charIDToTypeID('Rght'), charIDToTypeID('#Prc'), 50);
        desc1.putObject(charIDToTypeID('T   '), charIDToTypeID('Rctn'), desc2);
        executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
    };

    // Select
    function step10() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(charIDToTypeID('Lyr '), "Product right");
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putBoolean(charIDToTypeID('MkVs'), false);
        var list1 = new ActionList();
        list1.putInteger(46);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    };

    // Delete
    function step11() {
        executeAction(charIDToTypeID('Dlt '), undefined, DialogModes.NO);
    };

    // Inverse
    function step12() {
        executeAction(charIDToTypeID('Invs'), undefined, DialogModes.NO);
    };

    // Select
    function step13() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(charIDToTypeID('Lyr '), "Product left");
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putBoolean(charIDToTypeID('MkVs'), false);
        var list1 = new ActionList();
        list1.putInteger(2);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    };

    // Delete
    function step14() {
        executeAction(charIDToTypeID('Dlt '), undefined, DialogModes.NO);
    };

    // Set
    function step15() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
        desc1.putReference(charIDToTypeID('null'), ref1);
        var ref2 = new ActionReference();
        ref2.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk '));
        desc1.putReference(charIDToTypeID('T   '), ref2);
        executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
    };

    // Add
    function step16() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk '));
        ref1.putName(charIDToTypeID('Lyr '), "Product right");
        desc1.putReference(charIDToTypeID('null'), ref1);
        var ref2 = new ActionReference();
        ref2.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
        desc1.putReference(charIDToTypeID('T   '), ref2);
        executeAction(charIDToTypeID('Add '), desc1, DialogModes.NO);
    };

    // Set
    function step17() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        var desc2 = new ActionDescriptor();
        desc2.putBoolean(charIDToTypeID('UsrM'), false);
        desc1.putObject(charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc2);
        executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
    };

    // Set
    function step18() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(charIDToTypeID('Lyr '), "Product right");
        desc1.putReference(charIDToTypeID('null'), ref1);
        var desc2 = new ActionDescriptor();
        desc2.putBoolean(charIDToTypeID('UsrM'), false);
        desc1.putObject(charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc2);
        executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
    };

    // Select
    function step19() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(charIDToTypeID('Lyr '), "Product right");
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("addToSelectionContinuous"));
        desc1.putBoolean(charIDToTypeID('MkVs'), false);
        var list1 = new ActionList();
        list1.putInteger(2);
        list1.putInteger(35);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    };

    //
    function step20() {
        var desc1 = new ActionDescriptor();
        executeAction(stringIDToTypeID('mergeLayersNew'), desc1, DialogModes.NO);
    };

    // Make
    function step21() {
        var desc1 = new ActionDescriptor();
        desc1.putClass(charIDToTypeID('Nw  '), charIDToTypeID('Chnl'));
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk '));
        desc1.putReference(charIDToTypeID('At  '), ref1);
        desc1.putEnumerated(charIDToTypeID('Usng'), charIDToTypeID('UsrM'), charIDToTypeID('RvlS'));
        executeAction(charIDToTypeID('Mk  '), desc1, DialogModes.NO);
    };

    // Select
    function step22() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), stringIDToTypeID("RGB"));
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putBoolean(charIDToTypeID('MkVs'), false);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    };

    // Set
    function step23() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        var desc2 = new ActionDescriptor();
        desc2.putString(charIDToTypeID('Nm  '), "Product");
        desc1.putObject(charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc2);
        executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
    };

    // Select
    function step24() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(charIDToTypeID('Lyr '), "Retouch");
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putBoolean(charIDToTypeID('MkVs'), false);
        var list1 = new ActionList();
        list1.putInteger(40);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    };

    // Create Clipping Mask
    function step25() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        executeAction(stringIDToTypeID('groupEvent'), desc1, DialogModes.NO);
    };

    step1(); // Select
    step2(); // Select
    step3(); // Select
    step4(); // Select
    step5(); // Select
    step6(); // Select
    step7(); // 
    step8(); // Set
    step9(); // Set
    step10(); // Select
    step11(); // Delete
    step12(); // Inverse
    step13(); // Select
    step14(); // Delete
    step15(); // Set
    step16(); // Add
    step17(); // Set
    step18(); // Set
    step19(); // Select
    step20(); // 
    step21(); // Make
    step22(); // Select
    step23(); // Set
    step24(); // Select
    step25(); // Create Clipping Mask
};

function linkRight(artLayers) {
    for (var i = artLayers.length - 1; i >= 0; i--) {
        var temp = artLayers[i];
        var strValue = temp;
        var regEx = new RegExp(/ right/gim);
        if (temp.match(regEx)) {
            select_layer(temp, true);
        }
    }
};

function linkLeft(artLayers) {
    for (var a = artLayers.length - 1; a >= 0; a--) {
        var temp = artLayers[a];
        var strValue = temp;
        var regEx = new RegExp(/ left/gim);
        if (temp.match(regEx)) {
            select_layer(temp, true);
        }
    }
};

function selectAllLayers() {
    var desc29 = new ActionDescriptor();
    var ref23 = new ActionReference();
    ref23.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    desc29.putReference(charIDToTypeID("null"), ref23);
    executeAction(stringIDToTypeID("selectAllLayers"), desc29, DialogModes.NO);
};

function Guidecenter(artLayers) {
    selectLayer("Item 1");
    for (var i = activeDocument.activeLayer.layers.length; i > 1; i--) {
        var temp = artLayers[i];
        selectLayer(temp);
        var regEx = new RegExp(/Product/gim);
        if (temp.match(regEx)) {
            if (hasSelection()) {
                addselect();
            } else {
                select();
            }
        }
    }
};

function SelectForward() {
    var idslct = charIDToTypeID("slct");
    var desc104 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref32 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idFrwr = charIDToTypeID("Frwr");
    ref32.putEnumerated(idLyr, idOrdn, idFrwr);
    desc104.putReference(idnull, ref32);
    var idMkVs = charIDToTypeID("MkVs");
    desc104.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    executeAction(idslct, desc104, DialogModes.NO);
};

function SelectBackward() {
    var idslct = charIDToTypeID("slct");
    var desc104 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref32 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idFrwr = charIDToTypeID("Bckw");
    ref32.putEnumerated(idLyr, idOrdn, idFrwr);
    desc104.putReference(idnull, ref32);
    var idMkVs = charIDToTypeID("MkVs");
    desc104.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    executeAction(idslct, desc104, DialogModes.NO);
};

function rightleft(artLayers) {
    var SB = app.activeDocument.selection.bounds;
    var s0 = SB[0].value;
    var s1 = SB[1].value;
    var s2 = SB[2].value;
    var s3 = SB[3].value;
    var doi = ((s2 - s0) / 2) + s0;
    app.activeDocument.selection.deselect();
    for (var i = artLayers.length - 1; i >= 0; i--) {
        var temp = artLayers[i];
        selectLayer(temp);
        var ha = app.activeDocument.activeLayer.bounds[2];
        var ha0 = app.activeDocument.activeLayer.bounds[0];
        var strValue = temp;

        if ((((ha >= doi) && (ha0 >= doi)) && (app.activeDocument.activeLayer.allLocked == false)) && (strValue !== "Stencil")) {
            var regEx = new RegExp(/Product/gim);
            if (temp.match(regEx)) {
                re_name("Product right");
            } else {
                re_name(temp + " right " + (i - 1));
            }
        }
        if ((((ha0 <= doi) && (ha <= doi)) && (strValue !== "Stencil")) && (app.activeDocument.activeLayer.allLocked == false)) {
            var regEx = new RegExp(/Product/gim);
            if (temp.match(regEx)) {
                re_name("Product left");
            } else {
                re_name(temp + " left " + (i - 1));
            }
        }
        if ((strValue !== "Stencil") && ((app.activeDocument.activeLayer.visible == false) && (app.activeDocument.activeLayer.allLocked == false))) {
            app.activeDocument.activeLayer.remove();
        }
        if ((((ha0 < doi) && (ha > doi)) && (strValue !== "Stencil")) && (app.activeDocument.activeLayer.allLocked == false) && (strValue !== "White") && (strValue !== "Black")) {
            alert(temp + " đang lớn hơn Product, trả về bước trước", "Stencil Manual");
        }
    }

    var regEx = new RegExp(/copy/gim);
    if (temp.match(regEx)) {
        app.activeDocument.activeLayer.name = app.activeDocument.activeLayer.name.replace(/\ copy/, "");
    }
};

function deselect() {
    try {
        var idselectNoLayers = stringIDToTypeID("selectNoLayers");
        var desc201 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref131 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref131.putEnumerated(idLyr, idOrdn, idTrgt);
        desc201.putReference(idnull, ref131);
        executeAction(idselectNoLayers, desc201, DialogModes.NO);
    } catch (e) {
        alert(e);
        throw e;
    }
};

function linklayer() {
    try {
        var idlinkSelectedLayers = stringIDToTypeID("linkSelectedLayers");
        var desc12 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref5 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref5.putEnumerated(idLyr, idOrdn, idTrgt);
        desc12.putReference(idnull, ref5);
        executeAction(idlinkSelectedLayers, desc12, DialogModes.NO);
    } catch (e) {}
};

function unlinklayer() {
    try {
        var idunlinkSelectedLayers = stringIDToTypeID("unlinkSelectedLayers");
        var desc13 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref6 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref6.putEnumerated(idLyr, idOrdn, idTrgt);
        desc13.putReference(idnull, ref6);
        executeAction(idunlinkSelectedLayers, desc13, DialogModes.NO);
    } catch (e) {}
};

function re_name(name2) {
    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();
    reference.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    descriptor.putReference(charIDToTypeID("null"), reference);
    descriptor2.putString(stringIDToTypeID("name"), name2);
    descriptor.putObject(stringIDToTypeID("to"), stringIDToTypeID("layer"), descriptor2);
    executeAction(stringIDToTypeID("set"), descriptor, DialogModes.NO);
};

function addselect() {
    try {
        var idAdd = charIDToTypeID("Add ");
        var desc327 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref127 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idChnl = charIDToTypeID("Chnl");
        var idMsk = charIDToTypeID("Msk ");
        ref127.putEnumerated(idChnl, idChnl, idMsk);
        desc327.putReference(idnull, ref127);
        var idT = charIDToTypeID("T   ");
        var ref128 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idfsel = charIDToTypeID("fsel");
        ref128.putProperty(idChnl, idfsel);
        desc327.putReference(idT, ref128);
        executeAction(idAdd, desc327, DialogModes.NO);
    } catch (e) {}
};

function select() {
    try {
        var idsetd = charIDToTypeID("setd");
        var desc256 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref80 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idfsel = charIDToTypeID("fsel");
        ref80.putProperty(idChnl, idfsel);
        desc256.putReference(idnull, ref80);
        var idT = charIDToTypeID("T   ");
        var ref81 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idChnl = charIDToTypeID("Chnl");
        var idMsk = charIDToTypeID("Msk ");
        ref81.putEnumerated(idChnl, idChnl, idMsk);
        desc256.putReference(idT, ref81);
        executeAction(idsetd, desc256, DialogModes.NO);
    } catch (e) {}
};

function Link(colorg, itemg, bgg, shadowg, product) {
    try {
        if (!colorg.allLocked) {
            for (var i = 0; i < colorg.artLayers.length; i++) {
                var currentLayer = colorg.artLayers[i];
                if (currentLayer.linkedLayers.length < 1) {
                    currentLayer.link(product);
                }
            };
        };
    } catch (e) {

    };
    try {
        if (!itemg.allLocked) {
            for (var i = 0; i < itemg.artLayers.length; i++) {
                var currentLayeri = itemg.artLayers[i];
                if (currentLayeri.name != product.name && currentLayeri.name != "Stencil")
                    if (currentLayeri.linkedLayers.length < 1) {
                        currentLayeri.link(product);
                    }
            };
        };
    } catch (e) {

    };

    try {
        if (!bgg.allLocked) {
            for (var i = 0; i < bgg.artLayers.length; i++) {
                var currentLayeri = bgg.artLayers[i];
                if (currentLayeri.linkedLayers.length < 1) {
                    currentLayeri.link(product);
                }
            };
        };
    } catch (e) {

    };
    try {
        if (!shadowg.allLocked) {
            for (var i = 0; i < shadowg.artLayers.length; i++) {
                var currentLayeri = shadowg.artLayers[i];
                if (currentLayeri.linkedLayers.length < 1) {
                    currentLayeri.link(product);
                }
            };
        };
    } catch (e) {

    };
};

function FlipToProduct() {
    try {
        var group = activeDocument.layerSets["Variant 1"].layerSets["Item 1"];
        for (var i = 0; i < group.artLayers.length; i++) {
            var layer = group.artLayers[i];
            if (layer.name === "Flip") {
                layer.name = "Product copy"
                break;
            }
        };
    } catch (e) {

    }
};

function HightPro(Product, stencil, value, nomask, transLR) {
    function tranform() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), stringIDToTypeID("QCSIndependent"));
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), X2);
        desc2.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), Y2);
        desc1.putObject(charIDToTypeID('Pstn'), charIDToTypeID('Pnt '), desc2);
        var desc3 = new ActionDescriptor();
        desc3.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
        desc3.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
        desc1.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc3);
        desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putBoolean(charIDToTypeID('Lnkd'), true);
        desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Bcbc'));
        executeAction(charIDToTypeID('Trnf'), desc1, DialogModes.NO);
    }
    if (app.activeDocument.guides.length == 1) {
        var allGuide = app.activeDocument.guides;
        var guideBound = [-1, -1, -1, -1];
        for (var i = 0; i <= allGuide.length - 1; i += 1) {
            if (allGuide[i].direction.toString().indexOf("HORIZONTAL") != -1) {
                if (guideBound[1] == -1) {
                    guideBound[1] = allGuide[i].coordinate.value;
                }
                if (allGuide[i].coordinate.value < guideBound[1]) {
                    guideBound[1] = allGuide[i].coordinate.value;
                }
                if (guideBound[3] == -1) {
                    guideBound[3] = allGuide[i].coordinate.value;
                }
                if (allGuide[i].coordinate.value > guideBound[3]) {
                    guideBound[3] = allGuide[i].coordinate.value;
                }
            }
            if (allGuide[i].direction.toString().indexOf("VERTICAL") != -1) {
                if (guideBound[0] == -1) {
                    guideBound[0] = allGuide[i].coordinate.value;
                }
                if (allGuide[i].coordinate.value < guideBound[0]) {
                    guideBound[0] = allGuide[3].coordinate.value;
                }
                if (guideBound[2] == -1) {
                    guideBound[2] = allGuide[i].coordinate.value;
                }
                if (allGuide[i].coordinate.value > guideBound[2]) {
                    guideBound[2] = allGuide[i].coordinate.value;
                }
            }
        }
        var ngang = guideBound[2];
        var doc = guideBound[1];
        var p = doc;
        if (p < 0) {
            p = ngang;
        }
    }
    selectST(stencil, value);
    if (nomask) {
        activeDocument.selection.deselect();
        activeDocument.activeLayer = stencil;
        var currentLayer = app.activeDocument.activeLayer;
        var bounds = currentLayer.bounds;
        var left = bounds[0].value;
        var top = bounds[1].value;
        var right = bounds[2].value;
        var bottom = bounds[3].value;
        var selectionBounds = [
            [left, top],
            [right, top],
            [right, bottom],
            [left, bottom]
        ];
        app.activeDocument.selection.select(selectionBounds);
        activeDocument.selection.expand(new UnitValue(1.5, "px"));
    };
    var SB = app.activeDocument.selection.bounds;
    var s0 = SB[0].value;
    var s1 = SB[1].value;
    var s2 = SB[2].value;
    var s3 = SB[3].value;
    var R2 = (s3 - s1) / (s2 - s0);
    app.activeDocument.selection.deselect();
    activeDocument.activeLayer = Product;
    var bounds = app.activeDocument.activeLayer.bounds;
    var p0 = bounds[0].as("px");
    var p1 = bounds[1].as("px");
    var p2 = bounds[2].as("px");
    var p3 = bounds[3].as("px");
    if (p1 < p) {
        var y = p - p1;
        p1 = p;
    }
    var R1 = (p3 - p1) / (p2 - p0);
    var bounds = app.activeDocument.activeLayer.bounds;
    var X1 = ((p2 - p0) / 2) + p0;
    var Y1 = p1;
    activeDocument.activeLayer = stencil;
    var bounds = app.activeDocument.activeLayer.bounds;
    var X2 = ((s2 - s0) / 2) + s0;
    var Y2 = s1;
    activeDocument.activeLayer = Product;
    if (transLR) {
        var X1 = ((p2 - p0) / 2) + p0;
        var Y1 = ((p3 - p1) / 2) + p1;
        var X2 = ((s2 - s0) / 2) + s0;
        var Y2 = ((s3 - s1) / 2) + s1;
        app.activeDocument.activeLayer.translate(X2 - X1, Y2 - Y1);
        var resizePercent = ((s2 - s0) / (p2 - p0)) * 100;
        activeDocument.activeLayer = Product;
        tranform();
        return
    };
    app.activeDocument.activeLayer.translate(X2 - X1, Y2 - Y1);
    var resizePercent = ((s3 - s1) / (p3 - p1)) * 100;
    activeDocument.activeLayer = Product;
    tranform();
};

function Subject(bl) {
    var desc = new ActionDescriptor();
    desc.putBoolean(stringIDToTypeID("sampleAllLayers"), bl);
    executeAction(stringIDToTypeID("autoCutout"), desc, DialogModes.NO);
};

function saveSelection(name) {
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    desc2.putString(charIDToTypeID('Nm  '), name);
    desc2.putEnumerated(charIDToTypeID('ClrI'), charIDToTypeID('MskI'), charIDToTypeID('MskA'));
    var desc3 = new ActionDescriptor();
    desc3.putUnitDouble(charIDToTypeID('H   '), charIDToTypeID('#Ang'), 248.466796875);
    desc3.putDouble(charIDToTypeID('Strt'), 100);
    desc3.putDouble(charIDToTypeID('Brgh'), 100);
    desc2.putObject(charIDToTypeID('Clr '), charIDToTypeID('HSBC'), desc3);
    desc2.putInteger(charIDToTypeID('Opct'), 50);
    desc1.putObject(charIDToTypeID('Nw  '), charIDToTypeID('Chnl'), desc2);
    var ref1 = new ActionReference();
    ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
    desc1.putReference(charIDToTypeID('Usng'), ref1);
    executeAction(charIDToTypeID('Mk  '), desc1, DialogModes.NO);
};

function checkSwatch(group) {
    var bounds1 = group.artLayers.getByName("Stencil").bounds;
    var left1 = bounds1[0].as("px");
    var top1 = bounds1[1].as("px");
    var right1 = bounds1[2].as("px");
    var bottom1 = bounds1[3].as("px");
    var width1 = right1 - left1;
    var height1 = bottom1 - top1;
    if (width1 > 200 && height1 > 200) {
        return false;
    } else {
        return true;
    }
};
//==============================================LAYER==================================================================================================================\\
function addLayer(Name) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(charIDToTypeID('Lyr '));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putString(charIDToTypeID('Nm  '), Name);
    desc1.putObject(charIDToTypeID('Usng'), charIDToTypeID('Lyr '), desc2);
    executeAction(charIDToTypeID('Mk  '), desc1, DialogModes.NO);
};

function SelectForward() {
    var idslct = charIDToTypeID("slct");
    var desc104 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref32 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idFrwr = charIDToTypeID("Frwr");
    ref32.putEnumerated(idLyr, idOrdn, idFrwr);
    desc104.putReference(idnull, ref32);
    var idMkVs = charIDToTypeID("MkVs");
    desc104.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    executeAction(idslct, desc104, DialogModes.NO);
};

function SelectBackward() {
    var idslct = charIDToTypeID("slct");
    var desc104 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref32 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idFrwr = charIDToTypeID("Bckw");
    ref32.putEnumerated(idLyr, idOrdn, idFrwr);
    desc104.putReference(idnull, ref32);
    var idMkVs = charIDToTypeID("MkVs");
    desc104.putBoolean(idMkVs, false);
    var idLyrI = charIDToTypeID("LyrI");
    executeAction(idslct, desc104, DialogModes.NO);
};

function Paste() {
    var desc1 = new ActionDescriptor();
    desc1.putBoolean(stringIDToTypeID("inPlace"), true);
    desc1.putEnumerated(charIDToTypeID('AntA'), charIDToTypeID('Annt'), charIDToTypeID('Anno'));
    desc1.putClass(charIDToTypeID('As  '), charIDToTypeID('Pxel'));
    executeAction(charIDToTypeID('past'), desc1, DialogModes.NO);
};

function hideST(Vari, Group, name) {
    try {
        Vari.visible = true;
        for (var imd = 0; imd < Group.artLayers.length; imd++) {
            var layerss = Group.artLayers[imd];
            if (layerss.name.indexOf(name) != -1) {
                layerss.visible = false;
                break;
            }
        };
    } catch (e) {
        //
    };
};

function exectAction(act) {
    executeAction(charIDToTypeID(act), undefined, DialogModes.NO);
};

function Merge(vv) {
    var desc1 = new ActionDescriptor();
    if (vv) {
        desc1.putBoolean(charIDToTypeID('Dplc'), true);
    }
    executeAction(stringIDToTypeID('mergeLayersNew'), desc1, DialogModes.NO);
};

function BackHistory(index) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putOffset(charIDToTypeID('HstS'), index);
    desc1.putReference(charIDToTypeID('null'), ref1);
    executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);

};

function nonSaws() {
    var layer = activeDocument.artLayers
    if (activeDocument.layers.length > 0) {
        for (var i = 0; i < layer.length; i++) {
            if (layer[i].name != "Stencil" && !layer[i].allLocked && layer[i].visible) {
                selectLayer(layer[i].id)
                break;
            }
        }
    }
};

function fitOnView() {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Mn  '), charIDToTypeID('MnIt'), charIDToTypeID('FtOn'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
};

function mergeVisible() {
    var desc1 = new ActionDescriptor();
    desc1.putBoolean(charIDToTypeID('Dplc'), true);
    executeAction(stringIDToTypeID('mergeVisible'), desc1, DialogModes.NO);
    activeDocument.activeLayer.name = "Vinh";
};
//==============================================FUNCTION DUST & APPLY==================================================================================================================\\
function dust(rds, ths, saw, group, layer, hightts) {
    if (saw) {
        var desc1 = new ActionDescriptor();
        desc1.putInteger(charIDToTypeID('Rds '), rds);
        desc1.putInteger(charIDToTypeID('Thsh'), ths);
        executeAction(stringIDToTypeID('dustAndScratches'), desc1, DialogModes.ALL);
        return;
    };
    if (hightts) {
        var desc = new ActionDescriptor();
        desc.putInteger(charIDToTypeID('Rds '), 13);
        desc.putInteger(charIDToTypeID('Thsh'), 8);
        executeAction(stringIDToTypeID('dustAndScratches'), desc, DialogModes.NO);
        return;
    }
    const totalLayer = activeDocument.activeLayer.parent.artLayers.length - 1
    var chieurong = activeDocument.width.value;
    var chieucao = activeDocument.height.value;
    var idw = 4;
    var idh = 20;
    if ((chieucao || chieurong) < 2000) {
        idw = 2;
    } else if ((chieucao || chieurong) > 6000) {
        idw = 6;
        idh = 20;
    } else if ((chieucao || chieurong) > 2000 && (chieucao || chieurong) < 2500) {
        idw = 3;
        idh = 20;
    };
    if (activeDocument.activeLayer.parent.artLayers[totalLayer].name.search("Product") == 0 && activeDocument.activeLayer.parent.artLayers[totalLayer].allLocked) {
        idw = 6;
        idh = 10;
    } else if (activeDocument.activeLayer.parent.name.search("Item") == 0 && !group.allLocked) {
        if (isEmpty(layer)) {
            idw = 13;
            idh = 8;
        } else {
            idw = 4;
            idh = 22;
        };
    };

    try {
        if (activeDocument.activeLayer.parent.name.search("Shadow") == 0) {
            idw = 15;
            idh = 5;
        } else if (activeDocument.activeLayer.parent.name.search("Background") == 0) {
            idw = 6;
            idh = 11
        };
    } catch (e) {};
    var desc1 = new ActionDescriptor();
    desc1.putInteger(charIDToTypeID('Rds '), idw);
    desc1.putInteger(charIDToTypeID('Thsh'), idh);
    executeAction(stringIDToTypeID('dustAndScratches'), desc1, DialogModes.ALL);

};

function checkLockLayer(layerz) {
    try {
        if (layerz.artLayers.length > 1) {
            for (var i = 0; i < layerz.artLayers.length; i++) {
                var layer = layerz.artLayers[i];
                if ((!layer.allLocked) && (layer.visible) && (layer.name != "Stencil")) {
                    activeDocument.activeLayer = layer;
                    break;
                }
            }
        }
    } catch (e) {

    }
}

function ApplyImage(layerindex) {
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), stringIDToTypeID("RGB"));
    ref1.putName(charIDToTypeID('Lyr '), layerindex);
    desc2.putReference(charIDToTypeID('T   '), ref1);
    desc2.putEnumerated(charIDToTypeID('Clcl'), charIDToTypeID('Clcn'), charIDToTypeID('Sbtr'));
    desc2.putDouble(charIDToTypeID('Scl '), 2);
    desc2.putInteger(charIDToTypeID('Ofst'), 128);
    desc1.putObject(charIDToTypeID('With'), charIDToTypeID('Clcl'), desc2);
    executeAction(stringIDToTypeID('applyImageEvent'), desc1, DialogModes.NO);
};

function blur(index) {
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(charIDToTypeID('Rds '), charIDToTypeID('#Pxl'), index);
    executeAction(charIDToTypeID('Mdn '), desc1, DialogModes.ALL);
};

function setSourceHistory() {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(charIDToTypeID('HstS'), charIDToTypeID('HstB'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putProperty(charIDToTypeID('HstS'), charIDToTypeID('CrnH'));
    desc1.putReference(charIDToTypeID('T   '), ref2);
    executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
};
//==============================================FUNCTION - WIETHE==================================================================================================================\\
function BringTo(backfont) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID(backfont));
    desc1.putReference(charIDToTypeID('T   '), ref2);
    executeAction(charIDToTypeID('move'), desc1, DialogModes.NO);
};

function TransformSelection() {
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
        desc1.putReference(charIDToTypeID('null'), ref1);
        executeAction(charIDToTypeID('Trnf'), desc1, DialogModes.ALL);
    } catch (e) {

    }
};

function transFormLayers(layerDes, layerOrg) {
    try {
        app.preferences.rulerUnits = Units.PIXELS;
        var doc = app.activeDocument;
        var boundsDes = layerDes.bounds;
        var widthDes = boundsDes[2] - boundsDes[0];
        var heightDes = boundsDes[3] - boundsDes[1];
        var boundsOrg = layerOrg.bounds;
        var widthOrgAfter = (widthDes / (boundsOrg[2] - boundsOrg[0])) * 100;
        var heightOrgAfter = (heightDes / (boundsOrg[3] - boundsOrg[1])) * 100;
        layerOrg.resize(widthOrgAfter, heightOrgAfter);
        var moveX = boundsDes[0] - layerOrg.bounds[0];
        var moveY = boundsDes[1] - layerOrg.bounds[1];
        layerOrg.translate(moveX, moveY);
    } catch (e) {};
};

function frTransform() {
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Mn  '), charIDToTypeID('MnIt'), charIDToTypeID('FrTr'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.ALL);
    } catch (e) {};
};

function Swatch() {
    var Width = activeDocument.width;
    var Height = activeDocument.height;
    var ToadoX = Math.floor((Width - 26) / 2);
    var ToadoY = Math.floor((Height - 26) / 2);
    activeDocument.selection.select([
        [ToadoX, ToadoY],
        [ToadoX + 26, ToadoY],
        [ToadoX + 26, ToadoY + 26],
        [ToadoX, ToadoY + 26]
    ]);
    TransformSelection();
    executeAction(stringIDToTypeID('copyToLayer'), undefined, DialogModes.NO);
    activeDocument.activeLayer.name = "Swatch";
}

function Removelayer(theParent, layerName) {
    for (var i = theParent.layers.length - 1; i >= 0; i--) {
        var theLayer = theParent.layers[i];
        if (theLayer.typename == "ArtLayer" && theLayer.name.search(layerName) == 0) {
            try {
                selectLayer(theLayer.id)
                Delete();
                break;
            } catch (e) {
                //
            }
        } else if (theLayer.typename == "LayerSet") {
            Removelayer(theLayer, layerName);
        }
    }
};

function Delete() {
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        executeAction(charIDToTypeID('Dlt '), desc1, DialogModes.NO);
    } catch (e) {}
};

function SEMI(vl) {
    app.activeDocument.activeLayer.name = "SEMI";
    var h1 = app.activeDocument.height.value;
    var h2 = app.activeDocument.height.value - vl.value;
    var tile = h1 / h2;
    var idTrnf = charIDToTypeID("Trnf");
    var desc240 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref111 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref111.putEnumerated(idLyr, idOrdn, idTrgt);
    desc240.putReference(idnull, ref111);
    var idFTcs = charIDToTypeID("FTcs");
    var idQCSt = charIDToTypeID("QCSt");
    var idQcsa = charIDToTypeID("Qcsa");
    desc240.putEnumerated(idFTcs, idQCSt, idQcsa);
    var idOfst = charIDToTypeID("Ofst");
    var desc241 = new ActionDescriptor();
    var idHrzn = charIDToTypeID("Hrzn");
    var idPxl = charIDToTypeID("#Pxl");
    desc241.putUnitDouble(idHrzn, idPxl, 0);
    var idVrtc = charIDToTypeID("Vrtc");
    var idPxl = charIDToTypeID("#Pxl");
    desc241.putUnitDouble(idVrtc, idPxl, -((h1 - h2) * tile) / 2);
    var idOfst = charIDToTypeID("Ofst");
    desc240.putObject(idOfst, idOfst, desc241);
    var idWdth = charIDToTypeID("Wdth");
    var idPrc = charIDToTypeID("#Prc");
    desc240.putUnitDouble(idWdth, idPrc, tile * 100);
    var idHght = charIDToTypeID("Hght");
    var idPrc = charIDToTypeID("#Prc");
    desc240.putUnitDouble(idHght, idPrc, tile * 100);
    var idIntr = charIDToTypeID("Intr");
    var idIntp = charIDToTypeID("Intp");
    var idbicubicAutomatic = stringIDToTypeID("bicubicAutomatic");
    desc240.putEnumerated(idIntr, idIntp, idbicubicAutomatic);
    executeAction(idTrnf, desc240, DialogModes.NO);
}
//=================================================================STENCIL FUNCTION=======================================================================================\\
function ProductTransform(product, stencil, value) {
    function tranform() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), stringIDToTypeID("QCSIndependent"));
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), X2);
        desc2.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), Y2);
        desc1.putObject(charIDToTypeID('Pstn'), charIDToTypeID('Pnt '), desc2);
        var desc3 = new ActionDescriptor();
        desc3.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
        desc3.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
        desc1.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc3);
        desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putBoolean(charIDToTypeID('Lnkd'), true);
        desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Bcbc'));
        executeAction(charIDToTypeID('Trnf'), desc1, DialogModes.NO);
    };
    activeDocument.activeLayer = product;
    if (hasVectorMask() && userVectorEnabled(product.id)) {
        BooleanVectorMask(false, product.id)
        var vector = true;
    }
    if ((hasSelection()) && (!hasLayerMask())) {
        addLayerMask();
        var mask = true;
    }
    var bounds = app.activeDocument.activeLayer.bounds;
    var p0 = bounds[0].as("px");
    var p1 = bounds[1].as("px");
    var p2 = bounds[2].as("px");
    var p3 = bounds[3].as("px");
    var R1 = (p3 - p1) / (p2 - p0);
    var X1 = ((p2 - p0) / 2) + p0;
    var Y1 = p1;
    var P = p3 - p1;
    var P2 = p2 - p0;
    tatmask();
    var bounds = app.activeDocument.activeLayer.bounds;
    var c0 = bounds[0].as("px");
    var c1 = bounds[1].as("px");
    var c2 = bounds[2].as("px");
    var c3 = bounds[3].as("px");
    batmask();
    if (mask) {
        DeleteLayerMask();
    }
    activeDocument.activeLayer = stencil;
    var bounds = app.activeDocument.activeLayer.bounds;
    var st0 = bounds[0].as("px");
    var st1 = bounds[1].as("px");
    var st2 = bounds[2].as("px");
    var st3 = bounds[3].as("px");
    selectST(stencil, value);
    // activeDocument.selection.expand(UnitValue(1, "px"));
    var SB = app.activeDocument.selection.bounds;
    var s0 = SB[0].value;
    var s1 = SB[1].value;
    var s2 = SB[2].value;
    var s3 = SB[3].value;
    var R2 = (s3 - s1) / (s2 - s0);
    var X2 = ((s2 - s0) / 2) + s0;
    var Y2 = s1;
    var S = s3 - s1;
    var S2 = s2 - s0;
    var x = (((s2 - s0) / 3) + s0) - 10;
    if (s1 == st1) {
        var y = s1;
    } else {
        var y = s1 - 1;
    }
    var pointTop = app.activeDocument.colorSamplers.add([x, y]);
    var rgbT = [pointTop.color.rgb.red, pointTop.color.rgb.green, pointTop.color.rgb.blue];
    var x1 = (((s2 - s0) / 3) + s0) - 10;
    if (s3 == st3) {
        var y1 = s3 - 1;
    } else {
        y1 = s3 + 1;
    }
    var pointBot = app.activeDocument.colorSamplers.add([x1, y1]);
    var rgbB = [pointBot.color.rgb.red, pointBot.color.rgb.green, pointBot.color.rgb.blue];
    pointBot.remove();
    pointTop.remove();
    var topp = rgbT[2];
    var bott = rgbB[2];
    if ((c3 == p3) || (c1 == p1)) {
        if (c1 == p1) {
            var R2 = (s3 - st1) / (s2 - s0);
            var Y2 = st1 - 1;
            var S = s3 - st1;
            var S2 = s2 - s0;
        }
        if (c3 == p3) {
            var Y1 = p3;
            var R2 = (st3 - s1) / (s2 - s0);
            if (c1 != p1) {
                var Y2 = st3 + 1;
            } else {
                var Y2 = st3;
            }
            var S = st3 - s1;
            var S2 = s2 - s0;
        }
    } else {
        app.activeDocument.selection.deselect();
        if ((((s1 == st1) && (s3 == st3)) || ((topp < 150) && (bott < 150))) || ((topp >= 185) && (bott >= 185))) {
            var Y1 = ((p3 - p1) / 2) + p1;
            var Y2 = ((s3 - s1) / 2) + s1;
        }
        if ((topp <= 184) && (bott >= 185)) {
            var Y1 = p3;
            var Y2 = s3;
        }
    }
    app.activeDocument.selection.deselect();
    activeDocument.activeLayer = product;
    app.activeDocument.activeLayer.translate(X2 - X1, Y2 - Y1);
    if (R1 > R2) {
        var resizePercent = (S / P) * 100;
        tranform();
    } else {
        var resizePercent = (S2 / P2) * 100;
        tranform();
    }
    if (vector) {
        BooleanVectorMask(true, product.id);

    }
}

function StencilTransform(product, stencil, value) {
    function tranform() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), stringIDToTypeID("QCSIndependent"));
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), X1);
        desc2.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), Y1);
        desc1.putObject(charIDToTypeID('Pstn'), charIDToTypeID('Pnt '), desc2);
        var desc3 = new ActionDescriptor();
        desc3.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
        desc3.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
        desc1.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc3);
        desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putBoolean(charIDToTypeID('Lnkd'), true);
        desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Bcbc'));
        executeAction(charIDToTypeID('Trnf'), desc1, DialogModes.NO);
    };
    activeDocument.activeLayer = product;
    if (hasVectorMask() && userVectorEnabled(product.id)) {
        BooleanVectorMask(false, product.id)
        var vector = true;
    }
    if ((hasSelection()) && (!hasLayerMask())) {
        addLayerMask();
        var mask = true;
    }
    var bounds = app.activeDocument.activeLayer.bounds;
    var p0 = bounds[0].as("px");
    var p1 = bounds[1].as("px");
    var p2 = bounds[2].as("px");
    var p3 = bounds[3].as("px");
    var R1 = (p3 - p1) / (p2 - p0);
    var X1 = ((p2 - p0) / 2) + p0;
    var Y1 = p1;
    var P = p3 - p1;
    var P2 = p2 - p0;
    tatmask();
    var bounds = app.activeDocument.activeLayer.bounds;
    var c0 = bounds[0].as("px");
    var c1 = bounds[1].as("px");
    var c2 = bounds[2].as("px");
    var c3 = bounds[3].as("px");
    batmask();
    if (mask) {
        DeleteLayerMask();
    }
    activeDocument.activeLayer = stencil;
    var bounds = app.activeDocument.activeLayer.bounds;
    var st0 = bounds[0].as("px");
    var st1 = bounds[1].as("px");
    var st2 = bounds[2].as("px");
    var st3 = bounds[3].as("px");
    selectST(stencil, value);
    var SB = app.activeDocument.selection.bounds;
    var s0 = SB[0].value;
    var s1 = SB[1].value;
    var s2 = SB[2].value;
    var s3 = SB[3].value;
    var R2 = (s3 - s1) / (s2 - s0);
    var X2 = ((s2 - s0) / 2) + s0;
    var Y2 = s1;
    var S = s3 - s1;
    var S2 = s2 - s0;
    var x = (((s2 - s0) / 3) + s0) - 10;
    if (s1 == st1) {
        var y = s1;
    } else {
        var y = s1 - 1;
    }
    var pointTop = app.activeDocument.colorSamplers.add([x, y]);
    var rgbT = [pointTop.color.rgb.red, pointTop.color.rgb.green, pointTop.color.rgb.blue];
    var x1 = (((s2 - s0) / 3) + s0) - 10;
    if (s3 == st3) {
        var y1 = s3 - 1;
    } else {
        y1 = s3 + 1;
    }
    var pointBot = app.activeDocument.colorSamplers.add([x1, y1]);
    var rgbB = [pointBot.color.rgb.red, pointBot.color.rgb.green, pointBot.color.rgb.blue];
    pointBot.remove();
    pointTop.remove();
    var topp = rgbT[2];
    var bott = rgbB[2];
    if ((c3 == p3) || (c1 == p1)) {
        if (c1 == p1) {
            var R2 = (s3 - st1) / (s2 - s0);
            var Y2 = st1 - 1;
            var S = s3 - st1;
            var S2 = s2 - s0;
        }
        if (c3 == p3) {
            var Y1 = p3;
            var R2 = (st3 - s1) / (s2 - s0);
            if (c1 != p1) {
                var Y2 = st3 + 1;
            } else {
                var Y2 = st3;
            }
            var S = st3 - s1;
            var S2 = s2 - s0;
        }
    } else {
        app.activeDocument.selection.deselect();
        if ((((s1 == st1) && (s3 == st3)) || ((topp < 150) && (bott < 150))) || ((topp >= 185) && (bott >= 185))) {
            var Y1 = ((p3 - p1) / 2) + p1;
            var Y2 = ((s3 - s1) / 2) + s1;
        }
        if ((topp <= 184) && (bott >= 185)) {
            var Y1 = p3;
            var Y2 = s3;
        }
    }
    app.activeDocument.selection.deselect();
    app.activeDocument.activeLayer.translate(X1 - X2, Y1 - Y2);
    if (R1 > R2) {
        var resizePercent = (P / S) * 100;
        tranform();
    } else {
        var resizePercent = (P2 / S2) * 100;
        tranform();
    }
    if (vector) {
        BooleanVectorMask(true, product.id);
    }
};

function TopTransform() {
    function tranform() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), stringIDToTypeID("QCSIndependent"));
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), X2);
        desc2.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), Y2);
        desc1.putObject(charIDToTypeID('Pstn'), charIDToTypeID('Pnt '), desc2);
        var desc3 = new ActionDescriptor();
        desc3.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
        desc3.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
        desc1.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc3);
        desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putBoolean(charIDToTypeID('Lnkd'), true);
        desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Bcbc'));
        executeAction(charIDToTypeID('Trnf'), desc1, DialogModes.NO);
    };
    activeDocument.activeLayer = vinh
    app.preferences.rulerUnits = Units.PIXELS;
    if (hasSelection()) {
        addLayerMask();
        var mask = true;
    } else {
        var mask = false;
    }
    var bounds = app.activeDocument.activeLayer.bounds;
    var p0 = bounds[0].as("px");
    var p1 = bounds[1].as("px");
    var p2 = bounds[2].as("px");
    var p3 = bounds[3].as("px");
    var R1 = (p3 - p1) / (p2 - p0);
    selectST(stencil, value);
    var SB = app.activeDocument.selection.bounds;
    var s0 = SB[0].value;
    var s1 = SB[1].value;
    var s2 = SB[2].value;
    var s3 = SB[3].value;
    var R2 = (s3 - s1) / (s2 - s0);
    app.activeDocument.selection.deselect();
    var X1 = ((p2 - p0) / 2) + p0;
    var Y1 = p1;
    activeDocument.activeLayer = vinhstc
    var X2 = ((s2 - s0) / 2) + s0;
    var Y2 = s1;
    activeDocument.activeLayer = vinh
    app.activeDocument.activeLayer.translate(X2 - X1, Y2 - Y1);
    if (R1 > R2) {
        var resizePercent = ((s3 - s1) / (p3 - p1)) * 100;
        activeDocument.activeLayer = vinh
        tranform();
    } else {
        var resizePercent = ((s2 - s0) / (p2 - p0)) * 100;
        activeDocument.activeLayer = vinh
        tranform();
    }
    if (mask) {
        DeleteLayerMask();
    }
};

function BotTransform(product, stencil, value) {
    function tranform() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), stringIDToTypeID("QCSIndependent"));
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), X2);
        desc2.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), Y2);
        desc1.putObject(charIDToTypeID('Pstn'), charIDToTypeID('Pnt '), desc2);
        var desc3 = new ActionDescriptor();
        desc3.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
        desc3.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
        desc1.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc3);
        desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putBoolean(charIDToTypeID('Lnkd'), true);
        desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Bcbc'));
        executeAction(charIDToTypeID('Trnf'), desc1, DialogModes.NO);
    }
    activeDocument.activeLayer = product;
    app.preferences.rulerUnits = Units.PIXELS;
    if (hasSelection()) {
        addLayerMask();
        var mask = true;
    } else {
        var mask = false;
    }
    var bounds = app.activeDocument.activeLayer.bounds;
    var p0 = bounds[0].as("px");
    var p1 = bounds[1].as("px");
    var p2 = bounds[2].as("px");
    var p3 = bounds[3].as("px");
    var R1 = (p3 - p1) / (p2 - p0);
    selectST(stencil, value);
    var SB = app.activeDocument.selection.bounds;
    var s0 = SB[0].value;
    var s1 = SB[1].value;
    var s2 = SB[2].value;
    var s3 = SB[3].value;
    var R2 = (s3 - s1) / (s2 - s0);
    app.activeDocument.selection.deselect();
    var X1 = ((p2 - p0) / 2) + p0;
    var Y1 = p3;
    activeDocument.activeLayer = stencil;
    var X2 = ((s2 - s0) / 2) + s0;
    var Y2 = s3;
    activeDocument.activeLayer = product;
    app.activeDocument.activeLayer.translate(X2 - X1, Y2 - Y1);
    if (R1 > R2) {
        var resizePercent = ((s3 - s1) / (p3 - p1)) * 100;
        activeDocument.activeLayer = product;
        tranform();
    } else {
        var resizePercent = ((s2 - s0) / (p2 - p0)) * 100;
        activeDocument.activeLayer = product;
        tranform();
    }
    if (mask == true) {
        DeleteLayerMask();
    }
}

function NewStencilManulX(value) {
    function tranform() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), stringIDToTypeID("QCSIndependent"));
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), X2);
        desc2.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), Y2);
        desc1.putObject(charIDToTypeID('Pstn'), charIDToTypeID('Pnt '), desc2);
        var desc3 = new ActionDescriptor();
        desc3.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
        desc3.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
        desc1.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc3);
        desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putBoolean(charIDToTypeID('Lnkd'), true);
        desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Bcbc'));
        executeAction(charIDToTypeID('Trnf'), desc1, DialogModes.NO);
    };
    activeDocument.activeLayer = activeDocument.layers["Variant #1"];
    if ((hasSelection()) && (!hasLayerMask())) {
        addLayerMask();
        var mask = true;
    }
    var bounds = app.activeDocument.activeLayer.bounds;
    var p0 = bounds[0].as("px");
    var p1 = bounds[1].as("px");
    var p2 = bounds[2].as("px");
    var p3 = bounds[3].as("px");
    var R1 = (p3 - p1) / (p2 - p0);
    var X1 = ((p2 - p0) / 2) + p0;
    var Y1 = p1;
    var P = p3 - p1;
    var P2 = p2 - p0;
    tatmask();
    var bounds = app.activeDocument.activeLayer.bounds;
    var c0 = bounds[0].as("px");
    var c1 = bounds[1].as("px");
    var c2 = bounds[2].as("px");
    var c3 = bounds[3].as("px");
    batmask();
    if (mask) {
        DeleteLayerMask();
    }
    try {
        activeDocument.activeLayer = activeDocument.layers["Stencil #1"];
    } catch (e) {
        activeDocument.activeLayer = activeDocument.layers["Stencil"];
    }
    var bounds = app.activeDocument.activeLayer.bounds;
    var st0 = bounds[0].as("px");
    var st1 = bounds[1].as("px");
    var st2 = bounds[2].as("px");
    var st3 = bounds[3].as("px");
    selectST(undefined, value);
    var SB = app.activeDocument.selection.bounds;
    var s0 = SB[0].value;
    var s1 = SB[1].value;
    var s2 = SB[2].value;
    var s3 = SB[3].value;
    var R2 = (s3 - s1) / (s2 - s0);
    var X2 = ((s2 - s0) / 2) + s0;
    var Y2 = s1;
    var S = s3 - s1;
    var S2 = s2 - s0;
    var x = (((s2 - s0) / 3) + s0) - 10;
    if (s1 == st1) {
        var y = s1;
    } else {
        var y = s1 - 1;
    }
    var pointTop = app.activeDocument.colorSamplers.add([x, y]);
    var rgbT = [pointTop.color.rgb.red, pointTop.color.rgb.green, pointTop.color.rgb.blue];
    var x1 = (((s2 - s0) / 3) + s0) - 10;
    if (s3 == st3) {
        var y1 = s3 - 1;
    } else {
        y1 = s3 + 1;
    }
    var pointBot = app.activeDocument.colorSamplers.add([x1, y1]);
    var rgbB = [pointBot.color.rgb.red, pointBot.color.rgb.green, pointBot.color.rgb.blue];
    pointBot.remove();
    pointTop.remove();
    var topp = rgbT[2];
    var bott = rgbB[2];
    if ((c3 == p3) || (c1 == p1)) {
        if (c1 == p1) {
            var R2 = (s3 - st1) / (s2 - s0);
            var Y2 = st1 - 1;
            var S = s3 - st1;
            var S2 = s2 - s0;
        }
        if (c3 == p3) {
            var Y1 = p3;
            var R2 = (st3 - s1) / (s2 - s0);
            if (c1 != p1) {
                var Y2 = st3 + 1;
            } else {
                var Y2 = st3;
            }
            var S = st3 - s1;
            var S2 = s2 - s0;
        }
    } else {
        app.activeDocument.selection.deselect();
        if ((((s1 == st1) && (s3 == st3)) || ((topp < 150) && (bott < 150))) || ((topp >= 185) && (bott >= 185))) {
            var Y1 = ((p3 - p1) / 2) + p1;
            var Y2 = ((s3 - s1) / 2) + s1;
        }
        if ((topp <= 184) && (bott >= 185)) {
            var Y1 = p3;
            var Y2 = s3;
        }
    }
    app.activeDocument.selection.deselect();
    activeDocument.activeLayer = activeDocument.layers["Variant #1"];
    app.activeDocument.activeLayer.translate(X2 - X1, Y2 - Y1);
    if (R1 > R2) {
        var resizePercent = (S / P) * 100;
        tranform();
    } else {
        var resizePercent = (S2 / P2) * 100;
        tranform();
    }
    try {
        if (activeDocument.guides.length > 1) {
            activeDocument.guides.removeAll();
        }
    } catch (e) {

    }
}

function LeftRightTransform() {
    var allLayers = new Array();
    var artLayers = new Array();
    FlipToProduct();
    collectAllLayers(artLayers, allLayers, app.activeDocument, 0);
    selectAllLayers();
    unlinklayer();
    selectLayer("Item 1");
    unclipingall(artLayers);
    deselect();
    Guidecenter(artLayers);
    rightleft(artLayers);
    deselect();
    var allLayers = new Array();
    var artLayers = new Array();
    collectAllLayers(artLayers, allLayers, app.activeDocument, 0);
    linkRight(artLayers);
    linklayer();
    deselect();
    linkLeft(artLayers)
    linklayer();
    deselect();
    selectLayer("Stencil");
    BotL();
    BotR();
    selectAllLayers();
    unlinklayer();
    selectLayer("Item 1");
    unclipingall(artLayers);
    Merged();
};

function CenterTransform(vinh, vinhstc) {
    function tranform() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), stringIDToTypeID("QCSIndependent"));
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), X2);
        desc2.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), Y2);
        desc1.putObject(charIDToTypeID('Pstn'), charIDToTypeID('Pnt '), desc2);
        var desc3 = new ActionDescriptor();
        desc3.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
        desc3.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
        desc1.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc3);
        desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putBoolean(charIDToTypeID('Lnkd'), true);
        desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Bcbc'));
        executeAction(charIDToTypeID('Trnf'), desc1, DialogModes.NO);
    }
    activeDocument.activeLayer = vinh;
    app.preferences.rulerUnits = Units.PIXELS;
    if (hasSelection()) {
        addLayerMask();
        var mask = true;
    } else {
        var mask = false;
    }
    var bounds = app.activeDocument.activeLayer.bounds;
    var p0 = bounds[0].as("px");
    var p1 = bounds[1].as("px");
    var p2 = bounds[2].as("px");
    var p3 = bounds[3].as("px");
    var R1 = (p3 - p1) / (p2 - p0);
    activeDocument.activeLayer = vinhstc;
    selectST(vinhstc, 0.40);
    activeDocument.selection.expand(UnitValue(1, "px"));
    var SB = app.activeDocument.selection.bounds;
    var s0 = SB[0].value;
    var s1 = SB[1].value;
    var s2 = SB[2].value;
    var s3 = SB[3].value;
    var R2 = (s3 - s1) / (s2 - s0);
    app.activeDocument.selection.deselect();
    var X1 = ((p2 - p0) / 2) + p0;
    var Y1 = ((p3 - p1) / 2) + p1;
    activeDocument.activeLayer = vinhstc;
    var X2 = ((s2 - s0) / 2) + s0;
    var Y2 = ((s3 - s1) / 2) + s1;
    activeDocument.activeLayer = vinh;
    app.activeDocument.activeLayer.translate(X2 - X1, Y2 - Y1);
    if (R1 > R2) {
        var resizePercent = ((s3 - s1) / (p3 - p1)) * 100;
        activeDocument.activeLayer = vinh;
        tranform();
    } else {
        var resizePercent = ((s2 - s0) / (p2 - p0)) * 100;
        activeDocument.activeLayer = vinh;
        tranform();
    }
    if (mask == true) {
        DeleteLayerMask();
    }
};

function VariantModel(Productz, stencilz, group) {
    activeDocument.activeLayer = Productz;
    addLayer("VinhMask");
    activeDocument.activeLayer = Productz;
    copyMask("VinhMask");
    activeDocument.activeLayer = Productz;
    DeleteLayerMask();
    activeDocument.activeLayer.link(group.artLayers.getByName("VinhMask"))
    HighTransform(Productz, stencilz)
    activeDocument.activeLayer = group.artLayers.getByName("VinhMask")
    copyMask(Productz.id)
    group.artLayers.getByName("VinhMask").remove();
    activeDocument.activeLayer = stencilz;
};

function VariantMulti(Productz, stencilz, group, value) {
    activeDocument.activeLayer = Productz;
    addLayer("VinhMask");
    activeDocument.activeLayer = Productz;
    copyMask("VinhMask");
    activeDocument.activeLayer = Productz;
    DeleteLayerMask();
    activeDocument.activeLayer.link(group.artLayers.getByName("VinhMask"))
    if (stencilz.allLocked || keys.ctrlKey) {
        if (stencilz.allLocked) {
            stencilz.allLocked = false;
        }
        StencilTransform(Productz, stencilz, value)
    } else {
        ProductTransform(Productz, stencilz, value)
    }
    activeDocument.activeLayer = group.artLayers.getByName("VinhMask")
    copyMask(Productz.id)
    group.artLayers.getByName("VinhMask").remove();
    activeDocument.activeLayer = stencilz;
};

function MultiVariant(tile, callback) {
    var value = tile
    // try {
    for (var i = activeDocument.layerSets.length - 2; i > 0; i--) {
        var Variant = activeDocument.layerSets[i];
        var color = Variant.layerSets[0];
        var item = Variant.layerSets[1];
        var shadow = Variant.layerSets[2];
        var bg = Variant.layerSets[3];
        var c = -1;
        var f = -1;
        do {
            c++
            try {
                var vinhss = item.artLayers[c]
            } catch (e) {
                break;
            }
        }
        while (!vinhss.visible || vinhss.name.indexOf("Product") == -1);
        //==========================================================================================================================================\\
        do {
            f++
            try {
                var vinhstcss = item.artLayers[f];
            } catch (e) {
                break;
            };
        } while (vinhstcss.name.indexOf("Stencil") == -1);
        if (callback) {
            try {
                if (item.artLayers[0].name.search("Stencil") == -1) {
                    throw new Error("Perform đi pa")
                }
            } catch (e) {
                alert(e.message, "Stencil Manual")
                return;
            }
            if (item.allLocked) {
                alert("Sai sờ kiu rồi", "Ngọc Vinh");
                return;
            }
            checkGuidez();
        };
        if (keys.keyName == "Accent") {
            StencilModels();
            return;
        }
        Link(color, item, bg, shadow, vinhss);
        if (hasLayerMask(vinhss.id) && hasSelection() && !Variant.allLocked && !checkSwatch(item)) {
            if (checkgui() == "Vinh") {
                activeDocument.activeLayer = vinhss;
                Intersect();
            }
            try {
                var kiemtrachannel = activeDocument.channels.getByName("VinhStencil");
            } catch (e) {
                saveSelection("VinhStencil")
            }
            var channelz = activeDocument.channels.getByName("VinhStencil");
            VariantMulti(vinhss, vinhstcss, item, value)
            if (i > 1) {
                activeDocument.selection.load(channelz)
            }
            if (i == 1) {
                channelz.remove();
            }
            Variant.visible = true;
            activeDocument.guides.removeAll();
        } else if (!hasSelection() && hasLayerMask(vinhss.id) && !Variant.allLocked && !checkSwatch(item)) {
            if (vinhstcss.allLocked || keys.ctrlKey) {
                if (vinhstcss.allLocked) {
                    vinhstcss.allLocked = false;
                }
                StencilTransform(vinhss, vinhstcss, value);
            } else {
                ProductTransform(vinhss, vinhstcss, value);
            };
            Variant.visible = true;
            activeDocument.guides.removeAll();
        } else if (hasSelection() && !hasLayerMask(vinhss.id) && !Variant.allLocked && !checkSwatch(item)) {
            if (i > 1) {
                saveSelection("VinhStencil");
                var channelz = activeDocument.channels.getByName("VinhStencil");
            };
            if (vinhstcss.allLocked || keys.ctrlKey) {
                if (vinhstcss.allLocked) {
                    vinhstcss.allLocked = false;
                }
                StencilTransform(vinhss, vinhstcss, value);
            } else {
                ProductTransform(vinhss, vinhstcss, value);
            };
            if (i > 1) {
                activeDocument.selection.load(channelz)
            }
            if (i == 1) {
                try {
                    channelz.remove();
                } catch (e) {

                }
            }
            Variant.visible = true;
            activeDocument.guides.removeAll();
        } else if (!hasSelection() && !hasLayerMask(vinhss.id) && !Variant.allLocked && !checkSwatch(item)) {
            var cf = confirm("không có vùng chọn, không mask, chạy cho cả ảnh?", false, "Tiếp tục?");
            if (cf) {
                if (vinhstcss.allLocked || keys.ctrlKey) {
                    if (vinhstcss.allLocked) {
                        vinhstcss.allLocked = false;
                    }
                    StencilTransform(vinhss, vinhstcss, value);
                } else {
                    ProductTransform(vinhss, vinhstcss, value);
                };
            }
            activeDocument.guides.removeAll();
        } else if (Variant.allLocked) {
            if (i == 1) {
                activeDocument.selection.deselect();
                try {
                    channelz.remove();
                } catch (e) {
                    //
                };
            }
        };
    };
    activeDocument.guides.removeAll();

    // } catch (e) {
    //     alert(e.message.replace(/^.*\n- /, ""), "NgocVinh")
    // };

    //==========================================================================================================================================\\
    //==========================================================================================================================================\\
};

function fourVarNoMask(vl) {
    var value = vl
    for (var i = activeDocument.layerSets.length - 2; i > 0; i--) {
        var Variant = activeDocument.layerSets[i];
        var color = Variant.layerSets[0];
        var item = Variant.layerSets[1];
        var shadow = Variant.layerSets[2];
        var bg = Variant.layerSets[3];
        var q = -1;
        var p = -1;
        do {
            q++
            try {
                var vinhp = item.artLayers[q]
            } catch (e) {
                break;
            }
        }
        while (!vinhp.visible || vinhp.name.indexOf("Product") == -1);
        //==========================================================================================================================================\\
        do {
            p++
            try {
                var vinhstcp = item.artLayers[p];
            } catch (e) {
                break;
            };
        } while (vinhstcp.name.indexOf("Stencil") == -1);
        selectLayer(vinhp.id);
        var currentLayer = app.activeDocument.activeLayer;
        var layerWidth = currentLayer.bounds[2] - currentLayer.bounds[0];
        var layerHeight = currentLayer.bounds[3] - currentLayer.bounds[1];
        if (layerWidth > layerHeight) {
            var check = false;
        } else if (layerWidth < layerHeight) {
            var check = true;

        };
        if (!Variant.allLocked) {
            hideAllLayers(Variant);
            HightPro(vinhp, vinhstcp, value, true, check);
        };
    };
};

function MultiVariantCheck(countVariantLock) {
    var variantCount = activeDocument.layerSets.length - 2;
    if (variantCount >= 2) {
        try {
            for (var id = variantCount; id > 0; id--) {
                var VariantMulti = activeDocument.layerSets[id];
                if (!VariantMulti.allLocked) {
                    countVariantLock.push(VariantMulti.name)
                }
            }
            if (countVariantLock.length > 1) {
                if (countVariantLock.length == 3) {
                    if (countVariantLock[0] == "Variant 1" && countVariantLock[1] == "Variant 2" && countVariantLock[2] == "Variant 3") {
                        for (var ver = 0; ver < countVariantLock.length; ver++) {
                            var VariantM = activeDocument.layerSets.getByName(countVariantLock[ver]);
                            var itemM = VariantM.layers[1];
                            var layerSten = itemM.artLayers.getByName("Stencil");
                            if ((layerSten.bounds[2].value - layerSten.bounds[0].value <= 200) && (layerSten.bounds[3].value - layerSten.bounds[1].value <= 200)) {
                                var swatch = true;
                                break;
                            } else {
                                var swatch = false;
                            }
                        }
                        if (!swatch) {
                            return "ThreeVariant"
                        } else {
                            return "Multi"
                        }
                    }
                } else if (countVariantLock.length == 2) {
                    if (countVariantLock[0] == "Variant 1" && countVariantLock[1] == "Variant 2") {
                        try {
                            var Variant1 = activeDocument.layerSets.getByName(countVariantLock[0])
                            var color1 = Variant1.layerSets[0];
                            var item1 = Variant1.layerSets[1];
                            var shadow1 = Variant1.layerSets[2];
                            var bg1 = Variant1.layerSets[3];
                            var Variant2 = activeDocument.layerSets.getByName(countVariantLock[1])
                            var color2 = Variant2.layerSets[0];
                            var item2 = Variant2.layerSets[1];
                            var shadow2 = Variant2.layerSets[2];
                            var bg2 = Variant2.layerSets[3];
                        } catch (e) {}
                        var bounds1 = item2.artLayers.getByName("Stencil").bounds;
                        var left1 = bounds1[0].as("px");
                        var top1 = bounds1[1].as("px");
                        var right1 = bounds1[2].as("px");
                        var bottom1 = bounds1[3].as("px");
                        var width1 = right1 - left1;
                        var height1 = bottom1 - top1;
                        if (width1 > 300 && height1 > 300) {
                            return "TwoVariant";
                        } else {
                            return undefined;
                        };
                    };
                } else {
                    return "Multi"
                };
            }
        } catch (e) {
            alert(e.message.replace(/^.*\n- /, ""), "NgocVinh");
        }
    };
};

function StencilModels() {
    try {
        for (var i = activeDocument.layerSets.length - 2; i > 0; i--) {
            var Variants = activeDocument.layerSets[i];
            var colors = Variants.layerSets[0];
            var items = Variants.layerSets[1];
            var shadows = Variants.layerSets[2];
            var bg = Variants.layerSets[3];
            var c = -1;
            var k = -1;
            do {
                c++
                try {
                    var vinhs = items.artLayers[c]
                } catch (e) {
                    break;
                }
            }
            while (!vinhs.visible || vinhs.name.indexOf("Product") == -1);
            do {
                k++
                try {
                    var vinhstcs = items.artLayers[k]
                } catch (e) {
                    break;
                }
            }
            while (vinhstcs.name.indexOf("Stencil") == -1);
            Link(colors, items, bg, shadows, vinhs);
            if (hasLayerMask(vinhs.id) && hasSelection() && !Variants.allLocked) {
                if (checkgui() == "Vinh") {
                    activeDocument.activeLayer = vinhs;
                    Intersect();
                }
                try {
                    var kiemtrachannel = activeDocument.channels.getByName("VinhStencil");
                } catch (e) {
                    saveSelection("VinhStencil")
                }
                VariantModel(vinhs, vinhstcs, items)
                try {
                    var channelz = activeDocument.channels.getByName("VinhStencil");
                } catch (e) {

                }
                if (i > 1) {
                    activeDocument.selection.load(channelz)
                }
                try {
                    if (i == 1) {
                        channelz.remove();
                    }
                } catch (e) {

                }
                // Variants.visible = true;
                activeDocument.guides.removeAll();
            } else if (!hasSelection() && hasLayerMask(vinhs.id) && !Variants.allLocked) {
                HighTransform(vinhs, vinhstcs);
                activeDocument.guides.removeAll();
                // Variants.visible = true;
            } else if (hasSelection() && !hasLayerMask(vinhs.id) && !Variants.allLocked) {
                HighTransform(vinhs, vinhstcs);
                activeDocument.guides.removeAll();
            } else if ((!hasSelection()) && (!hasLayerMask(vinhs.id)) && (!Variants.allLocked)) {
                var conf = confirm("Không có vùng chọn, không có mask, tiếp tục?");
                if (conf) {
                    HighTransform(vinhs, vinhstcs);
                };
            } else if (Variants.allLocked) {
                if (i == 1) {
                    try {
                        channelz.remove();
                    } catch (e) {

                    }
                }
            }
        }
    } catch (e) {
        alert(e.message.replace(/^.*\n- /, ""), "Ngọc Vinh1")

    }

};

function HighTransform(product, stencil) {
    function tranform() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        desc1.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), stringIDToTypeID("QCSIndependent"));
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), X2);
        desc2.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), Y2);
        desc1.putObject(charIDToTypeID('Pstn'), charIDToTypeID('Pnt '), desc2);
        var desc3 = new ActionDescriptor();
        desc3.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
        desc3.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
        desc1.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc3);
        desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), resizePercent);
        desc1.putBoolean(charIDToTypeID('Lnkd'), true);
        desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Bcbc'));
        executeAction(charIDToTypeID('Trnf'), desc1, DialogModes.NO);
    }
    activeDocument.activeLayer = product;
    if ((hasSelection()) && (!hasLayerMask())) {
        addLayerMask();
        var mask = true;
    }
    app.preferences.rulerUnits = Units.PIXELS;
    app.activeDocument.selection.deselect();
    activeDocument.activeLayer = stencil;
    Subject(false);
    var SB = app.activeDocument.selection.bounds;
    var s0 = SB[0].value;
    var s1 = SB[1].value;
    var s2 = SB[2].value;
    var s3 = SB[3].value;
    var R2 = (s3 - s1) / (s2 - s0);
    app.activeDocument.selection.deselect();
    activeDocument.activeLayer = product;
    var bounds = app.activeDocument.activeLayer.bounds;
    var p0 = bounds[0].as("px");
    var p1 = bounds[1].as("px");
    var p2 = bounds[2].as("px");
    var p3 = bounds[3].as("px");
    var R1 = (p3 - p1) / (p2 - p0);
    var bounds = app.activeDocument.activeLayer.bounds;
    var X1 = ((p2 - p0) / 2) + p0;
    var Y1 = p1;
    activeDocument.activeLayer = stencil;
    var bounds = app.activeDocument.activeLayer.bounds;
    var X2 = ((s2 - s0) / 2) + s0;
    var Y2 = s1;
    activeDocument.activeLayer = product;
    app.activeDocument.activeLayer.translate(X2 - X1, Y2 - Y1);
    var resizePercent = ((s3 - s1) / (p3 - p1)) * 100;
    activeDocument.activeLayer = product;
    tranform();
    if (mask) {
        DeleteLayerMask();
    }
    if (stencil.opacity == 100) {
        stencil.opacity = 40;
    }
};

function Gradient() {

}
//=========================================================================SHADOW========================================================================================\\
function shadownNatural() {
    if (documents.length < 1) {
        alert("Không mở hình rồi bấm action chi hả " + Getaccount(), "Ngọc Vinh", true);
        return;
    };
    try {
        check();
    } catch (e) {
        return;
    }
    var i = 0;
    do {
        i++;
        try {
            var Variant = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && Variant.allLocked);
    //
    var noStencil = false;
    try {
        var item = Variant.layerSets["Item " + i];
        var shadow = Variant.layerSets["Shadow " + i];
        var bg = Variant.layerSets["Background " + i];
        var color = Variant.layerSets["Color " + i];
    } catch (e) {
        var noshadow = true;
    };
    var x = -1;
    do {
        x++
        try {
            var Product = item.artLayers[x]
        } catch (e) {
            break;
        }
    }
    while (Product.name.indexOf("Product") == -1 || !Product.visible || isEmpty(Product) || Product.name.charAt(0) == "#")
    // alert(x) 
    try {
        var stc = item.artLayers.getByName("Stencil");

    } catch (e) {
        var noStencil = true;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (noshadow) {
        alert("không phải cấu trúc SAW", "Ngọc Vinh", true);
        return;
    };
    if (shadow.allLocked) {
        alert("Sai sờ kiu rồi nhé", "Ngọc Vinh", false);
        return;
    };
    ShadownSP(activeDocument, "2. MEDIUM");
    hideAllLayers(Variant);
    SelectTool('moveTool');
    exectAction("RvlA");
    if (!noStencil) {
        stc.visible = true;
        activeDocument.guides.removeAll();
        activeDocument.activeLayer = stc;
        executeAction(stringIDToTypeID('newGuidesFromTarget'), undefined, DialogModes.NO);
        stc.visible = false;
    };
    selectLayer(item);
    executeAction(stringIDToTypeID('copyToLayer'), undefined, DialogModes.NO);
    if (activeDocument.activeLayer.allLocked) {
        activeDocument.activeLayer.allLocked = false;
    };
    var x = -1;
    do {
        x++
        try {
            var Productcopy = activeDocument.activeLayer.artLayers[x];
        } catch (e) {
            break;
        }
    }
    while (Productcopy.name.indexOf("Product") == -1 || !Productcopy.visible || isEmpty(Productcopy) || Productcopy.name.charAt(0) == "#")
    selectLayer(Productcopy.id);
    if (activeDocument.activeLayer.allLocked) {
        activeDocument.activeLayer.allLocked = false;
    }
    DeleteLayerMask();
    DeleteVectorMask();
    selectLayer(activeDocument.activeLayer.parent);
    activeDocument.activeLayer.merge();
    activeDocument.activeLayer.move(shadow, ElementPlacement.INSIDE)
    activeDocument.suspendHistory("Prepare Shadow V" + i, 'activeDocument.activeLayer.name = "V" + i;');
    SelectTool("PbTl");
    return;
};
//==========================================================================DUST=========================================================================================\\

function dustScratches(thongsocao, skip) {
    if (documents.length < 1) {
        alert("Không mở hình rồi bấm action chi hả " + Getaccount(), "Ngọc Vinh", true);
        return;
    };
    try {
        if (skip == undefined) {
            check();
        }
    } catch (e) {
        alert(e)
        return;
    }
    var vz = activeDocument.activeLayer.parent.name.slice(-1);
    var vr = parseInt(vz);
    var i = 0;
    do {
        i++;
        try {
            var vra = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && vra.allLocked);
    //==========================================================================================================================================\\
    try {
        var TestVariant = activeDocument.layerSets["Variant " + vr];
        var TestLock = activeDocument.activeLayer.parent;
        if (TestLock.allLocked || TestVariant.allLocked) {
            vr = i
        }
    } catch (e) {
        vr = i;
    }
    var nonSaw = false;
    try {
        var Variant = activeDocument.layerSets["Variant " + vr];
        var color = Variant.layerSets["Color " + vr];
        var item = Variant.layerSets["Item " + vr];
        var shadow = Variant.layerSets["Shadow " + vr];
        var bg = Variant.layerSets["Background " + vr];
    } catch (e) {
        nonSaw = true;
    }
    //==========================================================================================================================================\\
    var a = -1;
    do {
        a++
        try {
            var vinh = item.artLayers[a]
        } catch (e) {
            break;
        }
    }
    while (!vinh.visible || vinh.allLocked || vinh.grouped || vinh.name.indexOf("Sil_") != -1 || vinh.name.indexOf("Stencil") != -1);
    //==========================================================================================================================================\\
    var LayerDust = activeDocument.activeLayer.parent;
    if ((LayerDust.name.search("Variant") == 0) || (LayerDust.name == activeDocument.name) || (activeDocument.activeLayer.allLocked) ||
        (LayerDust.allLocked) || (LayerDust.parent.allLocked) || (LayerDust.parent.name == activeDocument.name) || (LayerDust.name.search("Color") == 0) || (LayerDust.name == "BACKGROUND")) {
        LayerDust = item;
    };
    hideAllLayers(Variant);
    try {
        if (nonSaw) {
            nonSaws();
            makeSnapshot("Return")
            var rs = 7;
            var ts = 30;
            if (activeDocument.layers[0].name.indexOf("Color") != -1) {
                activeDocument.layers[0].visible = false;
                rs = 13;
                ts = 7;
                var colorg = true;
            } else if (activeDocument.activeLayer.name == "Retouching") {
                rs = 13;
                ts = 8;
            };
            try {
                addLayer("zin");
                mergeVisible();
                if (thongsocao) {
                    dust(undefined, undefined, undefined, undefined, undefined, true)

                } else {
                    dust(rs, ts, nonSaw);
                };
                activeDocument.suspendHistory('No remove', 'Merge()')
                setSourceHistory();
                BackHistory(-1);
                activeDocument.activeLayer.remove()
                SelectTool('historyBrushTool');
                ClearHistory();

            } catch (e) {
                alert(e.message.replace(/^.*\n- /, ""), "NgocVinh")
                if (activeDocument.activeLayer.name == "Vinh") {
                    activeDocument.activeLayer.remove();
                }
            }
            if (colorg) {
                activeDocument.layers[0].visible = true;
            }
            return;
        }
    } catch (e) {
        //
    };
    try {
        makeSnapshot("Return");
        hideST(Variant, item, "Stencil");
        if ((activeDocument.activeLayer.typename != "LayerSet") && (!activeDocument.activeLayer.allLocked) &&
            (activeDocument.activeLayer.kind == LayerKind.NORMAL) && (activeDocument.activeLayer.visible) && (!activeDocument.activeLayer.grouped)) {

            var idcurrent = activeDocument.activeLayer.id

        } else {
            var idcurrent = vinh.id
        }
        activeDocument.activeLayer = LayerDust;
        Merge(true);
        activeDocument.selection.selectAll();
        activeDocument.selection.copy();
        activeDocument.activeLayer.remove();
        selectLayer(idcurrent);
        if (isEmpty(activeDocument.activeLayer)) {
            addLayer("Vinh")
        }
        Paste();
        dust(undefined, undefined, false, color, vinh, thongsocao);
        activeDocument.suspendHistory('No Remove', 'Merge()')
        setSourceHistory();
        BackHistory(-1);
        activeDocument.activeLayer.remove()
        SelectTool('historyBrushTool');
        ClearHistory();
    } catch (e) {
        alert(e.message.replace(/^.*\n- /, ""), "NgocVinh")
        if (activeDocument.activeLayer.name == "Vinh") {
            activeDocument.activeLayer.remove();
        }
    }
};
//==========================================================================APPLY========================================================================================\\
function FrequencySeparation() {
    if (documents.length < 1) {
        alert("Không mở hình rồi bấm action chi hả " + Getaccount(), "Ngọc Vinh", true);
        return;
    };
    try {
        check();
    } catch (e) {
        return;
    }
    var vz = activeDocument.activeLayer.parent.name.slice(-1);
    var vr = parseInt(vz);
    var i = 0;
    do {
        i++;
        try {
            var vra = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && vra.allLocked);
    //==========================================================================================================================================\\
    try {
        var TestVariant = activeDocument.layerSets["Variant " + vr];
        var TestLock = activeDocument.activeLayer.parent;
        if (TestLock.allLocked || TestVariant.allLocked) {
            vr = i
        }
    } catch (e) {
        vr = i;
    }
    var nonSaw = false;
    try {
        var Variant = activeDocument.layerSets["Variant " + vr];
        var color = Variant.layerSets["Color " + vr];
        var item = Variant.layerSets["Item " + vr];
        var shadow = Variant.layerSets["Shadow " + vr];
        var bg = Variant.layerSets["Background " + vr];
    } catch (e) {
        nonSaw = true;
    }
    //==========================================================================================================================================\\
    var a = -1;
    do {
        a++
        try {
            var vinh = item.artLayers[a]
        } catch (e) {
            break;
        }
    }
    while (!vinh.visible || vinh.allLocked || vinh.grouped || vinh.name.indexOf("Sil_") != -1 || vinh.name.indexOf("Stencil") != -1);
    //==========================================================================================================================================\\
    var Layerhide = activeDocument.activeLayer.parent;
    if (Layerhide.name.search("Variant") == 0 || Layerhide.name == activeDocument.name || activeDocument.activeLayer.allLocked ||
        Layerhide.allLocked || Layerhide.parent.allLocked || Layerhide.parent.name == activeDocument.name || Layerhide.name.search("Color") == 0) {
        Layerhide = item;
    };
    //==========================================================================================================================================\\
    if (nonSaw) {
        nonSaws();
        if (activeDocument.layers[0].name.indexOf("Color") != -1) {
            activeDocument.layers[0].visible = false;
            var colorg = true
        }
        try {
            const Parent = activeDocument.activeLayer.parent
            const Layername = Parent.artLayers.getByName("Lighting");
            const Layername1 = Parent.artLayers.getByName("Details");
        } catch (e) {};
        try {
            Layername.remove();
            Layername1.remove();
        } catch (e) {};
        try {
            makeSnapshot("Return");
            addLayer("Layer 1");
            mergeVisible();
            activeDocument.activeLayer.name = "Lighting";
            executeAction(stringIDToTypeID('copyToLayer'), undefined, DialogModes.NO);
            activeDocument.activeLayer.name = "Details";
            activeDocument.activeLayer.visible = false;
            selectLayer("Lighting");
            blur(7);
            selectLayer("Details");
            activeDocument.activeLayer.visible = true;
            ApplyImage("Lighting");
            activeDocument.suspendHistory('Actions: Frequency Separation', 'activeDocument.activeLayer.blendMode = BlendMode.LINEARLIGHT')
            setSourceHistory()
            activeDocument.activeLayer.visible = false;
            SelectTool("wetBrushTool");
            selectLayer("Lighting");
            if (colorg) {
                activeDocument.layers[0].visible = true;
            }
            ClearHistory();
            return;

        } catch (e) {
            alert(e.message.replace(/^.*\n- /, ""), "NgocVinh")
            selectSnapshot("Return");
        }
    };
    //==========================================================================================================================================\\
    makeSnapshot("Return");
    try {
        activeDocument.activeLayer = activeDocument.activeLayer.parent.artLayers.getByName("Details")
        activeDocument.activeLayer.remove();
        activeDocument.activeLayer = activeDocument.activeLayer.parent.artLayers.getByName("Lighting")
        activeDocument.activeLayer.remove();
    } catch (e) {
        //
    };
    hideAllGroups(Variant, item, Layerhide, a);
    hideST(Variant, item, "Stencil");
    checkLockLayer(Layerhide)
    addLayer("Layer 1");
    mergeVisible();
    activeDocument.activeLayer.name = "Lighting";
    executeAction(stringIDToTypeID('copyToLayer'), undefined, DialogModes.NO);
    activeDocument.activeLayer.name = "Details";
    activeDocument.activeLayer.visible = false;
    selectLayer("Lighting");
    blur(7);
    selectLayer("Details");
    activeDocument.activeLayer.visible = true;
    ApplyImage("Lighting");
    activeDocument.suspendHistory('Actions: Frequency Separation', 'activeDocument.activeLayer.blendMode = BlendMode.LINEARLIGHT')
    setSourceHistory()
    activeDocument.activeLayer.visible = false;
    SelectTool("wetBrushTool");
    selectLayer("Lighting");
    reVisibleGroup(Layerhide);
    ClearHistory();
};
//=========================================================================WIETHE========================================================================================\\

function Wiethe() {

    if (documents.length < 1) {
        alert("Không mở hình rồi bấm action chi hả " + Getaccount(), "Ngọc Vinh", true);
        return;
    };
    try {
        check();
    } catch (e) {
        return;
    }
    try {
        var org = activeDocument.layers.getByName("Original");
        org.visible = true;
        var layerorg = true;
    } catch (e) {
        var layerorg = false;
    }
    try {
        var bgRt = activeDocument.artLayers.getByName("FULL");
        var models = true;
    } catch (e) {
        var models = false;
    }
    try {
        var bgRt = activeDocument.artLayers.getByName("Ret");
        accesssori = true;
    } catch (e) {
        var accesssori = false;
    }
    try {
        var bgRt = activeDocument.layerSets["BUST"].artLayers.getByName("Ret");
        var wt3d = true;
    } catch (e) {
        var wt3d = false;
    }
    if ((!wt3d && !models && !accesssori) || !layerorg) {
        alert("Sai cấu trúc layer", "Wiethe")
        return;
    }
    if (wt3d) {
        Removelayer(activeDocument, "Swatch");
        transFormLayers(bgRt, org)
        activeDocument.activeLayer = org;
        BringTo('Frnt');
        activeDocument.activeLayer.invert();
        activeDocument.activeLayer.opacity = 50;
        frTransform();
        BringTo('Back');
        activeDocument.activeLayer.opacity = 100;
        activeDocument.activeLayer.invert();
        activeDocument.activeLayer = activeDocument.layerSets["BUST"].artLayers["Ret"];
        activeDocument.suspendHistory('Wiethe 3D Template', 'Swatch()');
        ClearHistory();
    } else if (models) {
        Removelayer(activeDocument, "SEMI");
        activeDocument.activeLayer = org;
        BringTo('Frnt')
        activeDocument.activeLayer.invert();
        activeDocument.activeLayer.opacity = 50;
        frTransform();
        BringTo('Back');
        activeDocument.activeLayer.opacity = 100;
        activeDocument.activeLayer.invert();
        if (activeDocument.guides.length == 0) {
            alert("Đặt guide giữa mũi và mắt model", "Wiethe")
            return;
        }
        for (var i = 0; i <= app.activeDocument.guides.length - 1; i += 1) {
            if ((app.activeDocument.guides[i].direction + "") == "Direction.HORIZONTAL") {
                var TOP = app.activeDocument.guides[i].coordinate;
                break;
            }
        }
        for (var i = 0; i <= app.activeDocument.layers.length - 1; i += 1) {
            if (app.activeDocument.layers[i].visible == true) {
                app.activeDocument.activeLayer = app.activeDocument.layers[i];
                break;
            }
        }
        mergeVisible();
        activeDocument.suspendHistory('Wiethe Model Template', 'SEMI(TOP)');
        ClearHistory();
    } else if (accesssori) {
        Removelayer(activeDocument, "Swatch");
        transFormLayers(bgRt, org);
        activeDocument.activeLayer = org;
        BringTo('Frnt')
        activeDocument.activeLayer.invert();
        activeDocument.activeLayer.opacity = 50;
        frTransform();
        BringTo('Back');
        activeDocument.activeLayer.opacity = 100;
        activeDocument.activeLayer.invert();
        for (var i = 0; i <= activeDocument.artLayers.length - 1; i++) {
            if (activeDocument.layers[i].name == "Ret") {
                activeDocument.activeLayer = activeDocument.layers[i];
                break;
            }
        }
        activeDocument.suspendHistory('Wiethe 3D Template', 'Swatch()');
        ClearHistory();
    }
};
//=========================================================================STENCIL=======================================================================================\\
function stencilAllInOne(tile) {
    if (documents.length < 1) {
        alert("Không mở hình rồi bấm action chi hả " + Getaccount(), "Ngọc Vinh", true);
        return;
    };
    try {
        check();
    } catch (e) {
        return;
    }
    var value = tile;
    var vz = activeDocument.activeLayer.parent.name.slice(-1);
    var vr = parseInt(vz);
    var i = 0;
    var countVariant = [];
    var countVariantLock = [];
    do {
        i++;
        try {
            var vra = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && vra.allLocked);
    //==========================================================================================================================================\\
    try {
        var TestVariant = activeDocument.layerSets["Variant " + vr];
        var TestLock = activeDocument.activeLayer.parent;
        if (TestLock.allLocked || TestVariant.allLocked) {
            vr = i
        }
    } catch (e) {
        vr = i;
    }
    var newStencil = false;
    try {
        var Variant = activeDocument.layerSets["Variant " + vr];
        var color = Variant.layerSets["Color " + vr];
        var item = Variant.layerSets["Item " + vr];
        var shadow = Variant.layerSets["Shadow " + vr];
        var bg = Variant.layerSets["Background " + vr];
    } catch (e) {
        var newStencil = true;
    }
    //==========================================================================================================================================\\\
    var z = -1;
    var n = -1
    do {
        z++
        try {
            var vinh = item.artLayers[z]
        } catch (e) {
            break;
        }
    }
    while (!vinh.visible || vinh.name.indexOf("Product") == -1);
    //==========================================================================================================================================\\
    do {
        n++
        try {
            var vinhstc = item.artLayers[n];
        } catch (e) {
            break;
        };
    } while (vinhstc.name.indexOf("Stencil") == -1);
    try {
        checkStencilLayer(newStencil, item);
    } catch (e) {
        alert(e.message, "Stencil Manual")
        return;
    }
    if (item.allLocked) {
        alert("Sai sờ kiu rồi", "Ngọc Vinh");
        return;
    }
    makeSnapshot("Return");
    checkGuidez();
    if (newStencil) {
        NewStencilManulX(value);
        return;
    }
    Link(color, item, bg, shadow, vinh);
    if (keys.keyName == "Accent") {
        if (activeDocument.layers.length > 5) {
            fourVarNoMask(0.40);
            return;
        }
        StencilModels();
        return;
    };
    var checkVariant = MultiVariantCheck(countVariantLock);
    if (checkVariant == "TwoVariant" || checkVariant == "Multi" || checkVariant == "ThreeVariant") {
        MultiVariant(value);
        return;
    }
    var countProduct = 0;
    var Flip = false;
    try {
        for (var ii = 0; ii < item.artLayers.length; ii++) {
            var Layerm = item.artLayers[ii];
            if (Layerm.name.indexOf("Product") !== -1 && Layerm.visible) {
                countProduct++;
            }
            if (Layerm.name == "Flip") {
                Flip = true;
            }
        }
    } catch (e) {

    }
    try {
        if (countProduct == 2 || Flip) {
            LeftRightTransform();
        } else if (vinhstc.allLocked || (i == 1 && hasVectorMask(vinh.id) && hasLayerMask(vinh.id))) {
            if (vinhstc.allLocked) {
                vinhstc.allLocked = false;
            };
            if (hasSelection() && hasLayerMask(vinh.id)) {
                if (checkgui() == "Vinh") {
                    activeDocument.activeLayer = vinh;
                    Intersect();
                };
                activeDocument.activeLayer = vinh;
                addLayer("VinhMask");
                activeDocument.activeLayer = vinh;
                copyMask("VinhMask");
                activeDocument.activeLayer = vinh;
                DeleteLayerMask();
                activeDocument.activeLayer.link(item.artLayers.getByName("VinhMask"))
                if (keys.altKey) {
                    ProductTransform(vinh, vinhstc, value);
                } else {
                    StencilTransform(vinh, vinhstc, value);
                }
                activeDocument.activeLayer = item.artLayers.getByName("VinhMask")
                copyMask(vinh.id)
                item.artLayers.getByName("VinhMask").remove();
                activeDocument.activeLayer = vinhstc;
                Variant.visible = true;
            } else {
                var confirmz = confirm("Stencil Scalable?.", true, "Stencil Manual")
                if (confirmz) {
                    StencilTransform(vinh, vinhstc, value);
                } else if (keys.altKey) {
                    BotTransform(vinh, vinhstc, value)
                } else {
                    ProductTransform(vinh, vinhstc, value);
                }
                Variant.visible = true;
            }
        } else if (hasLayerMask(vinh.id) && hasSelection()) {
            if (checkgui() == "Vinh") {
                activeDocument.activeLayer = vinh;
                Intersect();
            };
            activeDocument.activeLayer = vinh;
            addLayer("VinhMask");
            activeDocument.activeLayer = vinh;
            copyMask("VinhMask");
            activeDocument.activeLayer = vinh;
            DeleteLayerMask();
            activeDocument.activeLayer.link(item.artLayers.getByName("VinhMask"))
            if (keys.ctrlKey) {
                StencilTransform(vinh, vinhstc, value);
            } else {
                ProductTransform(vinh, vinhstc, value)
            };
            activeDocument.activeLayer = item.artLayers.getByName("VinhMask")
            copyMask(vinh.id)
            item.artLayers.getByName("VinhMask").remove();
            activeDocument.activeLayer = vinhstc;
            Variant.visible = true;
        } else if (!hasSelection() && hasLayerMask(vinh.id)) {
            try {
                if (keys.ctrlKey) {
                    StencilTransform(vinh, vinhstc, value);
                } else {
                    ProductTransform(vinh, vinhstc, value);
                };
                Variant.visible = true;
            } catch (e) {
                alert(e.message.replace(/^.*\n- /, ""), "NgocVinh")
            };
        } else if (!hasSelection() && !hasLayerMask(vinh.id)) {
            var cf = confirm("không có vùng chọn, không mask, chạy cho cả ảnh?", false, "Tiếp tục?");
            if (keys.ctrlKey && cf) {
                StencilTransform(vinh, vinhstc, value);
            } else if (cf) {
                ProductTransform(vinh, vinhstc, value);
            }
            Variant.visible = true;

        } else if (hasSelection() && !hasLayerMask(vinh.id)) {
            try {
                if (keys.ctrlKey) {
                    StencilTransform(vinh, vinhstc, value);
                } else {
                    ProductTransform(vinh, vinhstc, value);
                };
                Variant.visible = true;
            } catch (e) {
                alert(e.message.replace(/^.*\n- /, ""), "NgocVinh")
            }
        }
        if (activeDocument.guides.length > 1) {
            activeDocument.guides.removeAll();
        }
    } catch (e) {
        alert(e.message.replace(/^.*\n- /, ""), "NgocVinh")
    };
};

function guideCreateInStencil() {
    if (documents.length < 1) {
        alert("Không mở hình rồi bấm action chi hả " + Getaccount(), "Ngọc Vinh", true);
        return;
    };
    try {
        check();
    } catch (e) {
        return;
    };
    var vz = activeDocument.activeLayer.parent.name.slice(-1);
    var vr = parseInt(vz);
    var i = 0;
    do {
        i++;
        try {
            var vra = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && vra.allLocked);
    //==========================================================================================================================================\\
    try {
        var TestVariant = activeDocument.layerSets["Variant " + vr];
        var TestLock = activeDocument.activeLayer.parent;
        if (TestLock.allLocked || TestVariant.allLocked) {
            vr = i
        }
    } catch (e) {
        vr = i;
    }
    var newStencil = false;
    try {
        var Variant = activeDocument.layerSets["Variant " + vr];
        var color = Variant.layerSets["Color " + vr];
        var item = Variant.layerSets["Item " + vr];
        var shadow = Variant.layerSets["Shadow " + vr];
        var bg = Variant.layerSets["Background " + vr];
    } catch (e) {
        newStencil = true;
    }
    //==========================================================================================================================================\\
    var z = -1;
    var n = -1
    do {
        z++
        try {
            var vinh = item.artLayers[z]
        } catch (e) {
            break;
        }
    }
    while (!vinh.visible || vinh.name.indexOf("Product") == -1);
    //==========================================================================================================================================\\
    do {
        n++
        try {
            var vinhstc = item.artLayers[n];
        } catch (e) {
            break;
        };
    } while (vinhstc.name.indexOf("Stencil") == -1);
    //==========================================================================================================================================\\
    selectLayer(vinh.id);
    activeDocument.guides.removeAll();
    if (hasLayerMask()) {
        loadSelectionByMask(vinh.id);
        guideCreate();
        activeDocument.selection.deselect();
        SelectTool('moveTool');
        ClearHistory();
    } else {
        Subject(false);
        guideCreate();
        activeDocument.selection.deselect();
        SelectTool('moveTool');
        ClearHistory();
    };
};
//=========================================================================ĐỔ BÓNG=======================================================================================\\
function dropshadow3d() {
    if (documents.length < 1) {
        alert("Không mở hình rồi bấm action chi hả " + Getaccount(), "Ngọc Vinh", true);
        return;
    };
    try {
        check();
    } catch (e) {
        return;
    }
    var i = 0;
    do {
        i++;
        try {
            var Variant = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && Variant.allLocked);
    //
    var nonSaw = false;
    try {
        var item = Variant.layerSets["Item " + i];
        var shadow = Variant.layerSets["Shadow " + i];
        var bg = Variant.layerSets["Background " + i];
        var color = Variant.layerSets["Color " + i];
    } catch (e) {
        var nonSaw = true;
    };
    var x = -1;
    do {
        x++
        try {
            var Product = item.artLayers[x]
        } catch (e) {
            break;
        }
    }
    while (Product.name.indexOf("Product") == -1 || !Product.visible || isEmpty(Product));
    //////////////////////////////////////////////////////////////////////////////////////////

    for (var n = 0; n < item.artLayers.length; n++) {
        var lrs = item.artLayers[n];
        if (lrs.kind == LayerKind.LEVELS && lrs.visible) {
            lrs.remove();
            break;
        }
    }
    if (isEmpty(activeDocument.activeLayer) && activeDocument.activeLayer.name.charAt(0) === "#") {
        advMask();
        return;
    } else {
        activeDocument.activeLayer = Product;
        setSelection();
        Feather(70);
        SetLv(0.28, 191, "Zin");
        MovePres();
        SelectTool('SmTl');
        makeSnapshot("Return");
    };

};
//=========================================================================BACK 3D=======================================================================================\\

function copyfile3d() {
    if (documents.length < 1) {
        alert("Không mở hình rồi bấm action chi hả " + Getaccount(), "Ngọc Vinh", true);
        return;
    };
    try {
        check();
    } catch (e) {
        return;
    }
    var i = 0;
    do {
        i++;
        try {
            var Variant = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && Variant.allLocked);
    //
    var nonSaw = false;
    try {
        var rs = activeDocument.layerSets["Resources"]
        var item = Variant.layerSets["Item " + i];
        var shadow = Variant.layerSets["Shadow " + i];
        var bg = Variant.layerSets["Background " + i];
        var color = Variant.layerSets["Color " + i];
    } catch (e) {
        var nonSaw = true;
    };
    var x = -1;
    do {
        x++
        try {
            var Product = item.artLayers[x]
        } catch (e) {
            break;
        }
    }
    while (Product.name.indexOf("Product") == -1 || !Product.visible || isEmpty(Product));
    //////////////////////////////////////////////////////////////////////////////////////////
    if (checkSnapshot("3D")) {
        executeAction(stringIDToTypeID('copyToLayer'), undefined, DialogModes.NO);
        activeDocument.selection.deselect();
        SelectBackward();
        activeDocument.activeLayer.remove();
        SelectForward();
        MovePres();
        frTransform();
        var des = new ActionDescriptor();
        var re = new ActionReference();
        re.putName(charIDToTypeID("SnpS"), "3D");
        des.putReference(charIDToTypeID("null"), re);
        executeAction(charIDToTypeID("Dlt "), des, DialogModes.NO);
        return;
    } else {
        DeselectPath();
        selectLayer(Product.id);
        loadSelectionFormPath();
        if (!hasSelection()) {
            alert("không có vùng chọn", Getaccount());
            return;
        };
        Feather(0.5);
        activeDocument.selection.clear();
        activeDocument.selection.deselect();
        Copy3D(rs, item, Product);
        SelectForward();
        activeDocument.activeLayer.name = "3D";
        selectLayer(Product.id);
        setSelection();
        SelectForward();
        AlignCenter();
        activeDocument.selection.deselect();
        frTransform();
        makeSnapshot("3D");
    };
};
//======================================================================= =ADV MASK=======================================================================================\\

function advMask() {
    var i = 0;
    var x = -1
    do {
        i++;
        try {
            var vra = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && vra.allLocked);
    //==========================================================================================================================================\\
    try {
        var TestVariant = activeDocument.layerSets["Variant " + vr];
        var TestLock = activeDocument.activeLayer.parent;
        if (TestLock.allLocked || TestVariant.allLocked) {
            vr = i
        }
    } catch (e) {
        vr = i;
    }
    try {
        var Variant = activeDocument.layerSets["Variant " + vr];
        var color = Variant.layerSets["Color " + vr];
        var item = Variant.layerSets["Item " + vr];
        var shadow = Variant.layerSets["Shadow " + vr];
        var bg = Variant.layerSets["Background " + vr];
    } catch (e) {
        //
    }
    //==========================================================================================================================================\\
    do {
        x++
        try {
            var vinhProd = item.artLayers[x];
        } catch (e) {
            break;
        };
    } while (!vinhProd.visible || vinhProd.name.indexOf("Product") == -1 || isEmpty(vinhProd));
    //==========================================================================================================================================\\
    if (!hasSelection()) {
        try {
            maskTwo(vinhProd);
        } catch (e) {
            alert(e.message.replace(/^.*\n- /, ""), "NgocVinh");
        };
    } else {
        var layernames = activeDocument.activeLayer.name;
        if (layernames == "#Floor" || layernames == "#Backdrop" || layernames == "#Background") {
            activeDocument.selection.invert();
        };
        try {
            maskOne();
        } catch (e) {
            try {
                activeDocument.channels.getByName("Vinh").remove();
            } catch (e) {

            }
            alert(e.message.replace(/^.*\n- /, ""), "NgocVinh");
        };
    }
};
//=======================================================================FLIP PRODUCT===================================================================================
function flipShape() {
    if (documents.length < 1) {
        alert("Không mở hình rồi bấm action chi hả " + Getaccount(), "Ngọc Vinh", true);
        return;
    };
    try {
        check();
    } catch (e) {
        return;
    }
    var i = 0;
    do {
        i++;
        try {
            var Variant = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && Variant.allLocked);
    //
    var nonSaw = false;
    try {
        var rs = activeDocument.layerSets["Resources"]
        var item = Variant.layerSets["Item " + i];
        var shadow = Variant.layerSets["Shadow " + i];
        var bg = Variant.layerSets["Background " + i];
        var color = Variant.layerSets["Color " + i];
    } catch (e) {
        var nonSaw = true;
    };
    var x = -1;
    do {
        x++
        try {
            var Product = item.artLayers[x]
        } catch (e) {
            break;
        }
    }
    while (Product.name.indexOf("Product") == -1 || !Product.visible || isEmpty(Product));
    //==========================================================================================================================================\\
    if (item.artLayers[0].name.indexOf("Retouch") != -1) {
        try {
            item.artLayers[0].merge();
        } catch (e) {
            return;
        }
    }
    activeDocument.activeLayer = Product;
    if (Product.allLocked) {
        return;
    }
    var vinhdup = activeDocument.activeLayer.duplicate();
    vinhdup.name = "Sil_Shoulder silhouette";
    SelectForward();
    activeDocument.activeLayer.opacity = 50;
    activeDocument.activeLayer.invert();
    FlipHorizontal();
    frTransform();
    SelectBackward();
    liquify();
    SelectForward();
    activeDocument.activeLayer.remove();
};
//=======================================================================MAKE SILSHAPE===================================================================================
function makeSilShape() {
    if (documents.length < 1) {
        alert("Không mở hình rồi bấm action chi hả " + Getaccount(), "Ngọc Vinh", true);
        return;
    };
    try {
        check();
    } catch (e) {
        return;
    }
    var i = 0;
    do {
        i++;
        try {
            var Variant = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && Variant.allLocked);
    //
    var nonSaw = false;
    try {
        var rs = activeDocument.layerSets["Resources"]
        var item = Variant.layerSets["Item " + i];
        var shadow = Variant.layerSets["Shadow " + i];
        var bg = Variant.layerSets["Background " + i];
        var color = Variant.layerSets["Color " + i];
    } catch (e) {
        var nonSaw = true;
    };
    var x = -1;
    do {
        x++
        try {
            var vinh = item.artLayers[x]
        } catch (e) {
            break;
        }
    }
    while (vinh.name.indexOf("Product") == -1 || !vinh.visible || isEmpty(vinh));
    //==========================================================================================================================================\\
    var fillColor = new SolidColor();
    fillColor.rgb.red = 0;
    fillColor.rgb.green = 183;
    fillColor.rgb.blue = 26;
    selectLayer(vinh.id);
    DeselectPath();
    loadSelectionFormPath();
    if (!hasSelection()) {
        alert("Không có path");
        return;
    };
    addLayer("Zin");
    activeDocument.selection.fill(fillColor);
    executeAction(stringIDToTypeID('copyToLayer'), undefined, DialogModes.NO);
    activeDocument.activeLayer.name = "Zin";
    Translatesz(-100);
    activeDocument.activeLayer.merge();
    activeDocument.activeLayer.name = "Sil_Shoulder silhouette"
    setSelection();
    saveSelection("shape");
    activeDocument.selection.deselect();
    Stroke();
    selectLayer(vinh.id);
    liquify();
    setSelection("Sil_Shoulder silhouette");
    hideST(Variant, item, "Sil_");
    Feather(0.5);
    SelectTool('PbTl');
};
//=======================================================================COPY SILSHAPE===================================================================================
function copyBackFont() {
    if (documents.length < 1) {
        alert("Không mở hình rồi bấm action chi hả " + Getaccount(), "Ngọc Vinh", true);
        return;
    };
    try {
        check();
    } catch (e) {
        return;
    }
    var i = 0;
    do {
        i++;
        try {
            var Variant = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && Variant.allLocked);
    //
    var nonSaw = false;
    try {
        var rs = activeDocument.layerSets["Resources"]
        var item = Variant.layerSets["Item " + i];
        var shadow = Variant.layerSets["Shadow " + i];
        var bg = Variant.layerSets["Background " + i];
        var color = Variant.layerSets["Color " + i];
    } catch (e) {
        var nonSaw = true;
    };
    var x = -1;
    do {
        x++
        try {
            var vinh = item.artLayers[x]
        } catch (e) {
            break;
        }
    }
    while (vinh.name.indexOf("Product") == -1 || !vinh.visible || isEmpty(vinh));
    //==========================================================================================================================================\\
    var fillColor = new SolidColor();
    fillColor.rgb.red = 0;
    fillColor.rgb.green = 183;
    fillColor.rgb.blue = 26;
    if (item.artLayers[0].name == "Retouch") {
        item.artLayers[0].merge();
    };
    makeSnapshot("Return");
    try {
        selectDocument(-1);
    } catch (e) {
        alert(e.message);
        return;
    };
    try {
        selectChanel("shape");
        var channel3d = activeDocument.channels.getByName("shape");
    } catch (e) {
        var i = 0;
        do {
            i++;
            try {
                var variantpre = activeDocument.layerSets["Variant " + i];
            } catch (e) {
                break;
            }
        } while (activeDocument.layers.length > 3 && variantpre.allLocked);
        selectLayer("Item " + i);
        Merge(true);
        activeDocument.selection.copy();
        activeDocument.activeLayer.remove();
        selectDocument(1);
        selectLayer(vinh.id);
        Paste();
        activeDocument.activeLayer.name = "Sil_Shoulder silhouette";
        activeDocument.activeLayer.opacity = 55;
        activeDocument.activeLayer.invert();
        frTransform();
        hideST(Variant, item, "Sil_");
        return;
    };
    activeDocument.selection.load(channel3d);
    activeDocument.selection.copy();
    selectDocument(1);
    activeDocument.activeLayer = vinh;
    Paste();
    activeDocument.activeLayer.name = "Sil_Shoulder silhouette"
    setSelection();
    activeDocument.selection.fill(fillColor);
    activeDocument.selection.deselect();
    Stroke();
    activeDocument.activeLayer.opacity = 60;
    frTransform();
    setSelection();
    saveSelection("shape");
    activeDocument.selection.deselect();
    activeDocument.activeLayer = vinh;
    frTransform();
    liquify();
    hideST(Variant, item, "Sil_");
    setSelection("Sil_Shoulder silhouette");
    Feather(0.5);
    SelectTool('PbTl');
};
//=======================================================================FIXED SILSHAPE==================================================================================

function fixShape() {
    if (documents.length < 1) {
        alert("Không mở hình rồi bấm action chi hả " + Getaccount(), "Ngọc Vinh", true);
        return;
    };
    try {
        check();
    } catch (e) {
        return;
    }
    var i = 0;
    do {
        i++;
        try {
            var Variant = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && Variant.allLocked);
    //
    var nonSaw = false;
    try {
        var rs = activeDocument.layerSets["Resources"]
        var item = Variant.layerSets["Item " + i];
        var shadow = Variant.layerSets["Shadow " + i];
        var bg = Variant.layerSets["Background " + i];
        var color = Variant.layerSets["Color " + i];
    } catch (e) {
        var nonSaw = true;
    };
    var x = -1;
    do {
        x++
        try {
            var vinh = item.artLayers[x]
        } catch (e) {
            break;
        }
    }
    while (vinh.name.indexOf("Product") == -1 || !vinh.visible || isEmpty(vinh));
    var a = -1;
    do {
        a++
        try {
            var vinhs = item.artLayers[a]
        } catch (e) {
            break;
        }
    }
    while (!vinhs.visible || vinhs.allLocked || vinhs.grouped || vinhs.name.indexOf("Sil_") != -1 || vinh.name.indexOf("Stencil") != -1);
    makeSnapshot("Return");
    DeselectPath();
    selectLayer(item);
    Merge(true);
    activeDocument.selection.copy();
    activeDocument.activeLayer.remove();
    selectLayer(vinhs.id);
    Paste();
    loadSelectionFormPath()
    Feather(0.2, true);
    executeAction(stringIDToTypeID('copyToLayer'), undefined, DialogModes.NO);
    activeDocument.activeLayer.name = "Zin";
    SelectBackward();
    activeDocument.activeLayer.remove();
    SelectForward();
    setSelection();
    Feather(1);
    addLayerMask();
    linkMask(false);
    setSelection();
    SelectBackward();
    SelectForward();
    activeDocument.selection.expand(new UnitValue(15, "px"))
    setSourceHistory();
    liquify()
    activeDocument.activeLayer.merge();
    activeDocument.selection.deselect();
};
//==========================================================================HIGHPRO==================================================================================
function highProduct(value) {
    if (documents.length < 1) {
        alert("Không mở hình rồi bấm action chi hả " + Getaccount(), "Ngọc Vinh", true);
        return;
    };
    try {
        check();
    } catch (e) {
        return;
    }
    var giatriY = value;
    var vz = activeDocument.activeLayer.parent.name.slice(-1);
    var vr = parseInt(vz);
    var i = 0;
    do {
        i++;
        try {
            var vra = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && vra.allLocked);
    //=======================================================================================================================================================================================================================================================================================================\\
    try {
        var TestVariant = activeDocument.layerSets["Variant " + vr];
        var TestLock = activeDocument.activeLayer.parent;
        if (TestLock.allLocked || TestVariant.allLocked) {
            vr = i
        }
    } catch (e) {
        vr = i;
    }
    var Errorz = false;
    try {
        var Variant = activeDocument.layerSets["Variant " + vr];
        var color = Variant.layerSets["Color " + vr];
        var item = Variant.layerSets["Item " + vr];
        var shadow = Variant.layerSets["Shadow " + vr];
        var bg = Variant.layerSets["Background " + vr];
    } catch (e) {
        return;
    }
    //=======================================================================================================================================================================================================================================================================================================\\
    var z = -1;
    var n = -1
    do {
        z++
        try {
            var vinh = item.artLayers[z]
        } catch (e) {
            break;
        }
    }
    while (!vinh.visible || vinh.name.indexOf("Product") == -1);
    //=============================================================================================================================================================\\
    do {
        n++
        try {
            var vinhstc = item.artLayers[n];
        } catch (e) {
            break;
        };
    } while (vinhstc.name.indexOf("Stencil") == -1);
    try {
        activeDocument.activeLayer = vinhstc;
        executeAction(charIDToTypeID('past'), undefined, DialogModes.NO);
        activeDocument.activeLayer.name = "Stencil"
    } catch (e) {
        alert("Chưa copy stencil ảnh main", "Stencil Manual");
        return;
    };
    Link(color, item, bg, shadow, vinh);
    vinhstc.remove();
    var n = -1;
    do {
        n++
        try {
            var vinhstc = item.artLayers[n];
        } catch (e) {
            break;
        };
    } while (vinhstc.name.indexOf("Stencil") == -1 || !vinh.visible);
    HightPro(vinh, vinhstc, value);
    selectLayer(vinh.id);
};
//==========================================================================FREELANCER==================================================================================

function freelancerVinh() {
    try {
        Getlogcheck();
    } catch (e) {
        alert(e.message);
        return;
    }
    try {
        var flchannel = activeDocument.channels.getByName("VinhFreelancer")
        var fl = true;
    } catch (e) {
        var fl = false;
    }
    if (fl) {
        freelancerTwo();
        return;
    }
    makeSnapshot("Return");
    try {
        var colorstencil = new SolidColor();
        colorstencil.rgb.red = 255;
        colorstencil.rgb.green = 138;
        colorstencil.rgb.blue = 0;
        var blackColor = new SolidColor();
        blackColor.rgb.red = 102;
        blackColor.rgb.green = 102;
        blackColor.rgb.blue = 102;
        activeDocument.resizeImage(UnitValue(2048, "px"), null, null, ResampleMethod.BICUBIC);
        createSawSructure();
        var bg = activeDocument.layerSets["Variant 1"].layerSets["Background 1"];
        newSolidColorLayer(255, 255, 255);
        activeDocument.activeLayer.name = "BG_White";
        activeDocument.activeLayer.move(bg, ElementPlacement.INSIDE);
        selectLayer("Product");
        addLayer("Stencil");
        activeDocument.activeLayer.opacity = 40;
        activeDocument.selection.fill(colorstencil)
        panel();
        setSelectionToGuides();
        activeDocument.guides.removeAll();
        activeDocument.selection.fill(blackColor);
        activeDocument.activeLayer.visible = false;
        selectLayer("Product");
        saveSelection("VinhFreelancer");
        activeDocument.selection.deselect();
        if (activeDocument.height.value == 3073) {
            activeDocument.resizeImage(UnitValue(2048, "px"), UnitValue(3072, "px"), null, ResampleMethod.BICUBIC);
        }
    } catch (e) {
        alert(e)
    };
};

function freelancerTwo() {
    var i = 0;
    do {
        i++;
        try {
            var Variant = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && Variant.allLocked);
    //==========================================================================================================================================\\
    var newStencil = false;
    try {
        var color = Variant.layerSets["Color " + i];
        var item = Variant.layerSets["Item " + i];
        var shadow = Variant.layerSets["Shadow " + i];
        var bg = Variant.layerSets["Background " + i];
    } catch (e) {
        newStencil = true;
    }
    //==========================================================================================================================================\\
    var z = -1;
    var n = -1
    do {
        z++
        try {
            var vinh = item.artLayers[z]
        } catch (e) {
            break;
        }
    }
    while (!vinh.visible || vinh.name.indexOf("Product") == -1);
    //==========================================================================================================================================\\
    do {
        n++
        try {
            var vinhstc = item.artLayers[n];
        } catch (e) {
            break;
        };
    } while (vinhstc.name.indexOf("Stencil") == -1);
    //==========================================================================================================================================\\
    setSelectionToGuides();
    selectLayer(vinh.id);
    if (hasSelection()) {
        CenterTransform(vinh, vinhstc);
        selectLayer(vinhstc.id);
        selectST(vinhstc, 0.40)
        activeDocument.guides.removeAll();
        guideCreate();
        activeDocument.selection.deselect();
        vinhstc.visible = false;
        selectLayer(vinh.id)
    } else {
        Subject(true);
        CenterTransform(vinh, vinhstc);
        selectST(vinhstc, 0.40)
        activeDocument.guides.removeAll();
        guideCreate();
        activeDocument.selection.deselect();
        vinhstc.visible = false;
        selectLayer(vinh.id)
    };
};
//==========================================================================Auto RUN==================================================================================

function makeLayerRT() {
    if (documents.length < 1) {
        return;
    }
    var vz = activeDocument.activeLayer.parent.name.slice(-1);
    var vr = parseInt(vz);
    var i = 0;
    do {
        i++;
        try {
            var vra = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && vra.allLocked);
    //=======================================================================================================================================================================================================================================================================================================\\
    try {
        var TestVariant = activeDocument.layerSets["Variant " + vr];
        var TestLock = activeDocument.activeLayer.parent;
        if (TestLock.allLocked || TestVariant.allLocked) {
            vr = i
        }
    } catch (e) {
        vr = i;
    }
    var saw = true
    try {
        var Variant = activeDocument.layerSets["Variant " + vr];
        var color = Variant.layerSets["Color " + vr];
        var item = Variant.layerSets["Item " + vr];
        var shadow = Variant.layerSets["Shadow " + vr];
        var bg = Variant.layerSets["Background " + vr];
    } catch (e) {
        var saw = false;
    };
    var z = -1
    do {
        z++
        try {
            var vinh = item.artLayers[z];
        } catch (e) {
            break;
        }
    }
    while (!vinh.visible || vinh.allLocked);
    var now = activeDocument.activeLayer;
    if (!saw) {
        addLayer("Retouch");
        return;
    };
    if ((item.allLocked) && (color.allLocked) && (bg.allLocked) && (!shadow.allLocked)) {
        selectLayer(shadow.name);
        addLayer("Shadow");
        return;
    }
    if ((now.parent.name.indexOf("Item") != -1) || (now.typename == "LayerSet" && now.name.indexOf("Item") != -1)) {
        addLayer("Retouch");
    } else if ((now.parent.name.indexOf("Background") != -1) || (now.typename == "LayerSet" && now.name.indexOf("Background") != -1)) {
        addLayer("Retouch BG");
    } else if ((now.parent.name.indexOf("Shadow") != -1) || (now.typename == "LayerSet" && now.name.indexOf("Shadow") != -1)) {
        addLayer("Shadow");
    };
};

function VinhRT() {
    if (documents.length < 1) {
        return;
    };
    app.displayDialogs = DialogModes.NO;
    var banphim = keys;
    var i = 0;
    do {
        i++;
        try {
            var Variant = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && Variant.allLocked);
    //
    try {
        var rs = activeDocument.layerSets["Resources"];
        var color = Variant.layerSets["Color " + i];
        var item = Variant.layerSets["Item " + i];
        var shadow = Variant.layerSets["Shadow " + i];
        var bg = Variant.layerSets["Background " + i];
    } catch (e) {
        //
    };

    try {
        var lengthlayer = item.artLayers.length;
    } catch (e) {
        //
    };
    //=======================================================================================================================================================================================================================================================================================================\\
    var x = lengthlayer;
    var xA = lengthlayer;
    var a = -1;
    do {
        x--
        try {
            var xy = item.artLayers[x]
        } catch (e) {
            break;
        }
    }
    while (xy.visible == false)
    //
    do {
        xA--
        try {
            var xz = item.artLayers[xA]
        } catch (e) {
            break;
        }
    }
    while (!xz.visible || isEmpty(xz))
    //=======================================================================================================================================================================================================================================================================================================\\
    try {
        var vinh = item.artLayers[x];
    } catch (e) {
        //
    };
    do {
        a++
        try {
            var RT = item.artLayers[a];
        } catch (e) {
            break;
        }
    } while (RT.allLocked || !RT.visible)
    Pixelz(rs, Variant, color, item, shadow, bg, vinh, a, xz, lengthlayer)
};
//==========================================================================////==================================================================================

function autoSelect() {
    if (documents.length < 1) {
        return;
    };
    app.displayDialogs = DialogModes.NO;
    var guide = activeDocument.guides.length;

    var i = 0;
    var saw = true;
    do {
        i++;
        try {
            var Variant = activeDocument.layerSets["Variant " + i];
        } catch (e) {
            break;
        }
    } while (activeDocument.layers.length > 3 && Variant.allLocked);
    //
    try {
        var rs = activeDocument.layerSets["Resources"];
        var color = Variant.layerSets["Color " + i];
        var item = Variant.layerSets["Item " + i];
        var shadow = Variant.layerSets["Shadow " + i];
        var bg = Variant.layerSets["Background " + i];
    } catch (e) {
        var saw = false;
    };

    try {
        var lengthlayer = item.artLayers.length;
    } catch (e) {
        //
    };
    //=======================================================================================================================================================================================================================================================================================================\\
    var x = lengthlayer;
    var xA = lengthlayer;
    var a = -1;
    do {
        x--
        try {
            var xy = item.artLayers[x]
        } catch (e) {
            break;
        }
    }
    while (xy.visible == false)
    //
    do {
        xA--
        try {
            var xz = item.artLayers[xA]
        } catch (e) {
            break;
        }
    }
    while (!xz.visible || isEmpty(xz))
    //=======================================================================================================================================================================================================================================================================================================\\
    try {
        var vinh = item.artLayers[x];
    } catch (e) {
        //
    };
    do {
        a++
        try {
            var RT = item.artLayers[a];
        } catch (e) {
            break;
        }
    } while (RT.allLocked || !RT.visible || RT.grouped || RT.name.indexOf("Sil_") == 0);
    DeselectPath();
    if (!saw) {
        nonSaws();
        if (hasLayerMask(activeDocument.activeLayer.id) && activeDocument.activeLayer.name != "Retouching") {
            SelectTool('penTool')
            try {
                executeAction(stringIDToTypeID('clearAllGuides'), undefined, DialogModes.NO);
            } catch (e) {
                activeDocument.guides.removeAll();
            }

        } else if (activeDocument.activeLayer.name.indexOf("ProductRegion") != -1) {
            activeDocument.guides.removeAll();
            SelectTool('magicWandTool')
        } else {
            SelectTool('spotHealingBrushTool');
        }
        if (guide > 4 && activeDocument.activeLayer.name != "Retouching") {
            try {
                executeAction(stringIDToTypeID('clearAllGuides'), undefined, DialogModes.NO);
            } catch (e) {
                activeDocument.guides.removeAll();
            };
        };
        return;
    };
    hideAllLayers(Variant);
    if ((isEmpty(activeDocument.activeLayer)) && (!hasLayerMask()) &&
        (activeDocument.activeLayer.name.charAt(0) == "#") && (app.currentTool == "penTool") && CheckWpath()) {
        advMask();
        return;
    };
    SelectTool('spotHealingBrushTool');
    try {
        activeDocument.activeLayer = item.artLayers[a]; // chọn layer không khóa
        if (activeDocument.activeLayer.name == "Stencil") {
            SelectTool('moveTool')
        }
    } catch (e) {
        try {
            if ((item.allLocked) && (!shadow.allLocked) &&
                (color.allLocked) && (bg.allLocked)) {
                if (shadow.artLayers.length == 0) {
                    activeDocument.activeLayer = shadow;
                };
                if (shadow.artLayers.length > 0) {
                    activeDocument.activeLayer = shadow.artLayers[0]
                    if (activeDocument.activeLayer.name == "2. MEDIUM") {
                        ShadownSP(activeDocument, "2. MEDIUM")
                    };
                };
            };
        } catch (e) {}
    };
    if (guide > 4) {
        try {
            executeAction(stringIDToTypeID('clearAllGuides'), undefined, DialogModes.NO);
        } catch (e) {
            activeDocument.guides.removeAll();
        };
    };
    hideST(Variant, item, "Sil_");
    FlipToProduct();
    try {
        if (keys.keyName == "Accent") {
            activeDocument.activeLayer = vinh;
            if (activeDocument.activeLayer.name.indexOf("Product") != -1) {
                guideCreateInStencil();
            }
        }
    } catch (e) {

    }
    try {
        if (lengthlayer < 1 && shadow.allLocked && !item.allLocked && !bg.allLocked && !color.allLocked && getcolorlayer(shadow.name) == "red") {
            upVariantnoStencil();
            activeDocument.activeLayer = item.artLayers[a];
            return;
        };
    } catch (e) {
        //
    };
    try {
        if ((vinh.name.indexOf("Product") != -1) && color.allLocked == false && shadow.allLocked && bg.allLocked == false && item.allLocked == false && getcolorlayer(item.name) == "grain" && hasLayerMask(vinh.id) && item.artLayers[0].name == "Stencil" && getcolorlayer(item.artLayers[0].id) == "red") {
            fitOnView();
            highProduct(0.35);
            return;
        }
    } catch (e) {
        //
    };

};

//==========================================================================USER NAME==================================================================================

var userName = [
    "Vo Thi Thanh Hien",
    "Nguyen Thanh Thien",
    "Phan Quoc Bao",
    "Dang Thi Hong Phuong",
    "Che Van Suong",
    "Huynh Van Nhat",
    "Nguyen Duy 2 Long",
    "Nguyen Trung Cuong",
    "Nguyen Duc Khanh",
    "Nguyen Pho",
    "Le Tran Cong Hoang",
    "Nguyen Ngoc Tuan",
    "Doan Cong Tuan",
    "Le Cong Vinh",
    "Phan Thanh Nha",
    "Le Thi Le Quy",
    "Tong Nguyen Phuoc Thuong"
];
var Oalolo = [

];
/*
UserWr(userName, "Vo Thi Thanh Hien");
UserWr(userName, "Nguyen Thanh Thien");
UserWr(userName, "Phan Quoc Bao",);
UserWr(userName, "Dang Thi Hong Phuong");
UserWr(userName, "Che Van Suong");
UserWr(userName, "Huynh Van Nhat");
UserWr(userName, "Nguyen Duy 2 Long");
UserWr(userName, "Nguyen Trung Cuong");
UserWr(userName, "Nguyen Duc Khanh");
UserWr(userName, "Nguyen Pho");
UserWr(userName, "Le Tran Cong Hoang");
UserWr(userName, "Nguyen Ngoc Tuan");
UserWr(userName, "Doan Cong Tuan");
UserWr(userName, "Le Cong Vinh");
UserWr(userName, "Phan Thanh Nha");
UserWr(userName, "Le Thi Le Quy");
UserWr(userName, "Tong Nguyen Phuoc Thuong");
*/
for (xz = 0; xz < userName.length; xz++) {
    var user = userName[xz];
    Oalolo.push(checkName(user))
}
// shadownNatural();
dustScratches(10);
FrequencySeparation();
// Wiethe();
// stencilAllInOne(0.45);
// dropshadow3d();
// copyfile3d()
// advMask();
// flipShape();
// makeSilShape();
// copyBackFont();
// fixShape()
// MultiVariant(0.45, true)
// highProduct(value)
// freelancerVinh()
// upVariantnoStencil();
// ScriptsEvent(filename, account);
// removeScriptEvent(account);
// VinhRT();
// autoSelect();
// fourVarNoMask(0.40);
// guideCreateInStencil()