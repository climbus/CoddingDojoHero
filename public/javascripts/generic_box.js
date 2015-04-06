var GenericBox = function(element, title) {
    if (typeof(element) == "string") {
        element = document.getElementById(element);
    }

    var h1 = document.createElement("ul");
    h1.className = "nav nav-tabs";
    var titleElm = document.createElement("li");
    titleElm.className = "active";
    h1.appendChild(titleElm);
    var a = document.createElement("a");
    a.innerText = title;
    titleElm.appendChild(a);

    element.appendChild(h1); 
}