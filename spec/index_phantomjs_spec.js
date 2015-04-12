var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().
          withCapabilities(webdriver.Capabilities.phantomjs()).
          build();

require("./index_spec")(driver);