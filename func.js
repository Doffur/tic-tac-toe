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
                    gameSetting.result("res");
                    _checkWinner(number); 
                }
            else if(col == 3){
                    console.log(board[counter]);
                    console.log(`winner is ${number+1}`);
                    gameSetting.result("res");
                    _checkWinner(number);
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
                    gameSetting.result("res");
                    _checkWinner(number);
                    gameSetting.close;
                    break;
                }
                else if(rightX == 3){
                    console.log("Y");
                    console.log(`winner is ${number+1}`);
                    gameSetting.result("res");
                    _checkWinner(number);
                    gameSetting.close;
                }
            }
        }
        //end of check X 
    }

    let _checkWinner = (playerN)=>{
        let p1 = document.getElementById("pScore1")
        ,p2 = document.getElementById("pScore2")
        ,winner = document.getElementById("round");
        
        let pScore = {"1":p1,"2":p2}

        pScore[playerN+1].textContent = parseInt(pScore[playerN+1].textContent)  + 1;
        winner.textContent = playerN+1;
    }

return {playerVal};

};


//module
let gameSetting =(function(){
    let mainBoard = []
     ,playersName = []
     ,_Board = document.querySelector('#gBoard')
     ,_buttonsSel = document.querySelectorAll('.select') 
     ,_buttons = document.querySelectorAll('.sbutton')
     ,_main = document.getElementById("other")
     ,_pl = document.getElementById("players")
     ,_ai = document.getElementById("ai")
     ,_res = document.getElementById("res")
     ,_player1Name = document.getElementById("p1")
     ,_player2Name = document.getElementById("p2");

    //*create the board
    function _createBoard(){
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
            let totalScore = _checkScore()
            mainBoard.filter(bpiece => {
                for(let count=0;count<bpiece.length;count++){
                    bpiece[count]["value"].length == 1?inputted+=1:inputted+=0; 
                }
            });

            if(totalScore%2 == 0){
                inputted%2 == 0?currentPlayer = 0: currentPlayer=1; 
            }else if(totalScore%2 != 0){
                inputted%2 == 0?currentPlayer = 1: currentPlayer=0; 
            }
            

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
    function _checkScore(){
        let p1 = parseInt(document.getElementById("pScore1").textContent)
        let p2 = parseInt(document.getElementById("pScore2").textContent)
        return p1 + p2;
    }

    function _setGame(event){ 
       
        if(event.target.id == "reset" || event.target.id == "reset2"){ 
            resetGame();
        }else{
            //add highlights of the button
            let _highlight = document.getElementsByClassName('active')
            if (_highlight.length>0){
            _highlight[0].className = _highlight[0].className.replace(" active", "");  
            } 
            openModal(event.target.id);
            event.target.classList.add("active"); 
            for(let a = 0,b;b = _buttonsSel[a];a++ ){
                b.disabled = true;
            }//END add highlights of the button
       
            //insertion of value per piece of the board is clicked 
            if(event.target.id == "player"){
                let start = document.getElementById("accept1")
                let _playersHighlight= document.querySelectorAll(".player-name");
                let _phighlight = document.getElementsByClassName('pActive')

                _playersHighlight[0].classList.add("pActive"); 
                start.onclick = () =>{
                    _main.classList.add("hide");
                    setName(event.target.id);
                    let boardPiece = document.querySelectorAll('.board-piece');
                    boardPiece.forEach(piece => piece.addEventListener('click',(e)=>{
                        let hplayer = 0, hp ;
                        //highlight player
                        mainBoard.filter(bpiece => {
                            for(let count=0;count<bpiece.length;count++){
                                bpiece[count]["value"].length == 1?hplayer+=1:hplayer+=0; 
                            }
                        }); 
                        if(_checkScore()%2==0){
                            hplayer%2 == 0?hp = 1: hp=0; 
                        }else if(_checkScore()%2!=0){
                            hplayer%2 == 0?hp = 0: hp=1; 
                        }
                        
                        if (_phighlight.length>0){
                            _phighlight[0].className = _phighlight[0].className.replace(" pActive", "");  
                            } 
                        _playersHighlight[hp].classList.add("pActive"); 
                        for(let a = 0,b;b = _playersHighlight[a];a++ ){
                            b.disabled = true;
                        } // END highlight player

                        _insertValue(e.target.id,event.target.id);
                    })); 
                    
                }
                closeModal();
                

            }else if(event.target.id == "bot"){
                
                closeModal();
            }
            
          
             
        }
            
    };

    function setName(hPlayers){
        if(hPlayers == "player"){
            _pl.classList.add("hide");
            document.getElementById("player-1").textContent = _player1Name.value;
            document.getElementById("player-2").textContent = _player2Name.value;
        }
    }

    function resetGame(){
        //resets the page
        location.reload();
    }
    function resetBoard(){
        let boardPieces = document.querySelectorAll('.board-piece');
        mainBoard.filter(bpiece => {
            for(let count=0;count<bpiece.length;count++){
                bpiece[count]["value"]=""; 
            }
        });
        boardPieces.forEach(piece=>piece.textContent="");
    }
    function openModal(open){
            
            if(open == "player"){
                _main.classList.remove("hide");
                _pl.classList.remove("hide");
            }else if(open == "bot"){
                _main.classList.remove("hide");
                _ai.classList.remove("hide");
            }else if(open == "res"){
                _res.classList.remove("hide");
                closeModal();
            }

    }
    function closeModal(){
        window.onclick = function(event){
            console.log(event.target.id == "end");
            switch(true){
                case (["other","upper","title","cancel1","cancel2"].includes(event.target.id)):
                    for(let a = 0,b;b = _buttonsSel[a];a++ ){
                        b.disabled = false;
                        b.classList.remove("active");
                    } 
                    _main.classList.add("hide");
                    _ai.classList.add("hide");
                    _res.classList.add("hide");
                    _pl.classList.add("hide");
                    break;
                case (event.target.id == "continue"):
                    _res.classList.add("hide");
                    let boardPieces = document.querySelectorAll('.board-piece');
                    mainBoard.filter(bpiece => {
                        for(let count=0;count<bpiece.length;count++){
                            bpiece[count]["value"]=""; 
                        }
                    });
                    boardPieces.forEach(piece=>piece.textContent="");
                    break;
                case (event.target.id == "end"):
                    resetGame();
                    break;

            }
           
        }
    }
    function renderGame(){
        _createBoard(); 
        _buttons.forEach(btn=>btn.addEventListener("click",_setGame)) 
    };

    //return
    return {
        startGame : renderGame(),
        board : mainBoard,
        players:playersName,
        reset:resetGame,
        set: setName,
        result:openModal,
        resetBoard: resetBoard,
        close:closeModal

    };
})();
//initiates the game
gameSetting.startGame
//add ai options