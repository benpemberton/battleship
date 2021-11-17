import Ship from "./ship";

function Gameboard() {
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
    fleetStatus: [],

    placeShip(coords) {
      const newShip = Ship(coords);

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
      this.demo = pos;
    },

    checkFleetStatus() {
      this.fleetStatus = [];

      this.fleet.forEach((ship) => {
        if (ship.status === "sunk") {
          this.fleetStatus.push("sunk");
        }
      });

      // if (this.fleetStatus.length === this.fleet.length) {
      //   alert("everything is sunk");
      // }
    },
  };
}

export default Gameboard;
