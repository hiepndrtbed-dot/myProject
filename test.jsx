// ==============================

function getTxtFileNames(folderPath) {
    var folder = new Folder(folderPath);
    if (!folder.exists) {
        alert("Thư mục không tồn tại!");
        return [];
    }

    // Lọc chỉ lấy file .txt
    var files = folder.getFiles("*.txt");

    // Trả về mảng tên file (không bao gồm đường dẫn)
    var names = [];
    for (var i = 0; i < files.length; i++) {
        names.push(decodeURI(files[i].name));
    }

    return names;
}

// 👉 Gọi hàm
var path3 = "E:\\js\\HDR\\Data";
alert(path3)
if (path3) {
    var txtFiles = getTxtFileNames(path3);
    if (txtFiles.length > 0) {
        alert("Tìm thấy " + txtFiles.length + " file:\n\n" + txtFiles.join("\n"));
    } else {
        alert("Không có file .txt nào trong thư mục này.");
    }
}

// Tạo giao diện checkbox bằng ScriptUI

// ==============================
var win = new Window("dialog", "Chọn thông tin", undefined);
win.orientation = "column";
win.alignChildren = "left";

// Tạo group chứa danh sách checkbox (giống như <ul>)
var listGroup = win.add("group");
listGroup.orientation = "column";
listGroup.alignChildren = "left";

// Các nội dung checkbox
var items = txtFiles;

// Tạo các checkbox động
var checkboxes = [];
for (var i = 0; i < items.length; i++) {
    var cb = listGroup.add("checkbox", undefined, items[i]);
    checkboxes.push(cb);
}

// Hiển thị vùng thông tin
var infoText = win.add("statictext", undefined, "Chưa chọn mục nào");
infoText.preferredSize.width = 250;

// Khi người dùng click vào checkbox → cập nhật nội dung
for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].onClick = function() {
        var selected = [];
        for (var j = 0; j < checkboxes.length; j++) {
            if (checkboxes[j].value) selected.push(items[j]);
        }
        infoText.text = selected.length > 0 ? "Đã chọn: " + selected.join(", ") : "Chưa chọn mục nào";
    };
}

// Nút OK và Cancel
var btnGroup = win.add("group");
btnGroup.alignment = "right";
btnGroup.add("button", undefined, "OK");
btnGroup.add("button", undefined, "Cancel");
 
// Hiển thị cửa sổ
win.center();
win.show();
