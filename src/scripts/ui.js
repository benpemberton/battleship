import { startGame } from "./game";
import { playerBoard, compBoard } from "./elements";

function populateBoard(player, selector) {
  const fleet = player.gameboard.fleet;

  let board = null;

  selector === ".player-board" ? (board = playerBoard) : (board = compBoard);

  const cellPositions = getCellPositions(selector);

  fleet.forEach((ship) => {
    const div = document.createElement("div");
    div.classList.add("ship");
    div.style.position = "absolute";

    const firstCo = [];

    ship.coords.forEach((coord) => {
      firstCo.push(coord[0]);
    });

    if (firstCo[0] === firstCo[1]) {
      div.style.width = "50px";
      div.style.height = ship.length * 50 + "px";
    } else {
      div.style.height = "50px";
      div.style.width = ship.length * 50 + "px";
    }

    for (const prop in cellPositions) {
      if (cellPositions[prop].coords == ship.coords[0]) {
        div.style.top = cellPositions[prop].screenPos.top + "px";
        div.style.left = cellPositions[prop].screenPos.left + "px";
      }
    }
    board.appendChild(div);
  });
}

function activateScreen() {
  playerBoard.style.opacity = "1";
  playerBoard.style.pointerEvents = "auto";
  compBoard.style.opacity = "1";
  compBoard.style.pointerEvents = "auto";
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

      elmnt.style.top = cellPositions[prop].screenPos.top + "px";
      elmnt.style.left = cellPositions[prop].screenPos.left + "px";
    }
  }
}

export { populateBoard, activateScreen, dragElement };
