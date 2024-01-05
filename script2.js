const DOM = (() => {
    

    const startBtn = document.querySelector('#startBtn');
    startBtn.addEventListener('click', () => {
        GameController.startGame();
    });

    const restartBtn = document.querySelector('#restartBtn');
    restartBtn.addEventListener('click', () => {
    
        GameBoard.clearBoard();
        GameController.restartGame();
        
    })
    const addSqaures = () => {
        const sqaures =  document.querySelectorAll('.square');
        sqaures.forEach(sqaure => {
            sqaure.addEventListener('click', GameController.placeMark);
        })
    }



    return{addSqaures};
})();




const GameBoard = (() => {

    let board = ['','','','','','','','',''];
  

    const getBoard = () => board;

    const clearBoard = () => {
        board = ['','','','','','','','',''];
        printBoard();
        
    }
   
    const printBoard = () => {
        let boardHTML = '';
        board.forEach((sqaure, index) => {
            boardHTML += `<div class="square" id = "square-${index}">${sqaure}</div>`
            
        });
        
        document.querySelector('.GameBoard').innerHTML = boardHTML;
        DOM.addSqaures();
        
    };


    const updateBoard = (index, mark) => {
        board[index] = mark;
       
    }

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
        updateBoard,
        clearBoard
    };
    
})();

const GameController = (() => {
    let gameOver;
    let players = []
    let turn = 0;
    let boardValue = GameBoard.getBoard();
    
    const startGame = () => {

        const playerOne = createPlayer(document.querySelector('#player1').value, 'X', '');
        const playerTwo = createPlayer(document.querySelector('#player2').value, 'O', '');
        players = [playerOne, playerTwo];
        console.log(`${players[turn].name}'s turn!`);
        let gameOver = false;

        GameBoard.printBoard();
        

    }
    const restartGame = () => {
        turn = 0;
        gameOver = false;
        boardValue = GameBoard.getBoard();
    }
    const playRound = () => {
        switchTurn();
        GameBoard.printBoard();
        checkWin();
    };

    const placeMark = (event) => {

        let index = parseInt(event.target.id.split('-')[1]);
        if(boardValue[index] === '') { //checks to see if square is empty before placing mark
            GameBoard.updateBoard(index, players[turn].mark);
            boardValue = GameBoard.getBoard();
            console.log(boardValue);
            playRound();
        }
        console.log(`${players[turn].name}'s turn!`);
    };

    const switchTurn = () => {
        if(turn === 0){
            turn = 1;
        } else {
            turn = 0;
        }
    };

    
    
    const checkWin = () => {
    
    }

    return { playRound, switchTurn, startGame, restartGame, placeMark}
})();

function createPlayer(name, mark, type) { //Factory function to create player
    return {name, mark, type};
}





