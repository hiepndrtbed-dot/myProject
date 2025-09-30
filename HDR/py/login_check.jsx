// #target photoshop
var pathCurentFolder = File($.fileName).parent.fsName;
var pyFetch = pathCurentFolder + "/dist/fetch_passwords.exe";
var pyUpdate = pathCurentFolder + "/dist/update_status.exe";
var pyDecode = pathCurentFolder + "/dist/decode_pw.exe";

var appData = Folder(Folder.userData + "/MyPhotoshopApp");
if (!appData.exists) appData.create();

var localStatusFile = new File(appData + "/login_status.json");
var tempDir = Folder.temp.fsName;
var jsonFile = new File(tempDir + "/accounts.json");

(function () {
    // Nếu đã có login local
    if (localStatusFile.exists) {
        localStatusFile.open("r");
        var localData = JSON.parse(localStatusFile.read());
        localStatusFile.close();
        var loginTime = localData.loginTime; // ví dụ "2025-09-02T17:53:18"
        if (loginTime) {
            // daysBetween(loginTime);
            // alert(daysBetween(loginTime))
            if (daysBetween(loginTime) > localData.LastLogin) {
                alert("⚠️ Tài khoản hết hạn. Vui lòng liên hệ admin hoặc mua mới.");
                var scriptFolder = File($.fileName).parent;
                var targetScript = File(scriptFolder + "/logout.jsx");
                if (targetScript.exists) {
                    $.evalFile(targetScript);
                }
                return;
            } else {
                status = true; // vẫn còn hạn, tự động login
            }
        }
    } else {
        var credentials = showLoginUI();
        if (credentials) {
            var machineID = getMachineID();
        }
        if (!machineID) return;

        // Fetch accounts
        try {
            //run bang python
            // app.system('python "' + pyFetch + '"');
            //run bang exe
            // app.system('"' + pyFetch + '"');
            app.system('cmd /c start /wait "" "' + pyFetch + '"');
        }
        catch (e) { alert("⚠️ Không gọi được Python fetch: " + e); return; }

        if (!jsonFile.exists) { alert("⚠️ Không tìm thấy accounts.json"); return; }
        // Đọc file JSON
        jsonFile.open("r");
        var content = jsonFile.read();
        jsonFile.close();
        jsonFile.remove();
        var data = JSON.parse(content);
        var accounts = data.accounts;

        if (!credentials) return; // cancel
        var username = credentials.username;
        var password = credentials.password;
        var found = null;
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].User === username) { found = accounts[i]; break; }
        }
        if (!found) { alert("❌ Sai tài khoản hoặc mật khẩu!"); return; }

        // Kiểm tra hạn sử dụng dựa trên LastLogin từ JSON
        var activationDate = found.ActivationDate;
        if (activationDate) {
            if (daysBetween(activationDate) > found.LastLogin) { // dùng LastLogin từ file fetch
                alert("⚠️ Tài khoản hết hạn (>" + found.LastLogin + " ngày). Vui lòng liên hệ admin hoặc mua mới.");
                return;
            }
        }

        // Decode password Base64
        // var tmpPwFile = new File(pathCurentFolder + "/tmp_pw.txt");
        //Run bang python
        // var cmdDecode = 'python "' + pyDecode + '" "' + found.Passwork + '" "' + tmpPwFile.fsName + '"';
        //Run bang Exe
        // var cmdDecode = '"' + pyDecode + '" "' + found.Passwork + '" "' + tmpPwFile.fsName + '"';
        var decodedPw = decodeBase64Manual(found.Passwork);
        // app.system(cmdDecode);
        // tmpPwFile.open("r");
        // var decodedPw = tmpPwFile.read();
        // alert(decodedPw)
        // alert(password)
        // tmpPwFile.close();
        // tmpPwFile.remove();

        if (decodedPw !== password) { alert("❌ Sai tài khoản hoặc mật khẩu!"); return; }

        var sheetID = found.UserComputer ? String(found.UserComputer).replace(/\s/g, '') : '';

        if (found.Status == 0 || (found.Status == 1 && sheetID === machineID)) {
            try {
                //Run bang python
                // var cmdUpdate = 'python "' + pyUpdate + '" "' + username + '" 1';
                //Run bang exe
                var cmdUpdate = 'cmd /c start /wait "" "' + pyUpdate + '" "' + username + '" 1';
                app.system(cmdUpdate);
            } catch (e) { alert("⚠️ Không update được status: " + e); return; }

            // Lưu login_status.json với thời gian login
            if (activationDate == "") { activationDate = formatDateISO(new Date()) }
            var loginTime = activationDate;
            var loginData = { user: username, loggedIn: true, loginTime: loginTime, LastLogin: found.LastLogin };
            localStatusFile.open("w");
            localStatusFile.write(JSON.stringify(loginData, null, 2));
            localStatusFile.close();

            alert("✅ Đăng nhập thành công!");
            status = true;
        }
        else if (found.Status == 1 && sheetID !== machineID) {
            alert("⚠️ User đã đăng nhập trên máy khác! Vui lòng logout trên máy khác trước khi đăng nhập trên máy này.");
            var result = showSelectLoginUserUI(sheetID);
            if (result == 1) {
                var cmd = 'cmd /c start /wait "" "' + pyUpdate + '" "' + username + '" 0';
                app.system(cmd);
                // Xóa file login_status.json
                alert("✅ Logout khoi tai khoan! tai may " + sheetID);
            }
        }
    }
})();


