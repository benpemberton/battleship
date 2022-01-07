import { game, resetGame, userTurn, compTurn } from "./game";
import { dragElement, rotateShip } from "./drag-funcs";
import {
  playerBoard,
  compBoard,
  playerArea,
  compArea,
  playerName,
  compName,
  scoresBox,
  gridCell,
  instructions,
  playBtn,
  replayBtn,
} from "./elements";
import dot from "./../dot.png";
import cross from "./../cross.png";

function displaySetUp() {
  displayScores();
  initialBoardsDisplay();
  positionFleet();
  playButton();
  window.onresize = repaintShips;
}

function initialBoardsDisplay() {
  compBoard.classList.remove("faded");
  compName.classList.remove("faded");
  compArea.classList.add("faded");
  playerBoard.classList.remove("faded");
  playerName.classList.remove("faded");
  playerArea.classList.remove("faded");
}

function displayScores() {
  const scores = scoresBox.querySelector("p");
  scores.textContent = game.user.gamesWon + " - " + game.comp.gamesWon;
}

function positionFleet() {
  instructions.style.display = "block";
  instructions.innerHTML =
    "<p>Arrange your ships in preparation for a naval battle!</p></br><p>Double-click to rotate a ship.</p></br><p>The ships must not overlap.</p>";

  paintShips(game.user.gameboard.fleet);
}

function showSelectedShips() {
  game.user.gameboard.fleet.forEach((ship) => {
    ship.coords.forEach((coord) => {
      const cell = playerBoard.querySelector(`[data-xy='${coord}']`);
      cell.classList.add("selected");
    });
  });
}

function playButton() {
  playBtn.style.display = "block";
  playBtn.addEventListener("click", playBtnHandler);
}

function playBtnHandler() {
  if (!checkForRed()) {
    game.user.updateFleet(getDisplayFleetInfo());
    prepareCompBoard();
    showSelectedShips();
    clearShips();

    window.onresize = null;

    decideFirstTurn();

    playBtn.style.display = "none";
  } else if (checkForRed()) {
    alert("No overlapping ships!");
  }
}

function replayButton() {
  replayBtn.style.display = "block";
  replayBtn.addEventListener("click", replayBtnHandler);
}

function replayBtnHandler() {
  clearBoards();
  resetGame();
  displaySetUp();

  replayBtn.style.display = "none";
}

function decideFirstTurn() {
  if (game.lastWinner === "computer") {
    playerBoard.classList.remove("faded");
    compArea.classList.remove("faded");
    compBoard.classList.add("faded");
    compName.classList.remove("faded");
    playerName.classList.add("faded");

    instructions.innerHTML =
      "<p>The computer is choosing where to attack...</p>";

    compArea.style.pointerEvents = "none";

    compTurn();
  } else {
    playerBoard.classList.toggle("faded");
    compArea.classList.toggle("faded");
    compName.classList.add("faded");

    instructions.innerHTML = "<p>Pick an enemy position to attack.</p>";

    compBoard.style.pointerEvents = "auto";
  }
}

function clearBoards() {
  const cells = document.querySelectorAll(".grid-cell");

  cells.forEach((cell) => {
    if (cell.querySelector("img")) {
      cell.querySelector("img").remove();
    }
    if (cell.classList.contains("sunk")) {
      cell.classList.remove("sunk");
    }
    if (cell.classList.contains("selected")) {
      cell.classList.remove("selected");
    }
  });
}

function switchAreaFade() {
  playerBoard.classList.toggle("faded");
  compBoard.classList.toggle("faded");
  playerName.classList.toggle("faded");
  compName.classList.toggle("faded");
}

function switchPlayerTurn(player) {
  if (player === "comp") {
    setTimeout(() => {
      switchAreaFade();
      instructions.innerHTML =
        "<p>The computer is choosing where to attack...</p>";
      compTurn();
    }, 1500);
  } else {
    setTimeout(() => {
      switchAreaFade();
      instructions.innerHTML = "<p>Pick an enemy position to attack.</p>";
      compBoard.style.pointerEvents = "auto";
    }, 1500);
  }
}

function showMissedCell(cell) {
  const img = document.createElement("img");
  img.classList.add("dot");
  img.src = dot;
  cell.appendChild(img);
}

function showStruckCell(cell) {
  const img = document.createElement("img");
  img.classList.add("cross");
  img.src = cross;
  cell.appendChild(img);
}

