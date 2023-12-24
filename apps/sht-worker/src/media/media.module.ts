import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploadService, Media, MediaSchema } from 'shtcut/core';
import { MediaController } from './controller/media.controller';
import { MediaService } from './service/media.service';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }])],
  controllers: [MediaController],
  providers: [MediaService, FileUploadService],
  exports: [MediaService],
})
export class MediaModule {}
