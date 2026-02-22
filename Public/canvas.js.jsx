#target Photoshop;
app.preferences.typeunits = TypeUnits.PIXELS;
var mydoc = app.activeDocument;
var margins = {};
var pro = mydoc.layerSets.getByName("Variant 1").layerSets.getByName("Item 1").artLayers.getByName("Product");
mydoc.activeLayer = pro;
var canvasObj = {
    arrBound: null,
    docImg: app.activeDocument,
    left: function(){this.docImg.resizeCanvas( this.arrBound[2], this.docImg.height, AnchorPosition.MIDDLELEFT); return this;},
    right: function(){this.docImg.resizeCanvas(this.arrBound[0], this.docImg.height, AnchorPosition.MIDDLERIGHT); return this;},
    top: function(){this.docImg.resizeCanvas(this.docImg.width, this.arrBound[3], AnchorPosition.TOPCENTER); return this;},
    bottom: function(){ this.docImg.resizeCanvas(this.docImg.width, this.arrBound[1], AnchorPosition.BOTTOMCENTER); return this;}
}
var bounds =  pro.bounds;
// show only stecncil layer
//showOnly();
mydoc.revealAll();
disMask();
var heightPro = bounds[3]- bounds[1];
var heightCanvas= heightPro/4;
var arrBound = pro.bounds;
arrBound[0] =arrBound[2]-arrBound[0];
arrBound[1] = arrBound[3]-arrBound[1];
canvasObj.arrBound = arrBound;
canvasObj.left().right().top().bottom();
//alert(heightPro);
mydoc.resizeCanvas(mydoc.width+(heightCanvas*2),mydoc.height+(heightCanvas*2),AnchorPosition.MIDDLECENTER);


function disMask(){
    var idsetd = charIDToTypeID( "setd" );
    var desc1173 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref494 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref494.putEnumerated( idLyr, idOrdn, idTrgt );
    desc1173.putReference( idnull, ref494 );
    var idT = charIDToTypeID( "T   " );
        var desc1174 = new ActionDescriptor();
        var idUsrM = charIDToTypeID( "UsrM" );
        desc1174.putBoolean( idUsrM, false );
    var idLyr = charIDToTypeID( "Lyr " );
    desc1173.putObject( idT, idLyr, desc1174 );
    try{
        executeAction( idsetd, desc1173, DialogModes.NO );
    }catch(err){}
}