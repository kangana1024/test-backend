import { IsString, IsOptional } from "class-validator";


export class CreateContactsDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  bod: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  url: string;
}

export class UpdateContactsDto {
  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  bod: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  url: string;
}
/*
@IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsDate()
  bod: Date;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  url: string;
*/