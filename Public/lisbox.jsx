// enable double clicking from the Finder or Explorer
//#target photoshop

//Make Photoshop the front most application
app.bringToFront();

// Javascript toolsguide cs5
var locCancelBtn = {
    en: "Cancel",
    es: "Cancelar",
    fr: "XXXXXXXXX",
    nl: "Annuleer",
    ch: "XXXXXXXX"
};
testLbl = {
    en: "Test",
    nl: "Testen"
};
$.localization = true;

var dlg = new Window("dialog", "Alert Box Builder");
btnPnl = dlg.add("panel", undefined, "Build it");


var testBtn = btnPnl.add("button", undefined, localize(testBtn), {
    name: "test"
});
var buildBtn = btnPnl.add("button", undefined, "Build", {
    name: "ok"
});
var cancelBtn = btnPnl.add("button", undefined, "Cancel", {
    name: "cancel"
});
// BUTTONGROUP
// ===========
var buttonGroup = dlg.add("group", undefined, { name: "buttonGroup" });
// buttonGroup.orientation = "row"; 
// buttonGroup.alignChildren = ["right","center"]; 
// buttonGroup.spacing = 8; 
// buttonGroup.margins = [0,10,0,0]; 
// buttonGroup.alignment = ["fill","top"]; 
var testBtn = buttonGroup.add("button", undefined, localize(testLbl), {
    name: "test"
});
var buildBtn = buttonGroup.add("button", undefined, "Build", {
    name: "ok"
});
var cancelBtn = buttonGroup.add("button", undefined, "Cancel", {
    name: "cancel"
});
alert(buildBtn);
dlg.show();