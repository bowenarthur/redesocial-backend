/* eslint-disable prettier/prettier */
import { UploadService } from './upload.service';
import { Controller, Post, Req, Res } from '@nestjs/common';

@Controller('fileupload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post()
  async create(@Req() req, @Res() res) {
    try {
      await this.uploadService.fileupload(req, res);
    } catch (error) {
      return res
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
