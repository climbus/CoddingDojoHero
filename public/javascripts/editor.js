
var Editor = function(element, content) {
    this.ace = ace.edit(element)
    this.ace.$blockScrolling = Infinity //ze wzgledu na ostrzezenie

    this.ace.setValue(content);
    
    this.ace.getSession().setMode("ace/mode/javascript");
    return this.ace;
}