import React from 'react';
import App from './app';
import 'file?name=index.html!./index.html';

React.render(<App/>, document.getElementById('app'));
