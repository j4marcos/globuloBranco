const globolo_branco = document.getElementById('globolo_branco')
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
let borda
let forma = 'neutra'
let digestao
let elementoComendo
let infectando = false

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
  moverGlobulo(globolo_branco)
  formaAtual()
  moverTela()
  verificarColisao()
  moverBacterias()
  moverVirus()
  // interfaceDeDados()
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


function moverGlobulo(globolo_branco) {
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
  window.scroll(globolo_branco.offsetLeft - window.innerWidth / 2 + globolo_branco.offsetWidth / 2, globolo_branco.offsetTop - window.innerHeight / 2 + globolo_branco.offsetHeight / 2)
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
  } else { colisaoRight = false }

  if (globolo_branco.offsetTop < mapa.offsetTop) {
    colisaoTop = true
  } else { colisaoTop = false }

  if (globolo_branco.offsetTop > mapa.offsetTop + mapa.offsetHeight - globolo_branco.offsetHeight) {
    colisaoBottom = true
  } else { colisaoBottom = false }

  if (colisaoBottom || colisaoLeft || colisaoRight || colisaoTop) { elementoColidindo = mapa }

  // verificando os corpos
  const bacterias = document.querySelectorAll('.bacteria')
  const virus = document.querySelectorAll('.virus')


  bacterias.forEach((bacteria) => {
    if (checkCollision(globolo_branco, bacteria)) {
      if (bacteria != elementoComendo) {
        elementoColidindo = bacteria
      }
    }
  })

  virus.forEach((virus) => {
    if (checkCollision(globolo_branco, virus)) {
      if (virus != elementoComendo) {
        elementoColidindo = virus
      }
    }
  })

  if (elementoColidindo && !elementoColidindo.classList.contains('hospedeiro')) {
    globolo_branco.style.borderColor = 'red'
  } else {
    globolo_branco.style.borderColor = 'white'
  }

  if (forma == 'comer' && !digestao) {
      globolo_branco.style.borderTop = `${borda}px solid   transparent`
  }


  if (forma == "comer" && !infectando &&  elementoColidindo && elementoColidindo != mapa && !digestao && !globolo_branco.innerHTML.includes('virus_coroa') && !elementoColidindo.classList.contains('hospedeiro')) {
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
  const visual = globolo_branco.style

  if (digestao) {
    tamanho = 100 + elementoComendo.offsetHeight / 4
    velocidade = 1
    visual.opacity = '1'
    visual.border = '10px solid white'
    visual.borderTop = '10px solid white'
    visual.backgroundColor = 'white'
  } else {

    if (forma == "neutra") {
      tamanho = 100
      velocidade = 1.7
      borda = 10
      visual.opacity = '1'
      visual.border = '10px solid white'
      visual.borderTop = '10px solid white'
      visual.backgroundColor = 'white'

      globolo_branco.childElementCount > 0 ? poderes(globolo_branco.children, 'cancelar') : 0

    } else if (forma == "comer") {
      tamanho = 0
      velocidade = 1
      borda = 50
      visual.border = `${borda}px solid white`
      visual.borderTop = `${borda}px solid   transparent`
      visual.backgroundColor = 'transparent'

      globolo_branco.childElementCount > 0 ? poderes(globolo_branco.children) : 0
    }
  }

  visual.width = tamanho + 'px'
  visual.height = tamanho + 'px'

}


function comer() {
  globolo_branco.innerHTML = ''

  elementoComendo = elementoColidindo
  elementoColidindo.style.position = 'unset'
  globolo_branco.appendChild(elementoColidindo)
  elementoComendo.style.opacity = '0.5'

  digestao = true
  setTimeout(() => {
    digestao = false
    globolo_branco.innerHTML = ''
    globolo_branco.innerHTML = elementoComendo.innerHTML
    elementoComendo = false
    forma = 'neutra'
  }, 3000)
}


function poderes(poderInnerHTML, cancelar) {
  poderInnerHTML[0].classList.contains('virus_coroa') ? virusCoroa(cancelar) : 0

  poderInnerHTML[0].classList.contains('rna') ? rna(poderInnerHTML, cancelar) : 0

  poderInnerHTML[0].classList.contains('rabinho') ? rabinho(cancelar) : 0
}


function virusCoroa(cancelar) {
  const coroa = document.querySelector('.virus_coroa')
  coroa.style.borderTop = '10px dashed transparent'
  tamanho = 50
  borda = 25
  globolo_branco.style.border = `${borda}px dashed white`

 if (cancelar) {
    coroa.style.borderTop = '10px dashed white'
  }

  if (forma == "comer" && !infectando &&  elementoColidindo && elementoColidindo != mapa && !digestao && !elementoColidindo.classList.contains('hospedeiro') && !elementoColidindo.classList.contains('virus')) {infectar()}
  

  if (infectando && !cancelar && forma == 'comer') {
    const cadaver = document.createElement('div')
    cadaver.classList.add('corpo')
    cadaver.style.opacity = '0.3'
    cadaver.innerHTML = globolo_branco.innerHTML
    globolo_branco.innerHTML = ''
    cadaver.style.position = 'absolute'
    cadaver.style.top = globolo_branco.style.top
    cadaver.style.left = globolo_branco.style.left
    cadaver.style.width = 'fit-content'
    cadaver.style.height = 'fit-content'
    mapa.appendChild(cadaver)

    elementoComendo = false
    infectando = false
  }

}

function infectar(cancelar) {

 infectando = elementoColidindo
 infectando.classList.add('hospedeiro')
 globolo_branco.appendChild(infectando)
 const hospedeiro = globolo_branco.querySelector('.hospedeiro')
 hospedeiro.style.width = elementoColidindo.style.width
 hospedeiro.style.height = elementoColidindo.style.height
 
 
forma = 'neutra'
 
}

function rna(barras, cancelar) {
  if (barras.length > 1 && !cancelar) {
    for (c = 1; c < barras.length; c++) {
      const clone = document.createElement('div')
      clone.id = 'globolo_branco'
      clone.classList.add('clone')
      clone.innerHTML = '<div class="rna"></div>'
      clone.style.top = globolo_branco.offsetTop + 'px'
      clone.style.left = globolo_branco.offsetLeft + 'px'

      mapa.appendChild(clone)
      globolo_branco.innerHTML = '<div class="rna"></div>'

    }
  } else if (!cancelar) {
    const clones = document.querySelectorAll('.clone')
    clones.forEach((clone) => {
      moverGlobulo(clone)

    })
  }



}

function rabinho(rabinho) {
  console.log('vum!')
}










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
