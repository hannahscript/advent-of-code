const {runAndMeasure} = require('../common.js');

function initializeMap() {
  return new Array(1000 * 1000).fill(0);
}

function lineToClaim(line) {
  const [id, left, top, width, height] = line.match(/#(\d+) @ (\d+?),(\d+?): (\d+)x(\d+)/).slice(1).map(m => +m);
  return {id, left, top, width, height};
}

function claimToPositions(claim) {
  const positions = [];
  
  let start = claim.left + claim.top * 1000;
  for (let y = 0; y < claim.height; y++) {
    for (let x = 0; x < claim.width; x++) {
      positions.push(start + x + y * 1000);
    }
  }
  
  return {id: claim.id, positions};
}

function markAndCountClaim(map, claim) {
  claimToPositions(claim).positions.forEach(p => map[p]++);
}

function markClaimOnce(map, claimUntouched, claim) {
  claimToPositions(claim).positions.forEach(p => {
    const spot = map[p];
    if (spot === 0) {
      map[p] = claim.id;
    } else if (spot > 0) {
      claimUntouched[map[p]] = false;
      claimUntouched[claim.id] = false;
      map[p] = -1;
    }
  });
}


function solveFirst(input) {
  const map = initializeMap();
  input.forEach(line => markAndCountClaim(map, lineToClaim(line)));
  return map.filter(s => s > 1).length;
}

function solveSecond(input) {
  const map = initializeMap();
  const claimUntouched = new Array(input.length + 1).fill(true);
  input.forEach(line => markClaimOnce(map, claimUntouched, lineToClaim(line)));
  return claimUntouched.slice(1).findIndex(c => c) + 1;
}

runAndMeasure(solveFirst, solveSecond);