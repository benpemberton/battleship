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
/* harmony export */   "nameInput": () => (/* binding */ nameInput),
/* harmony export */   "nameSubmitBtn": () => (/* binding */ nameSubmitBtn),
/* harmony export */   "nameInputDiv": () => (/* binding */ nameInputDiv),
/* harmony export */   "playerName": () => (/* binding */ playerName),
/* harmony export */   "scoresBox": () => (/* binding */ scoresBox)
/* harmony export */ });
const startBtn = document.querySelector(".start");
const playerBoard = document.querySelector(".player-board");
const compBoard = document.querySelector(".comp-board");
const nameInput = document.querySelector(".name-input");
const nameSubmitBtn = document.querySelector(".name-submit");
const nameInputDiv = document.querySelector(".name-input-container");
const playerName = document.querySelector(".player-name");
const scoresBox = document.querySelector(".scores-box");




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

  game.user.gameboard.placeShip(["49"]);
  game.user.gameboard.placeShip(["37"]);
  game.user.gameboard.placeShip(["55"]);
  game.user.gameboard.placeShip(["99"]);
  game.user.gameboard.placeShip(["17", "27"]);
  game.user.gameboard.placeShip(["77", "78"]);
  game.user.gameboard.placeShip(["00", "10"]);
  game.user.gameboard.placeShip(["41", "42", "43"]);
  game.user.gameboard.placeShip(["81", "82", "83"]);
  game.user.gameboard.placeShip(["09", "19", "29", "39"]);
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
/* harmony export */   "userNameInput": () => (/* binding */ userNameInput)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/scripts/game.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements */ "./src/scripts/elements.js");



