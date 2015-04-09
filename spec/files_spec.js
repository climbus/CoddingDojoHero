
var request = require('request');
var fs = require("fs");

app = require("../app");

var fileDir = "public/test_data/";
var content = "Example content";
var fileName = "example.txt";

function createDir(name) {
  if(!fs.existsSync(name)){
     fs.mkdirSync(name, 0766, function(err){
       if(err){ 
         console.log(err);
         response.send("ERROR! Can't make the directory! \n");    // echo the result back
       }
     });   
  }
}

describe("files", function() {
    beforeEach(function(done) {
      createDir(fileDir);
      done();
    });

    it("should respond with file content", function(done) {
      fs.writeFile(fileDir + fileName, content, function(err) {
        expect(err).toBe(null);
        request("http://127.0.0.1:3000/files/?name=" + fileName, function(error, response, body){
          expect(body).toMatch(content);
          done();
        });
      });
    });

    it("should save file", function(done) {
      request.post({
        url: "http://127.0.0.1:3000/files/?name=" + fileName,
        form: {"data": content}
      }, function(error, response, body){
          expect(body).toBe("OK");
          fs.readFile(fileDir + fileName, {
            encoding: "utf-8"
          }, function(err, data) {
            expect(data).toBe(content);
            done();
          });   
        });
    });

    it("should change file dir on get", function(done) {
      var newDirName = "test_data2";
      var content2 = "New content";
      var fullName = "public/" + newDirName + "/" + fileName;

      createDir("public/" + newDirName);

      fs.writeFile(fullName, content2, function(err) {
        request("http://127.0.0.1:3000/files/?name=" + fileName + "&dir=" + newDirName, function(error, response, body){
          expect(body).toMatch(content2);
          done();
        });
      });
    });

    it("should change file dir on post", function(done) {
      
      var newDirName = "test_data2";
      var fullName = "public/" + newDirName + "/" + fileName;
      var content2 = "New content";

      createDir("public/" + newDirName);

      request.post({
        url: "http://127.0.0.1:3000/files/?name=" + fileName + "&dir=" + newDirName,
        form: {"data": content2}
        }, function(error, response, body) {
          expect(body).toBe("OK");
          fs.readFile(fullName, {
            encoding: "utf-8"
            }, function(err, data) {
              expect(data).toBe(content2);
              done();
          });
      });  
    });

    afterEach(function(done) {
      if (fs.existsSync(fileDir + fileName)) {
        fs.unlinkSync(fileDir + fileName);
      }
      done();
    });
});