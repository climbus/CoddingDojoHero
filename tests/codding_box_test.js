describe("codding box", function() {
    it("should load editor", function() {
        var element = document.createElement("div");
        var box = new CoddingBox(element);
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
});