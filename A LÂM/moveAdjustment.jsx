const versionTo = " By Acad -- Version: 1.02 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument;
deselectPath()
var grResource = doc.layerSets["Resources"]
doc.layerSets.add().name = "GroupTempAdjustment"
var grTempAdjustment = doc.layerSets["GroupTempAdjustment"]

//Select group Resources
doc.activeLayer = grResource
run()

//Selection mask Product
var grVariant = doc.layerSets["Variant 1"]
var grItem = grVariant.layerSets["Item 1"]
doc.activeLayer = grItem
//Check name Product and check mask
for (var i = 0; i < doc.activeLayer.artLayers.length; i++) {
    if (doc.activeLayer.artLayers[i].name.search("Product") == 0) {
        doc.activeLayer = doc.activeLayer.artLayers[i]
        //Check mask and load selection Product
        if (hasLayerMask()) {
            loadSelectionMask()
            doc.activeLayer = grTempAdjustment
            var j = 0
            while (j < doc.activeLayer.artLayers.length) {
                doc.activeLayer = doc.activeLayer.artLayers[j]
                //Fill new mask width selection
                if (hasLayerMask()) {
                    deleteMask()
                    addMask()
                    loadSelectionMask()
                }
                j++
                //Return again group parent
                doc.activeLayer = doc.activeLayer.parent
            }
            //Remove selection end while
            doc.selection.deselect()
            break
        }
        doc.activeLayer = grItem
    }
}

//Length All group
var lengthGrAll = doc.layers.length

for (var j = 1; j < lengthGrAll; j++) {
    doc.activeLayer = doc.layers[j]
    if (doc.activeLayer.name.search("Variant") == 0) {
        doc.activeLayer = grTempAdjustment
        for (var k = 0; k < doc.activeLayer.artLayers.length; k++) {
            doc.activeLayer = doc.activeLayer.artLayers[k]
            doc.activeLayer.duplicate(doc.layers[j].layers[0], ElementPlacement.PLACEATEND).name = doc.activeLayer.name
            doc.activeLayer = doc.activeLayer.parent
        }
    }
}

grTempAdjustment.remove()

purgeAll()
function run() {
    if (doc.activeLayer.typename == "LayerSet") {
        //Length layer in group
        var lengthGroup = doc.activeLayer.layers.length
        for (var i = 0; i < lengthGroup; i++) {
            doc.activeLayer = doc.activeLayer.layers[i]
            run()
            doc.activeLayer = doc.activeLayer.parent
        }
    } else {
        if (doc.activeLayer.kind.toString().split('.')[1] != "NORMAL")
            doc.activeLayer.duplicate(grTempAdjustment, ElementPlacement.PLACEATEND).name = doc.activeLayer.name
    }


}

//kiem tra layer co ton tai mask khong
function hasLayerMask() {
    var reference = new ActionReference();
    reference.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    var desc = executeActionGet(reference);
    return desc.getBoolean(stringIDToTypeID("hasUserMask"));
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

function deleteMask() {
    var idDlt = charIDToTypeID("Dlt ");
    var desc26 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref22 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref22.putEnumerated(idChnl, idChnl, idMsk);
    desc26.putReference(idnull, ref22);
    executeAction(idDlt, desc26, DialogModes.NO);
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

function purgeAll() {
    var idPrge = charIDToTypeID("Prge");
    var desc7726 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var idPrgI = charIDToTypeID("PrgI");
    var idAl = charIDToTypeID("Al  ");
    desc7726.putEnumerated(idnull, idPrgI, idAl);
    executeAction(idPrge, desc7726, DialogModes.NO);
}
