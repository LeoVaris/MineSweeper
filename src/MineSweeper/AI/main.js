
import {simpleBombUpdate, simpleSafeUpdate, 
  gridToArray, complicatedRiskUpdate, hiddenSquares} from './generalFunctions';

import {TankSolver} from './TankSolver';


export default function AIMove(grid, mineCount, firstClick) {
  if (firstClick) {
    const row = grid.length - 1
    const col = grid[0].length - 1
    return ({row, col, left: true});
  }
  const arr = gridToArray(grid);
  const hidden = arr.filter(node => node.isHidden && !node.isFlag);
  const toCheck = arr.filter(node => 
    !node.isHidden && 
    !node.isFlag &&
    node.bombsAround > 0
  );
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
  console.log("working");
  const ret = TankSolver(grid);
  if (ret !== null) {
    console.table(ret);
    console.log("it works");
    return (ret);
  } 
  toCheck.forEach(node => {
    complicatedRiskUpdate(grid, node.row, node.col);
  })
  /*const rest = hidden.filter(node => node.risk !== null);
  sortByRisk(rest);
  console.log(rest[0].risk);
  return ({row: rest[0].row, col: rest[0].col, left:true});*/
  const lowRisk = toCheck.filter(node => node.bombsAround === 1);
  let ret1 = [];
  lowRisk.forEach(node => {
    ret1 = ret1.concat(hiddenSquares(grid, node.row, node.col).filter(node => !node.isFlag));
  })
  if (ret1.length > 0) {
    console.log("lowGuess");
    return ({row: ret1[0].row, col: ret1[0].col, left: true});
  }
  console.log("guess");
  return ({row: hidden[0].row, col: hidden[0].col, left: true});
}

function sortByRisk(arr) {
  arr.sort((a, b) => a.risk - b.risk); 
}

const RandomPos = (rows, cols) => {
  return ({
    row: Math.floor(Math.random() * rows),
    col: Math.floor(Math.random() * cols),
  })
}