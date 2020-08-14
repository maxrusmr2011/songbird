import React, { Component } from 'react';
import Game from '../../js/Game';
import './App.scss';
import Header from '../Header/Header.jsx';
import Question from '../Question/Question.jsx';
import Cases from '../Cases/Cases.jsx';
import Descript from '../Descript/Descript.jsx';
import Modal from '../Modal/Modal.jsx';
import errorSound from '../../assets/audio/error.mp3';
import correctSound from '../../assets/audio/correct.mp3';
import failSound from '../../assets/audio/failure.mp3';
import successSound from '../../assets/audio/success.mp3';


export default class App extends Component {
  err = new Audio(errorSound);

  correct = new Audio(correctSound);

  constructor(props) {
    super(props);
    this.game = new Game();
    this.game.init();
    this.state = { 
      levels: this.game.levels,
      numLevel: this.game.currentLevel,
      score: 0,
      maxScore: 5,
      addScore: 5,
      currentCases: this.game.currentCases,
      marks: Array(this.game.currentCases.length).fill(undefined),
      endRound: false,
      selected: undefined,
      stopGame: false,
    };
  }

  nextLevel = () => {
    if (this.state.endRound && !this.state.stopGame) {
      this.game.nextLevel();
      this.nullLevel();
      this.setState({...this.state});
      }
    }

  nullLevel = () => {
    this.state.numLevel = this.game.currentLevel;
    this.state.addScore = 5;
    this.state.maxScore += this.state.addScore;
    this.state.currentCases = this.game.currentCases;
    this.state.marks = Array(this.game.currentCases.length).fill(undefined);
    this.state.endRound = false;
    this.state.selected = undefined;
  }

  restart = () => {
    // console.log('next game');
    this.game.init();
    this.state.maxScore = 0;
    this.nullLevel();
    this.setState({...this.state, score: 0, stopGame: false});
  }
    
    selectCase = (num) => {
      this.state.selected = num;
      if (!this.state.endRound && !this.state.marks[num]) {
        if (num === this.game.randomCase) {
          this.state.marks[num] = 2;
          this.state.endRound = true;
          this.state.score += this.state.addScore;
          this.correct.play();
          this.state.stopGame = this.game.lastLevel;
      
          this.controlWin();
      } else {
        this.state.marks[num] = 1;
        this.state.addScore -= 1;
        this.err.play();
      } 
    }
    this.setState({...this.state});
  }

  controlWin() {
    if (this.state.stopGame) {
      const sound = this.state.score === this.state.maxScore ? successSound : failSound;
      const audio = new Audio(sound);
      setTimeout(() => {
        audio.play();
      }, 1000);
  
    }
  }

  render() {
    return (
        <>
          <Header  levels={this.state.levels} numLevel={this.state.numLevel} score={this.state.score} />
          <Question win={this.state.endRound} bird={this.state.currentCases[this.game.randomCase]} />
          <div className="main wrapper">
            <Cases end={this.state.endRound} selectCase={this.selectCase} cases={this.state.currentCases} marks={this.state.marks} />
            <Descript selected={this.state.selected} birds={this.state.currentCases} />
          </div>
          <div className={`wrapper next${this.state.endRound && !this.game.lastLevel ? ' next-active' : ''}`} onClick={this.nextLevel} >Next Level</div>
          {this.state.stopGame && <Modal {...this.state}  restart={this.restart} />}
        </>
      );
  }
}
