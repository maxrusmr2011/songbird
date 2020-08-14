import React, { Component } from 'react';
import './Header.scss';

export default class Header extends Component {
  
  render() {
    const { levels, numLevel, score } = this.props;
    return (
      <header className="header">
        <div className="wrapper">
          <h1 className="header__logo">Song<span>bird</span></h1>
          <div className="header__score">Score: {score}</div>
          <ul className="level">
            {levels.map((item, i) => (
              <li 
                key={i} 
                className={`level__item${numLevel === i ? ' level__item-active' : ''}`}>
                  {item}
              </li>
            ))}
          </ul>
        </div>
      </header>
    );
  }
}
