import { game, prepareGame, resetGame } from "./game";
import {
  playerBoard,
  compBoard,
  playerArea,
  compArea,
  nameInput,
  nameSubmitBtn,
  nameInputDiv,
  playerName,
  compName,
  scoresBox,
  gridCell,
  instructions,
  playBtn,
  replayBtn,
} from "./elements";
import { userTurn, compTurn } from "./userTurn";
import dot from "./../dot.png";
import cross from "./../cross.png";

function paintShips(fleet) {
  const cellPositions = getCellPositions();

  fleet.forEach((ship, index) => {
    const div = document.createElement("div");
    div.classList.add("ship");
    div.dataset.id = index;
    div.dataset.coords = JSON.stringify(ship.coords);
    div.dataset.name = ship.name;

    const firstCo = [];

    const divWidth = document.querySelector(".grid-cell").offsetWidth + 0.5;
    const divHeight = document.querySelector(".grid-cell").offsetHeight + 0.5;

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

function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  elmnt.onmousedown = dragMouseDown;

  const board = getBorder();

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

    keepInBounds(e);
  }

  function checkDownDrag(e) {
    if (e.clientY > pos4) {
      return e.clientY - pos4;
    } else {
      return false;
    }
  }

  function checkRightDrag(e) {
    if (e.clientX > pos3) {
      return e.clientX - pos3;
    } else {
      return false;
    }
  }

  function checkLeftDrag(e) {
    if (e.clientX < pos3) {
      return pos3 - e.clientX;
    } else {
      return false;
    }
  }

  function checkUpDrag(e) {
    if (e.clientY < pos4) {
      return pos4 - e.clientY;
    } else {
      return false;
    }
  }

  function keepInBounds(e) {
    if (!checkPosition(elmnt)) {
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    } else if (checkPosition(elmnt) === "top") {
      elmnt.style.top = board.top + checkDownDrag(e) + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    } else if (checkPosition(elmnt) === "left") {
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = board.left + checkRightDrag(e) + "px";
    } else if (checkPosition(elmnt) === "right") {
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left =
        board.right - elmnt.offsetWidth - checkLeftDrag(e) + "px";
    } else if (checkPosition(elmnt) === "bottom") {
      elmnt.style.top =
        board.bottom - elmnt.offsetHeight - checkUpDrag(e) + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
  }

  function checkPosition(elmnt) {
    const elmntTop = elmnt.offsetTop;
    const elmntLeft = elmnt.offsetLeft;
    const elmntRight = elmntLeft + elmnt.offsetWidth;
    const elmntBottom = elmntTop + elmnt.offsetHeight;

    if (elmntTop < board.top) {
      return "top";
    } else if (elmntLeft < board.left) {
      return "left";
    } else if (elmntRight > board.right) {
      return "right";
    } else if (elmntBottom > board.bottom) {
      return "bottom";
    } else {
      return false;
    }
  }

  function closeDragElement(elmnt) {
    gridSnap(elmnt);
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function rotateShip(elmnt) {
  elmnt.ondblclick = rotate;

  function rotate() {
    const board = getBorder();

    const elmntRect = elmnt.getBoundingClientRect();

    const futureRight = elmntRect.left + elmntRect.height;
    const futureBottom = elmntRect.top + elmntRect.width;

    if (!(futureRight - 1 > board.right || futureBottom - 1 > board.bottom)) {
      elmnt.style.width = elmntRect.height + "px";
      elmnt.style.height = elmntRect.width + "px";
      elmnt.dataset.coords = JSON.stringify(getShipCoords(elmnt));
      checkProximity(elmnt);
    }
  }
}

function checkProximity(elmnt) {
  const fleet = getDisplayFleetInfo();
  let overlap;

  for (const prop in fleet) {
    if (fleet[prop].id !== elmnt.dataset.id) {
      JSON.parse(elmnt.dataset.coords).forEach((coord) => {
        if (fleet[prop].coords.some((item) => item == coord)) {
          overlap = true;
        }
      });
    }
  }

  if (overlap) {
    elmnt.classList.add("invalid-pos");
  } else {
    elmnt.classList.remove("invalid-pos");
  }
}

function getBorder() {
  return {
    top: playerArea.offsetTop,
    left: playerArea.offsetLeft,
    right: playerArea.offsetLeft + playerBoard.offsetWidth,
    bottom: playerArea.offsetTop + playerBoard.offsetHeight,
  };
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

// function getCellPositions() {
//   const cellPositions = {};

//   const cells = playerBoard
//     .querySelectorAll(".grid-cell")
//     .forEach((cell, index) => {
//       const cellObj = {};
//       cellObj.screenPos = cell.getBoundingClientRect();
//       cellObj.coords = cell.dataset.xy;
//       cellPositions[index] = cellObj;
//     });

//   return cellPositions;
// }

function gridSnap(elmnt) {
  const cellPositions = getCellPositions();

  const elmntTop = elmnt.offsetTop;
  const elmntLeft = elmnt.offsetLeft;

  const divWidth = document.querySelector(".grid-cell").offsetWidth;

  for (const prop in cellPositions) {
    const xLower = cellPositions[prop].left - divWidth / 2;
    const yLower = cellPositions[prop].top - divWidth / 2;
    const xUpper = cellPositions[prop].left + divWidth / 2;
    const yUpper = cellPositions[prop].top + divWidth / 2;

    if (
      elmntLeft >= xLower &&
      elmntTop >= yLower &&
      elmntLeft <= xUpper &&
      elmntTop <= yUpper
    ) {
      elmnt.style.top = cellPositions[prop].top + "px";
      elmnt.style.left = cellPositions[prop].left + "px";

      elmnt.dataset.x = cellPositions[prop].coords[0];
      elmnt.dataset.y = cellPositions[prop].coords[1];

      elmnt.dataset.coords = JSON.stringify(getShipCoords(elmnt));
      checkProximity(elmnt);
    }
  }
}

export {
  dragElement,
  paintShips,
  clearShips,
  showMissedCell,
  showStruckCell,
  switchPlayerTurn,
  highlightSunkShip,
  replayButton,
  displaySetUp,
};
