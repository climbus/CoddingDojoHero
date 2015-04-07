describe("codding box", function() {
    var exampleFileName = "example.txt";
    var exampleContent = "Example";
    var exampleId = "exampleId";
    var element;

    beforeEach(function() {
        spyOn(jQuery, "get").and.callFake(function(filename, callback) {
            callback(exampleContent);
        });

        spyOn(jQuery, "post").and.callFake(function(filename, data, callback) {
            expect(data.data).toBe(exampleContent);
        });
        
        element = document.createElement("div");
    });

    it("should load editor", function() {
        
        var box = new CoddingBox(element);
        expect(box.editor).toBeDefined();
    });

    it("should load editor on id", function() {
        var filename = exampleFileName;

        element.id = exampleId;

        document.body.appendChild(element);
        var box = new CoddingBox(exampleId, filename);

        expect(box.editor).toBeDefined();
    });

    it("should load file on start", function() {
        
        var filename = exampleFileName;
        var box = new CoddingBox(element, filename);
        expect(box.editor.getValue()).toMatch(exampleContent);
    });

    it("should load file on demand", function() {
        
        var filename = exampleFileName;
        var box = new CoddingBox(element);
        box.loadFile(filename);
        expect(box.editor.getValue()).toMatch(exampleContent);
    });

    it("should save file", function() {

        var filename = exampleFileName;
        var box = new CoddingBox(element, filename);
        box.editor.setValue(exampleContent);
        box.save();
        expect(jQuery.post.calls.any()).toBe(true);
        
    });

    it("should show file name", function() {
        var filename = exampleFileName;
        var box = new CoddingBox(element, filename);
        expect(element.innerHTML).toMatch(filename);
    });

    it("should has button", function() {
        var filename = exampleFileName;
        var box = new CoddingBox(element, filename);
        expect(element.innerHTML).toMatch("<button");
    });

    it("button should be clicking and saving content", function() {
        var filename = exampleFileName;
        var box = new CoddingBox(element, filename);
        $(element.getElementsByTagName("button")[0]).click();
        expect(jQuery.post.calls.any()).toBe(true);
    });

    it("should be two editors on page", function() {
        var element2 = document.createElement("div");
        var filename1 = "example.txt";
        var filename2 = "example2.txt";
        var box1 = new CoddingBox(element, filename1);
        var box2 = new CoddingBox(element2, filename2);
        document.body.appendChild(element);
        document.body.appendChild(element2);
        expect(document.body.innerHTML).toMatch(filename1);
        expect(document.body.innerHTML).toMatch(filename2);
    });

    it("should set title", function() {
        var title = "Example title";
        var box = new CoddingBox(element);
        box.setTitle(title);
        expect(element.innerHTML).toMatch(title);
    });
});