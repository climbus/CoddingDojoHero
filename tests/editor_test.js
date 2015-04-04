
describe("editor", function() {

    it("should embedding to html element", function() {
        var element = document.createElement("div");
        var editor = new Editor(element);
        expect(element.innerHTML).toMatch("textarea");
    });

    it("should show initial content", function() {
        var iniTxt = "Ala ma kota";
        var element = document.createElement("div");
        var editor = new Editor(element, iniTxt);
        expect(editor.getValue()).toEqual(iniTxt);
    });

    it("should not show initial content if undefined", function() {
        var element = document.createElement("div");
        var editor = new Editor(element);
        expect(editor.getValue()).toEqual("");
    });

    it("has possibility to set contents", function() {
        var txt = "ala ma kota";
        var element = document.createElement('div');

        var editor = new Editor(element);
        editor.setValue(txt);

        expect(editor.getValue()).toEqual(txt);
    });
});