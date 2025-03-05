import { IsArray, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class LinkBulkDto {
    @IsArray()
    @IsNotEmpty()
    @ArrayMinSize(1, { message: 'At least one ID must be provided' })
    ids: string[];
} 