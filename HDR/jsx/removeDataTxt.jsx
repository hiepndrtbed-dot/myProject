// Lấy thư mục chứa file script hiện tại
// Tạo đường dẫn đến thư mục con (ví dụ: "Data" nằm cùng cấp)
var dataFolder = new Folder(scriptFolder + "/Data");
if (dataFolder) {
    var txtFiles = getTxtFileNames(dataFolder.fsName);
} else {
    alert("Khong ton tai folder!")
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
// alert(checkboxes.value)
// Hiển thị vùng thông tin
var infoText = win.add("statictext", undefined, "Chưa chọn mục nào");
infoText.preferredSize.width = 250;
var selected = [];
// Khi người dùng click vào checkbox → cập nhật nội dung
for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].onClick = function () {
        for (var j = 0; j < checkboxes.length; j++) {
            if (checkboxes[j].value) selected.push(items[j]);
        }
        infoText.text = selected.length > 0
            ? "Đã chọn:\n" + selected.join("\n ")
            : "Chưa chọn mục nào";
    };
}

// Nút OK và Cancel
var btnGroup = win.add("group");
btnGroup.alignment = "right";
btnGroup.add("button", undefined, "OK");
btnGroup.add("button", undefined, "Cancel");

if (win.show() == 1) {
    for (var j = 0; j < checkboxes.length; j++) {
        if (checkboxes[j].value) {
            var targetFile = File(dataFolder + "/" + items[j]);
            targetFile.remove();
        }
    }
}
// Hiển thị cửa sổ
win.center();


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


// // Kiểm tra thư mục tồn tại
// if (dataFolder.exists) {
//     var txtFiles = dataFolder.getFiles("*.txt");
//     var count = 0;
//     for (var i = 0; i < txtFiles.length; i++) {
//         var file = txtFiles[i];
//         if (file instanceof File && file.exists) {
//             file.remove(); // Xóa file .txt
//             count++;
//         }
//     }
//     alert("Da xoa " + count + " file TXT trong folder:\n" + dataFolder.fsName);
// } else {
//     alert("Thư mục 'Data' không tồn tại cạnh script.");
// }

