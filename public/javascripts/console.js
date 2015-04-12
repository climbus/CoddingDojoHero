var Console = function(element) {
    this.element = element;
    window._console = this;
}

Console.prototype.log = function(message) {
    window._console.element.innerHTML += "<div class=\"log\">" + message + "</div>";
}

Console.prototype.error = function(message) {
    window._console.element.innerHTML += "<div class=\"error\">" + message + "</div>";
}

Console.prototype.overwrite = function(cons) {
    cons.log = window._console.log;
    cons.error = window._console.error;
    cons.trace = window._console.error;
    //var frame = document.getElementById("testFrame");
    //if (frame) {
    //  frame.contentWindow.onerror = window._console.error;
    //}
}