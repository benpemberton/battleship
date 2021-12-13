import Gameboard from "./gameboard";
import Player from "./player";

const game = {
  user: null,
  comp: null,
};

function getRandomInt(factor) {
  return Math.floor(Math.random() * factor);
}

function startGame() {
  game.user = Player("placeholder");
  game.comp = Player("computer");
  game.user.gameboard = Gameboard();
  game.comp.gameboard = Gameboard();

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

export { game, startGame, getRandomInt };
