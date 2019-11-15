import React, {Component} from 'react';
import './Node.css';

export default class Node extends Component {

  render() {

    const {
      col, 
      row,
    } = this.props;

    return (
      <div className="Node Node-hidden">

      </div>
    )
  }
}