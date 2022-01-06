/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scripts/elements.js":
/*!*********************************!*\
  !*** ./src/scripts/elements.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startBtn": () => (/* binding */ startBtn),
/* harmony export */   "playerBoard": () => (/* binding */ playerBoard),
/* harmony export */   "compBoard": () => (/* binding */ compBoard),
/* harmony export */   "playerArea": () => (/* binding */ playerArea),
/* harmony export */   "compArea": () => (/* binding */ compArea),
/* harmony export */   "nameInput": () => (/* binding */ nameInput),
/* harmony export */   "nameSubmitBtn": () => (/* binding */ nameSubmitBtn),
/* harmony export */   "nameInputDiv": () => (/* binding */ nameInputDiv),
/* harmony export */   "playerName": () => (/* binding */ playerName),
/* harmony export */   "compName": () => (/* binding */ compName),
/* harmony export */   "scoresBox": () => (/* binding */ scoresBox),
/* harmony export */   "gridCell": () => (/* binding */ gridCell),
/* harmony export */   "instructions": () => (/* binding */ instructions),
/* harmony export */   "playBtn": () => (/* binding */ playBtn),
/* harmony export */   "replayBtn": () => (/* binding */ replayBtn)
/* harmony export */ });
const startBtn = document.querySelector(".start");
const playerArea = document.querySelector(".player-board");
const compArea = document.querySelector(".comp-board");
const playerBoard = playerArea.querySelector(".gameboard");
const compBoard = compArea.querySelector(".gameboard");
const nameInput = document.querySelector(".name-input");
const nameSubmitBtn = document.querySelector(".name-submit");
const nameInputDiv = document.querySelector(".name-input-container");
const playerName = document.querySelector(".player-name");
const compName = document.querySelector(".comp-name");
const scoresBox = document.querySelector(".scores-box");
const gridCell = document.querySelector(".grid-cell");
const instructions = document.querySelector(".instructions");
const playBtn = document.querySelector(".play");
const replayBtn = document.querySelector(".replay");




/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "game": () => (/* binding */ game),
/* harmony export */   "prepareGame": () => (/* binding */ prepareGame),
/* harmony export */   "resetGame": () => (/* binding */ resetGame)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/scripts/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/scripts/player.js");



const game = {
  user: null,
  comp: null,
  lastWinner: null,
};

function prepareGame(username) {
  game.user = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(username);
  game.comp = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])("computer");
  game.user.gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  game.comp.gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  game.user.createFleet();
  game.comp.createFleet();
}

function resetGame() {
  game.user.gameboard.newRound();
  game.comp.gameboard.newRound();
  game.user.createFleet();
  game.comp.createFleet();
}




/***/ }),

/***/ "./src/scripts/gameboard.js":
/*!**********************************!*\
  !*** ./src/scripts/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/scripts/ship.js");


function Gameboard() {
  return {
    fleet: [],
    missedShots: [],
    fleetStatus: [],

    demo: null,

    placeShip(name, coords) {
      const newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(name, coords);

      // newShip.coords.forEach((coord) => {
      //   const posArray = Object.keys(this.boardPositions);
      //   const position = posArray.find((pos) => pos === coord);
      //   this.boardPositions[position] = true;
      // });

      this.fleet.push(newShip);
      this.fleet[this.fleet.length - 1].id = this.fleet.length - 1;
    },

    receiveAttack(pos) {
      let hit = false;
      let ship;

      for (let i = 0; i <= this.fleet.length - 1; i++) {
        if (this.fleet[i].coords.includes(pos)) {
          this.fleet[i].hit(pos);
          hit = true;
          ship = this.fleet[i];
          break;
        }
      }

      if (hit) {
        return ship;
      } else {
        this.missedShots.push(pos);
      }
    },

    checkFleetStatus() {
      this.fleetStatus = [];

      this.fleet.forEach((ship) => {
        if (ship.status === "sunk") {
          this.fleetStatus.push("sunk");
        }
      });

      if (this.fleetStatus.length === this.fleet.length) {
        return true;
      }
    },

    newRound() {
      this.fleet = [];
      this.missedShots = [];
      this.fleetStatus = [];
    },
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);


/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/scripts/game.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/scripts/gameboard.js");



function Player(name) {
  const proto = {
    demo: [],

    compAttack() {
      let coord = this.getRandomCoord(10);

      if (this.checkPreviousMoves(coord)) {
        return this.compAttack();
      } else {
        return coord;
      }
    },

    getRandomCoord(factor) {
      const x = this.getRandomInt(factor).toString();
      const y = this.getRandomInt(factor).toString();
      const coord = x + y;
      return coord;
    },

    getStartCoord(length, axis) {
      const coord = this.getRandomCoord(10);

      if (coord[axis] > 10 - length || this.checkForDuplicate(coord)) {
        return this.getStartCoord(length, axis);
      } else {
        return coord;
      }
    },

    checkForDuplicate(coord) {
      return this.gameboard.fleet.some((ship) => {
        return ship.coords.some((item) => item == coord);
      });
    },

    createFleet() {
      let self = this;

      generateShipCoords("carrier", 5);
      generateShipCoords("battleship", 4);
      generateShipCoords("cruiser", 3);
      generateShipCoords("submarine", 3);
      generateShipCoords("destroyer", 2);

      function generateShipCoords(name, length) {
        const axis = self.getRandomInt(2);

        let coord = self.getStartCoord(length, axis);

        coord = [coord];

        let addAxis = 0;
        let sameAxis = 0;

        axis == 0 ? (sameAxis = 1) : (addAxis = 1);

        for (let j = 0; j < length - 1; j++) {
          let newCoord;

          let num = Number(coord[coord.length - 1][addAxis]);

          axis == 0
            ? (newCoord = (num += 1) + coord[coord.length - 1][sameAxis])
            : (newCoord = coord[coord.length - 1][sameAxis] + (num += 1));

          if (self.checkForDuplicate(newCoord)) {
            return generateShipCoords(name, length);
          } else {
            coord.push(newCoord);
          }
        }
        self.gameboard.placeShip(name, coord);
      }
    },

    updateFleet(fleetObj) {
      this.gameboard.fleet = [];
      for (const prop in fleetObj) {
        let name = fleetObj[prop].name;
        let coords = fleetObj[prop].coords;
        this.gameboard.placeShip(name, coords);
      }
    },

    checkPreviousMoves(coord) {
      const hits = [];
      const missed = _game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.missedShots;

      _game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.fleet.forEach((ship) => {
        ship.hits.forEach((hit) => {
          hits.push(hit);
        });
      });

      missed.forEach((miss) => {
        hits.push(miss);
      });

      if (hits.includes(coord)) {
        return true;
      }
    },

    getRandomInt(factor) {
      return Math.floor(Math.random() * factor);
    },
  };

  const obj = Object.create(proto);

  obj.name = name;
  obj.gamesWon = 0;
  obj.gameboard = null;

  return obj;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);


/***/ }),

/***/ "./src/scripts/ship.js":
/*!*****************************!*\
  !*** ./src/scripts/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function Ship(name, coords) {
  const proto = {
    hit(number) {
      if (this.coords.includes(number) && !this.hits.includes(number)) {
        this.hits.push(number);
        this.isSunk();
      }
    },

    isSunk() {
      const sunk = this.hits.every((item) => {
        return this.coords.includes(item);
      });

      if (sunk === true && this.hits.length === this.coords.length) {
        this.status = "sunk";
      }
    },
  };

  const obj = Object.create(proto);

  obj.name = name;
  obj.coords = coords;
  obj.length = coords.length;
  obj.hits = [];
  obj.status = "unsunk";

  return obj;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);


/***/ }),

/***/ "./src/scripts/ui.js":
/*!***************************!*\
  !*** ./src/scripts/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "populateBoard": () => (/* binding */ populateBoard),
/* harmony export */   "dragElement": () => (/* binding */ dragElement),
/* harmony export */   "userNameInput": () => (/* binding */ userNameInput),
/* harmony export */   "paintShips": () => (/* binding */ paintShips),
/* harmony export */   "clearShips": () => (/* binding */ clearShips),
/* harmony export */   "showMissedCell": () => (/* binding */ showMissedCell),
/* harmony export */   "showStruckCell": () => (/* binding */ showStruckCell),
/* harmony export */   "switchPlayerTurn": () => (/* binding */ switchPlayerTurn),
/* harmony export */   "highlightSunkShip": () => (/* binding */ highlightSunkShip),
/* harmony export */   "replayButton": () => (/* binding */ replayButton)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/scripts/game.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements */ "./src/scripts/elements.js");
/* harmony import */ var _userTurn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userTurn */ "./src/scripts/userTurn.js");
/* harmony import */ var _dot_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../dot.png */ "./src/dot.png");
/* harmony import */ var _cross_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../cross.png */ "./src/cross.png");






function populateBoard(player) {
  paintShips(player.gameboard.fleet);
}

function paintShips(fleet) {
  const cellPositions = getCellPositions();

  fleet.forEach((ship, index) => {
    const div = document.createElement("div");
    div.classList.add("ship");
    div.style.position = "absolute";
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
        div.style.top = cellPositions[prop].screenPos.top + "px";
        div.style.left = cellPositions[prop].screenPos.left + "px";
      }
    }
    _elements__WEBPACK_IMPORTED_MODULE_1__.playerArea.appendChild(div);
    dragElement(div);
    rotateShip(div);
  });
}

function clearShips() {
  const ships = _elements__WEBPACK_IMPORTED_MODULE_1__.playerArea.querySelectorAll(".ship");
  ships.forEach((ship) => {
    ship.remove();
  });
}

