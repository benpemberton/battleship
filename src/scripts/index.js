import "./../styles.css";
import { prepareGame } from "./game";
import { startBtn } from "./elements";
import { displaySetUp } from "./ui";

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  prepareGame();
  displaySetUp();
});
