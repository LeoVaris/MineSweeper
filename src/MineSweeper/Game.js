import React, {Component} from 'react';
import Grid from './Grid';

export default class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      key: 0,
      hasWon: false,
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

  Restart = () => {
    let {key} = this.state;
    key++;
    this.setState({key: key, hasWon: false})
  }
  
  render() {
    const {key, loading, currentOption} = this.state;
    if (loading) {
      return ('Loading...');
    }
    return (
      <>
        <button onClick={this.Restart}>
            Restart
        </button>
        <div key={key}>
          <Grid
            onContextMenu={this.handleClick}
            parentCallback = {this.Callback}
            width={9}
            height={9}
            mineCount={1}
          ></Grid>
        </div>
        
      </>
    );
  }
}