function repaintShips() {
  clearShips();
  paintShips(_game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.fleet);
}

function userNameInput() {
  _elements__WEBPACK_IMPORTED_MODULE_1__.nameInputDiv.classList.remove("faded");
  _elements__WEBPACK_IMPORTED_MODULE_1__.nameInput.style.boxShadow = "0px 0px 6px 3px black";
  _elements__WEBPACK_IMPORTED_MODULE_1__.nameSubmitBtn.addEventListener("click", () => {
    if (_elements__WEBPACK_IMPORTED_MODULE_1__.nameInput.value === "") {
      _elements__WEBPACK_IMPORTED_MODULE_1__.nameInput.style.backgroundColor = "#E8B4DC";
    } else {
      const p = _elements__WEBPACK_IMPORTED_MODULE_1__.playerName.querySelector("p");
      p.textContent = _elements__WEBPACK_IMPORTED_MODULE_1__.nameInput.value;
      _elements__WEBPACK_IMPORTED_MODULE_1__.nameInput.value = null;
      _elements__WEBPACK_IMPORTED_MODULE_1__.nameInputDiv.style.display = "none";
      (0,_game__WEBPACK_IMPORTED_MODULE_0__.prepareGame)(_elements__WEBPACK_IMPORTED_MODULE_1__.nameInput.value);
      displaySetUp();
    }
  });
}

function displaySetUp() {
  displayScores();
  initialBoardsDisplay();
  positionFleet();
  playButton();
  window.onresize = repaintShips;
}

function initialBoardsDisplay() {
  _elements__WEBPACK_IMPORTED_MODULE_1__.compBoard.classList.remove("faded");
  _elements__WEBPACK_IMPORTED_MODULE_1__.compName.classList.remove("faded");
  _elements__WEBPACK_IMPORTED_MODULE_1__.compArea.classList.add("faded");
  _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.classList.remove("faded");
  _elements__WEBPACK_IMPORTED_MODULE_1__.playerName.classList.remove("faded");
  _elements__WEBPACK_IMPORTED_MODULE_1__.playerArea.classList.remove("faded");
}

function displayScores() {
  const scores = _elements__WEBPACK_IMPORTED_MODULE_1__.scoresBox.querySelector("p");
  scores.textContent = _game__WEBPACK_IMPORTED_MODULE_0__.game.user.gamesWon + " - " + _game__WEBPACK_IMPORTED_MODULE_0__.game.comp.gamesWon;
}

function positionFleet() {
  _elements__WEBPACK_IMPORTED_MODULE_1__.instructions.innerHTML =
    "<p>Arrange your ships in preparation for a naval battle!</p> <p>The ships must all be green before you can start the game.</p> <p>(Double-click to rotate a ship.)</p>";

  populateBoard(_game__WEBPACK_IMPORTED_MODULE_0__.game.user);
}

function playButton() {
  _elements__WEBPACK_IMPORTED_MODULE_1__.playBtn.style.display = "block";
  _elements__WEBPACK_IMPORTED_MODULE_1__.playBtn.addEventListener("click", playBtnHandler);
}

function playBtnHandler() {
  if (!checkForRed()) {
    _game__WEBPACK_IMPORTED_MODULE_0__.game.user.updateFleet(getDisplayFleetInfo());
    prepareCompBoard();
    clearShips();

    window.onresize = null;

    console.log(_game__WEBPACK_IMPORTED_MODULE_0__.game.comp.gameboard.fleet);

    decideFirstTurn();

    _elements__WEBPACK_IMPORTED_MODULE_1__.playBtn.style.display = "none";
  } else if (checkForRed()) {
    alert("All ships must be green!");
  }
}

function replayButton() {
  _elements__WEBPACK_IMPORTED_MODULE_1__.replayBtn.style.display = "block";
  _elements__WEBPACK_IMPORTED_MODULE_1__.replayBtn.addEventListener("click", replayBtnHandler);
}

function replayBtnHandler() {
  clearBoards();
  (0,_game__WEBPACK_IMPORTED_MODULE_0__.resetGame)();
  displaySetUp();

  _elements__WEBPACK_IMPORTED_MODULE_1__.replayBtn.style.display = "none";
}

function decideFirstTurn() {
  if (_game__WEBPACK_IMPORTED_MODULE_0__.game.lastWinner === "computer") {
    _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.classList.remove("faded");
    _elements__WEBPACK_IMPORTED_MODULE_1__.compArea.classList.remove("faded");
    _elements__WEBPACK_IMPORTED_MODULE_1__.compBoard.classList.add("faded");
    _elements__WEBPACK_IMPORTED_MODULE_1__.compName.classList.remove("faded");
    _elements__WEBPACK_IMPORTED_MODULE_1__.playerName.classList.add("faded");

    _elements__WEBPACK_IMPORTED_MODULE_1__.instructions.innerHTML =
      "<p>The computer is choosing where to attack...</p>";

    _elements__WEBPACK_IMPORTED_MODULE_1__.compArea.style.pointerEvents = "none";

    (0,_userTurn__WEBPACK_IMPORTED_MODULE_2__.compTurn)();
  } else {
    _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.classList.toggle("faded");
    _elements__WEBPACK_IMPORTED_MODULE_1__.compArea.classList.toggle("faded");
    _elements__WEBPACK_IMPORTED_MODULE_1__.compName.classList.add("faded");

    _elements__WEBPACK_IMPORTED_MODULE_1__.instructions.innerHTML = "<p>Pick an enemy position to attack.</p>";

    _elements__WEBPACK_IMPORTED_MODULE_1__.compBoard.style.pointerEvents = "auto";
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
  });
}

function switchAreaFade() {
  _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.classList.toggle("faded");
  _elements__WEBPACK_IMPORTED_MODULE_1__.compBoard.classList.toggle("faded");
  _elements__WEBPACK_IMPORTED_MODULE_1__.playerName.classList.toggle("faded");
  _elements__WEBPACK_IMPORTED_MODULE_1__.compName.classList.toggle("faded");
}

function switchPlayerTurn(player) {
  if (player === "comp") {
    setTimeout(() => {
      switchAreaFade();
      _elements__WEBPACK_IMPORTED_MODULE_1__.instructions.innerHTML =
        "<p>The computer is choosing where to attack...</p>";
      (0,_userTurn__WEBPACK_IMPORTED_MODULE_2__.compTurn)();
    }, 1500);
  } else {
    setTimeout(() => {
      switchAreaFade();
      _elements__WEBPACK_IMPORTED_MODULE_1__.instructions.innerHTML = "<p>Pick an enemy position to attack.</p>";
      _elements__WEBPACK_IMPORTED_MODULE_1__.compBoard.style.pointerEvents = "auto";
    }, 1500);
  }
}

function showMissedCell(cell) {
  const img = document.createElement("img");
  img.classList.add("dot");
  img.src = _dot_png__WEBPACK_IMPORTED_MODULE_3__;
  cell.appendChild(img);
}

function showStruckCell(cell) {
  const img = document.createElement("img");
  img.classList.add("cross");
  img.src = _cross_png__WEBPACK_IMPORTED_MODULE_4__;
  cell.appendChild(img);
}

function highlightSunkShip(ship, board) {
  ship.coords.forEach((coord) => {
    const cell = board.querySelector(`[data-xy='${coord}']`);
    cell.classList.add("sunk");
  });
}

function prepareCompBoard() {
  const cells = _elements__WEBPACK_IMPORTED_MODULE_1__.compBoard.querySelectorAll(".grid-cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", startUserTurn, { once: true });
  });
}

function startUserTurn(e) {
  (0,_userTurn__WEBPACK_IMPORTED_MODULE_2__.userTurn)(e.target);
  _elements__WEBPACK_IMPORTED_MODULE_1__.compBoard.style.pointerEvents = "none";
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
  const ship = elmnt.getBoundingClientRect();
  let coords;

  for (const prop in cells) {
    if (
      ship.left === cells[prop].screenPos.left &&
      ship.top === cells[prop].screenPos.top
    ) {
      coords = cells[prop].coords;
      break;
    }
  }

  const cellWidth = _elements__WEBPACK_IMPORTED_MODULE_1__.gridCell.offsetWidth;
  let axis;
  let length;
  let fullCoords = [coords];

  if (ship.height > ship.width) {
    axis = 1;
    length = Math.round(ship.height / cellWidth);
  } else {
    axis = 0;
    length = Math.round(ship.width / cellWidth);
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
    const elmntRect = elmnt.getBoundingClientRect();

    if (elmntRect.top < board.top) {
      return "top";
    } else if (elmntRect.left < board.left) {
      return "left";
    } else if (elmntRect.right > board.right) {
      return "right";
    } else if (elmntRect.bottom > board.bottom) {
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
  const info = _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.getBoundingClientRect();
  return {
    top: Math.round(info.top),
    left: Math.round(info.left),
    right: Math.round(info.right),
    bottom: Math.round(info.bottom),
  };
}

function getCellPositions() {
  const cellPositions = {};

  const cells = _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.querySelectorAll(".grid-cell")
    .forEach((cell, index) => {
      const cellObj = {};
      cellObj.screenPos = cell.getBoundingClientRect();
      cellObj.coords = cell.dataset.xy;
      cellPositions[index] = cellObj;
    });

  return cellPositions;
}

function gridSnap(elmnt) {
  const cellPositions = getCellPositions(".player-board");

  const elmntPos = elmnt.getBoundingClientRect();

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
      elmnt.style.top = cellPositions[prop].screenPos.top + "px";
      elmnt.style.left = cellPositions[prop].screenPos.left + "px";

      elmnt.dataset.x = cellPositions[prop].coords[0];
      elmnt.dataset.y = cellPositions[prop].coords[1];

      elmnt.dataset.coords = JSON.stringify(getShipCoords(elmnt));
      checkProximity(elmnt);
    }
  }
}




