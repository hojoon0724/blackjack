const suits = ["01", "02", "03", "04"];
const cardNums = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11J", "12Q", "13K"];

const cardDeck = [];

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

const nextButton = document.querySelector("#next");
nextButton.addEventListener("click", () => {
  const randomIndex = Math.ceil(Math.random() * cardDeck.length);
  const currentCard = document.querySelector("#current-show");
  currentCard.innerHTML = `<img src="${cardDeck[randomIndex].cardSvg}">`;
});
