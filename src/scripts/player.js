import { game } from "./game";

function Player(name) {
  if (name === "computer") {
    return {
      name,
      gamesWon: 0,
      gameboard: null,
      selector: ".comp-board",

      sendAttack() {
        let coord = this.getCoord();

        if (this.checkPreviousMoves(coord)) {
          this.sendAttack();
        } else {
          game.user.receiveAttack(coord);
        }
      },

      getCoord() {
        const x = getRandomInt().toString();
        const y = getRandomInt().toString();
        const coord = x + y;
        return coord;
      },

      checkPreviousMoves(coord) {
        const hits = [];
        const missed = game.user.missedShots;

        game.user.fleet.forEach((ship) => {
          ship.hits.forEach((hit) => {
            hits.push(hit);
          });
        });

        missed.forEach((miss) => {
          hits.push(miss);
        });

        if (hits.includes(coord)) {
          return true;
        }
      },
    };
  } else {
    return {
      name,
      gamesWon: 0,
      gameboard: null,
      selector: ".player-board",
    };
  }
}

function getRandomInt() {
  return Math.floor(Math.random() * 10);
}

export default Player;
