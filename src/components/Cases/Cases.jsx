import React, { Component } from 'react';
import './Cases.scss';

export default class Cases extends Component {
  
  render() {
    const { cases, marks, selectCase, end } = this.props;
    return (
      <ul className="cases">
        {cases.map((item, i) => (
        <li className={`case${marks[i] || end ? '' : ' case-active'}`} key={i} onClick={() => {selectCase(i)}}>
          <div  className={`case__mark${marks[i] === 1 ? ' fail' : ''}${marks[i] === 2 ? ' success' : ''}`}></div>
          <div className="case__word">
            {item.name}
          </div>
        </li>
        ))}
      </ul>
    );
  }
}
