var flagLogin = new File("//172.16.2.2/Academy/Hiep/logNew.txt")
var date = new Date()
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
if (year <= 2024 && month < 9 && flagLogin.exists) {
    frame();
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
            var lengthlayer = activeDocument.activeLayer.layers.length;
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

// pic1Btn.onClick = function () {
//     var pic1File;
//     pic1File = new File;
//     pic1File = pic1File.openDlg("Select Background Image", "Images: *.png; *.jpeg; *.jpg")
//     if (pic1File != null) { pic1Btn.text = File.decode(pic1File.name) }
//     else {
//         pic1File = new File;
//         pic1Btn.text = "No file selected";
//     }
// }

// pic2Btn.onClick = function () {
//     var pic2File;

//     pic2File = new File;
//     pic2File = pic2File.openDlg("Select Background Image", "Images: *.png; *.jpeg; *.jpg")
//     if (pic2File != null) { pic2Btn.text = File.decode(pic2File.name) }
//     else {
//         pic2File = new File;
//         pic2Btn.text = "No file selected";
//     }
// }
