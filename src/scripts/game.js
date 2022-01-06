import Gameboard from "./gameboard";
import Player from "./player";

const game = {
  user: null,
  comp: null,
  lastWinner: null,
};

function prepareGame(username) {
  game.user = Player(username);
  game.comp = Player("computer");
  game.user.gameboard = Gameboard();
  game.comp.gameboard = Gameboard();
  game.user.createFleet();
  game.comp.createFleet();
}

function resetGame() {
  game.user.gameboard.newRound();
  game.comp.gameboard.newRound();
  game.user.createFleet();
  game.comp.createFleet();
}

export { game, prepareGame, resetGame };
