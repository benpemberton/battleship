import { game, getRandomInt } from "./game";

function Player(name) {
  if (name === "computer") {
    return {
      name,
      gamesWon: 0,
      gameboard: null,
      selector: ".comp-board",
      demo: [],

      sendAttack() {
        let coord = this.getCoord(10);

        if (this.checkPreviousMoves(coord)) {
          this.sendAttack();
        } else {
          game.user.gameboard.receiveAttack(coord);
        }
      },

      getCoord(factor) {
        const x = getRandomInt(factor).toString();
        const y = getRandomInt(factor).toString();
        const coord = x + y;
        return coord;
      },

      createFleet() {
        let fleet = [
          ["01", "02", "03"],
          ["98", "99"],
          ["56", "57", "58", "59"],
          ["81", "91"],
        ];
        let currentIndex;
        let self = this;

        checkSpacing("61", 2, 0);

        // createSmallShips(1, 4, 0);
        // createLongShips(2, 3, 0);
        // createLongShips(3, 2, 0);
        // createLongShips(4, 1, 0);

        function createLongShips(length, factor, index) {
          for (let i = index; i < factor; i++) {
            let axis;
            getRandomInt(11) > 5 ? (axis = 0) : (axis = 1);

            let coord = self.getCoord(10 - length);
            if (checkValidity(coord, length, axis)) {
            }

            if (coord[0][axis] + (factor - 1) <= 9) {
              for (let j = 0; j < length - 1; j++) {
                let x = coord[coord.length - 1][0];
                let y = coord[coord.length - 1][1];
                let newCoord;

                let num = Number(coord[coord.length - 1][axis]);

                num == x
                  ? (newCoord = (num += 1) + y)
                  : (newCoord = x + (num += 1));
                coord.push(newCoord);
              }
            } else {
              currentIndex = i;
              createLongShips(length, factor, currentIndex);
              break;
            }
            // if (checkForValidity(coord)) {
            //   currentIndex = i;
            //   createLongShips(factor, currentIndex);
            // } else {
            fleet.push(coord);
            // }
          }
          self.demo = fleet;
        }

        function createSmallShips(length, factor, index) {
          if (fleet.length > 0) {
            for (let i = index; i < factor; i++) {
              let coord = [this.getCoord()];
              if (checkForValidity(coord)) {
                currentIndex = i;
                createSmallShips(factor, currentIndex);
              } else {
                fleet.push(coord);
              }
            }
          } else {
            let coord = [this.getCoord()];
            fleet.push(coord);
          }
        }

        function checkValidity(coord) {
          if (checkForDuplicate(coord) && checkSpacing(coord)) {
            return true;
          }
        }

        function checkSpacing(coord, length, axis) {
          let x = coord[0];
          let y = coord[1];
          let addAxis = 0;
          let sameAxis = 0;
          let overlap;

          let num = coord[axis];

          num == x ? (sameAxis = 1) : (addAxis = 1);

          const axis1Lower = Number(coord[addAxis]) - 1;
          const axis1Upper = Number(coord[addAxis]) + length;
          const axis2Lower = Number(coord[sameAxis]) - 1;
          const axis2Upper = Number(coord[sameAxis]) + 1;

          fleet.forEach((ship) => {
            ship.forEach((pair) => {
              // self.demo.push(pair[addAxis]);
              if (
                pair[addAxis] >= axis1Lower &&
                pair[addAxis] <= axis1Upper &&
                pair[sameAxis] >= axis2Lower &&
                pair[sameAxis] <= axis2Upper
              ) {
                overlap = true;
              }
            });
          });

          if (overlap) {
            self.demo = coord + "incursion";
          } else {
            self.demo = coord + "clear";
          }
        }

        function checkForDuplicate(coord) {
          if (coord.length > 1) {
            coord.forEach((pair) => {
              if (fleet[fleet.length - 1].includes(pair)) {
                return true;
              }
            });
          } else {
            if (fleet[fleet.length - 1].includes(coord)) {
              return true;
            }
          }
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

export default Player;
