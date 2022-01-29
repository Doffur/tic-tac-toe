//module

let gameBoard =(function(){
    let initialBoard = []
    let _Board = document.querySelector('#gBoard');

    function createBoard(){
        console.log(typeof {'1':1});
        let arrpos = 0;
        for(let a = 0; a < 9;a++){   
            let boardPiece = document.createElement('div');
            boardPiece.classList.add("board-piece");
            boardPiece.setAttribute('id',a);
            _Board.appendChild(boardPiece);
            var obj = {}
            obj[a] = ""   
            initialBoard.push(obj);

        }
        
    }
 

    return {
        wholeBoard : initialBoard,
        setBoard : createBoard()
    };

})();


let Player =(number)=>{
    let playerInput = ["X","O"]
   
    function insertValue(event){
        let currentPiece = document.getElementById(`${event.target.id}`)
        currentPiece.textContent = `${playerInput[number]}`;
    }   
    return {
        trigger : insertValue()

    };

};


gameBoard.setBoard;


//player alternate input


function gameStart(){
   
    console.log(e);


}
let _boardPiece = document.querySelectorAll('.board-piece');
_boardPiece.forEach(piece => piece.addEventListener('click',gameStart))
