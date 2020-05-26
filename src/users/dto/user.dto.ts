import { IsString, MinLength, MaxLength, IsEmail } from "class-validator";

export class UserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    password: string;

    @IsEmail()
    email?: string;
}

export class UserLoginDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    password: string;
}