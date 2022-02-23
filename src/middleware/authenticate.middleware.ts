/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  use(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send('authorization token not provided');
    }

    const parts = authHeader.split(' ');

    if (parts.length != 2) {
      return res.status(401).send('malformatted token');
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send('invalid token');
    }

    jwt.verify(token, process.env.JWT_HASH, (error, decoded) => {
      if (error) {
        return res.status(401).send('invalid token');
      }
      req.body.user = {
        id: decoded.id,
        name: decoded.name
      };
    });
    return {req, res}
  }
}
