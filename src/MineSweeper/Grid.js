import React, {Component} from 'react';
import Node from './Node/Node';
import AIMove from './AI/main';
import './Game.css';

export default class Grid extends Component {
  _isMounted = false;

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
      hasWon: false,
      time: 0,
      aiSpeed: this.props.aiSpeed,
    }
  }

  componentDidMount() {
    const {grid_width, grid_height, mineCount} = this.state;
    const grid = CreateGrid(grid_width, grid_height, mineCount);
    this.setState({grid, loading: false});
    this._isMounted = true;
  }

  componentWillUnmount() {
    this.stopTimer();
    this._isMounted = false;
  }
  sendWinCallback() {
    this.setState({hasWon: true});
    const data = {
      from: 'grid-win',
    };
    this.props.parentCallback(data);
  }

  sendMineCountCallback(flags) {
    const minesLeft = this.state.mineCount - flags;
    const data = {
      from: 'grid-minecount',
      minesLeft: minesLeft,
    }
    this.props.parentCallback(data);
  }

  sendLossCallback() {
    const data = {
      from: 'grid-loss',
    }
    this.props.parentCallback(data);
  }

  startTimer() {
    this.timer = setInterval(() => this.setState({
      time: this.state.time + 1
    }), 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  resetTimer() {
    this.setState({time: 0});
  }

  handleOnClick(row, col) {
    const {firstClick, grid, mineCount, alive} = this.state;
    if (!alive) return;
    if (!this._isMounted) return;
    if (firstClick) {
      const newGrid = FirstClick(grid, row, col, mineCount);
      this.resetTimer();
      this.startTimer();
      this.setState({grid: newGrid, firstClick: false});
    } else {
      let newGrid = grid;
      const isAlive = LeftClick(newGrid, row, col);
      if (!isAlive) {
        this.stopTimer();
        this.sendLossCallback();
      }
      this.setState({grid: newGrid, alive: isAlive});
    }
    if (HiddenSquares(grid) === 0) {
      this.sendWinCallback();
      this.stopTimer();
    }
  }

  handleContextMenu = (e, row, col) => {
    if (!this._isMounted) return;
    if (e !== undefined) e.preventDefault();

    const newGrid = RightClick(this.state.grid, row, col);
    this.setState({grid: newGrid});
    const flags = Flags(this.state.grid);
    this.sendMineCountCallback(flags);
  }

  playAI = () => {
    const {aiSpeed} = this.state;
    if (!this._isMounted) return;
    setTimeout(() => {
      const {grid, mineCount, firstClick} = this.state;
      const {row, col, left} = AIMove(grid, mineCount, firstClick);
      if (left) this.handleOnClick(row, col);
      else this.handleContextMenu(undefined, row, col);
      let {alive, hasWon} = this.state;
      if (alive && !hasWon) this.playAI();
    }, aiSpeed);
  }

  render() {
    const {grid, loading, time, mineCount, hasWon, alive} = this.state;
    if (loading) {
      return (
        'Loading...'
      );
    }
    return (
      <>
      <button onClick={() => {this.playAI(); console.log("newgame")}}>
        AI
      </button>
      <div className="timer" >
        Mines left: {mineCount - Flags(grid)}<br/> Time: {time}
      </div>
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
                  gameWon={hasWon} 
                  gameLost={!alive}
                  onContextMenu={(e, row, col) => this.handleContextMenu(e, row, col)}
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
    isClear: false,
    linked: false,
    risk: null,
    links: [],
  })
};

const RightClick = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (!node.isHidden) return grid;
  const value = !node.isFlag;
  const newNode = {
    ...node,
    isFlag: value,
  }
  newGrid[row][col] = newNode;
  return newGrid;
}

const LeftClick = (grid, row, col) => {
  const node = grid[row][col];
  if (node.isFlag) {
    return true;
  }
  if (node.isBomb) {
    BombFound(grid, row, col);
    return false;
  } else if (node.bombsAround !== 0 || !node.isHidden) {
    ClearSquare(grid, row, col);
  } else {
    ClearSquare(grid, row, col);
    let neighbors = getNeighbors(grid, row, col);
    neighbors = neighbors.filter(node => node.isHidden && !node.isFlag);
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
  let safeSpace = 2;
  if (grid.length * grid[0].length - 9 < mineCount) safeSpace = 1;
  while (minesPut < mineCount) {
    const pos = RandomPos(grid.length, grid[0].length);
    if (isMine(newGrid, pos.row, pos.col)) continue;
    if (Math.abs(startNode.row - pos.row) < safeSpace && Math.abs(startNode.col - pos.col) < safeSpace) continue;
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

const Flags = (grid) => {
  let count = 0;
  grid.forEach(row => {
    row.forEach(node => {
      if (node.isFlag) count++;
    })
  })
  return count;
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
      if (grid[row][col].isHidden && !grid[row][col].isBomb) {
        count++;
      }
    }
  }
  return count;
}