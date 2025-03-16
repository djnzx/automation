function l(x) {
    SpreadsheetApp.getUi().alert(x);
    var json = JSON.stringify(x);
    SpreadsheetApp.getUi().alert(json);
}
