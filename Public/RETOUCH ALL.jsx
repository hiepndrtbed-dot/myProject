/// ---------------------- QUY UOC ------------------
// 1. RETOUCH BG GIA TRI  = 1 ...................
// 1. RETOUCH TIF GIA TRI  = 2 ...................
// 1. RETOUCH SSENCE GIA TRI  = 3 ...................
// 1. RETOUCH SHAPE-3D  GIA TRI  = 4 ...................
// 1. RETOUCH FW  GIA TRI  = 5 ...................


// var thePathActions = "//appdn/Academy/Automation by Academy/Actions";
//var thePathActions = "//172.16.2.2/Automation by Academy/Actions";
var thePathActions = "//172.16.2.2/Academy/Automation_by_Academy/Actions";
// (function () {
//     var flagLogin = new File("//172.16.2.2/Academy/Hiep/logNew.txt")
//     if (flagLogin.exists) {
//         main()
//         //  alert("Ðã update lôi run 2 lan nhe! Thong bao nay hien 3 phut Se tat!")
//     }
// })()

var flagLogin = new File("//172.16.2.2/Academy/Hiep/logNew.txt")
var date = new Date()
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
if (year <= 2024 && month < 9 && flagLogin.exists) {
    main()
}

function main() {
    logAction("logActRetouchAll")
    slectiveAction();
}


function slectiveAction() {
    switch (checkInput()) {
        // Bacground Retouch
        case 1:
            retouchBG()
            break;
        //Retouch tif 2
        case 2:
            try {
                if (verifyPathNameExists("Work Path")) {
                    loadAction("Tip path", "Tif 2.atn");
                } else if (activeDocument.quickMaskMode) {
                    loadAction("Tip no path", "Tif 2.atn");
                } else {
                    setSelectedLayer('background');
                    activeDocument.activeLayer.visible = true;
                    setSelectedLayer('clone');
                    loadAction("RT Dust is not lock", "PUBLIC.atn");
                    activeDocument.selection.load(activeDocument.channels.getByName("crop"));
                }
            } catch (error) { }
            break;
        //Retouch Ssense
        case 3:
            activeDocument.guides.removeAll();
            try {
                setSelectedLayer('Retouching');
                if (checkAlllockLayer() == true) {
                    loadAction("Fix SS Model", "SSense.atn");
                } else if (hasSelection() == false && checkSelectionName('tem') == false) {
                    setSelectedLayer('Retouching');
                    selectionSubjectKillSsesen();
                    break;
                } else if (checkSelectionName('tem') == true) {
                    loadAction("RT Dust isTif && SS", "PUBLIC.atn");
                } else if (setSelectedLayer('Resized') == true) {
                    loadAction("Model", "SSense.atn");
                    if (setSelectedLayer('Dark') == true) {
                        activeDocument.activeLayer.remove();
                    }
                } else {
                    loadAction("ss ac", "SSense.atn");
                    activeDocument.selection.load(activeDocument.channels.getByName("Crop"));
                    //crop tu vung chon
                    var bound = activeDocument.selection.bounds;
                    cropToSelection(bound[1], bound[0], bound[3], bound[2]);
                    deleteChannel("Crop");
                    break;
                }
            } catch (error) { }
            if (checkSelectionName("Crop") == true) {
                activeDocument.selection.load(activeDocument.channels.getByName("Crop"));
                //crop tu vung chon
                var bound = activeDocument.selection.bounds;
                cropToSelection(bound[1], bound[0], bound[3], bound[2]);
                deleteChannel("Crop");
                loadAction("RT Dust isTif && SS", "PUBLIC.atn");
            }
            activeDocument.activeLayer = activeDocument.layers[0];
            break;
        //Retouch Shape
        case 4:
            if (verifyPathNameExists("Work Path")) {
                if (checkAlllockLayer() == true) {
                    loadAction("has_left_right", "3D - shape.atn");
                } else {
                    loadAction("3D", "3D - shape.atn");
                }
            } else if (!hasSelection()) {
                newGuideLayout(true, 4, 15, true, 30);
                liquify()
            } else {
                bounds = activeDocument.selection.bounds
                if (bounds[0] <= activeDocument.width / 2.5) {
                    loadAction("hasSelection_right", "3D - shape.atn");
                } else {
                    loadAction("hasSelection_left", "3D - shape.atn");
                }
            }
            break;
        case 5:
            loadAction("Fix error FW and Shape", "PUBLIC.atn");
            break;
        //Retouch shadow 1
        case 6:
            if (activeDocument.activeLayer.layers.length == 0 && setSelectedLayer("Natural") == false && setSelectedLayer("Channel") == false) {
                if (checkLayerName('Variant 1', 'Item 1', "Stencil") == true) {
                    activeDocument.activeLayer.visible = false;
                }
                loadAction("copy bong", "Shadow.atn");
            } else if (setSelectedLayer("temp_shadow") == true && activeDocument.quickMaskMode == true) {
                if (verifyPathNameExists("Work Path")) {
                    loadAction("natural path", "Shadow.atn");
                } else {
                    loadAction("natural", "Shadow.atn");
                }
                selectLayer("Natural")
                loadAction("Check nen", "Shadow.atn");
            } else if (checkSelectionName("selection") == true && setSelectedLayer("Natural") == true) {
                loadAction("Bong channel", "Shadow.atn");
            }
            break;
        //Retouch shadow 2
        case 8:
            if (activeDocument.activeLayer.layers.length == 0 && setSelectedLayer("Natural") == false && setSelectedLayer("Channel") == false) {
                if (checkLayerName('Variant 2', 'Item 2', "Stencil") == true) {
                    activeDocument.activeLayer.visible = false;
                }
                loadAction("copy bong 2", "Shadow.atn");
            } else if (setSelectedLayer("temp_shadow") == true && activeDocument.quickMaskMode == true) {
                if (verifyPathNameExists("Work Path")) {
                    loadAction("natural path", "Shadow.atn");
                } else {
                    loadAction("natural", "Shadow.atn");
                }
                if (checkLayerName('Variant 2', 'Item 2', "Stencil") == false) {
                    activeDocument.activeLayer.visible = true;
                }
                loadAction("Check nen 2", "Shadow.atn");
            } else if (checkSelectionName("selection") == true && setSelectedLayer("Natural") == true) {
                loadAction("Bong channel", "Shadow.atn");
            }
            break;
        //Retouch Ssense 2
        case 7:
            try {
                setSelectedLayer('Retouching');
                if (hasLayerMask() == true) {
                    if (verifyPathNameExists("Work Path")) {
                        loadAction("Model_Struct_V2_Path", "SSense.atn");
                        loadAction("RT Dust is not lock SS", "PUBLIC.atn");
                    } else if (checkAlllockLayer() == false) {
                        loadAction("Model_Struct_V2", "SSense.atn");
                        loadAction("RT Dust is not lock SS", "PUBLIC.atn");
                    } else {
                        loadAction("Model_Struct_V2 Headshots", "SSense.atn");
                        loadAction("RT Dust is not lock SS", "PUBLIC.atn");
                    }
                } else {
                    loadAction("RT Dust is not lock", "PUBLIC.atn");
                }
            } catch (error) { }

            break;
        //Dust kill
        case 9:
            wietheModel()
            break;
        case 0:
            if (setSelectedLayer('clone') == true) {
                activeDocument.quickMaskMode = false;
                setSelectedLayer('background');
                activeDocument.activeLayer.visible = true;
                setSelectedLayer('clone');
                loadAction("RT Dust not lock", "PUBLIC.atn");
            } else if (setSelectedLayer('Item 1') == true) {
                if (setSelectedLayer('Stencil') == true) {
                    setSelectedLayer('Item 1');
                    activeDocument.activeLayer = activeDocument.activeLayer.artLayers[1];
                    loadAction("RT Dust is lock", "PUBLIC.atn");
                } else {
                    activeDocument.activeLayer = activeDocument.activeLayer.artLayers[0];
                    loadAction("RT Dust is lock", "PUBLIC.atn");
                }
            } else {
                loadAction("RT Dust is not lock", "PUBLIC.atn");
            }
            break;
        default:
            break;
    }
}//end selctiveAction


