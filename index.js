//#region Variables

//Elements
const canvEl = document.getElementById("c")
const ctx = canvEl.getContext("2d")

const healthEl = document.getElementById("health-el")

//Drawing Sizes
const bbThickness = 5
const bbSize = 400

//Player Object
let player = {
    size: 20,
    x: canvEl.width/2,
    y: canvEl.height/2,
    speed: 0.4,
    health: 100,
    healthOld: 0
}

//Input
let keys = []

//Timing
let oldTime = Date.now()
let currTime = Date.now()
let deltaTime = 1
const timeSamples = 30


//Setup
let fc = 0

//#region Event Listners
window.addEventListener('resize', function(event) {
    setCanvas()
})

document.addEventListener("keydown", function(event) {
    keys[event.key] = true
})

document.addEventListener("keyup", function(event) {
    keys[event.key] = false
})

//#region Functions
function setTime() {
    currTime = Date.now()
    deltaTime += currTime - oldTime
    oldTime = currTime

    if (fc == timeSamples) {
        player.speed = Math.floor(deltaTime/timeSamples * player.speed)
        console.log("Player Speed: " + player.speed)
    }
}

function setCanvas() {
    canvEl.width = window.innerWidth - 50
    canvEl.height = window.innerHeight - 90

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(canvEl.width/2 - bbSize/2, canvEl.height/2 - bbSize/2, bbSize, bbSize)
    ctx.fillStyle = "#000000"
    ctx.fillRect((canvEl.width/2 - bbSize/2) + bbThickness, (canvEl.height/2 - bbSize/2) + bbThickness, bbSize - bbThickness*2, bbSize - bbThickness*2)

    player.x = canvEl.width/2
    player.y = canvEl.height/2
}

function updatePlayer() {
    if (keys["ArrowUp"]) {
        if (player.y-player.speed > (canvEl.height/2 - bbSize/2 + bbThickness))    
            player.y -= player.speed
    }
    if (keys["ArrowDown"]) {
        if (player.y + player.speed < (canvEl.height/2 - bbSize/2 + bbThickness) + (bbSize - 2*bbThickness) - player.size)
            player.y += player.speed
    }
    if (keys["ArrowLeft"]) {
        if (player.x-player.speed > (canvEl.width/2 - bbSize/2 + bbThickness))    
            player.x -= player.speed 
    }
    if (keys["ArrowRight"]) {
        if (player.x + player.speed < (canvEl.width/2 - bbSize/2 + bbThickness) + (bbSize - 2*bbThickness) - player.size)
            player.x += player.speed 
    }

    if (player.health != player.healthOld) {
        player.healthOld = player.health
        healthEl.textContent = "Health: " + player.health
    }
}

function drawScreen() {
    ctx.clearRect(0, 0, canvEl.width, canvEl.height);

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(canvEl.width/2 - bbSize/2, canvEl.height/2 - bbSize/2, bbSize, bbSize)
    ctx.fillStyle = "#000000"
    ctx.fillRect((canvEl.width/2 - bbSize/2) + bbThickness, (canvEl.height/2 - bbSize/2) + bbThickness, bbSize - bbThickness*2, bbSize - bbThickness*2)

    ctx.fillStyle = "#ff0000"
    ctx.fillRect(player.x, player.y, player.size, player.size)
}

function update() {

    if (fc <= timeSamples) {
        setTime()
    }

    updatePlayer()

    drawScreen()

    fc++

    requestAnimationFrame(update)
}


//#region Main Code
setCanvas()
update()
