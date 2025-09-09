// 
// //copy shadow
// //By --Duc Hiep-- Academy Pixelz Da Nang City 
// // #target photoshop;
// app.preferences.rulerUnits = Units.PIXELS
// app.preferences.typeunits = TypeUnits.PIXELS
// var doc = app.activeDocument;
// var opacityShadow = 100
// 
// try {
//     var grShadow1 = doc.layerSets["Variant 1"].layerSets["Shadow 1"]
//     var grShadow2 = doc.layerSets["Variant 2"].layerSets["Shadow 2"]
// } catch (error) { }
// 
// doc.activeLayer = grShadow1
// 
// if (doc.activeLayer.artLayers.length != 0) {
//     doc.activeLayer = grShadow1.artLayers[0]
// }
// 
// try {
//     //hiden drop shadow
//     var idHd = charIDToTypeID("Hd  ");
//     var desc134 = new ActionDescriptor();
//     var idnull = charIDToTypeID("null");
//     var list26 = new ActionList();
//     var ref90 = new ActionReference();
//     var idDrSh = charIDToTypeID("DrSh");
//     ref90.putIndex(idDrSh, 1);
//     var idLyr = charIDToTypeID("Lyr ");
//     var idOrdn = charIDToTypeID("Ordn");
//     var idTrgt = charIDToTypeID("Trgt");
//     ref90.putEnumerated(idLyr, idOrdn, idTrgt);
//     list26.putReference(ref90);
//     desc134.putList(idnull, list26);
//     executeAction(idHd, desc134, DialogModes.NO);
//     //show drop shadow
//     var idShw = charIDToTypeID("Shw ");
//     var desc139 = new ActionDescriptor();
//     var idnull = charIDToTypeID("null");
//     var list28 = new ActionList();
//     var ref94 = new ActionReference();
//     var idDrSh = charIDToTypeID("DrSh");
//     ref94.putIndex(idDrSh, 1);
//     var idLyr = charIDToTypeID("Lyr ");
//     var idOrdn = charIDToTypeID("Ordn");
//     var idTrgt = charIDToTypeID("Trgt");
//     ref94.putEnumerated(idLyr, idOrdn, idTrgt);
//     list28.putReference(ref94);
//     desc139.putList(idnull, list28);
//     executeAction(idShw, desc139, DialogModes.NO);
//     //create layer shadow
//     var idMk = charIDToTypeID("Mk  ");
//     var desc145 = new ActionDescriptor();
//     var idnull = charIDToTypeID("null");
//     var ref99 = new ActionReference();
//     var idLyr = charIDToTypeID("Lyr ");
//     ref99.putClass(idLyr);
//     desc145.putReference(idnull, ref99);
//     var idUsng = charIDToTypeID("Usng");
//     var ref100 = new ActionReference();
//     var idPrpr = charIDToTypeID("Prpr");
//     var idLefx = charIDToTypeID("Lefx");
//     ref100.putProperty(idPrpr, idLefx);
//     var idLyr = charIDToTypeID("Lyr ");
//     var idOrdn = charIDToTypeID("Ordn");
//     var idTrgt = charIDToTypeID("Trgt");
//     ref100.putEnumerated(idLyr, idOrdn, idTrgt);
//     desc145.putReference(idUsng, ref100);
//     executeAction(idMk, desc145, DialogModes.NO);
//     doc.activeLayer.remove()
//     doc.activeLayer.name = "Shadow"
// 
// } catch (error) {
// 
// } finally {
//     doc.activeLayer = grShadow1
//     if (doc.activeLayer.artLayers.length != 0) {
//         doc.activeLayer = grShadow1.artLayers[0]
//         doc.activeLayer.blendMode = BlendMode.NORMAL;
//         doc.activeLayer.opacity = opacityShadow;
//         var lengthSD2 = grShadow2.artLayers.length
//         for (var i = 0; i < lengthSD2; i++) {
//             grShadow2.artLayers[i].remove()
//         }
//         doc.activeLayer.duplicate(grShadow2, ElementPlacement.PLACEATEND)
//     } else {
//     }
// }
// 
