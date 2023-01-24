import {ActionReturn, InitialState} from '@interviewApp/src/types';
import types from '../actionTypeConstants';

export default function userProfileReducer(
  state: InitialState = {userProfile: null},
  action: ActionReturn,
) {
  switch (action.type) {
    case types.addUserProfile:
      if (action.payLoad.data !== null) {
        return Object.assign({}, state, {userProfile: action.payLoad.data});
      } else {
        return state;
      }
    default:
      return state;
  }
}
