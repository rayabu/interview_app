import {
  RegisterForm,
  RegisterUserResponse,
  LoginResponse,
  LoginForm,
  GetUserProfileResponse,
} from '@interviewApp/src/types';
import fetchClient from './fetchClient';

export const registerUserAsync = async (
  registerForm: RegisterForm,
): Promise<RegisterUserResponse> => {
  const response = await fetchClient<RegisterUserResponse>(
    '/api/registerUser',
    {
      registerForm,
    },
  );

  return response.data;
};

export const loginAsync = async (
  loginForm: LoginForm,
): Promise<LoginResponse> => {
  const response = await fetchClient<LoginResponse>('/api/login', {
    loginForm,
  });

  return response.data;
};

export const getUserProfileAsync = async (): Promise<
  GetUserProfileResponse
> => {
  const response = await fetchClient<GetUserProfileResponse>(
    '/api/getUserProfile',
  );
  return response.data;
};

export default {registerUserAsync, loginAsync, getUserProfileAsync};
