import {combineReducers} from 'redux';
import userProfileReducer from './userProfileReducer';

const createRootReducer =
  combineReducers({
    userProfile: userProfileReducer,
  });

export default createRootReducer;
