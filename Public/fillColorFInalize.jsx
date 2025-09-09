var bounds = activeDocument.activeLayer.bounds[2];
if (bounds == 0) {
    fill(100,"white");
}

//fill color với mã màu fill(255, 255, 255, 100) == white

// function fill(red, Grn, blue, opacity) {
// 	var c2t = function (s) {
// 		return app.charIDToTypeID(s);
// 	};

// 	var s2t = function (s) {
// 		return app.stringIDToTypeID(s);
// 	};

// 	var descriptor = new ActionDescriptor();
// 	var descriptor2 = new ActionDescriptor();

// 	descriptor.putEnumerated( s2t( "using" ), s2t( "fillContents" ), s2t( "color" ));
// 	descriptor2.putDouble( s2t( "red" ), red );
// 	descriptor2.putDouble( c2t( "Grn " ), Grn );
// 	descriptor2.putDouble( s2t( "blue" ), blue );
// 	descriptor.putObject( s2t( "color" ), s2t( "RGBColor" ), descriptor2 );
// 	descriptor.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), opacity );
// 	descriptor.putEnumerated( s2t( "mode" ), s2t( "blendMode" ), s2t( "normal" ));
// 	executeAction( s2t( "fill" ), descriptor, DialogModes.NO );
// }


//fill color với tên fill(100,white);
function fill(opacity, color) {
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();

    descriptor.putEnumerated(s2t("using"), s2t("fillContents"), s2t(color));
    descriptor.putUnitDouble(s2t("opacity"), s2t("percentUnit"), opacity);
    descriptor.putEnumerated(s2t("mode"), s2t("blendMode"), s2t("normal"));
    executeAction(s2t("fill"), descriptor, DialogModes.NO);
}

