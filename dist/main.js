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

  game.user.gameboard.placeShip(["00", "10"]);
  game.user.gameboard.placeShip(["60"]);
  game.user.gameboard.placeShip(["22", "32", "42"]);
  game.user.gameboard.placeShip(["82", "83", "84"]);
  game.user.gameboard.placeShip(["06", "07"]);
  game.user.gameboard.placeShip(["36", "46"]);
  game.user.gameboard.placeShip(["87"]);
  game.user.gameboard.placeShip(["09", "19", "29", "39"]);
  game.user.gameboard.placeShip(["69"]);
  game.user.gameboard.placeShip(["99"]);
  game.comp.gameboard.placeShip(["00", "10", "20"]);
  game.comp.gameboard.placeShip(["41", "42", "43"]);
  game.comp.gameboard.placeShip(["81", "82", "83"]);
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

    placeShip(coords) {
      const newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(coords);

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


function Player(name) {
  if (name === "computer") {
    return {
      name,
      gamesWon: 0,
      gameboard: null,
      selector: ".comp-board",

      sendAttack() {
        let coord = this.getCoord();

        if (this.checkPreviousMoves(coord)) {
          this.sendAttack();
        } else {
          _game__WEBPACK_IMPORTED_MODULE_0__.game.user.receiveAttack(coord);
        }
      },

      getCoord() {
        const x = getRandomInt().toString();
        const y = getRandomInt().toString();
        const coord = x + y;
        return coord;
      },

      checkPreviousMoves(coord) {
        const hits = [];
        const missed = _game__WEBPACK_IMPORTED_MODULE_0__.game.user.missedShots;

        _game__WEBPACK_IMPORTED_MODULE_0__.game.user.fleet.forEach((ship) => {
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
    };
  } else {
    return {
      name,
      gamesWon: 0,
      gameboard: null,
      selector: ".player-board",
    };
  }
}

function getRandomInt() {
  return Math.floor(Math.random() * 10);
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
function Ship(coords) {
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
      console.log(p);
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
  if (checkForRed()) {
    getNewFleetCoords();
  }
}

function checkForRed() {
  let shipsAreValid = true;
  let ship = document.querySelector(".invalid-pos");

  if (ship) {
    shipsAreValid = false;
  }

  return shipsAreValid;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFnQkU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCa0M7QUFDTjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLG1EQUFNO0FBQ3BCLGNBQWMsbURBQU07QUFDcEIsd0JBQXdCLHNEQUFTO0FBQ2pDLHdCQUF3QixzREFBUzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFMkI7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkQ7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsaURBQUk7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBLHNCQUFzQiw0QkFBNEI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxpRUFBZSxTQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0REs7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVixVQUFVLDBEQUF1QjtBQUNqQztBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLHVCQUF1Qix3REFBcUI7O0FBRTVDLFFBQVEsMERBQXVCO0FBQy9CO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM1RHRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JxQjtBQWNyQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSw2REFBc0I7QUFDMUI7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLGdCQUFnQixrRUFBMkI7QUFDM0M7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUNBQXlDLFlBQVk7QUFDckQsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLG1EQUFZO0FBQzlCLEVBQUUsZ0VBQXlCO0FBQzNCLEVBQUUscUVBQThCO0FBQ2hDLFFBQVEsc0RBQWU7QUFDdkIsTUFBTSxzRUFBK0I7QUFDckMsTUFBTTtBQUNOLGdCQUFnQiwrREFBd0I7QUFDeEM7QUFDQSxzQkFBc0Isc0RBQWU7QUFDckMsTUFBTSxzREFBZTtBQUNyQixNQUFNLGlFQUEwQjtBQUNoQztBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLDhEQUF1QjtBQUN4Qyx1QkFBdUIscURBQWtCLFdBQVcscURBQWtCO0FBQ3RFOztBQUVBO0FBQ0Esa0JBQWtCLGlEQUFVO0FBQzVCO0FBQ0EsZ0JBQWdCLDRDQUFTO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLDREQUFxQjtBQUN2QixFQUFFLCtEQUF3QjtBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEVBQUUsNkRBQXNCO0FBQ3hCO0FBQ0EsRUFBRSw2REFBc0I7QUFDeEI7QUFDQSxFQUFFLDZEQUFzQjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsd0VBQWlDO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCLG1FQUNLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxxQkFBcUIsMkRBQW9COztBQUV6QyxFQUFFLGtFQUEyQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQVVFOzs7Ozs7O1VDOVlGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOeUI7QUFDZ0I7QUFDcUI7QUFTaEQ7O0FBRWQsZ0VBQXlCO0FBQ3pCLEVBQUUsNkRBQXNCO0FBQ3hCLEVBQUUsZ0RBQVM7QUFDWCxFQUFFLGtEQUFhO0FBQ2YsRUFBRSxnREFBVyxDQUFDLDRDQUFTO0FBQ3ZCLEVBQUUsZ0RBQVcsQ0FBQyw0Q0FBUztBQUN2QixDQUFDOztBQUVEOztBQUVBO0FBQ0EsRUFBRSwrQ0FBVTtBQUNaLEVBQUUsK0NBQVUsQ0FBQyw0REFBeUI7QUFDdEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy5jc3M/MTU1MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy91aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKTtcbmNvbnN0IHBsYXllckFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKTtcbmNvbnN0IGNvbXBBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wLWJvYXJkXCIpO1xuY29uc3QgcGxheWVyQm9hcmQgPSBwbGF5ZXJBcmVhLnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkXCIpO1xuY29uc3QgY29tcEJvYXJkID0gY29tcEFyZWEucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIik7XG5jb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtaW5wdXRcIik7XG5jb25zdCBuYW1lU3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYW1lLXN1Ym1pdFwiKTtcbmNvbnN0IG5hbWVJbnB1dERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS1pbnB1dC1jb250YWluZXJcIik7XG5jb25zdCBwbGF5ZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKTtcbmNvbnN0IHNjb3Jlc0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVzLWJveFwiKTtcbmNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLWNlbGxcIik7XG5jb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKTtcbmNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXlcIik7XG5cbmV4cG9ydCB7XG4gIHN0YXJ0QnRuLFxuICBwbGF5ZXJCb2FyZCxcbiAgY29tcEJvYXJkLFxuICBwbGF5ZXJBcmVhLFxuICBjb21wQXJlYSxcbiAgbmFtZUlucHV0LFxuICBuYW1lU3VibWl0QnRuLFxuICBuYW1lSW5wdXREaXYsXG4gIHBsYXllck5hbWUsXG4gIHNjb3Jlc0JveCxcbiAgZ3JpZENlbGwsXG4gIGluc3RydWN0aW9ucyxcbiAgcGxheUJ0bixcbn07XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuY29uc3QgZ2FtZSA9IHtcbiAgdXNlcjogbnVsbCxcbiAgY29tcDogbnVsbCxcbn07XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgZ2FtZS51c2VyID0gUGxheWVyKFwicGxhY2Vob2xkZXJcIik7XG4gIGdhbWUuY29tcCA9IFBsYXllcihcImNvbXB1dGVyXCIpO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIGdhbWUuY29tcC5nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcblxuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCIwMFwiLCBcIjEwXCJdKTtcbiAgZ2FtZS51c2VyLmdhbWVib2FyZC5wbGFjZVNoaXAoW1wiNjBcIl0pO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCIyMlwiLCBcIjMyXCIsIFwiNDJcIl0pO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCI4MlwiLCBcIjgzXCIsIFwiODRcIl0pO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCIwNlwiLCBcIjA3XCJdKTtcbiAgZ2FtZS51c2VyLmdhbWVib2FyZC5wbGFjZVNoaXAoW1wiMzZcIiwgXCI0NlwiXSk7XG4gIGdhbWUudXNlci5nYW1lYm9hcmQucGxhY2VTaGlwKFtcIjg3XCJdKTtcbiAgZ2FtZS51c2VyLmdhbWVib2FyZC5wbGFjZVNoaXAoW1wiMDlcIiwgXCIxOVwiLCBcIjI5XCIsIFwiMzlcIl0pO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCI2OVwiXSk7XG4gIGdhbWUudXNlci5nYW1lYm9hcmQucGxhY2VTaGlwKFtcIjk5XCJdKTtcbiAgZ2FtZS5jb21wLmdhbWVib2FyZC5wbGFjZVNoaXAoW1wiMDBcIiwgXCIxMFwiLCBcIjIwXCJdKTtcbiAgZ2FtZS5jb21wLmdhbWVib2FyZC5wbGFjZVNoaXAoW1wiNDFcIiwgXCI0MlwiLCBcIjQzXCJdKTtcbiAgZ2FtZS5jb21wLmdhbWVib2FyZC5wbGFjZVNoaXAoW1wiODFcIiwgXCI4MlwiLCBcIjgzXCJdKTtcbn1cblxuZXhwb3J0IHsgZ2FtZSwgc3RhcnRHYW1lIH07XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcbiAgcmV0dXJuIHtcbiAgICBmbGVldDogW10sXG4gICAgbWlzc2VkU2hvdHM6IFtdLFxuICAgIGZsZWV0U3RhdHVzOiBbXSxcblxuICAgIHBsYWNlU2hpcChjb29yZHMpIHtcbiAgICAgIGNvbnN0IG5ld1NoaXAgPSBTaGlwKGNvb3Jkcyk7XG5cbiAgICAgIC8vIG5ld1NoaXAuY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAvLyAgIGNvbnN0IHBvc0FycmF5ID0gT2JqZWN0LmtleXModGhpcy5ib2FyZFBvc2l0aW9ucyk7XG4gICAgICAvLyAgIGNvbnN0IHBvc2l0aW9uID0gcG9zQXJyYXkuZmluZCgocG9zKSA9PiBwb3MgPT09IGNvb3JkKTtcbiAgICAgIC8vICAgdGhpcy5ib2FyZFBvc2l0aW9uc1twb3NpdGlvbl0gPSB0cnVlO1xuICAgICAgLy8gfSk7XG5cbiAgICAgIHRoaXMuZmxlZXQucHVzaChuZXdTaGlwKTtcbiAgICAgIHRoaXMuZmxlZXRbdGhpcy5mbGVldC5sZW5ndGggLSAxXS5pZCA9IHRoaXMuZmxlZXQubGVuZ3RoIC0gMTtcbiAgICB9LFxuXG4gICAgcmVjZWl2ZUF0dGFjayhwb3MpIHtcbiAgICAgIGxldCBoaXQgPSBmYWxzZTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5mbGVldC5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuZmxlZXRbaV0uY29vcmRzLmluY2x1ZGVzKHBvcykpIHtcbiAgICAgICAgICB0aGlzLmZsZWV0W2ldLmhpdChwb3MpO1xuICAgICAgICAgIGhpdCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFoaXQpIHtcbiAgICAgICAgdGhpcy5taXNzZWRTaG90cy5wdXNoKHBvcyk7XG4gICAgICB9XG4gICAgICB0aGlzLmRlbW8gPSBwb3M7XG4gICAgfSxcblxuICAgIGNoZWNrRmxlZXRTdGF0dXMoKSB7XG4gICAgICB0aGlzLmZsZWV0U3RhdHVzID0gW107XG5cbiAgICAgIHRoaXMuZmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBpZiAoc2hpcC5zdGF0dXMgPT09IFwic3Vua1wiKSB7XG4gICAgICAgICAgdGhpcy5mbGVldFN0YXR1cy5wdXNoKFwic3Vua1wiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIGlmICh0aGlzLmZsZWV0U3RhdHVzLmxlbmd0aCA9PT0gdGhpcy5mbGVldC5sZW5ndGgpIHtcbiAgICAgIC8vICAgYWxlcnQoXCJldmVyeXRoaW5nIGlzIHN1bmtcIik7XG4gICAgICAvLyB9XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcblxuZnVuY3Rpb24gUGxheWVyKG5hbWUpIHtcbiAgaWYgKG5hbWUgPT09IFwiY29tcHV0ZXJcIikge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgZ2FtZXNXb246IDAsXG4gICAgICBnYW1lYm9hcmQ6IG51bGwsXG4gICAgICBzZWxlY3RvcjogXCIuY29tcC1ib2FyZFwiLFxuXG4gICAgICBzZW5kQXR0YWNrKCkge1xuICAgICAgICBsZXQgY29vcmQgPSB0aGlzLmdldENvb3JkKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tQcmV2aW91c01vdmVzKGNvb3JkKSkge1xuICAgICAgICAgIHRoaXMuc2VuZEF0dGFjaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhbWUudXNlci5yZWNlaXZlQXR0YWNrKGNvb3JkKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgZ2V0Q29vcmQoKSB7XG4gICAgICAgIGNvbnN0IHggPSBnZXRSYW5kb21JbnQoKS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCB5ID0gZ2V0UmFuZG9tSW50KCkudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgY29vcmQgPSB4ICsgeTtcbiAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgfSxcblxuICAgICAgY2hlY2tQcmV2aW91c01vdmVzKGNvb3JkKSB7XG4gICAgICAgIGNvbnN0IGhpdHMgPSBbXTtcbiAgICAgICAgY29uc3QgbWlzc2VkID0gZ2FtZS51c2VyLm1pc3NlZFNob3RzO1xuXG4gICAgICAgIGdhbWUudXNlci5mbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgICAgc2hpcC5oaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgICAgICAgaGl0cy5wdXNoKGhpdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1pc3NlZC5mb3JFYWNoKChtaXNzKSA9PiB7XG4gICAgICAgICAgaGl0cy5wdXNoKG1pc3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaGl0cy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgZ2FtZXNXb246IDAsXG4gICAgICBnYW1lYm9hcmQ6IG51bGwsXG4gICAgICBzZWxlY3RvcjogXCIucGxheWVyLWJvYXJkXCIsXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQoKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImZ1bmN0aW9uIFNoaXAoY29vcmRzKSB7XG4gIGNvbnN0IHByb3RvID0ge1xuICAgIGhpdChudW1iZXIpIHtcbiAgICAgIGlmICh0aGlzLmNvb3Jkcy5pbmNsdWRlcyhudW1iZXIpICYmICF0aGlzLmhpdHMuaW5jbHVkZXMobnVtYmVyKSkge1xuICAgICAgICB0aGlzLmhpdHMucHVzaChudW1iZXIpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBpc1N1bmsoKSB7XG4gICAgICBjb25zdCBzdW5rID0gdGhpcy5oaXRzLmV2ZXJ5KChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvb3Jkcy5pbmNsdWRlcyhpdGVtKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc3VuayA9PT0gdHJ1ZSAmJiB0aGlzLmhpdHMubGVuZ3RoID09PSB0aGlzLmNvb3Jkcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBcInN1bmtcIjtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuXG4gIG9iai5jb29yZHMgPSBjb29yZHM7XG4gIG9iai5sZW5ndGggPSBjb29yZHMubGVuZ3RoO1xuICBvYmouaGl0cyA9IFtdO1xuICBvYmouc3RhdHVzID0gXCJ1bnN1bmtcIjtcblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiaW1wb3J0IHsgc3RhcnRHYW1lLCBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHtcbiAgcGxheWVyQm9hcmQsXG4gIGNvbXBCb2FyZCxcbiAgcGxheWVyQXJlYSxcbiAgY29tcEFyZWEsXG4gIG5hbWVJbnB1dCxcbiAgbmFtZVN1Ym1pdEJ0bixcbiAgbmFtZUlucHV0RGl2LFxuICBwbGF5ZXJOYW1lLFxuICBzY29yZXNCb3gsXG4gIGdyaWRDZWxsLFxuICBpbnN0cnVjdGlvbnMsXG4gIHBsYXlCdG4sXG59IGZyb20gXCIuL2VsZW1lbnRzXCI7XG5cbmZ1bmN0aW9uIHBvcHVsYXRlQm9hcmQocGxheWVyKSB7XG4gIGNvbnN0IGZsZWV0ID0gcGxheWVyLmdhbWVib2FyZC5mbGVldDtcbiAgcGFpbnRTaGlwcyhmbGVldCk7XG59XG5cbmZ1bmN0aW9uIHBhaW50U2hpcHMoZmxlZXQpIHtcbiAgY29uc3QgY2VsbFBvc2l0aW9ucyA9IGdldENlbGxQb3NpdGlvbnMoKTtcblxuICBmbGVldC5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBkaXYuZGF0YXNldC5pZCA9IGluZGV4O1xuXG4gICAgY29uc3QgZmlyc3RDbyA9IFtdO1xuXG4gICAgY29uc3QgZGl2V2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtY2VsbFwiKS5vZmZzZXRXaWR0aDtcblxuICAgIHNoaXAuY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBmaXJzdENvLnB1c2goY29vcmRbMF0pO1xuICAgIH0pO1xuXG4gICAgaWYgKGZpcnN0Q29bMF0gPT09IGZpcnN0Q29bMV0pIHtcbiAgICAgIGRpdi5zdHlsZS53aWR0aCA9IGRpdldpZHRoICsgXCJweFwiO1xuICAgICAgZGl2LnN0eWxlLmhlaWdodCA9IHNoaXAubGVuZ3RoICogZGl2V2lkdGggKyBzaGlwLmxlbmd0aCAtIDEgKyBcInB4XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBkaXZXaWR0aCArIFwicHhcIjtcbiAgICAgIGRpdi5zdHlsZS53aWR0aCA9IHNoaXAubGVuZ3RoICogZGl2V2lkdGggKyBzaGlwLmxlbmd0aCAtIDEgKyBcInB4XCI7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBwcm9wIGluIGNlbGxQb3NpdGlvbnMpIHtcbiAgICAgIGlmIChjZWxsUG9zaXRpb25zW3Byb3BdLmNvb3JkcyA9PSBzaGlwLmNvb3Jkc1swXSkge1xuICAgICAgICBkaXYuc3R5bGUudG9wID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MudG9wICsgXCJweFwiO1xuICAgICAgICBkaXYuc3R5bGUubGVmdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLmxlZnQgKyBcInB4XCI7XG4gICAgICB9XG4gICAgfVxuICAgIHBsYXllckFyZWEuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICBkcmFnRWxlbWVudChkaXYpO1xuICAgIHJvdGF0ZVNoaXAoZGl2KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyU2hpcHMoKSB7XG4gIGNvbnN0IHNoaXBzID0gcGxheWVyQXJlYS5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIik7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLnJlbW92ZSgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyRmxlZXQocGxheWVyKSB7XG4gIGxldCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGxheWVyLnNlbGVjdG9yKTtcblxuICBwbGF5ZXIuZ2FtZWJvYXJkLmZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBjb25zdCBzaGlwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwLWljb25cIik7XG4gICAgc2hpcERpdi5zdHlsZS5oZWlnaHQgPSBcIjVweFwiO1xuICAgIHNoaXBEaXYuc3R5bGUud2lkdGggPSBzaGlwLmxlbmd0aCAqIDUgKyBcInB4XCI7XG5cbiAgICBib2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1sZW5ndGg9JyR7c2hpcC5sZW5ndGh9J11gKS5hcHBlbmRDaGlsZChzaGlwRGl2KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFjdGl2YXRlRWxlbWVudChlbGVtZW50KSB7XG4gIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICBlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcbn1cblxuZnVuY3Rpb24gZGVhY3RpdmF0ZUVsZW1lbnQoZWxlbWVudCkge1xuICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIjAuM1wiO1xuICBlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbn1cblxuZnVuY3Rpb24gdXNlck5hbWVJbnB1dCgpIHtcbiAgYWN0aXZhdGVFbGVtZW50KG5hbWVJbnB1dERpdik7XG4gIG5hbWVJbnB1dC5zdHlsZS5ib3hTaGFkb3cgPSBcIjBweCAwcHggNnB4IDNweCBibGFja1wiO1xuICBuYW1lU3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKG5hbWVJbnB1dC52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgbmFtZUlucHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0U4QjREQ1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwID0gcGxheWVyTmFtZS5xdWVyeVNlbGVjdG9yKFwicFwiKTtcbiAgICAgIGNvbnNvbGUubG9nKHApO1xuICAgICAgcC50ZXh0Q29udGVudCA9IG5hbWVJbnB1dC52YWx1ZTtcbiAgICAgIG5hbWVJbnB1dC52YWx1ZSA9IG51bGw7XG4gICAgICBuYW1lSW5wdXREaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgZ2FtZVNldFVwKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2FtZVNldFVwKCkge1xuICBkaXNwbGF5U2NvcmVzKCk7XG4gIHBvc2l0aW9uRmxlZXQoKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVNjb3JlcygpIHtcbiAgY29uc3Qgc2NvcmVzID0gc2NvcmVzQm94LnF1ZXJ5U2VsZWN0b3IoXCJwXCIpO1xuICBzY29yZXMudGV4dENvbnRlbnQgPSBnYW1lLnVzZXIuZ2FtZXNXb24gKyBcIiAtIFwiICsgZ2FtZS5jb21wLmdhbWVzV29uO1xufVxuXG5mdW5jdGlvbiBwb3NpdGlvbkZsZWV0KCkge1xuICBhY3RpdmF0ZUVsZW1lbnQocGxheWVyQXJlYSk7XG4gIGluc3RyTXNnKCk7XG4gIHBvcHVsYXRlQm9hcmQoZ2FtZS51c2VyKTtcbiAgcGxheUJ1dHRvbigpO1xufVxuXG5mdW5jdGlvbiBwbGF5QnV0dG9uKCkge1xuICBwbGF5QnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYXlCdG5IYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gcGxheUJ0bkhhbmRsZXIoKSB7XG4gIGlmIChjaGVja0ZvclJlZCgpKSB7XG4gICAgZ2V0TmV3RmxlZXRDb29yZHMoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0ZvclJlZCgpIHtcbiAgbGV0IHNoaXBzQXJlVmFsaWQgPSB0cnVlO1xuICBsZXQgc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW52YWxpZC1wb3NcIik7XG5cbiAgaWYgKHNoaXApIHtcbiAgICBzaGlwc0FyZVZhbGlkID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gc2hpcHNBcmVWYWxpZDtcbn1cblxuZnVuY3Rpb24gaW5zdHJNc2coKSB7XG4gIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPVxuICAgIFwiPHA+QXJyYW5nZSB5b3VyIHNoaXBzIGluIHByZXBhcmF0aW9uIGZvciBhIG5hdmFsIGJhdHRsZSE8L3A+XCI7XG4gIGluc3RydWN0aW9ucy5pbm5lckhUTUwgKz1cbiAgICBcIjxwPlRoZSBzaGlwcyBtdXN0IGFsbCBiZSBncmVlbiBiZWZvcmUgeW91IGNhbiBzdGFydCB0aGUgZ2FtZS48L3A+XCI7XG4gIGluc3RydWN0aW9ucy5pbm5lckhUTUwgKz0gXCI8cD4oRG91YmxlLWNsaWNrIHRvIHJvdGF0ZSBhIHNoaXAuKTwvcD5cIjtcbn1cblxuZnVuY3Rpb24gZHJhZ0VsZW1lbnQoZWxtbnQpIHtcbiAgbGV0IHBvczEgPSAwLFxuICAgIHBvczIgPSAwLFxuICAgIHBvczMgPSAwLFxuICAgIHBvczQgPSAwO1xuXG4gIGVsbW50Lm9ubW91c2Vkb3duID0gZHJhZ01vdXNlRG93bjtcblxuICBjb25zdCBib2FyZCA9IGdldEJvcmRlcigpO1xuXG4gIGZ1bmN0aW9uIGRyYWdNb3VzZURvd24oZSkge1xuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgIGNsb3NlRHJhZ0VsZW1lbnQoZWxtbnQpO1xuICAgIH07XG4gICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBlbGVtZW50RHJhZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGVsZW1lbnREcmFnKGUpIHtcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHBvczEgPSBwb3MzIC0gZS5jbGllbnRYO1xuICAgIHBvczIgPSBwb3M0IC0gZS5jbGllbnRZO1xuXG4gICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICBwb3M0ID0gZS5jbGllbnRZO1xuXG4gICAga2VlcEluQm91bmRzKGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tEb3duRHJhZyhlKSB7XG4gICAgaWYgKGUuY2xpZW50WSA+IHBvczQpIHtcbiAgICAgIHJldHVybiBlLmNsaWVudFkgLSBwb3M0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tSaWdodERyYWcoZSkge1xuICAgIGlmIChlLmNsaWVudFggPiBwb3MzKSB7XG4gICAgICByZXR1cm4gZS5jbGllbnRYIC0gcG9zMztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrTGVmdERyYWcoZSkge1xuICAgIGlmIChlLmNsaWVudFggPCBwb3MzKSB7XG4gICAgICByZXR1cm4gcG9zMyAtIGUuY2xpZW50WDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVXBEcmFnKGUpIHtcbiAgICBpZiAoZS5jbGllbnRZIDwgcG9zNCkge1xuICAgICAgcmV0dXJuIHBvczQgLSBlLmNsaWVudFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBrZWVwSW5Cb3VuZHMoZSkge1xuICAgIGlmICghY2hlY2tQb3NpdGlvbihlbG1udCkpIHtcbiAgICAgIGVsbW50LnN0eWxlLnRvcCA9IGVsbW50Lm9mZnNldFRvcCAtIHBvczIgKyBcInB4XCI7XG4gICAgICBlbG1udC5zdHlsZS5sZWZ0ID0gZWxtbnQub2Zmc2V0TGVmdCAtIHBvczEgKyBcInB4XCI7XG4gICAgfSBlbHNlIGlmIChjaGVja1Bvc2l0aW9uKGVsbW50KSA9PT0gXCJ0b3BcIikge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID0gYm9hcmQudG9wICsgY2hlY2tEb3duRHJhZyhlKSArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmxlZnQgPSBlbG1udC5vZmZzZXRMZWZ0IC0gcG9zMSArIFwicHhcIjtcbiAgICB9IGVsc2UgaWYgKGNoZWNrUG9zaXRpb24oZWxtbnQpID09PSBcImxlZnRcIikge1xuICAgICAgZWxtbnQuc3R5bGUudG9wID0gZWxtbnQub2Zmc2V0VG9wIC0gcG9zMiArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmxlZnQgPSBib2FyZC5sZWZ0ICsgY2hlY2tSaWdodERyYWcoZSkgKyBcInB4XCI7XG4gICAgfSBlbHNlIGlmIChjaGVja1Bvc2l0aW9uKGVsbW50KSA9PT0gXCJyaWdodFwiKSB7XG4gICAgICBlbG1udC5zdHlsZS50b3AgPSBlbG1udC5vZmZzZXRUb3AgLSBwb3MyICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9XG4gICAgICAgIGJvYXJkLnJpZ2h0IC0gZWxtbnQub2Zmc2V0V2lkdGggLSBjaGVja0xlZnREcmFnKGUpICsgXCJweFwiO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tQb3NpdGlvbihlbG1udCkgPT09IFwiYm90dG9tXCIpIHtcbiAgICAgIGVsbW50LnN0eWxlLnRvcCA9XG4gICAgICAgIGJvYXJkLmJvdHRvbSAtIGVsbW50Lm9mZnNldEhlaWdodCAtIGNoZWNrVXBEcmFnKGUpICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IGVsbW50Lm9mZnNldExlZnQgLSBwb3MxICsgXCJweFwiO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrUG9zaXRpb24oZWxtbnQpIHtcbiAgICBjb25zdCBlbG1udFJlY3QgPSBlbG1udC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGlmIChlbG1udFJlY3QudG9wIDwgYm9hcmQudG9wKSB7XG4gICAgICByZXR1cm4gXCJ0b3BcIjtcbiAgICB9IGVsc2UgaWYgKGVsbW50UmVjdC5sZWZ0IDwgYm9hcmQubGVmdCkge1xuICAgICAgcmV0dXJuIFwibGVmdFwiO1xuICAgIH0gZWxzZSBpZiAoZWxtbnRSZWN0LnJpZ2h0ID4gYm9hcmQucmlnaHQpIHtcbiAgICAgIHJldHVybiBcInJpZ2h0XCI7XG4gICAgfSBlbHNlIGlmIChlbG1udFJlY3QuYm90dG9tID4gYm9hcmQuYm90dG9tKSB7XG4gICAgICByZXR1cm4gXCJib3R0b21cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlRHJhZ0VsZW1lbnQoZWxtbnQpIHtcbiAgICBncmlkU25hcChlbG1udCk7XG4gICAgZG9jdW1lbnQub25tb3VzZXVwID0gbnVsbDtcbiAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm90YXRlU2hpcChlbG1udCkge1xuICBlbG1udC5vbmRibGNsaWNrID0gcm90YXRlO1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZSgpIHtcbiAgICBjb25zdCBib2FyZCA9IGdldEJvcmRlcigpO1xuXG4gICAgY29uc3QgZWxtbnRSZWN0ID0gZWxtbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCBmdXR1cmVSaWdodCA9IGVsbW50UmVjdC5sZWZ0ICsgZWxtbnRSZWN0LmhlaWdodDtcbiAgICBjb25zdCBmdXR1cmVCb3R0b20gPSBlbG1udFJlY3QudG9wICsgZWxtbnRSZWN0LndpZHRoO1xuXG4gICAgaWYgKCEoZnV0dXJlUmlnaHQgLSAxID4gYm9hcmQucmlnaHQgfHwgZnV0dXJlQm90dG9tIC0gMSA+IGJvYXJkLmJvdHRvbSkpIHtcbiAgICAgIGVsbW50LnN0eWxlLndpZHRoID0gZWxtbnRSZWN0LmhlaWdodCArIFwicHhcIjtcbiAgICAgIGVsbW50LnN0eWxlLmhlaWdodCA9IGVsbW50UmVjdC53aWR0aCArIFwicHhcIjtcbiAgICAgIGNoZWNrUHJveGltaXR5KGVsbW50KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tQcm94aW1pdHkoZWxtbnQpIHtcbiAgY29uc3QgZWxtbnRSZWN0ID0gZWxtbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgY29uc3Qgc2hpcFpvbmVzID0gZ2V0U2hpcFpvbmVzKGVsbW50KTtcblxuICBmb3IgKGNvbnN0IHByb3AgaW4gc2hpcFpvbmVzKSB7XG4gICAgY29uc3QgdG9wQm91bmQgPSBzaGlwWm9uZXNbcHJvcF0udG9wO1xuICAgIGNvbnN0IGxlZnRCb3VuZCA9IHNoaXBab25lc1twcm9wXS5sZWZ0O1xuICAgIGNvbnN0IHJpZ2h0Qm91bmQgPSBzaGlwWm9uZXNbcHJvcF0ucmlnaHQ7XG4gICAgY29uc3QgYm90dG9tQm91bmQgPSBzaGlwWm9uZXNbcHJvcF0uYm90dG9tO1xuXG4gICAgaWYgKFxuICAgICAgKGVsbW50UmVjdC50b3AgPCBib3R0b21Cb3VuZCAmJlxuICAgICAgICBlbG1udFJlY3QubGVmdCA8IHJpZ2h0Qm91bmQgJiZcbiAgICAgICAgZWxtbnRSZWN0LnRvcCA+IHRvcEJvdW5kICYmXG4gICAgICAgIGVsbW50UmVjdC5sZWZ0ID4gbGVmdEJvdW5kKSB8fFxuICAgICAgKGVsbW50UmVjdC50b3AgPCBib3R0b21Cb3VuZCAmJlxuICAgICAgICBlbG1udFJlY3QucmlnaHQgPCByaWdodEJvdW5kICYmXG4gICAgICAgIGVsbW50UmVjdC50b3AgPiB0b3BCb3VuZCAmJlxuICAgICAgICBlbG1udFJlY3QucmlnaHQgPiBsZWZ0Qm91bmQpIHx8XG4gICAgICAoZWxtbnRSZWN0LmJvdHRvbSA8IGJvdHRvbUJvdW5kICYmXG4gICAgICAgIGVsbW50UmVjdC5sZWZ0IDwgcmlnaHRCb3VuZCAmJlxuICAgICAgICBlbG1udFJlY3QuYm90dG9tID4gdG9wQm91bmQgJiZcbiAgICAgICAgZWxtbnRSZWN0LmxlZnQgPiBsZWZ0Qm91bmQpIHx8XG4gICAgICAoZWxtbnRSZWN0LmJvdHRvbSA8IGJvdHRvbUJvdW5kICYmXG4gICAgICAgIGVsbW50UmVjdC5yaWdodCA8IHJpZ2h0Qm91bmQgJiZcbiAgICAgICAgZWxtbnRSZWN0LmJvdHRvbSA+IHRvcEJvdW5kICYmXG4gICAgICAgIGVsbW50UmVjdC5yaWdodCA+IGxlZnRCb3VuZClcbiAgICApIHtcbiAgICAgIGVsbW50LmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkLXBvc1wiKTtcblxuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsbW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLXBvc1wiKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Qm9yZGVyKCkge1xuICBjb25zdCBpbmZvID0gcGxheWVyQm9hcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHJldHVybiB7XG4gICAgdG9wOiBNYXRoLnJvdW5kKGluZm8udG9wKSxcbiAgICBsZWZ0OiBNYXRoLnJvdW5kKGluZm8ubGVmdCksXG4gICAgcmlnaHQ6IE1hdGgucm91bmQoaW5mby5yaWdodCksXG4gICAgYm90dG9tOiBNYXRoLnJvdW5kKGluZm8uYm90dG9tKSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbFBvc2l0aW9ucygpIHtcbiAgY29uc3QgY2VsbFBvc2l0aW9ucyA9IHt9O1xuXG4gIGNvbnN0IGNlbGxzID0gcGxheWVyQm9hcmRcbiAgICAucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIilcbiAgICAuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGNlbGxPYmogPSB7fTtcbiAgICAgIGNlbGxPYmouc2NyZWVuUG9zID0gY2VsbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNlbGxPYmouY29vcmRzID0gY2VsbC5kYXRhc2V0LnggKyBjZWxsLmRhdGFzZXQueTtcbiAgICAgIGNlbGxQb3NpdGlvbnNbaW5kZXhdID0gY2VsbE9iajtcbiAgICB9KTtcblxuICByZXR1cm4gY2VsbFBvc2l0aW9ucztcbn1cblxuZnVuY3Rpb24gZ2V0U2hpcFpvbmVzKGVsbW50KSB7XG4gIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSB7fTtcblxuICBjb25zdCBjZWxsQnVmZmVyID0gZ3JpZENlbGwub2Zmc2V0V2lkdGg7XG5cbiAgcGxheWVyQXJlYS5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIikuZm9yRWFjaCgoc2hpcCwgaW5kZXgpID0+IHtcbiAgICBpZiAoc2hpcC5kYXRhc2V0LmlkICE9PSBlbG1udC5kYXRhc2V0LmlkKSB7XG4gICAgICBjb25zdCBzaGlwT2JqID0ge307XG4gICAgICBjb25zdCBzaGlwRGl2UG9zID0gc2hpcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHNoaXBPYmoudG9wID0gc2hpcERpdlBvcy50b3AgLSBjZWxsQnVmZmVyO1xuICAgICAgc2hpcE9iai5sZWZ0ID0gc2hpcERpdlBvcy5sZWZ0IC0gY2VsbEJ1ZmZlcjtcbiAgICAgIHNoaXBPYmoucmlnaHQgPSBzaGlwRGl2UG9zLnJpZ2h0ICsgY2VsbEJ1ZmZlcjtcbiAgICAgIHNoaXBPYmouYm90dG9tID0gc2hpcERpdlBvcy5ib3R0b20gKyBjZWxsQnVmZmVyO1xuICAgICAgc2hpcFBvc2l0aW9uc1tpbmRleF0gPSBzaGlwT2JqO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBzaGlwUG9zaXRpb25zO1xufVxuXG5mdW5jdGlvbiBncmlkU25hcChlbG1udCkge1xuICBjb25zdCBjZWxsUG9zaXRpb25zID0gZ2V0Q2VsbFBvc2l0aW9ucyhcIi5wbGF5ZXItYm9hcmRcIik7XG5cbiAgY29uc3QgZWxtbnRQb3MgPSBlbG1udC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBmb3IgKGNvbnN0IHByb3AgaW4gY2VsbFBvc2l0aW9ucykge1xuICAgIGNvbnN0IHhMb3dlciA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLnggLSAyNTtcbiAgICBjb25zdCB5TG93ZXIgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy55IC0gMjU7XG4gICAgY29uc3QgeExpbWl0ID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MueCArIDI1O1xuICAgIGNvbnN0IHlMaW1pdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLnkgKyAyNTtcblxuICAgIGlmIChcbiAgICAgIGVsbW50UG9zLnggPj0geExvd2VyICYmXG4gICAgICBlbG1udFBvcy55ID49IHlMb3dlciAmJlxuICAgICAgZWxtbnRQb3MueCA8PSB4TGltaXQgJiZcbiAgICAgIGVsbW50UG9zLnkgPD0geUxpbWl0XG4gICAgKSB7XG4gICAgICBlbG1udC5zdHlsZS50b3AgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy50b3AgKyBcInB4XCI7XG4gICAgICBlbG1udC5zdHlsZS5sZWZ0ID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MubGVmdCArIFwicHhcIjtcblxuICAgICAgZWxtbnQuZGF0YXNldC54ID0gY2VsbFBvc2l0aW9uc1twcm9wXS5jb29yZHNbMF07XG4gICAgICBlbG1udC5kYXRhc2V0LnkgPSBjZWxsUG9zaXRpb25zW3Byb3BdLmNvb3Jkc1sxXTtcblxuICAgICAgY2hlY2tQcm94aW1pdHkoZWxtbnQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge1xuICBwb3B1bGF0ZUJvYXJkLFxuICBhY3RpdmF0ZUVsZW1lbnQsXG4gIGRyYWdFbGVtZW50LFxuICByZW5kZXJGbGVldCxcbiAgdXNlck5hbWVJbnB1dCxcbiAgcGFpbnRTaGlwcyxcbiAgY2xlYXJTaGlwcyxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vLi4vc3R5bGVzLmNzc1wiO1xuaW1wb3J0IHsgZ2FtZSwgc3RhcnRHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgc3RhcnRCdG4sIHBsYXllckJvYXJkLCBjb21wQm9hcmQgfSBmcm9tIFwiLi9lbGVtZW50c1wiO1xuaW1wb3J0IHtcbiAgcG9wdWxhdGVCb2FyZCxcbiAgYWN0aXZhdGVFbGVtZW50LFxuICBkcmFnRWxlbWVudCxcbiAgcmVuZGVyRmxlZXQsXG4gIHVzZXJOYW1lSW5wdXQsXG4gIHBhaW50U2hpcHMsXG4gIGNsZWFyU2hpcHMsXG59IGZyb20gXCIuL3VpXCI7XG5cbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHN0YXJ0QnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgc3RhcnRHYW1lKCk7XG4gIHVzZXJOYW1lSW5wdXQoKTtcbiAgcmVuZGVyRmxlZXQoZ2FtZS51c2VyKTtcbiAgcmVuZGVyRmxlZXQoZ2FtZS5jb21wKTtcbn0pO1xuXG53aW5kb3cub25yZXNpemUgPSB0aGluZztcblxuZnVuY3Rpb24gdGhpbmcoKSB7XG4gIGNsZWFyU2hpcHMoKTtcbiAgcGFpbnRTaGlwcyhnYW1lLnVzZXIuZ2FtZWJvYXJkLmZsZWV0KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==