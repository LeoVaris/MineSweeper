import React, {Component} from 'react';
import Node from './Node/Node';
import './Game.css';

export default class Grid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      grid_width: this.props.width,
      grid_height: this.props.height,
      loading: true,
      firstClick: true,
      mineCount: this.props.mineCount,
      alive: true,
    }
  }

  componentDidMount() {
    this.props.onRef(this);
    const {grid_width, grid_height, mineCount} = this.state;
    const grid = CreateGrid(grid_width, grid_height, mineCount);
    this.setState({grid, loading: false});
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  isAlive() {
    return (this.state.alive);
  }

  handleOnClick(row, col) {
    const {firstClick, grid, mineCount, alive} = this.state;
    if (!alive) return;
    
    if (firstClick) {
      const newGrid = FirstClick(grid, row, col, mineCount);
      this.setState({grid: newGrid, firstClick: false});
    } else {
      let newGrid = grid;
      const isAlive = LeftClick(newGrid, row, col);
      this.setState({grid: newGrid, alive: isAlive});
    }
  }

  render() {
    const {grid, loading} = this.state;
    if (loading) {
      return (
        'Loading...'
      );
    }
    return (
      <>
      <div className="grid">
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex}>
            {row.map((node, nodeIndex) => {
              const {row, col, bombsAround, isHidden, isFlag, isBomb} = node;
              return (
                <Node 
                  key={nodeIndex}
                  col={col}
                  row={row}
                  bombsAround={bombsAround}
                  isHidden={isHidden}
                  isBomb={isBomb}
                  isFlag={isFlag}
                  onClick={(row, col) => this.handleOnClick(row, col)}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
    </>
    );
  }
}

const FirstClick = (grid, row, col, mineCount) => {
  CreateMines(grid, mineCount, grid[row][col]);
  UpdateMineCount(grid);
  LeftClick(grid, row, col);
  return (grid);
}

const CreateGrid = (width, height, mineCount) => {
  let grid = []
  for (let row = 0; row < height; row++) {
    const rowArr = []
    for (let col = 0; col < width; col++) {
      rowArr.push(CreateNode(row, col));
    }
    grid.push(rowArr);
  }
  return (grid);
};

const CreateNode = (row, col) => {
  return ({
    row,
    col,
    bombsAround: 0,
    isHidden: true,
    isBomb: false,
    isFlag: false,
  })
};

const LeftClick = (grid, row, col) => {
  const node = grid[row][col];
  if (node.isBomb) {
    BombFound(grid, row, col);
    return false;
  } else if (node.bombsAround !== 0 || !node.isHidden) {
    ClearSquare(grid, row, col);
  } else {
    ClearSquare(grid, row, col);
    let neighbors = getNeighbors(grid, row, col);
    neighbors = neighbors.filter(node => node.isHidden);
    neighbors.forEach(node => {
      LeftClick(grid, node.row, node.col);
    });
  }
  return true;
}

const BombFound = (grid, row, col) => {
  const node = grid[row][col];
  const newNode = {
    ...node,
    isHidden: false,
  }
  grid[row][col] = newNode;
}

const ClearSquare = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isHidden: false,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

const getNewGridWithMine = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isBomb: true,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

const isMine = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const {isBomb} = node;
  return isBomb;
}

const CreateMines = (grid, mineCount, startNode) => {
  let newGrid = grid;
  let minesPut = 0;
  while (minesPut < mineCount) {
    const pos = RandomPos(grid.length, grid[0].length);
    if (isMine(newGrid, pos.row, pos.col)) continue;
    if (Math.abs(startNode.row - pos.row) < 2 && Math.abs(startNode.col - pos.col) < 2) continue;
    newGrid = getNewGridWithMine(newGrid, pos.row, pos.col);
    minesPut++;
  }
  return newGrid;
}

const RandomPos = (rows, cols) => {
  return ({
    row: Math.floor(Math.random() * rows),
    col: Math.floor(Math.random() * cols),
  })
}

const UpdateMineCount = (grid) => {
  grid.forEach(row => {
    row.forEach(node => {
      node.bombsAround = CountNeighbors(grid, node.row, node.col);
    })
  });
}

const CountNeighbors = (grid, row, col) => {
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

  return neighbors.filter(node => node.isBomb).length;
}

const getNeighbors = (grid, row, col) => {
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

const HiddenSquares = (grid) => {
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col].isHidden) {
        count++;
      }
    }
  }
  return count;
}