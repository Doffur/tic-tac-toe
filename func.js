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
        }
    }
    let _checkBoard = ()=>{
        let board = gameSetting.board

        //returns the main index of the current input
        let mainIndex = ()=>{
            let row,col,indx,indx2;
                for(let count=0;count<3;count++){
                    indx = board[count].filter(piece => piece == inputArray);
                    indx2 = board[count].findIndex(piece => piece === inputArray);
                    
                    if(indx.length == 1 && indx2[0] != -1){
                        row = count
                        col = indx2 
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
            for(let counter=0;counter<2;counter++){
               for(let count = 0; count<3;count++){
                   //checks the left of X
                    if(board[count][count]["value"] == _playerInput[number] && counter == 0){
                          leftX+=1;      
                    } 
                    //checks the right of X
                    else if(board[count][xrange]["value"] == _playerInput[number] && counter == 1){
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
let gameSetting =(function(){
    let mainBoard = []
    let playersName = []
    let _Board = document.querySelector('#gBoard');
    let _buttonsSel = document.querySelectorAll('.select') 
    let _buttons = document.querySelectorAll('.sbutton')
    let _main = document.getElementById("other")
    let _pl = document.getElementById("players")
    let _ai = document.getElementById("ai")
    let _res = document.getElementById("res")
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
                mainBoard.push(initialBoard); 
                initialBoard = [];
            }
            
        }
    };
    
    //*insert the value of the player
    function _insertValue(event,enemy){
            let currentPiece = document.getElementById(`${event}`)
            let currentPlayer;
            let valueInput = () =>{
                let check;
                for(let count = 0 ;count< 3;count++){
                    mainBoard[count].filter(val =>{
                            for(let key in val){
                                if(val[key] == event){
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
            mainBoard.filter(bpiece => {
                for(let count=0;count<bpiece.length;count++){
                    bpiece[count]["value"].length == 1?inputted+=1:inputted+=0; 
                }
            });
        
            inputted%2 == 0?currentPlayer = 0: currentPlayer=1; 
            let _players;
            if(enemy == "player"){
                _players = [
                                { "player1": Player(0,currentPiece,valueInput(),inputted)},
                                {"player2": Player(1,currentPiece,valueInput(),inputted)}
                            ]
                _players[currentPlayer][`player${currentPlayer+1}`].playerVal();
            }else if(enemy=="bot"){
                // if(currentPlayer == 0){
                // _players = [
                //     { "player1": Player(0,currentPiece,valueInput(),inputted)},
                //     {"player2": Player(1,currentPiece,valueInput(),inputted)}
                    
                // ]
                //  _players[currentPlayer][`player${currentPlayer+1}`].playerVal();
                // } else{
                
                //     let con = false;
                //     let randomBlock,randomnumber;
                //     while(con == false){
                //         randomnumber=Math.floor((Math.random() * 8) + 1);
                //         randomBlock = document.getElementById(`${randomnumber}`)
                //         con = (randomBlock.innerHTML.length ==  0 )
                //     }
                //     console.log(randomnumber);
                    
                //     _insertValue(randomnumber,enemy);
                // }
            }
    };

    function _setGame(event){ 
        let boardPiece = document.querySelectorAll('.board-piece');
        if(event.target.id == "reset" || event.target.id == "reset2"){ 
            _resetGame();
        
        }else{
            //add highlights of the button
            let _highlight = document.getElementsByClassName('active');
            if (_highlight.length>0){
            _highlight[0].className = _highlight[0].className.replace(" active", "");  
            } 
            _openModal(event.target.id);
            event.target.classList.add("active"); 
            for(let a = 0,b;b = _buttonsSel[a];a++ ){
                b.disabled = true;
            //insertion of value per piece of the board is clicked    
            boardPiece.forEach(piece => piece.addEventListener('click',(e)=>{
                _insertValue(e.target.id,event.target.id);
            })); 
        } 
        }
            
    };

    function _resetGame(){
        //resets the board
        let boardPieces = document.querySelectorAll('.board-piece');
        for(let a = 0,b;b = _buttonsSel[a];a++ ){
            b.disabled = false;
            b.classList.remove("active");
        } 
        mainBoard.filter(bpiece => {
            for(let count=0;count<bpiece.length;count++){
                bpiece[count]["value"]=""; 
            }
        });
        boardPieces.forEach(piece=>piece.textContent="");

        //resets the modal-content
        _main.classList.add("hide");
        _pl.classList.add("hide");
        _ai.classList.add("hide");
        _res.classList.add("hide");
    }
    function _openModal(open){
            _main.classList.remove("hide");
            if(open == "player"){
                _pl.classList.remove("hide");
            }else if(open == "bot"){
                _ai.classList.remove("hide");
            }else if(open == "res"){
                _res.classList.remove("hide");
            }

    }
    function _closeModal(){
        window.onclick = function(event){
            console.log(event.target.id);
            if(["other","upper","title","cancel"].includes(event.target.id) && !(_main.classList.contains("hide"))){  
                _resetGame();
            }
        }
    }
    function renderGame(){
        _createBoard();     
        _buttons.forEach(btn=>btn.addEventListener("click",_setGame))
        _closeModal();  
    };

   

    //return
    return {
        startGame : renderGame(),
        board : mainBoard,
        players:playersName

    };
})();


//initiates the game
gameSetting.startGame



//add ai options