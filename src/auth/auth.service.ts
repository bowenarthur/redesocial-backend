/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!password || !email) {
        return res.status(400).send({ message: 'Missing auth parameters' });
      }
      const user = await this.userModel
        .findOne({ email: email })
        .select('+password');
      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }
      await bcrypt.compare(password, user.password, (err, result) => {
        if (!err && result) {
          //params to be forwarded through token
          const params = { id: user._id, name: user.name };
          return res.status(200).send({
            token: this.generateToken(params),
            name: user.name,
          });
        } else {
          res.status(401).send({ message: 'Wrong email or password' });
        }
      });
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }

  private generateToken(params) {
    return jwt.sign(params, 'qwertyuiop', {
      expiresIn: 3600,
    });
  }

  async signup(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !password || !email) {
        return res.status(400).send({ message: 'Missing signup parameters' });
      }

      if (await this.userModel.findOne({ email: email })) {
        return res.status(400).send({ message: 'E-mail already used' });
      }
      await bcrypt.hash(password, 12).then((hash) => {
        // Store hash and salt in your password DB.
        this.userModel.create({
          ...req.body,
          password: hash,
        });
        return res.status(200).send({ message: 'User created' });
      });
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}
