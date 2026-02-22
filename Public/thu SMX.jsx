  #target photoshop
//---------
// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.
"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(t){return 10>t?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var n,r,o,u,f,i=gap,a=e[t];switch(a&&"object"==typeof a&&"function"==typeof a.toJSON&&(a=a.toJSON(t)),"function"==typeof rep&&(a=rep.call(e,t,a)),typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(a)){for(u=a.length,n=0;u>n;n+=1)f[n]=str(n,a)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+i+"]":"["+f.join(",")+"]",gap=i,o}if(rep&&"object"==typeof rep)for(u=rep.length,n=0;u>n;n+=1)"string"==typeof rep[n]&&(r=rep[n],o=str(r,a),o&&f.push(quote(r)+(gap?": ":":")+o));else for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(o=str(r,a),o&&f.push(quote(r)+(gap?": ":":")+o));return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+i+"}":"{"+f.join(",")+"}",gap=i,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var cx,escapable,gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;n>r;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,JSON.parse=function(text,reviver){function walk(t,e){var n,r,o=t[e];if(o&&"object"==typeof o)for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(r=walk(o,n),void 0!==r?o[n]=r:delete o[n]);return reviver.call(t,e,o)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();
//-----------------
#target photoshop
var mydoc = app.activeDocument;
//---------------lay tu vung chon
boxUI();
function boxUI(){
    var objTemp= {priorityMar: 'Center'}, objTemplateRun = null;
    var boxStencil = new Window("dialog", "Stencil Manual", undefined, {closeButton: true});
    var panel = boxStencil.add("panel{text:'Templates'}");
    //panel.alignChildren = "left";
    var grNameTemp = panel.add("group{alignment:'left'}");
    grNameTemp.add("statictext{text: 'Name:'}");
    var inpName = grNameTemp.add("edittext{characters: 16, name:'nameTemplate'}");
    
    var grPriority = grNameTemp.add("group{}");
    grPriority.add("statictext{text:'Priority:'}");
    var dropList = grPriority.add("dropdownlist{name:'priorityMar'}"); 
    dropList.add("item", "Center");
    dropList.add("item", "Top");
    dropList.add("item", "Bottom");
    dropList.add("item", "Left");
    dropList.add("item", "Right");
    dropList.selection = dropList.items[0];
    
    var grIpn = panel.add("group{alignment:'left'}");
    grIpn.add("statictext{text: 'Width'}");
    var inpW = grIpn.add("edittext{characters: 5, name:'width'}");
    grIpn.add("statictext{text: 'Height'}");
    var inpH = grIpn.add("edittext{characters: 5, name:'height'}");
    
    var grInpMargin = panel.add("group{alignment:'left'}");
    grInpMargin.add("statictext{text: 'Top:'}");
    var inpTop = grInpMargin.add("edittext{characters: 3, name:'top'}");
    grInpMargin.add("statictext{text: 'Bottom:'}");
    var inpBot = grInpMargin.add("edittext{characters: 3, name:'bottom'}");
    grInpMargin.add("statictext{text: 'Left:'}");
    var inpLeft = grInpMargin.add("edittext{characters: 3, name:'left'}");
    grInpMargin.add("statictext{text: 'Right:'}");
    var inpRight = grInpMargin.add("edittext{characters: 3, name:'right'}");
    
    var btnAdd = panel.add("button{size: [70,20], text: 'Add' }");
    //-----------
    var checkValue = boxStencil.add("checkbox{text:'Continue with old stencil ( Lan dau Temp -> Bo tich) ', value: true}");
    checkValue.active = true;
    var btnRun = boxStencil.add("button{size: [300,50], text: 'Run', properties:{name:'ok'}}");
    
    // load data from log 
    var logMar = new File("~/AppData/Roaming/Adobe/logMargin.log");
    logMar.encoding = "UTF-8";
    logMar.open("r");
    var dataLog = logMar.read();
    dataLog = (dataLog=="")? {} : JSON.parse(dataLog);
    logMar.close();
    dataLog.templates = (dataLog.templates ==undefined)? [] : dataLog.templates;
    var listTemp=createListDefault (dataLog.templates);
    //----------
    //handle check button
    checkValue.value = logMar.exists;
    panel.enabled = checkValue.value;
    checkValue.onClick = function(){
        panel.enabled = this.value;
    }
    //handle Run button
    btnRun.onClick = function(){
        var marginCurrent =(objTemplateRun==null)? dataLog.marginCurrent :  objTemplateRun ;
        if(checkValue.value && marginCurrent!=undefined){
            logMar.open("r");
            var oldMargins = JSON.parse(logMar.read());
            logMar.close();
            marginCurrent = main(marginCurrent);
        }
        else{
            marginCurrent = main();
        }
        dataLog.marginCurrent = marginCurrent;
        // write log again
        logMar.open("w");
        logMar.write(JSON.stringify(dataLog));
        logMar.close();
        boxStencil.close();
    }
    // handle name template
    inpName.onChange = function(){
        objTemp[this.name]  = this.text;
    }
    // handle droplist
    dropList.onChange= function(){
        objTemp[this.name] = this.selection.text;
    }
    //handle val width height
    validate(grIpn);
    // handle val margin
     validate(grInpMargin);
    //handle add btn
    btnAdd.onClick= function(){
        if( inpW.text == "" || inpH.text == ""){
            alert("Please enter value Width & Height");
        }
        else{
           dataLog.templates.push(objTemp);
           updateList(dataLog.templates);
           // write log
           logMar.open("w");
           logMar.write(JSON.stringify(dataLog));
           logMar.close();
        }
    };
    // handle list
    for(var i=0; i< listTemp.children.length; i++){
        listTemp.children[i].children[0].onClick= function(){
            if(this.value){
                for(var j=0; j< listTemp.children.length; j++){
                    if(listTemp.children[j].children[0] != this){
                        listTemp.children[j].children[0].value = false;
                    }
                }
                //---------
                fillValueUI (this.index);
                objTemplateRun =  dataLog.templates[this.index];
                dataLog.activeTemplate = this.text;
                // write log
               logMar.open("w");
               logMar.write(JSON.stringify(dataLog));
               logMar.close();
            }
        }
    }
    //---------
     function validate(gr){
        for(var i=1; i< gr.children.length; i=i+2){
            gr.children[i].onChanging = function(){
                if(isNaN (this.text)){
                    alert("Value must be a Number!");
                    var text1 = this.text.substring (0, this.text.length - 1);
                    this.text = text1;
                }
                else{
                    objTemp[this.name] = parseInt(this.text);
                }
            }
        }
    }
    function createListDefault(arrData){
        var list = panel.add("group");
        list.orientation = "column";
        list.alignment = "left";
        for(var i=0; i< 15; i++){
            var gr = list.add("group");
            var name = (arrData[i]==undefined)? "" : arrData[i].nameTemplate;
            var width = (arrData[i]==undefined)? "" : arrData[i].width;
            var height = (arrData[i]==undefined)? "" : arrData[i].height;
            // add checkbox
            var checkbox = gr.add("radiobutton{value:false,  index:"+i+", text:'"+name+"',  size: [100,10]}");
            if(dataLog.activeTemplate==name){
                checkbox.value =  true;
                objTemplateRun =  dataLog.templates[i];
            }
            if(arrData[i] == undefined){checkbox.visible = false;}
            //add lablel
            //gr.add("statictext{text: '"+name+"', size: [100,10]}");
            gr.add("statictext{text:'"+width+"', size: [70,10]}");
            gr.add("statictext{text:'"+height+"', size: [70,10]}");
            // add btn remove
            var btnRemove = gr.add("button{size: [50,10], text: 'Remove', index:"+i+"}");
            if(arrData[i] == undefined){btnRemove.visible = false;}
            btnRemove.onClick = function(){
                dataLog.templates.splice(this.index, 1);
                updateList(dataLog.templates);
                // write log
                logMar.open("w");
                logMar.write(JSON.stringify(dataLog));
                logMar.close();
            }
        }
        return list;
    }
    function updateList(dataTemps){
        for(var i=0; i< 15; i++){
             listTemp.children[i].children[0].visible =(dataTemps[i]==undefined)? false : true;
             listTemp.children[i].children[0].text =(dataTemps[i]==undefined)? "" : dataTemps[i].nameTemplate;
             listTemp.children[i].children[1].text =(dataTemps[i]==undefined)? "" : dataTemps[i].width;
             listTemp.children[i].children[2].text =(dataTemps[i]==undefined)? "" : dataTemps[i].height;
             listTemp.children[i].children[3].visible =(dataTemps[i]==undefined)? false : true;
        }
    }
    function fillValueUI(index){
        dropList.selection = dropList.find(dataLog.templates[index].priorityMar);
        for(var i=0; i< panel.children.length; i++){
            for(var j=1; j<  panel.children[i].children.length; j= j+2){
                var eleInp = panel.children[i].children[j];
                eleInp.text = dataLog.templates[index][eleInp.name];
            }
        } 
    }
    boxStencil.show();
}
function main(oldMargins){
    var marginCurrent=null;
    try{
        mydoc.selection.bounds;
        if(mydoc.guides.length>0){
            runMenuItem(charIDToTypeID("ClrG"));
        }
        createGuides();
        marginCurrent = process(oldMargins);
        mydoc.selection.deselect();
    }
    catch(err){
        if(mydoc.guides.length==4){
            marginCurrent = process(oldMargins);
        }
        else{
            alert("Error");
        }
    }
    return marginCurrent;
}
function process(oldMargins){
    var margins = {};
    var sidesCut = checkCutOut (getGuides (mydoc));
    var Stencil = mydoc.layerSets.getByName("Variant 1").layerSets.getByName("Item 1").artLayers.getByName("Stencil");
    // find layer product
    var arrLayers = mydoc.layerSets.getByName("Variant 1").layerSets.getByName("Item 1").artLayers;
    var productLyr = null;
    for( var i=0;i<arrLayers.length; i++){
        if(arrLayers[i].name.search("Product") != (-1) && arrLayers[i].visible){ productLyr = arrLayers[i]; break;}
    }
    mydoc.activeLayer = productLyr;
    var boundsProduct = productLyr.bounds;
    disMask();
    //resize canvas only  product layer
    mydoc.resizeCanvas(boundsProduct[2] , boundsProduct[3], AnchorPosition.TOPLEFT);
    mydoc.resizeCanvas(boundsProduct[2] - boundsProduct[0] , boundsProduct[3]  - boundsProduct[1], AnchorPosition.BOTTOMRIGHT);
    //-------------------
    // active layer Stencil
    mydoc.activeLayer = Stencil;
    // show only stecncil layer
    showOnly();
    var bounds = Stencil.bounds;
    var widStOut = bounds[2]-bounds[0];
    var heigStOut = bounds[3] - bounds[1];
    if(oldMargins !=undefined ){
        if(oldMargins.width ==undefined){
            margins = oldMargins;
            margins.left.position = margins.left.marginValue + bounds[0].value;
            margins.right.position = bounds[2].value - margins.right.marginValue;
            margins.top.position = margins.top.marginValue + bounds[1].value;
            margins.bottom.position =  bounds[3].value - margins.bottom.marginValue;
        }
        else{
            var newMargins = {}, arrSolidColor = [];
            for(var i=0; i<4; i++){
                var mySolidColor = new SolidColor();
                var rgbColor = new RGBColor();
                rgbColor.hexValue = "000000";
                mySolidColor.rgb = rgbColor;
                arrSolidColor.push(mySolidColor);
            }
            newMargins.left = {name: "Left", exist: true, position: oldMargins.left + bounds[0].value, marginValue: oldMargins.left, color: arrSolidColor[0]};
            newMargins.right = {name: "Right", exist: true, position: bounds[2].value - oldMargins.right, marginValue: oldMargins.right, color: arrSolidColor[1]};
            newMargins.top = {name: "Top", exist: true, position: oldMargins.top + bounds[1].value, marginValue: oldMargins.top, color: arrSolidColor[2]};
            newMargins.bottom = {name: "Bottom", exist: true, position: bounds[3].value - oldMargins.bottom, marginValue: oldMargins.bottom, color: arrSolidColor[3]}
            if(oldMargins.priorityMar != "Center"){newMargins[oldMargins.priorityMar.toLowerCase()].color.rgb.hexValue = "da0ddf";}
            margins = newMargins;
        }
    }
    else{
    var step = parseInt( ((widStOut.value+heigStOut.value)/2500).toFixed() );
        var leftSt = traceMargin(bounds, bounds[0] +1 , ((bounds[3]- bounds[1])/2 + bounds[1]  ) ,"horizontal", step);
        margins.left ={
            name: "Left",
            exist: leftSt.sampleCheck,
            position: leftSt.colorSample.position[0].value,
            marginValue:(leftSt.sampleCheck)? leftSt.colorSample.position[0].value- bounds[0].value : 0,
            color: leftSt.colorSample.color
        }
        var rightSt= traceMargin(bounds, bounds[2] - 1, ((bounds[3]- bounds[1])/2 + bounds[1]  ) ,"horizontal", -step );
        margins.right ={
            name: "Right",
            exist: rightSt.sampleCheck,
            position: rightSt.colorSample.position[0].value,
            marginValue: (rightSt.sampleCheck)? bounds[2].value - rightSt.colorSample.position[0].value :0,
            color: rightSt.colorSample.color
        }
        var topSt= traceMargin(bounds, ((bounds[2]- bounds[0])/2 + bounds[0] ) , bounds[1]+1,"vertical",step);
        margins.top = {
            name: "Top",
            exist: topSt.sampleCheck,
            position: topSt.colorSample.position[1].value,
            marginValue: (topSt.sampleCheck)? topSt.colorSample.position[1].value- bounds[1].value : 0,
            color: topSt.colorSample.color
        }
        var botSt = traceMargin(bounds, ((bounds[2]- bounds[0])/2 + bounds[0] ) , bounds[3] -1,"vertical", - step);
        margins.bottom = {
            name: "Bottom",
            exist: botSt.sampleCheck,
            position: botSt.colorSample.position[1].value,
            marginValue: (botSt.sampleCheck)? bounds[3].value - botSt.colorSample.position[1].value : 0,
            color: botSt.colorSample.color
        }
    }
    // show all layers
    showOnly();
    //alert(margins.left.color.cmyk.magenta + " "+margins.right.color.cmyk.magenta+" "+ margins.top.color.cmyk.magenta+" "+margins.bottom.color.cmyk.magenta);
    var heightSt = margins.bottom.position - margins.top.position;
    var widthSt = margins.right.position - margins.left.position;
    var guides = getGuides(mydoc);
    var heightPro = guides.bottom - guides.top;
    var widthPro = guides.right - guides.left;
    var scale = (heightSt/heightPro)*100;
    for( var i=0; i< productLyr.parent.artLayers.length; i++){
        if( productLyr.parent.artLayers[i].name != "Stencil" && productLyr.parent.artLayers[i]!= productLyr){
            productLyr.link(productLyr.parent.artLayers[i]);
        }
    }

    var diffProduct = (widthPro/heightPro);
    var diffStencil = (widthSt/heightSt);
    if( diffStencil>diffProduct || (!margins.left.exist && !margins.right.exist)){
        scale = (heightSt/heightPro) * 100;
    }
    else{
         scale = (widthSt/ widthPro) *100;
    }
    productLyr.link(productLyr.parent.parent.layerSets[0]);
    productLyr.resize(scale,scale,AnchorPosition.MIDDLECENTER);
    // ---------------------
    var left = (guides.left*scale/100) + productLyr.bounds[0] - margins.left.position;
    var right = (mydoc.width - (guides.right*scale/100+productLyr.bounds[0]) ) - (mydoc.width - Stencil.bounds[2]+margins.right.marginValue);
    var moveX = (right - left)/2;
    var top = (guides.top*scale/100) + productLyr.bounds[1] - margins.top.position;
    var bottom = (mydoc.height - (guides.bottom*scale/100+productLyr.bounds[1]) ) - (mydoc.height - Stencil.bounds[3]+margins.bottom.marginValue);
    var moveY = ( bottom - top )/2;
    // check side cutout
    if(sidesCut.left){
        moveX = Stencil.bounds[0] - (guides.left*scale/100+productLyr.bounds[0]);
    }
    else if(sidesCut.right){
        moveX = (mydoc.width - (guides.right*scale/100+productLyr.bounds[0]) ) - (mydoc.width - Stencil.bounds[2]);
    }
    if(sidesCut.top){
        moveY = Stencil.bounds[1] - (guides.top*scale/100+productLyr.bounds[1]);
    }
    else if(sidesCut.bottom){
        moveY= (mydoc.height - (guides.bottom*scale/100+productLyr.bounds[1]) ) - (mydoc.height - Stencil.bounds[3]);
    }
    // process priority margin
    var arrMagenta = [];
    for( var a in margins){
        if( margins[a].color.cmyk.magenta >= 80 && margins[a].color.rgb.red>180){
            arrMagenta.push(margins[a]);
        }
    }
    if(arrMagenta.length==1 && !(sidesCut.top||sidesCut.bottom)){
       var diffY = null;
       if( arrMagenta[0].name == "Bottom"){
           var boundNewBottom = guides.top*scale/100 + heightPro*scale/100 + productLyr.bounds[1];
           diffY =margins.bottom.position - boundNewBottom.value;
       }
       else {
           var boundNewTop = guides.top*scale/100 + productLyr.bounds[1];
           diffY = margins.top.position - boundNewTop.value;
       }
       productLyr.translate(moveX, diffY);
    }
    else{
        productLyr.translate(moveX, moveY); 
    }
    // re-canvas by stencil dimension
    mydoc.resizeCanvas(Stencil.bounds[2] , Stencil.bounds[3], AnchorPosition.TOPLEFT);
    mydoc.resizeCanvas(Stencil.bounds[2] - Stencil.bounds[0] , Stencil.bounds[3]  - Stencil.bounds[1], AnchorPosition.BOTTOMRIGHT);
    // save margin value current
    return margins;
}
// check cutout
function checkCutOut(bounds){
    var doc = activeDocument;
    var statusCutout = {};
    for(var side in bounds){
        statusCutout[side]=(bounds[side]==0 || bounds[side]==doc.width || bounds[side]==doc.height);
    }
    return statusCutout;
}
// do le----
function traceMargin(bounds,posX, posY, direction, step){
	app.activeDocument.colorSamplers.removeAll();
	app.preferences.rulerUnits = Units.PIXELS;
    app.displayDialogs = DialogModes.NO;
    var doc = app.activeDocument;
    doc.colorSamplers.removeAll();
    var i=0, mySampler2, color2 = null, checkDirection=null, Found=true;
    var orgPos = [posX, posY];
    var mySampler1=mydoc.colorSamplers.add([posX,posY]);
    var color1=mySampler1.color.rgb.hexValue;
    var colorRGB1 = {
        red: mySampler1.color.rgb.red,
        green: mySampler1.color.rgb.green,
        blue: mySampler1.color.rgb.blue,
        hexValue: mySampler1.color.rgb.hexValue
    }
    var colorRGB2 = colorRGB1;
    while(color1==color2 || color2 == null || compareColor(colorRGB1, colorRGB2) ){
        //mySampler1.remove();
        //try{ mySampler2.remove();}catch(err){};
        //i= i+2; 
        if(direction == "horizontal"){
            posX = posX + step;
            checkDirection = bounds[2];
            var val = (bounds[2]-bounds[0])/3;
            if( (step>0 && (posX - bounds[0])> val || (step<0 && (posX - bounds[0]) < bounds[2]-bounds[0]-val) )) {
                mySampler1.move(orgPos);
                Found = false;
                break;
            }
        }
        else{
            posY= posY+ step;
            checkDirection = bounds[3];
            var val = (bounds[3]-bounds[1])/3;
            if( (step>0 && (posY - bounds[1])> val || (step<0 && (posY - bounds[1]) < bounds[3]-bounds[1]-val) )) {
                mySampler1.move(orgPos);
                 Found = false;
                break;
            }
        }
        try { 
            mySampler1.move([posX,posY]);
            color2=mySampler1.color.rgb.hexValue;
            colorRGB2 = {
                red: mySampler1.color.rgb.red,
                green: mySampler1.color.rgb.green,
                blue: mySampler1.color.rgb.blue,
                hexValue: mySampler1.color.rgb.hexValue
            }
        }
        catch(err){
            break;
        }
        //mySampler2=mydoc.colorSamplers.add([posX,posY]);
        //color2=mySampler2.color.rgb.hexValue;
    } 
    //so sanh mau
    function compareColor(colorRGB1, colorRGB2){
        // var redChange = colorRGB1.red - colorRGB2.red;
        // var greenChange = colorRGB1.green - colorRGB2.green;
        // var blueChange = colorRGB1.blue - colorRGB2.blue;
        // redChange = (redChange<0)? (redChange * (- 1) ): redChange;
        // greenChange = (greenChange<0)? (greenChange * (- 1) ): greenChange;
        // blueChange = (blueChange<0)? (blueChange * (- 1) ): blueChange;
        // return ( redChange <30 || greenChange<30 || blueChange<30);
        var greenChange = colorRGB1.green - colorRGB2.green;
        return (greenChange>50)? false : true;
        //return (colorRGB1.hexValue == colorRGB2.hexValue);
    }
    var sampleCheck=(direction == "horizontal")? mySampler1.position[0] : mySampler1.position[1];
    var objRes={
        sampleCheck: Found,
        colorSample: mySampler1
    }
    return objRes;
}
function getGuides(docChoose){
    var guides = {};
    for( var i=0; i< docChoose.guides.length; i++){
        if(docChoose.guides[i].direction == "Direction.VERTICAL"){
            if(guides.left==undefined || guides.left > docChoose.guides[i].coordinate.value){
                guides.right = guides.left;
                guides.left = docChoose.guides[i].coordinate.value;
            }
            else{
                guides.right = docChoose.guides[i].coordinate.value;
            }
        }
        else{
            if(guides.top==undefined || guides.top > docChoose.guides[i].coordinate.value){
                guides.bottom = guides.top;
                guides.top = docChoose.guides[i].coordinate.value;
            }
            else{
                guides.bottom = docChoose.guides[i].coordinate.value;
            }
        }
    }
    return guides;
};
function transformScale(x){
    var idTrnf = charIDToTypeID( "Trnf" );
    var desc79 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref22 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref22.putEnumerated( idLyr, idOrdn, idTrgt );
    desc79.putReference( idnull, ref22 );
    var idFTcs = charIDToTypeID( "FTcs" );
    var idQCSt = charIDToTypeID( "QCSt" );
    var idQcsa = charIDToTypeID( "Qcsa" );
    desc79.putEnumerated( idFTcs, idQCSt, idQcsa );
    var idOfst = charIDToTypeID( "Ofst" );
        var desc80 = new ActionDescriptor();
        var idHrzn = charIDToTypeID( "Hrzn" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc80.putUnitDouble( idHrzn, idPxl, 0.000000 );
        var idVrtc = charIDToTypeID( "Vrtc" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc80.putUnitDouble( idVrtc, idPxl, 0.000000 );
    var idOfst = charIDToTypeID( "Ofst" );
    desc79.putObject( idOfst, idOfst, desc80 );
    var idWdth = charIDToTypeID( "Wdth" );
    var idPrc = charIDToTypeID( "#Prc" );
    desc79.putUnitDouble( idWdth, idPrc, x );
    var idHght = charIDToTypeID( "Hght" );
    var idPrc = charIDToTypeID( "#Prc" );
    desc79.putUnitDouble( idHght, idPrc, x );
    var idLnkd = charIDToTypeID( "Lnkd" );
    desc79.putBoolean( idLnkd, true );
    var idIntr = charIDToTypeID( "Intr" );
    var idIntp = charIDToTypeID( "Intp" );
    var idBcbc = charIDToTypeID( "Bcbc" );
    desc79.putEnumerated( idIntr, idIntp, idBcbc );
    executeAction( idTrnf, desc79, DialogModes.NO );
}
function showOnly(){
    var idShw = charIDToTypeID( "Shw " );
    var desc907 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var list127 = new ActionList();
            var ref350 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref350.putEnumerated( idLyr, idOrdn, idTrgt );
        list127.putReference( ref350 );
    desc907.putList( idnull, list127 );
    var idTglO = charIDToTypeID( "TglO" );
    desc907.putBoolean( idTglO, true );
    executeAction( idShw, desc907, DialogModes.NO );
}
function disMask(){
    var idsetd = charIDToTypeID( "setd" );
    var desc1173 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref494 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref494.putEnumerated( idLyr, idOrdn, idTrgt );
    desc1173.putReference( idnull, ref494 );
    var idT = charIDToTypeID( "T   " );
        var desc1174 = new ActionDescriptor();
        var idUsrM = charIDToTypeID( "UsrM" );
        desc1174.putBoolean( idUsrM, false );
    var idLyr = charIDToTypeID( "Lyr " );
    desc1173.putObject( idT, idLyr, desc1174 );
    try{
        executeAction( idsetd, desc1173, DialogModes.NO );
    }catch(err){}
}
function createGuides(){
    var bounds = mydoc.selection.bounds;
    mydoc.guides.add(Direction.VERTICAL, bounds[0]);
    mydoc.guides.add(Direction.HORIZONTAL, bounds[1]);
    mydoc.guides.add(Direction.VERTICAL, bounds[2]);
    mydoc.guides.add(Direction.HORIZONTAL, bounds[3]);
}