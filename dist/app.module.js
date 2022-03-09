"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const database_module_1 = require("./database/database.module");
const auth_service_1 = require("./auth/auth.service");
const auth_controller_1 = require("./auth/auth.controller");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_providers_1 = require("./auth/user.providers");
const post_service_1 = require("./posts/post.service");
const post_controller_1 = require("./posts/post.controller");
const post_providers_1 = require("./posts/post.providers");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const config_1 = require("@nestjs/config");
const upload_controller_1 = require("./uploads3/upload.controller");
const upload_service_1 = require("./uploads3/upload.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, config_1.ConfigModule.forRoot()],
        controllers: [
            post_controller_1.PostController,
            app_controller_1.AppController,
            auth_controller_1.AuthController,
            upload_controller_1.UploadController,
        ],
        providers: [
            post_service_1.PostService,
            app_service_1.AppService,
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            upload_service_1.UploadService,
            ...user_providers_1.userProviders,
            ...post_providers_1.postProviders,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map