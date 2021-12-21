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
      let self = this;

      generateShipCoords("carrier", 5);
      generateShipCoords("battleship", 4);
      generateShipCoords("cruiser", 3);
      generateShipCoords("submarine", 3);
      generateShipCoords("destroyer", 2);

      console.log(_game__WEBPACK_IMPORTED_MODULE_0__.game.user.gameboard.fleet);

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
    div.dataset.coords = JSON.stringify(ship.coords);

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

  _elements__WEBPACK_IMPORTED_MODULE_1__.playerArea.querySelectorAll(".ship").forEach((ship, index) => {
    if (ship.dataset.id !== elmnt.dataset.id) {
      const shipObj = {};
      const shipDivPos = ship.getBoundingClientRect();
      shipObj.top = shipDivPos.top;
      shipObj.left = shipDivPos.left;
      shipObj.right = shipDivPos.right;
      shipObj.bottom = shipDivPos.bottom;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLEVBQUUsNkRBQXNCO0FBQ3hCO0FBQ0EsRUFBRSw2REFBc0I7QUFDeEI7QUFDQSxFQUFFLDZEQUFzQjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsd0VBQWlDO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCLG1FQUNLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxFQUFFLGtFQUEyQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQVVFOzs7Ozs7O1VDcGNGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOeUI7QUFDZ0I7QUFDcUI7QUFTaEQ7O0FBRWQsZ0VBQXlCO0FBQ3pCLEVBQUUsNkRBQXNCO0FBQ3hCLEVBQUUsZ0RBQVM7QUFDWCxFQUFFLGtEQUFhO0FBQ2YsRUFBRSxnREFBVyxDQUFDLDRDQUFTO0FBQ3ZCLEVBQUUsZ0RBQVcsQ0FBQyw0Q0FBUztBQUN2QixDQUFDOztBQUVEOztBQUVBO0FBQ0EsRUFBRSwrQ0FBVTtBQUNaLEVBQUUsK0NBQVUsQ0FBQyw0REFBeUI7QUFDdEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy5jc3M/MTU1MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy91aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKTtcbmNvbnN0IHBsYXllckFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKTtcbmNvbnN0IGNvbXBBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wLWJvYXJkXCIpO1xuY29uc3QgcGxheWVyQm9hcmQgPSBwbGF5ZXJBcmVhLnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkXCIpO1xuY29uc3QgY29tcEJvYXJkID0gY29tcEFyZWEucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIik7XG5jb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtaW5wdXRcIik7XG5jb25zdCBuYW1lU3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYW1lLXN1Ym1pdFwiKTtcbmNvbnN0IG5hbWVJbnB1dERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS1pbnB1dC1jb250YWluZXJcIik7XG5jb25zdCBwbGF5ZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKTtcbmNvbnN0IHNjb3Jlc0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVzLWJveFwiKTtcbmNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLWNlbGxcIik7XG5jb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKTtcbmNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXlcIik7XG5cbmV4cG9ydCB7XG4gIHN0YXJ0QnRuLFxuICBwbGF5ZXJCb2FyZCxcbiAgY29tcEJvYXJkLFxuICBwbGF5ZXJBcmVhLFxuICBjb21wQXJlYSxcbiAgbmFtZUlucHV0LFxuICBuYW1lU3VibWl0QnRuLFxuICBuYW1lSW5wdXREaXYsXG4gIHBsYXllck5hbWUsXG4gIHNjb3Jlc0JveCxcbiAgZ3JpZENlbGwsXG4gIGluc3RydWN0aW9ucyxcbiAgcGxheUJ0bixcbn07XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuY29uc3QgZ2FtZSA9IHtcbiAgdXNlcjogbnVsbCxcbiAgY29tcDogbnVsbCxcbn07XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgZ2FtZS51c2VyID0gUGxheWVyKFwicGxhY2Vob2xkZXJcIik7XG4gIGdhbWUuY29tcCA9IFBsYXllcihcImNvbXB1dGVyXCIpO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIGdhbWUuY29tcC5nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcblxuICBnYW1lLnVzZXIuY3JlYXRlRmxlZXQoKTtcbiAgZ2FtZS5jb21wLmNyZWF0ZUZsZWV0KCk7XG59XG5cbmV4cG9ydCB7IGdhbWUsIHN0YXJ0R2FtZSB9O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gIHJldHVybiB7XG4gICAgZmxlZXQ6IFtdLFxuICAgIG1pc3NlZFNob3RzOiBbXSxcbiAgICBmbGVldFN0YXR1czogW10sXG5cbiAgICBkZW1vOiBudWxsLFxuXG4gICAgcGxhY2VTaGlwKG5hbWUsIGNvb3Jkcykge1xuICAgICAgY29uc3QgbmV3U2hpcCA9IFNoaXAobmFtZSwgY29vcmRzKTtcblxuICAgICAgLy8gbmV3U2hpcC5jb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIC8vICAgY29uc3QgcG9zQXJyYXkgPSBPYmplY3Qua2V5cyh0aGlzLmJvYXJkUG9zaXRpb25zKTtcbiAgICAgIC8vICAgY29uc3QgcG9zaXRpb24gPSBwb3NBcnJheS5maW5kKChwb3MpID0+IHBvcyA9PT0gY29vcmQpO1xuICAgICAgLy8gICB0aGlzLmJvYXJkUG9zaXRpb25zW3Bvc2l0aW9uXSA9IHRydWU7XG4gICAgICAvLyB9KTtcblxuICAgICAgdGhpcy5mbGVldC5wdXNoKG5ld1NoaXApO1xuICAgICAgdGhpcy5mbGVldFt0aGlzLmZsZWV0Lmxlbmd0aCAtIDFdLmlkID0gdGhpcy5mbGVldC5sZW5ndGggLSAxO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrKHBvcykge1xuICAgICAgbGV0IGhpdCA9IGZhbHNlO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLmZsZWV0Lmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5mbGVldFtpXS5jb29yZHMuaW5jbHVkZXMocG9zKSkge1xuICAgICAgICAgIHRoaXMuZmxlZXRbaV0uaGl0KHBvcyk7XG4gICAgICAgICAgaGl0ID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWhpdCkge1xuICAgICAgICB0aGlzLm1pc3NlZFNob3RzLnB1c2gocG9zKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVtbyA9IHBvcztcbiAgICB9LFxuXG4gICAgY2hlY2tGbGVldFN0YXR1cygpIHtcbiAgICAgIHRoaXMuZmxlZXRTdGF0dXMgPSBbXTtcblxuICAgICAgdGhpcy5mbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGlmIChzaGlwLnN0YXR1cyA9PT0gXCJzdW5rXCIpIHtcbiAgICAgICAgICB0aGlzLmZsZWV0U3RhdHVzLnB1c2goXCJzdW5rXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gaWYgKHRoaXMuZmxlZXRTdGF0dXMubGVuZ3RoID09PSB0aGlzLmZsZWV0Lmxlbmd0aCkge1xuICAgICAgLy8gICBhbGVydChcImV2ZXJ5dGhpbmcgaXMgc3Vua1wiKTtcbiAgICAgIC8vIH1cbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJpbXBvcnQgeyBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuZnVuY3Rpb24gUGxheWVyKG5hbWUpIHtcbiAgY29uc3QgcHJvdG8gPSB7XG4gICAgZGVtbzogW10sXG5cbiAgICBzZW5kQXR0YWNrKCkge1xuICAgICAgbGV0IGNvb3JkID0gdGhpcy5nZXRSYW5kb21Db29yZCgxMCk7XG5cbiAgICAgIGlmICh0aGlzLmNoZWNrUHJldmlvdXNNb3Zlcyhjb29yZCkpIHtcbiAgICAgICAgdGhpcy5zZW5kQXR0YWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmQpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRSYW5kb21Db29yZChmYWN0b3IpIHtcbiAgICAgIGNvbnN0IHggPSB0aGlzLmdldFJhbmRvbUludChmYWN0b3IpLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCB5ID0gdGhpcy5nZXRSYW5kb21JbnQoZmFjdG9yKS50b1N0cmluZygpO1xuICAgICAgY29uc3QgY29vcmQgPSB4ICsgeTtcbiAgICAgIHJldHVybiBjb29yZDtcbiAgICB9LFxuXG4gICAgZ2V0U3RhcnRDb29yZChsZW5ndGgsIGF4aXMpIHtcbiAgICAgIGNvbnN0IGNvb3JkID0gdGhpcy5nZXRSYW5kb21Db29yZCgxMCk7XG5cbiAgICAgIGlmIChjb29yZFtheGlzXSA+IDEwIC0gbGVuZ3RoIHx8IHRoaXMuY2hlY2tGb3JEdXBsaWNhdGUoY29vcmQpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0Q29vcmQobGVuZ3RoLCBheGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hlY2tGb3JEdXBsaWNhdGUoY29vcmQpIHtcbiAgICAgIHJldHVybiB0aGlzLmdhbWVib2FyZC5mbGVldC5zb21lKChzaGlwKSA9PiB7XG4gICAgICAgIHJldHVybiBzaGlwLmNvb3Jkcy5zb21lKChpdGVtKSA9PiBpdGVtID09IGNvb3JkKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjcmVhdGVGbGVldCgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgZ2VuZXJhdGVTaGlwQ29vcmRzKFwiY2FycmllclwiLCA1KTtcbiAgICAgIGdlbmVyYXRlU2hpcENvb3JkcyhcImJhdHRsZXNoaXBcIiwgNCk7XG4gICAgICBnZW5lcmF0ZVNoaXBDb29yZHMoXCJjcnVpc2VyXCIsIDMpO1xuICAgICAgZ2VuZXJhdGVTaGlwQ29vcmRzKFwic3VibWFyaW5lXCIsIDMpO1xuICAgICAgZ2VuZXJhdGVTaGlwQ29vcmRzKFwiZGVzdHJveWVyXCIsIDIpO1xuXG4gICAgICBjb25zb2xlLmxvZyhnYW1lLnVzZXIuZ2FtZWJvYXJkLmZsZWV0KTtcblxuICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVTaGlwQ29vcmRzKG5hbWUsIGxlbmd0aCkge1xuICAgICAgICBjb25zdCBheGlzID0gc2VsZi5nZXRSYW5kb21JbnQoMik7XG5cbiAgICAgICAgbGV0IGNvb3JkID0gc2VsZi5nZXRTdGFydENvb3JkKGxlbmd0aCwgYXhpcyk7XG5cbiAgICAgICAgY29vcmQgPSBbY29vcmRdO1xuXG4gICAgICAgIGxldCBhZGRBeGlzID0gMDtcbiAgICAgICAgbGV0IHNhbWVBeGlzID0gMDtcblxuICAgICAgICBheGlzID09IDAgPyAoc2FtZUF4aXMgPSAxKSA6IChhZGRBeGlzID0gMSk7XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgICBsZXQgbmV3Q29vcmQ7XG5cbiAgICAgICAgICBsZXQgbnVtID0gTnVtYmVyKGNvb3JkW2Nvb3JkLmxlbmd0aCAtIDFdW2FkZEF4aXNdKTtcblxuICAgICAgICAgIGF4aXMgPT0gMFxuICAgICAgICAgICAgPyAobmV3Q29vcmQgPSAobnVtICs9IDEpICsgY29vcmRbY29vcmQubGVuZ3RoIC0gMV1bc2FtZUF4aXNdKVxuICAgICAgICAgICAgOiAobmV3Q29vcmQgPSBjb29yZFtjb29yZC5sZW5ndGggLSAxXVtzYW1lQXhpc10gKyAobnVtICs9IDEpKTtcblxuICAgICAgICAgIGlmIChzZWxmLmNoZWNrRm9yRHVwbGljYXRlKG5ld0Nvb3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlU2hpcENvb3JkcyhuYW1lLCBsZW5ndGgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb29yZC5wdXNoKG5ld0Nvb3JkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5nYW1lYm9hcmQucGxhY2VTaGlwKG5hbWUsIGNvb3JkKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hlY2tQcmV2aW91c01vdmVzKGNvb3JkKSB7XG4gICAgICBjb25zdCBoaXRzID0gW107XG4gICAgICBjb25zdCBtaXNzZWQgPSBnYW1lLnVzZXIuZ2FtZWJvYXJkLm1pc3NlZFNob3RzO1xuXG4gICAgICBnYW1lLnVzZXIuZ2FtZWJvYXJkLmZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5oaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgICAgIGhpdHMucHVzaChoaXQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBtaXNzZWQuZm9yRWFjaCgobWlzcykgPT4ge1xuICAgICAgICBoaXRzLnB1c2gobWlzcyk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGhpdHMuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRSYW5kb21JbnQoZmFjdG9yKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmFjdG9yKTtcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuXG4gIG9iai5uYW1lID0gbmFtZTtcbiAgb2JqLmdhbWVzV29uID0gMDtcbiAgb2JqLmdhbWVib2FyZCA9IG51bGw7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiZnVuY3Rpb24gU2hpcChuYW1lLCBjb29yZHMpIHtcbiAgY29uc3QgcHJvdG8gPSB7XG4gICAgaGl0KG51bWJlcikge1xuICAgICAgaWYgKHRoaXMuY29vcmRzLmluY2x1ZGVzKG51bWJlcikgJiYgIXRoaXMuaGl0cy5pbmNsdWRlcyhudW1iZXIpKSB7XG4gICAgICAgIHRoaXMuaGl0cy5wdXNoKG51bWJlcik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzU3VuaygpIHtcbiAgICAgIGNvbnN0IHN1bmsgPSB0aGlzLmhpdHMuZXZlcnkoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29vcmRzLmluY2x1ZGVzKGl0ZW0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChzdW5rID09PSB0cnVlICYmIHRoaXMuaGl0cy5sZW5ndGggPT09IHRoaXMuY29vcmRzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IFwic3Vua1wiO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XG5cbiAgb2JqLm5hbWUgPSBuYW1lO1xuICBvYmouY29vcmRzID0gY29vcmRzO1xuICBvYmoubGVuZ3RoID0gY29vcmRzLmxlbmd0aDtcbiAgb2JqLmhpdHMgPSBbXTtcbiAgb2JqLnN0YXR1cyA9IFwidW5zdW5rXCI7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsImltcG9ydCB7IHN0YXJ0R2FtZSwgZ2FtZSwgZ2V0UmFuZG9tSW50IH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHtcbiAgcGxheWVyQm9hcmQsXG4gIGNvbXBCb2FyZCxcbiAgcGxheWVyQXJlYSxcbiAgY29tcEFyZWEsXG4gIG5hbWVJbnB1dCxcbiAgbmFtZVN1Ym1pdEJ0bixcbiAgbmFtZUlucHV0RGl2LFxuICBwbGF5ZXJOYW1lLFxuICBzY29yZXNCb3gsXG4gIGdyaWRDZWxsLFxuICBpbnN0cnVjdGlvbnMsXG4gIHBsYXlCdG4sXG59IGZyb20gXCIuL2VsZW1lbnRzXCI7XG5cbmZ1bmN0aW9uIHBvcHVsYXRlQm9hcmQocGxheWVyKSB7XG4gIGNvbnN0IGZsZWV0ID0gcGxheWVyLmdhbWVib2FyZC5mbGVldDtcbiAgcGFpbnRTaGlwcyhmbGVldCk7XG59XG5cbmZ1bmN0aW9uIHBhaW50U2hpcHMoZmxlZXQpIHtcbiAgY29uc3QgY2VsbFBvc2l0aW9ucyA9IGdldENlbGxQb3NpdGlvbnMoKTtcblxuICBmbGVldC5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBkaXYuZGF0YXNldC5pZCA9IGluZGV4O1xuICAgIGRpdi5kYXRhc2V0LmNvb3JkcyA9IEpTT04uc3RyaW5naWZ5KHNoaXAuY29vcmRzKTtcblxuICAgIGNvbnN0IGZpcnN0Q28gPSBbXTtcblxuICAgIGNvbnN0IGRpdldpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLWNlbGxcIikub2Zmc2V0V2lkdGg7XG5cbiAgICBzaGlwLmNvb3Jkcy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgZmlyc3RDby5wdXNoKGNvb3JkWzBdKTtcbiAgICB9KTtcblxuICAgIGlmIChmaXJzdENvWzBdID09PSBmaXJzdENvWzFdKSB7XG4gICAgICBkaXYuc3R5bGUud2lkdGggPSBkaXZXaWR0aCArIFwicHhcIjtcbiAgICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBzaGlwLmxlbmd0aCAqIGRpdldpZHRoICsgc2hpcC5sZW5ndGggLSAxICsgXCJweFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gZGl2V2lkdGggKyBcInB4XCI7XG4gICAgICBkaXYuc3R5bGUud2lkdGggPSBzaGlwLmxlbmd0aCAqIGRpdldpZHRoICsgc2hpcC5sZW5ndGggLSAxICsgXCJweFwiO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBjZWxsUG9zaXRpb25zKSB7XG4gICAgICBpZiAoY2VsbFBvc2l0aW9uc1twcm9wXS5jb29yZHMgPT0gc2hpcC5jb29yZHNbMF0pIHtcbiAgICAgICAgZGl2LnN0eWxlLnRvcCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLnRvcCArIFwicHhcIjtcbiAgICAgICAgZGl2LnN0eWxlLmxlZnQgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy5sZWZ0ICsgXCJweFwiO1xuICAgICAgfVxuICAgIH1cbiAgICBwbGF5ZXJBcmVhLmFwcGVuZENoaWxkKGRpdik7XG4gICAgZHJhZ0VsZW1lbnQoZGl2KTtcbiAgICByb3RhdGVTaGlwKGRpdik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjbGVhclNoaXBzKCkge1xuICBjb25zdCBzaGlwcyA9IHBsYXllckFyZWEucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xuICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5yZW1vdmUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckZsZWV0KHBsYXllcikge1xuICBsZXQgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBsYXllci5zZWxlY3Rvcik7XG5cbiAgcGxheWVyLmdhbWVib2FyZC5mbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgY29uc3Qgc2hpcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKFwic2hpcC1pY29uXCIpO1xuICAgIHNoaXBEaXYuc3R5bGUuaGVpZ2h0ID0gXCI1cHhcIjtcbiAgICBzaGlwRGl2LnN0eWxlLndpZHRoID0gc2hpcC5sZW5ndGggKiA1ICsgXCJweFwiO1xuXG4gICAgYm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEtbGVuZ3RoPScke3NoaXAubGVuZ3RofSddYCkuYXBwZW5kQ2hpbGQoc2hpcERpdik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhY3RpdmF0ZUVsZW1lbnQoZWxlbWVudCkge1xuICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG59XG5cbmZ1bmN0aW9uIGRlYWN0aXZhdGVFbGVtZW50KGVsZW1lbnQpIHtcbiAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIwLjNcIjtcbiAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIHVzZXJOYW1lSW5wdXQoKSB7XG4gIGFjdGl2YXRlRWxlbWVudChuYW1lSW5wdXREaXYpO1xuICBuYW1lSW5wdXQuc3R5bGUuYm94U2hhZG93ID0gXCIwcHggMHB4IDZweCAzcHggYmxhY2tcIjtcbiAgbmFtZVN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChuYW1lSW5wdXQudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgIG5hbWVJbnB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNFOEI0RENcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcCA9IHBsYXllck5hbWUucXVlcnlTZWxlY3RvcihcInBcIik7XG4gICAgICBwLnRleHRDb250ZW50ID0gbmFtZUlucHV0LnZhbHVlO1xuICAgICAgbmFtZUlucHV0LnZhbHVlID0gbnVsbDtcbiAgICAgIG5hbWVJbnB1dERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBnYW1lU2V0VXAoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnYW1lU2V0VXAoKSB7XG4gIGRpc3BsYXlTY29yZXMoKTtcbiAgcG9zaXRpb25GbGVldCgpO1xuICBjcmVhdGVDb21wRmxlZXQoKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVNjb3JlcygpIHtcbiAgY29uc3Qgc2NvcmVzID0gc2NvcmVzQm94LnF1ZXJ5U2VsZWN0b3IoXCJwXCIpO1xuICBzY29yZXMudGV4dENvbnRlbnQgPSBnYW1lLnVzZXIuZ2FtZXNXb24gKyBcIiAtIFwiICsgZ2FtZS5jb21wLmdhbWVzV29uO1xufVxuXG5mdW5jdGlvbiBwb3NpdGlvbkZsZWV0KCkge1xuICBhY3RpdmF0ZUVsZW1lbnQocGxheWVyQXJlYSk7XG4gIGluc3RyTXNnKCk7XG4gIHBvcHVsYXRlQm9hcmQoZ2FtZS51c2VyKTtcbiAgcGxheUJ1dHRvbigpO1xufVxuXG5mdW5jdGlvbiBwbGF5QnV0dG9uKCkge1xuICBwbGF5QnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYXlCdG5IYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gcGxheUJ0bkhhbmRsZXIoKSB7XG4gIGlmICghY2hlY2tGb3JSZWQoKSkge1xuICAgIGdhbWUudXNlci5nYW1lYm9hcmQuZmxlZXQgPSBbXTtcbiAgICBnZXROZXdGbGVldENvb3JkcygpO1xuICAgIGNvbnNvbGUubG9nKGdhbWUudXNlci5nYW1lYm9hcmQuZmxlZXQpO1xuICB9IGVsc2UgaWYgKGNoZWNrRm9yUmVkKCkpIHtcbiAgICBhbGVydChcIkFsbCBzaGlwcyBtdXN0IGJlIGdyZWVuIVwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXROZXdGbGVldENvb3JkcygpIHtcbiAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIik7XG4gIGNvbnN0IGNlbGxzID0gZ2V0Q2VsbFBvc2l0aW9ucygpO1xuXG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBsZXQgY29vcmRzO1xuICAgIGNvbnN0IHNoaXBEaXZQb3MgPSBzaGlwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGZvciAoY29uc3QgcHJvcCBpbiBjZWxscykge1xuICAgICAgaWYgKFxuICAgICAgICBzaGlwRGl2UG9zLmxlZnQgPT09IGNlbGxzW3Byb3BdLnNjcmVlblBvcy5sZWZ0ICYmXG4gICAgICAgIHNoaXBEaXZQb3MudG9wID09PSBjZWxsc1twcm9wXS5zY3JlZW5Qb3MudG9wXG4gICAgICApIHtcbiAgICAgICAgY29vcmRzID0gY2VsbHNbcHJvcF0uY29vcmRzO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2hpcERpdlBvcy5oZWlnaHQgPT09IHNoaXBEaXZQb3Mud2lkdGgpIHtcbiAgICAgIGdhbWUudXNlci5nYW1lYm9hcmQucGxhY2VTaGlwKFtjb29yZHNdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29vcmRzID0gZ2V0UmVjdFNoaXBDb29yZHMoY29vcmRzLCBzaGlwRGl2UG9zKTtcbiAgICAgIGdhbWUudXNlci5nYW1lYm9hcmQucGxhY2VTaGlwKGNvb3Jkcyk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVjdFNoaXBDb29yZHMoY29vcmRzLCBzaGlwKSB7XG4gIGNvbnN0IGNlbGxXaWR0aCA9IGdyaWRDZWxsLm9mZnNldFdpZHRoO1xuICBsZXQgYXhpcztcbiAgbGV0IGxlbmd0aDtcbiAgbGV0IGZ1bGxDb29yZHMgPSBbY29vcmRzXTtcblxuICBpZiAoc2hpcC5oZWlnaHQgPiBzaGlwLndpZHRoKSB7XG4gICAgYXhpcyA9IDE7XG4gICAgbGVuZ3RoID0gTWF0aC5yb3VuZChzaGlwLmhlaWdodCAvIGNlbGxXaWR0aCk7XG4gIH0gZWxzZSB7XG4gICAgYXhpcyA9IDA7XG4gICAgbGVuZ3RoID0gTWF0aC5yb3VuZChzaGlwLndpZHRoIC8gY2VsbFdpZHRoKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgbGV0IHggPSBmdWxsQ29vcmRzW2Z1bGxDb29yZHMubGVuZ3RoIC0gMV1bMF07XG4gICAgbGV0IHkgPSBmdWxsQ29vcmRzW2Z1bGxDb29yZHMubGVuZ3RoIC0gMV1bMV07XG4gICAgbGV0IG5ld0Nvb3JkO1xuXG4gICAgbGV0IG51bSA9IE51bWJlcihmdWxsQ29vcmRzW2Z1bGxDb29yZHMubGVuZ3RoIC0gMV1bYXhpc10pO1xuICAgIG51bSA9PSB4ID8gKG5ld0Nvb3JkID0gKG51bSArPSAxKSArIHkpIDogKG5ld0Nvb3JkID0geCArIChudW0gKz0gMSkpO1xuICAgIGZ1bGxDb29yZHMucHVzaChuZXdDb29yZCk7XG4gIH1cbiAgcmV0dXJuIGZ1bGxDb29yZHM7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9yUmVkKCkge1xuICBsZXQgc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW52YWxpZC1wb3NcIik7XG5cbiAgaWYgKHNoaXApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5zdHJNc2coKSB7XG4gIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPVxuICAgIFwiPHA+QXJyYW5nZSB5b3VyIHNoaXBzIGluIHByZXBhcmF0aW9uIGZvciBhIG5hdmFsIGJhdHRsZSE8L3A+XCI7XG4gIGluc3RydWN0aW9ucy5pbm5lckhUTUwgKz1cbiAgICBcIjxwPlRoZSBzaGlwcyBtdXN0IGFsbCBiZSBncmVlbiBiZWZvcmUgeW91IGNhbiBzdGFydCB0aGUgZ2FtZS48L3A+XCI7XG4gIGluc3RydWN0aW9ucy5pbm5lckhUTUwgKz0gXCI8cD4oRG91YmxlLWNsaWNrIHRvIHJvdGF0ZSBhIHNoaXAuKTwvcD5cIjtcbn1cblxuZnVuY3Rpb24gZHJhZ0VsZW1lbnQoZWxtbnQpIHtcbiAgbGV0IHBvczEgPSAwLFxuICAgIHBvczIgPSAwLFxuICAgIHBvczMgPSAwLFxuICAgIHBvczQgPSAwO1xuXG4gIGVsbW50Lm9ubW91c2Vkb3duID0gZHJhZ01vdXNlRG93bjtcblxuICBjb25zdCBib2FyZCA9IGdldEJvcmRlcigpO1xuXG4gIGZ1bmN0aW9uIGRyYWdNb3VzZURvd24oZSkge1xuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgIGNsb3NlRHJhZ0VsZW1lbnQoZWxtbnQpO1xuICAgIH07XG4gICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBlbGVtZW50RHJhZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGVsZW1lbnREcmFnKGUpIHtcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHBvczEgPSBwb3MzIC0gZS5jbGllbnRYO1xuICAgIHBvczIgPSBwb3M0IC0gZS5jbGllbnRZO1xuXG4gICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICBwb3M0ID0gZS5jbGllbnRZO1xuXG4gICAga2VlcEluQm91bmRzKGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tEb3duRHJhZyhlKSB7XG4gICAgaWYgKGUuY2xpZW50WSA+IHBvczQpIHtcbiAgICAgIHJldHVybiBlLmNsaWVudFkgLSBwb3M0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tSaWdodERyYWcoZSkge1xuICAgIGlmIChlLmNsaWVudFggPiBwb3MzKSB7XG4gICAgICByZXR1cm4gZS5jbGllbnRYIC0gcG9zMztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrTGVmdERyYWcoZSkge1xuICAgIGlmIChlLmNsaWVudFggPCBwb3MzKSB7XG4gICAgICByZXR1cm4gcG9zMyAtIGUuY2xpZW50WDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVXBEcmFnKGUpIHtcbiAgICBpZiAoZS5jbGllbnRZIDwgcG9zNCkge1xuICAgICAgcmV0dXJuIHBvczQgLSBlLmNsaWVudFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBrZWVwSW5Cb3VuZHMoZSkge1xuICAgIGlmICghY2hlY2tQb3NpdGlvbihlbG1udCkpIHtcbiAgICAgIGVsbW50LnN0eWxlLnRvcCA9IGVsbW50Lm9mZnNldFRvcCAtIHBvczIgKyBcInB4XCI7XG4gICAgICBlbG1udC5zdHlsZS5sZWZ0ID0gZWxtbnQub2Zmc2V0TGVmdCAtIHBvczEgKyBcInB4XCI7XG4gICAgfSBlbHNlIGlmIChjaGVja1Bvc2l0aW9uKGVsbW50KSA9PT0gXCJ0b3BcIikge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID0gYm9hcmQudG9wICsgY2hlY2tEb3duRHJhZyhlKSArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmxlZnQgPSBlbG1udC5vZmZzZXRMZWZ0IC0gcG9zMSArIFwicHhcIjtcbiAgICB9IGVsc2UgaWYgKGNoZWNrUG9zaXRpb24oZWxtbnQpID09PSBcImxlZnRcIikge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID0gZWxtbnQub2Zmc2V0VG9wIC0gcG9zMiArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmxlZnQgPSBib2FyZC5sZWZ0ICsgY2hlY2tSaWdodERyYWcoZSkgKyBcInB4XCI7XG4gICAgfSBlbHNlIGlmIChjaGVja1Bvc2l0aW9uKGVsbW50KSA9PT0gXCJyaWdodFwiKSB7XG4gICAgICBlbG1udC5zdHlsZS50b3AgPSBlbG1udC5vZmZzZXRUb3AgLSBwb3MyICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9XG4gICAgICAgIGJvYXJkLnJpZ2h0IC0gZWxtbnQub2Zmc2V0V2lkdGggLSBjaGVja0xlZnREcmFnKGUpICsgXCJweFwiO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tQb3NpdGlvbihlbG1udCkgPT09IFwiYm90dG9tXCIpIHtcbiAgICAgIGVsbW50LnN0eWxlLnRvcCA9XG4gICAgICAgIGJvYXJkLmJvdHRvbSAtIGVsbW50Lm9mZnNldEhlaWdodCAtIGNoZWNrVXBEcmFnKGUpICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IGVsbW50Lm9mZnNldExlZnQgLSBwb3MxICsgXCJweFwiO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrUG9zaXRpb24oZWxtbnQpIHtcbiAgICBjb25zdCBlbG1udFJlY3QgPSBlbG1udC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGlmIChlbG1udFJlY3QudG9wIDwgYm9hcmQudG9wKSB7XG4gICAgICByZXR1cm4gXCJ0b3BcIjtcbiAgICB9IGVsc2UgaWYgKGVsbW50UmVjdC5sZWZ0IDwgYm9hcmQubGVmdCkge1xuICAgICAgcmV0dXJuIFwibGVmdFwiO1xuICAgIH0gZWxzZSBpZiAoZWxtbnRSZWN0LnJpZ2h0ID4gYm9hcmQucmlnaHQpIHtcbiAgICAgIHJldHVybiBcInJpZ2h0XCI7XG4gICAgfSBlbHNlIGlmIChlbG1udFJlY3QuYm90dG9tID4gYm9hcmQuYm90dG9tKSB7XG4gICAgICByZXR1cm4gXCJib3R0b21cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlRHJhZ0VsZW1lbnQoZWxtbnQpIHtcbiAgICBncmlkU25hcChlbG1udCk7XG4gICAgZG9jdW1lbnQub25tb3VzZXVwID0gbnVsbDtcbiAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm90YXRlU2hpcChlbG1udCkge1xuICBlbG1udC5vbmRibGNsaWNrID0gcm90YXRlO1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZSgpIHtcbiAgICBjb25zdCBib2FyZCA9IGdldEJvcmRlcigpO1xuXG4gICAgY29uc3QgZWxtbnRSZWN0ID0gZWxtbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCBmdXR1cmVSaWdodCA9IGVsbW50UmVjdC5sZWZ0ICsgZWxtbnRSZWN0LmhlaWdodDtcbiAgICBjb25zdCBmdXR1cmVCb3R0b20gPSBlbG1udFJlY3QudG9wICsgZWxtbnRSZWN0LndpZHRoO1xuXG4gICAgaWYgKCEoZnV0dXJlUmlnaHQgLSAxID4gYm9hcmQucmlnaHQgfHwgZnV0dXJlQm90dG9tIC0gMSA+IGJvYXJkLmJvdHRvbSkpIHtcbiAgICAgIGVsbW50LnN0eWxlLndpZHRoID0gZWxtbnRSZWN0LmhlaWdodCArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmhlaWdodCA9IGVsbW50UmVjdC53aWR0aCArIFwicHhcIjtcbiAgICAgIGNoZWNrUHJveGltaXR5KGVsbW50KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tQcm94aW1pdHkoZWxtbnQpIHtcbiAgY29uc3QgZWxtbnRSZWN0ID0gZWxtbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgY29uc3Qgc2hpcFpvbmVzID0gZ2V0U2hpcFpvbmVzKGVsbW50KTtcblxuICBmb3IgKGNvbnN0IHByb3AgaW4gc2hpcFpvbmVzKSB7XG4gICAgY29uc3QgdG9wQm91bmQgPSBzaGlwWm9uZXNbcHJvcF0udG9wO1xuICAgIGNvbnN0IGxlZnRCb3VuZCA9IHNoaXBab25lc1twcm9wXS5sZWZ0O1xuICAgIGNvbnN0IHJpZ2h0Qm91bmQgPSBzaGlwWm9uZXNbcHJvcF0ucmlnaHQ7XG4gICAgY29uc3QgYm90dG9tQm91bmQgPSBzaGlwWm9uZXNbcHJvcF0uYm90dG9tO1xuXG4gICAgaWYgKFxuICAgICAgKGVsbW50UmVjdC50b3AgPCBib3R0b21Cb3VuZCAmJlxuICAgICAgICBlbG1udFJlY3QubGVmdCA8IHJpZ2h0Qm91bmQgJiZcbiAgICAgICAgZWxtbnRSZWN0LnRvcCA+IHRvcEJvdW5kICYmXG4gICAgICAgIGVsbW50UmVjdC5sZWZ0ID4gbGVmdEJvdW5kKSB8fFxuICAgICAgKGVsbW50UmVjdC50b3AgPCBib3R0b21Cb3VuZCAmJlxuICAgICAgICBlbG1udFJlY3QucmlnaHQgPCByaWdodEJvdW5kICYmXG4gICAgICAgIGVsbW50UmVjdC50b3AgPiB0b3BCb3VuZCAmJlxuICAgICAgICBlbG1udFJlY3QucmlnaHQgPiBsZWZ0Qm91bmQpIHx8XG4gICAgICAoZWxtbnRSZWN0LmJvdHRvbSA8IGJvdHRvbUJvdW5kICYmXG4gICAgICAgIGVsbW50UmVjdC5sZWZ0IDwgcmlnaHRCb3VuZCAmJlxuICAgICAgICBlbG1udFJlY3QuYm90dG9tID4gdG9wQm91bmQgJiZcbiAgICAgICAgZWxtbnRSZWN0LmxlZnQgPiBsZWZ0Qm91bmQpIHx8XG4gICAgICAoZWxtbnRSZWN0LmJvdHRvbSA8IGJvdHRvbUJvdW5kICYmXG4gICAgICAgIGVsbW50UmVjdC5yaWdodCA8IHJpZ2h0Qm91bmQgJiZcbiAgICAgICAgZWxtbnRSZWN0LmJvdHRvbSA+IHRvcEJvdW5kICYmXG4gICAgICAgIGVsbW50UmVjdC5yaWdodCA+IGxlZnRCb3VuZClcbiAgICApIHtcbiAgICAgIGVsbW50LmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkLXBvc1wiKTtcblxuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsbW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLXBvc1wiKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Qm9yZGVyKCkge1xuICBjb25zdCBpbmZvID0gcGxheWVyQm9hcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHJldHVybiB7XG4gICAgdG9wOiBNYXRoLnJvdW5kKGluZm8udG9wKSxcbiAgICBsZWZ0OiBNYXRoLnJvdW5kKGluZm8ubGVmdCksXG4gICAgcmlnaHQ6IE1hdGgucm91bmQoaW5mby5yaWdodCksXG4gICAgYm90dG9tOiBNYXRoLnJvdW5kKGluZm8uYm90dG9tKSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbFBvc2l0aW9ucygpIHtcbiAgY29uc3QgY2VsbFBvc2l0aW9ucyA9IHt9O1xuXG4gIGNvbnN0IGNlbGxzID0gcGxheWVyQm9hcmRcbiAgICAucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIilcbiAgICAuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGNlbGxPYmogPSB7fTtcbiAgICAgIGNlbGxPYmouc2NyZWVuUG9zID0gY2VsbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNlbGxPYmouY29vcmRzID0gY2VsbC5kYXRhc2V0LnggKyBjZWxsLmRhdGFzZXQueTtcbiAgICAgIGNlbGxQb3NpdGlvbnNbaW5kZXhdID0gY2VsbE9iajtcbiAgICB9KTtcblxuICByZXR1cm4gY2VsbFBvc2l0aW9ucztcbn1cblxuZnVuY3Rpb24gZ2V0U2hpcFpvbmVzKGVsbW50KSB7XG4gIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSB7fTtcblxuICBwbGF5ZXJBcmVhLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKS5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xuICAgIGlmIChzaGlwLmRhdGFzZXQuaWQgIT09IGVsbW50LmRhdGFzZXQuaWQpIHtcbiAgICAgIGNvbnN0IHNoaXBPYmogPSB7fTtcbiAgICAgIGNvbnN0IHNoaXBEaXZQb3MgPSBzaGlwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgc2hpcE9iai50b3AgPSBzaGlwRGl2UG9zLnRvcDtcbiAgICAgIHNoaXBPYmoubGVmdCA9IHNoaXBEaXZQb3MubGVmdDtcbiAgICAgIHNoaXBPYmoucmlnaHQgPSBzaGlwRGl2UG9zLnJpZ2h0O1xuICAgICAgc2hpcE9iai5ib3R0b20gPSBzaGlwRGl2UG9zLmJvdHRvbTtcbiAgICAgIHNoaXBQb3NpdGlvbnNbaW5kZXhdID0gc2hpcE9iajtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc2hpcFBvc2l0aW9ucztcbn1cblxuZnVuY3Rpb24gZ3JpZFNuYXAoZWxtbnQpIHtcbiAgY29uc3QgY2VsbFBvc2l0aW9ucyA9IGdldENlbGxQb3NpdGlvbnMoXCIucGxheWVyLWJvYXJkXCIpO1xuXG4gIGNvbnN0IGVsbW50UG9zID0gZWxtbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgZm9yIChjb25zdCBwcm9wIGluIGNlbGxQb3NpdGlvbnMpIHtcbiAgICBjb25zdCB4TG93ZXIgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy54IC0gMjU7XG4gICAgY29uc3QgeUxvd2VyID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MueSAtIDI1O1xuICAgIGNvbnN0IHhMaW1pdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLnggKyAyNTtcbiAgICBjb25zdCB5TGltaXQgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy55ICsgMjU7XG5cbiAgICBpZiAoXG4gICAgICBlbG1udFBvcy54ID49IHhMb3dlciAmJlxuICAgICAgZWxtbnRQb3MueSA+PSB5TG93ZXIgJiZcbiAgICAgIGVsbW50UG9zLnggPD0geExpbWl0ICYmXG4gICAgICBlbG1udFBvcy55IDw9IHlMaW1pdFxuICAgICkge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MudG9wICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLmxlZnQgKyBcInB4XCI7XG5cbiAgICAgIGVsbW50LmRhdGFzZXQueCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uY29vcmRzWzBdO1xuICAgICAgZWxtbnQuZGF0YXNldC55ID0gY2VsbFBvc2l0aW9uc1twcm9wXS5jb29yZHNbMV07XG5cbiAgICAgIGNoZWNrUHJveGltaXR5KGVsbW50KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgcG9wdWxhdGVCb2FyZCxcbiAgYWN0aXZhdGVFbGVtZW50LFxuICBkcmFnRWxlbWVudCxcbiAgcmVuZGVyRmxlZXQsXG4gIHVzZXJOYW1lSW5wdXQsXG4gIHBhaW50U2hpcHMsXG4gIGNsZWFyU2hpcHMsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuLy4uL3N0eWxlcy5jc3NcIjtcbmltcG9ydCB7IGdhbWUsIHN0YXJ0R2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IHN0YXJ0QnRuLCBwbGF5ZXJCb2FyZCwgY29tcEJvYXJkIH0gZnJvbSBcIi4vZWxlbWVudHNcIjtcbmltcG9ydCB7XG4gIHBvcHVsYXRlQm9hcmQsXG4gIGFjdGl2YXRlRWxlbWVudCxcbiAgZHJhZ0VsZW1lbnQsXG4gIHJlbmRlckZsZWV0LFxuICB1c2VyTmFtZUlucHV0LFxuICBwYWludFNoaXBzLFxuICBjbGVhclNoaXBzLFxufSBmcm9tIFwiLi91aVwiO1xuXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBzdGFydEJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIHN0YXJ0R2FtZSgpO1xuICB1c2VyTmFtZUlucHV0KCk7XG4gIHJlbmRlckZsZWV0KGdhbWUudXNlcik7XG4gIHJlbmRlckZsZWV0KGdhbWUuY29tcCk7XG59KTtcblxud2luZG93Lm9ucmVzaXplID0gdGhpbmc7XG5cbmZ1bmN0aW9uIHRoaW5nKCkge1xuICBjbGVhclNoaXBzKCk7XG4gIHBhaW50U2hpcHMoZ2FtZS51c2VyLmdhbWVib2FyZC5mbGVldCk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=