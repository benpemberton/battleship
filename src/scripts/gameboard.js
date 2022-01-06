import Ship from "./ship";

function Gameboard() {
  return {
    fleet: [],
    missedShots: [],
    fleetStatus: [],

    demo: null,

    placeShip(name, coords) {
      const newShip = Ship(name, coords);

      // newShip.coords.forEach((coord) => {
      //   const posArray = Object.keys(this.boardPositions);
      //   const position = posArray.find((pos) => pos === coord);
      //   this.boardPositions[position] = true;
      // });

      this.fleet.push(newShip);
      this.fleet[this.fleet.length - 1].id = this.fleet.length - 1;
    },

    receiveAttack(pos) {
      let hit = false;
      let ship;

      for (let i = 0; i <= this.fleet.length - 1; i++) {
        if (this.fleet[i].coords.includes(pos)) {
          this.fleet[i].hit(pos);
          hit = true;
          ship = this.fleet[i];
          break;
        }
      }

      if (hit) {
        return ship;
      } else {
        this.missedShots.push(pos);
      }
    },

    checkFleetStatus() {
      this.fleetStatus = [];

      this.fleet.forEach((ship) => {
        if (ship.status === "sunk") {
          this.fleetStatus.push("sunk");
        }
      });

      if (this.fleetStatus.length === this.fleet.length) {
        return true;
      }
    },

    newRound() {
      this.fleet = [];
      this.missedShots = [];
      this.fleetStatus = [];
    },
  };
}

export default Gameboard;