function checkInput() {
    var result = 0;
    if (setSelectedLayer('Variant 1') == true && !activeDocument.activeLayer.allLocked) {
        setSelectedLayer('Item 1');
        //kiem tra dau vao la Shape
        if ((activeDocument.activeLayer.layers.length == 1 || setSelectedLayer("Sil_Shoulder silhouette") == true)) {
            setSelectedLayer('Product');
            result = 4;
            //kiem ttra dau vao la retouch BG
        } else if (setSelectedLayer('Retouch BG') == true) {
            result = 1;
            //kiem tra dau vao la retouch FW
        } else if (verifyPathNameExists("Work Path") && layerLocker("Item 1") == false && setSelectedLayer("Retouch")) {
            if (checkAlllockLayer() == true) {
                result = 5;
            }
            //kiem ttra dau vao la shadow 1
        } else if (setSelectedLayer('Shadow 1') == true && !activeDocument.activeLayer.allLocked) {
            result = 6;
        }
    } else {
        //kiem ttra dau vao la shadow 2
        if (setSelectedLayer('Shadow 2') == true && !activeDocument.activeLayer.allLocked) {
            result = 8;
        }
        //kiem tra dau  vao la Retouch BG
        if (setSelectedLayer('Retouch BG') == true) {
            result = 1;
        }

        //kiem tra dau  vao la retouch tif
        if (setSelectedLayer('clone') == true) {
            result = 2;
        }
        //kiem tra dau vao la retouch Ssence
        else if (setSelectedLayer('Retouching') == true || setSelectedLayer('resized rotated retouched')) {
            // result = 3;
            result = 7;
        }
        else if (setSelectedLayer('Schatten') == true && setSelectedLayer('230') == true) {
            result = 9
        }
    }
    return result;
}

