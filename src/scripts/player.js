import { game } from "./game";
import Gameboard from "./gameboard";

function Player(name) {
  const proto = {
    demo: [],

    sendAttack() {
      let coord = this.getRandomCoord(10);

      if (this.checkPreviousMoves(coord)) {
        this.sendAttack();
      } else {
        game.user.gameboard.receiveAttack(coord);
      }
    },

    getRandomCoord(factor) {
      const x = this.getRandomInt(factor).toString();
      const y = this.getRandomInt(factor).toString();
      const coord = x + y;
      return coord;
    },

    getStartCoord(length, axis) {
      const coord = this.getRandomCoord(10);

      if (coord[axis] > 10 - length || this.checkForDuplicate(coord)) {
        return this.getStartCoord(length, axis);
      } else {
        return coord;
      }
    },

    checkForDuplicate(coord) {
      return this.gameboard.fleet.some((ship) => {
        return ship.coords.some((item) => item == coord);
      });
    },

    createFleet() {
      let self = this;

      generateShipCoords("carrier", 5);
      generateShipCoords("battleship", 4);
      generateShipCoords("cruiser", 3);
      generateShipCoords("submarine", 3);
      generateShipCoords("destroyer", 2);

      console.log(game.user.gameboard.fleet);

      function generateShipCoords(name, length) {
        const axis = self.getRandomInt(2);

        let coord = self.getStartCoord(length, axis);

        coord = [coord];

        let addAxis = 0;
        let sameAxis = 0;

        axis == 0 ? (sameAxis = 1) : (addAxis = 1);

        for (let j = 0; j < length - 1; j++) {
          let newCoord;

          let num = Number(coord[coord.length - 1][addAxis]);

          axis == 0
            ? (newCoord = (num += 1) + coord[coord.length - 1][sameAxis])
            : (newCoord = coord[coord.length - 1][sameAxis] + (num += 1));

          if (self.checkForDuplicate(newCoord)) {
            return generateShipCoords(name, length);
          } else {
            coord.push(newCoord);
          }
        }
        self.gameboard.placeShip(name, coord);
      }
    },

    checkPreviousMoves(coord) {
      const hits = [];
      const missed = game.user.gameboard.missedShots;

      game.user.gameboard.fleet.forEach((ship) => {
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

    getRandomInt(factor) {
      return Math.floor(Math.random() * factor);
    },
  };

  const obj = Object.create(proto);

  obj.name = name;
  obj.gamesWon = 0;
  obj.gameboard = null;

  return obj;
}

export default Player;
