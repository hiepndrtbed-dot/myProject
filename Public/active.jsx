//Check Login
(function () {
    var logKeyAccount = new File("/172.16.2.2/Academy/Automation_by_Academy/Scripts/Host/active.csv")
    //var logKeyAccount = new File("D:/ACA/Js/Public/account.csv")
    var logUser = new File("~/AppData/Roaming/Adobe/Adobe Photoshop CC 2019/Adobe Photoshop CC 2019 Settings/LogUs.csv")
    if (logKeyAccount.exists) {
        logKeyAccount.open("r")
        logText = logKeyAccount.readln()
        if (logUser.exists) {
            logUser.open("r")
            user = logUser.readln()
            if (user != "") {
                var flag = false
                //So sanh điều kiện người dùng
                while (logText != "") {
                    logText = logKeyAccount.readln()
                    if (user == logText.split(",")[2]) {
                        // alert("cho phep dung!")
                        flag = true
                        break
                    }
                }
                //Check Flag nếu true thì cho phép sử dụng.
                if (flag == true) {
                    diaglog()
                } else {
                    alert("Liên hệ người cấp user!")
                }
            } else {
                frame()
            }

        } else {//Yeu cau nhap key va tao file user ban dau
            frame()
        }
        logUser.close()
        logKeyAccount.close()
    }

    function frame() {
        // DIALOG
        // ======
        var dialog = new Window("dialog");
        dialog.text = "Input Key";
        dialog.orientation = "column";
        dialog.alignChildren = ["center", "top"];
        dialog.spacing = 5;
        dialog.margins = 10;

        // VALIDATE
        // ========
        var validate = dialog.add("group", undefined, { name: "validate" });
        validate.orientation = "row";
        validate.alignChildren = ["left", "center"];
        validate.spacing = 10;
        validate.margins = 0;

        var validateText = validate.add("statictext", undefined, undefined, { name: "validateText" });
        validateText.preferredSize.width = 150;
        validateText.justify = "center";
        validateText.text = "Nhập Key để mở khóa!";

        // BODY
        // ====
        var body = dialog.add("group", undefined, { name: "body" });
        body.orientation = "row";
        body.alignChildren = ["left", "center"];
        body.spacing = 10;
        body.margins = 0;

        var edittext1 = body.add('edittext {justify: "center", properties: {name: "edittext1", enterKeySignalsOnChange: true}}');
        edittext1.preferredSize.width = 150;
        edittext1.preferredSize.height = 0;
        edittext1.active = true

        // GROUP1
        // ======
        var group1 = dialog.add("group", undefined, { name: "group1" });
        group1.orientation = "row";
        group1.alignChildren = ["left", "center"];
        group1.spacing = 10;
        group1.margins = 0;

        var button1 = group1.add("button", undefined, undefined, { name: "Nhap_Key" });
        button1.text = "Nhập Key";

        var button2 = group1.add("button", undefined, undefined, { name: "Cancel" });
        button2.text = "Hủy";

        // BY

        var by = dialog.add("statictext", undefined, undefined, { name: "by" });
        by.preferredSize.width = 150;
        by.preferredSize.height = 10
        by.spacing = 15;
        by.justify = "bottom";
        by.text = "Aca - 1.01 -";


        //Kiểm tra điều kiện Key được cung cấp.
        button1.addEventListener("click", function () {
            if (logKeyAccount.exists) {
                logKeyAccount.open("r")
                logText = logKeyAccount.read()
                logKeyAccount.close()
                logKeyAccount.open("r")
                logTextLine = logKeyAccount.readln()
                while (logTextLine != "") {
                    logTextLine = logKeyAccount.readln()
                    if (edittext1.text == logTextLine.split(",")[2]) {
                        if (logTextLine.split(",")[3] == "1") {//Neu da duoc dang ky
                            validateText.text = "Key đã được sử dụng!"
                            break
                        } else {
                            logUser.open("w")
                            status = logUser.writeln(edittext1.text)
                            if (status == false) {
                                alert("Kích hoạt chưa thành công!")
                            } else {
                                logKeyAccount.close()
                                logKeyAccount.open("w")
                                changeString = logText.replace(logTextLine.split(",")[2] + ",", logTextLine.split(",")[2] + ",1")
                                logKeyAccount.writeln(changeString)
                                dialog.close()
                                alert("Kích hoạt thành công!")
                                break
                            }
                        }
                    } else {
                        validateText.text = "Không đúng key!"
                    }
                }
                edittext1.text = ""
                logUser.close()
                logKeyAccount.close()
            }
        })
        edittext1.addEventListener("click", function () {
        })

        //Xử lý xự kiện bằng bàng phím
        dialog.addEventListener("keydown", triggerBtnRun);
        function triggerBtnRun(e) {
            // alert(e.keyName)
            if (e.keyName == "Enter" || e.keyName == "Space") {
                button1.dispatchEvent(new Event("click"))
            }
        }
        dialog.show();
    }
})()
