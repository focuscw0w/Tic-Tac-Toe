const circle = 'circle';
const x = 'x';
const cell = document.querySelectorAll('.cell');
const resetOfTurn = document.getElementById('reset-btn');
const winningMessage = document.querySelector('.winning-message')
const endGameMessage = document.querySelector('.end-game');
const body = document.querySelector('body')
isCircleOnTurn = true;

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function start() {
    reset()
    boardClick()
}

start()

function boardClick() {
    cell.forEach(element => {
        element.addEventListener('click', (e) => {
            let targetOfClick = e.target;
            swapTurns()
            const currentClass = isCircleOnTurn ? circle : x;
            if (!isCircleOnTurn) {
                targetOfClick.classList.add(currentClass);
            } else {
                targetOfClick.classList.add(currentClass);
            }        
            if (checkWinner(currentClass)) {
                endGame(false)
            } 
            else if(draw()) {
                endGame(true)
            }
        }, {once: true});
    });
}

function swapTurns () {
    isCircleOnTurn = !isCircleOnTurn;
}

function reset() {
    cell.forEach(element => {
        element.classList.remove('circle');
        element.classList.remove('x');
        element.removeEventListener('click', boardClick)
    });
    body.removeChild(endGameMessage);
}

resetOfTurn.addEventListener('click', start)

function checkWinner (currentClass) {
    return winCombos.some(combo => {
        return combo.every(index => {
            return cell[index].classList.contains(currentClass)
        });
    });
}

function draw () {
    return [...cell].every(cell => {
        return cell.classList.contains(x) || cell.classList.contains(circle)
    })
}

function endGame (isTrue) {
    if (isTrue) {
        winningMessage.innerHTML = 'Draw';
    } else {
        winningMessage.innerHTML = `${isCircleOnTurn ? "Player O" : "Player X"} Wins!`;
    }
    body.appendChild(endGameMessage);
}
