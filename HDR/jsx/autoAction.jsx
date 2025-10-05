//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
const versionTo = " By Acad -- Version 1.5 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;

(function main() {
    //list pathitems
    var lispath = new Array();
    var lengthPath = activeDocument.pathItems.length;
    deselectPath();
    for (var i = 0; i <= lengthPath - 1; i++) {
        var namePath = activeDocument.pathItems[i].name;
        doc.pathItems.getByName(namePath).makeSelection(0, true, SelectionType.REPLACE);
        var keywordsWall = ["tuong", "tường", "wall", "walls"];
        var keywordsTran = ["tran", "trần", "chi", "chỉ", "phao", "phào"];
        var keywordsWindow = ["cua", "cửa", "window", "windows"];
        // Danh sách cấu hình: [keywords, fileName]
        var checks = [
            [keywordsWall, "wallColor.jsx"],
            [keywordsTran, "Whitening.jsx"],
            [keywordsWindow, "insertWindow.jsx"]
        ];

        // Duyệt qua từng cấu hình
        for (var j = 0; j < checks.length; j++) {
            if (checkString(namePath, checks[j][0]) == true) {
                var targetScript = File(currentFolder + "/" + checks[j][1]);
                $.evalFile(targetScript);
                break; // chạy xong thì thoát
            }
        }
    }
})();


function checkString(str, arr_) {
    // Đưa về chữ thường để dễ so sánh
    str = str.toLowerCase();
    // Kiểm tra từng từ khóa
    for (var i = 0; i < arr_.length; i++) {
        if (str.indexOf(arr_[i]) !== -1) {
            return true;
        }
    }
    return false;
}

function deselectPath() {
    var idDslc = charIDToTypeID("Dslc");
    var desc2657 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref325 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref325.putEnumerated(idPath, idOrdn, idTrgt);
    desc2657.putReference(idnull, ref325);
    executeAction(idDslc, desc2657, DialogModes.NO);
}