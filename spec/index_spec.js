
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
      // TODO: add test files
      var filenames = ["main_file.js", "test_file.js"];
      var found = 0;
      for (var i in filenames) {
        var elm = this.driver.isElementPresent(webdriver.By.linkText(filenames[i])).then(function(present) {
          expect(present).toBe(true);
          found += 1;
          if (found === filenames.length) {
            done();
          }
        });
      }
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

    afterAll(function(done) {
        this.driver.quit().then(function() {
          done();
        });
    });
});