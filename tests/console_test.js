describe("console", function() {
    it("should take element as parameter", function() {
        var element = document.createElement("div");
        var cons = new Console(element);
        expect(cons.element).toBeDefined(true);
    });

    it("should write logs to element", function() {
        var message = "Test message";
        var element = document.createElement("div");
        var cons = new Console(element);
        cons.log(message);
        expect(element.innerHTML).toBe("<div class=\"log\">" + message + "</div>");
    });

    it("should append logs to element", function() {
        var message = "Test message";
        var element = document.createElement("div");
        var cons = new Console(element);
        cons.log("Initial message");
        cons.log(message);
        expect(element.innerHTML).toMatch(message);
    });    

    it("should log errors", function() {
        var message = "Test error";
        var element = document.createElement("div");
        var cons = new Console(element);
        cons.error(message);
        expect(element.innerHTML).toMatch("<div class=\"error\">" + message);

    });

    it("should overwrite browser console", function() {
        var message = "Test message";
        var element = document.createElement("div");
        var cons = new Console(element);
        cons.overwrite(console);
        console.log(message);
        expect(element.innerHTML).toMatch(message);
        console.trace(message);
        expect(element.innerHTML).toMatch("<div class=\"error\">" + message);
    });    
});