(function () {
  var progressWindow = new Window("window", "Progress"); // Tạo cửa sổ tiến trình
  var progressText = progressWindow.add("statictext", undefined, "Processing: "); // Thêm văn bản tiến trình
  progressText.preferredSize.width = 300; // Đặt kích thước thanh tiến trình

  // Tạo một cửa sổ dialog
  var dialog = new Window("dialog", "Lưu ảnh với giới hạn kích thước file");
  dialog.alignChildren = "left";

  var labelSize = [160, 20]; // Kích thước chung cho các tiêu đề

  // Thêm các ô nhập thông tin
  var inputFolderGroup = dialog.add("group");
  inputFolderGroup.add("statictext", undefined, "Thư mục đầu vào(*):").size = labelSize;
  var inputFolderText = inputFolderGroup.add("edittext", undefined, "", { multiline: false });
  inputFolderText.preferredSize.width = 200;
  var inputFolderButton = inputFolderGroup.add("button", undefined, "Chọn");

  var outputFolderGroup = dialog.add("group");
  outputFolderGroup.add("statictext", undefined, "Thư mục đầu ra:").size = labelSize;
  var outputFolderText = outputFolderGroup.add("edittext", undefined, "", { multiline: false });
  outputFolderText.preferredSize.width = 200;
  var outputFolderButton = outputFolderGroup.add("button", undefined, "Chọn");

  var maxSizeGroup = dialog.add("group");
  maxSizeGroup.add("statictext", undefined, "Kích thước tệp tối đa (KB):").size = labelSize;
  var maxSizeText = maxSizeGroup.add("edittext", undefined, "1024", { multiline: false });
  maxSizeText.preferredSize.width = 100;

  var formatGroup = dialog.add("group");
  formatGroup.add("statictext", undefined, "Định dạng lưu:").size = labelSize;
  var formatDropdown = formatGroup.add("dropdownlist");
  formatDropdown.add("item", "JPEG");
  formatDropdown.selection = 0;

  var dpiGroup = dialog.add("group");
  dpiGroup.add("statictext", undefined, "Mật độ điểm ảnh (DPI):").size = labelSize;
  var dpiText = dpiGroup.add("edittext", undefined, "300", { multiline: false });
  dpiText.preferredSize.width = 100;

  // Thêm dòng lưu ý
  var noteText = dialog.add("statictext", undefined, "(*): Để trống nếu muốn lưu file đang làm việc.");
  noteText.size = [300, 30];
  noteText.graphics.foregroundColor = noteText.graphics.newPen(noteText.graphics.PenType.SOLID_COLOR, [1, 0, 0], 1);

  var buttonGroup = dialog.add("group");
  buttonGroup.alignment = "right";
  var cancelButton = buttonGroup.add("button", undefined, "Cancel");

  cancelButton.onClick = function () {
    dialog.close();
  };

  var saveButton = buttonGroup.add("button", undefined, "Save");
  saveButton.onClick = function () {
    var inputFolder = new Folder(inputFolderText.text);
    var outputFolder = new Folder(outputFolderText.text);
    var maxSize = parseInt(maxSizeText.text);
    var formatIndex = formatDropdown.selection.index;
    var dpi = parseInt(dpiText.text);

    if (!outputFolder.exists) {
      alert("Vui lòng chọn thư mục thư mục đầu ra hợp lệ!");
      return;
    }

    dialog.close();
    processImages(inputFolder, outputFolder, maxSize, formatIndex, dpi);
    progressWindow.close();
  };

  inputFolderButton.onClick = function () {
    var folder = Folder.selectDialog("Chọn thư mục đầu vào");
    if (folder != null) {
      inputFolderText.text = folder.fsName;
    }
  };

  outputFolderButton.onClick = function () {
    var folder = Folder.selectDialog("Chọn thư mục đầu ra");
    if (folder != null) {
      outputFolderText.text = folder.fsName;
    }
  };

  dialog.show();

  function processImages(inputFolder, outputFolder, maxSize, formatIndex, dpi) {
    progressWindow.show(); // Hiển thị cửa sổ tiến trình

    if (!inputFolder.exists) {
      // Lưu file đang làm việc hiện tại
      var doc = app.activeDocument;
      if (doc === null) {
        alert("Không có gì để luu!");
        return;
      }

      saveImage(doc, outputFolder, maxSize, formatIndex, dpi);
    } else {
      // Lưu tất cả các file ảnh trong thư mục đầu vào
      saveImagesInFolder(inputFolder, outputFolder, maxSize, formatIndex, dpi);
    }

    alert("Hoàn thành lưu ảnh!");
  }

  function saveImagesInFolder(inputFolder, outputFolder, maxSize, formatIndex, dpi) {
    var files = inputFolder.getFiles();

    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      if (file instanceof Folder) {
        // Nếu là thư mục, tạo thư mục tương ứng trong thư mục đầu ra
        var folderName = file.name;
        var outputSubFolder = new Folder(outputFolder + "/" + folderName);
        outputSubFolder.create();

        // Tiếp tục xử lý trong thư mục con
        saveImagesInFolder(file, outputSubFolder, maxSize, formatIndex, dpi);
      } else {
        // Kiểm tra phần mở rộng của tệp tin
        var extension = file.name.split('.').pop().toLowerCase();
        var fileSize = file.length / 1024; // Dung lượng tệp tin (KB)

        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
          {
            var doc = open(file);
            saveImage(doc, outputFolder, maxSize, formatIndex, dpi);
            doc.close(SaveOptions.DONOTSAVECHANGES);
          }
        }
      }
    }
  }
  function saveImage(doc, outputFolder, maxSize, formatIndex, dpi) {
    var docName = doc.name.substring(0, doc.name.lastIndexOf("."));
    var width = doc.width;
    var height = doc.height;

    var targetSize = maxSize; // Kích thước tệp tin tối đa
    var minQuality = 0;
    var maxQuality = 12;

    var currentQuality;

    while (minQuality <= maxQuality) {
      currentQuality = Math.floor((minQuality + maxQuality) / 2);
      var saveOptions = getSaveOptions(formatIndex);
      saveOptions.quality = currentQuality;

      var tempFileName = generateRandomString(10) + ".jpg";
      var tempFile = new File(Folder.temp + "/" + tempFileName);
      // doc.exportDocument(tempFile, SaveType.JPEG, saveOptions);
      doc.saveAs(tempFile, saveOptions, true);


      progressText.text = "Ðang luu: " + doc.name.substring(0, 25) + "... (" + currentQuality + ")";
      progressWindow.update();


      while (!tempFile.exists) {
        $.writeln("Saving...");
      }

      var currentSize = tempFile.length / 1024; // Kích thước tệp tin đã lưu (KB)
      tempFile.remove();

      if (currentSize < targetSize) {
        minQuality = currentQuality + 1;
      } else {
        maxQuality = currentQuality - 1;
      }
    }

    if (currentSize > targetSize && currentQuality > 0) { saveOptions.quality = saveOptions.quality - 1; }

    $.writeln("Done: " + doc.name);

    doc.resizeImage(undefined, undefined, dpi, ResampleMethod.NONE);
    //doc.exportDocument(new File(outputFolder + "/" + docName + ".jpg"), SaveType.JPEG, saveOptions);
    var outputFile = new File(outputFolder + "/" + docName + ".jpg");
    doc.saveAs(outputFile, saveOptions, true);
  }


  function generateRandomString(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Lấy các tùy chọn lưu ảnh dựa trên định dạng
  function getSaveOptions(formatIndex) {
    var saveOptions;

    switch (formatIndex) {
      case 0:
        saveOptions = new JPEGSaveOptions();
        break;
      case 1:
        saveOptions = new ExportOptionsSaveForWeb();
        saveOptions.format = SaveDocumentType.PNG;
        break;
      default:
        saveOptions = new JPEGSaveOptions();
        break;
    }

    return saveOptions;
  }

})();
