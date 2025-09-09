// Kết nối tới Photoshop
var csInterface = new CSInterface();

document.getElementById("btnRun").addEventListener("click", function() {
    // Gọi file JSX
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION);
    csInterface.evalScript('$.evalFile("' + extensionRoot + '/myscript.jsx")');
});


// Kết nối tới Photoshop
