var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().
          withCapabilities(webdriver.Capabilities.ie()).
          build();

describe("in ie", function() {
    it("blank test", function(done) {
        driver.sleep(1000).then(function(){
            done();
        });
    });
});

require("./index_spec")(driver);