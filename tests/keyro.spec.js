const Keyro = require("../src/lib");

describe("Keyro", () => {
  test("Should be instantiable with or without params", () => {
    const instance = new Keyro();
    expect(instance.pool).toEqual([]);
    const anotherInstance = new Keyro({});
    expect(anotherInstance.pool).toEqual([]);
  });

  [
    123,
    "random string",
    null,
    function () {},
    {}
  ].forEach(value => {
    test("Should throw error if provided pool value is not an array", done => {
      try {
        const instance = new Keyro({ pool: value });
        done.fail("test should not reach this point");
      } catch (err) {
        done();
      }
    });
  });

  test("Should add values to the pool with add method", () => {
    const originalPool = [
      "key1",
      "key2"
    ];
    const keyToAdd = "key3";

    const instance = new Keyro({ pool: originalPool });
    instance.add(keyToAdd);

    expect(instance.pool).toEqual([...originalPool, keyToAdd]);
  });

  test("Should return next key in the pool when get method is called", () => {
    const pool = [
      "key1",
      "key2",
      "key3"
    ];

    const instance = new Keyro({ pool });

    pool.forEach(key => {
      const value = instance.get();
      expect(value).toBe(key);
    });
  });

  test("Should start again after returning the last key in the pool", () => {
    const pool = [
      "key1",
      "key2",
      "key3"
    ];
    const expectedReturns = [...pool, ...pool];

    const instance = new Keyro({ pool });

    expectedReturns.forEach(key => {
      const value = instance.get();
      expect(value).toBe(key);
    });
  });
});
