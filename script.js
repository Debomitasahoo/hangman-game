const words = ["javascript", "hangman", "programming", "coding", "computer"];
let selectedWord = "";
let guessedLetters = [];
let remainingAttempts = 6;
let incorrectGuesses = 0;

const wordDisplay = document.getElementById("word-display");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");
const incorrectGuessesDisplay = document.getElementById("incorrect-guesses");
const remainingAttemptsDisplay = document.getElementById("remaining-attempts");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset-button");
const hangmanParts = [
    document.querySelector(".rope"),
    document.querySelector(".head"),
    document.querySelector(".body"),
    document.querySelector(".left-arm"),
    document.querySelector(".right-arm"),
    document.querySelector(".left-leg"),
    document.querySelector(".right-leg")
];

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingAttempts = 6;
    incorrectGuesses = 0;
    updateWordDisplay();
    incorrectGuessesDisplay.textContent = incorrectGuesses;
    remainingAttemptsDisplay.textContent = remainingAttempts;
    messageDisplay.textContent = "";
    resetButton.style.display = "none";
    letterInput.value = "";
    guessButton.disabled = false;

    hangmanParts.forEach(part => {
        part.style.opacity = 0;
        part.style.transform = "scale(0)";
    });
}

function updateWordDisplay() {
    let displayText = "";
    for (let letter of selectedWord) {
        displayText += guessedLetters.includes(letter) ? letter + " " : "_ ";
    }
    wordDisplay.textContent = displayText.trim();
}

function handleGuess() {
    const guess = letterInput.value.toLowerCase();

    if (guess && !guessedLetters.includes(guess) && guess.length === 1) {
        guessedLetters.push(guess);

        if (selectedWord.includes(guess)) {
            updateWordDisplay();
            checkForWin();
        } else {
            incorrectGuesses++;
            remainingAttempts--;
            incorrectGuessesDisplay.textContent = incorrectGuesses;
            remainingAttemptsDisplay.textContent = remainingAttempts;

            if (incorrectGuesses <= hangmanParts.length) {
                hangmanParts[incorrectGuesses - 1].classList.add("show");
            }

            checkForLoss();
        }
    }

    letterInput.value = "";
}

function checkForWin() {
    if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {
        messageDisplay.textContent = "You Win! 🎉";
        guessButton.disabled = true;
        resetButton.style.display = "block";
    }
}

function checkForLoss() {
    if (remainingAttempts === 0) {
        messageDisplay.textContent = `You Lost! The word was: ${selectedWord}`;
        guessButton.disabled = true;
        resetButton.style.display = "block";
    }
}

guessButton.addEventListener("click", handleGuess);
resetButton.addEventListener("click", startGame);

startGame();
