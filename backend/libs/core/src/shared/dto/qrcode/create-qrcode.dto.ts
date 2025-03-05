import { IsMongoId, IsNotEmpty, IsOptional, IsString, IsObject, IsEnum, ValidateNested, IsArray, IsNumber } from '@nestjs/class-validator';
import { QrCodeProps } from '../../types';
import { Type } from 'class-transformer';

export enum QRCodeType {
  PDF = 'pdf',
  VCARD = 'vcard',
  WEBSITE = 'website',
  MULTI_LINK = 'multi-link'
}

class QRCodeColors {
  @IsString()
  background: string;

  @IsString()
  borderColor: string;

  @IsString()
  @IsOptional()
  btnColor?: string;

  @IsString()
  presetColor: string;
}

class EyeRadius {
  @IsNumber()
  outer: number;

  @IsNumber()
  inner: number;
}

class QRCodeProperties {
  @ValidateNested()
  @Type(() => QRCodeColors)
  colors: QRCodeColors;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EyeRadius)
  eyeRadius: EyeRadius[];

  @IsNumber()
  frame: number;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  qrStyle: string;

  @IsString()
  name: string;
}

// Base DTO that others will extend
export class BaseQRCodeDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsString()
  bgColor: string;

  @ValidateNested()
  @Type(() => QRCodeProperties)
  qrCode: QRCodeProperties;
}

// PDF QR Code (everything inside qrCode)
export class PDFQRCodeDto {
  @IsEnum(QRCodeType)
  type: QRCodeType;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsString()
  bgColor: string;

  @IsString()
  @IsNotEmpty()
  file: string;

  @ValidateNested()
  @Type(() => QRCodeProperties)
  qrCode: {
    colors: {
      background: string;
      borderColor: string;
      btnColor: string;
      presetColor: string;
    };
    eyeRadius: Array<{
      outer: number;
      inner: number;
    }>;
    frame: number;
    logo: string;
    name: string;
    qrStyle: string;
  };
}

// Add these class definitions back
class Address {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  zipCode: string;
}

class Company {
  @IsString()
  name: string;

  @IsString()
  department: string;
}

class Contacts {
  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  website?: string;
}

class SocialMedia {
  @IsString()
  @IsOptional()
  facebook?: string;

  @IsString()
  @IsOptional()
  instagram?: string;

  @IsString()
  @IsOptional()
  youtube?: string;
}

// vCard QR Code
export class VCardQRCodeDto {
  @IsEnum(QRCodeType)
  type: QRCodeType;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsString()
  bgColor: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @ValidateNested()
  @Type(() => Contacts)
  contacts: Contacts;

  @ValidateNested()
  @Type(() => QRCodeProperties)
  qrCode: {
    colors: {
      background: string;
      borderColor: string;
      btnColor: string;
      presetColor: string;
    };
    eyeRadius: Array<{
      outer: number;
      inner: number;
    }>;
    frame: number;
    logo: string;
    name: string;
    qrStyle: string;
  };

  @ValidateNested()
  @Type(() => SocialMedia)
  socialMedia: SocialMedia;

  @ValidateNested()
  template: {
    btnColor: string;
    presetColor: string;
    template: string;
  };
}

// Website QR Code (logo, name, qrStyle at root level)
export class WebsiteQRCodeDto {
  @IsEnum(QRCodeType)
  type: QRCodeType;

  @IsString()
  title: string;

  @IsString()
  bgColor: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @ValidateNested()
  @Type(() => QRCodeProperties)
  qrCode: QRCodeProperties;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  name: string;

  @IsString()
  qrStyle: string;
}

// Update Link class
class Link {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  label: string;  // Changed from title to label

  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  image?: string;
}

// Update SocialMedia class for multi-link
class MultiLinkSocialMedia extends SocialMedia {
  @IsString()
  @IsOptional()
  bitly?: string;

  @IsString()
  @IsOptional()
  shtcut?: string;
}

// Update MultiLinkQRCodeDto
export class MultiLinkQRCodeDto {
  @IsEnum(QRCodeType)
  type: QRCodeType;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  bgColor: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Link)
  links: Link[];

  @ValidateNested()
  @Type(() => MultiLinkSocialMedia)
  socialMedia: MultiLinkSocialMedia;

  @ValidateNested()
  @Type(() => QRCodeProperties)
  qrCode: {
    colors: {
      background: string;
      borderColor: string;
      btnColor: string;
      presetColor: string;
    };
    eyeRadius: Array<{
      outer: number;
      inner: number;
    }>;
    frame: number;
    logo: string;
    qrStyle: string;
    name: string;
  };

  @ValidateNested()
  template: {
    btnColor: string;
    presetColor: string;
    template: string;
  };
}

// Main DTO that handles both types
export class CreateQrCodeDto {
  @IsEnum(QRCodeType)
  type: QRCodeType;

  @ValidateNested()
  data: WebsiteQRCodeDto | PDFQRCodeDto | VCardQRCodeDto | MultiLinkQRCodeDto;
}

// Consolidate common QR code properties into a shared interface
interface QRCodeBase {
  colors: {
    background: string;
    borderColor: string;
    btnColor?: string;
    presetColor: string;
  };
  eyeRadius: Array<{
    outer: number;
    inner: number;
  }>;
  frame: number;
  logo?: string;
  name: string;
  qrStyle: string;
}
