
var request = require('request');
var fs = require('fs');

describe("main page", function() {
    it("should respond with title", function(done) {
      request("http://localhost:3000/", function(error, response, body){
        expect(body).toMatch("Codding Dojo");
        done();
      });
    });
});