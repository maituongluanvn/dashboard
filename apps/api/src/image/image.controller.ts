import { Controller, Post, Get, Param, UseInterceptors, UploadedFile, HttpException, HttpStatus, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { Response } from 'express';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const imageUrl = await this.imageService.uploadFile(file);
      return { url: imageUrl };
    } catch (error) {
      throw new HttpException('Failed to upload image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const imageBuffer = await this.imageService.fetchImage(filename);
      res.setHeader('Content-Type', 'image/jpeg'); // Thay đổi loại MIME nếu cần
      res.send(imageBuffer);
    } catch (error) {
      throw new HttpException('Failed to fetch image', HttpStatus.NOT_FOUND);
    }
  }
}
