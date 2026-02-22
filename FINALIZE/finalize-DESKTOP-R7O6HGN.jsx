
//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE
const versionTo = " By Acad -- Version 1.4 -- "
preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument;

//Simple
// (function () {
//     var flagLogin = new File("//172.16.2.2/Academy/Hiep/log.txt")
//     if (flagLogin.exists) {
//         logAction("Finalize")
//         deselectPath()
//         main()
//         // alert("2")
//     } else {
//         alert("update! vui lòng đợi.")
//     }
// })()
main()
deselectPath()
function main() {
    // var logNameAct = new File("~/Appdata/Roaming/Adobe/logStructFinalize.log")
    var logNameAct = new File("D:/logStructFinalize.log")

    const arVariant = ["Variant 1",
        "Variant 2",
        "Variant 3",
        "Variant 4",
        "Variant 5",
        "Variant 6",
        "Variant 7",
        "Variant 8"
    ]

    const arBg = ["-- Select --", "------------------",
        "Background",
        "background",
        "BACKGROUND",
        "------------------",
        "bg color",
        "bg",
        "------------------",
        "Original",
        "original",
        "------------------",
        "COLORBACKING",
        "MERGED GREY",
        "------------------",
        "BG White: #FFFFFF",
        "BG Shoreline: #F0F1F3",
        "------------------",
        "f9f9f9-BACKGROUND",
        "Color Fill 1",
        "blur",
        "-----------",
        "1",
        "2"
    ]
    const arrColor = ["-- Select --", "---------",
        "#FFFFFF",
        "#F7F7F7",
        "#F9F9F9",
        "#F0F1F3",
        "#F4F4F4",
        "---------",
        "#EFEFEF",
        "#E3D6C8",
        "#E6E6E6",
        "---------",
        "NoRemove",
        "Transparent"

    ]
    const arrShadow = ["-- Select --", "-----------",
        "Shadow",
        "SHADOW",
        "shadow",
        "-----------",
        "Reflection",
        "sd",
        "-----------",
        "2",
        "3"
    ]
    const arrProduct = ["-- Select --", "-----------",
        "Product",
        "PRODUCT",
        "product",
        "Produkt",
        "-----------",
        "Retouch",
        "retouch",
        "-----------",
        "Model",
        "Cutout",
        "Mask",
        "SHOE",
        "SILO",
        "Layer 1",
        "-----------",
        "2",
        "3",
        "4"
    ]
    const arrRetouch = ["-- Select --", "-----------",
        "Retouch",
        "RETOUCH",
        "retouch",
        "Retouching",
        "-----------",
        "Skin Retouch",
        "Ret",
        "PDT",
        "-----------",
        "4",
        "5"
    ]
    const arrGrColor = ["-- Select --", "-------------",
        "Color Adjustment",
        "Color",
        "Color 4",
        "MASKS",
        "-------------",
        "Masken",
        "Background Mask"
    ]

    checkForm()
    function checkForm() {
        var sizeInput = [109, 23]
        var sizePanelInput = [100, 125]
        var result = { variant: '', background: '', shadow: '', product: '', retouch: '', color: '', grColor: '', colorFill: '', mask: '', blend: '' }
        // var log
        // DIALOG
        // ======
        var dialog = new Window("dialog")
        dialog.text = "FINALIZE"
        // dialog.preferredSize.width = 900
        dialog.orientation = "column"
        dialog.alignChildren = ["left", "top"]
        dialog.spacing = 15

        // STRUCTFINALIZE
        var dlg = dialog.add("group", undefined, undefined, { name: "Dlg" })
        dlg.orientation = "row"
        dlg.alignChildren = ["left", "top"]
        dlg.spacing = 8

        // VARIANT
        // ==========
        var variant = dlg.add("panel", undefined, undefined, { name: "variant" })
        variant.text = "Variant"
        variant.orientation = "column"
        variant.alignChildren = ["left", "top"]
        variant.margins.left = 5
        variant.margins.right = 5

        var vari = variant.add("dropdownlist", undefined, undefined, { name: "variant", items: arVariant })
        vari.size = sizeInput
        vari.selection = 0;
        result.variant = vari.selection
        vari.onChange = function () {
            result.variant = this.selection
        }


        // GROUP COLOR NAME
        var grColor = dlg.add("panel", undefined, undefined, { name: "grcolor" })
        grColor.text = "Group Color"
        // color.hide()
        grColor.orientation = "column"
        grColor.alignChildren = ["left", "top"]
        grColor.margins.left = 5
        grColor.margins.right = 5
        grColor.graphics.foregroundColor = grColor.graphics.newPen(grColor.graphics.PenType.SOLID_COLOR, [0, 0, 1], 1);




        var gr_Color = grColor.add("dropdownlist", undefined, undefined, { name: "GrColor", items: arrGrColor })
        gr_Color.size = sizeInput
        gr_Color.selection = 0;
        gr_Color.onChange = function () {
            if (this.selection.toString() != "-- Select --") {
                result.grColor = this.selection.toString()
            } else {
                result.grColor = ""
            }
        }

        var inputGrColor = grColor.add("edittext", undefined, "", { multiline: false })
        inputGrColor.size = sizeInput

        inputGrColor.onChange = function () {
            if (this.text != "") {
                result.grColor = this.text.toString()
                gr_Color.enabled = false
            }
        }

        // RETOUCH
        // =======
        var retouch = dlg.add("panel", undefined, undefined, { name: "retouch" })
        retouch.text = "Retouch"
        retouch.orientation = "column"
        retouch.alignChildren = ["left", "top"]
        retouch.margins.left = 5
        retouch.margins.right = 5


        var rt = retouch.add("dropdownlist", undefined, undefined, { name: "Retouch", items: arrRetouch })
        rt.size = sizeInput
        rt.selection = 0;
        rt.onChange = function () {
            if (this.selection.toString() != "-- Select --") {
                result.retouch = this.selection.toString()
            } else {
                result.retouch = ""
            }
        }

        var inputRt = retouch.add("edittext", undefined, "", { multiline: false })
        inputRt.size = sizeInput

        inputRt.onChange = function () {
            if (this.text.toString() != "") {
                result.retouch = this.text.toString()
                rt.enabled = false
            }
        }

        // PRODUCT
        // =======
        var product = dlg.add("panel", undefined, undefined, { name: "product" })
        product.text = "Product"
        product.orientation = "column"
        product.alignChildren = ["left", "top"]
        product.margins.left = 5
        product.margins.right = 5
        product.preferredSize.height = sizePanelInput[1]
        product.graphics.foregroundColor = product.graphics.newPen(product.graphics.PenType.SOLID_COLOR, [0, 1, 1], 1);


        var pr = product.add("dropdownlist", undefined, undefined, { name: "Product", items: arrProduct })
        pr.size = sizeInput
        pr.selection = 0;
        pr.onChange = function () {
            if (this.selection.toString() != "-- Select --") {
                result.product = this.selection.toString()
            } else {
                result.product = ""
            }
            done.text = "Done"
        }
        var inputPr = product.add("edittext", undefined, "", { multiline: false })
        inputPr.size = sizeInput

        inputPr.onChange = function () {
            if (this.text != "") {
                result.product = this.text.toString()
                pr.enabled = false
                done.text = "Done"
            }
        }

        var Mask = product.add("checkbox", undefined, undefined, { name: "Mask" })
        Mask.text = "Keep Mask"
        Mask.size = sizeInput
        Mask.graphics.foregroundColor = Mask.graphics.newPen(Mask.graphics.PenType.SOLID_COLOR, [0, 1, 0], 1);

        // Mask.value = true

        // SHADOW
        // ======
        var shadow = dlg.add("panel", undefined, undefined, { name: "Shadow" })
        shadow.text = "Shadow"
        shadow.orientation = "column"
        shadow.alignChildren = ["left", "top"]
        shadow.margins.left = 5
        shadow.margins.right = 5
        shadow.preferredSize.height = sizePanelInput[1]
        shadow.graphics.foregroundColor = shadow.graphics.newPen(shadow.graphics.PenType.SOLID_COLOR, [1, 1, 0], 1);



        var sd = shadow.add("dropdownlist", undefined, undefined, { name: "Shadow", items: arrShadow })
        sd.size = sizeInput
        sd.selection = 0;
        sd.onChange = function () {
            if (this.selection.toString() != "-- Select --") {
                result.shadow = this.selection.toString()
            } else {
                result.shadow = ""
            }
        }

        var inputShadow = shadow.add("edittext", undefined, "", { multiline: false })
        inputShadow.size = sizeInput

        inputShadow.onChange = function () {
            sd.enabled = false
            if (this.text != "") {
                result.shadow = this.text.toString()
                // color.show()
            }
        }

        //Blend shadow
        var blend = shadow.add("checkbox", undefined, undefined, { name: "Blend" })
        blend.text = "Multiply"
        blend.size = sizeInput
        blend.graphics.foregroundColor = blend.graphics.newPen(blend.graphics.PenType.SOLID_COLOR, [0, 1, 0], 1);


        // BACKGROUND
        // ==========
        var background = dlg.add("panel", undefined, undefined, { name: "background" })
        background.text = "Background"
        background.orientation = "column"
        background.alignChildren = ["left", "top"]
        background.margins.left = 5
        background.margins.right = 5
        background.preferredSize.height = sizePanelInput[1]
        background.graphics.foregroundColor = background.graphics.newPen(background.graphics.PenType.SOLID_COLOR, [1, 0, 1], 1);

        var br = background.add("dropdownlist", undefined, undefined, { name: "Background", items: arBg })
        br.size = sizeInput
        br.selection = 0;
        // result.background = br.selection
        br.onChange = function () {
            // color.show()
            color.enabled = true
            if (this.selection.toString() != "-- Select --") {
                result.background = this.selection.toString()
                inputBr.enabled = false
            } else {
                inputBr.enabled = true
            }
        }

        var inputBr = background.add("edittext", undefined, undefined, { multiline: false })
        inputBr.size = sizeInput

        var addMoreLayerBackground = background.add("button", undefined, undefined, { name: "add more" })
        addMoreLayerBackground.size = sizeInput
        addMoreLayerBackground.text = "Add more"
        addMoreLayerBackground.graphics.foregroundColor = addMoreLayerBackground.graphics.newPen(addMoreLayerBackground.graphics.PenType.SOLID_COLOR, [0, 1, 0], 1);


        addMoreLayerBackground.onClick = function () {
            if (result.background != "") {
                if (result.color != "") {
                    //Processing if exsist name Background and code Color
                    if (ColorFill.value == true) {
                        //Color Fill == true
                        addNameBackground(result.background, result.color, ColorFill.value)
                    } else {
                        //Color Fill == false
                        addNameBackground(result.background, result.color, ColorFill.value)
                    }
                } else {
                    alert("Nhập mã màu!")
                }
            } else {
                alert("Nhập tên Background!")
            }
        }

        inputBr.onChange = function () {
            br.enabled = false
            if (this.text != "") {
                color.enabled = true
                result.background = this.text.toString()
                // color.show()
            } else {
                br.enabled = true
                color.enabled = false
            }
        }
        // COLOR BACKGROUND
        var color = dlg.add("panel", undefined, undefined, { name: "color" })
        color.text = "Color BG"
        // color.hide()
        color.enabled = false
        color.orientation = "column"
        color.alignChildren = ["left", "top"]
        color.margins.left = 5
        color.margins.right = 5
        color.preferredSize.height = sizePanelInput[1]
        color.graphics.foregroundColor = color.graphics.newPen(color.graphics.PenType.SOLID_COLOR, [1, 0, 1], 1);


        var Color = color.add("dropdownlist", undefined, undefined, { name: "Color", items: arrColor })
        Color.size = sizeInput
        Color.selection = 0;
        Color.onChange = function () {
            result.color = this.selection
        }

        var inputColor = color.add("edittext", undefined, "", { multiline: false })
        inputColor.size = sizeInput

        inputColor.onChange = function () {
            Color.enabled = false
            if (this.text != "") {
                result.color = "#" + this.text.toString()
                // color.show()
            }
        }

        //color fill
        var ColorFill = color.add("checkbox", undefined, undefined, { name: "ColorFill" })
        ColorFill.text = "Color Fill"
        ColorFill.size = sizeInput
        ColorFill.graphics.foregroundColor = ColorFill.graphics.newPen(ColorFill.graphics.PenType.SOLID_COLOR, [0, 1, 0], 1);




        //////////////VIEW LIST SAVE LOG STRUCT FINALIZE
        var group = dialog.add("group", undefined, undefined, { name: "group1" });
        group.orientation = "row";
        group.alignChildren = ["left", "top"];
        group.spacing = 2

        // ======
        var runList = false
        if (logNameAct.exists) {
            logNameAct.open("r")
            logText = logNameAct.read()
            var toAr = logText.split(",")
            logNameAct.close()

            var listbox1_array = toAr
            for (var i = 0; i < listbox1_array.length - 1; i++) {
                var group3 = group.add("panel", undefined, undefined, { name: "group2" });
                group3.orientation = "column";
                group3.alignChildren = ["left", "top"];
                group3.margins.left = 5
                group3.margins.right = 5
                var lineText = listbox1_array[i].toString()

                var textToArr = lineText.split("/")

                //loai bo phan trong trong mang
                var arrLineStruct = new Array()
                for (var k = 1; k < textToArr.length; k++) {
                    if (textToArr[k] != '') {
                        arrLineStruct.push(textToArr[k])
                    }
                    //change color text
                    if (textToArr[1].toString() != '' && k == 1) {
                        var flagGrColor = arrLineStruct.length
                    }

                    if (textToArr[3].toString() != '' && k == 3) {
                        var flagPR = arrLineStruct.length
                    }

                    if (textToArr[4].toString() != '' && k == 4) {
                        var flagSD = arrLineStruct.length
                    }

                    if (textToArr[6].toString() != '' && k == 6) {
                        var flagBG = arrLineStruct.length
                    }
                }

                var groupListStruck = group3.add("group", undefined, undefined, { name: "groupListStruck" + i })
                groupListStruck.preferredSize.height = 210;
                groupListStruck.orientation = "column";

                if (arrLineStruct != '') {
                    for (var j = 0; j < arrLineStruct.length; j++) {

                        var listTitleBody = groupListStruck.add("statictext", undefined, undefined, { name: arrLineStruct[j] });
                        // listTitleBody.orientation = "column";
                        listTitleBody.text = arrLineStruct[j];
                        listTitleBody.preferredSize.width = 70;
                        listTitleBody.justify = "left"

                        if (i == listbox1_array.length - 2) {
                            listTitleBody.graphics.foregroundColor = listTitleBody.graphics.newPen(listTitleBody.graphics.PenType.SOLID_COLOR, [1, 1, 1], 1);
                        }

                        //CHANGE COLOR
                        if (j == flagGrColor - 1 && i != listbox1_array.length - 2) {
                            listTitleBody.graphics.foregroundColor = listTitleBody.graphics.newPen(listTitleBody.graphics.PenType.SOLID_COLOR, [0, 0, 1], 1);
                        }

                        if (j == flagPR - 1 && i != listbox1_array.length - 2) {
                            listTitleBody.graphics.foregroundColor = listTitleBody.graphics.newPen(listTitleBody.graphics.PenType.SOLID_COLOR, [0, 1, 1], 1);
                        }

                        if (j == flagSD - 1 && i != listbox1_array.length - 2) {
                            listTitleBody.graphics.foregroundColor = listTitleBody.graphics.newPen(listTitleBody.graphics.PenType.SOLID_COLOR, [1, 1, 0], 1);
                        }

                        if (j == flagBG - 1 && i != listbox1_array.length - 2) {
                            listTitleBody.graphics.foregroundColor = listTitleBody.graphics.newPen(listTitleBody.graphics.PenType.SOLID_COLOR, [1, 0, 1], 1);
                        }
                    }
                    // var btnRemove = gr.add("button{size: [50,10], text: 'Remove', index:" + i + "}");
                    var btnRun = group3.add("button{size: [75,10], text: 'Run', name:" + "\'" + textToArr + "\'" + "}")
                    var btnDelete = group3.add("button{size: [75,10], text: 'Delete', name:" + "\'" + lineText + "\'" + "}")
                    btnRun.graphics.foregroundColor = btnRun.graphics.newPen(btnRun.graphics.PenType.SOLID_COLOR, [0, 1, 0], 1);
                    btnDelete.graphics.foregroundColor = btnDelete.graphics.newPen(btnDelete.graphics.PenType.SOLID_COLOR, [1, 0, 0], 1);

                    btnRun.onClick = function () {
                        this.runList = true
                        dialog.close()
                        var arrResult = this.name.split(",")
                        check(arrResult[0])
                        // run(variant 0, grcolor 6, retouch 4, shadow 2, product 3, background 1, color 5, colorFill 7, mask 8, blend 9)
                        run(arrResult[0], arrResult[1], arrResult[2], arrResult[3], arrResult[4], arrResult[5], arrResult[6], arrResult[7], arrResult[8], arrResult[9])
                    }

                    btnDelete.onClick = function () {
                        logNameAct.open("r")
                        logText = logNameAct.read()
                        var lineText = this.name.toString()
                        var addText = logText.replace(lineText + ",", "")
                        logNameAct.close()
                        logNameAct.remove()
                        logNameAct.open("w")
                        logNameAct.write(addText)
                        logNameAct.close()
                        alert("Đã xóa!")
                        this.parent.hide()
                    }

                }
            }
        } else {
            //    alert("")
        }

        // LIST_STRUCT_FILALIZE
        // ====================
        var List_Struct_Filalize = dialog.add("group", undefined, { name: "List_Struct_Filalize" })
        List_Struct_Filalize.enabled = true
        List_Struct_Filalize.orientation = "row"
        List_Struct_Filalize.alignChildren = ["left", "top"]
        List_Struct_Filalize.spacing = 10
        List_Struct_Filalize.margins = 10

        // RUN
        // ===
        var Run = dialog.add("group", undefined, { name: "Run" })
        Run.orientation = "row"
        Run.alignChildren = ["center", "center"]
        Run.alignment = ["center", "top"]



        var done = Run.add("button", undefined, undefined, { name: "OK" })
        done.text = "Reset"
        var Cancel = Run.add("button", undefined, undefined, { name: "Cancel" })
        Cancel.text = "Cancel"

        // GROUP4 version
        // ======
        var Vesion = dialog.add("group", undefined, { name: "Version" })
        Vesion.orientation = "column"
        Vesion.alignChildren = ["left", "bottom"]
        Vesion.alignment = ["left", "top"]

        var version = Vesion.add("statictext", undefined, undefined, { name: "version" })
        version.text = versionTo
        version.alignment = ["right", "bottom"]


        done.onClick = function () {
            //Kiem tra thong tim form
            //Color fill / mask
            if (ColorFill.value == true) {
                result.colorFill = ColorFill.text
            }

            if (Mask.value == true) {
                result.mask = Mask.text
            }

            if (blend.value == true) {
                result.blend = blend.text;
            }

            if (runList == false) {
                // ==========================
                // alert(result.color.toString())
                if (result.product != '') {
                    if ((result.background != '' && result.color.toString() == '') || (result.background != '' && result.color.toString() == '-- Select --')) {
                        alert("Select Color BG!")
                    } else {
                        dialog.close()
                        check(result.variant)
                        // run(variant 0, grcolor 6, retouch 4, shadow 2, product 3, background 1, color 5, colorFill 7, mask 8, blend 9)
                        run(result.variant, result.grColor, result.retouch, result.product, result.shadow, result.background, result.color, result.colorFill, result.mask, result.blend)
                    }
                } else {
                    dialog.close()
                    checkReset(result.variant)
                    try { doc.channels.getByName("Struct").remove(); } catch (err) { }
                }
            }
            // return result
        }//end Run.click
        //show dialog
        dialog.show()
    }

    function run(variant, grcolor, retouch, product, shadow, background, color, colorFill, mask, blend) {
        var grColor = doc.layerSets["Color"]
        var grItem = doc.layerSets["Item"]
        var grShadow = doc.layerSets["Shadow"]
        var grBackground = doc.layerSets["Background"]

        //grColor name
        if (grColor.layers.length == 0 && grcolor == '') {
            doc.activeLayer = grColor
            doc.activeLayer.remove()
        }
        // alert("processing group color ");
        else if (grcolor != '') {
            if (grcolor != "Masken") {
                if (grcolor == "Background Mask") {
                    selectLayer("#Background")
                    loadSelectionMask()
                    saveSelection("selection")
                    doc.activeLayer.remove()
                    doc.activeLayer = grColor;
                    doc.activeLayer.name = grcolor;
                    addMask()
                }
                else if (grcolor == "MASKS") {
                    doc.activeLayer = grItem.artLayers["Product"]
                    loadSelectionMask()
                    saveChannel("selection")
                    doc.selection.deselect()
                    doc.activeLayer = grColor;
                    doc.activeLayer.name = grcolor;
                } else {
                    doc.activeLayer = grColor;
                    doc.activeLayer.name = grcolor;
                }
            }
        }
        else {
            doc.activeLayer = grColor
            doc.activeLayer.name = product
        }//end name grColor

        // Name layer Retouch
        if (retouch != '') {
            doc.activeLayer = grItem.artLayers["Retouch"]
            doc.activeLayer.name = retouch
            try { doc.activeLayer.grouped = true; } catch (error) { }
        } else {
            doc.activeLayer = grItem
            var lengthItem = doc.activeLayer.layers.length
            doc.activeLayer = doc.activeLayer.artLayers[lengthItem - 1]
            if (hasLayerMask() && doc.activeLayer.name == "Product" &&
                grItem.artLayers[0].name.slice(0, 7) != "Product" &&
                doc.activeLayer.name.slice(0, 7) == "Product copy") {
                doc.activeLayer = grItem
                for (var lengthItem; lengthItem > 1; lengthItem--) {
                    doc.activeLayer = grItem.artLayers[0]
                    try { doc.activeLayer.grouped = false } catch (error) { }
                    action("Mrg2")
                    doc.activeLayer = doc.activeLayer.parent
                }
            } else {
                if (grItem.artLayers[0].name != "Product") {
                    doc.activeLayer = grItem
                    doc.activeLayer = grItem.artLayers[0]
                    try { action("Mrg2") } catch (error) { }
                }
            }
        }

        //Name Layer product
        if (product != '') {
            doc.activeLayer = grItem.artLayers["Product"]
            doc.activeLayer.name = product
            if (mask == '') {//Product keep mask
                if (background != '' && color.toString() == "NoRemove" && grBackground.artLayers[0].name == "temp") {
                    grBackground.artLayers["temp"].remove()
                    doc.activeLayer.duplicate(grBackground, ElementPlacement.INSIDE)
                    applyMask()
                    doc.activeLayer = grBackground.artLayers[0]
                    if (hasLayerMask()) {
                        deleteMask()
                    }
                } else {
                    applyMask()
                }
            } else {//Product remover mask
                if (background != '' && color.toString() == "NoRemove" && grBackground.artLayers[0].name == "temp") {
                    grBackground.artLayers["temp"].remove()
                    doc.activeLayer.duplicate(grBackground, ElementPlacement.INSIDE)
                    doc.activeLayer = grBackground.artLayers[0]
                    if (hasLayerMask()) {
                        deleteMask()
                    }
                }
            }
        } else {
            doc.activeLayer = grItem.artLayers["Product"]
            doc.activeLayer.name = "Product"
        }

        //Name shadow
        if (shadow != '') {
            doc.activeLayer = grShadow.artLayers[0]
            doc.activeLayer.name = shadow
            if (blend != '') {
                doc.activeLayer.blendMode = BlendMode.MULTIPLY;
            }
        } else {
            doc.activeLayer = grShadow.artLayers[0]
            if (doc.activeLayer.bounds[2] == 0 && doc.activeLayer.name == "temp") {
                doc.activeLayer.remove()
            } else {
                alert("Call PS xem có giữ layer Shadow không!")
            }
        }

        //name Background
        if (background != '' && color != '' && color != "Transparent") {
            var rgb = hexToRgb(color);
            if (colorFill == '') {
                try {
                    doc.activeLayer = grBackground.artLayers["temp"]
                    fillColor(rgb.r, rgb.g, rgb.b)
                } catch (error) { doc.activeLayer = grBackground.artLayers[0] }
                doc.activeLayer.name = background
            } else {//
                try {
                    doc.activeLayer = grBackground.artLayers["temp"]
                    doc.activeLayer.remove()
                    makeSolidColor(rgb.r, rgb.g, rgb.b)
                } catch (error) { doc.activeLayer = grBackground.artLayers[0] }
                doc.activeLayer.name = background
            }
        } else if (color == "Transparent" && background != '') {
            doc.activeLayer = grBackground.artLayers[0]
            doc.activeLayer.name = background
        }
        else {
            try {
                doc.activeLayer = grBackground.artLayers["temp"]
                doc.activeLayer.remove()
            } catch (error) {
                doc.activeLayer = grBackground.artLayers[0]
                doc.activeLayer.name = background
            }

        }

        //===========STRUCT DITFEREN =======================

        //color Masken
        if (grcolor == "Masken") {
            doc.activeLayer = grColor
            moveDown()
            ungroupLayersEvent()
            // clippingMask()
            doc.layerSets.add().name = grcolor;
            var grColorTemp = doc.layerSets["Masken"]
            selectLayer("#Skin")
            doc.activeLayer.move(grColorTemp, ElementPlacement.INSIDE);
            doc.activeLayer.name = "Skin"
            selectLayer("#Style")
            doc.activeLayer.move(grColorTemp, ElementPlacement.INSIDE);
            doc.activeLayer.name = "Style"
            selectLayer("#Model")
            doc.activeLayer.move(grColorTemp, ElementPlacement.INSIDE);
            doc.activeLayer.name = "Model"
            try {
                doc.activeLayer = grBackground
                doc.activeLayer = grBackground.layers[0]
                moveUp(); moveUp(); moveUp(); moveUp()
            } catch (error) { }
            doc.activeLayer = grItem
            var nameStart = grItem.layers[0].name
            var nameEnd = grItem.layers[grItem.layers.length - 1].name
            selectGroupLayer(nameEnd, nameStart)
            action("Mrg2")
            doc.activeLayer.name = product
        }

        //color MASKS
        if (grcolor == "MASKS") {
            doc.activeLayer = grColor
            var grColorTemp = doc.layerSets["MASKS"]

            selectLayer("#shoes")
            doc.activeLayer.move(grColorTemp, ElementPlacement.INSIDE)
            addGR("shoes")

            selectLayer("#shirts")
            doc.activeLayer.move(grColorTemp, ElementPlacement.INSIDE)
            addGR("shirts")

            selectLayer("#bottoms")
            doc.activeLayer.move(grColorTemp, ElementPlacement.INSIDE)
            addGR("bottoms")

            selectLayer("#jackets")
            doc.activeLayer.move(grColorTemp, ElementPlacement.INSIDE)
            addGR("jackets")

            selectLayer("#skin")
            doc.activeLayer.move(grColorTemp, ElementPlacement.INSIDE)
            addGR("skin")

            selectLayer("#overall")
            doc.activeLayer.move(grColorTemp, ElementPlacement.INSIDE)
            addGR("overall")

            doc.activeLayer = grItem
            var nameStart = grItem.layers[0].name
            var nameEnd = grItem.layers[grItem.layers.length - 1].name
            // loadSelectionMask()
            // doc.activeLayer = grColorTemp
            // addMask()
            selectGroupLayer(nameEnd, nameStart)
            action("Mrg2")
            doc.activeLayer.name = product
            doc.activeLayer = doc.activeLayer.parent
            doc.activeLayer.name = "Ret"
            doc.activeLayer = grColorTemp
            doc.selection.load(doc.channels.getByName("selection"));
            addMask()
            grItem = null

            function addGR(lyr) {
                try { loadSelectionMask() } catch (error) {
                    doc.selection.selectAll()
                }
                doc.activeLayer.remove()
                doc.layerSets.add().name = lyr
                moveDown()
                addMask()
                doc.selection.deselect()
            }
        }


        //============Grcolor: Background mask =====================
        if (grcolor == "Background Mask") {
            //move layer in group color to group item
            selectLayer("Background Mask")
            var lengthGrColor = doc.activeLayer.layers.length
            var nameTopGrColor = doc.activeLayer.artLayers[0].name
            var namBottomGrColor = doc.activeLayer.artLayers[lengthGrColor - 1].name
            selectGroupLayer(namBottomGrColor, nameTopGrColor)
            moveDown(); moveDown()
            doc.activeLayer = doc.activeLayer.parent

            //merge All layer in group item or layer Retouch BG 
            var nameEnd = grItem.artLayers[0].name
            doc.activeLayer = grBackground
            try {
                doc.activeLayer = doc.activeLayer.artLayers[0]
                doc.activeLayer.name = "Retouch BG"
                moveUp(); moveUp(); moveUp(); moveUp()
            } catch (error) { }
            selectGroupLayer("Retouch BG", nameEnd)
            action("Mrg2")

            //Rename
            doc.activeLayer.name = product
        }

        //==================Ungroup===============
        try {
            doc.activeLayer = grItem; ungroupLayersEvent()
            //Kiem tra Product same name group color then merge
            if (doc.activeLayer.name == doc.layerSets[0].name && grcolor == '') {
                //If layer Product exist Mask
                if (hasLayerMask()) {
                    loadSelectionMask()
                    disableMask()
                    doc.activeLayer.move(doc.layerSets[0], ElementPlacement.PLACEATEND)
                    doc.activeLayer = doc.layerSets[0]
                    action("Mrg2")
                    addMask()
                } else { //No Mask
                    // alert(true)
                    doc.activeLayer.move(doc.layerSets[0], ElementPlacement.PLACEATEND)
                    doc.activeLayer = doc.layerSets[0]
                    action("Mrg2")
                }
            }
        } catch (error) { alert(error) }

        try { doc.activeLayer = grShadow; ungroupLayersEvent() } catch (error) { }
        try { doc.activeLayer = grBackground; ungroupLayersEvent() } catch (error) { }

        //Save cau truc vao log.
        // variant = variant + 1
        var saveStructLog = variant.toString() + '/'
            + grcolor.toString() + '/'
            + retouch.toString() + '/'
            + product.toString() + '/'
            + shadow.toString() + '/'
            + background.toString() + '/'
            + color.toString() + '/'
            + colorFill.toString() + '/'
            + mask.toString() + '/'
            + blend.toString()

        //seve chuoi JSON
        // var saveLogJson = { Struct: [{ variant: variant, background: background, shadow: shadow, product: product, retouch: retouch, color: color, colorFill: colorFill, mask: mask }] }
        // logMar.write(JSON.stringify(dataLog));
        // var oldMargins = JSON.parse(logMar.read());
        // alert(1)
        // // var logNameAct = new File("~/Appdata/Roaming/Adobe/logStructFinalize.log")
        // var logNameAct = new File("D:/logStructFinalize.log")
        if (logNameAct.exists) {
            // alert(1)
            logNameAct.open("r")
            logText = logNameAct.read()
            //kiem tra chuoi co ton tai
            checkString = logText.search(saveStructLog)
            if (checkString == -1) {
                //chuyen chuoi sang array
                var toAr = logText.split(",")

                if (toAr.length >= 11) {
                    toAr.pop()
                }
                logText = toAr.toString()
                var addText = logText + saveStructLog + ','
            } else {
                var addText = logText.replace(saveStructLog + ",", "") + saveStructLog + ','
            }
            logNameAct.close()
            logNameAct.remove()
            logNameAct.open("w")
            logNameAct.write(addText)
            logNameAct.close()
        } else {
            // alert(2)
            logNameAct.open("w")
            logNameAct.write(saveStructLog)
            logNameAct.close()
        }

        doc.channels.getByName("Struct").remove()
    }


    function addNameBackground(nameBackground, colorBackground, valueColorFill) {
        var rgb = hexToRgb(colorBackground);
        if (valueColorFill == false) {
            make(nameBackground)
            fillColor(rgb.r, rgb.g, rgb.b)
            doc.activeLayer.name = nameBackground
        } else {//
            makeSolidColor(rgb.r, rgb.g, rgb.b)
            doc.activeLayer.name = nameBackground
        }
    }


    function checkOnlyLayer() {
        var bounds = doc.activeLayer.layers.length
        if (bounds > 1) {
            doc.activeLayer = doc.activeLayer.artLayers[bounds - 1]
            doc.activeLayer.merge()
            doc.activeLayer = doc.activeLayer.parent
        }
    }

    function check(ver) {
        // alert(typeof ver)
        vari = parseInt(ver.toString().slice(-1))
        try {
            makeHistory("1")
        } catch (error) {
            selectHistory("1")
        }
        var flag = false
        doc.activeLayer = doc.layerSets["Variant " + vari].layerSets["Item " + vari]
        var lengthGrItem = doc.activeLayer.artLayers.length
        for (var i = lengthGrItem - 1; i >= 0; i--) {
            doc.activeLayer = doc.layerSets["Variant " + vari].layerSets["Item " + vari].artLayers[i]
            if (hasVectorMask()) {
                flag = true
                break
            }
        }
        if (flag == true) {
            alert("Done để save Path. Chec kỹ thông tin nền trước khi Done!")
        } else if (checkSelectionName("Struct") == false) {
            try {
                try {
                    //Nếu tồn tại Stencil
                    doc.activeLayer = doc.layerSets["Variant " + vari].layerSets["Item " + vari].artLayers["Stencil"]
                    var bound = doc.activeLayer.bounds
                    crop(bound[1], bound[0], bound[3], bound[2])
                    doc.activeLayer.remove()
                    doc.activeLayer = doc.layerSets["Variant " + vari]
                    show(true, "Variant " + vari)
                    checkStruct("BACKGROUND")
                    deleteHidden()
                    doc.activeLayer = doc.layerSets["Variant " + vari]
                    ungroupLayersEvent()
                    doc.activeLayer = doc.layerSets["Item " + vari]
                    re_name("Item")
                    checkItemFinalize()
                    doc.activeLayer = doc.layerSets["Color " + vari]
                    re_name("Color")
                    doc.activeLayer = doc.layerSets["Shadow " + vari]
                    re_name("Shadow")
                    checkGroupFinalize()
                    doc.activeLayer = doc.layerSets["Background " + vari]
                    re_name("Background")
                    checkGroupFinalize()
                    doc.selection.selectAll()
                    saveSelection("Struct")
                    doc.selection.deselect()
                } catch (error) {
                    //Không tồn tại Stencil
                    doc.activeLayer = doc.layerSets["Variant " + vari]
                    show(true, "Variant " + vari)
                    checkStruct("BACKGROUND")
                    deleteHidden()
                    doc.activeLayer = doc.layerSets["Variant " + vari]
                    ungroupLayersEvent()
                    doc.activeLayer = doc.layerSets["Item " + vari]
                    re_name("Item")
                    checkItemFinalize()
                    doc.activeLayer = doc.layerSets["Color " + vari]
                    re_name("Color")
                    doc.activeLayer = doc.layerSets["Shadow " + vari]
                    re_name("Shadow")
                    checkGroupFinalize()
                    doc.activeLayer = doc.layerSets["Background " + vari]
                    re_name("Background")
                    checkGroupFinalize()
                    doc.selection.selectAll()
                    saveSelection("Struct")
                    doc.selection.deselect()
                }
            } catch (error) {
                alert(error)
            }
            checkStructVer()
        }
    }

    function checkReset(ver) {
        // alert(typeof ver)
        vari = parseInt(ver.toString().slice(-1))
        try {
            makeHistory("1")
        } catch (error) {
            selectHistory("1")
        }
        var flag = false
        doc.activeLayer = doc.layerSets["Variant " + vari].layerSets["Item " + vari]
        var lengthGrItem = doc.activeLayer.artLayers.length
        for (var i = lengthGrItem - 1; i >= 0; i--) {
            doc.activeLayer = doc.layerSets["Variant " + vari].layerSets["Item " + vari].artLayers[i]
            if (hasVectorMask()) {
                flag = true
                break
            }
        }
        if (flag == true) {
            alert("Done để save Path. Chec kỹ thông tin nền trước khi Done!")
        } else if (checkSelectionName("Struct") == false) {
            try {
                try {
                    //Nếu tồn tại Stencil
                    doc.activeLayer = doc.layerSets["Variant " + vari].layerSets["Item " + vari].artLayers["Stencil"]
                    var bound = doc.activeLayer.bounds
                    crop(bound[1], bound[0], bound[3], bound[2])
                    doc.activeLayer.remove()
                    doc.activeLayer = doc.layerSets["Variant " + vari]
                    show(true, "Variant " + vari)
                    checkStruct("BACKGROUND")
                    deleteHidden()
                    doc.activeLayer = doc.layerSets["Variant " + vari]
                    ungroupLayersEvent()
                    doc.activeLayer = doc.layerSets["Item " + vari]
                    re_name("Item")
                    checkItemFinalize()
                    doc.activeLayer = doc.layerSets["Color " + vari]
                    re_name("Color")
                    doc.activeLayer = doc.layerSets["Shadow " + vari]
                    re_name("Shadow")
                    doc.activeLayer = doc.layerSets["Background " + vari]
                    re_name("Background")
                    doc.selection.selectAll()
                    saveSelection("Struct")
                    doc.selection.deselect()
                } catch (error) {
                    //Không tồn tại Stencil
                    doc.activeLayer = doc.layerSets["Variant " + vari]
                    show(true, "Variant " + vari)
                    checkStruct("BACKGROUND")
                    deleteHidden()
                    doc.activeLayer = doc.layerSets["Variant " + vari]
                    ungroupLayersEvent()
                    doc.activeLayer = doc.layerSets["Item " + vari]
                    re_name("Item")
                    checkItemFinalize()
                    doc.activeLayer = doc.layerSets["Color " + vari]
                    re_name("Color")
                    doc.activeLayer = doc.layerSets["Shadow " + vari]
                    re_name("Shadow")
                    doc.activeLayer = doc.layerSets["Background " + vari]
                    re_name("Background")
                    doc.selection.selectAll()
                    saveSelection("Struct")
                    doc.selection.deselect()
                }
            } catch (error) {
                alert(error)
            }
            checkStructVer()
        }
    }
    function checkStructVer() {
        if (doc.layers.length == 6) {
            doc.selection.selectAll()
            saveSelection("Crop")
            doc.selection.deselect()
            selectLayer("Product")
            doc.activeLayer.allLocked = true
            disableMask()
            doc.activeLayer = doc.layers[doc.layers.length - 2]
            selectaddLayer("Product")

            Algn(false, false, false)//fix layer trung nhau

            doc.layers["FixSize"].remove()

            selectLayer("Product")
            doc.activeLayer.allLocked = false
            enableMask()
            doc.selection.load(activeDocument.channels.getByName("Crop"))
            var bound = doc.selection.bounds
            crop(bound[1], bound[0], bound[3], bound[2])
            doc.activeLayer = doc.layers[doc.layers.length - 1]
            // moveLayer("next")
            // moveUp()
            // action("Mrg2")
        }
    }

    function selectaddLayer(lyr) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var list = new ActionList()
        var reference = new ActionReference()

        reference.putName(s2t("layer"), lyr)
        descriptor.putReference(c2t("null"), reference)
        descriptor.putEnumerated(s2t("selectionModifier"), s2t("selectionModifierType"), s2t("addToSelection"))
        descriptor.putBoolean(s2t("makeVisible"), false)
        list.putInteger(136)
        list.putInteger(299)
        descriptor.putList(s2t("layerID"), list)
        executeAction(s2t("select"), descriptor, DialogModes.NO)
    }
    function unClippingMask() {
        var idUngr = charIDToTypeID("Ungr")
        var desc2697 = new ActionDescriptor()
        var idnull = charIDToTypeID("null")
        var ref359 = new ActionReference()
        var idLyr = charIDToTypeID("Lyr ")
        var idOrdn = charIDToTypeID("Ordn")
        var idTrgt = charIDToTypeID("Trgt")
        ref359.putEnumerated(idLyr, idOrdn, idTrgt)
        desc2697.putReference(idnull, ref359)
        executeAction(idUngr, desc2697, DialogModes.NO)
    }

    function action(action) {
        var idCpTL = charIDToTypeID(action)
        executeAction(idCpTL, undefined, DialogModes.NO)
    }

    function Algn(alignToCanvas, vignette, radialDistort) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()

        reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"))
        descriptor.putReference(c2t("null"), reference)
        descriptor.putEnumerated(s2t("using"), s2t("alignDistributeSelector"), s2t("ADSContent"))
        descriptor.putBoolean(s2t("alignToCanvas"), alignToCanvas)
        descriptor.putEnumerated(s2t("apply"), s2t("projection"), s2t("auto"))
        descriptor.putBoolean(s2t("vignette"), vignette)
        descriptor.putBoolean(s2t("radialDistort"), radialDistort)
        executeAction(c2t("Algn"), descriptor, DialogModes.NO)
    }

    //select layer
    function selectLayer(nameLayer) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()

        reference.putName(s2t("layer"), nameLayer)
        descriptor.putReference(c2t("null"), reference)
        executeAction(s2t("select"), descriptor, DialogModes.NO)
    }

    function moveUp() {
        var idmove = charIDToTypeID("move");
        var desc1243 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref309 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref309.putEnumerated(idLyr, idOrdn, idTrgt);
        desc1243.putReference(idnull, ref309);
        var idT = charIDToTypeID("T   ");
        var ref310 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idNxt = charIDToTypeID("Nxt ");
        ref310.putEnumerated(idLyr, idOrdn, idNxt);
        desc1243.putReference(idT, ref310);
        executeAction(idmove, desc1243, DialogModes.NO);
    }
    function moveDown() {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()
        var reference2 = new ActionReference()

        reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"))
        descriptor.putReference(c2t("null"), reference)
        reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("previous"))
        descriptor.putReference(s2t("to"), reference2)
        executeAction(s2t("move"), descriptor, DialogModes.NO)
    }

    // "previous" //"next"
    function moveLayer(move) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()
        var reference2 = new ActionReference()

        reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"))
        descriptor.putReference(c2t("null"), reference)
        reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t(move))
        descriptor.putReference(s2t("to"), reference2)
        executeAction(s2t("move"), descriptor, DialogModes.NO)
    }


    function clearSelection() {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()

        reference.putProperty(s2t("channel"), s2t("selection"))
        descriptor.putReference(c2t("null"), reference)
        descriptor.putEnumerated(s2t("to"), s2t("ordinal"), s2t("none"))
        executeAction(s2t("set"), descriptor, DialogModes.NO)
    }

    //revert hinh
    function revert() {
        if (activeDocument.activeHistoryState.snapshot) {
            var d = new ActionDescriptor()
            var r = new ActionReference()
            r.putEnumerated(stringIDToTypeID("historyState"), stringIDToTypeID("ordinal"), stringIDToTypeID("last"))
            d.putReference(stringIDToTypeID("null"), r)
            executeAction(stringIDToTypeID("select"), d, DialogModes.NO)
        }
        else {
            var d = new ActionDescriptor()
            var r = new ActionReference()
            r.putIndex(stringIDToTypeID("snapshotClass"), 1)
            d.putReference(stringIDToTypeID("null"), r)
            executeAction(stringIDToTypeID("select"), d, DialogModes.NO)
        }
    }
    //Bat mat ten layer
    function showLayer(layer) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var list = new ActionList()
        var reference = new ActionReference()

        reference.putName(s2t("layer"), layer)
        list.putReference(reference)
        descriptor.putList(c2t("null"), list)
        executeAction(s2t("show"), descriptor, DialogModes.NO)
    }
    //tao layer trong voi ten tem trong foder shadow va bacground neu khong ton tai layer.
    function checkGroupFinalize() {
        var bounds = activeDocument.activeLayer.layers.length
        if (bounds < 1) {
            make("temp")
        }
    }
    //Lay all vung chon
    function setSelectionALL() {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()

        reference.putProperty(s2t("channel"), s2t("selection"))
        descriptor.putReference(c2t("null"), reference)
        descriptor.putEnumerated(s2t("to"), s2t("ordinal"), s2t("allEnum"))
        executeAction(s2t("set"), descriptor, DialogModes.NO)
    }
    //save vung chon
    function saveSelection(name2) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()

        reference.putProperty(s2t("channel"), s2t("selection"))
        descriptor.putReference(c2t("null"), reference)
        descriptor.putString(s2t("name"), name2)
        executeAction(s2t("duplicate"), descriptor, DialogModes.NO)
    }

    function checkItemFinalize() {
        var lengthGr = doc.activeLayer.layers.length
        doc.activeLayer = doc.activeLayer.artLayers[lengthGr - 1]
        var nameLayer = doc.activeLayer.name.search("Product")
        if (nameLayer == 0) {
            //Nếu layer cuối cùng trong group là Product
            re_name("Product")
            try {
                makeMask()
            } catch (error) {
            } finally {
                make("Retouch")
                try {
                    doc.activeLayer.grouped = false
                } catch (error) {
                    // alert(error)
                }
                setSelectedLayer("Item")
                var bound = doc.activeLayer.layers.length
                if (bound > 2) {
                    for (bound; bound >= 3; bound--) {
                        doc.activeLayer = doc.activeLayer.artLayers[0]
                        try {
                            action("Mrg2")
                        } catch (error) {
                            doc.activeLayer.grouped = false
                            action("Mrg2")
                        } finally {
                            setSelectedLayer("Item")
                        }

                    }
                }
            }

        } else {
            //Reset # before name layer
            doc.activeLayer = doc.activeLayer.parent
            for (var i = 0; i < lengthGr; i++) {
                var nameCurentLayer = doc.activeLayer.layers[i].name.search("#")
                if (nameCurentLayer == 0) {
                    doc.activeLayer.layers[i].name = doc.activeLayer.layers[i].name.slice(1)
                } else {

                }
            }
        }
    }

    function hasLayerMask() {
        var reference = new ActionReference()
        reference.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"))
        var desc = executeActionGet(reference)
        return desc.getBoolean(stringIDToTypeID("hasUserMask"))
    }

    //Check vectormask
    function hasVectorMask() {
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var desget = executeActionGet(ref);
        return desget.getBoolean(stringIDToTypeID("hasVectorMask"));
    }

    function makeMask() {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()

        descriptor.putClass(s2t("new"), s2t("channel"))
        reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("mask"))
        descriptor.putReference(s2t("at"), reference)
        descriptor.putEnumerated(s2t("using"), c2t("UsrM"), s2t("revealAll"))//revealAll - hideAll"
        executeAction(s2t("make"), descriptor, DialogModes.NO)
    }
    //new layer
    function make(name2) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var descriptor2 = new ActionDescriptor()
        var reference = new ActionReference()

        reference.putClass(s2t("layer"))
        descriptor.putReference(c2t("null"), reference)
        descriptor2.putString(s2t("name"), name2)
        descriptor.putObject(s2t("using"), s2t("layer"), descriptor2)
        executeAction(s2t("make"), descriptor, DialogModes.NO)
    }

    //doi ten layer
    function re_name(name2) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var descriptor2 = new ActionDescriptor()
        var reference = new ActionReference()

        reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"))
        descriptor.putReference(c2t("null"), reference)
        descriptor2.putString(s2t("name"), name2)
        descriptor.putObject(s2t("to"), s2t("layer"), descriptor2)
        executeAction(s2t("set"), descriptor, DialogModes.NO)
    }


    //ungroup
    function ungroupLayersEvent() {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()

        reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"))
        descriptor.putReference(c2t("null"), reference)
        executeAction(s2t("ungroupLayersEvent"), descriptor, DialogModes.NO)
    }

    //xoa layer
    function deleteLayer(layer) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var list = new ActionList()
        var reference = new ActionReference()

        reference.putName(s2t("layer"), layer)
        descriptor.putReference(c2t("null"), reference)
        list.putInteger(90)
        descriptor.putList(s2t("layerID"), list)
        executeAction(s2t("delete"), descriptor, DialogModes.NO)
    }

    function crop(top, left, bottom, right) {
        var idCrop = charIDToTypeID("Crop")
        var desc11 = new ActionDescriptor()
        var idT = charIDToTypeID("T   ")
        var desc12 = new ActionDescriptor()
        var idTop = charIDToTypeID("Top ")
        var idPxl = charIDToTypeID("#Pxl")
        desc12.putUnitDouble(idTop, idPxl, top)
        var idLeft = charIDToTypeID("Left")
        var idPxl = charIDToTypeID("#Pxl")
        desc12.putUnitDouble(idLeft, idPxl, left)
        var idBtom = charIDToTypeID("Btom")
        var idPxl = charIDToTypeID("#Pxl")
        desc12.putUnitDouble(idBtom, idPxl, bottom)
        var idRght = charIDToTypeID("Rght")
        var idPxl = charIDToTypeID("#Pxl")
        desc12.putUnitDouble(idRght, idPxl, right)
        var idRctn = charIDToTypeID("Rctn")
        desc11.putObject(idT, idRctn, desc12)
        var idAngl = charIDToTypeID("Angl")
        var idAng = charIDToTypeID("#Ang")
        desc11.putUnitDouble(idAngl, idAng, 0.000000)
        var idDlt = charIDToTypeID("Dlt ")
        desc11.putBoolean(idDlt, false)
        var idcropAspectRatioModeKey = stringIDToTypeID("cropAspectRatioModeKey")
        var idcropAspectRatioModeClass = stringIDToTypeID("cropAspectRatioModeClass")
        var idtargetSize = stringIDToTypeID("targetSize")
        desc11.putEnumerated(idcropAspectRatioModeKey, idcropAspectRatioModeClass, idtargetSize)
        executeAction(idCrop, desc11, DialogModes.NO)
    }
    //lay vung chon tu layer
    function setSelectonLayer(layer) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()
        var reference2 = new ActionReference()

        reference.putProperty(s2t("channel"), s2t("selection"))
        descriptor.putReference(c2t("null"), reference)
        reference2.putEnumerated(s2t("channel"), s2t("channel"), s2t("transparencyEnum"))
        reference2.putName(s2t("layer"), layer)
        descriptor.putReference(s2t("to"), reference2)
        executeAction(s2t("set"), descriptor, DialogModes.NO)
    }

    //chec cau truc co ton tai layer cuoi cung voi ten ko
    function checkStruct(layer) {
        try {
            var bounds = doc.layers.length
            doc.activeLayer = doc.layers[bounds - 1]
            doc.activeLayer.visible = false
            var nameLayer = doc.activeLayer.name
            var searchProductName = nameLayer.search(layer)
            if (searchProductName == -1) {
                doc.activeLayer.visible = true
                // make("FixSize")
                doc.activeLayer.duplicate().name = "FixSize";
                doc.activeLayer.link(doc.layers["FixSize"])
            }
        } catch (error) {
            alert(error)
        }
    }


    //delete layer tat mat
    function deleteHidden() {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()

        reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("hidden"))
        descriptor.putReference(c2t("null"), reference)
        executeAction(s2t("delete"), descriptor, DialogModes.NO)
    }

    function show(TglO, layer) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var list = new ActionList()
        var reference = new ActionReference()

        reference.putName(s2t("layer"), layer)
        list.putReference(reference)
        descriptor.putList(c2t("null"), list)
        descriptor.putBoolean(c2t("TglO"), TglO)
        executeAction(s2t("show"), descriptor, DialogModes.NO)
    }


    //kiem tra ton tai selection với tên .....
    function checkSelectionName(nameChannel) {
        var result = false
        try {
            var channelRef = app.activeDocument.channels.getByName(nameChannel)
            if (channelRef) {
                //app.activeDocument.selection.load(channelRef)
                result = true
            }
        } catch (error) { }
        return result
    }

    //kiem tra layer co ton tai mask khong
    function hasLayerMask() {
        var reference = new ActionReference()
        reference.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"))
        var desc = executeActionGet(reference)
        return desc.getBoolean(stringIDToTypeID("hasUserMask"))
    }

    function deleteMask() {
        var idDlt = charIDToTypeID("Dlt ");
        var desc4950 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref1060 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idChnl = charIDToTypeID("Chnl");
        var idMsk = charIDToTypeID("Msk ");
        ref1060.putEnumerated(idChnl, idChnl, idMsk);
        desc4950.putReference(idnull, ref1060);
        executeAction(idDlt, desc4950, DialogModes.NO);
    }

    //Ham kiem tra ton tai foder.
    function checkFoderName(foderName) {
        var result = false
        for (var i = 0; i < activeDocument.layers.length; i++) {
            if (String(activeDocument.layers[i].name) == foderName) {
                result = true
                break
            }
        }
        return result
    }
    function checkAlllockLayer() {
        var result = false
        try {
            if (activeDocument.activeLayer.allLocked ||
                activeDocument.activeLayer.pixelsLocked ||
                activeDocument.activeLayer.positionLocked ||
                activeDocument.activeLayer.transparentPixelsLocked) {
                activeDocument.activeLayer.allLocked = false
                activeDocument.activeLayer.pixelsLocked = false
                activeDocument.activeLayer.positionLocked = false
                activeDocument.activeLayer.transparentPixelsLocked = false
                result = true
            }
        } catch (error) { }
        return result
    }

    //select layer
    function setSelectedLayer(layerName) {
        var result = false
        try {
            var idslct = charIDToTypeID("slct")
            var desc19 = new ActionDescriptor()
            var idnull = charIDToTypeID("null")
            var ref1 = new ActionReference()
            var idLyr = charIDToTypeID("Lyr ")
            ref1.putName(idLyr, layerName)
            desc19.putReference(idnull, ref1)
            var idMkVs = charIDToTypeID("MkVs")
            desc19.putBoolean(idMkVs, false)
            var idLyrI = charIDToTypeID("LyrI")
            var list2 = new ActionList()
            list2.putInteger(10)
            desc19.putList(idLyrI, list2)
            executeAction(idslct, desc19, DialogModes.NO)
            result = true
        } catch (error) {
        }
        return result
    }


    function applyMask() {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()

        reference.putEnumerated(s2t("channel"), s2t("channel"), s2t("mask"))
        descriptor.putReference(c2t("null"), reference)
        descriptor.putBoolean(s2t("apply"), true)
        executeAction(s2t("delete"), descriptor, DialogModes.NO)
    }

    //Fill colo laye mask
    function fillColorMask(red, green, blue) {
        var idslct = charIDToTypeID("slct")
        var desc2135 = new ActionDescriptor()
        var idnull = charIDToTypeID("null")
        var ref918 = new ActionReference()
        var idChnl = charIDToTypeID("Chnl")
        var idChnl = charIDToTypeID("Chnl")
        var idMsk = charIDToTypeID("Msk ")
        ref918.putEnumerated(idChnl, idChnl, idMsk)
        desc2135.putReference(idnull, ref918)
        var idMkVs = charIDToTypeID("MkVs")
        desc2135.putBoolean(idMkVs, false)
        executeAction(idslct, desc2135, DialogModes.NO)

        var myColor = new SolidColor()
        myColor.rgb.red = red // 0 - 255
        myColor.rgb.green = green
        myColor.rgb.blue = blue
        activeDocument.selection.fill(myColor)

    }
    //Fill colo layer.
    function fillColor(red, green, blue) {
        var myColor = new SolidColor()
        myColor.rgb.red = red // 0 - 255
        myColor.rgb.green = green
        myColor.rgb.blue = blue
        activeDocument.selection.fill(myColor)

    }

    function makeSolidColor(red, Grn, blue) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var descriptor2 = new ActionDescriptor()
        var descriptor3 = new ActionDescriptor()
        var descriptor4 = new ActionDescriptor()
        var reference = new ActionReference()

        reference.putClass(s2t("contentLayer"))
        descriptor.putReference(c2t("null"), reference)
        descriptor4.putDouble(s2t("red"), red)
        descriptor4.putDouble(c2t("Grn "), Grn)
        descriptor4.putDouble(s2t("blue"), blue)
        descriptor3.putObject(s2t("color"), s2t("RGBColor"), descriptor4)
        descriptor2.putObject(s2t("type"), s2t("solidColorLayer"), descriptor3)
        descriptor.putObject(s2t("using"), s2t("contentLayer"), descriptor2)
        executeAction(s2t("make"), descriptor, DialogModes.NO)
    }

    //Save History
    function makeHistory(name2) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()
        var reference2 = new ActionReference()

        reference.putClass(s2t("snapshotClass"))
        descriptor.putReference(c2t("null"), reference)
        reference2.putProperty(c2t("HstS"), s2t("currentHistoryState"))
        descriptor.putReference(s2t("from"), reference2)
        descriptor.putString(s2t("name"), name2)
        descriptor.putEnumerated(s2t("using"), c2t("HstS"), s2t("fullDocument"))
        executeAction(s2t("make"), descriptor, DialogModes.NO)
    }

    //select history
    function selectHistory(nameHistory) {
        var c2t = function (s) {
            return app.charIDToTypeID(s)
        }

        var s2t = function (s) {
            return app.stringIDToTypeID(s)
        }

        var descriptor = new ActionDescriptor()
        var reference = new ActionReference()

        reference.putName(s2t("snapshotClass"), nameHistory)
        descriptor.putReference(c2t("null"), reference)
        executeAction(s2t("select"), descriptor, DialogModes.NO)
    }

    //Loading action
    // function loadAction(actionName, action) {
    //     try {
    //         app.doAction(actionName, action)
    //     } catch (error) {

    //     }
    // }

    //function selecGroup layer
    function selectGroupLayer(before, after) {
        selectLayer(before);
        var idslct = charIDToTypeID("slct");
        var desc360 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref187 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref187.putName(idLyr, after);
        desc360.putReference(idnull, ref187);
        var idselectionModifier = stringIDToTypeID("selectionModifier");
        var idselectionModifierType = stringIDToTypeID("selectionModifierType");
        var idaddToSelectionContinuous = stringIDToTypeID("addToSelectionContinuous");
        desc360.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelectionContinuous);
        var idMkVs = charIDToTypeID("MkVs");
        desc360.putBoolean(idMkVs, false);
        var idLyrI = charIDToTypeID("LyrI");
        var list94 = new ActionList();
        desc360.putList(idLyrI, list94);
        executeAction(idslct, desc360, DialogModes.NO);
    }

    function selectGroupLayer(before, after) {
        selectLayer(before);

        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var list = new ActionList();
        var reference = new ActionReference();

        reference.putName(s2t("layer"), after);
        descriptor.putReference(c2t("null"), reference);
        descriptor.putEnumerated(s2t("selectionModifier"), s2t("selectionModifierType"), s2t("addToSelectionContinuous"));
        descriptor.putBoolean(s2t("makeVisible"), false);
        descriptor.putList(s2t("layerID"), list);
        executeAction(s2t("select"), descriptor, DialogModes.NO);
    }
    function moveBack() {
        var c2t = function (s) {
            return app.charIDToTypeID(s);
        };

        var s2t = function (s) {
            return app.stringIDToTypeID(s);
        };

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();
        var reference2 = new ActionReference();

        reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"));
        descriptor.putReference(c2t("null"), reference);
        reference2.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("previous"));
        descriptor.putReference(s2t("to"), reference2);
        executeAction(s2t("move"), descriptor, DialogModes.NO);
    }

    //function clipingmask
    function clippingMask() {
        var idGrpL = charIDToTypeID("GrpL");
        var desc362 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref188 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref188.putEnumerated(idLyr, idOrdn, idTrgt);
        desc362.putReference(idnull, ref188);
        executeAction(idGrpL, desc362, DialogModes.NO);

    }


    //load selection mask
    function loadSelectionMask() {
        var idsetd = charIDToTypeID("setd");
        var desc32 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref14 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idfsel = charIDToTypeID("fsel");
        ref14.putProperty(idChnl, idfsel);
        desc32.putReference(idnull, ref14);
        var idT = charIDToTypeID("T   ");
        var ref15 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idChnl = charIDToTypeID("Chnl");
        var idMsk = charIDToTypeID("Msk ");
        ref15.putEnumerated(idChnl, idChnl, idMsk);
        desc32.putReference(idT, ref15);
        executeAction(idsetd, desc32, DialogModes.NO);
    }

    //save selection Channel
    function saveChannel(name) {
        var desc977 = new ActionDescriptor();
        var ref38 = new ActionReference();
        ref38.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
        desc977.putReference(charIDToTypeID("null"), ref38);
        desc977.putString(charIDToTypeID("Nm  "), name);
        executeAction(charIDToTypeID("Dplc"), desc977, DialogModes.NO);
        return activeDocument.channels.getByName(name);
    }

    function addMask() {
        var idMk = charIDToTypeID("Mk  ");
        var desc358 = new ActionDescriptor();
        var idNw = charIDToTypeID("Nw  ");
        var idChnl = charIDToTypeID("Chnl");
        desc358.putClass(idNw, idChnl);
        var idAt = charIDToTypeID("At  ");
        var ref208 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idChnl = charIDToTypeID("Chnl");
        var idMsk = charIDToTypeID("Msk ");
        ref208.putEnumerated(idChnl, idChnl, idMsk);
        desc358.putReference(idAt, ref208);
        var idUsng = charIDToTypeID("Usng");
        var idUsrM = charIDToTypeID("UsrM");
        var idRvlS = charIDToTypeID("RvlS");
        desc358.putEnumerated(idUsng, idUsrM, idRvlS);
        executeAction(idMk, desc358, DialogModes.NO);
    }

    function enableMask() {
        var idsetd = charIDToTypeID("setd");
        var desc925 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref239 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref239.putEnumerated(idLyr, idOrdn, idTrgt);
        desc925.putReference(idnull, ref239);
        var idT = charIDToTypeID("T   ");
        var desc926 = new ActionDescriptor();
        var idUsrM = charIDToTypeID("UsrM");
        desc926.putBoolean(idUsrM, true);
        var idLyr = charIDToTypeID("Lyr ");
        desc925.putObject(idT, idLyr, desc926);
        executeAction(idsetd, desc925, DialogModes.NO);
    }

    function disableMask() {
        var idsetd = charIDToTypeID("setd");
        var desc112 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref63 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref63.putEnumerated(idLyr, idOrdn, idTrgt);
        desc112.putReference(idnull, ref63);
        var idT = charIDToTypeID("T   ");
        var desc113 = new ActionDescriptor();
        var idUsrM = charIDToTypeID("UsrM");
        desc113.putBoolean(idUsrM, false);
        var idLyr = charIDToTypeID("Lyr ");
        desc112.putObject(idT, idLyr, desc113);
        executeAction(idsetd, desc112, DialogModes.NO);
    }
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : ""//alert("Mã màu nhập không đúng!");
    }


}


function deselectPath() {
    var idDslc = charIDToTypeID("Dslc");
    var desc2657 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref325 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref325.putEnumerated(idPath, idOrdn, idTrgt);
    desc2657.putReference(idnull, ref325);
    executeAction(idDslc, desc2657, DialogModes.NO);
}

function logAction(params) {
    var logNameAct = new File("//172.16.2.2/Public Data/Academy/LogAction/" + params + ".log");
    if (logNameAct.exists) {
        logNameAct.open("r")
        logText = logNameAct.read()
        const y = Number(logText)
        var addText = y + 1
        logNameAct.close()
        logNameAct.remove()
        logNameAct.open("w")
        logNameAct.write(addText)
        logNameAct.close()
    } else {
        logNameAct.open("w")
        logNameAct.write(1)
        logNameAct.close()
    }
}