/***/ }),

/***/ "./src/scripts/userTurn.js":
/*!*********************************!*\
  !*** ./src/scripts/userTurn.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "userTurn": () => (/* binding */ userTurn),
/* harmony export */   "compTurn": () => (/* binding */ compTurn)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/scripts/game.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./src/scripts/ui.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements */ "./src/scripts/elements.js");




function userTurn(cell) {
  const coords = cell.dataset.xy;
  const ship = _game__WEBPACK_IMPORTED_MODULE_0__.game.comp.gameboard.receiveAttack(coords);

  if (ship) {
    (0,_ui__WEBPACK_IMPORTED_MODULE_1__.showStruckCell)(cell);

    if (ship.status === "sunk") {
      _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.innerHTML = `<p>You sank their ${ship.name}!!</p>`;
      (0,_ui__WEBPACK_IMPORTED_MODULE_1__.highlightSunkShip)(ship, _elements__WEBPACK_IMPORTED_MODULE_2__.compBoard);

      if (_game__WEBPACK_IMPORTED_MODULE_0__.game.comp.gameboard.checkFleetStatus()) {
        _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.innerHTML = `<p>You've won!!!</p>`;
        _game__WEBPACK_IMPORTED_MODULE_0__.game.user.gamesWon += 1;
        _game__WEBPACK_IMPORTED_MODULE_0__.game.lastWinner = _game__WEBPACK_IMPORTED_MODULE_0__.game.user.name;
        return (0,_ui__WEBPACK_IMPORTED_MODULE_1__.replayButton)();
      }
    } else {
      _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.innerHTML = "<p>You hit one of their ships.</p>";
    }

    (0,_ui__WEBPACK_IMPORTED_MODULE_1__.switchPlayerTurn)("comp");
  } else {
    (0,_ui__WEBPACK_IMPORTED_MODULE_1__.showMissedCell)(cell);
    _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.innerHTML = "<p>Your attack missed.</p>";

    (0,_ui__WEBPACK_IMPORTED_MODULE_1__.switchPlayerTurn)("comp");
  }
}

function compTurn() {
  setTimeout(() => {
    const coords = _game__WEBPACK_IMPORTED_MODULE_0__.game.comp.compAttack();
    const ship = _game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.receiveAttack(coords);
    const cell = _elements__WEBPACK_IMPORTED_MODULE_2__.playerBoard.querySelector(`[data-xy='${coords}']`);

    if (ship) {
      (0,_ui__WEBPACK_IMPORTED_MODULE_1__.showStruckCell)(cell);

      if (ship.status === "sunk") {
        (0,_ui__WEBPACK_IMPORTED_MODULE_1__.highlightSunkShip)(ship, _elements__WEBPACK_IMPORTED_MODULE_2__.playerBoard);
        _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.innerHTML = `<p>The computer sank your ${ship.name}!!</p>`;

        if (_game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.checkFleetStatus()) {
          _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.innerHTML = `<p>Oh no, you lost!</p>`;
          _game__WEBPACK_IMPORTED_MODULE_0__.game.comp.gamesWon += 1;
          _game__WEBPACK_IMPORTED_MODULE_0__.game.lastWinner = _game__WEBPACK_IMPORTED_MODULE_0__.game.comp.name;
          return (0,_ui__WEBPACK_IMPORTED_MODULE_1__.replayButton)();
        }
      } else {
        _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.innerHTML = "<p>The computer hit one of your ships.</p>";
      }

      (0,_ui__WEBPACK_IMPORTED_MODULE_1__.switchPlayerTurn)("player");
    } else {
      (0,_ui__WEBPACK_IMPORTED_MODULE_1__.showMissedCell)(cell);
      _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.innerHTML = "<p>The computer's attack missed.</p>";

      (0,_ui__WEBPACK_IMPORTED_MODULE_1__.switchPlayerTurn)("player");
    }
  }, 1500);
}




/***/ }),

/***/ "./src/cross.png":
/*!***********************!*\
  !*** ./src/cross.png ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9ed69cc077c74e26250c.png";

/***/ }),

/***/ "./src/dot.png":
/*!*********************!*\
  !*** ./src/dot.png ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "f02e96f91748a213c19c.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../styles.css */ "./src/styles.css");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/scripts/game.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements */ "./src/scripts/elements.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./src/scripts/ui.js");





