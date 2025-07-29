
//Elements
const canvEl = document.getElementById("c")
const ctx = canvEl.getContext("2d")
//Elements

//Drawing Sizes
const bbThickness = 5
const bbSize = 400
//Drawing Sizes

function setCanvas() {
    canvEl.width = window.innerWidth
    canvEl.height = window.innerHeight

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(canvEl.width/2 - bbSize/2, canvEl.height/2 - bbSize/2, bbSize, bbSize)
    ctx.fillStyle = "#000000"
    ctx.fillRect((canvEl.width/2 - bbSize/2) + bbThickness, (canvEl.height/2 - bbSize/2) + bbThickness, bbSize - bbThickness*2, bbSize - bbThickness*2)
}

window.addEventListener('resize', function(event) {
    setCanvas()
})

setCanvas()
