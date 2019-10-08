import {createStore, applyMiddleware} from 'redux';
import promise from 'react-router-dom';

import reducer from './reducer';

export default createStore(reducer, applyMiddleware(promise))