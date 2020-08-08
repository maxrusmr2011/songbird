import React, { Component } from 'react';
import './Header.scss';

export default class Header extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { levels, numLevel, score } = this.props;
    return (
      <header>
        <h1 className="logo">Logo</h1>
        <div className="score">Score: {score}</div>
        <ul className="level">
          { levels.map((item, i) => (<li className={`level__item${numLevel === i ? ' level__item-active' : ''}` }>{item} {i}</li>)) }
        </ul>
      </header>
    );
  }
}
