var GenericBox = function(element, title) {
    this.normalWidth = 0;
    this.normalHeight = 0;

    if (typeof(element) == "string") {
        element = document.getElementById(element);
    }

    this.element = element;
    this.title = title;
    this.toolbar = new Toolbar();
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

GenericBox.prototype.maximize = function() {
    this.setNormalSize();
    $(this.element).css({
        "position": "absolute",
        "z-index": 100
    });

    $(this.element).animate({
        "top": "0px",
        "left": "0px",
        "width": "100%",
        "height": "100%"
    }, 300);
}

GenericBox.prototype.minimize = function() {
    this.setNormalSize();
    $(this.element).animate({
        "height": $(this.element).find(".nav-tabs").height()
    }, 300);
}

GenericBox.prototype.normalize = function() {
    $(this.element).animate({
        "width": this.normalWidth,
        "height": this.normalHeight
    }, 300);   
}