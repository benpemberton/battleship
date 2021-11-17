import Ship from "./../src/scripts/ship";
import Gameboard from "./../src/scripts/gameboard";
import game from "./../src/scripts/game";
import Player from "./../src/scripts/player";

test.skip("check ship is created properly", () => {
  expect(Ship(["a1", "a2", "a3"])).toEqual({
    coords: ["a1", "a2", "a3"],
    length: 3,
    hits: [],
    status: "unsunk",
  });
});

test.skip("check hit method identifies own coord", () => {
  const testShip = Ship(["20", "03", "86"]);
  testShip.hit("03");

  expect(testShip.hits).toEqual(["03"]);
});

test.skip("check hit method doesn't duplicate", () => {
  const testShip = Ship(["b5", "c6", "d1"]);
  testShip.hit("c6");
  testShip.hit("c6");

  expect(testShip.hits).toEqual(["c6"]);
});

test.skip("check sunk method", () => {
  const testShip = Ship(["b5", "c6", "d1"]);
  testShip.hit("c6");
  testShip.hit("b5");
  testShip.hit("d1");

  testShip.isSunk();

  expect(testShip.status).toEqual("sunk");
});

test.skip("gameboard records ship coords as filled", () => {
  const playerBoard = Gameboard();
  playerBoard.placeShip(["a1", "a6", "a7"]);

  expect(playerBoard.boardPositions).toEqual({
    a1: true,
    a2: false,
    a3: false,
    a4: false,
    a5: false,
    a6: true,
    a7: true,
  });
});

test.skip("gameboard populates fleet array", () => {
  const playerBoard = Gameboard();
  playerBoard.placeShip(["a1", "a6", "a7"]);
  playerBoard.placeShip(["a2", "a3"]);

  function checkFleet() {
    return {
      length: playerBoard.fleet.length,
      shipLengths: (() => {
        const lengths = [];
        playerBoard.fleet.forEach((ship) => {
          lengths.push(ship.length);
        });
        return lengths;
      })(),
    };
  }

  expect(checkFleet()).toEqual({
    length: 2,
    shipLengths: [3, 2],
  });
});

test.skip("receiveAttack finds ship, calls hit", () => {
  const playerBoard = Gameboard();
  playerBoard.placeShip(["a1", "a6", "a7"]);
  playerBoard.placeShip(["a2", "a3"]);

  playerBoard.receiveAttack("a2");

  function checkFleet() {
    return {
      length: playerBoard.fleet.length,
      shipHits: (() => {
        const hits = [];
        playerBoard.fleet.forEach((ship) => {
          hits.push(ship.hits);
        });
        return hits;
      })(),
    };
  }

  expect(checkFleet()).toEqual({
    length: 2,
    shipHits: [[], ["a2"]],
  });
});

test.skip("receiveAttack registers missed shot", () => {
  const playerBoard = Gameboard();
  playerBoard.placeShip(["a1", "a6", "a7"]);
  playerBoard.placeShip(["a2", "a3"]);

  playerBoard.receiveAttack("a4");

  expect(playerBoard.missedShots).toStrictEqual(["a4"]);
});

test.skip("checkFleetStatus records sunken ships", () => {
  const playerBoard = Gameboard();
  playerBoard.placeShip(["a1", "a6", "a7"]);
  playerBoard.placeShip(["a2", "a3"]);

  playerBoard.receiveAttack("a1");
  playerBoard.receiveAttack("a6");
  playerBoard.receiveAttack("a7");
  playerBoard.receiveAttack("a2");
  playerBoard.receiveAttack("a3");

  playerBoard.fleet.forEach((ship) => {
    ship.isSunk();
  });

  playerBoard.checkFleetStatus();

  expect(playerBoard.fleetStatus).toStrictEqual(["sunk", "sunk"]);
});

test.skip("comp player makes legal move", () => {
  const human = Player("human");
  const computer = Player("computer");

  game.user.placeShip(["a1", "a6", "a7"]);
  game.user.placeShip(["a2", "a3"]);

  game.user.receiveAttack("a1");
  game.user.receiveAttack("a6");
  game.user.receiveAttack("a7");
  game.user.receiveAttack("a2");
  game.user.receiveAttack("a3");

  computer.sendAttack("a3");
  expect(game.user.demo).toStrictEqual("1");
});
