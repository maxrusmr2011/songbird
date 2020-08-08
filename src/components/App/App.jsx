import React, { Component } from 'react';
import Header from '../Header/Header.jsx';
import './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  toggleActive = () => {
    this.setState(prevState => ({ active: !prevState.active }));
  };

  render() {
    return (
        <>
          <Header levels={[1, 2, 3, 4, 5, 6]} numLevel={0} />
          <h3 className="red-text">Hello {this.props.name}</h3>
          <button style={{color: 'green'}} type="button" onClick={this.toggleActive}>
            Hello {this.props.name}! Press to toggle
          </button>
          <h2>{this.state.active ? "img2" : "img1"} </h2>
        </>
      );
  }
}
