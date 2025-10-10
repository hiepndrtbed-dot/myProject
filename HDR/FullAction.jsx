//By Duc Hiep - Acad DN Version 1.0 -- HDR
#include "json/json2.js";

const versionTo = " By Duc Hiep -- Version 1.0.1 -- ";
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;

var currentFolder = File($.fileName).parent + "/jsx";
var scriptFolder = File($.fileName).parent;
var thePathActions = File($.fileName).parent.toString() + "/Action";
var targetScript = File(scriptFolder + "/py/login_check.jsx");
var status = false;

if (targetScript.exists) {
    $.evalFile(targetScript);
} else {
    alert("❌ Không tìm thấy file: " + targetScript.fsName);
}
// alert(status)
if (status == true) {
    // doc.suspendHistory("By Hiep!", "run()");
    run();
}

//processing
function run() {
    // DIALOG
    var dialog = new Window("dialog")
    dialog.text = "RUN ALL ACTION"
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10;
    dialog.margins = 10;

    // dialog.active = true;
    // GROUP1
    // ======
    var group1 = dialog.add("group", undefined, { name: "group1" });
    group1.orientation = "column";
    group1.alignment = ["left", "center"];
    group1.spacing = 3;
    group1.margins = 0;

    //Copy
    var buttonCopyExposure = group1.add("button", undefined, undefined, { name: "Copy Exposure (1)" });
    buttonCopyExposure.text = "Copy Exposure (1)";
    buttonCopyExposure.alignment = ["left", "center"];
    buttonCopyExposure.preferredSize.width = 170;


    //Merge Exposure
    var buttonMergeExposure = group1.add("button", undefined, undefined, { name: "Merge Exposure" });
    buttonMergeExposure.text = "Merge Exposure (2)";
    buttonMergeExposure.alignment = ["left", "center"];
    buttonMergeExposure.preferredSize.width = 170;

    //Fill white Ceiling, molding
    var buttonFillCeilingMolding = group1.add("button", undefined, undefined, { name: "Ceiling, molding" });
    buttonFillCeilingMolding.text = "Fill white Ceiling, molding (3)";
    buttonFillCeilingMolding.alignment = ["left", "center"];
    buttonFillCeilingMolding.preferredSize.width = 170;

    //Fill color Wall
    var buttonFillWall = group1.add("button", undefined, undefined, { name: "Wall color 1" });
    buttonFillWall.text = "Wall color 1 (4)";
    buttonFillWall.alignment = ["left", "center"];
    buttonFillWall.preferredSize.width = 170;


    //Fill Sky
    var buttonSky = group1.add("button", undefined, undefined, { name: "Line_War_Background (l)" });
    buttonSky.text = "Add Sky(5)";
    buttonSky.preferredSize.width = 170;

    //DTD
    var buttonDTD = group1.add("button", undefined, undefined, { name: "DTD" });
    buttonDTD.text = "DTD (6)";
    buttonDTD.preferredSize.width = 170;

    //Fill Sky DTD
    var buttonAddSkyDTD = group1.add("button", undefined, undefined, { name: "Add sky (2)" });
    buttonAddSkyDTD.text = "Add Sky(DTD)(7)";
    buttonAddSkyDTD.alignment = ["left", "center"];
    buttonAddSkyDTD.preferredSize.width = 170;

    //Align and merge Exposure
    var buttonAlign = group1.add("button", undefined, undefined, { name: "Align and merge Exposure" });
    buttonAlign.text = "ALign and Merge Exposure (A)";
    buttonAlign.alignment = ["left", "center"];
    buttonAlign.preferredSize.width = 170;


    //Replace Color
    var buttonReplaceColor = group1.add("button", undefined, undefined, { name: "Replace Color(5)" });
    buttonReplaceColor.text = "Replace Color(F6)";
    buttonReplaceColor.preferredSize.width = 170;

    //Hue saturation
    var buttonHueSaturation = group1.add("button", undefined, undefined, { name: "Hue Color(5)" });
    buttonHueSaturation.text = "Hue Saturation(F7)";
    buttonHueSaturation.preferredSize.width = 170;

    //ColorBalance
    var buttonColorBalance = group1.add("button", undefined, undefined, { name: "Hue Color(5)" });
    buttonColorBalance.text = "(-) HueSaturation + yellow (F9)";
    buttonColorBalance.preferredSize.width = 170;

    //ColorBalance
    var buttonReduceHueSaturation = group1.add("button", undefined, undefined, { name: "Hue Color(5)" });
    buttonReduceHueSaturation.text = "ColorBalance(F5)";
    buttonReduceHueSaturation.preferredSize.width = 170;

    //Wall coloring 2
    var buttonFillWall2 = group1.add("button", undefined, undefined, { name: "Wall color 2" });
    buttonFillWall2.text = "Wall color 2 (0)"
    buttonFillWall2.alignment = ["left", "center"]
    buttonFillWall2.preferredSize.width = 170

    //Add TV
    var buttonAddTV = group1.add("button", undefined, undefined, { name: "Camera Raw" });
    buttonAddTV.text = "Fill TV (T)";
    buttonAddTV.alignment = ["left", "center"];
    buttonAddTV.preferredSize.width = 170;

    //Add Grass
    var buttonAddGrass = group1.add("button", undefined, undefined, { name: "Camera Raw" });
    buttonAddGrass.text = "Add Grass (G)";
    buttonAddGrass.alignment = ["left", "center"];
    buttonAddGrass.preferredSize.width = 170;

    //Lo Fire
    var buttonLoSuoi = group1.add("button", undefined, undefined, { name: "Dust" });
    buttonLoSuoi.text = "Add Fire (F)";
    buttonLoSuoi.alignment = ["left", "center"];
    buttonLoSuoi.preferredSize.width = 170;

    //Fill window
    var buttonWindow = group1.add("button", undefined, undefined, { name: "Copy Sill (2)" });
    buttonWindow.text = "Add Window(W)";
    buttonWindow.alignment = ["left", "center"];
    buttonWindow.preferredSize.width = 170;

    //Add light
    var buttonAddLight = group1.add("button", undefined, undefined, { name: "Add sky (2)" });
    buttonAddLight.text = "Add Light(L)";
    buttonAddLight.alignment = ["left", "center"];
    buttonAddLight.preferredSize.width = 170;

    //Save selection detail
    var buttonSaveSelectionDetail = group1.add("button", undefined, undefined, { name: "Flip_Canvas_Product_White" });
    buttonSaveSelectionDetail.text = "Save Selection Detail (D)"
    buttonSaveSelectionDetail.preferredSize.width = 170;

    //Save selection detail
    var buttonSelectionDetail = group1.add("button", undefined, undefined, { name: "Flip_Canvas_Product_White" });
    buttonSelectionDetail.text = "Selection Detail (J)"
    buttonSelectionDetail.preferredSize.width = 170;

    //Copy Path
    var buttonCopyPath = group1.add("button", undefined, undefined, { name: "Flip_Canvas_Product_White" });
    buttonCopyPath.text = "Copy Path (F8)"
    buttonCopyPath.preferredSize.width = 170;

    //Copy Path
    var buttonRunActionPath = group1.add("button", undefined, undefined, { name: "Run action path" });
    buttonRunActionPath.text = "Run action Path (F4)"
    buttonRunActionPath.preferredSize.width = 170;

    //Replace color Red + yellow
    var buttonAddRed = group1.add("button", undefined, undefined, { name: "deleteSetAction 75%" });
    buttonAddRed.text = "(+) Yellow Red (Y)";
    buttonAddRed.preferredSize.width = 170;

    //Check cuvels
    var buttonCheckLight = group1.add("button", undefined, undefined, { name: "Orendt_Update" });
    buttonCheckLight.text = "Check Light (C)"
    buttonCheckLight.preferredSize.width = 170;

    //Merge images indor
    var buttonMerge = group1.add("button", undefined, undefined, { name: "buttonMerge" });
    buttonMerge.text = "MERGE LAYER (M)"
    buttonMerge.preferredSize.width = 170;

    //Merge images indor
    var buttonIndor = group1.add("button", undefined, undefined, { name: "Skin" });
    buttonIndor.text = "MERGE (INDOR) (I)"
    buttonIndor.preferredSize.width = 170;

    //Merge OutDor
    var outDor = group1.add("button", undefined, undefined, { name: "Skin" });
    outDor.text = "MERGE (OUTDOR) (O)"
    outDor.preferredSize.width = 170;

    //RESET DATA
    var buttonResetData = group1.add("button", undefined, undefined, { name: "Reset Data" });
    buttonResetData.text = "Reset Data (R)"
    buttonResetData.preferredSize.width = 170;

    //Save tif and jpg
    var buttonSaveTif = group1.add("button", undefined, undefined, { name: "Hair Fly" });
    buttonSaveTif.text = "Save tif and jpg (S)"
    buttonSaveTif.preferredSize.width = 170;

    //Save tif and jpg DTD
    var buttonSaveTifDTD = group1.add("button", undefined, undefined, { name: "Hair Fly" });
    buttonSaveTifDTD.text = "Save tif and jpg (DTD) (X)"
    buttonSaveTifDTD.preferredSize.width = 170;


    //Logout
    var buttonLogout = group1.add("button", undefined, undefined, { name: "Logout account" });
    buttonLogout.text = "Logout Account"
    buttonLogout.preferredSize.width = 170;

    //Close Frame.
    var buttonClose = group1.add("button", undefined, undefined, { name: "Cancel" });
    buttonClose.text = "Cancel";
    buttonClose.preferredSize.width = 170;
    buttonClose.active = true

    // Hàm helper: chạy file jsx
    function runScript(path) {
        var targetScript = File(path);
        if (targetScript.exists) {
            $.evalFile(targetScript);
        } else {
            alert("❌ Không tìm thấy file: " + targetScript.fsName);
        }
    }

    // Hàm helper: gắn listener cho button chạy file
    function bindBtn(btn, filePath) {
        btn.addEventListener("click", function () {
            dialog.close();
            runScript(filePath);
        });
    }

    // --- Map button ↔ file ---
    bindBtn(buttonCopyExposure, currentFolder + "/copyToMerge.jsx");
    bindBtn(buttonMergeExposure, currentFolder + "/mergeImage2.jsx");
    bindBtn(buttonFillCeilingMolding, currentFolder + "/Whitening.jsx");
    bindBtn(buttonFillWall, currentFolder + "/wallColor.jsx");
    bindBtn(buttonFillWall2, currentFolder + "/wallColor2.jsx");
    bindBtn(buttonAddTV, currentFolder + "/InsertElectronic.jsx");
    bindBtn(buttonAddGrass, currentFolder + "/insertGrass.jsx");
    bindBtn(buttonWindow, currentFolder + "/insertWindow.jsx");
    bindBtn(buttonAddRed, currentFolder + "/+redYellow.jsx");
    bindBtn(buttonSky, currentFolder + "/insertSky.jsx");
    bindBtn(buttonAddSkyDTD, currentFolder + "/insertSkyDTD.jsx");
    bindBtn(buttonAddLight, currentFolder + "/insertFlight.jsx");
    bindBtn(buttonLoSuoi, currentFolder + "/insertFire.jsx");
    bindBtn(buttonSaveTif, currentFolder + "/saveTifandJPG.jsx");
    bindBtn(buttonSaveTifDTD, currentFolder + "/saveTifand2JPG(DTD).jsx");
    bindBtn(buttonReplaceColor, currentFolder + "/replaceColor.jsx");
    bindBtn(buttonHueSaturation, currentFolder + "/hueSaturation.jsx");
    bindBtn(buttonColorBalance, currentFolder + "/colorBalance.jsx");
    bindBtn(buttonReduceHueSaturation, currentFolder + "/-hueSaturation.jsx");
    bindBtn(buttonResetData, currentFolder + "/removeDataTxt.jsx");
    bindBtn(buttonSelectionDetail, currentFolder + "/selectionDetails.jsx");
    bindBtn(buttonCopyPath, currentFolder + "/copyPathTodocument.jsx");
    bindBtn(buttonRunActionPath, currentFolder + "/autoAction.jsx");
    bindBtn(buttonLogout, scriptFolder + "/py/logout.jsx");

    // --- Các button có xử lý đặc biệt ---
    // Align + Merge Exposure
    buttonAlign.addEventListener("click", function () {
        dialog.close();
        loadAction("ALign", "DataAction(HDR).atn");
        runScript(currentFolder + "/MergeImage.jsx");
    });

    // Save Selection Detail
    buttonSaveSelectionDetail.addEventListener("click", function () {
        dialog.close();
        loadAction("Selection Detail", "DataAction(HDR).atn");
    });

    // DTD
    buttonDTD.addEventListener("click", function () {
        dialog.close();
        if (hasSelection()) {
            loadAction("DTD", "DataAction(HDR).atn");
        } else {
            alert("Chon vung chon cua so");
        }
    });

    // Check Light
    buttonCheckLight.addEventListener("click", function () {
        dialog.close();
        loadAction("Check Light", "DataAction(HDR).atn");
    });

    // Merge L
    buttonMerge.addEventListener("click", function () {
        dialog.close();
        selectChoseMultiLayer(doc.layers[0].name, doc.layers[doc.layers.length - 1].name);
        doc.activeLayer.isBackgroundLayer = true;
    });

    // Merge Indor
    buttonIndor.addEventListener("click", function () {
        dialog.close();
        try {
            doc.layers.getByName("Sky").visible = false;
            loadAction("MERGE (INDOR)", "DataAction(HDR).atn");
            doc.activeLayer.move(doc.layers.getByName("Sky"), ElementPlacement.PLACEAFTER);
            doc.layers.getByName("Sky").visible = true;
            doc.activeLayer.name = "MERGE 1";
        } catch (error) {
            loadAction("MERGE (INDOR)", "DataAction(HDR).atn");
            doc.activeLayer.name = "MERGE 1";
        }
    });

    // Merge Outdor
    outDor.addEventListener("click", function () {
        dialog.close();
        try {
            doc.layers.getByName("Sky").visible = false;
            loadAction("MERGE  (OUTDOR)", "DataAction(HDR).atn");
            doc.activeLayer.move(doc.layers.getByName("Sky"), ElementPlacement.PLACEAFTER);
            doc.layers.getByName("Sky").visible = true;
            doc.activeLayer.name = "MERGE 1";
        } catch (error) {
            loadAction("MERGE  (OUTDOR)", "DataAction(HDR).atn");
            doc.activeLayer.name = "MERGE 1";
        }
    });

    // Đóng form
    buttonClose.addEventListener("click", function () {
        dialog.close();
    });
    //Xử lý xự kiện bằng bàng phím
    dialog.addEventListener("keydown", triggerBtnRun);
    function triggerBtnRun(e) {
        const actions = {
            "1": buttonCopyExposure,
            "2": buttonMergeExposure,
            "3": buttonFillCeilingMolding,
            "4": buttonFillWall,
            "0": buttonFillWall2,
            "5": buttonSky,
            "6": buttonDTD,
            "7": buttonAddSkyDTD,
            "T": buttonAddTV,
            "G": buttonAddGrass,
            "W": buttonWindow,
            "Y": buttonAddRed,
            "R": buttonResetData,
            "L": buttonAddLight,
            "D": buttonSaveSelectionDetail,
            "J": buttonSelectionDetail,
            "F": buttonLoSuoi,
            "S": buttonSaveTif,
            "X": buttonSaveTifDTD,
            "M": buttonMerge,
            "A": buttonAlign,
            "C": buttonCheckLight,
            "I": buttonIndor,
            "O": outDor,
            "F6": buttonReplaceColor,
            "F7": buttonHueSaturation,
            "F5": buttonColorBalance,
            "F9": buttonReduceHueSaturation,
            "F8": buttonCopyPath,
            "F4": buttonRunActionPath,
            "Escape": buttonClose
        };

        const btn = actions[e.keyName];
        if (btn) {
            btn.dispatchEvent(new Event("click"));
        } else {
            alert(e.keyName + " Input fail!!!!");
        }
    }

    //Group version
    var Vesion = group1.add("group", undefined, { name: "Version" })
    Vesion.orientation = "column"
    Vesion.alignChildren = ["left", "bottom"]
    Vesion.spacing = 10
    Vesion.margins = 0
    Vesion.alignment = ["left", "bottom"]

    var version = Vesion.add("statictext", undefined, undefined, { name: "version" })
    version.text = versionTo
    version.alignment = ["left", "bottom"]
    dialog.show();
}
// purgeAll();
function checkNameLayerToMger() {
    var keywordCheck = ["wall", "color", "black", "+red & yellow", "grass", "sky","merge"];
    for (var x = 0; x < doc.artLayers.length; x++) {
        if (checkString(doc.artLayers[doc.artLayers.length - 3].name, keywordCheck)) break;
        doc.artLayers[doc.artLayers.length - 3].merge();
    }

}
function selectChoseMultiLayer(nameOn, nameBottom) {
    function cID(s) { return charIDToTypeID(s); }
    function sID(s) { return stringIDToTypeID(s); }
    // Chọn layer "Darken"
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putName(cID("Lyr "), nameOn);
    desc1.putReference(cID("null"), ref1);
    desc1.putBoolean(cID("MkVs"), false);
    executeAction(cID("slct"), desc1, DialogModes.NO);

    // Thêm layer "Background" vào vùng chọn
    var desc2 = new ActionDescriptor();
    var ref2 = new ActionReference();
    ref2.putName(cID("Lyr "), nameBottom);
    desc2.putReference(cID("null"), ref2);
    desc2.putEnumerated(sID("selectionModifier"), sID("selectionModifierType"), sID("addToSelectionContinuous"));
    desc2.putBoolean(cID("MkVs"), false);
    executeAction(cID("slct"), desc2, DialogModes.NO);
    // Gộp layer đã chọn
    executeAction(sID("mergeLayersNew"), undefined, DialogModes.NO);
}

