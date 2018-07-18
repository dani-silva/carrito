import React from 'react';
import ReactDom from 'react-dom';
import App from './container/app.jsx';

ReactDom.render( <App receipt={receipt} />, document.getElementById('app'));