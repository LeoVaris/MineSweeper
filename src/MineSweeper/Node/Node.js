import React, {Component} from 'react';
import './Node.css';

export default class Node extends Component {

  render() {

    const {
      col, 
      row,
      bombsAround,
      isHidden,
      isBomb,
      isFlag,
    } = this.props;

    let extraClassName = ''
    if (isHidden) extraClassName = 'Node-hidden'
    else if (isFlag) extraClassName = 'Node-flag'
    else if (isBomb) extraClassName = 'Node-bomb'
    else extraClassName = `Node-${bombsAround}`

    return (
      <div className={`Node ${extraClassName}`}>

      </div>
    )
  }
}