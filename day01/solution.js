const {getInput, assertEquals} = require('../common.js');
 
function solveFirst(input) {
  return input.reduce((acc, e) => +e + acc, 0);
}

function solveSecond(input) {
  const previousFrequencies = {0: true};
  
  let frequency = 0;
  let index = 0;
  while (true) {
    frequency = +input[index] + frequency;
    
    if (previousFrequencies[frequency]) {
      return frequency;
    } else {
      previousFrequencies[frequency] = true;
    }
    
    index = (index + 1) % input.length;
  }
}

assertEquals(0, solveFirst([]));
assertEquals(3, solveFirst(['+1', '+2']));
assertEquals(3, solveFirst(['+5', '-2']));
assertEquals(-13, solveFirst(['+15', '-15', '-13']));
assertEquals(42, solveFirst(['+42', '-0', '+0']));

assertEquals(0, solveSecond(['+0']));
assertEquals(3, solveSecond(['+1', '+2', '-1', '+1']));
assertEquals(0, solveSecond(['+1', '-2']));

const input = getInput();
console.log('Solutions: %s, %s', solveFirst(input), solveSecond(input));