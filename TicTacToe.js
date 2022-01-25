const checkHorizontal = (board) => {
    let row;
    for (let i = 0; i < board.length; ++i)
    {
        row = [];

        for (let j = 0; j < board.length; ++j)
        {
            if (board[i][j] === "") break; // IF ANY INDEX IN THAT ROW IS EMPTY, SKIP THAT ROW
            row.push([i,j]);
        }

        if (row.length === 3)
        {
            console.table(row);
            if (row.every((item) => board[item[0]][item[1]] === 'x'))
            {
                return {
                    indexes : row,
                    winner : 'x'
                };
            }
            else if (row.every((item) => board[item[0]][item[1]] === 'o'))
            {
                return {
                    indexes : row,
                    winner : 'o'
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
            if (board[j][i] === "") break; // IF ANY INDEX IN THAT COL IS EMPTY, SKIP THAT ROW
            col.push([j,i]);
        }

        if (col.length === 3)
        {
            if (col.every((item) => board[item[0]][item[1]] === 'x'))
            {
                return {
                    indexes: col,
                    winner : 'x'
                }
            }
            else if (col.every((item) => board[item[0]][item[1]] === 'o'))
            {
                return {
                    indexes: col,
                    winner : 'o'
                }
            }
        }
    }

    return {
        indexes : -1
    }
}

const checkDiagonal = () => {
    let diagonal = [];
    // CHECK LEFT DIAGONAL
    for (let i = 0; i < board.length; ++i)
    {
        if (board[i][i] === '') break;
        diagonal.push([i,i]);
    }

    if (diagonal.length === 3)
    {
        if (diagonal.every(item => board[item[0]][item[1]] === 'x'))
        {
            return {
                indexes: diagonal,
                winner: 'x'
            }
        }
        else if (diagonal.every(item => board[item[0]][item[1]] === 'o'))
        {
            return {
                indexes: diagonal,
                winner: 'o'
            }
        }
    }

    diagonal = [];
    // CHECK RIGHT DIAGONAL
    for (let i = 0; i < board.length; ++i)
    {
        if (board[2-i][i] == '') break;
        diagonal.push([2 - i,i]);
    }

    if (diagonal.length === 3)
    {
        if (diagonal.every(item => board[item[0]][item[1]] === 'x'))
        {
            return {
                indexes: diagonal,
                winner: 'x'
            }
        }
        else if (diagonal.every(item => board[item[0]][item[1]] === 'o'))
        {
            return {
                indexes: diagonal,
                winner: 'o'
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