const fs = require('fs');

function getInput() {
  return fs.readFileSync('input.txt', {encoding: 'utf8'})
    .split(/\r?\n/)
    .filter(line => line.length > 0);
}

function assertEquals(expected, actual) {
  console.assert(expected === actual, `Expected ${actual} to be ${expected}`);
}

module.exports = {
  getInput, assertEquals
};