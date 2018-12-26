// Create a server stub for easier mocking in test.
function ServerStub() {
    this.ws = new WebSocket('ws://localhost:10001')
    this.hasServerResult = false
    this.hasWinner = false
    this.ws.onmessage = (function (msg) {
        if (msg.data === 'true') {
            this.hasWinner = true
        }
    }).bind(this)
    this.checkCurrentWinnerFromMATLAB = function(gridStatus, row, col) {
        // send message to matlab and return result from matlab
        msg = ''
        for (var r = 0; r < 3; r++) {
            for (var c = 0; c< 3; c++) {
                msg += gridStatus[r][c]
            }
        }
        msg += row
        msg += col
        this.ws.send(msg)
    }

}

function Game() {
    this.PLAYER1 = 1;
    this.PLAYER2 = 2;
    this.PLAYER_CSS = ["player1", "player2"];
    this.currentPlayer = this.PLAYER1;
    this.gridStatus = [[0,0,0],[0,0,0],[0,0,0]];
    this.PlayerMoves = 0;
    this.serverStub = new ServerStub()
    
    this.isCurrentGridOccupied = function (row,col){
        if (this.gridStatus[row][col] !== 0){
            return true
        } else {return false
        }
    }

    this.move = function (target,row,col){
        this.gridStatus[row][col] = this.currentPlayer;
        target.classList.add(this.PLAYER_CSS[this.currentPlayer-1]);
        this.PlayerMoves++;   
    }

    this.checkCurrentPlayerWinStatus = function (row,col){
        if (this.PlayerMoves > 4){
            this.serverStub.checkCurrentWinnerFromMATLAB(this.gridStatus, row, col)       
        } 
    }

    this.isGameOver = function (){
        return this.serverStub.hasWinner }

    this.displayWinner = function(target){
         target.innerHTML = 'the winner is Player ' + this.currentPlayer;
    }

    this.switchPlayer = function () {
        if (this.currentPlayer === this.PLAYER1) {
            this.currentPlayer = this.PLAYER2
        } else { this.currentPlayer = this.PLAYER1 }
    }
    
    this.reset = function (){

        this.currentPlayer = this.PLAYER1;
        this.gridStatus = [[0,0,0],[0,0,0],[0,0,0]];
        this.PlayerMoves = 0;
        this.serverStub = new ServerStub()
        divs = document.querySelectorAll('.row div')
        for (i = 0; i<divs.length; i++){
            divs[i].classList.remove(this.PLAYER_CSS[0]);
            divs[i].classList.remove(this.PLAYER_CSS[1]);
        }
        displayWinner = document.querySelector('#displayWinner');
        displayWinner.innerHTML = '';
    }


}


mygame = new Game();

function handleClick(target, row, col) {

    if (mygame.isCurrentGridOccupied(row,col) || mygame.isGameOver()) {
        return
    }
    mygame.move(target,row,col);
    mygame.checkCurrentPlayerWinStatus(row,col);
    // check if current player wins after 50 ms to wait for server response.
    setTimeout(function() {
        if (mygame.isGameOver()) {
            mygame.displayWinner(document.querySelector('#displayWinner'));
        } else {
            mygame.switchPlayer();
        }
    }, 50);
    

}

function handleResetButton() {
    mygame.reset();
}