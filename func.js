//factory functions
let Player =(number,currentBlock,inputArray,boardValue)=>{
    let _playerInput = ["X","O"]
    let playerVal = () => {
        let input;
        number == 0? input = _playerInput[number]:input = _playerInput[number];
        //check if thers a value
        if( inputArray["value"] == ""){
            currentBlock.textContent = input ; //input the value in the current clicked box
            inputArray["value"] =  currentBlock.textContent;
            if(boardValue+1 >= 5){
                _checkBoard();
            }
        }else{
            gameBoard.inputAgain;
        }

        
            
    }

    let _checkBoard = ()=>{
        let board = gameBoard.board

        //returns the main index of the current input
        let mainIndex = ()=>{
            let row,col,indx,indx2;
                for(let count=0;count<3;count++){
                    indx = board[count].filter(piece => piece == inputArray);
                    indx2 = board[count].findIndex(piece => piece === inputArray);
                    
                    if(indx.length == 1 && indx2[0] != -1){
                       
                        row = count
                        col = indx2 
                        console.log(`row ${row} col ${col}`);
                        break;
                    }
                } 
            return [row,col];
                
        }
        //check row and col
        let row=0,col=0;
        for(let counter = mainIndex()[0];counter < mainIndex()[0]+1;counter++){
            for(let count=0;count < 3;count++){
                if(board[counter][count]["value"] == _playerInput[number]){
                   row +=1;//increase the value if the per col value is equal
                }
                if(board[count][mainIndex()[1]]["value"] == _playerInput[number]){
                    col +=1;//increase the value if the per col value is equal
                }
            }
            if(row == 3){
                console.log(board[counter]);
                console.log(`winner is ${number+1}`);
                }
            else if(col == 3){
                    console.log(board[counter]);
                    console.log(`winner is ${number+1}`);
                    }
        }
        //end of checking row and col

        //check X 
        if(inputArray["boardNumber"]%2==0){
            let leftX = 0,rightX = 0;
            let xrange = 2;
            console.log("hello");
            for(let counter=0;counter<2;counter++){
               for(let count = 0; count<3;count++){
                   //checks the left of X
                    if(board[count][count]["value"] == _playerInput[number] && counter == 0){
                          leftX+=1;      
                    } 
                    //checks the right of X
                    else if(board[count][xrange]["value"] == _playerInput[number]){
                          rightX+=1;    
                          xrange-=1;
                    }
               }
               if(leftX == 3){
                    console.log("X");
                    console.log(`winner is ${number+1}`);
                    break;
                }
                else if(rightX == 3){
                    console.log("Y");
                    console.log(`winner is ${number+1}`);
                }
            }
        }
        //end of check X 
    }

return {playerVal};

};


//module
let gameBoard =(function(){
    let _mainBoard = []
    let _Board = document.querySelector('#gBoard');
    //*create the board
        function _createBoard(){
            let arrpos = 0;
            let initialBoard = []

            for(let boardNumber = 0; boardNumber < 9;boardNumber++){   
                let boardPiece = document.createElement('div');
                boardPiece.classList.add("board-piece");
                boardPiece.setAttribute('id',boardNumber);
                _Board.appendChild(boardPiece);
                var obj = {};
                obj["boardNumber"] = boardNumber
                obj["value"] = "";
                initialBoard.push(obj);   
                if([2,5,8].includes(boardNumber)){
                    _mainBoard.push(initialBoard); 
                    initialBoard = [];
                }
                
            }
        };
  
    //*insert the value of the player
        function _insertValue(event){
            let currentPiece = document.getElementById(`${event.target.id}`)
            let currentPlayer;
            let valueInput = () =>{
                let check;
                for(let count = 0 ;count< 3;count++){
                _mainBoard[count].filter(val =>{
                        for(let key in val){
                            if(val[key] == event.target.id){
                                check = val;
                                break;
                            }
                        }
                }); 
                }
                return check;
            }

            //condition below checks if the lenght of the board is odd or even to determine who will input
            let inputted = 0;
            _mainBoard.filter(bpiece => {
                for(let count=0;count<bpiece.length;count++){
                    bpiece[count]["value"].length == 1?inputted+=1:inputted+=0; 
                }
            });
            inputted%2 == 0?currentPlayer = 0: currentPlayer=1;

            let _players = [
                            { "player1": Player(0,currentPiece,valueInput(),inputted)},
                            {"player2": Player(1,currentPiece,valueInput(),inputted)}
                           ]
            //_players[index][objectkey].factoryfunction 
            _players[currentPlayer][`player${currentPlayer+1}`].playerVal();
        };
    
    //*players insert value
      function playerInsertValue(){
        let _boardPiece = document.querySelectorAll('.board-piece');
        _boardPiece.forEach(piece => piece.addEventListener('click',_insertValue));
        }

    //*render function 
      function renderGame(){
          //create the 3x3 board
        _createBoard();
        playerInsertValue();

    };
    //return
    return {
        startGame : renderGame(),
        inputAgain : playerInsertValue(),
        board : _mainBoard
    };
})();


//initiates the game
gameBoard.startGame;