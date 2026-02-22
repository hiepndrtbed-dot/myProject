app.activeDocument.layers[0].isBackgroundLayer=false;
app.activeDocument.layers[0].name="Background";
var idapplyLocking = stringIDToTypeID( "applyLocking" );
    var desc20 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref15 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref15.putEnumerated( idLyr, idOrdn, idTrgt );
    desc20.putReference( idnull, ref15 );
    var idlayerLocking = stringIDToTypeID( "layerLocking" );
        var desc21 = new ActionDescriptor();
        var idprotectAll = stringIDToTypeID( "protectAll" );
        desc21.putBoolean( idprotectAll, true );
    var idlayerLocking = stringIDToTypeID( "layerLocking" );
    desc20.putObject( idlayerLocking, idlayerLocking, desc21 );
executeAction( idapplyLocking, desc20, DialogModes.NO );

var cloneLayer=app.activeDocument.artLayers.add();
cloneLayer.name="clone";

var groupN=app.activeDocument.layerSets.add();
groupN.name="background";

// SELECTION FROM PATH 1 
var idsetd = charIDToTypeID( "setd" );
    var desc148 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );        var ref85 = new ActionReference();        var idChnl = charIDToTypeID( "Chnl" );        var idfsel = charIDToTypeID( "fsel" );        ref85.putProperty( idChnl, idfsel );    desc148.putReference( idnull, ref85 );
    var idT = charIDToTypeID( "T   " );        var ref86 = new ActionReference();        var idPath = charIDToTypeID( "Path" );        ref86.putName( idPath, "Path 1" );    desc148.putReference( idT, ref86 );    var idVrsn = charIDToTypeID( "Vrsn" );
    desc148.putInteger( idVrsn, 1 );    var idvectorMaskParams = stringIDToTypeID( "vectorMaskParams" );
    desc148.putBoolean( idvectorMaskParams, true );  executeAction( idsetd, desc148, DialogModes.NO );
// SELECTION FROM PATH 1 

    app.activeDocument.selection.invert();
    
    

var idMk = charIDToTypeID( "Mk  " );
    var desc166 = new ActionDescriptor();    var idNw = charIDToTypeID( "Nw  " );    var idChnl = charIDToTypeID( "Chnl" );    desc166.putClass( idNw, idChnl );    var idAt = charIDToTypeID( "At  " );        var ref106 = new ActionReference();        var idChnl = charIDToTypeID( "Chnl" );        var idChnl = charIDToTypeID( "Chnl" );
    var idMsk = charIDToTypeID( "Msk " );        ref106.putEnumerated( idChnl, idChnl, idMsk );    desc166.putReference( idAt, ref106 );    var idUsng = charIDToTypeID( "Usng" );    var idUsrM = charIDToTypeID( "UsrM" );    var idRvlS = charIDToTypeID( "RvlS" );    desc166.putEnumerated( idUsng, idUsrM, idRvlS );
executeAction( idMk, desc166, DialogModes.NO );

x= [[65,59,59,59],[130,129,129,129],[221,244,244,244],[236,255,255,255]];  // x max length = 16. or 14 if addSTARTENDpoint==true;
CurvesEND(x,true);
app.activeDocument.activeLayer.name="bkgd curve";

HueSat(0,-100,0,false);
app.activeDocument.activeLayer.name="desat shadow";

adjSolid(255,255,255);
app.activeDocument.activeLayer.name="shadow bleed guard";

// SELECT MASK CHANNEL
var idslct = charIDToTypeID( "slct" );    var desc317 = new ActionDescriptor();    var idnull = charIDToTypeID( "null" );        var ref158 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );        var idChnl = charIDToTypeID( "Chnl" );        var idMsk = charIDToTypeID( "Msk " );        ref158.putEnumerated( idChnl, idChnl, idMsk );
    desc317.putReference( idnull, ref158 );executeAction( idslct, desc317, DialogModes.NO );
// SELECT MASK CHANNEL

