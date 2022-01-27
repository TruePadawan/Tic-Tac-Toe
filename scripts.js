import tictactoe from './TicTacToe.js';

let board = [[],[],[]];
let resetBtn = document.getElementById('resetBtn');
let playerOptions = document.querySelectorAll('form button');
let playerNameInput = document.querySelector('form input');

playerNameInput.addEventListener('input', () => {
    if (playerNameInput.value.trim().length >= 2)
    {
        playerOptions.forEach((option) => {
            option.removeAttribute('disabled');
        });
        return;
    }
    playerOptions.forEach((option) => {
        option.setAttribute('disabled', true);
    });
});

// LOGIC FOR GETTING THE USERS CHOICE = X OR O
playerOptions.forEach(option => {
    option.addEventListener('click', () => {

        let user = createPlayer(playerNameInput.value,option.textContent);
        let player2 = createPlayer('AI',option.textContent === "X" ? "O" : "X");

        mainController.setPlayers(user,player2);

        if (option.textContent === "X")
        {
            xBtn.className = "clicked";
            oBtn.className = "notClicked";
        }else {
            oBtn.className = "clicked";
            xBtn.className = "notClicked";
        }

        document.getElementById('playerChoice').style.display = "none";
        document.getElementById('gameInfo').textContent = "WATCHING FOR A WINNER OR TIE..";
    });
});

let xBtn = document.getElementById('x-btn');
let oBtn = document.getElementById('o-btn');

// MAIN CONTROLLER MODULE -- IIFE
/* HANDLES THE LOGIC FOR SWITCHING BETWEEN PLAYER 1 AND 2, RETRIEVING THE CURRENT PLAYER AND WHAT HAPPENS WHEN A PLAYER MAKES A MOVE */

let mainController = (() => {

    let USER = {};
    let AI = {};
    let currentPlayer = {};

    let noOfMoves = 0;

    const gameOver = () => {
        document.getElementById('gameInfo').textContent = "A Tie!";
        for (let i = 0; i < board.length; ++i)
        {
            for (let j = 0; j < board[i].length; ++j)
            {
                board[i][j].setAttribute('disabled',true);
            }
        }
    }

    const resetGame = () => {
        document.getElementById('playerChoice').style.display = "flex";
        document.getElementById('gameInfo').textContent = "PREPPING..";

        noOfMoves = 0;

        for (let i = 0; i < board.length; ++i)
        {
            for (let j = 0; j < board[i].length; ++j)
            {
                board[i][j].textContent = "";
                board[i][j].style.color = 'black';
                board[i][j].removeAttribute('disabled');
            }
        }
    }

    const checkForWin = () => {
        let possibleWin = tictactoe(board);
        if (possibleWin != -1) {
            for (let i = 0; i < possibleWin.indexes.length; ++i) {
                let row = possibleWin.indexes[i][0];
                let index = possibleWin.indexes[i][1];

                board[row][index].style.color = 'green';
            }
            gameOver();
            document.getElementById('gameInfo').textContent = `${currentPlayer.name} wins!`;
        }
    }

    const switchPlayer = () => {
        if (currentPlayer.choice === USER.choice)
        {
            currentPlayer = AI;
            return;
        }
        currentPlayer = USER;
    }

    const setPlayers = (user,ai) => {
        USER = user;
        currentPlayer = user;
        AI = ai;
    };
    
    const getCurrentPlayer = () => currentPlayer;    

    const incrementMoves = () => {
        ++noOfMoves;
        if (noOfMoves >= 5 && noOfMoves < 9)
        {
            checkForWin();
        }
        else if (noOfMoves === 9)
        {
            gameOver();
        }
    };

    const xPlayed = () => {
        incrementMoves();
        xBtn.className = "notClicked";
        oBtn.className = "clicked";

        switchPlayer();
    }

    const oPlayed = () => {
        incrementMoves();
        oBtn.className = "notClicked";
        xBtn.className = "clicked";

        switchPlayer();
    }

    return {
        getCurrentPlayer,
        setPlayers,
        incrementMoves,
        xPlayed,
        oPlayed,
        resetGame
    }
})();

resetBtn.addEventListener('click', () => {
    mainController.resetGame();
});

// FUNCTION FOR BUILDING THE GAMEBOX UI
const buildGameBoard = () => {
    let gameboard = document.getElementById('gameboard');

    for (let i = 0, j = 0; i < 9; ++i)
    {
        let block = document.createElement('button');
        block.className = "block";
        block.dataset.index = i;

        block.addEventListener('click', () => {
            
            if (block.textContent === "")
            {
                block.textContent = mainController.getCurrentPlayer().choice;
                
                if (mainController.getCurrentPlayer().choice === "X")
                {
                    mainController.xPlayed();
                }else
                {
                    mainController.oPlayed();
                }
            }
        });

        board[j].push(block);
        if (i === 2) j = 1;
        else if (i === 5) j = 2;

        gameboard.appendChild(block);
    }

}

// FACTORY FUNCTION FOR CREATING PLAYERS
const createPlayer = (name,choice) => {
    return {
        name,
        choice
    }
};

buildGameBoard();