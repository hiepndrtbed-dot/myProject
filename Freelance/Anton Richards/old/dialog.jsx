

// DIALOG
// ======
var dialog = new Window("dialog"); 
    dialog.text = "Tool set margin and Save  Images"; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["center","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

// TPANEL1
// =======
var tpanel1 = dialog.add("tabbedpanel", undefined, undefined, {name: "tpanel1"}); 
    tpanel1.alignChildren = "fill"; 
    tpanel1.preferredSize.width = 666; 
    tpanel1.margins = 0; 

// PRODUCT
// =======
var Product = tpanel1.add("tab", undefined, undefined, {name: "Product"}); 
    Product.text = "Product"; 
    Product.orientation = "row"; 
    Product.alignChildren = ["left","top"]; 
    Product.spacing = 10; 
    Product.margins = 10; 

// GROUP1
// ======
var group1 = Product.add("group", undefined, {name: "group1"}); 
    group1.orientation = "column"; 
    group1.alignChildren = ["left","top"]; 
    group1.spacing = 10; 
    group1.margins = 0; 

// GROUP2
// ======
var group2 = group1.add("group", undefined, {name: "group2"}); 
    group2.preferredSize.width = 504; 
    group2.orientation = "row"; 
    group2.alignChildren = ["left","top"]; 
    group2.spacing = 10; 
    group2.margins = 0; 

// PANEL1
// ======
var panel1 = group2.add("panel", undefined, undefined, {name: "panel1"}); 
    panel1.text = "Sizes"; 
    panel1.orientation = "column"; 
    panel1.alignChildren = ["left","top"]; 
    panel1.spacing = 10; 
    panel1.margins = 10; 

// WIDHT
// =====
var Widht = panel1.add("group", undefined, {name: "Widht"}); 
    Widht.orientation = "row"; 
    Widht.alignChildren = ["left","center"]; 
    Widht.spacing = 10; 
    Widht.margins = 0; 

var statictext1 = Widht.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "Width"; 
    statictext1.preferredSize.width = 70; 
    statictext1.justify = "right"; 

var width = Widht.add('edittext {properties: {name: "width"}}'); 
    width.preferredSize.width = 80; 

// HEIGHT
// ======
var Height = panel1.add("group", undefined, {name: "Height"}); 
    Height.orientation = "row"; 
    Height.alignChildren = ["left","center"]; 
    Height.spacing = 10; 
    Height.margins = 0; 

var statictext2 = Height.add("statictext", undefined, undefined, {name: "statictext2"}); 
    statictext2.text = "Height"; 
    statictext2.preferredSize.width = 70; 
    statictext2.justify = "right"; 

var height = Height.add('edittext {properties: {name: "height"}}'); 
    height.preferredSize.width = 80; 

// GROUP3
// ======
var group3 = panel1.add("group", undefined, {name: "group3"}); 
    group3.orientation = "row"; 
    group3.alignChildren = ["left","center"]; 
    group3.spacing = 10; 
    group3.margins = 0; 

var statictext3 = group3.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "Resolution"; 
    statictext3.preferredSize.width = 70; 
    statictext3.justify = "right"; 

var resolution = group3.add('edittext {properties: {name: "resolution"}}'); 
    resolution.text = "300"; 
    resolution.preferredSize.width = 80; 

// PANEL2
// ======
var panel2 = group2.add("panel", undefined, undefined, {name: "panel2"}); 
    panel2.text = "Margins"; 
    panel2.orientation = "column"; 
    panel2.alignChildren = ["left","top"]; 
    panel2.spacing = 10; 
    panel2.margins = 10; 

// GROUP4
// ======
var group4 = panel2.add("group", undefined, {name: "group4"}); 
    group4.orientation = "row"; 
    group4.alignChildren = ["left","center"]; 
    group4.spacing = 10; 
    group4.margins = 0; 

var statictext4 = group4.add("statictext", undefined, undefined, {name: "statictext4"}); 
    statictext4.text = "Value"; 
    statictext4.preferredSize.width = 40; 
    statictext4.justify = "right"; 

var value = group4.add('edittext {properties: {name: "value"}}'); 
    value.preferredSize.width = 80; 

// GROUP5
// ======
var group5 = panel2.add("group", undefined, {name: "group5"}); 
    group5.orientation = "row"; 
    group5.alignChildren = ["left","center"]; 
    group5.spacing = 10; 
    group5.margins = 0; 

var statictext5 = group5.add("statictext", undefined, undefined, {name: "statictext5"}); 
    statictext5.text = "Types"; 
    statictext5.preferredSize.width = 40; 
    statictext5.justify = "right"; 

var types_array = ["Pixels","Percent","Cm"]; 
var types = group5.add("dropdownlist", undefined, undefined, {name: "types", items: types_array}); 
    types.selection = 0; 
    types.preferredSize.width = 80; 

// PANEL3
// ======
var panel3 = group2.add("panel", undefined, undefined, {name: "panel3"}); 
    panel3.text = "Anchor"; 
    panel3.orientation = "column"; 
    panel3.alignChildren = ["left","top"]; 
    panel3.spacing = 10; 
    panel3.margins = 10; 

// TOP
// ===
var Top = panel3.add("group", undefined, {name: "Top"}); 
    Top.preferredSize.width = 150; 
    Top.orientation = "row"; 
    Top.alignChildren = ["left","center"]; 
    Top.spacing = 10; 
    Top.margins = 0; 

var statictext6 = Top.add("statictext", undefined, undefined, {name: "statictext6"}); 
    statictext6.preferredSize.width = 55; 

var top = Top.add("checkbox", undefined, undefined, {name: "top"}); 
    top.text = "Top"; 
    top.value = true; 

// CENTER
// ======
var Center = panel3.add("group", undefined, {name: "Center"}); 
    Center.orientation = "row"; 
    Center.alignChildren = ["left","center"]; 
    Center.spacing = 10; 
    Center.margins = 0; 

var statictext7 = Center.add("statictext", undefined, undefined, {name: "statictext7"}); 
    statictext7.text = "Left"; 
    statictext7.preferredSize.width = 30; 
    statictext7.justify = "right"; 

var left = Center.add("checkbox", undefined, undefined, {name: "left"}); 
    left.value = true; 
    left.preferredSize.width = 38; 

var right = Center.add("checkbox", undefined, undefined, {name: "right"}); 
    right.text = "Right"; 
    right.value = true; 

// GROUP6
// ======
var group6 = panel3.add("group", undefined, {name: "group6"}); 
    group6.orientation = "row"; 
    group6.alignChildren = ["left","center"]; 
    group6.spacing = 10; 
    group6.margins = 0; 

var statictext8 = group6.add("statictext", undefined, undefined, {name: "statictext8"}); 
    statictext8.preferredSize.width = 55; 

var bottom = group6.add("checkbox", undefined, undefined, {name: "bottom"}); 
    bottom.text = "Bottom"; 
    bottom.value = true; 

// GROUP7
// ======
var group7 = group1.add("group", undefined, {name: "group7"}); 
    group7.preferredSize.width = 504; 
    group7.orientation = "row"; 
    group7.alignChildren = ["left","center"]; 
    group7.spacing = 10; 
    group7.margins = 0; 

// TPANEL2
// =======
var tpanel2 = group7.add("tabbedpanel", undefined, undefined, {name: "tpanel2"}); 
    tpanel2.alignChildren = "fill"; 
    tpanel2.preferredSize.width = 530; 
    tpanel2.margins = 0; 

// TAB1
// ====
var tab1 = tpanel2.add("tab", undefined, undefined, {name: "tab1"}); 
    tab1.text = "Save JPG"; 
    tab1.orientation = "column"; 
    tab1.alignChildren = ["left","top"]; 
    tab1.spacing = 10; 
    tab1.margins = 10; 

// GROUP8
// ======
var group8 = tab1.add("group", undefined, {name: "group8"}); 
    group8.orientation = "row"; 
    group8.alignChildren = ["left","top"]; 
    group8.spacing = 10; 
    group8.margins = 0; 

// GROUP9
// ======
var group9 = group8.add("group", undefined, {name: "group9"}); 
    group9.orientation = "column"; 
    group9.alignChildren = ["left","center"]; 
    group9.spacing = 10; 
    group9.margins = 0; 

// GROUP10
// =======
var group10 = group9.add("group", undefined, {name: "group10"}); 
    group10.orientation = "row"; 
    group10.alignChildren = ["left","center"]; 
    group10.spacing = 10; 
    group10.margins = 0; 

var statictext9 = group10.add("statictext", undefined, undefined, {name: "statictext9"}); 
    statictext9.text = "Quality"; 
    statictext9.preferredSize.width = 70; 
    statictext9.justify = "right"; 

var quality_array = ["1","2","3","4","5","6","7","8","9","10","11","12"]; 
var quality = group10.add("dropdownlist", undefined, undefined, {name: "quality", items: quality_array}); 
    quality.selection = 11; 
    quality.preferredSize.width = 80; 

// GROUP11
// =======
var group11 = group9.add("group", undefined, {name: "group11"}); 
    group11.orientation = "row"; 
    group11.alignChildren = ["left","center"]; 
    group11.spacing = 10; 
    group11.margins = 0; 

var statictext10 = group11.add("statictext", undefined, undefined, {name: "statictext10"}); 
    statictext10.text = "SizeOutput"; 
    statictext10.preferredSize.width = 70; 
    statictext10.justify = "right"; 

var size = group11.add('edittext {properties: {name: "size"}}'); 
    size.preferredSize.width = 80; 

// GROUP12
// =======
var group12 = group9.add("group", undefined, {name: "group12"}); 
    group12.orientation = "row"; 
    group12.alignChildren = ["left","center"]; 
    group12.spacing = 10; 
    group12.margins = 0; 

var statictext11 = group12.add("statictext", undefined, undefined, {name: "statictext11"}); 
    statictext11.text = "ColorBG"; 
    statictext11.preferredSize.width = 70; 
    statictext11.justify = "right"; 

var colorBackgorund = group12.add('edittext {properties: {name: "colorBackgorund"}}'); 
    colorBackgorund.preferredSize.width = 80; 

// GROUP13
// =======
var group13 = group8.add("group", undefined, {name: "group13"}); 
    group13.orientation = "column"; 
    group13.alignChildren = ["left","top"]; 
    group13.spacing = 10; 
    group13.margins = 0; 

// GROUP14
// =======
var group14 = group13.add("group", undefined, {name: "group14"}); 
    group14.orientation = "row"; 
    group14.alignChildren = ["left","center"]; 
    group14.spacing = 10; 
    group14.margins = 0; 

var statictext12 = group14.add("statictext", undefined, undefined, {name: "statictext12"}); 
    statictext12.text = "Add Folder"; 
    statictext12.preferredSize.width = 70; 
    statictext12.justify = "right"; 

var edittext1 = group14.add('edittext {properties: {name: "edittext1"}}'); 
    edittext1.preferredSize.width = 156; 

// GROUP15
// =======
var group15 = group13.add("group", undefined, {name: "group15"}); 
    group15.orientation = "row"; 
    group15.alignChildren = ["left","center"]; 
    group15.spacing = 10; 
    group15.margins = 0; 

var statictext13 = group15.add("statictext", undefined, undefined, {name: "statictext13"}); 
    statictext13.text = "Select File"; 
    statictext13.preferredSize.width = 70; 
    statictext13.justify = "right"; 

var chooseFile = group15.add("button", undefined, undefined, {name: "chooseFile"}); 
    chooseFile.text = "Choose File:*.txt;*.csv"; 

// TAB2
// ====
var tab2 = tpanel2.add("tab", undefined, undefined, {name: "tab2"}); 
    tab2.text = "Save PNG"; 
    tab2.orientation = "column"; 
    tab2.alignChildren = ["left","top"]; 
    tab2.spacing = 10; 
    tab2.margins = 10; 

// TAB3
// ====
var tab3 = tpanel2.add("tab", undefined, undefined, {name: "tab3"}); 
    tab3.text = "Save PDF"; 
    tab3.orientation = "column"; 
    tab3.alignChildren = ["left","top"]; 
    tab3.spacing = 10; 
    tab3.margins = 10; 

// TAB4
// ====
var tab4 = tpanel2.add("tab", undefined, undefined, {name: "tab4"}); 
    tab4.text = "Save Tjf"; 
    tab4.orientation = "column"; 
    tab4.alignChildren = ["left","top"]; 
    tab4.spacing = 10; 
    tab4.margins = 10; 

// TAB5
// ====
var tab5 = tpanel2.add("tab", undefined, undefined, {name: "tab5"}); 
    tab5.text = "Save PSD"; 
    tab5.orientation = "column"; 
    tab5.alignChildren = ["left","top"]; 
    tab5.spacing = 10; 
    tab5.margins = 10; 

// TPANEL2
// =======
tpanel2.selection = tab1; 

// GROUP16
// =======
var group16 = group1.add("group", undefined, {name: "group16"}); 
    group16.preferredSize.width = 502; 
    group16.orientation = "row"; 
    group16.alignChildren = ["center","top"]; 
    group16.spacing = 10; 
    group16.margins = 0; 

var run = group16.add("button", undefined, undefined, {name: "run"}); 
    run.text = "Proceess"; 

var cancel = group16.add("button", undefined, undefined, {name: "cancel"}); 
    cancel.text = "Cancel"; 

// GROUP17
// =======
var group17 = Product.add("group", undefined, {name: "group17"}); 
    group17.orientation = "column"; 
    group17.alignChildren = ["left","top"]; 
    group17.spacing = 10; 
    group17.margins = 0; 

// PANEL4
// ======
var panel4 = group17.add("panel", undefined, undefined, {name: "panel4"}); 
    panel4.text = "Actions"; 
    panel4.preferredSize.width = 100; 
    panel4.orientation = "column"; 
    panel4.alignChildren = ["left","top"]; 
    panel4.spacing = 10; 
    panel4.margins = 10; 

var button1 = panel4.add("button", undefined, undefined, {name: "button1"}); 
    button1.text = "Button"; 

var button2 = panel4.add("button", undefined, undefined, {name: "button2"}); 
    button2.text = "Button"; 

var button3 = panel4.add("button", undefined, undefined, {name: "button3"}); 
    button3.text = "Button"; 

var button4 = panel4.add("button", undefined, undefined, {name: "button4"}); 
    button4.text = "Button"; 

var button5 = panel4.add("button", undefined, undefined, {name: "button5"}); 
    button5.text = "Button"; 

var button6 = panel4.add("button", undefined, undefined, {name: "button6"}); 
    button6.text = "Button"; 

var button7 = panel4.add("button", undefined, undefined, {name: "button7"}); 
    button7.text = "Button"; 

// ANHTHE
// ======
var Anhthe = tpanel1.add("tab", undefined, undefined, {name: "Anhthe"}); 
    Anhthe.text = "Ảnh thẻ"; 
    Anhthe.orientation = "column"; 
    Anhthe.alignChildren = ["left","top"]; 
    Anhthe.spacing = 10; 
    Anhthe.margins = 10; 

// TPANEL1
// =======
tpanel1.selection = Product; 

dialog.show();

