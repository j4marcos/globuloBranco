const globolo_branco = document.getElementById('globolo_branco')
const tela = document.querySelector('.tela')
const seta = document.querySelector('.seta')
const mapa = document.querySelector('.mapa')

let mouseX = false
let mouseY = false

let passoX
let passoY
let velocidade = 1.5
let angulo

let colisaoTop = false
let colisaoBottom = false
let colisaoLeft = false
let colisaoRight = false


setInterval(() => {
  if (mouseX) {
    direcaoMover()

  }
  mouseSeta() // bom! 
  moverGlobulo() // bom! falta deixar o movimento suave (angulo do passo)
  moverTela() // certo!!!
  verificarColisao() // bom! falta colidir com os inimigos
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
  seta.style.display = 'none'
})


function direcaoMover() {
  const posicaoX = globolo_branco.offsetLeft + globolo_branco.offsetWidth / 2
  const posicaoY = globolo_branco.offsetTop + globolo_branco.offsetHeight / 2

  const cosX = mouseX - posicaoX
  const senY = posicaoY - mouseY

  angulo = calcularAngulo(cosX, senY)

  //cada passo do objeto na direção do mouse
  passoY = Math.cos(angulo)
  passoX = Math.sin(angulo)
}


function calcularAngulo(coseno, seno) {
  var anguloRad = Math.atan2(coseno, seno);
  // var anguloGraus = (anguloRad * 180) / Math.PI;
  return anguloRad;
}


function mouseSeta() {
  seta.style.display = 'block'
  seta.style.left = `${mouseX}px`
  seta.style.top = `${mouseY}px`
  seta.style.transform = `rotate(${angulo}rad)`
}


function moverGlobulo() {
  let posicaoX = globolo_branco.offsetLeft
  let posicaoY = globolo_branco.offsetTop

  movimentoBarrado()

  posicaoX += passoX * velocidade 
  posicaoY -= passoY * velocidade 

  globolo_branco.style.left = posicaoX + 'px'
  globolo_branco.style.top = posicaoY + 'px'

  globolo_branco.style.transform = `rotate(${angulo}rad)`
}


function moverTela() {
  window.scroll(globolo_branco.offsetLeft - window.innerWidth / 2, globolo_branco.offsetTop - window.innerHeight / 2)
}

function verificarColisao() {
  let tocando = 0
  // verificando o mapa
  if (globolo_branco.offsetLeft < mapa.offsetLeft) {
    colisaoLeft = true
  } else { colisaoLeft = false }

  if (globolo_branco.offsetLeft > mapa.offsetLeft + mapa.offsetWidth - globolo_branco.offsetWidth) {
    colisaoRight = true
  } else { colisaoRight = false}

  if (globolo_branco.offsetTop < mapa.offsetTop) {
    colisaoTop = true
  } else { colisaoTop = false }
  
  if (globolo_branco.offsetTop > mapa.offsetTop + mapa.offsetHeight - globolo_branco.offsetHeight) {
    colisaoBottom = true
  } else { colisaoBottom = false}

  if (colisaoBottom || colisaoLeft || colisaoRight || colisaoTop) {tocando++}

  // verificando os corpos
  const bacterias = document.querySelectorAll('.bacteria')
  const virus = document.querySelectorAll('.virus')
  

  bacterias.forEach((bacteria) => {
    if (checkCollision(globolo_branco, bacteria)) {
      tocando++
    }
  })
  
  virus.forEach((virus) => {
    if (checkCollision(globolo_branco, virus)) {
      tocando++
    }
  })

  if (tocando > 0) {
    globolo_branco.style.backgroundColor = 'red'
  } else {
    globolo_branco.style.backgroundColor = 'white'
  }
}

function checkCollision(element1, element2) {
  var rect1 = element1.getBoundingClientRect();
  var rect2 = element2.getBoundingClientRect();
  
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function movimentoBarrado() {

  if (colisaoTop) {
    passoY > 0 ? passoY = 0 : 0
  }
  if (colisaoBottom) {
    passoY < 0 ? passoY = 0 : 0
  }
  if (colisaoLeft) {
    passoX < 0 ? passoX = 0 : 0
  }
  if (colisaoRight) {
    passoX > 0 ? passoX = 0 : 0
  }
}


function moverBacterias() { }
function moverVirus() { }

function comer() {}
function digestao() {}

function evoluir() {}