_elements__WEBPACK_IMPORTED_MODULE_2__.startBtn.addEventListener("click", () => {
  _elements__WEBPACK_IMPORTED_MODULE_2__.startBtn.style.display = "none";
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.userNameInput)();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDJEQUFvQjtBQUN4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLHdFQUFpQztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdCQUFnQixtRUFDSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFhRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3poQjRCO0FBT2hCO0FBQ29EOztBQUVsRTtBQUNBO0FBQ0EsZUFBZSxvRUFBaUM7O0FBRWhEO0FBQ0EsSUFBSSxtREFBYzs7QUFFbEI7QUFDQSxNQUFNLDZEQUFzQix3QkFBd0IsVUFBVTtBQUM5RCxNQUFNLHNEQUFpQixPQUFPLGdEQUFTOztBQUV2QyxVQUFVLHVFQUFvQztBQUM5QyxRQUFRLDZEQUFzQjtBQUM5QixRQUFRLHFEQUFrQjtBQUMxQixRQUFRLGtEQUFlLEdBQUcsaURBQWM7QUFDeEMsZUFBZSxpREFBWTtBQUMzQjtBQUNBLE1BQU07QUFDTixNQUFNLDZEQUFzQjtBQUM1Qjs7QUFFQSxJQUFJLHFEQUFnQjtBQUNwQixJQUFJO0FBQ0osSUFBSSxtREFBYztBQUNsQixJQUFJLDZEQUFzQjs7QUFFMUIsSUFBSSxxREFBZ0I7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFvQjtBQUN2QyxpQkFBaUIsb0VBQWlDO0FBQ2xELGlCQUFpQixnRUFBeUIsY0FBYyxPQUFPOztBQUUvRDtBQUNBLE1BQU0sbURBQWM7O0FBRXBCO0FBQ0EsUUFBUSxzREFBaUIsT0FBTyxrREFBVztBQUMzQyxRQUFRLDZEQUFzQixnQ0FBZ0MsVUFBVTs7QUFFeEUsWUFBWSx1RUFBb0M7QUFDaEQsVUFBVSw2REFBc0I7QUFDaEMsVUFBVSxxREFBa0I7QUFDNUIsVUFBVSxrREFBZSxHQUFHLGlEQUFjO0FBQzFDLGlCQUFpQixpREFBWTtBQUM3QjtBQUNBLFFBQVE7QUFDUixRQUFRLDZEQUFzQjtBQUM5Qjs7QUFFQSxNQUFNLHFEQUFnQjtBQUN0QixNQUFNO0FBQ04sTUFBTSxtREFBYztBQUNwQixNQUFNLDZEQUFzQjs7QUFFNUIsTUFBTSxxREFBZ0I7QUFDdEI7QUFDQSxHQUFHO0FBQ0g7O0FBRThCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUN6RTlCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNmeUI7QUFDa0I7QUFDbUI7QUFTaEQ7O0FBRWQsZ0VBQXlCO0FBQ3pCLEVBQUUsNkRBQXNCO0FBQ3hCLEVBQUUsa0RBQWE7QUFDZixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMuY3NzPzE1NTMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2VsZW1lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvdWkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3VzZXJUdXJuLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpO1xuY29uc3QgcGxheWVyQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpO1xuY29uc3QgY29tcEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtYm9hcmRcIik7XG5jb25zdCBwbGF5ZXJCb2FyZCA9IHBsYXllckFyZWEucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIik7XG5jb25zdCBjb21wQm9hcmQgPSBjb21wQXJlYS5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZFwiKTtcbmNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS1pbnB1dFwiKTtcbmNvbnN0IG5hbWVTdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtc3VibWl0XCIpO1xuY29uc3QgbmFtZUlucHV0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYW1lLWlucHV0LWNvbnRhaW5lclwiKTtcbmNvbnN0IHBsYXllck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lXCIpO1xuY29uc3QgY29tcE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtbmFtZVwiKTtcbmNvbnN0IHNjb3Jlc0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVzLWJveFwiKTtcbmNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLWNlbGxcIik7XG5jb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKTtcbmNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXlcIik7XG5jb25zdCByZXBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlcGxheVwiKTtcblxuZXhwb3J0IHtcbiAgc3RhcnRCdG4sXG4gIHBsYXllckJvYXJkLFxuICBjb21wQm9hcmQsXG4gIHBsYXllckFyZWEsXG4gIGNvbXBBcmVhLFxuICBuYW1lSW5wdXQsXG4gIG5hbWVTdWJtaXRCdG4sXG4gIG5hbWVJbnB1dERpdixcbiAgcGxheWVyTmFtZSxcbiAgY29tcE5hbWUsXG4gIHNjb3Jlc0JveCxcbiAgZ3JpZENlbGwsXG4gIGluc3RydWN0aW9ucyxcbiAgcGxheUJ0bixcbiAgcmVwbGF5QnRuLFxufTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuXG5jb25zdCBnYW1lID0ge1xuICB1c2VyOiBudWxsLFxuICBjb21wOiBudWxsLFxuICBsYXN0V2lubmVyOiBudWxsLFxufTtcblxuZnVuY3Rpb24gcHJlcGFyZUdhbWUodXNlcm5hbWUpIHtcbiAgZ2FtZS51c2VyID0gUGxheWVyKHVzZXJuYW1lKTtcbiAgZ2FtZS5jb21wID0gUGxheWVyKFwiY29tcHV0ZXJcIik7XG4gIGdhbWUudXNlci5nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgZ2FtZS5jb21wLmdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICBnYW1lLnVzZXIuY3JlYXRlRmxlZXQoKTtcbiAgZ2FtZS5jb21wLmNyZWF0ZUZsZWV0KCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0R2FtZSgpIHtcbiAgZ2FtZS51c2VyLmdhbWVib2FyZC5uZXdSb3VuZCgpO1xuICBnYW1lLmNvbXAuZ2FtZWJvYXJkLm5ld1JvdW5kKCk7XG4gIGdhbWUudXNlci5jcmVhdGVGbGVldCgpO1xuICBnYW1lLmNvbXAuY3JlYXRlRmxlZXQoKTtcbn1cblxuZXhwb3J0IHsgZ2FtZSwgcHJlcGFyZUdhbWUsIHJlc2V0R2FtZSB9O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gIHJldHVybiB7XG4gICAgZmxlZXQ6IFtdLFxuICAgIG1pc3NlZFNob3RzOiBbXSxcbiAgICBmbGVldFN0YXR1czogW10sXG5cbiAgICBkZW1vOiBudWxsLFxuXG4gICAgcGxhY2VTaGlwKG5hbWUsIGNvb3Jkcykge1xuICAgICAgY29uc3QgbmV3U2hpcCA9IFNoaXAobmFtZSwgY29vcmRzKTtcblxuICAgICAgLy8gbmV3U2hpcC5jb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIC8vICAgY29uc3QgcG9zQXJyYXkgPSBPYmplY3Qua2V5cyh0aGlzLmJvYXJkUG9zaXRpb25zKTtcbiAgICAgIC8vICAgY29uc3QgcG9zaXRpb24gPSBwb3NBcnJheS5maW5kKChwb3MpID0+IHBvcyA9PT0gY29vcmQpO1xuICAgICAgLy8gICB0aGlzLmJvYXJkUG9zaXRpb25zW3Bvc2l0aW9uXSA9IHRydWU7XG4gICAgICAvLyB9KTtcblxuICAgICAgdGhpcy5mbGVldC5wdXNoKG5ld1NoaXApO1xuICAgICAgdGhpcy5mbGVldFt0aGlzLmZsZWV0Lmxlbmd0aCAtIDFdLmlkID0gdGhpcy5mbGVldC5sZW5ndGggLSAxO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrKHBvcykge1xuICAgICAgbGV0IGhpdCA9IGZhbHNlO1xuICAgICAgbGV0IHNoaXA7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMuZmxlZXQubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmZsZWV0W2ldLmNvb3Jkcy5pbmNsdWRlcyhwb3MpKSB7XG4gICAgICAgICAgdGhpcy5mbGVldFtpXS5oaXQocG9zKTtcbiAgICAgICAgICBoaXQgPSB0cnVlO1xuICAgICAgICAgIHNoaXAgPSB0aGlzLmZsZWV0W2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgcmV0dXJuIHNoaXA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1pc3NlZFNob3RzLnB1c2gocG9zKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hlY2tGbGVldFN0YXR1cygpIHtcbiAgICAgIHRoaXMuZmxlZXRTdGF0dXMgPSBbXTtcblxuICAgICAgdGhpcy5mbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGlmIChzaGlwLnN0YXR1cyA9PT0gXCJzdW5rXCIpIHtcbiAgICAgICAgICB0aGlzLmZsZWV0U3RhdHVzLnB1c2goXCJzdW5rXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuZmxlZXRTdGF0dXMubGVuZ3RoID09PSB0aGlzLmZsZWV0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbmV3Um91bmQoKSB7XG4gICAgICB0aGlzLmZsZWV0ID0gW107XG4gICAgICB0aGlzLm1pc3NlZFNob3RzID0gW107XG4gICAgICB0aGlzLmZsZWV0U3RhdHVzID0gW107XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmZ1bmN0aW9uIFBsYXllcihuYW1lKSB7XG4gIGNvbnN0IHByb3RvID0ge1xuICAgIGRlbW86IFtdLFxuXG4gICAgY29tcEF0dGFjaygpIHtcbiAgICAgIGxldCBjb29yZCA9IHRoaXMuZ2V0UmFuZG9tQ29vcmQoMTApO1xuXG4gICAgICBpZiAodGhpcy5jaGVja1ByZXZpb3VzTW92ZXMoY29vcmQpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBBdHRhY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0UmFuZG9tQ29vcmQoZmFjdG9yKSB7XG4gICAgICBjb25zdCB4ID0gdGhpcy5nZXRSYW5kb21JbnQoZmFjdG9yKS50b1N0cmluZygpO1xuICAgICAgY29uc3QgeSA9IHRoaXMuZ2V0UmFuZG9tSW50KGZhY3RvcikudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IGNvb3JkID0geCArIHk7XG4gICAgICByZXR1cm4gY29vcmQ7XG4gICAgfSxcblxuICAgIGdldFN0YXJ0Q29vcmQobGVuZ3RoLCBheGlzKSB7XG4gICAgICBjb25zdCBjb29yZCA9IHRoaXMuZ2V0UmFuZG9tQ29vcmQoMTApO1xuXG4gICAgICBpZiAoY29vcmRbYXhpc10gPiAxMCAtIGxlbmd0aCB8fCB0aGlzLmNoZWNrRm9yRHVwbGljYXRlKGNvb3JkKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydENvb3JkKGxlbmd0aCwgYXhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrRm9yRHVwbGljYXRlKGNvb3JkKSB7XG4gICAgICByZXR1cm4gdGhpcy5nYW1lYm9hcmQuZmxlZXQuc29tZSgoc2hpcCkgPT4ge1xuICAgICAgICByZXR1cm4gc2hpcC5jb29yZHMuc29tZSgoaXRlbSkgPT4gaXRlbSA9PSBjb29yZCk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgY3JlYXRlRmxlZXQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgIGdlbmVyYXRlU2hpcENvb3JkcyhcImNhcnJpZXJcIiwgNSk7XG4gICAgICBnZW5lcmF0ZVNoaXBDb29yZHMoXCJiYXR0bGVzaGlwXCIsIDQpO1xuICAgICAgZ2VuZXJhdGVTaGlwQ29vcmRzKFwiY3J1aXNlclwiLCAzKTtcbiAgICAgIGdlbmVyYXRlU2hpcENvb3JkcyhcInN1Ym1hcmluZVwiLCAzKTtcbiAgICAgIGdlbmVyYXRlU2hpcENvb3JkcyhcImRlc3Ryb3llclwiLCAyKTtcblxuICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVTaGlwQ29vcmRzKG5hbWUsIGxlbmd0aCkge1xuICAgICAgICBjb25zdCBheGlzID0gc2VsZi5nZXRSYW5kb21JbnQoMik7XG5cbiAgICAgICAgbGV0IGNvb3JkID0gc2VsZi5nZXRTdGFydENvb3JkKGxlbmd0aCwgYXhpcyk7XG5cbiAgICAgICAgY29vcmQgPSBbY29vcmRdO1xuXG4gICAgICAgIGxldCBhZGRBeGlzID0gMDtcbiAgICAgICAgbGV0IHNhbWVBeGlzID0gMDtcblxuICAgICAgICBheGlzID09IDAgPyAoc2FtZUF4aXMgPSAxKSA6IChhZGRBeGlzID0gMSk7XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgICBsZXQgbmV3Q29vcmQ7XG5cbiAgICAgICAgICBsZXQgbnVtID0gTnVtYmVyKGNvb3JkW2Nvb3JkLmxlbmd0aCAtIDFdW2FkZEF4aXNdKTtcblxuICAgICAgICAgIGF4aXMgPT0gMFxuICAgICAgICAgICAgPyAobmV3Q29vcmQgPSAobnVtICs9IDEpICsgY29vcmRbY29vcmQubGVuZ3RoIC0gMV1bc2FtZUF4aXNdKVxuICAgICAgICAgICAgOiAobmV3Q29vcmQgPSBjb29yZFtjb29yZC5sZW5ndGggLSAxXVtzYW1lQXhpc10gKyAobnVtICs9IDEpKTtcblxuICAgICAgICAgIGlmIChzZWxmLmNoZWNrRm9yRHVwbGljYXRlKG5ld0Nvb3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlU2hpcENvb3JkcyhuYW1lLCBsZW5ndGgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb29yZC5wdXNoKG5ld0Nvb3JkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5nYW1lYm9hcmQucGxhY2VTaGlwKG5hbWUsIGNvb3JkKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlRmxlZXQoZmxlZXRPYmopIHtcbiAgICAgIHRoaXMuZ2FtZWJvYXJkLmZsZWV0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IHByb3AgaW4gZmxlZXRPYmopIHtcbiAgICAgICAgbGV0IG5hbWUgPSBmbGVldE9ialtwcm9wXS5uYW1lO1xuICAgICAgICBsZXQgY29vcmRzID0gZmxlZXRPYmpbcHJvcF0uY29vcmRzO1xuICAgICAgICB0aGlzLmdhbWVib2FyZC5wbGFjZVNoaXAobmFtZSwgY29vcmRzKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hlY2tQcmV2aW91c01vdmVzKGNvb3JkKSB7XG4gICAgICBjb25zdCBoaXRzID0gW107XG4gICAgICBjb25zdCBtaXNzZWQgPSBnYW1lLnVzZXIuZ2FtZWJvYXJkLm1pc3NlZFNob3RzO1xuXG4gICAgICBnYW1lLnVzZXIuZ2FtZWJvYXJkLmZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5oaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgICAgIGhpdHMucHVzaChoaXQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBtaXNzZWQuZm9yRWFjaCgobWlzcykgPT4ge1xuICAgICAgICBoaXRzLnB1c2gobWlzcyk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGhpdHMuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRSYW5kb21JbnQoZmFjdG9yKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmFjdG9yKTtcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuXG4gIG9iai5uYW1lID0gbmFtZTtcbiAgb2JqLmdhbWVzV29uID0gMDtcbiAgb2JqLmdhbWVib2FyZCA9IG51bGw7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiZnVuY3Rpb24gU2hpcChuYW1lLCBjb29yZHMpIHtcbiAgY29uc3QgcHJvdG8gPSB7XG4gICAgaGl0KG51bWJlcikge1xuICAgICAgaWYgKHRoaXMuY29vcmRzLmluY2x1ZGVzKG51bWJlcikgJiYgIXRoaXMuaGl0cy5pbmNsdWRlcyhudW1iZXIpKSB7XG4gICAgICAgIHRoaXMuaGl0cy5wdXNoKG51bWJlcik7XG4gICAgICAgIHRoaXMuaXNTdW5rKCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzU3VuaygpIHtcbiAgICAgIGNvbnN0IHN1bmsgPSB0aGlzLmhpdHMuZXZlcnkoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29vcmRzLmluY2x1ZGVzKGl0ZW0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChzdW5rID09PSB0cnVlICYmIHRoaXMuaGl0cy5sZW5ndGggPT09IHRoaXMuY29vcmRzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IFwic3Vua1wiO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XG5cbiAgb2JqLm5hbWUgPSBuYW1lO1xuICBvYmouY29vcmRzID0gY29vcmRzO1xuICBvYmoubGVuZ3RoID0gY29vcmRzLmxlbmd0aDtcbiAgb2JqLmhpdHMgPSBbXTtcbiAgb2JqLnN0YXR1cyA9IFwidW5zdW5rXCI7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsImltcG9ydCB7IGdhbWUsIHByZXBhcmVHYW1lLCByZXNldEdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQge1xuICBwbGF5ZXJCb2FyZCxcbiAgY29tcEJvYXJkLFxuICBwbGF5ZXJBcmVhLFxuICBjb21wQXJlYSxcbiAgbmFtZUlucHV0LFxuICBuYW1lU3VibWl0QnRuLFxuICBuYW1lSW5wdXREaXYsXG4gIHBsYXllck5hbWUsXG4gIGNvbXBOYW1lLFxuICBzY29yZXNCb3gsXG4gIGdyaWRDZWxsLFxuICBpbnN0cnVjdGlvbnMsXG4gIHBsYXlCdG4sXG4gIHJlcGxheUJ0bixcbn0gZnJvbSBcIi4vZWxlbWVudHNcIjtcbmltcG9ydCB7IHVzZXJUdXJuLCBjb21wVHVybiB9IGZyb20gXCIuL3VzZXJUdXJuXCI7XG5pbXBvcnQgZG90IGZyb20gXCIuLy4uL2RvdC5wbmdcIjtcbmltcG9ydCBjcm9zcyBmcm9tIFwiLi8uLi9jcm9zcy5wbmdcIjtcblxuZnVuY3Rpb24gcG9wdWxhdGVCb2FyZChwbGF5ZXIpIHtcbiAgcGFpbnRTaGlwcyhwbGF5ZXIuZ2FtZWJvYXJkLmZsZWV0KTtcbn1cblxuZnVuY3Rpb24gcGFpbnRTaGlwcyhmbGVldCkge1xuICBjb25zdCBjZWxsUG9zaXRpb25zID0gZ2V0Q2VsbFBvc2l0aW9ucygpO1xuXG4gIGZsZWV0LmZvckVhY2goKHNoaXAsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIGRpdi5kYXRhc2V0LmlkID0gaW5kZXg7XG4gICAgZGl2LmRhdGFzZXQuY29vcmRzID0gSlNPTi5zdHJpbmdpZnkoc2hpcC5jb29yZHMpO1xuICAgIGRpdi5kYXRhc2V0Lm5hbWUgPSBzaGlwLm5hbWU7XG5cbiAgICBjb25zdCBmaXJzdENvID0gW107XG5cbiAgICBjb25zdCBkaXZXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC1jZWxsXCIpLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IGRpdkhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC1jZWxsXCIpLm9mZnNldEhlaWdodDtcblxuICAgIHNoaXAuY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBmaXJzdENvLnB1c2goY29vcmRbMF0pO1xuICAgIH0pO1xuXG4gICAgaWYgKGZpcnN0Q29bMF0gPT09IGZpcnN0Q29bMV0pIHtcbiAgICAgIGRpdi5zdHlsZS53aWR0aCA9IGRpdldpZHRoICsgXCJweFwiO1xuICAgICAgZGl2LnN0eWxlLmhlaWdodCA9IHNoaXAubGVuZ3RoICogZGl2SGVpZ2h0ICsgKHNoaXAubGVuZ3RoIC0gMSkgKiAzICsgXCJweFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gZGl2SGVpZ2h0ICsgXCJweFwiO1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gc2hpcC5sZW5ndGggKiBkaXZXaWR0aCArIChzaGlwLmxlbmd0aCAtIDEpICogMyArIFwicHhcIjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gY2VsbFBvc2l0aW9ucykge1xuICAgICAgaWYgKGNlbGxQb3NpdGlvbnNbcHJvcF0uY29vcmRzID09IHNoaXAuY29vcmRzWzBdKSB7XG4gICAgICAgIGRpdi5zdHlsZS50b3AgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy50b3AgKyBcInB4XCI7XG4gICAgICAgIGRpdi5zdHlsZS5sZWZ0ID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MubGVmdCArIFwicHhcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgcGxheWVyQXJlYS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIGRyYWdFbGVtZW50KGRpdik7XG4gICAgcm90YXRlU2hpcChkaXYpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJTaGlwcygpIHtcbiAgY29uc3Qgc2hpcHMgPSBwbGF5ZXJBcmVhLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXBhaW50U2hpcHMoKSB7XG4gIGNsZWFyU2hpcHMoKTtcbiAgcGFpbnRTaGlwcyhnYW1lLnVzZXIuZ2FtZWJvYXJkLmZsZWV0KTtcbn1cblxuZnVuY3Rpb24gdXNlck5hbWVJbnB1dCgpIHtcbiAgbmFtZUlucHV0RGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlZFwiKTtcbiAgbmFtZUlucHV0LnN0eWxlLmJveFNoYWRvdyA9IFwiMHB4IDBweCA2cHggM3B4IGJsYWNrXCI7XG4gIG5hbWVTdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAobmFtZUlucHV0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgICBuYW1lSW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjRThCNERDXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHAgPSBwbGF5ZXJOYW1lLnF1ZXJ5U2VsZWN0b3IoXCJwXCIpO1xuICAgICAgcC50ZXh0Q29udGVudCA9IG5hbWVJbnB1dC52YWx1ZTtcbiAgICAgIG5hbWVJbnB1dC52YWx1ZSA9IG51bGw7XG4gICAgICBuYW1lSW5wdXREaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgcHJlcGFyZUdhbWUobmFtZUlucHV0LnZhbHVlKTtcbiAgICAgIGRpc3BsYXlTZXRVcCgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTZXRVcCgpIHtcbiAgZGlzcGxheVNjb3JlcygpO1xuICBpbml0aWFsQm9hcmRzRGlzcGxheSgpO1xuICBwb3NpdGlvbkZsZWV0KCk7XG4gIHBsYXlCdXR0b24oKTtcbiAgd2luZG93Lm9ucmVzaXplID0gcmVwYWludFNoaXBzO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsQm9hcmRzRGlzcGxheSgpIHtcbiAgY29tcEJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlZFwiKTtcbiAgY29tcE5hbWUuY2xhc3NMaXN0LnJlbW92ZShcImZhZGVkXCIpO1xuICBjb21wQXJlYS5jbGFzc0xpc3QuYWRkKFwiZmFkZWRcIik7XG4gIHBsYXllckJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlZFwiKTtcbiAgcGxheWVyTmFtZS5jbGFzc0xpc3QucmVtb3ZlKFwiZmFkZWRcIik7XG4gIHBsYXllckFyZWEuY2xhc3NMaXN0LnJlbW92ZShcImZhZGVkXCIpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2NvcmVzKCkge1xuICBjb25zdCBzY29yZXMgPSBzY29yZXNCb3gucXVlcnlTZWxlY3RvcihcInBcIik7XG4gIHNjb3Jlcy50ZXh0Q29udGVudCA9IGdhbWUudXNlci5nYW1lc1dvbiArIFwiIC0gXCIgKyBnYW1lLmNvbXAuZ2FtZXNXb247XG59XG5cbmZ1bmN0aW9uIHBvc2l0aW9uRmxlZXQoKSB7XG4gIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPVxuICAgIFwiPHA+QXJyYW5nZSB5b3VyIHNoaXBzIGluIHByZXBhcmF0aW9uIGZvciBhIG5hdmFsIGJhdHRsZSE8L3A+IDxwPlRoZSBzaGlwcyBtdXN0IGFsbCBiZSBncmVlbiBiZWZvcmUgeW91IGNhbiBzdGFydCB0aGUgZ2FtZS48L3A+IDxwPihEb3VibGUtY2xpY2sgdG8gcm90YXRlIGEgc2hpcC4pPC9wPlwiO1xuXG4gIHBvcHVsYXRlQm9hcmQoZ2FtZS51c2VyKTtcbn1cblxuZnVuY3Rpb24gcGxheUJ1dHRvbigpIHtcbiAgcGxheUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICBwbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5QnRuSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIHBsYXlCdG5IYW5kbGVyKCkge1xuICBpZiAoIWNoZWNrRm9yUmVkKCkpIHtcbiAgICBnYW1lLnVzZXIudXBkYXRlRmxlZXQoZ2V0RGlzcGxheUZsZWV0SW5mbygpKTtcbiAgICBwcmVwYXJlQ29tcEJvYXJkKCk7XG4gICAgY2xlYXJTaGlwcygpO1xuXG4gICAgd2luZG93Lm9ucmVzaXplID0gbnVsbDtcblxuICAgIGNvbnNvbGUubG9nKGdhbWUuY29tcC5nYW1lYm9hcmQuZmxlZXQpO1xuXG4gICAgZGVjaWRlRmlyc3RUdXJuKCk7XG5cbiAgICBwbGF5QnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfSBlbHNlIGlmIChjaGVja0ZvclJlZCgpKSB7XG4gICAgYWxlcnQoXCJBbGwgc2hpcHMgbXVzdCBiZSBncmVlbiFcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVwbGF5QnV0dG9uKCkge1xuICByZXBsYXlCdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVwbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXBsYXlCdG5IYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gcmVwbGF5QnRuSGFuZGxlcigpIHtcbiAgY2xlYXJCb2FyZHMoKTtcbiAgcmVzZXRHYW1lKCk7XG4gIGRpc3BsYXlTZXRVcCgpO1xuXG4gIHJlcGxheUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIGRlY2lkZUZpcnN0VHVybigpIHtcbiAgaWYgKGdhbWUubGFzdFdpbm5lciA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgcGxheWVyQm9hcmQuY2xhc3NMaXN0LnJlbW92ZShcImZhZGVkXCIpO1xuICAgIGNvbXBBcmVhLmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlZFwiKTtcbiAgICBjb21wQm9hcmQuY2xhc3NMaXN0LmFkZChcImZhZGVkXCIpO1xuICAgIGNvbXBOYW1lLmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlZFwiKTtcbiAgICBwbGF5ZXJOYW1lLmNsYXNzTGlzdC5hZGQoXCJmYWRlZFwiKTtcblxuICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPVxuICAgICAgXCI8cD5UaGUgY29tcHV0ZXIgaXMgY2hvb3Npbmcgd2hlcmUgdG8gYXR0YWNrLi4uPC9wPlwiO1xuXG4gICAgY29tcEFyZWEuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuXG4gICAgY29tcFR1cm4oKTtcbiAgfSBlbHNlIHtcbiAgICBwbGF5ZXJCb2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwiZmFkZWRcIik7XG4gICAgY29tcEFyZWEuY2xhc3NMaXN0LnRvZ2dsZShcImZhZGVkXCIpO1xuICAgIGNvbXBOYW1lLmNsYXNzTGlzdC5hZGQoXCJmYWRlZFwiKTtcblxuICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBcIjxwPlBpY2sgYW4gZW5lbXkgcG9zaXRpb24gdG8gYXR0YWNrLjwvcD5cIjtcblxuICAgIGNvbXBCb2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJCb2FyZHMoKSB7XG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIik7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGlmIChjZWxsLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIikpIHtcbiAgICAgIGNlbGwucXVlcnlTZWxlY3RvcihcImltZ1wiKS5yZW1vdmUoKTtcbiAgICB9XG4gICAgaWYgKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic3Vua1wiKSkge1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwic3Vua1wiKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzd2l0Y2hBcmVhRmFkZSgpIHtcbiAgcGxheWVyQm9hcmQuY2xhc3NMaXN0LnRvZ2dsZShcImZhZGVkXCIpO1xuICBjb21wQm9hcmQuY2xhc3NMaXN0LnRvZ2dsZShcImZhZGVkXCIpO1xuICBwbGF5ZXJOYW1lLmNsYXNzTGlzdC50b2dnbGUoXCJmYWRlZFwiKTtcbiAgY29tcE5hbWUuY2xhc3NMaXN0LnRvZ2dsZShcImZhZGVkXCIpO1xufVxuXG5mdW5jdGlvbiBzd2l0Y2hQbGF5ZXJUdXJuKHBsYXllcikge1xuICBpZiAocGxheWVyID09PSBcImNvbXBcIikge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc3dpdGNoQXJlYUZhZGUoKTtcbiAgICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPVxuICAgICAgICBcIjxwPlRoZSBjb21wdXRlciBpcyBjaG9vc2luZyB3aGVyZSB0byBhdHRhY2suLi48L3A+XCI7XG4gICAgICBjb21wVHVybigpO1xuICAgIH0sIDE1MDApO1xuICB9IGVsc2Uge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc3dpdGNoQXJlYUZhZGUoKTtcbiAgICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBcIjxwPlBpY2sgYW4gZW5lbXkgcG9zaXRpb24gdG8gYXR0YWNrLjwvcD5cIjtcbiAgICAgIGNvbXBCb2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG4gICAgfSwgMTUwMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd01pc3NlZENlbGwoY2VsbCkge1xuICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBpbWcuY2xhc3NMaXN0LmFkZChcImRvdFwiKTtcbiAgaW1nLnNyYyA9IGRvdDtcbiAgY2VsbC5hcHBlbmRDaGlsZChpbWcpO1xufVxuXG5mdW5jdGlvbiBzaG93U3RydWNrQ2VsbChjZWxsKSB7XG4gIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIGltZy5jbGFzc0xpc3QuYWRkKFwiY3Jvc3NcIik7XG4gIGltZy5zcmMgPSBjcm9zcztcbiAgY2VsbC5hcHBlbmRDaGlsZChpbWcpO1xufVxuXG5mdW5jdGlvbiBoaWdobGlnaHRTdW5rU2hpcChzaGlwLCBib2FyZCkge1xuICBzaGlwLmNvb3Jkcy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgIGNvbnN0IGNlbGwgPSBib2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14eT0nJHtjb29yZH0nXWApO1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInN1bmtcIik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlQ29tcEJvYXJkKCkge1xuICBjb25zdCBjZWxscyA9IGNvbXBCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKTtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0VXNlclR1cm4sIHsgb25jZTogdHJ1ZSB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0VXNlclR1cm4oZSkge1xuICB1c2VyVHVybihlLnRhcmdldCk7XG4gIGNvbXBCb2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlGbGVldEluZm8oKSB7XG4gIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xuICBjb25zdCBmbGVldENvb3JkcyA9IHt9O1xuXG4gIHNoaXBzLmZvckVhY2goKHNoaXAsIGluZGV4KSA9PiB7XG4gICAgY29uc3Qgc2hpcE9iaiA9IHt9O1xuICAgIHNoaXBPYmouY29vcmRzID0gSlNPTi5wYXJzZShzaGlwLmRhdGFzZXQuY29vcmRzKTtcbiAgICBzaGlwT2JqLmlkID0gc2hpcC5kYXRhc2V0LmlkO1xuICAgIHNoaXBPYmoubmFtZSA9IHNoaXAuZGF0YXNldC5uYW1lO1xuICAgIGZsZWV0Q29vcmRzW2luZGV4XSA9IHNoaXBPYmo7XG4gIH0pO1xuXG4gIHJldHVybiBmbGVldENvb3Jkcztcbn1cblxuZnVuY3Rpb24gZ2V0U2hpcENvb3JkcyhlbG1udCkge1xuICBjb25zdCBjZWxscyA9IGdldENlbGxQb3NpdGlvbnMoKTtcbiAgY29uc3Qgc2hpcCA9IGVsbW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBsZXQgY29vcmRzO1xuXG4gIGZvciAoY29uc3QgcHJvcCBpbiBjZWxscykge1xuICAgIGlmIChcbiAgICAgIHNoaXAubGVmdCA9PT0gY2VsbHNbcHJvcF0uc2NyZWVuUG9zLmxlZnQgJiZcbiAgICAgIHNoaXAudG9wID09PSBjZWxsc1twcm9wXS5zY3JlZW5Qb3MudG9wXG4gICAgKSB7XG4gICAgICBjb29yZHMgPSBjZWxsc1twcm9wXS5jb29yZHM7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBjb25zdCBjZWxsV2lkdGggPSBncmlkQ2VsbC5vZmZzZXRXaWR0aDtcbiAgbGV0IGF4aXM7XG4gIGxldCBsZW5ndGg7XG4gIGxldCBmdWxsQ29vcmRzID0gW2Nvb3Jkc107XG5cbiAgaWYgKHNoaXAuaGVpZ2h0ID4gc2hpcC53aWR0aCkge1xuICAgIGF4aXMgPSAxO1xuICAgIGxlbmd0aCA9IE1hdGgucm91bmQoc2hpcC5oZWlnaHQgLyBjZWxsV2lkdGgpO1xuICB9IGVsc2Uge1xuICAgIGF4aXMgPSAwO1xuICAgIGxlbmd0aCA9IE1hdGgucm91bmQoc2hpcC53aWR0aCAvIGNlbGxXaWR0aCk7XG4gIH1cblxuICBsZXQgc2FtZUF4aXM7XG5cbiAgYXhpcyA9PSAwID8gKHNhbWVBeGlzID0gMSkgOiAoc2FtZUF4aXMgPSAwKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xuICAgIGxldCBuZXdDb29yZDtcbiAgICBsZXQgbnVtID0gTnVtYmVyKGZ1bGxDb29yZHNbZnVsbENvb3Jkcy5sZW5ndGggLSAxXVtheGlzXSk7XG4gICAgYXhpcyA9PSAwXG4gICAgICA/IChuZXdDb29yZCA9IChudW0gKz0gMSkgKyBmdWxsQ29vcmRzW2Z1bGxDb29yZHMubGVuZ3RoIC0gMV1bc2FtZUF4aXNdKVxuICAgICAgOiAobmV3Q29vcmQgPSBmdWxsQ29vcmRzW2Z1bGxDb29yZHMubGVuZ3RoIC0gMV1bc2FtZUF4aXNdICsgKG51bSArPSAxKSk7XG4gICAgZnVsbENvb3Jkcy5wdXNoKG5ld0Nvb3JkKTtcbiAgfVxuICByZXR1cm4gZnVsbENvb3Jkcztcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JSZWQoKSB7XG4gIGxldCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnZhbGlkLXBvc1wiKTtcblxuICBpZiAoc2hpcCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkcmFnRWxlbWVudChlbG1udCkge1xuICBsZXQgcG9zMSA9IDAsXG4gICAgcG9zMiA9IDAsXG4gICAgcG9zMyA9IDAsXG4gICAgcG9zNCA9IDA7XG5cbiAgZWxtbnQub25tb3VzZWRvd24gPSBkcmFnTW91c2VEb3duO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2V0Qm9yZGVyKCk7XG5cbiAgZnVuY3Rpb24gZHJhZ01vdXNlRG93bihlKSB7XG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBwb3MzID0gZS5jbGllbnRYO1xuICAgIHBvczQgPSBlLmNsaWVudFk7XG4gICAgZG9jdW1lbnQub25tb3VzZXVwID0gKCkgPT4ge1xuICAgICAgY2xvc2VEcmFnRWxlbWVudChlbG1udCk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IGVsZW1lbnREcmFnO1xuICB9XG5cbiAgZnVuY3Rpb24gZWxlbWVudERyYWcoZSkge1xuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcG9zMSA9IHBvczMgLSBlLmNsaWVudFg7XG4gICAgcG9zMiA9IHBvczQgLSBlLmNsaWVudFk7XG5cbiAgICBwb3MzID0gZS5jbGllbnRYO1xuICAgIHBvczQgPSBlLmNsaWVudFk7XG5cbiAgICBrZWVwSW5Cb3VuZHMoZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0Rvd25EcmFnKGUpIHtcbiAgICBpZiAoZS5jbGllbnRZID4gcG9zNCkge1xuICAgICAgcmV0dXJuIGUuY2xpZW50WSAtIHBvczQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1JpZ2h0RHJhZyhlKSB7XG4gICAgaWYgKGUuY2xpZW50WCA+IHBvczMpIHtcbiAgICAgIHJldHVybiBlLmNsaWVudFggLSBwb3MzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tMZWZ0RHJhZyhlKSB7XG4gICAgaWYgKGUuY2xpZW50WCA8IHBvczMpIHtcbiAgICAgIHJldHVybiBwb3MzIC0gZS5jbGllbnRYO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tVcERyYWcoZSkge1xuICAgIGlmIChlLmNsaWVudFkgPCBwb3M0KSB7XG4gICAgICByZXR1cm4gcG9zNCAtIGUuY2xpZW50WTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGtlZXBJbkJvdW5kcyhlKSB7XG4gICAgaWYgKCFjaGVja1Bvc2l0aW9uKGVsbW50KSkge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID0gZWxtbnQub2Zmc2V0VG9wIC0gcG9zMiArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmxlZnQgPSBlbG1udC5vZmZzZXRMZWZ0IC0gcG9zMSArIFwicHhcIjtcbiAgICB9IGVsc2UgaWYgKGNoZWNrUG9zaXRpb24oZWxtbnQpID09PSBcInRvcFwiKSB7XG4gICAgICBlbG1udC5zdHlsZS50b3AgPSBib2FyZC50b3AgKyBjaGVja0Rvd25EcmFnKGUpICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IGVsbW50Lm9mZnNldExlZnQgLSBwb3MxICsgXCJweFwiO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tQb3NpdGlvbihlbG1udCkgPT09IFwibGVmdFwiKSB7XG4gICAgICBlbG1udC5zdHlsZS50b3AgPSBlbG1udC5vZmZzZXRUb3AgLSBwb3MyICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IGJvYXJkLmxlZnQgKyBjaGVja1JpZ2h0RHJhZyhlKSArIFwicHhcIjtcbiAgICB9IGVsc2UgaWYgKGNoZWNrUG9zaXRpb24oZWxtbnQpID09PSBcInJpZ2h0XCIpIHtcbiAgICAgIGVsbW50LnN0eWxlLnRvcCA9IGVsbW50Lm9mZnNldFRvcCAtIHBvczIgKyBcInB4XCI7XG4gICAgICBlbG1udC5zdHlsZS5sZWZ0ID1cbiAgICAgICAgYm9hcmQucmlnaHQgLSBlbG1udC5vZmZzZXRXaWR0aCAtIGNoZWNrTGVmdERyYWcoZSkgKyBcInB4XCI7XG4gICAgfSBlbHNlIGlmIChjaGVja1Bvc2l0aW9uKGVsbW50KSA9PT0gXCJib3R0b21cIikge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID1cbiAgICAgICAgYm9hcmQuYm90dG9tIC0gZWxtbnQub2Zmc2V0SGVpZ2h0IC0gY2hlY2tVcERyYWcoZSkgKyBcInB4XCI7XG4gICAgICBlbG1udC5zdHlsZS5sZWZ0ID0gZWxtbnQub2Zmc2V0TGVmdCAtIHBvczEgKyBcInB4XCI7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tQb3NpdGlvbihlbG1udCkge1xuICAgIGNvbnN0IGVsbW50UmVjdCA9IGVsbW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKGVsbW50UmVjdC50b3AgPCBib2FyZC50b3ApIHtcbiAgICAgIHJldHVybiBcInRvcFwiO1xuICAgIH0gZWxzZSBpZiAoZWxtbnRSZWN0LmxlZnQgPCBib2FyZC5sZWZ0KSB7XG4gICAgICByZXR1cm4gXCJsZWZ0XCI7XG4gICAgfSBlbHNlIGlmIChlbG1udFJlY3QucmlnaHQgPiBib2FyZC5yaWdodCkge1xuICAgICAgcmV0dXJuIFwicmlnaHRcIjtcbiAgICB9IGVsc2UgaWYgKGVsbW50UmVjdC5ib3R0b20gPiBib2FyZC5ib3R0b20pIHtcbiAgICAgIHJldHVybiBcImJvdHRvbVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VEcmFnRWxlbWVudChlbG1udCkge1xuICAgIGdyaWRTbmFwKGVsbW50KTtcbiAgICBkb2N1bWVudC5vbm1vdXNldXAgPSBudWxsO1xuICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiByb3RhdGVTaGlwKGVsbW50KSB7XG4gIGVsbW50Lm9uZGJsY2xpY2sgPSByb3RhdGU7XG5cbiAgZnVuY3Rpb24gcm90YXRlKCkge1xuICAgIGNvbnN0IGJvYXJkID0gZ2V0Qm9yZGVyKCk7XG5cbiAgICBjb25zdCBlbG1udFJlY3QgPSBlbG1udC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGNvbnN0IGZ1dHVyZVJpZ2h0ID0gZWxtbnRSZWN0LmxlZnQgKyBlbG1udFJlY3QuaGVpZ2h0O1xuICAgIGNvbnN0IGZ1dHVyZUJvdHRvbSA9IGVsbW50UmVjdC50b3AgKyBlbG1udFJlY3Qud2lkdGg7XG5cbiAgICBpZiAoIShmdXR1cmVSaWdodCAtIDEgPiBib2FyZC5yaWdodCB8fCBmdXR1cmVCb3R0b20gLSAxID4gYm9hcmQuYm90dG9tKSkge1xuICAgICAgZWxtbnQuc3R5bGUud2lkdGggPSBlbG1udFJlY3QuaGVpZ2h0ICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUuaGVpZ2h0ID0gZWxtbnRSZWN0LndpZHRoICsgXCJweFwiO1xuICAgICAgZWxtbnQuZGF0YXNldC5jb29yZHMgPSBKU09OLnN0cmluZ2lmeShnZXRTaGlwQ29vcmRzKGVsbW50KSk7XG4gICAgICBjaGVja1Byb3hpbWl0eShlbG1udCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrUHJveGltaXR5KGVsbW50KSB7XG4gIGNvbnN0IGZsZWV0ID0gZ2V0RGlzcGxheUZsZWV0SW5mbygpO1xuICBsZXQgb3ZlcmxhcDtcblxuICBmb3IgKGNvbnN0IHByb3AgaW4gZmxlZXQpIHtcbiAgICBpZiAoZmxlZXRbcHJvcF0uaWQgIT09IGVsbW50LmRhdGFzZXQuaWQpIHtcbiAgICAgIEpTT04ucGFyc2UoZWxtbnQuZGF0YXNldC5jb29yZHMpLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgIGlmIChmbGVldFtwcm9wXS5jb29yZHMuc29tZSgoaXRlbSkgPT4gaXRlbSA9PSBjb29yZCkpIHtcbiAgICAgICAgICBvdmVybGFwID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG92ZXJsYXApIHtcbiAgICBlbG1udC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1wb3NcIik7XG4gIH0gZWxzZSB7XG4gICAgZWxtbnQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWQtcG9zXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEJvcmRlcigpIHtcbiAgY29uc3QgaW5mbyA9IHBsYXllckJvYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4ge1xuICAgIHRvcDogTWF0aC5yb3VuZChpbmZvLnRvcCksXG4gICAgbGVmdDogTWF0aC5yb3VuZChpbmZvLmxlZnQpLFxuICAgIHJpZ2h0OiBNYXRoLnJvdW5kKGluZm8ucmlnaHQpLFxuICAgIGJvdHRvbTogTWF0aC5yb3VuZChpbmZvLmJvdHRvbSksXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldENlbGxQb3NpdGlvbnMoKSB7XG4gIGNvbnN0IGNlbGxQb3NpdGlvbnMgPSB7fTtcblxuICBjb25zdCBjZWxscyA9IHBsYXllckJvYXJkXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpXG4gICAgLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjZWxsT2JqID0ge307XG4gICAgICBjZWxsT2JqLnNjcmVlblBvcyA9IGNlbGwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjZWxsT2JqLmNvb3JkcyA9IGNlbGwuZGF0YXNldC54eTtcbiAgICAgIGNlbGxQb3NpdGlvbnNbaW5kZXhdID0gY2VsbE9iajtcbiAgICB9KTtcblxuICByZXR1cm4gY2VsbFBvc2l0aW9ucztcbn1cblxuZnVuY3Rpb24gZ3JpZFNuYXAoZWxtbnQpIHtcbiAgY29uc3QgY2VsbFBvc2l0aW9ucyA9IGdldENlbGxQb3NpdGlvbnMoXCIucGxheWVyLWJvYXJkXCIpO1xuXG4gIGNvbnN0IGVsbW50UG9zID0gZWxtbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgZm9yIChjb25zdCBwcm9wIGluIGNlbGxQb3NpdGlvbnMpIHtcbiAgICBjb25zdCB4TG93ZXIgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy54IC0gMjU7XG4gICAgY29uc3QgeUxvd2VyID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MueSAtIDI1O1xuICAgIGNvbnN0IHhMaW1pdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLnggKyAyNTtcbiAgICBjb25zdCB5TGltaXQgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy55ICsgMjU7XG5cbiAgICBpZiAoXG4gICAgICBlbG1udFBvcy54ID49IHhMb3dlciAmJlxuICAgICAgZWxtbnRQb3MueSA+PSB5TG93ZXIgJiZcbiAgICAgIGVsbW50UG9zLnggPD0geExpbWl0ICYmXG4gICAgICBlbG1udFBvcy55IDw9IHlMaW1pdFxuICAgICkge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MudG9wICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLmxlZnQgKyBcInB4XCI7XG5cbiAgICAgIGVsbW50LmRhdGFzZXQueCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uY29vcmRzWzBdO1xuICAgICAgZWxtbnQuZGF0YXNldC55ID0gY2VsbFBvc2l0aW9uc1twcm9wXS5jb29yZHNbMV07XG5cbiAgICAgIGVsbW50LmRhdGFzZXQuY29vcmRzID0gSlNPTi5zdHJpbmdpZnkoZ2V0U2hpcENvb3JkcyhlbG1udCkpO1xuICAgICAgY2hlY2tQcm94aW1pdHkoZWxtbnQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge1xuICBwb3B1bGF0ZUJvYXJkLFxuICBkcmFnRWxlbWVudCxcbiAgdXNlck5hbWVJbnB1dCxcbiAgcGFpbnRTaGlwcyxcbiAgY2xlYXJTaGlwcyxcbiAgc2hvd01pc3NlZENlbGwsXG4gIHNob3dTdHJ1Y2tDZWxsLFxuICBzd2l0Y2hQbGF5ZXJUdXJuLFxuICBoaWdobGlnaHRTdW5rU2hpcCxcbiAgcmVwbGF5QnV0dG9uLFxufTtcbiIsImltcG9ydCB7IGdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQge1xuICBzaG93TWlzc2VkQ2VsbCxcbiAgc2hvd1N0cnVja0NlbGwsXG4gIHN3aXRjaFBsYXllclR1cm4sXG4gIGhpZ2hsaWdodFN1bmtTaGlwLFxuICByZXBsYXlCdXR0b24sXG59IGZyb20gXCIuL3VpXCI7XG5pbXBvcnQgeyBpbnN0cnVjdGlvbnMsIHBsYXllckJvYXJkLCBjb21wQm9hcmQgfSBmcm9tIFwiLi9lbGVtZW50c1wiO1xuXG5mdW5jdGlvbiB1c2VyVHVybihjZWxsKSB7XG4gIGNvbnN0IGNvb3JkcyA9IGNlbGwuZGF0YXNldC54eTtcbiAgY29uc3Qgc2hpcCA9IGdhbWUuY29tcC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuXG4gIGlmIChzaGlwKSB7XG4gICAgc2hvd1N0cnVja0NlbGwoY2VsbCk7XG5cbiAgICBpZiAoc2hpcC5zdGF0dXMgPT09IFwic3Vua1wiKSB7XG4gICAgICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID0gYDxwPllvdSBzYW5rIHRoZWlyICR7c2hpcC5uYW1lfSEhPC9wPmA7XG4gICAgICBoaWdobGlnaHRTdW5rU2hpcChzaGlwLCBjb21wQm9hcmQpO1xuXG4gICAgICBpZiAoZ2FtZS5jb21wLmdhbWVib2FyZC5jaGVja0ZsZWV0U3RhdHVzKCkpIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IGA8cD5Zb3UndmUgd29uISEhPC9wPmA7XG4gICAgICAgIGdhbWUudXNlci5nYW1lc1dvbiArPSAxO1xuICAgICAgICBnYW1lLmxhc3RXaW5uZXIgPSBnYW1lLnVzZXIubmFtZTtcbiAgICAgICAgcmV0dXJuIHJlcGxheUJ1dHRvbigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID0gXCI8cD5Zb3UgaGl0IG9uZSBvZiB0aGVpciBzaGlwcy48L3A+XCI7XG4gICAgfVxuXG4gICAgc3dpdGNoUGxheWVyVHVybihcImNvbXBcIik7XG4gIH0gZWxzZSB7XG4gICAgc2hvd01pc3NlZENlbGwoY2VsbCk7XG4gICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IFwiPHA+WW91ciBhdHRhY2sgbWlzc2VkLjwvcD5cIjtcblxuICAgIHN3aXRjaFBsYXllclR1cm4oXCJjb21wXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbXBUdXJuKCkge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBnYW1lLmNvbXAuY29tcEF0dGFjaygpO1xuICAgIGNvbnN0IHNoaXAgPSBnYW1lLnVzZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgICBjb25zdCBjZWxsID0gcGxheWVyQm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEteHk9JyR7Y29vcmRzfSddYCk7XG5cbiAgICBpZiAoc2hpcCkge1xuICAgICAgc2hvd1N0cnVja0NlbGwoY2VsbCk7XG5cbiAgICAgIGlmIChzaGlwLnN0YXR1cyA9PT0gXCJzdW5rXCIpIHtcbiAgICAgICAgaGlnaGxpZ2h0U3Vua1NoaXAoc2hpcCwgcGxheWVyQm9hcmQpO1xuICAgICAgICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID0gYDxwPlRoZSBjb21wdXRlciBzYW5rIHlvdXIgJHtzaGlwLm5hbWV9ISE8L3A+YDtcblxuICAgICAgICBpZiAoZ2FtZS51c2VyLmdhbWVib2FyZC5jaGVja0ZsZWV0U3RhdHVzKCkpIHtcbiAgICAgICAgICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID0gYDxwPk9oIG5vLCB5b3UgbG9zdCE8L3A+YDtcbiAgICAgICAgICBnYW1lLmNvbXAuZ2FtZXNXb24gKz0gMTtcbiAgICAgICAgICBnYW1lLmxhc3RXaW5uZXIgPSBnYW1lLmNvbXAubmFtZTtcbiAgICAgICAgICByZXR1cm4gcmVwbGF5QnV0dG9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBcIjxwPlRoZSBjb21wdXRlciBoaXQgb25lIG9mIHlvdXIgc2hpcHMuPC9wPlwiO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2hQbGF5ZXJUdXJuKFwicGxheWVyXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaG93TWlzc2VkQ2VsbChjZWxsKTtcbiAgICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBcIjxwPlRoZSBjb21wdXRlcidzIGF0dGFjayBtaXNzZWQuPC9wPlwiO1xuXG4gICAgICBzd2l0Y2hQbGF5ZXJUdXJuKFwicGxheWVyXCIpO1xuICAgIH1cbiAgfSwgMTUwMCk7XG59XG5cbmV4cG9ydCB7IHVzZXJUdXJuLCBjb21wVHVybiB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IFwiLi8uLi9zdHlsZXMuY3NzXCI7XG5pbXBvcnQgeyBnYW1lLCBwcmVwYXJlR2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IHN0YXJ0QnRuLCBwbGF5ZXJCb2FyZCwgY29tcEJvYXJkIH0gZnJvbSBcIi4vZWxlbWVudHNcIjtcbmltcG9ydCB7XG4gIHBvcHVsYXRlQm9hcmQsXG4gIGFjdGl2YXRlRWxlbWVudCxcbiAgZHJhZ0VsZW1lbnQsXG4gIHJlbmRlckZsZWV0LFxuICB1c2VyTmFtZUlucHV0LFxuICBwYWludFNoaXBzLFxuICBjbGVhclNoaXBzLFxufSBmcm9tIFwiLi91aVwiO1xuXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBzdGFydEJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIHVzZXJOYW1lSW5wdXQoKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9