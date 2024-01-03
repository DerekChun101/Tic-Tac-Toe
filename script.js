
const GameBoard = (function() {

    const board = [];
    const rows = 3;
    const columns = 3;

    


    for(let i = 0; i < rows; i++) { //creates a 2d array
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(Cell()); //pushs a cell object with own functions
        }
    };
    
    const getBoard = () => board;

    const dropMark = (column, row, player) => {
        if(board[row][column].getValue() === 0) { //get value of cell
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

const GameController = (function() {

    const playerOne = createPlayer('Player One', 'X', true, '');// Create two players
    const playerTwo = createPlayer('Player Two', 'O', false, '');

    console.log(playerOne);
    console.log(playerTwo);

    const startGame = () => {
        GameBoard.printBoard();
    }

    const playRound = () => {
        if(playerOne.turn === true) {
            console.log('Player One turn');
            GameBoard.dropMark(1,1, playerOne.mark);
            GameBoard.printBoard();
            switchTurn();
        } else {
            console.log('Player Two turn');
            GameBoard.dropMark(1,2, playerTwo.mark);
            GameBoard.printBoard();
            switchTurn();
        }
    }

    const switchTurn = () => {
        if(playerOne.turn === true) {
            playerOne.turn = false;
            playerTwo.turn = true;
        } else {
            playerOne.turn = true;
            playerTwo.turn = false;
        }
    }
    return {
        startGame,
        switchTurn,
        playRound
    };
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


GameController.startGame();
GameController.playRound();
GameController.playRound();
GameController.playRound();