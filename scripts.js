let playerOptions = document.querySelectorAll('form button');
playerOptions.forEach(option => {
    option.addEventListener('click', () => {
        user.choice = option.textContent;
        player2.choice = option.textContent === "X" ? "O" : "X";

        if (option.textContent === "X")
        {
            xBtn.dataset.click = "yes";
            xBtn.className = "clicked";
        }else {
            oBtn.dataset.click = "yes";
            oBtn.className = "clicked";
        }

        document.getElementById('playerChoice').style.display = "none";
    });
});

let xBtn = document.getElementById('x-btn');
let oBtn = document.getElementById('o-btn');

// MAIN CONTROLLER MODULE -- IIFE

let mainController = (() => {

    let currentPlayer = {};

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

    const xPlayed = () => {
        xBtn.className = "notClicked";
        oBtn.className = "clicked";

        switchPlayer();
    }

    const oPlayed = () => {
        oBtn.className = "notClicked";
        xBtn.className = "clicked";

        switchPlayer();
    }

    return {
        getCurrentPlayer,
        setCurrentPlayer,
        xPlayed,
        oPlayed
    }
})();

// FUNCTION FOR BUILDING THE GAMEBOX UI
const buildGameBoard = () => {
    let gameboard = document.getElementById('gameboard');

    for (let i = 0; i < 9; ++i)
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