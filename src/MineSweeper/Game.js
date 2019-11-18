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
    }
  }

  componentDidMount() {
    this.setState({loading: false});
  }

  Callback = (data) => {
    const {from} = data;
    if (from === 'grid-win') {
      const {hasWon} = data;
      this.setState({hasWon: hasWon});
    }
  }

  handleOptionChange = (e) => {
    this.setState({option: e.target.value});
  }

  handleNewGame = (e) => {
    e.preventDefault();
    const {option} = this.state;
    if (option === "beginner") {
      this.setState({width: 9, height: 9, mineCount: 10});
    } else if (option === "intermediate") {
      this.setState({width: 16, height: 16, mineCount:40});
    } else if (option === "expert") {
      this.setState({width: 30, height: 16, mineCount: 99});
    }
    this.Restart();
  }

  Restart = () => {
    let {key} = this.state;
    key++;
    this.setState({key: key, hasWon: false})
  }
  
  render() {
    const {key, loading, option, width, height, mineCount} = this.state;
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
            Beginner
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
