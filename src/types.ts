import {Action, AnyAction, combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import userProfileReducer from '@interviewApp/src/shared/redux/reducers/userProfileReducer';

export interface RegisterForm {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  membershipType: string;
}

export interface MembershipTypeEnum {
  Gold: string;
  Silver: string;
  Bronze: string;
  Admin: string;
}

export interface Profile extends RegisterForm {}

export interface User extends RegisterForm {}

export interface UserTableRow {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  membershipType: string;
}

const rootReducers = combineReducers({
  userProfile: userProfileReducer,
});

export type AppState = ReturnType<typeof rootReducers>;

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export interface MockDb {
  addUser: (_registerForm: UserTableRow) => boolean;
  getUser: (userName: string) => User;
  getMembershipAccessList: (
    membershipType: string,
  ) => GetMembershipAccessListResponse;
}

export interface LoginForm {
  userName: string;
  password: string;
}

export interface Error {
  isError: boolean;
  message: string;
}

export type ActionTypeConstraits = {
  addUserProfile: string;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number; // in miniutes
  refreshTokenExpires: number;
};

export type LoginResponse = {
  hasLoggedIn: boolean;
  errorCode: string;
  errorMessage: string;
  token: Token;
};

export type GetUserProfileResponse = {
  hasUserProfile: boolean;
  profile: Profile;
  errorCode: string;
  errorMessage: string;
};

export type AccessTableRow = {
  membershipType: string;
  portalAccess: PortalAccess[];
  apiAccess: ApiAccess[];
};

export type GetMembershipAccessListResponse = {
  portalAccessList: PortalAccess[];
  apiAccessList: ApiAccess[];
};

export type RegisterUserDataServiceResponse = {
  isRegistered: boolean;
  errorCode: string;
  errorMessage: string;
};
export type PayLoad = {
  data: any;
};

export type DataService = {
  registerUser: (registerForm: RegisterForm) => RegisterUserDataServiceResponse;
  login: (loginForm: LoginForm) => LoginResponse;
  getUserProfile: (userName: string) => GetUserProfileResponse;
};

export type GenerateResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number; // in miniutes
  refreshTokenExpires: number;
};

export type PortalAccess = {
  description: string;
  url: string;
};

export type ApiAccess = {
  description: string;
  url: string;
};

export type TokenPayload = {
  userName: string;
  membershipType: string;
  portalAccessList: PortalAccess[];
  apiAccessList: ApiAccess[];
  email: string;
  appName?: string;
};

export type DecryptRefreshTokenResponse<t extends object> = {
  isVerified: boolean;
  tokenPayload: t;
  errorMessage?: string;
  errorCode?: string;
};

export type State = {
  userProfile: UserProfile;
};

export type UserProfile = {
  userName: string;
  membershipType: string;
};

export type InitialState = {
  userProfile: UserProfile;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  Promise<ReturnType>,
  any,
  unknown,
  AnyAction
>;

export type DispatchThunk = ThunkDispatch<{}, void, Action>;

export type ActionReturn = {
  type: string;
  payLoad: PayLoad;
};

export type RegisterUserResponse = {
  isRegistered: boolean;
  errorCode: string;
  errorMessage: string;
};
