
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
            expect($(element).width()).toBeGreaterThan(window.innerWidth-20);
            expect($(element).height()).toBeGreaterThan(window.innerHeight-20);
            done();
        }, 500);
    });

    it("should maximize one when two boxes", function(done) {
        var element2 = document.createElement("div");
        element2.id = "two";
        element.id = "one";

        var box1 = new GenericBox(element);
        var box2 = new GenericBox(element2);

        document.body.appendChild(element);
        document.body.appendChild(element2);
        
        $(element).css({"width": "10px", "height": "10px", "position": "relative"});
        $(element2).css({"width": "10px", "height": "10px", "position": "relative"});
        
        box1.maximize();

        setTimeout(function() {
            expect($(element).width()).toBeGreaterThan(window.innerWidth-20);
            expect($(element).height()).toBeGreaterThan(window.innerHeight-20);
            expect($(element2).width()).toBeLessThan(window.innerWidth-20);
            expect($(element2).height()).toBeLessThan(window.innerHeight-20);
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
        var box = new GenericBox(element);
        expect(element.innerHTML).toMatch("toolbar");
        expect(box.toolbar).toBeDefined();
    });

    it("should has maximize button", function() {
        var found = false;
        var box = new GenericBox(element);
        for (var i in box.toolbar.element.childNodes) {
            if (box.toolbar.element.childNodes[i].innerHTML === "Maksymalizuj") {
                found = true;
            }
        }
        expect(found).toBe(true);
    });

    it("should remember normal size", function() {
        var box = new GenericBox(element);
        document.body.appendChild(element);

        var width = $(element).width();
        var height = $(element).height(); 
        box.maximize()
        expect(box.normalWidth).toEqual(width);
        expect(box.normalHeight).toEqual(height);
    });

    it("button maximize should maximize box", function() {
        var box = new GenericBox(element);
        spyOn(box, "maximize");

        document.body.appendChild(element);
        $("button:contains('Maksymalizuj')").click();
        expect(box.maximize.calls.any()).toBe(true);
    });

    it("should has minimize button", function() {
        var box = new GenericBox(element);
        document.body.appendChild(element);
        expect(Boolean($("button:contains('Minimalizuj')"))).toBe(true);
    });

    it("button minimize should minimize box", function() {
        var box = new GenericBox(element);
        spyOn(box, "minimize");
        document.body.appendChild(element);

        $("button:contains('Minimalizuj')").click();

        expect(box.minimize.calls.any()).toBe(true);
    });    


    it("when maximized has normalize button", function() {

    });

    it("when minimized has normalize button", function() {

    });


});