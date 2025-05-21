const prompt = require('prompt-sync')();

function drawCard() {
  // Card values: 2-10, face cards as 10, Ace as 11
  const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
  const card = cards[Math.floor(Math.random() * cards.length)];
  return card;
}

function calculateTotal(hand) {
  let total = hand.reduce((sum, val) => sum + val, 0);

  // Handle Aces: if total > 21, convert 11 to 1
  let aces = hand.filter(card => card === 11).length;
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

function printHand(name, hand) {
  console.log(`${name}'s hand: [${hand.join(', ')}] → total: ${calculateTotal(hand)}`);
}

function blackjackGame() {
  console.log("🃏 Welcome to Blackjack!");

  let playerHand = [drawCard(), drawCard()];
  let dealerHand = [drawCard(), drawCard()];

  printHand("Your", playerHand);
  console.log(`Dealer shows: ${dealerHand[0]}`);

  // Player's turn
  while (calculateTotal(playerHand) < 21) {
    let choice = prompt("Hit or stand? ").toLowerCase();
    if (choice === "hit") {
      playerHand.push(drawCard());
      printHand("Your", playerHand);
    } else if (choice === "stand") {
      break;
    } else {
      console.log("Invalid input. Type 'hit' or 'stand'.");
    }
  }

  let playerTotal = calculateTotal(playerHand);
  if (playerTotal > 21) {
    console.log("💥 You busted! Dealer wins.");
    return;
  }

  // Dealer's turn
  console.log("\n🧑‍💼 Dealer's turn...");
  printHand("Dealer", dealerHand);
  while (calculateTotal(dealerHand) < 17) {
    dealerHand.push(drawCard());
    printHand("Dealer", dealerHand);
  }

  let dealerTotal = calculateTotal(dealerHand);

  console.log("\n🧾 Final Hands:");
  printHand("Your", playerHand);
  printHand("Dealer", dealerHand);

  if (dealerTotal > 21 || playerTotal > dealerTotal) {
    console.log("✅ You win!");
  } else if (playerTotal < dealerTotal) {
    console.log("❌ Dealer wins.");
  } else {
    console.log("🤝 It's a tie!");
  }
}

// Loop the game
while (true) {
  blackjackGame();
  let again = prompt("\nPlay again? (yes/no): ").toLowerCase();
  if (again !== "yes") break;
  console.clear();
}
