gameBoard = (function(){


    // GameBoard Variables

    let boardSpots=["","","","","","", "","",""]
    let boardContainer;
    let boardHTML = "";



    // Render round function creates an element to display the players current round on the DOM
    function renderRound(){

        let roundElement = `<div class="popout">
                <div class="roundContent">Round ${gameController.getRound()}</div
                </div>`

        document.querySelector('.startContainer').innerHTML = roundElement;
    }

    // This function selects the start container and places the gameBoard in it,
    function populateBoard(){
        let startContainer = document.querySelector('.startContainer');
        startContainer.innerHTML = gameBoardHTML();
        boardContainer = document.querySelector(".gameBoard");
        boardContainer.innerHTML = boardSpots.map((space, index) =>{
            return `<button class="gameSpot" id="index-${index}">${space}</button>`
        }).join("");

        // EventListeners for replay button
        document.querySelector(".replayBtn").addEventListener('click', gameController.replayGame);
    }

    // This function triggers the round to appear then populates the game board once the round animation completes
    function render(){
        renderRound();
        setTimeout(populateBoard,4000);
    }

    // this function returns the html code for the gameboard, this function is to be used in the populateBoard function
    function gameBoardHTML(){
        return `<section class="gameBoardContainer">
        <header>
             <div class="logoContainer">
                  <img src="" class="logo" alt="">
               </div>
             <div class="turnIndicator">players marker Turn</div>
              <button type="button" class="replayBtn"><i class="fa-solid fa-rotate-right"></i></button>
           </header>
           <main class="gameBoard">
       </main>
       </section>`
    }

    // this function takes the index of the selected gamespot and grabs the marker of the active player, once
    // the player selects a spot the index is retrieved from the gamespot, the users marker is taken from their player objecvt
    // an a text node is created with it, lastly the marker node is placed in the selected boardspot to appear in the DOM

    function markPlayerMove(spotIndex, playerMarker){
        // takes the boardspot array and add the players marker in it  to document where the player has chosen to move
        boardSpots[spotIndex] = playerMarker;

        // creates a text node to add to the gamespot of the active players marker (X or O )
        let mark = document.createTextNode(`${playerMarker}`);

        // selects the space that the user selected and adds the mark in that spot
        document.getElementById(`index-${spotIndex}`).append(mark);
    }


    // returns the gamespot arr that keeps track or each places move and where it is placed on the gameboard
    function getBoardSpots(){
        return boardSpots;
    }

    // function that resets an empties the gameboard arr  to get ready for a new round and renders a new blank, this should be used with
    // the next round function
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
        setTimeout(gameBoard.render,500);
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


    function chooseMarker(e){
        let selectedMarker = e.target;


        if(selectedMarker.classList.contains('selected') === false && selectedMarker.textContent === 'x'){

            document.querySelector('.O').classList.remove('selected');
            document.querySelector('.O').style = 'rgb(163, 73, 59)';
            selectedMarker.style.background = 'rgb(255,255,255)';
            selectedMarker.classList.add('selected');
            console.log(selectedMarker.textContent);

        }else if(selectedMarker.classList.contains('selected') === false && selectedMarker.textContent === 'o'){
            document.querySelector('.X').classList.remove('selected');
            document.querySelector('.X').style = 'rgb(163, 73, 59)';
            selectedMarker.style.background = 'rgb(255,255,255)';
            selectedMarker.classList.add('selected');
            console.log( selectedMarker.textContent);

        }else{

            console.log(selectedMarker.textContent);

        }
    }


    function updateGameBoard(e){
        whosTurnIsIt();
        let selectedSpotIndex = parseInt(e.target.id.split("-")[1]);
        let activePlayerMarker = activePlayer.marker;
        let gameBoardSpot = e.target;

        gameBoard.markPlayerMove(selectedSpotIndex,activePlayerMarker);
        gameBoardSpot.classList.add("marked");
        gameBoardSpot.classList.add(`${activePlayerMarker.toUpperCase()}`)
        gameBoardSpot.removeEventListener('click',updateGameBoard);
        determineRoundWinner(activePlayerMarker);
    }



    return{
        startGame,
        getRound,
        getPlayer1Score,
        getPlayer2Score,
        updateGameBoard,
        chooseMarker,
        replayGame
    }
})()


function Player(name, marker){
    return {
        name,
        marker
    }
}

// EventListener for when player chooses the marker that they would like to use and  click the start game button
document.querySelector(".startBtn").addEventListener('click', gameController.startGame);
document.querySelector('.markerContainer').addEventListener('click',gameController.chooseMarker);











