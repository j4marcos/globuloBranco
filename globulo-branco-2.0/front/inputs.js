const mapa = document.body.querySelector(".map");
const tela = window.innerWidth
var clicando = false
var vetorDirecao = {
    x : 0,
    y : 0
}
const inputs = {
    id,
    vetorDirecao,
    clicando
}

if (tela > 500 ) {
window.addEventListener('mousemove', function(e) {
    const player = mapa.querySelector(`#ID${id}`);
    if(!player) return
    let playerFoco = player.getBoundingClientRect()
    playerFoco.X = playerFoco.left + playerFoco.height /2
    playerFoco.Y = playerFoco.top + playerFoco.height /2
    
    let x = e.x - playerFoco.X
    let y = playerFoco.Y - e.y

    let norma = Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
    vetorDirecao.x = x/norma
    vetorDirecao.y = y/norma

    // console.log(vetorDirecao.x, vetorDirecao.y, clicando)

});

window.addEventListener('mousedown', function(e) {
    clicando = true
});

window.addEventListener('mouseup', function(e) {
    clicando = false
});
}


if (tela <= 500 ) {
    const controle = document.body.querySelector(".controle")
    controle.innerHTML = `<div class="dpad"><div class="botao"></div></div>`;
    const Dpad = controle.querySelector(".dpad")
    const botao = controle.querySelector(".botao");

    window.addEventListener('mousemove', function(e) {
        let area = Dpad.getBoundingClientRect()
        let alavancaX = area.left + area.height /2
        let alavancaY = area.top + area.height /2
        
        let x = e.x - alavancaX
        let y = alavancaY - e.y
    
        let norma = Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
        vetorDirecao.x = x/norma
        vetorDirecao.y = y/norma
    
        console.log(vetorDirecao.x, vetorDirecao.y, clicando)
    
    });

    
    botao.addEventListener('mousedown', function(e) {
        clicando = true
    });
    
    window.addEventListener('mouseup', function(e) {
        clicando = false
    });
}


setInterval(() => {
localStorage.setItem(`ID${id}`, JSON.stringify(inputs))
vetorDirecao.x = 0 
vetorDirecao.y = 0 
}, 100);