//Retouch BG
function retouchBG() {

    const versionTo = " By Acad -- Version: 1.0 -- "
    
    const doc = activeDocument;
    preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeunits = TypeUnits.PIXELS;
    //DN
    fileImages = "//172.16.2.2/Academy/Automation_by_Academy/Images/Background/"
    //HN
    // fileImages = "//172.16.0.13/Academy/Automation_by_Academy/Images/Background/"
    
    main();
    function main() {
        // body...
        logAction("logRetouchBackground")
        selectLayer("Retouch BG");
        var pointLayerBG = doc.activeLayer.bounds;
        if ((pointLayerBG[1] != 0 || pointLayerBG[2] != 0) && checkSelectionName("Selection")) {
            if (verifyPathNameExists("Work Path") && checkSelectionName("Selection")) {
                app.activeDocument.pathItems["Work Path"].makeSelection(0.0);
                app.activeDocument.pathItems["Work Path"].deselect();
                //Trừ vùng chọn.
                subtractSelection("Selection");
                //Layer via copy
                action("CpTL");
                action("CpTL");
                doc.selection.load(doc.channels.getByName("Selection"));
                doc.selection.expand(5);
                action("Dlt ");
                clippingMask();
                doc.activeLayer.translate(0, 20);
                action("Mrg2");
                setSelectionLayer();
                action("MrgL");
            } else {
                // saveHistory();
                selectLayer("Retouch BG");
                if (checkSelectionName("Selection")) {
                    doc.selection.load(activeDocument.channels.getByName("Selection"))
                } else {
                    doc.activeLayer = doc.layerSets["Variant 1"].layerSets["Item 1"].artLayers["Product"];
                    loadSelectionMask()
                    doc.activeLayer = doc.layerSets["Variant 1"].layerSets["Background 1"].artLayers["Retouch BG"];
                }
                doc.selection.expand(1);
                doc.selection.feather(.5);
                doc.selection.invert();
                action("CpTL");
                cameraRaw(100, 0);
                addNoise(0.5, true, 39853633);
            }
        } else if (pointLayerBG[1] != 0 || pointLayerBG[2] != 0) {
            doc.selection.selectAll()
            doc.selection.clear()
            try {
                loadSelectionMask()
                doc.selection.invert()
                deleteMask()
                saveChannel("Selection")
                doc.selection.deselect()
                checkVariant()
            } catch (error) {
                autoCutout(true)
            }
        } else {
            makeHistoryRandum();
            checkVariant();
            try { app.activeDocument.pathItems["Work Path"].remove(); } catch (error) { }
        }
    }
    function checkVariant() {
        // body...
        var grVariantRetouch = null;
        var grColorRetouch = null;
        var grItemRetouch = null;
        var grBgRetouch = null;
        var layerRetouch = null;
        var lengthVariant = doc.layerSets.length - 2;
        //Cach 2
        if (lengthVariant == 1) {//neu chi ton tai variant 1
            grVariantRetouch = doc.layerSets["Variant 1"];
            grColorRetouch = grVariantRetouch.layerSets["Color 1"];
            grItemRetouch = grVariantRetouch.layerSets["Item 1"];
            grBgRetouch = grVariantRetouch.layerSets["Background 1"];
            layerRetouch = grVariantRetouch.layerSets["Item 1"].artLayers["Retouch BG"];
        } else {//neu ton tai nhieu variant
            doc.activeLayer = doc.layerSets["Variant 1"];
            try { var checkExistRetouchBG = doc.layerSets["Variant 1"].layerSets["Item 1"].artLayers["Retouch BG"]; } catch (error) { }
            if (!doc.activeLayer.allLocked && checkExistRetouchBG) {//Variant 1 ton tai Retouch BG
                grVariantRetouch = doc.layerSets["Variant 1"];
                grColorRetouch = grVariantRetouch.layerSets["Color 1"];
                grItemRetouch = grVariantRetouch.layerSets["Item 1"];
                grBgRetouch = grVariantRetouch.layerSets["Background 1"];
                layerRetouch = grVariantRetouch.layerSets["Item 1"].artLayers["Retouch BG"];
    
                //check Varian * tồn tại mask không, nếu tồn tại thì lưu selection
                existMaskProductVariant(2);
                visibleGroup("Variant 2");
            } else {//Variant 2 ton tai BG
                grVariantRetouch = doc.layerSets["Variant 2"];
                grColorRetouch = grVariantRetouch.layerSets["Color 2"];
                grItemRetouch = grVariantRetouch.layerSets["Item 2"];
                grBgRetouch = grVariantRetouch.layerSets["Background 2"];
                layerRetouch = grVariantRetouch.layerSets["Item 2"].artLayers["Retouch BG"];
    
                enableGroup("Variant 2");
                existMaskProductVariant(1);
            }
        }
        if (layerRetouch != null) {
            doc.activeLayer = grItemRetouch;
            var lengItemRetouch = doc.activeLayer.layers.length;
            for (var i = 1; i < lengItemRetouch; i++) {
                if (doc.activeLayer.artLayers[i].name.search("Product") != (-1)) {
                    doc.activeLayer = doc.activeLayer.artLayers[i];
                    productCurent = i;
                    break;
                }
            }
            if (!hasMask()) {//Product khong ton tai mask
                for (var index = 1; index < 2; index++) {
                    if (hasVectorMask()) {
                        loadSelectionVectorMask();
                        try { doc.channels.getByName("Selection").remove(); } catch (err) { }
                        selectionMask = saveChannel("Selection");
                        doc.selection.selectAll();
                        doc.selection.copy();
                        doc.selection.deselect();
                        doc.activeLayer = grBgRetouch;
                        pasteFoder();
                        doc.activeLayer = layerRetouch;
                        action("CpTL");
                        mergeLayer();
                        action("Mrg2");
                        doc.activeLayer = grBgRetouch.artLayers[0];
                        doc.activeLayer.remove();
                        try { doc.layerSets.getByName("Resources").artLayers.getByName("Darken Check").visible = true; } catch (err) { }
                        doc.activeLayer = layerRetouch;
                        loadActionMask();
                        try { doc.selection.load(activeDocument.channels.getByName("Selection")); } catch (error) { }
                        doc.selection.invert();
                        addMask();
                        selectRGB();
                        break;
                    }
                    if (checkSelectionName("Selection") == true) {//Ton tai channel
                        try { doc.layerSets.getByName("Resources").artLayers.getByName("Darken Check").visible = false; } catch (err) { }
                        grColorRetouch.visible = false
                        doc.selection.deselect()
                        doc.activeLayer = layerRetouch
                        action("CpTL")
                        mergeLayer()
                        action("Mrg2")
                        grColorRetouch.visible = true
                        doc.activeLayer = grColorRetouch
                        colorRetouchBG()
                        try { doc.layerSets.getByName("Resources").artLayers.getByName("Darken Check").visible = true; } catch (err) { }
                        doc.activeLayer = layerRetouch
                        loadAction()
                    } else if (hasSelection()) { //Ton tai vung chon
                        try { doc.channels.getByName("Selection").remove(); } catch (err) { }
                        selectionMask = saveChannel("Selection");
                        try { doc.layerSets.getByName("Resources").artLayers.getByName("Darken Check").visible = false; } catch (err) { }
                        grColorRetouch.visible = false
                        doc.selection.deselect()
                        doc.activeLayer = layerRetouch
                        action("CpTL")
                        mergeLayer()
                        action("Mrg2")
                        grColorRetouch.visible = true
                        doc.activeLayer = grColorRetouch
                        colorRetouchBG()
                        try { doc.layerSets.getByName("Resources").artLayers.getByName("Darken Check").visible = true; } catch (err) { }
                        doc.activeLayer = layerRetouch;
                        loadAction()
                    } else {//ko ton tai channel selection va ko co vung chon
                        autoCutout(true)
                        grColorRetouch.visible = false
                        try { doc.layerSets.getByName("Resources").artLayers.getByName("Darken Check").visible = false; } catch (err) { }
                    }
                }//end for
            } else {//Product co mask
                //save selection mask
                loadSelectionMask()
                selectionMask = saveChannel("Selection")
                doc.selection.deselect()
                var nameHistory = makeHistoryRandum()
                disableMask()
                try { doc.layerSets.getByName("Resources").artLayers.getByName("Darken Check").visible = false; } catch (err) { }
                grColorRetouch.visible = false
                doc.activeLayer = layerRetouch
                mergeLayer()
                deselectPath()
                doc.selection.selectAll()
                doc.selection.copy()
                selectHistory(nameHistory)
                doc.activeLayer = layerRetouch;
                doc.activeLayer.remove()
                doc.activeLayer = grBgRetouch
                pasteFoder()
                doc.activeLayer.name = "Retouch BG"
                loadActionMask()
                if (setSelectedLayer("Desaturated Background") == true) {
                    doc.selection.load(doc.channels.getByName("Selection"));
                    doc.selection.expand(1)
                    fillColor(0, 0, 0)
                    doc.selection.deselect()
                    doc.activeLayer = grBgRetouch
                    doc.activeLayer = doc.activeLayer.artLayers[0]
                }
            }
        }//end If layerRetouch
    }
    
    function loadAction() {
        try { doc.selection.load(activeDocument.channels.getByName("Selection")); } catch (error) { }
        doc.selection.expand(5)
        doc.selection.feather(.5)
        doc.selection.invert()
        saveHistory()
        addMask()
        loadSelectionMask()
        selectRGB()
        layerViaCopy()
        // cameraRaw(100, 30);
        dust(8, 4)
        merge()
    
    }
    
    function loadActionMask() {
        try { doc.selection.load(activeDocument.channels.getByName("Selection")); } catch (error) { }
        doc.selection.expand(5);
        doc.selection.feather(.5);
        doc.selection.invert();
        saveHistory();
        action("CpTL");
        dust(8, 4);
        merge();
    }
    
    function addNoise(noise, monochromatic, FlRs) {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };
    
        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };
    
        var descriptor = new ActionDescriptor();
    
        descriptor.putEnumerated(c2t("Dstr"), c2t("Dstr"), s2t("gaussianDistribution"));
        descriptor.putUnitDouble(s2t("noise"), s2t("percentUnit"), noise);
        descriptor.putBoolean(s2t("monochromatic"), monochromatic);
        descriptor.putInteger(c2t("FlRs"), FlRs);
        executeAction(s2t("addNoise"), descriptor, DialogModes.NO);
    }
    
    function layerViaCopy() {
        var idCpTL = charIDToTypeID("CpTL");
        executeAction(idCpTL, undefined, DialogModes.NO);
    }
    function filter() {
        try {
            var idLqFy = charIDToTypeID("DstS");
            executeAction(idLqFy, undefined, DialogModes.ALL);
        } catch (error) { }
    }
    
    //check mask Product vairant
    function existMaskProductVariant(number) {
        // body...
        doc.activeLayer = doc.layerSets["Variant " + number].layerSets["Item " + number];
        var lengthItemCurent = doc.activeLayer.layers.length;
        for (var i = 0; i < lengthItemCurent; i++) {
            if (doc.activeLayer.artLayers[i].name.search("Product") == 0) {
                doc.activeLayer = doc.activeLayer.artLayers[i];
                if (hasMask()) {
                    loadSelectionMask();
                    try { doc.channels.getByName("Selection").remove(); } catch (err) { }
                    selectionMask = saveChannel("Selection");
                    doc.selection.deselect();
                    break;
                } else if (hasVectorMask()) {
                    loadSelectionVectorMask();
                    try { doc.channels.getByName("Selection").remove(); } catch (err) { }
                    selectionMask = saveChannel("Selection");
                    doc.selection.deselect();
                    break;
                }
            }
        }
    }
    
    function visibleGroup(Group) {
        if (!Group) {
            for (var i = 1; i < totalVar; i++) {
                setSelectedLayer("Variant " + String(i + 1)) == true ? activeDocument.activeLayer.visible = false : "";
            }
        } else {
            setSelectedLayer(Group);
            activeDocument.activeLayer.visible = false;
        }
    }
    
    function enableGroup(Group) {
        selectLayer(Group);
        doc.activeLayer.visible == true;
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
    
    //Color step background
    function colorRetouchBG() {
        if (setSelectedLayer("Desaturated Background") == true) {
            if (checkSelectionName("Selection") == true) {
                doc.selection.load(doc.channels.getByName("Selection"));
                doc.selection.expand(1);
                fillColor(0, 0, 0);
                doc.selection.deselect();
            }
        } else {
            //open dialog
            var dlg = new Window("dialog", "Select Background Color");
            dlg.text = "BACKGROUND RETOUCH"
            // dialog.preferredSize.width = 700
            dlg.orientation = "column"
            dlg.alignChildren = ["left", "center"]
    
            //Nhóm button 1
            btnGroup = dlg.add("group");
            btnGroup.orientation = "row"
            btnGroup.alignChildren = ["left", "center"]
    
            //Add bottom
            try {
                Color1Btn = btnGroup.add("button", undefined, "Color 1 ");
                Color1Btn.preferredSize = [60, 20];
                btnGroup.add("image", [0, 0, 30, 40], fileImages + "color1.png");
                Color2Btn = btnGroup.add("button", undefined, "Color 2 ");
                Color2Btn.preferredSize = [60, 20];
                btnGroup.add("image", [0, 0, 30, 40], fileImages + "color2.png");
                Color3Btn = btnGroup.add("button", undefined, "Color 3 ");
                Color3Btn.preferredSize = [60, 20];
                btnGroup.add("image", [0, 0, 30, 40], fileImages + "color3.png");
                Color4Btn = btnGroup.add("button", undefined, "Color 4 ");
                Color4Btn.preferredSize = [60, 20];
                btnGroup.add("image", [0, 0, 30, 40], fileImages + "color4.png");
            } catch (error) { }
    
            //function cho Group 1
            Color1Btn.onClick = function () {
                dlg.close();
                setColorHueBG(false, -7, -15, 15, "color1.jpg", 83, 83);
            }
    
            Color2Btn.onClick = function () {
                dlg.close();
                setColorHueBG(false, 0, -100, 28, "color2.jpg", 80, 80);
            }
    
            Color3Btn.onClick = function () {
                dlg.close();
                setColorHueBG(false, 0, -100, 51, "color3.jpg", 80, 80);
            }
    
            Color4Btn.onClick = function () {
                dlg.close();
                setColorHueBG(false, 80, -73, 8, "color4.jpg", 83, 83);
            }
    
            // Nhóm botton 2
            btnGroup2 = dlg.add("group");
            btnGroup2.orientation = "row"
            btnGroup2.alignChildren = ["left", "center"]
    
    
            // add botton 2
            try {
                Color1Btn2 = btnGroup2.add("button", undefined, "Color 5 ");
                Color1Btn2.preferredSize = [60, 20];
                btnGroup2.add("image", [0, 0, 30, 40], fileImages + "color5.png");
                Color2Btn2 = btnGroup2.add("button", undefined, "Color 6 ");
                Color2Btn2.preferredSize = [60, 20];
                btnGroup2.add("image", [0, 0, 30, 40], fileImages + "color6.png");
                Color3Btn2 = btnGroup2.add("button", undefined, "Color 7 ");
                Color3Btn2.preferredSize = [60, 20];
                btnGroup2.add("image", [0, 0, 30, 40], fileImages + "color7.png");
                Color4Btn2 = btnGroup2.add("button", undefined, "Color 8 ");
                Color4Btn2.preferredSize = [60, 20];
                btnGroup2.add("image", [0, 0, 30, 40], fileImages + "color8.png");
            } catch (error) { }
    
            //function cho Group 2
            Color1Btn2.onClick = function () {
                dlg.close();
    
                setColorHueBG(false, 0, -73, 8, "color5.jpg", 80, 80);
            }
    
            //color 6
            Color2Btn2.onClick = function () {
                dlg.close();
                setColorHueBG(false, 0, -100, 28, "color6.jpg", 80, 80);
    
            }
    
            //color 7
            Color3Btn2.onClick = function () {
                dlg.close();
                setColorHueBG(false, 13, 0, -2, "color7.jpg", 80, 80);
            }
    
            //color 8
            Color4Btn2.onClick = function () {
                dlg.close();
                setColorHueBG(true, 240, 4, 26, "color8.jpg", 80, 80);
            }
    
            //END GROUP 2 =============================
    
            //GROUP 3
            btnGroup3 = dlg.add("group");
            btnGroup3.orientation = "row"
            btnGroup3.alignChildren = ["left", "center"]
    
            // add botton 3
            try {
                Color1Btn3 = btnGroup3.add("button", undefined, "Color 9 ");
                Color1Btn3.preferredSize = [60, 20];
                btnGroup3.add("image", [0, 0, 30, 40], fileImages + "color9.png");
                Color3Btn3 = btnGroup3.add("button", undefined, "Color 10");
                Color3Btn3.preferredSize = [60, 20];
                btnGroup3.add("image", [0, 0, 30, 40], fileImages + "color10.png");
                Color3Btn3 = btnGroup3.add("button", undefined, "Color 11");
                Color3Btn3.preferredSize = [60, 20];
                btnGroup3.add("image", [0, 0, 30, 40], fileImages + "color11.png");
                Color4Btn3 = btnGroup3.add("button", undefined, "Color 12");
                Color4Btn3.preferredSize = [60, 20];
                btnGroup3.add("image", [0, 0, 30, 40], fileImages + "color12.png");
            } catch (error) { }
    
            //function cho Group 3
    
            //color 9
            Color1Btn3.onClick = function () {
                dlg.close();
                setColorHueBG(false, 0, -100, 25, "color9.jpg", 80, 80);
            }
            //color 10
            Color3Btn3.onClick = function () {
                dlg.close();
                setColorHueBG(false, 0, -74, 71, "color10.jpg", 80, 80);
    
            }
    
            //color 11
            Color3Btn3.onClick = function () {
                dlg.close();
                setColorHueBG(false, 13, 0, -3, "color11.jpg", 80, 80);
            }
    
            //color 12
            Color4Btn3.onClick = function () {
                dlg.close();
                setColorHueBG(false, 0, -100, 28, "color12.jpg", 80, 80);
            }
    
    
            ///=============END GROUP 3 =======================
    
            //Group 4
            btnGroup4 = dlg.add("group");
            btnGroup4.alignment = ["center", "top"]
    
            OK = btnGroup4.add("button", undefined, undefined, { name: "OK" });
            OK.text = "Chuyển Xám";
    
            Cancel = btnGroup4.add("button", undefined, undefined, { name: "Cancel" });
            Cancel.text = "Hủy"
    
            var Vesion = dlg.add("group", undefined, { name: "Version" })
            Vesion.orientation = "column"
            Vesion.alignChildren = ["left", "bottom"]
            Vesion.spacing = 10
            Vesion.margins = 0
            Vesion.alignment = ["left", "bottom"]
    
            var version = Vesion.add("statictext", undefined, undefined, { name: "version" })
            version.text = versionTo
            version.alignment = ["left", "bottom"]
    
            //show dialog
            var myReturn = dlg.show();
    
            //gia tri tra ve cua fame OK = 1  Cancel = 2
            //alert(myReturn);
            if (myReturn == 1) {
                try {
                    setHue(false, 0, -100, 0);
                    doc.selection.load(activeDocument.channels.getByName("Selection"));
                    doc.selection.expand(1);
                    doc.selection.feather(0.5);
                    fillColor(0, 0, 0);
                    doc.selection.deselect();
                    doc.activeLayer.name = "Desaturated Background";
                    // loadAction("Desaturate_no", "RETOUCH BG.atn");
                } catch (error) {
                    //alert("Chạy layer Desaturated Background hệ thống trước nhé!");
                }
            }
    
        }
    }
    
    
    function placeEvent(null2, width, height) {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };
    
        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };
    
        var descriptor = new ActionDescriptor();
        var descriptor2 = new ActionDescriptor();
    
        //descriptor.putInteger( s2t( "ID" ), ID );
        descriptor.putPath(c2t("null"), null2);
        descriptor.putEnumerated(s2t("freeTransformCenterState"), s2t("quadCenterState"), s2t("QCSAverage"));
        descriptor2.putUnitDouble(s2t("horizontal"), s2t("percentUnit"), 0);
        descriptor2.putUnitDouble(s2t("vertical"), s2t("percentUnit"), 0);
        descriptor.putObject(s2t("offset"), s2t("offset"), descriptor2);
        descriptor.putUnitDouble(s2t("width"), s2t("percentUnit"), width);
        descriptor.putUnitDouble(s2t("height"), s2t("percentUnit"), height);
        executeAction(s2t("placeEvent"), descriptor, DialogModes.NO);
    }
    
    
    function slectColorCurentVariant() {
        try {
            activeDocument.activeLayer = activeDocument.activeLayer.parent;
        } catch (error) {
            if (activeDocument.activeLayer.name.search("Variant") == (-1)) {
                setSelectedLayer("Color 1");
            }
        }
        var foderChange = activeDocument.activeLayer.name;
        var endVar = foderChange.slice(foderChange.length - 1);
        setSelectedLayer("Color " + String(endVar));
    }
    function deselectPath() {
        var idDslc = charIDToTypeID("Dslc");
        var desc2657 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref325 = new ActionReference();
        var idPath = charIDToTypeID("Path");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref325.putEnumerated(idPath, idOrdn, idTrgt);
        desc2657.putReference(idnull, ref325);
        executeAction(idDslc, desc2657, DialogModes.NO);
    }
    
    function mergeLayer() {
        var idMrgV = charIDToTypeID("MrgV");
        var desc2921 = new ActionDescriptor();
        var idDplc = charIDToTypeID("Dplc");
        desc2921.putBoolean(idDplc, true);
        executeAction(idMrgV, desc2921, DialogModes.NO);
    }
    
    function merge() {
        var idMrgtwo = charIDToTypeID("Mrg2");
        var desc662 = new ActionDescriptor();
        executeAction(idMrgtwo, desc662, DialogModes.NO);
    }
    
    
    //
    function checkSelectionName(nameChannel) {
        var result = false;
        try {
            var channelRef = app.activeDocument.channels.getByName(nameChannel);
            if (channelRef) {
                // app.activeDocument.selection.load(channelRef);
                result = true;
            }
        } catch (error) { }
        return result;
    }
    
    //Fill colo layer.
    function fillColor(red, green, blue) {
        var idslct = charIDToTypeID("slct");
        var desc2135 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref918 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idChnl = charIDToTypeID("Chnl");
        var idMsk = charIDToTypeID("Msk ");
        ref918.putEnumerated(idChnl, idChnl, idMsk);
        desc2135.putReference(idnull, ref918);
        var idMkVs = charIDToTypeID("MkVs");
        desc2135.putBoolean(idMkVs, false);
        executeAction(idslct, desc2135, DialogModes.NO);
    
        var myColor = new SolidColor();
        myColor.rgb.red = red; // 0 - 255
        myColor.rgb.green = green;
        myColor.rgb.blue = blue;
        activeDocument.selection.fill(myColor);
    
    }
    //select subject
    function autoCutout(sampleAllLayers) {
        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };
    
        var descriptor = new ActionDescriptor();
    
        descriptor.putBoolean(s2t("sampleAllLayers"), sampleAllLayers);
        executeAction(s2t("autoCutout"), descriptor, DialogModes.NO);
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
        descriptor.putInteger(s2t("layerID"), 208);
        executeAction(s2t("make"), descriptor, DialogModes.NO);
    }
    
    function selectRGB() {
        var idslct = charIDToTypeID("slct");
        var desc7 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref2 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idChnl = charIDToTypeID("Chnl");
        var idRGB = charIDToTypeID("RGB ");
        ref2.putEnumerated(idChnl, idChnl, idRGB);
        desc7.putReference(idnull, ref2);
        var idMkVs = charIDToTypeID("MkVs");
        desc7.putBoolean(idMkVs, false);
        executeAction(idslct, desc7, DialogModes.NO);
    }
    
    //check Mask
    function hasMask() {
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var desGet = executeActionGet(ref);
        return desGet.getBoolean(stringIDToTypeID("hasUserMask"));
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
    
    //Check vectormask
    function hasVectorMask() {
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var desget = executeActionGet(ref);
        return desget.getBoolean(stringIDToTypeID("hasVectorMask"));
    }
    //NẾU TỒN TẠI SELECTION
    function hasSelection() {
        var hasSelection = false;
        try {
            var ref = new ActionReference();
            ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("selection"));
            ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
            var desc = executeActionGet(ref);
            if (desc.count) {
                hasSelection = true;
            }
        } catch (e) { }
        return hasSelection;
    }
    //Loa selection vectormask
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
    function disableMask() {
        var idsetd = charIDToTypeID("setd");
        var desc112 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref63 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref63.putEnumerated(idLyr, idOrdn, idTrgt);
        desc112.putReference(idnull, ref63);
        var idT = charIDToTypeID("T   ");
        var desc113 = new ActionDescriptor();
        var idUsrM = charIDToTypeID("UsrM");
        desc113.putBoolean(idUsrM, false);
        var idLyr = charIDToTypeID("Lyr ");
        desc112.putObject(idT, idLyr, desc113);
        executeAction(idsetd, desc112, DialogModes.NO);
    }
    //save selection Channel
    function saveChannel(name) {
        var desc977 = new ActionDescriptor();
        var ref38 = new ActionReference();
        ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
        desc977.putReference(charIDToTypeID("null"), ref38);
        desc977.putString(charIDToTypeID("Nm  "), name);
        executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO);
        return activeDocument.channels.getByName(name);
    }
    
    
    function moveLayer(n) {
        for (var index = 0; index < n; index++) {
            var idmove = charIDToTypeID("move");
            var desc553 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref107 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref107.putEnumerated(idLyr, idOrdn, idTrgt);
            desc553.putReference(idnull, ref107);
            var idT = charIDToTypeID("T   ");
            var ref108 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idNxt = charIDToTypeID("Nxt ");
            ref108.putEnumerated(idLyr, idOrdn, idNxt);
            desc553.putReference(idT, ref108);
            executeAction(idmove, desc553, DialogModes.NO);
        }
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
    
    //kiem tra ton tai selection với tên .....
    function checkSelectionName(nameChannel) {
        var result = false;
        try {
            var channelRef = app.activeDocument.channels.getByName(nameChannel);
            if (channelRef) {
                // app.activeDocument.selection.load(channelRef);
                result = true;
            }
        } catch (error) { }
        return result;
    }
    
    //save vung chon
    function saveSelection(name2) {
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
    
    function setColorHueBG(colorize, hue, Strt, lightness, file, width, hight) {
        //tạo layer color balance từ vùng chọn
        activeDocument.selection.load(activeDocument.channels.getByName("Selection"));
        doc.selection.expand(1);
        doc.selection.feather(1);
        doc.selection.invert();
    
        setHue(colorize, hue, Strt, lightness);
        activeDocument.activeLayer.name = "Color BG";
        selectLayer("Resources");
        placeEvent(new File(fileImages + file), width, hight);
        moveDown();
        // moveLayer(3);
        // app.activeDocument.activeLayer.move( currentLayer, ElementPlacement.PLACEATEND ); // move i
        // var currentLayer = app.activeDocument.activeLayer; // get just moved layer
        // app.activeDocument.activeLayer.move( currentLayer, ElementPlacement.PLACEATEND ); // move it
    
        // doc.activeLayer.move(doc.layerSets.getByname("Resources"), ElementPlacement.INSIDE);
    
        // doc.activeLayer.move();
    }
    
    function placeEvent(null2, width, height) {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };
    
        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };
    
        var descriptor = new ActionDescriptor();
        var descriptor2 = new ActionDescriptor();
    
        //descriptor.putInteger( s2t( "ID" ), ID );
        descriptor.putPath(c2t("null"), null2);
        descriptor.putEnumerated(s2t("freeTransformCenterState"), s2t("quadCenterState"), s2t("QCSAverage"));
        descriptor2.putUnitDouble(s2t("horizontal"), s2t("percentUnit"), 0);
        descriptor2.putUnitDouble(s2t("vertical"), s2t("percentUnit"), 0);
        descriptor.putObject(s2t("offset"), s2t("offset"), descriptor2);
        descriptor.putUnitDouble(s2t("width"), s2t("percentUnit"), width);
        descriptor.putUnitDouble(s2t("height"), s2t("percentUnit"), height);
        executeAction(s2t("placeEvent"), descriptor, DialogModes.NO);
    }
    
    //Tạo layer Hue
    function makeHueColor() {
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
        descriptor2.putEnumerated(s2t("color"), s2t("color"), s2t("red"));
        descriptor3.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
        descriptor3.putBoolean(s2t("colorize"), false);
        descriptor2.putObject(s2t("type"), s2t("hueSaturation"), descriptor3);
        descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
        executeAction(s2t("make"), descriptor, DialogModes.NO);
    }
    
    function setHue(colorize, hue, Strt, lightness) {
        makeHueColor();
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
        var reference = new ActionReference();
    
        reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
        descriptor.putReference(c2t("null"), reference);
        descriptor2.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
        descriptor2.putBoolean(s2t("colorize"), colorize);
        descriptor3.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
        descriptor3.putInteger(s2t("hue"), hue);
        descriptor3.putInteger(c2t("Strt"), Strt);
        descriptor3.putInteger(s2t("lightness"), lightness);
        list.putObject(s2t("hueSatAdjustmentV2"), descriptor3);
        descriptor2.putList(s2t("adjustment"), list);
        descriptor.putObject(s2t("to"), s2t("hueSaturation"), descriptor2);
        executeAction(s2t("set"), descriptor, DialogModes.NO);
    }
    
    
    function moveUp() {
        var idslct = charIDToTypeID("slct");
        var desc1388 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref155 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idFrwr = charIDToTypeID("Frwr");
        ref155.putEnumerated(idLyr, idOrdn, idFrwr);
        desc1388.putReference(idnull, ref155);
        var idMkVs = charIDToTypeID("MkVs");
        desc1388.putBoolean(idMkVs, false);
        var idLyrI = charIDToTypeID("LyrI");
        var list18 = new ActionList();
        list18.putInteger(30);
        desc1388.putList(idLyrI, list18);
        executeAction(idslct, desc1388, DialogModes.NO);
    }
    function moveDown() {
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
    
    //select history
    function selectHistory(nameHistory) {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };
    
        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };
    
        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();
    
        reference.putName(s2t("snapshotClass"), nameHistory);
        descriptor.putReference(c2t("null"), reference);
        executeAction(s2t("select"), descriptor, DialogModes.NO);
    }
    
    function action(action) {
        var idCpTL = charIDToTypeID(action);
        executeAction(idCpTL, undefined, DialogModes.NO);
    }
    
    function setSelectionLayer() {
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
    
    
    //clipping mask layer
    function clippingMask(params) {
        var idGrpL = charIDToTypeID("GrpL");
        var desc14721 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref4637 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref4637.putEnumerated(idLyr, idOrdn, idTrgt);
        desc14721.putReference(idnull, ref4637);
        executeAction(idGrpL, desc14721, DialogModes.NO);
    
    }
    
    
    //trừ vung chon
    function subtractSelection(selection) {
        var idSbtr = charIDToTypeID("Sbtr");
        var desc14706 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref4628 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        ref4628.putName(idChnl, "Selection");
        desc14706.putReference(idnull, ref4628);
        var idFrom = charIDToTypeID("From");
        var ref4629 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idfsel = charIDToTypeID("fsel");
        ref4629.putProperty(idChnl, idfsel);
        desc14706.putReference(idFrom, ref4629);
        executeAction(idSbtr, desc14706, DialogModes.NO);
    
    }
    
    function newLayerEmpty(params) {
        var idMk = charIDToTypeID("Mk  ");
        var desc214 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref83 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref83.putClass(idLyr);
        desc214.putReference(idnull, ref83);
        var idLyrI = charIDToTypeID("LyrI");
        desc214.putInteger(idLyrI, 986);
        executeAction(idMk, desc214, DialogModes.NO);
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
    }}

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
//fi screnn
function invokeCommand(commandID) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    descriptor.putInteger(s2t("commandID"), commandID);
    descriptor.putBoolean(s2t("kcanDispatchWhileModal"), true);
    executeAction(s2t("invokeCommand"), descriptor, DialogModes.NO);
}
//kiem tra ton tai  ten path
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
function autoCutout(sampleAllLayers) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    descriptor.putBoolean(s2t("sampleAllLayers"), sampleAllLayers);
    executeAction(s2t("autoCutout"), descriptor, DialogModes.NO);
}
//AN di All layer ko xu ly, hooac layer can an.
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

