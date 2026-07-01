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

// Safari/iPhone — usa touchend que é mais confiável no Safari
document.addEventListener('touchend', (e) => {
  e.preventDefault();
  pular();
}, { passive: false });

// Fallback clique
document.addEventListener('click', () => {
  pular();
});

// Colisão
setInterval(() => {
  if (gameOver) return;

  const gokuRect = goku.getBoundingClientRect();
  const pipeRect = pipe.getBoundingClientRect();

  const margem = 30;
  const colidiu =
    gokuRect.right - margem > pipeRect.left &&
    gokuRect.left + margem < pipeRect.right &&
    gokuRect.bottom - margem > pipeRect.top;

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
