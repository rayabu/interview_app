import {Express, Request, Response} from 'express';
import dataService from './dataService';
import {MockDb} from '@interviewApp/src/types';
import bodyParser from 'body-parser';
import dayjs from 'dayjs';

// create application/json parser
var jsonParser = bodyParser.json();

const apiInit = (app: Express, db: MockDb): void => {
  app.post(
    '/api/registerUser',
    jsonParser,
    (req: Request, res: Response): void => {
      const result = dataService(db).registerUser(req.body.registerForm);
      res.json(result);
    },
  );

  app.post('/api/login', jsonParser, (req: Request, res: Response): void => {
    const result = dataService(db).login(req.body.loginForm);

    if (result.token) {
      res.cookie('secureCookie', JSON.stringify(result.token), {
        secure: process.env.NODE_ENV !== 'test',
        httpOnly: true,
        expires: dayjs().add(1, 'days').toDate(),
      });
    }

    delete result.token;
    res.json(result);
  });

  app.post(
    '/api/getUserProfile',
    jsonParser,
    (req: Request, res: Response): void => {
      console.log('raja' + JSON.stringify(req.body.tokenPayload));
      const result = dataService(db).getUserProfile(
        req.body.tokenPayload.userName,
      );
      res.json(result);
    },
  );
};

export default apiInit;
