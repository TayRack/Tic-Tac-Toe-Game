function resetGameStatus() {
    activePlayer = 0;
    currentRound= 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML = 'You Won, <span id="winner-name">PLAYER NAME</span>!';
    gameOverElement.style.display = 'none';


    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;    //reset gameboard 
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex]; 
            gameBoardItemElement.textContent = '';   
            gameBoardItemElement.classList.remove('disabled'); 
            gameBoardIndex++;
        }
    }
}

function startNewGame() {

    if (players[0].name === '' || players[1].name ==='') {
        alert('Please set custom player names for both players!');
        return;
    }

    resetGameStatus()

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = "block";

  
}

function switchPlayer() {
 if (activePlayer === 0) {
    activePlayer = 1;
     } else {
        activePlayer =0;
    }

    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    //if selectedField is not a Li
    if(event.target.tagName !== 'LI' || gameIsOver) {
        return;
    }

    const selectedField = event.target;

    // To match with gameData array
    const selectedColumn = selectedField.dataset.col-1;
    const selectedRow = selectedField.dataset.row-1;


    // If the selectedField has been selected previously
    if (gameData[selectedRow][selectedColumn] > 0) {
        alert('Please select an empty field!')
        return;
    }
    //Add symbol and styling to selectedField
    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add('disabled');

    gameData[selectedRow][selectedColumn] = activePlayer+1; // add 1  or 2 to gameData
    console.log(gameData);

    const winnerId = checkForGameOver();

    if (winnerId !== 0) {
      endGame(winnerId); 
    }

    currentRound++;
    console.log(winnerId);
    
    switchPlayer();


    function checkForGameOver() {
    //For i rows of all columns if the value is ==== in all 3 rows then return winner
        for (let i = 0; i< 3; i++) {
            if (
            gameData[i][0] > 0 && 
            gameData[i][0] === gameData[i][1] &&
            gameData[i][0] == gameData[i][2]
            ) {
            return gameData[i][0];
            }
        }

    //For i columns of eall rows if the value is ==== in all 3 columns then return winner
        for (let i = 0; i< 3; i++) {
            if (
            gameData[0][i] > 0 && 
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] == gameData[2][i]
            ) {
            return gameData[0][i];
            }      
        }

        // If all symbols is the same diagnolly from top left to bottom right
        if (
            gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[0][0] === gameData[2][2]
        ) {
                return gameData[0][0];
        }

        // If all symbols is the same diagnolly from bottom left to top right
        if (
            gameData[2][0] > 0 &&
        gameData[2][0] === gameData[1][1] &&
        gameData[2][0] === gameData[0][2]
        ) {
            return gameData[2][0];
        }

        //If all fields are selected with out a winner 
        if (currentRound === 9) {
            return -1;
        }

        return 0;
    }  
}

function endGame(winnerId) {
    gameIsOver = true;
    gameOverElement.style.display = "block";

    if (winnerId > 0) {
       const winnerName = players[winnerId-1].name;
       gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
       gameOverElement.firstElementChild.textContent = "It\'s a draw!";
    }
}