function checkAlllockLayer_nounlock() {
    var result = false;
    try {
        if (activeDocument.activeLayer.allLocked ||
            activeDocument.activeLayer.pixelsLocked ||
            activeDocument.activeLayer.positionLocked ||
            activeDocument.activeLayer.transparentPixelsLocked) {
            result = true;
        }
    } catch (error) { }
    return result;
}

function checkAlllockLayer() {
    var result = false;
    try {
        if (activeDocument.activeLayer.allLocked ||
            activeDocument.activeLayer.pixelsLocked ||
            activeDocument.activeLayer.positionLocked ||
            activeDocument.activeLayer.transparentPixelsLocked) {
            activeDocument.activeLayer.allLocked = false;
            activeDocument.activeLayer.pixelsLocked = false;
            activeDocument.activeLayer.positionLocked = false;
            activeDocument.activeLayer.transparentPixelsLocked = false;
            result = true;
        }
    } catch (error) { }
    return result;
}
//kiem tra ton tai selection với tên .....
function checkSelectionName(nameChannel) {
    var result = false;
    try {
        var channelRef = app.activeDocument.channels.getByName(nameChannel);
        if (channelRef) {
            app.activeDocument.selection.load(channelRef);
            result = true;
        }
    } catch (error) { }
    return result;
}
//kiem tra layer co ton tai mask khong
function hasLayerMask() {
    var reference = new ActionReference();
    reference.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    var desc = executeActionGet(reference);
    return desc.getBoolean(stringIDToTypeID("hasUserMask"));
}

