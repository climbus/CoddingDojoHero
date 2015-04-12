describe("ConsoleBox", function() {
    var element;
    var message = "Testing mesage";
    
    beforeEach(function() {
        element = document.createElement("div");
    });

    it("should has toolbar", function() {
        var box = new ConsoleBox(element);
        expect(box.element.innerHTML).toMatch("toolbar");
    });

     it("should instantinate console", function() {
        var box = new ConsoleBox(element);
        expect(window._console).toBeDefined();
    });

    it("should show messages from console", function() {
        var box = new ConsoleBox(element);
        console.log(message);
        expect(box.element.innerHTML).toMatch(message);
    });

    it("should has title", function() {
        var box = new ConsoleBox(element);
        expect(box.element.innerHTML).toMatch("Konsola");
    });
})