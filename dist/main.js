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

/***/ "./src/scripts/drag-funcs.js":
/*!***********************************!*\
  !*** ./src/scripts/drag-funcs.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dragElement": () => (/* binding */ dragElement),
/* harmony export */   "rotateShip": () => (/* binding */ rotateShip)
/* harmony export */ });
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "./src/scripts/ui.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements */ "./src/scripts/elements.js");



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
  const cellPositions = (0,_ui__WEBPACK_IMPORTED_MODULE_0__.getCellPositions)();

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

      elmnt.dataset.coords = JSON.stringify((0,_ui__WEBPACK_IMPORTED_MODULE_0__.getShipCoords)(elmnt));
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
      elmnt.dataset.coords = JSON.stringify((0,_ui__WEBPACK_IMPORTED_MODULE_0__.getShipCoords)(elmnt));
      checkProximity(elmnt);
    }
  }
}

function checkProximity(elmnt) {
  const fleet = (0,_ui__WEBPACK_IMPORTED_MODULE_0__.getDisplayFleetInfo)();
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
    top: _elements__WEBPACK_IMPORTED_MODULE_1__.playerArea.offsetTop,
    left: _elements__WEBPACK_IMPORTED_MODULE_1__.playerArea.offsetLeft,
    right: _elements__WEBPACK_IMPORTED_MODULE_1__.playerArea.offsetLeft + _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.offsetWidth,
    bottom: _elements__WEBPACK_IMPORTED_MODULE_1__.playerArea.offsetTop + _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.offsetHeight,
  };
}




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
/* harmony export */   "resetGame": () => (/* binding */ resetGame),
/* harmony export */   "userTurn": () => (/* binding */ userTurn),
/* harmony export */   "compTurn": () => (/* binding */ compTurn)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/scripts/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/scripts/player.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui */ "./src/scripts/ui.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elements */ "./src/scripts/elements.js");





const game = {
  user: null,
  comp: null,
  lastWinner: null,
};

function prepareGame() {
  game.user = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])("human");
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

function userTurn(cell) {
  const coords = cell.dataset.xy;
  const ship = game.comp.gameboard.receiveAttack(coords);

  if (ship) {
    (0,_ui__WEBPACK_IMPORTED_MODULE_2__.showStruckCell)(cell);

    if (ship.status === "sunk") {
      _elements__WEBPACK_IMPORTED_MODULE_3__.instructions.innerHTML = `<p>You sank their ${ship.name}!!</p>`;
      (0,_ui__WEBPACK_IMPORTED_MODULE_2__.highlightSunkShip)(ship, _elements__WEBPACK_IMPORTED_MODULE_3__.compBoard);

      if (game.comp.gameboard.checkFleetStatus()) {
        _elements__WEBPACK_IMPORTED_MODULE_3__.instructions.innerHTML = `<p>You've won!!!</p>`;
        game.user.gamesWon += 1;
        game.lastWinner = game.user.name;
        return (0,_ui__WEBPACK_IMPORTED_MODULE_2__.replayButton)();
      }
    } else {
      _elements__WEBPACK_IMPORTED_MODULE_3__.instructions.innerHTML = "<p>You hit one of their ships.</p>";
    }

    (0,_ui__WEBPACK_IMPORTED_MODULE_2__.switchPlayerTurn)("comp");
  } else {
    (0,_ui__WEBPACK_IMPORTED_MODULE_2__.showMissedCell)(cell);
    _elements__WEBPACK_IMPORTED_MODULE_3__.instructions.innerHTML = "<p>Your attack missed.</p>";

    (0,_ui__WEBPACK_IMPORTED_MODULE_2__.switchPlayerTurn)("comp");
  }
}

function compTurn() {
  setTimeout(() => {
    const coords = game.comp.compAttack();
    const ship = game.user.gameboard.receiveAttack(coords);
    const cell = _elements__WEBPACK_IMPORTED_MODULE_3__.playerBoard.querySelector(`[data-xy='${coords}']`);

    if (ship) {
      (0,_ui__WEBPACK_IMPORTED_MODULE_2__.showStruckCell)(cell);

      if (ship.status === "sunk") {
        (0,_ui__WEBPACK_IMPORTED_MODULE_2__.highlightSunkShip)(ship, _elements__WEBPACK_IMPORTED_MODULE_3__.playerBoard);
        _elements__WEBPACK_IMPORTED_MODULE_3__.instructions.innerHTML = `<p>The computer sank your ${ship.name}!!</p>`;

        if (game.user.gameboard.checkFleetStatus()) {
          _elements__WEBPACK_IMPORTED_MODULE_3__.instructions.innerHTML = `<p>Oh no, you lost!</p>`;
          game.comp.gamesWon += 1;
          game.lastWinner = game.comp.name;
          return (0,_ui__WEBPACK_IMPORTED_MODULE_2__.replayButton)();
        }
      } else {
        _elements__WEBPACK_IMPORTED_MODULE_3__.instructions.innerHTML = "<p>The computer hit one of your ships.</p>";
      }

      (0,_ui__WEBPACK_IMPORTED_MODULE_2__.switchPlayerTurn)("player");
    } else {
      (0,_ui__WEBPACK_IMPORTED_MODULE_2__.showMissedCell)(cell);
      _elements__WEBPACK_IMPORTED_MODULE_3__.instructions.innerHTML = "<p>The computer's attack missed.</p>";

      (0,_ui__WEBPACK_IMPORTED_MODULE_2__.switchPlayerTurn)("player");
    }
  }, 1500);
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
/* harmony export */   "getDisplayFleetInfo": () => (/* binding */ getDisplayFleetInfo),
/* harmony export */   "getCellPositions": () => (/* binding */ getCellPositions),
/* harmony export */   "getShipCoords": () => (/* binding */ getShipCoords),
/* harmony export */   "paintShips": () => (/* binding */ paintShips),
/* harmony export */   "clearShips": () => (/* binding */ clearShips),
/* harmony export */   "showMissedCell": () => (/* binding */ showMissedCell),
/* harmony export */   "showStruckCell": () => (/* binding */ showStruckCell),
/* harmony export */   "switchPlayerTurn": () => (/* binding */ switchPlayerTurn),
/* harmony export */   "highlightSunkShip": () => (/* binding */ highlightSunkShip),
/* harmony export */   "replayButton": () => (/* binding */ replayButton),
/* harmony export */   "displaySetUp": () => (/* binding */ displaySetUp)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/scripts/game.js");
/* harmony import */ var _drag_funcs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drag-funcs */ "./src/scripts/drag-funcs.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements */ "./src/scripts/elements.js");
/* harmony import */ var _dot_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../dot.png */ "./src/dot.png");
/* harmony import */ var _cross_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../cross.png */ "./src/cross.png");






function displaySetUp() {
  displayScores();
  initialBoardsDisplay();
  positionFleet();
  playButton();
  window.onresize = repaintShips;
}

function initialBoardsDisplay() {
  _elements__WEBPACK_IMPORTED_MODULE_2__.compBoard.classList.remove("faded");
  _elements__WEBPACK_IMPORTED_MODULE_2__.compName.classList.remove("faded");
  _elements__WEBPACK_IMPORTED_MODULE_2__.compArea.classList.add("faded");
  _elements__WEBPACK_IMPORTED_MODULE_2__.playerBoard.classList.remove("faded");
  _elements__WEBPACK_IMPORTED_MODULE_2__.playerName.classList.remove("faded");
  _elements__WEBPACK_IMPORTED_MODULE_2__.playerArea.classList.remove("faded");
}

function displayScores() {
  const scores = _elements__WEBPACK_IMPORTED_MODULE_2__.scoresBox.querySelector("p");
  scores.textContent = _game__WEBPACK_IMPORTED_MODULE_0__.game.user.gamesWon + " - " + _game__WEBPACK_IMPORTED_MODULE_0__.game.comp.gamesWon;
}

function positionFleet() {
  _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.style.display = "block";
  _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.innerHTML =
    "<p>Arrange your ships in preparation for a naval battle!</p></br><p>Double-click to rotate a ship.</p></br><p>The ships must not overlap.</p>";

  paintShips(_game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.fleet);
}

