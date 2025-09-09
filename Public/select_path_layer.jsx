frame();
function frame() {
    var dlg = new Window("dialog", "Select Layer/Path");
    btnPnl = dlg.add("panel", undefined, "");
    //pic1Btn = btnPnl.add("button", undefined, "Image 1");
    //pic2Btn = btnPnl.add("button", undefined, "Image 2");
    // btnPnl = dlg.add("panel", undefined, "Layer");
    buildListLayer = btnPnl.add("dropdownlist", undefined, listLayer());
    buildListLayer.selection = "abc";
    buildListLayer.preferredSize = [80, 20];
    // btnPnl = dlg.add("panel", undefined, "Path");
    buildListPath = btnPnl.add("dropdownlist", undefined, listPath());
    buildListLayer.selection = 0;
    buildListPath.preferredSize = [80, 20];

    cancelBtn = btnPnl.add("button", undefined, "Cancel", { name: "cancel" });

    //lua chon theo list layer
    buildListLayer.onChange = function () {
        var selectListLayer = buildListLayer.selection;
        selectLayer(selectListLayer);
        dlg.close();
    }
    //lua chon theo list path
    buildListPath.onChange = function () {
        var selectList = buildListPath.selection;
        selectPath(selectList);
        dlg.close();
    }


    dlg.show();
}


//list pathitems
function listPath() {
    var lispath = new Array();
    var lengthPath = activeDocument.pathItems.length;
    for (var i = 0; i <= lengthPath - 1; i++) {
        var namePath = activeDocument.pathItems[i].name;
        // if (setSelectionPath(namePath) == false) {
            lispath.push(namePath);
        // }
    }
    return lispath;
}


//list layer
function listLayer() {
    var listlayer = new Array();
    if (selectLayer("Item 1") == true) {
        var lengthlayer = activeDocument.activeLayer.layers.length;
        for (var index = 0; index <= lengthlayer - 1; index++) {
            var nameLayer = activeDocument.activeLayer.layers[index].name;
            listlayer.push(nameLayer);
        }
    } else if (selectLayer("cc") == true) {
        var lengthlayer = activeDocument.activeLayer.layers.length;
        for (var index = 0; index <= lengthlayer - 1; index++) {
            var nameLayer = activeDocument.activeLayer.layers[index].name;
                listlayer.push(nameLayer);
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
