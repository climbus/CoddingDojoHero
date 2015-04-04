
var CoddingBox = function(element, filename) {
    var editor = new Editor(element);

    jQuery.get("/files/?name=" + filename, function(data) {
        editor.setValue(data);
    });
    return {
        editor: editor,
    }
}