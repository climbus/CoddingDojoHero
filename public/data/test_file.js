describe("fizzbuzz", function() {
    it("should return fizz on 3", function() {
        result = FizzBuzz.getResult(3);
        expect(result).toBe("fizz");
        
    });
    
    it("should return buzz on 5", function() {
        result = FizzBuzz.getResult(5);
        expect(result).toBe("buzz");
    });
    
});