//Ham kiem tra ton tai foder.
function checkFoderName(foderName) {
    var result = false;
    for (var i = 0; i < activeDocument.layers.length; i++) {
        if (String(activeDocument.layers[i].name) == foderName) {
            result = true;
            break;
        }
    }
    return result;
}

//delete channel name

function deleteChannel(name) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putName(s2t("channel"), name);
    descriptor.putReference(c2t("null"), reference);
    executeAction(s2t("delete"), descriptor, DialogModes.NO);
}

// ham check layer co ton tai ko
function checkLayerName(group1, group2, group3) {
    var result = false;

    if (group1 != null && group2 != null && group3 != null) {
        try {
            activeDocument.activeLayer = activeDocument.layers[group1];
            // if (activeDocument.activeLayer.name != 'Variant 1') {
            //     activeDocument.activeLayer.visible = false;
            // }
            activeDocument.activeLayer = activeDocument.activeLayer.layers[group2];
            activeDocument.activeLayer = activeDocument.activeLayer.layers[group3];
            if (group3 == String(app.activeDocument.activeLayer.name)) {
                result = true;
            }
        } catch (e) { }
    } else if (group1 != null && group2 != null && group3 == null) {
        try {
            activeDocument.activeLayer = activeDocument.layers[group1];
            if (activeDocument.activeLayer.name != 'Variant 1' && activeDocument.activeLayer.name != 'background') {
                activeDocument.activeLayer.visible = false;
            }
            activeDocument.activeLayer = activeDocument.activeLayer.layers[group2];
            if (group2 == String(app.activeDocument.activeLayer.name)) {
                result = true;
            }

        } catch (e) { }
    } else if (group1 != null && group2 == null && group3 == null) {
        try {
            activeDocument.activeLayer = activeDocument.layers[group1];
            if (activeDocument.activeLayer.name != 'Variant 1'
                && activeDocument.activeLayer.name != 'clone'
                && activeDocument.activeLayer.name != 'Retouching'
                && activeDocument.activeLayer.name != 'Variant #1'
                && activeDocument.activeLayer.name != 'Retouch #1'
                && activeDocument.activeLayer.name != 'Variant #1#2'
                && activeDocument.activeLayer.name != 'Retouch #1#2'
                && activeDocument.activeLayer.name != 'background'
                && activeDocument.activeLayer.name != 'Resized') {
                activeDocument.activeLayer.visible = false;
            }

            if (group1 == String(app.activeDocument.activeLayer.name)) {
                result = true;
            }
        } catch (e) { }
    }
    return result;
}

