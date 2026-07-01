const goku = document.querySelector('.goku');
const pipe = document.querySelector('.nuvemdbz');
const gameOverImg = document.querySelector('.gokugt');
const btnReiniciar = document.querySelector('.btn-reiniciar');
const gameBoard = document.querySelector('.game-board');

let pulando = false;
let gameOver = false;

function pular() {
  if (pulando || gameOver) return;
  pulando = true;
  goku.classList.add('jump');
  setTimeout(() => {
    goku.classList.remove('jump');
    pulando = false;
  }, 500);
}

// Teclado (PC)
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    pular();
  }
});

// Pointer events cobre mouse, touch e caneta em um único listener.
// Como as imagens ganharam pointer-events:none no CSS, o toque
// "atravessa" elas e cai direto aqui, evitando o bug do iOS de
// tratar o toque em cima de uma <img> como gesto de salvar imagem.
gameBoard.addEventListener('pointerdown', (e) => {
  if (e.target.closest('.btn-reiniciar')) return; // não pula ao clicar em reiniciar
  e.preventDefault();
  pular();
}, { passive: false });

// Colisão
setInterval(() => {
  if (gameOver) return;

  const gokuRect = goku.getBoundingClientRect();
  const pipeRect = pipe.getBoundingClientRect();

  const margem = 12; // margem de tolerância simétrica (antes estava "comendo" toda a hitbox)
  const colidiu =
    gokuRect.right - margem > pipeRect.left + margem &&
    gokuRect.left + margem < pipeRect.right - margem &&
    gokuRect.bottom - margem > pipeRect.top + margem;

  if (colidiu) {
    gameOver = true;
    pipe.style.animationPlayState = 'paused';

    const boardRect = gameBoard.getBoundingClientRect();
    goku.style.display = 'none';
    gameOverImg.style.display = 'block';
    gameOverImg.style.left = (gokuRect.left - boardRect.left) + 'px';
    gameOverImg.style.bottom = (boardRect.bottom - gokuRect.bottom) + 'px';
    gameOverImg.style.transform = 'none';
    gameOverImg.style.top = 'auto';
    btnReiniciar.style.display = 'block';
  }
}, 10);
