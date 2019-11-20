
export function simpleSafeUpdate(grid, row, col) {
  const node = grid[row][col];
  const bombsAround = node.bombsAround;
  if (bombsAround === flagsAround(grid, row, col).length) {
    const nb = hiddenSquares(grid, row, col);
    nb.forEach(node => node.risk = 0);
  }
}

export function simpleBombUpdate(grid, row, col) {
  const node = grid[row][col];
  const bombsAround = node.bombsAround;
  if (bombsAround === hiddenSquares(grid, row, col).length) {
    const nb = hiddenSquares(grid, row, col);
    nb.forEach(node => node.risk = 100);
  }
}

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

export function flagsAround(grid, row, col) {
  return (neighbors(grid, row, col).filter(node => node.isFlag));
}

export function hiddenSquares(grid, row, col) {
  return (neighbors(grid, row, col).filter(node => node.isHidden));
}

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

export function gridToArray(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

