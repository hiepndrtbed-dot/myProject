
// alert(activeDocument.pathItems.length);
// activeDocument.selection.load(activeDocument.pathItems.getByName('Work Path'));
var doc = activeDocument;

(function () {

    // copy_shadow(1)
    // action("Lvls")
    shadow_natural(1)

    function copy_shadow(vr) {
        grVariant = doc.layerSets["Variant " + vr]
        grColor = grVariant.layerSets["Color " + vr]
        grItem = grVariant.layerSets["Item " + vr]
        grShadow = grVariant.layerSets["Shadow " + vr]
        grBg = grVariant.layerSets["Background " + vr]

        /////////////////////////////
        doc.revealAll()
        doc.activeLayer = grItem
        doc.activeLayer = grItem.artLayers[0]
        if (doc.activeLayer.name == "Stencil") {
            doc.activeLayer.visible = false
        }
        doc.activeLayer = grItem
        doc.selection.copy()
        doc.activeLayer = grShadow
        doc.activeLayer.remove()
        pasteFoder()
        setColorLayer("Grn ");
        doc.activeLayer.name = "Shadow " + vr
        // moveBack()
        length = doc.activeLayer.layers.length
        doc.activeLayer = doc.activeLayer.layers[length - 1]
        doc.activeLayer.allLocked = false
        loadSelectionMask()
        doc.selection.feather(2)
        saveSelection("Product")
        doc.selection.deselect()
        deleteMask()
        doc.activeLayer = doc.activeLayer.parent
        doc.activeLayer.allLocked = false
        if (length >= 2) {
            for (var length; length >= 2; length--) {
                doc.activeLayer = doc.activeLayer.artLayers[0]
                doc.activeLayer.allLocked = false
                if (doc.activeLayer.name == "Stencil") {
                    doc.activeLayer.remove()
                    doc.activeLayer = doc.activeLayer.parent
                } else {
                    doc.activeLayer.merge()
                    doc.activeLayer = doc.activeLayer.parent
                }
            }
        }
        doc.activeLayer = doc.activeLayer.artLayers[0]
        doc.activeLayer.name = "temp_shadow"
        doc.quickMaskMode = true;
    }

    //Giu bong goc
    function shadow_natural(vr) {
        grVariant = doc.layerSets["Variant " + vr]
        grColor = grVariant.layerSets["Color " + vr]
        grItem = grVariant.layerSets["Item " + vr]
        grShadow = grVariant.layerSets["Shadow " + vr]
        grBg = grVariant.layerSets["Background " + vr]
        doc.quickMaskMode = false
        doc.selection.invert()
        saveSelection("selection")
        doc.selection.deselect()
        actionFilter("Lvls")
        doc.selection.load(doc.channels.getByName("selection"))
        doc.activeLayer = grShadow.artLayers["temp_shadow"]
        makeLayerMask(); selectRGB()
        doc.selection.load(doc.channels.getByName("selection"))
        try {
            subtract("Product")
        } catch (error) {
            alert("Not available selection Product channels!")
        }
        cameraRaw(100, 0)
        doc.selection.deselect()
        doc.activeLayer.name = "Natural"
    }


    //Chuyen bong xam
    function shadow_desaturate(vr) {

    }

    //Giu bong Alpha
    function shadow_alpha(vr) {

    }


    //Kiem tra bong
    function check_shadow(vr) {

    }

    //kiem tra le shadow
    function check_canvas(vr) {

    }

})()

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