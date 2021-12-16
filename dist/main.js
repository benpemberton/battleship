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
/* harmony export */   "scoresBox": () => (/* binding */ scoresBox),
/* harmony export */   "gridCell": () => (/* binding */ gridCell),
/* harmony export */   "instructions": () => (/* binding */ instructions),
/* harmony export */   "playBtn": () => (/* binding */ playBtn)
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
const scoresBox = document.querySelector(".scores-box");
const gridCell = document.querySelector(".grid-cell");
const instructions = document.querySelector(".instructions");
const playBtn = document.querySelector(".play");




/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "game": () => (/* binding */ game),
/* harmony export */   "startGame": () => (/* binding */ startGame)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/scripts/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/scripts/player.js");



const game = {
  user: null,
  comp: null,
};

function startGame() {
  game.user = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])("placeholder");
  game.comp = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])("computer");
  game.user.gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  game.comp.gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();

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

      for (let i = 0; i <= this.fleet.length - 1; i++) {
        if (this.fleet[i].coords.includes(pos)) {
          this.fleet[i].hit(pos);
          hit = true;
          break;
        }
      }

      if (!hit) {
        this.missedShots.push(pos);
      }
      this.demo = pos;
    },

    checkFleetStatus() {
      this.fleetStatus = [];

      this.fleet.forEach((ship) => {
        if (ship.status === "sunk") {
          this.fleetStatus.push("sunk");
        }
      });

      // if (this.fleetStatus.length === this.fleet.length) {
      //   alert("everything is sunk");
      // }
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

    sendAttack() {
      let coord = this.getRandomCoord(10);

      if (this.checkPreviousMoves(coord)) {
        this.sendAttack();
      } else {
        _game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.receiveAttack(coord);
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
      let fleet = [];
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

          self.checkForDuplicate(newCoord)
            ? generateShipCoords(name, length)
            : coord.push(newCoord);
        }
        self.gameboard.placeShip(name, coord);
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
  obj.trackGrid = null;

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
/* harmony export */   "activateElement": () => (/* binding */ activateElement),
/* harmony export */   "dragElement": () => (/* binding */ dragElement),
/* harmony export */   "renderFleet": () => (/* binding */ renderFleet),
/* harmony export */   "userNameInput": () => (/* binding */ userNameInput),
/* harmony export */   "paintShips": () => (/* binding */ paintShips),
/* harmony export */   "clearShips": () => (/* binding */ clearShips)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/scripts/game.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements */ "./src/scripts/elements.js");



function populateBoard(player) {
  const fleet = player.gameboard.fleet;
  paintShips(fleet);
}

function paintShips(fleet) {
  const cellPositions = getCellPositions();

  fleet.forEach((ship, index) => {
    const div = document.createElement("div");
    div.classList.add("ship");
    div.style.position = "absolute";
    div.dataset.id = index;

    const firstCo = [];

    const divWidth = document.querySelector(".grid-cell").offsetWidth;

    ship.coords.forEach((coord) => {
      firstCo.push(coord[0]);
    });

    if (firstCo[0] === firstCo[1]) {
      div.style.width = divWidth + "px";
      div.style.height = ship.length * divWidth + ship.length - 1 + "px";
    } else {
      div.style.height = divWidth + "px";
      div.style.width = ship.length * divWidth + ship.length - 1 + "px";
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
  activateElement(_elements__WEBPACK_IMPORTED_MODULE_1__.nameInputDiv);
  _elements__WEBPACK_IMPORTED_MODULE_1__.nameInput.style.boxShadow = "0px 0px 6px 3px black";
  _elements__WEBPACK_IMPORTED_MODULE_1__.nameSubmitBtn.addEventListener("click", () => {
    if (_elements__WEBPACK_IMPORTED_MODULE_1__.nameInput.value === "") {
      _elements__WEBPACK_IMPORTED_MODULE_1__.nameInput.style.backgroundColor = "#E8B4DC";
    } else {
      const p = _elements__WEBPACK_IMPORTED_MODULE_1__.playerName.querySelector("p");
      p.textContent = _elements__WEBPACK_IMPORTED_MODULE_1__.nameInput.value;
      _elements__WEBPACK_IMPORTED_MODULE_1__.nameInput.value = null;
      _elements__WEBPACK_IMPORTED_MODULE_1__.nameInputDiv.style.display = "none";
      gameSetUp();
    }
  });
}

function gameSetUp() {
  displayScores();
  positionFleet();
  createCompFleet();
}

function displayScores() {
  const scores = _elements__WEBPACK_IMPORTED_MODULE_1__.scoresBox.querySelector("p");
  scores.textContent = _game__WEBPACK_IMPORTED_MODULE_0__.game.user.gamesWon + " - " + _game__WEBPACK_IMPORTED_MODULE_0__.game.comp.gamesWon;
}

function positionFleet() {
  activateElement(_elements__WEBPACK_IMPORTED_MODULE_1__.playerArea);
  instrMsg();
  populateBoard(_game__WEBPACK_IMPORTED_MODULE_0__.game.user);
  playButton();
}

function playButton() {
  _elements__WEBPACK_IMPORTED_MODULE_1__.playBtn.style.display = "block";
  _elements__WEBPACK_IMPORTED_MODULE_1__.playBtn.addEventListener("click", playBtnHandler);
}

function playBtnHandler() {
  if (!checkForRed()) {
    _game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.fleet = [];
    getNewFleetCoords();
    console.log(_game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.fleet);
  } else if (checkForRed()) {
    alert("All ships must be green!");
  }
}

function getNewFleetCoords() {
  const ships = document.querySelectorAll(".ship");
  const cells = getCellPositions();

  ships.forEach((ship) => {
    let coords;
    const shipDivPos = ship.getBoundingClientRect();
    for (const prop in cells) {
      if (
        shipDivPos.left === cells[prop].screenPos.left &&
        shipDivPos.top === cells[prop].screenPos.top
      ) {
        coords = cells[prop].coords;
        break;
      }
    }

    if (shipDivPos.height === shipDivPos.width) {
      _game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.placeShip([coords]);
    } else {
      coords = getRectShipCoords(coords, shipDivPos);
      _game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.placeShip(coords);
    }
  });
}

function getRectShipCoords(coords, ship) {
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

  for (let i = 0; i < length - 1; i++) {
    let x = fullCoords[fullCoords.length - 1][0];
    let y = fullCoords[fullCoords.length - 1][1];
    let newCoord;

    let num = Number(fullCoords[fullCoords.length - 1][axis]);
    num == x ? (newCoord = (num += 1) + y) : (newCoord = x + (num += 1));
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

function instrMsg() {
  _elements__WEBPACK_IMPORTED_MODULE_1__.instructions.innerHTML =
    "<p>Arrange your ships in preparation for a naval battle!</p>";
  _elements__WEBPACK_IMPORTED_MODULE_1__.instructions.innerHTML +=
    "<p>The ships must all be green before you can start the game.</p>";
  _elements__WEBPACK_IMPORTED_MODULE_1__.instructions.innerHTML += "<p>(Double-click to rotate a ship.)</p>";
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
      checkProximity(elmnt);
    }
  }
}

function checkProximity(elmnt) {
  const elmntRect = elmnt.getBoundingClientRect();

  const shipZones = getShipZones(elmnt);

  for (const prop in shipZones) {
    const topBound = shipZones[prop].top;
    const leftBound = shipZones[prop].left;
    const rightBound = shipZones[prop].right;
    const bottomBound = shipZones[prop].bottom;

    if (
      (elmntRect.top < bottomBound &&
        elmntRect.left < rightBound &&
        elmntRect.top > topBound &&
        elmntRect.left > leftBound) ||
      (elmntRect.top < bottomBound &&
        elmntRect.right < rightBound &&
        elmntRect.top > topBound &&
        elmntRect.right > leftBound) ||
      (elmntRect.bottom < bottomBound &&
        elmntRect.left < rightBound &&
        elmntRect.bottom > topBound &&
        elmntRect.left > leftBound) ||
      (elmntRect.bottom < bottomBound &&
        elmntRect.right < rightBound &&
        elmntRect.bottom > topBound &&
        elmntRect.right > leftBound)
    ) {
      elmnt.classList.add("invalid-pos");

      break;
    } else {
      elmnt.classList.remove("invalid-pos");
    }
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
      cellObj.coords = cell.dataset.x + cell.dataset.y;
      cellPositions[index] = cellObj;
    });

  return cellPositions;
}

function getShipZones(elmnt) {
  const shipPositions = {};

  const cellBuffer = _elements__WEBPACK_IMPORTED_MODULE_1__.gridCell.offsetWidth;

  _elements__WEBPACK_IMPORTED_MODULE_1__.playerArea.querySelectorAll(".ship").forEach((ship, index) => {
    if (ship.dataset.id !== elmnt.dataset.id) {
      const shipObj = {};
      const shipDivPos = ship.getBoundingClientRect();
      shipObj.top = shipDivPos.top - cellBuffer;
      shipObj.left = shipDivPos.left - cellBuffer;
      shipObj.right = shipDivPos.right + cellBuffer;
      shipObj.bottom = shipDivPos.bottom + cellBuffer;
      shipPositions[index] = shipObj;
    }
  });
  return shipPositions;
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

      checkProximity(elmnt);
    }
  }
}




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
  (0,_game__WEBPACK_IMPORTED_MODULE_1__.startGame)();
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.userNameInput)();
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.renderFleet)(_game__WEBPACK_IMPORTED_MODULE_1__.game.user);
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.renderFleet)(_game__WEBPACK_IMPORTED_MODULE_1__.game.comp);
});

