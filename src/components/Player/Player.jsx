import React, { Component } from 'react';
import './Player.scss';
import volumeImg from '../../assets/img/sound.png';

export default class Player extends Component {
  audio = new Audio(this.props.src);

  constructor(props) {
    super(props);
    this.state = {
      volume: 1,
      play: false,
      timeCurr: 0,
      timeLong: 0,
      stopping: undefined,
    }
    this.audio.addEventListener('loadeddata', () => {
      this.setState({...this.state, timeLong: this.audio.duration});
    });
  }

  componentDidUpdate(oldProps) {
    // if (this.props.win && !oldProps.win && this.state.play) {
    if ((this.props.win && !oldProps.win || this.props.src !== oldProps.src) && this.state.play) {
      this.play();
    }
    if (oldProps.src !== this.props.src) {
      this.audio = new Audio(this.props.src);
      
      this.audio.addEventListener('loadeddata', () => {
        this.setState({play: false,
          timeCurr: 0,
          stopping: undefined, timeLong: this.audio.duration});
          this.audio.volume = this.state.volume;

      });
      // this.setState({...this.state});
    }
  }

  componentWillUnmount() {
    if (this.state.play) {
      this.play();
    }
  }

  timeStr = (time) => {
    const sec = Math.floor(time) % 60;
    const min = Math.floor(time / 60);
    return `${min < 10 ? '0' : ''}${min}.${sec < 10 ? '0' : ''}${sec}`;
  }

  play() {
    if (this.state.play) {
      clearInterval(this.state.stopping);
      this.setState({...this.state, play: false});
      this.audio.pause();
    } else {
      this.state.play = true;
      this.audio.play();
      this.state.stopping = setInterval(() => {
        if (this.state.timeCurr + 0.1 >= this.state.timeLong) {
          clearInterval(this.state.stopping);
          this.setState({...this.state, play: false, timeCurr: 0});
        } else {
          this.setState({...this.state, timeCurr: this.state.timeCurr + 0.1});
        }
      }, 100);
    }
  }

  changeVolume = (e) => {
    this.state.el = e.currentTarget;

    this.audio.volume = this.state.el.value;
    this.setState({...this.state, volume: this.state.el.value})
  };

  render() {
    // const { volume } = this.props;
    return (
      <div className="player">
        <div className="player__btn" onClick={() => {this.play()}}>
          {this.state.play 
            ? <div className="btn-pause"></div>
            : <div className="btn-play"></div>
          }
        </div>
        <div className="player__line line">
          <div className="line__long"></div>
          <div className="line__base">
            <div className="line__mark" style={{left: `${this.state.timeCurr * (100 / this.state.timeLong)}%`}}></div>
          </div>
          <div className="line__time line__time-curr">{this.timeStr(this.state.timeCurr)}</div>
          <div className="line__time line__time-end">{this.timeStr(this.state.timeLong)}</div>
          <img className="line__img" src={volumeImg} alt="volume" />
          <input defaultValue={this.state.volume} type="range" className="line__volume" min={0} max={1} step={0.1} onChange={this.changeVolume} />
        </div>
      </div>
    );
  }
}
