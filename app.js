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

document.querySelector(".startBtn").addEventListener("click", gameController.start)

