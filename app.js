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

function getMarkedSpotsArr(){
      return boardSpots;
}

    return{
        render,
        markPlayerMove,
        getMarkedSpotsArr
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

 function start(){
    gameBoard.render();
    setGameSpotsEventListeners();
}


function setGameSpotsEventListeners(){
    let boardSpots = document.querySelectorAll(".gameSpot");
    boardSpots.forEach((spot)=>{
        spot.addEventListener("click", updateGameBoard);
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

function gameOver(){
     return true;

    }

function endTurn(){
     turn<9?turn++:gameOver();
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
        return gameRound++;
    }




function updateGameBoard(e){
     whosTurnIsIt();
     let selectedSpotIndex = parseInt(e.target.id.split("-")[1]);
     let activePlayerMarker = activePlayer.marker;
     let gameBoardSpot = e.target;
     gameBoard.markPlayerMove(selectedSpotIndex,activePlayerMarker);
     gameBoardSpot.classList.add("marked");
     gameBoardSpot.removeEventListener('click',updateGameBoard);
    endTurn();
    determineWinner(activePlayerMarker);
    }


    function winningConditionalStatement(index1,index2,index3, marker){
        let markedSpotsArr = gameBoard.getMarkedSpotsArr();
        return gameBoard.getMarkedSpotsArr()[index1] === marker && gameBoard.getMarkedSpotsArr()[index2] === marker && gameBoard.getMarkedSpotsArr()[index3] === marker;
    }

    function getWinnersName(marker){
     return player1.marker === marker? console.log(`Winner is ${player1.name}`):console.log(`Winner is ${player2.name}`);
    }

    function determineWinner(playerMarker){
    console.log(playerMarker)
     if(winningConditionalStatement(0,1,2, playerMarker)){
     return getWinnersName(playerMarker);
    }
    else if(winningConditionalStatement(3,4,5, playerMarker)){
        return getWinnersName(playerMarker);
     }
     else if(winningConditionalStatement(6,7,8, playerMarker)){
         return getWinnersName(playerMarker);
     }
     else if(winningConditionalStatement(0,3,6, playerMarker)){
         return getWinnersName(playerMarker);
     }
     else if(winningConditionalStatement(1,4,7, playerMarker)){
         return getWinnersName(playerMarker);
     }
     else if(winningConditionalStatement(2,5,8, playerMarker)){
         return getWinnersName(playerMarker);
     }
     else if(winningConditionalStatement(0,4,8, playerMarker)){
         return getWinnersName(playerMarker);
     }
     else if(winningConditionalStatement(2,4,6, playerMarker)){
         return getWinnersName(playerMarker);
     }
}


    return{
        start,
        getRound,
        getPlayer1Score,
        getPlayer2Score,
        updateGameBoard
    }
})()


function Player(name, marker){
    return {
        name,
        marker
    }
}

document.querySelector(".startBtn").addEventListener("click", gameController.start)










