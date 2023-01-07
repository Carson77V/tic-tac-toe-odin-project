//The module for the game board (tic tac toe)
const gameBoard = (function () {
    let _array = ["1","2","3","4","5","6","7","8","9"]

    // called to update the array when a new move is made
    const updateArray = function (sign, index) {
        _array[index] = sign
    }

    const _renderBoard = function () {

    }
    // called when board is to be reset
    const reset = function () {
        for (let i = 0; i < _array.length - 1; i++){
            _array[i] = "";
        }
    }

    return { reset, updateArray }
})()

//module will be used to check inputs like a controller
const gameController = (function () {

})()

//factory constructor that creates a player
const Player = function (name, sign) {
    this.name = name
    this.sign = sign 
    return {}
}