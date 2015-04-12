var GenericBox = function(element, title) {
    this.normalWidth = 0;
    this.normalHeight = 0;

    if (typeof(element) == "string") {
        element = document.getElementById(element);
    }

    this.element = element;
    this.title = title;
    this.toolbar = new Toolbar();

    var box = this;
    this.toolbar.addButton("maximize", {
        icon: "glyphicon glyphicon-resize-full",
        "callback": function() {
            box.maximize();
        },
        "class_name": "btn btn-default"
    });
    this.toolbar.addButton("minimize", {
        icon: "glyphicon glyphicon-import",
        "callback": function() {
            box.minimize();
        },
        "class_name": "btn btn-default"
    });
    element.appendChild(this.toolbar.render());
    
    var tab = document.createElement("ul");
    tab.className = "nav nav-tabs";
    var titleElm = document.createElement("li");
    titleElm.className = "active";
    tab.appendChild(titleElm);
    var a = document.createElement("a");
    a.innerText = this.title;
    a.className = "titleElm";
    titleElm.appendChild(a);

    element.appendChild(tab); 

}

GenericBox.prototype.setTitle = function(title) {
    this.element.getElementsByClassName("titleElm")[0].innerHTML = title;
}

GenericBox.prototype.setNormalSize = function() {
    this.normalWidth = $(this.element).width();
    this.normalHeight = $(this.element).height();
}

GenericBox.prototype.maximize = function(callback) {
    if (this.oldButton) {
        this.toolbar.replaceButton("normalize", this.oldButton[0], this.oldButton[1]);
    } else {
        this.setNormalSize();
    }
    this.oldButton = this.toolbar.getButton("maximize");
    
    $(this.element).css({
        "position": "absolute",
        "z-index": 100
    });

    $(this.element).animate({
        "top": "10px",
        "left": "10px",
        "width": "99%",
        "height": "99%"
    }, 300, callback);
   
    var box = this;
    this.toolbar.replaceButton("maximize", "normalize", {
        icon: "glyphicon glyphicon-resize-small",
        "callback": function() {
            box.normalize();
        },
        "class_name": "btn btn-default"
    });
}

GenericBox.prototype.minimize = function() {
    if (this.oldButton) {
        this.toolbar.replaceButton("normalize", this.oldButton[0], this.oldButton[1]);
    } else {
        this.setNormalSize();
    }
    this.oldButton = this.toolbar.getButton("minimize");
    
    $(this.element).animate({
        "height": $(this.element).find(".nav-tabs").height()
    }, 300);
    var box = this;
    
    this.toolbar.replaceButton("minimize", "normalize", {
        icon: "glyphicon glyphicon-export",
        "callback": function() {
            box.normalize();
        },
        "class_name": "btn btn-default"
    });
}

GenericBox.prototype.normalize = function() {
    $(this.element).css({
        "position": "relative",
        "top": 0,
        "left": 0
    });
    $(this.element).animate({
        "width": this.normalWidth,
        "height": this.normalHeight
    }, 300);   
    if (this.oldButton) {
        this.toolbar.replaceButton("normalize", this.oldButton[0], this.oldButton[1]);
    }
    this.oldButton = null;
}
