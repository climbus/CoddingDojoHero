describe("toolbar", function() {
    it("should render", function() {
        var parent = document.createElement("div");
        var tb = new Toolbar();
        var res = tb.render();
        parent.appendChild(res);
        expect(parent.innerHTML).toMatch("toolbar");
    });

    it("should add button", function(){
        var name = "Button";
        var tb = new Toolbar();
        tb.addButton(name);
        var res = tb.render();
        expect(res.innerHTML).toMatch("<button");
    });

    it("should button has label", function() {
        var label = "Button";
        var name = "button";
        var tb = new Toolbar();
        tb.addButton(name, {
            label: label
        });
        var res = tb.render()
        expect(res.innerHTML).toMatch(label);
    });

    it("should button has name", function() {
        var name = "buton";
        var tb = new Toolbar();
        tb.addButton(name);
        var res = tb.render()
        expect($(res).find("button[name='" + name + "']").length).toBeGreaterThan(0);
    });

    it("should add button on position", function() {
        var name1 = "button1";
        var name2 = "button2";
        var tb = new Toolbar();
        tb.addButton(name1);
        tb.addButton(name2, {
            position: 0
        });
        var res = tb.render()

        expect(res.childNodes[0].getAttribute("name")).toBe(name2);
    });

    it("should click on buuton exec callback", function() {
        var name = "button";
        var called = false;
        callback = function() {
            called = true
        }

        var tb = new Toolbar();
        tb.addButton(name, {
            callback: callback
        });
        var res = tb.render();
        $(res).find("button").click();
        expect(called).toBe(true);
    });

    it("should add class name to button", function() {
        var name = "button";
        var className = "example_class";
        var tb = new Toolbar();
        tb.addButton(name, {
            class_name: className
        });
        var res = tb.render();
        expect(res.innerHTML).toMatch(className);
    });

    it("add button should return button element", function() {
        var name = "Button";
        var tb = new Toolbar();
        var res = tb.addButton(name);
        expect(res.tagName).toBe("BUTTON");
    })

    it("should replace button", function(){
        var name1 = "button1";
        var name2 = "button2";
        var name3 = "button3";
        var name4 = "button4"
        ;
        var tb = new Toolbar();
        tb.addButton(name1);
        tb.addButton(name2);
        tb.addButton(name3);

        tb.replaceButton(name2, name4, {});
        
        var res = tb.render();

        var order = ["button1", "button4", "button3"];

        $(res).find("button").each(function(i) {
            expect(this.getAttribute("name")).toEqual(order[i]);
        });
    });

     it("should return button", function(){
        var name1 = "button1";
        var name2 = "button2";

        var tb = new Toolbar();
        tb.addButton(name1);
        tb.addButton(name2);
        var button = tb.getButton(name1);

        expect(button[0]).toEqual(name1);
    });
});