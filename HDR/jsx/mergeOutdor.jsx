var curentLayer = doc.layers[0];
var newLayer = doc.artLayers.add();
newLayer.name = "MERGE 1";
newLayer.move(curentLayer, ElementPlacement.PLACEBEFORE);
mergeVisible();
cameraRawOutdoor(false);
alert("Check VERTICAL && CAMERA")
cameraRawFilterALL(0, 0, 10, 10, 5, true);
function showCurves() { executeAction(charIDToTypeID("Crvs"), undefined, DialogModes.ALL); }

function mergeVisible() {
    var idMrgV = charIDToTypeID("MrgV");
    var desc25388 = new ActionDescriptor();
    var idDplc = charIDToTypeID("Dplc");
    desc25388.putBoolean(idDplc, true);
    executeAction(idMrgV, desc25388, DialogModes.NO);
}


function openCameraRaw() {
    // Tạo một ActionDescriptor để gọi Camera Raw
    var idCameraRaw = stringIDToTypeID("Adobe Camera Raw Filter");
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    desc.putReference(charIDToTypeID("null"), ref);
    executeAction(idCameraRaw, desc, DialogModes.ALL);
}

function cameraRawOutdoor(withDialog) {
    var a = new ActionDescriptor();
    a.putInteger(charIDToTypeID('Cr12'), 5);//contract
    a.putInteger(charIDToTypeID('Hi12'), -15);//highlight
    a.putInteger(charIDToTypeID('Sh12'), 20);//shadow
    a.putInteger(charIDToTypeID('Temp'), 0);//temp
    a.putInteger(charIDToTypeID('Tint'), -1);
    a.putInteger(charIDToTypeID('Cl12'), 4);//Clarity
    a.putInteger(charIDToTypeID('Dhze'), 6);//Dehaze
    a.putInteger(charIDToTypeID('LNR '), 12);//Noise Reduction
    a.putInteger(charIDToTypeID('LNRD'), 50);//Detail Noise Reduction
    a.putInteger(charIDToTypeID('LNRC'), 0);//Contract Noise Reduction
    executeAction(stringIDToTypeID('Adobe Camera Raw Filter'), a, withDialog ? DialogModes.ALL : DialogModes.NO);
}