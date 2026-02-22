// dialogue
var dlg = new Window("dialog", "Photoshop UI");
dlg.add("statictext", undefined, "Nhập theo cú pháp nhé.");

var textContents = "No text";

// check to see if active layer is text
if (app.activeDocument.activeLayer.kind == "LayerKind.TEXT") {
  var textItemRef = app.activeDocument.activeLayer.textItem;
  textContents = textItemRef.contents;

}

// add edit text
var edText = dlg.add("edittext", [0, 0, 220, 20]);
edText.text = textContents;
edText.alignment = "left";
edText.active = true;

//button group
var btnGroup = dlg.add("group");
btnGroup.orientation = "row";
btnGroup.alignment = "center";
btnGroup.orientation = "column";

// add buttons

btnGroup.add("button", undefined, "OK");
btnGroup.add("button", undefined, "Cancel");                                                      
dlg.center();



var myReturn = dlg.show();

if (myReturn == 1) {
  // set checkboxes and input here
  var ask = edText.text;
  // call the function to change text
  doThatThingThatYouDo(ask);
}


function doThatThingThatYouDo(str) {
  // check to see if active layer is text
  if (app.activeDocument.activeLayer.kind == "LayerKind.TEXT") {
    var textItemRef = app.activeDocument.activeLayer.textItem;
    textItemRef.contents = str;
  }
  alert(str);
}