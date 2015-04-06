var FizzBuzz = function() {
    var getResult = function(value) {
        if (value % 3 === 0) {
            return "fizz";
        }
    };
    return {
        getResult: getResult
    };
}();