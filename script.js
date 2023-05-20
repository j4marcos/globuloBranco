const globolo_branco = document.getElementById('globolo_branco')
const tela = document.querySelector('.tela')
const mapa = document.querySelector(".mapa")
const virus = document.querySelectorAll('.virus')
let mouseX = false
let mouseY = false

let passoX
let passoY
let angulo

setInterval(() => {
  if (mouseX) {
    direcaoMover()
  }
  moverGlobulo()
  moverTela()
  colisao()
  moverBacterias()
  moverVirus()

}, 1);


tela.addEventListener('mousemove', (mouse) => {
  mouseX = mouse.pageX
  mouseY = mouse.pageY
})

tela.addEventListener('mouseout', () => {
  mouseX = false
  mouseY = false
  passoX = 0
  passoY = 0
})






function direcaoMover() {

  const posicaoX = globolo_branco.offsetLeft
  const posicaoY = globolo_branco.offsetTop

  const cosX = mouseX - posicaoX
  const senY = posicaoY - mouseY

  angulo = calcularAngulo(senY, cosX)

  //cada passo do objeto na direção do mouse
  passoX = Math.cos(angulo)
  passoY = Math.sin(angulo)

}

function calcularAngulo(seno, coseno) {
  var anguloRad = Math.atan2(seno, coseno);
  // var anguloGraus = (anguloRad * 180) / Math.PI;
  return anguloRad;
}

function moverGlobulo() {

  let posicaoX = globolo_branco.offsetLeft
  let posicaoY = globolo_branco.offsetTop

    posicaoX += passoX 
    posicaoY -= passoY


    console.log(-15 + Math.abs(1))

    globolo_branco.style.left = posicaoX + 'px'
    globolo_branco.style.top = posicaoY + 'px'

  // globolo_branco.style.transform = `rotate(${angulo}rad)`

}

function moverTela() {

  window.scroll(globolo_branco.offsetLeft - window.innerWidth/2,globolo_branco.offsetTop - window.innerWidth/2 )

 }





function colisao() { }
function moverBacterias() { }
function moverVirus() { }