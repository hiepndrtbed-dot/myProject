// // #target photoshop;
// 
// preferences.rulerUnits = Units.PIXELS
// app.preferences.typeunits = TypeUnits.PIXELS;
// 
// (function() {
//     var progressWindow = new Window("window", "Progress"); // Tạo cửa sổ tiến trình
//     progressWindow.orientation = "row";
// 
//     var progressText = progressWindow.add("statictext", undefined, "Processing: "); // Thêm văn bản tiến trình
//     // progressText.preferredSize.width = ; // Đặt kích thước thanh tiến trình
// 
//     var progressbar1 = progressWindow.add("progressbar", undefined, undefined, {
//         name: "progressbar1"
//     });
//     progressbar1.maxvalue = 100;
//     progressbar1.value = 0;
//     progressbar1.preferredSize.width = 160;
//     progressbar1.preferredSize.height = 10;
// 
//     // Tạo một cửa sổ dialog
//     var dialog = new Window("dialog", "Auto replace Images");
//     dialog.alignChildren = "left";
//     dialog.orientation = "column";
// 
//     var labelSize = [80, 20]; // Kích thước chung cho các tiêu đề
// 
//     // Thêm các ô nhập thông tin
// 
//     //Template
//     var GroupTemplate = dialog.add("group");
//     GroupTemplate.add("statictext", undefined, "Folder Template:").size = labelSize
// 
//     var inputTemplate = GroupTemplate.add("button", undefined, "Choose ....", {
//         name: "template"
//     });
//     inputTemplate.preferredSize.width = 100;
// 
// 
//     //Folder images
//     var GroupImages = dialog.add("group");
//     GroupImages.add("statictext", undefined, "Folder Images:").size = labelSize
//     var folderImagesText = GroupImages.add("button", undefined, "Choose....", {
//         name: "Images"
//     })
//     folderImagesText.preferredSize.width = 100;
// 
//     //Folder output
//     var outputFolderGroup = dialog.add("group");
//     outputFolderGroup.add("statictext", undefined, "Folder Output").size = labelSize;
//     var outputFolderText = outputFolderGroup.add("edittext", undefined, "", {
//         multiline: false
//     });
//     outputFolderText.preferredSize.width = 160;
//     var outputFolderButton = outputFolderGroup.add("button", undefined, "Select");
// 
//     //Group background and save
//     var GroupBackgroundAndSave = dialog.add("group");
//     GroupBackgroundAndSave.orientation = "row";
// 
//     //Save Format
//     var formatGroup = GroupBackgroundAndSave.add("group");
//     formatGroup.add("statictext", undefined, "Save format:").size = labelSize;
//     var formatDropdown = formatGroup.add("dropdownlist");
//     formatDropdown.preferredSize.width = 70;
//     formatDropdown.add("item", "JPEG");
//     formatDropdown.add("item", "PNG");
//     formatDropdown.add("item", "PDF");
//     formatDropdown.add("item", "PSD");
//     formatDropdown.selection = 0;
// 
//     //quality
//     formatGroup.add("statictext", undefined, "Quality:")
//     var inputQuality = formatGroup.add("edittext", undefined, 12, {
//         multiline: false
//     });
// 
//     var buttonGroup = dialog.add("group");
//     buttonGroup.alignment = "right";
//     //buttom cancel
//     var cancelButton = buttonGroup.add("button", undefined, "Cancel");
// 
//     cancelButton.onClick = function() {
//         dialog.close();
//     };
//     //button Process
//     var saveButton = buttonGroup.add("button", undefined, "Process");
// 
//     //Processing event
//     //Button template
//     var linkInputFile;
//     inputTemplate.addEventListener("click", function() {
//         var inputFiles = File.openDialog("Please select Template", "Choose File:*.psd")
//         linkInputFile = inputFiles.fsName;
//     })
// 
//     //button select folder images
//     var linkFolderImages;
//     folderImagesText.addEventListener("click", function() {
//         var inputFolderImages = Folder.selectDialog("Select folder Images!")
//         linkFolderImages = inputFolderImages.fsName;
//     })
// 
//     //Event button folder output
//     outputFolderButton.onClick = function() {
//         var folder = Folder.selectDialog("Select folder output!");
//         if (folder != null) {
//             outputFolderText.text = folder.fsName;
//         }
//     };
//     //validate form
//     saveButton.onClick = function() {
//         // var template = new Folder(linkInputFile);
//         var template = new File(linkInputFile);
//         var images = new Folder(linkFolderImages)
//         var output = new Folder(outputFolderText.text);
//         var formatIndex = formatDropdown.selection;
//         var quality = inputQuality.text;
// 
//         if (!template.exists) {
//             alert("Please select template!");
//             return;
//         }
// 
//         if (!images.exists) {
//             alert("Please select folder Input Images!");
//             return;
//         }
// 
//         if (!output.exists) {
//             alert("Please select folder Output!");
//             return;
//         }
// 
//         dialog.close();
//         processImages(template, images, output, formatIndex, quality);
//         progressWindow.close();
//     };
// 
//     //Processing
//     function processImages(template, images, output, formatIndex, quality) {
//         progressWindow.show(); //Show progress
//         //Processing
//         docTemp = app.open(template);
// 
//         makeHistory("1")
//         var folderImages = images.getFiles();
//         // alert(filesImages.length);
//         valueProcessing = 100 / folderImages.length
//         for (var i in folderImages) {
//             // break;
//             selectHistory("1")
//             // alert(folderImages[i].name)
//             //Hide layer 999 if name Folder has name 999
//             //indexOf("999") !== -1
// 
//             //Number page
//             try {
//                 //code
//                 var layerNumber = activeDocument.layerSets["Text"].artLayers.getByName("Number");
//                 if (layerNumber.kind == LayerKind.TEXT) {
//                     layerNumber.textItem.contents = folderImages[i].name.toString();
//                 } else {
//                     alert("Layer hiện tại không phải là text layer.");
//                 }
//             } catch (x_x) {}
// 
//             var filesImages = folderImages[i].getFiles();
// 
//             //Processing CSV
//             // alert(filesImages[i].path + "/Birthday.csv");
//             var xlsx = new File(filesImages[i].path + "/Birthday.csv");
//             var dataFiles = [];
//             if (xlsx.exists) {
//                 var flag = 1; // kiem tra neu ton tai tep CSV.
//                 xlsx.open('r');
//                 // var lineXLSX = xlsx.readln()
//                 do {
//                     lineXLSX = xlsx.readln().split(",")
//                     dataFiles.push(lineXLSX)
//                 } while (lineXLSX != "");
// 
//                 //Month birthday
//                 var monthBirthday = dataFiles[1][1];
//                 if (monthBirthday !== "") {
//                     try {
//                         var layerText = activeDocument.layerSets["Calendar"].artLayers.getByName("Month");
//                         if (layerText.kind == LayerKind.TEXT) {
//                             layerText.textItem.contents = dataFiles[1][1];
//                         } else {
//                             alert("Layer hiện tại không phải là text layer.");
//                         }
//                     } catch (error) {}
//                 }
// 
//                 //Day Birthday
//                 var birthday = dataFiles[1][2];
//                 if (birthday !== "") {
//                     try {
//                         activeDocument.activeLayer = activeDocument.layerSets["Calendar"].artLayers.getByName("Heart");
//                         // Định nghĩa vùng chọn: [x1, y1], [x2, y1], [x2, y2], [x1, y2]
//                         var mySelection = [
//                             [activeDocument.layerSets["Calendar"].artLayers.getByName(birthday).bounds[0], activeDocument.layerSets["Calendar"].artLayers.getByName(birthday).bounds[1]], // Điểm trên bên trái
//                             [activeDocument.layerSets["Calendar"].artLayers.getByName(birthday).bounds[2], activeDocument.layerSets["Calendar"].artLayers.getByName(birthday).bounds[1]], // Trên bên phải
//                             [activeDocument.layerSets["Calendar"].artLayers.getByName(birthday).bounds[2], activeDocument.layerSets["Calendar"].artLayers.getByName(birthday).bounds[3]], // Dưới bên phải
//                             [activeDocument.layerSets["Calendar"].artLayers.getByName(birthday).bounds[0], activeDocument.layerSets["Calendar"].artLayers.getByName(birthday).bounds[3]] // Dưới bên trái
//                         ];
//                         // // Tạo vùng chọn dựa trên tọa độ trên
//                         app.activeDocument.selection.select(mySelection);
//                         Algn("ADSCentersH"); //"ADSCentersV" ;  Algn("ADSCentersH");//"ADSCentersV"   Algn("ADSCentersH");//"ADSCentersV" 
//                         Algn("ADSCentersV"); //"ADSCentersV" ;  Algn("ADSCentersH");//"ADSCentersV"   Algn("ADSCentersH");//"ADSCentersV" 
//                         activeDocument.selection.deselect();
//                     } catch (error) {}
//                 }
// 
//                 //Name
//                 var nameBirthday = dataFiles[1][0];
//                 if (nameBirthday !== "") {
//                     try {
//                         var layerText = activeDocument.layerSets["Text"].artLayers.getByName("Name");
//                         if (layerText.kind == LayerKind.TEXT) {
//                             layerText.textItem.contents = dataFiles[1][0];
//                         } else {
//                             alert("Layer hiện tại không phải là text layer.");
//                         }
//                     } catch (error) {}
//                 }
//             }
//             // alert(dataFiles[1][0])
//             // break;
// 
//             //length Folder Frame smart subject
//             try {
//                 selectLayer("Frame");
//             } catch (error) {
//                 alert("Not Group 'Frame'");
//             }
//             var lengGroupSmartSubject = activeDocument.layerSets.getByName("Frame").artLayers.length;
//             var lengthImagesInFolder = filesImages.length;
// 
//             for (var x = lengGroupSmartSubject - 1; x >= 0; x--) {
//                 activeDocument.activeLayer = activeDocument.layerSets["Frame"].artLayers[x];
//                 if (activeDocument.layerSets["Frame"].artLayers[0].kind == LayerKind.SMARTOBJECT) {
//                     //xu ly file trong thu muc
//                     for (var y = lengthImagesInFolder - 1; y >= 0; y--) {
//                         try {
//                             var extension = filesImages[y].name.split('.').pop().toLowerCase();
//                             if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
//                                 {
//                                     // alert(filesImages[y]);
//                                     editContentSubject();
//                                     replaceContents(filesImages[y]);
//                                     // lengthGroupImages = lengthGroupImages + 1;
//                                     // y = y + 1;
//                                     resizeImage(activeDocument.width, activeDocument.height)
//                                     activeDocument.selection.selectAll();
//                                     Algn("ADSTops"); //"ADSCentersV" 
//                                     Algn("ADSCentersH"); //"ADSCentersV" ;  Algn("ADSCentersH");//"ADSCentersV"   Algn("ADSCentersH");//"ADSCentersV" 
//                                     activeDocument.selection.deselect();
//                                     clippingMask();
//                                     lengthImagesInFolder = lengthImagesInFolder - 1;
//                                     activeDocument.close(SaveOptions.SAVECHANGES);
//                                     break
//                                 }
//                             } else {
//                                 lengthImagesInFolder = lengthImagesInFolder - 1;
//                                 // break;
//                             } //end check tep hinh anh.
//                         } catch (error) {
//                             alert("Template " + filesImages[y].name + " Not Exist layer Design in folder Canvas!")
//                         }
//                     } //end for leng folder images
//                 } //end if smart subject
//             }
//             saveImage(output, formatIndex, folderImages[i].name, quality);
//             progressbar1.value = valueProcessing;
//             valueProcessing = valueProcessing + 100 / folderImages.length;
//         }
//         docTemp.close(SaveOptions.DONOTSAVECHANGES);
//         alert("Done!");
//     }
//     dialog.show();
// })();
// 
// //Save file
// function saveImage(pathName, typeSaveAs, randomSave, quality) {
//     var doc = app.activeDocument;
//     // JPG Options;
//     jpgSaveOptions = new JPEGSaveOptions();
//     jpgSaveOptions.embedColorProfile = true;
//     jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
//     jpgSaveOptions.matte = MatteType.NONE;
//     jpgSaveOptions.quality = quality;
//     //PDF Options
//     pdfOptions = new PDFSaveOptions();
//     pdfOptions.compatibility = PDFCompatibility.PDF15;
//     pdfOptions.generateThumbnails = true;
//     pdfOptions.preserveEditability = false;
//     pdfOptions.preset = "[High File Size]";
//     pdfOptions.layers = false;
//     //PNG Options
//     pngOptions = new PNGSaveOptions();
//     pngOptions.compression = 8;
//     pngOptions.interlaced = false;
// 
// 
// 
//     var psdOptions = new PhotoshopSaveOptions();
//     psdOptions.layers = true;
//     psdOptions.embedColorProfile = true;
//     psdOptions.annotations = true;
//     psdOptions.alphaChannels = true;
// 
//     switch (typeSaveAs.toString()) {
//         case "PNG":
//             doc.saveAs((new File(pathName + "/" + randomSave + ".png")), pngOptions, true, Extension.LOWERCASE);
//             break;
// 
//         case "PDF":
//             doc.saveAs((new File(pathName + "/" + randomSave + ".pdf")), pdfOptions, true, Extension.LOWERCASE);
//             break;
//         case "PSD":
//             doc.saveAs((new File(pathName + "/" + randomSave + ".pdf")), psdOptions, true, Extension.LOWERCASE);
//             break;
//         default:
//             doc.saveAs((new File(pathName + "/" + randomSave + ".jpg")), jpgSaveOptions, true, Extension.LOWERCASE);
//             break;
//     }
// }
// 
// function Algn(algn) {
//     var c2t = function(s) {
//         return app.charIDToTypeID(s);
//     };
// 
//     var s2t = function(s) {
//         return app.stringIDToTypeID(s);
//     };
// 
//     var descriptor = new ActionDescriptor();
//     var reference = new ActionReference();
// 
//     reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
//     descriptor.putReference(c2t("null"), reference);
//     descriptor.putEnumerated(s2t("using"), s2t("alignDistributeSelector"), s2t(algn));
//     descriptor.putBoolean(s2t("alignToCanvas"), false);
//     executeAction(c2t("Algn"), descriptor, DialogModes.NO);
// }
// //edit Content subject
// function editContentSubject() {
//     var idplacedLayerEditContents = stringIDToTypeID("placedLayerEditContents");
//     var desc43 = new ActionDescriptor();
//     executeAction(idplacedLayerEditContents, desc43, DialogModes.NO);
// }
// 
// // Place
// function replaceContents(newFile) {
//     cTID = function(s) {
//         return app.charIDToTypeID(s);
//     };
//     sTID = function(s) {
//         return app.stringIDToTypeID(s);
//     };
//     var desc1 = new ActionDescriptor();
//     desc1.putInteger(cTID('Idnt'), 3);
//     desc1.putPath(cTID('null'), new File(newFile));
//     desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSAverage"));
//     var desc2 = new ActionDescriptor();
//     desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
//     desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 0);
//     desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
//     executeAction(cTID('Plc '), desc1, DialogModes.NO);
// }
// 
// function selectHistory(params) {
//     var idslct = charIDToTypeID("slct");
//     var desc2745 = new ActionDescriptor();
//     var idnull = charIDToTypeID("null");
//     var ref662 = new ActionReference();
//     var idSnpS = charIDToTypeID("SnpS");
//     ref662.putName(idSnpS, params);
//     desc2745.putReference(idnull, ref662);
//     executeAction(idslct, desc2745, DialogModes.NO);
// }
// // resizeImage2()
// function resizeImage(width, height) {
//     var WIDTH = width;
//     var HEIGHT = height;
//     var bounds = activeDocument.activeLayer.bounds;
//     var layerWidth = bounds[2].as('px') - bounds[0].as('px');
//     var layerHeight = bounds[3].as('px') - bounds[1].as('px');
//     var layerRatio = layerWidth / layerHeight;
//     var newWidth = WIDTH;
//     var newHeight = ((1.0 * WIDTH) / layerRatio);
//     if (newHeight <= HEIGHT) {
//         newWidth = layerRatio * HEIGHT;
//         newHeight = HEIGHT;
//     }
//     var resizePercent = newWidth / layerWidth * 100;
//     app.activeDocument.activeLayer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);
// 
// }
// 
// //Save History
// function makeHistory(name2) {
//     var c2t = function(s) {
//         return app.charIDToTypeID(s)
//     }
// 
//     var s2t = function(s) {
//         return app.stringIDToTypeID(s)
//     }
// 
//     var descriptor = new ActionDescriptor()
//     var reference = new ActionReference()
//     var reference2 = new ActionReference()
// 
//     reference.putClass(s2t("snapshotClass"))
//     descriptor.putReference(c2t("null"), reference)
//     reference2.putProperty(c2t("HstS"), s2t("currentHistoryState"))
//     descriptor.putReference(s2t("from"), reference2)
//     descriptor.putString(s2t("name"), name2)
//     descriptor.putEnumerated(s2t("using"), c2t("HstS"), s2t("fullDocument"))
//     executeAction(s2t("make"), descriptor, DialogModes.NO)
// }
// 
// //select history
// function selectHistory(nameHistory) {
//     var c2t = function(s) {
//         return app.charIDToTypeID(s)
//     }
// 
//     var s2t = function(s) {
//         return app.stringIDToTypeID(s)
//     }
// 
//     var descriptor = new ActionDescriptor()
//     var reference = new ActionReference()
// 
//     reference.putName(s2t("snapshotClass"), nameHistory)
//     descriptor.putReference(c2t("null"), reference)
//     executeAction(s2t("select"), descriptor, DialogModes.NO)
// }
// 
// //select layer
// function selectLayer(nameLayer) {
//     var c2t = function(s) {
//         return app.charIDToTypeID(s)
//     }
// 
//     var s2t = function(s) {
//         return app.stringIDToTypeID(s)
//     }
// 
//     var descriptor = new ActionDescriptor()
//     var reference = new ActionReference()
// 
//     reference.putName(s2t("layer"), nameLayer)
//     descriptor.putReference(c2t("null"), reference)
//     executeAction(s2t("select"), descriptor, DialogModes.NO)
// }
// 
// //function clipingmask
// function clippingMask() {
//     var idGrpL = charIDToTypeID("GrpL");
//     var desc362 = new ActionDescriptor();
//     var idnull = charIDToTypeID("null");
//     var ref188 = new ActionReference();
//     var idLyr = charIDToTypeID("Lyr ");
//     var idOrdn = charIDToTypeID("Ordn");
//     var idTrgt = charIDToTypeID("Trgt");
//     ref188.putEnumerated(idLyr, idOrdn, idTrgt);
//     desc362.putReference(idnull, ref188);
//     executeAction(idGrpL, desc362, DialogModes.NO);
// 
// }
