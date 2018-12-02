const {getInput, assertEquals} = require('../common.js');
 
function solveFirst(input) {
  const componentCount = input
    .map(id => getChecksumComponents(createCountMap(id)))
    .reduce((acc, e) => [acc[0] + e[0], acc[1] + e[1]], [0, 0]);
  
  return componentCount[0] * componentCount[1];
}

function createCountMap(id) {
  const result = {};
  id.split('').forEach(c =>
    result[c] = result[c] >= 0 ?
      result[c] + 1
      : 1
  );
  
  return result;
}

// Naming is hard
function getChecksumComponents(countmap) {
  return Object.values(countmap)
    .reduce((acc, e) => [e === 2 | acc[0], e === 3 || acc[1]],
      [false, false]);
}

function solveSecond(input) {
  const idLength = input[0].length;
  
  for (let i = 0; i < idLength; i++) {
    const substringMap = {};
    
    for (const id of input) {
      const substring = id.substr(0, i) + id.substr(i+1, idLength);
      if (substringMap[substring]) {
        return substring;
      } else {
        substringMap[substring] = id;
      }
    };
  }
}

const input = getInput();
console.log('Solutions: %s, %s', solveFirst(input), solveSecond(input));