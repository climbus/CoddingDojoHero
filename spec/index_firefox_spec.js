var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().
          withCapabilities(webdriver.Capabilities.firefox()).
          build();

require("./index_spec")(driver);