#target photoshop
activeDocument.activeLayer = activeDocument.artLayers[2];

// function hasLayerStyle(layer) {
//     var ref = new ActionReference();
//     ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("layerEffects"));
//     ref.putIdentifier(stringIDToTypeID("layer"), layer.id);

//     try {
//         var desc = executeActionGet(ref);
//         return desc.hasKey(stringIDToTypeID("layerEffects"));
//     } catch (e) {
//         return false;
//     }
// }
// // alert(activeDocument.artLayers[0].id)
// var layer = activeDocument.artLayers[2];

// if (hasLayerStyle(layer)) {
//     alert("Layer đã có Blending Options");
// } else {
//     alert("Layer chưa có Blending Options");
// }