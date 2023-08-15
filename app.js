gameBoard = (function(){
    let boardSpots=["","","","","","", "","",""]
    let boardContainer;
    let boardHTML = "";

     function render(){
        boardContainer = document.querySelector(".gameBoard");

        boardSpots.forEach((space, index) =>{
            boardHTML+=`<div class="gameSpot" id="index-${index}">${space}</div>`
        });
        boardContainer.innerHTML = boardHTML;
        console.log(boardContainer)
    }



    return{
        render,
    }
})()


gameController = (function(){
    let player1 = Player("Darren", "X");
    let player2 = Player("Brenda", "O");
    let players = [player1, player2];

 function start(){
    gameBoard.render();
     let boardSpots = document.querySelectorAll(".gameSpot");
     boardSpots.forEach((spot)=>{
         spot.addEventListener("click", (e)=>{
             console.log(parseInt(e.target.id.split("index-")[1]))
         })
     })
}



    return{
        start
    }
})()


function Player(name, marker){
    return {
        name,
        marker
    }
}

document.querySelector(".startBtn").addEventListener("click", gameController.start)