//Kiem tra co ton tai vung chon
function hasSelection() {
    var hasSelection = false;
    var ref = new ActionReference();
    ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("selection"));
    ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    var desc = executeActionGet(ref);
    if (desc.count) hasSelection = true;
    return hasSelection;
}

//Invert
function invert() {
    executeAction(charIDToTypeID("Invr"), undefined, DialogModes.NO);
}

// === Tạo Adjustment Layer: Color Balance ===
function applyColorBalance(shadow, midtone, highlight) {
    var shadow = shadow;
    var midtone = midtone;
    var highlight = highlight;
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass(charIDToTypeID("AdjL"));
    desc.putReference(charIDToTypeID("null"), ref);

    var layerDesc = new ActionDescriptor();
    var colorDesc = new ActionDescriptor();

    function makeList(r, g, b) {
        var list = new ActionList();
        list.putInteger(r);
        list.putInteger(g);
        list.putInteger(b);
        return list;
    }

    colorDesc.putList(charIDToTypeID("ShdL"), makeList(shadow.r, shadow.g, shadow.b));
    colorDesc.putList(charIDToTypeID("MdtL"), makeList(midtone.r, midtone.g, midtone.b));
    colorDesc.putList(charIDToTypeID("HghL"), makeList(highlight.r, highlight.g, highlight.b));
    colorDesc.putBoolean(charIDToTypeID("PrsL"), true);

    layerDesc.putObject(charIDToTypeID("Type"), charIDToTypeID("ClrB"), colorDesc);
    desc.putObject(charIDToTypeID("Usng"), charIDToTypeID("AdjL"), layerDesc);

    executeAction(charIDToTypeID("Mk  "), desc, DialogModes.NO);
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
function selecTool(tool) {
    var desc9 = new ActionDescriptor();
    var ref7 = new ActionReference();
    ref7.putClass(app.stringIDToTypeID(tool));
    desc9.putReference(app.charIDToTypeID('null'), ref7);
    executeAction(app.charIDToTypeID('slct'), desc9, DialogModes.NO);

    // Tool names (use quoted strings, e.g. 'moveTool')
    // moveTool
    // marqueeRectTool
    // marqueeEllipTool
    // marqueeSingleRowTool
    // marqueeSingleColumnTool
    // lassoTool
    // polySelTool
    // magneticLassoTool
    // quickSelectTool
    // magicWandTool
    // cropTool
    // sliceTool
    // sliceSelectTool
    // spotHealingBrushTool
    // magicStampTool
    // patchSelection
    // redEyeTool
    // paintbrushTool
    // pencilTool
    // colorReplacementBrushTool
    // cloneStampTool
    // patternStampTool
    // historyBrushTool
    // artBrushTool
    // eraserTool
    // backgroundEraserTool
    // magicEraserTool
    // gradientTool
    // bucketTool
    // blurTool
    // sharpenTool
    // smudgeTool
    // dodgeTool
    // burnInTool
    // saturationTool
    // penTool
    // freeformPenTool
    // addKnotTool
    // deleteKnotTool
    // convertKnotTool
    // typeCreateOrEditTool
    // typeVerticalCreateOrEditTool
    // typeCreateMaskTool
    // typeVerticalCreateMaskTool
    // pathComponentSelectTool
    // directSelectTool
    // rectangleTool
    // roundedRectangleTool
    // ellipseTool
    // polygonTool
    // lineTool
    // customShapeTool
    // textAnnotTool
    // soundAnnotTool
    // eyedropperTool
    // colorSamplerTool
    // rulerTool
    // handTool
    // zoomTool
}

function checkString(str, arr_) {
    // Đưa về chữ thường để dễ so sánh
    str = str.toLowerCase();
    // Kiểm tra từng từ khóa
    for (var i = 0; i < arr_.length; i++) {
        if (str.indexOf(arr_[i]) !== -1) {
            return true;
        }
    }
    return false;
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


function saveAlphaChnl(name) {
    var desc977 = new ActionDescriptor();
    var ref38 = new ActionReference();
    ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
    desc977.putReference(charIDToTypeID("null"), ref38);
    desc977.putString(charIDToTypeID("Nm  "), name);
    executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO);
    return activeDocument.channels.getByName(name);
}

function applyHueSat(hue, sat, light) {
    var d = new ActionDescriptor();
    var d2 = new ActionDescriptor();

    // Master channel
    d2.putInteger(charIDToTypeID("H   "), hue);   // Hue: -180 .. +180
    d2.putInteger(charIDToTypeID("Strt"), sat);   // Saturation: -100 .. +100
    d2.putInteger(charIDToTypeID("Lght"), light); // Lightness: -100 .. +100

    d.putObject(charIDToTypeID("Adjs"), charIDToTypeID("Hst2"), d2);

    // gọi lệnh Hue/Saturation
    executeAction(charIDToTypeID("HStr"), d, DialogModes.NO);
}


// blendingOptions(0, 47, 189, 255, 0, 36, 233, 255);
function blendingOptions(srcBlackMin, srcBlackMax, srcWhiteMin, srcWhiteMax, destBlackMin, destBlackMax, destWhiteMin, Dstt) {
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
    var reference2 = new ActionReference();

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
    descriptor.putReference(c2t("null"), reference);
    reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("gray"));
    descriptor3.putReference(s2t("channel"), reference2);
    descriptor3.putInteger(s2t("srcBlackMin"), srcBlackMin);
    descriptor3.putInteger(s2t("srcBlackMax"), srcBlackMax);
    descriptor3.putInteger(s2t("srcWhiteMin"), srcWhiteMin);
    descriptor3.putInteger(s2t("srcWhiteMax"), srcWhiteMax);
    descriptor3.putInteger(s2t("destBlackMin"), destBlackMin);
    descriptor3.putInteger(s2t("destBlackMax"), destBlackMax);
    descriptor3.putInteger(s2t("destWhiteMin"), destWhiteMin);
    descriptor3.putInteger(c2t("Dstt"), Dstt);
    list.putObject(s2t("blendRange"), descriptor3);
    descriptor2.putList(s2t("blendRange"), list);
    descriptor.putObject(s2t("to"), s2t("layer"), descriptor2);
    executeAction(s2t("set"), descriptor, DialogModes.NO);
}

function layerViaCopy1(nameLayer, targetLayer) {
    var layerDuplicate = doc.activeLayer.duplicate(targetLayer, ElementPlacement.PLACEBEFORE);
    layerDuplicate.name = nameLayer;
    doc.activeLayer = layerDuplicate;
    addMask();
    applyMask();
}

function layerViaCopy(nameLayer) {
    var idCpTL = charIDToTypeID("CpTL");
    executeAction(idCpTL, undefined, DialogModes.NO);
    activeDocument.activeLayer.name = nameLayer;
}

//Kiem tra ton tai channel với tên .....
function checkSelectionName(nameChannel) {
    var result = false;
    try {
        var channelRef = app.activeDocument.channels.getByName(nameChannel);
        if (channelRef) {
            result = true;
        }
    } catch (error) { }
    return result;
}

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
//Add selection channel 
//Add selection channel 
function addSelectionToChannelName(channelName) {
    var ch = doc.channels.getByName(channelName);
    doc.selection.store(ch, SelectionType.EXTEND);
}

function resizeImage(width, height) {
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
    app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);

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
// --- Gọi thử ---

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

