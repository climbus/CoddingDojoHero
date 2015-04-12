// should return fizz on 3
// should return buzz on 5
// should return fizzbuzz on 15
// should return '2' on 2
// should return '0' on 0
describe("FizzBuzz", function(){
    it("should trow exception on noninteger eg 'ala'", function() {
        expect(function() {
            FizzBuzz.getResult("ala");
        }).toThrow();
    });
});
