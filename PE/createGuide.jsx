var doc = app.activeDocument;
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
var width = doc.width
var height = doc.height

try {
    if (hasSelection() == true) {
        var bounds = doc.selection.bounds
        var widthSelection = bounds[2] - bounds[0]
        var pointGuide = bounds[2] - widthSelection / 2
        doc.guides.add(Direction.VERTICAL, pointGuide)
        // alert(pointGuide)
        // doc.guides.add()
    } else {
        alert("Thiếu vùng chọn!")
    }

    function hasSelection() {
        var hasSelection = false;
        var ref = new ActionReference();
        ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("selection"));
        ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
        var desc = executeActionGet(ref);
        if (desc.count) hasSelection = true;
        return hasSelection;
    }
} catch (error) {
    alert(err)
}