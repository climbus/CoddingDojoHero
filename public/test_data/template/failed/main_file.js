var FizzBuzz = { 
    getResult: function(number) {
        if (number % 3 === 0) {
            return "fizza";
        }
        if (number % 5 === 0) {
            return "buzza";
        }
    }
}