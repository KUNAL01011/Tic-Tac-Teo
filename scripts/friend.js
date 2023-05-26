const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('resterButton');
const button = document.getElementById('button');
let audioTurn = new Audio('./ting.mp3')
let End = new Audio('./gameover.mp3')
let audio = new Audio('./music.mp3')
let circleTurn ;


startGame()
audio.loop = true;
audio.play();

let playing = true;
button.addEventListener('click', () => {
  if (playing) {
    audio.pause();
    playing = false;
  } else {
    audio.play();
    playing = true;
  }
});

restartButton.addEventListener('click',startGame);

// starter function
function startGame() {
    circleTurn = false;
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleclick)
        cell.addEventListener('click',handleclick, {once : true})
        
    
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

//for Event Handling function
function handleclick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    placeMark( cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if( isDraw() ){
        endGame(true)
    }
    else{
        swapTurns()
        setBoardHoverClass()
    }
    audioTurn.play();
}

//check for end the game 
function endGame(draw){
    if(draw){
        winningMessageTextElement.innerHTML = 'Draw'
    }else{
        winningMessageTextElement.innerHTML = `${circleTurn ? "o's" : "x's"}Wins!`
    }
    winningMessageElement.classList.add('show')
    End.play();
}

//check for draw the match
function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

//check for place
function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

//change the turns
function swapTurns(){
    circleTurn = !circleTurn
}

//For hovering Effect
function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);

    }
    else{
        board.classList.add(X_CLASS)
    }
}

// Check for Win 
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

// const CIRCLE_CLASS = 'circle';
// const X_CLASS = 'x';
// const WINNING_COMBINATIONS = [
//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,6]
// ]
// const cellElements = document.querySelectorAll('[data-cell]');
// const board = document.getElementById('board');
// let circleTurn;
   

// startGame()

// function startGame(){
//     circleTurn = true
//     cellElements.forEach(cell =>{
//         cell.addEventListener('click', handleClick, {once : true});
//     })
//     setBoardHoverClass()
// }


// function handleClick(e){
//     const cell = e.target;
//     const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
//     // if(checkWin(currentClass)){

//     // }
// const win = checkWin(currentClass);
//     placeMark(cell, currentClass);
//     swapTurn()
    
// }

// function placeMark(cell, currentClass){
//     cell.classList.add(currentClass)
// }

// function swapTurn(){
//     circleTurn = !circleTurn;
// }


// function setBoardHoverClass (){
//     board.classList.remove(X_CLASS)
//     board.classList.remove(CIRCLE_CLASS)
//     if(circleTurn){
//         board.classList.add(CIRCLE_CLASS)
//     }else{
//         board.classList.add(X_CLASS)
//     }
// }



function checkWin(currentClass){
    return WINNING_COMBINATIONS.some((combination) =>{
        return combination.every((index) => {
            console.log(index)
            return cellElements[index].classList.contains(currentClass)
        })
    })
    
}















