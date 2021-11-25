import { startGame, game } from "./game";
import {
  playerBoard,
  compBoard,
  nameInput,
  nameSubmitBtn,
  nameInputDiv,
  playerName,
  scoresBox,
} from "./elements";

function populateBoard(player) {
  const fleet = player.gameboard.fleet;

  let board = document.querySelector(player.selector);

  const cellPositions = getCellPositions(player.selector);

  fleet.forEach((ship) => {
    const div = document.createElement("div");
    div.classList.add("ship");
    div.style.position = "absolute";

    const firstCo = [];

    const divWidth = document.querySelector(".grid-cell").offsetWidth;

    ship.coords.forEach((coord) => {
      firstCo.push(coord[0]);
    });

    if (firstCo[0] === firstCo[1]) {
      div.style.width = divWidth + "px";
      div.style.height = ship.length * divWidth + "px";
    } else {
      div.style.height = divWidth + "px";
      div.style.width = ship.length * divWidth + "px";
    }

    for (const prop in cellPositions) {
      if (cellPositions[prop].coords == ship.coords[0]) {
        div.style.top = cellPositions[prop].screenPos.top + "px";
        div.style.left = cellPositions[prop].screenPos.left + "px";
      }
    }
    board.appendChild(div);
    dragElement(div);
  });
}

function renderFleet(player) {
  let board = document.querySelector(player.selector);

  player.gameboard.fleet.forEach((ship) => {
    const shipDiv = document.createElement("div");
    shipDiv.classList.add("ship-icon");
    shipDiv.style.height = "5px";
    shipDiv.style.width = ship.length * 5 + "px";

    board.querySelector(`[data-length='${ship.length}']`).appendChild(shipDiv);
  });
}

function activateElement(element) {
  element.style.opacity = "1";
  element.style.pointerEvents = "auto";
}

function deactivateElement(element) {
  element.style.opacity = "0.3";
  element.style.pointerEvents = "none";
}

function userNameInput() {
  activateElement(nameInputDiv);
  nameInput.style.boxShadow = "0px 0px 6px 3px black";
  nameSubmitBtn.addEventListener("click", () => {
    if (nameInput.value === "") {
      nameInput.style.backgroundColor = "#E8B4DC";
    } else {
      const p = playerName.querySelector("p");
      console.log(p);
      p.textContent = nameInput.value;
      nameInput.value = null;
      nameInputDiv.style.display = "none";
      gameSetUp();
    }
  });
}

function gameSetUp() {
  displayScores();
  positionFleet();
}

function displayScores() {
  const scores = scoresBox.querySelector("p");
  scores.textContent = game.user.gamesWon + " - " + game.comp.gamesWon;
}

function positionFleet() {
  activateElement(playerBoard);
  populateBoard(game.user);
}

function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = () => {
      closeDragElement(elmnt);
    };
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement(elmnt) {
    gridSnap(elmnt);
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function getCellPositions(selector) {
  const cellPositions = {};

  const board = document.querySelector(`${selector} .gameboard`);

  const cells = board.querySelectorAll(".grid-cell").forEach((cell, index) => {
    const cellObj = {};
    cellObj.screenPos = cell.getBoundingClientRect();
    cellObj.coords = cell.dataset.x + cell.dataset.y;
    cellPositions[index] = cellObj;
  });

  return cellPositions;
}

function gridSnap(elmnt) {
  const cellPositions = getCellPositions(".player-board");

  const elmntPos = elmnt.getBoundingClientRect();

  let elmntCoords;

  for (const prop in cellPositions) {
    const xLower = cellPositions[prop].screenPos.x - 25;
    const yLower = cellPositions[prop].screenPos.y - 25;
    const xLimit = cellPositions[prop].screenPos.x + 25;
    const yLimit = cellPositions[prop].screenPos.y + 25;

    if (
      elmntPos.x >= xLower &&
      elmntPos.y >= yLower &&
      elmntPos.x <= xLimit &&
      elmntPos.y <= yLimit
    ) {
      elmntCoords = cellPositions[prop].coords;
      console.log(elmntCoords);

      elmnt.style.top = cellPositions[prop].screenPos.top + "px";
      elmnt.style.left = cellPositions[prop].screenPos.left + "px";
    }
  }
}

export {
  populateBoard,
  activateElement,
  dragElement,
  renderFleet,
  userNameInput,
};
