
// =======================================================


var idnewPlacedLayer = stringIDToTypeID( "newPlacedLayer" );
executeAction( idnewPlacedLayer, undefined, DialogModes.NO );

var idLvls = charIDToTypeID( "Lvls" );
    var desc30 = new ActionDescriptor();
    var idpresetKind = stringIDToTypeID( "presetKind" );
    var idpresetKindType = stringIDToTypeID( "presetKindType" );
    var idpresetKindCustom = stringIDToTypeID( "presetKindCustom" );
    desc30.putEnumerated( idpresetKind, idpresetKindType, idpresetKindCustom );
    var idAdjs = charIDToTypeID( "Adjs" );
        var list1 = new ActionList();
            var desc31 = new ActionDescriptor();
            var idChnl = charIDToTypeID( "Chnl" );
                var ref12 = new ActionReference();
                var idChnl = charIDToTypeID( "Chnl" );
                var idChnl = charIDToTypeID( "Chnl" );
                var idCmps = charIDToTypeID( "Cmps" );
                ref12.putEnumerated( idChnl, idChnl, idCmps );
            desc31.putReference( idChnl, ref12 );
            var idInpt = charIDToTypeID( "Inpt" );
                var list2 = new ActionList();
                list2.putInteger( 183 );
                list2.putInteger( 255 );
            desc31.putList( idInpt, list2 );
            var idGmm = charIDToTypeID( "Gmm " );
            desc31.putDouble( idGmm, 0.630000 );
        var idLvlA = charIDToTypeID( "LvlA" );
        list1.putObject( idLvlA, desc31 );
    desc30.putList( idAdjs, list1 );
executeAction( idLvls, desc30, DialogModes.NO );
liquify()
// =======================================================
var idHd = charIDToTypeID( "Hd  " );
    var desc32 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref13 = new ActionReference();
        var idfilterFX = stringIDToTypeID( "filterFX" );
        ref13.putIndex( idfilterFX, 1 );
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref13.putEnumerated( idLyr, idOrdn, idTrgt );
    desc32.putReference( idnull, ref13 );
executeAction( idHd, desc32, DialogModes.NO );


var idrasterizeLayer = stringIDToTypeID( "rasterizeLayer" );
    var desc34 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref14 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref14.putEnumerated( idLyr, idOrdn, idTrgt );
    desc34.putReference( idnull, ref14 );
executeAction( idrasterizeLayer, desc34, DialogModes.NO );


function liquify(params) {
    try {
        var idLqFy = charIDToTypeID("LqFy");
        executeAction(idLqFy, undefined, DialogModes.ALL);
    } catch (error) { }
}