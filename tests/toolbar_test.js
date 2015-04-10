describe("toolbar", function() {
    it("should render", function() {
        var parent = document.createElement("div");
        var tb = new Toolbar();
        var res = tb.render();
        parent.appendChild(res);
        expect(parent.innerHTML).toMatch("toolbar");
    });

    it("should add button", function(){
        var label = "Button";
        var tb = new Toolbar();
        tb.addButton(label);
        var res = tb.render();
        expect(res.innerHTML).toMatch(label);
    });

    it("should add button on position", function() {
        var label1 = "Button1";
        var label2 = "Button2";
        var tb = new Toolbar();
        tb.addButton(label1);
        tb.addButton(label2, {
            position: 0
        });
        var res = tb.render()

        expect(res.childNodes[0].innerHTML).toBe(label2);
    });

    it("should click on buuton exec callback", function() {
        var label = "Button";
        var called = false;
        callback = function() {
            called = true
        }

        var tb = new Toolbar();
        tb.addButton(label, {
            callback: callback
        });
        var res = tb.render();
        $(res).find("button").click();
        expect(called).toBe(true);
    });

    it("should add class name to button", function() {
        var label = "Button";
        var className = "example_class";
        var tb = new Toolbar();
        tb.addButton(label, {
            class_name: className
        });
        var res = tb.render();
        expect(res.innerHTML).toMatch(className);
    });

    it("add button should return button element", function() {
        var label = "Button";
        var tb = new Toolbar();
        var res = tb.addButton(label);
        expect(res.tagName).toBe("BUTTON");
    })

    it("should replace button", function(){
        var label1 = "Button1";
        var label2 = "Button2";
        var label3 = "Button3";
        var label4 = "Button4"
        ;
        var tb = new Toolbar();
        tb.addButton(label1);
        tb.addButton(label2);
        tb.addButton(label3);

        tb.replaceButton(label2, label4, {});
        
        var res = tb.render();

        var order = ["Button1", "Button4", "Button3"];

        $(res).find("button").each(function(i) {
            expect(this.innerHTML).toEqual(order[i]);
        });
    });

     it("should return button", function(){
        var label1 = "Button1";
        var label2 = "Button2";

        var tb = new Toolbar();
        tb.addButton(label1);
        tb.addButton(label2);
        var button = tb.getButton(label1);

        expect(button[0]).toEqual(label1);
    });
});