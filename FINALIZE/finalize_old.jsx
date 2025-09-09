
//By Duc Hiep - Acad DN Version 1.0 -- FINALIZE

const versionTo = " By Acad -- Version 1.0 -- "

preferences.rulerUnits = Units.PIXELS
app.preferences.typeunits = TypeUnits.PIXELS
const doc = activeDocument
const arVariant = ["Variant 1", "Variant 2", "Variant 3", "Variant 4", "Variant 5", "Variant 6", "Variant 7", "Variant 8"]
const arBg = ["1", "2", "Background", "BACKGROUND", "background", "bg", "Original", "original"]
const arrColor = ["No Color", "#FFFFFF", "#F7F7F7", "#F9F9F9", "#EFEFEF", "#F4F4F4", "#E3D6C8"]
const arrShadow = ["2", "3", "Shadow", "SHADOW", "shadow", "sd", ""]
const arrProduct = ["2", "3", "4", "Product", "PRODUCT", "product", "Model", "Retouch"]//"Cutout", "Produkt", "SHOE", "SILO", "retouch", 
const arrRetouch = ["4", "5", "Retouch", "RETOUCH", "retouch", "Skin Retouch", "PDT", ""]
const arrGrColor = ["Color", "Color Adjustment", "Masken", "Background Mask", "Color 4", "MASKS"]
checkForm()
function checkForm() {
    var result = { variant: '', background: '', shadow: '', product: '', retouch: '', color: '', grColor: '', colorFill: '', mask: '', blend: '' }
    // var log
    // DIALOG
    // ======
    var dialog = new Window("dialog")
    dialog.text = "FINALIZE"
    // dialog.preferredSize.width = 700
    dialog.orientation = "column"
    dialog.alignChildren = ["left", "top"]
    dialog.spacing = 10
    dialog.margins = 18

    // STRUCTFINALIZE
    var dlg = dialog.add("group", undefined, undefined, { name: "Dlg" })
    dlg.orientation = "row"
    dlg.alignChildren = ["left", "top"]
    dlg.spacing = 10
    dlg.margins = 0

    // VARIANT
    // ==========
    var variant = dlg.add("panel", undefined, undefined, { name: "variant" })
    variant.text = "Variant"
    variant.orientation = "column"
    variant.alignChildren = ["left", "top"]
    variant.spacing = 10
    variant.margins = 10

    for (var i = 0; i < arVariant.length; i++) {
        var vari = variant.add("radiobutton", undefined, undefined, { name: "variant" })
        vari.text = arVariant[i]
        if (i == 0) {
            vari.value = true;
            result.variant = vari.text
        }
        vari.onClick = function () {
            result.variant = this.text
        }
    }

    // BACKGROUND
    // ==========
    var background = dlg.add("panel", undefined, undefined, { name: "background" })
    background.text = "Background"
    background.orientation = "column"
    background.alignChildren = ["left", "top"]
    background.spacing = 10
    background.margins = 10

    for (var i = 0; i < arBg.length; i++) {
        var br = background.add("radiobutton", undefined, undefined, { name: "Background" })
        br.text = arBg[i]
        br.onClick = function () {
            result.background = this.text
            color.show()
        }
    }

    // COLOR BACKGROUND
    var color = dlg.add("panel", undefined, undefined, { name: "color" })
    color.text = "Color BG"
    color.hide()
    // color.enabled = false
    color.orientation = "column"
    color.alignChildren = ["left", "top"]
    color.spacing = 10
    color.margins = 10

    for (var i = 0; i < arrColor.length; i++) {
        var Color = color.add("radiobutton", undefined, undefined, { name: "GrColor" })
        Color.text = arrColor[i]
        Color.onClick = function () {
            result.color = this.text
        }
    }

    var ColorFill = color.add("checkbox", undefined, undefined, { name: "ColorFill" })
    ColorFill.text = "Color Fill"

    // SHADOW
    // ======
    var shadow = dlg.add("panel", undefined, undefined, { name: "Shadow" })
    shadow.text = "Shadow"
    shadow.orientation = "column"
    shadow.alignChildren = ["left", "top"]
    shadow.spacing = 10
    shadow.margins = 10

    for (var i = 0; i < arrShadow.length; i++) {
        var sd = shadow.add("radiobutton", undefined, undefined, { name: "Shadow" })
        sd.text = arrShadow[i]
        sd.onClick = function () {
            result.shadow = this.text
        }
    }

    var blend = shadow.add("checkbox", undefined, undefined, { name: "Blend" })
    blend.text = "Multiply"

    // PRODUCT
    // =======
    var product = dlg.add("panel", undefined, undefined, { name: "product" })
    product.text = "Product"
    product.orientation = "column"
    product.alignChildren = ["left", "top"]
    product.spacing = 10
    product.margins = 10

    for (var i = 0; i < arrProduct.length; i++) {
        var pr = product.add("radiobutton", undefined, undefined, { name: "Product" })
        pr.text = arrProduct[i]
        pr.onClick = function () {
            result.product = this.text
        }
    }

    var Mask = product.add("checkbox", undefined, undefined, { name: "Mask" })
    Mask.text = "Exist Mask"
    // Mask.value = true

    // RETOUCH
    // =======
    var retouch = dlg.add("panel", undefined, undefined, { name: "retouch" })
    retouch.text = "Retouch"
    retouch.orientation = "column"
    retouch.alignChildren = ["left", "top"]
    retouch.spacing = 10
    retouch.margins = 10

    for (var i = 0; i < arrRetouch.length; i++) {
        var rt = retouch.add("radiobutton", undefined, undefined, { name: "Retouch" })
        rt.text = arrRetouch[i]
        rt.onClick = function () {
            result.retouch = this.text
        }
    }

    // GROUP COLOR NAME
    var grColor = dlg.add("panel", undefined, undefined, { name: "grcolor" })
    grColor.text = "Group Color"
    // color.hide()
    // color.enabled = false
    grColor.orientation = "column"
    grColor.alignChildren = ["left", "top"]
    grColor.spacing = 10
    grColor.margins = 10

    for (var i = 0; i < arrGrColor.length; i++) {
        var gr_Color = grColor.add("radiobutton", undefined, undefined, { name: "GrColor" })
        gr_Color.text = arrGrColor[i]
        gr_Color.onClick = function () {
            result.grColor = this.text
        }
    }
    //////////////VIEW LIST SAVE LOG STRUCT FINALIZE
    var group = dialog.add("group", undefined, undefined, { name: "group1" });
    group.orientation = "column";
    group.alignChildren = ["left", "center"];
    group.spacing = 10;
    group.margins = 0;

    var panel1 = group.add("group", undefined, undefined, { name: "panel" });
    panel1.orientation = "row";
    panel1.alignChildren = ["left", "center"];
    panel1.spacing = 10;
    panel1.margins = 0;
    var listStructStile = ['Variant', 'Background', 'Shadow', 'Product', 'Retouch', 'Color', 'Group Color', 'Color Fill', 'Exist Mask', 'Blend mode', '']

    for (var i = 0; i < listStructStile.length; i++) {
        var listTitle = panel1.add("statictext", undefined, undefined, { name: listStructStile[i] });
        listTitle.text = listStructStile[i];
        listTitle.preferredSize.width = 65;
        listTitle.preferredSize.height = 10;
    }

    // GROUP2
    // ======
    try {
        var logNameAct = new File("~/Appdata/Roaming/Adobe/logStructFinalize.log")
        if (logNameAct.exists) {
            logNameAct.open("r")
            logText = logNameAct.read()
            var toAr = logText.split(",")
            logNameAct.close()
        }

        var panel2 = group.add("panel", undefined, undefined, { name: "panel2" });
        panel2.orientation = "column";
        panel2.alignChildren = ["left", "center"];
        panel2.spacing = 10;
        panel2.margins = 0;

        var listbox1_array = toAr
        var runList = false

        for (var i = 0; i < listbox1_array.length; i++) {
            var group3 = panel2.add("group", undefined, { name: "group2" });
            group3.orientation = "row";
            group3.alignChildren = ["left", "center"];
            group3.spacing = 10;
            group3.margins = 0;
            var textToArr = listbox1_array[i].toString().split("/")
            // alert(textToArr);
            if (textToArr != '') {
                for (var j = 0; j < textToArr.length; j++) {
                    var listTitleBody = group3.add("statictext", undefined, undefined, { name: textToArr[j] });
                    listTitleBody.text = textToArr[j];
                    listTitleBody.preferredSize.width = 65;
                    listTitleBody.preferredSize.height = 20;
                }
                // var btnRemove = gr.add("button{size: [50,10], text: 'Remove', index:" + i + "}");
                var btnRun = group3.add("button{size: [50,10], text: 'Run', name:" + "\'" + textToArr + "\'" + "}")

                btnRun.onClick = function () {
                    this.runList = true
                    dialog.close()
                    var arrResult = this.name.split(",")
                    check(arrResult[0])
                    run(arrResult[0], arrResult[1], arrResult[2], arrResult[3], arrResult[4], arrResult[5], arrResult[6], arrResult[7], arrResult[8], arrResult[9])
                }
            }
        }
    } catch (error) {
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
    done.text = "Done"
    var Cancel = Run.add("button", undefined, undefined, { name: "Cancel" })
    Cancel.text = "Cancel"

    // GROUP4 version
    // ======
    var Vesion = dialog.add("group", undefined, { name: "Version" })
    Vesion.orientation = "column"
    Vesion.alignChildren = ["left", "bottom"]
    Vesion.spacing = 10
    Vesion.margins = 0
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

            if (result.product != '') {
                if (result.background != '' & result.color == '') {
                    alert("Select Color BG!")
                } else {
                    dialog.close()
                    check(result.variant)
                    run(result.variant, result.background, result.shadow, result.product, result.retouch, result.color, result.grColor, result.colorFill, result.mask, result.blend)
                }

            } else {
                alert("Select Product!")
            }
        }
        // return result
    }//end Run.click
    //show dialog
    dialog.show()
}
function run(variant, background, shadow, product, retouch, color, grcolor, colorFill, mask, blend) {
    var grColor = doc.layerSets["Color"]
    var grItem = doc.layerSets["Item"]
    var grShadow = doc.layerSets["Shadow"]
    var grBackground = doc.layerSets["Background"]

    //grColor name
    if (grColor.layers.length == 0 && grcolor == '') {
        doc.activeLayer = grColor
        doc.activeLayer.remove()
    } else if (grcolor != '') {
        // alert("processing group color ");
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
            else if(grcolor == "MASKS"){
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
    } else {
        doc.activeLayer = grColor
        doc.activeLayer.name = product
    }//end name grColor

    // Name layer Retouch
    if (retouch != '') {
        doc.activeLayer = grItem.artLayers["Retouch"]
        doc.activeLayer.name = retouch
        try { unClippingMask() } catch (error) { }
    } else {
        doc.activeLayer = grItem
        var lengthItem = doc.activeLayer.layers.length
        doc.activeLayer = doc.activeLayer.artLayers[lengthItem - 1]
        if (hasLayerMask() && doc.activeLayer.name.search("Product") == (1)) {
            doc.activeLayer = grItem
            for (var lengthItem; lengthItem > 1; lengthItem--) {
                doc.activeLayer = grItem.artLayers[0]
                try { clippingMask() } catch (error) { }
                action("Mrg2")
                doc.activeLayer = doc.activeLayer.parent
            }
        } else {
            doc.activeLayer = grItem
            doc.activeLayer = grItem.artLayers[0]
            try { action("Mrg2") } catch (error) { }
        }
    }
    //Name Layer product
    if (product != '') {
        doc.activeLayer = grItem.artLayers["Product"]
        doc.activeLayer.name = product
        if (mask == '') {
            applyMask()
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
        doc.activeLayer.remove()
    }
    //name Background
    if (background != '' & color != '') {
        var rgb = hexToRgb(color);
        if (colorFill == '') {
            try {
                doc.activeLayer = grBackground.artLayers["temp"]
                fillColor(rgb.r, rgb.g, rgb.b)
            } catch (error) { doc.activeLayer = grBackground.artLayers[0] }
            doc.activeLayer.name = background

        } else {
            try {
                doc.activeLayer = grBackground.artLayers["temp"]
                doc.activeLayer.remove()
                makeSolidColor(rgb.r, rgb.g, rgb.b)
            } catch (error) { doc.activeLayer = grBackground.artLayers[0] }
            doc.activeLayer.name = background
        }
    } else {
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
        var namBottomGrColor = doc.activeLayer.artLayers[lengthGrColor-1].name
        selectGroupLayer(namBottomGrColor,nameTopGrColor)
        moveDown();moveDown()
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
    try { doc.activeLayer = grItem; ungroupLayersEvent() } catch (error) { }
    try { doc.activeLayer = grShadow; ungroupLayersEvent() } catch (error) { }
    try { doc.activeLayer = grBackground; ungroupLayersEvent() } catch (error) { }

    //Save cau truc vao log.
    var saveStructLog = variant + "/" + background + "/" + shadow + "/" + product + "/" + retouch + "/" + color + "/" + grcolor + "/" + colorFill + "/" + mask + "/" + blend
    //seve chuoi JSON
    // var saveLogJson = { Struct: [{ variant: variant, background: background, shadow: shadow, product: product, retouch: retouch, color: color, colorFill: colorFill, mask: mask }] }
    // logMar.write(JSON.stringify(dataLog));
    // var oldMargins = JSON.parse(logMar.read());
    var logNameAct = new File("~/Appdata/Roaming/Adobe/logStructFinalize.log")
    if (logNameAct.exists) {
        logNameAct.open("r")
        logText = logNameAct.read()
        //kiem tra chuoi co ton tai
        checkString = logText.search(saveStructLog)
        if (checkString == -1) {
            //chuyen chuoi sang array
            var toAr = logText.split(",")

            if (toAr.length >= 10) {
                toAr.pop()
            }

            logText = toAr.toString()
            var addText = saveStructLog + ',' + logText

        } else {
            var addText = logText
        }

        logNameAct.close()
        logNameAct.remove()
        logNameAct.open("w")
        logNameAct.write(addText)
        logNameAct.close()
    } else {
        logNameAct.open("w")
        logNameAct.write(saveStructLog)
        logNameAct.close()
    }

    doc.channels.getByName("Struct").remove()
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
    ver = ver.slice(-1)
    if (checkSelectionName("Struct") == false) {
        try {
            makeHistory("1")
        } catch (error) {
            selectHistory("1")
        }
        switch (ver) {
            case "2":
                deleteLayer("Variant 1")
                break;
            case "3":
                deleteLayer("Variant 1")
                deleteLayer("Variant 2")
                break;
            case "4":
                deleteLayer("Variant 1")
                deleteLayer("Variant 2")
                deleteLayer("Variant 3")
                break;
            default:
                // structV1()
                break;
        }
        try {
            showLayer("Stencil")
            setSelectedLayer("Variant " + ver)
            show(true, "Variant " + ver)
            checkStruct("BACKGROUND")
            deleteHidden()
            setSelectedLayer("Stencil")
            var bound = doc.activeLayer.bounds
            crop(bound[1], bound[0], bound[3], bound[2])
            doc.activeLayer.remove()
            setSelectedLayer("Variant " + ver)
            ungroupLayersEvent()
            setSelectedLayer("Item " + ver)
            re_name("Item")
            checkItemFinalize()
            setSelectedLayer("Color " + ver)
            re_name("Color")
            setSelectedLayer("Shadow " + ver)
            re_name("Shadow")
            checkGroupFinalize()
            setSelectedLayer("Background " + ver)
            re_name("Background")
            checkGroupFinalize()
            setSelectionALL()
            saveSelection("Struct")
            doc.selection.deselect()
        } catch (error) {
            alert("Sai cau truc dau vao!")
        }
        checkStructVer()
    }
}

function checkStructVer() {
    if (doc.layers.length == 5) {
        doc.selection.selectAll()
        saveSelection("Crop")
        doc.selection.deselect()
        selectLayer("Product")
        doc.activeLayer.allLocked = true
        doc.activeLayer = doc.layers[doc.layers.length - 1]
        selectaddLayer("Product")

        Algn(false, false, false)//fix layer trung nhau

        selectLayer("Product")
        doc.activeLayer.allLocked = false
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
    var bounds = activeDocument.activeLayer.layers.length
    activeDocument.activeLayer = activeDocument.activeLayer.artLayers[bounds - 1]
    var nameLayer = activeDocument.activeLayer.name
    var searchProductName = nameLayer.search("Product")
    if (searchProductName == 0) {
        re_name("Product")
        if (!hasLayerMask()) {
            makeMask()
            //New layername == Retouch
            make("Retouch")
            //app.activeDocument.artLayers.add().name ="Retouch"
            setSelectedLayer("Item")
            //kiem tra so layer trong item
            var bound = activeDocument.activeLayer.layers.length
            if (bound > 2) {
                for (bound; bound >= 3; bound--) {
                    doc.activeLayer = activeDocument.activeLayer.artLayers[0]
                    doc.activeLayer.merge()
                    setSelectedLayer("Item")
                }
            }
        } else {
            //New layername == Retouch
            make("Retouch")
            //app.activeDocument.artLayers.add().name ="Retouch"
            setSelectedLayer("Item")
            //kiem tra so layer trong item
            var bound = activeDocument.activeLayer.layers.length
            if (bound > 2) {
                for (bound; bound >= 3; bound--) {
                    doc.activeLayer = activeDocument.activeLayer.artLayers[0]
                    try {
                        var idGrpL = charIDToTypeID("GrpL");
                        var desc1529 = new ActionDescriptor();
                        var idnull = charIDToTypeID("null");
                        var ref428 = new ActionReference();
                        var idLyr = charIDToTypeID("Lyr ");
                        var idOrdn = charIDToTypeID("Ordn");
                        var idTrgt = charIDToTypeID("Trgt");
                        ref428.putEnumerated(idLyr, idOrdn, idTrgt);
                        desc1529.putReference(idnull, ref428);
                        executeAction(idGrpL, desc1529, DialogModes.NO);
                    } catch (error) { }
                    doc.activeLayer.merge()
                    setSelectedLayer("Item")
                }
            }
        }//ENd ìf

    }
}

function hasLayerMask() {
    var reference = new ActionReference()
    reference.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"))
    var desc = executeActionGet(reference)
    return desc.getBoolean(stringIDToTypeID("hasUserMask"))
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
        var bounds = activeDocument.layers.length
        activeDocument.activeLayer = activeDocument.layers[bounds - 1]
        activeDocument.activeLayer.visible = false
        var nameLayer = activeDocument.activeLayer.name
        var searchProductName = nameLayer.search(layer)
        if (searchProductName == -1) {
            activeDocument.activeLayer.visible = true
        }
    } catch (error) {
        alert("Cau truc")
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

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}