function adjSolid(r,g,b){
    var idMk = charIDToTypeID( "Mk  " );
    var desc300 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref144 = new ActionReference();
        var idcontentLayer = stringIDToTypeID( "contentLayer" );
        ref144.putClass( idcontentLayer );
    desc300.putReference( idnull, ref144 );
    var idUsng = charIDToTypeID( "Usng" );
        var desc301 = new ActionDescriptor();
        var idType = charIDToTypeID( "Type" );
            var desc302 = new ActionDescriptor();
            var idClr = charIDToTypeID( "Clr " );
                var desc303 = new ActionDescriptor();
                var idRd = charIDToTypeID( "Rd  " );
                desc303.putDouble( idRd, r );
                var idGrn = charIDToTypeID( "Grn " );
                desc303.putDouble( idGrn,  g );
                var idBl = charIDToTypeID( "Bl  " );
                desc303.putDouble( idBl, b );
            var idRGBC = charIDToTypeID( "RGBC" );
            desc302.putObject( idClr, idRGBC, desc303 );
        var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
        desc301.putObject( idType, idsolidColorLayer, desc302 );
    var idcontentLayer = stringIDToTypeID( "contentLayer" );
    desc300.putObject( idUsng, idcontentLayer, desc301 );
executeAction( idMk, desc300, DialogModes.NO );


    }

function CurvesEND(x,addSTARTENDpoint){
        var idMk = charIDToTypeID( "Mk  " );
            var desc175 = new ActionDescriptor();            var idnull = charIDToTypeID( "null" );
                var ref65 = new ActionReference();                var idAdjL = charIDToTypeID( "AdjL" );
                ref65.putClass( idAdjL );            desc175.putReference( idnull, ref65 );
            var idUsng = charIDToTypeID( "Usng" );                var desc176 = new ActionDescriptor();
                var idType = charIDToTypeID( "Type" );                    var desc177 = new ActionDescriptor();
                    var idpresetKind = stringIDToTypeID( "presetKind" );                    var idpresetKindType = stringIDToTypeID( "presetKindType" );                    var idpresetKindDefault = stringIDToTypeID( "presetKindDefault" );
                    desc177.putEnumerated( idpresetKind, idpresetKindType, idpresetKindDefault );
                var idCrvs = charIDToTypeID( "Crvs" );                desc176.putObject( idType, idCrvs, desc177 );
            var idAdjL = charIDToTypeID( "AdjL" );            desc175.putObject( idUsng, idAdjL, desc176 );
        executeAction( idMk, desc175, DialogModes.NO );
    for (var deruChannel=0;deruChannel<=2;deruChannel++){
        var channelList = ['Rd  ','Grn ','Bl  '];

            var desc1 = new ActionDescriptor();            var ref1 = new ActionReference();
            ref1.putEnumerated(app.charIDToTypeID('AdjL'), app.charIDToTypeID('Ordn'), app.charIDToTypeID('Trgt'));
            desc1.putReference(app.charIDToTypeID('null'), ref1);
            var desc2 = new ActionDescriptor();            var list1 = new ActionList();
            var desc3 = new ActionDescriptor();            var ref2 = new ActionReference();
            // RED
            ref2.putEnumerated(app.charIDToTypeID('Chnl'), app.charIDToTypeID('Chnl'),app.charIDToTypeID(channelList[deruChannel]));
            desc3.putReference(app.charIDToTypeID('Chnl'), ref2);
            var list2R = new ActionList();
            
            if (addSTARTENDpoint==true){
            var desc4_START_END = new ActionDescriptor();
            desc4_START_END.putDouble(app.charIDToTypeID('Hrzn'), 0);
            desc4_START_END.putDouble(app.charIDToTypeID('Vrtc'), 0);
            list2R.putObject(app.charIDToTypeID('Pnt '), desc4_START_END);
            }
                        for (var i =0;i<=x.length-1;i++){
                            var desc4 = new ActionDescriptor();
                            desc4.putDouble(app.charIDToTypeID('Hrzn'), x[i][0]);
                            desc4.putDouble(app.charIDToTypeID('Vrtc'), x[i][deruChannel+1]);
                            list2R.putObject(app.charIDToTypeID('Pnt '), desc4);
                            }
            if (addSTARTENDpoint==true){
            var desc4_START_END = new ActionDescriptor();
            desc4_START_END.putDouble(app.charIDToTypeID('Hrzn'), 255);
            desc4_START_END.putDouble(app.charIDToTypeID('Vrtc'), 255);
            list2R.putObject(app.charIDToTypeID('Pnt '), desc4_START_END);
            }
                
                
                
            desc3.putList(app.charIDToTypeID('Crv '), list2R);
                   
            list1.putObject(app.charIDToTypeID('CrvA'), desc3);
            desc2.putList(app.charIDToTypeID('Adjs'), list1);
            desc1.putObject(app.charIDToTypeID('T   '), app.charIDToTypeID('Crvs'), desc2);
            executeAction(app.charIDToTypeID('setd'), desc1, DialogModes.NO);
          }  
    }

