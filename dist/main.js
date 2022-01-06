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
/* harmony export */   "dragElement": () => (/* binding */ dragElement),
/* harmony export */   "userNameInput": () => (/* binding */ userNameInput),
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
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements */ "./src/scripts/elements.js");
/* harmony import */ var _userTurn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userTurn */ "./src/scripts/userTurn.js");
/* harmony import */ var _dot_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../dot.png */ "./src/dot.png");
/* harmony import */ var _cross_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../cross.png */ "./src/cross.png");






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

  paintShips(_game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.fleet);
}

function showSelectedShips() {
  _game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.fleet.forEach((ship) => {
    ship.coords.forEach((coord) => {
      const cell = _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.querySelector(`[data-xy='${coord}']`);
      cell.classList.add("selected");
    });
  });
}

function playButton() {
  _elements__WEBPACK_IMPORTED_MODULE_1__.playBtn.style.display = "block";
  _elements__WEBPACK_IMPORTED_MODULE_1__.playBtn.addEventListener("click", playBtnHandler);
}

function playBtnHandler() {
  if (!checkForRed()) {
    _game__WEBPACK_IMPORTED_MODULE_0__.game.user.updateFleet(getDisplayFleetInfo());
    prepareCompBoard();
    showSelectedShips();
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
    if (cell.classList.contains("selected")) {
      cell.classList.remove("selected");
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

  const cellWidth = _elements__WEBPACK_IMPORTED_MODULE_1__.gridCell.offsetWidth;
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
    top: _elements__WEBPACK_IMPORTED_MODULE_1__.playerArea.offsetTop,
    left: _elements__WEBPACK_IMPORTED_MODULE_1__.playerArea.offsetLeft,
    right: _elements__WEBPACK_IMPORTED_MODULE_1__.playerArea.offsetLeft + _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.offsetWidth,
    bottom: _elements__WEBPACK_IMPORTED_MODULE_1__.playerArea.offsetTop + _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.offsetHeight,
  };
}

function getCellPositions() {
  const cellPositions = {};

  const cells = _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.querySelectorAll(".grid-cell")
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
  (0,_game__WEBPACK_IMPORTED_MODULE_1__.prepareGame)();
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.displaySetUp)();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDJEQUFvQjtBQUN4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztB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O0FBQzFCOztBQUVwQyxnRUFBeUI7QUFDekIsRUFBRSw2REFBc0I7QUFDeEIsRUFBRSxrREFBVztBQUNiLEVBQUUsaURBQVk7QUFDZCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMuY3NzPzE1NTMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2VsZW1lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvdWkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3VzZXJUdXJuLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpO1xuY29uc3QgcGxheWVyQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpO1xuY29uc3QgY29tcEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtYm9hcmRcIik7XG5jb25zdCBwbGF5ZXJCb2FyZCA9IHBsYXllckFyZWEucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIik7XG5jb25zdCBjb21wQm9hcmQgPSBjb21wQXJlYS5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZFwiKTtcbmNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS1pbnB1dFwiKTtcbmNvbnN0IG5hbWVTdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtc3VibWl0XCIpO1xuY29uc3QgbmFtZUlucHV0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYW1lLWlucHV0LWNvbnRhaW5lclwiKTtcbmNvbnN0IHBsYXllck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lXCIpO1xuY29uc3QgY29tcE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtbmFtZVwiKTtcbmNvbnN0IHNjb3Jlc0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVzLWJveFwiKTtcbmNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLWNlbGxcIik7XG5jb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKTtcbmNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXlcIik7XG5jb25zdCByZXBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlcGxheVwiKTtcblxuZXhwb3J0IHtcbiAgc3RhcnRCdG4sXG4gIHBsYXllckJvYXJkLFxuICBjb21wQm9hcmQsXG4gIHBsYXllckFyZWEsXG4gIGNvbXBBcmVhLFxuICBuYW1lSW5wdXQsXG4gIG5hbWVTdWJtaXRCdG4sXG4gIG5hbWVJbnB1dERpdixcbiAgcGxheWVyTmFtZSxcbiAgY29tcE5hbWUsXG4gIHNjb3Jlc0JveCxcbiAgZ3JpZENlbGwsXG4gIGluc3RydWN0aW9ucyxcbiAgcGxheUJ0bixcbiAgcmVwbGF5QnRuLFxufTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuXG5jb25zdCBnYW1lID0ge1xuICB1c2VyOiBudWxsLFxuICBjb21wOiBudWxsLFxuICBsYXN0V2lubmVyOiBudWxsLFxufTtcblxuZnVuY3Rpb24gcHJlcGFyZUdhbWUodXNlcm5hbWUpIHtcbiAgZ2FtZS51c2VyID0gUGxheWVyKHVzZXJuYW1lKTtcbiAgZ2FtZS5jb21wID0gUGxheWVyKFwiY29tcHV0ZXJcIik7XG4gIGdhbWUudXNlci5nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgZ2FtZS5jb21wLmdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICBnYW1lLnVzZXIuY3JlYXRlRmxlZXQoKTtcbiAgZ2FtZS5jb21wLmNyZWF0ZUZsZWV0KCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0R2FtZSgpIHtcbiAgZ2FtZS51c2VyLmdhbWVib2FyZC5uZXdSb3VuZCgpO1xuICBnYW1lLmNvbXAuZ2FtZWJvYXJkLm5ld1JvdW5kKCk7XG4gIGdhbWUudXNlci5jcmVhdGVGbGVldCgpO1xuICBnYW1lLmNvbXAuY3JlYXRlRmxlZXQoKTtcbn1cblxuZXhwb3J0IHsgZ2FtZSwgcHJlcGFyZUdhbWUsIHJlc2V0R2FtZSB9O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gIHJldHVybiB7XG4gICAgZmxlZXQ6IFtdLFxuICAgIG1pc3NlZFNob3RzOiBbXSxcbiAgICBmbGVldFN0YXR1czogW10sXG5cbiAgICBkZW1vOiBudWxsLFxuXG4gICAgcGxhY2VTaGlwKG5hbWUsIGNvb3Jkcykge1xuICAgICAgY29uc3QgbmV3U2hpcCA9IFNoaXAobmFtZSwgY29vcmRzKTtcblxuICAgICAgLy8gbmV3U2hpcC5jb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIC8vICAgY29uc3QgcG9zQXJyYXkgPSBPYmplY3Qua2V5cyh0aGlzLmJvYXJkUG9zaXRpb25zKTtcbiAgICAgIC8vICAgY29uc3QgcG9zaXRpb24gPSBwb3NBcnJheS5maW5kKChwb3MpID0+IHBvcyA9PT0gY29vcmQpO1xuICAgICAgLy8gICB0aGlzLmJvYXJkUG9zaXRpb25zW3Bvc2l0aW9uXSA9IHRydWU7XG4gICAgICAvLyB9KTtcblxuICAgICAgdGhpcy5mbGVldC5wdXNoKG5ld1NoaXApO1xuICAgICAgdGhpcy5mbGVldFt0aGlzLmZsZWV0Lmxlbmd0aCAtIDFdLmlkID0gdGhpcy5mbGVldC5sZW5ndGggLSAxO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrKHBvcykge1xuICAgICAgbGV0IGhpdCA9IGZhbHNlO1xuICAgICAgbGV0IHNoaXA7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMuZmxlZXQubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmZsZWV0W2ldLmNvb3Jkcy5pbmNsdWRlcyhwb3MpKSB7XG4gICAgICAgICAgdGhpcy5mbGVldFtpXS5oaXQocG9zKTtcbiAgICAgICAgICBoaXQgPSB0cnVlO1xuICAgICAgICAgIHNoaXAgPSB0aGlzLmZsZWV0W2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgcmV0dXJuIHNoaXA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1pc3NlZFNob3RzLnB1c2gocG9zKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hlY2tGbGVldFN0YXR1cygpIHtcbiAgICAgIHRoaXMuZmxlZXRTdGF0dXMgPSBbXTtcblxuICAgICAgdGhpcy5mbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGlmIChzaGlwLnN0YXR1cyA9PT0gXCJzdW5rXCIpIHtcbiAgICAgICAgICB0aGlzLmZsZWV0U3RhdHVzLnB1c2goXCJzdW5rXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuZmxlZXRTdGF0dXMubGVuZ3RoID09PSB0aGlzLmZsZWV0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbmV3Um91bmQoKSB7XG4gICAgICB0aGlzLmZsZWV0ID0gW107XG4gICAgICB0aGlzLm1pc3NlZFNob3RzID0gW107XG4gICAgICB0aGlzLmZsZWV0U3RhdHVzID0gW107XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmZ1bmN0aW9uIFBsYXllcihuYW1lKSB7XG4gIGNvbnN0IHByb3RvID0ge1xuICAgIGRlbW86IFtdLFxuXG4gICAgY29tcEF0dGFjaygpIHtcbiAgICAgIGxldCBjb29yZCA9IHRoaXMuZ2V0UmFuZG9tQ29vcmQoMTApO1xuXG4gICAgICBpZiAodGhpcy5jaGVja1ByZXZpb3VzTW92ZXMoY29vcmQpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBBdHRhY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0UmFuZG9tQ29vcmQoZmFjdG9yKSB7XG4gICAgICBjb25zdCB4ID0gdGhpcy5nZXRSYW5kb21JbnQoZmFjdG9yKS50b1N0cmluZygpO1xuICAgICAgY29uc3QgeSA9IHRoaXMuZ2V0UmFuZG9tSW50KGZhY3RvcikudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IGNvb3JkID0geCArIHk7XG4gICAgICByZXR1cm4gY29vcmQ7XG4gICAgfSxcblxuICAgIGdldFN0YXJ0Q29vcmQobGVuZ3RoLCBheGlzKSB7XG4gICAgICBjb25zdCBjb29yZCA9IHRoaXMuZ2V0UmFuZG9tQ29vcmQoMTApO1xuXG4gICAgICBpZiAoY29vcmRbYXhpc10gPiAxMCAtIGxlbmd0aCB8fCB0aGlzLmNoZWNrRm9yRHVwbGljYXRlKGNvb3JkKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFydENvb3JkKGxlbmd0aCwgYXhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrRm9yRHVwbGljYXRlKGNvb3JkKSB7XG4gICAgICByZXR1cm4gdGhpcy5nYW1lYm9hcmQuZmxlZXQuc29tZSgoc2hpcCkgPT4ge1xuICAgICAgICByZXR1cm4gc2hpcC5jb29yZHMuc29tZSgoaXRlbSkgPT4gaXRlbSA9PSBjb29yZCk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgY3JlYXRlRmxlZXQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgIGdlbmVyYXRlU2hpcENvb3JkcyhcImNhcnJpZXJcIiwgNSk7XG4gICAgICBnZW5lcmF0ZVNoaXBDb29yZHMoXCJiYXR0bGVzaGlwXCIsIDQpO1xuICAgICAgZ2VuZXJhdGVTaGlwQ29vcmRzKFwiY3J1aXNlclwiLCAzKTtcbiAgICAgIGdlbmVyYXRlU2hpcENvb3JkcyhcInN1Ym1hcmluZVwiLCAzKTtcbiAgICAgIGdlbmVyYXRlU2hpcENvb3JkcyhcImRlc3Ryb3llclwiLCAyKTtcblxuICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVTaGlwQ29vcmRzKG5hbWUsIGxlbmd0aCkge1xuICAgICAgICBjb25zdCBheGlzID0gc2VsZi5nZXRSYW5kb21JbnQoMik7XG5cbiAgICAgICAgbGV0IGNvb3JkID0gc2VsZi5nZXRTdGFydENvb3JkKGxlbmd0aCwgYXhpcyk7XG5cbiAgICAgICAgY29vcmQgPSBbY29vcmRdO1xuXG4gICAgICAgIGxldCBhZGRBeGlzID0gMDtcbiAgICAgICAgbGV0IHNhbWVBeGlzID0gMDtcblxuICAgICAgICBheGlzID09IDAgPyAoc2FtZUF4aXMgPSAxKSA6IChhZGRBeGlzID0gMSk7XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgICBsZXQgbmV3Q29vcmQ7XG5cbiAgICAgICAgICBsZXQgbnVtID0gTnVtYmVyKGNvb3JkW2Nvb3JkLmxlbmd0aCAtIDFdW2FkZEF4aXNdKTtcblxuICAgICAgICAgIGF4aXMgPT0gMFxuICAgICAgICAgICAgPyAobmV3Q29vcmQgPSAobnVtICs9IDEpICsgY29vcmRbY29vcmQubGVuZ3RoIC0gMV1bc2FtZUF4aXNdKVxuICAgICAgICAgICAgOiAobmV3Q29vcmQgPSBjb29yZFtjb29yZC5sZW5ndGggLSAxXVtzYW1lQXhpc10gKyAobnVtICs9IDEpKTtcblxuICAgICAgICAgIGlmIChzZWxmLmNoZWNrRm9yRHVwbGljYXRlKG5ld0Nvb3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlU2hpcENvb3JkcyhuYW1lLCBsZW5ndGgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb29yZC5wdXNoKG5ld0Nvb3JkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5nYW1lYm9hcmQucGxhY2VTaGlwKG5hbWUsIGNvb3JkKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlRmxlZXQoZmxlZXRPYmopIHtcbiAgICAgIHRoaXMuZ2FtZWJvYXJkLmZsZWV0ID0gW107XG4gICAgICBmb3IgKGNvbnN0IHByb3AgaW4gZmxlZXRPYmopIHtcbiAgICAgICAgbGV0IG5hbWUgPSBmbGVldE9ialtwcm9wXS5uYW1lO1xuICAgICAgICBsZXQgY29vcmRzID0gZmxlZXRPYmpbcHJvcF0uY29vcmRzO1xuICAgICAgICB0aGlzLmdhbWVib2FyZC5wbGFjZVNoaXAobmFtZSwgY29vcmRzKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hlY2tQcmV2aW91c01vdmVzKGNvb3JkKSB7XG4gICAgICBjb25zdCBoaXRzID0gW107XG4gICAgICBjb25zdCBtaXNzZWQgPSBnYW1lLnVzZXIuZ2FtZWJvYXJkLm1pc3NlZFNob3RzO1xuXG4gICAgICBnYW1lLnVzZXIuZ2FtZWJvYXJkLmZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5oaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgICAgIGhpdHMucHVzaChoaXQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBtaXNzZWQuZm9yRWFjaCgobWlzcykgPT4ge1xuICAgICAgICBoaXRzLnB1c2gobWlzcyk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGhpdHMuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRSYW5kb21JbnQoZmFjdG9yKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmFjdG9yKTtcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuXG4gIG9iai5uYW1lID0gbmFtZTtcbiAgb2JqLmdhbWVzV29uID0gMDtcbiAgb2JqLmdhbWVib2FyZCA9IG51bGw7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiZnVuY3Rpb24gU2hpcChuYW1lLCBjb29yZHMpIHtcbiAgY29uc3QgcHJvdG8gPSB7XG4gICAgaGl0KG51bWJlcikge1xuICAgICAgaWYgKHRoaXMuY29vcmRzLmluY2x1ZGVzKG51bWJlcikgJiYgIXRoaXMuaGl0cy5pbmNsdWRlcyhudW1iZXIpKSB7XG4gICAgICAgIHRoaXMuaGl0cy5wdXNoKG51bWJlcik7XG4gICAgICAgIHRoaXMuaXNTdW5rKCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzU3VuaygpIHtcbiAgICAgIGNvbnN0IHN1bmsgPSB0aGlzLmhpdHMuZXZlcnkoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29vcmRzLmluY2x1ZGVzKGl0ZW0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChzdW5rID09PSB0cnVlICYmIHRoaXMuaGl0cy5sZW5ndGggPT09IHRoaXMuY29vcmRzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IFwic3Vua1wiO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XG5cbiAgb2JqLm5hbWUgPSBuYW1lO1xuICBvYmouY29vcmRzID0gY29vcmRzO1xuICBvYmoubGVuZ3RoID0gY29vcmRzLmxlbmd0aDtcbiAgb2JqLmhpdHMgPSBbXTtcbiAgb2JqLnN0YXR1cyA9IFwidW5zdW5rXCI7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsImltcG9ydCB7IGdhbWUsIHByZXBhcmVHYW1lLCByZXNldEdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQge1xuICBwbGF5ZXJCb2FyZCxcbiAgY29tcEJvYXJkLFxuICBwbGF5ZXJBcmVhLFxuICBjb21wQXJlYSxcbiAgbmFtZUlucHV0LFxuICBuYW1lU3VibWl0QnRuLFxuICBuYW1lSW5wdXREaXYsXG4gIHBsYXllck5hbWUsXG4gIGNvbXBOYW1lLFxuICBzY29yZXNCb3gsXG4gIGdyaWRDZWxsLFxuICBpbnN0cnVjdGlvbnMsXG4gIHBsYXlCdG4sXG4gIHJlcGxheUJ0bixcbn0gZnJvbSBcIi4vZWxlbWVudHNcIjtcbmltcG9ydCB7IHVzZXJUdXJuLCBjb21wVHVybiB9IGZyb20gXCIuL3VzZXJUdXJuXCI7XG5pbXBvcnQgZG90IGZyb20gXCIuLy4uL2RvdC5wbmdcIjtcbmltcG9ydCBjcm9zcyBmcm9tIFwiLi8uLi9jcm9zcy5wbmdcIjtcblxuZnVuY3Rpb24gcGFpbnRTaGlwcyhmbGVldCkge1xuICBjb25zdCBjZWxsUG9zaXRpb25zID0gZ2V0Q2VsbFBvc2l0aW9ucygpO1xuXG4gIGZsZWV0LmZvckVhY2goKHNoaXAsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgZGl2LmRhdGFzZXQuaWQgPSBpbmRleDtcbiAgICBkaXYuZGF0YXNldC5jb29yZHMgPSBKU09OLnN0cmluZ2lmeShzaGlwLmNvb3Jkcyk7XG4gICAgZGl2LmRhdGFzZXQubmFtZSA9IHNoaXAubmFtZTtcblxuICAgIGNvbnN0IGZpcnN0Q28gPSBbXTtcblxuICAgIGNvbnN0IGRpdldpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLWNlbGxcIikub2Zmc2V0V2lkdGggKyAwLjU7XG4gICAgY29uc3QgZGl2SGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLWNlbGxcIikub2Zmc2V0SGVpZ2h0ICsgMC41O1xuXG4gICAgc2hpcC5jb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGZpcnN0Q28ucHVzaChjb29yZFswXSk7XG4gICAgfSk7XG5cbiAgICBpZiAoZmlyc3RDb1swXSA9PT0gZmlyc3RDb1sxXSkge1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gZGl2V2lkdGggKyBcInB4XCI7XG4gICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gc2hpcC5sZW5ndGggKiBkaXZIZWlnaHQgKyAoc2hpcC5sZW5ndGggLSAxKSAqIDMgKyBcInB4XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBkaXZIZWlnaHQgKyBcInB4XCI7XG4gICAgICBkaXYuc3R5bGUud2lkdGggPSBzaGlwLmxlbmd0aCAqIGRpdldpZHRoICsgKHNoaXAubGVuZ3RoIC0gMSkgKiAzICsgXCJweFwiO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBjZWxsUG9zaXRpb25zKSB7XG4gICAgICBpZiAoY2VsbFBvc2l0aW9uc1twcm9wXS5jb29yZHMgPT0gc2hpcC5jb29yZHNbMF0pIHtcbiAgICAgICAgZGl2LnN0eWxlLnRvcCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0udG9wICsgXCJweFwiO1xuICAgICAgICBkaXYuc3R5bGUubGVmdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0ubGVmdCArIFwicHhcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgcGxheWVyQXJlYS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIGRyYWdFbGVtZW50KGRpdik7XG4gICAgcm90YXRlU2hpcChkaXYpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJTaGlwcygpIHtcbiAgY29uc3Qgc2hpcHMgPSBwbGF5ZXJBcmVhLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXBhaW50U2hpcHMoKSB7XG4gIGNsZWFyU2hpcHMoKTtcbiAgcGFpbnRTaGlwcyhnYW1lLnVzZXIuZ2FtZWJvYXJkLmZsZWV0KTtcbn1cblxuZnVuY3Rpb24gdXNlck5hbWVJbnB1dCgpIHtcbiAgbmFtZUlucHV0RGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlZFwiKTtcbiAgbmFtZUlucHV0LnN0eWxlLmJveFNoYWRvdyA9IFwiMHB4IDBweCA2cHggM3B4IGJsYWNrXCI7XG4gIG5hbWVTdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAobmFtZUlucHV0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgICBuYW1lSW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjRThCNERDXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHAgPSBwbGF5ZXJOYW1lLnF1ZXJ5U2VsZWN0b3IoXCJwXCIpO1xuICAgICAgcC50ZXh0Q29udGVudCA9IG5hbWVJbnB1dC52YWx1ZTtcbiAgICAgIG5hbWVJbnB1dC52YWx1ZSA9IG51bGw7XG4gICAgICBuYW1lSW5wdXREaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTZXRVcCgpIHtcbiAgZGlzcGxheVNjb3JlcygpO1xuICBpbml0aWFsQm9hcmRzRGlzcGxheSgpO1xuICBwb3NpdGlvbkZsZWV0KCk7XG4gIHBsYXlCdXR0b24oKTtcbiAgd2luZG93Lm9ucmVzaXplID0gcmVwYWludFNoaXBzO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsQm9hcmRzRGlzcGxheSgpIHtcbiAgY29tcEJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlZFwiKTtcbiAgY29tcE5hbWUuY2xhc3NMaXN0LnJlbW92ZShcImZhZGVkXCIpO1xuICBjb21wQXJlYS5jbGFzc0xpc3QuYWRkKFwiZmFkZWRcIik7XG4gIHBsYXllckJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlZFwiKTtcbiAgcGxheWVyTmFtZS5jbGFzc0xpc3QucmVtb3ZlKFwiZmFkZWRcIik7XG4gIHBsYXllckFyZWEuY2xhc3NMaXN0LnJlbW92ZShcImZhZGVkXCIpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2NvcmVzKCkge1xuICBjb25zdCBzY29yZXMgPSBzY29yZXNCb3gucXVlcnlTZWxlY3RvcihcInBcIik7XG4gIHNjb3Jlcy50ZXh0Q29udGVudCA9IGdhbWUudXNlci5nYW1lc1dvbiArIFwiIC0gXCIgKyBnYW1lLmNvbXAuZ2FtZXNXb247XG59XG5cbmZ1bmN0aW9uIHBvc2l0aW9uRmxlZXQoKSB7XG4gIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPVxuICAgIFwiPHA+QXJyYW5nZSB5b3VyIHNoaXBzIGluIHByZXBhcmF0aW9uIGZvciBhIG5hdmFsIGJhdHRsZSE8L3A+IDxwPlRoZSBzaGlwcyBtdXN0IGFsbCBiZSBncmVlbiBiZWZvcmUgeW91IGNhbiBzdGFydCB0aGUgZ2FtZS48L3A+IDxwPihEb3VibGUtY2xpY2sgdG8gcm90YXRlIGEgc2hpcC4pPC9wPlwiO1xuXG4gIHBhaW50U2hpcHMoZ2FtZS51c2VyLmdhbWVib2FyZC5mbGVldCk7XG59XG5cbmZ1bmN0aW9uIHNob3dTZWxlY3RlZFNoaXBzKCkge1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLmZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmNvb3Jkcy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IHBsYXllckJvYXJkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXh5PScke2Nvb3JkfSddYCk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBsYXlCdXR0b24oKSB7XG4gIHBsYXlCdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheUJ0bkhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBwbGF5QnRuSGFuZGxlcigpIHtcbiAgaWYgKCFjaGVja0ZvclJlZCgpKSB7XG4gICAgZ2FtZS51c2VyLnVwZGF0ZUZsZWV0KGdldERpc3BsYXlGbGVldEluZm8oKSk7XG4gICAgcHJlcGFyZUNvbXBCb2FyZCgpO1xuICAgIHNob3dTZWxlY3RlZFNoaXBzKCk7XG4gICAgY2xlYXJTaGlwcygpO1xuXG4gICAgd2luZG93Lm9ucmVzaXplID0gbnVsbDtcblxuICAgIGNvbnNvbGUubG9nKGdhbWUuY29tcC5nYW1lYm9hcmQuZmxlZXQpO1xuXG4gICAgZGVjaWRlRmlyc3RUdXJuKCk7XG5cbiAgICBwbGF5QnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfSBlbHNlIGlmIChjaGVja0ZvclJlZCgpKSB7XG4gICAgYWxlcnQoXCJBbGwgc2hpcHMgbXVzdCBiZSBncmVlbiFcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVwbGF5QnV0dG9uKCkge1xuICByZXBsYXlCdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVwbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXBsYXlCdG5IYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gcmVwbGF5QnRuSGFuZGxlcigpIHtcbiAgY2xlYXJCb2FyZHMoKTtcbiAgcmVzZXRHYW1lKCk7XG4gIGRpc3BsYXlTZXRVcCgpO1xuXG4gIHJlcGxheUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIGRlY2lkZUZpcnN0VHVybigpIHtcbiAgaWYgKGdhbWUubGFzdFdpbm5lciA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgcGxheWVyQm9hcmQuY2xhc3NMaXN0LnJlbW92ZShcImZhZGVkXCIpO1xuICAgIGNvbXBBcmVhLmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlZFwiKTtcbiAgICBjb21wQm9hcmQuY2xhc3NMaXN0LmFkZChcImZhZGVkXCIpO1xuICAgIGNvbXBOYW1lLmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlZFwiKTtcbiAgICBwbGF5ZXJOYW1lLmNsYXNzTGlzdC5hZGQoXCJmYWRlZFwiKTtcblxuICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPVxuICAgICAgXCI8cD5UaGUgY29tcHV0ZXIgaXMgY2hvb3Npbmcgd2hlcmUgdG8gYXR0YWNrLi4uPC9wPlwiO1xuXG4gICAgY29tcEFyZWEuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuXG4gICAgY29tcFR1cm4oKTtcbiAgfSBlbHNlIHtcbiAgICBwbGF5ZXJCb2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwiZmFkZWRcIik7XG4gICAgY29tcEFyZWEuY2xhc3NMaXN0LnRvZ2dsZShcImZhZGVkXCIpO1xuICAgIGNvbXBOYW1lLmNsYXNzTGlzdC5hZGQoXCJmYWRlZFwiKTtcblxuICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBcIjxwPlBpY2sgYW4gZW5lbXkgcG9zaXRpb24gdG8gYXR0YWNrLjwvcD5cIjtcblxuICAgIGNvbXBCb2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJCb2FyZHMoKSB7XG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIik7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGlmIChjZWxsLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIikpIHtcbiAgICAgIGNlbGwucXVlcnlTZWxlY3RvcihcImltZ1wiKS5yZW1vdmUoKTtcbiAgICB9XG4gICAgaWYgKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic3Vua1wiKSkge1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwic3Vua1wiKTtcbiAgICB9XG4gICAgaWYgKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIikpIHtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN3aXRjaEFyZWFGYWRlKCkge1xuICBwbGF5ZXJCb2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwiZmFkZWRcIik7XG4gIGNvbXBCb2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwiZmFkZWRcIik7XG4gIHBsYXllck5hbWUuY2xhc3NMaXN0LnRvZ2dsZShcImZhZGVkXCIpO1xuICBjb21wTmFtZS5jbGFzc0xpc3QudG9nZ2xlKFwiZmFkZWRcIik7XG59XG5cbmZ1bmN0aW9uIHN3aXRjaFBsYXllclR1cm4ocGxheWVyKSB7XG4gIGlmIChwbGF5ZXIgPT09IFwiY29tcFwiKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzd2l0Y2hBcmVhRmFkZSgpO1xuICAgICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9XG4gICAgICAgIFwiPHA+VGhlIGNvbXB1dGVyIGlzIGNob29zaW5nIHdoZXJlIHRvIGF0dGFjay4uLjwvcD5cIjtcbiAgICAgIGNvbXBUdXJuKCk7XG4gICAgfSwgMTUwMCk7XG4gIH0gZWxzZSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzd2l0Y2hBcmVhRmFkZSgpO1xuICAgICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IFwiPHA+UGljayBhbiBlbmVteSBwb3NpdGlvbiB0byBhdHRhY2suPC9wPlwiO1xuICAgICAgY29tcEJvYXJkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcbiAgICB9LCAxNTAwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93TWlzc2VkQ2VsbChjZWxsKSB7XG4gIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIGltZy5jbGFzc0xpc3QuYWRkKFwiZG90XCIpO1xuICBpbWcuc3JjID0gZG90O1xuICBjZWxsLmFwcGVuZENoaWxkKGltZyk7XG59XG5cbmZ1bmN0aW9uIHNob3dTdHJ1Y2tDZWxsKGNlbGwpIHtcbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgaW1nLmNsYXNzTGlzdC5hZGQoXCJjcm9zc1wiKTtcbiAgaW1nLnNyYyA9IGNyb3NzO1xuICBjZWxsLmFwcGVuZENoaWxkKGltZyk7XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodFN1bmtTaGlwKHNoaXAsIGJvYXJkKSB7XG4gIHNoaXAuY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgY29uc3QgY2VsbCA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXh5PScke2Nvb3JkfSddYCk7XG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVDb21wQm9hcmQoKSB7XG4gIGNvbnN0IGNlbGxzID0gY29tcEJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpO1xuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRVc2VyVHVybiwgeyBvbmNlOiB0cnVlIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RhcnRVc2VyVHVybihlKSB7XG4gIHVzZXJUdXJuKGUudGFyZ2V0KTtcbiAgY29tcEJvYXJkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzcGxheUZsZWV0SW5mbygpIHtcbiAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIik7XG4gIGNvbnN0IGZsZWV0Q29vcmRzID0ge307XG5cbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBzaGlwT2JqID0ge307XG4gICAgc2hpcE9iai5jb29yZHMgPSBKU09OLnBhcnNlKHNoaXAuZGF0YXNldC5jb29yZHMpO1xuICAgIHNoaXBPYmouaWQgPSBzaGlwLmRhdGFzZXQuaWQ7XG4gICAgc2hpcE9iai5uYW1lID0gc2hpcC5kYXRhc2V0Lm5hbWU7XG4gICAgZmxlZXRDb29yZHNbaW5kZXhdID0gc2hpcE9iajtcbiAgfSk7XG5cbiAgcmV0dXJuIGZsZWV0Q29vcmRzO1xufVxuXG5mdW5jdGlvbiBnZXRTaGlwQ29vcmRzKGVsbW50KSB7XG4gIGNvbnN0IGNlbGxzID0gZ2V0Q2VsbFBvc2l0aW9ucygpO1xuICBjb25zdCBzaGlwVG9wID0gZWxtbnQub2Zmc2V0VG9wO1xuICBjb25zdCBzaGlwTGVmdCA9IGVsbW50Lm9mZnNldExlZnQ7XG4gIGNvbnN0IHNoaXBIZWlnaHQgPSBlbG1udC5vZmZzZXRIZWlnaHQ7XG4gIGNvbnN0IHNoaXBXaWR0aCA9IGVsbW50Lm9mZnNldFdpZHRoO1xuICBsZXQgY29vcmRzO1xuXG4gIGZvciAoY29uc3QgcHJvcCBpbiBjZWxscykge1xuICAgIGlmIChzaGlwTGVmdCA9PT0gY2VsbHNbcHJvcF0ubGVmdCAmJiBzaGlwVG9wID09PSBjZWxsc1twcm9wXS50b3ApIHtcbiAgICAgIGNvb3JkcyA9IGNlbGxzW3Byb3BdLmNvb3JkcztcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNlbGxXaWR0aCA9IGdyaWRDZWxsLm9mZnNldFdpZHRoO1xuICBsZXQgYXhpcztcbiAgbGV0IGxlbmd0aDtcbiAgbGV0IGZ1bGxDb29yZHMgPSBbY29vcmRzXTtcblxuICBpZiAoc2hpcEhlaWdodCA+IHNoaXBXaWR0aCkge1xuICAgIGF4aXMgPSAxO1xuICAgIGxlbmd0aCA9IE1hdGgucm91bmQoc2hpcEhlaWdodCAvIGNlbGxXaWR0aCk7XG4gIH0gZWxzZSB7XG4gICAgYXhpcyA9IDA7XG4gICAgbGVuZ3RoID0gTWF0aC5yb3VuZChzaGlwV2lkdGggLyBjZWxsV2lkdGgpO1xuICB9XG5cbiAgbGV0IHNhbWVBeGlzO1xuXG4gIGF4aXMgPT0gMCA/IChzYW1lQXhpcyA9IDEpIDogKHNhbWVBeGlzID0gMCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICBsZXQgbmV3Q29vcmQ7XG4gICAgbGV0IG51bSA9IE51bWJlcihmdWxsQ29vcmRzW2Z1bGxDb29yZHMubGVuZ3RoIC0gMV1bYXhpc10pO1xuICAgIGF4aXMgPT0gMFxuICAgICAgPyAobmV3Q29vcmQgPSAobnVtICs9IDEpICsgZnVsbENvb3Jkc1tmdWxsQ29vcmRzLmxlbmd0aCAtIDFdW3NhbWVBeGlzXSlcbiAgICAgIDogKG5ld0Nvb3JkID0gZnVsbENvb3Jkc1tmdWxsQ29vcmRzLmxlbmd0aCAtIDFdW3NhbWVBeGlzXSArIChudW0gKz0gMSkpO1xuICAgIGZ1bGxDb29yZHMucHVzaChuZXdDb29yZCk7XG4gIH1cbiAgcmV0dXJuIGZ1bGxDb29yZHM7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9yUmVkKCkge1xuICBsZXQgc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW52YWxpZC1wb3NcIik7XG5cbiAgaWYgKHNoaXApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhZ0VsZW1lbnQoZWxtbnQpIHtcbiAgbGV0IHBvczEgPSAwLFxuICAgIHBvczIgPSAwLFxuICAgIHBvczMgPSAwLFxuICAgIHBvczQgPSAwO1xuXG4gIGVsbW50Lm9ubW91c2Vkb3duID0gZHJhZ01vdXNlRG93bjtcblxuICBjb25zdCBib2FyZCA9IGdldEJvcmRlcigpO1xuXG4gIGZ1bmN0aW9uIGRyYWdNb3VzZURvd24oZSkge1xuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgIGNsb3NlRHJhZ0VsZW1lbnQoZWxtbnQpO1xuICAgIH07XG4gICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBlbGVtZW50RHJhZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGVsZW1lbnREcmFnKGUpIHtcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHBvczEgPSBwb3MzIC0gZS5jbGllbnRYO1xuICAgIHBvczIgPSBwb3M0IC0gZS5jbGllbnRZO1xuXG4gICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICBwb3M0ID0gZS5jbGllbnRZO1xuXG4gICAga2VlcEluQm91bmRzKGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tEb3duRHJhZyhlKSB7XG4gICAgaWYgKGUuY2xpZW50WSA+IHBvczQpIHtcbiAgICAgIHJldHVybiBlLmNsaWVudFkgLSBwb3M0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tSaWdodERyYWcoZSkge1xuICAgIGlmIChlLmNsaWVudFggPiBwb3MzKSB7XG4gICAgICByZXR1cm4gZS5jbGllbnRYIC0gcG9zMztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrTGVmdERyYWcoZSkge1xuICAgIGlmIChlLmNsaWVudFggPCBwb3MzKSB7XG4gICAgICByZXR1cm4gcG9zMyAtIGUuY2xpZW50WDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVXBEcmFnKGUpIHtcbiAgICBpZiAoZS5jbGllbnRZIDwgcG9zNCkge1xuICAgICAgcmV0dXJuIHBvczQgLSBlLmNsaWVudFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBrZWVwSW5Cb3VuZHMoZSkge1xuICAgIGlmICghY2hlY2tQb3NpdGlvbihlbG1udCkpIHtcbiAgICAgIGVsbW50LnN0eWxlLnRvcCA9IGVsbW50Lm9mZnNldFRvcCAtIHBvczIgKyBcInB4XCI7XG4gICAgICBlbG1udC5zdHlsZS5sZWZ0ID0gZWxtbnQub2Zmc2V0TGVmdCAtIHBvczEgKyBcInB4XCI7XG4gICAgfSBlbHNlIGlmIChjaGVja1Bvc2l0aW9uKGVsbW50KSA9PT0gXCJ0b3BcIikge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID0gYm9hcmQudG9wICsgY2hlY2tEb3duRHJhZyhlKSArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmxlZnQgPSBlbG1udC5vZmZzZXRMZWZ0IC0gcG9zMSArIFwicHhcIjtcbiAgICB9IGVsc2UgaWYgKGNoZWNrUG9zaXRpb24oZWxtbnQpID09PSBcImxlZnRcIikge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID0gZWxtbnQub2Zmc2V0VG9wIC0gcG9zMiArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmxlZnQgPSBib2FyZC5sZWZ0ICsgY2hlY2tSaWdodERyYWcoZSkgKyBcInB4XCI7XG4gICAgfSBlbHNlIGlmIChjaGVja1Bvc2l0aW9uKGVsbW50KSA9PT0gXCJyaWdodFwiKSB7XG4gICAgICBlbG1udC5zdHlsZS50b3AgPSBlbG1udC5vZmZzZXRUb3AgLSBwb3MyICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9XG4gICAgICAgIGJvYXJkLnJpZ2h0IC0gZWxtbnQub2Zmc2V0V2lkdGggLSBjaGVja0xlZnREcmFnKGUpICsgXCJweFwiO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tQb3NpdGlvbihlbG1udCkgPT09IFwiYm90dG9tXCIpIHtcbiAgICAgIGVsbW50LnN0eWxlLnRvcCA9XG4gICAgICAgIGJvYXJkLmJvdHRvbSAtIGVsbW50Lm9mZnNldEhlaWdodCAtIGNoZWNrVXBEcmFnKGUpICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IGVsbW50Lm9mZnNldExlZnQgLSBwb3MxICsgXCJweFwiO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrUG9zaXRpb24oZWxtbnQpIHtcbiAgICBjb25zdCBlbG1udFRvcCA9IGVsbW50Lm9mZnNldFRvcDtcbiAgICBjb25zdCBlbG1udExlZnQgPSBlbG1udC5vZmZzZXRMZWZ0O1xuICAgIGNvbnN0IGVsbW50UmlnaHQgPSBlbG1udExlZnQgKyBlbG1udC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBlbG1udEJvdHRvbSA9IGVsbW50VG9wICsgZWxtbnQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgaWYgKGVsbW50VG9wIDwgYm9hcmQudG9wKSB7XG4gICAgICByZXR1cm4gXCJ0b3BcIjtcbiAgICB9IGVsc2UgaWYgKGVsbW50TGVmdCA8IGJvYXJkLmxlZnQpIHtcbiAgICAgIHJldHVybiBcImxlZnRcIjtcbiAgICB9IGVsc2UgaWYgKGVsbW50UmlnaHQgPiBib2FyZC5yaWdodCkge1xuICAgICAgcmV0dXJuIFwicmlnaHRcIjtcbiAgICB9IGVsc2UgaWYgKGVsbW50Qm90dG9tID4gYm9hcmQuYm90dG9tKSB7XG4gICAgICByZXR1cm4gXCJib3R0b21cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlRHJhZ0VsZW1lbnQoZWxtbnQpIHtcbiAgICBncmlkU25hcChlbG1udCk7XG4gICAgZG9jdW1lbnQub25tb3VzZXVwID0gbnVsbDtcbiAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm90YXRlU2hpcChlbG1udCkge1xuICBlbG1udC5vbmRibGNsaWNrID0gcm90YXRlO1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZSgpIHtcbiAgICBjb25zdCBib2FyZCA9IGdldEJvcmRlcigpO1xuXG4gICAgY29uc3QgZWxtbnRSZWN0ID0gZWxtbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCBmdXR1cmVSaWdodCA9IGVsbW50UmVjdC5sZWZ0ICsgZWxtbnRSZWN0LmhlaWdodDtcbiAgICBjb25zdCBmdXR1cmVCb3R0b20gPSBlbG1udFJlY3QudG9wICsgZWxtbnRSZWN0LndpZHRoO1xuXG4gICAgaWYgKCEoZnV0dXJlUmlnaHQgLSAxID4gYm9hcmQucmlnaHQgfHwgZnV0dXJlQm90dG9tIC0gMSA+IGJvYXJkLmJvdHRvbSkpIHtcbiAgICAgIGVsbW50LnN0eWxlLndpZHRoID0gZWxtbnRSZWN0LmhlaWdodCArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmhlaWdodCA9IGVsbW50UmVjdC53aWR0aCArIFwicHhcIjtcbiAgICAgIGVsbW50LmRhdGFzZXQuY29vcmRzID0gSlNPTi5zdHJpbmdpZnkoZ2V0U2hpcENvb3JkcyhlbG1udCkpO1xuICAgICAgY2hlY2tQcm94aW1pdHkoZWxtbnQpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja1Byb3hpbWl0eShlbG1udCkge1xuICBjb25zdCBmbGVldCA9IGdldERpc3BsYXlGbGVldEluZm8oKTtcbiAgbGV0IG92ZXJsYXA7XG5cbiAgZm9yIChjb25zdCBwcm9wIGluIGZsZWV0KSB7XG4gICAgaWYgKGZsZWV0W3Byb3BdLmlkICE9PSBlbG1udC5kYXRhc2V0LmlkKSB7XG4gICAgICBKU09OLnBhcnNlKGVsbW50LmRhdGFzZXQuY29vcmRzKS5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICBpZiAoZmxlZXRbcHJvcF0uY29vcmRzLnNvbWUoKGl0ZW0pID0+IGl0ZW0gPT0gY29vcmQpKSB7XG4gICAgICAgICAgb3ZlcmxhcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvdmVybGFwKSB7XG4gICAgZWxtbnQuY2xhc3NMaXN0LmFkZChcImludmFsaWQtcG9zXCIpO1xuICB9IGVsc2Uge1xuICAgIGVsbW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLXBvc1wiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRCb3JkZXIoKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiBwbGF5ZXJBcmVhLm9mZnNldFRvcCxcbiAgICBsZWZ0OiBwbGF5ZXJBcmVhLm9mZnNldExlZnQsXG4gICAgcmlnaHQ6IHBsYXllckFyZWEub2Zmc2V0TGVmdCArIHBsYXllckJvYXJkLm9mZnNldFdpZHRoLFxuICAgIGJvdHRvbTogcGxheWVyQXJlYS5vZmZzZXRUb3AgKyBwbGF5ZXJCb2FyZC5vZmZzZXRIZWlnaHQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldENlbGxQb3NpdGlvbnMoKSB7XG4gIGNvbnN0IGNlbGxQb3NpdGlvbnMgPSB7fTtcblxuICBjb25zdCBjZWxscyA9IHBsYXllckJvYXJkXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpXG4gICAgLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjZWxsT2JqID0ge307XG4gICAgICBjZWxsT2JqLnRvcCA9IGNlbGwub2Zmc2V0VG9wO1xuICAgICAgY2VsbE9iai5sZWZ0ID0gY2VsbC5vZmZzZXRMZWZ0O1xuICAgICAgY2VsbE9iai5jb29yZHMgPSBjZWxsLmRhdGFzZXQueHk7XG4gICAgICBjZWxsUG9zaXRpb25zW2luZGV4XSA9IGNlbGxPYmo7XG4gICAgfSk7XG5cbiAgcmV0dXJuIGNlbGxQb3NpdGlvbnM7XG59XG5cbi8vIGZ1bmN0aW9uIGdldENlbGxQb3NpdGlvbnMoKSB7XG4vLyAgIGNvbnN0IGNlbGxQb3NpdGlvbnMgPSB7fTtcblxuLy8gICBjb25zdCBjZWxscyA9IHBsYXllckJvYXJkXG4vLyAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpXG4vLyAgICAgLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4vLyAgICAgICBjb25zdCBjZWxsT2JqID0ge307XG4vLyAgICAgICBjZWxsT2JqLnNjcmVlblBvcyA9IGNlbGwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4vLyAgICAgICBjZWxsT2JqLmNvb3JkcyA9IGNlbGwuZGF0YXNldC54eTtcbi8vICAgICAgIGNlbGxQb3NpdGlvbnNbaW5kZXhdID0gY2VsbE9iajtcbi8vICAgICB9KTtcblxuLy8gICByZXR1cm4gY2VsbFBvc2l0aW9ucztcbi8vIH1cblxuZnVuY3Rpb24gZ3JpZFNuYXAoZWxtbnQpIHtcbiAgY29uc3QgY2VsbFBvc2l0aW9ucyA9IGdldENlbGxQb3NpdGlvbnMoKTtcblxuICBjb25zdCBlbG1udFRvcCA9IGVsbW50Lm9mZnNldFRvcDtcbiAgY29uc3QgZWxtbnRMZWZ0ID0gZWxtbnQub2Zmc2V0TGVmdDtcblxuICBjb25zdCBkaXZXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC1jZWxsXCIpLm9mZnNldFdpZHRoO1xuXG4gIGZvciAoY29uc3QgcHJvcCBpbiBjZWxsUG9zaXRpb25zKSB7XG4gICAgY29uc3QgeExvd2VyID0gY2VsbFBvc2l0aW9uc1twcm9wXS5sZWZ0IC0gZGl2V2lkdGggLyAyO1xuICAgIGNvbnN0IHlMb3dlciA9IGNlbGxQb3NpdGlvbnNbcHJvcF0udG9wIC0gZGl2V2lkdGggLyAyO1xuICAgIGNvbnN0IHhVcHBlciA9IGNlbGxQb3NpdGlvbnNbcHJvcF0ubGVmdCArIGRpdldpZHRoIC8gMjtcbiAgICBjb25zdCB5VXBwZXIgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnRvcCArIGRpdldpZHRoIC8gMjtcblxuICAgIGlmIChcbiAgICAgIGVsbW50TGVmdCA+PSB4TG93ZXIgJiZcbiAgICAgIGVsbW50VG9wID49IHlMb3dlciAmJlxuICAgICAgZWxtbnRMZWZ0IDw9IHhVcHBlciAmJlxuICAgICAgZWxtbnRUb3AgPD0geVVwcGVyXG4gICAgKSB7XG4gICAgICBlbG1udC5zdHlsZS50b3AgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnRvcCArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmxlZnQgPSBjZWxsUG9zaXRpb25zW3Byb3BdLmxlZnQgKyBcInB4XCI7XG5cbiAgICAgIGVsbW50LmRhdGFzZXQueCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uY29vcmRzWzBdO1xuICAgICAgZWxtbnQuZGF0YXNldC55ID0gY2VsbFBvc2l0aW9uc1twcm9wXS5jb29yZHNbMV07XG5cbiAgICAgIGVsbW50LmRhdGFzZXQuY29vcmRzID0gSlNPTi5zdHJpbmdpZnkoZ2V0U2hpcENvb3JkcyhlbG1udCkpO1xuICAgICAgY2hlY2tQcm94aW1pdHkoZWxtbnQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge1xuICBkcmFnRWxlbWVudCxcbiAgdXNlck5hbWVJbnB1dCxcbiAgcGFpbnRTaGlwcyxcbiAgY2xlYXJTaGlwcyxcbiAgc2hvd01pc3NlZENlbGwsXG4gIHNob3dTdHJ1Y2tDZWxsLFxuICBzd2l0Y2hQbGF5ZXJUdXJuLFxuICBoaWdobGlnaHRTdW5rU2hpcCxcbiAgcmVwbGF5QnV0dG9uLFxuICBkaXNwbGF5U2V0VXAsXG59O1xuIiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7XG4gIHNob3dNaXNzZWRDZWxsLFxuICBzaG93U3RydWNrQ2VsbCxcbiAgc3dpdGNoUGxheWVyVHVybixcbiAgaGlnaGxpZ2h0U3Vua1NoaXAsXG4gIHJlcGxheUJ1dHRvbixcbn0gZnJvbSBcIi4vdWlcIjtcbmltcG9ydCB7IGluc3RydWN0aW9ucywgcGxheWVyQm9hcmQsIGNvbXBCb2FyZCB9IGZyb20gXCIuL2VsZW1lbnRzXCI7XG5cbmZ1bmN0aW9uIHVzZXJUdXJuKGNlbGwpIHtcbiAgY29uc3QgY29vcmRzID0gY2VsbC5kYXRhc2V0Lnh5O1xuICBjb25zdCBzaGlwID0gZ2FtZS5jb21wLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XG5cbiAgaWYgKHNoaXApIHtcbiAgICBzaG93U3RydWNrQ2VsbChjZWxsKTtcblxuICAgIGlmIChzaGlwLnN0YXR1cyA9PT0gXCJzdW5rXCIpIHtcbiAgICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBgPHA+WW91IHNhbmsgdGhlaXIgJHtzaGlwLm5hbWV9ISE8L3A+YDtcbiAgICAgIGhpZ2hsaWdodFN1bmtTaGlwKHNoaXAsIGNvbXBCb2FyZCk7XG5cbiAgICAgIGlmIChnYW1lLmNvbXAuZ2FtZWJvYXJkLmNoZWNrRmxlZXRTdGF0dXMoKSkge1xuICAgICAgICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID0gYDxwPllvdSd2ZSB3b24hISE8L3A+YDtcbiAgICAgICAgZ2FtZS51c2VyLmdhbWVzV29uICs9IDE7XG4gICAgICAgIGdhbWUubGFzdFdpbm5lciA9IGdhbWUudXNlci5uYW1lO1xuICAgICAgICByZXR1cm4gcmVwbGF5QnV0dG9uKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBcIjxwPllvdSBoaXQgb25lIG9mIHRoZWlyIHNoaXBzLjwvcD5cIjtcbiAgICB9XG5cbiAgICBzd2l0Y2hQbGF5ZXJUdXJuKFwiY29tcFwiKTtcbiAgfSBlbHNlIHtcbiAgICBzaG93TWlzc2VkQ2VsbChjZWxsKTtcbiAgICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID0gXCI8cD5Zb3VyIGF0dGFjayBtaXNzZWQuPC9wPlwiO1xuXG4gICAgc3dpdGNoUGxheWVyVHVybihcImNvbXBcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29tcFR1cm4oKSB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IGdhbWUuY29tcC5jb21wQXR0YWNrKCk7XG4gICAgY29uc3Qgc2hpcCA9IGdhbWUudXNlci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICAgIGNvbnN0IGNlbGwgPSBwbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14eT0nJHtjb29yZHN9J11gKTtcblxuICAgIGlmIChzaGlwKSB7XG4gICAgICBzaG93U3RydWNrQ2VsbChjZWxsKTtcblxuICAgICAgaWYgKHNoaXAuc3RhdHVzID09PSBcInN1bmtcIikge1xuICAgICAgICBoaWdobGlnaHRTdW5rU2hpcChzaGlwLCBwbGF5ZXJCb2FyZCk7XG4gICAgICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBgPHA+VGhlIGNvbXB1dGVyIHNhbmsgeW91ciAke3NoaXAubmFtZX0hITwvcD5gO1xuXG4gICAgICAgIGlmIChnYW1lLnVzZXIuZ2FtZWJvYXJkLmNoZWNrRmxlZXRTdGF0dXMoKSkge1xuICAgICAgICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBgPHA+T2ggbm8sIHlvdSBsb3N0ITwvcD5gO1xuICAgICAgICAgIGdhbWUuY29tcC5nYW1lc1dvbiArPSAxO1xuICAgICAgICAgIGdhbWUubGFzdFdpbm5lciA9IGdhbWUuY29tcC5uYW1lO1xuICAgICAgICAgIHJldHVybiByZXBsYXlCdXR0b24oKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IFwiPHA+VGhlIGNvbXB1dGVyIGhpdCBvbmUgb2YgeW91ciBzaGlwcy48L3A+XCI7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaFBsYXllclR1cm4oXCJwbGF5ZXJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dNaXNzZWRDZWxsKGNlbGwpO1xuICAgICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IFwiPHA+VGhlIGNvbXB1dGVyJ3MgYXR0YWNrIG1pc3NlZC48L3A+XCI7XG5cbiAgICAgIHN3aXRjaFBsYXllclR1cm4oXCJwbGF5ZXJcIik7XG4gICAgfVxuICB9LCAxNTAwKTtcbn1cblxuZXhwb3J0IHsgdXNlclR1cm4sIGNvbXBUdXJuIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgXCIuLy4uL3N0eWxlcy5jc3NcIjtcbmltcG9ydCB7IGdhbWUsIHByZXBhcmVHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgc3RhcnRCdG4sIHBsYXllckJvYXJkLCBjb21wQm9hcmQgfSBmcm9tIFwiLi9lbGVtZW50c1wiO1xuaW1wb3J0IHsgZGlzcGxheVNldFVwIH0gZnJvbSBcIi4vdWlcIjtcblxuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgc3RhcnRCdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBwcmVwYXJlR2FtZSgpO1xuICBkaXNwbGF5U2V0VXAoKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9