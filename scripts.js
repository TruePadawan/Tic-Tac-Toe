import tictactoe from './TicTacToe.js';

let board = [[],[],[]];
let playerOptions = document.querySelectorAll('form button');

// LOGIC FOR GETTING THE USERS CHOICE = X OR O
playerOptions.forEach(option => {
    option.addEventListener('click', () => {
        user.choice = option.textContent;
        player2.choice = option.textContent === "X" ? "O" : "X";

        if (option.textContent === "X")
        {
            xBtn.className = "clicked";
        }else {
            oBtn.className = "clicked";
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

    let currentPlayer = {};
    let noOfMoves = 0;

    const gameOver = () => {
        for (let i = 0; i < board.length; ++i)
        {
            for (let j = 0; j < board[i].length; ++j)
            {
                board[i][j].setAttribute('disabled',true);
            }
        }
    }

    const switchPlayer = () => {
        if (currentPlayer.name === user.name)
        {
            currentPlayer = player2;
        }
        else {
            currentPlayer = user;
        }
    }

    const setCurrentPlayer = (playerObj) => {
        currentPlayer = playerObj;
    };

    const getCurrentPlayer = () => currentPlayer;    

    const incrementMoves = () => {
        ++noOfMoves;
        if (noOfMoves >= 5)
        {
            let possibleWin = tictactoe(board);
            if (possibleWin != -1)
            {
                for (let i = 0; i < possibleWin.indexes.length; ++i)
                {
                    let row = possibleWin.indexes[i][0];
                    let index = possibleWin.indexes[i][1];

                    board[row][index].style.color = 'green';
                }
                gameOver();
                document.getElementById('gameInfo').textContent = `${possibleWin.winner} wins!`;
            }
        }
    };
    const getNoOfMoves = () => noOfMoves;

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
        setCurrentPlayer,
        incrementMoves,
        getNoOfMoves,
        xPlayed,
        oPlayed
    }
})();

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
const createPlayer = (name) => {
    return {
        name,
        choice: ""
    }
};

let user = createPlayer('Hermes');
let player2 = createPlayer('player2');
mainController.setCurrentPlayer(user);

buildGameBoard();