//factory functions
let Player =(number,currentBlock)=>{
    let _playerInput = ["X","O"]
    
    let playerVal = () => {
        let input;
        number == 0? input = _playerInput[number]:input = _playerInput[number];
        currentBlock.textContent = input ;
    }
   
return {playerVal};

};

//module
let gameBoard =(function(){
    let _initialBoard = []
    let _Board = document.querySelector('#gBoard');
   
   
    //create the board
    function _createBoard(){
        let arrpos = 0;
        for(let boardNumber = 0; boardNumber < 9;boardNumber++){   
            let boardPiece = document.createElement('div');
            boardPiece.classList.add("board-piece");
            boardPiece.setAttribute('id',boardNumber);
            _Board.appendChild(boardPiece);
            var obj = {};
            obj["boardNumber"] = boardNumber
            obj["value"] = "";   
            _initialBoard.push(obj);
        }
    };
    // current player inputs
    function _currentPlayer(){
        let _boardPiece = document.querySelectorAll('.board-piece');
        _boardPiece.forEach(piece => piece.addEventListener('click',_insertValue));
    }

    //insert the value of the player
    function _insertValue(event){
        let currentPiece = document.getElementById(`${event.target.id}`)
        let cplayer;
        let _players = [{ "player1": Player(0,currentPiece)},{"player2": Player(1,currentPiece)}]
        
        //condition below checks if the lenght of the board is odd or even to for player inputs
        !(_initialBoard.filter(bpiece => bpiece.value == "").length % 2 ==  0)? cplayer = 0: cplayer=1;
        _players[cplayer][`player${cplayer+1}`].playerVal();//_players[index][objectkey].factoryfunction
        _initialBoard[event.target.id]["value"] = currentPiece.textContent;
    };

    //render function 
      function renderGame(){
          //create the 3x3 board
        _createBoard();
        console.log("hello");
        _currentPlayer();

    };

    return {
        startGame : renderGame(),
        board : _initialBoard
    };

})();




gameBoard.startGame;




