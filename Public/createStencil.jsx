const versionTo = " By Acad -- Version: 1.02 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var doc = activeDocument;
(function () {
    var progressWindow = new Window("window", "Progress"); // Tạo cửa sổ tiến trình
    var progressText = progressWindow.add("statictext", undefined, "Processing: "); // Thêm văn bản tiến trình
    progressText.preferredSize.width = 300; // Đặt kích thước thanh tiến trình

    var dialog = new Window("dialog");
    dialog.text = "Create Stencil Pixelz!";
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10;
    dialog.margins = 16;

    // GROUP2
    // ======
    var group2 = dialog.add("group", undefined, { name: "group2" });
    group2.orientation = "row";
    group2.alignChildren = ["left", "center"];
    group2.spacing = 10;
    group2.margins = 0;

    // PANEL1
    // ======
    var panel1 = group2.add("panel", undefined, undefined, { name: "panel1" });
    panel1.text = "Input Width / Height";
    panel1.preferredSize.width = 160;
    panel1.orientation = "column";
    panel1.alignChildren = ["left", "top"];
    panel1.spacing = 10;
    panel1.margins = 10;

    // GROUP3
    // ======
    var group3 = panel1.add("group", undefined, { name: "group3" });
    group3.orientation = "row";
    group3.alignChildren = ["left", "center"];
    group3.spacing = 10;
    group3.margins = 0;

    var row = group3.add("statictext", undefined, undefined, { name: "Width" });
    row.text = "Width";
    row.preferredSize.width = 50;
    row.justify = "right";

    var inputWidth = group3.add('edittext {properties: {name: "inputWidth"}}');
    inputWidth.preferredSize.width = 100;
    inputWidth.active = true

    // GROUP4
    // ======
    var group4 = panel1.add("group", undefined, { name: "group4" });
    group4.orientation = "row";
    group4.alignChildren = ["left", "center"];
    group4.spacing = 10;
    group4.margins = 0;

    var cols = group4.add("statictext", undefined, undefined, { name: "Input Height" });
    cols.text = "Height";
    cols.preferredSize.width = 50;
    cols.justify = "right";

    var inputHeight = group4.add('edittext {properties: {name: "inputHeight"}}');
    inputHeight.preferredSize.width = 100;


    // GROUP5 margin
    // ======
    var group5 = panel1.add("group", undefined, { name: "group4" });
    group5.orientation = "row";
    group5.alignChildren = ["left", "center"];
    group5.spacing = 10;
    group5.margins = 0;

    var margin = group5.add("statictext", undefined, undefined, { name: "Input Margin" });
    margin.text = "Margin";
    margin.preferredSize.width = 50;
    margin.justify = "right";

    var inputMargin = group5.add('edittext {properties: {name: "inputMargin"}}');
    inputMargin.preferredSize.width = 50;

    // GROUP5 Align

    // GROUP6
    // ======
    var group6 = panel1.add("group", undefined, { name: "group6" });
    group6.orientation = "row";
    group6.alignChildren = ["left", "center"];
    group6.spacing = 10;
    group6.margins = 0;

    var left = group6.add("radiobutton", undefined, undefined, { name: "Left" });
    left.text = "Left";
    // left.value = true;

    var top = group6.add("radiobutton", undefined, undefined, { name: "Top" });
    top.text = "Top";

    var right = group6.add("radiobutton", undefined, undefined, { name: "Right" });
    right.text = "Right";

    var bottom = group6.add("radiobutton", undefined, undefined, { name: "Bottom" });
    bottom.text = "Bottom";

    // GROUP7
    // ======
    var group7 = dialog.add("group", undefined, { name: "group7" });
    group7.orientation = "row";
    group7.alignChildren = ["left", "center"];
    group7.spacing = 10;
    group7.margins = 0;

    var progressbar1 = group7.add("progressbar", undefined, undefined, { name: "progressbar1" });
    progressbar1.maxvalue = 100;
    progressbar1.value = 100;
    progressbar1.preferredSize.width = 160;
    progressbar1.preferredSize.height = 5;

    // GROUP8
    // ======
    var group8 = dialog.add("group", undefined, { name: "group8" });
    group8.orientation = "row";
    group8.alignChildren = ["left", "center"];
    group8.spacing = 10;
    group8.margins = 0;

    var button2 = group8.add("button", undefined, undefined, { name: "button2" });
    button2.text = "Process";

    var button3 = group8.add("button", undefined, undefined, { name: "button3" });
    button3.text = "Cancel";

    button2.addEventListener("click", function () {
        dialog.close(1)
        var iWidth = inputWidth.text
        var iHeight = inputHeight.text
        var iMargin = inputMargin.text
        var align = new Object();
        align.iLeft = left.value
        align.iRight = right.value
        align.iTop = top.value
        align.iBottom = bottom.value
        createStencil(iWidth, iHeight, iMargin, align)

    })
    //=================
    function createStencil(iWidth, iHeight, iMargin, align) {
        //Tim gia tri Align được chọn
        for (var key in align) {
            if (align[key] == true) {
                var key = key
                break
            } else {
                var key = "iCenter"
            }
        }
        resize(iWidth, iHeight, iMargin, align, key)
    }

    function resize(iWidth, iHeight, iMargin, align, key) {

        var MedWidth = UnitValue(iWidth, "px");
        var MedHeight = UnitValue(iHeight, "px");

        var radioWidth = doc.width / MedWidth
        var radioHeight = doc.height / MedHeight
        //Kiem tra ty le
        if (radioWidth > radioHeight) {
            doc.resizeImage(MedWidth, null, null, ResampleMethod.BICUBIC)
            doc.resizeCanvas(null, MedHeight, AnchorPosition.MIDDLECENTER)
            var curentLayer = doc.activeLayer
            var layerRef = doc.artLayers.add()
            layerRef.name = "Stencil"
            layerRef.moveBefore(curentLayer)
            fillColor(0, 0, 0)
            doc.activeLayer.opacity = 40
        } else {
            doc.resizeImage(null, MedHeight, null, ResampleMethod.BICUBIC)
            doc.resizeCanvas(MedWidth, null, AnchorPosition.MIDDLECENTER)
            var curentLayer = doc.activeLayer
            var layerRef = doc.artLayers.add()
            layerRef.name = "Stencil"
            layerRef.moveBefore(curentLayer)
            fillColor(0, 0, 0)
            doc.activeLayer.opacity = 40
        }
    }

    dialog.show()

})();

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

function create_new_layer(layername) {
    if (layername == undefined) layername = "Layer";

    // create new layer at top of layers
    var originalLayer = app.activeDocument.activeLayer;
    var layerRef = app.activeDocument.artLayers.add();

    // name it & set blend mode to normal
    layerRef.name = layername;
    layerRef.blendMode = BlendMode.NORMAL;

    // Move the layer belowm
    // layerRef.moveAfter(originalLayer);

    // Move the layer above if you desire
    layerRef.moveBefore(originalLayer);
}

//Fill colo layer.
function fillColor(red, green, blue) {
    var myColor = new SolidColor();
    myColor.rgb.red = red; // 0 - 255
    myColor.rgb.green = green;
    myColor.rgb.blue = blue;
    activeDocument.selection.fill(myColor);

}