import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware  from 'redux-thunk';
import reducers from './reducers/rootReducer';

export default (preloadedState: any) =>
  createStore(reducers, preloadedState, applyMiddleware(thunkMiddleware));
