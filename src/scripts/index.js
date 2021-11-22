import "./../styles.css";
import { game, startGame } from "./game";
import { startBtn, playerBoard, compBoard } from "./elements";
import { populateBoard, activateScreen, dragElement } from "./ui";

dragElement(document.querySelector(".testdiv"));

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  startGame();
  activateScreen();
  populateBoard(game.user, ".player-board");
  populateBoard(game.comp, ".comp-board");
});
