
describe("generic box", function() {
    var element;
    
    beforeEach(function() {
        element = document.createElement("div");
    });

    it("should show window", function() {
        var box = new GenericBox(element);
        expect(element.innerHTML).toMatch('ul class="nav');
    });

    it("should show title", function() {
        var title = "Example title";
        var box = new GenericBox(element, title);
        expect(element.innerHTML).toMatch(title);
    });

});