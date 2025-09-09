// Lấy thư mục chứa file script hiện tại
var scriptFolder = File($.fileName).parent.parent;
// Tạo đường dẫn đến thư mục con (ví dụ: "Data" nằm cùng cấp)
var dataFolder = new Folder(scriptFolder + "/Data");
// Kiểm tra thư mục tồn tại
if (dataFolder.exists) {
    var txtFiles = dataFolder.getFiles("*.txt");
    var count = 0;
    for (var i = 0; i < txtFiles.length; i++) {
        var file = txtFiles[i];
        if (file instanceof File && file.exists) {
            file.remove(); // Xóa file .txt
            count++;
        }
    }
    alert("Da xoa " + count + " file TXT trong folder:\n" + dataFolder.fsName);
} else {
    alert("Thư mục 'Data' không tồn tại cạnh script.");
}