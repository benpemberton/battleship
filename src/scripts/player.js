const game = require("./game");

function Player(name) {
  if (name === "computer") {
    return {
      name,
      gamesWon: 0,
      coordLetters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
      coordNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

      sendAttack() {
        let coord = this.getCoord();

        if (this.checkPreviousMoves(coord)) {
          this.sendAttack();
        } else {
          game.user.receiveAttack(coord);
        }
      },

      getCoord() {
        const number = this.coordNumbers[getRandomInt()];
        const letter = this.coordLetters[getRandomInt()];
        const coord = letter + number;
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
    };
  }
}

function getRandomInt() {
  return Math.floor(Math.random() * 10);
}

module.exports = Player;
