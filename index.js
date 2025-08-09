//#region Variables

//Elements
const canvEl = document.getElementById("c")
const ctx = canvEl.getContext("2d")

const healthEl = document.getElementById("health-el")
const scoreEl = document.getElementById("score-el")

//Drawing Sizes
const bbThickness = 5
const bbSize = 400
let bbStartX = canvEl.width/2 - bbSize/2
let bbStartY = canvEl.height/2 - bbSize/2
let bbEndX = canvEl.width/2 - bbSize/2 + bbSize
let bbEndY = canvEl.height/2 - bbSize/2 + bbSize

//Player Object
let player = {
    size: 23,
    x: canvEl.width/2,
    y: canvEl.height/2,
    speed: 0.38,
    health: 100,
    healthOld: 0,
    healthTime: 0,
    coolTime: 5,
    coolTimeStr: 1000,
    coolDown: false,
    coolAnim: false,
    score: 0,
    scoreOld: 0
}

//Attacks
let atkTimer = 0
let bar = []

let bullets = {
    straight(xRel, yRel, xVel, yVel) {
        return {
            size: 20,
            x: xRel,
            y: yRel,
            speedx: xVel * deltaTime,
            speedy: yVel * deltaTime,
            laser: false,

            updateSpeed() {
                // Do nothing
            }
        }
    },
    speed(xRel, yRel, xVel, yVel) {
        return {
            size: 20,
            x: xRel,
            y: yRel,
            speedx: xVel * deltaTime,
            speedy: yVel * deltaTime,
            spawn: fc,
            laser: true,

            updateSpeed() {
                this.speedx *= 1+(fc-this.spawn)/5000
                this.speedy *= 1+(fc-this.spawn)/5000
            }
        }
    }
}

let aco = 0
let stall = 0
let stall_diff = 500
let atkNo = 0

