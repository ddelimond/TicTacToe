gameBoard = (function(){
    let boardSpots=["","","","","","", "","",""]
    let boardContainer;
    let boardHTML = "";

     function render(){
        boardContainer = document.querySelector(".gameBoard");

         boardContainer.innerHTML = boardSpots.map((space, index) =>{
                return `<button class="gameSpot" id="index-${index}">${space}</button>`
        }).join("");
    }


    function markPlayerMove(spotIndex, playerMarker){
      boardSpots[spotIndex] = playerMarker;
      console.log(boardSpots);
    }



    return{
        render,
        markPlayerMove
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
    gameBoard.markPlayerMove(selectedSpotIndex,activePlayerMarker);
    gameBoard.render();
    setGameSpotsEventListeners();
    endTurn();
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
