
var Editor = function(element, content, commands, box) {
    this.ace = ace.edit(element)
    this.ace.$blockScrolling = Infinity //ze wzgledu na ostrzezenie

    this.ace.setValue(content);
    
    this.ace.getSession().setMode("ace/mode/javascript");
    this.ace.commands.addCommand({
            name: 'saveFile',
            bindKey: {
            win: 'Ctrl-S',
            mac: 'Command-S',
            sender: 'editor|cli'
        },
        exec: function(env, args, request) {
            commands.save.call(box);
        }
    });
    this.ace.commands.addCommand({
            name: 'maximize',
            bindKey: {
            win: 'Ctrl-Q',
            mac: 'Command-Q',
            sender: 'editor|cli'
        },
        exec: function(env, args, request) {
            commands.maximize.call(box);
        }
    });
    return this.ace;
}