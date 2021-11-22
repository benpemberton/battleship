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
/* harmony export */   "compBoard": () => (/* binding */ compBoard)
/* harmony export */ });
const startBtn = document.querySelector(".start");
const playerBoard = document.querySelector(".player-board");
const compBoard = document.querySelector(".comp-board");




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

  game.user.gameboard.placeShip(["00", "10", "20"]);
  game.user.gameboard.placeShip(["41", "42", "43"]);
  game.user.gameboard.placeShip(["81", "82", "83"]);
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
/* harmony export */   "activateScreen": () => (/* binding */ activateScreen),
/* harmony export */   "dragElement": () => (/* binding */ dragElement)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/scripts/game.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements */ "./src/scripts/elements.js");



function populateBoard(player, selector) {
  const fleet = player.gameboard.fleet;

  let board = null;

  selector === ".player-board" ? (board = _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard) : (board = _elements__WEBPACK_IMPORTED_MODULE_1__.compBoard);

  const cellPositions = getCellPositions(selector);

  fleet.forEach((ship) => {
    const div = document.createElement("div");
    div.classList.add("ship");

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

    console.log(ship.length);

    for (const prop in cellPositions) {
      if (cellPositions[prop].coords === ship.coords) {
        console.log(cellPositions[prop].coords);
        div.style.top = cellPositions[prop].screenPos.top;
        div.style.left = cellPositions[prop].screenPos.left;
        break;
      }
    }

    board.appendChild(div);
  });
}

