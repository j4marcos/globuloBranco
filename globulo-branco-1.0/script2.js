const globolo_branco = document.getElementById('globolo_branco');
const tela = document.querySelector('.tela');
const virus = document.querySelectorAll('.virus');

tela.addEventListener('click', (click) => {
    mover(click)
});


function mover(click) {
    const posicaoX = Number(globolo_branco.style.left.replace('px', ''))
    const posicaoY = Number(globolo_branco.style.top.replace('px', ''))

    const destinoX = click.pageX
    const destinoY = click.pageY

    diferencaX = destinoX - posicaoX
    diferencaY = destinoY - posicaoY

  
        globolo_branco.style.top = click.pageY + 'px'
        globolo_branco.style.left = click.pageX + 'px';
    
    setTimeout(() => {
        moverTela(click)

    }, 1)

    function moverTela(click) {

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const globoloWidth = globolo_branco.offsetWidth;
        const globoloHeight = globolo_branco.offsetHeight;
        const centerX = click.pageX - diferencaX / 2;
        const centerY = click.pageY - diferencaY / 2;
        const scrollX = centerX - viewportWidth / 2 + globoloWidth / 2;
        const scrollY = centerY - viewportHeight / 2 + globoloHeight / 2;
        window.scroll(scrollX, scrollY);
    
    
    }






}

function scale_number(unscaled, to_min, to_max, from_min, from_max) {
    return (to_max - to_min) * (unscaled - from_min) / (from_max - from_min) + to_min
}