let score_title = document.querySelector(".score-title")

let intervalID

let canvas = document.querySelector(".canvas")

let ctx = canvas.getContext("2d");

let cellWidth = canvas.width / 20
let cellHeight = canvas.height / 20


let nowDirectionFunc


let headStartPosX
let headStartPosY

let appleX
let appleY

let score

let snakeTailArr = []

let direction

function clearGameField() {
    ctx.fillStyle = "#e0e0e0"
    ctx.fillRect(0,0,canvas.width,canvas.height)
}


function startGame() {
    clearInterval(intervalID)
    score = 0
    direction = ""
    headStartPosX = (canvas.width / 4)
    headStartPosY = (canvas.height / 4)
    clearGameField()
    drawSnakeHead()
    setAppleCords()
    drawApple()
    score_title.textContent = `SCORE: 0`
}


startGame()


function drawSnakeHead() {

    ctx.fillStyle = "blue"
    ctx.fillRect(headStartPosX,headStartPosY,cellWidth,cellHeight)
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.strokeRect(headStartPosX,headStartPosY,cellWidth,cellHeight)

}


function setAppleCords() {
    appleX = getRandomInt(0, 19) * cellWidth
    appleY = getRandomInt(0, 19) * cellHeight
}


function drawApple() {
    ctx.fillStyle = "green"
    ctx.fillRect(appleX,appleY,cellWidth,cellHeight)
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.strokeRect(appleX,appleY,cellWidth,cellHeight)
}



function setDirection(event) {

    clearInterval(intervalID)


    intervalID = setInterval(function () {

    let arr = []
    arr.push(headStartPosX)
    arr.push(headStartPosY)
    snakeTailArr.unshift(arr)


    if (event.keyCode === 38 && direction !== "down") {
        direction = "up"
        nowDirectionFunc = goUp
        goUp()
    }
    else if (event.keyCode === 40 && direction !== "up") {
        direction = "down"
        nowDirectionFunc = goDown
        goDown()
    }
    else if (event.keyCode === 37 && direction !== "right") {
        direction = "left"
        nowDirectionFunc = goLeft
        goLeft()
    }
    else if (event.keyCode === 39 && direction !== "left") {
        direction = "right"
        nowDirectionFunc = goRight
        goRight()
    }
    else{
        nowDirectionFunc()
    }

    eatApple()
    snakeTailArr.length = score
    deadSnakeOne()
    deadSnakeTwo()

},90)


}



function goUp() {
    headStartPosY = headStartPosY - cellHeight
    clearGameField()
    drawSnakeHead()
    drawSnakeTail()
    drawApple()
}
function goDown() {
    headStartPosY = headStartPosY + cellHeight
    clearGameField()
    drawSnakeHead()
    drawSnakeTail()
    drawApple()
}

function goLeft() {
    headStartPosX = headStartPosX - cellWidth
    clearGameField()
    drawSnakeHead()
    drawSnakeTail()
    drawApple()

}

function goRight() {
    headStartPosX = headStartPosX + cellWidth
    clearGameField()
    drawSnakeHead()
    drawSnakeTail()
    drawApple()

}


function drawSnakeTail() {

    for (let i = 0; i < score; i++) {

        ctx.fillStyle = "red"
        ctx.fillRect(snakeTailArr[i][0],snakeTailArr[i][1],cellWidth,cellHeight)
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.strokeRect(snakeTailArr[i][0],snakeTailArr[i][1],cellWidth,cellHeight)

    }
}


function eatApple() {
    if (appleX === headStartPosX && appleY === headStartPosY) {
        score++
        clearGameField()
        drawSnakeTail()
        drawSnakeHead()
        setAppleCords()
        drawApple()
        changeScoreTitle()
    }
}


function deadSnakeOne() {

    for (let i = 0; i < snakeTailArr.length; i++) {
        if (headStartPosX === snakeTailArr[i][0] && headStartPosY === snakeTailArr[i][1]) {
            startGame()
        }
    }

}


function deadSnakeTwo() {
    if ( (headStartPosX > (canvas.width - cellWidth) || headStartPosX < 0) || (headStartPosY > (canvas.height - cellHeight) || headStartPosY < 0) ) {
        startGame()
    }
}


document.addEventListener("keydown", setDirection)


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function changeScoreTitle() {
    score_title.textContent = `SCORE: ${score}`
}

