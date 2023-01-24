import {
  RegisterForm,
  LoginForm,
  MockDb,
  DataService,
  RegisterUserDataServiceResponse,
  GetUserProfileResponse,
  LoginResponse,
} from '@interviewApp/src/types';
import {encrypt, decrypt} from '../generateString';
import {generate} from './tokenGenerator';

export const registerUser = (
  registerForm: RegisterForm,
  mockDb: MockDb,
): RegisterUserDataServiceResponse => {
  const response: RegisterUserDataServiceResponse = {
    isRegistered: false,
    errorCode: '',
    errorMessage: '',
  };
  try {
    if (!registerForm) {
      response.errorCode = 'S676H';
      response.errorMessage = 'Invalid Arguments';
      return response;
    }

    registerForm.password = encrypt(registerForm.password);
    // normally will use database api i.e. pg to interact with a database, had to mock in memory here as not
    // sure user has postgresql install on their machine to run the server, so for ease of use.

    if (mockDb.addUser(registerForm)) {
      response.isRegistered = true;
    }
    return response;
  } catch (error) {
    response.errorCode = 'Jkl87';
    response.errorMessage = 'Register User exception error';
    return response;
  }
};

export const login = (loginForm: LoginForm, mockDb: MockDb): LoginResponse => {
  const response: LoginResponse = {
    hasLoggedIn: false,
    errorCode: '',
    errorMessage: '',
    token: null,
  };
  try {
    const {userName, password} = loginForm;
    if (!userName && !password) {
      response.errorCode = 'S676H';
      response.errorMessage = 'Invalid Arguments';
      return response;
    }

    const user = mockDb.getUser(userName);

    if (!user) {
      response.errorCode = 'Jkl84';
      response.errorMessage = 'User does not exist';
      return response;
    }
    const decryptPassword = decrypt(user.password);

    if (password === decryptPassword) {
      // need to return a cookie also

      const {portalAccessList, apiAccessList} = mockDb.getMembershipAccessList(
        user.membershipType,
      );

      const token = generate(
        {...user, portalAccessList, apiAccessList},
        'interviewApp',
        false,
      );

      response.token = token;
      response.hasLoggedIn = true;
    } else {
      response.errorCode = 'Jkl55';
      response.errorMessage = 'Incorrect user credentials';
    }

    return response;
  } catch (error) {
    response.errorCode = 'Jkl88';
    response.errorMessage = 'Login User exception error';
    return response;
  }
};

export const getUserProfile = (
  userName: string,
  mockDb: MockDb,
): GetUserProfileResponse => {
  const response: GetUserProfileResponse = {
    hasUserProfile: false,
    profile: null,
    errorCode: '',
    errorMessage: '',
  };

  try {
    if (!userName) {
      response.errorCode = 'S676H';
      response.errorMessage = 'Invalid Arguments';
      return response;
    }

    // normally will use database api i.e. pg to interact with a database, had to mock in memory here as not
    // sure user has postgresql install on their machine to run the server, so for ease of use.
    const user = mockDb.getUser(userName);

    if (user) {
      response.hasUserProfile = true;
      response.profile = user;
    } else {
      response.errorCode = 'JP789';
      response.errorMessage = 'Unable to retrive user profile';
    }
    return response;
  } catch (error) {
    response.errorCode = 'Jkl87';
    response.errorMessage = 'Register User exception error';
    return response;
  }
};

export default (db: MockDb): DataService => ({
  registerUser: (registerForm: RegisterForm): RegisterUserDataServiceResponse =>
    registerUser(registerForm, db),
  login: (loginForm: LoginForm): LoginResponse => login(loginForm, db),
  getUserProfile: (userName: string): GetUserProfileResponse =>
    getUserProfile(userName, db),
});
