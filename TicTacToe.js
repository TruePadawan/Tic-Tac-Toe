const checkHorizontal = (board) => {
    let row;
    for (let i = 0; i < board.length; ++i)
    {
        row = [];

        for (let j = 0; j < board.length; ++j)
        {
            if (board[i][j].textContent === "") break; // IF ANY INDEX IN THAT ROW IS EMPTY, SKIP THAT ROW
            row.push([i,j]);
        }

        if (row.length === 3)
        {
            if (row.every((item) => board[item[0]][item[1]].textContent === 'X'))
            {
                
                return {
                    indexes : row,
                    winner : 'X'
                };
            }
            else if (row.every((item) => board[item[0]][item[1]].textContent === 'O'))
            {
                return {
                    indexes : row,
                    winner : 'O'
                };
            }
        }
    }
    return {
        indexes : -1
    }
}

const checkVertical = (board) => {
    let col;
    for (let i = 0; i < board.length; ++i)
    {
        col = [];

        for (let j = 0; j < board.length; ++j)
        {
            if (board[j][i].textContent === "") break; // IF ANY INDEX IN THAT COL IS EMPTY, SKIP THAT ROW
            col.push([j,i]);
        }

        if (col.length === 3)
        {
            if (col.every((item) => board[item[0]][item[1]].textContent === 'X'))
            {
                return {
                    indexes: col,
                    winner : 'X'
                }
            }
            else if (col.every((item) => board[item[0]][item[1]].textContent === 'O'))
            {
                return {
                    indexes: col,
                    winner : 'O'
                }
            }
        }
    }

    return {
        indexes : -1
    }
}

const checkDiagonal = (board) => {
    let diagonal = [];
    // CHECK LEFT DIAGONAL
    for (let i = 0; i < board.length; ++i)
    {
        if (board[i][i].textContent === '') break;
        diagonal.push([i,i]);
    }

    if (diagonal.length === 3)
    {
        if (diagonal.every(item => board[item[0]][item[1]].textContent === 'X'))
        {
            return {
                indexes: diagonal,
                winner: 'X'
            }
        }
        else if (diagonal.every(item => board[item[0]][item[1]].textContent === 'O'))
        {
            return {
                indexes: diagonal,
                winner: 'O'
            }
        }
    }

    diagonal = [];
    // CHECK RIGHT DIAGONAL
    for (let i = 0; i < board.length; ++i)
    {
        if (board[2-i][i].textContent == '') break;
        diagonal.push([2 - i,i]);
    }

    if (diagonal.length === 3)
    {
        if (diagonal.every(item => board[item[0]][item[1]].textContent === 'X'))
        {
            return {
                indexes: diagonal,
                winner: 'X'
            }
        }
        else if (diagonal.every(item => board[item[0]][item[1]].textContent === 'O'))
        {
            return {
                indexes: diagonal,
                winner: 'O'
            }
        }
    }
    return {
        indexes: -1
    }
}

const tictactoe = (board) => {
    let horizontal = checkHorizontal(board);
    let vertical = checkVertical(board);
    let diagonal = checkDiagonal(board);

    if (horizontal.indexes != -1)
    {
        return horizontal;
    }
    else if (vertical.indexes != -1)
    {
        return vertical;
    }
    else if (diagonal.indexes != -1)
    {
        return diagonal;
    }
    return -1;
};

export default tictactoe;
// let board = [
//     ['x','',''],
//     ['','x',''],
//     ['o','o','x']
// ];

// console.table(board);
// console.log(tictactoe(board).indexes);