//NẾU TỒN TẠI SELECTION
function hasSelection() {
    var hasSelection = false;
    try {
        var ref = new ActionReference();
        ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("selection"));
        ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
        var desc = executeActionGet(ref);
        if (desc.count) {
            hasSelection = true;
        }
    } catch (e) { }
    return hasSelection;
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
function newGuideLayout(replace, colCount, colWidth, Cntr, rowCount) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();

    descriptor.putBoolean(s2t("replace"), replace);
    descriptor.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
    descriptor2.putInteger(s2t("colCount"), colCount);
    descriptor2.putUnitDouble(s2t("colWidth"), s2t("percentUnit"), colWidth);
    descriptor2.putBoolean(c2t("Cntr"), Cntr);
    descriptor2.putInteger(s2t("rowCount"), rowCount);
    descriptor.putObject(s2t("guideLayout"), s2t("guideLayout"), descriptor2);
    descriptor.putEnumerated(s2t("guideTarget"), s2t("guideTarget"), s2t("guideTargetCanvas"));
    executeAction(s2t("newGuideLayout"), descriptor, DialogModes.NO);
}

function makeGuide(position, guideUserValue) {
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

    descriptor2.putUnitDouble(s2t("position"), s2t("pixelsUnit"), position);  // % percentUnit 
    descriptor2.putEnumerated(s2t("orientation"), s2t("orientation"), s2t("horizontal"));  // Doc =  vertical
    descriptor2.putEnumerated(s2t("kind"), s2t("kind"), s2t("document"));
    reference.putIdentifier(s2t("document"), 268);
    reference.putIndex(c2t("Gd  "), 27);
    descriptor2.putReference(c2t("null"), reference);
    descriptor.putObject(s2t("new"), c2t("Gd  "), descriptor2);
    reference2.putClass(c2t("Gd  "));
    descriptor.putReference(c2t("null"), reference2);
    descriptor.putEnumerated(s2t("guideTarget"), s2t("guideTarget"), s2t("guideTargetCanvas"));
    descriptor.putUnitDouble(s2t("guideUserValue"), s2t("pixelsUnit"), guideUserValue); // % percentUnit 
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}

