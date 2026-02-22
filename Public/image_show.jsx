var window = new Window ("dialog", "image test", undefined);

// window.add('image', {x:100, y:50, width:50, height:50}, 'Z:/Production/DH_Action/Action/Private/public/bmg_quan.png');

// window.add('image', undefined, 'Z:/Production/DH_Action/Action/Private/public/bmg_quan.png');

var imageFile = new File ("Z:/Production/DH_Action/Action/Private/public/color1.png");

// var testImage = window.add("image", {x:25,y:0,width:50,height:50}, imageFile);

// var imageFile = new File ("Z:/Production/DH_Action/Action/Private/public/bmg_quan.png");

// var testImage = window.add("image", [0,0,200,200], imageFile);

// var imageFile = new File ("Z:/Production/DH_Action/Action/Private/public/bmg_quan.png");

 var testImage = window.add("image", [0,0,30,40], "Z:/Production/DH_Action/Action/Private/public/color1.png");

testImage.size   =[30,40];

window.show();