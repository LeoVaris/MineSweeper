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
      onContextMenu,
      gameWon,
      gameLost,
    } = this.props;

    let extraClassName = ''
    // Determines whats shown to user (Different according to gamestate)
    if (gameLost) {
      if (isFlag && !isBomb) extraClassName = 'Node-wrongflag'
      else if (isFlag) extraClassName = 'Node-flag'
      else if (isBomb && !isHidden) extraClassName = 'Node-bombhit'
      else if (isBomb) extraClassName = 'Node-bomb'
      else if (isHidden) extraClassName = 'Node-hidden'
      else extraClassName = `Node-${bombsAround}`
    }
    else if (gameWon) {
      if (isFlag) extraClassName = 'Node-flag'
      else if (isBomb) extraClassName = 'Node-bomb'
      else if (isHidden) extraClassName = 'Node-hidden'
      else extraClassName = `Node-${bombsAround}`
    }
    else {
      if (isFlag) extraClassName = 'Node-flag'
      else if (isHidden) extraClassName = 'Node-hidden'
      else if (isBomb) extraClassName = 'Node-bombhit'
      else extraClassName = `Node-${bombsAround}`
    }
    return ( 
      <div 
        className={`Node ${extraClassName}`}
        onClick={() => onClick(row, col)}
        onContextMenu={(e) => onContextMenu(e, row, col)}
      ></div>
    )
  }
}