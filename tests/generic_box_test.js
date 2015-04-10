
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

    it("should minimize", function(done) {
        var box = new GenericBox(element);
        document.body.appendChild(element);
        box.minimize();
        setTimeout(function() {
            expect($(element).width()).toEqual($(element.parentElement).innerWidth());
            expect($(element).height()).toEqual($(".nav-tabs").height());
            done();
        }, 500);
    });

    it("should normalize", function(done) {
       var box = new GenericBox(element);
       document.body.appendChild(element);
       box.setNormalSize();
       var normalWidth = $(element).width();
       var normalHeight = $(element).height();
       $(element).width(10);
       $(element).height(10);
       box.normalize(); 
       setTimeout(function() {
            expect($(element).width()).toEqual(normalWidth);
            expect($(element).height()).toEqual(normalHeight);
            done();
        }, 500);
    });

    it("should has toolbar", function() {
        expect(element.innerHTML).toMatch("toolbar");
    });

    it("should has maximize button", function() {

    });

    it("should remember normal size", function() {

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