function showSelectedShips() {
  _game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.fleet.forEach((ship) => {
    ship.coords.forEach((coord) => {
      const cell = _elements__WEBPACK_IMPORTED_MODULE_2__.playerBoard.querySelector(`[data-xy='${coord}']`);
      cell.classList.add("selected");
    });
  });
}

function playButton() {
  _elements__WEBPACK_IMPORTED_MODULE_2__.playBtn.style.display = "block";
  _elements__WEBPACK_IMPORTED_MODULE_2__.playBtn.addEventListener("click", playBtnHandler);
}

function playBtnHandler() {
  if (!checkForRed()) {
    _game__WEBPACK_IMPORTED_MODULE_0__.game.user.updateFleet(getDisplayFleetInfo());
    prepareCompBoard();
    showSelectedShips();
    clearShips();

    window.onresize = null;

    decideFirstTurn();

    _elements__WEBPACK_IMPORTED_MODULE_2__.playBtn.style.display = "none";
  } else if (checkForRed()) {
    alert("No overlapping ships!");
  }
}

function replayButton() {
  _elements__WEBPACK_IMPORTED_MODULE_2__.replayBtn.style.display = "block";
  _elements__WEBPACK_IMPORTED_MODULE_2__.replayBtn.addEventListener("click", replayBtnHandler);
}

function replayBtnHandler() {
  clearBoards();
  (0,_game__WEBPACK_IMPORTED_MODULE_0__.resetGame)();
  displaySetUp();

  _elements__WEBPACK_IMPORTED_MODULE_2__.replayBtn.style.display = "none";
}

function decideFirstTurn() {
  if (_game__WEBPACK_IMPORTED_MODULE_0__.game.lastWinner === "computer") {
    _elements__WEBPACK_IMPORTED_MODULE_2__.playerBoard.classList.remove("faded");
    _elements__WEBPACK_IMPORTED_MODULE_2__.compArea.classList.remove("faded");
    _elements__WEBPACK_IMPORTED_MODULE_2__.compBoard.classList.add("faded");
    _elements__WEBPACK_IMPORTED_MODULE_2__.compName.classList.remove("faded");
    _elements__WEBPACK_IMPORTED_MODULE_2__.playerName.classList.add("faded");

    _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.innerHTML =
      "<p>The computer is choosing where to attack...</p>";

    _elements__WEBPACK_IMPORTED_MODULE_2__.compArea.style.pointerEvents = "none";

    (0,_game__WEBPACK_IMPORTED_MODULE_0__.compTurn)();
  } else {
    _elements__WEBPACK_IMPORTED_MODULE_2__.playerBoard.classList.toggle("faded");
    _elements__WEBPACK_IMPORTED_MODULE_2__.compArea.classList.toggle("faded");
    _elements__WEBPACK_IMPORTED_MODULE_2__.compName.classList.add("faded");

    _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.innerHTML = "<p>Pick an enemy position to attack.</p>";

    _elements__WEBPACK_IMPORTED_MODULE_2__.compBoard.style.pointerEvents = "auto";
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
  _elements__WEBPACK_IMPORTED_MODULE_2__.playerBoard.classList.toggle("faded");
  _elements__WEBPACK_IMPORTED_MODULE_2__.compBoard.classList.toggle("faded");
  _elements__WEBPACK_IMPORTED_MODULE_2__.playerName.classList.toggle("faded");
  _elements__WEBPACK_IMPORTED_MODULE_2__.compName.classList.toggle("faded");
}

function switchPlayerTurn(player) {
  if (player === "comp") {
    setTimeout(() => {
      switchAreaFade();
      _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.innerHTML =
        "<p>The computer is choosing where to attack...</p>";
      (0,_game__WEBPACK_IMPORTED_MODULE_0__.compTurn)();
    }, 1500);
  } else {
    setTimeout(() => {
      switchAreaFade();
      _elements__WEBPACK_IMPORTED_MODULE_2__.instructions.innerHTML = "<p>Pick an enemy position to attack.</p>";
      _elements__WEBPACK_IMPORTED_MODULE_2__.compBoard.style.pointerEvents = "auto";
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
  const cells = _elements__WEBPACK_IMPORTED_MODULE_2__.compBoard.querySelectorAll(".grid-cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", startUserTurn, { once: true });
  });
}

function startUserTurn(e) {
  (0,_game__WEBPACK_IMPORTED_MODULE_0__.userTurn)(e.target);
  _elements__WEBPACK_IMPORTED_MODULE_2__.compBoard.style.pointerEvents = "none";
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

  const cellWidth = _elements__WEBPACK_IMPORTED_MODULE_2__.gridCell.offsetWidth;
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

  const cells = _elements__WEBPACK_IMPORTED_MODULE_2__.playerBoard.querySelectorAll(".grid-cell")
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
    _elements__WEBPACK_IMPORTED_MODULE_2__.playerArea.appendChild(div);
    (0,_drag_funcs__WEBPACK_IMPORTED_MODULE_1__.dragElement)(div);
    (0,_drag_funcs__WEBPACK_IMPORTED_MODULE_1__.rotateShip)(div);
  });
}

function clearShips() {
  const ships = _elements__WEBPACK_IMPORTED_MODULE_2__.playerArea.querySelectorAll(".ship");
  ships.forEach((ship) => {
    ship.remove();
  });
}

