let gem = document.querySelector('.gem-cost')

let clickerCost = document.querySelector('.clicker-cost')

function incrementGem() {
    gem.innerHTML = parseFloat(gem.innerHTML) + 1
}

function buyClicker() {
    if (gem.innerHTML >= clickerCost.innerHTML) {
        gem.innerHTML -= clickerCost.innerHTML
    }
}
