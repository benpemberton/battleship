import Gameboard from "./gameboard";
import Player from "./player";

const game = {
  user: null,
  comp: null,
};

function startGame() {
  game.user = Player("placeholder");
  game.comp = Player("computer");
  game.user.gameboard = Gameboard();
  game.comp.gameboard = Gameboard();

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

export { game, startGame };
