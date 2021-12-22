import "./../styles.css";
import { game, startGame } from "./game";
import { startBtn, playerBoard, compBoard } from "./elements";
import {
  populateBoard,
  activateElement,
  dragElement,
  renderFleet,
  userNameInput,
  paintShips,
  clearShips,
} from "./ui";

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  startGame();
  userNameInput();
//   renderFleet(game.user);
//   renderFleet(game.comp);
});

window.onresize = thing;

function thing() {
  clearShips();
  paintShips(game.user.gameboard.fleet);
}
