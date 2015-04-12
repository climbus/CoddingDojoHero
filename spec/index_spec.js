module.exports = function(driver) {
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
    
    createDir(dirName);

    if (dirname != undefined) {
      srcDir += dirname + "/";
    }
    for (var i in files) {
      fs.createReadStream(srcDir + files[i]).pipe(fs.createWriteStream(dirName + files[i]));
    }
  }

  describe("main page", function() {

      beforeEach(function(done) {
        // copy test files to test dir
        copyFiles();   

        // open main page
        driver.sleep(200).then(function() {
          driver.get('http://localhost:3000/');
          done();
        });
      });

      it("should respond with title", function(done) {    
        driver.getTitle().then(function(title) {
          expect(title).toMatch("Coding Dojo");
          done();
        })
      });

      it("should respond with filenames", function(done) {
        driver.isElementPresent(webdriver.By.linkText(files[0]))
          .then(function(present) {
              expect(present).toBe(true);
              done();
        });
      });

      it("should respond with test results", function(done) {
        driver.isElementPresent(webdriver.By.id("testFrame")).then(function(elm) {
          if (elm == false) {
            expect("testFrame").toBe("present");
            done();
          }       
        });
        driver.switchTo().frame("testFrame");
        driver.isElementPresent(webdriver.By.className("jasmine_html-reporter")).then(function(present) {
              expect(present).toBe(true);
              done();
          });
      });

      it("should save file", function(done) {
        var exampleText = "";

        driver.executeScript('editorOne.editor.setValue("' + exampleText + '");').then(function() {
          driver.findElement(webdriver.By.xpath('//div[@id="one"]/*/button[@name="save"]')).click();

          driver.sleep(1000).then(function() {
              driver.executeScript("return editorOne.editor.getValue();").then(function(text) {
                expect(text).toBe(exampleText);
                done(); 
              });
          });
        });
      });

      it("should reload frame on save file", function(done) {
        copyFiles("passed");

        driver.getWindowHandle().then(function(current) {
          driver.switchTo().frame("testFrame");
          driver.isElementPresent(webdriver.By.className("passed")).then(function(present) {
            expect(present).toBe(true);
          });

          driver.switchTo().window(current);
          driver.executeScript('editorOne.editor.setValue("");').then(function() {
            driver.findElement(webdriver.By.xpath('//div[@id="one"]/*/button[@name="save"]')).click();
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

      it("should maximize window", function(done) {
        driver.findElement(webdriver.By.xpath('//div[@id="one"]/*/button[@name="maximize"]')).click();
        driver.sleep(1000).then(function() {
          driver.findElement(webdriver.By.xpath('//div[@id="one"]')).getSize().then(function(size) {
            driver.manage().window().getSize().then(function(wsize) {
              expect(size.width).toBeGreaterThan(0.8 * wsize.width);
              expect(size.height).toBeGreaterThan(0.8 * wsize.height);
              done();
            });
          });
        });
      });

      it("should minimize window", function(done) {
        driver.findElement(webdriver.By.xpath('//div[@id="one"]/*/button[@name="minimize"]')).click();
        driver.sleep(1000).then(function() {
          driver.findElement(webdriver.By.xpath('//div[@id="one"]')).getSize().then(function(size) {
            expect(size.height).toBeLessThan(100);
            done();
          });
        });
      });

      it ("should normalize when maximized", function(done) {
        driver.findElement(webdriver.By.xpath('//div[@id="one"]')).getSize().then(function(size) {
          var normalSize = size;
          driver.findElement(webdriver.By.xpath('//div[@id="one"]/*/button[@name="maximize"]')).click();
          driver.sleep(500).then(function() {
            driver.findElement(webdriver.By.xpath('//div[@id="one"]/*/button[@name="normalize"]')).click();
            driver.sleep(500).then(function() {
              driver.findElement(webdriver.By.xpath('//div[@id="one"]')).getSize().then(function(size) {
                expect(size.width).toEqual(normalSize.width);
                expect(size.height).toEqual(normalSize.height);
                done();
              });
            })
          });
        });
      });

      it ("should normalize when minimized", function(done) {
        driver.findElement(webdriver.By.xpath('//div[@id="one"]')).getSize().then(function(size) {
          var normalSize = size;
          driver.findElement(webdriver.By.xpath('//div[@id="one"]/*/button[@name="minimize"]')).click();
          driver.sleep(500).then(function() {
            driver.findElement(webdriver.By.xpath('//div[@id="one"]/*/button[@name="normalize"]')).click();
            driver.sleep(500).then(function() {
              driver.findElement(webdriver.By.xpath('//div[@id="one"]')).getSize().then(function(size) {
                expect(size.width).toEqual(normalSize.width);
                expect(size.height).toEqual(normalSize.height);
                done();
              });
            })
          });
        });
      });
      
      it ("should has minimize button after normalize", function(done) {
        driver.findElement(webdriver.By.xpath('//div[@id="one"]/*/button[@name="minimize"]')).click();
        driver.sleep(500).then(function() {
          driver.findElement(webdriver.By.xpath('//div[@id="one"]/*/button[@name="normalize"]')).click();
          driver.sleep(500).then(function() {
            driver.isElementPresent(webdriver.By.xpath('//div[@id="one"]/*/button[@name="minimize"]')).then(function(present){
              expect(present).toBe(true);
              done();
            });
          });
        });
      });

      it ("should has maximize button after normalize", function(done) {
        driver.findElement(webdriver.By.xpath('//div[@id="one"]/*/button[@name="maximize"]')).click();
        driver.sleep(500).then(function() {
          driver.findElement(webdriver.By.xpath('//div[@id="one"]/*/button[@name="normalize"]')).click();
          driver.sleep(500).then(function() {
            driver.isElementPresent(webdriver.By.xpath('//div[@id="one"]/*/button[@name="maximize"]')).then(function(present){
              expect(present).toBe(true);
              done();
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
        driver.quit().then(function() {
          done();
        });
      });
  });
};