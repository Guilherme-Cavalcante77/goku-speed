const goku = document.querySelector('.goku');
const nuvem = document.querySelector('.nuvemdbz');
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

// Toque (celular) — escuta direto no game-board, com touchstart
// (dispara assim que o dedo encosta, sem depender de "soltar" o toque)
gameBoard.addEventListener('touchstart', (e) => {
  if (e.target.closest('.btn-reiniciar')) return; // não pula ao tocar em reiniciar
  e.preventDefault();
  pular();
}, { passive: false });

// Clique (PC e fallback mobile)
gameBoard.addEventListener('click', (e) => {
  if (e.target.closest('.btn-reiniciar')) return;
  pular();
});

// Colisão
setInterval(() => {
  if (gameOver) return;

  const gokuRect = goku.getBoundingClientRect();
  const nuvemRect = nuvem.getBoundingClientRect();

  const margem = 12; // margem de tolerância simétrica
  const colidiu =
    gokuRect.right - margem > nuvemRect.left + margem &&
    gokuRect.left + margem < nuvemRect.right - margem &&
    gokuRect.bottom - margem > nuvemRect.top + margem;

  if (colidiu) {
    gameOver = true;
    nuvem.style.animationPlayState = 'paused';

    const boardRect = gameBoard.getBoundingClientRect();
    goku.style.display = 'none';
    gameOverImg.classList.add('show');
    gameOverImg.style.left = (gokuRect.left - boardRect.left) + 'px';
    gameOverImg.style.bottom = (boardRect.bottom - gokuRect.bottom) + 'px';
    gameOverImg.style.transform = 'none';
    gameOverImg.style.top = 'auto';
    btnReiniciar.style.display = 'block';
  }
}, 10);
