function GameBoard() {

    const board = [];
    const rows = 3;
    const columns = 3;

    const sqaure = '';

    for(let i = 0; i < rows; i++) { //creates a 2d array
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(sqaure); //pushs a cell object with own functions
        }
    };

    const getBoard = () => board;

    const placeMark = (row, column, playerMark) => {
        if(board[row][column] === '') {
            board[row][column] = playerMark;
        } else return;
    };

    const printBoard = () => {
        console.log(board);
    };

    const winConditions = [
        [0, 1, 2],
        [3 ,4, 5],
        [6, 7, 8],  
        [0, 3, 6],
        [1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
    ];



    return {
        getBoard,
        printBoard,
        placeMark
    };
}

function GameController() {
    board = GameBoard();
    const playerOne = createPlayer('Player One', 'X', '', 1);
    const playerTwo = createPlayer('Player Two', 'O', '',  2);

    const players = [playerOne, playerTwo];
    
    let turn = 1;
    const playRound = () => {
        if(turn === 1){
            board.placeMark(0,0, players[0].mark);
            board.placeMark(0,1, players[0].mark);
            board.placeMark(0,2, players[0].mark);
        } else {
            board.placeMark(1,2,players[1].mark);
        }
        switchTurn();
        board.printBoard();
        checkWin();
    };

    const switchTurn = () => {
        if(turn === 1){
            turn = 2;
        } else {
            turn = 1;
        }
    };
    boardValue = board.getBoard();
    
    const checkWin = () => {
        if(boardValue[0][0] === "X" &&
        boardValue[0][1] === "X" &&
        boardValue[0][2] === "X"
      ) { console.log('win')};
    }

    return { playRound, switchTurn}
}

function createPlayer(name, mark, type, value) {
    return {name, mark, type, value};
}

const game = GameController();
