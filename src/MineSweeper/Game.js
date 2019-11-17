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

  GridCallback = (data) => {
    this.setState({hasWon: data});
  }

  Restart = () => {
    let {key} = this.state;
    key++;
    this.setState({key: key, hasWon: false})
  }
  
  render() {
    const {key, loading, hasWon} = this.state;
    if (loading) {
      return ('Loading...');
    }
    return (
      <>

        <button onClick={this.Restart}>
            Restart
        </button>
        <WinMsg
          hasWon={hasWon}
        ></WinMsg>
        <div key={key}>
          <Grid
            parentCallback = {this.GridCallback}
            width={9}
            height={9}
            mineCount={10}
          ></Grid>
        </div>
        
      </>
    );
  }
}

function WinMsg(props) {
  if (props.hasWon) {
    return (<div>
      You win!
    </div>)
  } else {
    return (
      <div>
        Play
      </div>
    )
  }
}
