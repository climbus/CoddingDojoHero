
var CoddingBox = function(element, filename) {

    if (typeof(element) == "string") {
        element = document.getElementById(element);
    }

    var editorElement = document.createElement("div");
    editorElement.id = element.id + "Editor";
    
    var h1 = document.createElement("h1");
    h1.innerText = filename;
    var button = document.createElement("button");
    button.innerText = "Zapisz";
   
    $(editorElement).width($(element).width());
    $(editorElement).height($(element).height()-$(h1).height());

    var editor = new Editor(editorElement);
    
    var save = function() {
        jQuery.post("/files/?name=" + filename, {data: editor.getValue()}, function(data) {
            return true;
        });
    }
    
    $(button).click(function(elm) {
        save();
    });

    element.appendChild(h1);
    element.appendChild(editorElement);
    element.appendChild(button);

    jQuery.get("/files/?name=" + filename, function(data) {
        editor.setValue(data);
    });

    return {
        editor: editor,
        save: save
    }
}