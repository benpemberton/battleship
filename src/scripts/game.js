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

  game.user.createFleet();
  game.comp.createFleet();
}

export { game, startGame };
