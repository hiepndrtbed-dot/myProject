 var dialog = new Window("dialog")
    dialog.text = "RUN ALL ACTION"
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10
    dialog.margins = 10

    // dialog.active = true;
    // GROUP1
    // ======
    var group1 = dialog.add("group", undefined, { name: "group1" });
    group1.orientation = "column";
    group1.alignment = ["left", "center"];
    group1.spacing = 3;
    group1.margins = 0;

    //Merge Exposure
    var buttonMergeExposure = group1.add("button", undefined, undefined, { name: "Merge Exposure" });
    buttonMergeExposure.text = "Merge Exposure (2)";
    buttonMergeExposure.alignment = ["left", "center"];
    buttonMergeExposure.preferredSize.width = 170;


    //Close Frame.
    var buttonClose = group1.add("button", undefined, undefined, { name: "Cancel" });
    buttonClose.text = "Cancel";
    buttonClose.preferredSize.width = 170;
    buttonClose.active = true

    //MERGE EXPOSURE
    buttonMergeExposure.addEventListener("click", function () {
        dialog.close()

        var targetScript = File(currentFolder + "/mergeImage2.jsx");

        if (targetScript.exists) {
            $.evalFile(targetScript);
        } else {
            alert("❌ Không tìm thấy file: " + targetScript.fsName);
        }
    })

    //Đóng form
    buttonClose.addEventListener("click", function () {
        dialog.close()
    })

    //Xử lý xự kiện bằng bàng phím
    dialog.addEventListener("keydown", triggerBtnRun);
    function triggerBtnRun(e) {
        // alert(e.keyName)
        if (e.keyName == "1") {
            buttonCopyExposure.dispatchEvent(new Event("click"))
        }
        else if (e.keyName == "2") {
            buttonMergeExposure.dispatchEvent(new Event("click"))
        }
       
        else if (e.keyName == "Escape") {
            buttonClose.dispatchEvent(new Event("click"))
        }
        else {
            alert("Input fail!!!!")
        }
    }
    dialog.show();