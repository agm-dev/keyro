# keyro - key rotation utility

[![Build Status](https://travis-ci.org/agm-dev/keyro.svg?branch=master)](https://travis-ci.org/agm-dev/keyro)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6ca1e22946014852a349c0155fa88cc9)](https://www.codacy.com/manual/agm-dev/keyro?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=agm-dev/keyro&amp;utm_campaign=Badge_Grade)
[![Codacy](https://api.codacy.com/project/badge/coverage/6ca1e22946014852a349c0155fa88cc9)](https://www.codacy.com/app/codacy/node-codacy-coverage)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/agm-dev/keyro)
![GitHub All Releases](https://img.shields.io/github/downloads/agm-dev/keyro/total)
![GitHub](https://img.shields.io/github/license/agm-dev/keyro)

## What is this

Keyro is just a simple utility to store an array of values and return the 'next one' on every 'get' access.

I have done it to mitigate the rate limit overload on some services, so a different key is used on every request, but as it is something very generic I guess it can be useful on other situations.

## Requirements

This is a npm package, and you will need a node version which supports ES6. Anyway, the code is really simple, and could be reduced to drop node dependencies so it can be used also on browsers:

```javascript
class Keyro {
  constructor({ pool = [] } = {}) {
    if (!Array.isArray(pool)) {
      throw new Error("pool has to be an array");
    }

    this.pointer = 0;
    this.pool = pool;
  }

  add(key) {
    this.pool = [...this.pool, key];
  }

  get() {
    const value = this.pool[this.pointer];
    const hasReachTheEnd = this.pointer >= this.pool.length - 1;
    const nextPointerValue = hasReachTheEnd ? 0 : this.pointer + 1;
    this.pointer = nextPointerValue;
    return value;
  }
}
```

## Installation

```bash
npm i --save keyro
```

## Usage

```javascript
const Keyro = require("keyro");

const keysFromConfig = [
  "SDF9DF897SFGD98A7SDF",
  "VB8N8SC7G68DF8B76S4D",
  "OOLI4L2L1U5I3HJU5K15"
];

const keyro = new Keyro({ pool: keysFromConfig });

function getApiKey() {
  return keyro.get();
}

console.log(getApiKey()); // "SDF9DF897SFGD98A7SDF"
console.log(getApiKey()); // "VB8N8SC7G68DF8B76S4D"
console.log(getApiKey()); // "OOLI4L2L1U5I3HJU5K15"
console.log(getApiKey()); // "SDF9DF897SFGD98A7SDF"
console.log(getApiKey()); // "VB8N8SC7G68DF8B76S4D"
console.log(getApiKey()); // "OOLI4L2L1U5I3HJU5K15"
```
