
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

    it("should set title", function() {
        var title = "Example title";
        var box = new GenericBox(element);
        box.setTitle(title);
        expect(element.innerHTML).toMatch(title);
    });

    it("should maximize", function(done) {
        var box = new GenericBox(element);
        document.body.appendChild(element);
        $(element).css({"width": "10px", "height": "10px", "position": "relative"});
        box.maximize();
        setTimeout(function() {
            expect($(element).width()).toEqual(window.innerWidth);
            expect($(element).height()).toEqual(window.innerHeight);
            done();
        }, 500);
    });

    it("should minimize", function() {
        var box = new GenericBox(element);
        box.minimize();
    });

    it("should normalize", function() {
       var box = new GenericBox(element);
       box.normalize(); 
    });

    it("should has toolbar", function() {
        expect(element.innerHTML).toMatch("toolbar");
    });

    it("should has maximize button", function() {

    });

    it("button maximize should maximize box", function() {

    });

    it("should has minimize button", function() {

    });

    it("button minimize should maximize box", function() {

    });    


    it("when maximized has normalize button", function() {

    });

    it("when minimized has normalize button", function() {

    });


});