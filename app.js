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

    // This function selects the start container and places the gameBoard html in it so that the game board can render
    // onto the DOM,
    function populateBoard(){
        let startContainer = document.querySelector('.startContainer');
        startContainer.innerHTML = gameInterfaceHTML();
        boardContainer = document.querySelector(".gameBoard");
        boardContainer.innerHTML = boardSpots.map((space, index) =>{
            return `<button class="gameSpot" id="index-${index}">${space}</button>`
        }).join("");

        // EventListeners for replay button, if player selects the game is restarted from the beginning
        document.querySelector(".replayBtn").addEventListener('click', gameController.replayGame);
    }

    // This function triggers the round to appear then populates the game board once the round animation completes
    function render(){
        renderRound();
        setTimeout(()=> populateBoard(), 4000);
    }

    //   this function handles the logic to add a trophy img to the users score box
    function givePlayerTrophy(player){
        let player1Score = gameController.getPlayer1Score();
        let player2Score = gameController.getPlayer2Score();
        let playerTrophyStr ='';

        if(player === 'player1'){
            if(player1Score === 0){
             return '';
            }else{
                for(let numOfTrophiesStr = 1;numOfTrophiesStr<=player1Score; numOfTrophiesStr++){
                    playerTrophyStr = playerTrophyStr + '<div class="trophyPicContainer"><img src="img/3dTrophie.png" alt="picture of trophy"></div>';
                }
                console.log(playerTrophyStr);
                return playerTrophyStr;
            }
        }
        else if(player === 'player2'){
                if(player2Score === 0){
                    return '';
                }else{
                    for(let numOfTrophiesStr = 1;numOfTrophiesStr<=player2Score; numOfTrophiesStr++){
                        playerTrophyStr += `<div class="trophyPicContainer"><img src="img/3dTrophie.png" alt="picture of trophy"></div>`;
                    }
                    console.log(playerTrophyStr)
                    return playerTrophyStr;
                }
        }
    }



    // this function returns the html code for the gameboard, this function is to be used in the populateBoard function
    function gameInterfaceHTML(){
        let activePlayer = gameController.getActivePlayer();
        return `<header>
             <div class="inGameLogo">
                  Tic-Tac-Toe
               </div>
             <div class="turnIndicator">${activePlayer.marker}'s Turn</div>
              <button type="button" class="replayBtn"><i class="fa-solid fa-rotate-right"></i></button>
           </header>
        <section class="gameBoardContainer">
           <main class="gameBoard">
           </main>
       </section>
        <footer>
        <section class="player1ScoreContainer">
            <h1 class="player1Header">Player 1</h1>
            <div class="player1WinContainer">
                ${givePlayerTrophy('player1')}
            </div>
            </section>
           <section class="player2ScoreContainer">
           <h1 class="player2Header">Player 2</h1>
           <div class="player2WinContainer">
                ${givePlayerTrophy('player2')}
           </div>
           </section>
        </footer>`
    }

    // this function takes the index of the selected gamespot and grabs the marker of the active player, once
    // the player selects a spot the index is retrieved from the gamespot, the users marker is taken from their player objecvt
    // and a text node is created with it, lastly the marker node is placed in the selected boardspot to appear in the DOM

    function markPlayerMove(spotIndex, playerMarker){
        // takes the boardspot array and add the players marker in it  to document where the player has chosen to move
        boardSpots[spotIndex] = playerMarker;

        // creates a text node to add to the gamespot of the active players marker (X or O )
        let mark = document.createTextNode(`${playerMarker}`);

        // selects the space that the user selected and adds the mark in that spot
        document.getElementById(`index-${spotIndex}`).append(mark);

        console.log(gameController.getActivePlayer());
    }


    // returns the gamespot arr that keeps track or each places move and where it is placed on the gameboard
    function getBoardSpots(){
        return boardSpots;
    }

    // function resets/empties the gameboard array  to get ready for a new round and renders a new blank game board,
    // this should be used with the next round function
    function resetBoardSpots(){
        boardSpots = ["","","","","","", "","",""];
        render();
    }

    return{
        render,
        markPlayerMove,
        getBoardSpots,
        resetBoardSpots,
        populateBoard
    }
})()


