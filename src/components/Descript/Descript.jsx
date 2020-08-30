import React, { Component } from 'react';
import './Descript.scss';
import Player from '../Player/Player.jsx';

export default class Descript extends Component {
  render() {
    const { selected, birds } = this.props;
    let bird;
    if (!(selected === undefined)) {
      bird = birds[selected];
    }

    return (
      <div className="descript">
        {selected === undefined ? <><div>Послушайте плеер.</div><div>Выберите птицу из списка</div></>
        : <>
          <div className="descript__content">
            <img className="descript__img" src={bird.image} />
            <div className="descript__body">
              <h4>{bird.name}</h4>
              <div className="descript__lat">{bird.species}</div>
              <Player src={bird.audio} />
            </div>
          </div>
          <div className="descript__text">{bird.description}</div>
        </>}
      </div>
    );
  }
}
