const ship = require("./ship");

function gameboard() {
  return {
    fleet: [],
    boardPositions: {
      a1: false,
      a2: false,
      a3: false,
      a4: false,
      a5: false,
      a6: false,
      a7: false,
    },
    missedShots: [],

    placeShip(coords) {
      const newShip = ship(coords);

      newShip.coords.forEach((coord) => {
        const posArray = Object.keys(this.boardPositions);
        const position = posArray.find((pos) => pos === coord);
        this.boardPositions[position] = true;
      });

      this.fleet.push(newShip);
    },

    receiveAttack(pos) {
      let hit = false;

      for (let i = 0; i <= this.fleet.length - 1; i++) {
        if (this.fleet[i].coords.includes(pos)) {
          this.fleet[i].hit(pos);
          hit = true;
          break;
        }
      }

      if (!hit) {
        this.missedShots.push(pos);
      }
    },
  };
}

module.exports = gameboard;
