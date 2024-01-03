
const GameBoard = (function() {
    const board = [];
    const rows = 3;
    const columns = 3;

    const playerOne = createPlayer('Player One', 'X', 1, 'player');
    const playerTwo = createPlayer('Player Two', 'O', 2, 'player');
    console.log(playerOne);
    console.log(playerTwo);

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    };
    
    const getBoard = () => board;

    const dropMark = (column, row, player) => {
        if(board[row][column].getValue() === 0) {
            board[row][column].addMark(player)
        } else {
            return;
        }
    }

    const printBoard = () => {
        const boardWithValues =  board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithValues);
    }
    




    return {
        getBoard,
        dropMark,
        printBoard
    }

})();

const displayControl = (function() {
    
})();

function Cell() {
    let value = 0;
    const addMark = (player) => {
        value = player;
    }
    const getValue = () => value;
    return {
        
        addMark,
        getValue
    };
}

function createPlayer(name, mark, turn, type) {
    return { name, mark, turn, type};
}
GameBoard.dropMark(1,1, 1);
GameBoard.dropMark(0,0,1);
GameBoard.dropMark(0,0,2);
GameBoard.dropMark(0,1,2);
GameBoard.printBoard();