window.onresize = thing;

function thing() {
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.clearShips)();
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.paintShips)(_game__WEBPACK_IMPORTED_MODULE_1__.game.user.gameboard.fleet);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDZEQUFzQjtBQUN4QjtBQUNBLEVBQUUsNkRBQXNCO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSx3RUFBaUM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQkFBZ0IsbUVBQ0s7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHFCQUFxQiwyREFBb0I7O0FBRXpDLEVBQUUsa0VBQTJCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBVUU7Ozs7Ozs7VUNyY0Y7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ055QjtBQUNnQjtBQUNxQjtBQVNoRDs7QUFFZCxnRUFBeUI7QUFDekIsRUFBRSw2REFBc0I7QUFDeEIsRUFBRSxnREFBUztBQUNYLEVBQUUsa0RBQWE7QUFDZixFQUFFLGdEQUFXLENBQUMsNENBQVM7QUFDdkIsRUFBRSxnREFBVyxDQUFDLDRDQUFTO0FBQ3ZCLENBQUM7O0FBRUQ7O0FBRUE7QUFDQSxFQUFFLCtDQUFVO0FBQ1osRUFBRSwrQ0FBVSxDQUFDLDREQUF5QjtBQUN0QyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzLmNzcz8xNTUzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3VpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpO1xuY29uc3QgcGxheWVyQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpO1xuY29uc3QgY29tcEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtYm9hcmRcIik7XG5jb25zdCBwbGF5ZXJCb2FyZCA9IHBsYXllckFyZWEucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIik7XG5jb25zdCBjb21wQm9hcmQgPSBjb21wQXJlYS5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZFwiKTtcbmNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS1pbnB1dFwiKTtcbmNvbnN0IG5hbWVTdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtc3VibWl0XCIpO1xuY29uc3QgbmFtZUlucHV0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYW1lLWlucHV0LWNvbnRhaW5lclwiKTtcbmNvbnN0IHBsYXllck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lXCIpO1xuY29uc3Qgc2NvcmVzQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZXMtYm94XCIpO1xuY29uc3QgZ3JpZENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtY2VsbFwiKTtcbmNvbnN0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdHJ1Y3Rpb25zXCIpO1xuY29uc3QgcGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheVwiKTtcblxuZXhwb3J0IHtcbiAgc3RhcnRCdG4sXG4gIHBsYXllckJvYXJkLFxuICBjb21wQm9hcmQsXG4gIHBsYXllckFyZWEsXG4gIGNvbXBBcmVhLFxuICBuYW1lSW5wdXQsXG4gIG5hbWVTdWJtaXRCdG4sXG4gIG5hbWVJbnB1dERpdixcbiAgcGxheWVyTmFtZSxcbiAgc2NvcmVzQm94LFxuICBncmlkQ2VsbCxcbiAgaW5zdHJ1Y3Rpb25zLFxuICBwbGF5QnRuLFxufTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuXG5jb25zdCBnYW1lID0ge1xuICB1c2VyOiBudWxsLFxuICBjb21wOiBudWxsLFxufTtcblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBnYW1lLnVzZXIgPSBQbGF5ZXIoXCJwbGFjZWhvbGRlclwiKTtcbiAgZ2FtZS5jb21wID0gUGxheWVyKFwiY29tcHV0ZXJcIik7XG4gIGdhbWUudXNlci5nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgZ2FtZS5jb21wLmdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuXG4gIGdhbWUudXNlci5jcmVhdGVGbGVldCgpO1xuICBnYW1lLmNvbXAuY3JlYXRlRmxlZXQoKTtcbn1cblxuZXhwb3J0IHsgZ2FtZSwgc3RhcnRHYW1lIH07XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcbiAgcmV0dXJuIHtcbiAgICBmbGVldDogW10sXG4gICAgbWlzc2VkU2hvdHM6IFtdLFxuICAgIGZsZWV0U3RhdHVzOiBbXSxcblxuICAgIGRlbW86IG51bGwsXG5cbiAgICBwbGFjZVNoaXAobmFtZSwgY29vcmRzKSB7XG4gICAgICBjb25zdCBuZXdTaGlwID0gU2hpcChuYW1lLCBjb29yZHMpO1xuXG4gICAgICAvLyBuZXdTaGlwLmNvb3Jkcy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgLy8gICBjb25zdCBwb3NBcnJheSA9IE9iamVjdC5rZXlzKHRoaXMuYm9hcmRQb3NpdGlvbnMpO1xuICAgICAgLy8gICBjb25zdCBwb3NpdGlvbiA9IHBvc0FycmF5LmZpbmQoKHBvcykgPT4gcG9zID09PSBjb29yZCk7XG4gICAgICAvLyAgIHRoaXMuYm9hcmRQb3NpdGlvbnNbcG9zaXRpb25dID0gdHJ1ZTtcbiAgICAgIC8vIH0pO1xuXG4gICAgICB0aGlzLmZsZWV0LnB1c2gobmV3U2hpcCk7XG4gICAgICB0aGlzLmZsZWV0W3RoaXMuZmxlZXQubGVuZ3RoIC0gMV0uaWQgPSB0aGlzLmZsZWV0Lmxlbmd0aCAtIDE7XG4gICAgfSxcblxuICAgIHJlY2VpdmVBdHRhY2socG9zKSB7XG4gICAgICBsZXQgaGl0ID0gZmFsc2U7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMuZmxlZXQubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmZsZWV0W2ldLmNvb3Jkcy5pbmNsdWRlcyhwb3MpKSB7XG4gICAgICAgICAgdGhpcy5mbGVldFtpXS5oaXQocG9zKTtcbiAgICAgICAgICBoaXQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghaGl0KSB7XG4gICAgICAgIHRoaXMubWlzc2VkU2hvdHMucHVzaChwb3MpO1xuICAgICAgfVxuICAgICAgdGhpcy5kZW1vID0gcG9zO1xuICAgIH0sXG5cbiAgICBjaGVja0ZsZWV0U3RhdHVzKCkge1xuICAgICAgdGhpcy5mbGVldFN0YXR1cyA9IFtdO1xuXG4gICAgICB0aGlzLmZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgaWYgKHNoaXAuc3RhdHVzID09PSBcInN1bmtcIikge1xuICAgICAgICAgIHRoaXMuZmxlZXRTdGF0dXMucHVzaChcInN1bmtcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBpZiAodGhpcy5mbGVldFN0YXR1cy5sZW5ndGggPT09IHRoaXMuZmxlZXQubGVuZ3RoKSB7XG4gICAgICAvLyAgIGFsZXJ0KFwiZXZlcnl0aGluZyBpcyBzdW5rXCIpO1xuICAgICAgLy8gfVxuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCB7IGdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5mdW5jdGlvbiBQbGF5ZXIobmFtZSkge1xuICBjb25zdCBwcm90byA9IHtcbiAgICBkZW1vOiBbXSxcblxuICAgIHNlbmRBdHRhY2soKSB7XG4gICAgICBsZXQgY29vcmQgPSB0aGlzLmdldFJhbmRvbUNvb3JkKDEwKTtcblxuICAgICAgaWYgKHRoaXMuY2hlY2tQcmV2aW91c01vdmVzKGNvb3JkKSkge1xuICAgICAgICB0aGlzLnNlbmRBdHRhY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdhbWUudXNlci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGdldFJhbmRvbUNvb3JkKGZhY3Rvcikge1xuICAgICAgY29uc3QgeCA9IHRoaXMuZ2V0UmFuZG9tSW50KGZhY3RvcikudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IHkgPSB0aGlzLmdldFJhbmRvbUludChmYWN0b3IpLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCBjb29yZCA9IHggKyB5O1xuICAgICAgcmV0dXJuIGNvb3JkO1xuICAgIH0sXG5cbiAgICBnZXRTdGFydENvb3JkKGxlbmd0aCwgYXhpcykge1xuICAgICAgY29uc3QgY29vcmQgPSB0aGlzLmdldFJhbmRvbUNvb3JkKDEwKTtcblxuICAgICAgaWYgKGNvb3JkW2F4aXNdID4gMTAgLSBsZW5ndGggfHwgdGhpcy5jaGVja0ZvckR1cGxpY2F0ZShjb29yZCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhcnRDb29yZChsZW5ndGgsIGF4aXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBjaGVja0ZvckR1cGxpY2F0ZShjb29yZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2FtZWJvYXJkLmZsZWV0LnNvbWUoKHNoaXApID0+IHtcbiAgICAgICAgcmV0dXJuIHNoaXAuY29vcmRzLnNvbWUoKGl0ZW0pID0+IGl0ZW0gPT0gY29vcmQpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNyZWF0ZUZsZWV0KCkge1xuICAgICAgbGV0IGZsZWV0ID0gW107XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgIGdlbmVyYXRlU2hpcENvb3JkcyhcImNhcnJpZXJcIiwgNSk7XG4gICAgICBnZW5lcmF0ZVNoaXBDb29yZHMoXCJiYXR0bGVzaGlwXCIsIDQpO1xuICAgICAgZ2VuZXJhdGVTaGlwQ29vcmRzKFwiY3J1aXNlclwiLCAzKTtcbiAgICAgIGdlbmVyYXRlU2hpcENvb3JkcyhcInN1Ym1hcmluZVwiLCAzKTtcbiAgICAgIGdlbmVyYXRlU2hpcENvb3JkcyhcImRlc3Ryb3llclwiLCAyKTtcblxuICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVTaGlwQ29vcmRzKG5hbWUsIGxlbmd0aCkge1xuICAgICAgICBjb25zdCBheGlzID0gc2VsZi5nZXRSYW5kb21JbnQoMik7XG5cbiAgICAgICAgbGV0IGNvb3JkID0gc2VsZi5nZXRTdGFydENvb3JkKGxlbmd0aCwgYXhpcyk7XG5cbiAgICAgICAgY29vcmQgPSBbY29vcmRdO1xuXG4gICAgICAgIGxldCBhZGRBeGlzID0gMDtcbiAgICAgICAgbGV0IHNhbWVBeGlzID0gMDtcblxuICAgICAgICBheGlzID09IDAgPyAoc2FtZUF4aXMgPSAxKSA6IChhZGRBeGlzID0gMSk7XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgICBsZXQgbmV3Q29vcmQ7XG5cbiAgICAgICAgICBsZXQgbnVtID0gTnVtYmVyKGNvb3JkW2Nvb3JkLmxlbmd0aCAtIDFdW2FkZEF4aXNdKTtcblxuICAgICAgICAgIGF4aXMgPT0gMFxuICAgICAgICAgICAgPyAobmV3Q29vcmQgPSAobnVtICs9IDEpICsgY29vcmRbY29vcmQubGVuZ3RoIC0gMV1bc2FtZUF4aXNdKVxuICAgICAgICAgICAgOiAobmV3Q29vcmQgPSBjb29yZFtjb29yZC5sZW5ndGggLSAxXVtzYW1lQXhpc10gKyAobnVtICs9IDEpKTtcblxuICAgICAgICAgIHNlbGYuY2hlY2tGb3JEdXBsaWNhdGUobmV3Q29vcmQpXG4gICAgICAgICAgICA/IGdlbmVyYXRlU2hpcENvb3JkcyhuYW1lLCBsZW5ndGgpXG4gICAgICAgICAgICA6IGNvb3JkLnB1c2gobmV3Q29vcmQpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuZ2FtZWJvYXJkLnBsYWNlU2hpcChuYW1lLCBjb29yZCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrUHJldmlvdXNNb3Zlcyhjb29yZCkge1xuICAgICAgY29uc3QgaGl0cyA9IFtdO1xuICAgICAgY29uc3QgbWlzc2VkID0gZ2FtZS51c2VyLmdhbWVib2FyZC5taXNzZWRTaG90cztcblxuICAgICAgZ2FtZS51c2VyLmdhbWVib2FyZC5mbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIHNoaXAuaGl0cy5mb3JFYWNoKChoaXQpID0+IHtcbiAgICAgICAgICBoaXRzLnB1c2goaGl0KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgbWlzc2VkLmZvckVhY2goKG1pc3MpID0+IHtcbiAgICAgICAgaGl0cy5wdXNoKG1pc3MpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChoaXRzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0UmFuZG9tSW50KGZhY3Rvcikge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZhY3Rvcik7XG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvKTtcblxuICBvYmoubmFtZSA9IG5hbWU7XG4gIG9iai5nYW1lc1dvbiA9IDA7XG4gIG9iai5nYW1lYm9hcmQgPSBudWxsO1xuICBvYmoudHJhY2tHcmlkID0gbnVsbDtcblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJmdW5jdGlvbiBTaGlwKG5hbWUsIGNvb3Jkcykge1xuICBjb25zdCBwcm90byA9IHtcbiAgICBoaXQobnVtYmVyKSB7XG4gICAgICBpZiAodGhpcy5jb29yZHMuaW5jbHVkZXMobnVtYmVyKSAmJiAhdGhpcy5oaXRzLmluY2x1ZGVzKG51bWJlcikpIHtcbiAgICAgICAgdGhpcy5oaXRzLnB1c2gobnVtYmVyKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNTdW5rKCkge1xuICAgICAgY29uc3Qgc3VuayA9IHRoaXMuaGl0cy5ldmVyeSgoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb29yZHMuaW5jbHVkZXMoaXRlbSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHN1bmsgPT09IHRydWUgJiYgdGhpcy5oaXRzLmxlbmd0aCA9PT0gdGhpcy5jb29yZHMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJzdW5rXCI7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvKTtcblxuICBvYmoubmFtZSA9IG5hbWU7XG4gIG9iai5jb29yZHMgPSBjb29yZHM7XG4gIG9iai5sZW5ndGggPSBjb29yZHMubGVuZ3RoO1xuICBvYmouaGl0cyA9IFtdO1xuICBvYmouc3RhdHVzID0gXCJ1bnN1bmtcIjtcblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiaW1wb3J0IHsgc3RhcnRHYW1lLCBnYW1lLCBnZXRSYW5kb21JbnQgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQge1xuICBwbGF5ZXJCb2FyZCxcbiAgY29tcEJvYXJkLFxuICBwbGF5ZXJBcmVhLFxuICBjb21wQXJlYSxcbiAgbmFtZUlucHV0LFxuICBuYW1lU3VibWl0QnRuLFxuICBuYW1lSW5wdXREaXYsXG4gIHBsYXllck5hbWUsXG4gIHNjb3Jlc0JveCxcbiAgZ3JpZENlbGwsXG4gIGluc3RydWN0aW9ucyxcbiAgcGxheUJ0bixcbn0gZnJvbSBcIi4vZWxlbWVudHNcIjtcblxuZnVuY3Rpb24gcG9wdWxhdGVCb2FyZChwbGF5ZXIpIHtcbiAgY29uc3QgZmxlZXQgPSBwbGF5ZXIuZ2FtZWJvYXJkLmZsZWV0O1xuICBwYWludFNoaXBzKGZsZWV0KTtcbn1cblxuZnVuY3Rpb24gcGFpbnRTaGlwcyhmbGVldCkge1xuICBjb25zdCBjZWxsUG9zaXRpb25zID0gZ2V0Q2VsbFBvc2l0aW9ucygpO1xuXG4gIGZsZWV0LmZvckVhY2goKHNoaXAsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIGRpdi5kYXRhc2V0LmlkID0gaW5kZXg7XG5cbiAgICBjb25zdCBmaXJzdENvID0gW107XG5cbiAgICBjb25zdCBkaXZXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC1jZWxsXCIpLm9mZnNldFdpZHRoO1xuXG4gICAgc2hpcC5jb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGZpcnN0Q28ucHVzaChjb29yZFswXSk7XG4gICAgfSk7XG5cbiAgICBpZiAoZmlyc3RDb1swXSA9PT0gZmlyc3RDb1sxXSkge1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gZGl2V2lkdGggKyBcInB4XCI7XG4gICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gc2hpcC5sZW5ndGggKiBkaXZXaWR0aCArIHNoaXAubGVuZ3RoIC0gMSArIFwicHhcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgZGl2LnN0eWxlLmhlaWdodCA9IGRpdldpZHRoICsgXCJweFwiO1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gc2hpcC5sZW5ndGggKiBkaXZXaWR0aCArIHNoaXAubGVuZ3RoIC0gMSArIFwicHhcIjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gY2VsbFBvc2l0aW9ucykge1xuICAgICAgaWYgKGNlbGxQb3NpdGlvbnNbcHJvcF0uY29vcmRzID09IHNoaXAuY29vcmRzWzBdKSB7XG4gICAgICAgIGRpdi5zdHlsZS50b3AgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy50b3AgKyBcInB4XCI7XG4gICAgICAgIGRpdi5zdHlsZS5sZWZ0ID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MubGVmdCArIFwicHhcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgcGxheWVyQXJlYS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIGRyYWdFbGVtZW50KGRpdik7XG4gICAgcm90YXRlU2hpcChkaXYpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJTaGlwcygpIHtcbiAgY29uc3Qgc2hpcHMgPSBwbGF5ZXJBcmVhLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJGbGVldChwbGF5ZXIpIHtcbiAgbGV0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwbGF5ZXIuc2VsZWN0b3IpO1xuXG4gIHBsYXllci5nYW1lYm9hcmQuZmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGNvbnN0IHNoaXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZChcInNoaXAtaWNvblwiKTtcbiAgICBzaGlwRGl2LnN0eWxlLmhlaWdodCA9IFwiNXB4XCI7XG4gICAgc2hpcERpdi5zdHlsZS53aWR0aCA9IHNoaXAubGVuZ3RoICogNSArIFwicHhcIjtcblxuICAgIGJvYXJkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWxlbmd0aD0nJHtzaGlwLmxlbmd0aH0nXWApLmFwcGVuZENoaWxkKHNoaXBEaXYpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWN0aXZhdGVFbGVtZW50KGVsZW1lbnQpIHtcbiAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gIGVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xufVxuXG5mdW5jdGlvbiBkZWFjdGl2YXRlRWxlbWVudChlbGVtZW50KSB7XG4gIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiMC4zXCI7XG4gIGVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xufVxuXG5mdW5jdGlvbiB1c2VyTmFtZUlucHV0KCkge1xuICBhY3RpdmF0ZUVsZW1lbnQobmFtZUlucHV0RGl2KTtcbiAgbmFtZUlucHV0LnN0eWxlLmJveFNoYWRvdyA9IFwiMHB4IDBweCA2cHggM3B4IGJsYWNrXCI7XG4gIG5hbWVTdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAobmFtZUlucHV0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgICBuYW1lSW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjRThCNERDXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHAgPSBwbGF5ZXJOYW1lLnF1ZXJ5U2VsZWN0b3IoXCJwXCIpO1xuICAgICAgcC50ZXh0Q29udGVudCA9IG5hbWVJbnB1dC52YWx1ZTtcbiAgICAgIG5hbWVJbnB1dC52YWx1ZSA9IG51bGw7XG4gICAgICBuYW1lSW5wdXREaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgZ2FtZVNldFVwKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2FtZVNldFVwKCkge1xuICBkaXNwbGF5U2NvcmVzKCk7XG4gIHBvc2l0aW9uRmxlZXQoKTtcbiAgY3JlYXRlQ29tcEZsZWV0KCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTY29yZXMoKSB7XG4gIGNvbnN0IHNjb3JlcyA9IHNjb3Jlc0JveC5xdWVyeVNlbGVjdG9yKFwicFwiKTtcbiAgc2NvcmVzLnRleHRDb250ZW50ID0gZ2FtZS51c2VyLmdhbWVzV29uICsgXCIgLSBcIiArIGdhbWUuY29tcC5nYW1lc1dvbjtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25GbGVldCgpIHtcbiAgYWN0aXZhdGVFbGVtZW50KHBsYXllckFyZWEpO1xuICBpbnN0ck1zZygpO1xuICBwb3B1bGF0ZUJvYXJkKGdhbWUudXNlcik7XG4gIHBsYXlCdXR0b24oKTtcbn1cblxuZnVuY3Rpb24gcGxheUJ1dHRvbigpIHtcbiAgcGxheUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICBwbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5QnRuSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIHBsYXlCdG5IYW5kbGVyKCkge1xuICBpZiAoIWNoZWNrRm9yUmVkKCkpIHtcbiAgICBnYW1lLnVzZXIuZ2FtZWJvYXJkLmZsZWV0ID0gW107XG4gICAgZ2V0TmV3RmxlZXRDb29yZHMoKTtcbiAgICBjb25zb2xlLmxvZyhnYW1lLnVzZXIuZ2FtZWJvYXJkLmZsZWV0KTtcbiAgfSBlbHNlIGlmIChjaGVja0ZvclJlZCgpKSB7XG4gICAgYWxlcnQoXCJBbGwgc2hpcHMgbXVzdCBiZSBncmVlbiFcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0TmV3RmxlZXRDb29yZHMoKSB7XG4gIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xuICBjb25zdCBjZWxscyA9IGdldENlbGxQb3NpdGlvbnMoKTtcblxuICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgbGV0IGNvb3JkcztcbiAgICBjb25zdCBzaGlwRGl2UG9zID0gc2hpcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gY2VsbHMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgc2hpcERpdlBvcy5sZWZ0ID09PSBjZWxsc1twcm9wXS5zY3JlZW5Qb3MubGVmdCAmJlxuICAgICAgICBzaGlwRGl2UG9zLnRvcCA9PT0gY2VsbHNbcHJvcF0uc2NyZWVuUG9zLnRvcFxuICAgICAgKSB7XG4gICAgICAgIGNvb3JkcyA9IGNlbGxzW3Byb3BdLmNvb3JkcztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNoaXBEaXZQb3MuaGVpZ2h0ID09PSBzaGlwRGl2UG9zLndpZHRoKSB7XG4gICAgICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbY29vcmRzXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvb3JkcyA9IGdldFJlY3RTaGlwQ29vcmRzKGNvb3Jkcywgc2hpcERpdlBvcyk7XG4gICAgICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChjb29yZHMpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFJlY3RTaGlwQ29vcmRzKGNvb3Jkcywgc2hpcCkge1xuICBjb25zdCBjZWxsV2lkdGggPSBncmlkQ2VsbC5vZmZzZXRXaWR0aDtcbiAgbGV0IGF4aXM7XG4gIGxldCBsZW5ndGg7XG4gIGxldCBmdWxsQ29vcmRzID0gW2Nvb3Jkc107XG5cbiAgaWYgKHNoaXAuaGVpZ2h0ID4gc2hpcC53aWR0aCkge1xuICAgIGF4aXMgPSAxO1xuICAgIGxlbmd0aCA9IE1hdGgucm91bmQoc2hpcC5oZWlnaHQgLyBjZWxsV2lkdGgpO1xuICB9IGVsc2Uge1xuICAgIGF4aXMgPSAwO1xuICAgIGxlbmd0aCA9IE1hdGgucm91bmQoc2hpcC53aWR0aCAvIGNlbGxXaWR0aCk7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xuICAgIGxldCB4ID0gZnVsbENvb3Jkc1tmdWxsQ29vcmRzLmxlbmd0aCAtIDFdWzBdO1xuICAgIGxldCB5ID0gZnVsbENvb3Jkc1tmdWxsQ29vcmRzLmxlbmd0aCAtIDFdWzFdO1xuICAgIGxldCBuZXdDb29yZDtcblxuICAgIGxldCBudW0gPSBOdW1iZXIoZnVsbENvb3Jkc1tmdWxsQ29vcmRzLmxlbmd0aCAtIDFdW2F4aXNdKTtcbiAgICBudW0gPT0geCA/IChuZXdDb29yZCA9IChudW0gKz0gMSkgKyB5KSA6IChuZXdDb29yZCA9IHggKyAobnVtICs9IDEpKTtcbiAgICBmdWxsQ29vcmRzLnB1c2gobmV3Q29vcmQpO1xuICB9XG4gIHJldHVybiBmdWxsQ29vcmRzO1xufVxuXG5mdW5jdGlvbiBjaGVja0ZvclJlZCgpIHtcbiAgbGV0IHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmludmFsaWQtcG9zXCIpO1xuXG4gIGlmIChzaGlwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluc3RyTXNnKCkge1xuICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID1cbiAgICBcIjxwPkFycmFuZ2UgeW91ciBzaGlwcyBpbiBwcmVwYXJhdGlvbiBmb3IgYSBuYXZhbCBiYXR0bGUhPC9wPlwiO1xuICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MICs9XG4gICAgXCI8cD5UaGUgc2hpcHMgbXVzdCBhbGwgYmUgZ3JlZW4gYmVmb3JlIHlvdSBjYW4gc3RhcnQgdGhlIGdhbWUuPC9wPlwiO1xuICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MICs9IFwiPHA+KERvdWJsZS1jbGljayB0byByb3RhdGUgYSBzaGlwLik8L3A+XCI7XG59XG5cbmZ1bmN0aW9uIGRyYWdFbGVtZW50KGVsbW50KSB7XG4gIGxldCBwb3MxID0gMCxcbiAgICBwb3MyID0gMCxcbiAgICBwb3MzID0gMCxcbiAgICBwb3M0ID0gMDtcblxuICBlbG1udC5vbm1vdXNlZG93biA9IGRyYWdNb3VzZURvd247XG5cbiAgY29uc3QgYm9hcmQgPSBnZXRCb3JkZXIoKTtcblxuICBmdW5jdGlvbiBkcmFnTW91c2VEb3duKGUpIHtcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHBvczMgPSBlLmNsaWVudFg7XG4gICAgcG9zNCA9IGUuY2xpZW50WTtcbiAgICBkb2N1bWVudC5vbm1vdXNldXAgPSAoKSA9PiB7XG4gICAgICBjbG9zZURyYWdFbGVtZW50KGVsbW50KTtcbiAgICB9O1xuICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gZWxlbWVudERyYWc7XG4gIH1cblxuICBmdW5jdGlvbiBlbGVtZW50RHJhZyhlKSB7XG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBwb3MxID0gcG9zMyAtIGUuY2xpZW50WDtcbiAgICBwb3MyID0gcG9zNCAtIGUuY2xpZW50WTtcblxuICAgIHBvczMgPSBlLmNsaWVudFg7XG4gICAgcG9zNCA9IGUuY2xpZW50WTtcblxuICAgIGtlZXBJbkJvdW5kcyhlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRG93bkRyYWcoZSkge1xuICAgIGlmIChlLmNsaWVudFkgPiBwb3M0KSB7XG4gICAgICByZXR1cm4gZS5jbGllbnRZIC0gcG9zNDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrUmlnaHREcmFnKGUpIHtcbiAgICBpZiAoZS5jbGllbnRYID4gcG9zMykge1xuICAgICAgcmV0dXJuIGUuY2xpZW50WCAtIHBvczM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0xlZnREcmFnKGUpIHtcbiAgICBpZiAoZS5jbGllbnRYIDwgcG9zMykge1xuICAgICAgcmV0dXJuIHBvczMgLSBlLmNsaWVudFg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1VwRHJhZyhlKSB7XG4gICAgaWYgKGUuY2xpZW50WSA8IHBvczQpIHtcbiAgICAgIHJldHVybiBwb3M0IC0gZS5jbGllbnRZO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24ga2VlcEluQm91bmRzKGUpIHtcbiAgICBpZiAoIWNoZWNrUG9zaXRpb24oZWxtbnQpKSB7XG4gICAgICBlbG1udC5zdHlsZS50b3AgPSBlbG1udC5vZmZzZXRUb3AgLSBwb3MyICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IGVsbW50Lm9mZnNldExlZnQgLSBwb3MxICsgXCJweFwiO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tQb3NpdGlvbihlbG1udCkgPT09IFwidG9wXCIpIHtcbiAgICAgIGVsbW50LnN0eWxlLnRvcCA9IGJvYXJkLnRvcCArIGNoZWNrRG93bkRyYWcoZSkgKyBcInB4XCI7XG4gICAgICBlbG1udC5zdHlsZS5sZWZ0ID0gZWxtbnQub2Zmc2V0TGVmdCAtIHBvczEgKyBcInB4XCI7XG4gICAgfSBlbHNlIGlmIChjaGVja1Bvc2l0aW9uKGVsbW50KSA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgIGVsbW50LnN0eWxlLnRvcCA9IGVsbW50Lm9mZnNldFRvcCAtIHBvczIgKyBcInB4XCI7XG4gICAgICBlbG1udC5zdHlsZS5sZWZ0ID0gYm9hcmQubGVmdCArIGNoZWNrUmlnaHREcmFnKGUpICsgXCJweFwiO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tQb3NpdGlvbihlbG1udCkgPT09IFwicmlnaHRcIikge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID0gZWxtbnQub2Zmc2V0VG9wIC0gcG9zMiArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmxlZnQgPVxuICAgICAgICBib2FyZC5yaWdodCAtIGVsbW50Lm9mZnNldFdpZHRoIC0gY2hlY2tMZWZ0RHJhZyhlKSArIFwicHhcIjtcbiAgICB9IGVsc2UgaWYgKGNoZWNrUG9zaXRpb24oZWxtbnQpID09PSBcImJvdHRvbVwiKSB7XG4gICAgICBlbG1udC5zdHlsZS50b3AgPVxuICAgICAgICBib2FyZC5ib3R0b20gLSBlbG1udC5vZmZzZXRIZWlnaHQgLSBjaGVja1VwRHJhZyhlKSArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmxlZnQgPSBlbG1udC5vZmZzZXRMZWZ0IC0gcG9zMSArIFwicHhcIjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1Bvc2l0aW9uKGVsbW50KSB7XG4gICAgY29uc3QgZWxtbnRSZWN0ID0gZWxtbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBpZiAoZWxtbnRSZWN0LnRvcCA8IGJvYXJkLnRvcCkge1xuICAgICAgcmV0dXJuIFwidG9wXCI7XG4gICAgfSBlbHNlIGlmIChlbG1udFJlY3QubGVmdCA8IGJvYXJkLmxlZnQpIHtcbiAgICAgIHJldHVybiBcImxlZnRcIjtcbiAgICB9IGVsc2UgaWYgKGVsbW50UmVjdC5yaWdodCA+IGJvYXJkLnJpZ2h0KSB7XG4gICAgICByZXR1cm4gXCJyaWdodFwiO1xuICAgIH0gZWxzZSBpZiAoZWxtbnRSZWN0LmJvdHRvbSA+IGJvYXJkLmJvdHRvbSkge1xuICAgICAgcmV0dXJuIFwiYm90dG9tXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZURyYWdFbGVtZW50KGVsbW50KSB7XG4gICAgZ3JpZFNuYXAoZWxtbnQpO1xuICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9IG51bGw7XG4gICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZVNoaXAoZWxtbnQpIHtcbiAgZWxtbnQub25kYmxjbGljayA9IHJvdGF0ZTtcblxuICBmdW5jdGlvbiByb3RhdGUoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBnZXRCb3JkZXIoKTtcblxuICAgIGNvbnN0IGVsbW50UmVjdCA9IGVsbW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgY29uc3QgZnV0dXJlUmlnaHQgPSBlbG1udFJlY3QubGVmdCArIGVsbW50UmVjdC5oZWlnaHQ7XG4gICAgY29uc3QgZnV0dXJlQm90dG9tID0gZWxtbnRSZWN0LnRvcCArIGVsbW50UmVjdC53aWR0aDtcblxuICAgIGlmICghKGZ1dHVyZVJpZ2h0IC0gMSA+IGJvYXJkLnJpZ2h0IHx8IGZ1dHVyZUJvdHRvbSAtIDEgPiBib2FyZC5ib3R0b20pKSB7XG4gICAgICBlbG1udC5zdHlsZS53aWR0aCA9IGVsbW50UmVjdC5oZWlnaHQgKyBcInB4XCI7XG4gICAgICBlbG1udC5zdHlsZS5oZWlnaHQgPSBlbG1udFJlY3Qud2lkdGggKyBcInB4XCI7XG4gICAgICBjaGVja1Byb3hpbWl0eShlbG1udCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrUHJveGltaXR5KGVsbW50KSB7XG4gIGNvbnN0IGVsbW50UmVjdCA9IGVsbW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIGNvbnN0IHNoaXBab25lcyA9IGdldFNoaXBab25lcyhlbG1udCk7XG5cbiAgZm9yIChjb25zdCBwcm9wIGluIHNoaXBab25lcykge1xuICAgIGNvbnN0IHRvcEJvdW5kID0gc2hpcFpvbmVzW3Byb3BdLnRvcDtcbiAgICBjb25zdCBsZWZ0Qm91bmQgPSBzaGlwWm9uZXNbcHJvcF0ubGVmdDtcbiAgICBjb25zdCByaWdodEJvdW5kID0gc2hpcFpvbmVzW3Byb3BdLnJpZ2h0O1xuICAgIGNvbnN0IGJvdHRvbUJvdW5kID0gc2hpcFpvbmVzW3Byb3BdLmJvdHRvbTtcblxuICAgIGlmIChcbiAgICAgIChlbG1udFJlY3QudG9wIDwgYm90dG9tQm91bmQgJiZcbiAgICAgICAgZWxtbnRSZWN0LmxlZnQgPCByaWdodEJvdW5kICYmXG4gICAgICAgIGVsbW50UmVjdC50b3AgPiB0b3BCb3VuZCAmJlxuICAgICAgICBlbG1udFJlY3QubGVmdCA+IGxlZnRCb3VuZCkgfHxcbiAgICAgIChlbG1udFJlY3QudG9wIDwgYm90dG9tQm91bmQgJiZcbiAgICAgICAgZWxtbnRSZWN0LnJpZ2h0IDwgcmlnaHRCb3VuZCAmJlxuICAgICAgICBlbG1udFJlY3QudG9wID4gdG9wQm91bmQgJiZcbiAgICAgICAgZWxtbnRSZWN0LnJpZ2h0ID4gbGVmdEJvdW5kKSB8fFxuICAgICAgKGVsbW50UmVjdC5ib3R0b20gPCBib3R0b21Cb3VuZCAmJlxuICAgICAgICBlbG1udFJlY3QubGVmdCA8IHJpZ2h0Qm91bmQgJiZcbiAgICAgICAgZWxtbnRSZWN0LmJvdHRvbSA+IHRvcEJvdW5kICYmXG4gICAgICAgIGVsbW50UmVjdC5sZWZ0ID4gbGVmdEJvdW5kKSB8fFxuICAgICAgKGVsbW50UmVjdC5ib3R0b20gPCBib3R0b21Cb3VuZCAmJlxuICAgICAgICBlbG1udFJlY3QucmlnaHQgPCByaWdodEJvdW5kICYmXG4gICAgICAgIGVsbW50UmVjdC5ib3R0b20gPiB0b3BCb3VuZCAmJlxuICAgICAgICBlbG1udFJlY3QucmlnaHQgPiBsZWZ0Qm91bmQpXG4gICAgKSB7XG4gICAgICBlbG1udC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1wb3NcIik7XG5cbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbG1udC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1wb3NcIik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEJvcmRlcigpIHtcbiAgY29uc3QgaW5mbyA9IHBsYXllckJvYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4ge1xuICAgIHRvcDogTWF0aC5yb3VuZChpbmZvLnRvcCksXG4gICAgbGVmdDogTWF0aC5yb3VuZChpbmZvLmxlZnQpLFxuICAgIHJpZ2h0OiBNYXRoLnJvdW5kKGluZm8ucmlnaHQpLFxuICAgIGJvdHRvbTogTWF0aC5yb3VuZChpbmZvLmJvdHRvbSksXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldENlbGxQb3NpdGlvbnMoKSB7XG4gIGNvbnN0IGNlbGxQb3NpdGlvbnMgPSB7fTtcblxuICBjb25zdCBjZWxscyA9IHBsYXllckJvYXJkXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpXG4gICAgLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjZWxsT2JqID0ge307XG4gICAgICBjZWxsT2JqLnNjcmVlblBvcyA9IGNlbGwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjZWxsT2JqLmNvb3JkcyA9IGNlbGwuZGF0YXNldC54ICsgY2VsbC5kYXRhc2V0Lnk7XG4gICAgICBjZWxsUG9zaXRpb25zW2luZGV4XSA9IGNlbGxPYmo7XG4gICAgfSk7XG5cbiAgcmV0dXJuIGNlbGxQb3NpdGlvbnM7XG59XG5cbmZ1bmN0aW9uIGdldFNoaXBab25lcyhlbG1udCkge1xuICBjb25zdCBzaGlwUG9zaXRpb25zID0ge307XG5cbiAgY29uc3QgY2VsbEJ1ZmZlciA9IGdyaWRDZWxsLm9mZnNldFdpZHRoO1xuXG4gIHBsYXllckFyZWEucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpLmZvckVhY2goKHNoaXAsIGluZGV4KSA9PiB7XG4gICAgaWYgKHNoaXAuZGF0YXNldC5pZCAhPT0gZWxtbnQuZGF0YXNldC5pZCkge1xuICAgICAgY29uc3Qgc2hpcE9iaiA9IHt9O1xuICAgICAgY29uc3Qgc2hpcERpdlBvcyA9IHNoaXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBzaGlwT2JqLnRvcCA9IHNoaXBEaXZQb3MudG9wIC0gY2VsbEJ1ZmZlcjtcbiAgICAgIHNoaXBPYmoubGVmdCA9IHNoaXBEaXZQb3MubGVmdCAtIGNlbGxCdWZmZXI7XG4gICAgICBzaGlwT2JqLnJpZ2h0ID0gc2hpcERpdlBvcy5yaWdodCArIGNlbGxCdWZmZXI7XG4gICAgICBzaGlwT2JqLmJvdHRvbSA9IHNoaXBEaXZQb3MuYm90dG9tICsgY2VsbEJ1ZmZlcjtcbiAgICAgIHNoaXBQb3NpdGlvbnNbaW5kZXhdID0gc2hpcE9iajtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc2hpcFBvc2l0aW9ucztcbn1cblxuZnVuY3Rpb24gZ3JpZFNuYXAoZWxtbnQpIHtcbiAgY29uc3QgY2VsbFBvc2l0aW9ucyA9IGdldENlbGxQb3NpdGlvbnMoXCIucGxheWVyLWJvYXJkXCIpO1xuXG4gIGNvbnN0IGVsbW50UG9zID0gZWxtbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgZm9yIChjb25zdCBwcm9wIGluIGNlbGxQb3NpdGlvbnMpIHtcbiAgICBjb25zdCB4TG93ZXIgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy54IC0gMjU7XG4gICAgY29uc3QgeUxvd2VyID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MueSAtIDI1O1xuICAgIGNvbnN0IHhMaW1pdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLnggKyAyNTtcbiAgICBjb25zdCB5TGltaXQgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy55ICsgMjU7XG5cbiAgICBpZiAoXG4gICAgICBlbG1udFBvcy54ID49IHhMb3dlciAmJlxuICAgICAgZWxtbnRQb3MueSA+PSB5TG93ZXIgJiZcbiAgICAgIGVsbW50UG9zLnggPD0geExpbWl0ICYmXG4gICAgICBlbG1udFBvcy55IDw9IHlMaW1pdFxuICAgICkge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MudG9wICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLmxlZnQgKyBcInB4XCI7XG5cbiAgICAgIGVsbW50LmRhdGFzZXQueCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uY29vcmRzWzBdO1xuICAgICAgZWxtbnQuZGF0YXNldC55ID0gY2VsbFBvc2l0aW9uc1twcm9wXS5jb29yZHNbMV07XG5cbiAgICAgIGNoZWNrUHJveGltaXR5KGVsbW50KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgcG9wdWxhdGVCb2FyZCxcbiAgYWN0aXZhdGVFbGVtZW50LFxuICBkcmFnRWxlbWVudCxcbiAgcmVuZGVyRmxlZXQsXG4gIHVzZXJOYW1lSW5wdXQsXG4gIHBhaW50U2hpcHMsXG4gIGNsZWFyU2hpcHMsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuLy4uL3N0eWxlcy5jc3NcIjtcbmltcG9ydCB7IGdhbWUsIHN0YXJ0R2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IHN0YXJ0QnRuLCBwbGF5ZXJCb2FyZCwgY29tcEJvYXJkIH0gZnJvbSBcIi4vZWxlbWVudHNcIjtcbmltcG9ydCB7XG4gIHBvcHVsYXRlQm9hcmQsXG4gIGFjdGl2YXRlRWxlbWVudCxcbiAgZHJhZ0VsZW1lbnQsXG4gIHJlbmRlckZsZWV0LFxuICB1c2VyTmFtZUlucHV0LFxuICBwYWludFNoaXBzLFxuICBjbGVhclNoaXBzLFxufSBmcm9tIFwiLi91aVwiO1xuXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBzdGFydEJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIHN0YXJ0R2FtZSgpO1xuICB1c2VyTmFtZUlucHV0KCk7XG4gIHJlbmRlckZsZWV0KGdhbWUudXNlcik7XG4gIHJlbmRlckZsZWV0KGdhbWUuY29tcCk7XG59KTtcblxud2luZG93Lm9ucmVzaXplID0gdGhpbmc7XG5cbmZ1bmN0aW9uIHRoaW5nKCkge1xuICBjbGVhclNoaXBzKCk7XG4gIHBhaW50U2hpcHMoZ2FtZS51c2VyLmdhbWVib2FyZC5mbGVldCk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=