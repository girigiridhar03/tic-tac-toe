const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const message = document.querySelector('.message');
const messageContainer = document.querySelector('.winning-message-container');
const button = document.querySelector('#button');

let WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,5],
    [2,4,6]
]

let circleTurns;

startGame();



button.addEventListener("click",startGame)

function startGame(){
    circleTurns=false;
    messageContainer.style.display = "none"

    cells.forEach(cell=>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.addEventListener("click",handleClick,{once:true})
    });

   
    showHoverBoard();
}


function handleClick(e){

    const cell = e.target;
    const currentClass = circleTurns ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell,currentClass);
    if(checkWins(currentClass)){
         endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
   
       
        turns();
        showHoverBoard();
}

function endGame(draw){
    if(draw){
      messageContainer.style.display = "flex";
       message.innerHTML = 'Draw!'
    }
    else{
        messageContainer.style.display = "flex";
        message.innerHTML = `${circleTurns ? 'O' : 'X'} Win !`
        console.log(circleTurns ? 'o win' : 'x win')
    }
}

function isDraw(){
   return [...cells].every(cell=>{
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
   })
}


function turns(){
    circleTurns = !circleTurns;
}
function showHoverBoard(){

    board.classList.remove(CIRCLE_CLASS);
    board.classList.remove(X_CLASS);

    if(circleTurns){
        board.classList.add(CIRCLE_CLASS);
    }
    else{
        board.classList.add(X_CLASS)
    }
}



function placeMark(cell,currentClass){
      cell.classList.add(currentClass)
}


function checkWins(currentClass){
    return WINNING_COMBINATION.some(combination=>{
        return combination.every(index=>{
           return cells[index].classList.contains(currentClass);
        })
    })
}



