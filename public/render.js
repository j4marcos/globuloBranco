


export const initGame = (gameData) => {
    const map = document.createElement('div')
    map.className = 'map'
    map.style.width = gameData.map.width + 'px'
    map.style.height = gameData.map.height + 'px'
    map.style.borderRadius = gameData.map.shape === 'circle' ? '50%' : '0'
    map.style.backgroundColor = gameData.map.bgcolor
    document.body.appendChild(map)
    
    gameData.globulos.forEach(globulo => {
        const globuloElement = document.createElement('div')
        globuloElement.className = 'globulo'
        globuloElement.style.width = globulo.size + 'px'
        globuloElement.style.height = globulo.size + 'px'
        globuloElement.style.backgroundColor = globulo.color
        globuloElement.style.left = globulo.x + 'px'
        globuloElement.style.top = globulo.y + 'px'
        document.querySelector('.map').appendChild(globuloElement)
    })
    gameData.bacterias.forEach(bacteria => {
        const bacteriaElement = document.createElement('div')
        bacteriaElement.className = 'bacteria'
        bacteriaElement.style.width = bacteria.size + 'px'
        bacteriaElement.style.height = bacteria.size + 'px'
        bacteriaElement.style.backgroundColor = bacteria.color
        bacteriaElement.style.left = bacteria.x + 'px'
        bacteriaElement.style.top = bacteria.y + 'px'
        document.querySelector('.map').appendChild(bacteriaElement)
    })
    gameData.virus.forEach(virus => {
        const virusElement = document.createElement('div')
        virusElement.className = 'virus'
        virusElement.style.width = virus.size + 'px'
        virusElement.style.height = virus.size + 'px'
        virusElement.style.backgroundColor = virus.color
        virusElement.style.left = virus.x + 'px'
        virusElement.style.top = virus.y + 'px'
        document.querySelector('.map').appendChild(virusElement)
    })
}

