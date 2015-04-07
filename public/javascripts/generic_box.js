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
    this.element.getElementsByClassName("titleElm")[0].innerText = title;
}