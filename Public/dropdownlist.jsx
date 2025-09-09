var dialog = new Window("dialog", "ListItem.selected bug");
dialog.orientation = "column";

dialog.ddl = dialog.add("dropdownlist", undefined, ["A", "B", "C"]);
dialog.ddl.preferredSize = [40, 20];
dialog.panel = dialog.add("panel", undefined, "Options:");
dialog.panel.preferredSize = [200, 100];
dialog.panel.orientation = "stack";

var options = new Array();
var texts = ["This is A", "This is B", "This is C"];
for (var i = 0; i < dialog.ddl.items.length; ++i) {
    var itemOpts = dialog.panel.add("statictext", undefined, texts[i]);
    options.push(itemOpts);
}

// dialog.ddl.function() {
//     for (var i = 0; i < options.length; ++i) {
//         if (this.items[i].selected) {
//             options[i].show();
//         }
//         else {
//             options[i].hide();
//         }
//     }
// };

/*dialog.ddl.function() {
for (var i = 0; i < options.length; ++i) {
options[i].hide();
}
options[this.selection.index].show();
};*/

// dialog.ddl.selection = 0;

dialog.center();
dialog.show();