
describe("codding box", function() {
    var exampleFileName = "example.txt";
    var exampleContent = "Example";
    var exampleId = "exampleId";

    beforeEach(function() {
        spyOn(jQuery, "get").and.callFake(function(filename, callback) {
            callback(exampleContent);
        });

        spyOn(jQuery, "post").and.callFake(function(filename, data, callback) {
            expect(data.data).toBe(exampleContent);
        });
    });

    it("should load editor", function() {
        var element = document.createElement("div");
        var box = new CoddingBox(element);
        expect(box.editor).toBeDefined();
    });

    it("should load editor on id", function() {
        var filename = exampleFileName;
        var element = document.createElement("div");
        element.id = exampleId;

        document.body.appendChild(element);
        var box = new CoddingBox(exampleId, filename);

        expect(box.editor).toBeDefined();
    });

    it("should load file", function() {
        
        var filename = exampleFileName;
        var element = document.createElement("div");
        var box = new CoddingBox(element, filename);
        expect(box.editor.getValue()).toMatch(exampleContent);
    });

    it("should save file", function() {

        var filename = exampleFileName;
        var element = document.createElement("div");
        var box = new CoddingBox(element, filename);
        box.editor.setValue(exampleContent);
        box.save();
        expect(jQuery.post.calls.any()).toBe(true);
        
    });

    it("should show file name", function() {
        var filename = exampleFileName;
        var element = document.createElement("div");
        var box = new CoddingBox(element, filename);
        expect(element.innerHTML).toMatch(filename);
    });

    it("should has button", function() {
        var filename = exampleFileName;
        var element = document.createElement("div");
        var box = new CoddingBox(element, filename);
        expect(element.innerHTML).toMatch("<button>");
    });

    it("button should be clicking and saving content", function() {
        var filename = exampleFileName;
        var element = document.createElement("div");
        var box = new CoddingBox(element, filename);
        $(element.getElementsByTagName("button")[0]).click();
        expect(jQuery.post.calls.any()).toBe(true);
    });
});