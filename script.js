//The module for the game board (tic tac toe)
const gameBoard = (function () {
    let _array = ["","","","","","","","",""]

    // called to update the array when a new move is made
    const updateArray = function(sign, index) {
        _array[index] = sign
    }

    // called when board is to be reset
    const reset = function() {
        for (let i = 0; i < _array.length; i++){
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
    const resetBtn = document.querySelector('#reset')
    const startBtn = document.querySelector('#start')
    const bot = document.querySelector('#bot')
    let player1, player2

    startBtn.addEventListener('click', () => {
        //select the two input boxes and the form to use as parent
        const playerOneInput = document.querySelector('#player1')
        const playerTwoInput = document.querySelector('#player2')
        const form = document.querySelector('form')

        //determine if input have been filled
        let inputsFilled = checkInput(playerOneInput, playerTwoInput, form)
        //check if player is using bot
        if (bot.checked) {
            inputsFilled = checkInput(playerOneInput, bot, form)
        }

        if (inputsFilled) {
            //create new player objects
            player1 = Player(playerOneInput.value, 'X')
            //Change player2 name according to if a bot is the opponent
            if (bot.checked) {
                player2 = Player("Bot", 'O')
            }
            else player2 = Player(playerTwoInput.value, 'O')
            //render the names of each player
            form.insertBefore(createNameNode(player1.getName()), playerOneInput)
            form.insertBefore(createNameNode(player2.getName()), playerTwoInput)
            //remove the inputs
            playerOneInput.remove()
            playerTwoInput.remove()
            startGame()
            startBtn.disabled = true
        }
        
    })

    const startGame = function() {
        //loop through the nodelist and give each boardSpot an event listener
        boardSpots.forEach(function(ele) {
            ele.addEventListener('click', () => {
                //check for availability and add player sign
                _spotAvailable(ele, gameBoard.getArray(), ele.id, sign)
                _checkWinner()
                //If player is playing against a bot
                if (bot.checked) {
                    botTurn(ele);
                }
            })
        })
    }

    //function places a random sing for the bot
    const botTurn = function(ele) {
        let spotAvailable = false
        //generate a random number between 0 and 8
        let random = Math.floor(Math.random() * 9);
        //continue generating random numbers if computer can't 
        //find available space
        while (!spotAvailable) {
            console.log(random)
            //check for availability and add sign if available
            spotAvailable = _spotAvailable(ele, gameBoard.getArray(), random, sign)
            random = Math.floor(Math.random() * 9);
        }
        _checkWinner()
    }

    //reset button
    resetBtn.addEventListener('click', () => {
        //reset the gameboard array
        gameBoard.reset()
        //reset the x and o arrays
        xArray = []
        oArray = []
        //revert the sign back to X
        sign = 'X'
        removeWinnerNode()
        //render the reset gameboard array
        _render()
    })

    //render the board
    const _render = function() {
        //make index for gameBoard array and get gameboard array
        let i = 0
        let board = gameBoard.getArray()
        //go through all the board spots on the DOM
        boardSpots.forEach(function(ele) {
            ele.textContent = board[i]
            i++
        })
    }

    // if spot is available place players sign
    const _spotAvailable = function(ele, array, i, sign) {
        if (array[i] != "X" && array[i] != "O") {
            gameBoard.updateArray(sign, i)
            //render the sign into the board spot
            _render()
            //change turn after spot has been confirmed
            _changeTurn(i)
            return true
        }
        return false
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

        if (_matchPatterns(xArray)) {
            addWinnerNode(player1.getName())
            xArray = []
            oArray= []
        }
        if (_matchPatterns(oArray)) {
            addWinnerNode(player2.getName())
            xArray = []
            oArray = []
        }
    }

    const addWinnerNode = function(name) {
        const node = document.createElement('h2')
        node.textContent = name + ' Wins!'
        const title = document.querySelector('h1')
        title.appendChild(node)
    }

    const removeWinnerNode = function() {
        const title = document.querySelector('h1 > h2')
        title.remove()
    }

    //function returns true if there is a winner 
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
    
    //checks input is filled, return true if input if filled
    const checkInput = function(inputOne, inputTwo, parent) {
        const warning = document.querySelector('.warning')
        
        // remove the warning node because input is fille
        if (warning && inputOne.value > '' && inputTwo.value > '') {
            warning.remove()
            return true
        }
        //return false if warning exists and input is empty
        else if (warning && inputOne.value === '' && inputTwo.value === '') {
            return false
        }
        // return true if input is empty and warning node does not exist
        else if (!warning && inputOne.value > '' && inputTwo.value > '') {
            return true
        }
        //add warning node because it does not exist and input is empty
        else if (!warning && inputOne.value === '' && inputTwo.value === '') {
            parent.insertBefore(createWarning(), startBtn)
            return false
        }
        else if (!warning && inputOne.value === '' && inputTwo.value > '') {
            parent.insertBefore(createWarning(), startBtn)
            return false
        }
        else if (!warning && inputOne.value > '' && inputTwo.value === '') {
            parent.insertBefore(createWarning(), startBtn)
            return false
        }
    }

    //creates a node for player name
    const createNameNode = function(playerName) {
        const nameNode = document.createElement('h2')
        nameNode.textContent = playerName
        return nameNode
    }

    //creates a warning node
    const createWarning = function() {
        const warning = document.createElement('div');
        warning.classList.add('warning');
        warning.textContent = "Fill in the boxes!"
        warning.style.cssText = "color: red; font-size: 0.75rem;";
        return warning;
    }

    //store all the patterns needed for a player to win in this function
    //use factory function to store array at bottom or code for organization
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
const Player = function (name, sign) {
    this.name = name
    this.sign = sign

    //assign a prototype 
    let obj = Object.create(getPlayerName)
    obj.name = name
    return obj
}

//prototype of Player that gets the name
const getPlayerName = {
    getName() {
        return this.name
    }
}