function HueSat(hue,sat,lightness,colorize){
    // =======================================================
    var idMk = charIDToTypeID( "Mk  " );
        var desc385 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref225 = new ActionReference();
            var idAdjL = charIDToTypeID( "AdjL" );
            ref225.putClass( idAdjL );
        desc385.putReference( idnull, ref225 );
        var idUsng = charIDToTypeID( "Usng" );
            var desc386 = new ActionDescriptor();
            var idType = charIDToTypeID( "Type" );
                var desc387 = new ActionDescriptor();
                var idpresetKind = stringIDToTypeID( "presetKind" );
                var idpresetKindType = stringIDToTypeID( "presetKindType" );
                var idpresetKindDefault = stringIDToTypeID( "presetKindDefault" );
                desc387.putEnumerated( idpresetKind, idpresetKindType, idpresetKindDefault );
                var idClrz = charIDToTypeID( "Clrz" );
                desc387.putBoolean( idClrz, colorize );                      // colorize
                            // MERGE PRO // MERGE PRO // MERGE PRO
                                    var idAdjs = charIDToTypeID( "Adjs" );
                                    var list304 = new ActionList();
                                        var desc744 = new ActionDescriptor();
                                        var idH = charIDToTypeID( "H   " );
                                        desc744.putInteger( idH, hue );
                                        var idStrt = charIDToTypeID( "Strt" );
                                        desc744.putInteger( idStrt, sat );
                                        var idLght = charIDToTypeID( "Lght" );
                                        desc744.putInteger( idLght, lightness );
                                    var idHsttwo = charIDToTypeID( "Hst2" );
                                    list304.putObject( idHsttwo, desc744 );
                                desc387.putList( idAdjs, list304 );
                            // MERGE PRO // MERGE PRO // MERGE PRO
            var idHStr = charIDToTypeID( "HStr" );
            desc386.putObject( idType, idHStr, desc387 );
        var idAdjL = charIDToTypeID( "AdjL" );
        desc385.putObject( idUsng, idAdjL, desc386 );
    executeAction( idMk, desc385, DialogModes.NO );
    }




//  SCRIPT 




//SHADOW BLEED GUARD script for on-figure
//Purpose: create a gradient to prevent the shadow from bleeding on the relevant side
//Requires: crop channel, path 1

// set up units and config no dialogs

app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;

// set up variables
var prodLeftBound;
var prodRightBound;
var cropLeftBound;
var cropRightBound;
var prodWidth;
var prodCenter;
var path1 = app.activeDocument.pathItems.getByName("Path 1");
var prodSelectBounds;
var gradBeginX;
var gradEndX;


// crop variables, cropHeight and cropWidth both refer to the distance from the center of the product to the edge of the crop channel
var cropInterval;
var cropHeight;
var cropWidth;

// select path1 for height and width comparison

path1.makeSelection();

// in the selectBounds array [0] and [1] are x and y for top left corner and [2] and [3] are x and y for bottom right corner (NOTE: may be as just values or UnitValues? not sure)
prodSelectBounds = [ app.activeDocument.selection.bounds[0].as('px'), app.activeDocument.selection.bounds[1].as('px'), app.activeDocument.selection.bounds[2].as('px'), app.activeDocument.selection.bounds[3].as('px') ];

// determine left and right bounds of the path1 selection as well as width

prodLeftBound = prodSelectBounds[0];
prodRightBound = prodSelectBounds[2];

prodWidth = prodSelectBounds[2] - prodSelectBounds[0];

//prodCenterX = prodSelectBounds[0] + (prodWidth / 2);
//prodCenterY = prodSelectBounds[1] + (prodHeight / 2);

//select the crop channel
app.activeDocument.selection.load(app.activeDocument.channels.getByName("crop"), SelectionType.REPLACE);

//determine the left and right bounds of the crop channel
prodSelectBounds = [ app.activeDocument.selection.bounds[0].as('px'), app.activeDocument.selection.bounds[1].as('px'), app.activeDocument.selection.bounds[2].as('px'), app.activeDocument.selection.bounds[3].as('px') ];

cropLeftBound = prodSelectBounds[0];
cropRightBound = prodSelectBounds[2];

app.activeDocument.selection.deselect();

//given the left and right bounds of the crop and product, calculate the start and end X coordinates for the gradient

gradBeginX = cropLeftBound;
gradEndX = prodLeftBound + (prodWidth / 10);



