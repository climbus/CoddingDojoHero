var ConsoleBox = function(element) {
    GenericBox.call(this, element, "Konsola");

    var consoleElement = document.createElement("div");
    consoleElement.className = "content";
    this.cons = new Console(consoleElement);
    this.cons.overwrite(console);
    this.element.appendChild(consoleElement);
}

ConsoleBox.prototype = Object.create(GenericBox.prototype);

ConsoleBox.prototype.constructor = ConsoleBox;

ConsoleBox.prototype.clear = function() {
    this.cons.element.innerHTML = "";
}