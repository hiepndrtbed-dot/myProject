function Point(x, y) {
    this.x = x;
    this.y = y;
}

function addVertexCorner(lineArray, x, y) {

    //Tạo điểm đầu và điểm cuối đướng path
    var p0Info = new PathPointInfo();
    p0Info.anchor = new Array(x, y);
    p0Info.leftDirection = p0Info.anchor;
    p0Info.rightDirection = p0Info.anchor;
    p0Info.kind = PointKind.CORNERPOINT;
    //Đưa giá trị điểm đầu và điểm cuối vào mảng
    lineArray.push(p0Info);
}

function appendLine(p0, p1, lineSubPathArray) {

    //Vẽ đường thẳng từ điểm đầu đến điểm cuối
    var lineArray = new Array();
    addVertexCorner(lineArray, p0.x, p0.y);
    addVertexCorner(lineArray, p1.x, p1.y);
    var pathInfo = new SubPathInfo();
    pathInfo.operation = ShapeOperation.SHAPEADD;
    pathInfo.closed = false;
    pathInfo.entireSubPath = lineArray;

    //Đưa giá trị 2 đường thẳng vào mảng.
    lineSubPathArray.push(pathInfo);
}

function createPathLayer(title, subPathArray) {
    //Tạo lớp path chứa các đường thẳng vừa vẽ
    var docRef = app.activeDocument;
    app.preferences.rulerUnits = Units.PIXELS;
    docRef.pathItems.add(title, subPathArray);
}

var docRef = app.activeDocument;
var imgWidth = docRef.width.as("px");
var imgHeight = docRef.height.as("px");
var p00 = new Point(0, 0);
var p10 = new Point(imgWidth, 0);
var p01 = new Point(0, imgHeight);
var p11 = new Point(imgWidth, imgHeight);

//Vẽ hai đường path chéo nhau
var lineSubPathArray = new Array();
appendLine(p00, p11, lineSubPathArray);
appendLine(p01, p10, lineSubPathArray);
createPathLayer("Big X", lineSubPathArray);