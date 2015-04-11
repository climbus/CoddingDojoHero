
var Toolbar = function() {
    this.buttons = [];
    this.element = document.createElement("div");
    this.element.className = "toolbar";
}

Toolbar.prototype.addButton = function(name, options) {
    options = options || {};
    var button = document.createElement("button");
    button.setAttribute("name", name);

    if (options.icon) {
        var icon = document.createElement("span");
        icon.className = options.icon;
        button.appendChild(icon);
    }

    if (options.label) {
        var label = document.createTextNode(options.label);
        button.appendChild(label);
    }
    
    button.onclick = options.callback;
    if (options.class_name !== undefined) {
        button.className = options.class_name
    }

    if (options.position !== undefined) {
        this.buttons.splice(options.position, 0, [name, options]);
        this.element.insertBefore(button, this.element.children[options.position]);
    } else {
        this.buttons.push([name, options]);
        this.element.appendChild(button);
    }
    return button;
}

Toolbar.prototype.replaceButton = function(oldName, newName, options) {
    var i = 0;
    for (i in this.buttons) {
        if (this.buttons[i][0] === oldName) {
            break;
        }
    }
    options.position = i;
    this.previousButton = [this.buttons[i], this.element.children[i]];
    this.buttons.splice(i, 1);
    this.element.removeChild(this.element.children[i]);
    this.addButton(newName, options);
}

Toolbar.prototype.getButton = function(name) {
    for (var i in this.buttons) {
        if (this.buttons[i][0] === name) {
            return this.buttons[i];
        }
    }
}

Toolbar.prototype.render = function() {
    return this.element;
}