function makeGradient(startX,startY,endX,endY){
	if(app.preferences.rulerUnits === Units.PERCENT){
	var idUnts = charIDToTypeID( "#Prc" );
	
	}
	if(app.preferences.rulerUnits === Units.PIXELS){
		var idUnts = charIDToTypeID( "#Pxl" );
	}
	var idslct = charIDToTypeID( "slct" );
	var desc527 = new ActionDescriptor();
	var idnull = charIDToTypeID( "null" );
	var ref271 = new ActionReference();
	var idGrTl = charIDToTypeID( "GrTl" );
	ref271.putClass( idGrTl );
	desc527.putReference( idnull, ref271 );
	var iddontRecord = stringIDToTypeID( "dontRecord" );
	desc527.putBoolean( iddontRecord, true );
	var idforceNotify = stringIDToTypeID( "forceNotify" );
	desc527.putBoolean( idforceNotify, true );
	executeAction( idslct, desc527, DialogModes.NO );
	var idGrdn = charIDToTypeID( "Grdn" );
	var desc528 = new ActionDescriptor();
	var idFrom = charIDToTypeID( "From" );
	var desc529 = new ActionDescriptor();
	var idHrzn = charIDToTypeID( "Hrzn" );
	desc529.putUnitDouble( idHrzn, idUnts, startX );
	var idVrtc = charIDToTypeID( "Vrtc" );
	desc529.putUnitDouble( idVrtc, idUnts, startY );
	var idPnt = charIDToTypeID( "Pnt " );
	desc528.putObject( idFrom, idPnt, desc529 );
	var idT = charIDToTypeID( "T   " );
	var desc530 = new ActionDescriptor();
	var idHrzn = charIDToTypeID( "Hrzn" );
	desc530.putUnitDouble( idHrzn, idUnts, endX );
	var idVrtc = charIDToTypeID( "Vrtc" );
	desc530.putUnitDouble( idVrtc, idUnts, endY );
	var idPnt = charIDToTypeID( "Pnt " );
	desc528.putObject( idT, idPnt, desc530 );
	var idMd = charIDToTypeID( "Md  " );
	var idBlnM = charIDToTypeID( "BlnM" );
	var idLghn = charIDToTypeID( "Lghn" );
	desc528.putEnumerated( idMd, idBlnM, idLghn );
	var idType = charIDToTypeID( "Type" );
	var idGrdT = charIDToTypeID( "GrdT" );
	var idLnr = charIDToTypeID( "Lnr " );
	desc528.putEnumerated( idType, idGrdT, idLnr );
	var idUsMs = charIDToTypeID( "UsMs" );
	desc528.putBoolean( idUsMs, true );
	var idGrad = charIDToTypeID( "Grad" );
	var desc531 = new ActionDescriptor();
	var idNm = charIDToTypeID( "Nm  " );
	desc531.putString( idNm, "white to trans" );
	var idGrdF = charIDToTypeID( "GrdF" );
	var idGrdF = charIDToTypeID( "GrdF" );
	var idCstS = charIDToTypeID( "CstS" );
	desc531.putEnumerated( idGrdF, idGrdF, idCstS );
	var idIntr = charIDToTypeID( "Intr" );
	desc531.putDouble( idIntr, 4096.000000 );
	var idClrs = charIDToTypeID( "Clrs" );
	var list49 = new ActionList();
	var desc532 = new ActionDescriptor();
	var idClr = charIDToTypeID( "Clr " );
	var desc533 = new ActionDescriptor();
	var idH = charIDToTypeID( "H   " );
	var idAng = charIDToTypeID( "#Ang" );
	desc533.putUnitDouble( idH, idAng, 317.642212 );
	var idStrt = charIDToTypeID( "Strt" );
	desc533.putDouble( idStrt, 0.000000 );
	var idBrgh = charIDToTypeID( "Brgh" );
	desc533.putDouble( idBrgh, 100.000000 );
	var idHSBC = charIDToTypeID( "HSBC" );
	desc532.putObject( idClr, idHSBC, desc533 );
	var idType = charIDToTypeID( "Type" );
	var idClry = charIDToTypeID( "Clry" );
	var idUsrS = charIDToTypeID( "UsrS" );
	desc532.putEnumerated( idType, idClry, idUsrS );
	var idLctn = charIDToTypeID( "Lctn" );
	desc532.putInteger( idLctn, 0 );
	var idMdpn = charIDToTypeID( "Mdpn" );
	desc532.putInteger( idMdpn, 50 );
	var idClrt = charIDToTypeID( "Clrt" );
	list49.putObject( idClrt, desc532 );
	var desc534 = new ActionDescriptor();
	var idClr = charIDToTypeID( "Clr " );
	var desc535 = new ActionDescriptor();
	var idH = charIDToTypeID( "H   " );
	var idAng = charIDToTypeID( "#Ang" );
	desc535.putUnitDouble( idH, idAng, 136.873169 );
	var idStrt = charIDToTypeID( "Strt" );
	desc535.putDouble( idStrt, 0.000000 );
	var idBrgh = charIDToTypeID( "Brgh" );
	desc535.putDouble( idBrgh, 100.000000 );
	var idHSBC = charIDToTypeID( "HSBC" );
	desc534.putObject( idClr, idHSBC, desc535 );
	var idType = charIDToTypeID( "Type" );
	var idClry = charIDToTypeID( "Clry" );
	var idUsrS = charIDToTypeID( "UsrS" );
	desc534.putEnumerated( idType, idClry, idUsrS );
	var idLctn = charIDToTypeID( "Lctn" );
	desc534.putInteger( idLctn, 4096 );
	var idMdpn = charIDToTypeID( "Mdpn" );
	desc534.putInteger( idMdpn, 50 );
	var idClrt = charIDToTypeID( "Clrt" );
	list49.putObject( idClrt, desc534 );
	desc531.putList( idClrs, list49 );
	var idTrns = charIDToTypeID( "Trns" );
	var list50 = new ActionList();
	var desc536 = new ActionDescriptor();
	var idOpct = charIDToTypeID( "Opct" );
	var idPrc = charIDToTypeID( "#Prc" );
	desc536.putUnitDouble( idOpct, idPrc, 100.000000 );
	var idLctn = charIDToTypeID( "Lctn" );
	desc536.putInteger( idLctn, 0 );
	var idMdpn = charIDToTypeID( "Mdpn" );
	desc536.putInteger( idMdpn, 50 );
	var idTrnS = charIDToTypeID( "TrnS" );
	list50.putObject( idTrnS, desc536 );
	var desc537 = new ActionDescriptor();
	var idOpct = charIDToTypeID( "Opct" );
	var idPrc = charIDToTypeID( "#Prc" );
	desc537.putUnitDouble( idOpct, idPrc, 0.000000 );
	var idLctn = charIDToTypeID( "Lctn" );
	desc537.putInteger( idLctn, 4096 );
	var idMdpn = charIDToTypeID( "Mdpn" );
	desc537.putInteger( idMdpn, 50 );
	var idTrnS = charIDToTypeID( "TrnS" );
	list50.putObject( idTrnS, desc537 );
	desc531.putList( idTrns, list50 );
	var idGrdn = charIDToTypeID( "Grdn" );
	desc528.putObject( idGrad, idGrdn, desc531 );
	executeAction( idGrdn, desc528, DialogModes.NO );
}

