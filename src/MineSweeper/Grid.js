import React, {Component} from 'react';

export default class Grid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      grid_width = this.props.width,
      grid_height = this.props.height,
      loading: true,
    }
  }

  componentDidMount() {
    const {grid_width, grid_height} = this.state
    grid = CreateGrid(grid_width, grid_height);
    this.setState({grid, loading: false});
  }

  render() {

  }
}

const CreateGrid = (width, height) => {
  grid = []
  for (let row = 0; row < height; row++) {
    row = []
    for (let col = 0; col < width; col++) {
      row.push()
    }
  }
};

const CreateNode = (row, col) => {
  return ({
    row,
    col
  })
};