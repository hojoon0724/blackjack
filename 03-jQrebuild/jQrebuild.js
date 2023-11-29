const suits = ["01", "02", "03", "04"];
const cardNums = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11J", "12Q", "13K"];

let cardDeck = [];

let cardObjectTemplate = {
  cardName: "",
  cardValue: "",
  // 2-6 = +1
  // 7-9 = 0
  // 10-A = -1
  mitCtValue: "",
  cardSvg: "",
};

function makeCardArray(deckCount) {
  suits.forEach((s) => {
    cardNums.forEach((n, i) => {
      if (i > 8 || i === 0) {
        v = -1;
      } else if (i < 6) {
        v = 1;
      } else {
        v = 0;
      }
      cardObjectTemplate = {
        cardName: `${s}-${n}`,
        mitCtValue: v,
        cardSvg: `../SVGs/${s}-${n}.svg`,
      };
      for (repetition = deckCount; repetition > 0; repetition--) {
        cardObjectTemplate.value = valueByName(cardObjectTemplate.cardName);
        cardDeck.push(cardObjectTemplate);
      }
    });
  });
}

function valueByName(card) {
  let newValue = card.split("-")[1];
  if (newValue === "11J" || newValue === "12Q" || newValue === "13K") {
    // console.log(newValue);
    newValue = 10;
    return newValue;
  }
  // return +card.split("-")[1];
  return Number(card.split("-")[1]);
  // return parseInt(card.split("-")[1]);
}

makeCardArray(2);

function shuffle(deck) {
  for (i = deck.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * i);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  console.log(deck);
}

function showDeck() {
  const $fullDeckDiv = $("#full-deck");
  for (i = 0; i < cardDeck.length; i++) {
    const $card = $("<img>");
    $card.attr("src", `${cardDeck[i].cardSvg}`);
    setTimeout(() => {
      $fullDeckDiv.append($card);
    }, i * 20);
  }
}

function clearCards() {
  const $fullDeckDiv = $("#full-deck");
  $fullDeckDiv.html("");
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

let theCount = 0;
function addUpTheCount() {
  theCount += cardDeck[cardArrayIndexNum].mitCtValue;
}

showDeck();

// -----------------------------------------------------
// shuffle
// -----------------------------------------------------
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  cardDeck = [];
  makeCardArray(getDeckAmount());
  cardArrayIndexNum = -1;
  middleShow.innerHTML = "";
  clearCards();
  shuffle(cardDeck);
  showDeck();
  runCount.innerText = 0;
  theCount = 0;
  showTheCount();
});

// -----------------------------------------------------
// card show areas
// -----------------------------------------------------
let cardArrayIndexNum = -1;
const leftShow = document.querySelector("#player-left-show");
const middleShow = document.querySelector("#player-middle-show");
const rightShow = document.querySelector("#player-right-show");
const nextButton = document.querySelector("#next");

// -----------------------------------------------------
// adapt to # of open hands
// -----------------------------------------------------

// todo - click to turn on/off the player
// Gathered all the div.player
const playerDiv = document.querySelectorAll(".bet-area");
// Iterate over each player of playerDiv
playerDiv.forEach((player) => {
  // Adding event listener to all the contents of items gathered at "playerDiv"
  player.addEventListener("click", (event) => {
    const target = event.target;
    target.classList.toggle("on");
    console.log(target);

    // playerDiv.hasAttributes("class", "player on");
  });
});

// -----------------------------------------------------
// nextButton
// -----------------------------------------------------
nextButton.addEventListener("click", () => {
  cardArrayIndexNum++;

  //! deals the cards
  let cardDealt = document.createElement("img");
  cardDealt.setAttribute("src", `${cardDeck[cardArrayIndexNum].cardSvg}`);
  cardDealt.setAttribute("class", "showing");
  middleShow.appendChild(cardDealt);

  addUpTheCount();
  showRunningCount();
  showTheCount();
});
