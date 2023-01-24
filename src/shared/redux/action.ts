import {
  RegisterForm,
  AppThunk,
  RegisterUserResponse,
  LoginForm,
  LoginResponse,
  ActionReturn,
  GetUserProfileResponse,
  Profile,
  DispatchThunk,
} from '@interviewApp/src/types';
import services from '@interviewApp/src/shared/services';
import types from './actionTypeConstants';

export function registerUser(
  registerForm: RegisterForm,
): AppThunk<RegisterUserResponse> {
  return async function () {
    const response = await services.registerUserAsync(registerForm);
    return response;
  };
}

export function login(loginForm: LoginForm): AppThunk<LoginResponse> {
  return async function () {
    return await services.loginAsync(loginForm);
  };
}

export function getUserProfile(): AppThunk<GetUserProfileResponse> {
  return async function (dispatch: DispatchThunk) {
    const response = await services.getUserProfileAsync();
    if (response.hasUserProfile) {
      dispatch(addUserProfile(response.profile));
    }
    return response;
  };
}

function addUserProfile(profile: Profile): ActionReturn {
  return {
    type: types.addUserProfile,
    payLoad: {
      data: profile,
    },
  };
}

export default {
  registerUser,
  login,
  getUserProfile,
};
