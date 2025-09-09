var dlg = new Window( "dialog", "Alert Box Builder" );
dlg.btnPnl = dlg.add( "panel", undefined, "Build it" );
dlg.btnPnl.testBtn = dlg.btnPnl.add( "button", undefined, "Test" );
dlg.btnPnl.buildBtn = dlg.btnPnl.add( "lisbox", undefined, "Build", {name: "ok" } );
dlg.btnPnl.cancelBtn = dlg.btnPnl.add( "button", undefined, "Cancel", { name: "cancel" } );
dlg.show();