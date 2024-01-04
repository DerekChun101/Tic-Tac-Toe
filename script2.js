const DOM = (() => {

    const startBtn = document.querySelector('#startBtn');
    startBtn.addEventListener('click', () => {
    GameController.startGame();
    });

    const addSqaures = () => {
        const sqaures =  document.querySelectorAll('.square');
        sqaures.forEach(sqaure => {
            sqaure.addEventListener('click', GameBoard.placeMark);
        })
    }

    return{addSqaures};
})();




const GameBoard = (() => {

    const board = ['','','','','','','','',''];
  

    const getBoard = () => board;

    const placeMark = (event) => {
        console.log(event.target.id);
    };

    const printBoard = () => {
        let boardHTML = '';
        board.forEach((sqaure, index) => {
            boardHTML += `<div class="square" id = "square${index}">${sqaure}</div>`
            
        });
        document.querySelector('.GameBoard').innerHTML = boardHTML;
        DOM.addSqaures();
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
})();

const GameController = (() => {
    let gameOver;
    
    let turn = 1;
    const startGame = () => {

        const playerOne = createPlayer(document.querySelector('#player1').value, 'X', '');
        const playerTwo = createPlayer(document.querySelector('#player2').value, 'O', '');
        const players = [playerOne, playerTwo];
        let gameOver = false;
        GameBoard.printBoard();

    }

    const playRound = () => {
        if(turn === 1){
           
        } else {

        }
        switchTurn();
        GameBoard.printBoard();
        checkWin();
    };

    const switchTurn = () => {
        if(turn === 1){
            turn = 2;
        } else {
            turn = 1;
        }
    };

    boardValue = GameBoard.getBoard();
    
    const checkWin = () => {
    
    }

    return { playRound, switchTurn, startGame}
})();

function createPlayer(name, mark, type) {
    return {name, mark, type};
}





