const suits = ["01", "02", "03", "04"];
const cardNums = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11J", "12Q", "13K"];

let cardDeck = [];

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
      cardDeck.push(cardObjectTemplate);
    });
  });
}

makeCardArray();

let cardArrayIndexNum = -1;
const currentCard = document.querySelector("#current-show");
const nextButton = document.querySelector("#next");
nextButton.addEventListener("click", () => {
  cardArrayIndexNum++;
  currentCard.innerHTML = `<img src="${cardDeck[cardArrayIndexNum].cardSvg}">`;
});

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

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  cardArrayIndexNum = -1;
  currentCard.innerHTML = "";
  clearCards();
  shuffle(cardDeck);
  showDeck();
});

showDeck();