function selectionToMask() {
	var id649 = charIDToTypeID( "Mk  " );
	var desc129 = new ActionDescriptor();
	var id650 = charIDToTypeID( "Nw  " );
	var id651 = charIDToTypeID( "Chnl" );
	desc129.putClass( id650, id651 );
	var id652 = charIDToTypeID( "At  " );
	var ref130 = new ActionReference();
	var id653 = charIDToTypeID( "Chnl" );
	var id654 = charIDToTypeID( "Chnl" );
	var id655 = charIDToTypeID( "Msk " );
	ref130.putEnumerated( id653, id654, id655 );
	desc129.putReference( id652, ref130 );
	var id656 = charIDToTypeID( "Usng" );
	var id657 = charIDToTypeID( "UsrM" );
	var id658 = charIDToTypeID( "RvlS" );
	desc129.putEnumerated( id656, id657, id658 );
	executeAction( id649, desc129, DialogModes.NO );
}

function main(X1,Y1,X2,Y2){
	var docRef = activeDocument;
	//var gradLayerset = docRef.layerSets.add();
	//gradLayerset.name = "shadow bleed guard"
	//docRef.selection.selectAll();
	//docRef.activeLayer = gradLayerset;
	//selectionToMask()
	docRef.selection.selectAll();
	var blackFill = new SolidColor();
	blackFill.rgb["hexValue"] = "000000";
	docRef.selection.fill(blackFill);
	docRef.selection.deselect();
	makeGradient(X1,Y1,X2,Y2);
}

main(gradBeginX, 0, gradEndX, 0);


