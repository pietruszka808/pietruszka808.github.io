import { powerUpIntervals, upgrades } from "./upgrades-clicer3.js";
import { defaultUpgradeValues } from "./clicer3 v2.js";

let gem = document.querySelector('.gem-cost');
let parsedGem = parseFloat(gem.innerHTML)

let gpcText = document.getElementById("gpc-text")
let gpsText = document.getElementById("gps-text")

let gemImgContainer = document.querySelector('.gem-img-container')

let upgradesNavButton = document.getElementById('upgrades-nav-button')
let skillsNavButton = document.getElementById('skills-nav-button')
let artifactsNavButton = document.getElementById('artifacts-nav-button')

let prestigeButton = document.querySelector(".prestige-button")

let relic = document.getElementById("relic")

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

  mu.level = document.querySelector(`.${mu.name}-level`)
  const upgradeDiv = document.getElementById(`${mu.name}-upgrade`)
  const nextlevelDiv = document.getElementById(`${mu.name}-next-level`)
  const nextlevelP = document.getElementById(`${mu.name}-next-p`)

  if (parsedGem >= mu.parsedCost) {
    const upgradeSound = new Audio('/upgrade.mp3')
    upgradeSound.volume = 0.1
    upgradeSound.play

    gem.innerHTML = Math.round(parsedGem -= mu.parsedCost);

    let index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML))

    if ( index !== -1 ) {
      upgradeDiv.style.cssText = `border-color: white`;
      nextlevelDiv.style.cssText = `background-color: #5A5959; font-weight: normal`
      mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier)

      if ( mu.name === 'clicker') {
        gpc *= mu.powerUps[index].multiplier
        nextlevelP.innerHTML = `+${mu.parsedIncrease} gems per click`
      } else {
        gps -= mu.power
        mu.power *= mu.powerUps[index].multiplier
        gps += mu.power
        nextlevelP.innerHTML = `+${mu.parsedIncrease} gems per second`
      }
    }

    mu.level.innerHTML ++

    index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML))

    if ( index !== -1 ) {
      upgradeDiv.style.cssText = `border-color: orange`;
      nextlevelDiv.style.cssText = `background-color: #CC4500; font-weight: bold`
      nextlevelP.innerText = mu.powerUps[index].description

      mu.cost.innerHTML = Math.round(mu.parsedCost * 2.5 * 1.004 ** parseFloat(mu.level.innerHTML))
    } else {
      mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier)
      mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.gemMultiplier).toFixed(2))

      if ( mu.name === 'clicker') nextlevelP.innerHTML = `+${mu.parsedIncrease} gems per click`
      else nextlevelP.innerHTML = `+${mu.parsedIncrease} gems per second` 
    }
    
    if (mu.name === 'clicker') gpc += mu.parsedIncrease
    else {
      gps -= mu.power
      mu.power += mu.parsedIncrease
      gps += mu.power
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

function prestige () {
  upgrades.map((upgrade) => {
    const mu = defaultUpgradeValues.find((u) => { if (upgrade.name === u.name) return u })

      upgrade.parsedCost = mu.cost
    upgrade.parsedIncrease = mu.increase

    upgrade.level.innerHTML = 0
    upgrade.cost.innerHTML = mu.cost
    upgrade.increase.innerHTML = mu.increase 
    
    const upgradeDiv = document.getElementById(`${mu.name}-upgrade`)
    const nextlevelDiv = document.getElementById(`${mu.name}-next-level`)
    const nextlevelP = document.getElementById(`${mu.name}-next-p`)

    upgradeDiv.style.cssText = `border-color: white`;
    nextlevelDiv.style.cssText = `border-color: #5A5959; font-weight: normal`;
    nextlevelP.innerHTML = `+${mu.increase} gems per click`
  })

  relic.innerHTML = Math.ceil(Math.sqrt(parsedGem - 999999) / 300)

  gpc = 1
  gps = 0
  parsedGem = 0
  gem.innerHTML = parsedGem
}

setInterval(() => {
  parsedGem += gps / 10
  gem.innerHTML = Math.round(parsedGem)
  gpcText.innerHTML = Math.round(gpc)
  gpsText.innerHTML = Math.round(gps)
  bgm.play()

  if (parsedGem >= 1_000_000) {
    prestigeButton.style.display = "block"
  } else {
    prestigeButton.style.display = "none"
  }
}, 100)

skillsNavButton.addEventListener("click", function() {
  const upgradeContainers = document.querySelectorAll(".upgrade")

  upgradeContainers.forEach((container) => {
    if ( container.classList.contains('type-skill')) container.style.display = "flex"
    else container.style.display = "none"    
  })
})

upgradesNavButton.addEventListener("click", function() {
  const upgradeContainers = document.querySelectorAll(".upgrade")

  upgradeContainers.forEach((container) => {
    if ( container.classList.contains('type-upgrade')) container.style.display = "flex"
    else container.style.display = "none"
  })
})

artifactsNavButton.addEventListener("click", function() {
  const upgradeContainers = document.querySelectorAll(".upgrade")

  upgradeContainers.forEach((container) => {
    if ( container.classList.contains('type-artifact')) container.style.display = "flex"
    else container.style.display = "none"
  })
})

window.incrementGem = incrementGem
window.buyUpgrade = buyUpgrade
window.save = save
window.load = load
window.prestige = prestige
