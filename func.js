//module

var gameBoard =(function(){
    let initialBoard = []
    var Board = document.querySelector('#gBoard');
    function createBoard(){
        console.log('hello');
        for(let a = 0; a < 9;a++){   
            let boardPiece = document.createElement('div');
            boardPiece.classList.add("board-piece");
            boardPiece.setAttribute('id',a);
            Board.appendChild(boardPiece);
        }

    }
    return {
        setBoard : createBoard()
    };

})();
//factory function
// let player =()=>{
// };


gameBoard.setBoard;