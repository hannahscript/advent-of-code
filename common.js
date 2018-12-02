const fs = require('fs');

function getInput() {
  return fs.readFileSync('input.txt', {encoding: 'utf8'})
    .split(/\r?\n/)
    .filter(line => line.length > 0);
}

function assertEquals(expected, actual) {
  console.assert(expected === actual, `Expected ${actual} to be ${expected}`);
}

function measureTime(fn) {
  const start = process.hrtime.bigint();
  fn();
  return process.hrtime.bigint() - start;
}

function runAndMeasure(solver1, solver2) {
  const input = getInput();

  const timeSolution1 = measureTime(() => solver1(input));
  console.log('Solution 1 took ' + formatNs(timeSolution1));

  const timeSolution2 = measureTime(() => solver2(input));
  console.log('Solution 2 took ' + formatNs(timeSolution2));

  console.log('\nSolutions: %s, %s', solver1(input), solver2(input));
}

function formatNs(ns) {
  const digits = ('' + ns).split('');
  const units = [];
  
  if (digits.length % 3 > 0) {
    units.push(digits.splice(0, digits.length % 3).join(''));
  }
  
  while (digits.length > 0) {
    units.push(digits.splice(0, 3).join(''));
  }
  
  return units.join('\'') + 'ns';
}

module.exports = {
  getInput, assertEquals, measureTime, runAndMeasure
};