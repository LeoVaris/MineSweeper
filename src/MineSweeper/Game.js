import React, {Component} from 'react';
import Grid from './Grid';

export default class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      width: 9,
      height: 9,
      mineCount: 10,
      key: 0,
      hasWon: false,
      option: "beginner",
      minesLeft: 0,
      customData: [],
    }
  }

  componentDidMount() {
    const {mineCount} = this.state;
    const customData = [9, 9, 10];
    this.setState({loading: false, minesLeft: mineCount, customData: customData});
  }

  Callback = (data) => {
    const {from} = data;
    if (from === 'grid-win') {
      const {hasWon} = data;
      this.setState({hasWon: hasWon});
    } else if (from === 'grid-minecount') {
      const {minesLeft} = data;
      this.setState({minesLeft: minesLeft});
    }
  }

  handleOptionChange = (e) => {
    this.setState({option: e.target.value});
  }

  handleCustomGame = (e, index) => {
    const {customData} = this.state;
    const newData = customData;
    newData[index] = parseInt(e.target.value);
    this.setState({customData: newData});
  }

  handleNewGame = (e) => {
    e.preventDefault();
    const {option, customData} = this.state;
    if (option === "beginner") {
      this.setState({width: 9, height: 9, mineCount: 10, minesLeft: this.state.mineCount});
    } else if (option === "intermediate") {
      this.setState({width: 16, height: 16, mineCount:40, minesLeft: this.state.mineCount});
    } else if (option === "expert") {
      this.setState({width: 30, height: 16, mineCount: 99, minesLeft: this.state.mineCount});
    } else if (option === "custom") {
      if (customData.every(atr => !isNaN(atr))) {
        const bombs = this.Verifybomb(customData);
        this.setState({width: customData[0], height: customData[1], mineCount: bombs, minesLeft: this.state.mineCount});
      } else return;
    }
    this.Restart();
  }

  Verifybomb(data) {
    if (data[0] * data[1] < 10) return (1);
    if (data[0] * data[1] - 9 >= data[2]) {
      return (data[2]);
    } else {
      return (data[0] * data[1] - 9);
    }
  }

  Restart = () => {
    let {key} = this.state;
    key++;
    this.setState({key: key, hasWon: false, minesLeft: this.state.mineCount})
  }
  
  render() {
    const {key, loading, option, width, height, mineCount, minesLeft} = this.state;
    if (loading) {
      return ('Loading...');
    }
    return (
      <>
        <button onClick={this.Restart}>
            Restart
        </button>
        <form onSubmit={this.handleNewGame}>
          <div className="radio">
            <label>
              <input type="radio" value="beginner" checked={option === "beginner"} onChange={this.handleOptionChange}/>
              {minesLeft}
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="intermediate" checked={option === "intermediate"} onChange={this.handleOptionChange}/>
              Intermediate
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="expert" checked={option === "expert"} onChange={this.handleOptionChange}/>
              Expert
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="custom" checked={option === "custom"} onChange={this.handleOptionChange}/>
              Custom&nbsp;<br/>
            </label>
            <label>
              Width:
              <input className="custom-input" type="number" name="width" autoComplete="off" min={1} max={100} onChange={(e) => this.handleCustomGame(e, 0)}/>
            </label>
            <label>
              <br/>Height:
              <input className="custom-input" type="number" name="height" autoComplete="off" min={1} max={100} onChange={(e) => this.handleCustomGame(e, 1)}/>
            </label>
            <label> 
              <br/>Bombs:
              <input className="custom-input" type="number" name="bombs" autoComplete="off" min={0} max={200} onChange={(e) => this.handleCustomGame(e, 2)}/>
            </label>
          </div>
          <button className="btn" type="submit">New Game</button>
        </form>
        <div key={key}>
          <Grid
            onContextMenu={this.handleClick}
            parentCallback = {this.Callback}
            width={width}
            height={height}
            mineCount={mineCount}
          ></Grid>
        </div>
        
      </>
    );
  }
}
