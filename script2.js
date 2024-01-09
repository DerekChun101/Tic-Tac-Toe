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
    const resultMsg = document.querySelector('.result');

    const resetDOM = () => {
        resultMsg.innerHTML = '';
    }
    
    const getResult = (name) => { //Display result msg
        if(name === 'tie') {
            resultMsg.innerHTML = 'TIE';
        } else {
            resultMsg.innerHTML = `${name} wins!`;
        }

    }
    const addSqaures = () => { //Give sqaures event listeners
        const sqaures =  document.querySelectorAll('.square');
        sqaures.forEach(sqaure => {
            sqaure.addEventListener('click', GameController.placeMark);
        })
    }



    return{addSqaures, getResult, resetDOM};
})();




const GameBoard = (() => {

    let board = ['','','','','','','','',''];

    const getBoard = () => board; //get board value

    const clearBoard = () => {
        board = ['','','','','','','','',''];
    };
   
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
    let turn = 0; //determines whose turn it is
    let boardValue;
    const playerOneInput =  document.querySelector('#player1');
    const playerTwoInput =  document.querySelector('#player2');

    const startGame = () => {
        if (gameOver === false) { //Prevents repressing start button when game is not over
            return;
        };

        GameBoard.clearBoard(); //When game starts clear the board
        boardValue = GameBoard.getBoard();
        DOM.resetDOM();

       
        if(playerOneInput.value === '' || playerTwoInput.value === '')  {
            alert('Please enter names');
            return;
        } else  {
            const playerOne = createPlayer(document.querySelector('#player1').value, 'X', ''); //Creates two players using and place into array
            const playerTwo = createPlayer(document.querySelector('#player2').value, 'O', '');
            players = [playerOne, playerTwo];
        }
        

        console.log(`${players[turn].name}'s turn!`);
        gameOver = false;

        GameBoard.printBoard();
        

    }
    const restartGame = () => { //reset game
        turn = 0;
       
        gameOver = true;
        boardValue = GameBoard.getBoard();
        DOM.resetDOM();
        startGame();
    }

    const playRound = () => { //after each placment checks the state of the board.
        if(checkWin(boardValue)) {
            gameOver = true;
            DOM.getResult(players[turn].name);
            GameBoard.printBoard();
            return;
        } else if(checkTie(boardValue)){
            gameOver = true;
            DOM.getResult('tie');
            GameBoard.printBoard();
            return;
        };
        switchTurn();
        GameBoard.printBoard();
        
    };

    const placeMark = (event) => {
        
        let index = parseInt(event.target.id.split('-')[1]);
        if(gameOver) { //Prevents placing more markers when the game is over
            return;
        }
        if(boardValue[index] === '') { //checks to see if square is empty before placing mark
            GameBoard.updateBoard(index, players[turn].mark);
            boardValue = GameBoard.getBoard();
            console.log(boardValue);
            playRound();
        } else return;
        
    };

    const switchTurn = () => {
        if(turn === 0){
            turn = 1;
        } else {
            turn = 0;
        }
        console.log(`${players[turn].name}'s turn!`);
    };

    
    const checkTie = (board) => {
        return board.every(cell => cell !=='');
    }
    const checkWin = (board) => {
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

        for(let i = 0; i< winConditions.length; i++){
            const[a, b, c] = winConditions[i];
            if(board[a] && board[a] === board[b] && board[a] === board[c]) { //checks if board matches win condition
                return true;
            }
        }
        return false;   
    }

    return { playRound, switchTurn, startGame, restartGame, placeMark}
})();

function createPlayer(name, mark, type) { //Factory function to create player
    return {name, mark, type};
}





