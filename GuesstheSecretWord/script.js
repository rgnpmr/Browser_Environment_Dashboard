const words = ["apple", "banana", "grape", "orange", "peach"];
let secretWord;
let attemptsLeft;
const maxAttempts = 5;

function startGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    attemptsLeft = maxAttempts;
    document.getElementById("message").innerText = "";
    document.getElementById("restart").style.display = "none";
    document.getElementById("guessInput").value = ""; 
    console.log("Secret Word (for testing):", secretWord);
}

function submitGuess() {
    const guessInput = document.getElementById("guessInput");
    const userGuess = guessInput.value.trim().toLowerCase();
    guessInput.value = "";

    
    if (userGuess == "") {
        displayMessage(`Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`);
        return;
    }

    if (userGuess == secretWord) {
        displayMessage("Congratulations! You guessed the secret word!");
        document.body.style.backgroundColor = "lightblue";
        document.getElementById("restart").style.display = "block";
    } else {
        attemptsLeft--; 
        if (attemptsLeft > 0) {
            displayMessage(`Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`);
            document.body.style.backgroundColor = "lightcoral";
        } else {
            displayMessage(`Game over! The secret word was "${secretWord}".`);
            document.getElementById("restart").style.display = "block";
        }
    }
}

function displayMessage(message) {
    document.getElementById("message").innerText = message;
}

function restartGame() {
    startGame();
    document.body.style.backgroundColor = "";
}

document.getElementById("submitGuess").addEventListener("click", submitGuess);
document.getElementById("guessInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        submitGuess();
    }
});

startGame();