function activateScreen() {
  _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.style.opacity = "1";
  _elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard.style.pointerEvents = "auto";
  _elements__WEBPACK_IMPORTED_MODULE_1__.compBoard.style.opacity = "1";
  _elements__WEBPACK_IMPORTED_MODULE_1__.compBoard.style.pointerEvents = "auto";
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





(0,_ui__WEBPACK_IMPORTED_MODULE_3__.dragElement)(document.querySelector(".testdiv"));

_elements__WEBPACK_IMPORTED_MODULE_2__.startBtn.addEventListener("click", () => {
  _elements__WEBPACK_IMPORTED_MODULE_2__.startBtn.style.display = "none";
  (0,_game__WEBPACK_IMPORTED_MODULE_1__.startGame)();
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.activateScreen)();
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.populateBoard)(_game__WEBPACK_IMPORTED_MODULE_1__.game.user, ".player-board");
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.populateBoard)(_game__WEBPACK_IMPORTED_MODULE_1__.game.comp, ".comp-board");
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7O1VDbkl0RDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTnlCO0FBQ2dCO0FBQ3FCO0FBQ0k7O0FBRWxFLGdEQUFXOztBQUVYLGdFQUF5QjtBQUN6QixFQUFFLDZEQUFzQjtBQUN4QixFQUFFLGdEQUFTO0FBQ1gsRUFBRSxtREFBYztBQUNoQixFQUFFLGtEQUFhLENBQUMsNENBQVM7QUFDekIsRUFBRSxrREFBYSxDQUFDLDRDQUFTO0FBQ3pCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy5jc3M/MTU1MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy91aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKTtcbmNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIik7XG5jb25zdCBjb21wQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtYm9hcmRcIik7XG5cbmV4cG9ydCB7IHN0YXJ0QnRuLCBwbGF5ZXJCb2FyZCwgY29tcEJvYXJkIH07XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuY29uc3QgZ2FtZSA9IHtcbiAgdXNlcjogbnVsbCxcbiAgY29tcDogbnVsbCxcbn07XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgZ2FtZS51c2VyID0gUGxheWVyKFwicGxhY2Vob2xkZXJcIik7XG4gIGdhbWUuY29tcCA9IFBsYXllcihcImNvbXB1dGVyXCIpO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIGdhbWUuY29tcC5nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcblxuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCIwMFwiLCBcIjEwXCIsIFwiMjBcIl0pO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCI0MVwiLCBcIjQyXCIsIFwiNDNcIl0pO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCI4MVwiLCBcIjgyXCIsIFwiODNcIl0pO1xuICBnYW1lLmNvbXAuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCIwMFwiLCBcIjEwXCIsIFwiMjBcIl0pO1xuICBnYW1lLmNvbXAuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCI0MVwiLCBcIjQyXCIsIFwiNDNcIl0pO1xuICBnYW1lLmNvbXAuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCI4MVwiLCBcIjgyXCIsIFwiODNcIl0pO1xufVxuXG5leHBvcnQgeyBnYW1lLCBzdGFydEdhbWUgfTtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuICByZXR1cm4ge1xuICAgIGZsZWV0OiBbXSxcbiAgICBtaXNzZWRTaG90czogW10sXG4gICAgZmxlZXRTdGF0dXM6IFtdLFxuXG4gICAgcGxhY2VTaGlwKGNvb3Jkcykge1xuICAgICAgY29uc3QgbmV3U2hpcCA9IFNoaXAoY29vcmRzKTtcblxuICAgICAgLy8gbmV3U2hpcC5jb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIC8vICAgY29uc3QgcG9zQXJyYXkgPSBPYmplY3Qua2V5cyh0aGlzLmJvYXJkUG9zaXRpb25zKTtcbiAgICAgIC8vICAgY29uc3QgcG9zaXRpb24gPSBwb3NBcnJheS5maW5kKChwb3MpID0+IHBvcyA9PT0gY29vcmQpO1xuICAgICAgLy8gICB0aGlzLmJvYXJkUG9zaXRpb25zW3Bvc2l0aW9uXSA9IHRydWU7XG4gICAgICAvLyB9KTtcblxuICAgICAgdGhpcy5mbGVldC5wdXNoKG5ld1NoaXApO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrKHBvcykge1xuICAgICAgbGV0IGhpdCA9IGZhbHNlO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLmZsZWV0Lmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5mbGVldFtpXS5jb29yZHMuaW5jbHVkZXMocG9zKSkge1xuICAgICAgICAgIHRoaXMuZmxlZXRbaV0uaGl0KHBvcyk7XG4gICAgICAgICAgaGl0ID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWhpdCkge1xuICAgICAgICB0aGlzLm1pc3NlZFNob3RzLnB1c2gocG9zKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVtbyA9IHBvcztcbiAgICB9LFxuXG4gICAgY2hlY2tGbGVldFN0YXR1cygpIHtcbiAgICAgIHRoaXMuZmxlZXRTdGF0dXMgPSBbXTtcblxuICAgICAgdGhpcy5mbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGlmIChzaGlwLnN0YXR1cyA9PT0gXCJzdW5rXCIpIHtcbiAgICAgICAgICB0aGlzLmZsZWV0U3RhdHVzLnB1c2goXCJzdW5rXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gaWYgKHRoaXMuZmxlZXRTdGF0dXMubGVuZ3RoID09PSB0aGlzLmZsZWV0Lmxlbmd0aCkge1xuICAgICAgLy8gICBhbGVydChcImV2ZXJ5dGhpbmcgaXMgc3Vua1wiKTtcbiAgICAgIC8vIH1cbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJpbXBvcnQgeyBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuXG5mdW5jdGlvbiBQbGF5ZXIobmFtZSkge1xuICBpZiAobmFtZSA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBnYW1lc1dvbjogMCxcbiAgICAgIGdhbWVib2FyZDogbnVsbCxcblxuICAgICAgc2VuZEF0dGFjaygpIHtcbiAgICAgICAgbGV0IGNvb3JkID0gdGhpcy5nZXRDb29yZCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrUHJldmlvdXNNb3Zlcyhjb29yZCkpIHtcbiAgICAgICAgICB0aGlzLnNlbmRBdHRhY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYW1lLnVzZXIucmVjZWl2ZUF0dGFjayhjb29yZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGdldENvb3JkKCkge1xuICAgICAgICBjb25zdCB4ID0gZ2V0UmFuZG9tSW50KCkudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgeSA9IGdldFJhbmRvbUludCgpLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGNvb3JkID0geCArIHk7XG4gICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgIH0sXG5cbiAgICAgIGNoZWNrUHJldmlvdXNNb3Zlcyhjb29yZCkge1xuICAgICAgICBjb25zdCBoaXRzID0gW107XG4gICAgICAgIGNvbnN0IG1pc3NlZCA9IGdhbWUudXNlci5taXNzZWRTaG90cztcblxuICAgICAgICBnYW1lLnVzZXIuZmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICAgIHNoaXAuaGl0cy5mb3JFYWNoKChoaXQpID0+IHtcbiAgICAgICAgICAgIGhpdHMucHVzaChoaXQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBtaXNzZWQuZm9yRWFjaCgobWlzcykgPT4ge1xuICAgICAgICAgIGhpdHMucHVzaChtaXNzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGhpdHMuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIGdhbWVzV29uOiAwLFxuICAgICAgZ2FtZWJvYXJkOiBudWxsLFxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJmdW5jdGlvbiBTaGlwKGNvb3Jkcykge1xuICBjb25zdCBwcm90byA9IHtcbiAgICBoaXQobnVtYmVyKSB7XG4gICAgICBpZiAodGhpcy5jb29yZHMuaW5jbHVkZXMobnVtYmVyKSAmJiAhdGhpcy5oaXRzLmluY2x1ZGVzKG51bWJlcikpIHtcbiAgICAgICAgdGhpcy5oaXRzLnB1c2gobnVtYmVyKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNTdW5rKCkge1xuICAgICAgY29uc3Qgc3VuayA9IHRoaXMuaGl0cy5ldmVyeSgoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb29yZHMuaW5jbHVkZXMoaXRlbSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHN1bmsgPT09IHRydWUgJiYgdGhpcy5oaXRzLmxlbmd0aCA9PT0gdGhpcy5jb29yZHMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJzdW5rXCI7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvKTtcblxuICBvYmouY29vcmRzID0gY29vcmRzO1xuICBvYmoubGVuZ3RoID0gY29vcmRzLmxlbmd0aDtcbiAgb2JqLmhpdHMgPSBbXTtcbiAgb2JqLnN0YXR1cyA9IFwidW5zdW5rXCI7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsImltcG9ydCB7IHN0YXJ0R2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IHBsYXllckJvYXJkLCBjb21wQm9hcmQgfSBmcm9tIFwiLi9lbGVtZW50c1wiO1xuXG5mdW5jdGlvbiBwb3B1bGF0ZUJvYXJkKHBsYXllciwgc2VsZWN0b3IpIHtcbiAgY29uc3QgZmxlZXQgPSBwbGF5ZXIuZ2FtZWJvYXJkLmZsZWV0O1xuXG4gIGxldCBib2FyZCA9IG51bGw7XG5cbiAgc2VsZWN0b3IgPT09IFwiLnBsYXllci1ib2FyZFwiID8gKGJvYXJkID0gcGxheWVyQm9hcmQpIDogKGJvYXJkID0gY29tcEJvYXJkKTtcblxuICBjb25zdCBjZWxsUG9zaXRpb25zID0gZ2V0Q2VsbFBvc2l0aW9ucyhzZWxlY3Rvcik7XG5cbiAgZmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuXG4gICAgY29uc3QgZmlyc3RDbyA9IFtdO1xuXG4gICAgc2hpcC5jb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGZpcnN0Q28ucHVzaChjb29yZFswXSk7XG4gICAgfSk7XG5cbiAgICBpZiAoZmlyc3RDb1swXSA9PT0gZmlyc3RDb1sxXSkge1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gXCI1MHB4XCI7XG4gICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gc2hpcC5sZW5ndGggKiA1MCArIFwicHhcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgZGl2LnN0eWxlLmhlaWdodCA9IFwiNTBweFwiO1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gc2hpcC5sZW5ndGggKiA1MCArIFwicHhcIjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhzaGlwLmxlbmd0aCk7XG5cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gY2VsbFBvc2l0aW9ucykge1xuICAgICAgaWYgKGNlbGxQb3NpdGlvbnNbcHJvcF0uY29vcmRzID09PSBzaGlwLmNvb3Jkcykge1xuICAgICAgICBjb25zb2xlLmxvZyhjZWxsUG9zaXRpb25zW3Byb3BdLmNvb3Jkcyk7XG4gICAgICAgIGRpdi5zdHlsZS50b3AgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy50b3A7XG4gICAgICAgIGRpdi5zdHlsZS5sZWZ0ID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MubGVmdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFjdGl2YXRlU2NyZWVuKCkge1xuICBwbGF5ZXJCb2FyZC5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gIHBsYXllckJvYXJkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcbiAgY29tcEJvYXJkLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgY29tcEJvYXJkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcbn1cblxuZnVuY3Rpb24gZHJhZ0VsZW1lbnQoZWxtbnQpIHtcbiAgbGV0IHBvczEgPSAwLFxuICAgIHBvczIgPSAwLFxuICAgIHBvczMgPSAwLFxuICAgIHBvczQgPSAwO1xuXG4gIGVsbW50Lm9ubW91c2Vkb3duID0gZHJhZ01vdXNlRG93bjtcblxuICBmdW5jdGlvbiBkcmFnTW91c2VEb3duKGUpIHtcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHBvczMgPSBlLmNsaWVudFg7XG4gICAgcG9zNCA9IGUuY2xpZW50WTtcbiAgICBkb2N1bWVudC5vbm1vdXNldXAgPSAoKSA9PiB7XG4gICAgICBjbG9zZURyYWdFbGVtZW50KGVsbW50KTtcbiAgICB9O1xuICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gZWxlbWVudERyYWc7XG4gIH1cblxuICBmdW5jdGlvbiBlbGVtZW50RHJhZyhlKSB7XG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBwb3MxID0gcG9zMyAtIGUuY2xpZW50WDtcbiAgICBwb3MyID0gcG9zNCAtIGUuY2xpZW50WTtcbiAgICBwb3MzID0gZS5jbGllbnRYO1xuICAgIHBvczQgPSBlLmNsaWVudFk7XG4gICAgZWxtbnQuc3R5bGUudG9wID0gZWxtbnQub2Zmc2V0VG9wIC0gcG9zMiArIFwicHhcIjtcbiAgICBlbG1udC5zdHlsZS5sZWZ0ID0gZWxtbnQub2Zmc2V0TGVmdCAtIHBvczEgKyBcInB4XCI7XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZURyYWdFbGVtZW50KGVsbW50KSB7XG4gICAgZ3JpZFNuYXAoZWxtbnQpO1xuICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9IG51bGw7XG4gICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENlbGxQb3NpdGlvbnMoc2VsZWN0b3IpIHtcbiAgY29uc3QgY2VsbFBvc2l0aW9ucyA9IHt9O1xuXG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtzZWxlY3Rvcn0gLmdhbWVib2FyZGApO1xuXG4gIGNvbnN0IGNlbGxzID0gYm9hcmQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIikuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBjZWxsT2JqID0ge307XG4gICAgY2VsbE9iai5zY3JlZW5Qb3MgPSBjZWxsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNlbGxPYmouY29vcmRzID0gY2VsbC5kYXRhc2V0LnggKyBjZWxsLmRhdGFzZXQueTtcbiAgICBjZWxsUG9zaXRpb25zW2luZGV4XSA9IGNlbGxPYmo7XG4gIH0pO1xuXG4gIHJldHVybiBjZWxsUG9zaXRpb25zO1xufVxuXG5mdW5jdGlvbiBncmlkU25hcChlbG1udCkge1xuICBjb25zdCBjZWxsUG9zaXRpb25zID0gZ2V0Q2VsbFBvc2l0aW9ucyhcIi5wbGF5ZXItYm9hcmRcIik7XG5cbiAgY29uc3QgZWxtbnRQb3MgPSBlbG1udC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBsZXQgZWxtbnRDb29yZHM7XG5cbiAgZm9yIChjb25zdCBwcm9wIGluIGNlbGxQb3NpdGlvbnMpIHtcbiAgICBjb25zdCB4TG93ZXIgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy54IC0gMjU7XG4gICAgY29uc3QgeUxvd2VyID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MueSAtIDI1O1xuICAgIGNvbnN0IHhMaW1pdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLnggKyAyNTtcbiAgICBjb25zdCB5TGltaXQgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy55ICsgMjU7XG5cbiAgICBpZiAoXG4gICAgICBlbG1udFBvcy54ID49IHhMb3dlciAmJlxuICAgICAgZWxtbnRQb3MueSA+PSB5TG93ZXIgJiZcbiAgICAgIGVsbW50UG9zLnggPD0geExpbWl0ICYmXG4gICAgICBlbG1udFBvcy55IDw9IHlMaW1pdFxuICAgICkge1xuICAgICAgZWxtbnRDb29yZHMgPSBjZWxsUG9zaXRpb25zW3Byb3BdLmNvb3JkcztcblxuICAgICAgZWxtbnQuc3R5bGUudG9wID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MudG9wICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLmxlZnQgKyBcInB4XCI7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IHBvcHVsYXRlQm9hcmQsIGFjdGl2YXRlU2NyZWVuLCBkcmFnRWxlbWVudCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuLy4uL3N0eWxlcy5jc3NcIjtcbmltcG9ydCB7IGdhbWUsIHN0YXJ0R2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IHN0YXJ0QnRuLCBwbGF5ZXJCb2FyZCwgY29tcEJvYXJkIH0gZnJvbSBcIi4vZWxlbWVudHNcIjtcbmltcG9ydCB7IHBvcHVsYXRlQm9hcmQsIGFjdGl2YXRlU2NyZWVuLCBkcmFnRWxlbWVudCB9IGZyb20gXCIuL3VpXCI7XG5cbmRyYWdFbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVzdGRpdlwiKSk7XG5cbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHN0YXJ0QnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgc3RhcnRHYW1lKCk7XG4gIGFjdGl2YXRlU2NyZWVuKCk7XG4gIHBvcHVsYXRlQm9hcmQoZ2FtZS51c2VyLCBcIi5wbGF5ZXItYm9hcmRcIik7XG4gIHBvcHVsYXRlQm9hcmQoZ2FtZS5jb21wLCBcIi5jb21wLWJvYXJkXCIpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=