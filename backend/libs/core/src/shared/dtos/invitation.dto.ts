import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInvitationDto {
    @IsArray()
    @IsEmail({}, { each: true })
    emails: string[];

    @IsNotEmpty()
    @IsString()
    workspace: string;

    @IsOptional()
    @IsString()
    token?: string;

    @IsNotEmpty()
    @IsString()
    redirectLink: string;

    @IsOptional()
    @IsBoolean()
    runInBackground?: boolean;
} 