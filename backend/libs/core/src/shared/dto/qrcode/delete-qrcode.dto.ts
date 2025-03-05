import { IsArray, IsNotEmpty, IsString, ArrayMinSize, ArrayMaxSize } from '@nestjs/class-validator';

export class QrCodeDeleteDto {
    @IsArray()
    @IsNotEmpty()
    @ArrayMinSize(1, { message: 'Must provide at least one ID' })
    @ArrayMaxSize(50, { message: 'Cannot delete more than 50 QR codes at once' })
    @IsString({ each: true, message: 'Each ID must be a string' })
    ids: string[];
}

