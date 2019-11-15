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
    }
  }

  componentDidMount() {
    const {grid_width, grid_height} = this.state;
    const grid = CreateGrid(grid_width, grid_height);
    this.setState({grid, loading: false});
  }

  handleOnClick(row, col) {
    const grid = LeftClick(this.state.grid, row, col);
    this.setState(grid);
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

const CreateGrid = (width, height) => {
  const grid = []
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
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isHidden: false,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}