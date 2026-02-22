// #target photoshop
var pathCurentFolder = File($.fileName).parent.fsName;
var pyUpdateCode = pathCurentFolder + "/dist/updateCode.exe";
app.system('cmd /c start /wait "" "' + pyUpdateCode + '"');
