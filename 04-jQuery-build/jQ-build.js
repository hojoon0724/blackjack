// -----------------------------------------------------
// Card Assembly
// -----------------------------------------------------
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
console.log(cardDeck);

const cardOffsetValue = -20; // Card overlap CSS value

// -----------------------------------------------------
// Players' arrays
// -----------------------------------------------------
// Player's Areas
const $dealer = $("#dealer");
const $player0 = $("#player-0");
const $player1 = $("#player-1");
const $player2 = $("#player-2");
const $player3 = $("#player-3");
const $player4 = $("#player-4");
const $player5 = $("#player-5");
const $player6 = $("#player-6");

// Players' Array
const players = [
  {
    role: "dealer",
    name: "dealer",
    jq: $("#dealer"),
    active: true,
    cards: [],
    sumValue: 0,
  },
];

function createPlayers() {
  for (i = 1; i < 8; i++) {
    let playerTemplate = {
      role: `player${i}`,
      name: `player-${i}`,
      jqCards: $(`#player-${i}`),
      jqValue: $(`#sum-value-p${i}`),
      active: false,
      cards: [],
      sumValue: 0,
    };
    players.push(playerTemplate);
  }
}
createPlayers();

players[1].active = true;
players[2].active = true;
players[3].active = true;

console.log(players);

// Buttons jQ
const $doubleButton = $("#double");
const $hitButton = $("#hit");
const $standButton = $("#stand");
const $dealButton = $("#deal");

// Cards-in-play
const $cardsInPlay = $(".cards-in-play");
const $addedNumber = $(".added-number");

// Reset || Global Counting Functions
function eraseDeckShowCards() {
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

function clearPlayersCardsAndCount() {
  const $cardsInPlay = $(".cards-in-play");
  const $addedNumber = $(".added-number");
  $cardsInPlay.html("");
  $addedNumber.html("");
}

getDeckAmount();

let $theCount = 0;
function addUpTheCount() {
  $theCount += cardDeck[cardArrayIndexNum].mitCtValue;
}

let $rCount = 0;

showDeck();

// -----------------------------------------------------
// GUI Functions
// -----------------------------------------------------

// -----------------------------------------------------
// Set Player Card Values and Formatting
// -----------------------------------------------------

// -----------------------------------------------------
// Shuffle Button Run
// -----------------------------------------------------
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  makeCardArray(getDeckAmount());
  eraseDeckShowCards();
  clearPlayersCardsAndCount();
  shuffle(cardDeck);
  showDeck();
  showTheCount();
  $theCount = 0;
  $runCount.innerText = 0;
  cardArrayIndexNum = -1;
  playerCardsArray = [];
});

//! -----------------------------------------------------
//! Next card button run
//! -----------------------------------------------------
$hitButton.on("click", () => {
  cardArrayIndexNum++;
  let playerNumber = 1;
  let amountOfCards = players[playerNumber].cards.length;
  console.log(players[playerNumber].cards);
  players[playerNumber].cards.push(cardDeck[cardArrayIndexNum]);
  printAddedPlayersValue(playerNumber);
  printPlayersCards(playerNumber);
  /*
  // addUpPlayersCurrentGameCards();

  // deals the cards
  let $cardDealt = $("<img>");
  $cardDealt.attr("src", `${cadDreck[cardArrayIndexNum].cardSvg}`);

  $cardDealt.addClass("showing");
  $player1.append($cardDealt);
  player1Cards.push(cardDeck[cardArrayIndexNum]);
  player1SumValue += cardDeck[cardArrayIndexNum].value;

  addUpTheCount();
  showRunningCount();
  showTheCount();
  console.log(player1Cards);
  console.log(player1SumValue);
  */
});

// -----------------------------------------------------
// Deal Button
// -----------------------------------------------------
$dealButton.on("click", () => {
  clearPlayersCardsAndCount();
  emptyPlayersCardArray();
});

function emptyPlayersCardArray() {
  for (i = 0; i < players.length; i++) {
    players[i].cards = [];
  }
}

// -----------------------------------------------------
// Testing card placement offset with jQuery
// -----------------------------------------------------

// -----------------------------------------------------
// Distribute cards mechanics
// -----------------------------------------------------

// -----------------------------------------------------
// Testing values
// -----------------------------------------------------
players[2].cards = [
  { cardName: "01-07", mitCtValue: 0, cardSvg: "../SVGs/01-07.svg", value: 7 },
  { cardName: "03-03", mitCtValue: 1, cardSvg: "../SVGs/03-03.svg", value: 3 },
  { cardName: "02-03", mitCtValue: 1, cardSvg: "../SVGs/02-03.svg", value: 3 },
  { cardName: "04-08", mitCtValue: 0, cardSvg: "../SVGs/04-08.svg", value: 8 },
];

function addUpPlayingValues(playerNumber) {
  const player = players[playerNumber];
  const cards = player.cards;
  player.sumValue = cards.reduce((n, { value }) => n + value, 0);
  return player;
}

function printAddedPlayersValue(playerNumber) {
  player = addUpPlayingValues(playerNumber);
  let $playerCountBox = player.jqValue;
  $playerCountBox.html(player.sumValue);
}

function printPlayersCards(playerNumber) {
  player = players[playerNumber];
  console.log(player);
  cards = players[playerNumber].cards;
  console.log(cards);
  let $playerCardBox = player.jqCards;
  for (i = 0; i < player.cards.length; i++) {
    $playerCardBox.append(`<img src="${cards[i].cardSvg}" class="showing" style="top: ${i * cardOffsetValue * 1.5}px; right: ${i * cardOffsetValue}px; z-index: ${i}">`);
  }
}
printAddedPlayersValue(2);
printPlayersCards(2);
