var Toolbar = function() {
    this.buttons = [];
    this.element = document.createElement("div");
    this.element.className = "toolbar";
}

Toolbar.prototype.addButton = function(label, options) {
    options = options || {};
    var button = document.createElement("button");
    button.innerHTML = label;
    button.onclick = options.callback;
    if (options.class_name !== undefined) {
        button.className = options.class_name
    }

    if (options.position !== undefined) {
        this.buttons.splice(options.position, 0, [label, options.callback]);
        this.element.insertBefore(button, this.element.children[options.position]);
    } else {
        this.buttons.push([label, options.callback]);
        this.element.appendChild(button);
    }
    return button;
}

Toolbar.prototype.render = function() {
    return this.element;
}