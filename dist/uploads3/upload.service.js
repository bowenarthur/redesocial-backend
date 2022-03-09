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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const s3 = new AWS.S3();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
let UploadService = class UploadService {
    constructor() {
        this.upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: process.env.AWS_S3_BUCKET_NAME,
                acl: 'public-read',
                metadata: function (req, file, cb) {
                    cb(null, { fieldName: file.fieldname });
                },
                key: (req, file, cb) => {
                    cb(null, `${Date.now().toString()} - ${file.originalname}`);
                },
            }),
        }).single('file');
    }
    async fileupload(req, res) {
        try {
            this.upload(req, res, function (error) {
                if (error) {
                    return res.status(404).json(`Failed to upload image file: ${error}`);
                }
                return res.status(201).json(req.file.location);
            });
        }
        catch (error) {
            return res.status(500).json(`Failed to upload image file: ${error}`);
        }
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadService.prototype, "fileupload", null);
UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map