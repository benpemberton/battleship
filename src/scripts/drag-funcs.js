import { getCellPositions, getDisplayFleetInfo, getShipCoords } from "./ui";
import { playerBoard, playerArea } from "./elements";

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

function rotateShip(elmnt) {
  elmnt.ondblclick = rotate;

  function rotate() {
    const board = getBorder();

    const elmntLeft = elmnt.offsetLeft;
    const elmntTop = elmnt.offsetTop;
    const elmntHeight = elmnt.offsetHeight;
    const elmntWidth = elmnt.offsetWidth;

    const futureRight = elmntLeft + elmntHeight;
    const futureBottom = elmntTop + elmntWidth;

    if (!(futureRight - 5 > board.right || futureBottom - 5 > board.bottom)) {
      elmnt.style.width = elmntHeight + "px";
      elmnt.style.height = elmntWidth + "px";
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

export { dragElement, rotateShip };
