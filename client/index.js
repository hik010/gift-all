import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import clientSocket from './socket';
import '../public/style.css';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
