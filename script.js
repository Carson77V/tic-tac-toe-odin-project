//The module for the game board (tic tac toe)
const gameBoard = (function () {
    let _array = ["1","2","3","4","5","6","7","8","9"]

    // called to update the array when a new move is made
    const updateArray = function (sign, index) {
        _array[index] = sign
    }

    // called when board is to be reset
    const reset = function () {
        for (let i = 0; i < _array.length - 1; i++){
            _array[i] = "";
        }
    }

    //return the array (function prevents modifications)
    const getArray = function() {
        return _array
    }

    return { reset, updateArray, getArray }
})()

//module will be used to check inputs like a controller
const gameController = (function () {
    let sign = 'X'
    //select each space from the table, creates a nodelist
    const boardSpots = document.querySelectorAll('td')
    //loop through the nodelist and give each boardSpot an event listener
    boardSpots.forEach(function(ele) {
        ele.addEventListener('click', () => {
            //check for availability and add player sign
            _spotAvailable(ele, gameBoard.getArray(), ele.id, sign)
        })
    })

    // if spot is available place players sign
    const _spotAvailable = function(ele, array, i, sign) {
        if (array[i] != "X" && array[i] != "O") {
            gameBoard.updateArray(sign, i)
            //render the sign into the board spot
            ele.textContent = sign
            //change turn after spot has been confirmed
            _changeTurn()
        }
    }

    //returns the sign of the player who's turn it is
    const _changeTurn = function() {
        if (sign === 'X') sign = 'O'
        else sign = 'X'
    }

})()

//factory constructor that creates a player
const Player = function (name, sign, turn) {
    this.name = name
    this.sign = sign
    //true if it's this players turn
    this.turn = turn

    //returns the players sign
    const getSign = function() {
        return sign
    }

    return {getSign}
}

let player1 = Player('player1', 'X', true)
let player2 = Player('player2', 'O', false)