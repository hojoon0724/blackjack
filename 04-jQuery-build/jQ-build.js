const suits = ["01", "02", "03", "04"];
const cardNums = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11J", "12Q", "13K"];
let cardDeck = [];

let cardObjectTemplate = {
  cardName: "",
  cardValue: "",
  mitCtValue: 0,
  cardSvg: "",
};

let cardArrayIndexNum = -1;
const $leftShow = $("#player-left-show");
const $middleShow = $("#player-middle-show");
const $rightShow = $("#player-right-show");
const $doubleButton = $("#double");
const $hitButton = $("#hit");
const $standButton = $("#stand");
const $dealButton = $("#deal");

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
    newValue = 10;
    return newValue;
  }
  // return +card.split("-")[1];
  return Number(card.split("-")[1]);
  // return parseInt(card.split("-")[1]);
}

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

makeCardArray(2);

function clearDeckCards() {
  const $fullDeckDiv = $("#full-deck");
  $fullDeckDiv.html("");
}

const $runCount = $("#run");
function showRunningCount() {
  $runCount.html(`${cardArrayIndexNum + 1}`);
}

function showTheCount() {
  const $theCountDiv = $("#the-count");
  $theCountDiv.html($theCount);
}

function getDeckAmount() {
  const $deckInput = $("#deck-amount");
  // console.log($deckInput[0].value);
  // return $deckInput.value;
}

function clearCardsInPlay() {
  const $cardsInPlay = $(".cards-in-play");
  $cardsInPlay.html("");
}

getDeckAmount();

let $theCount = 0;
function addUpTheCount() {
  $theCount += cardDeck[cardArrayIndexNum].mitCtValue;
}

let $rCount = 0;

showDeck();

// -----------------------------------------------------
// shuffle
// -----------------------------------------------------
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  makeCardArray(getDeckAmount());
  clearDeckCards();
  clearCardsInPlay();
  shuffle(cardDeck);
  showDeck();
  showTheCount();
  $theCount = 0;
  $runCount.innerText = 0;
  cardArrayIndexNum = -1;
  $middleShow.innerHTML = "";
  console.log(cardDeck[18].value);
});

// -----------------------------------------------------
// Next card
// -----------------------------------------------------

$hitButton.on("click", () => {
  cardArrayIndexNum++;

  //! deals the cards
  let $cardDealt = $("<img>");
  $cardDealt.attr("src", `${cardDeck[cardArrayIndexNum].cardSvg}`);

  $cardDealt.addClass("showing");
  $middleShow.append($cardDealt);

  addUpTheCount();
  showRunningCount();
  showTheCount();
});
