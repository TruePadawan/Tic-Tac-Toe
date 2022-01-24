let xBtn = document.getElementById('x-btn');
let oBtn = document.getElementById('o-btn');

xBtn.addEventListener('click', () => {
    if (xBtn.dataset.click != "yes")
    {
        xBtn.dataset.click = "yes";
        oBtn.dataset.click = "no";

        oBtn.className = "notClicked";
        xBtn.className = "clicked"
    }
});

oBtn.addEventListener('click', () => {
    if (oBtn.dataset.click != "yes")
    {
        oBtn.dataset.click = "yes";
        xBtn.dataset.click = "no";

        xBtn.className = "notClicked";
        oBtn.className = "clicked";
    }
});

// GAMEBOARD AND DISPLAY CONTROLLER MODULE -- IIFE
let GameBoard = (() => {
    // let blocksArray = ["O","X","X","O","O","X","X","O","O"];
    let blocksArray = [];

    return {
        blocks: blocksArray
    }
})();

let displayController = (() => {
    let gameboard = document.getElementById('gameboard');

    const buildGameBoard = (blocksArr) => {

        for (let i = 0; i < 9; ++i)
        {
            let block = document.createElement('button');
            block.className = "block";
            block.dataset.index = i;
            block.addEventListener('click', playerChoiceHandler);
            
            gameboard.appendChild(block);
        }

    }

    return {
        buildGameBoard
    }
})();

// FACTORY FUNCTION FOR PLAYERS
const createPlayer = (name) => {
    return {
        name,
        choice: ""
    }
};

const playerChoiceHandler = () => {

}

displayController.buildGameBoard(GameBoard.blocks);
let user = createPlayer('Hermes');