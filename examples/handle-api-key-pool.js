const Keyro = require("../index");

const keysFromConfig = [
  "SDF9DF897SFGD98A7SDF",
  "VB8N8SC7G68DF8B76S4D",
  "OOLI4L2L1U5I3HJU5K15"
];

const keyro = new Keyro({ pool: keysFromConfig });

function getApiKey() {
  return keyro.get();
}

console.log(getApiKey());
console.log(getApiKey());
console.log(getApiKey());
console.log(getApiKey());
console.log(getApiKey());
console.log(getApiKey());
