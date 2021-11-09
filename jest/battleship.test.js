const ship = require("./../src/scripts/ship");
const gameboard = require("./../src/scripts/gameboard");

test.skip("check ship is created properly", () => {
  expect(ship(["a1", "a2", "a3"])).toEqual({
    coords: ["a1", "a2", "a3"],
    length: 3,
    hits: [],
    status: "unsunk",
  });
});

test.skip("check hit method identifies own coord", () => {
  const testShip = ship(["b5", "c6", "d1"]);
  testShip.hit("c6");

  expect(testShip.hits).toEqual(["c6"]);
});

test.skip("check hit method doesn't duplicate", () => {
  const testShip = ship(["b5", "c6", "d1"]);
  testShip.hit("c6");
  testShip.hit("c6");

  expect(testShip.hits).toEqual(["c6"]);
});

test.skip("check sunk method", () => {
  const testShip = ship(["b5", "c6", "d1"]);
  testShip.hit("c6");
  testShip.hit("b5");
  testShip.hit("d1");

  testShip.isSunk();

  expect(testShip.status).toEqual("sunk");
});

test.skip("gameboard records ship coords as filled", () => {
  const playerBoard = gameboard();
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
  const playerBoard = gameboard();
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

test("receiveAttack finds ship, calls hit", () => {
  const playerBoard = gameboard();
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

test("receiveAttack registers missed shot", () => {
  const playerBoard = gameboard();
  playerBoard.placeShip(["a1", "a6", "a7"]);
  playerBoard.placeShip(["a2", "a3"]);

  playerBoard.receiveAttack("a4");

  expect(playerBoard.missedShots).toEqual(["a4"]);
});
