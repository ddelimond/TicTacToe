gameBoard = (function(){
    let boardSpots=["","","","","","", "","",""]
    let boardContainer;
    let boardHTML = "";

     function render(){
        boardContainer = document.querySelector(".gameBoard");

         boardContainer.innerHTML = boardSpots.map((space, index) =>{
                return `<div class="gameSpot" id="index-${index}">${space}</div>`
        }).join("");
    }

    function markPlayerMove(spotIndex, playerMarker){
      boardSpots[spotIndex] = playerMarker;
      let mark = document.createTextNode(`${playerMarker}`);
      document.getElementById(`index-${spotIndex}`).append(mark);
     }

     function getBoardSpots(){
      return boardSpots;
     }

    function resetBoardSpots(){
         boardSpots = ["","","","","","", "","",""];
         render();
    }




    return{
        render,
        markPlayerMove,
        getBoardSpots,
        resetBoardSpots
    }
})()


gameController = (function(){
    let player1 = Player("Darren", "X");
    let player2 = Player("Brenda", "O");
    let activePlayer;
    let turn = 1;
    let gameRound = 1;
    let player1Score = 0;
    let player2Score = 0;

 function startGame(){
        gameBoard.render();
        setGameSpotsEventListeners();
}
function replayGame(){
    turn = 1;
    gameRound = 1;
    player1Score = 0;
    player2Score = 0;
    gameBoard.resetBoardSpots();
    gameBoard.render();
    setGameSpotsEventListeners();
}


function setGameSpotsEventListeners(){
    let boardSpots = document.querySelectorAll(".gameSpot");
    boardSpots.forEach((spot)=>{
        spot.addEventListener("click", updateGameBoard);
    });
}

    function removeGameSpotsEventListeners(){
        let boardSpots = document.querySelectorAll(".gameSpot");
        boardSpots.forEach((spot)=>{
            spot.removeEventListener("click", updateGameBoard);
        });
    }


function whosTurnIsIt(){
     switch(turn){
         case 1:
             activePlayer = player1;
             break;
         case 2:
             activePlayer = player2;
             break;
         case 3:
             activePlayer = player1;
             break;
         case 4:
             activePlayer = player2;
             break;
         case 5:
             activePlayer = player1;
             break;
         case 6:
             activePlayer = player2;
             break;
         case 7:
             activePlayer = player1;
             break;
         case 8:
             activePlayer = player2;
             break;
         case 9:
             activePlayer = player1;
             break;
     }
}


function getPlayer1Score() {
    return player1Score;
}


function getPlayer2Score(){
        return  player2Score;
 }

 function getRound(){
     return gameRound;
 }

    function setRound(){
         gameRound++;
    }

    function setPlayer1Score() {
         player1Score++;
    }

    function setPlayer2Score() {
        return player2Score++;
    }

    function declareGameWinner(){
     player1Score === 3?console.log(`${player1.name} has won the game`):console.log(`${player1.name} has won the game`);
    }


    function winningConditionalStatement(index1,index2,index3, marker){
        let markedSpotsArr = gameBoard.getBoardSpots();
        return gameBoard.getBoardSpots()[index1] === marker && gameBoard.getBoardSpots()[index2] === marker && gameBoard.getBoardSpots()[index3] === marker;
    }

    function addToWinningPlayerScore(marker){
         if (player1.marker === marker) {
             setPlayer1Score();
             let round = getRound();
             console.log(`the winner of round ${round} was ${player1.name}`);
             nextRound();
         }
         else {
             setPlayer2Score();
             let round = getRound();
             console.log(`the winner of round ${round} was ${player2.name}`);
             nextRound();
         }

    }

    function determineRoundWinner(playerMarker) {
        if (winningConditionalStatement(0, 1, 2, playerMarker)) {
            addToWinningPlayerScore(playerMarker);
        } else if (winningConditionalStatement(3, 4, 5, playerMarker)) {
            addToWinningPlayerScore(playerMarker);
        } else if (winningConditionalStatement(6, 7, 8, playerMarker)) {
            addToWinningPlayerScore(playerMarker);
        } else if (winningConditionalStatement(0, 3, 6, playerMarker)) {
            addToWinningPlayerScore(playerMarker);
        } else if (winningConditionalStatement(1, 4, 7, playerMarker)) {
            addToWinningPlayerScore(playerMarker);
        } else if (winningConditionalStatement(2, 5, 8, playerMarker)) {
            addToWinningPlayerScore(playerMarker);
        } else if (winningConditionalStatement(0, 4, 8, playerMarker)) {
            addToWinningPlayerScore(playerMarker);
        } else if (winningConditionalStatement(2, 4, 6, playerMarker)) {
            addToWinningPlayerScore(playerMarker);
        } else {

            endTurn();
        }
    }


    function endTurn(){
        if( turn < 9 ){
            turn++;
        }
        else{
            playersTie();
            gameOver();
        }
    }

    function nextRound(){
        if(player1Score<3 && player2Score<3){
            setRound();
            turn = 1;
            console.log(getPlayer2Score());
            console.log(getPlayer1Score());
            gameBoard.resetBoardSpots();
            setGameSpotsEventListeners();
        }else{
            removeGameSpotsEventListeners();
            declareGameWinner();
        }
    }

    function gameOver(){
        console.log("the game is over");
        nextRound();
        return true;
    }


    function playersTie(){
        console.log("It Was a Draw, Next Round!");
    }


    function updateGameBoard(e){
     whosTurnIsIt();
     let selectedSpotIndex = parseInt(e.target.id.split("-")[1]);
     let activePlayerMarker = activePlayer.marker;
     let gameBoardSpot = e.target;
     gameBoard.markPlayerMove(selectedSpotIndex,activePlayerMarker);
     gameBoardSpot.classList.add("marked");
     gameBoardSpot.removeEventListener('click',updateGameBoard);
     determineRoundWinner(activePlayerMarker);
    }



    return{
        startGame,
        getRound,
        getPlayer1Score,
        getPlayer2Score,
        updateGameBoard,
        replayGame
    }
})()


function Player(name, marker){
    return {
        name,
        marker
    }
}

document.querySelector(".startBtn").addEventListener("click", gameController.startGame);
document.querySelector(".replayBtn").addEventListener("click", gameController.replayGame);