let attacks = [
    //Circle
    function() {
        const del = 300
        if ((fc-aco) > del && fc-stall > stall_diff) {
            let xx
            let yy

            aco = fc

            while (!((xx < bbStartX || xx > bbEndX) || (yy < bbStartY || yy > bbEndY))) {
                xx = Math.random() * canvEl.width
                yy = Math.random() * canvEl.height
            }

            bar.push(bullets.straight(xx, yy, 0.005, 0.005))
            bar.push(bullets.straight(xx, yy, -0.005, 0.005))
            bar.push(bullets.straight(xx, yy, 0.005, -0.005))
            bar.push(bullets.straight(xx, yy, -0.005, -0.005))
            bar.push(bullets.straight(xx, yy, 0.007, 0))
            bar.push(bullets.straight(xx, yy, 0, 0.007))
            bar.push(bullets.straight(xx, yy, -0.007, 0))
            bar.push(bullets.straight(xx, yy, 0, -0.007))
        }
    },
    //Speed Snipe
    function() {
        const del = 400
        if ((fc-aco) > del && fc-stall > stall_diff) {
            let xx
            let yy

            aco = fc

            while (!((xx < bbStartX || xx > bbEndX) || (yy < bbStartY || yy > bbEndY))) {
                xx = Math.random() * canvEl.width
                yy = Math.random() * canvEl.height
            }

            let dx = player.x - xx
            let dy = player.y - yy
            let norm = Math.sqrt(dx*dx + dy*dy)


            //console.log([xx, yy, dx/norm, dy/norm])

            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.005, (dy/norm) * 0.005))
            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.004, (dy/norm) * 0.004))
            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.003, (dy/norm) * 0.003))
            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.002, (dy/norm) * 0.002))
            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.001, (dy/norm) * 0.001))
        }
    },
    //Random Snipe
    function() {
        const del = 150
        if ((fc-aco) > del && fc-stall > stall_diff) {
            let xx
            let yy

            aco = fc

            while (!((xx < bbStartX || xx > bbEndX) && (yy < bbStartY || yy > bbEndY))) {
                xx = Math.random() * canvEl.width
                yy = Math.random() * canvEl.height
            }

            let px = bbStartX + Math.random()*(bbEndX - bbStartX)
            let py = bbStartY + Math.random()*(bbEndY - bbStartY)

            let dx = px - xx
            let dy = py - yy
            let norm = Math.sqrt(dx*dx + dy*dy)


            //console.log([xx, yy, dx/norm, dy/norm])

            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.005, (dy/norm) * 0.005))
            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.004, (dy/norm) * 0.004))
            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.003, (dy/norm) * 0.003))
            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.002, (dy/norm) * 0.002))
            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.001, (dy/norm) * 0.001))
        }
    },
    //Speed Snipe Double
    function() {
        const del = 500
        if ((fc-aco) > del && fc-stall > stall_diff) {
            for (let i = 0; i < 2; i++) {
                let xx
                let yy

                aco = fc

                while (!((xx < bbStartX || xx > bbEndX) || (yy < bbStartY || yy > bbEndY))) {
                    xx = Math.random() * canvEl.width
                    yy = Math.random() * canvEl.height
                }

                let dx = player.x - xx
                let dy = player.y - yy
                let norm = Math.sqrt(dx*dx + dy*dy)


                //console.log([xx, yy, dx/norm, dy/norm])

                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.005, (dy/norm) * 0.005))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.004, (dy/norm) * 0.004))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.003, (dy/norm) * 0.003))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.002, (dy/norm) * 0.002))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.001, (dy/norm) * 0.001))
            }
        }
    },
    //Grid
    function() {
        const del = 800
        if ((fc-aco) > del && fc-stall > stall_diff) {
            aco = fc
            for (let i = 0 + 140*Math.random(); i < canvEl.width; i+=70) {
                let xx = i
                let yy = 0
                bar.push(bullets.speed(xx, yy, 0, 0.0005))
                bar.push(bullets.speed(xx, yy, 0, 0.0004))
                bar.push(bullets.speed(xx, yy, 0, 0.0003))
                bar.push(bullets.speed(xx, yy, 0, 0.0002))
            }
            for (let i = 0 + 140*Math.random(); i < canvEl.width; i+=70) {
                let xx = 0
                let yy = i
                bar.push(bullets.speed(xx, yy, 0.0005, 0))
                bar.push(bullets.speed(xx, yy, 0.0004, 0))
                bar.push(bullets.speed(xx, yy, 0.0003, 0))
                bar.push(bullets.speed(xx, yy, 0.0002, 0))
            }
        }
    },
    //Slow Snipe
    function() {
        const del = 150
        if ((fc-aco) > del && fc-stall > stall_diff) {
            let xx
            let yy

            aco = fc

            while (!((xx < bbStartX || xx > bbEndX) || (yy < bbStartY || yy > bbEndY))) {
                xx = Math.random() * canvEl.width
                yy = Math.random() * canvEl.height
            }

            let dx = player.x - xx
            let dy = player.y - yy
            let norm = Math.sqrt(dx*dx + dy*dy)


            //console.log([xx, yy, dx/norm, dy/norm])

            bar.push(bullets.straight(xx, yy, (dx/norm) * 0.01, (dy/norm) * 0.01))
        }
    },
    //Spiral
    function() {
        const del = 50
        if ((fc-aco) > del && fc-stall > stall_diff) {

            let radius = 300; 
            let angle = fc / 240; 

            let xx = canvEl.width/2 + Math.sin(angle) * radius;
            let yy = canvEl.height/2 + Math.cos(angle) * radius;

            aco = fc

            let dx = canvEl.width/2 - xx
            let dy = canvEl.height/2 - yy
            let norm = Math.sqrt(dx*dx + dy*dy)

            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.00005, (dy/norm) * 0.00005))
            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.00004, (dy/norm) * 0.00004))
            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.00003, (dy/norm) * 0.00003))
            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.00002, (dy/norm) * 0.00002))
            bar.push(bullets.speed(xx, yy, (dx/norm) * 0.00001, (dy/norm) * 0.00001))
        }
    },
    //Grid 2 
    function() {
        const del = 100
        if ((fc-aco) > del && fc-stall > stall_diff) {
            aco = fc

            let xx = Math.random() * canvEl.width

            let yy = Math.random() * canvEl.height
            let dx = 1
            let dy = 0
            let norm = 1

            if (xx < canvEl.width/2) {
                xx = 0
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.005, (dy/norm) * 0.004))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.004, (dy/norm) * 0.004))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.003, (dy/norm) * 0.003))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.002, (dy/norm) * 0.002))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.001, (dy/norm) * 0.001))
            }
            else {
                xx = canvEl.width - 1
                dx = -1
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.004, (dy/norm) * 0.004))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.004, (dy/norm) * 0.004))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.003, (dy/norm) * 0.003))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.002, (dy/norm) * 0.002))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.001, (dy/norm) * 0.001))
            }
        }
    },
    //Speed Snipe Quad
    function() {
        const del = 750
        if ((fc-aco) > del && fc-stall >stall_diff) {
            for (let i = 0; i < 4; i++) {
                let xx
                let yy

                aco = fc

                while (!((xx < bbStartX || xx > bbEndX) || (yy < bbStartY || yy > bbEndY))) {
                    xx = Math.random() * canvEl.width
                    yy = Math.random() * canvEl.height
                }

                let dx = player.x - xx
                let dy = player.y - yy
                let norm = Math.sqrt(dx*dx + dy*dy)


                //console.log([xx, yy, dx/norm, dy/norm])

                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.005, (dy/norm) * 0.005))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.004, (dy/norm) * 0.004))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.003, (dy/norm) * 0.003))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.002, (dy/norm) * 0.002))
                bar.push(bullets.speed(xx, yy, (dx/norm) * 0.001, (dy/norm) * 0.001))
            }
        }
    }
]