function highlightSunkShip(ship, board) {
  ship.coords.forEach((coord) => {
    const cell = board.querySelector(`[data-xy='${coord}']`);
    cell.classList.add("sunk");
  });
}

function prepareCompBoard() {
  const cells = compBoard.querySelectorAll(".grid-cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", startUserTurn, { once: true });
  });
}

function startUserTurn(e) {
  userTurn(e.target);
  compBoard.style.pointerEvents = "none";
}

function getDisplayFleetInfo() {
  const ships = document.querySelectorAll(".ship");
  const fleetCoords = {};

  ships.forEach((ship, index) => {
    const shipObj = {};
    shipObj.coords = JSON.parse(ship.dataset.coords);
    shipObj.id = ship.dataset.id;
    shipObj.name = ship.dataset.name;
    fleetCoords[index] = shipObj;
  });

  return fleetCoords;
}

function getShipCoords(elmnt) {
  const cells = getCellPositions();
  const shipTop = elmnt.offsetTop;
  const shipLeft = elmnt.offsetLeft;
  const shipHeight = elmnt.offsetHeight;
  const shipWidth = elmnt.offsetWidth;
  let coords;

  for (const prop in cells) {
    if (shipLeft === cells[prop].left && shipTop === cells[prop].top) {
      coords = cells[prop].coords;
      break;
    }
  }

  const cellWidth = gridCell.offsetWidth;
  let axis;
  let length;
  let fullCoords = [coords];

  if (shipHeight > shipWidth) {
    axis = 1;
    length = Math.round(shipHeight / cellWidth);
  } else {
    axis = 0;
    length = Math.round(shipWidth / cellWidth);
  }

  let sameAxis;

  axis == 0 ? (sameAxis = 1) : (sameAxis = 0);

  for (let i = 0; i < length - 1; i++) {
    let newCoord;
    let num = Number(fullCoords[fullCoords.length - 1][axis]);
    axis == 0
      ? (newCoord = (num += 1) + fullCoords[fullCoords.length - 1][sameAxis])
      : (newCoord = fullCoords[fullCoords.length - 1][sameAxis] + (num += 1));
    fullCoords.push(newCoord);
  }
  return fullCoords;
}

function checkForRed() {
  let ship = document.querySelector(".invalid-pos");

  if (ship) {
    return true;
  } else {
    return false;
  }
}

function getCellPositions() {
  const cellPositions = {};

  const cells = playerBoard
    .querySelectorAll(".grid-cell")
    .forEach((cell, index) => {
      const cellObj = {};
      cellObj.top = cell.offsetTop;
      cellObj.left = cell.offsetLeft;
      cellObj.coords = cell.dataset.xy;
      cellPositions[index] = cellObj;
    });

  return cellPositions;
}

function paintShips(fleet) {
  const cellPositions = getCellPositions();

  fleet.forEach((ship, index) => {
    const div = document.createElement("div");
    div.classList.add("ship");
    div.dataset.id = index;
    div.dataset.coords = JSON.stringify(ship.coords);
    div.dataset.name = ship.name;

    const firstCo = [];

    const divWidth = document.querySelector(".grid-cell").offsetWidth;
    const divHeight = document.querySelector(".grid-cell").offsetHeight;

    ship.coords.forEach((coord) => {
      firstCo.push(coord[0]);
    });

    if (firstCo[0] === firstCo[1]) {
      div.style.width = divWidth + "px";
      div.style.height = ship.length * divHeight + (ship.length - 1) * 3 + "px";
    } else {
      div.style.height = divHeight + "px";
      div.style.width = ship.length * divWidth + (ship.length - 1) * 3 + "px";
    }

    for (const prop in cellPositions) {
      if (cellPositions[prop].coords == ship.coords[0]) {
        div.style.top = cellPositions[prop].top + "px";
        div.style.left = cellPositions[prop].left + "px";
      }
    }
    playerArea.appendChild(div);
    dragElement(div);
    rotateShip(div);
  });
}

function clearShips() {
  const ships = playerArea.querySelectorAll(".ship");
  ships.forEach((ship) => {
    ship.remove();
  });
}

function repaintShips() {
  clearShips();
  paintShips(game.user.gameboard.fleet);
}

export {
  getDisplayFleetInfo,
  getCellPositions,
  getShipCoords,
  paintShips,
  clearShips,
  showMissedCell,
  showStruckCell,
  switchPlayerTurn,
  highlightSunkShip,
  replayButton,
  displaySetUp,
};
