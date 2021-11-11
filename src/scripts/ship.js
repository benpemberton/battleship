function Ship(coords) {
  return {
    coords: coords,
    length: coords.length,
    hits: [],
    status: "unsunk",

    hit(number) {
      if (this.coords.includes(number) && !this.hits.includes(number)) {
        this.hits.push(number);
      }
    },

    isSunk() {
      const sunk = this.hits.every((item) => {
        return this.coords.includes(item);
      });

      if (sunk === true && this.hits.length === this.coords.length) {
        this.status = "sunk";
      }
    },
  };
}

module.exports = Ship;
