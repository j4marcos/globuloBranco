const globolo_branco = document.querySelector('.globulo_branco')
const tela = document.querySelector('.tela')
const seta = document.querySelector('.seta')
const mapa = document.querySelector('.mapa')
const interface = document.querySelector('.interface')

let mouseX = false
let mouseY = false

let passoX
let passoY
let velocidade 
let angulo
let tamanho
let forma = 'neutra'
let digestao
let elementoComendo

let colisaoTop = false
let colisaoBottom = false
let colisaoLeft = false
let colisaoRight = false
let elementoColidindo 


setInterval(() => {
  if (mouseX) {
    direcaoMover()
  }
  // mouseSeta() 
  moverGlobulo()
  formaAtual()
  moverTela() 
  verificarColisao()
  moverBacterias()
  moverVirus()
  interfaceDeDados()
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

tela.addEventListener('mousedown', (mousedown) => {
 forma = 'comer'
})

tela.addEventListener('mouseup', (mouseup) => {
 forma = 'neutra'
})

tela.addEventListener('click', (click) => {

})

tela.addEventListener('dblclick', (dbclick) => {
  poder()
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
  window.scroll(globolo_branco.offsetLeft - window.innerWidth / 2 + globolo_branco.offsetWidth/2, globolo_branco.offsetTop - window.innerHeight / 2 + globolo_branco.offsetHeight/2)
}

function verificarColisao() {
  let tocando = 0
  elementoColidindo = false
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

  if (colisaoBottom || colisaoLeft || colisaoRight || colisaoTop) {elementoColidindo = mapa}

  // verificando os corpos
  const bacterias = document.querySelectorAll('.bacteria')
  const virus = document.querySelectorAll('.virus')
  

  bacterias.forEach((bacteria) => {
    if (checkCollision(globolo_branco, bacteria)) {
      if (bacteria != elementoComendo) {
      elementoColidindo = bacteria}
    }
  })
  
  virus.forEach((virus) => {
    if (checkCollision(globolo_branco, virus)) {
      if (virus != elementoComendo) {
      elementoColidindo = virus}
    }
  }) 

  
  if (elementoColidindo) {
    globolo_branco.style.borderColor = 'red'
  } else {
    globolo_branco.style.borderColor = 'white'
  }
  if (forma != 'comer') {
    if (elementoColidindo) {
      globolo_branco.style.borderTop = 'transparent'
    } else {
      globolo_branco.style.borderTop = 'transparent'
    }
  }


  if (forma == "comer" && elementoColidindo) {
    comer()
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

function formaAtual() {

if (digestao) {
     tamanho = 100 + elementoComendo.offsetHeight/4
     velocidade = 1
     globolo_branco.style.opacity = '1'
     globolo_branco.style.border = '10px solid white'
  globolo_branco.style.borderTop = '10px solid white'
  globolo_branco.style.backgroundColor = 'white'
  } else {

 if (forma == "neutra"){
  tamanho = 100
  velocidade = 1.7
  globolo_branco.style.opacity = '1'
  globolo_branco.style.border = '10px solid white'
  globolo_branco.style.borderTop = '10px solid white'
  globolo_branco.style.backgroundColor = 'white'
  
}  else if (forma == "comer") {
  tamanho = 0
  velocidade = 1
  globolo_branco.style.border = '50px solid white'
  globolo_branco.style.borderTop = '50px solid transparent'
  globolo_branco.style.backgroundColor = 'transparent'


  // width: 0px;
  // height: 0px;
  // border:50px solid white;
  // border-width: 50px;
  // border-top: 50px solid transparent;
  // position: absolute;
  // border-radius: 50%;
  // top: 30%;
  // left: 30%;
}
  }

 globolo_branco.style.width = tamanho + 'px'
 globolo_branco.style.height = tamanho + 'px'

}


function comer() {
  globolo_branco.innerHTML = ''

  elementoComendo = elementoColidindo
  elementoColidindo.style.position = 'unset'
  globolo_branco.appendChild(elementoColidindo)
  elementoComendo.style.opacity = '0.5'

  console.log(forma,'comeu')
  digestao = true
  setTimeout(() => {
    console.log(forma,'comeu')
    digestao = false
  globolo_branco.innerHTML = ''
    evoluir()
    elementoComendo = false
}, 3000)
}



function evoluir() {
  globolo_branco.innerHTML = elementoComendo.innerHTML 
}

function poder() {}












function interfaceDeDados() {
  interface.innerHTML = `mouseX = ${mouseX}
  let mouseY = ${mouseY}
  let passoX = ${passoX}
  let passoY = ${passoY}
  let velocidade  = ${velocidade}
  let angulo = ${angulo}
  let tamanho = ${tamanho}
  let forma  = ${forma}
  let digestao = ${digestao}
  let elementoComendo = ${elementoComendo}
  let colisaoTop = ${colisaoTop}
  let colisaoBottom = ${colisaoBottom}
  let colisaoLeft = ${colisaoLeft}
  let colisaoRight = ${colisaoRight}
  let elementoColidindo = ${elementoColidindo}
`
}
