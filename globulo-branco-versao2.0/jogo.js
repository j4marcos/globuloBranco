// receber 
// calcular 
// atualizar


server()

function server() {
    console.log("server on!")
    inicializarDados()
    setInterval(() => {
        calcularDados()
    }, 100);
}


function inicializarDados() {
    localStorage.clear()
    gameDATA = {
        mapa : {
            width : "500px",
            Height : "500px",
            color : "gray"
        },
        numeroPlayers : 0,
        players : [],
        bacterias : [],
        virus: [],
        particulas: []
       }
     
    localStorage.setItem("gameDATA", JSON.stringify(gameDATA))
    }

function calcularDados() {
    const gameData = JSON.parse(localStorage.getItem("gameDATA"))

    //verifica se a pedidos pra entrar, se tiver cria o player
    const playerRequestID = JSON.parse(localStorage.getItem("request"))
    if (playerRequestID) {
    
        let playerData = {
            id : playerRequestID,
            x : 250,
            y : 250, 
            width : 50,
            Height : 50,
            forma : 0
        }
        localStorage.removeItem("request")
        gameData.players.push(playerData)
        }

    if (gameData.players.length > 0) {
    gameData.players.forEach(playerData => {
        playerInputs = JSON.parse(localStorage.getItem(`ID${playerData.id}`))
        playerData.x +=  playerInputs.vetorDirecao.x * 40
        playerData.y -=  playerInputs.vetorDirecao.y * 40

        if(playerInputs.clicando) {
            playerData.forma = 1
        } else {
            playerData.forma = 0
        }
    });}


    localStorage.setItem("gameDATA", JSON.stringify(gameData));

}

