import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import './index.scss';
import App from './components/App/App.jsx';

const AppWithHot = hot(module)(App);
ReactDOM.render(
    <AppWithHot />,
    document.getElementById('app')
  );
 