//factory functions
let Player =(number,currentBlock,inputArray,boardValue)=>{
    let _playerInput = ["X","O"]

    let _patterns = [[[0,1,2],[0,3,6],[0,4,8]],
                     [[1,4,7]],
                     [[2,4,6],[2,5,8]],
                     [[3,4,8]],
                     [[6,7,8]]];

    let playerVal = () => {
        let input;
        number == 0? input = _playerInput[number]:input = _playerInput[number];
        //check if thers a value
        if( inputArray["value"].length == 0){
            currentBlock.textContent = input ; //input the value in the current clicked box
            inputArray["value"] =  currentBlock.textContent;//insert the value in the array _initialBoard
        }else{
            gameBoard.inputAgain;
        }

        if(boardValue+1 >= 5){
            _checkBoard();
        }
        
        
        
    }
    let _checkBoard = ()=>{
        let board = gameBoard.board
        let row=0 , col=0,xright = 0,xleft =0;
        let boardValues = [0,1,2,3,4,5,6,7,8];
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
       //create a filter arrat which find the main index of the inputter value
        //check row and col
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
        //create x
        //check X 
        // if(inputArray["boardNumber"]%2==0){
        //     let count = 0, xrange = 3;
        //     let condition = counter <
        //     console.log("hello");
        //     for(let counter=0;counter<2;counter++){
        //         while(count<xrange){
        //             if(board[count][count]["value"] == _playerInput[number]){
                            
        //             }
                    
        //         }

        //     }
        // }

  
     
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
gameBoard.startGame;