
var CoddingBox = function(element, filename) {
    GenericBox.call(this, element, filename);

    this.filename = filename;

    this.createEditor();
    this.createButtons();

    if (filename !== undefined) {
        this.loadFile(this.filename);
    }
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

CoddingBox.prototype.createEditor = function() {
    var editorElement = document.createElement("div");

    $(editorElement).width($(this.element).width());
    $(editorElement).height($(this.element).height());

    editor = new Editor(editorElement);
    editorElement.style.fontSize='20px';

    this.editor = editor;
    this.element.appendChild(editorElement);
}

CoddingBox.prototype.createButtons = function() {
    var button = document.createElement("button");
    button.innerText = "Zapisz";
    button.className = "btn btn-default"

    var box = this;
    $(button).click(function(elm) {
        box.save();

        // change to listener
        var frame = document.getElementById("testFrame");
        if (frame) {
            frame.contentWindow.location.reload(true);
        }
    });

    this.element.insertBefore(button, this.element.childNodes[0]);
    
    $(button).css({
        "top": $(button).outerHeight(),
        "left": $(this.element).width() - $(button).outerWidth(),
        "position": "relative"
    });
    
}