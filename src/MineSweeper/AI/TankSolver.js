
import {hiddenSquares, flagsAround, gridToArray, neighbors} from './generalFunctions';

let totalMines = 0;
let solutions = [];
let globalGrid = [];

export function TankSolver(grid) {
  totalMines = 0;
  solutions = [];
  globalGrid = grid;
  const bordersSet = new Set();
  totalMines = countMines(gridToArray(grid));
  const toCheck = filterSquares(gridToArray(grid), grid);
  toCheck.forEach(node => {
    const nb = hiddenSquares(grid, node.row, node.col).filter(node => !node.isFlag);
    if (nb !== undefined) nb.forEach(node => bordersSet.add(node));
  });
  const borders = Array.from(bordersSet)
  const regions = splitRegions(borders);
  regions.forEach(region => {
    TankRecursion(region, 0);
    for (let i = 0; i < region.length; i++) {
      let allMine = true;
      let allClear = true;

      const row = region[i].row;
      const col = region[i].col;
      //console.log(solutions[0]);
      solutions.forEach(sln => {
        if (!sln[row][col].isFlag) {
          //console.log("killed");
          allMine = false;
        }
        if (sln[row][col].isClear) {
          //console.log("killed2");
          allClear = false;
        }
      })
      if (grid[row][col].isFlag) {
        console.log("killed");
        allMine = false;
      }
      if (!grid[row][col].isHidden) {
        allClear = false;
        console.log("killed3");
      }

      if (allClear) {
        return ({row, col, left: true});
      }
      if (allMine) {
        return ({row, col, left: false});
      }
    }
  })
  return (null);
}

function TankRecursion(borderTiles, depth) {

  let flagCount = 0;

  if (depth > 12) {
    return;
  }
  for (let i = 0; i < globalGrid.length; i++) {
    for (let j = 0; j < globalGrid[0].length; j++) {

      if (globalGrid[i][j].isFlag) flagCount++;

      const mines = globalGrid[i][j].bombsAround;
      //const squaresAround = neighbors(globalGrid, i, j).length;

      const flags = flagsAround(globalGrid, i, j);
      const free = hiddenSquares(globalGrid, i, j).filter(node => !node.isFlag).length;

      if (flags > mines) {
        return;
      }
      if (free + flags < mines) {
        console.log(flags);
        console.log(free);
        console.table(globalGrid[i][j]);
        return;
      }
    }
  }

  if (flagCount > totalMines) {
    console.log("!");
    console.log(flagCount + " // " + totalMines);
    return;
  } 

  if (depth === borderTiles.length) {
    
    /*if (flagCount < totalMines) {
      console.log(flagCount + " // " + totalMines);
      return;
    }*/
    
    solutions.push(globalGrid);
    return;
  }

  const node = borderTiles[depth];
  globalGrid[node.row][node.col].isFlag = true;
  TankRecursion(borderTiles, depth+1);
  globalGrid[node.row][node.col].isFlag = false;

  globalGrid[node.row][node.col].isClear = true;
  TankRecursion(borderTiles, depth+1);
  globalGrid[node.row][node.col].isFlag = false;
}

function splitRegions(borderTiles) {
  const allRegions = [];
  const covered = [];

  while(true) {
    const queue = [];
    const fullRegion = [];

    for (let i = 0; i < borderTiles.length; i++) {
      if (!covered.includes(borderTiles[i])) {
        queue.push(borderTiles[i]);
        break;
      }
    }

    if (queue.length === 0) {
      break;
    }
    while (queue.length !== 0) {
      const node = queue.shift();
      const row = node.row;
      const col = node.col;

      fullRegion.push(node);
      covered.push(node);

      for (let i = 0; i < borderTiles.length; i++) {
        const curNode = borderTiles[i];
        let isConnected = false;

        if (fullRegion.includes(curNode)) continue;

        if (Math.abs(row - curNode.row) > 2 || Math.abs(col - curNode.col) > 2) {
          isConnected = false;
        } else {
          tilesearch:
          for (let i = 0; i < globalGrid.length; i++) {
            for (let j = 0; j < globalGrid[0].length; j++) {
              if (Math.abs(row - i) <= 1 && Math.abs(col - j) <= 1 &&
                    Math.abs(curNode.row - i) <= 1 && Math.abs(curNode.col - j) <= 1) {
                  isConnected = true;
                  break tilesearch;
              }
            }
          }
        }
        if (!isConnected) continue;

        if (!queue.includes(curNode)) {
          queue.push(curNode);
        }
      }
    }
    allRegions.push(fullRegion);
  }

  return allRegions;
}

function filterSquares(arr, grid) {
  return (arr.filter(node => 
    !node.isHidden && 
    !node.isFlag && 
    node.bombsAround > 0 &&
    hiddenSquares(grid, node.row, node.col).filter(node => !node.isFlag).length > 0
  ))
}

function countMines(arr) {
  return (arr.filter(node => node.isBomb).length);
}