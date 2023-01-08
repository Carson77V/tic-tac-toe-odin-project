//The module for the game board (tic tac toe)
const gameBoard = (function () {
    let _array = ["","","","","","","","",""]

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
    let xArray = [], oArray = []
    //select each space from the table, creates a nodelist
    const boardSpots = document.querySelectorAll('td')
    //loop through the nodelist and give each boardSpot an event listener
    boardSpots.forEach(function(ele) {
        ele.addEventListener('click', () => {
            //check for availability and add player sign
            _spotAvailable(ele, gameBoard.getArray(), ele.id, sign)
            _checkWinner()
        })
    })

    // if spot is available place players sign
    const _spotAvailable = function(ele, array, i, sign) {
        if (array[i] != "X" && array[i] != "O") {
            gameBoard.updateArray(sign, i)
            //render the sign into the board spot
            ele.textContent = sign
            //change turn after spot has been confirmed
            _changeTurn(i)
        }
    }

    //returns the sign of the player who's turn it is
    const _changeTurn = function(i) {
        if (sign === 'X') {
            xArray.push(i)
            sign = 'O'
        }
        else {
            oArray.push(i)
            sign = 'X'
        }
    }

    //checks the board for a winner
    const _checkWinner = function() {
        // let xArray = [], oArray = []
        // const array = gameBoard.getArray()
        // //loop through the gameBoard array
        // for (let i = 0; i < array.length - 1; i++) {
        //     //saves all indexes of X and O to new arrays.
        //     //used later to compare against winning patterns
        //     if (array[i] === 'X') xArray.push(i)
        //     else if (array[i] === 'O') oArray.push(i)
        // }

        if (_matchPatterns(xArray)) console.log('winner')
        if (_matchPatterns(oArray)) console.log('winner')

    }

    const _matchPatterns = function(array) {
        const winners = _winPatterns()
        //when match = 3, it has three matches and the player wins
        let match = 0
        //first two loops are for the 2D winner[][] array
        for (let i = 0; i < winners.length; i++) {
            for (let j = 0; j < 3; j++) {
                //this loop is for the array passed into the function
                // It will check if the array has the three numbers that match
                //the winning pattern
                // if the array has a match, increment match
                for (let k = 0; k < array.length; k++) {
                    if (array[k] == (winners[i][j])) match++
                }
            }
            //if 3 numbers match there is a winner. End the function
            if (match === 3) {
                return true
            }
            //if there aren't 3 matches reset the match count. Try again
            match = 0
        }
    }

    //these are all the patterns of array indexes required to win
    const _winPatterns = function() {
        return [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
        ]
    }

})()

//factory constructor that creates a player
const Player = function (name, sign, turn) {
    this.name = name
    this.sign = sign

    //returns the players sign
    const getSign = function() {
        return sign
    }

    return {getSign}
}

let player1 = Player('player1', 'X')
let player2 = Player('player2', 'O')