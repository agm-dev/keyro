const debug = require("debug")("keyro");

class Keyro {
  constructor({ pool = [] } = {}) {
    debug("new Keyro instance with pool %O", pool);

    if (!Array.isArray(pool)) {
      throw new Error("pool has to be an array");
    }

    this.pointer = 0;
    debug("set pointer");
    this.pool = pool;
    debug("set pool");
  }

  add(key) {
    debug("add key to pool: %O", key);
    this.pool = [...this.pool, key];
  }

  get() {
    const value = this.pool[this.pointer];
    debug(`get key with pointer ${this.pointer}: %O`, value);

    const hasReachTheEnd = this.pointer >= this.pool.length - 1;
    const nextPointerValue = hasReachTheEnd ? 0 : this.pointer + 1;
    this.pointer = nextPointerValue;
    debug(`set next pointer to ${this.pointer}`);

    return value;
  }
}

module.exports = Keyro;
