
var webdriver = require('selenium-webdriver');
var fs = require('fs');

var dirName = "public/test_data/"; // dir with test data
var files = ["main_file.js", "test_file.js"]; // test files names


// TODO: move to helpers
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

// TODO: move to helpers
function copyFiles(dirname) {
  var srcDir = dirName + "template/";
  if (dirname != undefined) {
    srcDir += dirname + "/";
  }
  for (var i in files) {
    fs.createReadStream(srcDir + files[i]).pipe(fs.createWriteStream(dirName + files[i]));
  }
}

describe("main page", function() {

    beforeAll(function() {
      //prepare browser
      this.driver = new webdriver.Builder().
          withCapabilities(webdriver.Capabilities.chrome()).
          build();
    });

    beforeEach(function(done) {
      // copy test files to test dir
      copyFiles();   

      // open main page
      var driver = this.driver;
      driver.sleep(200).then(function() {
        driver.get('http://localhost:3000/');
        done();
      });
    });

    it("should respond with title", function(done) {    
      this.driver.getTitle().then(function(title) {
        expect(title).toBe("Coding Dojo");
        done();
      })
    });

    it("should respond with filenames", function(done) {
      this.driver.isElementPresent(webdriver.By.linkText(files[0]))
        .then(function(present) {
            expect(present).toBe(true);
            done();
      });
    });

    it("should respond with test results", function(done) {
      this.driver.isElementPresent(webdriver.By.id("testFrame")).then(function(elm) {
        if (elm == false) {
          expect("testFrame").toBe("present");
          done();
        }       
      });
      this.driver.switchTo().frame("testFrame");
      this.driver.isElementPresent(webdriver.By.className("jasmine_html-reporter")).then(function(present) {
            expect(present).toBe(true);
            done();
        });
    });

    it("should save file", function(done) {
      var driver = this.driver;
      var exampleText = "";

      this.driver.executeScript('editorOne.editor.setValue("' + exampleText + '");').then(function() {
        driver.findElement(webdriver.By.xpath('//div[@id="one"]/button')).click();

        driver.sleep(1000).then(function() {
            driver.executeScript("return editorOne.editor.getValue();").then(function(text) {
              expect(text).toBe(exampleText);
              done(); 
            });
        });
      });
    });

    it("should reload frame on save file", function(done) {
      var driver = this.driver;
      copyFiles("passed");

      driver.getWindowHandle().then(function(current) {
        driver.switchTo().frame("testFrame");
        driver.isElementPresent(webdriver.By.className("passed")).then(function(present) {
          expect(present).toBe(true);
        });

        driver.switchTo().window(current);
        driver.executeScript('editorOne.editor.setValue("");').then(function() {
          driver.findElement(webdriver.By.xpath('//div[@id="one"]/button')).click();
          driver.sleep(1000).then(function() {
            driver.switchTo().frame("testFrame");
            driver.isElementPresent(webdriver.By.className("failed")).then(function(present) {
              expect(present).toBe(true);
              done();
            });
          });
        });
      });
    });

    afterEach(function() {
      // delete test files
      for (var i in files) {
        fs.unlinkSync(dirName + files[i]);  
      }
    });

    afterAll(function(done) {
      // close browser  
      this.driver.quit().then(function() {
        done();
      });
    });
});