const suits = ["01", "02", "03", "04"];
const cardNums = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11J", "12Q", "13K"];

let cardDeck = [];

let cardObjectTemplate = {
  cardName: "",
  // 2-6 = +1
  // 7-9 = 0
  // 10-A = -1
  cardValue: "",
  cardSvg: "",
};

function makeCardArray(deckCount) {
  suits.forEach((s) => {
    cardNums.forEach((n, i) => {
      if (i > 8 || i === 0) {
        v = -1;
      } else if (i < 5) {
        v = 1;
      } else {
        v = 0;
      }
      cardObjectTemplate = {
        cardName: `${s}-${n}`,
        cardValue: v,
        cardSvg: `../SVGs/${s}-${n}.svg`,
      };
      for (repetition = deckCount; repetition > 0; repetition--) {
        cardDeck.push(cardObjectTemplate);
      }
    });
  });
}

makeCardArray(0);

let shuffledDeck = [];
function shuffle(deck) {
  for (i = deck.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * i);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  console.log(deck);
}

function showDeck() {
  const fullDeckDiv = document.querySelector("#full-deck");
  for (i = 0; i < cardDeck.length; i++) {
    let card = document.createElement("img");
    // console.log(card, i);
    card.setAttribute("src", `${cardDeck[i].cardSvg}`);
    fullDeckDiv.appendChild(card);
    console.log("show deck done");
  }
}

function clearCards() {
  const fullDeckDiv = document.querySelector("#full-deck");
  fullDeckDiv.innerHTML = "";
}

const runCount = document.querySelector("#run");
function showRunningCount() {
  runCount.innerText = cardArrayIndexNum + 1;
}

function showTheCount() {
  const theCountDiv = document.querySelector("#the-count");
  theCountDiv.innerText = theCount;
}

function getDeckAmount() {
  const deckInput = document.querySelector("#deck-amount");
  return deckInput.value;
}

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  cardDeck = [];
  makeCardArray(getDeckAmount());
  cardArrayIndexNum = -1;
  currentCard.innerHTML = "";
  clearCards();
  shuffle(cardDeck);
  showDeck();
  runCount.innerText = 0;
  theCount = 0;
});

showDeck();

let theCount = 0;
function addUpTheCount() {
  theCount += cardDeck[cardArrayIndexNum].cardValue;
}

let cardArrayIndexNum = -1;
const currentCard = document.querySelector("#current-show");
const nextButton = document.querySelector("#next");
nextButton.addEventListener("click", () => {
  cardArrayIndexNum++;
  currentCard.innerHTML = `<img src="${cardDeck[cardArrayIndexNum].cardSvg}">`;
  addUpTheCount();
  showRunningCount();
  showTheCount();
});
