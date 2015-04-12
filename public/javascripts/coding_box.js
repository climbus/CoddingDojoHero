
var CodingBox = function(element, filename, dirname) {
    GenericBox.call(this, element, filename);

    this.filename = filename;
    this.dirname = dirname;

    this.createEditor();
    this.createButtons();

    if (filename !== undefined) {
        this.loadFile(this.filename, this.dirname);
    }
}

CodingBox.prototype = Object.create(GenericBox.prototype);

CodingBox.prototype.constructor = CodingBox;

CodingBox.prototype.loadFile = function(filename, dirname) {
    var editor = this.editor;
    var url = "/files/?name=" + filename;
    
    if (dirname != undefined) {
        url += "&dir=" + dirname;
    }

    jQuery.get(url, function(data) {
         editor.setValue(data, -1);
    });

    this.setTitle(filename);
}

CodingBox.prototype.save = function() {
    var url = "/files/?name=" + this.filename;
    
    if (this.dirname != undefined) {
        url += "&dir=" + this.dirname;
    }

    jQuery.post(url, {data: this.editor.getValue()}, function(data) {
        return true;
    });
  
    if (this.onsave != undefined) {
        this.onsave();
    }
}

CodingBox.prototype.createEditor = function() {
    var editorElement = document.createElement("div");

    $(editorElement).css({width: "100%", height: "100%"});

    editor = new Editor(editorElement, "", {save: this.save, maximize: function() {console.log("aaaa");}}, this);
    editorElement.style.fontSize='20px';

    this.editor = editor;
    this.element.appendChild(editorElement);
}

CodingBox.prototype.createButtons = function() {
    var box = this;
    var button = this.toolbar.addButton("save", {
        icon: "glyphicon glyphicon-floppy-disk",
        class_name: "btn btn-default",
        callback: function(elm) {
            box.save();
        }
    }); 
}

CodingBox.prototype.maximize = function() {
    var box = this;
    GenericBox.prototype.maximize.call(this, function() {
        box.editor.resize();    
    });
}