// Hàm lấy machine ID từ Python
function getMachineIDi() {
    var tmpFile = new File(pathCurentFolder + "/machine_id.txt");
    try {
        app.system('python -c "from uuid import getnode; f=open(\'' + tmpFile.fsName + '\',\'w\'); f.write(str(getnode()).strip()); f.close()"');
        tmpFile.open("r");
        var id = tmpFile.read();
        tmpFile.close();
        tmpFile.remove();
        return id.replace(/\s/g, '');
    } catch (e) { alert("⚠️ Lỗi lấy machine ID: " + e); return null; }
}

function getMachineID() {
    var tmpFile = new File(Folder.temp + "/machine_id.txt");
    try {
        var cmd = 'cmd /c wmic csproduct get uuid > "' + tmpFile.fsName + '"';
        app.system(cmd);

        // Chờ file xuất hiện
        var waited = 0, maxWait = 3000;
        while (!tmpFile.exists && waited < maxWait) {
            $.sleep(100);
            waited += 100;
        }

        if (!tmpFile.exists) throw "Không tạo được machine_id.txt";

        tmpFile.open("r");
        var lines = tmpFile.read().split("\n");
        tmpFile.close();
        tmpFile.remove();

        // UUID thường nằm ở dòng thứ 2
        var uuid = lines[1] ? lines[1].replace(/\s/g, '') : null;
        return uuid || "UNKNOWN";
    } catch (e) {
        alert("⚠️ Không lấy được Machine ID: " + e);
        return null;
    }
}
// Hàm format date ISO (ExtendScript không hỗ trợ toISOString)
function formatDateISO(date) {
    function pad(n) { return n < 10 ? '0' + n : n; }
    return date.getFullYear() + '-'
        + pad(date.getMonth() + 1) + '-'
        + pad(date.getDate()) + 'T'
        + pad(date.getHours()) + ':'
        + pad(date.getMinutes()) + ':'
        + pad(date.getSeconds());
}

// Hàm tính số ngày giữa 2 ngày (yyyy-MM-dd)
function daysBetween(dateStr) {
    var datePart = dateStr.split("T")[0]; // "2025-09-02"
    var parts = datePart.split('-');
    var lastLoginDate = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])); // UTC
    var today = new Date();
    var todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    var diffDays = Math.floor((todayUTC - lastLoginDate) / (1000 * 60 * 60 * 24));
    return diffDays// số ngày
}

// UI login
function showLoginUI() {
    var win = new Window("dialog", "Login Photoshop");
    win.alignChildren = ["fill", "top"]; win.spacing = 5; win.margins = 5;

    win.add("statictext", undefined, "User:");
    var userInput = win.add("edittext", undefined, ""); userInput.characters = 10;
    userInput.active = true;

    win.add("statictext", undefined, "Password:");
    var pwInput = win.add("edittext", undefined, ""); pwInput.characters = 10; pwInput.password = true;

    var btnGroup = win.add("group"); btnGroup.alignment = "center";
    btnGroup.add("button", undefined, "Login", { name: "ok" });
    btnGroup.add("button", undefined, "Cancel", { name: "cancel" });

    return (win.show() == 1) ? { username: userInput.text, password: pwInput.text } : null;
}

function showSelectLoginUserUI(nameComputer) {
    var win = new Window("dialog", "Select User!");
    win.alignChildren = ["fill", "top"]; win.spacing = 5; win.margins = 5;
    win.add("statictext", undefined, "Bạn có muốn thoát tài khoản tại máy" + nameComputer);
    var btnGroup = win.add("group"); btnGroup.alignment = "center"
    btnGroup.add("button", undefined, "Yes", { name: "ok" });
    btnGroup.add("button", undefined, "No", { name: "cancel" });
    return (win.show() == 1) ? 1 : 0;
}

function decodeBase64Manual(base64Str) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var buffer = 0, bits = 0;

    for (var i = 0; i < base64Str.length; i++) {
        var c = base64Str.charAt(i);
        if (c === "=") break;
        var val = chars.indexOf(c);
        if (val < 0) continue;

        buffer = (buffer << 6) | val;
        bits += 6;

        if (bits >= 8) {
            bits -= 8;
            output += String.fromCharCode((buffer >> bits) & 0xFF);
        }
    }
    return output;
}
