const ship = require("./../src/scripts/ship");

test.skip("check ship is created properly", () => {
  expect(ship(["a1", "a2", "a3"])).toEqual({
    coords: ["a1", "a2", "a3"],
    length: 3,
    hits: [],
    status: "unsunk",
  });
});

test("check hit method identifies own coord", () => {
  const testShip = ship(["b5", "c6", "d1"]);
  testShip.hit("c6");

  expect(testShip.hits).toEqual(["c6"]);
});

test("check hit method doesn't duplicate", () => {
  const testShip = ship(["b5", "c6", "d1"]);
  testShip.hit("c6");
  testShip.hit("c6");

  expect(testShip.hits).toEqual(["c6"]);
});

test("check sunk method", () => {
  const testShip = ship(["b5", "c6", "d1"]);
  testShip.hit("c6");
  testShip.hit("b5");
  testShip.hit("d1");

  testShip.isSunk();

  expect(testShip.status).toEqual("sunk");
});
