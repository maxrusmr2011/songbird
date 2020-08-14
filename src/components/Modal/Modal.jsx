import React from 'react';
import './Modal.scss';
import fail from '../../assets/img/failure.jpg';
import success from '../../assets/img/success.jpg';

export default function Modal(props) {
  const win = props.score === props.maxScore;
  const image = win ? success : fail;
  return (
      <div className="modal">
        <div className="modal__img">
          <img src={image} alt="smile"/>
        </div>
        <div style={{color: 'red'}}>Вы набрали {props.score} баллов из {props.maxScore} возможных</div>
        <div>
          {win
          ? <span>Вы знаток. Если хотите узнать большее о птицах, зайдите на <a href="https://www.xeno-canto.org/" target="_blank">сайт</a></span>
          : 'Да... Это не максиманое количество баллов. Но Вы можете сыграть еще раз.'
        }
        </div> 
        <button onClick={props.restart}>Continue</button>
      </div>
  );
}

