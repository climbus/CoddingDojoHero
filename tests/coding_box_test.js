describe("coding box", function() {
    var exampleFileName = "example.txt";
    var exampleContent = "Example";
    var exampleId = "exampleId";
    var element;

    beforeEach(function() {
        element = document.createElement("div");
    });

    describe("without arguments", function() {
        beforeEach(function() {
            spyOn(jQuery, "get").and.callFake(function(filename, callback) {
                expect(filename).toMatch("example");
                callback(exampleContent);
            });

            spyOn(jQuery, "post").and.callFake(function(filename, data, callback) {
                expect(filename).toMatch(exampleFileName);
                expect(data.data).toBe(exampleContent);
            });
        });

        it("should load editor", function() {
            
            var box = new CodingBox(element);
            expect(box.editor).toBeDefined();
        });

        it("should load editor on id", function() {
            var filename = exampleFileName;

            element.id = exampleId;

            document.body.appendChild(element);
            var box = new CodingBox(exampleId, filename);

            expect(box.editor).toBeDefined();
        });

        it("should load file on start", function() {
            
            var filename = exampleFileName;
            var box = new CodingBox(element, filename);
            expect(box.editor.getValue()).toMatch(exampleContent);
        });

        it("should load file on demand", function() {
            
            var filename = exampleFileName;
            var box = new CodingBox(element);
            box.loadFile(filename);
            expect(box.editor.getValue()).toMatch(exampleContent);
        });

        it("should save file", function() {

            var filename = exampleFileName;
            var box = new CodingBox(element, filename);
            box.editor.setValue(exampleContent);
            box.save();
            expect(jQuery.post.calls.any()).toBe(true);
            
        });

        it("should show file name", function() {
            var filename = exampleFileName;
            var box = new CodingBox(element, filename);
            expect(element.innerHTML).toMatch(filename);
        });

        it("should has button", function() {
            var filename = exampleFileName;
            var box = new CodingBox(element, filename);
            expect(element.innerHTML).toMatch("<button");
        });

        it("button should be clicking and saving content", function() {
            var filename = exampleFileName;
            var box = new CodingBox(element, filename);
            $("button[name='save']").click();
            
            expect(jQuery.post.calls.any()).toBe(true);
        });

        it("should be two editors on page", function() {
            var element2 = document.createElement("div");
            var filename1 = "example.txt";
            var filename2 = "example2.txt";
            var box1 = new CodingBox(element, filename1);
            var box2 = new CodingBox(element2, filename2);
            document.body.appendChild(element);
            document.body.appendChild(element2);
            expect(document.body.innerHTML).toMatch(filename1);
            expect(document.body.innerHTML).toMatch(filename2);
        });

        it("should set title", function() {
            var title = "Example title";
            var box = new CodingBox(element);
            box.setTitle(title);
            expect(element.innerHTML).toMatch(title);
        });

        // it ("should have save shortcut", function() {
        //     var ev = document.createEvent("KeyboardEvent");
        //     ev.initKeyboardEvent("keypress", true, true, window, true, false, false, false, 83, 83);
        //     var element = document.createElement('div');
        //     var box = new CodingBox(element);
        //     document.body.appendChild(element);
        //     spyOn(box, "save");

        //     element.getElementsByTagName("textarea")[0].dispatchEvent(ev);
        //     expect(box.save.calls.any()).toEqual(true);
        //  });
        it ("should have onsave listener", function() {
            var filename = exampleFileName;
            var box = new CodingBox(element, filename);
            box.onsave = function() {}
            spyOn(box, "onsave");
            box.save();
            expect(box.onsave.calls.any()).toEqual(true);
        });
         
        it("should maximize one when two boxes", function(done) {
            var element2 = document.createElement("div");
            element2.id = "two";
            element.id = "one";

            var box1 = new CodingBox(element);
            var box2 = new CodingBox(element2);

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
    });

    describe("with filedir", function() {
        var dirname = "test_dir";

        beforeEach(function() {
            spyOn(jQuery, "get").and.callFake(function(filename, callback) {
                expect(filename).toMatch(dirname);
                callback(exampleContent);
            });
            
            spyOn(jQuery, "post").and.callFake(function(filename, data, callback) {
                expect(filename).toMatch(dirname);
                expect(data.data).toBe(exampleContent);
            });
        });

        it("should set dir name on file load", function() {
            var filename = "example.txt";
            var box = new CodingBox(element, filename, dirname);

        });

        it("should set dir name on file save", function() {
            var filename = "example.txt";
            var box = new CodingBox(element, filename, dirname);
            box.save();
        });


    });
});