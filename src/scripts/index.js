import "./../styles.css";
import { game, prepareGame } from "./game";
import { startBtn, playerBoard, compBoard } from "./elements";
import { displaySetUp } from "./ui";

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  prepareGame();
  displaySetUp();
});
