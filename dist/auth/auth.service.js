"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const jwt_strategy_1 = require("./jwt.strategy");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let AuthService = class AuthService {
    constructor(userModel, jwtstrategy) {
        this.userModel = userModel;
        this.jwtstrategy = jwtstrategy;
    }
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
                    const payload = { id: user._id, name: user.name };
                    return res.status(200).send({
                        token: this.generateToken(payload),
                        name: user.name,
                    });
                }
                else {
                    res.status(401).send({ message: 'Wrong email or password' });
                }
            });
        }
        catch (err) {
            return res.status(400).send(err.message);
        }
    }
    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_HASH, {
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
                this.userModel.create(Object.assign(Object.assign({}, req.body), { password: hash }));
                return res.status(200).send({ message: 'User created' });
            });
        }
        catch (err) {
            return res.status(400).send(err.message);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_MODEL')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_strategy_1.JwtStrategy])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map