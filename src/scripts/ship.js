function Ship(name, coords) {
  const proto = {
    hit(number) {
      if (this.coords.includes(number) && !this.hits.includes(number)) {
        this.hits.push(number);
        this.isSunk();
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

  const obj = Object.create(proto);

  obj.name = name;
  obj.coords = coords;
  obj.length = coords.length;
  obj.hits = [];
  obj.status = "unsunk";

  return obj;
}

export default Ship;
