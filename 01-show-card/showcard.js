const suits = ["01", "02", "03", "04"];
const cardNums = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11J", "12Q", "13K"];

let cardDeck = [];
const orderedCardDeck = [];

let cardObjectTemplate = {
  cardName: "",
  cardSvg: "",
};

function makeCardArray() {
  suits.forEach((s) => {
    cardNums.forEach((n) => {
      cardObjectTemplate = {
        cardName: `${s}-${n}`,
        cardSvg: `../SVGs/${s}-${n}.svg`,
      };
      orderedCardDeck.push(cardObjectTemplate);
    });
  });
}

makeCardArray();
cardDeck = orderedCardDeck;

// Show any random card, with repeats
const nextButton = document.querySelector("#next");
nextButton.addEventListener("click", () => {
  const randomIndex = Math.ceil(Math.random() * cardDeck.length);
  const currentCard = document.querySelector("#current-show");
  currentCard.innerHTML = `<img src="${cardDeck[randomIndex].cardSvg}">`;
});

let shuffledDeck = [];
function shuffle(deck) {
  for (i = deck.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * i);
    // shuffledDeck.push(cardDeck[grabIndex]);
    // cardDeck.splice(grabIndex, 1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  console.log(deck);
}
console.log(cardDeck);
shuffle(cardDeck);

console.log(cardDeck);
/*
function showDeck() {
  const fullDeckDiv = document.querySelector("#full-deck");
  for (i = 0; i < shuffledDeck.length; i++) {
    let card = document.createElement("img");
    // console.log(card, i);
    card.setAttribute("src", `${shuffledDeck[i].cardSvg}`);
    fullDeckDiv.appendChild(card);
    console.log("show deck done");
  }
}

function clearCards() {
  const fullDeckDiv = document.querySelector("#full-deck");
  fullDeckDiv.innerHTML = "";
}

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  makeCardArray();
  clearCards();
  shuffle();
  showDeck();
});

// showDeck();

// console.log(shuffledDeck);
*/
