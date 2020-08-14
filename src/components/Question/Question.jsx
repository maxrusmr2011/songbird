import React, { Component } from 'react';
import './Question.scss';
import Player from '../Player/Player.jsx';
import patch from '../../assets/img/bird.jpg';

export default class Question extends Component {
  
  render() {
    const { bird, win } = this.props;
    return (
      <div className="question">
        <div className="wrapper">
          <img className="question__img" src={win ? bird.image : patch} alt="bird"/>
          <div className="question__content">
            <h3>
              {win ? bird.name : '******'}
            </h3>
            <hr />
            <Player src={bird.audio} win={win} />
          </div>
        </div>
      </div>
    );
  }
}
