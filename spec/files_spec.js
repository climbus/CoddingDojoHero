
var request = require('request');
var fs = require("fs");

var fileDir = "data/";

describe("files", function() {
    it("should respond with file content", function(done) {
      var fileName = "example.txt";
      var content = "Ala ma kota";
      var fileContent = fs.writeFile(fileDir + fileName, content, function(err) {
        request("http://localhost:3000/files/?name=" + fileName, function(error, response, body){
          expect(body).toMatch(content);
          fs.unlink(fileDir + fileName, function(err) {
            done();
          });
        });
      });
    });
});