//select Subject
function autoCutout(sampleAllLayers) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    descriptor.putBoolean(s2t("sampleAllLayers"), sampleAllLayers);
    executeAction(s2t("autoCutout"), descriptor, DialogModes.NO);
}

function selectionSubjectKillSsesen() {
    var doc = activeDocument;
    //select ALL
    activeDocument.selection.selectAll();
    //save vung chon voi ten Crop
    saveSelection("Crop");
    //chon layer tren cung
    activeDocument.activeLayer = activeDocument.layers[0];
    //select(false);
    //Cong them vung chon 
    add();
    //crop tu vung chon
    try {
        var bound = doc.selection.bounds
        cropToSelection(bound[1], bound[0], bound[3], bound[2])
    } catch (e) { }
    //select Subject
    autoCutout(true);
    // =======================================================
    function select(makeVisible) {
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
        list.putInteger(20);
        descriptor.putList(s2t("layerID"), list);
        executeAction(s2t("select"), descriptor, DialogModes.NO);
    }
}
//crop hinh
function cropToSelection(top, left, bottom, right) {
    var idCrop = charIDToTypeID("Crop");
    var desc11 = new ActionDescriptor();
    var idT = charIDToTypeID("T   ");
    var desc12 = new ActionDescriptor();
    var idTop = charIDToTypeID("Top ");
    var idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idTop, idPxl, top);
    var idLeft = charIDToTypeID("Left");
    var idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idLeft, idPxl, left);
    var idBtom = charIDToTypeID("Btom");
    var idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idBtom, idPxl, bottom);
    var idRght = charIDToTypeID("Rght");
    var idPxl = charIDToTypeID("#Pxl");
    desc12.putUnitDouble(idRght, idPxl, right);
    var idRctn = charIDToTypeID("Rctn");
    desc11.putObject(idT, idRctn, desc12);
    var idAngl = charIDToTypeID("Angl");
    var idAng = charIDToTypeID("#Ang");
    desc11.putUnitDouble(idAngl, idAng, 0.000000);
    var idDlt = charIDToTypeID("Dlt ");
    desc11.putBoolean(idDlt, false);
    var idcropAspectRatioModeKey = stringIDToTypeID("cropAspectRatioModeKey");
    var idcropAspectRatioModeClass = stringIDToTypeID("cropAspectRatioModeClass");
    var idtargetSize = stringIDToTypeID("targetSize");
    desc11.putEnumerated(idcropAspectRatioModeKey, idcropAspectRatioModeClass, idtargetSize);
    executeAction(idCrop, desc11, DialogModes.NO);
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
//save vung chon
function saveSelection(name2) {
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
}

