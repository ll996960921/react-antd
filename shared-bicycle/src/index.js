import React from 'react';
import ReactDOM from 'react-dom';
import IRouter from './router';
import { Provider } from 'react-redux';
import store from './redux/store'

ReactDOM.render(<Provider store={store}><IRouter/></Provider>, document.getElementById('root'));