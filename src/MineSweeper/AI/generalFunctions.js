
// If there's same amount of flags than
// bombs then the others are clear
export function simpleSafeUpdate(grid, row, col) {
  const node = grid[row][col];
  const bombsAround = node.bombsAround;
  if (bombsAround === flagsAround(grid, row, col).length) {
    const nb = hiddenSquares(grid, row, col);
    nb.forEach(node => node.risk = 0);
  }
}

// If same amount of hiddensquares than 
// bombs then all hidden are bombs
export function simpleBombUpdate(grid, row, col) {
  const node = grid[row][col];
  const bombsAround = node.bombsAround;
  if (bombsAround === hiddenSquares(grid, row, col).length) {
    const nb = hiddenSquares(grid, row, col);
    nb.forEach(node => node.risk = 100);
  }
}

// Calculates the % that this node is bombå
export function complicatedRiskUpdate(grid, row, col) {
  const node = grid[row][col];
  if (node.risk === 0 || node.risk === 100) return;
  const hiddenNoFlags = hiddenSquares(grid, row, col).filter(node => !node.isFlag);
  const bombsNotFound = node.bombsAround - flagsAround(grid, row, col).length;
  const risk = bombsNotFound / hiddenNoFlags.length;
  hiddenNoFlags.forEach(node => {
    const newRisk = Math.max(risk, node.risk);
    node.risk = newRisk;
  })
}

// Resets all link data
function clearLinks(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      grid[y][x].linked = false;
      grid[y][x].links = [];
    }
  }
}

// Generates the links 
function setLinks(grid) {
  clearLinks(grid);
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x].bombsAround - flagsAround(grid, y, x) === 1 && hiddenSquares(grid, y, x).filter(node => 
        !node.isFlag).length !== 1 && !grid[y][x].isHidden && !grid[y][x].isFlag) { 

        const temp = [];
        const neighbors = hiddenSquares(grid, y, x).filter(node => !node.isFlag);
        neighbors.forEach(node => temp.push(node));
        neighbors.forEach(node => {
          const {row, col} = node;
          if (grid[row][col].links.length >= temp.length || !grid[row][col].linked) {
            grid[row][col].linked = true;
            grid[row][col].links = [...temp];
          }
        })
      }
    }
  }
}

// Checks the links so we can solve more challenging positions
export function checkLinks(grid) {
  setLinks(grid);
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (!grid[y][x].isHidden && !grid[y][x].isFlag && grid[y][x].risk !== 100 && grid[y][x].risk !== 0) {
        
        const node = grid[y][x];
        const hiddenAround = hiddenSquares(grid, y, x).filter(node => !node.isFlag);
        if (node.bombsAround > 1 && node.bombsAround - flagsAround(grid, node.row, node.col) > 1) {
          
          for (let i = 0; i < hiddenAround.length; i++) {
            if (hiddenAround[i].linked) {
              
              let numLinked = 0;
              const adjLinks = [];
              if (hiddenAround[i].links.length === hiddenAround.length - 1) {
                
                const closeLinks = [];
                if (hiddenAround[i].links.every(node => {
                  closeLinks.push(node);
                  return (hiddenAround.includes(node));
                })) {
                  for (let m = 0; m < hiddenAround.length; m++) {
                    if (!closeLinks.includes(hiddenAround[m])) {
                      const {row, col} = hiddenAround[m];
                      grid[row][col].risk = 0;
                      break;
                    }
                  }
                }
              }
              for (let l = 0; l < hiddenAround[i].links.length; l++) {

                if (hiddenAround.includes(hiddenAround[i].links[l])) {
                  
                  numLinked++;
                  adjLinks.push(hiddenAround[i].links[l]);
                }
              }
              if (numLinked > 1) {
                
                if (hiddenAround.length - (numLinked - 1) === node.bombsAround) {
                  
                  for (let m = 0; m < hiddenAround.length; m++) {
                    if (!adjLinks.includes(hiddenAround[m])) {
                      const {row, col} = hiddenAround[m];
                      grid[row][col].risk = 100;
                    } 
                  }
                  return;
                }
              }
            }
          }
        } 
      }
    }
  }
}

// Returns flags around
export function flagsAround(grid, row, col) {
  return (neighbors(grid, row, col).filter(node => node.isFlag));
}

// Returns hidden squares around
export function hiddenSquares(grid, row, col) {
  return (neighbors(grid, row, col).filter(node => node.isHidden));
}

// returns all neighborsw
export function neighbors(grid, row, col) {
  const neighbors = [];
  const rows = grid.length-1;
  const cols = grid[0].length-1;
  // Top row
  if (row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row > 0 && col < cols) neighbors.push(grid[row - 1][col + 1]);
  // Middle
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < cols) neighbors.push(grid[row][col + 1]);
  // Bottom row
  if (row < rows && col > 0) neighbors.push(grid[row + 1][col - 1]);
  if (row < rows) neighbors.push(grid[row + 1][col]);
  if (row < rows && col < cols) neighbors.push(grid[row + 1][col + 1]);

  return neighbors;
}

// 2d grid to 1d array
export function gridToArray(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

