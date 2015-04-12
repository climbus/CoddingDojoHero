var FizzBuzz = {
    getResult: function(number) {
        number = parseInt(number)
        if (isNaN(number)) {
            throw {
                name: "NieIntegerError",
                message: "To nie jest int"
            }
        }
    }
}