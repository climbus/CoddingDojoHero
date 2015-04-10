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
        this.buttons.splice(options.position, 0, [label, options]);
        this.element.insertBefore(button, this.element.children[options.position]);
    } else {
        this.buttons.push([label, options]);
        this.element.appendChild(button);
    }
    return button;
}

Toolbar.prototype.replaceButton = function(oldLabel, newLabel, options) {
    var i;
    for (i in this.buttons) {
        if (this.buttons[i][0] === oldLabel) {
            break;
        }
    }
    options.position = i;
    this.previousButton = [this.buttons.pop(i), this.element.children[i]];
    this.element.removeChild(this.element.children[i]);
    this.addButton(newLabel, options);
}

Toolbar.prototype.getButton = function(label) {
    for (var i in this.buttons) {
        if (this.buttons[i][0] === label) {
            return this.buttons[i];
        }
    }
}

Toolbar.prototype.render = function() {
    return this.element;
}