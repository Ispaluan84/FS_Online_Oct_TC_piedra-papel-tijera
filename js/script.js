// ─── Variables globales ───────────────────────────────────────────────────────
let playerScore = 0;
let computerScore = 0;

// ─── Elementos del DOM ───────────────────────────────────────────────────────
const choices = document.querySelectorAll('.choice');
const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const announcer = document.getElementById('announcer');

// ─── Funciones de ayuda ───────────────────────────────────────────────────────

// Elige aleatoriamente entre rock, paper o scissors
function getComputerChoice() {
  const options = ['rock', 'paper', 'scissors'];
  const idx = Math.floor(Math.random() * options.length);
  return options[idx];
}

// Resalta la elección del jugador o de la computadora
function revealChoice(button) {
  // Quita la clase 'active' de todas
  choices.forEach(btn => btn.classList.remove('active'));
  // Añade la clase solo al botón que corresponde
  if (button) button.classList.add('active');
}

// Suma un punto al jugador y actualiza en pantalla
function playerWins() {
  playerScore++;
  playerScoreSpan.textContent = playerScore;
}

// Suma un punto a la computadora y actualiza en pantalla
function computerWins() {
  computerScore++;
  computerScoreSpan.textContent = computerScore;
}

// Cambia la primera letra a mayúscula para textos
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Escribe el mensaje de quién ganó/empató
function announceResult(message) {
  if (!announcer) return;  // por seguridad
  announcer.textContent = message;
}

// ─── Lógica de la ronda ──────────────────────────────────────────────────────
function playRound(playerChoice) {
  const computerChoice = getComputerChoice();

  // Revela ambas elecciones
  const playerBtn   = document.querySelector(`[data-choice="${playerChoice}"]`);
  const computerBtn = document.querySelector(`[data-choice="${computerChoice}"]`);
  revealChoice(playerBtn);
  revealChoice(computerBtn);

  // Decide el resultado
  if (playerChoice === computerChoice) {
    announceResult('¡Attempted! tie again.');
  } else if (
    (playerChoice === 'rock'     && computerChoice === 'scissors') ||
    (playerChoice === 'paper'    && computerChoice === 'rock')     ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    playerWins();
    announceResult(
      `You Won! ${capitalize(playerChoice)} beats ${computerChoice}.`
    );
  } else {
    computerWins();
    announceResult(
      `You Lost ${capitalize(computerChoice)} beats ${playerChoice}.`
    );
  }
}

// ─── Event listeners ─────────────────────────────────────────────────────────
choices.forEach(btn => {
  btn.addEventListener('click', () => {
    playRound(btn.dataset.choice);
  });
});

const themeSwitcher = document.getElementById('theme-toggle');

// Asegúrate de partir siempre de “light”
if (!document.documentElement.getAttribute('data-theme')) {
  document.documentElement.setAttribute('data-theme', 'light');
}

themeSwitcher.addEventListener('click', () => {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  // Cambia el atributo en <html>
  root.setAttribute('data-theme', next);

  // Actualiza el icono del botón
  themeSwitcher.textContent = next === 'dark' ? '🌞' : '🌙';
});




