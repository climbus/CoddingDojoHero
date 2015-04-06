
var request = require('request');
var fs = require('fs');

describe("main page", function() {
    beforeEach(function() {
        // TODO: prepare test files
    });

    it("should respond with title", function(done) {
      request("http://localhost:3000/", function(error, response, body){
        expect(body).toMatch("Codding Dojo");
        done();
      });
    });

    it("should respond with filename", function(done) {
      request("http://localhost:3000/", function(error, response, body){
        expect(body).toMatch("main_file.js");
        done();
      });
    });

    it("should respond with test results", function(done) {
      request("http://localhost:3000/", function(error, response, body){
        expect(body).toMatch("iframe");
        done();
      });
    });

    afterEach(function() {
        // TODO: remove test files
    });
});