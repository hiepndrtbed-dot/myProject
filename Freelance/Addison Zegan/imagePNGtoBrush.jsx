#target photoshop;

preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS;

(function () {
    var progressWindow = new Window("window", "Progress"); // Tạo cửa sổ tiến trình
    progressWindow.orientation = "row";

    var progressText = progressWindow.add("statictext", undefined, "Processing: "); // Thêm văn bản tiến trình
    // progressText.preferredSize.width = ; // Đặt kích thước thanh tiến trình

    var progressbar1 = progressWindow.add("progressbar", undefined, undefined, { name: "progressbar1" });
    progressbar1.maxvalue = 100;
    progressbar1.value = 0;
    progressbar1.preferredSize.width = 160;
    progressbar1.preferredSize.height = 10;

    // Tạo một cửa sổ dialog
    var dialog = new Window("dialog", "Define PNG to Brush");
    dialog.alignChildren = "left";
    dialog.orientation = "column";

    var labelSize = [80, 20]; // Kích thước chung cho các tiêu đề

    // Thêm các ô nhập thông tin

    //Folder images
    var GroupImages = dialog.add("group");
    GroupImages.add("statictext", undefined, "Folder Images:").size = labelSize
    var folderImagesText = GroupImages.add("button", undefined, "Choose....", { name: "Images" })
    folderImagesText.preferredSize.width = 100;

    // //Folder output
    // var outputFolderGroup = dialog.add("group");
    // outputFolderGroup.add("statictext", undefined, "Folder Output").size = labelSize;
    // var outputFolderText = outputFolderGroup.add("edittext", undefined, "", { multiline: false });
    // outputFolderText.preferredSize.width = 160;
    // var outputFolderButton = outputFolderGroup.add("button", undefined, "Select");

    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = "right";

    //button Process
    var saveButton = buttonGroup.add("button", undefined, "Process");

    //buttom cancel
    var cancelButton = buttonGroup.add("button", undefined, "Cancel");

    cancelButton.onClick = function () {
        dialog.close();
    };


    //Processing event
    //button select folder images
    var linkFolderImages;
    folderImagesText.addEventListener("click", function () {
        var inputFolderImages = Folder.selectDialog("Select folder Images!")
        linkFolderImages = inputFolderImages.fsName;
    })

    //Event button folder output
    // outputFolderButton.onClick = function () {
    //     var folder = Folder.selectDialog("Select folder output!");
    //     if (folder != null) {
    //         outputFolderText.text = folder.fsName;
    //     }
    // };
    //validate form
    saveButton.onClick = function () {
        var images = new Folder(linkFolderImages)
        // var output = new Folder(outputFolderText.text);

        if (!images.exists) {
            alert("Please select folder Input Images!");
            return;
        }

        // if (!output.exists) {
        //     alert("Please select folder Output!");
        //     return;
        // }
        dialog.close();
        processImages(images);
        progressWindow.close();
    };


    //Processing
    function processImages(images) {
        var files = images.getFiles();
        progressWindow.show(); //Show progress
        //Processing data from CSV
        valueProcessing = 100 / files.length
        //Processing
        for (var i in files) {
            try {
                doc = open(files[i]);
                if (activeDocument.width > 5000 || activeDocument.height > 5000) {
                    doc.resizeImage(5000, 5000, 72, ResampleMethod.BICUBIC)
                }
                defineBrush();
                progressbar1.value = valueProcessing;
                activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                valueProcessing = valueProcessing + 100 / files.length;
            } catch (error) {
                // alert(error)
            }
        }
        alert("Done!")
    }

    function resizeImage(width, height) {
        var WIDTH = width;
        var HEIGHT = height;
        var bounds = activeDocument.activeLayer.bounds;
        var layerWidth = bounds[2].as('px') - bounds[0].as('px');
        var layerHeight = bounds[3].as('px') - bounds[1].as('px');
        var layerRatio = layerWidth / layerHeight;
        var newWidth = WIDTH;
        var newHeight = ((1.0 * WIDTH) / layerRatio);
        if (newHeight >= HEIGHT) {
            newWidth = layerRatio * HEIGHT;
            newHeight = HEIGHT;
        }
        var resizePercent = newWidth / layerWidth * 100;
        app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);

    }

    function defineBrush() {
        activeDocument.backgroundLayer.desaturate()
        activeDocument.backgroundLayer.adjustLevels(5, 253, 0.9, 0, 255)
        activeDocument.backgroundLayer.de
        var idMk = charIDToTypeID("Mk  ");
        var desc1944 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref144 = new ActionReference();
        var idBrsh = charIDToTypeID("Brsh");
        ref144.putClass(idBrsh);
        desc1944.putReference(idnull, ref144);
        var idUsng = charIDToTypeID("Usng");
        var ref145 = new ActionReference();
        var idPrpr = charIDToTypeID("Prpr");
        var idfsel = charIDToTypeID("fsel");
        ref145.putProperty(idPrpr, idfsel);
        var idDcmn = charIDToTypeID("Dcmn");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref145.putEnumerated(idDcmn, idOrdn, idTrgt);
        desc1944.putReference(idUsng, ref145);
        executeAction(idMk, desc1944, DialogModes.NO);
    }

    function saveBrush(output) {

    }
    dialog.show();
})();