function populateBoard(player) {
  const fleet = player.gameboard.fleet;

  let board = document.querySelector(player.selector);

  const cellPositions = getCellPositions(player.selector);

  fleet.forEach((ship) => {
    const div = document.createElement("div");
    div.classList.add("ship");
    div.style.position = "absolute";

    const firstCo = [];

    const divWidth = document.querySelector(".grid-cell").offsetWidth;

    ship.coords.forEach((coord) => {
      firstCo.push(coord[0]);
    });

    if (firstCo[0] === firstCo[1]) {
      div.style.width = divWidth + "px";
      div.style.height = ship.length * divWidth + "px";
    } else {
      div.style.height = divWidth + "px";
      div.style.width = ship.length * divWidth + "px";
    }

    for (const prop in cellPositions) {
      if (cellPositions[prop].coords == ship.coords[0]) {
        div.style.top = cellPositions[prop].screenPos.top + "px";
        div.style.left = cellPositions[prop].screenPos.left + "px";
      }
    }
    board.appendChild(div);
    dragElement(div);
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
  activateElement(_elements__WEBPACK_IMPORTED_MODULE_1__.playerBoard);
  populateBoard(_game__WEBPACK_IMPORTED_MODULE_0__.game.user);
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





_elements__WEBPACK_IMPORTED_MODULE_2__.startBtn.addEventListener("click", () => {
  _elements__WEBPACK_IMPORTED_MODULE_2__.startBtn.style.display = "none";
  (0,_game__WEBPACK_IMPORTED_MODULE_1__.startGame)();
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.userNameInput)();
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.renderFleet)(_game__WEBPACK_IMPORTED_MODULE_1__.game.user);
  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.renderFleet)(_game__WEBPACK_IMPORTED_MODULE_1__.game.comp);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy91aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKTtcbmNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIik7XG5jb25zdCBjb21wQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtYm9hcmRcIik7XG5jb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtaW5wdXRcIik7XG5jb25zdCBuYW1lU3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYW1lLXN1Ym1pdFwiKTtcbmNvbnN0IG5hbWVJbnB1dERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS1pbnB1dC1jb250YWluZXJcIik7XG5jb25zdCBwbGF5ZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKTtcbmNvbnN0IHNjb3Jlc0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVzLWJveFwiKTtcblxuZXhwb3J0IHtcbiAgc3RhcnRCdG4sXG4gIHBsYXllckJvYXJkLFxuICBjb21wQm9hcmQsXG4gIG5hbWVJbnB1dCxcbiAgbmFtZVN1Ym1pdEJ0bixcbiAgbmFtZUlucHV0RGl2LFxuICBwbGF5ZXJOYW1lLFxuICBzY29yZXNCb3gsXG59O1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5cbmNvbnN0IGdhbWUgPSB7XG4gIHVzZXI6IG51bGwsXG4gIGNvbXA6IG51bGwsXG59O1xuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIGdhbWUudXNlciA9IFBsYXllcihcInBsYWNlaG9sZGVyXCIpO1xuICBnYW1lLmNvbXAgPSBQbGF5ZXIoXCJjb21wdXRlclwiKTtcbiAgZ2FtZS51c2VyLmdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICBnYW1lLmNvbXAuZ2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG5cbiAgZ2FtZS51c2VyLmdhbWVib2FyZC5wbGFjZVNoaXAoW1wiNDlcIl0pO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCIzN1wiXSk7XG4gIGdhbWUudXNlci5nYW1lYm9hcmQucGxhY2VTaGlwKFtcIjU1XCJdKTtcbiAgZ2FtZS51c2VyLmdhbWVib2FyZC5wbGFjZVNoaXAoW1wiOTlcIl0pO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCIxN1wiLCBcIjI3XCJdKTtcbiAgZ2FtZS51c2VyLmdhbWVib2FyZC5wbGFjZVNoaXAoW1wiNzdcIiwgXCI3OFwiXSk7XG4gIGdhbWUudXNlci5nYW1lYm9hcmQucGxhY2VTaGlwKFtcIjAwXCIsIFwiMTBcIl0pO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCI0MVwiLCBcIjQyXCIsIFwiNDNcIl0pO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCI4MVwiLCBcIjgyXCIsIFwiODNcIl0pO1xuICBnYW1lLnVzZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChbXCIwOVwiLCBcIjE5XCIsIFwiMjlcIiwgXCIzOVwiXSk7XG4gIGdhbWUuY29tcC5nYW1lYm9hcmQucGxhY2VTaGlwKFtcIjAwXCIsIFwiMTBcIiwgXCIyMFwiXSk7XG4gIGdhbWUuY29tcC5nYW1lYm9hcmQucGxhY2VTaGlwKFtcIjQxXCIsIFwiNDJcIiwgXCI0M1wiXSk7XG4gIGdhbWUuY29tcC5nYW1lYm9hcmQucGxhY2VTaGlwKFtcIjgxXCIsIFwiODJcIiwgXCI4M1wiXSk7XG59XG5cbmV4cG9ydCB7IGdhbWUsIHN0YXJ0R2FtZSB9O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gIHJldHVybiB7XG4gICAgZmxlZXQ6IFtdLFxuICAgIG1pc3NlZFNob3RzOiBbXSxcbiAgICBmbGVldFN0YXR1czogW10sXG5cbiAgICBwbGFjZVNoaXAoY29vcmRzKSB7XG4gICAgICBjb25zdCBuZXdTaGlwID0gU2hpcChjb29yZHMpO1xuXG4gICAgICAvLyBuZXdTaGlwLmNvb3Jkcy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgLy8gICBjb25zdCBwb3NBcnJheSA9IE9iamVjdC5rZXlzKHRoaXMuYm9hcmRQb3NpdGlvbnMpO1xuICAgICAgLy8gICBjb25zdCBwb3NpdGlvbiA9IHBvc0FycmF5LmZpbmQoKHBvcykgPT4gcG9zID09PSBjb29yZCk7XG4gICAgICAvLyAgIHRoaXMuYm9hcmRQb3NpdGlvbnNbcG9zaXRpb25dID0gdHJ1ZTtcbiAgICAgIC8vIH0pO1xuXG4gICAgICB0aGlzLmZsZWV0LnB1c2gobmV3U2hpcCk7XG4gICAgfSxcblxuICAgIHJlY2VpdmVBdHRhY2socG9zKSB7XG4gICAgICBsZXQgaGl0ID0gZmFsc2U7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMuZmxlZXQubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmZsZWV0W2ldLmNvb3Jkcy5pbmNsdWRlcyhwb3MpKSB7XG4gICAgICAgICAgdGhpcy5mbGVldFtpXS5oaXQocG9zKTtcbiAgICAgICAgICBoaXQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghaGl0KSB7XG4gICAgICAgIHRoaXMubWlzc2VkU2hvdHMucHVzaChwb3MpO1xuICAgICAgfVxuICAgICAgdGhpcy5kZW1vID0gcG9zO1xuICAgIH0sXG5cbiAgICBjaGVja0ZsZWV0U3RhdHVzKCkge1xuICAgICAgdGhpcy5mbGVldFN0YXR1cyA9IFtdO1xuXG4gICAgICB0aGlzLmZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgaWYgKHNoaXAuc3RhdHVzID09PSBcInN1bmtcIikge1xuICAgICAgICAgIHRoaXMuZmxlZXRTdGF0dXMucHVzaChcInN1bmtcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBpZiAodGhpcy5mbGVldFN0YXR1cy5sZW5ndGggPT09IHRoaXMuZmxlZXQubGVuZ3RoKSB7XG4gICAgICAvLyAgIGFsZXJ0KFwiZXZlcnl0aGluZyBpcyBzdW5rXCIpO1xuICAgICAgLy8gfVxuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCB7IGdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5cbmZ1bmN0aW9uIFBsYXllcihuYW1lKSB7XG4gIGlmIChuYW1lID09PSBcImNvbXB1dGVyXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIGdhbWVzV29uOiAwLFxuICAgICAgZ2FtZWJvYXJkOiBudWxsLFxuICAgICAgc2VsZWN0b3I6IFwiLmNvbXAtYm9hcmRcIixcblxuICAgICAgc2VuZEF0dGFjaygpIHtcbiAgICAgICAgbGV0IGNvb3JkID0gdGhpcy5nZXRDb29yZCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrUHJldmlvdXNNb3Zlcyhjb29yZCkpIHtcbiAgICAgICAgICB0aGlzLnNlbmRBdHRhY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYW1lLnVzZXIucmVjZWl2ZUF0dGFjayhjb29yZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGdldENvb3JkKCkge1xuICAgICAgICBjb25zdCB4ID0gZ2V0UmFuZG9tSW50KCkudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgeSA9IGdldFJhbmRvbUludCgpLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGNvb3JkID0geCArIHk7XG4gICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgIH0sXG5cbiAgICAgIGNoZWNrUHJldmlvdXNNb3Zlcyhjb29yZCkge1xuICAgICAgICBjb25zdCBoaXRzID0gW107XG4gICAgICAgIGNvbnN0IG1pc3NlZCA9IGdhbWUudXNlci5taXNzZWRTaG90cztcblxuICAgICAgICBnYW1lLnVzZXIuZmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICAgIHNoaXAuaGl0cy5mb3JFYWNoKChoaXQpID0+IHtcbiAgICAgICAgICAgIGhpdHMucHVzaChoaXQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBtaXNzZWQuZm9yRWFjaCgobWlzcykgPT4ge1xuICAgICAgICAgIGhpdHMucHVzaChtaXNzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGhpdHMuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIGdhbWVzV29uOiAwLFxuICAgICAgZ2FtZWJvYXJkOiBudWxsLFxuICAgICAgc2VsZWN0b3I6IFwiLnBsYXllci1ib2FyZFwiLFxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJmdW5jdGlvbiBTaGlwKGNvb3Jkcykge1xuICBjb25zdCBwcm90byA9IHtcbiAgICBoaXQobnVtYmVyKSB7XG4gICAgICBpZiAodGhpcy5jb29yZHMuaW5jbHVkZXMobnVtYmVyKSAmJiAhdGhpcy5oaXRzLmluY2x1ZGVzKG51bWJlcikpIHtcbiAgICAgICAgdGhpcy5oaXRzLnB1c2gobnVtYmVyKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNTdW5rKCkge1xuICAgICAgY29uc3Qgc3VuayA9IHRoaXMuaGl0cy5ldmVyeSgoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb29yZHMuaW5jbHVkZXMoaXRlbSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHN1bmsgPT09IHRydWUgJiYgdGhpcy5oaXRzLmxlbmd0aCA9PT0gdGhpcy5jb29yZHMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJzdW5rXCI7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvKTtcblxuICBvYmouY29vcmRzID0gY29vcmRzO1xuICBvYmoubGVuZ3RoID0gY29vcmRzLmxlbmd0aDtcbiAgb2JqLmhpdHMgPSBbXTtcbiAgb2JqLnN0YXR1cyA9IFwidW5zdW5rXCI7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsImltcG9ydCB7IHN0YXJ0R2FtZSwgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7XG4gIHBsYXllckJvYXJkLFxuICBjb21wQm9hcmQsXG4gIG5hbWVJbnB1dCxcbiAgbmFtZVN1Ym1pdEJ0bixcbiAgbmFtZUlucHV0RGl2LFxuICBwbGF5ZXJOYW1lLFxuICBzY29yZXNCb3gsXG59IGZyb20gXCIuL2VsZW1lbnRzXCI7XG5cbmZ1bmN0aW9uIHBvcHVsYXRlQm9hcmQocGxheWVyKSB7XG4gIGNvbnN0IGZsZWV0ID0gcGxheWVyLmdhbWVib2FyZC5mbGVldDtcblxuICBsZXQgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBsYXllci5zZWxlY3Rvcik7XG5cbiAgY29uc3QgY2VsbFBvc2l0aW9ucyA9IGdldENlbGxQb3NpdGlvbnMocGxheWVyLnNlbGVjdG9yKTtcblxuICBmbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXG4gICAgY29uc3QgZmlyc3RDbyA9IFtdO1xuXG4gICAgY29uc3QgZGl2V2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtY2VsbFwiKS5vZmZzZXRXaWR0aDtcblxuICAgIHNoaXAuY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBmaXJzdENvLnB1c2goY29vcmRbMF0pO1xuICAgIH0pO1xuXG4gICAgaWYgKGZpcnN0Q29bMF0gPT09IGZpcnN0Q29bMV0pIHtcbiAgICAgIGRpdi5zdHlsZS53aWR0aCA9IGRpdldpZHRoICsgXCJweFwiO1xuICAgICAgZGl2LnN0eWxlLmhlaWdodCA9IHNoaXAubGVuZ3RoICogZGl2V2lkdGggKyBcInB4XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBkaXZXaWR0aCArIFwicHhcIjtcbiAgICAgIGRpdi5zdHlsZS53aWR0aCA9IHNoaXAubGVuZ3RoICogZGl2V2lkdGggKyBcInB4XCI7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBwcm9wIGluIGNlbGxQb3NpdGlvbnMpIHtcbiAgICAgIGlmIChjZWxsUG9zaXRpb25zW3Byb3BdLmNvb3JkcyA9PSBzaGlwLmNvb3Jkc1swXSkge1xuICAgICAgICBkaXYuc3R5bGUudG9wID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MudG9wICsgXCJweFwiO1xuICAgICAgICBkaXYuc3R5bGUubGVmdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLmxlZnQgKyBcInB4XCI7XG4gICAgICB9XG4gICAgfVxuICAgIGJvYXJkLmFwcGVuZENoaWxkKGRpdik7XG4gICAgZHJhZ0VsZW1lbnQoZGl2KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckZsZWV0KHBsYXllcikge1xuICBsZXQgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBsYXllci5zZWxlY3Rvcik7XG5cbiAgcGxheWVyLmdhbWVib2FyZC5mbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgY29uc3Qgc2hpcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKFwic2hpcC1pY29uXCIpO1xuICAgIHNoaXBEaXYuc3R5bGUuaGVpZ2h0ID0gXCI1cHhcIjtcbiAgICBzaGlwRGl2LnN0eWxlLndpZHRoID0gc2hpcC5sZW5ndGggKiA1ICsgXCJweFwiO1xuXG4gICAgYm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEtbGVuZ3RoPScke3NoaXAubGVuZ3RofSddYCkuYXBwZW5kQ2hpbGQoc2hpcERpdik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhY3RpdmF0ZUVsZW1lbnQoZWxlbWVudCkge1xuICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG59XG5cbmZ1bmN0aW9uIGRlYWN0aXZhdGVFbGVtZW50KGVsZW1lbnQpIHtcbiAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIwLjNcIjtcbiAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIHVzZXJOYW1lSW5wdXQoKSB7XG4gIGFjdGl2YXRlRWxlbWVudChuYW1lSW5wdXREaXYpO1xuICBuYW1lSW5wdXQuc3R5bGUuYm94U2hhZG93ID0gXCIwcHggMHB4IDZweCAzcHggYmxhY2tcIjtcbiAgbmFtZVN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChuYW1lSW5wdXQudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgIG5hbWVJbnB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNFOEI0RENcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcCA9IHBsYXllck5hbWUucXVlcnlTZWxlY3RvcihcInBcIik7XG4gICAgICBjb25zb2xlLmxvZyhwKTtcbiAgICAgIHAudGV4dENvbnRlbnQgPSBuYW1lSW5wdXQudmFsdWU7XG4gICAgICBuYW1lSW5wdXQudmFsdWUgPSBudWxsO1xuICAgICAgbmFtZUlucHV0RGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGdhbWVTZXRVcCgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdhbWVTZXRVcCgpIHtcbiAgZGlzcGxheVNjb3JlcygpO1xuICBwb3NpdGlvbkZsZWV0KCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTY29yZXMoKSB7XG4gIGNvbnN0IHNjb3JlcyA9IHNjb3Jlc0JveC5xdWVyeVNlbGVjdG9yKFwicFwiKTtcbiAgc2NvcmVzLnRleHRDb250ZW50ID0gZ2FtZS51c2VyLmdhbWVzV29uICsgXCIgLSBcIiArIGdhbWUuY29tcC5nYW1lc1dvbjtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25GbGVldCgpIHtcbiAgYWN0aXZhdGVFbGVtZW50KHBsYXllckJvYXJkKTtcbiAgcG9wdWxhdGVCb2FyZChnYW1lLnVzZXIpO1xufVxuXG5mdW5jdGlvbiBkcmFnRWxlbWVudChlbG1udCkge1xuICBsZXQgcG9zMSA9IDAsXG4gICAgcG9zMiA9IDAsXG4gICAgcG9zMyA9IDAsXG4gICAgcG9zNCA9IDA7XG5cbiAgZWxtbnQub25tb3VzZWRvd24gPSBkcmFnTW91c2VEb3duO1xuXG4gIGZ1bmN0aW9uIGRyYWdNb3VzZURvd24oZSkge1xuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgIGNsb3NlRHJhZ0VsZW1lbnQoZWxtbnQpO1xuICAgIH07XG4gICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBlbGVtZW50RHJhZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGVsZW1lbnREcmFnKGUpIHtcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHBvczEgPSBwb3MzIC0gZS5jbGllbnRYO1xuICAgIHBvczIgPSBwb3M0IC0gZS5jbGllbnRZO1xuICAgIHBvczMgPSBlLmNsaWVudFg7XG4gICAgcG9zNCA9IGUuY2xpZW50WTtcbiAgICBlbG1udC5zdHlsZS50b3AgPSBlbG1udC5vZmZzZXRUb3AgLSBwb3MyICsgXCJweFwiO1xuICAgIGVsbW50LnN0eWxlLmxlZnQgPSBlbG1udC5vZmZzZXRMZWZ0IC0gcG9zMSArIFwicHhcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlRHJhZ0VsZW1lbnQoZWxtbnQpIHtcbiAgICBncmlkU25hcChlbG1udCk7XG4gICAgZG9jdW1lbnQub25tb3VzZXVwID0gbnVsbDtcbiAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbFBvc2l0aW9ucyhzZWxlY3Rvcikge1xuICBjb25zdCBjZWxsUG9zaXRpb25zID0ge307XG5cbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3NlbGVjdG9yfSAuZ2FtZWJvYXJkYCk7XG5cbiAgY29uc3QgY2VsbHMgPSBib2FyZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKS5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGNlbGxPYmogPSB7fTtcbiAgICBjZWxsT2JqLnNjcmVlblBvcyA9IGNlbGwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY2VsbE9iai5jb29yZHMgPSBjZWxsLmRhdGFzZXQueCArIGNlbGwuZGF0YXNldC55O1xuICAgIGNlbGxQb3NpdGlvbnNbaW5kZXhdID0gY2VsbE9iajtcbiAgfSk7XG5cbiAgcmV0dXJuIGNlbGxQb3NpdGlvbnM7XG59XG5cbmZ1bmN0aW9uIGdyaWRTbmFwKGVsbW50KSB7XG4gIGNvbnN0IGNlbGxQb3NpdGlvbnMgPSBnZXRDZWxsUG9zaXRpb25zKFwiLnBsYXllci1ib2FyZFwiKTtcblxuICBjb25zdCBlbG1udFBvcyA9IGVsbW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIGxldCBlbG1udENvb3JkcztcblxuICBmb3IgKGNvbnN0IHByb3AgaW4gY2VsbFBvc2l0aW9ucykge1xuICAgIGNvbnN0IHhMb3dlciA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLnggLSAyNTtcbiAgICBjb25zdCB5TG93ZXIgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy55IC0gMjU7XG4gICAgY29uc3QgeExpbWl0ID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MueCArIDI1O1xuICAgIGNvbnN0IHlMaW1pdCA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uc2NyZWVuUG9zLnkgKyAyNTtcblxuICAgIGlmIChcbiAgICAgIGVsbW50UG9zLnggPj0geExvd2VyICYmXG4gICAgICBlbG1udFBvcy55ID49IHlMb3dlciAmJlxuICAgICAgZWxtbnRQb3MueCA8PSB4TGltaXQgJiZcbiAgICAgIGVsbW50UG9zLnkgPD0geUxpbWl0XG4gICAgKSB7XG4gICAgICBlbG1udENvb3JkcyA9IGNlbGxQb3NpdGlvbnNbcHJvcF0uY29vcmRzO1xuXG4gICAgICBlbG1udC5zdHlsZS50b3AgPSBjZWxsUG9zaXRpb25zW3Byb3BdLnNjcmVlblBvcy50b3AgKyBcInB4XCI7XG4gICAgICBlbG1udC5zdHlsZS5sZWZ0ID0gY2VsbFBvc2l0aW9uc1twcm9wXS5zY3JlZW5Qb3MubGVmdCArIFwicHhcIjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgcG9wdWxhdGVCb2FyZCxcbiAgYWN0aXZhdGVFbGVtZW50LFxuICBkcmFnRWxlbWVudCxcbiAgcmVuZGVyRmxlZXQsXG4gIHVzZXJOYW1lSW5wdXQsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuLy4uL3N0eWxlcy5jc3NcIjtcbmltcG9ydCB7IGdhbWUsIHN0YXJ0R2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IHN0YXJ0QnRuLCBwbGF5ZXJCb2FyZCwgY29tcEJvYXJkIH0gZnJvbSBcIi4vZWxlbWVudHNcIjtcbmltcG9ydCB7XG4gIHBvcHVsYXRlQm9hcmQsXG4gIGFjdGl2YXRlRWxlbWVudCxcbiAgZHJhZ0VsZW1lbnQsXG4gIHJlbmRlckZsZWV0LFxuICB1c2VyTmFtZUlucHV0LFxufSBmcm9tIFwiLi91aVwiO1xuXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBzdGFydEJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIHN0YXJ0R2FtZSgpO1xuICB1c2VyTmFtZUlucHV0KCk7XG4gIHJlbmRlckZsZWV0KGdhbWUudXNlcik7XG4gIHJlbmRlckZsZWV0KGdhbWUuY29tcCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==