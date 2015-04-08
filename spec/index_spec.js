
var webdriver = require('selenium-webdriver');
var fs = require('fs');

describe("main page", function() {

    beforeAll(function() {

      this.driver = new webdriver.Builder().
          withCapabilities(webdriver.Capabilities.chrome()).
          build();
    });

    beforeEach(function() {
      this.driver.get('http://localhost:3000/')
    });

    it("should respond with title", function(done) {    
      this.driver.getTitle().then(function(title) {
        expect(title).toBe("Codding Dojo");
        done();
      })
    });

    it("should respond with filenames", function(done) {

      this.driver.isElementPresent(webdriver.By.linkText("main_file.js"))
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
      var exampleText = "Testing text";
      this.driver.executeScript('editorOne.editor.setValue("' + exampleText + '");').then(function() {
        driver.findElement(webdriver.By.xpath('//div[@id="one"]/button')).click();
        driver.wait(function() {
          driver.executeScript("return editorOne.editor.getValue();").then(function(text) {
            expect(text).toBe(exampleText);
            done(); 
          }, 1000);
        });
      });
    });

    afterAll(function(done) {
        this.driver.quit().then(function() {
          done();
        });
    });
});