gameController = (function(){

    // Game Logic variables

    let player1 = Player( "X");
    let player2 = Player( "O");
    let activePlayer = player1;
    let turn = 1;
    let gameRound = 1;
    let player1Score = 0;
    let player2Score = 0;


    // allows user to start the game, the round is rendered then the game board will appear,
    // once the board has appeared the event listeners are set onto each gamespot waiting for players to select
    // a move
    function startGame(renderBoard,setListeners){
        gameBoard.render();
        setTimeout(()=> setGameSpotsEventListeners(),4000);

    }

    // This is the replay button functionality, its resets all variables such as the round, turn, playerscores to
    // the baseline to start an entirely new game
    function replayGame(){
        turn = 1;
        gameRound = 1;
        player1Score = 0;
        player2Score = 0;
        gameBoard.resetBoardSpots();
        gameBoard.render();
        setTimeout(()=> setGameSpotsEventListeners(),5000);
    }

    // this function selects all the board's game spots and attaches eventListeners to each one
    // waiting for the player to select where they would like to place their move
    function setGameSpotsEventListeners(){
        let boardSpots =  document.querySelectorAll(".gameSpot");

        boardSpots.forEach((spot)=>{
            spot.addEventListener("click", updateGameBoard);
        });
    }

    // this function sets an event listener for each gamespot, that will remove the event listener to update the board
    // for selected spot  this prevents the players from being able to trigger another event to update the spot
    // once it has initially been selected and marked

    function removeGameSpotsEventListeners(){
        let boardSpots = document.querySelectorAll(".gameSpot");
        boardSpots.forEach((spot)=>{
            spot.removeEventListener("click", updateGameBoard);
        });
    }

    // function replaces the turnIndicator elements with the updated players Marker to display who's move
    // it is
    function setTurnIndicatorHTML(){
        document.querySelector('.turnIndicator').innerHTML = `${activePlayer.marker}'s Turn`
    }


    // function determines which players move it is based on the turn variable, depending on the turn value
    // the activePlayer variable is updated
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

    // function gets player 1 score
    function getPlayer1Score() {
        return player1Score;
    }

    // function gets player 2 score
    function getPlayer2Score(){
        return  player2Score;
    }
    // function gets the value of the round that the users are in
    function getRound(){
        return gameRound;
    }
    // this function adds 1 to the current rounds value;
    function setRound(){
        gameRound++;
    }
    // this function adds 1 to the  player 1s score;
    function setPlayer1Score() {
        player1Score++;
    }
    // this function adds 1 to player 2s score;
    function setPlayer2Score() {
        return player2Score++;
    }

    // this function gets the value of the activePlayer variable
    function getActivePlayer(){
        return activePlayer;
    }
    // this function creates an element and its content then appends it to the startContainer to be displayed
    // in the DOM
    function createGameWinnerOverlay(player){
        let gameWinnerOverlay = document.createElement('div');

        gameWinnerOverlay.innerHTML = `<div class="popout">
                <div class="gameWinnerContent">${player} has Won the game</div
                </div>`

        document.querySelector('.startContainer').appendChild(gameWinnerOverlay);
    }

    // this function determines if player 1 or player 2 has won and creates the overlay to display the winner in the
    // DOM as an Overlay
    function declareGameWinner(){
        if(player1Score === 3){
            gameBoard.populateBoard();
            setTimeout(()=>createGameWinnerOverlay('Player 1'),2000);
        }else{
            gameBoard.populateBoard();
            setTimeout(()=>createGameWinnerOverlay('Player 2'),2000);
        }
    }

    // if player has there marker in the specified winning combinations a point is added to the players score
    // and a round is added to the roundcounter, after the round has been added a function to begine the next round
    // is in invoked

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

    // this function takes the players marker value and looks to see if they have three in a row on
    // the game board if the player marker is found in a combination then a point is added to the players score
    // or the players turn is ended
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


    // function that keeps track of the turn number , if the turn value is less that the maximum number of turns a
    // turn counter is increased by 1 , once maximum turn count has been reached without a winner , tie is logged
    // logged to console and the round is over

    function endTurn(){
        if( turn < 9 ){

            turn++;
             activePlayer = whosTurnIsIt();
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
            gameBoard.resetBoardSpots();
            setTimeout(()=> setGameSpotsEventListeners(),4000);
        }else{
            removeGameSpotsEventListeners();
            declareGameWinner();
        }
    }

    // function logs that the game/round is over
    function gameOver(){
        console.log("the game is over");
        nextRound();
        return true;
    }

    // function logs that the round resulted in a draw
    function playersTie(){
        console.log("It Was a Draw, Next Round!");
    }

    // this function chooses the marker that the player is using an add classes to style the marker
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

    // updates the users move on the game board , the function determines which players turn it is then gets the
    // index of the spot that and marks it with the players marker, once the spot has been marked  the event listener for
    // mark is removed and a decison is determined if the users has won the game
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
        whosTurnIsIt();
        setTurnIndicatorHTML();

    }



    return{
        startGame,
        getRound,
        getActivePlayer,
        getPlayer1Score,
        getPlayer2Score,
        updateGameBoard,
        chooseMarker,
        replayGame
    }
})()

// Player factory function
function Player( marker){
    return {
        marker
    }
}

// EventListener for when player chooses the marker that they would like to use and  click the start game button
document.querySelector(".startBtn").addEventListener('click', gameController.startGame);
document.querySelector('.markerContainer').addEventListener('click',gameController.chooseMarker);











