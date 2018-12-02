const {getInput, assertEquals} = require('../common.js');
 
function solveFirst(input) {
  let twoLettersAmount = 0;
  let threeLettersAmount = 0;
  input.forEach(id => {
    const countmap = createCountMap(id);
    const [twoComponent, threeComponent] = getChecksumComponents(countmap);
    twoLettersAmount += twoComponent;
    threeLettersAmount += threeComponent;
  });
  
  return twoLettersAmount * threeLettersAmount;
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
  let twoOfAnyLetter = false;
  let threeOfAnyLetter = false;
  
  Object.values(countmap).forEach(n => {
    twoOfAnyLetter = (n === 2) || twoOfAnyLetter;
    threeOfAnyLetter = (n === 3) || threeOfAnyLetter;
  });
  
  return [twoOfAnyLetter, threeOfAnyLetter];
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