//Input
let keys = []

//Timing
let oldTime = Date.now()
let currTime = Date.now()
let deltaTime = 1
const timeSamples = 30

//Setup
let fc = 1

//#region Event Listners
{
window.addEventListener('resize', function(event) {
    setCanvas()
})

document.addEventListener("keydown", function(event) {
    keys[event.key] = true
})

document.addEventListener("keyup", function(event) {
    keys[event.key] = false
})
}

//#region Functions
function setTime() {
    currTime = Date.now()
    deltaTime += currTime - oldTime
    oldTime = currTime

    if (fc == timeSamples) {
        player.speed = (deltaTime/timeSamples * player.speed)
        player.coolTimeStr = Math.floor(player.coolTimeStr/(deltaTime/timeSamples))
        console.log("Player Speed: " + player.speed)
        console.log("Player Cooldown: " + player.coolTimeStr)
        player.coolTime = player.coolTimeStr
    }
}

function setCanvas() {
    canvEl.width = window.innerWidth - 50
    canvEl.height = window.innerHeight - 120

    bbStartX = canvEl.width/2 - bbSize/2
    bbStartY = canvEl.height/2 - bbSize/2
    bbEndX = canvEl.width/2 - bbSize/2 + bbSize
    bbEndY = canvEl.height/2 - bbSize/2 + bbSize

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(bbStartX, bbStartY, bbSize, bbSize)
    ctx.fillStyle = "#000000"
    ctx.fillRect(bbStartX + bbThickness, bbStartY + bbThickness, bbSize - bbThickness*2, bbSize - bbThickness*2)

    player.x = canvEl.width/2
    player.y = canvEl.height/2
}

