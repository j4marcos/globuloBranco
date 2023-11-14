
const map = document.body.querySelector(".map")
const horas = new Date();
const id = window.innerWidth * horas.getSeconds() + horas.getMilliseconds() ///receber id do server
setInterval(() => {
    gerarElementos()    
}, 100);



function gerarElementos() {
    const gameData = JSON.parse(localStorage.getItem("gameDATA"))

    map.style.width = gameData.mapa.width
    map.style.height = gameData.mapa.height
    map.style.backgroundColor = gameData.mapa.color
    let presença = false

    gameData.players.forEach(player => {
        const jogador = map.querySelector(`#ID${player.id}`)
        
        if (jogador) {
            jogador.style.left = `${player.x}px`
            jogador.style.top = `${player.y}px`
            if(player.id == id) {
                jogador.style.backgroundColor = "green"
                presença = true
        }
        } else {
            var e = document.createElement("div")
            e.classList.add("globolo")
            e.id = `ID${player.id}`
            e.style.left = `${player.x}px`
            e.style.top = `${player.y}px`
            map.appendChild(e)
        }
    });

    if (!presença) localStorage.setItem("request", JSON.stringify(id));
}