function repaintShips() {
  clearShips();
  paintShips(_game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.fleet);
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
  (0,_game__WEBPACK_IMPORTED_MODULE_1__.prepareGame)();
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.displaySetUp)();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZixJQUFJLHVEQUFVO0FBQ2QsR0FBRztBQUNIOztBQUVBO0FBQ0EsZ0JBQWdCLGtFQUEyQjtBQUMzQztBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxhQUFhLDREQUF5QjtBQUN0Qzs7QUFjRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDalZGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNmeUI7QUFDWTtBQUNDO0FBQ0Y7O0FBRXBDLGdFQUF5QjtBQUN6QixFQUFFLDZEQUFzQjtBQUN4QixFQUFFLGtEQUFXO0FBQ2IsRUFBRSxpREFBWTtBQUNkLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy5jc3M/MTU1MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZHJhZy1mdW5jcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy91aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGdldENlbGxQb3NpdGlvbnMsIGdldERpc3BsYXlGbGVldEluZm8sIGdldFNoaXBDb29yZHMgfSBmcm9tIFwiLi91aVwiO1xuaW1wb3J0IHsgcGxheWVyQm9hcmQsIHBsYXllckFyZWEgfSBmcm9tIFwiLi9lbGVtZW50c1wiO1xuXG5mdW5jdGlvbiBkcmFnRWxlbWVudChlbG1udCkge1xuICBsZXQgcG9zMSA9IDAsXG4gICAgcG9zMiA9IDAsXG4gICAgcG9zMyA9IDAsXG4gICAgcG9zNCA9IDA7XG5cbiAgZWxtbnQub25tb3VzZWRvd24gPSBkcmFnTW91c2VEb3duO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2V0Qm9yZGVyKCk7XG5cbiAgZnVuY3Rpb24gZHJhZ01vdXNlRG93bihlKSB7XG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBwb3MzID0gZS5jbGllbnRYO1xuICAgIHBvczQgPSBlLmNsaWVudFk7XG4gICAgZG9jdW1lbnQub25tb3VzZXVwID0gKCkgPT4ge1xuICAgICAgY2xvc2VEcmFnRWxlbWVudChlbG1udCk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IGVsZW1lbnREcmFnO1xuICB9XG5cbiAgZnVuY3Rpb24gZWxlbWVudERyYWcoZSkge1xuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcG9zMSA9IHBvczMgLSBlLmNsaWVudFg7XG4gICAgcG9zMiA9IHBvczQgLSBlLmNsaWVudFk7XG5cbiAgICBwb3MzID0gZS5jbGllbnRYO1xuICAgIHBvczQgPSBlLmNsaWVudFk7XG5cbiAgICBrZWVwSW5Cb3VuZHMoZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0Rvd25EcmFnKGUpIHtcbiAgICBpZiAoZS5jbGllbnRZID4gcG9zNCkge1xuICAgICAgcmV0dXJuIGUuY2xpZW50WSAtIHBvczQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1JpZ2h0RHJhZyhlKSB7XG4gICAgaWYgKGUuY2xpZW50WCA+IHBvczMpIHtcbiAgICAgIHJldHVybiBlLmNsaWVudFggLSBwb3MzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tMZWZ0RHJhZyhlKSB7XG4gICAgaWYgKGUuY2xpZW50WCA8IHBvczMpIHtcbiAgICAgIHJldHVybiBwb3MzIC0gZS5jbGllbnRYO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tVcERyYWcoZSkge1xuICAgIGlmIChlLmNsaWVudFkgPCBwb3M0KSB7XG4gICAgICByZXR1cm4gcG9zNCAtIGUuY2xpZW50WTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGtlZXBJbkJvdW5kcyhlKSB7XG4gICAgaWYgKCFjaGVja1Bvc2l0aW9uKGVsbW50KSkge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID0gZWxtbnQub2Zmc2V0VG9wIC0gcG9zMiArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmxlZnQgPSBlbG1udC5vZmZzZXRMZWZ0IC0gcG9zMSArIFwicHhcIjtcbiAgICB9IGVsc2UgaWYgKGNoZWNrUG9zaXRpb24oZWxtbnQpID09PSBcInRvcFwiKSB7XG4gICAgICBlbG1udC5zdHlsZS50b3AgPSBib2FyZC50b3AgKyBjaGVja0Rvd25EcmFnKGUpICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IGVsbW50Lm9mZnNldExlZnQgLSBwb3MxICsgXCJweFwiO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tQb3NpdGlvbihlbG1udCkgPT09IFwibGVmdFwiKSB7XG4gICAgICBlbG1udC5zdHlsZS50b3AgPSBlbG1udC5vZmZzZXRUb3AgLSBwb3MyICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IGJvYXJkLmxlZnQgKyBjaGVja1JpZ2h0RHJhZyhlKSArIFwicHhcIjtcbiAgICB9IGVsc2UgaWYgKGNoZWNrUG9zaXRpb24oZWxtbnQpID09PSBcInJpZ2h0XCIpIHtcbiAgICAgIGVsbW50LnN0eWxlLnRvcCA9IGVsbW50Lm9mZnNldFRvcCAtIHBvczIgKyBcInB4XCI7XG4gICAgICBlbG1udC5zdHlsZS5sZWZ0ID1cbiAgICAgICAgYm9hcmQucmlnaHQgLSBlbG1udC5vZmZzZXRXaWR0aCAtIGNoZWNrTGVmdERyYWcoZSkgKyBcInB4XCI7XG4gICAgfSBlbHNlIGlmIChjaGVja1Bvc2l0aW9uKGVsbW50KSA9PT0gXCJib3R0b21cIikge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID1cbiAgICAgICAgYm9hcmQuYm90dG9tIC0gZWxtbnQub2Zmc2V0SGVpZ2h0IC0gY2hlY2tVcERyYWcoZSkgKyBcInB4XCI7XG4gICAgICBlbG1udC5zdHlsZS5sZWZ0ID0gZWxtbnQub2Zmc2V0TGVmdCAtIHBvczEgKyBcInB4XCI7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tQb3NpdGlvbihlbG1udCkge1xuICAgIGNvbnN0IGVsbW50VG9wID0gZWxtbnQub2Zmc2V0VG9wO1xuICAgIGNvbnN0IGVsbW50TGVmdCA9IGVsbW50Lm9mZnNldExlZnQ7XG4gICAgY29uc3QgZWxtbnRSaWdodCA9IGVsbW50TGVmdCArIGVsbW50Lm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IGVsbW50Qm90dG9tID0gZWxtbnRUb3AgKyBlbG1udC5vZmZzZXRIZWlnaHQ7XG5cbiAgICBpZiAoZWxtbnRUb3AgPCBib2FyZC50b3ApIHtcbiAgICAgIHJldHVybiBcInRvcFwiO1xuICAgIH0gZWxzZSBpZiAoZWxtbnRMZWZ0IDwgYm9hcmQubGVmdCkge1xuICAgICAgcmV0dXJuIFwibGVmdFwiO1xuICAgIH0gZWxzZSBpZiAoZWxtbnRSaWdodCA+IGJvYXJkLnJpZ2h0KSB7XG4gICAgICByZXR1cm4gXCJyaWdodFwiO1xuICAgIH0gZWxzZSBpZiAoZWxtbnRCb3R0b20gPiBib2FyZC5ib3R0b20pIHtcbiAgICAgIHJldHVybiBcImJvdHRvbVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VEcmFnRWxlbWVudChlbG1udCkge1xuICAgIGdyaWRTbmFwKGVsbW50KTtcbiAgICBkb2N1bWVudC5vbm1vdXNldXAgPSBudWxsO1xuICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBncmlkU25hcChlbG1udCkge1xuICBjb25zdCBjZWxsUG9zaXRpb25zID0gZ2V0Q2VsbFBvc2l0aW9ucygpO1xuXG4gIGNvbnN0IGVsbW50VG9wID0gZWxtbnQub2Zmc2V0VG9wO1xuICBjb25zdCBlbG1udExlZnQgPSBlbG1udC5vZmZzZXRMZWZ0O1xuXG4gIGNvbnN0IGRpdldpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLWNlbGxcIikub2Zmc2V0V2lkdGg7XG5cbiAgZm9yIChjb25zdCBwcm9wIGluIGNlbGxQb3NpdGlvbnMpIHtcbiAgICBjb25zdCB4TG93ZXIgPSBjZWxsUG9zaXRpb25zW3Byb3BdLmxlZnQgLSBkaXZXaWR0aCAvIDI7XG4gICAgY29uc3QgeUxvd2VyID0gY2VsbFBvc2l0aW9uc1twcm9wXS50b3AgLSBkaXZXaWR0aCAvIDI7XG4gICAgY29uc3QgeFVwcGVyID0gY2VsbFBvc2l0aW9uc1twcm9wXS5sZWZ0ICsgZGl2V2lkdGggLyAyO1xuICAgIGNvbnN0IHlVcHBlciA9IGNlbGxQb3NpdGlvbnNbcHJvcF0udG9wICsgZGl2V2lkdGggLyAyO1xuXG4gICAgaWYgKFxuICAgICAgZWxtbnRMZWZ0ID49IHhMb3dlciAmJlxuICAgICAgZWxtbnRUb3AgPj0geUxvd2VyICYmXG4gICAgICBlbG1udExlZnQgPD0geFVwcGVyICYmXG4gICAgICBlbG1udFRvcCA8PSB5VXBwZXJcbiAgICApIHtcbiAgICAgIGVsbW50LnN0eWxlLnRvcCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0udG9wICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0ubGVmdCArIFwicHhcIjtcblxuICAgICAgZWxtbnQuZGF0YXNldC54ID0gY2VsbFBvc2l0aW9uc1twcm9wXS5jb29yZHNbMF07XG4gICAgICBlbG1udC5kYXRhc2V0LnkgPSBjZWxsUG9zaXRpb25zW3Byb3BdLmNvb3Jkc1sxXTtcblxuICAgICAgZWxtbnQuZGF0YXNldC5jb29yZHMgPSBKU09OLnN0cmluZ2lmeShnZXRTaGlwQ29vcmRzKGVsbW50KSk7XG4gICAgICBjaGVja1Byb3hpbWl0eShlbG1udCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZVNoaXAoZWxtbnQpIHtcbiAgZWxtbnQub25kYmxjbGljayA9IHJvdGF0ZTtcblxuICBmdW5jdGlvbiByb3RhdGUoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBnZXRCb3JkZXIoKTtcblxuICAgIGNvbnN0IGVsbW50TGVmdCA9IGVsbW50Lm9mZnNldExlZnQ7XG4gICAgY29uc3QgZWxtbnRUb3AgPSBlbG1udC5vZmZzZXRUb3A7XG4gICAgY29uc3QgZWxtbnRIZWlnaHQgPSBlbG1udC5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgZWxtbnRXaWR0aCA9IGVsbW50Lm9mZnNldFdpZHRoO1xuXG4gICAgY29uc3QgZnV0dXJlUmlnaHQgPSBlbG1udExlZnQgKyBlbG1udEhlaWdodDtcbiAgICBjb25zdCBmdXR1cmVCb3R0b20gPSBlbG1udFRvcCArIGVsbW50V2lkdGg7XG5cbiAgICBpZiAoIShmdXR1cmVSaWdodCAtIDUgPiBib2FyZC5yaWdodCB8fCBmdXR1cmVCb3R0b20gLSA1ID4gYm9hcmQuYm90dG9tKSkge1xuICAgICAgZWxtbnQuc3R5bGUud2lkdGggPSBlbG1udEhlaWdodCArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmhlaWdodCA9IGVsbW50V2lkdGggKyBcInB4XCI7XG4gICAgICBlbG1udC5kYXRhc2V0LmNvb3JkcyA9IEpTT04uc3RyaW5naWZ5KGdldFNoaXBDb29yZHMoZWxtbnQpKTtcbiAgICAgIGNoZWNrUHJveGltaXR5KGVsbW50KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tQcm94aW1pdHkoZWxtbnQpIHtcbiAgY29uc3QgZmxlZXQgPSBnZXREaXNwbGF5RmxlZXRJbmZvKCk7XG4gIGxldCBvdmVybGFwO1xuXG4gIGZvciAoY29uc3QgcHJvcCBpbiBmbGVldCkge1xuICAgIGlmIChmbGVldFtwcm9wXS5pZCAhPT0gZWxtbnQuZGF0YXNldC5pZCkge1xuICAgICAgSlNPTi5wYXJzZShlbG1udC5kYXRhc2V0LmNvb3JkcykuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgaWYgKGZsZWV0W3Byb3BdLmNvb3Jkcy5zb21lKChpdGVtKSA9PiBpdGVtID09IGNvb3JkKSkge1xuICAgICAgICAgIG92ZXJsYXAgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpZiAob3ZlcmxhcCkge1xuICAgIGVsbW50LmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkLXBvc1wiKTtcbiAgfSBlbHNlIHtcbiAgICBlbG1udC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1wb3NcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Qm9yZGVyKCkge1xuICByZXR1cm4ge1xuICAgIHRvcDogcGxheWVyQXJlYS5vZmZzZXRUb3AsXG4gICAgbGVmdDogcGxheWVyQXJlYS5vZmZzZXRMZWZ0LFxuICAgIHJpZ2h0OiBwbGF5ZXJBcmVhLm9mZnNldExlZnQgKyBwbGF5ZXJCb2FyZC5vZmZzZXRXaWR0aCxcbiAgICBib3R0b206IHBsYXllckFyZWEub2Zmc2V0VG9wICsgcGxheWVyQm9hcmQub2Zmc2V0SGVpZ2h0LFxuICB9O1xufVxuXG5leHBvcnQgeyBkcmFnRWxlbWVudCwgcm90YXRlU2hpcCB9O1xuIiwiY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpO1xuY29uc3QgcGxheWVyQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpO1xuY29uc3QgY29tcEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtYm9hcmRcIik7XG5jb25zdCBwbGF5ZXJCb2FyZCA9IHBsYXllckFyZWEucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIik7XG5jb25zdCBjb21wQm9hcmQgPSBjb21wQXJlYS5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZFwiKTtcbmNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS1pbnB1dFwiKTtcbmNvbnN0IG5hbWVTdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtc3VibWl0XCIpO1xuY29uc3QgbmFtZUlucHV0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYW1lLWlucHV0LWNvbnRhaW5lclwiKTtcbmNvbnN0IHBsYXllck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lXCIpO1xuY29uc3QgY29tcE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtbmFtZVwiKTtcbmNvbnN0IHNjb3Jlc0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVzLWJveFwiKTtcbmNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLWNlbGxcIik7XG5jb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKTtcbmNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXlcIik7XG5jb25zdCByZXBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlcGxheVwiKTtcblxuZXhwb3J0IHtcbiAgc3RhcnRCdG4sXG4gIHBsYXllckJvYXJkLFxuICBjb21wQm9hcmQsXG4gIHBsYXllckFyZWEsXG4gIGNvbXBBcmVhLFxuICBuYW1lSW5wdXQsXG4gIG5hbWVTdWJtaXRCdG4sXG4gIG5hbWVJbnB1dERpdixcbiAgcGxheWVyTmFtZSxcbiAgY29tcE5hbWUsXG4gIHNjb3Jlc0JveCxcbiAgZ3JpZENlbGwsXG4gIGluc3RydWN0aW9ucyxcbiAgcGxheUJ0bixcbiAgcmVwbGF5QnRuLFxufTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHtcbiAgc2hvd01pc3NlZENlbGwsXG4gIHNob3dTdHJ1Y2tDZWxsLFxuICBzd2l0Y2hQbGF5ZXJUdXJuLFxuICBoaWdobGlnaHRTdW5rU2hpcCxcbiAgcmVwbGF5QnV0dG9uLFxufSBmcm9tIFwiLi91aVwiO1xuaW1wb3J0IHsgaW5zdHJ1Y3Rpb25zLCBwbGF5ZXJCb2FyZCwgY29tcEJvYXJkIH0gZnJvbSBcIi4vZWxlbWVudHNcIjtcblxuY29uc3QgZ2FtZSA9IHtcbiAgdXNlcjogbnVsbCxcbiAgY29tcDogbnVsbCxcbiAgbGFzdFdpbm5lcjogbnVsbCxcbn07XG5cbmZ1bmN0aW9uIHByZXBhcmVHYW1lKCkge1xuICBnYW1lLnVzZXIgPSBQbGF5ZXIoXCJodW1hblwiKTtcbiAgZ2FtZS5jb21wID0gUGxheWVyKFwiY29tcHV0ZXJcIik7XG4gIGdhbWUudXNlci5nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgZ2FtZS5jb21wLmdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICBnYW1lLnVzZXIuY3JlYXRlRmxlZXQoKTtcbiAgZ2FtZS5jb21wLmNyZWF0ZUZsZWV0KCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0R2FtZSgpIHtcbiAgZ2FtZS51c2VyLmdhbWVib2FyZC5uZXdSb3VuZCgpO1xuICBnYW1lLmNvbXAuZ2FtZWJvYXJkLm5ld1JvdW5kKCk7XG4gIGdhbWUudXNlci5jcmVhdGVGbGVldCgpO1xuICBnYW1lLmNvbXAuY3JlYXRlRmxlZXQoKTtcbn1cblxuZnVuY3Rpb24gdXNlclR1cm4oY2VsbCkge1xuICBjb25zdCBjb29yZHMgPSBjZWxsLmRhdGFzZXQueHk7XG4gIGNvbnN0IHNoaXAgPSBnYW1lLmNvbXAuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcblxuICBpZiAoc2hpcCkge1xuICAgIHNob3dTdHJ1Y2tDZWxsKGNlbGwpO1xuXG4gICAgaWYgKHNoaXAuc3RhdHVzID09PSBcInN1bmtcIikge1xuICAgICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IGA8cD5Zb3Ugc2FuayB0aGVpciAke3NoaXAubmFtZX0hITwvcD5gO1xuICAgICAgaGlnaGxpZ2h0U3Vua1NoaXAoc2hpcCwgY29tcEJvYXJkKTtcblxuICAgICAgaWYgKGdhbWUuY29tcC5nYW1lYm9hcmQuY2hlY2tGbGVldFN0YXR1cygpKSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBgPHA+WW91J3ZlIHdvbiEhITwvcD5gO1xuICAgICAgICBnYW1lLnVzZXIuZ2FtZXNXb24gKz0gMTtcbiAgICAgICAgZ2FtZS5sYXN0V2lubmVyID0gZ2FtZS51c2VyLm5hbWU7XG4gICAgICAgIHJldHVybiByZXBsYXlCdXR0b24oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IFwiPHA+WW91IGhpdCBvbmUgb2YgdGhlaXIgc2hpcHMuPC9wPlwiO1xuICAgIH1cblxuICAgIHN3aXRjaFBsYXllclR1cm4oXCJjb21wXCIpO1xuICB9IGVsc2Uge1xuICAgIHNob3dNaXNzZWRDZWxsKGNlbGwpO1xuICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBcIjxwPllvdXIgYXR0YWNrIG1pc3NlZC48L3A+XCI7XG5cbiAgICBzd2l0Y2hQbGF5ZXJUdXJuKFwiY29tcFwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb21wVHVybigpIHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gZ2FtZS5jb21wLmNvbXBBdHRhY2soKTtcbiAgICBjb25zdCBzaGlwID0gZ2FtZS51c2VyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XG4gICAgY29uc3QgY2VsbCA9IHBsYXllckJvYXJkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXh5PScke2Nvb3Jkc30nXWApO1xuXG4gICAgaWYgKHNoaXApIHtcbiAgICAgIHNob3dTdHJ1Y2tDZWxsKGNlbGwpO1xuXG4gICAgICBpZiAoc2hpcC5zdGF0dXMgPT09IFwic3Vua1wiKSB7XG4gICAgICAgIGhpZ2hsaWdodFN1bmtTaGlwKHNoaXAsIHBsYXllckJvYXJkKTtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IGA8cD5UaGUgY29tcHV0ZXIgc2FuayB5b3VyICR7c2hpcC5uYW1lfSEhPC9wPmA7XG5cbiAgICAgICAgaWYgKGdhbWUudXNlci5nYW1lYm9hcmQuY2hlY2tGbGVldFN0YXR1cygpKSB7XG4gICAgICAgICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IGA8cD5PaCBubywgeW91IGxvc3QhPC9wPmA7XG4gICAgICAgICAgZ2FtZS5jb21wLmdhbWVzV29uICs9IDE7XG4gICAgICAgICAgZ2FtZS5sYXN0V2lubmVyID0gZ2FtZS5jb21wLm5hbWU7XG4gICAgICAgICAgcmV0dXJuIHJlcGxheUJ1dHRvbigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID0gXCI8cD5UaGUgY29tcHV0ZXIgaGl0IG9uZSBvZiB5b3VyIHNoaXBzLjwvcD5cIjtcbiAgICAgIH1cblxuICAgICAgc3dpdGNoUGxheWVyVHVybihcInBsYXllclwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvd01pc3NlZENlbGwoY2VsbCk7XG4gICAgICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID0gXCI8cD5UaGUgY29tcHV0ZXIncyBhdHRhY2sgbWlzc2VkLjwvcD5cIjtcblxuICAgICAgc3dpdGNoUGxheWVyVHVybihcInBsYXllclwiKTtcbiAgICB9XG4gIH0sIDE1MDApO1xufVxuXG5leHBvcnQgeyBnYW1lLCBwcmVwYXJlR2FtZSwgcmVzZXRHYW1lLCB1c2VyVHVybiwgY29tcFR1cm4gfTtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuICByZXR1cm4ge1xuICAgIGZsZWV0OiBbXSxcbiAgICBtaXNzZWRTaG90czogW10sXG4gICAgZmxlZXRTdGF0dXM6IFtdLFxuXG4gICAgZGVtbzogbnVsbCxcblxuICAgIHBsYWNlU2hpcChuYW1lLCBjb29yZHMpIHtcbiAgICAgIGNvbnN0IG5ld1NoaXAgPSBTaGlwKG5hbWUsIGNvb3Jkcyk7XG5cbiAgICAgIHRoaXMuZmxlZXQucHVzaChuZXdTaGlwKTtcbiAgICAgIHRoaXMuZmxlZXRbdGhpcy5mbGVldC5sZW5ndGggLSAxXS5pZCA9IHRoaXMuZmxlZXQubGVuZ3RoIC0gMTtcbiAgICB9LFxuXG4gICAgcmVjZWl2ZUF0dGFjayhwb3MpIHtcbiAgICAgIGxldCBoaXQgPSBmYWxzZTtcbiAgICAgIGxldCBzaGlwO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLmZsZWV0Lmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5mbGVldFtpXS5jb29yZHMuaW5jbHVkZXMocG9zKSkge1xuICAgICAgICAgIHRoaXMuZmxlZXRbaV0uaGl0KHBvcyk7XG4gICAgICAgICAgaGl0ID0gdHJ1ZTtcbiAgICAgICAgICBzaGlwID0gdGhpcy5mbGVldFtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaGl0KSB7XG4gICAgICAgIHJldHVybiBzaGlwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5taXNzZWRTaG90cy5wdXNoKHBvcyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrRmxlZXRTdGF0dXMoKSB7XG4gICAgICB0aGlzLmZsZWV0U3RhdHVzID0gW107XG5cbiAgICAgIHRoaXMuZmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBpZiAoc2hpcC5zdGF0dXMgPT09IFwic3Vua1wiKSB7XG4gICAgICAgICAgdGhpcy5mbGVldFN0YXR1cy5wdXNoKFwic3Vua1wiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLmZsZWV0U3RhdHVzLmxlbmd0aCA9PT0gdGhpcy5mbGVldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSxcblxuICAgIG5ld1JvdW5kKCkge1xuICAgICAgdGhpcy5mbGVldCA9IFtdO1xuICAgICAgdGhpcy5taXNzZWRTaG90cyA9IFtdO1xuICAgICAgdGhpcy5mbGVldFN0YXR1cyA9IFtdO1xuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCB7IGdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5cbmZ1bmN0aW9uIFBsYXllcihuYW1lKSB7XG4gIGNvbnN0IHByb3RvID0ge1xuICAgIGRlbW86IFtdLFxuXG4gICAgY29tcEF0dGFjaygpIHtcbiAgICAgIGxldCBjb29yZCA9IHRoaXMuZ2V0UmFuZG9tQ29vcmQoMTApO1xuXG4gICAgICBpZiAodGhpcy5jaGVja1ByZXZpb3VzTW92ZXMoY29vcmQpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBBdHRhY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0UmFuZG9tQ29vcmQoZmFjdG9yKSB7XG4gICAgICBjb25zdCB4ID0gdGhpcy5nZXRSYW5kb21JbnQoZmFjdG9yKS50b1N0cmluZygpO1xuICAgICAgY29uc3QgeSA9IHRoaXMuZ2V0UmFuZG9tSW50KGZhY3RvcikudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IGNvb3JkID0geCArIHk7XG4gICAgICByZXR1cm4gY29vcmQ7XG4gICAgfSxcblxuICAgIGdldFN0YXJ0Q29vcmQobGVuZ3RoLCBheGlzKSB7XG4gICAgICBjb25zdCBjb29yZCA9IHRoaXMuZ2V0UmFuZG9tQ29vcmQoMTApO1xuXG4gICAgICBpZiAoY29vcmRbYXhpc10gPiAxMCAtIGxlbmd0aCB8fCB0aGlzLmNoZWNrRm9yRHVwbGljYXRlKGNvb3JkKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydENvb3JkKGxlbmd0aCwgYXhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrRm9yRHVwbGljYXRlKGNvb3JkKSB7XG4gICAgICByZXR1cm4gdGhpcy5nYW1lYm9hcmQuZmxlZXQuc29tZSgoc2hpcCkgPT4ge1xuICAgICAgICByZXR1cm4gc2hpcC5jb29yZHMuc29tZSgoaXRlbSkgPT4gaXRlbSA9PSBjb29yZCk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgY3JlYXRlRmxlZXQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgIGdlbmVyYXRlU2hpcENvb3JkcyhcImNhcnJpZXJcIiwgNSk7XG4gICAgICBnZW5lcmF0ZVNoaXBDb29yZHMoXCJiYXR0bGVzaGlwXCIsIDQpO1xuICAgICAgZ2VuZXJhdGVTaGlwQ29vcmRzKFwiY3J1aXNlclwiLCAzKTtcbiAgICAgIGdlbmVyYXRlU2hpcENvb3JkcyhcInN1Ym1hcmluZVwiLCAzKTtcbiAgICAgIGdlbmVyYXRlU2hpcENvb3JkcyhcImRlc3Ryb3llclwiLCAyKTtcblxuICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVTaGlwQ29vcmRzKG5hbWUsIGxlbmd0aCkge1xuICAgICAgICBjb25zdCBheGlzID0gc2VsZi5nZXRSYW5kb21JbnQoMik7XG5cbiAgICAgICAgbGV0IGNvb3JkID0gc2VsZi5nZXRTdGFydENvb3JkKGxlbmd0aCwgYXhpcyk7XG5cbiAgICAgICAgY29vcmQgPSBbY29vcmRdO1xuXG4gICAgICAgIGxldCBhZGRBeGlzID0gMDtcbiAgICAgICAgbGV0IHNhbWVBeGlzID0gMDtcblxuICAgICAgICBheGlzID09IDAgPyAoc2FtZUF4aXMgPSAxKSA6IChhZGRBeGlzID0gMSk7XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgICBsZXQgbmV3Q29vcmQ7XG5cbiAgICAgICAgICBsZXQgbnVtID0gTnVtYmVyKGNvb3JkW2Nvb3JkLmxlbmd0aCAtIDFdW2FkZEF4aXNdKTtcblxuICAgICAgICAgIGF4aXMgPT0gMFxuICAgICAgICAgICAgPyAobmV3Q29vcmQgPSAobnVtICs9IDEpICsgY29vcmRbY29vcmQubGVuZ3RoIC0gMV1bc2FtZUF4aXNdKVxuICAgICAgICAgICAgOiAobmV3Q29vcmQgPSBjb29yZFtjb29yZC5sZW5ndGggLSAxXVtzYW1lQXhpc10gKyAobnVtICs9IDEpKTtcblxuICAgICAgICAgIGlmIChzZWxmLmNoZWNrRm9yRHVwbGljYXRlKG5ld0Nvb3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlU2hpcENvb3JkcyhuYW1lLCBsZW5ndGgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb29yZC5wdXNoKG5ld0Nvb3JkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5nYW1lYm9hcmQucGxhY2VTaGlwKG5hbWUsIGNvb3JkKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlRmxlZXQoZmxlZXRPYmopIHtcbiAgICAgIHRoaXMuZ2FtZWJvYXJkLmZsZWV0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IHByb3AgaW4gZmxlZXRPYmopIHtcbiAgICAgICAgbGV0IG5hbWUgPSBmbGVldE9ialtwcm9wXS5uYW1lO1xuICAgICAgICBsZXQgY29vcmRzID0gZmxlZXRPYmpbcHJvcF0uY29vcmRzO1xuICAgICAgICB0aGlzLmdhbWVib2FyZC5wbGFjZVNoaXAobmFtZSwgY29vcmRzKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hlY2tQcmV2aW91c01vdmVzKGNvb3JkKSB7XG4gICAgICBjb25zdCBoaXRzID0gW107XG4gICAgICBjb25zdCBtaXNzZWQgPSBnYW1lLnVzZXIuZ2FtZWJvYXJkLm1pc3NlZFNob3RzO1xuXG4gICAgICBnYW1lLnVzZXIuZ2FtZWJvYXJkLmZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5oaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgICAgIGhpdHMucHVzaChoaXQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBtaXNzZWQuZm9yRWFjaCgobWlzcykgPT4ge1xuICAgICAgICBoaXRzLnB1c2gobWlzcyk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGhpdHMuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRSYW5kb21JbnQoZmFjdG9yKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmFjdG9yKTtcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuXG4gIG9iai5uYW1lID0gbmFtZTtcbiAgb2JqLmdhbWVzV29uID0gMDtcbiAgb2JqLmdhbWVib2FyZCA9IG51bGw7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiZnVuY3Rpb24gU2hpcChuYW1lLCBjb29yZHMpIHtcbiAgY29uc3QgcHJvdG8gPSB7XG4gICAgaGl0KG51bWJlcikge1xuICAgICAgaWYgKHRoaXMuY29vcmRzLmluY2x1ZGVzKG51bWJlcikgJiYgIXRoaXMuaGl0cy5pbmNsdWRlcyhudW1iZXIpKSB7XG4gICAgICAgIHRoaXMuaGl0cy5wdXNoKG51bWJlcik7XG4gICAgICAgIHRoaXMuaXNTdW5rKCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzU3VuaygpIHtcbiAgICAgIGNvbnN0IHN1bmsgPSB0aGlzLmhpdHMuZXZlcnkoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29vcmRzLmluY2x1ZGVzKGl0ZW0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChzdW5rID09PSB0cnVlICYmIHRoaXMuaGl0cy5sZW5ndGggPT09IHRoaXMuY29vcmRzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IFwic3Vua1wiO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XG5cbiAgb2JqLm5hbWUgPSBuYW1lO1xuICBvYmouY29vcmRzID0gY29vcmRzO1xuICBvYmoubGVuZ3RoID0gY29vcmRzLmxlbmd0aDtcbiAgb2JqLmhpdHMgPSBbXTtcbiAgb2JqLnN0YXR1cyA9IFwidW5zdW5rXCI7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsImltcG9ydCB7IGdhbWUsIHJlc2V0R2FtZSwgdXNlclR1cm4sIGNvbXBUdXJuIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgZHJhZ0VsZW1lbnQsIHJvdGF0ZVNoaXAgfSBmcm9tIFwiLi9kcmFnLWZ1bmNzXCI7XG5pbXBvcnQge1xuICBwbGF5ZXJCb2FyZCxcbiAgY29tcEJvYXJkLFxuICBwbGF5ZXJBcmVhLFxuICBjb21wQXJlYSxcbiAgcGxheWVyTmFtZSxcbiAgY29tcE5hbWUsXG4gIHNjb3Jlc0JveCxcbiAgZ3JpZENlbGwsXG4gIGluc3RydWN0aW9ucyxcbiAgcGxheUJ0bixcbiAgcmVwbGF5QnRuLFxufSBmcm9tIFwiLi9lbGVtZW50c1wiO1xuaW1wb3J0IGRvdCBmcm9tIFwiLi8uLi9kb3QucG5nXCI7XG5pbXBvcnQgY3Jvc3MgZnJvbSBcIi4vLi4vY3Jvc3MucG5nXCI7XG5cbmZ1bmN0aW9uIGRpc3BsYXlTZXRVcCgpIHtcbiAgZGlzcGxheVNjb3JlcygpO1xuICBpbml0aWFsQm9hcmRzRGlzcGxheSgpO1xuICBwb3NpdGlvbkZsZWV0KCk7XG4gIHBsYXlCdXR0b24oKTtcbiAgd2luZG93Lm9ucmVzaXplID0gcmVwYWludFNoaXBzO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsQm9hcmRzRGlzcGxheSgpIHtcbiAgY29tcEJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlZFwiKTtcbiAgY29tcE5hbWUuY2xhc3NMaXN0LnJlbW92ZShcImZhZGVkXCIpO1xuICBjb21wQXJlYS5jbGFzc0xpc3QuYWRkKFwiZmFkZWRcIik7XG4gIHBsYXllckJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlZFwiKTtcbiAgcGxheWVyTmFtZS5jbGFzc0xpc3QucmVtb3ZlKFwiZmFkZWRcIik7XG4gIHBsYXllckFyZWEuY2xhc3NMaXN0LnJlbW92ZShcImZhZGVkXCIpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2NvcmVzKCkge1xuICBjb25zdCBzY29yZXMgPSBzY29yZXNCb3gucXVlcnlTZWxlY3RvcihcInBcIik7XG4gIHNjb3Jlcy50ZXh0Q29udGVudCA9IGdhbWUudXNlci5nYW1lc1dvbiArIFwiIC0gXCIgKyBnYW1lLmNvbXAuZ2FtZXNXb247XG59XG5cbmZ1bmN0aW9uIHBvc2l0aW9uRmxlZXQoKSB7XG4gIGluc3RydWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID1cbiAgICBcIjxwPkFycmFuZ2UgeW91ciBzaGlwcyBpbiBwcmVwYXJhdGlvbiBmb3IgYSBuYXZhbCBiYXR0bGUhPC9wPjwvYnI+PHA+RG91YmxlLWNsaWNrIHRvIHJvdGF0ZSBhIHNoaXAuPC9wPjwvYnI+PHA+VGhlIHNoaXBzIG11c3Qgbm90IG92ZXJsYXAuPC9wPlwiO1xuXG4gIHBhaW50U2hpcHMoZ2FtZS51c2VyLmdhbWVib2FyZC5mbGVldCk7XG59XG5cbmZ1bmN0aW9uIHNob3dTZWxlY3RlZFNoaXBzKCkge1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLmZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmNvb3Jkcy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IHBsYXllckJvYXJkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXh5PScke2Nvb3JkfSddYCk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBsYXlCdXR0b24oKSB7XG4gIHBsYXlCdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheUJ0bkhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBwbGF5QnRuSGFuZGxlcigpIHtcbiAgaWYgKCFjaGVja0ZvclJlZCgpKSB7XG4gICAgZ2FtZS51c2VyLnVwZGF0ZUZsZWV0KGdldERpc3BsYXlGbGVldEluZm8oKSk7XG4gICAgcHJlcGFyZUNvbXBCb2FyZCgpO1xuICAgIHNob3dTZWxlY3RlZFNoaXBzKCk7XG4gICAgY2xlYXJTaGlwcygpO1xuXG4gICAgd2luZG93Lm9ucmVzaXplID0gbnVsbDtcblxuICAgIGRlY2lkZUZpcnN0VHVybigpO1xuXG4gICAgcGxheUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH0gZWxzZSBpZiAoY2hlY2tGb3JSZWQoKSkge1xuICAgIGFsZXJ0KFwiTm8gb3ZlcmxhcHBpbmcgc2hpcHMhXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxheUJ1dHRvbigpIHtcbiAgcmVwbGF5QnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJlcGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVwbGF5QnRuSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIHJlcGxheUJ0bkhhbmRsZXIoKSB7XG4gIGNsZWFyQm9hcmRzKCk7XG4gIHJlc2V0R2FtZSgpO1xuICBkaXNwbGF5U2V0VXAoKTtcblxuICByZXBsYXlCdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufVxuXG5mdW5jdGlvbiBkZWNpZGVGaXJzdFR1cm4oKSB7XG4gIGlmIChnYW1lLmxhc3RXaW5uZXIgPT09IFwiY29tcHV0ZXJcIikge1xuICAgIHBsYXllckJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlZFwiKTtcbiAgICBjb21wQXJlYS5jbGFzc0xpc3QucmVtb3ZlKFwiZmFkZWRcIik7XG4gICAgY29tcEJvYXJkLmNsYXNzTGlzdC5hZGQoXCJmYWRlZFwiKTtcbiAgICBjb21wTmFtZS5jbGFzc0xpc3QucmVtb3ZlKFwiZmFkZWRcIik7XG4gICAgcGxheWVyTmFtZS5jbGFzc0xpc3QuYWRkKFwiZmFkZWRcIik7XG5cbiAgICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID1cbiAgICAgIFwiPHA+VGhlIGNvbXB1dGVyIGlzIGNob29zaW5nIHdoZXJlIHRvIGF0dGFjay4uLjwvcD5cIjtcblxuICAgIGNvbXBBcmVhLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcblxuICAgIGNvbXBUdXJuKCk7XG4gIH0gZWxzZSB7XG4gICAgcGxheWVyQm9hcmQuY2xhc3NMaXN0LnRvZ2dsZShcImZhZGVkXCIpO1xuICAgIGNvbXBBcmVhLmNsYXNzTGlzdC50b2dnbGUoXCJmYWRlZFwiKTtcbiAgICBjb21wTmFtZS5jbGFzc0xpc3QuYWRkKFwiZmFkZWRcIik7XG5cbiAgICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID0gXCI8cD5QaWNrIGFuIGVuZW15IHBvc2l0aW9uIHRvIGF0dGFjay48L3A+XCI7XG5cbiAgICBjb21wQm9hcmQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyQm9hcmRzKCkge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpO1xuXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBpZiAoY2VsbC5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpKSB7XG4gICAgICBjZWxsLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIikucmVtb3ZlKCk7XG4gICAgfVxuICAgIGlmIChjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInN1bmtcIikpIHtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcInN1bmtcIik7XG4gICAgfVxuICAgIGlmIChjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNlbGVjdGVkXCIpKSB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzd2l0Y2hBcmVhRmFkZSgpIHtcbiAgcGxheWVyQm9hcmQuY2xhc3NMaXN0LnRvZ2dsZShcImZhZGVkXCIpO1xuICBjb21wQm9hcmQuY2xhc3NMaXN0LnRvZ2dsZShcImZhZGVkXCIpO1xuICBwbGF5ZXJOYW1lLmNsYXNzTGlzdC50b2dnbGUoXCJmYWRlZFwiKTtcbiAgY29tcE5hbWUuY2xhc3NMaXN0LnRvZ2dsZShcImZhZGVkXCIpO1xufVxuXG5mdW5jdGlvbiBzd2l0Y2hQbGF5ZXJUdXJuKHBsYXllcikge1xuICBpZiAocGxheWVyID09PSBcImNvbXBcIikge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc3dpdGNoQXJlYUZhZGUoKTtcbiAgICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPVxuICAgICAgICBcIjxwPlRoZSBjb21wdXRlciBpcyBjaG9vc2luZyB3aGVyZSB0byBhdHRhY2suLi48L3A+XCI7XG4gICAgICBjb21wVHVybigpO1xuICAgIH0sIDE1MDApO1xuICB9IGVsc2Uge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc3dpdGNoQXJlYUZhZGUoKTtcbiAgICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBcIjxwPlBpY2sgYW4gZW5lbXkgcG9zaXRpb24gdG8gYXR0YWNrLjwvcD5cIjtcbiAgICAgIGNvbXBCb2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG4gICAgfSwgMTUwMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd01pc3NlZENlbGwoY2VsbCkge1xuICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBpbWcuY2xhc3NMaXN0LmFkZChcImRvdFwiKTtcbiAgaW1nLnNyYyA9IGRvdDtcbiAgY2VsbC5hcHBlbmRDaGlsZChpbWcpO1xufVxuXG5mdW5jdGlvbiBzaG93U3RydWNrQ2VsbChjZWxsKSB7XG4gIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIGltZy5jbGFzc0xpc3QuYWRkKFwiY3Jvc3NcIik7XG4gIGltZy5zcmMgPSBjcm9zcztcbiAgY2VsbC5hcHBlbmRDaGlsZChpbWcpO1xufVxuXG5mdW5jdGlvbiBoaWdobGlnaHRTdW5rU2hpcChzaGlwLCBib2FyZCkge1xuICBzaGlwLmNvb3Jkcy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgIGNvbnN0IGNlbGwgPSBib2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14eT0nJHtjb29yZH0nXWApO1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInN1bmtcIik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlQ29tcEJvYXJkKCkge1xuICBjb25zdCBjZWxscyA9IGNvbXBCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKTtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0VXNlclR1cm4sIHsgb25jZTogdHJ1ZSB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0VXNlclR1cm4oZSkge1xuICB1c2VyVHVybihlLnRhcmdldCk7XG4gIGNvbXBCb2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlGbGVldEluZm8oKSB7XG4gIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xuICBjb25zdCBmbGVldENvb3JkcyA9IHt9O1xuXG4gIHNoaXBzLmZvckVhY2goKHNoaXAsIGluZGV4KSA9PiB7XG4gICAgY29uc3Qgc2hpcE9iaiA9IHt9O1xuICAgIHNoaXBPYmouY29vcmRzID0gSlNPTi5wYXJzZShzaGlwLmRhdGFzZXQuY29vcmRzKTtcbiAgICBzaGlwT2JqLmlkID0gc2hpcC5kYXRhc2V0LmlkO1xuICAgIHNoaXBPYmoubmFtZSA9IHNoaXAuZGF0YXNldC5uYW1lO1xuICAgIGZsZWV0Q29vcmRzW2luZGV4XSA9IHNoaXBPYmo7XG4gIH0pO1xuXG4gIHJldHVybiBmbGVldENvb3Jkcztcbn1cblxuZnVuY3Rpb24gZ2V0U2hpcENvb3JkcyhlbG1udCkge1xuICBjb25zdCBjZWxscyA9IGdldENlbGxQb3NpdGlvbnMoKTtcbiAgY29uc3Qgc2hpcFRvcCA9IGVsbW50Lm9mZnNldFRvcDtcbiAgY29uc3Qgc2hpcExlZnQgPSBlbG1udC5vZmZzZXRMZWZ0O1xuICBjb25zdCBzaGlwSGVpZ2h0ID0gZWxtbnQub2Zmc2V0SGVpZ2h0O1xuICBjb25zdCBzaGlwV2lkdGggPSBlbG1udC5vZmZzZXRXaWR0aDtcbiAgbGV0IGNvb3JkcztcblxuICBmb3IgKGNvbnN0IHByb3AgaW4gY2VsbHMpIHtcbiAgICBpZiAoc2hpcExlZnQgPT09IGNlbGxzW3Byb3BdLmxlZnQgJiYgc2hpcFRvcCA9PT0gY2VsbHNbcHJvcF0udG9wKSB7XG4gICAgICBjb29yZHMgPSBjZWxsc1twcm9wXS5jb29yZHM7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBjb25zdCBjZWxsV2lkdGggPSBncmlkQ2VsbC5vZmZzZXRXaWR0aDtcbiAgbGV0IGF4aXM7XG4gIGxldCBsZW5ndGg7XG4gIGxldCBmdWxsQ29vcmRzID0gW2Nvb3Jkc107XG5cbiAgaWYgKHNoaXBIZWlnaHQgPiBzaGlwV2lkdGgpIHtcbiAgICBheGlzID0gMTtcbiAgICBsZW5ndGggPSBNYXRoLnJvdW5kKHNoaXBIZWlnaHQgLyBjZWxsV2lkdGgpO1xuICB9IGVsc2Uge1xuICAgIGF4aXMgPSAwO1xuICAgIGxlbmd0aCA9IE1hdGgucm91bmQoc2hpcFdpZHRoIC8gY2VsbFdpZHRoKTtcbiAgfVxuXG4gIGxldCBzYW1lQXhpcztcblxuICBheGlzID09IDAgPyAoc2FtZUF4aXMgPSAxKSA6IChzYW1lQXhpcyA9IDApO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgbGV0IG5ld0Nvb3JkO1xuICAgIGxldCBudW0gPSBOdW1iZXIoZnVsbENvb3Jkc1tmdWxsQ29vcmRzLmxlbmd0aCAtIDFdW2F4aXNdKTtcbiAgICBheGlzID09IDBcbiAgICAgID8gKG5ld0Nvb3JkID0gKG51bSArPSAxKSArIGZ1bGxDb29yZHNbZnVsbENvb3Jkcy5sZW5ndGggLSAxXVtzYW1lQXhpc10pXG4gICAgICA6IChuZXdDb29yZCA9IGZ1bGxDb29yZHNbZnVsbENvb3Jkcy5sZW5ndGggLSAxXVtzYW1lQXhpc10gKyAobnVtICs9IDEpKTtcbiAgICBmdWxsQ29vcmRzLnB1c2gobmV3Q29vcmQpO1xuICB9XG4gIHJldHVybiBmdWxsQ29vcmRzO1xufVxuXG5mdW5jdGlvbiBjaGVja0ZvclJlZCgpIHtcbiAgbGV0IHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmludmFsaWQtcG9zXCIpO1xuXG4gIGlmIChzaGlwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENlbGxQb3NpdGlvbnMoKSB7XG4gIGNvbnN0IGNlbGxQb3NpdGlvbnMgPSB7fTtcblxuICBjb25zdCBjZWxscyA9IHBsYXllckJvYXJkXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpXG4gICAgLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjZWxsT2JqID0ge307XG4gICAgICBjZWxsT2JqLnRvcCA9IGNlbGwub2Zmc2V0VG9wO1xuICAgICAgY2VsbE9iai5sZWZ0ID0gY2VsbC5vZmZzZXRMZWZ0O1xuICAgICAgY2VsbE9iai5jb29yZHMgPSBjZWxsLmRhdGFzZXQueHk7XG4gICAgICBjZWxsUG9zaXRpb25zW2luZGV4XSA9IGNlbGxPYmo7XG4gICAgfSk7XG5cbiAgcmV0dXJuIGNlbGxQb3NpdGlvbnM7XG59XG5cbmZ1bmN0aW9uIHBhaW50U2hpcHMoZmxlZXQpIHtcbiAgY29uc3QgY2VsbFBvc2l0aW9ucyA9IGdldENlbGxQb3NpdGlvbnMoKTtcblxuICBmbGVldC5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgIGRpdi5kYXRhc2V0LmlkID0gaW5kZXg7XG4gICAgZGl2LmRhdGFzZXQuY29vcmRzID0gSlNPTi5zdHJpbmdpZnkoc2hpcC5jb29yZHMpO1xuICAgIGRpdi5kYXRhc2V0Lm5hbWUgPSBzaGlwLm5hbWU7XG5cbiAgICBjb25zdCBmaXJzdENvID0gW107XG5cbiAgICBjb25zdCBkaXZXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC1jZWxsXCIpLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IGRpdkhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC1jZWxsXCIpLm9mZnNldEhlaWdodDtcblxuICAgIHNoaXAuY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBmaXJzdENvLnB1c2goY29vcmRbMF0pO1xuICAgIH0pO1xuXG4gICAgaWYgKGZpcnN0Q29bMF0gPT09IGZpcnN0Q29bMV0pIHtcbiAgICAgIGRpdi5zdHlsZS53aWR0aCA9IGRpdldpZHRoICsgXCJweFwiO1xuICAgICAgZGl2LnN0eWxlLmhlaWdodCA9IHNoaXAubGVuZ3RoICogZGl2SGVpZ2h0ICsgKHNoaXAubGVuZ3RoIC0gMSkgKiAzICsgXCJweFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gZGl2SGVpZ2h0ICsgXCJweFwiO1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gc2hpcC5sZW5ndGggKiBkaXZXaWR0aCArIChzaGlwLmxlbmd0aCAtIDEpICogMyArIFwicHhcIjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gY2VsbFBvc2l0aW9ucykge1xuICAgICAgaWYgKGNlbGxQb3NpdGlvbnNbcHJvcF0uY29vcmRzID09IHNoaXAuY29vcmRzWzBdKSB7XG4gICAgICAgIGRpdi5zdHlsZS50b3AgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnRvcCArIFwicHhcIjtcbiAgICAgICAgZGl2LnN0eWxlLmxlZnQgPSBjZWxsUG9zaXRpb25zW3Byb3BdLmxlZnQgKyBcInB4XCI7XG4gICAgICB9XG4gICAgfVxuICAgIHBsYXllckFyZWEuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICBkcmFnRWxlbWVudChkaXYpO1xuICAgIHJvdGF0ZVNoaXAoZGl2KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyU2hpcHMoKSB7XG4gIGNvbnN0IHNoaXBzID0gcGxheWVyQXJlYS5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIik7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLnJlbW92ZSgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVwYWludFNoaXBzKCkge1xuICBjbGVhclNoaXBzKCk7XG4gIHBhaW50U2hpcHMoZ2FtZS51c2VyLmdhbWVib2FyZC5mbGVldCk7XG59XG5cbmV4cG9ydCB7XG4gIGdldERpc3BsYXlGbGVldEluZm8sXG4gIGdldENlbGxQb3NpdGlvbnMsXG4gIGdldFNoaXBDb29yZHMsXG4gIHBhaW50U2hpcHMsXG4gIGNsZWFyU2hpcHMsXG4gIHNob3dNaXNzZWRDZWxsLFxuICBzaG93U3RydWNrQ2VsbCxcbiAgc3dpdGNoUGxheWVyVHVybixcbiAgaGlnaGxpZ2h0U3Vua1NoaXAsXG4gIHJlcGxheUJ1dHRvbixcbiAgZGlzcGxheVNldFVwLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCBcIi4vLi4vc3R5bGVzLmNzc1wiO1xuaW1wb3J0IHsgcHJlcGFyZUdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgeyBzdGFydEJ0biB9IGZyb20gXCIuL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBkaXNwbGF5U2V0VXAgfSBmcm9tIFwiLi91aVwiO1xuXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBzdGFydEJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIHByZXBhcmVHYW1lKCk7XG4gIGRpc3BsYXlTZXRVcCgpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=