import "./../styles.css";
import { game, prepareGame } from "./game";
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
  userNameInput();
});
