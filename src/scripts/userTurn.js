import { game } from "./game";
import {
  showMissedCell,
  showStruckCell,
  switchPlayerTurn,
  highlightSunkShip,
  replayButton,
} from "./ui";
import { instructions, playerBoard, compBoard } from "./elements";

function userTurn(cell) {
  const coords = cell.dataset.xy;
  const ship = game.comp.gameboard.receiveAttack(coords);

  if (ship) {
    showStruckCell(cell);

    if (ship.status === "sunk") {
      instructions.innerHTML = `<p>You sank their ${ship.name}!!</p>`;
      highlightSunkShip(ship, compBoard);

      if (game.comp.gameboard.checkFleetStatus()) {
        instructions.innerHTML = `<p>You've won!!!</p>`;
        game.user.gamesWon += 1;
        game.lastWinner = game.user.name;
        return replayButton();
      }
    } else {
      instructions.innerHTML = "<p>You hit one of their ships.</p>";
    }

    switchPlayerTurn("comp");
  } else {
    showMissedCell(cell);
    instructions.innerHTML = "<p>Your attack missed.</p>";

    switchPlayerTurn("comp");
  }
}

function compTurn() {
  setTimeout(() => {
    const coords = game.comp.compAttack();
    const ship = game.user.gameboard.receiveAttack(coords);
    const cell = playerBoard.querySelector(`[data-xy='${coords}']`);

    if (ship) {
      showStruckCell(cell);

      if (ship.status === "sunk") {
        highlightSunkShip(ship, playerBoard);
        instructions.innerHTML = `<p>The computer sank your ${ship.name}!!</p>`;

        if (game.user.gameboard.checkFleetStatus()) {
          instructions.innerHTML = `<p>Oh no, you lost!</p>`;
          game.comp.gamesWon += 1;
          game.lastWinner = game.comp.name;
          return replayButton();
        }
      } else {
        instructions.innerHTML = "<p>The computer hit one of your ships.</p>";
      }

      switchPlayerTurn("player");
    } else {
      showMissedCell(cell);
      instructions.innerHTML = "<p>The computer's attack missed.</p>";

      switchPlayerTurn("player");
    }
  }, 1500);
}

export { userTurn, compTurn };