function updatePlayer() {
    if (keys["ArrowUp"]) {
        if (player.y-player.speed > bbStartY + bbThickness)    
            player.y -= player.speed
    }
    if (keys["ArrowDown"]) {
        if (player.y + player.speed < bbEndY - bbThickness - player.size)
            player.y += player.speed
    }
    if (keys["ArrowLeft"]) {
        if (player.x-player.speed > bbStartX + bbThickness)    
            player.x -= player.speed 
    }
    if (keys["ArrowRight"]) {
        if (player.x + player.speed < bbEndX - bbThickness - player.size)
            player.x += player.speed 
    }

    if (player.health != player.healthOld) {
        player.healthOld = player.health
        healthEl.textContent = "Health: " + player.health
    }

    if (player.coolTime > 0 && player.coolDown)    player.coolTime--
    else if (player.coolTime <= 0) {
        player.coolTime = player.coolTimeStr
        player.coolDown = false
    }
}

function updatebullet() {
    for (let i = 0; i < bar.length; i++) {
        bar[i].updateSpeed()
        bar[i].x += bar[i].speedx
        bar[i].y += bar[i].speedy
    }
}

function drawScreen() {
    ctx.clearRect(0, 0, canvEl.width, canvEl.height);

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(bbStartX, bbStartY, bbSize, bbSize)
    ctx.fillStyle = "#000000"
    ctx.fillRect(bbStartX + bbThickness, bbStartY + bbThickness, bbSize - bbThickness*2, bbSize - bbThickness*2)

    
    
    if (!player.coolDown) {
        ctx.fillStyle = "#ff0000"
        ctx.fillRect(player.x, player.y, player.size, player.size)
    }
    else if (player.coolTime > 0 && player.coolAnim && player.coolTime % 10 == 0) {
        player.coolAnim = false
    }
    else if (player.coolTime > 0 && !player.coolAnim && player.coolTime % 10 == 0) {
        ctx.fillStyle = "#ff0000"
        ctx.fillRect(player.x, player.y, player.size, player.size)
        player.coolAnim = true
    }

    ctx.fillStyle = "#ffffff"

    for (let i = 0; i < bar.length; i++) {
        if (bar[i].x < 0 || bar[i].x > canvEl.width || bar[i].y < 0 || bar[i].y > canvEl.height) {
            bar.splice(i, 1)
            continue
        }

        if (bar[i].laser) {
            ctx.beginPath();
            ctx.moveTo(bar[i].x + bar[i].size/2, bar[i].y + bar[i].size/2);
            ctx.lineTo(bar[i].x + bar[i].speedx * 10000, bar[i].y + bar[i].speedy * 10000);
            ctx.strokeStyle = "#ff3333";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        ctx.fillRect(bar[i].x, bar[i].y, bar[i].size, bar[i].size)

        let a = bar[i].x + bar[i].size > player.x
        let b = bar[i].x < player.x + player.size  //collision from right
        let c = bar[i].y + bar[i].size > player.y //Collision from top
        let d = bar[i].y < player.y + player.size  //Collisioj from bottom

        let x = [a, b, c, d]

        if (a && b && c && d) {
            if (!player.coolDown) {
                player.health -= 10
                player.coolDown = true
            }
        }
    }
}

function update() {
    if (player.health > 0) {
        
        if (fc <= timeSamples) {
            setTime()
            fc++
        }
        else {
            fc += deltaTime/timeSamples
        }

        if ((fc - atkTimer) > 5000) {
            atkNo = Math.floor(attacks.length * Math.random())
            stall = fc
            atkTimer = fc
            console.log(atkNo)
        }

        
        attacks[atkNo%attacks.length]()
        updatePlayer()
        updatebullet()
        drawScreen()

        if (fc-player.healthTime > 700)  {
            player.health++
            player.healthTime = fc
        }

        player.score = Math.floor(fc/1000)

        if (player.scoreOld != player.score) {
            player.scoreOld = player.score
            scoreEl.textContent = "Score: " + player.score
        }
        
        //console.log(fc)
        requestAnimationFrame(update)
    }
    else {
        ctx.clearRect(0, 0, canvEl.width, canvEl.height);
        healthEl.textContent = "Game Over"
    }
}


//#region Main
setCanvas()
update()
