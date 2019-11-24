
import {simpleBombUpdate, simpleSafeUpdate, checkLinks,
  gridToArray, complicatedRiskUpdate, hiddenSquares} from './generalFunctions';


export default function AIMove(grid, mineCount, firstClick) {
  // Just guess the first click
  if (firstClick) {
    const row = Math.floor(grid.length / 2)
    const col = Math.floor(grid[0].length / 2)
    return ({row, col, left: true});
  }
  const arr = gridToArray(grid);
  const hidden = arr.filter(node => node.isHidden && !node.isFlag);
  const toCheck = arr.filter(node => 
    !node.isHidden && 
    !node.isFlag &&
    node.bombsAround > 0
  );
  // Check links 
  checkLinks(grid);
  // Check simple logics
  toCheck.forEach(node => {
    const row = node.row;
    const col = node.col;
    simpleBombUpdate(grid, row, col);
    simpleSafeUpdate(grid, row, col);
  })
  
  const safes = hidden.filter(node => node.risk === 0);
  if (safes.length > 0) return ({row: safes[0].row, col: safes[0].col, left: true});
  const bombs = hidden.filter(node => node.risk === 100);
  if (bombs.length > 0) return ({row: bombs[0].row, col: bombs[0].col, left: false});
  toCheck.forEach(node => {
    // Do the risk calculation for these nodes
    complicatedRiskUpdate(grid, node.row, node.col);
  })
  let rest = hidden.filter(node => node.risk !== null);
  rest = sortByRisk(rest);
  // if theres filtered options
  if (typeof rest[0] !== 'undefined') {
    return ({row: rest[0].row, col: rest[0].col, left: true});
  }
  // Basicly a pure guess 
  const lowRisk = toCheck.filter(node => node.bombsAround === 1);
  let ret1 = [];
  lowRisk.forEach(node => {
    ret1 = ret1.concat(hiddenSquares(grid, node.row, node.col).filter(node => !node.isFlag));
  })
  if (ret1.length > 0) {
    return ({row: ret1[0].row, col: ret1[0].col, left: true});
  }
  return ({row: hidden[0].row, col: hidden[0].col, left: true});
}

function sortByRisk(arr) {
  return (arr.sort((a, b) => a.risk - b.risk));
}
