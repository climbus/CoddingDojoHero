describe("codding box", function() {

    it("should load editor", function() {
        var element = document.createElement("div");
        var box = new CoddingBox(element);
        expect(box.editor).toBeDefined();
    });

    it("should load editor on id", function() {
        var id = "abc";
        var filename = "main_file.js";
        var element = document.createElement("div");
        element.id = id;
        document.body.appendChild(element);
        var box = new CoddingBox(id, filename);
        expect(box.editor).toBeDefined();
    });

    it("should load file", function() {
        spyOn(jQuery, "get").and.callFake(function(filename, callback) {
            callback("kodujemy");
        });
        var filename = "main_file.js";
        var element = document.createElement("div");
        var box = new CoddingBox(element, filename);
        expect(box.editor.getValue()).toMatch("kodujemy");
    });

    it("should save file", function() {
        var text = "Ala ma kota";
        spyOn(jQuery, "post").and.callFake(function(filename, data, callback) {
            expect(data.data).toBe(text);
        });
        var filename = "example.txt";
        var element = document.createElement("div");
        var box = new CoddingBox(element, filename);
        box.editor.setValue(text);
        box.save();
        expect(jQuery.post.calls.any()).toBe(true);
        
    });

    it("should show file name", function() {
        var filename = "example.txt";
        var element = document.createElement("div");
        var box = new CoddingBox(element, filename);
        expect(element.innerHTML).toMatch(filename);
    });

    it("should be button", function() {
        var filename = "example.txt";
        var element = document.createElement("div");
        var box = new CoddingBox(element, filename);
        expect(element.innerHTML).toMatch("<button>");
    });

    it("button should be clicking and saving content", function() {
        var filename = "example.txt";
        var element = document.createElement("div");
        var box = new CoddingBox(element, filename);
        spyOn(jQuery, "post");
        $(element.getElementsByTagName("button")[0]).click();
        expect(jQuery.post.calls.any()).toBe(true);
    });
});