function liquify(params) {
    try {
        var idLqFy = charIDToTypeID("LqFy");
        executeAction(idLqFy, undefined, DialogModes.ALL);
    } catch (error) { }
}
//cong them vung chon
function add() {
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
    descriptor.putReference(s2t("to"), reference2);
    executeAction(s2t("add"), descriptor, DialogModes.NO);
}

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

function action(action) {
    var idCpTL = charIDToTypeID(action)
    executeAction(idCpTL, undefined, DialogModes.NO)
}

//function selecGroup layer
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

function makeThreshold() {
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
    descriptor3.putInteger(s2t("level"), 128);
    descriptor2.putObject(s2t("type"), s2t("thresholdClassEvent"), descriptor3);
    descriptor.putObject(s2t("using"), s2t("adjustmentLayer"), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}


//function clipingmask
function clippingMask() {
    var idGrpL = charIDToTypeID("GrpL");
    var desc362 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref188 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref188.putEnumerated(idLyr, idOrdn, idTrgt);
    desc362.putReference(idnull, ref188);
    executeAction(idGrpL, desc362, DialogModes.NO);

}
//function selecGroup layer
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
    descriptor.putInteger(s2t("layerID"), 208);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
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

//Function cham info
function makePoint(horizontal, vertical) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(s2t("colorSampler"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putUnitDouble(s2t("horizontal"), s2t("percentUnit"), horizontal);
    descriptor2.putUnitDouble(s2t("vertical"), s2t("percentUnit"), vertical);
    descriptor.putObject(s2t("position"), c2t("Pnt "), descriptor2);
    executeAction(s2t("make"), descriptor, DialogModes.NO);
}


//Function set curves
function setCurves(horizontal, vertical, horizontal2, vertical2) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };
    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var descriptor4 = new ActionDescriptor();
    var descriptor5 = new ActionDescriptor();
    var list = new ActionList();
    var list2 = new ActionList();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
    descriptor3.putReference(s2t("channel"), reference2);
    descriptor4.putDouble(s2t("horizontal"), horizontal);
    descriptor4.putDouble(s2t("vertical"), vertical);
    list2.putObject(c2t("Pnt "), descriptor4);
    descriptor5.putDouble(s2t("horizontal"), horizontal2);
    descriptor5.putDouble(s2t("vertical"), vertical2);
    list2.putObject(c2t("Pnt "), descriptor5);
    descriptor3.putList(s2t("curve"), list2);
    list.putObject(s2t("curvesAdjustment"), descriptor3);
    descriptor2.putList(s2t("adjustment"), list);
    descriptor.putObject(s2t("to"), s2t("curves"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

function setThreshold(number) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    descriptor2.putInteger(s2t("level"), number);
    descriptor.putObject(s2t("to"), s2t("thresholdClassEvent"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

////////////////////////////////////////////////////////////////
function weathiBrush() {
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
    // =======================================================

    var idslct = charIDToTypeID("slct");
    var desc441 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref245 = new ActionReference();
    var idPbTl = charIDToTypeID("PbTl");
    ref245.putClass(idPbTl);
    desc441.putReference(idnull, ref245);
    executeAction(idslct, desc441, DialogModes.NO);
    // =======================================================
    var idRset = charIDToTypeID("Rset");
    var desc442 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref246 = new ActionReference();
    var idClr = charIDToTypeID("Clr ");
    var idClrs = charIDToTypeID("Clrs");
    ref246.putProperty(idClr, idClrs);
    desc442.putReference(idnull, ref246);
    executeAction(idRset, desc442, DialogModes.NO);

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
// load action tren cung thu muc, khong can load action vao pts

function loadAction(actionName, action) {
    //alert(thePathActions)
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
