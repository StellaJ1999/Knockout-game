let knockoutNumber; //sparar det valda knockout numret
let score = 0; //startpoäng
let gameOver = false;

//om spelet redan tagit slut måste spelaren refresha
function startGame() {
  if (gameOver) {
    refreshGame();
    return;
  }
//hämta knockoutnumret från inputen, se till att knockoutsiffran gäller, och meddela om den inte gör det
  knockoutNumber = parseInt(document.getElementById("knockout-number").value);
  if (![6, 7, 8, 9].includes(knockoutNumber)) {
    document.getElementById("message").innerText = "Välj en knockoutsiffra";
    return;
  }
//enable och disable de olika knapparna för vad som gäller när spelet startas
  document.getElementById("start-button").disabled = true;
  document.getElementById("knockout-number").disabled = true;
  document.getElementById("roll-button").disabled = false;
  document.getElementById("refresh-button").disabled = true;
  document.getElementById("message").innerText = "";
  document.getElementById("score").innerText = "0";
  rollDice();
}

function rollDice() {
  if (gameOver) return;
//Slumpa nummer mellan 1 och 6 på båda tärningarna
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
//updatera display på båda tärningarna
  document.getElementById("dice1").innerText = dice1;
  document.getElementById("dice2").innerText = dice2;
//räkna ihop poängen på båda tärningarna och addera till poängen
  const total = dice1 + dice2;
  score += total;
  document.getElementById("score").innerText = score;
//om tärningarnas adderade värde är knockoutsiffran visas "KNOCKOUT"
  if (total === knockoutNumber) {
    endGame("KNOCKOUT");
  }
}
//enable och disable knapparna enligt funktionen game over
function endGame(message) {
  gameOver = true;
  document.getElementById("refresh-button").disabled = false;
  document.getElementById("message").innerText = message;
  document.getElementById("roll-button").disabled = true;
}
//enable och disable knapparna när man trycker på starta om samt reset poängen till 0
function refreshGame() {
  gameOver = false;
  document.getElementById("start-button").disabled = false;
  document.getElementById("knockout-number").disabled = false;
  document.getElementById("refresh-button").disabled = true;
  document.getElementById("dice1").innerText = "0";
  document.getElementById("dice2").innerText = "0";
  score = 0; //reset poäng till 0
  document.getElementById("score").innerText = "0";
  document.getElementById("message").innerText = "";
}