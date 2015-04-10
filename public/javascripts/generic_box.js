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
    this.toolbar.addButton("Maksymalizuj", {
        "callback": function() {
            box.maximize();
        },
        "class_name": "btn btn-default"
    });
    this.toolbar.addButton("Minimalizuj", {
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
    this.oldButton = this.toolbar.getButton("Maksymalizuj");
    this.setNormalSize();
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
    this.toolbar.replaceButton("Maksymalizuj", "Zmniejsz", {
        "callback": function() {
            box.normalize();
        },
        "class_name": "btn btn-default"
    });
}

GenericBox.prototype.minimize = function() {
    this.oldButton = this.toolbar.getButton("Minimalizuj");
    this.setNormalSize();
    $(this.element).animate({
        "height": $(this.element).find(".nav-tabs").height()
    }, 300);
    var box = this;
    
    this.toolbar.replaceButton("Minimalizuj", "Powiększ", {
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
    if (this.oldButton !== undefined) {
        var label;
        if (this.oldButton[0] === "Minimalizuj") {
            label = "Powiększ";
        } else {
            label = "Zmniejsz";
        }
        this.toolbar.replaceButton(label, this.oldButton[0], this.oldButton[1]);
    }
}