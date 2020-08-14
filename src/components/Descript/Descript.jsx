import React, { Component } from 'react';
import './Descript.scss';
import Player from '../Player/Player.jsx';

export default class Descript extends Component {
  render() {
    const { selected, birds } = this.props;
    // console.log(selected);
    let bird;
    // let NewPlay;s
    if (!(selected === undefined)) {
      bird = birds[selected];
      // NewPlay = () => (<Player src={bird.audio} />);
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
              {/* <NewPlay /> */}
              <Player src={bird.audio} />
      
            </div>
          </div>
          <div className="descript__text">{bird.description}</div>
        </>}
      </div>
    );
  }
}
