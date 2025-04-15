import { powerUpIntervals, upgrades } from "./upgrades-clicer3.js";

let gem = document.querySelector('.gem-cost');
let parsedGem = parseFloat(gem.innerHTML)

let gpcText = document.getElementById("gpc-text")
let gpsText = document.getElementById("gps-text")

let gemImgContainer = document.querySelector(".gem-img-container")

let gpc = 1;

let gps = 0;

const bgm = new Audio('/bgm.mp3')
bgm.volume = 0.1

function incrementGem(event) {
    const clickingSound = new Audio('/click.wav')
    clickingSound.play()
    
    gem.innerHTML = Math.round(parsedGem += gpc);

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(gpc)}`
    div.style.cssText = `color white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
    gemImgContainer.appendChild(div)

    div.classList.add('fade-up')

    timeout(div)
}

const timeout = (div) => {
  setTimeout(() => {
    div.remove()
  }, 800)
}

function buyUpgrade(upgrade) {
  const mu = upgrades.find((u) => {
    if (u.name === upgrade) return u
  })

  const upgradeDiv = document.getElementById(`${mu.name}-upgrade`)
  const nextlevelDiv = document.getElementById(`${mu.name}-next-level`)
  const nextlevelP = document.getElementById(`${mu.name}-next-p`)

  if (parsedGem >= mu.parsedCost) {
    const upgradeSound = new Audio('/upgrade.mp3')
    upgradeSound.volume = 0.1
    upgradeSound.play

    gem.innerHTML = Math.round(parsedGem -= mu.parsedCost);

    mu.level.innerHTML ++

    let index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML))

    if ( index !== -1 ) {
      upgradeDiv.style.cssText = `border-color: orange`;
      nextlevelDiv.style.cssText = `background-color: #CC4500; font-weight: bold`
      nextlevelP.innerText = mu.powerUps[index].description
    }
    
    mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.gemMultiplier).toFixed(2))
    mu.increase.innerHTML = mu.parsedIncrease

    mu.parsedCost *= mu.costMultiplier;
    mu.cost.innerHTML = Math.round(mu.parsedCost)

    if (mu.name === 'clicker') {
      gpc += mu.parsedIncrease
    } else {
      gps += mu.parsedIncrease
    }
  }
}

function save () {
  localStorage.clear()

  upgrades.map((upgrade) => {

    const obj = JSON.stringify({
      parsedLevel: parseFloat(upgrade.level.innerHTML),
      parsedCost: upgrade.parsedCost,
      parsedIncrease: upgrade.parsedIncrease
    })

    localStorage.setItem(upgrade.name, obj)

  })

  localStorage.setItem('gpc', JSON.stringify(gpc))
  localStorage.setItem('gps', JSON.stringify(gps))
  localStorage.setItem('gem', JSON.stringify(parsedGem))
}

function load () {
  upgrades.map((upgrade) => {
    const savedValutes = JSON.parse(localStorage.getItem(upgrade.name))

    upgrade.parsedCost = savedValutes.parsedCost
    upgrade.parsedIncrease = savedValutes.parsedIncrease

    upgrade.level.innerHTML = savedValutes.parsedLevel
    upgrade.cost.innerHTML = Math.round(upgrade.parsedCost)
    upgrade.increase.innerHTML = upgrade.parsedIncrease
  })

  gpc = JSON.parse(localStorage.getItem('gpc'))
  gps = JSON.parse(localStorage.getItem('gps'))
  parsedGem = JSON.parse(localStorage.getItem('gem'))

  gem.innerHTML = Math.round(parsedGem)
}

setInterval(() => {
  parsedGem += gps / 10
  gem.innerHTML = Math.round(parsedGem)
  gpcText.innerHTML = Math.round(gpc)
  gpsText.innerHTML = Math.round(gps)
  bgm.play()
}, 100)

window.incrementGem = incrementGem
window.buyUpgrade = buyUpgrade
window.save = save
window.load = load
