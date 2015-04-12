console._log = console.log

console.log = function(message) {
    document.writeln(message);
}

