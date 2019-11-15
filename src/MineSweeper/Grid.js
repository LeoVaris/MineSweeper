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
    }
  }

  componentDidMount() {
    const {grid_width, grid_height} = this.state;
    const grid = CreateGrid(grid_width, grid_height);
    this.setState({grid, loading: false});
  }

  render() {
    const {grid, loading} = this.state;
    if (loading) {
      return (
        'Loading...'
      );
    }
    return (
      <div className="grid">
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex}>
            {row.map((node, nodeIndex) => {
              const {row, col} = node;
              return (
                <Node 
                  key={nodeIndex}
                  col={col}
                  row={row}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
    );
  }
}

const CreateGrid = (width, height) => {
  const grid = []
  for (let row = 0; row < height; row++) {
    const row = []
    for (let col = 0; col < width; col++) {
      row.push(CreateNode(row, col));
    }
    grid.push(row);
  }
  return (grid);
};

const CreateNode = (row, col) => {
  return ({
    row,
    col
  })
};