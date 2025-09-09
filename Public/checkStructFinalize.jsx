try {
   var bounds = activeDocument.layers.length;
   activeDocument.activeLayer = activeDocument.layers[bounds - 1];
    activeDocument.activeLayer.visible = false;
   var nameLayer = activeDocument.activeLayer.name;
   var searchProductName = nameLayer.search("BACKGROUND");
   if (searchProductName == -1) {
      activeDocument.activeLayer.visible = true;
   }
} catch (error) {
  alert("Cau truc");
}
