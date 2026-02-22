
function selectionSubjectKillSsece() {
    var doc = activeDocument;
    //select ALL
    activeDocument.selection.selectAll();

    //save vung chon voi ten Crop
    saveSelection("Crop");

    //chon layer tren cung
    select(false);

    //Cong them vung chon 
    add();

    //crop tu vung chon
    try {
        var bound = doc.selection.bounds
        cropToSelection(bound[1], bound[0], bound[3], bound[2])
    }
    catch (e) { }

    //select Subject
    autoCutout(true);

    function selectLayer(layerName) {
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
    }

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


    function autoCutout(sampleAllLayers) {
        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();

        descriptor.putBoolean(s2t("sampleAllLayers"), sampleAllLayers);
        executeAction(s2t("autoCutout"), descriptor, DialogModes.NO);
    }



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
