//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS;

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
            [keywordsTran, "Whitening.jsx"],
            [keywordsWall, "wallColor.jsx"],
            [keywordsWindow, "insertWindow.jsx"]
        ];

        // Duyệt qua từng cấu hình
        for (var j = 0; j < checks.length; j++) {
            if (checkString(namePath, checks[j][0]) == true) {
                // alert(namePath);
                var targetScript = File(currentFolder + "/" + checks[j][1]);
                $.evalFile(targetScript);
                break; // chạy xong thì thoát
            }
        }
    }
})();
