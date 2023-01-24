import {Request, Response} from 'express';
import {decryptToken, decryptRefreshToken, generate} from '../tokenGenerator';
import {PortalAccess, TokenPayload} from '@interviewApp/src/types';

type NextFunction = () => void;

const annonymousRoutes = ['/Login', '/Register'];

const validateAccessTokenMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const regex = new RegExp(annonymousRoutes.join('|'), 'i');
  if (regex.test(req.path)) {
    next();
  } else {
    if (!req.cookies || !req.cookies.secureCookie) {
      const [accessToken, refreshToken] = req.cookies.secureCookie;
      const decryptTokenObj = decryptToken<TokenPayload>(accessToken);

      if (accessToken && refreshToken) {
        if (decryptTokenObj.isVerified) {
          const {portalAccessList} = decryptTokenObj.tokenPayload;
          if (
            portalAccessList.some((pa: PortalAccess) => pa.url === req.path)
          ) {
            req.body.tokenPayload = decryptTokenObj.tokenPayload;
            next();
          } else {
            res.status(200).send({
              errorCode: 'E1111',
              errorMessage: "Sorry you don't have access to this route",
            });
          }
        } else {
          // try using the refreshtoken to get new accessToken
          const refreshPayload = decryptRefreshToken<TokenPayload>(
            refreshToken,
          );
          if (refreshPayload.isVerified) {
            const token = generate(
              refreshPayload.tokenPayload,
              refreshToken.appName,
            );
            res.cookie(
              'secureCookie',
              JSON.stringify({
                accessToken: token.accessToken,
                refreshToken: refreshToken, // use the same refresh token
              }),
              {
                secure: process.env.NODE_ENV !== 'test',
                httpOnly: true,
                expires: req.cookies.secureCookie.expiry,
              },
            );
            res.status(200).send({
              errorCode: 'E1112',
              errorMessage: 'Access token has been refreshed',
            });
          } else {
            res.status(200).send({
              errorCode: 'E1177',
              errorMessage:
                'Access token has now expired, user needs to re-authenticate',
            });
          }
          res.status(400).send({
            errorCode: 'E1112',
            errorMessage: 'Invalid token',
          });
        }
      } else {
        res.status(400).send({
          isSuccess: false,
          errorCode: 'E1112',
          errorMessage: 'Invalid Cookie',
        });
      }
    }
  }
};

export default validateAccessTokenMiddleware;
