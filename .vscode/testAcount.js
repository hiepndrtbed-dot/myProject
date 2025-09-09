var SHEET_ID = '1plREXJanBpP4jIx8rOgKDvQ-MSAghutoLbzlHkSvvHw'
var SHEET_TITLE = 'Sheet1';
var SHEET_RANGE = 'A1:B2'

var FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

fetch(FULL_URL)
.then(res => res.text())
.then(rep => {
    var data = JSON.parse(rep.substr(47).slice(0,-2));
    alert(data) 
})