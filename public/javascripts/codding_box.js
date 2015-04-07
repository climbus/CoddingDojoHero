
var CoddingBox = function(element, filename) {
    GenericBox.call(this, element, filename);

    this.filename = filename;

    var editorElement = document.createElement("div");
    editorElement.id = this.element.id + "Editor";
    
    var button = document.createElement("button");
    button.innerText = "Zapisz";
    button.className = "btn btn-default"
   
   
    var save = this.save;
    $(button).click(function(elm) {
        save();
        var frame = document.getElementById("testFrame");
        if (frame) {
            frame.contentWindow.location.reload(true);
        }
    });

    this.element.insertBefore(button, this.element.childNodes[0]);
    this.element.appendChild(editorElement);
    

    $(editorElement).width($(this.element).width());
    $(editorElement).height($(this.element).height());
    $(button).css({
        "top": $(button).outerHeight(),
        "left": $(this.element).width() - $(button).outerWidth(),
        "position": "relative"
    });
    
    editor = new Editor(editorElement);
    editorElement.style.fontSize='20px';

    jQuery.get("/files/?name=" + filename, function(data) {
        editor.setValue(data, -1);
    });

    this.editor = editor;
}

CoddingBox.prototype = Object.create(GenericBox.prototype);

CoddingBox.prototype.constructor = CoddingBox;

CoddingBox.prototype.loadFile = function(filename) {
    var editor = this.editor;
    jQuery.get("/files/?name=" + filename, function(data) {
         editor.setValue(data, -1);
    });
    this.setTitle(filename);
}

CoddingBox.prototype.save = function() {
    jQuery.post("/files/?name=" + this.filename, {data: this.editor.getValue()}, function(data) {
        return true;
    });
}