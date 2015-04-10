var GenericBox = function(element, title) {
    if (typeof(element) == "string") {
        element = document.getElementById(element);
    }

    this.element = element;
    this.title = title;

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

GenericBox.prototype.maximize = function() {
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