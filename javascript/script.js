const goku = document.querySelector('.goku');
const pipe = document.querySelector('.nuvemdbz');
const gameOverImg = document.querySelector('.gokugt');
const btnReiniciar = document.querySelector('.btn-reiniciar');
const gameBoard = document.querySelector('.game-board');

let pulando = false;
let gameOver = false;

// --- PULO ---
function pular() {
  if (pulando || gameOver) return;
  pulando = true;
  goku.classList.add('jump');
  setTimeout(() => {
    goku.classList.remove('jump');
    pulando = false;
  }, 500);
}

// --- TECLADO (PC) ---
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    pular();
  }
});

// --- TOQUE (CELULAR / SAFARI) ---
// Adiciona nos dois: gameBoard e document, para garantir no Safari
gameBoard.addEventListener('touchstart', (e) => {
  e.preventDefault();
  pular();
}, { passive: false });

document.addEventListener('touchstart', (e) => {
  e.preventDefault();
  pular();
}, { passive: false });

// --- CLIQUE (PC e fallback) ---
gameBoard.addEventListener('click', () => {
  pular();
});

// --- DETECÇÃO DE COLISÃO ---
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
    const leftPos = gokuRect.left - boardRect.left;
    const bottomPos = boardRect.bottom - gokuRect.bottom;

    goku.style.display = 'none';
    gameOverImg.style.display = 'block';
    gameOverImg.style.left = leftPos + 'px';
    gameOverImg.style.bottom = bottomPos + 'px';
    gameOverImg.style.transform = 'none';
    gameOverImg.style.top = 'auto';
    btnReiniciar.style.display = 'block';
  }
}, 10);
