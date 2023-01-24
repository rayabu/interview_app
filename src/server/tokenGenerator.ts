import jwt from 'jsonwebtoken';
import {
  TokenPayload,
  GenerateResponse,
  DecryptRefreshTokenResponse,
} from '@interviewApp/src/types';

//normally store these keys on the server in a secure way
const secret = 'jhefkjfu8979kdfkjdsf45455sfsfsdf--';
const refreshTokenSecret = '^&jkasjkdasjkd7877887asdsadsa-(sdsd++))';

export const generate = (
  model: TokenPayload,
  appName = '',
  noRefreshToken = true,
): GenerateResponse => {
  if (model != null) {
    let refreshToken = '';
    const payload: TokenPayload = {
      userName: model?.userName,
      membershipType: model?.membershipType,
      portalAccessList: model.portalAccessList,
      apiAccessList: model.apiAccessList,
      email: '',
      appName: '',
    };

    payload.appName = appName;

    payload.email = model?.email;
    payload.membershipType = model?.membershipType;
    payload.userName = model?.userName;

    const accessToken = jwt.sign(payload, secret, {
      expiresIn: '1h',
      issuer: 'GoFelix',
    });

    if (!noRefreshToken) {
      refreshToken = generateRefreshToken({
        email: model?.email,
        userName: model?.userName,
        membershipType: model.membershipType,
        appName,
        portalAccessList: model.portalAccessList,
        apiAccessList: model.apiAccessList,
      });
    }

    return {
      accessToken,
      refreshToken,
      accessTokenExpires: 60, // in miniutes
      refreshTokenExpires: 4320,
    };
  }
  return null;
};

export const generateRefreshToken = ({
  email,
  appName,
  userName,
  membershipType,
  portalAccessList,
  apiAccessList,
}: TokenPayload): string => {
  const payload = {
    email,
    appName,
    userName,
    membershipType,
    portalAccessList,
    apiAccessList,
  };

  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: '1d',
    issuer: 'GoFelix',
  });

  return refreshToken;
};

export const decryptToken = <T extends Record<string, unknown>>(
  token: string,
): DecryptRefreshTokenResponse<T> => {
  const decodeObj: DecryptRefreshTokenResponse<T> = {
    isVerified: false,
    tokenPayload: null,
  };
  try {
    if (token) {
      const obj: any = jwt.verify(token, secret);

      if (obj) {
        decodeObj.isVerified = false;
        return decodeObj;
      } else {
        decodeObj.isVerified = true;
        decodeObj.tokenPayload = obj;
        return decodeObj;
      }
    } else {
      decodeObj.isVerified = false;
      return decodeObj;
    }
  } catch (error) {
    decodeObj.isVerified = false;
    return decodeObj;
  }
};

export const decryptRefreshToken = <T extends Record<string, unknown>>(
  refreshToken: string,
): DecryptRefreshTokenResponse<T> => {
  const decodeObj: DecryptRefreshTokenResponse<T> = {
    isVerified: false,
    tokenPayload: null,
    errorMessage: '',
    errorCode: '',
  };
  try {
    if (refreshToken != null) {
      jwt.verify(refreshToken, refreshTokenSecret, function (
        err: any,
        decoded: any,
      ) {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            decodeObj.errorCode = 'LK888';
            decodeObj.errorMessage = 'TokenExpiredError';
          } else {
            decodeObj.errorCode = 'LS990';
            decodeObj.errorMessage = 'InvalidRefreshToken';
          }
          decodeObj.isVerified = false;
          return decodeObj;
        }

        if (decoded != null) {
          decodeObj.isVerified = true;
          decodeObj.tokenPayload = decoded;
          return decodeObj;
        }
      });
    } else {
      decodeObj.isVerified = false;
      return decodeObj;
    }
  } catch (error) {
    //  logger.storeServerErrors(`${uiMessageErrors.serverErrorValues.invalidToken}tokenGenerator.decryptToken function`, error);
    decodeObj.isVerified = false;
    return decodeObj;
  }
  return decodeObj;
};

export default {
  generate,
  decryptToken,
  decryptRefreshToken,
};
