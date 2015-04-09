
app = require("./app");
var http = require('http');

app.set("data_dir", "public/data/");
app.set("data_dir_web", "data/");

var server = http.createServer(app).listen(process.env.PORT, function() {
    console.log('Express server listening on port ' + process.env.PORT);
} );