
var CoddingBox = function(element, filename) {

    if (typeof(element) == "string") {
        element = document.getElementById(element);
    }

    var editorElement = document.createElement("div");
    editorElement.id = element.id + "Editor";
    var h1 = document.createElement("ul");
    h1.className = "nav nav-tabs";
    var title = document.createElement("li");
    title.className = "active";
    h1.appendChild(title);
    var a = document.createElement("a");
    a.innerText = filename;
    title.appendChild(a);

    var button = document.createElement("button");
    button.innerText = "Zapisz";
    button.className = "btn btn-default"
   
    var save = function() {
        jQuery.post("/files/?name=" + filename, {data: editor.getValue()}, function(data) {
            return true;
        });
    }
    
    $(button).click(function(elm) {
        save();
        var frame = document.getElementById("testFrame");
        if (frame) {
            frame.contentWindow.location.reload(true);
        }
    });

    element.appendChild(button);
    element.appendChild(h1);
    element.appendChild(editorElement);
    

    $(editorElement).width($(element).width());
    $(editorElement).height($(element).height()-$(h1).height());
    $(button).css({
        "top": $(button).outerHeight(),
        "left": $(element).width() - $(button).outerWidth(),
        "position": "relative"
    });
    
    var editor = new Editor(editorElement);
    editorElement.style.fontSize='20px';

    jQuery.get("/files/?name=" + filename, function(data) {
        editor.setValue(data, -1);
    });

    return {
        editor: editor,
        save: save
    }
}