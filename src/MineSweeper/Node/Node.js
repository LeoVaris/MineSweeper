import React, {Component} from 'react';
import './Node.css';

export default class Node extends Component {

  render() {

    const {
      row,
      col,
      bombsAround,
      isHidden,
      isBomb,
      isFlag,
      onClick,
      gameWon,
      gameLost,
    } = this.props;

    let extraClassName = ''

    if (gameLost) {
      if (isBomb && !isHidden) extraClassName = 'Node-bombhit'
      else if (isBomb) extraClassName = 'Node-bomb'
      else if (isHidden) extraClassName = 'Node-hidden'
      else extraClassName = `Node-${bombsAround}`
    }
    else if (gameWon) {
      if (isBomb) extraClassName = 'Node-bomb'
      else if (isHidden) extraClassName = 'Node-hidden'
      else extraClassName = `Node-${bombsAround}`
    }
    else {
      if (isHidden) extraClassName = 'Node-hidden'
      else if (isFlag) extraClassName = 'Node-flag'
      else if (isBomb) extraClassName = 'Node-bombhit'
      else extraClassName = `Node-${bombsAround}`
    }
    return (
      <div 
        className={`Node ${extraClassName}`}
        onClick={() => onClick(row, col)}
      ></div>
    )
  }
}