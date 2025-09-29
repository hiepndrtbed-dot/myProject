// logout.jsx
// #target photoshop

var currentFolder = File($.fileName).parent.fsName;
var pyUpdate = currentFolder + "/dist/update_status.exe";
var appData = Folder(Folder.userData + "/MyPhotoshopApp");
if (!appData.exists) appData.create();  // tao thu muc neu chua ton tai
var localStatusFile = new File(appData + "/login_status.json");

if (!localStatusFile.exists) {
    alert("⚠️ Chua dang nhap tren may nay!");
} else {
    try {
        // Đọc user từ file local
        localStatusFile.open("r");
        var content = localStatusFile.read();
        localStatusFile.close();
        var loginData = JSON.parse(content);
        var username = loginData.user;

        // Run bang python
        // var cmd = "python \"" + pyUpdate + "\" \"" + username + "\" 0";
        //Run bang exe
        var cmd = 'cmd /c start /wait "" "' + pyUpdate + '" "' + username + '" 0';
        app.system(cmd);

        // Xóa file login_status.json
        localStatusFile.remove();
        alert("✅ Logout khoi tai khoan!");
    } catch (e) {
        alert("❌ Loi khi logout: " + e);
    }
}
